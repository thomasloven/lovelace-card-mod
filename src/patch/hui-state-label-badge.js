import {fireEvent} from "card-tools/src/event.js";
import "../card-mod";

customElements.whenDefined('hui-state-label-badge').then(() => {
    const HuiStateLabelBadge = customElements.get('hui-state-label-badge');

    HuiStateLabelBadge.prototype.firstUpdated = function() {
        const config = this._config;
        if(!config) return;

        let entity_ids = config.entity_ids;

        if(config.class)
          this.classList.add(config.class);
        if(config.type)
          this.classList.add(`type-${config.type.replace(":","-")}`);

        const cardMod = this.shadowRoot.querySelector("card-mod") || document.createElement("card-mod");
        cardMod.type = "badge";
        cardMod.template = {
          template: config.style,
          variables: {config},
          entity_ids
        };
        this.shadowRoot.appendChild(cardMod);

      }

    fireEvent('ll-rebuild', {});
});
