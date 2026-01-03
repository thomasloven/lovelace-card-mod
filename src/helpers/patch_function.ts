import pjson from "../../package.json";
import { selectTree } from "./selecttree";

(window as any).cardMod_patch_state = (window as any).cardMod_patch_state || {};

const patchState: Record<string, {patched: boolean, version: string}> = (window as any).cardMod_patch_state;

const patch_method = function (obj, method, override) {
  if (method === "constructor") return;
  const original = obj[method];

  const fn = function (...args) {
    try {
      return override.call(this, original?.bind(this), ...args);
    } catch (e) {
      return original?.bind(this)(...args);
    }
  };
  obj[method] = fn;
};

export const set_patched = (element: HTMLElement) => {
  const key = typeof element === "string" ? element : element.constructor.name;
  patchState[key] = {patched: true, version: pjson.version};
};

export const is_patched = (element: HTMLElement) => {
  const key = typeof element === "string" ? element : element.constructor.name;
  return patchState[key] ?? false;
};

export const patch_object = (obj, patch) => {
  if (!obj) return;
  for (const method in Object.getOwnPropertyDescriptors(patch.prototype)) {
    patch_method(obj, method, patch.prototype[method]);
  }
};

export const patch_prototype = async (cls, patch, afterwards?) => {
  if (typeof cls === "string") {
    await customElements.whenDefined(cls);
    cls = customElements.get(cls);
  }
  const patched = patch_object(cls.prototype, patch);
  afterwards?.();
  return patched;
};

// Decorator for patching a custom-element
export function patch_element(element, afterwards?) {
  return function patched(constructor) {
    const key = typeof element === "string" ? element : element.name;
    const patched = patchState[key]?.patched ?? patchState[key] ?? false;
    if (patched) {
      patch_warning(key);
      return;
    }
    patchState[key] = {patched: true, version: pjson.version};
    patch_prototype(element, constructor, afterwards);
  };
}

function patch_warning(key) {
  if ((window as any).cm_patch_warning) return;
  (window as any).cm_patch_warning = true;
  const message = `CARD-MOD (${pjson.version}): ${key} already patched by ${patchState[key]?.version || "unknown version"}!`;
  const details = [
    "Card-mod likely loaded twice with different resource URLs.",
    "Make sure all card-mod resource URLs including hacstag match EXACTLY.",
    "Also check other custom elements including cards and themes which may load card-mod.",
  ];
  console.groupCollapsed(
    `%c${message}`,
    "color: red; font-weight: bold"
  );
  details.forEach((line) => console.info(line));
  console.groupEnd();

  selectTree(document.body, "home-assistant").then((haEl) => {
    if (haEl?.hass) {
      const notification = `${message}<br><br>${details.join(" ")}
        <br><br>User: ${haEl.hass.user?.name || "unknown"}<br><br>Browser: ${navigator.userAgent}
        <br><br>If you have corrected this issue in config, then the device generating this notification needs its Frontend cache cleared.`;
      const notification_id = "card_mod_patch_warning_" + (haEl.hass.user?.id || "unknown");
      haEl.hass.callService("persistent_notification", 
        "create", {
          message: notification,
          title: "Card-mod duplicate patch warning",
          notification_id: notification_id,
        }
      );
    }
  });
}
