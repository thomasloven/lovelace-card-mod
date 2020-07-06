import { LitElement, html } from "card-tools/src/lit-element";
import { subscribeRenderTemplate, hasTemplate } from "card-tools/src/templates";

const EMPTY_TEMPLATE = {template: "", variables: {}, entity_ids: []};

class CardMod extends LitElement {

  static get properties() {
    return {
      _renderedStyles: {},
      _renderer: {},
    }
  }

  set template(data) {
    const _data = JSON.parse(JSON.stringify(data));

    if(JSON.stringify(_data.template).includes("config.entity") && !_data.entity_ids) {
      if(_data.variables.config && _data.variables.config.entity)
        _data.entity_ids = [_data.variables.config.entity]
    }

    this.setStyle(_data);
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
      if(hasTemplate(template)) {
        if(this._renderer) {
          await this._renderer();
          this._renderer = undefined;
        }

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
