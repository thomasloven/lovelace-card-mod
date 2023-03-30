import { applyToElement } from "../helpers";

customElements.whenDefined("hui-view").then(() => {
  const HuiView = customElements.get("hui-view");
  if (HuiView.prototype.cardmod_patched) return;
  HuiView.prototype.cardmod_patched = true;

  const _firstUpdated = HuiView.prototype.updated;
  HuiView.prototype.updated = function (...args) {
    _firstUpdated?.bind(this)(...args);
    applyToElement(this, "view", "", {}, null, false);
  };
});
