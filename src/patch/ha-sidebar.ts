import { patch_element } from "../helpers/patch_function";
import { ModdedElement, apply_card_mod } from "../helpers/apply_card_mod";
import { selectTree } from "../helpers/selecttree";

/*
Patch ha-sidebar for theme styling

There is no style passed to apply_card_mod here, everything comes only from themes.

An earlier version of card-mod would also re-run firstUpdated of any existing element after patching.
This shouldn't be necessary if card-mod is loaded as a module.
*/

// ha-sidebar may have been used before the patch was applied
const apply = () => {
  selectTree(
    document,
    "home-assistant$home-assistant-main$ha-sidebar",
    false
  ).then((root) => root?.firstUpdated());
};

@patch_element("ha-sidebar", apply)
class SidebarPatch extends ModdedElement {
  // @ts-ignore
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "sidebar");
  }
}
