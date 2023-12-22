import { ModdedElement, apply_card_mod } from "../helpers/card_mod";
import { patch_element } from "../helpers/patch_function";

/*
Patch hui-view for theme styling

There is no style passed to apply_card_mod here, everything comes only from themes.

*/

@patch_element("hui-view")
class HuiViewPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "view", undefined, {}, false);
  }
}
