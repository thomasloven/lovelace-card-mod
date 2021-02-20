import { fireEvent } from "card-tools/src/event.js";
import { applyToElement } from "../card-mod";

customElements.whenDefined("hui-root").then(() => {
  const huiRoot = customElements.get("hui-root");
  if (huiRoot.prototype.cardmod_patched) return;
  huiRoot.prototype.cardmod_patched = true;

  const oldFirstUpdated = huiRoot.prototype.firstUpdated;
  huiRoot.prototype.firstUpdated = async function (changedProperties) {
    if (oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);
    const apply = () => {
      applyToElement(this, "root", "", {}, []);
    };

    apply();
  };

  fireEvent("ll-rebuild", {});
  let root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout partial-panel-resolver");

  root = root && root.querySelector("ha-panel-lovelace");
  root = root && root.shadowRoot;
  root = root && root.querySelector("hui-root");
  if (root) root.firstUpdated();
});
