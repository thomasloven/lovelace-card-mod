import {fireEvent} from "card-tools/src/event.js";
import { applyToElement } from "../card-mod";

customElements.whenDefined("hui-view").then(() => {
  const huiView = customElements.get("hui-view");

  huiView.prototype.firstUpdated = function() {
    const apply = () => applyToElement(this, "view", "", {}, []);

    apply();
  };

  fireEvent("ll-rebuild", {});

});
