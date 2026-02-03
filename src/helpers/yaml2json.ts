const _load_yaml2json = async () => {
  if (customElements.get("developer-tools-event")) return;

  try {
    await customElements.whenDefined("partial-panel-resolver");
    const ppr: any = document.createElement("partial-panel-resolver");

    ppr.hass = {
      panels: [
        {
          url_path: "tmp",
          component_name: "config",
        },
      ],
    };
    ppr._updateRoutes();

    await ppr.routerOptions.routes.tmp.load();
    await customElements.whenDefined("ha-panel-config");
    const hpc: any = document.createElement("ha-panel-config");
    await hpc.routerOptions.routes['developer-tools']?.load();
    await customElements.whenDefined("developer-tools-router");
    const dtr: any = document.createElement("developer-tools-router");
    await dtr.routerOptions.routes.event.load();
  } catch (err) {
    console.error("CARD-MOD: Error loading yaml2json:", err);
  }
};

export const yaml2json = async (yaml) => {
  await _load_yaml2json();
  const el: any = document.createElement("ha-yaml-editor");
  el.hass = {};
  el.hass.localize = (any) => "Invalid YAML";
  el._onChange(new CustomEvent("yaml", { detail: { value: yaml } }));
  if (!el.isValid) {
    console.error("CARD-MOD: Error loading theme yaml:", yaml);
    return {};
  }
  return el.value;
};
