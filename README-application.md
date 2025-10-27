## card-mod v4 application

Card-mod v4 updated the method of application cover near 100% of standard Home Assistant Frontend cards while still supporting custom cards not utilising the modern hui-card container for child cards.

### Standard card structure

- Using `tile` card as an example.
- Does not apply card-mod at card level (`tile`) as you would need many different CSS rules which would make theming a nightmare.
- Base CSS styles via `:host { }`.

```console
hui-card           ⇐ card-mod v4 patches here
  ↳ tile           ⇐ this is `:host` for `hui-card` card-mod and where card-mod `class` is set
    ↳ shadowRoot   ⇐ card-mod applies here
      ↳ ha-card    ⇐ card-mod v4 also patches here but ignores due to known standard structure
```

### Custom card strcture - button-card as an examples

- As hui-card is still patched you could apply CSS vars via `:host { }`.
- Likewise, you could use yaml selector paths from `hui-card`. See comments below.
- Legacy ha-card patch and appliation is at ha-card level where `ha-card { }` will work.

```console
hui-card                 ⇐ card-mod v4 patches here
  ↳ button-card          ⇐ this is `:host` for `hui-card` card-mod and where card-mod `class` is set
    ↳ shadowRoot         ⇐ card-mod v4 applies here
      ↳div
        ↳ ha-card        ⇐ card-mod v4 patches and applies here, does not ignore as it is not a standard structure. This is what the infamous v3.5 did not do. card-mod class is also be set here.
          ↳ shadowRoot
```

### Custom card structure - streamline-card with tile template

- As hui-card is still patched you could apply CSS vars via `:host { }`.
- Likewise, you could use yaml selector paths from `hui-card`. See comments below.
- Legacy ha-card patch and apply is at ha-card level where `ha-card { }` will work.

```console
hui-card                 ⇐ card-mod v4 patches here
  ↳ streamline-card      ⇐ this is `:host` for `hui-card` card-mod and where card-mod `class` is set
    ↳ shadowRoot         ⇐ card-mod v4 applies here
      ↳ tile
        ↳ shadowRoot
          ↳ ha-card      ⇐ card-mod v4 patches and applies here, does not ignore as it is not a standard structure. This is what the infamous v3.5 did not do. card-mod class is also be set here.
            ↳ shadowRoot
```

## Comments

- Custom cards that are wrappers like `streamlined-card` should adopt wrapping in each card in `hui-card`. This gives all benfits of users then including `visibility` conditions or even tempating the new `disabled` config option. These only work 100% when using `hui-card` as a wrapper. This is what `expander-card` (MelleD fork) now does and has 100% success. _NOTE: If you see anything like a history card not updating on first load, that is due to not taking this appaorach_
- `card-mod-card` theme variable applies to new `hui-card` patching and the legacy `ha-card` patching.
- Alternative to above point, when you know there is a parent `hui-card` patch you can adjust your themes to match. e.g. for streamlined-card, the below will work for patching from `hui-card`, the `*` matching the unknown card type (to card-mod) in the streamlined-card structure.

  ```yaml
  card_mod:
    style:
      "* $": |
        ha-card {
          --card-background-color: red;
        }
  ```

  OR

  ```yaml
  card_mod:
    style:
      "* $ ha-card": |
        :host {
          --card-background-color: red;
        }
  ```
