import { patch_element, patch_elements } from "../helpers/patch_function";
import { ModdedElement, apply_card_mod } from "../helpers/apply_card_mod";
import { LitElement } from "lit";

/*
Patch ha-config-* for theme styling

There is no style passed to apply_card_mod here, everything comes only from themes.

This will only work if card-mod loaded as a Frontend module.
*/

const config_elements = [
  "ha-config-dashboard",
  "ha-config-devices-dashboard",
  "ha-config-device-page",
  "ha-config-entities",
  "ha-config-helpers",
  "ha-config-integrations-dashboard",
  "ha-config-integration-page",
  "ha-config-cloud",
  "ha-config-automation",
  "ha-config-scene",
  "ha-config-script",
  "ha-config-blueprint",
  "ha-config-areas-dashboard",
  "ha-config-labels",
  "ha-config-zone",
  "ha-config-lovelace-dashboards",
  "ha-config-voice-assistants-assistants",
  "ha-config-tags",
  "ha-config-person",
  "ha-config-users",
  "ha-config-info",
  "ha-config-system-navigation",
  "ha-config-section-general",
  "ha-config-section-updates",
  "ha-config-repairs-dashboard",
  "ha-config-logs",
  "ha-config-backup",
  "ha-config-section-analytics",
  "ha-config-section-network",
  "dhcp-config-panel",
  "ssdp-config-panel",
  "zeroconf-config-panel",
  "ha-config-hardware",
];

@patch_elements(config_elements)
class HaConfigPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}
