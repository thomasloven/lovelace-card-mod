(window as any).cardMod_patch_state = (window as any).cardMod_patch_state || {};

const patchState: Record<string, boolean> = (window as any).cardMod_patch_state;

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
    const patched = patchState[key] ?? false;
    if (patched) {
      patch_warning(key);
      return;
    }
    patchState[key] = true;
    patch_prototype(element, constructor, afterwards);
  };
}

function patch_warning(key) {
  if ((window as any).cm_patch_warning) return;
  (window as any).cm_patch_warning = true;
  console.groupCollapsed(
    `%cCARD-MOD: ${key} already patched!`,
    "color: red; font-weight: bold"
  );
  console.info("Card-mod likely loaded twice with different resource URLs.");
  console.info(
    "Make sure all card-mod resource URLs including hacstag match EXACTLY."
  );
  console.info(
    "Also check other custom elemets inculding cards and themes which may load card-mod."
  );
  console.groupEnd();
}
