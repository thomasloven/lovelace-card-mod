import { hass } from "card-tools/src/hass";
import { yaml2json } from "card-tools/src/yaml";
import { CardMod } from "./card-mod";

interface ModdedElement extends HTMLElement {
  updateComplete?: Promise<void>;
  modElement?: ModdedElement;
  _cardMod?: CardMod;
}

export type Styles = string | Record<string, Styles>[];

export async function applyToElement(
  el: ModdedElement,
  type: string,
  styles: Styles = "",
  variables: any = {},
  entity_ids: any = null, // deprecated
  shadow: boolean = true
) {
  if (el.localName?.includes("-"))
    await customElements.whenDefined(el.localName);
  if (el.updateComplete) await el.updateComplete;

  const cardMod = (el._cardMod =
    el._cardMod || (document.createElement("card-mod") as CardMod));
  const target = el.modElement
    ? el.modElement
    : shadow
    ? el.shadowRoot || el
    : el;
  target.appendChild(cardMod as Node);
  if (el.updateComplete) await el.updateComplete;
  cardMod.type = type;
  cardMod.variables = variables;
  cardMod.styles = styles;
  return cardMod;
}

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

export function merge_deep(target: any, source: any) {
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
