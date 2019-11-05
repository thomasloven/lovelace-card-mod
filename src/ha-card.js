import {fireEvent} from "card-tools/src/event.js";
import {applyStyle} from "./apply-style.js";

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
