import { findParentCardMod } from "../helpers";
import { ModdedElement } from "../helpers/card_mod";
import { patch_element } from "../helpers/patch_function";

/*
Patch various icon elements to consider the following variables:
--card-mod-icon
--card-mod-icon-color
--card-mod-icon-dim
*/

const updateIcon = (el) => {
  const styles = window.getComputedStyle(el);

  const icon = styles.getPropertyValue("--card-mod-icon");
  if (icon) el.icon = icon.trim();

  const color = styles.getPropertyValue("--card-mod-icon-color");
  if (color) el.style.color = color;

  const filter = styles.getPropertyValue("--card-mod-icon-dim");
  if (filter === "none") el.style.filter = "none";
};

const bindCardMod = async (el, retry = 0) => {
  // Find the most relevant card-mods in order to listen to change events so we can react quickly

  updateIcon(el);
  if (el._boundCardMod?.size) return;
  el._boundCardMod = await findParentCardMod(el);

  // If no card-mod was found in any parent element, then retry with increased interval
  if (!el._cardMod?.size && retry < 5)
    return window.setTimeout(() => bindCardMod(el, retry + 1), 100 * retry);

  for (const cm of el._boundCardMod) {
    cm.addEventListener("card-mod-update", async () => {
      await cm.updateComplete;
      updateIcon(el);
    });
  }
};

@patch_element("ha-state-icon")
class HaStateIconPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    bindCardMod(this);
  }
}

@patch_element("ha-icon")
class HaIconPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    bindCardMod(this);
  }
}

@patch_element("ha-svg-icon")
class HaSvgIconPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    if ((this.parentNode as any)?.host?.localName === "ha-icon") return;
    bindCardMod(this);
  }
}
