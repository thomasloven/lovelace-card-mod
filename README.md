# card-mod BETA BRANCH

You're on the beta branch.

3.0.0 is mostly backwards compatible with 2.X.X, but may behave slightly differently here and there.

I'll write more documentation before actual release (I hope), but know this:

`card_mod:` now replaces `style:` to avoid collisions with other stuff.
`style:` will still work, but `card_mod` unlocks all the new cool features:

```yaml
type: entities
entities:
  - light.bed_light
  - light.kitchen_lights
  - light.ceiling_lights
card_mod: |
  ha-card {
    background: {% if is_state('light.bed_light','on') %} teal {% else %} purple {% endif %};
  }
```

Among those cool features are:

- being able to edit card-modded cards with the GUI editor (a paintbrush indicates that there are more things in the YAML that are unseen)
- Live updates of styles when editing them in the GUI.
- Much less backend load if you're using lots of jinja templates - depends on your particular setup.
- The sidebar can now be modded with a theme - check the art-nouveau theme in the test directory.
- An easy to run demo.
- Probably more stuff that I forgot...
- Oh, and you can set the icon of stuff with an `--icon` css variable:

```
card_mod:
  :host {
    --icon: {%if is_state('light.bed_light', 'on') %}mdi:diamond{% else %}mdi:diamond-outline{%endif%};
  }
```

![ET45THduar](https://user-images.githubusercontent.com/1299821/108611177-3db1e480-73dc-11eb-83d4-a439bd209984.gif)
![chrome_1gr8soC1Tv](https://user-images.githubusercontent.com/1299821/108611178-3f7ba800-73dc-11eb-975e-d28a7ab14763.png)

### Demo:

You need VSCode and Docker.

Clone the entire repo and open it in vscode. You should be asked if you want to reopen it in a Devcontainer. Do this.

When the editor has reloaded, press ctrl+shift+p and select `Tasks: Run Task` and then `Run hass`.

Connect to `http://localhost:8123` in your browser. Username: `dev`, password: `dev`.

---

<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
