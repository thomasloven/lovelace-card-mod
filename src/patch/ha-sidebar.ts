import { fireEvent } from "card-tools/src/event.js";
import { selectTree } from "card-tools/src/helpers";
import { applyToElement } from "../helpers";

customElements.whenDefined("ha-sidebar").then(() => {
  const HaSidebar = customElements.get("ha-sidebar");
  if (HaSidebar.prototype.cardmod_patched) return;
  HaSidebar.prototype.cardmod_patched = true;

  const _firstUpdated = HaSidebar.prototype.firstUpdated;
  HaSidebar.prototype.firstUpdated = async function (changedProperties) {
    _firstUpdated?.bind(this)(changedProperties);

    applyToElement(this, "sidebar");
  };

  fireEvent("ll-rebuild", {});
  selectTree(
    document,
    "home-assistant$home-assistant-main$app-drawer-layout app-drawer ha-sidebar",
    false
  ).then((root) => root?.firstUpdated());
});
