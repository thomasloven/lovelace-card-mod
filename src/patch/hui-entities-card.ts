import { applyToElement } from "../helpers";

customElements.whenDefined("hui-entities-card").then(() => {
  const EntitiesCard = customElements.get("hui-entities-card");
  if (EntitiesCard.prototype.cardmod_patched) return;
  EntitiesCard.prototype.cardmod_patched = true;

  const _renderEntity = EntitiesCard.prototype.renderEntity;
  EntitiesCard.prototype.renderEntity = function (config, ...rest) {
    const retval = _renderEntity.bind(this)(config, ...rest);

    if (!retval || !retval.values) return retval;
    const row = retval.values[0];
    if (!row) return retval;
    if (config?.type === "custom:mod-card") return retval;

    if (config?.card_mod?.class) row.classList.add(config.card_mod.class);
    if (config?.type)
      row.classList.add(`type-${config.type.replace(":", "-")}`);

    const apply = async () =>
      applyToElement(
        row,
        "row",
        config?.card_mod?.style || config?.style || "",
        { config }
      );

    (async () => {
      const cardMod = await apply();
      if (row.update && !row.update.cm_patched) {
        const _update = row.update;
        row.update = function (...args) {
          _update.bind(this)(...args);
          if (this.updateComplete)
            this.updateComplete.then(() => {
              cardMod.refresh();
            });
          else cardMod.refresh();
        };
      }
    })();
    this.updateComplete.then(() => apply());
    if (retval.values[0])
      retval.values[0].addEventListener("ll-rebuild", apply);
    return retval;
  };
});
