import {fireEvent} from "card-tools/src/event.js";
import { applyToElement } from "../card-mod";

customElements.whenDefined("hui-view").then(() => {
  const huiView = customElements.get("hui-view");
  if(huiView.prototype.cardmod_patched) return;
  huiView.prototype.cardmod_patched = true;

  huiView.prototype.firstUpdated = function() {
    const apply = () => applyToElement(this, "view", "", {}, []);

    apply();
  };

  fireEvent("ll-rebuild", {});

});
