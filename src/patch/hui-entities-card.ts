import { applyToElement } from "../helpers";

customElements.whenDefined("hui-entities-card").then(() => {
  const EntitiesCard = customElements.get("hui-entities-card");
  if (EntitiesCard.prototype.cardmod_patched) return;
  EntitiesCard.prototype.cardmod_patched = true;

  const _renderEntity = EntitiesCard.prototype.renderEntity;
  EntitiesCard.prototype.renderEntity = function (config) {
    const retval = _renderEntity.bind(this)(config);

    if (!retval || !retval.values) return retval;
    const row = retval.values[0];
    if (!row) return retval;

    if (config?.card_mod?.class) row.classList.add(config.card_mod.class);
    if (config?.type)
      row.classList.add(`type-${config.type.replace(":", "-")}`);

    const apply = () =>
      applyToElement(
        row,
        "row",
        config?.card_mod?.style || config?.style || "",
        { config }
      );

    this.updateComplete.then(() => apply());
    if (retval.values[0])
      retval.values[0].addEventListener("ll-rebuild", apply);
    return retval;
  };
});
