import { selectTree } from "card-tools/src/helpers";
import { applyToElement } from "../helpers";

customElements.whenDefined("ha-more-info-dialog").then(() => {
  const HaMoreInfoDialog = customElements.get("ha-more-info-dialog");
  if (HaMoreInfoDialog.prototype.cardmod_patched) return;
  HaMoreInfoDialog.prototype.cardmod_patched = true;

  const _showDialog = HaMoreInfoDialog.prototype.showDialog;
  HaMoreInfoDialog.prototype.showDialog = function (params) {
    _showDialog?.bind(this)(params);

    this.requestUpdate().then(async () => {
      applyToElement(
        this.shadowRoot.querySelector("ha-dialog"),
        "more-info",
        "",
        { config: params },
        null,
        false
      );
    });
  };

  selectTree(document, "home-assistant$ha-more-info-dialog", false).then(
    (root: any) => {
      if (root) {
        root.showDialog = HaMoreInfoDialog.prototype.showDialog.bind(root);
        root.showDialog({ entityId: root.entityId });
      }
    }
  );
});
