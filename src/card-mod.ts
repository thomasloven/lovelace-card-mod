import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
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
  _fixed_styles: Styles;

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
    const child = await applyToElement(
      element,
      `${this.type}-child`,
      value,
      this.variables,
      null,
      false
    );
    child.refresh;
    return child;
  }

  private async _connect() {
    const styles = this._fixed_styles ?? {};

    const styleChildren: Set<CardMod> = new Set();
    let thisStyle: any = "";
    let hasChildren = false;
    const parent = this.parentElement || this.parentNode;

    for (const [key, value] of Object.entries(styles as object)) {
      if (key === ".") {
        thisStyle = value;
      } else {
        hasChildren = true;

        const elements = await selectTree(parent, key, true);
        if (!elements) continue;
        for (const el of elements) {
          const ch = await this._styleChildEl(el, value);
          if (ch) styleChildren.add(ch);
        }
      }
    }

    // Prune old child elements
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

    if (hasChildren)
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
    "color: green; font-weight: bold"
  );
}
