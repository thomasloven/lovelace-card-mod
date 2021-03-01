import { applyToElement } from "../helpers";

const ENTITY_STYLES = `
div {
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name {
  min-height: var(--paper-font-body1_-_line-height, 20px);
}
state-badge {
  margin: 8px 0;
}
`;

customElements.whenDefined("hui-glance-card").then(() => {
  const GlanceCard = customElements.get("hui-glance-card");
  if (GlanceCard.prototype.cardmod_patched) return;
  GlanceCard.prototype.cardmod_patched = true;

  const _updated = GlanceCard.prototype.updated;
  GlanceCard.prototype.updated = function (
    changedProperties: Map<string, any>
  ) {
    _updated?.bind(this)(changedProperties);
    for (const e of this.shadowRoot.querySelectorAll("ha-card div.entity")) {
      if (!e.cardmod_patched) {
        e.cardmod_patched = true;
        // Move everything into a shadowRoot so it can be styled more easily
        const root = e.attachShadow({ mode: "open" });
        while (e.firstChild) root.append(e.firstChild);

        // Add the default styles to the shadowRoot too
        const styletag = document.createElement("style");
        root.appendChild(styletag);
        styletag.innerHTML = ENTITY_STYLES;
      }

      const config = e.config || e.entityConf;
      if (config?.card_mod?.class) e.classList.add(config.card_mod.class);

      applyToElement(
        e,
        "glance",
        config?.card_mod?.style || config?.style || "",
        { config }
      );
    }
  };
});
