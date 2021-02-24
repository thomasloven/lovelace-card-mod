import { fireEvent } from "card-tools/src/event.js";
import { applyToElement, findConfig } from "../helpers";

customElements.whenDefined("ha-card").then(() => {
  const HaCard = customElements.get("ha-card");
  if (HaCard.prototype.cardmod_patched) return;
  HaCard.prototype.cardmod_patched = true;

  const _firstUpdated = HaCard.prototype.firstUpdated;
  HaCard.prototype.firstUpdated = function (changedProperties) {
    _firstUpdated?.bind(this)(changedProperties);

    // Move the header inside the slot instead of in the shadowDOM
    // This makes it easier to style it consistently
    const header = this.shadowRoot.querySelector(".card-header");
    if (header) {
      this.insertBefore(header, this.children[0]);
    }

    const config = findConfig(this);

    if (config?.class) this.classList.add(config.class);
    if (config?.type)
      this.classList.add(`type-${config.type.replace(":", "-")}`);

    applyToElement(
      this,
      "card",
      config?.card_mod || config?.style || "",
      { config },
      null,
      false
    ).then((cardMod) => {
      if (this.parentNode?.host?.setConfig) {
        // Patch the setConfig function to get live updates in GUI editor
        const _setConfig = this.parentNode.host.setConfig;
        this.parentNode.host.setConfig = function (config: any) {
          _setConfig.bind(this)(config);
          if (config.card_mod) {
            cardMod.variables = { config };
            cardMod.styles = config.card_mod;
          }
        };
      }
    });
  };

  fireEvent("ll-rebuild", {});
});
