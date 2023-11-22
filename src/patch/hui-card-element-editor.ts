import { CardMod } from "../card-mod";

customElements.whenDefined("hui-card-element-editor").then(() => {
  const HuiCardElementEditor = customElements.get("hui-card-element-editor");
  if (HuiCardElementEditor.prototype.cardmod_patched) return;
  HuiCardElementEditor.prototype.cardmod_patched = true;

  const _getConfigElement = HuiCardElementEditor.prototype.getConfigElement;
  HuiCardElementEditor.prototype.getConfigElement = async function () {
    const retval = await _getConfigElement.bind(this)();

    // Catch and patch the configElement
    if (retval) {
      const _setConfig = retval.setConfig;
      try {
          retval.setConfig = function (config: any, ...rest) {
            // Strip card_mod from the data that's sent to the config element
            // and put it back after the config has been checked
            const newConfig = JSON.parse(JSON.stringify(config));
            this._cardModData = {
              card: newConfig.card_mod,
              entities: [],
            };
            if (newConfig.entities) {
              for (const [i, e] of newConfig.entities?.entries()) {
                this._cardModData.entities[i] = e.card_mod;
                delete e.card_mod;
              }
            }
            delete newConfig.card_mod;

            _setConfig.bind(this)(newConfig, ...rest);
            if (newConfig.entities) {
              for (const [i, e] of newConfig.entities?.entries()) {
                if (this._cardModData.entities[i])
                  e.card_mod = this._cardModData.entities[i];
              }
            }
          };
      } catch (error) {
        console.warn(error);
      }
    }
    return retval;
  };

  const _handleUIConfigChanged =
    HuiCardElementEditor.prototype._handleUIConfigChanged;
  HuiCardElementEditor.prototype._handleUIConfigChanged = function (
    ev,
    ...rest
  ) {
    if (this._configElement && this._configElement._cardModData) {
      const cardMod = this._configElement._cardModData;
      if (cardMod.card) ev.detail.config.card_mod = cardMod.card;
    }
    _handleUIConfigChanged.bind(this)(ev, ...rest);
  };
});

customElements.whenDefined("hui-dialog-edit-card").then(() => {
  const HuiDialogEditCard = customElements.get("hui-dialog-edit-card");
  if (HuiDialogEditCard.prototype.cardmod_patched) return;
  HuiDialogEditCard.prototype.cardmod_patched = true;

  const _updated = HuiDialogEditCard.prototype.updated;
  HuiDialogEditCard.prototype.updated = function (...args) {
    _updated?.bind(this)(...args);
    this.updateComplete.then(async () => {
      if (!this._cardModIcon) {
        this._cardModIcon = document.createElement("ha-icon");
        this._cardModIcon.icon = "mdi:brush";
      }

      const button = this.shadowRoot.querySelector(
        "mwc-button[slot=secondaryAction]"
      );
      if (!button) return;
      button.appendChild(this._cardModIcon);
      if (
        this._cardConfig?.card_mod ||
        this._cardConfig?.entities?.some((e: any) => e.card_mod)
      ) {
        this._cardModIcon.style.visibility = "visible";
      } else {
        this._cardModIcon.style.visibility = "hidden";
      }
    });
  };
});
