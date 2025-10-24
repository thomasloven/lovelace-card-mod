import { hass } from "./hass";
import { BrowserID } from "./browser_id";

interface CachedTemplate {
  template: string;
  variables: object;
  value: string;
  debug: boolean;
  callbacks: Set<(string) => void>;
  unsubscribe: Promise<() => Promise<void>>;
}

interface RenderTemplateResult {
  result: string;
  listeners: any;
}

(window as any).cardMod_template_cache =
  (window as any).cardMod_template_cache || {};

const cachedTemplates: Record<string, CachedTemplate> = (window as any)
  .cardMod_template_cache;

function template_updated(
  key: string,
  result: RenderTemplateResult
): Promise<void> {
  const cache = cachedTemplates[key];
  if (!cache) {
    return;
  }
  cache.value = result.result;
  if (cache.debug) {
    console.groupCollapsed("CardMod: Template updated");
    console.log("Template:", cache.template);
    console.log("Variables:", cache.variables);
    console.log("Value:", cache.value);
    console.groupEnd();
  }
  cache.callbacks.forEach((f) => f(result.result));
}

export function hasTemplate(str) {
  if (!str) return false;
  return String(str).includes("{%") || String(str).includes("{{");
}

export async function bind_template(
  callback: (string) => void,
  template: string,
  variables: object
): Promise<void> {
  const hs = await hass();
  const connection = hs.connection;

  const cacheKey = JSON.stringify([template, variables]);
  let cache = cachedTemplates[cacheKey];
  if (!cache) {
    let debug = false;
    unbind_template(callback);
    callback("");

    variables = {
      user: hs.user.name,
      browser: BrowserID(),
      hash: location.hash.substr(1) || "",
      ...variables,
    };

    if (template.includes("card_mod.debug")) {
      debug = true;
      console.groupCollapsed("CardMod: Binding template");
      console.log("Template:", template);
      console.log("Variables:", variables);
      console.groupEnd();
    }

    cachedTemplates[cacheKey] = cache = {
      template,
      variables,
      value: "",
      callbacks: new Set([callback]),
      debug,
      unsubscribe: connection.subscribeMessage(
        (result: RenderTemplateResult) => template_updated(cacheKey, result),
        {
          type: "render_template",
          template,
          variables,
        }
      ),
    };
  } else {
    if (cache.debug) {
      console.groupCollapsed("CardMod: Reusing template");
      console.log("Template:", template);
      console.log("Variables:", variables);
      console.groupEnd();
    }
    if (!cache.callbacks.has(callback)) unbind_template(callback);
    callback(cache.value);
    cache.callbacks.add(callback);
  }
}

export async function unbind_template(
  callback: (string) => void
): Promise<void> {
  let unsubscriber: Promise<() => Promise<void>>;
  for (const [key, cache] of Object.entries(cachedTemplates)) {
    if (cache.callbacks.has(callback)) {
      cache.callbacks.delete(callback);
      if (cache.callbacks.size == 0) {
        if (cache.debug) {
          console.groupCollapsed("CardMod: Unbinding template");
          console.log("Template:", cache.template);
          console.log("Variables:", cache.variables);
          console.groupEnd();
        }
        unsubscriber = cache.unsubscribe;
        delete cachedTemplates[key];
      }
      break;
    }
  }
  if (unsubscriber) await (await unsubscriber)();
}
