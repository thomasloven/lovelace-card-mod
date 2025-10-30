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
