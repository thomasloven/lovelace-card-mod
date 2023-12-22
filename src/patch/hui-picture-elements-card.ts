import { ModdedElement, apply_card_mod } from "../helpers/card_mod";
import { patch_element, patch_object } from "../helpers/patch_function";
import { await_element } from "../helpers/selecttree";

/*
Patch the hui-epicture-elements-card specifically in order to handle individual styling of each element
*/

@patch_element("hui-picture-elements-card")
class PictureElementsCardPatch extends ModdedElement {
  setConfig(_orig, ...args) {
    _orig?.(...args);

    for (const [i, el] of (this as any)._elements.entries()) {
      await_element(el);
      patch_object(el, ModdedElement);
      const config = (this as any)._config.elements[i];
      const cls = `type-${config?.type?.replace?.(":", "-")}`;
      apply_card_mod(el, "element", config?.card_mod, { config }, true, cls);
    }
  }
}
