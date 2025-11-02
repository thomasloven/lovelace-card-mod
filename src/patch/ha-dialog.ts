import { apply_card_mod, ModdedElement } from "../helpers/apply_card_mod";
import {
  is_patched,
  patch_element,
  patch_prototype,
  set_patched,
} from "../helpers/patch_function";

export function stripHtmlAndFunctions(value: any, seen = new WeakSet()): any {
  if (value == null) return value;
  const t = typeof value;

  // Strip functions
  if (t === "function") return undefined;

  // Strip HTMLElements / Elements (handles different environments)
  if (
    (typeof HTMLElement !== "undefined" && value instanceof HTMLElement) ||
    (typeof Element !== "undefined" && value instanceof Element)
  ) {
    return undefined;
  }

  // Primitives remain
  if (t !== "object") return value;

  // Prevent infinite recursion on circular refs
  if (seen.has(value)) return undefined;
  seen.add(value);

  // Arrays: sanitize elements and remove stripped ones
  if (Array.isArray(value)) {
    const arr = value
      .map((v) => stripHtmlAndFunctions(v, seen))
      .filter((v) => v !== undefined);
    return arr;
  }

  // Objects: sanitize each property
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(value)) {
    const cleaned = stripHtmlAndFunctions(v, seen);
    if (cleaned !== undefined) out[k] = cleaned;
  }
  return out;
}

class HaDialogPatch extends ModdedElement {
  async showDialog(_orig, params, ...rest) {
    await _orig?.(params, ...rest);

    this.requestUpdate();
    this.updateComplete.then(async () => {
      let haDialog: HTMLElement | null =
        this.shadowRoot.querySelector("ha-dialog");
      if (!haDialog) {
        haDialog = this.shadowRoot.querySelector("ha-md-dialog");
      }
      if (!haDialog) {
        haDialog = this.shadowRoot.querySelector("ha-wa-dialog");
      }
      if (!haDialog) {
        // Notification 'dialog' is ha-drawer
        haDialog = this.shadowRoot.querySelector("ha-drawer");
      }
      if (!haDialog) return;

      const cls = `type-${this.localName.replace?.("ha-", "")}`;
      apply_card_mod(
        haDialog as ModdedElement,
        "dialog",
        undefined,
        {
          params: stripHtmlAndFunctions(params),
        },
        false,
        cls
      );
    });
  }
}

function patchDialog(ev: Event) {
  const dialogTag = (ev as CustomEvent).detail?.dialogTag;

  if (dialogTag && !is_patched(dialogTag)) {
    set_patched(dialogTag);
    patch_prototype(dialogTag, HaDialogPatch);
  }
}

window.addEventListener("show-dialog", patchDialog, { capture: true });
