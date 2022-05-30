import { applyToElement } from "../helpers";

customElements.whenDefined("hui-state-label-badge").then(() => {
  const HuiStateLabelBadge = customElements.get("hui-state-label-badge");
  if (HuiStateLabelBadge.prototype.cardmod_patched) return;
  HuiStateLabelBadge.prototype.cardmod_patched = true;

  const _firstUpdated = HuiStateLabelBadge.prototype.firstUpdated;
  HuiStateLabelBadge.prototype.firstUpdated = function (...args) {
    _firstUpdated?.bind(this)(...args);

    const config = this._config;

    if (config?.card_mod?.class) this.classList.add(config.card_mod.class);

    applyToElement(
      this,
      "badge",
      config?.card_mod?.style || config?.style || "",
      {
        config,
      }
    );
  };
});
