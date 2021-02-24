import { fireEvent } from "card-tools/src/event.js";
import { applyToElement } from "../helpers";

customElements.whenDefined("hui-state-label-badge").then(() => {
  const HuiStateLabelBadge = customElements.get("hui-state-label-badge");
  if (HuiStateLabelBadge.prototype.cardmod_patched) return;
  HuiStateLabelBadge.prototype.cardmod_patched = true;

  const _firstUpdated = HuiStateLabelBadge.prototype.firstUpdated;
  HuiStateLabelBadge.prototype.firstUpdated = function (changedProperties) {
    _firstUpdated?.bind(this)(changedProperties);

    const config = this._config;

    if (config?.class) this.classList.add(config.class);

    applyToElement(this, "badge", config?.card_mod || config?.style || "", {
      config,
    });
  };

  fireEvent("ll-rebuild", {});
});
