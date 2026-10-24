import { LitElement } from "lit";
import { patch_element, patch_object } from "../helpers/patch_function";
import { ConfigElementPatch } from "./hui-config-element-editor";

@patch_element("hui-badge-element-editor")
class HuiBadgeElementEditorPatch extends LitElement {
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

@patch_element("hui-dialog-edit-badge")
class HuiDialogEditBadgePatch extends LitElement {
  _cardModIcon?;
  _badgeConfig?;

  updated(_orig, ...args) {
    _orig?.(...args);
    if (!this._cardModIcon) {
      this._cardModIcon = document.createElement("ha-icon");
      this._cardModIcon.icon = "mdi:brush";
    }

    const button = this.shadowRoot.querySelector(
      "ha-button[slot=secondaryAction]"
    );
    if (!button) return;
    button.appendChild(this._cardModIcon);
    if (
      JSON.stringify(this._badgeConfig)?.includes("card_mod")
    ) {
      this._cardModIcon.style.visibility = "visible";
    } else {
      this._cardModIcon.style.visibility = "hidden";
    }
  }
}
