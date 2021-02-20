import { fireEvent } from "card-tools/src/event.js";
import { applyToElement } from "../card-mod";

customElements.whenDefined("ha-sidebar").then(() => {
  const haSidebar = customElements.get("ha-sidebar");
  if (haSidebar.prototype.cardmod_patched) return;
  haSidebar.prototype.cardmod_patched = true;

  const oldFirstUpdated = haSidebar.prototype.firstUpdated;
  haSidebar.prototype.firstUpdated = async function (changedProperties) {
    if (oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);
    const apply = () => {
      applyToElement(this, "sidebar", "", {}, []);
    };

    apply();
  };

  fireEvent("ll-rebuild", {});
  let root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout app-drawer");

  root = root && root.querySelector("ha-sidebar");
  if (root) root.firstUpdated();
});
