import { patch_object, patch_element } from "../helpers/patch_function";
import { apply_card_mod } from "../helpers/apply_card_mod";
import { await_element } from "../helpers/selecttree";
import { ModdedElement } from "../helpers/apply_card_mod";

/*
Patch the hui-entities-card specifically in order to handle individual styling of each row
*/

@patch_element("hui-entities-card")
class HuiEntitiesCardPatch extends ModdedElement {
  renderEntity(_orig, config, ...rest) {
    const retval = _orig?.(config, ...rest);
    if (config?.type === "custom:mod-card") return retval;

    if (!retval?.values) return retval;
    const row = retval.values[0];
    if (!row) return retval;

    const cls = `type-${config?.type?.replace?.(":", "-")}`;
    const apply = async () => {
      await await_element(row);
      patch_object(row, ModdedElement);
      apply_card_mod(row, "row", config?.card_mod, { config }, true, cls);
      row.addEventListener("ll-rebuild", apply);
    };

    Promise.all([this.updateComplete]).then(() => apply());

    return retval;
  }
}
