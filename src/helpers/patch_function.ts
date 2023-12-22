const patch_method = function (obj, method, override) {
  if (method === "constructor") return;
  const original = obj[method];
  if (original?.cm_patched) return;

  const fn = function (...args) {
    try {
      return override.call(this, original?.bind(this), ...args);
    } catch (e) {
      console.error("Card-mod", e);
      return original?.bind(this)(...args);
    }
  };
  fn.cm_patched = true;
  obj[method] = fn;
};

export const patch_object = (obj, patch) => {
  if (!obj) return;
  for (const method in Object.getOwnPropertyDescriptors(patch.prototype)) {
    patch_method(obj, method, patch.prototype[method]);
  }
};

export const patch_prototype = async (cls, patch) => {
  if (typeof cls === "string") {
    await customElements.whenDefined(cls);
    cls = customElements.get(cls);
  }

  return patch_object(cls.prototype, patch);
};

// Decorator for patching a custom-element
export function patch_element(element) {
  return function patched(constructor) {
    patch_prototype(element, constructor);
  };
}
