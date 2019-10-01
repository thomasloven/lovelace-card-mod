export const applyStyle = async function(root, style, params, debug) {

  const debugPrint = function(str){
    if(!debug) return;
    if(typeof str === "string")
      console.log(' '.repeat(2*(debug-1)) + str);
    else
      console.log(str);
  }

  if(!root || !style) return;

  if(root.updateComplete)
    await root.updateComplete;

  if(typeof style === "string") {
    const oldStyleEl = root.querySelector("card-mod");
    if(oldStyleEl) {
      oldStyleEl.update();
      return;
    }

    // Add new style tag to the root element
    const styleEl = document.createElement('card-mod');
    styleEl.template = {
      template: style,
      variables: params.variables,
      entity_ids: params.entity_ids,
    };
    root.appendChild(styleEl);
    debugPrint("Applied styles to:");
    debugPrint(root);
  } else {
    Object.keys(style).forEach((k) => {
      if(k === ".") {
        debugPrint(`Stepping into root of ${root.tagName}`)
        return applyStyle(root, style[k], params, debug?debug+1:0);
      } else if(k === "$") {
        debugPrint(`Stepping into ShadowRoot of ${root.tagName}`)
        return applyStyle(root.shadowRoot, style[k], params, debug?debug+1:0);
      } else {
        debugPrint(`Searching for: "${k}". ${root.querySelectorAll(k).length} matches.`);
        root.querySelectorAll(`${k}`).forEach((el) => {
          debugPrint(`Stepping into ${el.tagName}`)
          applyStyle(el, style[k], params, debug?debug+1:0);
        });
        return;
      }
    });
  }
}
