import {html, css} from "/card-tools/lit-element.js";
import {fireEvent} from "/card-tools/event.js";
import {parseTemplate} from "/card-tools/templates.js";

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

  const applyStyle = function(root, style, debug) {

    const debugPrint = function(str){
      if(!debug) return;
      if(typeof str === "string")
        console.log(' '.repeat(2*(debug-1)) + str);
      else
        console.log(str);
    }

    if(!root || !style) return;

    if(typeof style === "string") {
      // Remove old styles if we're updating
      if(root.querySelector(".card-mod-style"))
        root.removeChild(root.querySelector(".card-mod-style"));

      // Add new style tag to the root element
      const styleEl = document.createElement('style');
      styleEl.classList = "card-mod-style";
      styleEl.innerHTML = parseTemplate(style);
      root.appendChild(styleEl);
      if(debug) {
        debugPrint("Applied styles to:")
        console.log(root);
      }
    } else {
      Object.keys(style).forEach((k) => {
        if(k === ".") {
          debugPrint(`Stepping into root of ${root.tagName}`)
          return applyStyle(root, style[k], debug?debug+1:0);
        } else if(k === "$") {
          debugPrint(`Stepping into ShadowRoot of ${root.tagName}`)
          return applyStyle(root.shadowRoot, style[k], debug?debug+1:0);
        } else {
          debugPrint(`Searching for: "${k}". ${root.querySelectorAll(k).length} matches.`);
          root.querySelectorAll(`${k}`).forEach((el) => {
            debugPrint(`Stepping into ${el.tagName}`)
            applyStyle(el, style[k], debug?debug+1:0);
          });
          return;
        }
      });
    }
  }

  HaCard.prototype.updated = function(_) {
    // Apply styles after updates, if specified
    const config = findConfig(this);
    if(config && config.style) {
      if(config.debug_cardmod)
        console.log("--- APPLYING STYLES START ---");
      applyStyle(this, config.style, config.debug_cardmod ? 1 : 0);
      if(config.debug_cardmod)
        console.log("--- APPLYING STYLES END ---");
    }
  }

  HaCard.prototype.firstUpdated = function() {
    // Move the header inside the slot instead of in the shadowDOM
    // makes it easier to style it consistently
    const header = this.shadowRoot.querySelector(".card-header");
    if(header)
    {
      this.insertBefore(header, this.children[0]);
    }
    // Listen for changes to hass or the location and update
    document.querySelector("home-assistant").provideHass(this);
    window.addEventListener("location-changed", () => this._requestUpdate());
  }
  Object.defineProperty(HaCard.prototype, 'hass', {
    get() {
      return this._hass;
    },
    set(value) {
      if(value !== this._hass) {
        const oldval = this._hass;
        this._hass = value;
        this._requestUpdate('hass', oldval);
      }
    },
  });

  fireEvent('ll-rebuild', {});
});
