import { patch_element } from "../helpers/patch_function";
import { ModdedElement, apply_card_mod } from "../helpers/apply_card_mod";
import { LitElement } from "lit";

/*
Patch ha-config-* for theme styling

There is no style passed to apply_card_mod here, everything comes only from themes.

This will only work if card-mod loaded as a Frontend module.
*/

@patch_element("ha-panel-developer-tools")
class HaPanelDeveloperToolsPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "developer-tools");
  }
}