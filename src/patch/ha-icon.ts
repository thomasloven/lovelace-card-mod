import { findParentCardMod } from "../helpers";

customElements.whenDefined("ha-icon").then(() => {
  const HaIcon = customElements.get("ha-icon");
  if (HaIcon.prototype.cardmod_patched) return;
  HaIcon.prototype.cardmod_patched = true;

  const _firstUpdated = HaIcon.prototype.firstUpdated;
  HaIcon.prototype.firstUpdated = function (...args) {
    _firstUpdated?.bind(this)(...args);

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

customElements.whenDefined("ha-svg-icon").then(() => {
  const HaSvgIcon = customElements.get("ha-svg-icon");
  if (HaSvgIcon.prototype.cardmod_patched) return;
  HaSvgIcon.prototype.cardmod_patched = true;

  const _firstUpdated = HaSvgIcon.prototype.firstUpdated;
  HaSvgIcon.prototype.firstUpdated = function (...args) {
    _firstUpdated?.bind(this)(...args);

    if (this.parentNode?.host?.localName === "ha-icon") return;

    const updateIcon = async () => {
      const icon = window
        .getComputedStyle(this)
        .getPropertyValue("--card-mod-icon");
      if (icon) {
        const haIcon: any = document.createElement("ha-icon");
        haIcon.icon = icon.trim();
        await haIcon._loadIcon();
        this.path = haIcon._path;
      }
      const iconColor = window
        .getComputedStyle(this)
        .getPropertyValue("--card-mod-icon-color");
      if (iconColor) this.style.color = iconColor;
    };

    const bindCM = async () => {
      const cardMods = await findParentCardMod(this);
      for (const cm of cardMods) {
        cm.addEventListener("card-mod-update", async () => {
          await cm.updateComplete;
          updateIcon();
        });
      }

      updateIcon();
      return cardMods;
    };

    (async () => {
      if ((await bindCM()).size == 0) window.setTimeout(() => bindCM(), 1000);
    })();
  };
});
