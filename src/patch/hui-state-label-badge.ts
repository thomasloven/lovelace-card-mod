import { patch_element } from "../helpers/patch_function";
import { ModdedElement, apply_card_mod } from "../helpers/apply_card_mod";

/*
Patch the hui-state-label-badge to take styles from the config
( those are the optional badges at the top of the view )
*/

@patch_element("hui-state-badge-element")
class StateLabelBadgePatch extends ModdedElement {
  async firstUpdated(_orig, ...args) {
    await _orig?.(...args);

    const config = this["_config"];

    await apply_card_mod(this, "badge", config?.card_mod, { config });
  }
}
