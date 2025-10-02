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
import "./patch/ha-panel-config";
import "./patch/ha-panel-developer-tools"
import "./patch/hui-picture-elements-card";
import "./patch/ha-icon";
import "./mod-card";
import "./theme-watcher";

const scriptElements = document.querySelectorAll("script");
const resources = [];
for (const script of scriptElements) {
  if (script?.innerText?.trim()?.startsWith("import(")) {
    const imports = script.innerText.split("\n")?.map((e) => e.trim());
    for (const imp of imports) {
      resources.push(imp.replace(/^import\(\"/, "").replace(/\"\);/, ""));
    }
  }
}

if (resources.some((r) => r.includes("/card-mod.js"))) {
  // console.info("Card-mod is loaded as a module");
} else {
  console.info(
    "You may not be getting optimal performance out of card-mod.\nSee https://github.com/thomasloven/lovelace-card-mod#performance-improvements"
  );
}
