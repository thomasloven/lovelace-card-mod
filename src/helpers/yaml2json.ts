const _load_yaml2json = async () => {
  if (customElements.get("developer-tools-event")) return;

  await customElements.whenDefined("partial-panel-resolver");
  const ppr: any = document.createElement("partial-panel-resolver");

  ppr.hass = {
    panels: [
      {
        url_path: "tmp",
        component_name: "developer-tools",
      },
    ],
  };
  ppr._updateRoutes();

  await ppr.routerOptions.routes.tmp.load();

  await customElements.whenDefined("developer-tools-router");
  const dtr: any = document.createElement("developer-tools-router");
  await dtr.routerOptions.routes.event.load();
};

export const yaml2json = async (yaml) => {
  await _load_yaml2json();
  const el: any = document.createElement("developer-tools-event");
  return el._computeParsedEventData(yaml);
};
