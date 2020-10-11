import { LitElement, html } from "card-tools/src/lit-element";
import { subscribeRenderTemplate, hasTemplate } from "card-tools/src/templates";
import { hass } from "card-tools/src/hass";
import { yaml2json } from "card-tools/src/yaml";
import { selectTree } from "card-tools/src/helpers";

const EMPTY_TEMPLATE = {template: "", variables: {}, entity_ids: []};

export const applyToElement = async (el, type, template, variables, entity_ids, shadow=true) => {
  if(el.localName.includes("-"))
    await customElements.whenDefined(el.localName);
  if(el.updateComplete)
    await el.updateComplete;

  if(el.modElement)
    return applyToElement(el.modElement, type, template, variables, entity_ids, shadow);

  el._cardMod = el._cardMod || document.createElement("card-mod");
  const target = shadow ? (el.shadowRoot || el) : el;
  target.appendChild(el._cardMod);
  if(el.updateComplete)
    await el.updateComplete;
  el._cardMod.type = type;
  el._cardMod.template = {
    template,
    variables,
    entity_ids,
  };
}

class CardMod extends LitElement {

  static get properties() {
    return {
      _renderedStyles: {},
      _renderer: {},
    }
  }

  static get applyToElement() { return applyToElement; }

  constructor() {
    super();
    document.querySelector("home-assistant").addEventListener("settheme", () => {this._setTemplate(this._data)});
  }

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
    if(!data) return;
    this._data = JSON.parse(JSON.stringify(data));

    this.themeApplied = this._setTemplate(this._data);
  }

  async _setTemplate(data) {
    if(!this._parent) {
      data.theme_template = await this.getTheme();
      if(typeof(data.template) === "string") {
        data.template = {".": data.template};
      }
      if(typeof(data.theme_template) === "string") {
        data.theme_template = {".": data.theme_template};
      }
    }

    // if(data.template && JSON.stringify(data.template).includes("config.entity") && !data.entity_ids) {
    //   if(data.variables.config && data.variables.config.entity)
    //     data.entity_ids = [data.variables.config.entity]
    // }

    await this.setStyle(data);
  }

  async unStyle() {
    this._styledChildren = this._styledChildren || new Set();
    for(const c of this._styledChildren) {
      c.template = EMPTY_TEMPLATE;
    }
  }

  _mergeDeep(target, source) {
    const isObject = (i) => {
      return (i && typeof i === "object" && !Array.isArray(i));
    };
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if(!target[key]) Object.assign(target, { [key]: {} });
          if(typeof(target[key]) === "string")
            target[key] = {".": target[key]};
          this._mergeDeep(target[key], source[key]);
        } else {
          if(target[key])
            target[key] = source[key] + target[key];
          else
            target[key] = source[key];
        }
      }
    }
    return target;
  }

  async setStyle(data) {

    let { template, theme_template, variables, entity_ids } = data;

    await this.unStyle();

    if(!template) template = {};
    template = JSON.parse(JSON.stringify(template));
    this._mergeDeep(template, theme_template);

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
          { template, variables}
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
      } else {
        next = await selectTree(parent, k, true);
      }
      if(!next.length) continue;
      for(const el of next) {
        if(!el) continue;
        let styleEl = el.querySelector(":scope > card-mod");
        if(!styleEl || styleEl._parent !== (this._parent || this)) {
          styleEl = document.createElement("card-mod");
          this._styledChildren.add(styleEl);
          styleEl._parent = (this._parent || this);
        }
        styleEl.template = {template: template[k], variables, entity_ids};
        el.appendChild(styleEl);
        await styleEl.themeApplied;
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
