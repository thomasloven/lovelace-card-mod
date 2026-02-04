You can apply card mod styling to things you made by:

```js
customElements.whenDefined("card-mod").then((cardMod) => {
  cardMod.applyToElement(
    el, // The root element
    "type", // Determines which theme variables should apply (card-mod-<type>, card-mod-<type>-yaml)
    config, // The card mod configuration. See below
    variables, // Any variables passed on to jinja templates, preferably { config: <element configuration> }. Default: {}
    shadow // whether the styles should be based in the #shadow-root of el. Default: true
    cls // An extra class to apply to the element. Default: undefined
  )
}
```

The card mod configuration is an object with the following optional properties:

- `style` - card mod style definition (string or object)
- `class` - string or array of classes to apply to the element
- `debug` - boolean to enable debugging mode for the element (default `false`)

## Example

```js
class CardModdingCard extends HTMLElement {
  setConfig(config) {
    this._config = config;
  }

  connectedCallback() {
    const div = document.createElement("div");
    this.appendChild(div);
    div.innerHTML = `
    <h1> This is a custom card</h1>
    It doesn't have a <b>ha-card</b> element, but it will still use any styles for cards from the card-mod configuration or theme.
    `;

    customElements
      .whenDefined("card-mod")
      .then((cardMod) =>
        cardMod.applyToElement(
          div,
          "card",
          this._config.card_mod,
          { config: this._config },
          false,
          "type-custom-card-modding-card"
        )
      );
  }
}

customElements.define("card-modding-card", CardModdingCard);
```

With the following dashboard configuration:

```yaml
type: custom:card-modding-card
card_mod:
  style: |
    h1 {color: blue;}
```

And this theme:

```yaml
test:
  card-mod-theme: test
  card-mod-card-yaml: |
    .: |
      b {
        color: red;
      }
```

We get this:
![bild](https://github.com/thomasloven/lovelace-card-mod/assets/1299821/d1c01db4-50cc-40b6-aeb7-eac8dd173112)
