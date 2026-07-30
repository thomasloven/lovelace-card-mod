/*
Tracks whether any card-mod style anywhere actually uses the icon variables.

The ha-icon / ha-state-icon / ha-svg-icon patches exist to honour three CSS
variables: --card-mod-icon, --card-mod-icon-color and --card-mod-icon-dim.
Reading them requires window.getComputedStyle on every icon, on every update,
repeated by a retry loop — around 900 getComputedStyle calls on a dashboard with
187 icons, which profiled at ~300ms, by far card-mod's largest single cost.

That work is only ever useful if some style actually sets one of those
variables. This module answers that question with a single boolean, set when a
style is processed (rare) and read per icon update (free).

It only ever flips from false to true: styles can be added at runtime, never
"un-added" in a way that would make it safe to stop watching. On the flip, a
cm_icons_enabled event lets the icon patches bind the icons they had skipped.
*/

const ICON_VAR = "--card-mod-icon";

let in_use = false;

export const icon_vars_in_use = () => in_use;

const enable = () => {
  if (in_use) return;
  in_use = true;
  document.dispatchEvent(new Event("cm_icons_enabled"));
};

// Called with the fully merged styles of a card-mod element (card_mod config
// plus any theme contribution), so one check covers both sources.
export const note_styles = (styles: unknown) => {
  if (in_use || styles === undefined || styles === null) return;
  try {
    if (JSON.stringify(styles)?.includes(ICON_VAR)) enable();
  } catch (e) {
    // Unserialisable styles are not expected; stay safe and assume icons matter.
    enable();
  }
};

// A theme key literally named card-mod-icon* becomes the matching CSS variable,
// so themes have to be considered even before any style is processed.
export const note_theme_keys = (keys: Iterable<string>) => {
  if (in_use) return;
  for (const key of keys) {
    if (key.startsWith("card-mod-icon")) return enable();
  }
};
