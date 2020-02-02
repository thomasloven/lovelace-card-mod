import {subscribeRenderTemplate} from "card-tools/src/templates.js";
import { provideHass } from "card-tools/src/hass";

class CardMod extends HTMLElement {

  constructor() {
    super();
    provideHass(this);
    this.old_theme = "";
    this.themed = false;
  }

  disconnectedCallback() {
    this._disconnect();
    //window.removeEventListener("location-changed", () => this.update());
  }
  connectedCallback() {
    window.setTimeout(() => this._connect(),0);
    //window.addEventListener("location-changed", () => this.update());
  }

  set hass(hass) {
    // Watch for changes in themes
    this._hass = hass;
    if(!hass || !hass.themes) return
    if(this.themed)
      this.template = {
        variables: this._data.variables,
        entity_ids: this._data.entity_ids,
      };
  }

  _has_template(data) {
    if(data.template.includes("{%")) return true;
    if(data.template.includes("{{")) return true;
    return false;
  }

  get_theme() {
    if(!this._hass) return undefined;
    let theme = this._hass.selectedTheme || this._hass.themes.default_theme;
    if(theme === "default") return undefined;
    theme = this._hass.themes.themes[theme];
    let style = theme[`rgb-card-mod-${this.type}-json`];
    if(style)
      return JSON.parse(style.replace(/\n/g, ""));
    return theme[`rgb-card-mod-${this.type}`];
  }

  set template(data) {
    this._data = data;

    if(this._data.template === undefined) {
      this.themed = true;
      this._data.template = this.get_theme();
    }

    if(!this._data.entity_ids) {
      if(this._data.variables.config && this._data.variables.config.entity) {
        this._data.entity_ids = [this._data.variables.config.entity];
      }
    }
  }

  async extend(data) {
    let template = data.template;
    const variables = data.variables;
    const entity_ids = data.entity_ids;
    if(!template) template = "";
    if(typeof template === "string")
      return {template, variables, entity_ids};

    this.styleChildren = this.styleChildren || [];
    const unstyle = (root) => {
      const cardMod = root.querySelector("card-mod");
      if(!cardMod) return;
      unstyle(cardMod);
      root.removeChild(cardMod);
    };
    this.styleChildren.forEach(unstyle);

    let retval = {template: "", variables, entity_ids};
    const parent = this.parentElement || this.parentNode;
    if(parent.updateComplete) await parent.updateComplete;
    Object.keys(template).forEach((k) => {
      let next = [];
      if(k === ".") {
        retval = this.extend({template: template[k], variables, entity_ids});
        return;
      } else if(k === "$") {
        next = [parent.shadowRoot];
      } else {
        if(!parent) debugger;
        next = parent.querySelectorAll(k)
      }
        if(!next) return;
        this.styleChildren = this.styleChildren.concat(Array.from(next));
        next.forEach((el) => {
          let styleEl = el.querySelector("card-mod") || document.createElement("card-mod");
          styleEl.template = {template: template[k], variables, entity_ids};
          el.appendChild(styleEl);
        });
    });
    return retval;
  }

  update() {
    this._disconnect().then(() => this._connect());
  }

  async _connect() {
    if(!this._data) return;

    const myData = await this.extend(this._data);

    if(!this._has_template(myData)) {
      this.innerHTML = `<style>${myData.template}</style>`;
    }

    if(this._unsubRenderTemplate) return;
    this._unsubRenderTemplate = subscribeRenderTemplate(
      null,
      (result) => this.innerHTML = `<style>${result}</style>`,
      myData);

    this._unsubRenderTemplate.catch(() => {
      this.innerHTML = `<style>${myData.template}</style>`;
      this._unsubRenderTemplate = undefined;
    });
  }

  async _disconnect() {
    if(this._unsubRenderTemplate) {
      try {
        const unsub = await this._unsubRenderTemplate;
        this._unsubRenderTemplate = undefined;
        await unsub();
      } catch (e) {
        if(e.code !== "not_found")
          throw e;
      }
    }
  }

}

customElements.define("card-mod", CardMod);
