import { ModdedElement } from "../helpers/apply_card_mod";
import { patch_element } from "../helpers/patch_function";
import { CardMod } from "../card-mod";

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

const bindCardMod = async (el) => {
  // Find the most relevant card-mods in order to listen to change events so we can react quickly

  updateIcon(el);
  el._boundCardMod = el._boundCardMod ?? new Set();
  const newCardMods = await findParentCardMod(el);

  for (const cm of newCardMods) {
    if (el._boundCardMod.has(cm)) continue;

    cm.addEventListener("card-mod-update", async () => {
      await cm.updateComplete;
      updateIcon(el);
    });
    el._boundCardMod.add(cm);
  }

  // Find card-mod elements created later, increased interval
  if (el.cm_retries < 5) {
    el.cm_retries++;
    return window.setTimeout(() => bindCardMod(el), 250 * el.cm_retries);
  }
};

@patch_element("ha-state-icon")
class HaStateIconPatch extends ModdedElement {
  cm_retries = 0;
  updated(_orig, ...args) {
    _orig?.(...args);
    this.cm_retries = 0;
    bindCardMod(this);
  }
}

@patch_element("ha-icon")
class HaIconPatch extends ModdedElement {
  cm_retries = 0;
  updated(_orig, ...args) {
    _orig?.(...args);
    this.cm_retries = 0;
    bindCardMod(this);
  }
}

@patch_element("ha-svg-icon")
class HaSvgIconPatch extends ModdedElement {
  cm_retries = 0;
  updated(_orig, ...args) {
    _orig?.(...args);
    if ((this.parentNode as any)?.host?.localName === "ha-icon") return;
    this.cm_retries = 0;
    bindCardMod(this);
  }
}

function joinSet(dst: Set<any>, src: Set<any>) {
  for (const s of src) dst.add(s);
}

async function findParentCardMod(node: any, step = 0): Promise<Set<CardMod>> {
  let cardMods: Set<CardMod> = new Set();
  // if (step == 10) return cardMods;
  if (!node) return cardMods;

  if (node.updateComplete) await node.updateComplete;

  if (node._cardMod) {
    for (const cm of node._cardMod) {
      if (cm.styles) cardMods.add(cm);
    }
  }

  if (node.parentElement)
    joinSet(cardMods, await findParentCardMod(node.parentElement, step + 1));
  else if (node.parentNode)
    joinSet(cardMods, await findParentCardMod(node.parentNode, step + 1));
  if ((node as any).host)
    joinSet(cardMods, await findParentCardMod((node as any).host, step + 1));
  return cardMods;
}
