import { findParentCardMod } from "../helpers";

customElements.whenDefined("ha-icon").then(() => {
  const HaIcon = customElements.get("ha-icon");
  if (HaIcon.prototype.cardmod_patched) return;
  HaIcon.prototype.cardmod_patched = true;

  const _firstUpdated = HaIcon.prototype.firstUpdated;
  HaIcon.prototype.firstUpdated = function () {
    _firstUpdated?.bind(this)();

    const updateIcon = () => {
      const icon = window
        .getComputedStyle(this)
        .getPropertyValue("--card-mod-icon");
      if (icon) this.icon = icon.trim();
      const iconColor = window
        .getComputedStyle(this)
        .getPropertyValue("--card-mod-icon-color");
      if (iconColor) this.style.color = iconColor;
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
