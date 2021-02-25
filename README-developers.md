You can apply card mod styling to things you made by:

```js
customElements.whenDefined("card-mod").then(() => {
  customElements.get('card-mod').applyToElement(
    el, // The root element
    "type", // Determines which theme variables should apply (card-mod-<type>, card-mod-<type>-yaml)
    styles, // The style string or dictonary. Default: ""
    variables, // Any variables passed on to jinja templates, preferably { config: <element configuration> }. Default: {}
    _, // Deprecated. Default: null
    shadow // whether the styles should be based in the #shadow-root of el. Default: true
  )
}
```
