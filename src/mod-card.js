import { LitElement, html, css} from "card-tools/src/lit-element";
import "card-tools/src/card-maker";

const NO_STYLE = `
ha-card {
  background: none;
  box-shadow: none;
}`;

class ModCard extends LitElement {

    setConfig(config) {
        this._config = config;
        if(!config.style === undefined)
        {
          this._config.style = NO_STYLE;
        } else if (typeof(config.style) === "string") {
          this._config.style = NO_STYLE + config.style;
        } else if (config.style["."]) {
          this._config.style["."] = NO_STYLE + config.style["."];
        } else {
          this._config.style["."] = NO_STYLE;
        }

    }

    render() {
        return html`
          <ha-card modcard>
          <card-maker
            .config=${this._config.card}
            .hass=${this.hass}
          ></card-maker>
          </ha-card>
        `;
    }
}

customElements.define("mod-card", ModCard);