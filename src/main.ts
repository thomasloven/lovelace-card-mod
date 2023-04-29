import "./card-mod";
import "./patch/ha-card";
import "./patch/hui-entities-card";
import "./patch/hui-glance-card";
import "./patch/hui-state-label-badge";
import "./patch/hui-view";
import "./patch/hui-root";
import "./patch/ha-more-info-dialog";
import "./patch/ha-sidebar";
import "./patch/hui-card-element-editor";
import "./patch/hui-picture-elements-card";
import "./patch/ha-icon";
import "./mod-card";
import "./theme-watcher";

import { getResources } from "./helpers";

const resources = getResources();
if (resources.some((r) => r.includes("/card-mod.js"))) {
  // console.info("Card-mod is loaded as a module");
} else {
  console.info(
    "You may not be getting optimal performance out of card-mod.\nSee https://github.com/thomasloven/lovelace-card-mod#performance-improvements"
  );
}
