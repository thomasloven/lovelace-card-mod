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

    if (config?.card_mod?.class) this.classList.add(config.card_mod.class);
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
        pn.setConfig = function (config: any) {
          _setConfig.bind(this)(config);
          cardMod.variables = { config };
          cardMod.styles = config.card_mod || {};
        };
        pn.setConfig.cm_patched = true;
      }

      if (pn.update && !pn.update.cm_patched) {
        const _update = pn.update;
        pn.update = function (changedProperties: any) {
          _update.bind(this)(changedProperties);
          this.updateComplete.then(() => {
            cardMod.refresh();
          });
        };
        pn.update.cm_patched = true;
      }

      // Try to catch even very slowly loading cards
      window.setTimeout(() => cardMod.refresh(), 100);
      window.setTimeout(() => cardMod.refresh(), 500);
      window.setTimeout(() => cardMod.refresh(), 1000);
    });
  };
});
