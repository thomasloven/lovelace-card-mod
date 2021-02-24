import { fireEvent } from "card-tools/src/event.js";
import { selectTree } from "card-tools/src/helpers";
import { applyToElement } from "../helpers";

customElements.whenDefined("ha-sidebar").then(() => {
  const haSidebar = customElements.get("ha-sidebar");
  if (haSidebar.prototype.cardmod_patched) return;
  haSidebar.prototype.cardmod_patched = true;

  const oldFirstUpdated = haSidebar.prototype.firstUpdated;
  haSidebar.prototype.firstUpdated = async function (changedProperties) {
    if (oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);
    const apply = () => {
      applyToElement(this, "sidebar");
    };

    apply();
  };

  fireEvent("ll-rebuild", {});
  selectTree(
    document,
    "home-assistant$home-assistant-main$app-drawer-layout app-drawer ha-sidebar",
    false
  ).then((root) => root?.firstUpdated());
});
