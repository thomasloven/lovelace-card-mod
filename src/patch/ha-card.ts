import { applyToElement, findConfig } from "../helpers";

customElements.whenDefined("ha-card").then(() => {
  const HaCard = customElements.get("ha-card");
  if (HaCard.prototype.cardmod_patched) return;
  HaCard.prototype.cardmod_patched = true;

  const _firstUpdated = HaCard.prototype.firstUpdated;
  HaCard.prototype.firstUpdated = function (...args) {
    _firstUpdated?.bind(this)(...args);

    const config = findConfig(this);

    if (config?.card_mod?.class)
      this.classList.add(
        ...(Array.isArray(config.card_mod.class)
          ? config.card_mod.class
          : config.card_mod.class.split(" "))
      );
    if (config?.type)
      this.classList.add(`type-${config.type.replace(":", "-")}`);

    applyToElement(
      this,
      "card",
      config?.card_mod?.style || config?.style || "",
      { config },
      null,
      false
    ).then((cardMod) => {
      const pn = this.parentNode?.host;
      if (!pn) return;

      if (pn.setConfig && !pn.setConfig.cm_patched) {
        // Patch the setConfig function to get live updates in GUI editor
        const _setConfig = pn.setConfig;
        try {
            pn.setConfig = function (config: any, ...rest) {
            _setConfig.bind(this)(config, ...rest);
            cardMod.variables = { config };
            cardMod.styles = config.card_mod?.style || {};
            };
            pn.setConfig.cm_patched = true;
        } catch (error) {
          console.warn(error);
        }
      }

      if (pn.update && !pn.update.cm_patched) {
        const _update = pn.update;
        pn.update = function (...args) {
          _update.bind(this)(...args);
          if (this.updateComplete)
            this.updateComplete.then(() => {
              cardMod.refresh();
            });
          else cardMod.refresh();
        };
        pn.update.cm_patched = true;
      }
    });
  };
});
