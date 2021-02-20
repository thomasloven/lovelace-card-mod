import { fireEvent } from "card-tools/src/event.js";
import { applyToElement } from "../card-mod";

interface LovelaceCard extends Node {
  config?: any;
  _config?: any;
  host?: LovelaceCard;
}

customElements.whenDefined("ha-card").then(() => {
  const HaCard = customElements.get("ha-card");
  if (HaCard.prototype.cardmod_patched) return;
  HaCard.prototype.cardmod_patched = true;

  const findConfig = function (node: LovelaceCard) {
    if (node.config) return node.config;
    if (node._config) return node._config;
    if (node.host) return findConfig(node.host);
    if (node.parentElement) return findConfig(node.parentElement);
    if (node.parentNode) return findConfig(node.parentNode);
    return null;
  };

  const oldFirstUpdated = HaCard.prototype.firstUpdated;
  HaCard.prototype.firstUpdated = function (changedProperties) {
    if (oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);
    // Move the header inside the slot instead of in the shadowDOM
    // makes it easier to style it consistently
    const header = this.shadowRoot.querySelector(".card-header");
    if (header) {
      this.insertBefore(header, this.children[0]);
    }

    const config = findConfig(this);

    if (!config) return;

    if (config.class) this.classList.add(config.class);
    if (config.type)
      this.classList.add(`type-${config.type.replace(":", "-")}`);

    applyToElement(
      this,
      "card",
      config.card_mod || config.style,
      { config },
      config.entity_ids,
      false
    );
  };

  fireEvent("ll-rebuild", {});
});
