import { hass } from "card-tools/src/hass";

function refresh_theme() {
  document.dispatchEvent(new Event("cm_update"));
}

const bases = [
  customElements.whenDefined("home-assistant"),
  customElements.whenDefined("hc-main"),
];
Promise.race(bases).then(() => {
  window.setTimeout(() => {
    hass().connection.subscribeEvents(() => {
      window.setTimeout(refresh_theme, 500);
    });
    document
      .querySelector("home-assistant")
      ?.addEventListener("settheme", refresh_theme);

    document
      .querySelector("hc-main")
      ?.addEventListener("settheme", refresh_theme);
  }, 1000);
});
