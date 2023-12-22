import { ModdedElement, apply_card_mod } from "../helpers/card_mod";
import { patch_element, patch_object } from "../helpers/patch_function";

/*
Patch the hui-glance-card specifically in order to handle individual styling of each item
Items in glance cards are not isolated like rows in entities cards, so the styling options
are somewhat limited. Therefore this patch creates a separate shadowRoot for each item.
*/

// https://github.com/home-assistant/frontend/blob/8c39ed46a83e7e889c389af466c0fd1b07fbf6fd/src/panels/lovelace/cards/hui-glance-card.ts#L202-L211
// https://github.com/home-assistant/frontend/blob/8c39ed46a83e7e889c389af466c0fd1b07fbf6fd/src/panels/lovelace/cards/hui-glance-card.ts#L231-L233
const ENTITY_STYLES = `
div {
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name {
  min-height: var(--paper-font-body1_-_line-height, 20px);
}
state-badge {
  margin: 8px 0;
}
`;

@patch_element("hui-glance-card")
class HuiGlanceCardPatch extends ModdedElement {
  // hui-glance-card has a renderEntity method, but the return from that is too messy
  // Instead find every icon after render in the updated method.
  updated(_orig, ...args) {
    _orig?.(...args);

    // Each entity of a glance card is contained in a div.entity
    // Go through each and apply styling individually
    for (const el of this.shadowRoot.querySelectorAll("ha-card div.entity")) {
      patch_object(el, ModdedElement);

      // Create a shadowroot for each entity
      // This makes it easier to style entities individually without styles "leaking" out
      const root = el.shadowRoot ?? el.attachShadow({ mode: "open" });
      while (el.firstChild) root.append(el.firstChild);

      // Add default styles into shadowRoot
      const styleTag =
        el.querySelector("style[card-mod]") ?? document.createElement("style");
      styleTag.setAttribute("card-mod", "");
      styleTag.innerHTML = ENTITY_STYLES;
      root.append(styleTag);

      // Thankfully the configuration data for the glance entity is added to the div for some reason
      // https://github.com/home-assistant/frontend/blob/8c39ed46a83e7e889c389af466c0fd1b07fbf6fd/src/panels/lovelace/cards/hui-glance-card.ts#L275
      const config = el["config"] ?? el["entityConfig"];
      apply_card_mod(el as any, "glance", config?.card_mod, { config });
    }
  }
}
