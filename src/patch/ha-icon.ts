import { findParentCardMod } from "../helpers";

const updateIcon = (el) => {
  const styles = window.getComputedStyle(el);

  const filter = styles.getPropertyValue("--card-mod-icon-dim");
  if (filter === "none") el.style.filter = "none";

  const icon = styles.getPropertyValue("--card-mod-icon");
  if (icon) el.icon = icon.trim();

  const color = styles.getPropertyValue("--card-mod-icon-color");
  if (color) el.style.color = color;
};

const bindCardMod = async (el) => {
  if (el.cardmod_bound) return;
  el.cardmod_bound = true;
  const _bind = async () => {
    const cardMods = await findParentCardMod(el);
    for (const cm of cardMods) {
      cm.addEventListener("card-mod-update", async () => {
        await cm.updateComplete;
        updateIcon(el);
      });
    }
    updateIcon(el);
    return cardMods;
  };

  if ((await _bind()).size == 0) window.setTimeout(() => _bind(), 1000);
};

customElements.whenDefined("ha-state-icon").then(() => {
  const HaStateIcon = customElements.get("ha-state-icon");
  if (HaStateIcon.prototype.cardmod_patched) return;
  HaStateIcon.prototype.cardmod_patched = true;

  const _updated = HaStateIcon.prototype.updated;
  HaStateIcon.prototype.updated = function (...args) {
    _updated.bind(this)(...args);
    bindCardMod(this);
    updateIcon(this);
  };
});

customElements.whenDefined("ha-icon").then(() => {
  const HaIcon = customElements.get("ha-icon");
  if (HaIcon.prototype.cardmod_patched) return;
  HaIcon.prototype.cardmod_patched = true;

  const _updated = HaIcon.prototype.updated;
  HaIcon.prototype.updated = function (...args) {
    _updated?.bind(this)(...args);
    bindCardMod(this);
  };
});

customElements.whenDefined("ha-svg-icon").then(() => {
  const HaSvgIcon = customElements.get("ha-svg-icon");
  if (HaSvgIcon.prototype.cardmod_patched) return;
  HaSvgIcon.prototype.cardmod_patched = true;

  const _updated = HaSvgIcon.prototype.updated;
  HaSvgIcon.prototype.updated = function (...args) {
    _updated?.bind(this)(...args);

    if (this.parentNode?.host?.localName === "ha-icon") return;
    bindCardMod(this);
  };
});
