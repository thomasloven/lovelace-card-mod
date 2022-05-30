function hass() {
  if(document.querySelector('hc-main'))
    return document.querySelector('hc-main').hass;

  if(document.querySelector('home-assistant'))
    return document.querySelector('home-assistant').hass;

  return undefined;
}function lovelace_view() {
  var root = document.querySelector("hc-main");
  if(root) {
    root = root && root.shadowRoot;
    root = root && root.querySelector("hc-lovelace");
    root = root && root.shadowRoot;
    root = root && root.querySelector("hui-view") || root.querySelector("hui-panel-view");
    return root;
  }

  root = document.querySelector("home-assistant");
  root = root && root.shadowRoot;
  root = root && root.querySelector("home-assistant-main");
  root = root && root.shadowRoot;
  root = root && root.querySelector("app-drawer-layout partial-panel-resolver");
  root = root && root.shadowRoot || root;
  root = root && root.querySelector("ha-panel-lovelace");
  root = root && root.shadowRoot;
  root = root && root.querySelector("hui-root");
  root = root && root.shadowRoot;
  root = root && root.querySelector("ha-app-layout");
  root = root && root.querySelector("#view");
  root = root && root.firstElementChild;
  return root;
}

function fireEvent(ev, detail, entity=null) {
  ev = new Event(ev, {
    bubbles: true,
    cancelable: false,
    composed: true,
  });
  ev.detail = detail || {};
  if(entity) {
    entity.dispatchEvent(ev);
  } else {
    var root = lovelace_view();
    if (root) root.dispatchEvent(ev);
  }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$3=Symbol(),n$3=new Map;class s$3{constructor(t,n){if(this._$cssResult$=!0,n!==e$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){let e=n$3.get(this.cssText);return t$1&&void 0===e&&(n$3.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o$3=t=>new s$3("string"==typeof t?t:t+"",e$3),i$2=(e,n)=>{t$1?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n);}));},S$1=t$1?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$2=window.reactiveElementPolyfillSupport,r$1={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},h$1=(t,i)=>i!==t&&(i==i||t==t),o$2={attribute:!0,type:String,converter:r$1,reflect:!1,hasChanged:h$1};class n$2 extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o();}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e));})),t}static createProperty(t,i=o$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||o$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S$1(i));}else void 0!==i&&s.push(S$1(i));return s}static _$Eh(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$Em)&&void 0!==i?i:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$Em)||void 0===i||i.splice(this._$Em.indexOf(t)>>>0,1);}_$Ep(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$2(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$Eg(t,i,s=o$2){var e,h;const n=this.constructor._$Eh(t,s);if(void 0!==n&&!0===s.reflect){const o=(null!==(h=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==h?h:r$1.toAttribute)(i,s.type);this._$Ei=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Ei=null;}}_$AK(t,i){var s,e,h;const o=this.constructor,n=o._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=o.getPropertyOptions(n),l=t.converter,a=null!==(h=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==h?h:r$1.fromAttribute;this._$Ei=n,this[n]=a(i,t.type),this._$Ei=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||h$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ev=this._$EC());}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$EU();}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$Em)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return !0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,i)=>this._$Eg(i,this[i],t))),this._$ES=void 0),this._$EU();}updated(t){}firstUpdated(t){}}n$2.finalized=!0,n$2.elementProperties=new Map,n$2.elementStyles=[],n$2.shadowRootOptions={mode:"open"},null==e$2||e$2({ReactiveElement:n$2}),(null!==(s$2=globalThis.reactiveElementVersions)&&void 0!==s$2?s$2:globalThis.reactiveElementVersions=[]).push("1.0.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;const i$1=globalThis.trustedTypes,s$1=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$1=`lit$${(Math.random()+"").slice(9)}$`,o$1="?"+e$1,n$1=`<${o$1}>`,l$1=document,h=(t="")=>l$1.createComment(t),r=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d=Array.isArray,u=t=>{var i;return d(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,a=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m=/"/g,g=/^(?:script|style|textarea)$/i,$=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),p=$(1),b=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),x=new WeakMap,w=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A=l$1.createTreeWalker(l$1,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,$=-1,p=0;for(;p<s.length&&(d.lastIndex=p,u=d.exec(s),null!==u);)p=d.lastIndex,d===c?"!--"===u[1]?d=v:void 0!==u[1]?d=a:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,$=-1):void 0===u[1]?$=-2:($=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?m:_):d===m||d===_?d=f:d===v||d===a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n$1:$>=0?(l.push(o),s.slice(0,$)+"$lit$"+s.slice($)+e$1+y):s+e$1+(-2===$?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");return [void 0!==s$1?s$1.createHTML(u):u,l]};class P{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=P.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e$1)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e$1),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(g.test(l.tagName)){const t=l.textContent.split(e$1),s=t.length-1;if(s>0){l.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],h());}}}else if(8===l.nodeType)if(l.data===o$1)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e$1,t+1));)c.push({type:7,index:r}),t+=e$1.length-1;}r++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function V(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=V(t,d._$AS(t,i.values),d,e)),i}class E{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l$1).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=V(this,t,i),r(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):u(t)?this.M(t):this.$(t);}A(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t));}$(t){this._$AH!==T&&r(this._$AH)?this._$AA.nextSibling.data=t:this.S(l$1.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=P.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new E(o,this),i=t.p(this.options);t.m(s),this.S(i),this._$AH=t;}}_$AC(t){let i=x.get(t.strings);return void 0===i&&x.set(t.strings,i=new P(t)),i}M(t){d(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.A(h()),this.A(h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=T;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=V(this,t,i,0),n=!r(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=V(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r(h)||h!==this._$AH[l]),h===T?t=T:t!==T&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.k(t);}k(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}k(t){this.element[this.name]=t===T?void 0:t;}}class k extends S{constructor(){super(...arguments),this.type=4;}k(t){t&&t!==T?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=V(this,t,i,0))&&void 0!==s?s:T)===b)return;const e=this._$AH,o=t===T&&e!==T||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==T&&(e===T||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t);}}const R=window.litHtmlPolyfillSupport;null==R||R(P,N),(null!==(t=globalThis.litHtmlVersions)&&void 0!==t?t:globalThis.litHtmlVersions=[]).push("2.0.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends n$2{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=w(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1);}render(){return b}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.0.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i(e,n)}

const ID_STORAGE_KEY = 'lovelace-player-device-id';
function _deviceID() {
  if(!localStorage[ID_STORAGE_KEY])
  {
    const s4 = () => {
      return Math.floor((1+Math.random())*100000).toString(16).substring(1);
    };
    if(window['fully'] && typeof fully.getDeviceId === "function")
      localStorage[ID_STORAGE_KEY] = fully.getDeviceId();
    else
      localStorage[ID_STORAGE_KEY] = `${s4()}${s4()}-${s4()}${s4()}`;
  }
  return localStorage[ID_STORAGE_KEY];
}
let deviceID = _deviceID();

const setDeviceID = (id) => {
  if(id === null) return;
  if(id === "clear") {
    localStorage.removeItem(ID_STORAGE_KEY);
  } else {
    localStorage[ID_STORAGE_KEY] = id;
  }
  deviceID = _deviceID();
};

const params = new URLSearchParams(window.location.search);
if(params.get('deviceID')) {
  setDeviceID(params.get('deviceID'));
}

window.cardMod_template_cache =
    window.cardMod_template_cache || {};
const cachedTemplates = window
    .cardMod_template_cache;
function template_updated(key, result) {
    const cache = cachedTemplates[key];
    if (!cache) {
        return;
    }
    cache.value = result.result;
    cache.callbacks.forEach((f) => f(result.result));
}
async function bind_template(callback, template, variables) {
    const connection = hass().connection;
    const cacheKey = JSON.stringify([template, variables]);
    let cache = cachedTemplates[cacheKey];
    if (!cache) {
        unbind_template(callback);
        callback("");
        variables = Object.assign({ user: hass().user.name, browser: deviceID, hash: location.hash.substr(1) || "" }, variables);
        cachedTemplates[cacheKey] = cache = {
            template,
            variables,
            value: "",
            callbacks: new Set([callback]),
            unsubscribe: connection.subscribeMessage((result) => template_updated(cacheKey, result), {
                type: "render_template",
                template,
                variables,
            }),
        };
    }
    else {
        if (!cache.callbacks.has(callback))
            unbind_template(callback);
        callback(cache.value);
        cache.callbacks.add(callback);
    }
}
async function unbind_template(callback) {
    let unsubscriber;
    for (const [key, cache] of Object.entries(cachedTemplates)) {
        if (cache.callbacks.has(callback)) {
            cache.callbacks.delete(callback);
            if (cache.callbacks.size == 0) {
                unsubscriber = cache.unsubscribe;
                delete cachedTemplates[key];
            }
            break;
        }
    }
    if (unsubscriber)
        await (await unsubscriber)();
}

function hasTemplate(str) {
  if(String(str).includes("{%"))
    return true;
  if(String(str).includes("{{"))
    return true;
}

var name = "card-mod";
var version = "3.1.4";
var description = "";
var scripts = {
	build: "rollup -c",
	watch: "rollup -c --watch",
	"update-card-tools": "npm uninstall card-tools && npm install thomasloven/lovelace-card-tools"
};
var keywords = [
];
var author = "Thomas Lovén";
var license = "MIT";
var devDependencies = {
	"@babel/core": "^7.16.0",
	"@rollup/plugin-babel": "^5.3.0",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^13.0.6",
	rollup: "^2.59.0",
	"rollup-plugin-terser": "^7.0.2",
	"rollup-plugin-typescript2": "^0.30.0",
	typescript: "^4.4.4"
};
var dependencies = {
	"card-tools": "github:thomasloven/lovelace-card-tools",
	lit: "^2.0.2"
};
var pjson = {
	name: name,
	"private": true,
	version: version,
	description: description,
	scripts: scripts,
	keywords: keywords,
	author: author,
	license: license,
	devDependencies: devDependencies,
	dependencies: dependencies
};

async function _selectTree(root, path, all=false) {
  let el = root;
  if(typeof(path) === "string") {
    path = path.split(/(\$| )/);
  }
  if(path[path.length-1] === "")
     path.pop();
  for(const [i, p] of path.entries()) {
    if(!p.trim().length) continue;
    if(!el) return null;
    if(el.localName && el.localName.includes("-"))
      await customElements.whenDefined(el.localName);
    if(el.updateComplete)
      await el.updateComplete;
    if(p === "$")
      if(all && i == path.length-1)
        el = [el.shadowRoot];
      else
        el = el.shadowRoot;
    else
      if(all && i == path.length-1)
        el = el.querySelectorAll(p);
      else
        el = el.querySelector(p);
  }
  return el;
}

async function selectTree(root, path, all=false, timeout=10000) {
  return Promise.race([
    _selectTree(root, path, all),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
  ]).catch((err) => {
    if(!err.message || err.message !== "timeout")
      throw(err);
    return null;
  });
}

const _load_yaml2json = async () => {
  if(customElements.get("developer-tools-event")) return;

  await customElements.whenDefined("partial-panel-resolver");
  const ppr = document.createElement('partial-panel-resolver');

  ppr.hass = {panels: [{
    url_path: "tmp",
    component_name: "developer-tools",
  }]};
  ppr._updateRoutes();

  await ppr.routerOptions.routes.tmp.load();

  await customElements.whenDefined("developer-tools-router");
  const dtr = document.createElement("developer-tools-router");
  await dtr.routerOptions.routes.event.load();
};

const yaml2json = async (yaml) => {
  await _load_yaml2json();
  const el = document.createElement("developer-tools-event");
  return el._computeParsedEventData(yaml);
};

async function applyToElement(el, type, styles = "", variables = {}, entity_ids = null, // deprecated
shadow = true) {
    var _a;
    if (!el)
        return;
    if ((_a = el.localName) === null || _a === void 0 ? void 0 : _a.includes("-"))
        await customElements.whenDefined(el.localName);
    if (el.updateComplete)
        await el.updateComplete;
    if (el._cardMod === undefined) {
        el._cardMod = [];
    }
    let cardMod;
    for (const cm of el._cardMod) {
        if (cm.type === type) {
            cardMod = cm;
            break;
        }
    }
    if (!cardMod) {
        cardMod = document.createElement("card-mod");
        cardMod.type = type;
        el._cardMod.push(cardMod);
    }
    queueMicrotask(async () => {
        const target = el.modElement
            ? el.modElement
            : shadow
                ? el.shadowRoot || el
                : el;
        if (!target.contains(cardMod))
            target.appendChild(cardMod);
        cardMod.variables = variables;
        cardMod.styles = styles;
    });
    return cardMod;
}
async function get_theme(root) {
    var _a, _b;
    if (!root.type)
        return null;
    const el = root.parentElement ? root.parentElement : root;
    const theme = window
        .getComputedStyle(el)
        .getPropertyValue("--card-mod-theme");
    if (!hass())
        return {};
    const themes = (_b = (_a = hass()) === null || _a === void 0 ? void 0 : _a.themes.themes) !== null && _b !== void 0 ? _b : {};
    if (!themes[theme])
        return {};
    if (themes[theme][`card-mod-${root.type}-yaml`]) {
        return yaml2json(themes[theme][`card-mod-${root.type}-yaml`]);
    }
    else if (themes[theme][`card-mod-${root.type}`]) {
        return { ".": themes[theme][`card-mod-${root.type}`] };
    }
    else {
        return {};
    }
}
function merge_deep(target, source) {
    const isObject = (i) => {
        return i && typeof i === "object" && !Array.isArray(i);
    };
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                if (typeof target[key] === "string")
                    target[key] = { ".": target[key] };
                merge_deep(target[key], source[key]);
            }
            else {
                if (target[key])
                    target[key] = source[key] + target[key];
                else
                    target[key] = source[key];
            }
        }
    }
    return target;
}
function compare_deep(a, b) {
    if (a === b)
        return true;
    if (typeof a !== typeof b)
        return false;
    if (!(a instanceof Object && b instanceof Object))
        return false;
    for (const x in a) {
        if (!a.hasOwnProperty(x))
            continue;
        if (!b.hasOwnProperty(x))
            return false;
        if (a[x] === b[x])
            continue;
        if (typeof a[x] !== "object")
            return false;
        if (!compare_deep(a[x], b[x]))
            return false;
    }
    for (const x in b) {
        if (!b.hasOwnProperty(x))
            continue;
        if (!a.hasOwnProperty(x))
            return false;
    }
    return true;
}
function findConfig(node) {
    if (node.config)
        return node.config;
    if (node._config)
        return node._config;
    if (node.host)
        return findConfig(node.host);
    if (node.parentElement)
        return findConfig(node.parentElement);
    if (node.parentNode)
        return findConfig(node.parentNode);
    return null;
}
function joinSet(dst, src) {
    for (const s of src)
        dst.add(s);
}
async function findParentCardMod(node, step = 0) {
    let cardMods = new Set();
    if (step == 10)
        return cardMods;
    if (!node)
        return cardMods;
    if (node._cardMod) {
        for (const cm of node._cardMod) {
            if (cm.styles)
                cardMods.add(cm);
        }
    }
    if (node.updateComplete)
        await node.updateComplete;
    if (node.parentElement)
        joinSet(cardMods, await findParentCardMod(node.parentElement, step + 1));
    else if (node.parentNode)
        joinSet(cardMods, await findParentCardMod(node.parentNode, step + 1));
    if (node.host)
        joinSet(cardMods, await findParentCardMod(node.host, step + 1));
    return cardMods;
}
function parentElement(el) {
    if (!el)
        return undefined;
    const node = el.parentElement || el.parentNode;
    if (!node)
        return undefined;
    return node.host ? node.host : node;
}
function getResources() {
    var _a, _b, _c;
    const scriptElements = document.querySelectorAll("script");
    const retval = [];
    for (const script of scriptElements) {
        if ((_b = (_a = script === null || script === void 0 ? void 0 : script.innerText) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.startsWith("import(")) {
            const imports = (_c = script.innerText.split("\n")) === null || _c === void 0 ? void 0 : _c.map((e) => e.trim());
            for (const imp of imports) {
                retval.push(imp.replace(/^import\(\"/, "").replace(/\"\);/, ""));
            }
        }
    }
    return retval;
}

class CardMod extends s {
    constructor() {
        super();
        this._rendered_styles = "";
        this._styleChildren = new Set();
        this._observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                if (m.target.localName === "card-mod")
                    return;
                let stop = true;
                if (m.addedNodes.length)
                    m.addedNodes.forEach((n) => {
                        if (n.localName !== "card-mod")
                            stop = false;
                    });
                if (stop)
                    return;
                stop = true;
                if (m.removedNodes.length)
                    m.removedNodes.forEach((n) => {
                        if (n.localName !== "card-mod")
                            stop = false;
                    });
                if (stop)
                    return;
            }
            this.refresh();
        });
        document.addEventListener("cm_update", () => {
            this.refresh();
        });
    }
    static get applyToElement() {
        return applyToElement;
    }
    connectedCallback() {
        super.connectedCallback();
        this._connect();
        this.setAttribute("slot", "none");
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._disconnect();
    }
    set styles(stl) {
        if (compare_deep(stl, this._input_styles))
            return;
        this._input_styles = stl;
        (async () => {
            // Always work with yaml styles internally
            let styles = JSON.parse(JSON.stringify(stl || {}));
            if (typeof styles === "string")
                styles = { ".": styles };
            // Merge card_mod styles with theme styles
            const theme_styles = await get_theme(this);
            merge_deep(styles, theme_styles);
            this._fixed_styles = styles;
            this._connect();
        })();
    }
    get styles() {
        return this._styles;
    }
    refresh() {
        this._connect();
    }
    async _styleChildEl(element, value = undefined) {
        if (value === undefined) {
            // Find the style for the element
            const styles = this._fixed_styles;
            for (const [key, val] of Object.entries(styles)) {
                if (key === ".")
                    continue;
                const elements = await selectTree(this.parentElement || this.parentNode, key, true);
                elements.forEach((el) => {
                    if (el === element) {
                        value = val;
                    }
                });
                if (value !== undefined)
                    break;
            }
            if (value === undefined)
                return;
        }
        if (!element)
            return;
        const child = await applyToElement(element, `${this.type}-child`, value, this.variables, null, false);
        child.refresh;
        return child;
    }
    async _connect() {
        var _a;
        const styles = (_a = this._fixed_styles) !== null && _a !== void 0 ? _a : {};
        const styleChildren = new Set();
        let thisStyle = "";
        let hasChildren = false;
        const parent = this.parentElement || this.parentNode;
        for (const [key, value] of Object.entries(styles)) {
            if (key === ".") {
                thisStyle = value;
            }
            else {
                hasChildren = true;
                const elements = await selectTree(parent, key, true);
                if (!elements)
                    continue;
                for (const el of elements) {
                    const ch = await this._styleChildEl(el, value);
                    if (ch)
                        styleChildren.add(ch);
                }
            }
        }
        // Prune old child elements
        for (const oldCh of this._styleChildren) {
            if (!styleChildren.has(oldCh)) {
                if (oldCh)
                    oldCh.styles = "";
            }
        }
        this._styleChildren = styleChildren;
        if (this._styles === thisStyle)
            return;
        this._styles = thisStyle;
        if (this._styles && hasTemplate(this._styles)) {
            this._renderer = this._renderer || this._style_rendered.bind(this);
            bind_template(this._renderer, this._styles, this.variables);
        }
        else {
            this._style_rendered(this._styles || "");
        }
        if (hasChildren)
            this._observer.observe(parentElement(this), { childList: true });
    }
    async _disconnect() {
        this._observer.disconnect();
        this._styles = "";
        await unbind_template(this._renderer);
    }
    _style_rendered(result) {
        if (this._rendered_styles !== result)
            this._rendered_styles = result;
        this.dispatchEvent(new Event("card-mod-update"));
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return p `
      <style>
        ${this._rendered_styles}
      </style>
    `;
    }
}
__decorate([
    e()
], CardMod.prototype, "_rendered_styles", void 0);
(async () => {
    // Wait for scoped customElements registry to be set up
    // otherwise the customElements registry card-mod is defined in
    // may get overwritten by the polyfill if card-mod is loaded as a module
    while (customElements.get("home-assistant") === undefined)
        await new Promise((resolve) => window.setTimeout(resolve, 100));
    if (!customElements.get("card-mod")) {
        customElements.define("card-mod", CardMod);
        console.info(`%cCARD-MOD ${pjson.version} IS INSTALLED`, "color: green; font-weight: bold");
    }
})();

customElements.whenDefined("ha-card").then(() => {
    const HaCard = customElements.get("ha-card");
    if (HaCard.prototype.cardmod_patched)
        return;
    HaCard.prototype.cardmod_patched = true;
    const _firstUpdated = HaCard.prototype.firstUpdated;
    HaCard.prototype.firstUpdated = function (...args) {
        var _a, _b;
        _firstUpdated === null || _firstUpdated === void 0 ? void 0 : _firstUpdated.bind(this)(...args);
        // Move the header inside the slot instead of in the shadowDOM
        // This makes it easier to style it consistently
        const header = this.shadowRoot.querySelector(".card-header");
        if (header) {
            this.insertBefore(header, this.children[0]);
        }
        const config = findConfig(this);
        if ((_a = config === null || config === void 0 ? void 0 : config.card_mod) === null || _a === void 0 ? void 0 : _a.class)
            this.classList.add(config.card_mod.class);
        if (config === null || config === void 0 ? void 0 : config.type)
            this.classList.add(`type-${config.type.replace(":", "-")}`);
        applyToElement(this, "card", ((_b = config === null || config === void 0 ? void 0 : config.card_mod) === null || _b === void 0 ? void 0 : _b.style) || (config === null || config === void 0 ? void 0 : config.style) || "", { config }, null, false).then((cardMod) => {
            var _a;
            const pn = (_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.host;
            if (!pn)
                return;
            if (pn.setConfig && !pn.setConfig.cm_patched) {
                // Patch the setConfig function to get live updates in GUI editor
                const _setConfig = pn.setConfig;
                pn.setConfig = function (config) {
                    var _a;
                    _setConfig.bind(this)(config);
                    cardMod.variables = { config };
                    cardMod.styles = ((_a = config.card_mod) === null || _a === void 0 ? void 0 : _a.style) || {};
                };
                pn.setConfig.cm_patched = true;
            }
            if (pn.update && !pn.update.cm_patched) {
                const _update = pn.update;
                pn.update = function (changedProperties) {
                    _update.bind(this)(changedProperties);
                    cardMod.refresh();
                    this.updateComplete.then(() => {
                        cardMod.refresh();
                    });
                };
                pn.update.cm_patched = true;
            }
        });
    };
});

customElements.whenDefined("hui-entities-card").then(() => {
    const EntitiesCard = customElements.get("hui-entities-card");
    if (EntitiesCard.prototype.cardmod_patched)
        return;
    EntitiesCard.prototype.cardmod_patched = true;
    const _renderEntity = EntitiesCard.prototype.renderEntity;
    EntitiesCard.prototype.renderEntity = function (config, ...rest) {
        var _a;
        const retval = _renderEntity.bind(this)(config, ...rest);
        if (!retval || !retval.values)
            return retval;
        const row = retval.values[0];
        if (!row)
            return retval;
        if ((config === null || config === void 0 ? void 0 : config.type) === "custom:mod-card")
            return retval;
        if ((_a = config === null || config === void 0 ? void 0 : config.card_mod) === null || _a === void 0 ? void 0 : _a.class)
            row.classList.add(config.card_mod.class);
        if (config === null || config === void 0 ? void 0 : config.type)
            row.classList.add(`type-${config.type.replace(":", "-")}`);
        const apply = () => {
            var _a;
            return applyToElement(row, "row", ((_a = config === null || config === void 0 ? void 0 : config.card_mod) === null || _a === void 0 ? void 0 : _a.style) || (config === null || config === void 0 ? void 0 : config.style) || "", { config });
        };
        this.updateComplete.then(() => apply());
        if (retval.values[0])
            retval.values[0].addEventListener("ll-rebuild", apply);
        return retval;
    };
});

const ENTITY_STYLES = `
div {
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name {
  min-height: var(--paper-font-body1_-_line-height, 20px);
}
state-badge {
  margin: 8px 0;
}
`;
customElements.whenDefined("hui-glance-card").then(() => {
    const GlanceCard = customElements.get("hui-glance-card");
    if (GlanceCard.prototype.cardmod_patched)
        return;
    GlanceCard.prototype.cardmod_patched = true;
    const _updated = GlanceCard.prototype.updated;
    GlanceCard.prototype.updated = function (...args) {
        var _a, _b;
        _updated === null || _updated === void 0 ? void 0 : _updated.bind(this)(...args);
        for (const e of this.shadowRoot.querySelectorAll("ha-card div.entity")) {
            if (!e.cardmod_patched) {
                e.cardmod_patched = true;
                // Move everything into a shadowRoot so it can be styled more easily
                const root = e.attachShadow({ mode: "open" });
                while (e.firstChild)
                    root.append(e.firstChild);
                // Add the default styles to the shadowRoot too
                const styletag = document.createElement("style");
                root.appendChild(styletag);
                styletag.innerHTML = ENTITY_STYLES;
            }
            const config = e.config || e.entityConf;
            if ((_a = config === null || config === void 0 ? void 0 : config.card_mod) === null || _a === void 0 ? void 0 : _a.class)
                e.classList.add(config.card_mod.class);
            applyToElement(e, "glance", ((_b = config === null || config === void 0 ? void 0 : config.card_mod) === null || _b === void 0 ? void 0 : _b.style) || (config === null || config === void 0 ? void 0 : config.style) || "", { config });
        }
    };
});

customElements.whenDefined("hui-state-label-badge").then(() => {
    const HuiStateLabelBadge = customElements.get("hui-state-label-badge");
    if (HuiStateLabelBadge.prototype.cardmod_patched)
        return;
    HuiStateLabelBadge.prototype.cardmod_patched = true;
    const _firstUpdated = HuiStateLabelBadge.prototype.firstUpdated;
    HuiStateLabelBadge.prototype.firstUpdated = function (...args) {
        var _a, _b;
        _firstUpdated === null || _firstUpdated === void 0 ? void 0 : _firstUpdated.bind(this)(...args);
        const config = this._config;
        if ((_a = config === null || config === void 0 ? void 0 : config.card_mod) === null || _a === void 0 ? void 0 : _a.class)
            this.classList.add(config.card_mod.class);
        applyToElement(this, "badge", ((_b = config === null || config === void 0 ? void 0 : config.card_mod) === null || _b === void 0 ? void 0 : _b.style) || (config === null || config === void 0 ? void 0 : config.style) || "", {
            config,
        });
    };
});

customElements.whenDefined("hui-view").then(() => {
    const HuiView = customElements.get("hui-view");
    if (HuiView.prototype.cardmod_patched)
        return;
    HuiView.prototype.cardmod_patched = true;
    const _firstUpdated = HuiView.prototype.firstUpdated;
    HuiView.prototype.firstUpdated = function (...args) {
        _firstUpdated === null || _firstUpdated === void 0 ? void 0 : _firstUpdated.bind(this)(...args);
        applyToElement(this, "view");
    };
});

customElements.whenDefined("hui-root").then(() => {
    const HuiRoot = customElements.get("hui-root");
    if (HuiRoot.prototype.cardmod_patched)
        return;
    HuiRoot.prototype.cardmod_patched = true;
    const _firstUpdated = HuiRoot.prototype.firstUpdated;
    HuiRoot.prototype.firstUpdated = async function (...args) {
        _firstUpdated === null || _firstUpdated === void 0 ? void 0 : _firstUpdated.bind(this)(...args);
        applyToElement(this, "root");
    };
    selectTree(document, "home-assistant$home-assistant-main$app-drawer-layout partial-panel-resolver ha-panel-lovelace$hui-root", false).then((root) => {
        root === null || root === void 0 ? void 0 : root.firstUpdated();
    });
});

customElements.whenDefined("ha-more-info-dialog").then(() => {
    const HaMoreInfoDialog = customElements.get("ha-more-info-dialog");
    if (HaMoreInfoDialog.prototype.cardmod_patched)
        return;
    HaMoreInfoDialog.prototype.cardmod_patched = true;
    const _showDialog = HaMoreInfoDialog.prototype.showDialog;
    HaMoreInfoDialog.prototype.showDialog = function (params, ...rest) {
        _showDialog === null || _showDialog === void 0 ? void 0 : _showDialog.bind(this)(params, ...rest);
        this.requestUpdate();
        this.updateComplete.then(async () => {
            const haDialog = this.shadowRoot.querySelector("ha-dialog");
            if (haDialog) {
                applyToElement(haDialog, "more-info", "", { config: params }, null, false);
            }
        });
    };
    selectTree(document, "home-assistant$ha-more-info-dialog", false).then((root) => {
        if (root) {
            root.showDialog = HaMoreInfoDialog.prototype.showDialog.bind(root);
            root.showDialog({ entityId: root.entityId });
        }
    });
});

customElements.whenDefined("ha-sidebar").then(() => {
    const HaSidebar = customElements.get("ha-sidebar");
    if (HaSidebar.prototype.cardmod_patched)
        return;
    HaSidebar.prototype.cardmod_patched = true;
    const _firstUpdated = HaSidebar.prototype.firstUpdated;
    HaSidebar.prototype.firstUpdated = async function (...args) {
        _firstUpdated === null || _firstUpdated === void 0 ? void 0 : _firstUpdated.bind(this)(...args);
        applyToElement(this, "sidebar");
    };
    selectTree(document, "home-assistant$home-assistant-main$app-drawer-layout app-drawer ha-sidebar", false).then((root) => root === null || root === void 0 ? void 0 : root.firstUpdated());
});

customElements.whenDefined("hui-card-element-editor").then(() => {
    const HuiCardElementEditor = customElements.get("hui-card-element-editor");
    if (HuiCardElementEditor.prototype.cardmod_patched)
        return;
    HuiCardElementEditor.prototype.cardmod_patched = true;
    const _getConfigElement = HuiCardElementEditor.prototype.getConfigElement;
    HuiCardElementEditor.prototype.getConfigElement = async function () {
        const retval = await _getConfigElement.bind(this)();
        // Catch and patch the configElement
        if (retval) {
            const _setConfig = retval.setConfig;
            retval.setConfig = function (config, ...rest) {
                var _a, _b;
                // Strip card_mod from the data that's sent to the config element
                // and put it back after the config has been checked
                const newConfig = JSON.parse(JSON.stringify(config));
                this._cardModData = {
                    card: newConfig.card_mod,
                    entities: [],
                };
                if (newConfig.entities) {
                    for (const [i, e] of (_a = newConfig.entities) === null || _a === void 0 ? void 0 : _a.entries()) {
                        this._cardModData.entities[i] = e.card_mod;
                        delete e.card_mod;
                    }
                }
                delete newConfig.card_mod;
                _setConfig.bind(this)(newConfig, ...rest);
                if (newConfig.entities) {
                    for (const [i, e] of (_b = newConfig.entities) === null || _b === void 0 ? void 0 : _b.entries()) {
                        if (this._cardModData.entities[i])
                            e.card_mod = this._cardModData.entities[i];
                    }
                }
            };
        }
        return retval;
    };
    const _handleUIConfigChanged = HuiCardElementEditor.prototype._handleUIConfigChanged;
    HuiCardElementEditor.prototype._handleUIConfigChanged = function (ev, ...rest) {
        if (this._configElement && this._configElement._cardModData) {
            const cardMod = this._configElement._cardModData;
            if (cardMod.card)
                ev.detail.config.card_mod = cardMod.card;
        }
        _handleUIConfigChanged.bind(this)(ev, ...rest);
    };
});
customElements.whenDefined("hui-dialog-edit-card").then(() => {
    const HuiDialogEditCard = customElements.get("hui-dialog-edit-card");
    if (HuiDialogEditCard.prototype.cardmod_patched)
        return;
    HuiDialogEditCard.prototype.cardmod_patched = true;
    const _updated = HuiDialogEditCard.prototype.updated;
    HuiDialogEditCard.prototype.updated = function (...args) {
        _updated === null || _updated === void 0 ? void 0 : _updated.bind(this)(...args);
        this.updateComplete.then(async () => {
            var _a, _b, _c;
            if (!this._cardModIcon) {
                this._cardModIcon = document.createElement("ha-icon");
                this._cardModIcon.icon = "mdi:brush";
            }
            const button = this.shadowRoot.querySelector("mwc-button[slot=secondaryAction]");
            if (!button)
                return;
            button.appendChild(this._cardModIcon);
            if (((_a = this._cardConfig) === null || _a === void 0 ? void 0 : _a.card_mod) ||
                ((_c = (_b = this._cardConfig) === null || _b === void 0 ? void 0 : _b.entities) === null || _c === void 0 ? void 0 : _c.some((e) => e.card_mod))) {
                this._cardModIcon.style.visibility = "visible";
            }
            else {
                this._cardModIcon.style.visibility = "hidden";
            }
        });
    };
});

customElements.whenDefined("hui-picture-elements-card").then(() => {
    const HuiPictureElementsCard = customElements.get("hui-picture-elements-card");
    if (HuiPictureElementsCard.prototype.cardmod_patched)
        return;
    HuiPictureElementsCard.prototype.cardmod_patched = true;
    const _setConfig = HuiPictureElementsCard.prototype.setConfig;
    HuiPictureElementsCard.prototype.setConfig = function (...args) {
        var _a, _b;
        _setConfig === null || _setConfig === void 0 ? void 0 : _setConfig.bind(this)(...args);
        for (const [i, el] of this._elements.entries()) {
            const config = this._config.elements[i];
            if ((_a = config === null || config === void 0 ? void 0 : config.card_mod) === null || _a === void 0 ? void 0 : _a.class)
                el.classList.add(config.card_mod.class);
            if (config === null || config === void 0 ? void 0 : config.type)
                el.classList.add(`type-${config.type.replace(":", "-")}`);
            applyToElement(el, "element", (_b = config === null || config === void 0 ? void 0 : config.card_mod) === null || _b === void 0 ? void 0 : _b.style, { config });
        }
    };
});

customElements.whenDefined("ha-icon").then(() => {
    const HaIcon = customElements.get("ha-icon");
    if (HaIcon.prototype.cardmod_patched)
        return;
    HaIcon.prototype.cardmod_patched = true;
    const _firstUpdated = HaIcon.prototype.firstUpdated;
    HaIcon.prototype.firstUpdated = function (...args) {
        _firstUpdated === null || _firstUpdated === void 0 ? void 0 : _firstUpdated.bind(this)(...args);
        const updateIcon = () => {
            const icon = window
                .getComputedStyle(this)
                .getPropertyValue("--card-mod-icon");
            if (icon)
                this.icon = icon.trim();
            const iconColor = window
                .getComputedStyle(this)
                .getPropertyValue("--card-mod-icon-color");
            if (iconColor)
                this.style.color = iconColor;
        };
        (async () => {
            const cardMods = await findParentCardMod(this);
            for (const cm of cardMods) {
                cm.addEventListener("card-mod-update", async () => {
                    await cm.updateComplete;
                    updateIcon();
                });
            }
            updateIcon();
        })();
    };
});
customElements.whenDefined("ha-svg-icon").then(() => {
    const HaSvgIcon = customElements.get("ha-svg-icon");
    if (HaSvgIcon.prototype.cardmod_patched)
        return;
    HaSvgIcon.prototype.cardmod_patched = true;
    const _firstUpdated = HaSvgIcon.prototype.firstUpdated;
    HaSvgIcon.prototype.firstUpdated = function (...args) {
        var _a, _b;
        _firstUpdated === null || _firstUpdated === void 0 ? void 0 : _firstUpdated.bind(this)(...args);
        if (((_b = (_a = this.parentNode) === null || _a === void 0 ? void 0 : _a.host) === null || _b === void 0 ? void 0 : _b.localName) === "ha-icon")
            return;
        const updateIcon = async () => {
            const icon = window
                .getComputedStyle(this)
                .getPropertyValue("--card-mod-icon");
            if (icon) {
                const haIcon = document.createElement("ha-icon");
                haIcon.icon = icon.trim();
                await haIcon._loadIcon();
                this.path = haIcon._path;
            }
            const iconColor = window
                .getComputedStyle(this)
                .getPropertyValue("--card-mod-icon-color");
            if (iconColor)
                this.style.color = iconColor;
        };
        const bindCM = async () => {
            const cardMods = await findParentCardMod(this);
            for (const cm of cardMods) {
                cm.addEventListener("card-mod-update", async () => {
                    await cm.updateComplete;
                    updateIcon();
                });
            }
            updateIcon();
            return cardMods;
        };
        (async () => {
            if ((await bindCM()).size == 0)
                window.setTimeout(() => bindCM(), 1000);
        })();
    };
});

const NO_STYLE = `
ha-card {
  background: none;
  box-shadow: none;
}`;
class ModCard extends s {
    setConfig(config) {
        var _a;
        this._config = JSON.parse(JSON.stringify(config));
        let style = ((_a = this._config.card_mod) === null || _a === void 0 ? void 0 : _a.style) || this._config.style;
        if (style === undefined) {
            style = NO_STYLE;
        }
        else if (typeof style === "string") {
            style = NO_STYLE + style;
        }
        else if (style["."]) {
            style["."] = NO_STYLE + style["."];
        }
        else {
            style["."] = NO_STYLE;
        }
        this._config.card_mod = { style };
        this.build_card(config.card);
    }
    async build_card(config) {
        if (this._hass === undefined)
            await new Promise((resolve) => (this._hassResolve = resolve));
        this._hassResolve = undefined;
        const helpers = await window.loadCardHelpers();
        this.card = await helpers.createCardElement(config);
        this.card.hass = this._hass;
    }
    firstUpdated() {
        window.setTimeout(() => {
            var _a, _b;
            if ((_b = (_a = this.card) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector("ha-card")) {
                console.info("%cYou are doing it wrong!", "color: red; font-weight: bold");
                let cardName = this.card.localName.replace(/hui-(.*)-card/, "$1");
                console.info(`mod-card should NEVER be used with a card that already has a ha-card element, such as ${cardName}`);
            }
        }, 3000);
    }
    set hass(hass) {
        this._hass = hass;
        if (this.card)
            this.card.hass = hass;
        if (this._hassResolve)
            this._hassResolve();
    }
    render() {
        return p ` <ha-card modcard> ${this.card} </ha-card> `;
    }
    getCardSize() {
        if (this._config.report_size)
            return this._config.report_size;
        let ret = this.shadowRoot;
        if (ret)
            ret = ret.querySelector("ha-card card-maker");
        if (ret)
            ret = ret.getCardSize;
        if (ret)
            ret = ret();
        if (ret)
            return ret;
        return 1;
    }
}
__decorate([
    e()
], ModCard.prototype, "card", void 0);
(async () => {
    // See explanation in card-mod.ts
    while (customElements.get("home-assistant") === undefined)
        await new Promise((resolve) => window.setTimeout(resolve, 100));
    if (!customElements.get("mod-card")) {
        customElements.define("mod-card", ModCard);
    }
})();

function refresh_theme() {
    document.dispatchEvent(new Event("cm_update"));
}
const bases = [
    customElements.whenDefined("home-assistant"),
    customElements.whenDefined("hc-main"),
];
Promise.race(bases).then(() => {
    window.setTimeout(async () => {
        var _a, _b;
        while (!hass()) {
            await new Promise((resolve) => window.setTimeout(resolve, 500));
        }
        hass().connection.subscribeEvents(() => {
            window.setTimeout(refresh_theme, 500);
        }, "themes_updated");
        (_a = document
            .querySelector("home-assistant")) === null || _a === void 0 ? void 0 : _a.addEventListener("settheme", refresh_theme);
        (_b = document
            .querySelector("hc-main")) === null || _b === void 0 ? void 0 : _b.addEventListener("settheme", refresh_theme);
    }, 1000);
});

window.getResources = getResources;
const resources = getResources();
if (resources.some((r) => r.endsWith("card-mod.js"))) {
    console.info("Card-mod is loaded as a module");
}
else {
    fireEvent("ll-rebuild", {});
    console.info("You may not be getting optimal performance out of card-mod.\nSee https://github.com/thomasloven/lovelace-card-mod#performance-improvements");
}
