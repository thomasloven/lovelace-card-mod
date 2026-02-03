## card-mod v4 application

Card-mod v4 updated the method of application cover near 100% of standard Home Assistant Frontend cards while still supporting custom cards not utilising the modern hui-card container for child cards.

Further examples that may assist other users understanding special cases are welcome. Please submit a PR.

### Definitions

1. patch/patching = card_mod is running injected code into the element class
2. application/applying = card_mod applies a card_mod object to element, usually in the shadowRoot, and children as per selectors
3. ignore/ignoring = card_mod element patching code takes no action when running at the element level

### Standard card structure

- Using `tile` card as an example.
- Does not apply card-mod at card level (`tile`) as you would need many different CSS rules which would make theming a nightmare.
- Base CSS styles via `:host { }` or card styles via `ha-card { }`.

```console
hui-card           ⇐ card-mod v4 patches here
  ↳ tile           ⇐ this is `:host` for card-mod and where card-mod `class` is set
    ↳ shadowRoot   ⇐ card-mod applies here, `ha-card` is in light DOM
      ↳ ha-card    ⇐ card-mod v4 also patches here but ignores due to known standard structure
```

### Custom card structure - button-card as an example

- button-card has a `div` before `ha-card`, thus not a standard card structure
- As card (button-card) is still patched you can use CSS vars via `:host { }`.
- Likewise, you could use yaml selector paths. See comments below.
- Legacy ha-card patch and appliation is at ha-card level where `ha-card { }` will work.

```console
hui-card                 ⇐ card-mod v4 patches here
  ↳ button-card          ⇐ this is `:host` for card-mod and where card-mod `class` is set
    ↳ shadowRoot         ⇐ card-mod v4 applies here
      ↳div
        ↳ ha-card        ⇐ card-mod v4 patches and applies here, does not ignore as it is not a standard structure. card-mod class is also be set here.
          ↳ shadowRoot
```

### Custom card structure - streamline-card with tile

- As host card is still patched you could apply CSS vars via `:host { }`.
- Likewise, you could use yaml selector paths. See comments below.
- Legacy ha-card patch and apply for loaded card is at ha-card level where `ha-card { }` will work.

```console
hui-card                 ⇐ card-mod v4 patches here
  ↳ streamline-card      ⇐ this is `:host` for card-mod and where card-mod `class` is set for the host custom card from host card's card_mod config
    ↳ shadowRoot         ⇐ card-mod v4 applies here for host custom card
      ↳ tile
        ↳ shadowRoot
          ↳ ha-card      ⇐ card-mod v4 patches and applies here for card loaded by custom card, does not ignore as it is not a standard structure. card-mod class is set here for card loaded by host custom card from the loaded card's card_mod config
            ↳ shadowRoot
```

## Comments

- Custom cards that are wrappers like `streamlined-card` could adopt wrapping in each card in `hui-card`. This would give all benfits of users who could then include `visibility` conditions or even tempating the new `disabled` config option. These only work 100% when using `hui-card` as a wrapper. This is what `expander-card` now does and has 100% success. _NOTE: If you see anything like a history card not updating on first load, that is due to not taking this appaorach_
- `card-mod-card` theme variable applies to new `hui-card` patching and the legacy `ha-card` patching.
- For situations where you have cards loaded in a standard way, and also by a custom card like layout-card, you can use due CSS selestors to target both in your themes
- When you know there is a parent `hui-card` patch you can adjust your themes to match. e.g. for streamlined-card, the example below will work for patching from `hui-card`, the `*` matching the unknown card type (to card-mod) in the streamlined-card structure.

The examples show card_mod applied to a card. Similar would also work for themes.

### Dual CSS selectors

`:host(.my-class) ha-card` selector for cards loaded by Frontend. `ha-card.myclass` for custom cards using a divergent structure, or for cards loaded by custom cards.

  ```yaml
  card_mod:
    style: |
      :host(.my-class) ha-card,
      ha-card.myclass {
        background-color: red !important;
      }
  ```

### Streamlined-card structure examples

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
