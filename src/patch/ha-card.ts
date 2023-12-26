import { patch_element, patch_object } from "../helpers/patch_function";
import { apply_card_mod } from "../helpers/apply_card_mod";
import { ModdedElement } from "../helpers/apply_card_mod";

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

interface LovelaceCard extends Node {
  config?: any;
  _config?: any;
  host?: LovelaceCard;
}

export function findConfig(node: LovelaceCard) {
  if (node.config) return node.config;
  if (node._config) return node._config;
  if (node.host) return findConfig(node.host);
  if (node.parentElement) return findConfig(node.parentElement);
  if (node.parentNode) return findConfig(node.parentNode);
  return null;
}
