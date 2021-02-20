import { LitElement, html } from "card-tools/src/lit-element";
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
    let style = this._config.card_mod || this._config.style;

    if (style === undefined) {
      style = NO_STYLE;
    } else if (typeof style === "string") {
      style = NO_STYLE + style;
    } else if (style["."]) {
      style["."] = NO_STYLE + style["."];
    } else {
      style["."] = NO_STYLE;
    }

    this._config.card_mod = style;

    this.card = createCard(config.card);
    this.card.hass = hass();
  }

  render() {
    return html` <ha-card modcard> ${this.card} </ha-card> `;
  }

  set hass(hass) {
    if (!this.card) return;
    this.card.hass = hass;
  }

  getCardSize() {
    if (this._config.report_size) return this._config.report_size;
    let ret = this.shadowRoot;
    if (ret) ret = ret.querySelector("ha-card card-maker");
    if (ret) ret = ret.getCardSize;
    if (ret) ret = ret();
    if (ret) return ret;
    return 1;
  }
}

customElements.define("mod-card", ModCard);
