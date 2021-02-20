import { hass } from "card-tools/src/hass";
import { yaml2json } from "card-tools/src/yaml";

export async function get_theme(root) {
  if (!root.type) return null;
  const el = root.parentElement ? root.parentElement : root;
  const theme = window
    .getComputedStyle(el)
    .getPropertyValue("--card-mod-theme");

  const themes = hass().themes.themes;
  if (!themes[theme]) return {};
  if (themes[theme][`card-mod-${root.type}-yaml`])
    return await yaml2json(themes[theme][`card-mod-${root.type}-yaml`]);
  if (themes[theme][`card-mod-${root.type}`])
    return { ".": themes[theme][`card-mod-${root.type}`] };
  return {};
}

export function merge_deep(target, source) {
  const isObject = (i) => {
    return i && typeof i === "object" && !Array.isArray(i);
  };
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        if (typeof target[key] === "string") target[key] = { ".": target[key] };
        merge_deep(target[key], source[key]);
      } else {
        if (target[key]) target[key] = source[key] + target[key];
        else target[key] = source[key];
      }
    }
  }
  return target;
}
