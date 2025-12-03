import "./card-mod";

import "./patch/hui-card";
import "./patch/ha-card";
import "./patch/hui-section";
import "./patch/hui-badge";
import "./patch/hui-heading-badge";

import "./patch/hui-entities-card";
import "./patch/hui-glance-card";
import "./patch/hui-picture-elements-card";

import "./patch/ha-icon";
import "./patch/hui-view";
import "./patch/hui-root";
import "./patch/ha-dialog";
import "./patch/ha-more-info-dialog";
import "./patch/ha-sidebar";
import "./patch/hui-card-element-editor";
import "./patch/ha-panel-config";
import "./patch/ha-panel-developer-tools";
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

// const get_paths = (root, basepath = "") => {
//   let paths = {};
//   paths[`${basepath}`] = root;
//   if (root.shadowRoot) {
//     const pth = `${basepath} $`;
//     paths[pth] = root.shadowRoot;
//     const p = get_paths(root.shadowRoot, pth);
//     Object.entries(p).forEach(([k, v]) => {
//       if (paths[k] === undefined) paths[k] = v;
//     });
//   }
//   for (const el of root.children) {
//     const pth = `${basepath} ${el.localName}`;
//     paths[pth] = el;
//     const p = get_paths(el, pth);
//     Object.entries(p).forEach(([k, v]) => {
//       if (paths[k] === undefined) paths[k] = v;
//     });
//   }

//   return paths;
// };

// (window as any).get_paths = get_paths;
