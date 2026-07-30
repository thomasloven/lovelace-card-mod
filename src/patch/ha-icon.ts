import { ModdedElement } from "../helpers/apply_card_mod";
import { patch_element } from "../helpers/patch_function";
import { CardMod } from "../card-mod";
import { icon_vars_in_use } from "../helpers/icon_usage";

/*
Patch various icon elements to consider the following variables:
--card-mod-icon
--card-mod-icon-color
--card-mod-icon-dim

Icons are by far the most numerous elements on a dashboard — 187 on a typical
one — and this patch used to run getComputedStyle on every one of them at every
update, then repeat it five times per icon on a timer. That profiled at ~300ms
per dashboard load, card-mod's single largest cost, and it was spent looking for
variables that are almost never set.

Both the initial pass and the retries are now skipped unless some style actually
references --card-mod-icon*. Icons skipped before such a style appeared are
rebound once, on cm_icons_enabled, rather than every icon polling for it.
*/

const skipped: Set<any> = new Set();

document.addEventListener("cm_icons_enabled", () => {
  const pending = [...skipped];
  skipped.clear();
  for (const el of pending) if (el.isConnected) bindCardMod(el);
});

const maybeBind = (el) => {
  if (!icon_vars_in_use()) {
    skipped.add(el);
    return;
  }
  el.cm_retries = 0;
  bindCardMod(el);
};

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
    maybeBind(this);
  }
}

@patch_element("ha-icon")
class HaIconPatch extends ModdedElement {
  cm_retries = 0;
  updated(_orig, ...args) {
    _orig?.(...args);
    maybeBind(this);
  }
}

@patch_element("ha-svg-icon")
class HaSvgIconPatch extends ModdedElement {
  cm_retries = 0;
  updated(_orig, ...args) {
    _orig?.(...args);
    if ((this.parentNode as any)?.host?.localName === "ha-icon") return;
    maybeBind(this);
  }
}

function joinSet(dst: Set<any>, src: Set<any>) {
  for (const s of src) dst.add(s);
}

async function findParentCardMod(node: any, step = 0): Promise<Set<CardMod>> {
  let cardMods: Set<CardMod> = new Set();
  if (step == 10) return cardMods;
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
