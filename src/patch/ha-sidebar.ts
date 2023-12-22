import { patch_element } from "../helpers/patch_function";
import { ModdedElement, apply_card_mod } from "../helpers/card_mod";

/*
Patch ha-sidebar for theme styling

There is no style passed to apply_card_mod here, everything comes only from themes.

An earlier version of card-mod would also re-run firstUpdated of any existing element after patching.
This shouldn't be necessary if card-mod is loaded as a module.
*/

@patch_element("ha-sidebar")
class SidebarPatch extends ModdedElement {
  // @ts-ignore
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "sidebar");
  }
}
