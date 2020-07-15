import {fireEvent} from "card-tools/src/event.js";
import { applyToElement } from "../card-mod";

customElements.whenDefined('hui-entities-card').then(() => {
  const EntitiesCard = customElements.get('hui-entities-card');

  const oldRenderEntity = EntitiesCard.prototype.renderEntity;
  EntitiesCard.prototype.renderEntity = function(config) {

    const retval = oldRenderEntity.bind(this)(config);

    if(!config) return retval;
    if(!retval || !retval.values) return retval;
    const row = retval.values[0];
    if(!row) return retval;

    let entity_ids = config.entity_ids;

    const apply = () => applyToElement(row, "row", config.style, {config}, config.entity_ids);

    apply();
    if(retval.values[0])
      retval.values[0].addEventListener("ll-rebuild", apply);
    return retval;
    window.addEventListener("location-changed", apply);
  }

  fireEvent('ll-rebuild', {});
});
