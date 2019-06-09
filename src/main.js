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

  const applyStyle = function(root, style) {
    if(!root || !style) return;

    if(typeof style === "string") {
      // Remove old styles if we're updating
      if(root.querySelector(":scope >.card-mod-style"))
        root.removeChild(root.querySelector(":scope > .card-mod-style"));

      // Add new style tag to the root element
      const styleEl = document.createElement('style');
      styleEl.classList = "card-mod-style";
      styleEl.innerHTML = parseTemplate(style);
      root.appendChild(styleEl);
    } else {
      Object.keys(style).forEach((k) => {
        if(k === ".")
          return applyStyle(root, style[k]);
        else if(k === "$")
          return applyStyle(root.shadowRoot, style[k]);
        else {
          root.querySelectorAll(`:scope > ${k}`).forEach((el) => {
            applyStyle(el, style[k]);
          });
          return;
        }
      });
    }
  }

  HaCard.prototype.updated = function(_) {
    // Apply styles after updates, if specified
    const config = findConfig(this);
    if(config && config.style)
      applyStyle(this, config.style);
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
