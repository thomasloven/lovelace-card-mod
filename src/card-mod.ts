import { LitElement, html } from "lit-element";
import { bind_template, unbind_template } from "./templates";
import { hasTemplate } from "card-tools/src/templates";
import pjson from "../package.json";
import { selectTree } from "card-tools/src/helpers";
import { get_theme, merge_deep } from "./helpers";

interface ModdedElement extends HTMLElement {
  updateComplete?: Promise<void>;
  modElement?: ModdedElement;
  _cardMod?: CardMod;
}

interface Template {
  template: string | object;
  variables: object;
  entity_ids?: any;
}

export const applyToElement = async (
  el: ModdedElement,
  type: string,
  template: string | object,
  variables: any,
  entity_ids: any,
  shadow: boolean = true
) => {
  if (el.localName?.includes("-"))
    await customElements.whenDefined(el.localName);
  if (el.updateComplete) await el.updateComplete;
  if (el.modElement)
    return applyToElement(
      el.modElement,
      type,
      template,
      variables,
      entity_ids,
      shadow
    );

  el._cardMod = el._cardMod || (document.createElement("card-mod") as CardMod);
  const target = shadow ? el.shadowRoot || el : el;
  target.appendChild(el._cardMod as Node);
  if (el.updateComplete) await el.updateComplete;
  el._cardMod.type = type;
  el._cardMod.template = {
    template,
    variables,
    entity_ids,
  };
};

class CardMod extends LitElement {
  type: string;
  _template: Template;
  _rendered_template: string = "";
  _renderer: (string) => void;
  _renderChildren: Set<CardMod> = new Set();
  _tplinput: any;
  _observer: MutationObserver = new MutationObserver((mutations) => {
    if (this._tplinput) {
      let trigger = false;
      for (const m of mutations) {
        if ((m.target as Element).localName !== "card-mod") {
          trigger = true;
        }
      }
      if (trigger) {
        this.template = this._tplinput;
      }
    }
  });

  static get properties() {
    return {
      _rendered_template: {},
    };
  }

  static get applyToElement() {
    return applyToElement;
  }

  constructor() {
    super();
    document
      .querySelector("home-assistant")
      .addEventListener("settheme", () => {
        if (this._tplinput) {
          this.template = this._tplinput;
          console.log("Rerender");
        }
      });
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._tplinput) {
      this.template = this._tplinput;
    }
    this.setAttribute("slot", "none");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribe();
  }

  set template(tpl: Template) {
    this._tplinput = tpl;
    this._unsubscribe().then(() => {
      this._subscribe(this._tplinput);
    });
  }

  async _subscribe(template: Template) {
    const variables = template.variables;

    let tpl = JSON.parse(JSON.stringify(template.template || {}));
    if (typeof tpl === "string") tpl = { ".": tpl };
    const theme_template = await get_theme(this);
    merge_deep(tpl, theme_template);

    if (tpl == undefined) return;
    if (typeof tpl === "string") {
      this._template = { template: tpl, variables };
    } else {
      const parent = this.parentElement || this.parentNode;
      for (const [key, value] of Object.entries(tpl as object)) {
        if (key === ".") {
          this._template = { template: value, variables };
        } else {
          selectTree(parent, key, true).then((nodes) => {
            for (const el of nodes) {
              applyToElement(el, undefined, value, variables, [], false);
              this._renderChildren.add(el._cardMod);
            }
          });
        }
      }
    }

    if (hasTemplate(this._template?.template)) {
      this._renderer = this._renderer || this._template_rendered.bind(this);
      await bind_template(
        this._renderer,
        this._template.template as string,
        this._template.variables
      );
    } else {
      this._template_rendered((this._template?.template as string) || "");
    }

    let parent = this.parentElement || this.parentNode;
    parent = (parent as any).host ? (parent as any).host : parent;
    this._observer.observe(parent, { childList: true });
  }

  async _unsubscribe() {
    this._observer.disconnect();
    await unbind_template(this._renderer);
    this._rendered_template = "";
    for (const c of this._renderChildren) {
      if (c) c.template = { template: "", variables: {} };
      this._renderChildren.delete(c);
    }
  }

  _template_rendered(result: string) {
    this._rendered_template = result;
  }

  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <style>
        ${this._rendered_template}
      </style>
    `;
  }
}

if (!customElements.get("card-mod")) {
  customElements.define("card-mod", CardMod);
  console.info(
    `%cCARD-MOD ${pjson.version} IS INSTALLED`,
    "color: green; font-weight: bold",
    ""
  );
}
