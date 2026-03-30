import { apply_uix, ModdedElement } from "../helpers/apply_uix";
import {
  is_patched,
  patch_prototype,
  set_patched,
} from "../helpers/patch_function";


const dialogParams = [];

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
  if (seen.has(value)) return value;
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
  async updated(_orig, args) {
    await _orig?.(args);

    this.updateComplete.then(async () => {
      let haDialog: HTMLElement | null =
        this.shadowRoot.querySelector("ha-dialog");
      if (!haDialog) {
        haDialog = this.shadowRoot.querySelector("ha-adaptive-dialog");
      }
      if (!haDialog) {
        haDialog = this.shadowRoot.querySelector("ha-toast");
      }
      if (!haDialog) {
        haDialog = this.shadowRoot.querySelector("ha-wa-dialog");
      }
      if (!haDialog) {
        haDialog = this.shadowRoot.querySelector("ha-md-dialog");
      }
      if (!haDialog) {
        // Notification 'dialog' is ha-drawer
        haDialog = this.shadowRoot.querySelector("ha-drawer");
      }
      if (!haDialog) return;

      const cls = `type-${this.localName.replace?.("ha-", "")}`;
      apply_uix(
        haDialog as ModdedElement,
        "dialog",
        undefined,
        { params: dialogParams[this.localName] ?? {} },
        false,
        cls
      );
    });
  }
}

function patchDialog(ev: Event) {
  const dialogTag = (ev as CustomEvent).detail?.dialogTag;

  // Home Assistant dialog manager reuses the same dialog element for dialogs of same tag
  // so we can store params to use when patching
  const params = (ev as CustomEvent).detail?.dialogParams;
  if (params) {
    dialogParams[dialogTag] = stripHtmlAndFunctions(params);
  }

  if (dialogTag && !is_patched(dialogTag)) {
    set_patched(dialogTag);
    patch_prototype(dialogTag, HaDialogPatch);
  }
}

function patchNotification(ev: Event) {
  const notificationTag = "notification-manager";
  const params = (ev as CustomEvent).detail;
  if (params) {
    dialogParams[notificationTag] = stripHtmlAndFunctions(params);
  }

  if (notificationTag && !is_patched(notificationTag)) {
    set_patched(notificationTag);
    patch_prototype(notificationTag, HaDialogPatch);
  }
}

window.addEventListener("show-dialog", patchDialog, { capture: true });
window.addEventListener("hass-notification", patchNotification, { capture: true });
