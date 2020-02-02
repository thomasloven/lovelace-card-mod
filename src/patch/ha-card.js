import {fireEvent} from "card-tools/src/event.js";
import "../card-mod";

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
    if(!config) return;

    let entity_ids = config.entity_ids;

    if(config.class)
      this.classList.add(config.class);
    if(config.type)
      this.classList.add(`type-${config.type.replace(":","-")}`);

    const cardMod = this.querySelector("card-mod") || document.createElement("card-mod");
    cardMod.type = "card";
    cardMod.template = {
      template: config.style,
      variables: {config},
      entity_ids
    };
    this.appendChild(cardMod);

  }

  fireEvent('ll-rebuild', {});
});
