import { applyToElement } from "../helpers";

customElements.whenDefined("hui-picture-elements-card").then(() => {
  const HuiPictureElementsCard = customElements.get(
    "hui-picture-elements-card"
  );
  if (HuiPictureElementsCard.prototype.cardmod_patched) return;
  HuiPictureElementsCard.prototype.cardmod_patched = true;

  const _setConfig = HuiPictureElementsCard.prototype.setConfig;
  HuiPictureElementsCard.prototype.setConfig = function (...args) {
    _setConfig?.bind(this)(...args);

    for (const [i, el] of this._elements.entries()) {
      const config = this._config.elements[i];
      if (config?.card_mod?.class)
        el.classList.add(
          ...(Array.isArray(config.card_mod.class)
            ? config.card_mod.class
            : config.card_mod.class.split(" "))
        );
      if (config?.type)
        el.classList.add(`type-${config.type.replace(":", "-")}`);
      applyToElement(el, "element", config?.card_mod?.style, { config });
    }
  };
});
