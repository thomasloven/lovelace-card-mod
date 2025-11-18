import { hass } from "./helpers/hass";
import { Unpromise } from "@watchable/unpromise";

function refresh_theme() {
  document.dispatchEvent(new Event("cm_update"));
}

const bases = [
  customElements.whenDefined("home-assistant"),
  customElements.whenDefined("hc-main"),
];
Unpromise.race(bases).then(() => {
  window.setTimeout(async () => {
    const hs = await hass();
    while (!hs) {
      await new Promise((resolve) => window.setTimeout(resolve, 500));
    }
    hs.connection.subscribeEvents(() => {
      window.setTimeout(refresh_theme, 500);
    }, "themes_updated");
    document
      .querySelector("home-assistant")
      ?.addEventListener("settheme", refresh_theme);

    document
      .querySelector("hc-main")
      ?.addEventListener("settheme", refresh_theme);
  }, 1000);
});

export function themesReady(): Promise<void> {
  function _themesReady(hass): boolean {
    // Themes are ready when themes exist and a theme is selected
    return hass?.themes && hass?.themes.themes && hass?.themes.theme;
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    (async () => {
      const hs = await hass();
      if (_themesReady(hs)) {
        settled = true;
        resolve();
        return;
      }
      const id = window.setInterval(async () => {
        const hs = await hass();
        if (_themesReady(hs)) {
          if (!settled) {
            settled = true;
            clearInterval(id);
            clearTimeout(timeoutId);
            resolve();
          }
        }
      }, 500);
      const timeoutId = window.setTimeout(() => {
        if (!settled) {
          settled = true;
          clearInterval(id);
          reject(
            new Error("themesReady: Timeout waiting for themes to become ready")
          );
        }
      }, 30000); // 30 seconds
    })();
  });
}
