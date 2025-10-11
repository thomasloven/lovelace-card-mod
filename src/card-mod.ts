import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import {
  hasTemplate,
  bind_template,
  unbind_template,
} from "./helpers/templates";
import pjson from "../package.json";
import { get_theme } from "./helpers/themes";
import { selectTree } from "./helpers/selecttree";
import {
  apply_card_mod,
  apply_card_mod_compatible,
  CardModStyle,
} from "./helpers/apply_card_mod";
import { compare_deep, merge_deep } from "./helpers/dict_functions";

declare global {
  interface HTMLElementTagNameMap {
    "card-mod": CardMod;
  }
}

export class CardMod extends LitElement {
  @property({ attribute: "card-mod-type", reflect: true }) type: string;
  variables: any;
  card_mod_children: Record<string, Array<Promise<CardMod>>> = {};
  card_mod_parent?: CardMod = undefined;

  debug: boolean = false;

  card_mod_input: CardModStyle;
  _fixed_styles: Record<string, CardModStyle> = {};
  _styles: string = "";
  @property() _rendered_styles: string = "";
  _renderer: (_: string) => void;

  _cancel_style_child = [];

  _observer: MutationObserver = new MutationObserver((mutations) => {
    // MutationObserver to keep track of any changes to the parent element
    // e.g. when elements are changed after creation.
    // The observer is activated in _connect() only if there are any styles
    //  which should be applied to children

    let stop = true;
    for (const m of mutations) {
      if ((m.target as any).localName === "card-mod") return;
      if (m.addedNodes.length)
        m.addedNodes.forEach((n) => {
          if ((n as any).localName !== "card-mod") stop = false;
        });
      if (m.removedNodes.length)
        m.removedNodes.forEach((n) => {
          if ((n as any).localName !== "card-mod") stop = false;
        });
    }

    if (stop) return;
    this.refresh();
  });

  static get applyToElement() {
    // This gets the compatibility wrapper for backwards compatibility with card-mod 3.3.
    // The wrapper should be removed at earliest June 2024, or if card-mod 4.0 is released
    return apply_card_mod_compatible;
  }

  constructor() {
    super();

    // cm_update is issued when themes are reloaded
    document.addEventListener("cm_update", () => {
      this._process_styles(this.card_mod_input);
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.refresh();

    // Make sure the card-mod element is invisible
    this.setAttribute("slot", "none");
    this.style.display = "none";
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._disconnect();
  }

  set styles(stl: CardModStyle) {
    // Parsing styles is expensive, so only do it if things have actually changed
    if (compare_deep(stl, this.card_mod_input)) return;

    this.card_mod_input = stl;
    this._process_styles(stl);
  }

  get styles(): CardModStyle {
    // Return only styles that apply to this element
    return this._styles;
  }

  refresh() {
    this._connect();
  }

  cancelStyleChild() {
    this._cancel_style_child.forEach((cancel) => cancel());
    this._cancel_style_child = [];
  }

  _debug(...msg) {
    if (this.debug) console.log("CardMod Debug:", ...msg);
  }

  private async _process_styles(stl) {
    let styles =
      typeof stl === "string" ? { ".": stl } : JSON.parse(JSON.stringify(stl));

    // Merge card_mod styles with theme styles
    const theme_styles = await get_theme(this);
    merge_deep(styles, theme_styles);

    // Save processed styles
    this._fixed_styles = styles;

    this.refresh();
  }

  private async _style_child(
    path: string,
    style,
    retries = 0
  ): Promise<Array<Promise<CardMod>>> {
    const parent = this.parentElement || this.parentNode;
    const elements = await selectTree(parent, path, true);
    if (!elements || !elements.length) {
      if (retries > 5) throw new Error("NoElements");
      let timeout = new Promise((resolve, reject) => {
        setTimeout(resolve, retries * 100);
        this._cancel_style_child.push(reject);
      });
      await timeout.catch((e) => {
        throw new Error("Cancelled");
      });
      return this._style_child(path, style, retries + 1);
    }

    return [...elements].map(async (ch) => {
      const cm = await apply_card_mod(
        ch,
        `${this.type}-child`,
        { style, debug: this.debug },
        this.variables,
        false
      );
      if (cm) cm.card_mod_parent = this;
      return cm;
    });
  }

  private async _connect() {
    const styles = this._fixed_styles ?? {};

    const styleChildren = {};
    let thisStyle = "";
    let hasChildren = false;

    this._debug("(Re)connecting", this);

    this.cancelStyleChild();

    // Go through each path in the styles
    for (const [key, value] of Object.entries(styles)) {
      if (key === ".") {
        if (typeof value === "string") thisStyle = value;
        else this._debug("Style of '.' must be a string: ", value);
      } else {
        hasChildren = true;
        styleChildren[key] = this._style_child(key, value).catch((e) => {
          if (e.message == "NoElements") {
            if (this.debug) {
              console.groupCollapsed("card-mod found no elements");
              console.info(`Looked for ${key}`);
              console.info(this);
              console.groupEnd();
            }
            return;
          }
          if (e.message == "Cancelled") {
            if (this.debug) {
              console.groupCollapsed(
                "card-mod style_child cancelled while looking for elements"
              );
              console.info(`Looked for ${key}`);
              console.info(this);
              console.groupEnd();
            }
            return;
          }
          throw e;
        });
      }
    }

    // Prune old child elements
    for (const key in this.card_mod_children) {
      if (!styleChildren[key]) {
        (await this.card_mod_children[key])?.forEach(
          async (ch) => ((await ch).styles = "")
        );
      }
    }
    this.card_mod_children = styleChildren;

    // Process styles applicable to this card-mod element
    if (this._styles === thisStyle) return;
    this._styles = thisStyle;

    if (hasTemplate(this._styles)) {
      this._renderer = this._renderer || this._style_rendered.bind(this);
      bind_template(this._renderer, this._styles as string, this.variables);
    } else {
      this._style_rendered(this._styles || "");
    }
    if (hasChildren) {
      this._observer.disconnect();
      const parentEl = this.parentElement ?? this.parentNode;
      if (parentEl) {
        this._observer.observe((parentEl as any)?.host ?? parentEl, {
          childList: true,
        });
      }
    }
  }

  private async _disconnect() {
    this._observer.disconnect();
    this._styles = "";
    this.cancelStyleChild();
    await unbind_template(this._renderer);
    this.card_mod_parent?.refresh?.();
  }

  private _style_rendered(result: string) {
    if (this._rendered_styles !== result) this._rendered_styles = result;
    // This event is listened for by icons
    this.dispatchEvent(new Event("card-mod-update"));
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${this._rendered_styles}
      </style>
    `;
  }
}

if (!customElements.get("card-mod")) {
  customElements.define("card-mod", CardMod);
  console.info(
    `%cCARD-MOD ${pjson.version} IS INSTALLED`,
    "color: green; font-weight: bold"
  );
}
(async () => {
  // Wait for scoped customElements registry to be set up
  // and then redefine card-mod if necessary
  // otherwise the customElements registry card-mod is defined in
  // may get overwritten by the polyfill if card-mod is loaded as a module
  while (customElements.get("home-assistant") === undefined)
    await new Promise((resolve) => window.setTimeout(resolve, 100));

  if (!customElements.get("card-mod")) {
    customElements.define("card-mod", CardMod);
  }
})();
