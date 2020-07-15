import { LitElement, html } from "card-tools/src/lit-element";
import { subscribeRenderTemplate, hasTemplate } from "card-tools/src/templates";
import { hass } from "card-tools/src/hass";
import { yaml2json } from "card-tools/src/yaml";

const EMPTY_TEMPLATE = {template: "", variables: {}, entity_ids: []};

export const applyToElement = async (el, type, template, variables, entity_ids, shadow=true) => {
  if(el.localName.includes("-"))
    await customElements.whenDefined(el.localName);
  if(el.updateComplete)
    await el.updateComplete;

  el._cardMod = el._cardMod || document.createElement("card-mod");
  el._cardMod.type = type;
  el._cardMod.template = {
    template,
    variables,
    entity_ids,
  };
  const target = shadow ? el.shadowRoot : el;
  target.appendChild(el._cardMod);
}

class CardMod extends LitElement {

  static get properties() {
    return {
      _renderedStyles: {},
      _renderer: {},
    }
  }

  static get applyToElement() { return applyToElement; }

  connectedCallback() {
    super.connectedCallback();
    this.template = this._data;
    this.setAttribute("slot", "none");
  }

  async getTheme() {
    if(!this.type) return null;
    let el = this.parentElement ? this.parentElement : this;
    const theme = window.getComputedStyle(el).getPropertyValue("--card-mod-theme");

    const themes = hass().themes.themes;
    if(!themes[theme]) return null;
    if(themes[theme][`card-mod-${this.type}-yaml`])
      return await yaml2json(themes[theme][`card-mod-${this.type}-yaml`])
    if(themes[theme][`card-mod-${this.type}`])
      return themes[theme][`card-mod-${this.type}`]
    return null;
  }

  set template(data) {
    this._data = JSON.parse(JSON.stringify(data));

    this._setTemplate(this._data);
  }

  async _setTemplate(data) {
    if(!data.template && !this._parent) {
      data.template = await this.getTheme();
    }

    if(data.template && JSON.stringify(data.template).includes("config.entity") && !data.entity_ids) {
      if(data.variables.config && data.variables.config.entity)
        data.entity_ids = [data.variables.config.entity]
    }

    await this.setStyle(data);
  }

  async unStyle() {
    this._styledChildren = this._styledChildren || new Set();
    for(const c of this._styledChildren) {
      c.template = EMPTY_TEMPLATE;
    }
  }

  async setStyle(data) {

    let { template, variables, entity_ids } = data;

    await this.unStyle();

    if(!template) template = "";
    if(typeof template === "string") {
      this._renderedStyles = template;
      if(this._renderer) {
        try {
          await this._renderer();
        } catch(err) {
          if(!err.code || err.code !== "not_found")
            throw(err);
        }
        this._renderer = undefined;
      }

      if(hasTemplate(template)) {
        this._renderer = await subscribeRenderTemplate(
          null,
          (res) => {
            this._renderedStyles = res;
          },
          { template, variables, entity_ids }
        )
      }
      return;
    }

    await this.updateComplete;
    const parent = this.parentElement || this.parentNode;
    if(!parent) return {template: "", variable, entity_ids};
    if(parent.updateComplete) await parent.updateComplete;
    for(const k of Object.keys(template)) {
      let next = [];
      if(k === ".") {
        this.setStyle({template: template[k], variables, entity_ids});
        continue;
      } else if(k === "$") {
        if(parent.localName === "ha-card") debugger;
        next = [parent.shadowRoot];
      } else {
        next = parent.querySelectorAll(k);
      }
      if(!next.length) continue;
      for(const el of next) {
        if(!el) continue;
        let styleEl = el.querySelector(":scope > card-mod");
        if(!styleEl || styleEl._parent !== this) {
          styleEl = document.createElement("card-mod");
          this._styledChildren.add(styleEl);
          styleEl._parent = this;
        }
        styleEl.template = {template: template[k], variables, entity_ids};
        el.appendChild(styleEl);
      }
    }

  }

  createRenderRoot() { return this; }
  render() {
    return html`
      <style>
        ${this._renderedStyles}
      </style>
    `;
  }

}

if(!customElements.get("card-mod")) {
  customElements.define('card-mod', CardMod);
  const pjson = require('../package.json');
  console.info(`%cCARD-MOD ${pjson.version} IS INSTALLED`,
  "color: green; font-weight: bold",
  "");
}
