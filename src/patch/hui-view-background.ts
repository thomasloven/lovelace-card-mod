import { ModdedElement, apply_card_mod } from "../helpers/apply_card_mod";
import { patch_element } from "../helpers/patch_function";

/*
Patch hui-view-background for theme styling

This element was introduced in HA 2024.x to handle view background rendering.
It manages the --view-background CSS variable that controls the dashboard background.

There is no style passed to apply_card_mod here, everything comes only from themes.

*/

@patch_element("hui-view-background")
class HuiViewBackgroundPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "view", undefined, {}, false);
  }
}
