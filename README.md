card-mod
========

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

## Requires Home Assistant version 0.98 or later

Allows you to add css styles to any lovelace card.

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

Install `card-mod.js` as a `module`.

```yaml
resources:
  - url: /local/card-mod.js
    type: module
```

## Usage
This is *not* a new card. Instead it *changes the way pretty much any other card works*.

Specifically, it looks for `style:` in any cards configuration, and applies the [CSS](https://www.w3schools.com/css/) specified there to the card.

The basis of almost all lovelace cards is a `ha-card` element, so that's probably where you'd want to start.

Note that some cards (`conditional`, `entity-filter`, `horizontal-stack` and `vertical-stack` as well as some custom cards, like `layout-card`, `auto-entities` and `state-switch` among others) do *not* have a `ha-card` element, and `card-mod` will thus **not** work for those. There is a workaround, though. See [mod-card below](#mod-card).

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

You can also use [templating](https://www.home-assistant.io/docs/configuration/templating/) to change the styles dynamically.

**Example** \
Make an `entity-button` card green when the light is on

```yaml
type: entity-button
entity: light.bed_light
style: |
  ha-card {
    background: {% if is_state('light.bed_light', 'on') %} green {% endif %};
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

![more](https://user-images.githubusercontent.com/1299821/63809565-eb951d80-c922-11e9-8630-697befb3c95f.png)


## Styling entity and glance cards

To make things easier, rows in `entities` cards and buttons in `glance` cards can be styled individually.
For those, the styles will be applied to the shadowRoot of the element, so a good starting point (rather than `ha-card`) would be `:host`:

```yaml
type: entities
entities:
  - light.bed_light
  - entity: light.kitchen_lights
    style: |
      :host {
        color: red;
      }
  - entity: input_number.value
    style: |
      :host {
        --paper-item-icon-color:
          {% if states(config.entity)|int < 50 %}
            blue
          {% else %}
            red
          {% endif %}
          ;
      }
```

## Styling badges

Badges can be styled too, with the base style applied to `:host`.
Note that to change the color of a badge, you need to override the variable for it's default color. I.e. the badges in the example below are normally red, thus the `--label-badge-red` variable is set.

```yaml
badges:
  - entity: sun.sun
    name: Original
  - entity: sun.sun
    style: |
      :host {
        --label-badge-red: purple;
      }
    name: Purple
  - entity: sun.sun
    name: Teal
    style: |
      :host {
        --label-badge-red: teal;
      }
  - entity: sun.sun
    name: Dashed
    style:
      ha-state-label-badge:
        $:
          ha-label-badge:
            $: |
              .label-badge {
                border-style: dashed !important;
              }
```
![badges](https://user-images.githubusercontent.com/1299821/71958861-9da5f580-31f1-11ea-8c70-b1d6b3a69f9b.png)

## Templating
Jinja templates have access to a few special variables. Those are:

- `config` - an object containing the card, entity row or glance button configuration
- `user` - the username of the currently logged in user
- `browser` - the deviceID of the current browser (see [browser_mod](https://github.com/thomasloven/hass-browser_mod)).
- `hash` - the hash part of the current URL.

## Advanced usage

When exploring the cards using the element inspector, you might run into something called a `shadow-root` and notice that you can't apply styles to anything inside that.

In this case, you can make `style:` a dictionary instead of a string, where each key is a [`querySelector` string](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) and it's value styles to apply to it - *recursively*. A key of `$` means go into a `shadow-root` and a key of `.` the current element.

This is not for the faint of heart.

For some extra help, add `debug_cardmod: true` to the card config, and the steps taken to apply the styling will be printed in the browser console. It can be removed later.

**Example**:
Change some things in an `alarm-panel` card.

```yaml
type: alarm-panel
card_icon: mdi:bell
name: Alarm Panel
debug_cardmod: true
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

## Mod-card
There are some cards where card-mod just won't work.
Those cards often are not really *cards* at all, but change how other cards work. Examples include: `conditional`, `entity-filter`, `horizontal-stack` and `vertical-stack` as well as some custom cards, like `layout-card`, `auto-entities` and `state-switch` among others.

For those cases, a special `mod-card` is provided as a workaround:

```yaml
type: custom:mod-card
style: |
  ha-card {
    border: 1px solid green;
  }
card:
  type: vertical-stack
  cards:
    - type: light
      entity: light.bed_light
    - type: light
      entity: light.kitchen_lights
```
![mod-card](https://user-images.githubusercontent.com/1299821/68621707-b71c1100-04d0-11ea-8473-965dbd77b762.png)

> Note: mod-card sets it's own `background` to `transparent`. That means, `--ha-card-background` will have no effect on mod-card itself. Instead, you ahve to modify the `background` property directly.

Mod-card also allows you to manually specify a `cardHeight` of a card. This can be used to slightly modify the behavior of the layout engine of lovelace. See [this description](https://github.com/thomasloven/lovelace-layout-card#auto-layout) for details.
The cardHeight is set with the `report_size:` option:

```yaml
type: custom:mod-card
report_size: 5
card:
  ... etc ...
```


# FAQ

### How do I convert my old card-modder configuration to card-mod?
For cards, you just have to wrap everything in `ha-card {}` and format it as CSS.

So, you go from:
```yaml
style:
  "--ha-card-background": rgba(200, 0, 0, 0.5)
  color: white
```

to
```yaml
style: |
  ha-card {
    --ha-card-background: rgba(200, 0, 0, 0.5);
    color: white
  }
```

For rows in an entities card, you replace `ha-card` with `:host` as described above.

Note that some cards can't be modded with card-mod. See below.

---
<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
