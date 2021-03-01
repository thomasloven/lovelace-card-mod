import { fireEvent } from "card-tools/src/event.js";
import { selectTree } from "card-tools/src/helpers";
import { applyToElement } from "../helpers";

customElements.whenDefined("hui-root").then(() => {
  const HuiRoot = customElements.get("hui-root");
  if (HuiRoot.prototype.cardmod_patched) return;
  HuiRoot.prototype.cardmod_patched = true;

  const _firstUpdated = HuiRoot.prototype.firstUpdated;
  HuiRoot.prototype.firstUpdated = async function (changedProperties) {
    _firstUpdated?.bind(this)(changedProperties);
    applyToElement(this, "root");
  };

  selectTree(
    document,
    "home-assistant$home-assistant-main$app-drawer-layout partial-panel-resolver ha-panel-lovelace$hui-root",
    false
  ).then((root: any) => {
    root?.firstUpdated();
  });
});
