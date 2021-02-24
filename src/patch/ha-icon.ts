import { findParentCardMod } from "../helpers";

customElements.whenDefined("ha-icon").then(() => {
  const HaIcon = customElements.get("ha-icon");

  const _firstUpdated = HaIcon.prototype.firstUpdated;
  HaIcon.prototype.firstUpdated = function () {
    _firstUpdated.bind(this)();

    const updateIcon = () => {
      const icon = window.getComputedStyle(this).getPropertyValue("--icon");
      if (icon) this.icon = icon.trim();
    };

    (async () => {
      const cardMods = await findParentCardMod(this);

      for (const cm of cardMods) {
        cm.addEventListener("card-mod-update", async () => {
          await cm.updateComplete;
          updateIcon();
        });
      }

      updateIcon();
    })();
  };
});
