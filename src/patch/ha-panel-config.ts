import { patch_element } from "../helpers/patch_function";
import { ModdedElement, apply_card_mod } from "../helpers/apply_card_mod";
import { LitElement } from "lit";

/*
Patch ha-config-* for theme styling

There is no style passed to apply_card_mod here, everything comes only from themes.

This will only work if card-mod loaded as a Frontend module.
*/

@patch_element("ha-config-dashboard")
class HaConfigDashboardPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-devices-dashboard")
class HaConfigDevicesDashboardPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-device-page")
class HaConfigDevicePagePatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-entities")
class HaConfigEntitiesPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-helpers")
class HaConfigHelpersPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-integrations-dashboard")
class HaConfigIntegrationsDashboardPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-integration-page")
class HaConfigIntegrationsPagePatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-cloud")
class HaConfigCloudPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-automation")
class HaConfigAutomationPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-scene")
class HaConfigScenePatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-script")
class HaConfigScriptPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-blueprint")
class HaConfigBlueprintPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-areas-dashboard")
class HaConfigAreasDashboardPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-labels")
class HaConfigLabelsPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-zone")
class HaConfigZonePatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-lovelace-dashboards")
class HaConfigLovelaceDashboardsPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-voice-assistants-assistants")
class HaConfigVoiceAssistantsAssistantsPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-tags")
class HaConfigTagsPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-person")
class HaConfigPersonPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-users")
class HaConfigUsersPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-info")
class HaConfigInfoPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-system-navigation")
class HaConfigSystemNavigationPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-section-general")
class HaConfigSectionGeneralPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-section-updates")
class HaConfigSectionUpdatesPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-repairs-dashboard")
class HaConfigRepairsDashboardPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-logs")
class HaConfigLogsDashboardPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-backup")
class HaConfigBackupPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-section-analytics")
class HaConfigSectionAnalyticsPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-section-network")
class HaConfigSectionNetworkPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("dhcp-config-panel")
class HaDhcpConfigPanelPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ssdp-config-panel")
class HaSsdpConfigPanelPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("zeroconf-config-panel")
class HaZeroconfConfigPanelPatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-hardware")
class HaConfigHardwarePatch extends ModdedElement {
  firstUpdated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}
