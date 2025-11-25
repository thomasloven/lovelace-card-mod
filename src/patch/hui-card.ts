import { patch_element, patch_object } from "../helpers/patch_function";

import { apply_card_mod } from "../helpers/apply_card_mod";
import { ModdedElement } from "../helpers/apply_card_mod";

const EXCLUDED_CARDS = [
  "conditional",
  "entity-filter",
];
@patch_element("hui-card")
class HuiCardPatch extends ModdedElement {
  _cardMod = [];
  _element: ModdedElement;
  config;

  async _add_card_mod() {
    if (!this._element) return;
    if (EXCLUDED_CARDS.includes(this.config?.type?.toLowerCase())) return;

    const element = this._element as any;
    const config = element?._config || element?.config || this.config;
    const cls = `type-${config?.type?.replace?.(":", "-")}`;

    await apply_card_mod(
      this._element,
      "card",
      config?.card_mod,
      { config },
      true,
      cls
    );
  }

  _loadElement(_orig, ...args) {
    _orig?.(...args);
    this._add_card_mod();
  }
}
