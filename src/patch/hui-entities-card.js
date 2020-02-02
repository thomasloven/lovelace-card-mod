import {fireEvent} from "card-tools/src/event.js";
import "../card-mod";

customElements.whenDefined('hui-entities-card').then(() => {
  const EntitiesCard = customElements.get('hui-entities-card');

  const oldRenderEntity = EntitiesCard.prototype.renderEntity;
  EntitiesCard.prototype.renderEntity = function(config) {

    const retval = oldRenderEntity.bind(this)(config);
    if(!config) return retval;
    if(!retval || !retval.values) return retval;
    const row = retval.values[0];
    if(!row || !row.updateComplete) return retval;

    let entity_ids = config.entity_ids;

    if(config.class)
      row.classList.add(config.class);
    if(config.type)
      row.classList.add(`type-${config.type.replace(":","-")}`);

    row.updateComplete.then(() => {
      const cardMod = row.shadowRoot.querySelector("card-mod") || document.createElement("card-mod");
      cardMod.type = "row";
      cardMod.template = {
        template: config.style,
        variables: {config},
        entity_ids
      };
      row.shadowRoot.appendChild(cardMod);

      if(retval.values[0])
        retval.values[0].addEventListener("ll-rebuild", () => cardMod.update());
    });

    return retval;
  }

  fireEvent('ll-rebuild', {});
});
