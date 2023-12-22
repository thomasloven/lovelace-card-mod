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

export async function apply_card_mod(
  element: ModdedElement,
  type: string,
  cm_config: any | undefined = undefined,
  variables = {},
  shadow: boolean = true,
  cls = undefined
) {
  // TODO: This is for backwards compatibility
  // Remove in a future version
  if (
    typeof cm_config === "string" ||
    (cm_config !== undefined &&
      cm_config.style === undefined &&
      cm_config.class === undefined)
  ) {
    console.warn(
      "Card-mod: You're using a custom card that relies on card-mod and uses an outdated signature for applyToElement. This will be removed at some point in the future. Hopefully the developer of your card will have updated by then."
    );
    cm_config = { style: cm_config };
  }
  if (cls === true || cls === false) {
    console.warn(
      "Card-mod: You're using a custom card that relies on card-mod and uses an outdated signature for applyToElement. This will be removed at some point in the future. Hopefully the developer of your card will have updated by then."
    );
    shadow = cls;
    cls = undefined;
  }

  if (!element) return;

  // Wait for target element to exist
  if (element.localName?.includes("-"))
    await customElements.whenDefined(element.localName);

  element._cardMod = element._cardMod || [];

  // Find any existing card-mod elements of the right type
  const cm: CardMod =
    element._cardMod.find((cm) => cm.type === type) ??
    document.createElement("card-mod");

  cm.type = type;
  (cm as any).setAttribute("card-mod-type", type);

  if (!element._cardMod.includes(cm)) element._cardMod.push(cm);

  queueMicrotask(async () => {
    await Promise.all([element.updateComplete]);

    const target =
      element.modElement ?? shadow ? element.shadowRoot ?? element : element;

    if (!target.contains(cm as any)) target.appendChild(cm as any);

    cm.variables = variables;
    cm.styles = cm_config?.style ?? "";
  });

  const classes = cm_config?.class?.split?.(" ") ?? cm_config?.class ?? [];
  element.classList?.add(...classes, cls);

  return cm;
}
