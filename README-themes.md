## Themes

More to come. In the mean time, see [the Wiki](https://github.com/thomasloven/lovelace-card-mod/wiki/Card-mod-Themes).

### card-mod-theme

This is very important!

The theme MUST define a variable `card-mod-theme` which MUST have the same value as the name of the theme.

Eg:

```yaml
my-awesome-theme:
  card-mod-theme: my-awesome-theme

  ... other theme variables go here ...
```

### Theme variables

- `card-mod-card`
- `card-mod-row`
- `card-mod-glance`
- `card-mod-badge`
- `card-mod-heading-badge`
- `card-mod-assist-chip`
- `card-mod-element`

- `card-mod-root`
- `card-mod-view`
- `card-mod-more-info`
- `card-mod-sidebar`
- `card-mod-config`
- `card-mod-panel-custom`
- `card-mod-top-app-bar-fixed`
- `card-mod-dialog`

Also `<any variable>-yaml`.

### Classes

Set a class with:

```yaml
card_mod:
  class: red
```

### Setting debug via theme variables

Just like you can set debug on a card with `card_mod:` -> `debug: true` you can also set debug via a theme variable. This may be the only way to debug a certain type and/or class if styling a panel which is not lovelace or a lovelace strategy dashboard.

You can set debug via:

1. Using the theme variable `card-mod-<type>-debug: true` (defined in your theme YAML file, without the leading `--`) to debug all elements of type `<type>`. In CSS, this variable is referenced as `--card-mod-<type>-debug`.
2. Using the theme variable `card-mod-<type>-<class>-debug: true` (again, without the leading `--` in YAML) to debug all elements of type `<type>` which have class `<class>`. In CSS, reference as `--card-mod-<type>-<class>-debug`. These include both classes that card-mod sets as well as any class you included in card-mod config for a card/element.

Example:

```yaml
my-awesome-theme:
  card-mod-theme: my-awesome-theme

  card-mod-card-debug: true # Debug all elements of card-mod type `card`
```

```yaml
my-awesome-theme:
  card-mod-theme: my-awesome-theme

  card-mod-card-type-energy-sankey-debug: true # Debug card which has card-mod class 'type-energy-sankey'
  card-mod-badge-my-class-debug: true # Debug badges which have my-class set by card-mod config
```
