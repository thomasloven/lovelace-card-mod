import { LitElement, html} from "card-tools/src/lit-element";
import { createCard } from "card-tools/src/lovelace-element";
import { hass } from "card-tools/src/hass";

const NO_STYLE = `
ha-card {
  background: none;
  box-shadow: none;
}`;

class ModCard extends LitElement {
    static get properties() {
      return {
        hass: {},
      };
    }
    setConfig(config) {
        this._config = JSON.parse(JSON.stringify(config));
        if(config.style === undefined)
        {
          this._config.style = NO_STYLE;
        } else if (typeof(config.style) === "string") {
          this._config.style = NO_STYLE + config.style;
        } else if (config.style["."]) {
          this._config.style["."] = NO_STYLE + config.style["."];
        } else {
          this._config.style["."] = NO_STYLE;
        }

        this.card = createCard(this._config.card);
        this.card.hass = hass();
    }

    render() {
        return html`
          <ha-card modcard>
          ${this.card}
          </ha-card>
        `;
    }

    set hass(hass) {
      if(!this.card) return;
      this.card.hass = hass;
    }

    getCardSize() {
      if(this._config.report_size)
        return this._config.report_size;
      let ret = this.shadowRoot;
      if(ret) ret = ret.querySelector("ha-card card-maker");
      if(ret) ret = ret.getCardSize;
      if(ret) ret = ret();
      if(ret) return ret;
      return 1;
    }
}

customElements.define("mod-card", ModCard);
