import { LitElement, html } from "lit-element";
import { bind_template, unbind_template } from "./templates";
import { hasTemplate } from "card-tools/src/templates";
import pjson from "../package.json";
import { selectTree } from "card-tools/src/helpers";
import { applyToElement, get_theme, merge_deep, Styles } from "./helpers";

export class CardMod extends LitElement {
  type: string;

  _styles: Styles;
  _rendered_styles: string = "";
  _renderer: (_: string) => void;
  _renderChildren: Set<CardMod> = new Set();
  _input_styles: Styles;
  variables: any;

  _observer: MutationObserver = new MutationObserver((mutations) => {
    if (mutations.some((m) => (m.target as Element).localName !== "card-mod")) {
      this.refresh();
    }
  });

  static get properties() {
    return {
      _rendered_styles: {},
    };
  }

  static get applyToElement() {
    return applyToElement;
  }

  constructor() {
    super();
    document
      .querySelector("home-assistant")
      .addEventListener("settheme", () => this.refresh());
  }

  connectedCallback() {
    super.connectedCallback();
    this.refresh();
    this.setAttribute("slot", "none");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._disconnect();
  }

  set styles(stl: Styles) {
    this._input_styles = stl;
    this.refresh();
  }

  async refresh() {
    await this._disconnect();
    this._connect(this._input_styles);
  }

  private async _connect(stl: Styles) {
    // Always work with yaml styles
    let styles = JSON.parse(JSON.stringify(stl || {}));
    if (typeof styles === "string") styles = { ".": styles };

    // Merge card_mod styles with theme styles
    const theme_styles = await get_theme(this);
    merge_deep(styles, theme_styles);

    const parent = this.parentElement || this.parentNode;
    for (const [key, value] of Object.entries(styles as object)) {
      if (key === ".") {
        this._styles = value;
      } else {
        const nodes = await selectTree(parent, key, true);
        for (const el of nodes) {
          applyToElement(el, undefined, value, this.variables, null, false);
          this._renderChildren.add(el._cardMod);
        }
      }
    }

    if (this._styles && hasTemplate(this._styles)) {
      this._renderer = this._renderer || this._style_rendered.bind(this);
      bind_template(this._renderer, this._styles as string, this.variables);
    } else {
      this._style_rendered((this._styles as string) || "");
    }

    this._observer.observe(
      (parent as any).host ? (parent as any).host : parent,
      { childList: true }
    );
  }

  private async _disconnect() {
    this._observer.disconnect();
    await unbind_template(this._renderer);
    this._rendered_styles = "";
    for (const c of this._renderChildren) {
      if (c) c.styles = "";
      this._renderChildren.delete(c);
    }
  }

  private _style_rendered(result: string) {
    this._rendered_styles = result;
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
    "color: green; font-weight: bold",
    ""
  );
}
