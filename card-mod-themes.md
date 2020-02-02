# Themes and card-mod

This BETA version of card mod can get its styling information from the current Home Assistant theme.

There are four types of items that can be styled:
- cards
- entity-card rows
- glance card icons
- badges

All of those will first look to see if they have a `style:` property defined and, if so, apply it.

If there is no style property, they will look into the current theme for the variables:

`rgb-card-mod-<thing>-json` or `rgb-card-mod-<thing>` in that order where `<thing>` is `card`, `row`, `glance` or `badge`.
If one is found that matches for the current item, it will be applied.

> NOTE: This means the style is applied to *ALL* cards, entity-rows, glance buttons or badges which do *not* have a `style:` implicitly specified.

## Basic styling
`rgb-card-mod-<thing>` corresponds to setting a `style:` property as a string.

E.g. adding the following to your theme:

```yaml
rgb-card-mod-card: |
  ha-card {
    font-variant: small-caps;
  }
  . card-header {
    font-size: 16px;
  }
```

would have the same effect as adding
```yaml
style: |
  ha-card {
      font-variant: small-caps;
  ...etc...
```

to *every* card in your lovelace configuration.


## Advanced styling
`rgb-card-mod-<thing>-json` can be used for the [advanced configuration](https://github.com/thomasloven/lovelace-card-mod#advanced-usage) options of card-mod, but in json format rathern than yaml.

> NOTE: I was unable to get card-mod to parse yaml in a reliable way, so `rgb-card-mod-<thing>-json` *must* be in JSON format. However, I could make it ignore linebreaks, so at least you can prettify the code a little bit...

E.g. adding the following to your theme:

```yaml
rgb-card-mod-badge-json: |
  {
    "ha-state-label-badge": {
      "$": {
        "ha-label-badge": {
          "$": ".label-badge {
            border-style: dashed !important;
          }"
        }
      }
    }
  }
```

would make all your badges have a dashed border.


## Templates
Jinja2 templates can be used in the same way as ordinary card-mod:

```yaml
rgb-card-mod-row: |
  :host {
    color: {%if is_state(config.entity, 'on') %}green{% else %}red{% endif %};
  }
```


## Helper classes

Card-mod adds a special css class to each element that has a `type:` property. The class name is `type-<value>`.

E.g. the following would make the background of glance cards red, but all other cards blue:

```yaml
rgb-card-mod-card: |
  ha-card {
    --ha-card-background: blue;
  }
  ha-card.type-glance {
    --ha-card-background: red;
  }
```

Further, card-mod looks for a `class:` property and if present adds that class to the element:

```yaml
# Lovelace config
type: entities
class: light-list
entities:
  - light.bed_light
  - light.kitchen_lights
  - light.ceiling-lights
```

```yaml
# theme
rgb-card-mod-card: |
  ha-card.light-list {
    ...this applies only to the light-list card...
  }
```

### FAQ
- What's up with the `rgb-` prefix?

I don't know. For some reason Home Assistant won't try to apply stuff prefixed with `rgb-` to the global styles when loading a theme. That's all I need to know...
