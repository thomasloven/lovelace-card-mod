import { findConfig } from "../helpers";
import { patch_element, patch_object } from "../helpers/patch_function";
import { apply_card_mod } from "../helpers/card_mod";
import { ModdedElement } from "../helpers/card_mod";

/*
Patch the ha-card element to on first update:
- try to find the config parameter of it's parent element
- Apply card_mod styles according to that config
*/

@patch_element("ha-card")
class HaCardPatch extends ModdedElement {
  _cardMod = [];
  async firstUpdated(_orig, ...args) {
    await _orig?.(...args);

    const config = findConfig(this);

    const cls = `type-${config?.type?.replace?.(":", "-")}`;
    await apply_card_mod(
      this,
      "card",
      config?.card_mod,
      { config },
      false,
      cls
    );

    const parent = (this.parentNode as any)?.host;
    if (!parent) return;

    patch_object(parent, ModdedElement);
    parent._cardMod = this._cardMod;
  }
}
