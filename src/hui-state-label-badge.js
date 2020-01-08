import {fireEvent} from "card-tools/src/event.js";
import {applyStyle} from "./apply-style.js";

customElements.whenDefined('hui-state-label-badge').then(() => {
    const HuiStateLabelBadge = customElements.get('hui-state-label-badge');

    HuiStateLabelBadge.prototype.firstUpdated = function() {
        const config = this._config;
        if(!config || !config.style) return;

        let entity_ids = config.entity_ids;

        const apply = () => {
          applyStyle(this.shadowRoot, config.style, {
              variables: {config},
              entity_ids
            }, !!config.debug_cardmod);
        }

        apply();
        window.addEventListener("location-changed", () => apply());
      }

    fireEvent('ll-rebuild', {});
});