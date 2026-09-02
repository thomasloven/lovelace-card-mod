/*
Index of the card-mod keys declared by any theme.

Card-mod styles come from two places: an element's own `card_mod:` config, or a
theme key such as `card-mod-card` / `card-mod-card-yaml`. Because a theme can
style every element of a given type without any per-element config, apply_card_mod
had no way to know up front whether an element needed processing — so it
processed all of them, creating a <card-mod> element, scheduling a timeout and
running getComputedStyle for every card, badge, row and icon on screen.

This index answers that question once instead of per element: it collects the
set of `card-mod-*` keys declared across all themes and refreshes when themes
change. If no theme declares a key for a given type, an element of that type
carrying no `card_mod:` config cannot be styled by card-mod at all, and can be
skipped entirely.

The index is deliberately conservative: it looks at every theme rather than the
active one, because the active theme can differ per view and per card, and it
reports "may style" whenever hass is not yet reachable.
*/

import { note_theme_keys } from "./icon_usage";

let themeKeys: Set<string> | null = null;

const collect = (themes: object): Set<string> => {
  const keys = new Set<string>();
  for (const theme of Object.values(themes ?? {})) {
    for (const key of Object.keys(theme ?? {})) {
      if (key.startsWith("card-mod-")) keys.add(key);
    }
  }
  return keys;
};

const themes_from_dom = () => {
  const el: any =
    document.querySelector("home-assistant") ?? document.querySelector("hc-main");
  return el?.hass?.themes?.themes;
};

export const refresh_theme_index = () => {
  const themes = themes_from_dom();
  themeKeys = themes ? collect(themes) : null;
  if (themeKeys) note_theme_keys(themeKeys);
};

// cm_update is dispatched by theme-watcher whenever themes are reloaded or the
// selected theme changes.
document.addEventListener("cm_update", refresh_theme_index);

export const theme_may_style = (type: string): boolean => {
  if (themeKeys === null) refresh_theme_index();
  if (themeKeys === null) return true; // hass not ready yet — assume it might
  return (
    themeKeys.has(`card-mod-${type}`) || themeKeys.has(`card-mod-${type}-yaml`)
  );
};
