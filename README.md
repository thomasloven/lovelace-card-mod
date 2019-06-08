card-mod
========

Allows you to add css styles to any lovelace card.

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

Install `card-mod.js` as a `module`.

## Usage
This is *not* a new card. Instead it *changes the way pretty much any other card works*.

Specifically, it looks for `style:` in any cards configuration, and applies the [CSS](https://www.w3schools.com/css/) specified there to the card.

The basis of all lovelace cards there's a `ha-card` element, so that's probably where you'd want to start.

---

**Example:**\
Change the text color of an `entities` card to red.

```yaml
type: entities
style: |
  ha-card {
    color: red;
  }
entities:
  - light.bed_light
  - light.ceiling_lights
  - light.kitchen_lights
```

![red text](https://user-images.githubusercontent.com/1299821/59151548-38a8d800-8a35-11e9-875a-64e72fd6f5a6.png)

---

By using the element inspector of your browser ([chrome](https://developers.google.com/web/tools/chrome-devtools/inspect-styles/), [firefox](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Open_the_Inspector), [safari](https://discussions.apple.com/thread/5508711), [explorer](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/gg589500(v=vs.85))) you can find out how cards are built up and what styles they are using.

**Example** \
Make a `glance` card use smallcaps and change the font size of the title

```yaml
type: entities
style: |
  ha-card {
    font-variant: small-caps;
  }
  .card-header {
    font-size: 16px;
  }
entities:
  - light.bed_light
  - light.ceiling_lights
  - light.kitchen_lights
```

![smallcaps](https://user-images.githubusercontent.com/1299821/59151624-9a1d7680-8a36-11e9-9b2d-598c80ff2aa1.png)

You can also use [templates](https://github.com/thomasloven/hass-config/wiki/Mod-plugin-templates) to change the styles dynamically.

**Example** \
Make an `entity-button` card green when the light is on

```yaml
type: entity-button
entity: light.bed_light
style: |
  ha-card {
    background: [[ if(light.bed_light == "on", "green", "") ]];
  }
```

![templates](https://user-images.githubusercontent.com/1299821/59151667-45c6c680-8a37-11e9-819a-ae5a058ac069.png)

Anything you add in `style:` will be put in a `<style>` tag, so you can also use things like css keyframes

**Example** \
Make a blinking button

```yaml
type: entity-button
entity: light.bed_light
style: |
  @keyframes blink {
    50% {
      background: red;
    }
  }
  ha-card {
    animation: blink 2s linear infinite;
  }
```

![Animated](https://user-images.githubusercontent.com/1299821/59151697-f46b0700-8a37-11e9-842e-a1088be149b4.gif)


## More examples
More examples are available [here](https://github.com/thomasloven/lovelace-card-mod/blob/master/src/example.yaml).

![more](https://user-images.githubusercontent.com/1299821/59151861-9f7cc000-8a3a-11e9-90d2-ff192c4c10a7.gif)


## Advanced usage

When exploring the cards using the element inspector, you might run into something called a `shadow-root` and notice that you can't apply styles to anything inside that.

In this case, you can make `style:` a dictionary instead of a string, where each key is a [`querySelector` string](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) and it's value styles to apply to it - *recursively*. A key of `$` means go into a `shadow-root` and a key of `.` the current element.

This is not for the faint of heart.

**Example**:
Change some things in an `alarm-panel` card.

```yaml
type: alarm-panel
card_icon: mdi:bell
name: Alarm Panel
style:
  .: |
    ha-card {
      --mdc-theme-primary: red;
    }
  "#keypad mwc-button":
    $: |
      :host {
        background: blue;
      }
      button {
        font-size: 24px !important;
      }
  "#keypad mwc-button:nth-of-type(12)":
    $: |
      button {
        font-size: 16px !important;
        --mdc-theme-primary: green;
      }
entity: alarm_control_panel.alarm
```

![advanced](https://user-images.githubusercontent.com/1299821/59151780-59732c80-8a39-11e9-9f19-34d3e0dbd8e9.png)

---
<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
