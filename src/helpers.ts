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
  if (!el) return;
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

  queueMicrotask(async () => {
    const target = el.modElement
      ? el.modElement
      : shadow
      ? el.shadowRoot || el
      : el;
    if (!target.contains(cardMod)) target.appendChild(cardMod as Node);

    cardMod.variables = variables;
    cardMod.styles = styles;
  });
  return cardMod;
}

export async function get_theme(root: CardMod): Promise<Styles> {
  if (!root.type) return null;

  const el = root.parentElement ? root.parentElement : root;
  const theme = window
    .getComputedStyle(el)
    .getPropertyValue("--card-mod-theme");

  if (!hass()) return {};
  const themes = hass()?.themes.themes ?? {};
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

export function compare_deep(a: any, b: any) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (!(a instanceof Object && b instanceof Object)) return false;
  for (const x in a) {
    if (!a.hasOwnProperty(x)) continue;
    if (!b.hasOwnProperty(x)) return false;
    if (a[x] === b[x]) continue;
    if (typeof a[x] !== "object") return false;
    if (!compare_deep(a[x], b[x])) return false;
  }
  for (const x in b) {
    if (!b.hasOwnProperty(x)) continue;
    if (!a.hasOwnProperty(x)) return false;
  }
  return true;
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

  if (node._cardMod) {
    for (const cm of node._cardMod) {
      if (cm.styles) cardMods.add(cm);
    }
  }

  if (node.updateComplete) await node.updateComplete;
  if (node.parentElement)
    joinSet(cardMods, await findParentCardMod(node.parentElement, step + 1));
  else if (node.parentNode)
    joinSet(cardMods, await findParentCardMod(node.parentNode, step + 1));
  if ((node as any).host)
    joinSet(cardMods, await findParentCardMod((node as any).host, step + 1));
  return cardMods;
}

export function parentElement(el: Node): Node {
  if (!el) return undefined;
  const node = el.parentElement || el.parentNode;
  if (!node) return undefined;
  return (node as any).host ? (node as any).host : node;
}

export function getResources() {
  const scriptElements = document.querySelectorAll("script");
  const retval = [];
  for (const script of scriptElements) {
    if (script?.innerText?.trim()?.startsWith("import(")) {
      const imports = script.innerText.split("\n")?.map((e) => e.trim());
      for (const imp of imports) {
        retval.push(imp.replace(/^import\(\"/, "").replace(/\"\);/, ""));
      }
    }
  }
  return retval;
}
