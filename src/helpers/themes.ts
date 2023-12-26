import { hass } from "./hass";
import { yaml2json } from "./yaml2json";
import { CardMod } from "../card-mod";
import { CardModStyle } from "./apply_card_mod";

export async function get_theme(root: CardMod): Promise<CardModStyle> {
  if (!root.type) return null;

  const el = root.parentElement ? root.parentElement : root;
  const theme = window
    .getComputedStyle(el)
    .getPropertyValue("--card-mod-theme");

  const hs = await hass();
  if (!hs) return {};
  const themes = hs?.themes.themes ?? {};
  if (!themes[theme]) return {};

  if (themes[theme][`card-mod-${root.type}-yaml`]) {
    return yaml2json(themes[theme][`card-mod-${root.type}-yaml`]);
  } else if (themes[theme][`card-mod-${root.type}`]) {
    return { ".": themes[theme][`card-mod-${root.type}`] };
  } else {
    return {};
  }
}
