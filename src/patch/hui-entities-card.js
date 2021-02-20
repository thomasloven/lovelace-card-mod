import { fireEvent } from "card-tools/src/event.js";
import { applyToElement } from "../card-mod";

customElements.whenDefined("hui-entities-card").then(() => {
  const EntitiesCard = customElements.get("hui-entities-card");
  if (EntitiesCard.prototype.cardmod_patched) return;
  EntitiesCard.prototype.cardmod_patched = true;

  const oldRenderEntity = EntitiesCard.prototype.renderEntity;
  EntitiesCard.prototype.renderEntity = function (config) {
    const retval = oldRenderEntity.bind(this)(config);

    if (!config) return retval;
    if (!retval || !retval.values) return retval;
    const row = retval.values[0];
    if (!row) return retval;

    let entity_ids = config.entity_ids;

    if (config.class) row.classList.add(config.class);

    const apply = () =>
      applyToElement(
        row,
        "row",
        config.card_mod || config.style,
        { config },
        config.entity_ids
      );

    apply();
    if (retval.values[0])
      retval.values[0].addEventListener("ll-rebuild", apply);
    return retval;
  };

  fireEvent("ll-rebuild", {});
});
