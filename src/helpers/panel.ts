import { selectTree } from "./selecttree";

var PanelState: Promise<any> | null = null;

async function _getPanel(document) {
  let _panel = await _getPanel(document);
  while (_panel === null) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    _panel = await _getPanel(document);
  }
  return _panel;

  async function _getPanel(document) {
    let panel = await selectTree(
      document,
      "home-assistant $ home-assistant-main $ partial-panel-resolver>*"
    );
    if (!panel) {
      panel = await selectTree(document, "hc-main $ hc-lovelace");
    }
    if (!panel) {
      panel = await selectTree(document, "hc-main $ hc-lovelace");
    }
    return panel;
  }
}

function _getPanelNameTranslationKey(panel) {
  if (panel?.url_path === "lovelace") {
    return "panel.states" as const;
  }

  if (panel?.url_path === "profile") {
    return "panel.profile" as const;
  }

  return `panel.${panel?.title}` as const;
}

function _panelTitle(panel) {
  if (panel?.hass?.localize) {
    const translationKey = _getPanelNameTranslationKey(panel.panel);
    return panel.hass.localize(translationKey) || panel.panel?.title || "";
  }
  return panel?.panel?.title || "";
}

function _panelAttributes(panel) {
  return {
    panelTitle: _panelTitle(panel),
    panelUrlPath: panel?.route?.prefix?.replace(/^\/|\/$/g, "") || "",
    panelComponentName: panel?.panel?.component_name || "",
    panelIcon: panel?.panel?.icon || "",
    panelNarrow: panel?.narrow || false,
    panelRequireAdmin: panel?.panel?.require_admin || false,
  };
}

async function _viewAttributes(panel) {
  if (panel?.panel?.component_name !== "lovelace") {
    return {
      viewTitle: "",
      viewUrlPath: panel?.route?.path?.replace(/^\/|\/$/g, "") || "",
      viewNarrow: panel?.narrow || false,
    };
  }
  let cnt = 0;
  while (!panel.shadowRoot?.querySelector("hui-root") && cnt < 10) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    cnt++;
  }
  const lovelace = panel.shadowRoot.querySelector("hui-root");
  if (!lovelace) return {};
  const _curView = lovelace._curView || 0;
  return {
    viewTitle: lovelace.config?.views?.[_curView]?.title || "",
    viewUrlPath: lovelace.config?.views?.[_curView]?.path || `${_curView}`,
    viewNarrow: lovelace.narrow || false,
  };
}

async function _current_panel_state() {
  const panel = await _getPanel(document);
  const panelAttributes = _panelAttributes(panel);
  const viewAttributes = await _viewAttributes(panel);
  const fullTitle = [];
  if (panelAttributes.panelTitle) {
    fullTitle.push(panelAttributes.panelTitle);
  }
  if (viewAttributes.viewTitle) {
    fullTitle.push(viewAttributes.viewTitle);
  }
  const fullUrlPath = [];
  if (panelAttributes.panelUrlPath) {
    fullUrlPath.push(panelAttributes.panelUrlPath);
  }
  if (viewAttributes.viewUrlPath) {
    fullUrlPath.push(viewAttributes.viewUrlPath);
  }
  return {
    hash: location.hash.substr(1) || "",
    panel: {
      title: fullTitle.join(" - "),
      fullUrlPath: fullUrlPath.join("/"),
      ...panelAttributes,
      ...viewAttributes,
    },
  };
}

function _panel_state_update() {
  const update = async () => {
    var panelState = await _current_panel_state();
    var browserPath = window.location.pathname.slice(1).toLowerCase();
    var panelPath = panelState.panel.fullUrlPath.toLowerCase();
    let retry = 0;
    while (browserPath !== panelPath && retry++ < 200) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      panelState = await _current_panel_state();
      browserPath = window.location.pathname.slice(1).toLowerCase();
      panelPath = panelState.panel.fullUrlPath.toLowerCase();
    }
    if (browserPath !== panelPath) {
      console.groupCollapsed(
        "Card-mod: cannot resolve Panel information after 2s."
      );
      console.log("Browser path:", browserPath);
      console.log("Panel path:", panelPath);
      console.log("Final panel state:", panelState);
      console.groupEnd();
    }
    return panelState;
  };
  PanelState = new Promise((resolve) => resolve(update()));
}

export function getPanelState(): Promise<any> {
  if (!PanelState) {
    _panel_state_update();
  }
  return PanelState as Promise<any>;
}

window.addEventListener("card-mod-bootstrap", async (ev: CustomEvent) => {
  ev.stopPropagation();
  ["popstate", "location-changed"].forEach((event) => {
    window.addEventListener(event, async () => {
      PanelState = null;
      _panel_state_update();
      PanelState.then(() => {
        document.dispatchEvent(
          new CustomEvent("cm_update", { detail: { variablesChanged: true } })
        );
      });
    });
  });
});
