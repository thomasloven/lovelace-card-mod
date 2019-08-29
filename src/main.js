import {html, css} from "/card-tools/lit-element.js";
import {fireEvent} from "/card-tools/event.js";
import {subscribeRenderTemplate} from "/card-tools/templates.js";

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
    this._data = data;
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

customElements.define("card-mod", CardMod);


const applyStyle = async function(root, style, params, debug) {

  const debugPrint = function(str){
    if(!debug) return;
    if(typeof str === "string")
      console.log(' '.repeat(2*(debug-1)) + str);
    else
      console.log(str);
  }

  if(!root || !style) return;

  if(root.updateComplete)
    await root.updateComplete;

  if(typeof style === "string") {
    const oldStyleEl = root.querySelector("card-mod");
    if(oldStyleEl) {
      oldStyleEl.update();
      return;
    }

    // Add new style tag to the root element
    const styleEl = document.createElement('card-mod');
    styleEl.template = {
      template: style,
      variables: params.variables,
      entity_ids: params.entity_ids,
    };
    root.appendChild(styleEl);
    debugPrint("Applied styles to:");
    debugPrint(root);
  } else {
    Object.keys(style).forEach((k) => {
      if(k === ".") {
        debugPrint(`Stepping into root of ${root.tagName}`)
        return applyStyle(root, style[k], params, debug?debug+1:0);
      } else if(k === "$") {
        debugPrint(`Stepping into ShadowRoot of ${root.tagName}`)
        return applyStyle(root.shadowRoot, style[k], params, debug?debug+1:0);
      } else {
        debugPrint(`Searching for: "${k}". ${root.querySelectorAll(k).length} matches.`);
        root.querySelectorAll(`${k}`).forEach((el) => {
          debugPrint(`Stepping into ${el.tagName}`)
          applyStyle(el, style[k], params, debug?debug+1:0);
        });
        return;
      }
    });
  }
}


customElements.whenDefined('ha-card').then(() => {
  const HaCard = customElements.get('ha-card');

  const findConfig = function(node) {
    if(node.config)
      return node.config;
    if(node._config)
      return node._config;
    if(node.host)
      return findConfig(node.host);
    if(node.parentElement)
      return findConfig(node.parentElement);
    if(node.parentNode)
      return findConfig(node.parentNode);
    return null;
  };


  HaCard.prototype.firstUpdated = function() {
    // Move the header inside the slot instead of in the shadowDOM
    // makes it easier to style it consistently
    const header = this.shadowRoot.querySelector(".card-header");
    if(header)
    {
      this.insertBefore(header, this.children[0]);
    }

    const config = findConfig(this);
    if(!config || !config.style) return;

    let entity_ids = config.entity_ids;

    const apply = () => {
      applyStyle(this, config.style, {
          variables: {config},
          entity_ids
        }, !!config.debug_cardmod);
    }

    apply();
    window.addEventListener("location-changed", () => apply());
  }

  fireEvent('ll-rebuild', {});
});


customElements.whenDefined('hui-entities-card').then(() => {
  const EntitiesCard = customElements.get('hui-entities-card');

  const oldRenderEntity = EntitiesCard.prototype.renderEntity;
  EntitiesCard.prototype.renderEntity = function(config) {

    const retval = oldRenderEntity.bind(this)(config);

    if(!config.style) return retval;
    if(!retval.values) return retval;
    const row = retval.values[0];
    if(!row || !row.updateComplete) return retval;

    let entity_ids = config.entity_ids;

    const apply = () => {
      applyStyle(row.shadowRoot, config.style, {
          variables: {config},
          entity_ids
        }, !!config.debug_cardmod);
    }

    row.updateComplete.then(apply);
    window.addEventListener("location-changed", apply);
    return retval;
  }
  fireEvent('ll-rebuild', {});
});


customElements.whenDefined('hui-glance-card').then(() => {
  const GlanceCard = customElements.get('hui-glance-card');

  GlanceCard.prototype.firstUpdated = function () {
    const entities = this.shadowRoot.querySelectorAll("ha-card div.entity");
    entities.forEach((e) => {
      const root = e.attachShadow({mode: "open"});
      [...e.children].forEach((el) => root.appendChild(el));
      const styletag = document.createElement("style");
      root.appendChild(styletag);
      styletag.innerHTML = `
      :host {
        box-sizing: border-box;
        padding: 0 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        margin-bottom: 12px;
        width: var(--glance-column-width, 20%);
      }
      div {
        width: 100%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .name {
        min-height: var(--paper-font-body1_-_line-height, 20px);
      }
      state-badge {
        margin: 8px 0;
      }
      `;

      const config = e.entityConf;
      if(!config.style) return;
      let entity_ids = config.entity_ids;

      const apply = () => {
        applyStyle(root, config.style, {
            variables: {config},
            entity_ids
          }, !!config.debug_cardmod);
      }

      apply();
      window.addEventListener("location-changed", apply);
    });
  }

  fireEvent('ll-rebuild', {});
});
