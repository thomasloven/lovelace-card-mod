import { hass } from "card-tools/src/hass";
import { yaml2json } from "card-tools/src/yaml";
import { CardMod } from "./card-mod";

interface ModdedElement extends HTMLElement {
  updateComplete?: Promise<void>;
  modElement?: ModdedElement;
  _cardMod?: CardMod[];
}

export type Styles = string | Record<string, any>;

interface LovelaceCard extends Node {
  config?: any;
  _config?: any;
  host?: LovelaceCard;
}

export async function applyToElement(
  el: ModdedElement,
  type: string,
  styles: Styles = "",
  variables: any = {},
  entity_ids: any = null, // deprecated
  shadow: boolean = true
): Promise<CardMod> {
  if (el.localName?.includes("-"))
    await customElements.whenDefined(el.localName);
  if (el.updateComplete) await el.updateComplete;

  if (el._cardMod === undefined) {
    el._cardMod = [];
  }
  let cardMod: CardMod;
  for (const cm of el._cardMod) {
    if (cm.type === type) {
      cardMod = cm;
      break;
    }
  }
  if (!cardMod) {
    cardMod = document.createElement("card-mod") as CardMod;
    cardMod.type = type;
    el._cardMod.push(cardMod);
  }

  const target = el.modElement
    ? el.modElement
    : shadow
    ? el.shadowRoot || el
    : el;
  target.appendChild(cardMod as Node);

  cardMod.variables = variables;
  cardMod.styles = styles;

  return cardMod;
}

export async function get_theme(root: CardMod): Promise<Styles> {
  if (!root.type) return null;

  const el = root.parentElement ? root.parentElement : root;
  const theme = window
    .getComputedStyle(el)
    .getPropertyValue("--card-mod-theme");

  const themes = hass().themes.themes;
  if (!themes[theme]) return {};

  if (themes[theme][`card-mod-${root.type}-yaml`]) {
    return yaml2json(themes[theme][`card-mod-${root.type}-yaml`]);
  } else if (themes[theme][`card-mod-${root.type}`]) {
    return { ".": themes[theme][`card-mod-${root.type}`] };
  } else {
    return {};
  }
}

export function merge_deep(target: any, source: any) {
  const isObject = (i: any) => {
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

export function findConfig(node: LovelaceCard) {
  if (node.config) return node.config;
  if (node._config) return node._config;
  if (node.host) return findConfig(node.host);
  if (node.parentElement) return findConfig(node.parentElement);
  if (node.parentNode) return findConfig(node.parentNode);
  return null;
}

function joinSet(dst: Set<any>, src: Set<any>) {
  for (const s of src) dst.add(s);
}

export async function findParentCardMod(
  node: any,
  step = 0
): Promise<Set<CardMod>> {
  let cardMods: Set<CardMod> = new Set();
  if (step == 10) return cardMods;
  if (!node) return cardMods;

  if (node._cardMod && node._cardMod.style) cardMods.add(node._cardMod);

  if (node.updateComplete) await node.updateComplete;
  if (node.parentElement)
    joinSet(cardMods, await findParentCardMod(node.parentElement, step + 1));
  if (node.parentNode)
    joinSet(cardMods, await findParentCardMod(node.parentNode, step + 1));
  if ((node as any).host)
    joinSet(cardMods, await findParentCardMod((node as any).host, step + 1));
  return cardMods;
}
