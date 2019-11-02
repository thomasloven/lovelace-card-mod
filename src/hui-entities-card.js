import {fireEvent} from "/card-tools/event.js";
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
    window.addEventListener("location-changed", apply);
    return retval;
  }

  EntitiesCard.prototype._handleClick = function(config) {
    const action = config.tap_action && config.tap_action.action ? config.tap_action.action : "more-info";
    switch(action) {
      case "more-info":
        fireEvent("hass-more-info", { entityId: config.entity }, this);
        break;
      case "navigate":
        history.pushState(null, "", config.tap_action.navigation_path);
        fireEvent("location-changed", {}, this);
        break;
      case "url":
        if(config.tap_action.url_path) {
          window.open(config.tap_action.url_path);
        }
        break;
      case "toggle":
        if(config.entity) {
          const domain = config.entity.split(".", 1)[0];
          const isOff = ["closed", "locked", "off"].includes(this._hass.states[config.entity].state)
          const service = ({
            lock: ["unlock", "lock"],
            cover: ["open_cover", "close_cover"]}[domain]
            || ["turn_on", "turn_off"])[isOff?0:1];
          this._hass.callService(domain, service, { entity_id: config.entity });
        }
        break;
      case "call-service": {
        if(!config.tap_action.service) break;
        const [domain, service] = config.tap_action.service.split(".", 2);
        this._hass.callService(domain, service, config.tap_action.service_data);
        break;
      }
    }
  };

  fireEvent('ll-rebuild', {});
});
