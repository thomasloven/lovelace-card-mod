import "./card-mod";
import "./patch/ha-card";
import "./patch/hui-entities-card";
import "./patch/hui-glance-card";
import "./patch/hui-state-label-badge";
import "./patch/hui-view";
import "./mod-card"


import {hass} from "card-tools/src/hass";

const compressThemes = () => {

  const themes = hass().themes.themes;

  let p = {
    "card-mod-card-yaml": {},
    "card-mod-card": {},
    "card-mod-row-yaml": {},
    "card-mod-row": {},
    "card-mod-glance-yaml": {},
    "card-mod-glance": {},
    "card-mod-badge-yaml": {},
    "card-mod-badge": {},
    "card-mod-view-yaml": {},
    "card-mod-view": {},
  };

  for (const t in themes) {

    for (const key in p) {
      if(!themes[t][key]) continue;
      const dummy = document.createElement("div");
      dummy.style.setProperty("--compress", themes[t][key]);
      document.documentElement.appendChild(dummy);
      p[key][window.getComputedStyle(dummy).getPropertyValue("--compress")] = themes[t][key];
      document.documentElement.removeChild(dummy);
    }
  }

  window.CardModCompressedStyles = p;
}

compressThemes();
document.querySelector("home-assistant").addEventListener("settheme", compressThemes);


hass().connection.subscribeEvents(() => {
  window.setTimeout(() => compressThemes(), 100);
}, "themes_updated");
