import { hass } from "card-tools/src/hass"

interface CachedTemplate {
  template: string;
  variables: object;
  value: string;
  callbacks: Set<(string) => void>;
  unsubscribe: Promise<() => void>;
}

interface RenderTemplateResult {
  result: string;
  listeners: any;
}

(window as any).cardMod_template_cache = (window as any).cardMod_template_cache || {}

const cachedTemplates: Record<string, CachedTemplate> = (window as any).cardMod_template_cache;

function template_updated(key: string, result: RenderTemplateResult): Promise<void> {
  const cache = cachedTemplates[key];
  if (!cache) {
    return;
  }
  cache.value = result.result;
  cachedTemplates[key] = cache;
  cache.callbacks.forEach((f) => f(result.result));
}

export async function bind_template(callback: (string) => void, template: string, variables: object): Promise<void> {
  const connection = hass().connection;

  const cacheKey = JSON.stringify([template, variables]);
  let cache = cachedTemplates[cacheKey];
  if (!cache) {
    callback("");

    cache = {
      template,
      variables,
      value: "",
      callbacks: new Set([callback]),
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
    callback(cache.value);
    cache.callbacks.add(callback);
  }
  cachedTemplates[cacheKey] = cache;
}

export async function unbind_template(callback: (string) => void): Promise<void> {
  let unsubscriber;
  for (const [key, cache] of Object.entries(cachedTemplates)) {
    if (cache.callbacks.has(callback)) {
      cache.callbacks.delete(callback);
      if (cache.callbacks.size == 0) {
        unsubscriber = cache.unsubscribe;
        delete cachedTemplates[key];
        break;
      }
      cachedTemplates[key] = cache;
      break;
    }
  }
  if(unsubscriber)
    await (await unsubscriber)();
}
