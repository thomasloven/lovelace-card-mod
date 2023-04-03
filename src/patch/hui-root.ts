import { selectTree } from "../helpers/selecttree";
import { applyToElement } from "../helpers";

customElements.whenDefined("hui-root").then(() => {
  const HuiRoot = customElements.get("hui-root");
  if (HuiRoot.prototype.cardmod_patched) return;
  HuiRoot.prototype.cardmod_patched = true;

  const _firstUpdated = HuiRoot.prototype.firstUpdated;
  HuiRoot.prototype.firstUpdated = async function (...args) {
    _firstUpdated?.bind(this)(...args);
    applyToElement(this, "root");
  };

  selectTree(
    document,
    "home-assistant$home-assistant-main$partial-panel-resolver ha-panel-lovelace$hui-root",
    false
  ).then((root: any) => {
    root?.firstUpdated();
  });
});
