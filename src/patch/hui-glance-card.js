import {fireEvent} from "card-tools/src/event.js";
import "../card-mod";

customElements.whenDefined('hui-glance-card').then(() => {
  const GlanceCard = customElements.get('hui-glance-card');

  GlanceCard.prototype.firstUpdated = function () {
    const entities = this.shadowRoot.querySelectorAll("ha-card div.entity");
    entities.forEach((e) => {
      const root = e.attachShadow({mode: "open"});
      [...e.children].forEach((el) => root.appendChild(el));
      const styletag = document.createElement("style");
      root.appendChild(styletag);
      styletag.innerHTML = `
      :host {
        box-sizing: border-box;
        padding: 0 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        margin-bottom: 12px;
        width: var(--glance-column-width, 20%);
      }
      div {
        width: 100%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .name {
        min-height: var(--paper-font-body1_-_line-height, 20px);
      }
      state-badge {
        margin: 8px 0;
      }
      `;

      const config = e.config || e.entityConf;
      if(!config) return;
      let entity_ids = config.entity_ids;

      if(config.class)
        e.classList.add(config.class);
      if(config.type)
        e.classList.add(`type-${config.type.replace(":","-")}`);

      const cardMod = root.querySelector("card-mod") || document.createElement("card-mod");
      cardMod.type = "glance";
      cardMod.template = {
        template: config.style,
        variables: {config},
        entity_ids
      };
      root.appendChild(cardMod);

    });
  }

  fireEvent('ll-rebuild', {});
});
