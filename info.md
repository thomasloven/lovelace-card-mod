card-mod
========

## Requires Home Assistant verison 0.98 or later

Allows you to add css styles to any lovelace card.

Install `card-mod.js` as a `module`.

## Usage
This is *not* a new card. Instead it *changes the way pretty much any other card works*.

Specifically, it looks for `style:` in any cards configuration, and applies the [CSS](https://www.w3schools.com/css/) specified there to the card.

The basis of almost all lovelace cards is a `ha-card` element, so that's probably where you'd want to start.

Note that some cards (`conditional`, `entity-filter`, `horizontal-stack` and `vertical-stack` as well as some custom cards, like `layout-card`, `auto-entities` and `state-switch` among others) do *not* have a `ha-card` element, and `card-mod` will thus **not** work for those. There is a workaround, though. See FAQ below.

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

## [See repository on github for much more](https://github.com/thomasloven/lovelace-card-mod)
![more](https://user-images.githubusercontent.com/1299821/63809565-eb951d80-c922-11e9-8630-697befb3c95f.png)
