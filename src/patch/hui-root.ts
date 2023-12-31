import { patch_element } from "../helpers/patch_function";
import { ModdedElement, apply_card_mod } from "../helpers/apply_card_mod";
import { selectTree } from "../helpers/selecttree";

/*
Patch hui-root for theme styling

There is no style passed to apply_card_mod here, everything comes only from themes.

An earlier version of card-mod would also re-run firstUpdated of any existing element after patching.
This shouldn't be necessary if card-mod is loaded as a module.
*/

// hui-root may have been used before the patch was applied
const apply = () => {
  selectTree(
    document,
    "home-assistant$home-assistant-main$partial-panel-resolver ha-panel-lovelace$hui-root",
    false
  ).then((root) => root?.firstUpdated());
};

@patch_element("hui-root", apply)
class HuiRootPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "root");
  }
}
