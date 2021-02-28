import { LitElement, html, property } from "lit-element";
import { bind_template, unbind_template } from "./templates";
import { hasTemplate } from "card-tools/src/templates";
import pjson from "../package.json";
import { selectTree } from "card-tools/src/helpers";
import {
  applyToElement,
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
  _refreshCooldown = { running: false, repeat: false };

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
    }

    this.refresh(true);
  });

  static get applyToElement() {
    return applyToElement;
  }

  constructor() {
    super();
    document
      .querySelector("home-assistant")
      .addEventListener("settheme", () => this.refresh(true));
  }

  connectedCallback() {
    super.connectedCallback();
    this.refresh();
    this.setAttribute("slot", "none");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._disconnect(false);
  }

  set styles(stl: Styles) {
    this._input_styles = stl;
    this.refresh(true);
  }

  refresh(forced = false) {
    if (this._refreshCooldown.running) {
      this._refreshCooldown.repeat = true;
      return;
    }
    window.setTimeout(() => {
      this._refreshCooldown.running = false;
      if (this._refreshCooldown.repeat) this.refresh();
    }, 1);
    this._refreshCooldown.repeat = false;
    this._disconnect(forced).then(() => this._connect(this._input_styles));
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
        for (const el of await selectTree(parent, key, true)) {
          this._styleChildren.add(
            await applyToElement(
              el,
              `${this.type}-child`,
              value,
              this.variables,
              null,
              false
            )
          );
        }
      }
    }

    if (this._styles && hasTemplate(this._styles)) {
      this._renderer = this._renderer || this._style_rendered.bind(this);
      bind_template(this._renderer, this._styles as string, this.variables);
    } else {
      this._style_rendered((this._styles as string) || "");
    }

    this._observer.observe(parentElement(this), { childList: true });

    if (this.type === "card") {
      const p = parentElement(parentElement(this)) as any;
      if (p) this._observer.observe(p, { childList: true });
      if (p && p.updated && !p._cm_update_patched) {
        const _updated = p.updated;
        const _this = this;
        p.updated = function (param) {
          _updated.bind(this)(param);
          this.updateComplete.then(() => _this.refresh());
        };
        p._cm_update_patched = true;
      }
    }
  }

  private async _disconnect(forced = true) {
    this._observer.disconnect();
    await unbind_template(this._renderer);
    if (forced) {
      this._rendered_styles = "";
      for (const c of this._styleChildren) {
        if (c) c.styles = "";
        this._styleChildren.delete(c);
      }
    }
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
