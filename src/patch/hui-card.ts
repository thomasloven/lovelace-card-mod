import { patch_element, patch_object } from "../helpers/patch_function";

import { apply_card_mod } from "../helpers/apply_card_mod";
import { ModdedElement } from "../helpers/apply_card_mod";

@patch_element("hui-card")
class HuiCardPatch extends ModdedElement {
  _cardMod = [];
  _element: ModdedElement;
  config;

  async _add_card_mod() {
    if (!this._element) return;

    const config = (this._element as any)?._config || (this._element as any)?.config || this.config;
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
