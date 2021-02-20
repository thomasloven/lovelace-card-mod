import { selectTree } from "card-tools/src/helpers";
import { applyToElement } from "../card-mod";

customElements.whenDefined("ha-more-info-dialog").then(() => {
  const HaMoreInfoDialog = customElements.get("ha-more-info-dialog");
  if (HaMoreInfoDialog.prototype.cardmod_patched) return;
  HaMoreInfoDialog.prototype.cardmod_patched = true;

  const oldShowDialog = HaMoreInfoDialog.prototype.showDialog;
  HaMoreInfoDialog.prototype.showDialog = function (params) {
    oldShowDialog.bind(this)(params);

    this.requestUpdate().then(async () => {
      applyToElement(
        this.shadowRoot.querySelector("ha-dialog"),
        "more-info",
        "",
        { config: params },
        [params.entityId],
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
