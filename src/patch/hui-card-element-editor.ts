customElements.whenDefined("hui-card-element-editor").then(() => {
  const HuiCardElementEditor = customElements.get("hui-card-element-editor");

  const _getConfigElement = HuiCardElementEditor.prototype.getConfigElement;
  HuiCardElementEditor.prototype.getConfigElement = async function () {
    const retval = await _getConfigElement.bind(this)();

    if (retval) {
      const _setConfig = retval.setConfig;
      retval.setConfig = function (config) {
        const newConfig = JSON.parse(JSON.stringify(config));
        this._cardModData = newConfig.card_mod;
        delete newConfig.card_mod;
        _setConfig.bind(this)(newConfig);
      };
    }
    return retval;
  };

  const __handleUIConfigChanged =
    HuiCardElementEditor.prototype._handleUIConfigChanged;
  HuiCardElementEditor.prototype._handleUIConfigChanged = function (ev) {
    if (this._configElement && this._configElement._cardModData)
      ev.detail.config.card_mod = this._configElement._cardModData;
    __handleUIConfigChanged.bind(this)(ev);
  };
});

customElements.whenDefined("hui-dialog-edit-card").then(() => {
  const HuiDialogEditCard = customElements.get("hui-dialog-edit-card");

  const _updated = HuiDialogEditCard.prototype.updated;
  HuiDialogEditCard.prototype.updated = function (changedProps) {
    _updated.bind(this)(changedProps);
    this.updateComplete.then(async () => {
      if (!this._cardModStar) {
        this._cardModStar = document.createElement("ha-icon");
        this._cardModStar.icon = "mdi:star-four-points-outline";
      }

      const button = this.shadowRoot.querySelector(
        "mwc-button[slot=secondaryAction]"
      );
      if (!button) return;
      if (this._cardConfig?.card_mod) {
        button.appendChild(this._cardModStar);
      } else if (button.contains(this._cardModStar)) {
        button.removeChild(this._cardModStar);
      }
    });
  };
});
