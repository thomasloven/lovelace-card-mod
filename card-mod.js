const LitElement = customElements.get('home-assistant-main')
  ? Object.getPrototypeOf(customElements.get('home-assistant-main'))
  : Object.getPrototypeOf(customElements.get('hui-view'));

const html = LitElement.prototype.html;

LitElement.prototype.css;

function hass() {
  if(document.querySelector('hc-main'))
    return document.querySelector('hc-main').hass;

  if(document.querySelector('home-assistant'))
    return document.querySelector('home-assistant').hass;

  return undefined;
}function lovelace_view() {
  var root = document.querySelector("hc-main");
  if(root) {
    root = root && root.shadowRoot;
    root = root && root.querySelector("hc-lovelace");
    root = root && root.shadowRoot;
    root = root && root.querySelector("hui-view") || root.querySelector("hui-panel-view");
    return root;
  }

  root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout partial-panel-resolver");
  root = root && root.shadowRoot || root;
  root = root && root.querySelector("ha-panel-lovelace");
  root = root && root.shadowRoot;
  root = root && root.querySelector("hui-root");
  root = root && root.shadowRoot;
  root = root && root.querySelector("ha-app-layout");
  root = root && root.querySelector("#view");
  root = root && root.firstElementChild;
  return root;
}

async function load_lovelace() {
  if(customElements.get("hui-view")) return true;

  await customElements.whenDefined("partial-panel-resolver");
  const ppr = document.createElement("partial-panel-resolver");
  ppr.hass = {panels: [{
    url_path: "tmp",
    "component_name": "lovelace",
  }]};
  ppr._updateRoutes();
  await ppr.routerOptions.routes.tmp.load();
  if(!customElements.get("ha-panel-lovelace")) return false;
  const p = document.createElement("ha-panel-lovelace");
  p.hass = hass();
  if(p.hass === undefined) {
    await new Promise(resolve => {
      window.addEventListener('connection-status', (ev) => {
        console.log(ev);
        resolve();
      }, {once: true});
    });
    p.hass = hass();
  }
  p.panel = {config: {mode: null}};
  p._fetchConfig();
  return true;
}

const ID_STORAGE_KEY = 'lovelace-player-device-id';
function _deviceID() {
  if(!localStorage[ID_STORAGE_KEY])
  {
    const s4 = () => {
      return Math.floor((1+Math.random())*100000).toString(16).substring(1);
    };
    if(window['fully'] && typeof fully.getDeviceId === "function")
      localStorage[ID_STORAGE_KEY] = fully.getDeviceId();
    else
      localStorage[ID_STORAGE_KEY] = `${s4()}${s4()}-${s4()}${s4()}`;
  }
  return localStorage[ID_STORAGE_KEY];
}
let deviceID = _deviceID();

const setDeviceID = (id) => {
  if(id === null) return;
  if(id === "clear") {
    localStorage.removeItem(ID_STORAGE_KEY);
  } else {
    localStorage[ID_STORAGE_KEY] = id;
  }
  deviceID = _deviceID();
};

const params = new URLSearchParams(window.location.search);
if(params.get('deviceID')) {
  setDeviceID(params.get('deviceID'));
}

function hasTemplate(str) {
  if(String(str).includes("{%"))
    return true;
  if(String(str).includes("{{"))
    return true;
}

function subscribeRenderTemplate(conn, onChange, params, stringify=true) {
  // params = {template, entity_ids, variables}
  if(!conn)
    conn = hass().connection;
  let variables = {
    user: hass().user.name,
    browser: deviceID,
    hash: location.hash.substr(1) || ' ',
    ...params.variables,
  };
  let template = params.template;
  let entity_ids = params.entity_ids;

  return conn.subscribeMessage(
    (msg) => {
      if(stringify) {
        let res = String(msg.result);
        // Localize "_(key)" if found in template results
        const localize_function = /_\([^)]*\)/g;
        res = res.replace(localize_function, (key) => hass().localize(key.substring(2, key.length-1)) || key);
        onChange(res);
      } else {
        onChange(msg.result);
      }
    },
    { type: "render_template",
      template,
      variables,
      entity_ids,
    }
  );
}

const _load_yaml2json = async () => {
  if(customElements.get("developer-tools-event")) return;

  await customElements.whenDefined("partial-panel-resolver");
  const ppr = document.createElement('partial-panel-resolver');

  ppr.hass = {panels: [{
    url_path: "tmp",
    component_name: "developer-tools",
  }]};
  ppr._updateRoutes();

  await ppr.routerOptions.routes.tmp.load();

  await customElements.whenDefined("developer-tools-router");
  const dtr = document.createElement("developer-tools-router");
  await dtr.routerOptions.routes.event.load();
};

const yaml2json = async (yaml) => {
  await _load_yaml2json();
  const el = document.createElement("developer-tools-event");
  return el._computeParsedEventData(yaml);
};

async function _selectTree(root, path, all=false) {
  let el = root;
  if(typeof(path) === "string") {
    path = path.split(/(\$| )/);
  }
  if(path[path.length-1] === "")
     path.pop();
  for(const [i, p] of path.entries()) {
    if(!p.trim().length) continue;
    if(!el) return null;
    if(el.localName && el.localName.includes("-"))
      await customElements.whenDefined(el.localName);
    if(el.updateComplete)
      await el.updateComplete;
    if(p === "$")
      if(all && i == path.length-1)
        el = [el.shadowRoot];
      else
        el = el.shadowRoot;
    else
      if(all && i == path.length-1)
        el = el.querySelectorAll(p);
      else
        el = el.querySelector(p);
  }
  return el;
}

async function selectTree(root, path, all=false, timeout=10000) {
  return Promise.race([
    _selectTree(root, path, all),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
  ]).catch((err) => {
    if(!err.message || err.message !== "timeout")
      throw(err);
    return null;
  });
}

var name = "card-mod";
var version = "2.1.0b0";
var description = "";
var scripts = {
	build: "rollup -c",
	watch: "rollup -c --watch",
	"update-card-tools": "npm uninstall card-tools && npm install thomasloven/lovelace-card-tools"
};
var keywords = [
];
var author = "Thomas Lovén";
var license = "MIT";
var devDependencies = {
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^11.2.0",
	rollup: "^2.39.0",
	"rollup-plugin-terser": "^7.0.2",
	"rollup-plugin-typescript2": "^0.30.0",
	typescript: "^4.1.5"
};
var dependencies = {
	"card-tools": "github:thomasloven/lovelace-card-tools"
};
var pjson = {
	name: name,
	"private": true,
	version: version,
	description: description,
	scripts: scripts,
	keywords: keywords,
	author: author,
	license: license,
	devDependencies: devDependencies,
	dependencies: dependencies
};

const EMPTY_TEMPLATE = { template: "", variables: {}, entity_ids: [] };

const applyToElement = async (
  el,
  type,
  template,
  variables,
  entity_ids,
  shadow = true
) => {
  if (el.localName.includes("-"))
    await customElements.whenDefined(el.localName);
  if (el.updateComplete) await el.updateComplete;

  if (el.modElement)
    return applyToElement(
      el.modElement,
      type,
      template,
      variables,
      entity_ids,
      shadow
    );

  el._cardMod = el._cardMod || document.createElement("card-mod");
  const target = shadow ? el.shadowRoot || el : el;
  target.appendChild(el._cardMod);
  if (el.updateComplete) await el.updateComplete;
  el._cardMod.type = type;
  el._cardMod.template = {
    template,
    variables,
    entity_ids,
  };
};

class CardMod extends LitElement {
  static get properties() {
    return {
      _renderedStyles: {},
      _renderer: {},
    };
  }

  static get applyToElement() {
    return applyToElement;
  }

  constructor() {
    super();
    document
      .querySelector("home-assistant")
      .addEventListener("settheme", () => {
        this._setTemplate(this._data);
      });
  }

  connectedCallback() {
    super.connectedCallback();
    this.template = this._data;
    this.setAttribute("slot", "none");
  }

  async getTheme() {
    if (!this.type) return null;
    let el = this.parentElement ? this.parentElement : this;
    const theme = window
      .getComputedStyle(el)
      .getPropertyValue("--card-mod-theme");

    const themes = hass().themes.themes;
    if (!themes[theme]) return null;
    if (themes[theme][`card-mod-${this.type}-yaml`])
      return await yaml2json(themes[theme][`card-mod-${this.type}-yaml`]);
    if (themes[theme][`card-mod-${this.type}`])
      return themes[theme][`card-mod-${this.type}`];
    return null;
  }

  set template(data) {
    if (!data) return;
    this._data = JSON.parse(JSON.stringify(data));

    this.themeApplied = this._setTemplate(this._data);
  }

  async _setTemplate(data) {
    if (!this._parent) {
      data.theme_template = await this.getTheme();
      if (typeof data.template === "string") {
        data.template = { ".": data.template };
      }
      if (typeof data.theme_template === "string") {
        data.theme_template = { ".": data.theme_template };
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
    for (const c of this._styledChildren) {
      c.template = EMPTY_TEMPLATE;
    }
  }

  _mergeDeep(target, source) {
    const isObject = (i) => {
      return i && typeof i === "object" && !Array.isArray(i);
    };
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          if (typeof target[key] === "string")
            target[key] = { ".": target[key] };
          this._mergeDeep(target[key], source[key]);
        } else {
          if (target[key]) target[key] = source[key] + target[key];
          else target[key] = source[key];
        }
      }
    }
    return target;
  }

  async setStyle(data) {
    let { template, theme_template, variables, entity_ids } = data;

    await this.unStyle();

    if (!template) template = {};
    template = JSON.parse(JSON.stringify(template));
    this._mergeDeep(template, theme_template);

    if (typeof template === "string") {
      this._renderedStyles = template;
      if (this._renderer) {
        try {
          await this._renderer();
        } catch (err) {
          if (!err.code || err.code !== "not_found") throw err;
        }
        this._renderer = undefined;
      }

      if (hasTemplate(template)) {
        this._renderer = await subscribeRenderTemplate(
          null,
          (res) => {
            this._renderedStyles = res;
          },
          { template, variables }
        );
      }
      return;
    }

    await this.updateComplete;
    const parent = this.parentElement || this.parentNode;
    if (!parent) return { template: "", variable, entity_ids };
    if (parent.updateComplete) await parent.updateComplete;
    for (const k of Object.keys(template)) {
      let next = [];
      if (k === ".") {
        this.setStyle({ template: template[k], variables, entity_ids });
        continue;
      } else {
        next = await selectTree(parent, k, true);
      }
      if (!next.length) continue;
      for (const el of next) {
        if (!el) continue;
        let styleEl = el.querySelector(":scope > card-mod");
        if (!styleEl || styleEl._parent !== (this._parent || this)) {
          styleEl = document.createElement("card-mod");
          this._styledChildren.add(styleEl);
          styleEl._parent = this._parent || this;
        }
        styleEl.template = { template: template[k], variables, entity_ids };
        el.appendChild(styleEl);
        await styleEl.themeApplied;
      }
    }
  }

  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <style>
        ${this._renderedStyles}
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

function fireEvent(ev, detail, entity=null) {
  ev = new Event(ev, {
    bubbles: true,
    cancelable: false,
    composed: true,
  });
  ev.detail = detail || {};
  if(entity) {
    entity.dispatchEvent(ev);
  } else {
    var root = lovelace_view();
    if (root) root.dispatchEvent(ev);
  }
}

customElements.whenDefined('ha-card').then(() => {
  const HaCard = customElements.get('ha-card');
  if(HaCard.prototype.cardmod_patched) return;
  HaCard.prototype.cardmod_patched = true;

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


  const oldFirstUpdated = HaCard.prototype.firstUpdated;
  HaCard.prototype.firstUpdated = function(changedProperties) {
    if(oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);
    // Move the header inside the slot instead of in the shadowDOM
    // makes it easier to style it consistently
    const header = this.shadowRoot.querySelector(".card-header");
    if(header)
    {
      this.insertBefore(header, this.children[0]);
    }

    const config = findConfig(this);

    if(!config) return;

    if(config.class)
      this.classList.add(config.class);
    if(config.type)
      this.classList.add(`type-${config.type.replace(":","-")}`);

    const apply = () => applyToElement(this, "card", config.style, {config}, config.entity_ids, false);

    apply();
  };

  fireEvent('ll-rebuild', {});
});

customElements.whenDefined('hui-entities-card').then(() => {
  const EntitiesCard = customElements.get('hui-entities-card');
  if(EntitiesCard.prototype.cardmod_patched) return;
  EntitiesCard.prototype.cardmod_patched = true;

  const oldRenderEntity = EntitiesCard.prototype.renderEntity;
  EntitiesCard.prototype.renderEntity = function(config) {

    const retval = oldRenderEntity.bind(this)(config);

    if(!config) return retval;
    if(!retval || !retval.values) return retval;
    const row = retval.values[0];
    if(!row) return retval;

    config.entity_ids;

    if(config.class)
      row.classList.add(config.class);

    const apply = () => applyToElement(row, "row", config.style, {config}, config.entity_ids);

    apply();
    if(retval.values[0])
      retval.values[0].addEventListener("ll-rebuild", apply);
    return retval;
  };

  fireEvent('ll-rebuild', {});
});

customElements.whenDefined('hui-glance-card').then(() => {
  const GlanceCard = customElements.get('hui-glance-card');
  if(GlanceCard.prototype.cardmod_patched) return;
  GlanceCard.prototype.cardmod_patched = true;

  const oldFirstUpdated = GlanceCard.prototype.firstUpdated;
  GlanceCard.prototype.firstUpdated = function (changedProperties) {
    if(oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);
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

      const config = e.config || e.entityConf;
      if(!config) return;
      config.entity_ids;

      if(config.class)
        e.classList.add(config.class);

      const apply = () => applyToElement(e, "glance", config.style, {config}, config.entity_ids);

      apply();
    });
  };

  fireEvent('ll-rebuild', {});
});

customElements.whenDefined('hui-state-label-badge').then(() => {
    const HuiStateLabelBadge = customElements.get('hui-state-label-badge');
    if(HuiStateLabelBadge.prototype.cardmod_patched) return;
    HuiStateLabelBadge.prototype.cardmod_patched = true;

    const oldFirstUpdated = HuiStateLabelBadge.prototype.firstUpdated;
    HuiStateLabelBadge.prototype.firstUpdated = function(changedProperties) {
      if(oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);
      const config = this._config;
      if(!config) return;

      config.entity_ids;

      if(config.class)
        this.classList.add(config.class);

      const apply = () => applyToElement(this, "badge", config.style, {config}, config.entity_ids);

      apply();
    };

  fireEvent('ll-rebuild', {});
});

customElements.whenDefined("hui-view").then(() => {
  const huiView = customElements.get("hui-view");
  if(huiView.prototype.cardmod_patched) return;
  huiView.prototype.cardmod_patched = true;

  const oldFirstUpdated = huiView.prototype.firstUpdated;
  huiView.prototype.firstUpdated = function(changedProperties) {
    if(oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);
    const apply = () => applyToElement(this, "view", "", {}, []);

    apply();
  };

  fireEvent("ll-rebuild", {});

});

customElements.whenDefined("hui-root").then(() => {
  const huiRoot = customElements.get("hui-root");
  if(huiRoot.prototype.cardmod_patched) return;
  huiRoot.prototype.cardmod_patched = true;

  const oldFirstUpdated = huiRoot.prototype.firstUpdated;
  huiRoot.prototype.firstUpdated = async function(changedProperties) {
    if(oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);
    const apply = () => {applyToElement(this, "root", "", {}, []);};

    apply();
  };

  fireEvent("ll-rebuild", {});
  let root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout partial-panel-resolver");

  root = root && root.querySelector("ha-panel-lovelace");
  root = root && root.shadowRoot;
  root = root && root.querySelector("hui-root");
  if(root)
    root.firstUpdated();

});

customElements.whenDefined("ha-more-info-dialog").then(() => {

  const HaMoreInfoDialog = customElements.get("ha-more-info-dialog");
  if(HaMoreInfoDialog.prototype.cardmod_patched) return;
  HaMoreInfoDialog.prototype.cardmod_patched = true;

  const oldShowDialog = HaMoreInfoDialog.prototype.showDialog;
  HaMoreInfoDialog.prototype.showDialog = function(params) {
    const apply = () => {applyToElement(this.shadowRoot.querySelector("ha-dialog"), "more-info", "", {config: params}, [params.entityId], false);};

    oldShowDialog.bind(this)(params);

    this.requestUpdate().then( async() => {
      await this.shadowRoot.querySelector("ha-dialog").updateComplete;
      apply();

    });
  };

    let root = document.querySelector("home-assistant");
    root = root && root.shadowRoot;
    root = root && root.querySelector("ha-more-info-dialog");

    if(root) {
      root.showDialog = HaMoreInfoDialog.prototype.showDialog.bind(root);
      root.showDialog({entityId: root.entityId});
    }
});

const CUSTOM_TYPE_PREFIX = "custom:";

let helpers = window.cardHelpers;
const helperPromise = new Promise(async (resolve, reject) => {
  if(helpers) resolve();

  const updateHelpers = async () => {
    helpers = await window.loadCardHelpers();
    window.cardHelpers = helpers;
    resolve();
  };

  if(window.loadCardHelpers) {
    updateHelpers();
  } else {
    // If loadCardHelpers didn't exist, force load lovelace and try once more.
    window.addEventListener("load", async () => {
      load_lovelace();
      if(window.loadCardHelpers) {
        updateHelpers();
      }
    });
  }
});

function errorElement(error, origConfig) {
  const cfg = {
    type: "error",
    error,
    origConfig,
  };
  const el = document.createElement("hui-error-card");
  customElements.whenDefined("hui-error-card").then(() => {
    const newel = document.createElement("hui-error-card");
    newel.setConfig(cfg);
    if(el.parentElement)
      el.parentElement.replaceChild(newel, el);
  });
  helperPromise.then(() => {
    fireEvent("ll-rebuild", {}, el);
  });
  return el;
}

function _createElement(tag, config) {
  let el = document.createElement(tag);
  try {
    el.setConfig(JSON.parse(JSON.stringify(config)));
  } catch (err) {
    el = errorElement(err, config);
  }
  helperPromise.then(() => {
    fireEvent("ll-rebuild", {}, el);
  });
  return el;
}

function createLovelaceElement(thing, config) {
  if(!config || typeof config !== "object" || !config.type)
    return errorElement(`No ${thing} type configured`, config);

  let tag = config.type;
  if(tag.startsWith(CUSTOM_TYPE_PREFIX))
    tag = tag.substr(CUSTOM_TYPE_PREFIX.length);
  else
    tag = `hui-${tag}-${thing}`;

  if(customElements.get(tag))
    return _createElement(tag, config);

  const el = errorElement(`Custom element doesn't exist: ${tag}.`, config);
  el.style.display = "None";

  const timer = setTimeout(() => {
    el.style.display = "";
  }, 2000);

  customElements.whenDefined(tag).then(() => {
    clearTimeout(timer);
    fireEvent("ll-rebuild", {}, el);
  });

  return el;
}

function createCard(config) {
  if(helpers) return helpers.createCardElement(config);
  return createLovelaceElement('card', config);
}

const NO_STYLE = `
ha-card {
  background: none;
  box-shadow: none;
}`;

class ModCard extends LitElement {
    static get properties() {
      return {
        hass: {},
      };
    }
    setConfig(config) {
        this._config = JSON.parse(JSON.stringify(config));
        if(config.style === undefined)
        {
          this._config.style = NO_STYLE;
        } else if (typeof(config.style) === "string") {
          this._config.style = NO_STYLE + config.style;
        } else if (config.style["."]) {
          this._config.style["."] = NO_STYLE + config.style["."];
        } else {
          this._config.style["."] = NO_STYLE;
        }

        this.card = createCard(this._config.card);
        this.card.hass = hass();
    }

    render() {
        return html`
          <ha-card modcard>
          ${this.card}
          </ha-card>
        `;
    }

    set hass(hass) {
      if(!this.card) return;
      this.card.hass = hass;
    }

    getCardSize() {
      if(this._config.report_size)
        return this._config.report_size;
      let ret = this.shadowRoot;
      if(ret) ret = ret.querySelector("ha-card card-maker");
      if(ret) ret = ret.getCardSize;
      if(ret) ret = ret();
      if(ret) return ret;
      return 1;
    }
}

customElements.define("mod-card", ModCard);
