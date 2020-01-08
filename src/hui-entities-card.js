import {fireEvent} from "card-tools/src/event.js";
import {applyStyle} from "./apply-style.js";

customElements.whenDefined('hui-entities-card').then(() => {
  const EntitiesCard = customElements.get('hui-entities-card');

  const oldRenderEntity = EntitiesCard.prototype.renderEntity;
  EntitiesCard.prototype.renderEntity = function(config) {

    const retval = oldRenderEntity.bind(this)(config);

    if(!config || !config.style) return retval;
    if(!retval || !retval.values) return retval;
    const row = retval.values[0];
    if(!row || !row.updateComplete) return retval;

    let entity_ids = config.entity_ids;

    const apply = () => {
      applyStyle(row.shadowRoot, config.style, {
          variables: {config},
          entity_ids
        }, !!config.debug_cardmod);
    }

    row.updateComplete.then(apply);
    if(retval.values[0])
      retval.values[0].addEventListener("ll-rebuild", apply);
    window.addEventListener("location-changed", apply);
    return retval;
  }

  fireEvent('ll-rebuild', {});
});
