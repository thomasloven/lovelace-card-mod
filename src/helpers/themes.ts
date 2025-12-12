import { hass } from "./hass";
import { yaml2json } from "./yaml2json";
import { CardMod } from "../card-mod";
import { CardModStyle } from "./apply_card_mod";
import { themesReady } from "../theme-watcher";

function cssValueIsTrue(v: string): boolean {
  if (!v) return false;
  const t = v.trim().toLowerCase();
  return t === "true" || t === "1" || t === "yes" || t === "on";
}

export async function get_theme(root: CardMod): Promise<CardModStyle> {
  if (!root.type) return null;

  await themesReady();

  const el = root.parentElement ? root.parentElement : root;
  const cs = window.getComputedStyle(el);
  const theme = cs.getPropertyValue("--card-mod-theme");

  // Determine debug flag from CSS variables.
  // Checked patterns:
  //  - --card-mod-<type>-debug
  //  - --card-mod-<type>-<class>-debug  (class-specific alternate, only from el)
  let debug = false;

  // Check type-level debug var: --card-mod-<type>-debug
  const typeDebug = cs.getPropertyValue(`--card-mod-${root.type}-debug`);
  if (cssValueIsTrue(typeDebug)) debug = true;

  // Check classes from the el variable (parentElement if present, otherwise root).
  const classSource = (el as any).className || "";
  const classes = String(classSource)
    .split(/\s+/)
    .filter(Boolean);

  for (const cls of classes) {
    // Only keep the alternate class pattern: --card-mod-<type>-<class>-debug
    const debugVar = cs.getPropertyValue(`--card-mod-${root.type}-${cls}-debug`);
    if (cssValueIsTrue(debugVar)) {
      debug = true;
      break;
    }
  }

  // Apply debug flag to root so other code can use it.
  (root as any).debug = !!debug;

  root.debug && console.log("CardMod Debug: Theme:", theme);

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
