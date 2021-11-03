import { LitElement, html, property } from "lit-element";
import { bind_template, unbind_template } from "./templates";
import { hasTemplate } from "card-tools/src/templates";
import pjson from "../package.json";
import { selectTree } from "card-tools/src/helpers";
import {
  applyToElement,
  compare_deep,
  get_theme,
  merge_deep,
  parentElement,
  Styles,
} from "./helpers";

export class CardMod extends LitElement {
  type: string;
  variables: any;
  @property() _rendered_styles: string = "";

  _styles: Styles;
  _renderer: (_: string) => void;
  _styleChildren: Set<CardMod> = new Set();
  _input_styles: Styles;

  _observer: MutationObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if ((m.target as any).localName === "card-mod") return;
      let stop = true;
      if (m.addedNodes.length)
        m.addedNodes.forEach((n) => {
          if ((n as any).localName !== "card-mod") stop = false;
        });
      if (stop) return;
      stop = true;
      if (m.removedNodes.length)
        m.removedNodes.forEach((n) => {
          if ((n as any).localName !== "card-mod") stop = false;
        });
      if (stop) return;
    }

    this.refresh();
  });

  static get applyToElement() {
    return applyToElement;
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
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._disconnect();
  }

  set styles(stl: Styles) {
    if (compare_deep(stl, this._input_styles)) return;
    this._input_styles = stl;
    this._connect();
  }
  get styles() {
    return this._styles;
  }

  refresh() {
    this._connect();
  }

  private async _connect() {
    const stl = this._input_styles;
    // Always work with yaml styles
    let styles = JSON.parse(JSON.stringify(stl || {}));
    if (typeof styles === "string") styles = { ".": styles };

    // Merge card_mod styles with theme styles
    const theme_styles = await get_theme(this);
    merge_deep(styles, theme_styles);

    const styleChildren: Set<CardMod> = new Set();
    let thisStyle: any;
    const parent = this.parentElement || this.parentNode;

    if (!styles["."]) thisStyle = "";
    for (const [key, value] of Object.entries(styles as object)) {
      if (key === ".") {
        thisStyle = value;
      } else {
        const elements = await selectTree(parent, key, true);
        if (!elements) continue;
        for (const el of elements) {
          if (el) {
            const child = await applyToElement(
              el,
              `${this.type}-child`,
              value,
              this.variables,
              null,
              false
            );
            child.refresh();
            styleChildren.add(child);
          }
        }
      }
    }

    for (const oldCh of this._styleChildren) {
      if (!styleChildren.has(oldCh)) {
        if (oldCh) oldCh.styles = "";
      }
    }
    this._styleChildren = styleChildren;

    if (this._styles === thisStyle) return;
    this._styles = thisStyle;

    if (this._styles && hasTemplate(this._styles)) {
      this._renderer = this._renderer || this._style_rendered.bind(this);
      bind_template(this._renderer, this._styles as string, this.variables);
    } else {
      this._style_rendered((this._styles as string) || "");
    }

    this._observer.observe(parentElement(this), { childList: true });
  }

  private async _disconnect() {
    this._observer.disconnect();
    this._styles = "";
    await unbind_template(this._renderer);
  }

  private _style_rendered(result: string) {
    this._rendered_styles = result;
    this.dispatchEvent(new Event("card-mod-update"));
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${this._rendered_styles}
        ${new Date().getDate() === 1 && new Date().getMonth() === 3
          ? html`:host{transform: rotate(${Math.random() * 2 - 1}deg);}`
          : ""}
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
