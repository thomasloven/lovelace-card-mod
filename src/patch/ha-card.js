import {fireEvent} from "card-tools/src/event.js";
import { applyToElement } from "../card-mod";

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
  HaCard.prototype.firstUpdated = function() {
    if(oldFirstUpdated) oldFirstUpdated();
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
  }

  fireEvent('ll-rebuild', {});
});
