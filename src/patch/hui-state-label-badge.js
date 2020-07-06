import {fireEvent} from "card-tools/src/event.js";

customElements.whenDefined('hui-state-label-badge').then(() => {
    const HuiStateLabelBadge = customElements.get('hui-state-label-badge');

    HuiStateLabelBadge.prototype.firstUpdated = function() {
        const config = this._config;
        if(!config || !config.style) return;

        let entity_ids = config.entity_ids;

        const apply = () => {
          this._cardMod = this._cardMod || document.createElement("card-mod");
          this._cardMod.template = {
            template: config.style,
            variables: {config},
            entity_ids: config.entity_ids,
          };
          this.shadowRoot.appendChild(this._cardMod);
        }

        apply();
        window.addEventListener("location-changed", () => apply());
      }

    fireEvent('ll-rebuild', {});
});
