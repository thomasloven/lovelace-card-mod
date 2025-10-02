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
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-devices-dashboard")
class HaConfigDevicesDashboardPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-device-page")
class HaConfigDevicePagePatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-entities")
class HaConfigEntitiesPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-helpers")
class HaConfigHelpersPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-integrations-dashboard")
class HaConfigIntegrationsDashboardPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-integration-page")
class HaConfigIntegrationsPagePatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-cloud")
class HaConfigCloudPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-automation")
class HaConfigAutomationPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-scene")
class HaConfigScenePatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-script")
class HaConfigScriptPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-blueprint")
class HaConfigBlueprintPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-areas-dashboard")
class HaConfigAreasDashboardPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-labels")
class HaConfigLabelsPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-zone")
class HaConfigZonePatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-lovelace-dashboards")
class HaConfigLovelaceDashboardsPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-voice-assistants-assistants")
class HaConfigVoiceAssistantsAssistantsPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-tags")
class HaConfigTagsPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-person")
class HaConfigPersonPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-users")
class HaConfigUsersPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-info")
class HaConfigInfoPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-system-navigation")
class HaConfigSystemNavigationPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-section-general")
class HaConfigSectionGeneralPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-section-updates")
class HaConfigSectionUpdatesPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-repairs-dashboard")
class HaConfigRepairsDashboardPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-logs")
class HaConfigLogsDashboardPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-backup")
class HaConfigBackupPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-section-analytics")
class HaConfigSectionAnalyticsPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-section-network")
class HaConfigSectionNetworPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("dhcp-config-panel")
class HaDhcpConfigPanelPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ssdp-config-panel")
class HaSsdpConfigPanelPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("zeroconf-config-panel")
class HaZeroconfConfigPanelPatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}

@patch_element("ha-config-hardware")
class HaConfigHardwarePatch extends ModdedElement {
  updated(_orig, ...args) {
    _orig?.(...args);
    apply_card_mod(this, "config");
  }
}


