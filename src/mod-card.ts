import { property } from "lit/decorators.js";
import { LitElement, html } from "lit";

const NO_STYLE = `
ha-card {
  background: none;
  box-shadow: none;
  border: none;
  transition: none;
}`;

class ModCard extends LitElement {
  _config?: any;
  _hass?: any;
  _hassResolve?: any;

  @property() card: any;

  setConfig(config: any) {
    this._config = JSON.parse(JSON.stringify(config));
    let style = this._config.card_mod?.style || this._config.style;

    if (style === undefined) {
      style = NO_STYLE;
    } else if (typeof style === "string") {
      style = NO_STYLE + style;
    } else if (style["."]) {
      style["."] = NO_STYLE + style["."];
    } else {
      style["."] = NO_STYLE;
    }

    this._config.card_mod = { style };

    this.build_card(config.card);
  }

  async build_card(config) {
    if (this._hass === undefined)
      await new Promise((resolve) => (this._hassResolve = resolve));
    this._hassResolve = undefined;
    const helpers = await (window as any).loadCardHelpers();
    this.card = await helpers.createCardElement(config);
    this.card.hass = this._hass;
  }

  firstUpdated() {
    window.setTimeout(() => {
      if (this.card?.shadowRoot?.querySelector("ha-card")) {
        console.info(
          "%cYou are doing it wrong!",
          "color: red; font-weight: bold"
        );
        let cardName = this.card.localName.replace(/hui-(.*)-card/, "$1");

        console.info(
          `mod-card should NEVER be used with a card that already has a ha-card element, such as ${cardName}`
        );
      }
    }, 3000);
  }

  set hass(hass) {
    this._hass = hass;
    if (this.card) this.card.hass = hass;
    if (this._hassResolve) this._hassResolve();
  }

  render() {
    return html` <ha-card modcard> ${this.card} </ha-card> `;
  }

  getCardSize() {
    if (this._config.report_size) return this._config.report_size;
    let ret: any = this.shadowRoot;
    if (ret) ret = ret.querySelector("ha-card card-maker");
    if (ret) ret = ret.getCardSize;
    if (ret) ret = ret();
    if (ret) return ret;
    return 1;
  }
}

(async () => {
  // See explanation in card-mod.ts
  while (customElements.get("home-assistant") === undefined)
    await new Promise((resolve) => window.setTimeout(resolve, 100));

  if (!customElements.get("mod-card")) {
    customElements.define("mod-card", ModCard);
  }
})();
