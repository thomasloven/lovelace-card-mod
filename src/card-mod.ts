import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import {
  hasTemplate,
  bind_template,
  unbind_template,
} from "./helpers/templates";
import pjson from "../package.json";
import {
  applyToElement,
  compare_deep,
  get_theme,
  merge_deep,
  parentElement,
  Styles,
} from "./helpers";
import { selectTree } from "./helpers/selecttree";
import { apply_card_mod } from "./helpers/card_mod";

declare global {
  interface HTMLElementTagNameMap {
    "card-mod": CardMod;
  }
}

export class CardMod extends LitElement {
  type: string;
  variables: any;
  @property() _rendered_styles: string = "";
  styleChildren: Record<string, Array<Promise<CardMod>>> = {};

  _styles: Styles;
  _renderer: (_: string) => void;
  _input_styles: Styles;
  _fixed_styles: Styles;
  _parent_cm?: CardMod = undefined;

  _observer: MutationObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if ((m.target as any).localName === "card-mod") return;
      let stop = true;
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
    return apply_card_mod;
  }

  constructor() {
    super();
    document.addEventListener("cm_update", () => {
      this.refresh();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._connect();
    this.setAttribute("slot", "none");
    this.style.display = "none";
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._disconnect();
  }

  set styles(stl: Styles) {
    if (compare_deep(stl, this._input_styles)) return;
    this._input_styles = stl;

    (async () => {
      // Always work with yaml styles internally
      let styles = JSON.parse(JSON.stringify(stl || {}));
      if (typeof styles === "string") styles = { ".": styles };
      // Merge card_mod styles with theme styles
      const theme_styles = await get_theme(this);
      merge_deep(styles, theme_styles);
      this._fixed_styles = styles;

      this._connect();
    })();
  }
  get styles() {
    return this._styles;
  }

  refresh() {
    this._connect();
  }

  private async _styleChildEl(element, value = undefined) {
    if (value === undefined) {
      // Find the style for the element
      const styles = this._fixed_styles;
      for (const [key, val] of Object.entries(styles as object)) {
        if (key === ".") continue;
        const elements: NodeList = await selectTree(
          this.parentElement || this.parentNode,
          key,
          true
        );
        elements.forEach((el) => {
          if (el === element) {
            value = val;
          }
        });
        if (value !== undefined) break;
      }
      if (value === undefined) return;
    }

    if (!element) return;
    const child = await apply_card_mod(
      element,
      `${this.type}-child`,
      { style: value },
      this.variables,
      false
    );
    child.refresh;
    return child;
  }

  private async _style_child(
    path: string,
    style,
    retries = 0
  ): Promise<Array<Promise<CardMod>>> {
    const parent = this.parentElement || this.parentNode;
    const elements = await selectTree(parent, path, true);
    if (!elements || !elements.length) {
      console.log(path);
      if (retries > 5) throw new Error("NoELements");
      await new Promise((resolve) => setTimeout(resolve, retries * 100));
      return this._style_child(path, style, retries + 1);
    }

    // return elements.map((ch) => this._styleChildEl(ch, style) )
    return [...elements].map(async (ch) => {
      const cm = await apply_card_mod(
        ch,
        `${this.type}-child`,
        { style },
        this.variables,
        false
      );
      cm._parent_cm = this;
      return cm;
    });
  }

  private async _connect() {
    const styles = this._fixed_styles ?? {};

    const styleChildren = {};
    let thisStyle: any = "";
    let hasChildren = false;
    const parent = this.parentElement || this.parentNode;

    for (const [key, value] of Object.entries(styles as object)) {
      if (key === ".") {
        thisStyle = value;
      } else {
        hasChildren = true;
        styleChildren[key] = this._style_child(key, value);
      }
    }

    // Prune old child elements
    for (const key in this.styleChildren) {
      if (!styleChildren[key]) {
        this.styleChildren[key]?.forEach(
          async (ch) => ((await ch).styles = "")
        );
      }
    }
    this.styleChildren = styleChildren;

    if (this._styles === thisStyle) return;
    this._styles = thisStyle;

    if (this._styles && hasTemplate(this._styles)) {
      this._renderer = this._renderer || this._style_rendered.bind(this);
      bind_template(this._renderer, this._styles as string, this.variables);
    } else {
      this._style_rendered((this._styles as string) || "");
    }
    if (hasChildren) {
      this._observer.disconnect();
      this._observer.observe(parentElement(this), { childList: true });
    }
  }

  private async _disconnect() {
    this._observer.disconnect();
    this._styles = "";
    await unbind_template(this._renderer);
    this._parent_cm?._connect();
  }

  private _style_rendered(result: string) {
    if (this._rendered_styles !== result) this._rendered_styles = result;
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

(async () => {
  // Wait for scoped customElements registry to be set up
  // otherwise the customElements registry card-mod is defined in
  // may get overwritten by the polyfill if card-mod is loaded as a module
  while (customElements.get("home-assistant") === undefined)
    await new Promise((resolve) => window.setTimeout(resolve, 100));

  if (!customElements.get("card-mod")) {
    customElements.define("card-mod", CardMod);
    console.info(
      `%cCARD-MOD ${pjson.version} IS INSTALLED`,
      "color: green; font-weight: bold"
    );
  }
})();
