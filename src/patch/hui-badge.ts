import { patch_element, patch_object } from "../helpers/patch_function";

import { apply_card_mod } from "../helpers/apply_card_mod";
import { ModdedElement } from "../helpers/apply_card_mod";

const EXCLUDED_BADGES = [
  "entity-filter",
];

@patch_element("hui-badge")
class HuiBadgePatch extends ModdedElement {
  _element: ModdedElement;
  config;

  async _add_card_mod() {
    if (!this._element) return;
    if (EXCLUDED_BADGES.includes(this.config?.type?.toLowerCase())) return;
    
    const cls = `type-${this.config?.type?.replace?.(":", "-")}`;

    await apply_card_mod(
      this._element,
      "badge",
      this.config.card_mod,
      { config: this.config },
      true,
      cls
    );
    this._cardMod = this._element._cardMod;
  }

  _loadElement(_orig, ...args) {
    _orig?.(...args);
    this._add_card_mod();
  }

  _updateElement(_orig, ...args) {
    _orig?.(...args);
    this._add_card_mod();
  }
}
