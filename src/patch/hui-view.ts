import { applyToElement } from "../helpers";

customElements.whenDefined("hui-view").then(() => {
  const HuiView = customElements.get("hui-view");
  if (HuiView.prototype.cardmod_patched) return;
  HuiView.prototype.cardmod_patched = true;

  const _firstUpdated = HuiView.prototype.firstUpdated;
  HuiView.prototype.firstUpdated = function (changedProperties) {
    _firstUpdated?.bind(this)(changedProperties);
    applyToElement(this, "view");
  };
});
