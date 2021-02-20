import { applyToElement } from "../card-mod";

customElements.whenDefined("ha-more-info-dialog").then(() => {
  const HaMoreInfoDialog = customElements.get("ha-more-info-dialog");
  if (HaMoreInfoDialog.prototype.cardmod_patched) return;
  HaMoreInfoDialog.prototype.cardmod_patched = true;

  const oldShowDialog = HaMoreInfoDialog.prototype.showDialog;
  HaMoreInfoDialog.prototype.showDialog = function (params) {
    const apply = () => {
      applyToElement(
        this.shadowRoot.querySelector("ha-dialog"),
        "more-info",
        "",
        { config: params },
        [params.entityId],
        false
      );
    };

    oldShowDialog.bind(this)(params);

    this.requestUpdate().then(async () => {
      await this.shadowRoot.querySelector("ha-dialog").updateComplete;
      apply();
    });
  };

  let root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("ha-more-info-dialog");

  if (root) {
    root.showDialog = HaMoreInfoDialog.prototype.showDialog.bind(root);
    root.showDialog({ entityId: root.entityId });
  }
});
