import { LitElement } from "lit";
import { patch_element, patch_object } from "../helpers/patch_function";

class ConfigElementPatch extends LitElement {
  _cardModData?;

  setConfig(_orig, config, ...rest) {
    // Save card_mod config
    this._cardModData = {
      card: config.card_mod,
      entities: [],
    };
    
    // Temporarily remove top-level card_mod
    const topLevelCardMod = config.card_mod;
    delete config.card_mod;

    // Save card_mod config for individual entities
    if (Array.isArray(config.entities)) {
      for (const [i, e] of config.entities?.entries?.()) {
        this._cardModData.entities[i] = e.card_mod;
        delete e.card_mod;
      }
    }

    // Call original function with modified config
    _orig(config, ...rest);

    // Restore card_mod configurations
    if (topLevelCardMod) {
      config.card_mod = topLevelCardMod;
    }

    // Restore card_mod config for entities
    if (Array.isArray(config.entities)) {
      for (const [i, e] of config.entities?.entries?.()) {
        if (this._cardModData?.entities[i]) {
          e.card_mod = this._cardModData.entities[i];
        }
      }
    }
  }
}

@patch_element("hui-card-element-editor")
class HuiCardElementEditorPatch extends LitElement {
  _configElement?: ConfigElementPatch;

  async getConfigElement(_orig, ...args) {
    const retval = await _orig(...args);

    patch_object(retval, ConfigElementPatch);

    return retval;
  }

  _handleUIConfigChanged(_orig, ev, ...rest) {
    const cmData = this._configElement?._cardModData;
    if (cmData) {
      ev.detail.config.card_mod = cmData.card;
    }

    _orig(ev, ...rest);
  }
}

@patch_element("hui-dialog-edit-card")
class HuiDialogEditCardPatch extends LitElement {
  _cardModIcon?;
  _cardConfig?;

  updated(_orig, ...args) {
    _orig?.(...args);
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
      (Array.isArray(this._cardConfig?.entities) &&
        this._cardConfig?.entities?.some?.((e: any) => e.card_mod))
    ) {
      this._cardModIcon.style.visibility = "visible";
    } else {
      this._cardModIcon.style.visibility = "hidden";
    }
  }
}
