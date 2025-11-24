# card-mod 4

Allows you to apply CSS styles to various elements of the Home Assistant frontend.

## Installing

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=thomasloven&repository=lovelace-card-mod)

Install using HACS or [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

### Performance improvements

While card-mod can be installed as a [lovelace resource](https://www.home-assistant.io/lovelace/dashboards/#resources), some functionality<sup>1</sup> will benefit greatly from it being installed as a [frontend module](https://www.home-assistant.io/integrations/frontend/#extra_module_url) instead.

To do that, add the following to your `configuration.yaml` file and restart Home Assistant:

```yaml
frontend:
  extra_module_url:
    - /[card_mod resource URL]
```

#### card_mod resource URL

The card_mod resource URL is dependent on where/how you have installed `card-mod.js`.

- If you installed through HACS, this is likely `/hacsfiles/lovelace-card-mod/card-mod.js?hacstag=12345678901`.
- If you manage resources due to using YAML mode or are not using HACS your resource url may be different.

When installing through HACS your (dashboard) lovelace resource definition will be automatically added in Dashboard resources which you can access via the button below.

[![Open your Home Assistant instance and show your dashboard resources.](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_resources/)

Example Dashboard<sup>2</sup> lovelace resource definition when installed through HACS.

```
/hacsfiles/lovelace-card-mod/card-mod.js?hacstag=12345678901
```

In `configuration.yaml` add this exact path to `frontend:` `extra_module_url:`
When updating card-mod through HACS make sure to update your `extra_module_url:` manually to match. This is critically important as it prevents the resource being loaded twice.

```yaml
frontend:
  extra_module_url:
    - /hacsfiles/lovelace-card-mod/card-mod.js?hacstag=12345678901
```

__NOTE__: If you manage your resource URLs in YAML and do not use CAST, you do not need a resource URL at all. In this case you can just use `extra_module_url`. It is recommended that you use a cache busting technique to assist with caching of old files on update. e.g. `...\card-mod.js?v4.0.0` updating the version when you update card-mod.

_1. Installing card-mod as a Frontend module via `extra_module_url` will provide performance improvements to non-CAST devices e.g. enhanced speed in applying card-mod to cards, especially when using card-mod themes. Installing card-mod as a Frontend module is also required if you are using card-mod to style panels of Home Assistant which are not Lovelace dashboards, as Dashboard resources are not loaded for those panels. This includes styling the sidebar in your theme for these panels._

_2. Dashboard lovelace resource definition is required to enable card-mod to be applied to dashboards on CAST devices._

**IMPORTANT**: 

1. Any resource definitions automatically added by HACS should be kept as is even after adding `extra_module_url`. This enables you to keep track when updating via HACS.
2. Whenever you alter `extra_module_url` you need to restart Home Assistant.

## Quick start

- Open your card in the GUI editor
- Click the "SHOW CODE EDITOR" button at the bottom
- Add the following to the bottom of the code:

```yaml
card_mod:
  style: |
    ha-card {
      color: red;
    }
```

You should see the text of the card turn red as you type. \
You should also see a little brush icon popping up near the "SHOW VISUAL EDITOR" button. This indicates that this card has card-mod code which will not be shown in the visual editor.

![QuickStart](https://user-images.githubusercontent.com/1299821/109144175-23239680-7761-11eb-8c1c-1e33139aa582.png)

## Usage

### Styling cards

Cards are styled by adding the following to the card configuration:

```yaml
card_mod:
  style: <STYLES>
```

If the simplest form, `<STYLES>` is a string of [CSS](https://www.w3schools.com/css/) which will be injected into the appropriate element based on the card type. See [README-application](/README-application.md) for a detailed description on where card-mod is applied in version 4, which is slightly different from previous versions.

> NOTE: card-mod only works on cards that are contained by a hui-card element, or contain a ha-card element. This includes almost every card standard Home Assistant Frontend cards, and most custom cards.
>
> For a card contained by a hui-card element, which is almost every standard Home Assistant Frontend card, styles are injected into a shadowRoot and the bottom most element is `host:`, though in most cases the first element in the shadowRoot is `ha-card`. For many custom cards which do not take advantage of the modern hui-root container, but contain a ha-card element, the styles are injected into ha-card and the bottommost element is `ha-card`. See [README-application](/README-application.md) for more details.

> TIP: Home Assistant themes makes use of [CSS variables](https://www.w3schools.com/css/css3_variables.asp). Those can both be set and used in card-mod - prepended by two dashes:
>
> ```yaml
> card_mod:
>   style: |
>     ha-card {
>       --ha-card-background: teal;
>       color: var(--primary-color);
>     }
> ```

### Styling entities, badges and elements

In `entities` and `glance` cards, [each entity can have options](https://www.home-assistant.io/lovelace/entities/#options-for-entities). Those elements can be styled individually by adding a `card_mod` parameter to the entity configuration.

For those cases, the styles are injected into a shadowRoot, and the bottommost element is thus accessed through `:host`.

This also applies to view badges and elements in `picture-elements` cards.

```yaml
type: entities
entities:
  - entity: light.bed_light
    card_mod:
      style: |
        :host {
          color: red;
          }
  - entity: light.ceiling_lights
    card_mod:
      style: |
        :host {
          color: green;
        }
  - entity: light.kitchen_lights
    card_mod:
      style: |
        :host {
          color: blue;
        }
```

### Changing icons

With card-mod installed, the `<ha-icon>` element - used e.g. by `entities`, `glance` and many more cards - will set it's icon to the value found in the CSS variable `--card-mod-icon` (if present).

It will also set the icon color to the value found in the CSS variable `--card-mod-icon-color` if present. This ignores entity state, but will still dim unless you also set `--card-mod-icon-dim` to `none`.

```yaml
- entity: light.bed_light
  card_mod:
    style: |
      :host {
        --card-mod-icon: mdi:bed;
      }
```

### Templates

All styles may contain [jinja2 templates](https://www.home-assistant.io/docs/configuration/templating/) that will be processed by the Home Assistant backend.

card-mod also makes the following variables available for templates:

- `config` - The entire configuration of the card, entity or badge - (`config.entity` may be of special interest)
- `user` - The name of the currently logged in user
- `browser` - The `browser_id` of your browser, if you have [browser_mod](https://github.com/thomasloven/hass-browser_mod) installed
- `hash` - Whatever comes after `#` in the current URL. card-mod watches for location changes through `location-changed` and `popstate` events so templates will be rebound with the updated `hash`
- `panel` - various information about the panel in view, be it a lovelace dashboard or another panel view. `panel` is a dictionary containing the following panel attributes with example values shown.

  - `panel.fullUrlPath`: "card-mod/another-test-view"
  - `panel.panelComponentName`: "lovelace"
  - `panel.panelIcon`: "mdi:card-bulleted-outline"
  - `panel.panelNarrow`: true
  - `panel.panelRequireAdmin`: false
  - `panel.panelTitle`: "Card Mod"
  - `panel.panelUrlPath`: "card-mod"
  - `panel.panelTitle`: "Card Mod - Test View"
  - `panel.viewNarrow`: true
  - `panel.viewTitle`: "Test View"
  - `panel.viewUrlPath`: "another-test-view"

  You can debug card-mod jinja2 templates by placing the comment `{# card_mod.debug #}` anywhere in your template. You will see debug messages on template binding, value updated, reuse, unbinding and final ubsubscribing. Any template is kept subscribed in cache for a 20s cooldown period to assist with template application, which can bring a slight speed improvememts when switching back and forth to views, or using the same template on cards on different views.

### DOM navigation

Home Assistant makes extensive use of something called [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). This allows for easy reuse of components (such as `ha-card` or `ha-icon`) but causes some problems when trying to apply CSS styles to things.

When exploring the cards in your browsers element inspector you may have come across a line that says something like "`#shadow-root (open)`" (exactly what it says depends on your browser) and have noticed that elements inside that does not inherit the styles from outside.

In order to style elements inside a `#shadow-root`, you will need to make your `style:` a dictionary rather than a string.

For each dictionary entry the key will be used to select one or several elements through a modified [`querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) function. The value of the entry will then be injected into those elements.

> NOTE: The modified `querySelector()` function will replace a dollar sign (`$`) with a `#shadow-root` in the selector.

The process is recursive, so the value may also be a dictionary. A key of "`.`" (a period) will select the current element.

<details><summary>Example:</summary>

Let's change the color of all third level titles (`### like this`) in a markdown card, and also change it's background.

If we look at the card in the element inspector of chrome, it looks like this:

![markdown-card-dom](https://user-images.githubusercontent.com/1299821/109172852-7f97ad80-7783-11eb-928d-21a41854c847.png)

The `<ha-card>` element is the base, and from there we see that we need to go through one `#shadow-root` to reach the `<h3>`. That `#shadow-root` is inside an `<ha-markdown>` element, so our selector will be:

```
ha-markdown$
```

which will find the first `<ha-markdown>` element and then all `#shadow-root`s inside that.

To add the background to the `<ha-card>`, we want to apply the styles to the base element directly, which has the key

```
.
```

This gives the final style:

```yaml
card_mod:
  style:
    ha-markdown$: |
      h3 {
        color: purple;
      }
    .: |
      ha-card {
        background: teal;
      }
```

![DOM-navigation](https://user-images.githubusercontent.com/1299821/109188638-6b5bac80-7793-11eb-90b0-205b80d8fcdb.png)

</details>

> NOTE: The selector chain of the queue will look for one element at a time separated by spaces or "`$`". \
> For each step, only the first match will be selected. \
> But for the final selector of the chain (i.e. in a given dictionary key) **all** matching elements will be selected.
> Chains ending with `$` is a special case for convenience, selecting the shadowroots of all elements.
>
> E.g. the following will select the `div` elements in the first marker on a map card:
>
> ```yaml
> "ha-map $ ha-entity-marker $ div": |
> ```
>
> But the following will select the div elements in all map markers on a map card (because we end the first key on the `ha-entity-marker $` selector and start a new search within each result for `div`):
>
> ```yaml
> "ha-map $ ha-entity-marker $":
>   "div": |
> ```

> NOTE 2: Following on the note above; due to the high level of load order optimization used in Home Assistant, it is not guaranteed that the `ha-entity-marker` elements exist at the time when card-mod is looking for them.
> If you break the chain once more:
>
> ```yaml
> "ha-map $":
>   "ha-entity-marker $":
>     "div": |
> ```
>
> then card-mod will be able to retry looking from the `ha-map $` point at a later time, which may lead to more stable results.
>
> In short; if things seem to be working intermittently - try splitting up the chain into several steps.

<details><summary>Debugging tips</summary>

The DOM navigation can be tricky to get right the first few times, but you'll eventually get the hang of it.

To help you, you can use your browsers Element inspector to see which steps card-mod takes.

- Open up the element inspector and find the base element (e.g. `#shadow-root` or card contained by `<hui-card>` or `<ha-card>` contained by a custom card or other element. See [README-application](/README-application.md) for more details.). This should contain a `<card-mod>` element whether you specified a style or not.
- Make sure the `<card-mod>` element is selected.
- Open up the browsers console (in chrome you can press Esc to open the console and inspector at the same time).
- Type in `$0.card_mod_input` and press enter. \
  This is the style information that step of the chain was given. If this is a string, you're at the end of the chain. If it's an object, you can move on to the next step.
- Type in `$0.card_mod_children` and press enter. \
  This is a set of any `<card-mod>` elements in the next step of any chain. Clicking "card-mod" in the `value:` of the set items will bring you to that `<card-mod>` element in the inspector, and you can keep on inspecting the rest of the chain.
- You can also use `$0.card_mod_parent` to find the parent of any `<card-mod>` element in a chain.

For a bit more information, you can use the following in the configuration of the card you're having problems with. It may or may not help you.

```yaml
card_mod:
  debug: true
```

</details>

### Styling cards without an `<ha-card>` element

Cards that don't have a `<ha-element>` can still be styled by using the supplied `custom:mod-card` card.

This is only necessary in **very very few** instances, and likely to bring more problems than it solves.

Most likely your card contains another card, in which case **that** is the one you should apply the styles to.

Enough warnings.

<details><summary>I know what I'm doing</summary>

```yaml
type: custom:mod-card
card:
  type: custom:beloved-custom-card
  ...
card_mod:
  style: |
    ha-card {
      ...
    }
```

The mod-card will create a `<ha-card>` element and put your card inside that. If you wish to style the ha-card so that it is transparent, include the following style.

```yaml
type: custom:mod-card
card:
  type: custom:beloved-custom-card
  ...
card_mod:
  style: |
    ha-card {
      background: none;
      box-shadow: none;
      border: none;
      transition: none;
    }
```

</details>

## More examples

All my test cases are available in the `test/views` directory.

You can a demo in docker by going to the `test` directory and running:

```
docker-compose up
```

Then going to `http://localhost:8125` and logging in with username `dev` and password `dev`.

Or you could use the vscode devcontainer and run the task "`Run hass`".

## Detailed card-mod application

For details on where card-mod is applied see [README-application](/README-application.md).

## Themes

For instructions on how to develop a card-mod theme, see [README-themes.md](README-themes.md).

## Development

For adding card-mods styling powers to your custom card, see [README-developers.md](README-developers.md).
