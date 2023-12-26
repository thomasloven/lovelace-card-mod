import { patch_element } from "../helpers/patch_function";
import { ModdedElement, apply_card_mod } from "../helpers/apply_card_mod";

/*
Patch ha-more-info-dialog to style more-info popups.

There is no style passed to apply_card_mod here, everything comes only from themes.

An earlier version of card-mod would also look for any already opened dialogs
home-assistant$ha-more-info-dialog
If that existed it would replace the showDialog method of that with the patched version, and then re-run it.
This should only be necessary if someone manages to open a dialog before card-mod loads in, which shouldn't happen
at all if card-mod is loaded as a module.
*/

@patch_element("ha-more-info-dialog")
class MoreInfoDIalogPatch extends ModdedElement {
  showDialog(_orig, params, ...rest) {
    _orig?.(params, ...rest);

    this.requestUpdate();
    this.updateComplete.then(async () => {
      const haDialog = this.shadowRoot.querySelector("ha-dialog");
      if (!haDialog) return;

      apply_card_mod(
        haDialog as ModdedElement,
        "more-info",
        undefined,
        {
          config: params,
        },
        false
      );
    });
  }
}
