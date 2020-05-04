import {subscribeRenderTemplate} from "card-tools/src/templates.js";

class CardMod extends HTMLElement {

  disconnectedCallback() {
    this._disconnect();
  }
  connectedCallback() {
    this._connect();
  }

  _has_template(data) {
    if(data.template.includes("{%")) return true;
    if(data.template.includes("{{")) return true;
    return false;
  }

  set template(data) {
    this._data = JSON.parse(JSON.stringify(data));
    if(!this._has_template(data)) return;

    if(!this._data.entity_ids && this._data.template.includes("config.entity")) {
      if(this._data.variables.config && this._data.variables.config.entity) {
        this._data.entity_ids = [this._data.variables.config.entity];
      }
    }
  }

  update() {
    this._disconnect().then(() => this._connect());
  }

  async _connect() {
    if(!this._data) return;

    if(!this._has_template(this._data)) {
      this.innerHTML = `<style>${this._data.template}</style>`;
    }

    if(this._unsubRenderTemplate) return;
    this._unsubRenderTemplate = subscribeRenderTemplate(null,
      (result) => this.innerHTML = `<style>${result}</style>`,
      this._data);

    this._unsubRenderTemplate.catch(() => {
      this.innerHTML = `<style>${this._data.template}</style>`;
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

if(!customElements.get("card-mod")) {
  customElements.define('card-mod', CardMod);
  const pjson = require('../package.json');
  console.info(`%cCARD-MOD ${pjson.version} IS INSTALLED`,
  "color: green; font-weight: bold",
  "");
}
