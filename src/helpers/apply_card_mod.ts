import { LitElement } from "lit";
import { CardMod } from "../card-mod";

export class ModdedElement extends LitElement {
  _cardMod: CardMod[] = [];
  modElement?: ModdedElement;

  setConfig(_orig, config, ...args) {
    _orig?.(config, ...args);
    this._cardMod.forEach((cm) => {
      cm.variables = { config };
      cm.styles = config.card_mod?.style || {};
    });
  }

  updated(_orig, ...args) {
    _orig?.(...args);
    Promise.all([this.updateComplete]).then(() =>
      this._cardMod.forEach((cm) => cm.refresh?.())
    );
  }
}

export type CardModStyle = string | { [key: string]: CardModStyle };

interface CardModConfig {
  style?: CardModStyle;
  class?: string | string[];
  debug?: boolean;
}

export async function apply_card_mod_compatible(
  element: ModdedElement,
  type: string,
  cm_config: CardModStyle | CardModConfig = undefined, // or styles
  variables = {},
  shadow = true, // or deprecated
  cls = undefined // or shadow
) {
  // TODO: Remove in June 2024
  // This is for backwards compatibility with Card mod version 3.3 and earlier.
  // Do not remove this before June 2024 unless Card-mod 4.0 is released.

  // Wrapper for backwards compatibility (with deprecation warning)
  // Old signature:
  //   el: Node
  //   type: string
  //   styles: CardModStyle = ""
  //   variables: object = {}
  //   _: any = null
  //   shadow: boolean = true
  //
  // New signature
  //   el: Node
  //   type: string
  //   cm_config: CardModConfig
  //   variables: object = {}
  //   shadow: boolean = true
  //   cls: str = undefined

  let oldStyle = false;
  if (cls !== undefined) {
    if (typeof cls !== "string") {
      // Old style call
      oldStyle = true;
      shadow = cls;
      cls = undefined;
    }
  }
  if (typeof shadow !== "boolean") {
    // Old style call
    shadow = true;
    oldStyle = true;
  }
  if (typeof cm_config === "string") {
    // Old style call with string styles
    cm_config = { style: cm_config };
    oldStyle = true;
  }
  if (
    cm_config &&
    Object.keys(cm_config).length !== 0 &&
    (cm_config?.style ?? cm_config?.class ?? cm_config?.debug) === undefined
  ) {
    // Old style call with object styles
    cm_config = { style: cm_config as CardModStyle };
    oldStyle = true;
  }

  if (oldStyle && !(window as any).cm_compatibility_warning) {
    (window as any).cm_compatibility_warning = true;
    console.groupCollapsed("Card-mod warning");
    console.info(
      "You are using a custom card which relies on card-mod, and uses an outdated signature for applyToElement."
    );
    console.info(
      "The outdated signature will be removed at some point in the future. Hopefully the developer of your card will have updated their card by then."
    );
    console.info("The card used card-mod to apply styles here:", element);
    console.groupEnd();
  }

  return apply_card_mod(element, type, cm_config, variables, shadow, cls);
}

export async function apply_card_mod(
  element: ModdedElement,
  type: string,
  cm_config: CardModConfig = undefined,
  variables = {},
  shadow: boolean = true,
  cls = undefined
) {
  const debug = cm_config?.debug
    ? (...msg) => console.log("CardMod Debug:", ...msg)
    : (...msg) => {};

  debug(
    "Applying card-mod to:",
    ...((element as any)?.host
      ? ["#shadow-root of:", (element as any)?.host]
      : [element]),
    "type: ",
    type,
    "configuration: ",
    cm_config
  );

  if (!element) return;

  // Wait for target element to exist
  if (element.localName?.includes("-"))
    await customElements.whenDefined(element.localName);

  element._cardMod = element._cardMod || [];

  // Find any existing card-mod elements of the right type
  const cm: CardMod =
    element._cardMod.find((cm) => cm.type === type) ??
    document.createElement("card-mod");

  debug("Applying card-mod in:", cm);

  cm.type = type;
  cm.debug = cm_config?.debug ?? false;
  cm.cancelStyleChild();
  // (cm as any).setAttribute("card-mod-type", type);

  if (!element._cardMod.includes(cm)) element._cardMod.push(cm);

  window.setTimeout(async () => {
    await Promise.all([element.updateComplete]);

    const target =
      element.modElement ?? shadow ? element.shadowRoot ?? element : element;

    if (!target.contains(cm as any)) target.appendChild(cm as any);

    cm.variables = variables;
    cm.styles = cm_config?.style ?? "";
  }, 1);

  const classes =
    (typeof cm_config?.class == "string"
      ? cm_config?.class?.split?.(" ")
      : cm_config?.class) ?? [];
  element.classList?.add(...classes, cls);

  return cm;
}
