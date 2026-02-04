import { hass } from "./hass";
import { BrowserID } from "./browser_id";
import { getPanelState } from "./panel";

interface CachedTemplate {
  template: string;
  variables: object;
  value: string;
  debug: boolean;
  callbacks: Set<(string) => void>;
  unsubscribe: Promise<() => Promise<void>>;
  cooldownTimeoutID?: number;
  error?: RenderTemplateError;
}

interface RenderTemplateResult {
  result: string;
  listeners: any;
}

interface RenderTemplateError {
  error: string;
  level: "ERROR" | "WARNING";
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
  if ("error" in result) {
    cache.error = result as unknown as RenderTemplateError;
    cache.value = "";
    if (cache.debug) {
      console.groupCollapsed(`CardMod: Template ${cache.error.level}`);
      console.log( { 
        template: cache.template, 
        variables: cache.variables, 
        value: cache.value,
        error: cache.error
      });
      console.groupEnd();
    }
  } else {
    cache.value = result.result;
    if (cache.debug) {
      console.groupCollapsed("CardMod: Template updated");
      console.log( { 
        template: cache.template, 
        variables: cache.variables, 
        value: cache.value,
        error: cache.error
      });
      console.groupEnd();
    }
  }
  cache.callbacks.forEach((f) => f(cache.value));
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
  const panelState = await getPanelState();
  const connection = hs.connection;

  variables = {
    user: hs.user.name,
    browser: BrowserID(),
    ...panelState,
    ...variables,
  };

  const cacheKey = JSON.stringify([template, variables]);
  let cache = cachedTemplates[cacheKey];
  if (!cache) {
    let debug = false;
    unbind_template(callback);
    callback("");

    if (template.includes("card_mod.debug")) {
      debug = true;
      console.groupCollapsed("CardMod: Binding template");
      console.log( { 
        template, 
        variables
      });
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
          report_errors: debug,
        }
      ),
    };
  } else {
    if (cache.debug) {
      console.groupCollapsed("CardMod: Reusing template");
      console.log( { 
        template: cache.template, 
        variables: cache.variables, 
        value: cache.value,
        error: cache.error
      });
      console.groupEnd();
    }
    if (!cache.callbacks.has(callback)) unbind_template(callback);
    callback(cache.value);
    cache.callbacks.add(callback);
    cache.cooldownTimeoutID && clearTimeout(cache.cooldownTimeoutID);
    cache.cooldownTimeoutID = undefined;
  }
}

export async function unbind_template(
  callback: (string) => void
): Promise<void> {
  for (const [key, cache] of Object.entries(cachedTemplates)) {
    if (cache.callbacks.has(callback)) {
      cache.callbacks.delete(callback);
      if (cache.callbacks.size == 0) {
        if (cache.debug) {
          console.groupCollapsed(
            "CardMod: Template unbound and will be unsubscribed after cooldown"
          );
          console.log( { 
            template: cache.template, 
            variables: cache.variables
          });
          console.groupEnd();
        }
        cache.cooldownTimeoutID = window.setTimeout(
          unsubscribe_template,
          20000,
          key
        );
      }
      break;
    }
  }
}

async function unsubscribe_template(key: string) {
  const cache = cachedTemplates[key];
  if (!cache) return;
  if (cache.cooldownTimeoutID) {
    clearTimeout(cache.cooldownTimeoutID);
  }
  if (cache.debug) {
    console.groupCollapsed("CardMod: Unsubscribing template after cooldown");
    console.log( { 
      template: cache.template, 
      variables: cache.variables
    });
    console.groupEnd();
  }
  delete cachedTemplates[key];
  await (
    await cache.unsubscribe
  )();
}
