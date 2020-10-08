import {fireEvent} from "card-tools/src/event.js";
import { applyToElement } from "../card-mod";

customElements.whenDefined("hui-view").then(() => {
  const huiView = customElements.get("hui-view");
  if(huiView.prototype.cardmod_patched) return;
  huiView.prototype.cardmod_patched = true;

  const oldFirstUpdated = huiView.prototype.firstUpdated;
  huiView.prototype.firstUpdated = function() {
    if(oldFirstUpdated) oldFirstUpdated();
    const apply = () => applyToElement(this, "view", "", {}, []);

    apply();
  };

  fireEvent("ll-rebuild", {});

});
