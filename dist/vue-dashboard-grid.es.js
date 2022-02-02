var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot, createCommentVNode, resolveComponent, createTextVNode, toDisplayString, withDirectives, createVNode, withCtx, vShow, pushScopeId, popScopeId, createElementVNode, resolveDirective, createBlock, Fragment, renderList, mergeProps } from "vue";
const domObjects = {
  init: init$3,
  document: null,
  DocumentFragment: null,
  SVGElement: null,
  SVGSVGElement: null,
  SVGElementInstance: null,
  Element: null,
  HTMLElement: null,
  Event: null,
  Touch: null,
  PointerEvent: null
};
function blank() {
}
var domObjects$1 = domObjects;
function init$3(window2) {
  const win2 = window2;
  domObjects.document = win2.document;
  domObjects.DocumentFragment = win2.DocumentFragment || blank;
  domObjects.SVGElement = win2.SVGElement || blank;
  domObjects.SVGSVGElement = win2.SVGSVGElement || blank;
  domObjects.SVGElementInstance = win2.SVGElementInstance || blank;
  domObjects.Element = win2.Element || blank;
  domObjects.HTMLElement = win2.HTMLElement || domObjects.Element;
  domObjects.Event = win2.Event;
  domObjects.Touch = win2.Touch || blank;
  domObjects.PointerEvent = win2.PointerEvent || win2.MSPointerEvent;
}
var isWindow = (thing) => !!(thing && thing.Window) && thing instanceof thing.Window;
let realWindow = void 0;
let win = void 0;
function init$2(window2) {
  realWindow = window2;
  const el = window2.document.createTextNode("");
  if (el.ownerDocument !== window2.document && typeof window2.wrap === "function" && window2.wrap(el) === el) {
    window2 = window2.wrap(window2);
  }
  win = window2;
}
if (typeof window !== "undefined" && !!window) {
  init$2(window);
}
function getWindow(node) {
  if (isWindow(node)) {
    return node;
  }
  const rootNode = node.ownerDocument || node;
  return rootNode.defaultView || win.window;
}
const window$1 = (thing) => thing === win || isWindow(thing);
const docFrag = (thing) => object(thing) && thing.nodeType === 11;
const object = (thing) => !!thing && typeof thing === "object";
const func = (thing) => typeof thing === "function";
const number = (thing) => typeof thing === "number";
const bool = (thing) => typeof thing === "boolean";
const string = (thing) => typeof thing === "string";
const element = (thing) => {
  if (!thing || typeof thing !== "object") {
    return false;
  }
  const _window = getWindow(thing) || win;
  return /object|function/.test(typeof _window.Element) ? thing instanceof _window.Element : thing.nodeType === 1 && typeof thing.nodeName === "string";
};
const plainObject = (thing) => object(thing) && !!thing.constructor && /function Object\b/.test(thing.constructor.toString());
const array = (thing) => object(thing) && typeof thing.length !== "undefined" && func(thing.splice);
var is = {
  window: window$1,
  docFrag,
  object,
  func,
  number,
  bool,
  string,
  element,
  plainObject,
  array
};
const browser = {
  init: init$1,
  supportsTouch: null,
  supportsPointerEvent: null,
  isIOS7: null,
  isIOS: null,
  isIe9: null,
  isOperaMobile: null,
  prefixedMatchesSelector: null,
  pEventTypes: null,
  wheelEvent: null
};
function init$1(window2) {
  const Element = domObjects$1.Element;
  const navigator2 = window2.navigator || {};
  browser.supportsTouch = "ontouchstart" in window2 || is.func(window2.DocumentTouch) && domObjects$1.document instanceof window2.DocumentTouch;
  browser.supportsPointerEvent = navigator2.pointerEnabled !== false && !!domObjects$1.PointerEvent;
  browser.isIOS = /iP(hone|od|ad)/.test(navigator2.platform);
  browser.isIOS7 = /iP(hone|od|ad)/.test(navigator2.platform) && /OS 7[^\d]/.test(navigator2.appVersion);
  browser.isIe9 = /MSIE 9/.test(navigator2.userAgent);
  browser.isOperaMobile = navigator2.appName === "Opera" && browser.supportsTouch && /Presto/.test(navigator2.userAgent);
  browser.prefixedMatchesSelector = "matches" in Element.prototype ? "matches" : "webkitMatchesSelector" in Element.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in Element.prototype ? "mozMatchesSelector" : "oMatchesSelector" in Element.prototype ? "oMatchesSelector" : "msMatchesSelector";
  browser.pEventTypes = browser.supportsPointerEvent ? domObjects$1.PointerEvent === window2.MSPointerEvent ? {
    up: "MSPointerUp",
    down: "MSPointerDown",
    over: "mouseover",
    out: "mouseout",
    move: "MSPointerMove",
    cancel: "MSPointerCancel"
  } : {
    up: "pointerup",
    down: "pointerdown",
    over: "pointerover",
    out: "pointerout",
    move: "pointermove",
    cancel: "pointercancel"
  } : null;
  browser.wheelEvent = domObjects$1.document && "onmousewheel" in domObjects$1.document ? "mousewheel" : "wheel";
}
var browser$1 = browser;
const contains = (array2, target) => array2.indexOf(target) !== -1;
const merge = (target, source) => {
  for (const item of source) {
    target.push(item);
  }
  return target;
};
const from = (source) => merge([], source);
const findIndex = (array2, func2) => {
  for (let i = 0; i < array2.length; i++) {
    if (func2(array2[i], i, array2)) {
      return i;
    }
  }
  return -1;
};
const find = (array2, func2) => array2[findIndex(array2, func2)];
function clone(source) {
  const dest = {};
  for (const prop in source) {
    const value = source[prop];
    if (is.plainObject(value)) {
      dest[prop] = clone(value);
    } else if (is.array(value)) {
      dest[prop] = from(value);
    } else {
      dest[prop] = value;
    }
  }
  return dest;
}
function extend(dest, source) {
  for (const prop in source) {
    dest[prop] = source[prop];
  }
  const ret = dest;
  return ret;
}
let lastTime = 0;
let request;
let cancel;
function init(global2) {
  request = global2.requestAnimationFrame;
  cancel = global2.cancelAnimationFrame;
  if (!request) {
    const vendors = ["ms", "moz", "webkit", "o"];
    for (const vendor of vendors) {
      request = global2[`${vendor}RequestAnimationFrame`];
      cancel = global2[`${vendor}CancelAnimationFrame`] || global2[`${vendor}CancelRequestAnimationFrame`];
    }
  }
  request = request && request.bind(global2);
  cancel = cancel && cancel.bind(global2);
  if (!request) {
    request = (callback) => {
      const currTime = Date.now();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const token = global2.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return token;
    };
    cancel = (token) => clearTimeout(token);
  }
}
var raf = {
  request: (callback) => request(callback),
  cancel: (token) => cancel(token),
  init
};
function normalize(type, listeners, result) {
  result = result || {};
  if (is.string(type) && type.search(" ") !== -1) {
    type = split(type);
  }
  if (is.array(type)) {
    return type.reduce((acc, t) => extend(acc, normalize(t, listeners, result)), result);
  }
  if (is.object(type)) {
    listeners = type;
    type = "";
  }
  if (is.func(listeners)) {
    result[type] = result[type] || [];
    result[type].push(listeners);
  } else if (is.array(listeners)) {
    for (const l of listeners) {
      normalize(type, l, result);
    }
  } else if (is.object(listeners)) {
    for (const prefix in listeners) {
      const combinedTypes = split(prefix).map((p) => `${type}${p}`);
      normalize(combinedTypes, listeners[prefix], result);
    }
  }
  return result;
}
function split(type) {
  return type.trim().split(/ +/);
}
function fireUntilImmediateStopped(event, listeners) {
  for (const listener of listeners) {
    if (event.immediatePropagationStopped) {
      break;
    }
    listener(event);
  }
}
class Eventable {
  constructor(options) {
    this.options = void 0;
    this.types = {};
    this.propagationStopped = false;
    this.immediatePropagationStopped = false;
    this.global = void 0;
    this.options = extend({}, options || {});
  }
  fire(event) {
    let listeners;
    const global2 = this.global;
    if (listeners = this.types[event.type]) {
      fireUntilImmediateStopped(event, listeners);
    }
    if (!event.propagationStopped && global2 && (listeners = global2[event.type])) {
      fireUntilImmediateStopped(event, listeners);
    }
  }
  on(type, listener) {
    const listeners = normalize(type, listener);
    for (type in listeners) {
      this.types[type] = merge(this.types[type] || [], listeners[type]);
    }
  }
  off(type, listener) {
    const listeners = normalize(type, listener);
    for (type in listeners) {
      const eventList = this.types[type];
      if (!eventList || !eventList.length) {
        continue;
      }
      for (const subListener of listeners[type]) {
        const index = eventList.indexOf(subListener);
        if (index !== -1) {
          eventList.splice(index, 1);
        }
      }
    }
  }
  getRect(_element) {
    return null;
  }
}
function nodeContains(parent, child) {
  if (parent.contains) {
    return parent.contains(child);
  }
  while (child) {
    if (child === parent) {
      return true;
    }
    child = child.parentNode;
  }
  return false;
}
function closest(element2, selector) {
  while (is.element(element2)) {
    if (matchesSelector(element2, selector)) {
      return element2;
    }
    element2 = parentNode(element2);
  }
  return null;
}
function parentNode(node) {
  let parent = node.parentNode;
  if (is.docFrag(parent)) {
    while ((parent = parent.host) && is.docFrag(parent)) {
      continue;
    }
    return parent;
  }
  return parent;
}
function matchesSelector(element2, selector) {
  if (win !== realWindow) {
    selector = selector.replace(/\/deep\//g, " ");
  }
  return element2[browser$1.prefixedMatchesSelector](selector);
}
const getParent = (el) => el.parentNode || el.host;
function indexOfDeepestElement(elements) {
  let deepestNodeParents = [];
  let deepestNodeIndex;
  for (let i = 0; i < elements.length; i++) {
    const currentNode = elements[i];
    const deepestNode = elements[deepestNodeIndex];
    if (!currentNode || i === deepestNodeIndex) {
      continue;
    }
    if (!deepestNode) {
      deepestNodeIndex = i;
      continue;
    }
    const currentNodeParent = getParent(currentNode);
    const deepestNodeParent = getParent(deepestNode);
    if (currentNodeParent === currentNode.ownerDocument) {
      continue;
    } else if (deepestNodeParent === currentNode.ownerDocument) {
      deepestNodeIndex = i;
      continue;
    }
    if (currentNodeParent === deepestNodeParent) {
      if (zIndexIsHigherThan(currentNode, deepestNode)) {
        deepestNodeIndex = i;
      }
      continue;
    }
    deepestNodeParents = deepestNodeParents.length ? deepestNodeParents : getNodeParents(deepestNode);
    let ancestryStart;
    if (deepestNode instanceof domObjects$1.HTMLElement && currentNode instanceof domObjects$1.SVGElement && !(currentNode instanceof domObjects$1.SVGSVGElement)) {
      if (currentNode === deepestNodeParent) {
        continue;
      }
      ancestryStart = currentNode.ownerSVGElement;
    } else {
      ancestryStart = currentNode;
    }
    const currentNodeParents = getNodeParents(ancestryStart, deepestNode.ownerDocument);
    let commonIndex = 0;
    while (currentNodeParents[commonIndex] && currentNodeParents[commonIndex] === deepestNodeParents[commonIndex]) {
      commonIndex++;
    }
    const parents = [currentNodeParents[commonIndex - 1], currentNodeParents[commonIndex], deepestNodeParents[commonIndex]];
    if (parents[0]) {
      let child = parents[0].lastChild;
      while (child) {
        if (child === parents[1]) {
          deepestNodeIndex = i;
          deepestNodeParents = currentNodeParents;
          break;
        } else if (child === parents[2]) {
          break;
        }
        child = child.previousSibling;
      }
    }
  }
  return deepestNodeIndex;
}
function getNodeParents(node, limit) {
  const parents = [];
  let parent = node;
  let parentParent;
  while ((parentParent = getParent(parent)) && parent !== limit && parentParent !== parent.ownerDocument) {
    parents.unshift(parent);
    parent = parentParent;
  }
  return parents;
}
function zIndexIsHigherThan(higherNode, lowerNode) {
  const higherIndex = parseInt(getWindow(higherNode).getComputedStyle(higherNode).zIndex, 10) || 0;
  const lowerIndex = parseInt(getWindow(lowerNode).getComputedStyle(lowerNode).zIndex, 10) || 0;
  return higherIndex >= lowerIndex;
}
function matchesUpTo(element2, selector, limit) {
  while (is.element(element2)) {
    if (matchesSelector(element2, selector)) {
      return true;
    }
    element2 = parentNode(element2);
    if (element2 === limit) {
      return matchesSelector(element2, selector);
    }
  }
  return false;
}
function getActualElement(element2) {
  return element2.correspondingUseElement || element2;
}
function getScrollXY(relevantWindow) {
  relevantWindow = relevantWindow || win;
  return {
    x: relevantWindow.scrollX || relevantWindow.document.documentElement.scrollLeft,
    y: relevantWindow.scrollY || relevantWindow.document.documentElement.scrollTop
  };
}
function getElementClientRect(element2) {
  const clientRect = element2 instanceof domObjects$1.SVGElement ? element2.getBoundingClientRect() : element2.getClientRects()[0];
  return clientRect && {
    left: clientRect.left,
    right: clientRect.right,
    top: clientRect.top,
    bottom: clientRect.bottom,
    width: clientRect.width || clientRect.right - clientRect.left,
    height: clientRect.height || clientRect.bottom - clientRect.top
  };
}
function getElementRect(element2) {
  const clientRect = getElementClientRect(element2);
  if (!browser$1.isIOS7 && clientRect) {
    const scroll = getScrollXY(getWindow(element2));
    clientRect.left += scroll.x;
    clientRect.right += scroll.x;
    clientRect.top += scroll.y;
    clientRect.bottom += scroll.y;
  }
  return clientRect;
}
function trySelector(value) {
  if (!is.string(value)) {
    return false;
  }
  domObjects$1.document.querySelector(value);
  return true;
}
function getStringOptionResult(value, target, element2) {
  if (value === "parent") {
    return parentNode(element2);
  }
  if (value === "self") {
    return target.getRect(element2);
  }
  return closest(element2, value);
}
function resolveRectLike(value, target, element2, functionArgs) {
  let returnValue = value;
  if (is.string(returnValue)) {
    returnValue = getStringOptionResult(returnValue, target, element2);
  } else if (is.func(returnValue)) {
    returnValue = returnValue(...functionArgs);
  }
  if (is.element(returnValue)) {
    returnValue = getElementRect(returnValue);
  }
  return returnValue;
}
function rectToXY(rect) {
  return rect && {
    x: "x" in rect ? rect.x : rect.left,
    y: "y" in rect ? rect.y : rect.top
  };
}
function addEdges(edges, rect, delta) {
  if (edges.left) {
    rect.left += delta.x;
  }
  if (edges.right) {
    rect.right += delta.x;
  }
  if (edges.top) {
    rect.top += delta.y;
  }
  if (edges.bottom) {
    rect.bottom += delta.y;
  }
  rect.width = rect.right - rect.left;
  rect.height = rect.bottom - rect.top;
}
function getOriginXY(target, element2, actionName) {
  const actionOptions = target.options[actionName];
  const actionOrigin = actionOptions && actionOptions.origin;
  const origin = actionOrigin || target.options.origin;
  const originRect = resolveRectLike(origin, target, element2, [target && element2]);
  return rectToXY(originRect) || {
    x: 0,
    y: 0
  };
}
var hypot = (x, y) => Math.sqrt(x * x + y * y);
class BaseEvent {
  constructor(interaction) {
    this.type = void 0;
    this.target = void 0;
    this.currentTarget = void 0;
    this.interactable = void 0;
    this._interaction = void 0;
    this.timeStamp = void 0;
    this.immediatePropagationStopped = false;
    this.propagationStopped = false;
    this._interaction = interaction;
  }
  preventDefault() {
  }
  stopPropagation() {
    this.propagationStopped = true;
  }
  stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = true;
  }
}
Object.defineProperty(BaseEvent.prototype, "interaction", {
  get() {
    return this._interaction._proxy;
  },
  set() {
  }
});
const defaults = {
  base: {
    preventDefault: "auto",
    deltaSource: "page"
  },
  perAction: {
    enabled: false,
    origin: {
      x: 0,
      y: 0
    }
  },
  actions: {}
};
class InteractEvent extends BaseEvent {
  constructor(interaction, event, actionName, phase, element2, preEnd, type) {
    super(interaction);
    this.target = void 0;
    this.currentTarget = void 0;
    this.relatedTarget = null;
    this.screenX = void 0;
    this.screenY = void 0;
    this.button = void 0;
    this.buttons = void 0;
    this.ctrlKey = void 0;
    this.shiftKey = void 0;
    this.altKey = void 0;
    this.metaKey = void 0;
    this.page = void 0;
    this.client = void 0;
    this.delta = void 0;
    this.rect = void 0;
    this.x0 = void 0;
    this.y0 = void 0;
    this.t0 = void 0;
    this.dt = void 0;
    this.duration = void 0;
    this.clientX0 = void 0;
    this.clientY0 = void 0;
    this.velocity = void 0;
    this.speed = void 0;
    this.swipe = void 0;
    this.timeStamp = void 0;
    this.axes = void 0;
    this.preEnd = void 0;
    element2 = element2 || interaction.element;
    const target = interaction.interactable;
    const deltaSource = (target && target.options || defaults).deltaSource;
    const origin = getOriginXY(target, element2, actionName);
    const starting = phase === "start";
    const ending = phase === "end";
    const prevEvent = starting ? this : interaction.prevEvent;
    const coords = starting ? interaction.coords.start : ending ? {
      page: prevEvent.page,
      client: prevEvent.client,
      timeStamp: interaction.coords.cur.timeStamp
    } : interaction.coords.cur;
    this.page = extend({}, coords.page);
    this.client = extend({}, coords.client);
    this.rect = extend({}, interaction.rect);
    this.timeStamp = coords.timeStamp;
    if (!ending) {
      this.page.x -= origin.x;
      this.page.y -= origin.y;
      this.client.x -= origin.x;
      this.client.y -= origin.y;
    }
    this.ctrlKey = event.ctrlKey;
    this.altKey = event.altKey;
    this.shiftKey = event.shiftKey;
    this.metaKey = event.metaKey;
    this.button = event.button;
    this.buttons = event.buttons;
    this.target = element2;
    this.currentTarget = element2;
    this.preEnd = preEnd;
    this.type = type || actionName + (phase || "");
    this.interactable = target;
    this.t0 = starting ? interaction.pointers[interaction.pointers.length - 1].downTime : prevEvent.t0;
    this.x0 = interaction.coords.start.page.x - origin.x;
    this.y0 = interaction.coords.start.page.y - origin.y;
    this.clientX0 = interaction.coords.start.client.x - origin.x;
    this.clientY0 = interaction.coords.start.client.y - origin.y;
    if (starting || ending) {
      this.delta = {
        x: 0,
        y: 0
      };
    } else {
      this.delta = {
        x: this[deltaSource].x - prevEvent[deltaSource].x,
        y: this[deltaSource].y - prevEvent[deltaSource].y
      };
    }
    this.dt = interaction.coords.delta.timeStamp;
    this.duration = this.timeStamp - this.t0;
    this.velocity = extend({}, interaction.coords.velocity[deltaSource]);
    this.speed = hypot(this.velocity.x, this.velocity.y);
    this.swipe = ending || phase === "inertiastart" ? this.getSwipe() : null;
  }
  getSwipe() {
    const interaction = this._interaction;
    if (interaction.prevEvent.speed < 600 || this.timeStamp - interaction.prevEvent.timeStamp > 150) {
      return null;
    }
    let angle = 180 * Math.atan2(interaction.prevEvent.velocityY, interaction.prevEvent.velocityX) / Math.PI;
    const overlap = 22.5;
    if (angle < 0) {
      angle += 360;
    }
    const left = 135 - overlap <= angle && angle < 225 + overlap;
    const up = 225 - overlap <= angle && angle < 315 + overlap;
    const right = !left && (315 - overlap <= angle || angle < 45 + overlap);
    const down = !up && 45 - overlap <= angle && angle < 135 + overlap;
    return {
      up,
      down,
      left,
      right,
      angle,
      speed: interaction.prevEvent.speed,
      velocity: {
        x: interaction.prevEvent.velocityX,
        y: interaction.prevEvent.velocityY
      }
    };
  }
  preventDefault() {
  }
  stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = true;
  }
  stopPropagation() {
    this.propagationStopped = true;
  }
}
Object.defineProperties(InteractEvent.prototype, {
  pageX: {
    get() {
      return this.page.x;
    },
    set(value) {
      this.page.x = value;
    }
  },
  pageY: {
    get() {
      return this.page.y;
    },
    set(value) {
      this.page.y = value;
    }
  },
  clientX: {
    get() {
      return this.client.x;
    },
    set(value) {
      this.client.x = value;
    }
  },
  clientY: {
    get() {
      return this.client.y;
    },
    set(value) {
      this.client.y = value;
    }
  },
  dx: {
    get() {
      return this.delta.x;
    },
    set(value) {
      this.delta.x = value;
    }
  },
  dy: {
    get() {
      return this.delta.y;
    },
    set(value) {
      this.delta.y = value;
    }
  },
  velocityX: {
    get() {
      return this.velocity.x;
    },
    set(value) {
      this.velocity.x = value;
    }
  },
  velocityY: {
    get() {
      return this.velocity.y;
    },
    set(value) {
      this.velocity.y = value;
    }
  }
});
function warnOnce(method, message) {
  let warned = false;
  return function() {
    if (!warned) {
      win.console.warn(message);
      warned = true;
    }
    return method.apply(this, arguments);
  };
}
function copyAction(dest, src) {
  dest.name = src.name;
  dest.axis = src.axis;
  dest.edges = src.edges;
  return dest;
}
function pointerExtend(dest, source) {
  for (const prop in source) {
    const prefixedPropREs = pointerExtend.prefixedPropREs;
    let deprecated = false;
    for (const vendor in prefixedPropREs) {
      if (prop.indexOf(vendor) === 0 && prefixedPropREs[vendor].test(prop)) {
        deprecated = true;
        break;
      }
    }
    if (!deprecated && typeof source[prop] !== "function") {
      dest[prop] = source[prop];
    }
  }
  return dest;
}
pointerExtend.prefixedPropREs = {
  webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/,
  moz: /(Pressure)$/
};
function copyCoords(dest, src) {
  dest.page = dest.page || {};
  dest.page.x = src.page.x;
  dest.page.y = src.page.y;
  dest.client = dest.client || {};
  dest.client.x = src.client.x;
  dest.client.y = src.client.y;
  dest.timeStamp = src.timeStamp;
}
function setCoordDeltas(targetObj, prev, cur) {
  targetObj.page.x = cur.page.x - prev.page.x;
  targetObj.page.y = cur.page.y - prev.page.y;
  targetObj.client.x = cur.client.x - prev.client.x;
  targetObj.client.y = cur.client.y - prev.client.y;
  targetObj.timeStamp = cur.timeStamp - prev.timeStamp;
}
function setCoordVelocity(targetObj, delta) {
  const dt = Math.max(delta.timeStamp / 1e3, 1e-3);
  targetObj.page.x = delta.page.x / dt;
  targetObj.page.y = delta.page.y / dt;
  targetObj.client.x = delta.client.x / dt;
  targetObj.client.y = delta.client.y / dt;
  targetObj.timeStamp = dt;
}
function setZeroCoords(targetObj) {
  targetObj.page.x = 0;
  targetObj.page.y = 0;
  targetObj.client.x = 0;
  targetObj.client.y = 0;
}
function isNativePointer(pointer) {
  return pointer instanceof domObjects$1.Event || pointer instanceof domObjects$1.Touch;
}
function getXY(type, pointer, xy) {
  xy = xy || {};
  type = type || "page";
  xy.x = pointer[type + "X"];
  xy.y = pointer[type + "Y"];
  return xy;
}
function getPageXY(pointer, page) {
  page = page || {
    x: 0,
    y: 0
  };
  if (browser$1.isOperaMobile && isNativePointer(pointer)) {
    getXY("screen", pointer, page);
    page.x += window.scrollX;
    page.y += window.scrollY;
  } else {
    getXY("page", pointer, page);
  }
  return page;
}
function getClientXY(pointer, client) {
  client = client || {};
  if (browser$1.isOperaMobile && isNativePointer(pointer)) {
    getXY("screen", pointer, client);
  } else {
    getXY("client", pointer, client);
  }
  return client;
}
function getPointerId(pointer) {
  return is.number(pointer.pointerId) ? pointer.pointerId : pointer.identifier;
}
function setCoords(dest, pointers, timeStamp) {
  const pointer = pointers.length > 1 ? pointerAverage(pointers) : pointers[0];
  getPageXY(pointer, dest.page);
  getClientXY(pointer, dest.client);
  dest.timeStamp = timeStamp;
}
function getTouchPair(event) {
  const touches = [];
  if (is.array(event)) {
    touches[0] = event[0];
    touches[1] = event[1];
  } else {
    if (event.type === "touchend") {
      if (event.touches.length === 1) {
        touches[0] = event.touches[0];
        touches[1] = event.changedTouches[0];
      } else if (event.touches.length === 0) {
        touches[0] = event.changedTouches[0];
        touches[1] = event.changedTouches[1];
      }
    } else {
      touches[0] = event.touches[0];
      touches[1] = event.touches[1];
    }
  }
  return touches;
}
function pointerAverage(pointers) {
  const average = {
    pageX: 0,
    pageY: 0,
    clientX: 0,
    clientY: 0,
    screenX: 0,
    screenY: 0
  };
  for (const pointer of pointers) {
    for (const prop in average) {
      average[prop] += pointer[prop];
    }
  }
  for (const prop in average) {
    average[prop] /= pointers.length;
  }
  return average;
}
function touchBBox(event) {
  if (!event.length) {
    return null;
  }
  const touches = getTouchPair(event);
  const minX = Math.min(touches[0].pageX, touches[1].pageX);
  const minY = Math.min(touches[0].pageY, touches[1].pageY);
  const maxX = Math.max(touches[0].pageX, touches[1].pageX);
  const maxY = Math.max(touches[0].pageY, touches[1].pageY);
  return {
    x: minX,
    y: minY,
    left: minX,
    top: minY,
    right: maxX,
    bottom: maxY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function touchDistance(event, deltaSource) {
  const sourceX = deltaSource + "X";
  const sourceY = deltaSource + "Y";
  const touches = getTouchPair(event);
  const dx = touches[0][sourceX] - touches[1][sourceX];
  const dy = touches[0][sourceY] - touches[1][sourceY];
  return hypot(dx, dy);
}
function touchAngle(event, deltaSource) {
  const sourceX = deltaSource + "X";
  const sourceY = deltaSource + "Y";
  const touches = getTouchPair(event);
  const dx = touches[1][sourceX] - touches[0][sourceX];
  const dy = touches[1][sourceY] - touches[0][sourceY];
  const angle = 180 * Math.atan2(dy, dx) / Math.PI;
  return angle;
}
function getPointerType(pointer) {
  return is.string(pointer.pointerType) ? pointer.pointerType : is.number(pointer.pointerType) ? [void 0, void 0, "touch", "pen", "mouse"][pointer.pointerType] : /touch/.test(pointer.type || "") || pointer instanceof domObjects$1.Touch ? "touch" : "mouse";
}
function getEventTargets(event) {
  const path = is.func(event.composedPath) ? event.composedPath() : event.path;
  return [getActualElement(path ? path[0] : event.target), getActualElement(event.currentTarget)];
}
function newCoords() {
  return {
    page: {
      x: 0,
      y: 0
    },
    client: {
      x: 0,
      y: 0
    },
    timeStamp: 0
  };
}
function isNonNativeEvent(type, actions) {
  if (actions.phaselessTypes[type]) {
    return true;
  }
  for (const name in actions.map) {
    if (type.indexOf(name) === 0 && type.substr(name.length) in actions.phases) {
      return true;
    }
  }
  return false;
}
function createInteractStatic(scope2) {
  const interact2 = (target, options) => {
    let interactable = scope2.interactables.get(target, options);
    if (!interactable) {
      interactable = scope2.interactables.new(target, options);
      interactable.events.global = interact2.globalEvents;
    }
    return interactable;
  };
  interact2.getPointerAverage = pointerAverage;
  interact2.getTouchBBox = touchBBox;
  interact2.getTouchDistance = touchDistance;
  interact2.getTouchAngle = touchAngle;
  interact2.getElementRect = getElementRect;
  interact2.getElementClientRect = getElementClientRect;
  interact2.matchesSelector = matchesSelector;
  interact2.closest = closest;
  interact2.globalEvents = {};
  interact2.version = "1.10.11";
  interact2.scope = scope2;
  interact2.use = function(plugin2, options) {
    this.scope.usePlugin(plugin2, options);
    return this;
  };
  interact2.isSet = function(target, options) {
    return !!this.scope.interactables.get(target, options && options.context);
  };
  interact2.on = warnOnce(function on(type, listener, options) {
    if (is.string(type) && type.search(" ") !== -1) {
      type = type.trim().split(/ +/);
    }
    if (is.array(type)) {
      for (const eventType of type) {
        this.on(eventType, listener, options);
      }
      return this;
    }
    if (is.object(type)) {
      for (const prop in type) {
        this.on(prop, type[prop], listener);
      }
      return this;
    }
    if (isNonNativeEvent(type, this.scope.actions)) {
      if (!this.globalEvents[type]) {
        this.globalEvents[type] = [listener];
      } else {
        this.globalEvents[type].push(listener);
      }
    } else {
      this.scope.events.add(this.scope.document, type, listener, {
        options
      });
    }
    return this;
  }, "The interact.on() method is being deprecated");
  interact2.off = warnOnce(function off(type, listener, options) {
    if (is.string(type) && type.search(" ") !== -1) {
      type = type.trim().split(/ +/);
    }
    if (is.array(type)) {
      for (const eventType of type) {
        this.off(eventType, listener, options);
      }
      return this;
    }
    if (is.object(type)) {
      for (const prop in type) {
        this.off(prop, type[prop], listener);
      }
      return this;
    }
    if (isNonNativeEvent(type, this.scope.actions)) {
      let index;
      if (type in this.globalEvents && (index = this.globalEvents[type].indexOf(listener)) !== -1) {
        this.globalEvents[type].splice(index, 1);
      }
    } else {
      this.scope.events.remove(this.scope.document, type, listener, options);
    }
    return this;
  }, "The interact.off() method is being deprecated");
  interact2.debug = function() {
    return this.scope;
  };
  interact2.supportsTouch = function() {
    return browser$1.supportsTouch;
  };
  interact2.supportsPointerEvent = function() {
    return browser$1.supportsPointerEvent;
  };
  interact2.stop = function() {
    for (const interaction of this.scope.interactions.list) {
      interaction.stop();
    }
    return this;
  };
  interact2.pointerMoveTolerance = function(newValue) {
    if (is.number(newValue)) {
      this.scope.interactions.pointerMoveTolerance = newValue;
      return this;
    }
    return this.scope.interactions.pointerMoveTolerance;
  };
  interact2.addDocument = function(doc, options) {
    this.scope.addDocument(doc, options);
  };
  interact2.removeDocument = function(doc) {
    this.scope.removeDocument(doc);
  };
  return interact2;
}
class Interactable {
  get _defaults() {
    return {
      base: {},
      perAction: {},
      actions: {}
    };
  }
  constructor(target, options, defaultContext, scopeEvents) {
    this.options = void 0;
    this._actions = void 0;
    this.target = void 0;
    this.events = new Eventable();
    this._context = void 0;
    this._win = void 0;
    this._doc = void 0;
    this._scopeEvents = void 0;
    this._rectChecker = void 0;
    this._actions = options.actions;
    this.target = target;
    this._context = options.context || defaultContext;
    this._win = getWindow(trySelector(target) ? this._context : target);
    this._doc = this._win.document;
    this._scopeEvents = scopeEvents;
    this.set(options);
  }
  setOnEvents(actionName, phases) {
    if (is.func(phases.onstart)) {
      this.on(`${actionName}start`, phases.onstart);
    }
    if (is.func(phases.onmove)) {
      this.on(`${actionName}move`, phases.onmove);
    }
    if (is.func(phases.onend)) {
      this.on(`${actionName}end`, phases.onend);
    }
    if (is.func(phases.oninertiastart)) {
      this.on(`${actionName}inertiastart`, phases.oninertiastart);
    }
    return this;
  }
  updatePerActionListeners(actionName, prev, cur) {
    if (is.array(prev) || is.object(prev)) {
      this.off(actionName, prev);
    }
    if (is.array(cur) || is.object(cur)) {
      this.on(actionName, cur);
    }
  }
  setPerAction(actionName, options) {
    const defaults2 = this._defaults;
    for (const optionName_ in options) {
      const optionName = optionName_;
      const actionOptions = this.options[actionName];
      const optionValue = options[optionName];
      if (optionName === "listeners") {
        this.updatePerActionListeners(actionName, actionOptions.listeners, optionValue);
      }
      if (is.array(optionValue)) {
        actionOptions[optionName] = from(optionValue);
      } else if (is.plainObject(optionValue)) {
        actionOptions[optionName] = extend(actionOptions[optionName] || {}, clone(optionValue));
        if (is.object(defaults2.perAction[optionName]) && "enabled" in defaults2.perAction[optionName]) {
          actionOptions[optionName].enabled = optionValue.enabled !== false;
        }
      } else if (is.bool(optionValue) && is.object(defaults2.perAction[optionName])) {
        actionOptions[optionName].enabled = optionValue;
      } else {
        actionOptions[optionName] = optionValue;
      }
    }
  }
  getRect(element2) {
    element2 = element2 || (is.element(this.target) ? this.target : null);
    if (is.string(this.target)) {
      element2 = element2 || this._context.querySelector(this.target);
    }
    return getElementRect(element2);
  }
  rectChecker(checker) {
    if (is.func(checker)) {
      this._rectChecker = checker;
      this.getRect = (element2) => {
        const rect = extend({}, this._rectChecker(element2));
        if (!("width" in rect)) {
          rect.width = rect.right - rect.left;
          rect.height = rect.bottom - rect.top;
        }
        return rect;
      };
      return this;
    }
    if (checker === null) {
      delete this.getRect;
      delete this._rectChecker;
      return this;
    }
    return this.getRect;
  }
  _backCompatOption(optionName, newValue) {
    if (trySelector(newValue) || is.object(newValue)) {
      this.options[optionName] = newValue;
      for (const action in this._actions.map) {
        this.options[action][optionName] = newValue;
      }
      return this;
    }
    return this.options[optionName];
  }
  origin(newValue) {
    return this._backCompatOption("origin", newValue);
  }
  deltaSource(newValue) {
    if (newValue === "page" || newValue === "client") {
      this.options.deltaSource = newValue;
      return this;
    }
    return this.options.deltaSource;
  }
  context() {
    return this._context;
  }
  inContext(element2) {
    return this._context === element2.ownerDocument || nodeContains(this._context, element2);
  }
  testIgnoreAllow(options, targetNode, eventTarget) {
    return !this.testIgnore(options.ignoreFrom, targetNode, eventTarget) && this.testAllow(options.allowFrom, targetNode, eventTarget);
  }
  testAllow(allowFrom, targetNode, element2) {
    if (!allowFrom) {
      return true;
    }
    if (!is.element(element2)) {
      return false;
    }
    if (is.string(allowFrom)) {
      return matchesUpTo(element2, allowFrom, targetNode);
    } else if (is.element(allowFrom)) {
      return nodeContains(allowFrom, element2);
    }
    return false;
  }
  testIgnore(ignoreFrom, targetNode, element2) {
    if (!ignoreFrom || !is.element(element2)) {
      return false;
    }
    if (is.string(ignoreFrom)) {
      return matchesUpTo(element2, ignoreFrom, targetNode);
    } else if (is.element(ignoreFrom)) {
      return nodeContains(ignoreFrom, element2);
    }
    return false;
  }
  fire(iEvent) {
    this.events.fire(iEvent);
    return this;
  }
  _onOff(method, typeArg, listenerArg, options) {
    if (is.object(typeArg) && !is.array(typeArg)) {
      options = listenerArg;
      listenerArg = null;
    }
    const addRemove = method === "on" ? "add" : "remove";
    const listeners = normalize(typeArg, listenerArg);
    for (let type in listeners) {
      if (type === "wheel") {
        type = browser$1.wheelEvent;
      }
      for (const listener of listeners[type]) {
        if (isNonNativeEvent(type, this._actions)) {
          this.events[method](type, listener);
        } else if (is.string(this.target)) {
          this._scopeEvents[`${addRemove}Delegate`](this.target, this._context, type, listener, options);
        } else {
          this._scopeEvents[addRemove](this.target, type, listener, options);
        }
      }
    }
    return this;
  }
  on(types, listener, options) {
    return this._onOff("on", types, listener, options);
  }
  off(types, listener, options) {
    return this._onOff("off", types, listener, options);
  }
  set(options) {
    const defaults2 = this._defaults;
    if (!is.object(options)) {
      options = {};
    }
    this.options = clone(defaults2.base);
    for (const actionName_ in this._actions.methodDict) {
      const actionName = actionName_;
      const methodName = this._actions.methodDict[actionName];
      this.options[actionName] = {};
      this.setPerAction(actionName, extend(extend({}, defaults2.perAction), defaults2.actions[actionName]));
      this[methodName](options[actionName]);
    }
    for (const setting in options) {
      if (is.func(this[setting])) {
        this[setting](options[setting]);
      }
    }
    return this;
  }
  unset() {
    if (is.string(this.target)) {
      for (const type in this._scopeEvents.delegatedEvents) {
        const delegated = this._scopeEvents.delegatedEvents[type];
        for (let i = delegated.length - 1; i >= 0; i--) {
          const {
            selector,
            context,
            listeners
          } = delegated[i];
          if (selector === this.target && context === this._context) {
            delegated.splice(i, 1);
          }
          for (let l = listeners.length - 1; l >= 0; l--) {
            this._scopeEvents.removeDelegate(this.target, this._context, type, listeners[l][0], listeners[l][1]);
          }
        }
      }
    } else {
      this._scopeEvents.remove(this.target, "all");
    }
  }
}
class InteractableSet {
  constructor(scope2) {
    this.list = [];
    this.selectorMap = {};
    this.scope = void 0;
    this.scope = scope2;
    scope2.addListeners({
      "interactable:unset": ({
        interactable
      }) => {
        const {
          target,
          _context: context
        } = interactable;
        const targetMappings = is.string(target) ? this.selectorMap[target] : target[this.scope.id];
        const targetIndex = findIndex(targetMappings, (m) => m.context === context);
        if (targetMappings[targetIndex]) {
          targetMappings[targetIndex].context = null;
          targetMappings[targetIndex].interactable = null;
        }
        targetMappings.splice(targetIndex, 1);
      }
    });
  }
  new(target, options) {
    options = extend(options || {}, {
      actions: this.scope.actions
    });
    const interactable = new this.scope.Interactable(target, options, this.scope.document, this.scope.events);
    const mappingInfo = {
      context: interactable._context,
      interactable
    };
    this.scope.addDocument(interactable._doc);
    this.list.push(interactable);
    if (is.string(target)) {
      if (!this.selectorMap[target]) {
        this.selectorMap[target] = [];
      }
      this.selectorMap[target].push(mappingInfo);
    } else {
      if (!interactable.target[this.scope.id]) {
        Object.defineProperty(target, this.scope.id, {
          value: [],
          configurable: true
        });
      }
      target[this.scope.id].push(mappingInfo);
    }
    this.scope.fire("interactable:new", {
      target,
      options,
      interactable,
      win: this.scope._win
    });
    return interactable;
  }
  get(target, options) {
    const context = options && options.context || this.scope.document;
    const isSelector = is.string(target);
    const targetMappings = isSelector ? this.selectorMap[target] : target[this.scope.id];
    if (!targetMappings) {
      return null;
    }
    const found = find(targetMappings, (m) => m.context === context && (isSelector || m.interactable.inContext(target)));
    return found && found.interactable;
  }
  forEachMatch(node, callback) {
    for (const interactable of this.list) {
      let ret;
      if ((is.string(interactable.target) ? is.element(node) && matchesSelector(node, interactable.target) : node === interactable.target) && interactable.inContext(node)) {
        ret = callback(interactable);
      }
      if (ret !== void 0) {
        return ret;
      }
    }
  }
}
function install$a(scope2) {
  var _scope$document;
  const targets = [];
  const delegatedEvents = {};
  const documents = [];
  const eventsMethods = {
    add,
    remove,
    addDelegate,
    removeDelegate,
    delegateListener,
    delegateUseCapture,
    delegatedEvents,
    documents,
    targets,
    supportsOptions: false,
    supportsPassive: false
  };
  (_scope$document = scope2.document) == null ? void 0 : _scope$document.createElement("div").addEventListener("test", null, {
    get capture() {
      return eventsMethods.supportsOptions = true;
    },
    get passive() {
      return eventsMethods.supportsPassive = true;
    }
  });
  scope2.events = eventsMethods;
  function add(eventTarget, type, listener, optionalArg) {
    const options = getOptions(optionalArg);
    let target = find(targets, (t) => t.eventTarget === eventTarget);
    if (!target) {
      target = {
        eventTarget,
        events: {}
      };
      targets.push(target);
    }
    if (!target.events[type]) {
      target.events[type] = [];
    }
    if (eventTarget.addEventListener && !contains(target.events[type], listener)) {
      eventTarget.addEventListener(type, listener, eventsMethods.supportsOptions ? options : options.capture);
      target.events[type].push(listener);
    }
  }
  function remove(eventTarget, type, listener, optionalArg) {
    const options = getOptions(optionalArg);
    const targetIndex = findIndex(targets, (t) => t.eventTarget === eventTarget);
    const target = targets[targetIndex];
    if (!target || !target.events) {
      return;
    }
    if (type === "all") {
      for (type in target.events) {
        if (target.events.hasOwnProperty(type)) {
          remove(eventTarget, type, "all");
        }
      }
      return;
    }
    let typeIsEmpty = false;
    const typeListeners = target.events[type];
    if (typeListeners) {
      if (listener === "all") {
        for (let i = typeListeners.length - 1; i >= 0; i--) {
          remove(eventTarget, type, typeListeners[i], options);
        }
        return;
      } else {
        for (let i = 0; i < typeListeners.length; i++) {
          if (typeListeners[i] === listener) {
            eventTarget.removeEventListener(type, listener, eventsMethods.supportsOptions ? options : options.capture);
            typeListeners.splice(i, 1);
            if (typeListeners.length === 0) {
              delete target.events[type];
              typeIsEmpty = true;
            }
            break;
          }
        }
      }
    }
    if (typeIsEmpty && !Object.keys(target.events).length) {
      targets.splice(targetIndex, 1);
    }
  }
  function addDelegate(selector, context, type, listener, optionalArg) {
    const options = getOptions(optionalArg);
    if (!delegatedEvents[type]) {
      delegatedEvents[type] = [];
      for (const doc of documents) {
        add(doc, type, delegateListener);
        add(doc, type, delegateUseCapture, true);
      }
    }
    const delegates = delegatedEvents[type];
    let delegate = find(delegates, (d) => d.selector === selector && d.context === context);
    if (!delegate) {
      delegate = {
        selector,
        context,
        listeners: []
      };
      delegates.push(delegate);
    }
    delegate.listeners.push([listener, options]);
  }
  function removeDelegate(selector, context, type, listener, optionalArg) {
    const options = getOptions(optionalArg);
    const delegates = delegatedEvents[type];
    let matchFound = false;
    let index;
    if (!delegates)
      return;
    for (index = delegates.length - 1; index >= 0; index--) {
      const cur = delegates[index];
      if (cur.selector === selector && cur.context === context) {
        const {
          listeners
        } = cur;
        for (let i = listeners.length - 1; i >= 0; i--) {
          const [fn, {
            capture,
            passive
          }] = listeners[i];
          if (fn === listener && capture === options.capture && passive === options.passive) {
            listeners.splice(i, 1);
            if (!listeners.length) {
              delegates.splice(index, 1);
              remove(context, type, delegateListener);
              remove(context, type, delegateUseCapture, true);
            }
            matchFound = true;
            break;
          }
        }
        if (matchFound) {
          break;
        }
      }
    }
  }
  function delegateListener(event, optionalArg) {
    const options = getOptions(optionalArg);
    const fakeEvent = new FakeEvent(event);
    const delegates = delegatedEvents[event.type];
    const [eventTarget] = getEventTargets(event);
    let element2 = eventTarget;
    while (is.element(element2)) {
      for (let i = 0; i < delegates.length; i++) {
        const cur = delegates[i];
        const {
          selector,
          context
        } = cur;
        if (matchesSelector(element2, selector) && nodeContains(context, eventTarget) && nodeContains(context, element2)) {
          const {
            listeners
          } = cur;
          fakeEvent.currentTarget = element2;
          for (const [fn, {
            capture,
            passive
          }] of listeners) {
            if (capture === options.capture && passive === options.passive) {
              fn(fakeEvent);
            }
          }
        }
      }
      element2 = parentNode(element2);
    }
  }
  function delegateUseCapture(event) {
    return delegateListener.call(this, event, true);
  }
  return eventsMethods;
}
class FakeEvent {
  constructor(originalEvent) {
    this.currentTarget = void 0;
    this.originalEvent = void 0;
    this.type = void 0;
    this.originalEvent = originalEvent;
    pointerExtend(this, originalEvent);
  }
  preventOriginalDefault() {
    this.originalEvent.preventDefault();
  }
  stopPropagation() {
    this.originalEvent.stopPropagation();
  }
  stopImmediatePropagation() {
    this.originalEvent.stopImmediatePropagation();
  }
}
function getOptions(param) {
  if (!is.object(param)) {
    return {
      capture: !!param,
      passive: false
    };
  }
  const options = extend({}, param);
  options.capture = !!param.capture;
  options.passive = !!param.passive;
  return options;
}
var events = {
  id: "events",
  install: install$a
};
class PointerInfo {
  constructor(id, pointer, event, downTime, downTarget) {
    this.id = void 0;
    this.pointer = void 0;
    this.event = void 0;
    this.downTime = void 0;
    this.downTarget = void 0;
    this.id = id;
    this.pointer = pointer;
    this.event = event;
    this.downTime = downTime;
    this.downTarget = downTarget;
  }
}
let _ProxyValues;
(function(_ProxyValues2) {
  _ProxyValues2["interactable"] = "";
  _ProxyValues2["element"] = "";
  _ProxyValues2["prepared"] = "";
  _ProxyValues2["pointerIsDown"] = "";
  _ProxyValues2["pointerWasMoved"] = "";
  _ProxyValues2["_proxy"] = "";
})(_ProxyValues || (_ProxyValues = {}));
let _ProxyMethods;
(function(_ProxyMethods2) {
  _ProxyMethods2["start"] = "";
  _ProxyMethods2["move"] = "";
  _ProxyMethods2["end"] = "";
  _ProxyMethods2["stop"] = "";
  _ProxyMethods2["interacting"] = "";
})(_ProxyMethods || (_ProxyMethods = {}));
let idCounter = 0;
class Interaction {
  get pointerMoveTolerance() {
    return 1;
  }
  constructor({
    pointerType,
    scopeFire
  }) {
    this.interactable = null;
    this.element = null;
    this.rect = void 0;
    this._rects = void 0;
    this.edges = void 0;
    this._scopeFire = void 0;
    this.prepared = {
      name: null,
      axis: null,
      edges: null
    };
    this.pointerType = void 0;
    this.pointers = [];
    this.downEvent = null;
    this.downPointer = {};
    this._latestPointer = {
      pointer: null,
      event: null,
      eventTarget: null
    };
    this.prevEvent = null;
    this.pointerIsDown = false;
    this.pointerWasMoved = false;
    this._interacting = false;
    this._ending = false;
    this._stopped = true;
    this._proxy = null;
    this.simulation = null;
    this.doMove = warnOnce(function(signalArg) {
      this.move(signalArg);
    }, "The interaction.doMove() method has been renamed to interaction.move()");
    this.coords = {
      start: newCoords(),
      prev: newCoords(),
      cur: newCoords(),
      delta: newCoords(),
      velocity: newCoords()
    };
    this._id = idCounter++;
    this._scopeFire = scopeFire;
    this.pointerType = pointerType;
    const that = this;
    this._proxy = {};
    for (const key in _ProxyValues) {
      Object.defineProperty(this._proxy, key, {
        get() {
          return that[key];
        }
      });
    }
    for (const key in _ProxyMethods) {
      Object.defineProperty(this._proxy, key, {
        value: (...args) => that[key](...args)
      });
    }
    this._scopeFire("interactions:new", {
      interaction: this
    });
  }
  pointerDown(pointer, event, eventTarget) {
    const pointerIndex = this.updatePointer(pointer, event, eventTarget, true);
    const pointerInfo = this.pointers[pointerIndex];
    this._scopeFire("interactions:down", {
      pointer,
      event,
      eventTarget,
      pointerIndex,
      pointerInfo,
      type: "down",
      interaction: this
    });
  }
  start(action, interactable, element2) {
    if (this.interacting() || !this.pointerIsDown || this.pointers.length < (action.name === "gesture" ? 2 : 1) || !interactable.options[action.name].enabled) {
      return false;
    }
    copyAction(this.prepared, action);
    this.interactable = interactable;
    this.element = element2;
    this.rect = interactable.getRect(element2);
    this.edges = this.prepared.edges ? extend({}, this.prepared.edges) : {
      left: true,
      right: true,
      top: true,
      bottom: true
    };
    this._stopped = false;
    this._interacting = this._doPhase({
      interaction: this,
      event: this.downEvent,
      phase: "start"
    }) && !this._stopped;
    return this._interacting;
  }
  pointerMove(pointer, event, eventTarget) {
    if (!this.simulation && !(this.modification && this.modification.endResult)) {
      this.updatePointer(pointer, event, eventTarget, false);
    }
    const duplicateMove = this.coords.cur.page.x === this.coords.prev.page.x && this.coords.cur.page.y === this.coords.prev.page.y && this.coords.cur.client.x === this.coords.prev.client.x && this.coords.cur.client.y === this.coords.prev.client.y;
    let dx;
    let dy;
    if (this.pointerIsDown && !this.pointerWasMoved) {
      dx = this.coords.cur.client.x - this.coords.start.client.x;
      dy = this.coords.cur.client.y - this.coords.start.client.y;
      this.pointerWasMoved = hypot(dx, dy) > this.pointerMoveTolerance;
    }
    const pointerIndex = this.getPointerIndex(pointer);
    const signalArg = {
      pointer,
      pointerIndex,
      pointerInfo: this.pointers[pointerIndex],
      event,
      type: "move",
      eventTarget,
      dx,
      dy,
      duplicate: duplicateMove,
      interaction: this
    };
    if (!duplicateMove) {
      setCoordVelocity(this.coords.velocity, this.coords.delta);
    }
    this._scopeFire("interactions:move", signalArg);
    if (!duplicateMove && !this.simulation) {
      if (this.interacting()) {
        signalArg.type = null;
        this.move(signalArg);
      }
      if (this.pointerWasMoved) {
        copyCoords(this.coords.prev, this.coords.cur);
      }
    }
  }
  move(signalArg) {
    if (!signalArg || !signalArg.event) {
      setZeroCoords(this.coords.delta);
    }
    signalArg = extend({
      pointer: this._latestPointer.pointer,
      event: this._latestPointer.event,
      eventTarget: this._latestPointer.eventTarget,
      interaction: this
    }, signalArg || {});
    signalArg.phase = "move";
    this._doPhase(signalArg);
  }
  pointerUp(pointer, event, eventTarget, curEventTarget) {
    let pointerIndex = this.getPointerIndex(pointer);
    if (pointerIndex === -1) {
      pointerIndex = this.updatePointer(pointer, event, eventTarget, false);
    }
    const type = /cancel$/i.test(event.type) ? "cancel" : "up";
    this._scopeFire(`interactions:${type}`, {
      pointer,
      pointerIndex,
      pointerInfo: this.pointers[pointerIndex],
      event,
      eventTarget,
      type,
      curEventTarget,
      interaction: this
    });
    if (!this.simulation) {
      this.end(event);
    }
    this.removePointer(pointer, event);
  }
  documentBlur(event) {
    this.end(event);
    this._scopeFire("interactions:blur", {
      event,
      type: "blur",
      interaction: this
    });
  }
  end(event) {
    this._ending = true;
    event = event || this._latestPointer.event;
    let endPhaseResult;
    if (this.interacting()) {
      endPhaseResult = this._doPhase({
        event,
        interaction: this,
        phase: "end"
      });
    }
    this._ending = false;
    if (endPhaseResult === true) {
      this.stop();
    }
  }
  currentAction() {
    return this._interacting ? this.prepared.name : null;
  }
  interacting() {
    return this._interacting;
  }
  stop() {
    this._scopeFire("interactions:stop", {
      interaction: this
    });
    this.interactable = this.element = null;
    this._interacting = false;
    this._stopped = true;
    this.prepared.name = this.prevEvent = null;
  }
  getPointerIndex(pointer) {
    const pointerId = getPointerId(pointer);
    return this.pointerType === "mouse" || this.pointerType === "pen" ? this.pointers.length - 1 : findIndex(this.pointers, (curPointer) => curPointer.id === pointerId);
  }
  getPointerInfo(pointer) {
    return this.pointers[this.getPointerIndex(pointer)];
  }
  updatePointer(pointer, event, eventTarget, down) {
    const id = getPointerId(pointer);
    let pointerIndex = this.getPointerIndex(pointer);
    let pointerInfo = this.pointers[pointerIndex];
    down = down === false ? false : down || /(down|start)$/i.test(event.type);
    if (!pointerInfo) {
      pointerInfo = new PointerInfo(id, pointer, event, null, null);
      pointerIndex = this.pointers.length;
      this.pointers.push(pointerInfo);
    } else {
      pointerInfo.pointer = pointer;
    }
    setCoords(this.coords.cur, this.pointers.map((p) => p.pointer), this._now());
    setCoordDeltas(this.coords.delta, this.coords.prev, this.coords.cur);
    if (down) {
      this.pointerIsDown = true;
      pointerInfo.downTime = this.coords.cur.timeStamp;
      pointerInfo.downTarget = eventTarget;
      pointerExtend(this.downPointer, pointer);
      if (!this.interacting()) {
        copyCoords(this.coords.start, this.coords.cur);
        copyCoords(this.coords.prev, this.coords.cur);
        this.downEvent = event;
        this.pointerWasMoved = false;
      }
    }
    this._updateLatestPointer(pointer, event, eventTarget);
    this._scopeFire("interactions:update-pointer", {
      pointer,
      event,
      eventTarget,
      down,
      pointerInfo,
      pointerIndex,
      interaction: this
    });
    return pointerIndex;
  }
  removePointer(pointer, event) {
    const pointerIndex = this.getPointerIndex(pointer);
    if (pointerIndex === -1)
      return;
    const pointerInfo = this.pointers[pointerIndex];
    this._scopeFire("interactions:remove-pointer", {
      pointer,
      event,
      eventTarget: null,
      pointerIndex,
      pointerInfo,
      interaction: this
    });
    this.pointers.splice(pointerIndex, 1);
    this.pointerIsDown = false;
  }
  _updateLatestPointer(pointer, event, eventTarget) {
    this._latestPointer.pointer = pointer;
    this._latestPointer.event = event;
    this._latestPointer.eventTarget = eventTarget;
  }
  destroy() {
    this._latestPointer.pointer = null;
    this._latestPointer.event = null;
    this._latestPointer.eventTarget = null;
  }
  _createPreparedEvent(event, phase, preEnd, type) {
    return new InteractEvent(this, event, this.prepared.name, phase, this.element, preEnd, type);
  }
  _fireEvent(iEvent) {
    this.interactable.fire(iEvent);
    if (!this.prevEvent || iEvent.timeStamp >= this.prevEvent.timeStamp) {
      this.prevEvent = iEvent;
    }
  }
  _doPhase(signalArg) {
    const {
      event,
      phase,
      preEnd,
      type
    } = signalArg;
    const {
      rect
    } = this;
    if (rect && phase === "move") {
      addEdges(this.edges, rect, this.coords.delta[this.interactable.options.deltaSource]);
      rect.width = rect.right - rect.left;
      rect.height = rect.bottom - rect.top;
    }
    const beforeResult = this._scopeFire(`interactions:before-action-${phase}`, signalArg);
    if (beforeResult === false) {
      return false;
    }
    const iEvent = signalArg.iEvent = this._createPreparedEvent(event, phase, preEnd, type);
    this._scopeFire(`interactions:action-${phase}`, signalArg);
    if (phase === "start") {
      this.prevEvent = iEvent;
    }
    this._fireEvent(iEvent);
    this._scopeFire(`interactions:after-action-${phase}`, signalArg);
    return true;
  }
  _now() {
    return Date.now();
  }
}
var InteractionBase = Interaction;
function preventDefault(newValue) {
  if (/^(always|never|auto)$/.test(newValue)) {
    this.options.preventDefault = newValue;
    return this;
  }
  if (is.bool(newValue)) {
    this.options.preventDefault = newValue ? "always" : "never";
    return this;
  }
  return this.options.preventDefault;
}
function checkAndPreventDefault(interactable, scope2, event) {
  const setting = interactable.options.preventDefault;
  if (setting === "never")
    return;
  if (setting === "always") {
    event.preventDefault();
    return;
  }
  if (scope2.events.supportsPassive && /^touch(start|move)$/.test(event.type)) {
    const doc = getWindow(event.target).document;
    const docOptions = scope2.getDocOptions(doc);
    if (!(docOptions && docOptions.events) || docOptions.events.passive !== false) {
      return;
    }
  }
  if (/^(mouse|pointer|touch)*(down|start)/i.test(event.type)) {
    return;
  }
  if (is.element(event.target) && matchesSelector(event.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *")) {
    return;
  }
  event.preventDefault();
}
function onInteractionEvent({
  interaction,
  event
}) {
  if (interaction.interactable) {
    interaction.interactable.checkAndPreventDefault(event);
  }
}
function install$9(scope2) {
  const {
    Interactable: Interactable2
  } = scope2;
  Interactable2.prototype.preventDefault = preventDefault;
  Interactable2.prototype.checkAndPreventDefault = function(event) {
    return checkAndPreventDefault(this, scope2, event);
  };
  scope2.interactions.docEvents.push({
    type: "dragstart",
    listener(event) {
      for (const interaction of scope2.interactions.list) {
        if (interaction.element && (interaction.element === event.target || nodeContains(interaction.element, event.target))) {
          interaction.interactable.checkAndPreventDefault(event);
          return;
        }
      }
    }
  });
}
var interactablePreventDefault = {
  id: "core/interactablePreventDefault",
  install: install$9,
  listeners: ["down", "move", "up", "cancel"].reduce((acc, eventType) => {
    acc[`interactions:${eventType}`] = onInteractionEvent;
    return acc;
  }, {})
};
const finder = {
  methodOrder: ["simulationResume", "mouseOrPen", "hasPointer", "idle"],
  search(details) {
    for (const method of finder.methodOrder) {
      const interaction = finder[method](details);
      if (interaction) {
        return interaction;
      }
    }
    return null;
  },
  simulationResume({
    pointerType,
    eventType,
    eventTarget,
    scope: scope2
  }) {
    if (!/down|start/i.test(eventType)) {
      return null;
    }
    for (const interaction of scope2.interactions.list) {
      let element2 = eventTarget;
      if (interaction.simulation && interaction.simulation.allowResume && interaction.pointerType === pointerType) {
        while (element2) {
          if (element2 === interaction.element) {
            return interaction;
          }
          element2 = parentNode(element2);
        }
      }
    }
    return null;
  },
  mouseOrPen({
    pointerId,
    pointerType,
    eventType,
    scope: scope2
  }) {
    if (pointerType !== "mouse" && pointerType !== "pen") {
      return null;
    }
    let firstNonActive;
    for (const interaction of scope2.interactions.list) {
      if (interaction.pointerType === pointerType) {
        if (interaction.simulation && !hasPointerId(interaction, pointerId)) {
          continue;
        }
        if (interaction.interacting()) {
          return interaction;
        } else if (!firstNonActive) {
          firstNonActive = interaction;
        }
      }
    }
    if (firstNonActive) {
      return firstNonActive;
    }
    for (const interaction of scope2.interactions.list) {
      if (interaction.pointerType === pointerType && !(/down/i.test(eventType) && interaction.simulation)) {
        return interaction;
      }
    }
    return null;
  },
  hasPointer({
    pointerId,
    scope: scope2
  }) {
    for (const interaction of scope2.interactions.list) {
      if (hasPointerId(interaction, pointerId)) {
        return interaction;
      }
    }
    return null;
  },
  idle({
    pointerType,
    scope: scope2
  }) {
    for (const interaction of scope2.interactions.list) {
      if (interaction.pointers.length === 1) {
        const target = interaction.interactable;
        if (target && !(target.options.gesture && target.options.gesture.enabled)) {
          continue;
        }
      } else if (interaction.pointers.length >= 2) {
        continue;
      }
      if (!interaction.interacting() && pointerType === interaction.pointerType) {
        return interaction;
      }
    }
    return null;
  }
};
function hasPointerId(interaction, pointerId) {
  return interaction.pointers.some(({
    id
  }) => id === pointerId);
}
var finder$1 = finder;
const methodNames = ["pointerDown", "pointerMove", "pointerUp", "updatePointer", "removePointer", "windowBlur"];
function install$8(scope2) {
  const listeners = {};
  for (const method of methodNames) {
    listeners[method] = doOnInteractions(method, scope2);
  }
  const pEventTypes = browser$1.pEventTypes;
  let docEvents;
  if (domObjects$1.PointerEvent) {
    docEvents = [{
      type: pEventTypes.down,
      listener: releasePointersOnRemovedEls
    }, {
      type: pEventTypes.down,
      listener: listeners.pointerDown
    }, {
      type: pEventTypes.move,
      listener: listeners.pointerMove
    }, {
      type: pEventTypes.up,
      listener: listeners.pointerUp
    }, {
      type: pEventTypes.cancel,
      listener: listeners.pointerUp
    }];
  } else {
    docEvents = [{
      type: "mousedown",
      listener: listeners.pointerDown
    }, {
      type: "mousemove",
      listener: listeners.pointerMove
    }, {
      type: "mouseup",
      listener: listeners.pointerUp
    }, {
      type: "touchstart",
      listener: releasePointersOnRemovedEls
    }, {
      type: "touchstart",
      listener: listeners.pointerDown
    }, {
      type: "touchmove",
      listener: listeners.pointerMove
    }, {
      type: "touchend",
      listener: listeners.pointerUp
    }, {
      type: "touchcancel",
      listener: listeners.pointerUp
    }];
  }
  docEvents.push({
    type: "blur",
    listener(event) {
      for (const interaction of scope2.interactions.list) {
        interaction.documentBlur(event);
      }
    }
  });
  scope2.prevTouchTime = 0;
  scope2.Interaction = class extends InteractionBase {
    get pointerMoveTolerance() {
      return scope2.interactions.pointerMoveTolerance;
    }
    set pointerMoveTolerance(value) {
      scope2.interactions.pointerMoveTolerance = value;
    }
    _now() {
      return scope2.now();
    }
  };
  scope2.interactions = {
    list: [],
    new(options) {
      options.scopeFire = (name, arg) => scope2.fire(name, arg);
      const interaction = new scope2.Interaction(options);
      scope2.interactions.list.push(interaction);
      return interaction;
    },
    listeners,
    docEvents,
    pointerMoveTolerance: 1
  };
  function releasePointersOnRemovedEls() {
    for (const interaction of scope2.interactions.list) {
      if (!interaction.pointerIsDown || interaction.pointerType !== "touch" || interaction._interacting) {
        continue;
      }
      for (const pointer of interaction.pointers) {
        if (!scope2.documents.some(({
          doc
        }) => nodeContains(doc, pointer.downTarget))) {
          interaction.removePointer(pointer.pointer, pointer.event);
        }
      }
    }
  }
  scope2.usePlugin(interactablePreventDefault);
}
function doOnInteractions(method, scope2) {
  return function(event) {
    const interactions2 = scope2.interactions.list;
    const pointerType = getPointerType(event);
    const [eventTarget, curEventTarget] = getEventTargets(event);
    const matches = [];
    if (/^touch/.test(event.type)) {
      scope2.prevTouchTime = scope2.now();
      for (const changedTouch of event.changedTouches) {
        const pointer = changedTouch;
        const pointerId = getPointerId(pointer);
        const searchDetails = {
          pointer,
          pointerId,
          pointerType,
          eventType: event.type,
          eventTarget,
          curEventTarget,
          scope: scope2
        };
        const interaction = getInteraction(searchDetails);
        matches.push([searchDetails.pointer, searchDetails.eventTarget, searchDetails.curEventTarget, interaction]);
      }
    } else {
      let invalidPointer = false;
      if (!browser$1.supportsPointerEvent && /mouse/.test(event.type)) {
        for (let i = 0; i < interactions2.length && !invalidPointer; i++) {
          invalidPointer = interactions2[i].pointerType !== "mouse" && interactions2[i].pointerIsDown;
        }
        invalidPointer = invalidPointer || scope2.now() - scope2.prevTouchTime < 500 || event.timeStamp === 0;
      }
      if (!invalidPointer) {
        const searchDetails = {
          pointer: event,
          pointerId: getPointerId(event),
          pointerType,
          eventType: event.type,
          curEventTarget,
          eventTarget,
          scope: scope2
        };
        const interaction = getInteraction(searchDetails);
        matches.push([searchDetails.pointer, searchDetails.eventTarget, searchDetails.curEventTarget, interaction]);
      }
    }
    for (const [pointer, eventTarget2, curEventTarget2, interaction] of matches) {
      interaction[method](pointer, event, eventTarget2, curEventTarget2);
    }
  };
}
function getInteraction(searchDetails) {
  const {
    pointerType,
    scope: scope2
  } = searchDetails;
  const foundInteraction = finder$1.search(searchDetails);
  const signalArg = {
    interaction: foundInteraction,
    searchDetails
  };
  scope2.fire("interactions:find", signalArg);
  return signalArg.interaction || scope2.interactions.new({
    pointerType
  });
}
function onDocSignal({
  doc,
  scope: scope2,
  options
}, eventMethodName) {
  const {
    interactions: {
      docEvents
    },
    events: events2
  } = scope2;
  const eventMethod = events2[eventMethodName];
  if (scope2.browser.isIOS && !options.events) {
    options.events = {
      passive: false
    };
  }
  for (const eventType in events2.delegatedEvents) {
    eventMethod(doc, eventType, events2.delegateListener);
    eventMethod(doc, eventType, events2.delegateUseCapture, true);
  }
  const eventOptions = options && options.events;
  for (const {
    type,
    listener
  } of docEvents) {
    eventMethod(doc, type, listener, eventOptions);
  }
}
const interactions = {
  id: "core/interactions",
  install: install$8,
  listeners: {
    "scope:add-document": (arg) => onDocSignal(arg, "add"),
    "scope:remove-document": (arg) => onDocSignal(arg, "remove"),
    "interactable:unset": ({
      interactable
    }, scope2) => {
      for (let i = scope2.interactions.list.length - 1; i >= 0; i--) {
        const interaction = scope2.interactions.list[i];
        if (interaction.interactable !== interactable) {
          continue;
        }
        interaction.stop();
        scope2.fire("interactions:destroy", {
          interaction
        });
        interaction.destroy();
        if (scope2.interactions.list.length > 2) {
          scope2.interactions.list.splice(i, 1);
        }
      }
    }
  },
  onDocSignal,
  doOnInteractions,
  methodNames
};
var interactions$1 = interactions;
class Scope {
  constructor() {
    this.id = `__interact_scope_${Math.floor(Math.random() * 100)}`;
    this.isInitialized = false;
    this.listenerMaps = [];
    this.browser = browser$1;
    this.defaults = clone(defaults);
    this.Eventable = Eventable;
    this.actions = {
      map: {},
      phases: {
        start: true,
        move: true,
        end: true
      },
      methodDict: {},
      phaselessTypes: {}
    };
    this.interactStatic = createInteractStatic(this);
    this.InteractEvent = InteractEvent;
    this.Interactable = void 0;
    this.interactables = new InteractableSet(this);
    this._win = void 0;
    this.document = void 0;
    this.window = void 0;
    this.documents = [];
    this._plugins = {
      list: [],
      map: {}
    };
    this.onWindowUnload = (event) => this.removeDocument(event.target);
    const scope2 = this;
    this.Interactable = class extends Interactable {
      get _defaults() {
        return scope2.defaults;
      }
      set(options) {
        super.set(options);
        scope2.fire("interactable:set", {
          options,
          interactable: this
        });
        return this;
      }
      unset() {
        super.unset();
        scope2.interactables.list.splice(scope2.interactables.list.indexOf(this), 1);
        scope2.fire("interactable:unset", {
          interactable: this
        });
      }
    };
  }
  addListeners(map, id) {
    this.listenerMaps.push({
      id,
      map
    });
  }
  fire(name, arg) {
    for (const {
      map: {
        [name]: listener
      }
    } of this.listenerMaps) {
      if (!!listener && listener(arg, this, name) === false) {
        return false;
      }
    }
  }
  init(window2) {
    return this.isInitialized ? this : initScope(this, window2);
  }
  pluginIsInstalled(plugin2) {
    return this._plugins.map[plugin2.id] || this._plugins.list.indexOf(plugin2) !== -1;
  }
  usePlugin(plugin2, options) {
    if (!this.isInitialized) {
      return this;
    }
    if (this.pluginIsInstalled(plugin2)) {
      return this;
    }
    if (plugin2.id) {
      this._plugins.map[plugin2.id] = plugin2;
    }
    this._plugins.list.push(plugin2);
    if (plugin2.install) {
      plugin2.install(this, options);
    }
    if (plugin2.listeners && plugin2.before) {
      let index = 0;
      const len = this.listenerMaps.length;
      const before = plugin2.before.reduce((acc, id) => {
        acc[id] = true;
        acc[pluginIdRoot(id)] = true;
        return acc;
      }, {});
      for (; index < len; index++) {
        const otherId = this.listenerMaps[index].id;
        if (before[otherId] || before[pluginIdRoot(otherId)]) {
          break;
        }
      }
      this.listenerMaps.splice(index, 0, {
        id: plugin2.id,
        map: plugin2.listeners
      });
    } else if (plugin2.listeners) {
      this.listenerMaps.push({
        id: plugin2.id,
        map: plugin2.listeners
      });
    }
    return this;
  }
  addDocument(doc, options) {
    if (this.getDocIndex(doc) !== -1) {
      return false;
    }
    const window2 = getWindow(doc);
    options = options ? extend({}, options) : {};
    this.documents.push({
      doc,
      options
    });
    this.events.documents.push(doc);
    if (doc !== this.document) {
      this.events.add(window2, "unload", this.onWindowUnload);
    }
    this.fire("scope:add-document", {
      doc,
      window: window2,
      scope: this,
      options
    });
  }
  removeDocument(doc) {
    const index = this.getDocIndex(doc);
    const window2 = getWindow(doc);
    const options = this.documents[index].options;
    this.events.remove(window2, "unload", this.onWindowUnload);
    this.documents.splice(index, 1);
    this.events.documents.splice(index, 1);
    this.fire("scope:remove-document", {
      doc,
      window: window2,
      scope: this,
      options
    });
  }
  getDocIndex(doc) {
    for (let i = 0; i < this.documents.length; i++) {
      if (this.documents[i].doc === doc) {
        return i;
      }
    }
    return -1;
  }
  getDocOptions(doc) {
    const docIndex = this.getDocIndex(doc);
    return docIndex === -1 ? null : this.documents[docIndex].options;
  }
  now() {
    return (this.window.Date || Date).now();
  }
}
function initScope(scope2, window2) {
  scope2.isInitialized = true;
  if (is.window(window2)) {
    init$2(window2);
  }
  domObjects$1.init(window2);
  browser$1.init(window2);
  raf.init(window2);
  scope2.window = window2;
  scope2.document = window2.document;
  scope2.usePlugin(interactions$1);
  scope2.usePlugin(events);
  return scope2;
}
function pluginIdRoot(id) {
  return id && id.replace(/\/.*$/, "");
}
const scope = new Scope();
const interact = scope.interactStatic;
var interact$1 = interact;
const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : globalThis;
scope.init(_global);
function install$7(scope2) {
  const {
    actions,
    Interactable: Interactable2,
    defaults: defaults2
  } = scope2;
  Interactable2.prototype.draggable = drag.draggable;
  actions.map.drag = drag;
  actions.methodDict.drag = "draggable";
  defaults2.actions.drag = drag.defaults;
}
function beforeMove({
  interaction
}) {
  if (interaction.prepared.name !== "drag")
    return;
  const axis = interaction.prepared.axis;
  if (axis === "x") {
    interaction.coords.cur.page.y = interaction.coords.start.page.y;
    interaction.coords.cur.client.y = interaction.coords.start.client.y;
    interaction.coords.velocity.client.y = 0;
    interaction.coords.velocity.page.y = 0;
  } else if (axis === "y") {
    interaction.coords.cur.page.x = interaction.coords.start.page.x;
    interaction.coords.cur.client.x = interaction.coords.start.client.x;
    interaction.coords.velocity.client.x = 0;
    interaction.coords.velocity.page.x = 0;
  }
}
function move$1({
  iEvent,
  interaction
}) {
  if (interaction.prepared.name !== "drag")
    return;
  const axis = interaction.prepared.axis;
  if (axis === "x" || axis === "y") {
    const opposite = axis === "x" ? "y" : "x";
    iEvent.page[opposite] = interaction.coords.start.page[opposite];
    iEvent.client[opposite] = interaction.coords.start.client[opposite];
    iEvent.delta[opposite] = 0;
  }
}
const draggable = function draggable2(options) {
  if (is.object(options)) {
    this.options.drag.enabled = options.enabled !== false;
    this.setPerAction("drag", options);
    this.setOnEvents("drag", options);
    if (/^(xy|x|y|start)$/.test(options.lockAxis)) {
      this.options.drag.lockAxis = options.lockAxis;
    }
    if (/^(xy|x|y)$/.test(options.startAxis)) {
      this.options.drag.startAxis = options.startAxis;
    }
    return this;
  }
  if (is.bool(options)) {
    this.options.drag.enabled = options;
    return this;
  }
  return this.options.drag;
};
const drag = {
  id: "actions/drag",
  install: install$7,
  listeners: {
    "interactions:before-action-move": beforeMove,
    "interactions:action-resume": beforeMove,
    "interactions:action-move": move$1,
    "auto-start:check": (arg) => {
      const {
        interaction,
        interactable,
        buttons
      } = arg;
      const dragOptions = interactable.options.drag;
      if (!(dragOptions && dragOptions.enabled) || interaction.pointerIsDown && /mouse|pointer/.test(interaction.pointerType) && (buttons & interactable.options.drag.mouseButtons) === 0) {
        return void 0;
      }
      arg.action = {
        name: "drag",
        axis: dragOptions.lockAxis === "start" ? dragOptions.startAxis : dragOptions.lockAxis
      };
      return false;
    }
  },
  draggable,
  beforeMove,
  move: move$1,
  defaults: {
    startAxis: "xy",
    lockAxis: "xy"
  },
  getCursor() {
    return "move";
  }
};
var drag$1 = drag;
class DropEvent extends BaseEvent {
  constructor(dropState, dragEvent, type) {
    super(dragEvent._interaction);
    this.target = void 0;
    this.dropzone = void 0;
    this.dragEvent = void 0;
    this.relatedTarget = void 0;
    this.draggable = void 0;
    this.timeStamp = void 0;
    this.propagationStopped = false;
    this.immediatePropagationStopped = false;
    const {
      element: element2,
      dropzone
    } = type === "dragleave" ? dropState.prev : dropState.cur;
    this.type = type;
    this.target = element2;
    this.currentTarget = element2;
    this.dropzone = dropzone;
    this.dragEvent = dragEvent;
    this.relatedTarget = dragEvent.target;
    this.draggable = dragEvent.interactable;
    this.timeStamp = dragEvent.timeStamp;
  }
  reject() {
    const {
      dropState
    } = this._interaction;
    if (this.type !== "dropactivate" && (!this.dropzone || dropState.cur.dropzone !== this.dropzone || dropState.cur.element !== this.target)) {
      return;
    }
    dropState.prev.dropzone = this.dropzone;
    dropState.prev.element = this.target;
    dropState.rejected = true;
    dropState.events.enter = null;
    this.stopImmediatePropagation();
    if (this.type === "dropactivate") {
      const activeDrops = dropState.activeDrops;
      const index = findIndex(activeDrops, ({
        dropzone,
        element: element2
      }) => dropzone === this.dropzone && element2 === this.target);
      dropState.activeDrops.splice(index, 1);
      const deactivateEvent = new DropEvent(dropState, this.dragEvent, "dropdeactivate");
      deactivateEvent.dropzone = this.dropzone;
      deactivateEvent.target = this.target;
      this.dropzone.fire(deactivateEvent);
    } else {
      this.dropzone.fire(new DropEvent(dropState, this.dragEvent, "dragleave"));
    }
  }
  preventDefault() {
  }
  stopPropagation() {
    this.propagationStopped = true;
  }
  stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = true;
  }
}
function install$6(scope2) {
  const {
    actions,
    interactStatic: interact2,
    Interactable: Interactable2,
    defaults: defaults2
  } = scope2;
  scope2.usePlugin(drag$1);
  Interactable2.prototype.dropzone = function(options) {
    return dropzoneMethod(this, options);
  };
  Interactable2.prototype.dropCheck = function(dragEvent, event, draggable3, draggableElement, dropElement, rect) {
    return dropCheckMethod(this, dragEvent, event, draggable3, draggableElement, dropElement, rect);
  };
  interact2.dynamicDrop = function(newValue) {
    if (is.bool(newValue)) {
      scope2.dynamicDrop = newValue;
      return interact2;
    }
    return scope2.dynamicDrop;
  };
  extend(actions.phaselessTypes, {
    dragenter: true,
    dragleave: true,
    dropactivate: true,
    dropdeactivate: true,
    dropmove: true,
    drop: true
  });
  actions.methodDict.drop = "dropzone";
  scope2.dynamicDrop = false;
  defaults2.actions.drop = drop.defaults;
}
function collectDrops({
  interactables
}, draggableElement) {
  const drops = [];
  for (const dropzone of interactables.list) {
    if (!dropzone.options.drop.enabled) {
      continue;
    }
    const accept = dropzone.options.drop.accept;
    if (is.element(accept) && accept !== draggableElement || is.string(accept) && !matchesSelector(draggableElement, accept) || is.func(accept) && !accept({
      dropzone,
      draggableElement
    })) {
      continue;
    }
    const dropElements = is.string(dropzone.target) ? dropzone._context.querySelectorAll(dropzone.target) : is.array(dropzone.target) ? dropzone.target : [dropzone.target];
    for (const dropzoneElement of dropElements) {
      if (dropzoneElement !== draggableElement) {
        drops.push({
          dropzone,
          element: dropzoneElement,
          rect: dropzone.getRect(dropzoneElement)
        });
      }
    }
  }
  return drops;
}
function fireActivationEvents(activeDrops, event) {
  for (const {
    dropzone,
    element: element2
  } of activeDrops.slice()) {
    event.dropzone = dropzone;
    event.target = element2;
    dropzone.fire(event);
    event.propagationStopped = event.immediatePropagationStopped = false;
  }
}
function getActiveDrops(scope2, dragElement) {
  const activeDrops = collectDrops(scope2, dragElement);
  for (const activeDrop of activeDrops) {
    activeDrop.rect = activeDrop.dropzone.getRect(activeDrop.element);
  }
  return activeDrops;
}
function getDrop({
  dropState,
  interactable: draggable3,
  element: dragElement
}, dragEvent, pointerEvent) {
  const validDrops = [];
  for (const {
    dropzone,
    element: dropzoneElement,
    rect
  } of dropState.activeDrops) {
    validDrops.push(dropzone.dropCheck(dragEvent, pointerEvent, draggable3, dragElement, dropzoneElement, rect) ? dropzoneElement : null);
  }
  const dropIndex = indexOfDeepestElement(validDrops);
  return dropState.activeDrops[dropIndex] || null;
}
function getDropEvents(interaction, _pointerEvent, dragEvent) {
  const {
    dropState
  } = interaction;
  const dropEvents = {
    enter: null,
    leave: null,
    activate: null,
    deactivate: null,
    move: null,
    drop: null
  };
  if (dragEvent.type === "dragstart") {
    dropEvents.activate = new DropEvent(dropState, dragEvent, "dropactivate");
    dropEvents.activate.target = null;
    dropEvents.activate.dropzone = null;
  }
  if (dragEvent.type === "dragend") {
    dropEvents.deactivate = new DropEvent(dropState, dragEvent, "dropdeactivate");
    dropEvents.deactivate.target = null;
    dropEvents.deactivate.dropzone = null;
  }
  if (dropState.rejected) {
    return dropEvents;
  }
  if (dropState.cur.element !== dropState.prev.element) {
    if (dropState.prev.dropzone) {
      dropEvents.leave = new DropEvent(dropState, dragEvent, "dragleave");
      dragEvent.dragLeave = dropEvents.leave.target = dropState.prev.element;
      dragEvent.prevDropzone = dropEvents.leave.dropzone = dropState.prev.dropzone;
    }
    if (dropState.cur.dropzone) {
      dropEvents.enter = new DropEvent(dropState, dragEvent, "dragenter");
      dragEvent.dragEnter = dropState.cur.element;
      dragEvent.dropzone = dropState.cur.dropzone;
    }
  }
  if (dragEvent.type === "dragend" && dropState.cur.dropzone) {
    dropEvents.drop = new DropEvent(dropState, dragEvent, "drop");
    dragEvent.dropzone = dropState.cur.dropzone;
    dragEvent.relatedTarget = dropState.cur.element;
  }
  if (dragEvent.type === "dragmove" && dropState.cur.dropzone) {
    dropEvents.move = new DropEvent(dropState, dragEvent, "dropmove");
    dropEvents.move.dragmove = dragEvent;
    dragEvent.dropzone = dropState.cur.dropzone;
  }
  return dropEvents;
}
function fireDropEvents(interaction, events2) {
  const {
    dropState
  } = interaction;
  const {
    activeDrops,
    cur,
    prev
  } = dropState;
  if (events2.leave) {
    prev.dropzone.fire(events2.leave);
  }
  if (events2.enter) {
    cur.dropzone.fire(events2.enter);
  }
  if (events2.move) {
    cur.dropzone.fire(events2.move);
  }
  if (events2.drop) {
    cur.dropzone.fire(events2.drop);
  }
  if (events2.deactivate) {
    fireActivationEvents(activeDrops, events2.deactivate);
  }
  dropState.prev.dropzone = cur.dropzone;
  dropState.prev.element = cur.element;
}
function onEventCreated({
  interaction,
  iEvent,
  event
}, scope2) {
  if (iEvent.type !== "dragmove" && iEvent.type !== "dragend") {
    return;
  }
  const {
    dropState
  } = interaction;
  if (scope2.dynamicDrop) {
    dropState.activeDrops = getActiveDrops(scope2, interaction.element);
  }
  const dragEvent = iEvent;
  const dropResult = getDrop(interaction, dragEvent, event);
  dropState.rejected = dropState.rejected && !!dropResult && dropResult.dropzone === dropState.cur.dropzone && dropResult.element === dropState.cur.element;
  dropState.cur.dropzone = dropResult && dropResult.dropzone;
  dropState.cur.element = dropResult && dropResult.element;
  dropState.events = getDropEvents(interaction, event, dragEvent);
}
function dropzoneMethod(interactable, options) {
  if (is.object(options)) {
    interactable.options.drop.enabled = options.enabled !== false;
    if (options.listeners) {
      const normalized = normalize(options.listeners);
      const corrected = Object.keys(normalized).reduce((acc, type) => {
        const correctedType = /^(enter|leave)/.test(type) ? `drag${type}` : /^(activate|deactivate|move)/.test(type) ? `drop${type}` : type;
        acc[correctedType] = normalized[type];
        return acc;
      }, {});
      interactable.off(interactable.options.drop.listeners);
      interactable.on(corrected);
      interactable.options.drop.listeners = corrected;
    }
    if (is.func(options.ondrop)) {
      interactable.on("drop", options.ondrop);
    }
    if (is.func(options.ondropactivate)) {
      interactable.on("dropactivate", options.ondropactivate);
    }
    if (is.func(options.ondropdeactivate)) {
      interactable.on("dropdeactivate", options.ondropdeactivate);
    }
    if (is.func(options.ondragenter)) {
      interactable.on("dragenter", options.ondragenter);
    }
    if (is.func(options.ondragleave)) {
      interactable.on("dragleave", options.ondragleave);
    }
    if (is.func(options.ondropmove)) {
      interactable.on("dropmove", options.ondropmove);
    }
    if (/^(pointer|center)$/.test(options.overlap)) {
      interactable.options.drop.overlap = options.overlap;
    } else if (is.number(options.overlap)) {
      interactable.options.drop.overlap = Math.max(Math.min(1, options.overlap), 0);
    }
    if ("accept" in options) {
      interactable.options.drop.accept = options.accept;
    }
    if ("checker" in options) {
      interactable.options.drop.checker = options.checker;
    }
    return interactable;
  }
  if (is.bool(options)) {
    interactable.options.drop.enabled = options;
    return interactable;
  }
  return interactable.options.drop;
}
function dropCheckMethod(interactable, dragEvent, event, draggable3, draggableElement, dropElement, rect) {
  let dropped = false;
  if (!(rect = rect || interactable.getRect(dropElement))) {
    return interactable.options.drop.checker ? interactable.options.drop.checker(dragEvent, event, dropped, interactable, dropElement, draggable3, draggableElement) : false;
  }
  const dropOverlap = interactable.options.drop.overlap;
  if (dropOverlap === "pointer") {
    const origin = getOriginXY(draggable3, draggableElement, "drag");
    const page = getPageXY(dragEvent);
    page.x += origin.x;
    page.y += origin.y;
    const horizontal = page.x > rect.left && page.x < rect.right;
    const vertical = page.y > rect.top && page.y < rect.bottom;
    dropped = horizontal && vertical;
  }
  const dragRect = draggable3.getRect(draggableElement);
  if (dragRect && dropOverlap === "center") {
    const cx = dragRect.left + dragRect.width / 2;
    const cy = dragRect.top + dragRect.height / 2;
    dropped = cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
  }
  if (dragRect && is.number(dropOverlap)) {
    const overlapArea = Math.max(0, Math.min(rect.right, dragRect.right) - Math.max(rect.left, dragRect.left)) * Math.max(0, Math.min(rect.bottom, dragRect.bottom) - Math.max(rect.top, dragRect.top));
    const overlapRatio = overlapArea / (dragRect.width * dragRect.height);
    dropped = overlapRatio >= dropOverlap;
  }
  if (interactable.options.drop.checker) {
    dropped = interactable.options.drop.checker(dragEvent, event, dropped, interactable, dropElement, draggable3, draggableElement);
  }
  return dropped;
}
const drop = {
  id: "actions/drop",
  install: install$6,
  listeners: {
    "interactions:before-action-start": ({
      interaction
    }) => {
      if (interaction.prepared.name !== "drag") {
        return;
      }
      interaction.dropState = {
        cur: {
          dropzone: null,
          element: null
        },
        prev: {
          dropzone: null,
          element: null
        },
        rejected: null,
        events: null,
        activeDrops: []
      };
    },
    "interactions:after-action-start": ({
      interaction,
      event,
      iEvent: dragEvent
    }, scope2) => {
      if (interaction.prepared.name !== "drag") {
        return;
      }
      const {
        dropState
      } = interaction;
      dropState.activeDrops = null;
      dropState.events = null;
      dropState.activeDrops = getActiveDrops(scope2, interaction.element);
      dropState.events = getDropEvents(interaction, event, dragEvent);
      if (dropState.events.activate) {
        fireActivationEvents(dropState.activeDrops, dropState.events.activate);
        scope2.fire("actions/drop:start", {
          interaction,
          dragEvent
        });
      }
    },
    "interactions:action-move": onEventCreated,
    "interactions:after-action-move": ({
      interaction,
      iEvent: dragEvent
    }, scope2) => {
      if (interaction.prepared.name !== "drag") {
        return;
      }
      fireDropEvents(interaction, interaction.dropState.events);
      scope2.fire("actions/drop:move", {
        interaction,
        dragEvent
      });
      interaction.dropState.events = {};
    },
    "interactions:action-end": (arg, scope2) => {
      if (arg.interaction.prepared.name !== "drag") {
        return;
      }
      const {
        interaction,
        iEvent: dragEvent
      } = arg;
      onEventCreated(arg, scope2);
      fireDropEvents(interaction, interaction.dropState.events);
      scope2.fire("actions/drop:end", {
        interaction,
        dragEvent
      });
    },
    "interactions:stop": ({
      interaction
    }) => {
      if (interaction.prepared.name !== "drag") {
        return;
      }
      const {
        dropState
      } = interaction;
      if (dropState) {
        dropState.activeDrops = null;
        dropState.events = null;
        dropState.cur.dropzone = null;
        dropState.cur.element = null;
        dropState.prev.dropzone = null;
        dropState.prev.element = null;
        dropState.rejected = false;
      }
    }
  },
  getActiveDrops,
  getDrop,
  getDropEvents,
  fireDropEvents,
  defaults: {
    enabled: false,
    accept: null,
    overlap: "pointer"
  }
};
var drop$1 = drop;
function install$5(scope2) {
  const {
    actions,
    Interactable: Interactable2,
    defaults: defaults2
  } = scope2;
  Interactable2.prototype.gesturable = function(options) {
    if (is.object(options)) {
      this.options.gesture.enabled = options.enabled !== false;
      this.setPerAction("gesture", options);
      this.setOnEvents("gesture", options);
      return this;
    }
    if (is.bool(options)) {
      this.options.gesture.enabled = options;
      return this;
    }
    return this.options.gesture;
  };
  actions.map.gesture = gesture;
  actions.methodDict.gesture = "gesturable";
  defaults2.actions.gesture = gesture.defaults;
}
function updateGestureProps({
  interaction,
  iEvent,
  phase
}) {
  if (interaction.prepared.name !== "gesture")
    return;
  const pointers = interaction.pointers.map((p) => p.pointer);
  const starting = phase === "start";
  const ending = phase === "end";
  const deltaSource = interaction.interactable.options.deltaSource;
  iEvent.touches = [pointers[0], pointers[1]];
  if (starting) {
    iEvent.distance = touchDistance(pointers, deltaSource);
    iEvent.box = touchBBox(pointers);
    iEvent.scale = 1;
    iEvent.ds = 0;
    iEvent.angle = touchAngle(pointers, deltaSource);
    iEvent.da = 0;
    interaction.gesture.startDistance = iEvent.distance;
    interaction.gesture.startAngle = iEvent.angle;
  } else if (ending) {
    const prevEvent = interaction.prevEvent;
    iEvent.distance = prevEvent.distance;
    iEvent.box = prevEvent.box;
    iEvent.scale = prevEvent.scale;
    iEvent.ds = 0;
    iEvent.angle = prevEvent.angle;
    iEvent.da = 0;
  } else {
    iEvent.distance = touchDistance(pointers, deltaSource);
    iEvent.box = touchBBox(pointers);
    iEvent.scale = iEvent.distance / interaction.gesture.startDistance;
    iEvent.angle = touchAngle(pointers, deltaSource);
    iEvent.ds = iEvent.scale - interaction.gesture.scale;
    iEvent.da = iEvent.angle - interaction.gesture.angle;
  }
  interaction.gesture.distance = iEvent.distance;
  interaction.gesture.angle = iEvent.angle;
  if (is.number(iEvent.scale) && iEvent.scale !== Infinity && !isNaN(iEvent.scale)) {
    interaction.gesture.scale = iEvent.scale;
  }
}
const gesture = {
  id: "actions/gesture",
  before: ["actions/drag", "actions/resize"],
  install: install$5,
  listeners: {
    "interactions:action-start": updateGestureProps,
    "interactions:action-move": updateGestureProps,
    "interactions:action-end": updateGestureProps,
    "interactions:new": ({
      interaction
    }) => {
      interaction.gesture = {
        angle: 0,
        distance: 0,
        scale: 1,
        startAngle: 0,
        startDistance: 0
      };
    },
    "auto-start:check": (arg) => {
      if (arg.interaction.pointers.length < 2) {
        return void 0;
      }
      const gestureOptions = arg.interactable.options.gesture;
      if (!(gestureOptions && gestureOptions.enabled)) {
        return void 0;
      }
      arg.action = {
        name: "gesture"
      };
      return false;
    }
  },
  defaults: {},
  getCursor() {
    return "";
  }
};
var gesture$1 = gesture;
function install$4(scope2) {
  const {
    actions,
    browser: browser2,
    Interactable: Interactable2,
    defaults: defaults2
  } = scope2;
  resize.cursors = initCursors(browser2);
  resize.defaultMargin = browser2.supportsTouch || browser2.supportsPointerEvent ? 20 : 10;
  Interactable2.prototype.resizable = function(options) {
    return resizable(this, options, scope2);
  };
  actions.map.resize = resize;
  actions.methodDict.resize = "resizable";
  defaults2.actions.resize = resize.defaults;
}
function resizeChecker(arg) {
  const {
    interaction,
    interactable,
    element: element2,
    rect,
    buttons
  } = arg;
  if (!rect) {
    return void 0;
  }
  const page = extend({}, interaction.coords.cur.page);
  const resizeOptions = interactable.options.resize;
  if (!(resizeOptions && resizeOptions.enabled) || interaction.pointerIsDown && /mouse|pointer/.test(interaction.pointerType) && (buttons & resizeOptions.mouseButtons) === 0) {
    return void 0;
  }
  if (is.object(resizeOptions.edges)) {
    const resizeEdges = {
      left: false,
      right: false,
      top: false,
      bottom: false
    };
    for (const edge in resizeEdges) {
      resizeEdges[edge] = checkResizeEdge(edge, resizeOptions.edges[edge], page, interaction._latestPointer.eventTarget, element2, rect, resizeOptions.margin || resize.defaultMargin);
    }
    resizeEdges.left = resizeEdges.left && !resizeEdges.right;
    resizeEdges.top = resizeEdges.top && !resizeEdges.bottom;
    if (resizeEdges.left || resizeEdges.right || resizeEdges.top || resizeEdges.bottom) {
      arg.action = {
        name: "resize",
        edges: resizeEdges
      };
    }
  } else {
    const right = resizeOptions.axis !== "y" && page.x > rect.right - resize.defaultMargin;
    const bottom = resizeOptions.axis !== "x" && page.y > rect.bottom - resize.defaultMargin;
    if (right || bottom) {
      arg.action = {
        name: "resize",
        axes: (right ? "x" : "") + (bottom ? "y" : "")
      };
    }
  }
  return arg.action ? false : void 0;
}
function resizable(interactable, options, scope2) {
  if (is.object(options)) {
    interactable.options.resize.enabled = options.enabled !== false;
    interactable.setPerAction("resize", options);
    interactable.setOnEvents("resize", options);
    if (is.string(options.axis) && /^x$|^y$|^xy$/.test(options.axis)) {
      interactable.options.resize.axis = options.axis;
    } else if (options.axis === null) {
      interactable.options.resize.axis = scope2.defaults.actions.resize.axis;
    }
    if (is.bool(options.preserveAspectRatio)) {
      interactable.options.resize.preserveAspectRatio = options.preserveAspectRatio;
    } else if (is.bool(options.square)) {
      interactable.options.resize.square = options.square;
    }
    return interactable;
  }
  if (is.bool(options)) {
    interactable.options.resize.enabled = options;
    return interactable;
  }
  return interactable.options.resize;
}
function checkResizeEdge(name, value, page, element2, interactableElement, rect, margin) {
  if (!value) {
    return false;
  }
  if (value === true) {
    const width = is.number(rect.width) ? rect.width : rect.right - rect.left;
    const height = is.number(rect.height) ? rect.height : rect.bottom - rect.top;
    margin = Math.min(margin, Math.abs((name === "left" || name === "right" ? width : height) / 2));
    if (width < 0) {
      if (name === "left") {
        name = "right";
      } else if (name === "right") {
        name = "left";
      }
    }
    if (height < 0) {
      if (name === "top") {
        name = "bottom";
      } else if (name === "bottom") {
        name = "top";
      }
    }
    if (name === "left") {
      return page.x < (width >= 0 ? rect.left : rect.right) + margin;
    }
    if (name === "top") {
      return page.y < (height >= 0 ? rect.top : rect.bottom) + margin;
    }
    if (name === "right") {
      return page.x > (width >= 0 ? rect.right : rect.left) - margin;
    }
    if (name === "bottom") {
      return page.y > (height >= 0 ? rect.bottom : rect.top) - margin;
    }
  }
  if (!is.element(element2)) {
    return false;
  }
  return is.element(value) ? value === element2 : matchesUpTo(element2, value, interactableElement);
}
function initCursors(browser2) {
  return browser2.isIe9 ? {
    x: "e-resize",
    y: "s-resize",
    xy: "se-resize",
    top: "n-resize",
    left: "w-resize",
    bottom: "s-resize",
    right: "e-resize",
    topleft: "se-resize",
    bottomright: "se-resize",
    topright: "ne-resize",
    bottomleft: "ne-resize"
  } : {
    x: "ew-resize",
    y: "ns-resize",
    xy: "nwse-resize",
    top: "ns-resize",
    left: "ew-resize",
    bottom: "ns-resize",
    right: "ew-resize",
    topleft: "nwse-resize",
    bottomright: "nwse-resize",
    topright: "nesw-resize",
    bottomleft: "nesw-resize"
  };
}
function start({
  iEvent,
  interaction
}) {
  if (interaction.prepared.name !== "resize" || !interaction.prepared.edges) {
    return;
  }
  const resizeEvent = iEvent;
  const rect = interaction.rect;
  interaction._rects = {
    start: extend({}, rect),
    corrected: extend({}, rect),
    previous: extend({}, rect),
    delta: {
      left: 0,
      right: 0,
      width: 0,
      top: 0,
      bottom: 0,
      height: 0
    }
  };
  resizeEvent.edges = interaction.prepared.edges;
  resizeEvent.rect = interaction._rects.corrected;
  resizeEvent.deltaRect = interaction._rects.delta;
}
function move({
  iEvent,
  interaction
}) {
  if (interaction.prepared.name !== "resize" || !interaction.prepared.edges)
    return;
  const resizeEvent = iEvent;
  const resizeOptions = interaction.interactable.options.resize;
  const invert = resizeOptions.invert;
  const invertible = invert === "reposition" || invert === "negate";
  const current = interaction.rect;
  const {
    start: startRect,
    corrected,
    delta: deltaRect,
    previous
  } = interaction._rects;
  extend(previous, corrected);
  if (invertible) {
    extend(corrected, current);
    if (invert === "reposition") {
      if (corrected.top > corrected.bottom) {
        const swap = corrected.top;
        corrected.top = corrected.bottom;
        corrected.bottom = swap;
      }
      if (corrected.left > corrected.right) {
        const swap = corrected.left;
        corrected.left = corrected.right;
        corrected.right = swap;
      }
    }
  } else {
    corrected.top = Math.min(current.top, startRect.bottom);
    corrected.bottom = Math.max(current.bottom, startRect.top);
    corrected.left = Math.min(current.left, startRect.right);
    corrected.right = Math.max(current.right, startRect.left);
  }
  corrected.width = corrected.right - corrected.left;
  corrected.height = corrected.bottom - corrected.top;
  for (const edge in corrected) {
    deltaRect[edge] = corrected[edge] - previous[edge];
  }
  resizeEvent.edges = interaction.prepared.edges;
  resizeEvent.rect = corrected;
  resizeEvent.deltaRect = deltaRect;
}
function end({
  iEvent,
  interaction
}) {
  if (interaction.prepared.name !== "resize" || !interaction.prepared.edges)
    return;
  const resizeEvent = iEvent;
  resizeEvent.edges = interaction.prepared.edges;
  resizeEvent.rect = interaction._rects.corrected;
  resizeEvent.deltaRect = interaction._rects.delta;
}
function updateEventAxes({
  iEvent,
  interaction
}) {
  if (interaction.prepared.name !== "resize" || !interaction.resizeAxes)
    return;
  const options = interaction.interactable.options;
  const resizeEvent = iEvent;
  if (options.resize.square) {
    if (interaction.resizeAxes === "y") {
      resizeEvent.delta.x = resizeEvent.delta.y;
    } else {
      resizeEvent.delta.y = resizeEvent.delta.x;
    }
    resizeEvent.axes = "xy";
  } else {
    resizeEvent.axes = interaction.resizeAxes;
    if (interaction.resizeAxes === "x") {
      resizeEvent.delta.y = 0;
    } else if (interaction.resizeAxes === "y") {
      resizeEvent.delta.x = 0;
    }
  }
}
const resize = {
  id: "actions/resize",
  before: ["actions/drag"],
  install: install$4,
  listeners: {
    "interactions:new": ({
      interaction
    }) => {
      interaction.resizeAxes = "xy";
    },
    "interactions:action-start": (arg) => {
      start(arg);
      updateEventAxes(arg);
    },
    "interactions:action-move": (arg) => {
      move(arg);
      updateEventAxes(arg);
    },
    "interactions:action-end": end,
    "auto-start:check": resizeChecker
  },
  defaults: {
    square: false,
    preserveAspectRatio: false,
    axis: "xy",
    margin: NaN,
    edges: null,
    invert: "none"
  },
  cursors: null,
  getCursor({
    edges,
    axis,
    name
  }) {
    const cursors = resize.cursors;
    let result = null;
    if (axis) {
      result = cursors[name + axis];
    } else if (edges) {
      let cursorKey = "";
      for (const edge of ["top", "bottom", "left", "right"]) {
        if (edges[edge]) {
          cursorKey += edge;
        }
      }
      result = cursors[cursorKey];
    }
    return result;
  },
  defaultMargin: null
};
var resize$1 = resize;
var plugin$2 = {
  id: "actions",
  install(scope2) {
    scope2.usePlugin(gesture$1);
    scope2.usePlugin(resize$1);
    scope2.usePlugin(drag$1);
    scope2.usePlugin(drop$1);
  }
};
interact$1.use(plugin$2);
function install$3(scope2) {
  const {
    Interactable: Interactable2
  } = scope2;
  Interactable2.prototype.getAction = function getAction(pointer, event, interaction, element2) {
    const action = defaultActionChecker(this, event, interaction, element2, scope2);
    if (this.options.actionChecker) {
      return this.options.actionChecker(pointer, event, action, this, element2, interaction);
    }
    return action;
  };
  Interactable2.prototype.ignoreFrom = warnOnce(function(newValue) {
    return this._backCompatOption("ignoreFrom", newValue);
  }, "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue}).");
  Interactable2.prototype.allowFrom = warnOnce(function(newValue) {
    return this._backCompatOption("allowFrom", newValue);
  }, "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue}).");
  Interactable2.prototype.actionChecker = actionChecker;
  Interactable2.prototype.styleCursor = styleCursor;
}
function defaultActionChecker(interactable, event, interaction, element2, scope2) {
  const rect = interactable.getRect(element2);
  const buttons = event.buttons || {
    0: 1,
    1: 4,
    3: 8,
    4: 16
  }[event.button];
  const arg = {
    action: null,
    interactable,
    interaction,
    element: element2,
    rect,
    buttons
  };
  scope2.fire("auto-start:check", arg);
  return arg.action;
}
function styleCursor(newValue) {
  if (is.bool(newValue)) {
    this.options.styleCursor = newValue;
    return this;
  }
  if (newValue === null) {
    delete this.options.styleCursor;
    return this;
  }
  return this.options.styleCursor;
}
function actionChecker(checker) {
  if (is.func(checker)) {
    this.options.actionChecker = checker;
    return this;
  }
  if (checker === null) {
    delete this.options.actionChecker;
    return this;
  }
  return this.options.actionChecker;
}
var InteractableMethods = {
  id: "auto-start/interactableMethods",
  install: install$3
};
function install$2(scope2) {
  const {
    interactStatic: interact2,
    defaults: defaults2
  } = scope2;
  scope2.usePlugin(InteractableMethods);
  defaults2.base.actionChecker = null;
  defaults2.base.styleCursor = true;
  extend(defaults2.perAction, {
    manualStart: false,
    max: Infinity,
    maxPerElement: 1,
    allowFrom: null,
    ignoreFrom: null,
    mouseButtons: 1
  });
  interact2.maxInteractions = (newValue) => maxInteractions(newValue, scope2);
  scope2.autoStart = {
    maxInteractions: Infinity,
    withinInteractionLimit,
    cursorElement: null
  };
}
function prepareOnDown({
  interaction,
  pointer,
  event,
  eventTarget
}, scope2) {
  if (interaction.interacting())
    return;
  const actionInfo = getActionInfo(interaction, pointer, event, eventTarget, scope2);
  prepare(interaction, actionInfo, scope2);
}
function prepareOnMove({
  interaction,
  pointer,
  event,
  eventTarget
}, scope2) {
  if (interaction.pointerType !== "mouse" || interaction.pointerIsDown || interaction.interacting())
    return;
  const actionInfo = getActionInfo(interaction, pointer, event, eventTarget, scope2);
  prepare(interaction, actionInfo, scope2);
}
function startOnMove(arg, scope2) {
  const {
    interaction
  } = arg;
  if (!interaction.pointerIsDown || interaction.interacting() || !interaction.pointerWasMoved || !interaction.prepared.name) {
    return;
  }
  scope2.fire("autoStart:before-start", arg);
  const {
    interactable
  } = interaction;
  const actionName = interaction.prepared.name;
  if (actionName && interactable) {
    if (interactable.options[actionName].manualStart || !withinInteractionLimit(interactable, interaction.element, interaction.prepared, scope2)) {
      interaction.stop();
    } else {
      interaction.start(interaction.prepared, interactable, interaction.element);
      setInteractionCursor(interaction, scope2);
    }
  }
}
function clearCursorOnStop({
  interaction
}, scope2) {
  const {
    interactable
  } = interaction;
  if (interactable && interactable.options.styleCursor) {
    setCursor(interaction.element, "", scope2);
  }
}
function validateAction(action, interactable, element2, eventTarget, scope2) {
  if (interactable.testIgnoreAllow(interactable.options[action.name], element2, eventTarget) && interactable.options[action.name].enabled && withinInteractionLimit(interactable, element2, action, scope2)) {
    return action;
  }
  return null;
}
function validateMatches(interaction, pointer, event, matches, matchElements, eventTarget, scope2) {
  for (let i = 0, len = matches.length; i < len; i++) {
    const match = matches[i];
    const matchElement = matchElements[i];
    const matchAction = match.getAction(pointer, event, interaction, matchElement);
    if (!matchAction) {
      continue;
    }
    const action = validateAction(matchAction, match, matchElement, eventTarget, scope2);
    if (action) {
      return {
        action,
        interactable: match,
        element: matchElement
      };
    }
  }
  return {
    action: null,
    interactable: null,
    element: null
  };
}
function getActionInfo(interaction, pointer, event, eventTarget, scope2) {
  let matches = [];
  let matchElements = [];
  let element2 = eventTarget;
  function pushMatches(interactable) {
    matches.push(interactable);
    matchElements.push(element2);
  }
  while (is.element(element2)) {
    matches = [];
    matchElements = [];
    scope2.interactables.forEachMatch(element2, pushMatches);
    const actionInfo = validateMatches(interaction, pointer, event, matches, matchElements, eventTarget, scope2);
    if (actionInfo.action && !actionInfo.interactable.options[actionInfo.action.name].manualStart) {
      return actionInfo;
    }
    element2 = parentNode(element2);
  }
  return {
    action: null,
    interactable: null,
    element: null
  };
}
function prepare(interaction, {
  action,
  interactable,
  element: element2
}, scope2) {
  action = action || {
    name: null
  };
  interaction.interactable = interactable;
  interaction.element = element2;
  copyAction(interaction.prepared, action);
  interaction.rect = interactable && action.name ? interactable.getRect(element2) : null;
  setInteractionCursor(interaction, scope2);
  scope2.fire("autoStart:prepared", {
    interaction
  });
}
function withinInteractionLimit(interactable, element2, action, scope2) {
  const options = interactable.options;
  const maxActions = options[action.name].max;
  const maxPerElement = options[action.name].maxPerElement;
  const autoStartMax = scope2.autoStart.maxInteractions;
  let activeInteractions = 0;
  let interactableCount = 0;
  let elementCount = 0;
  if (!(maxActions && maxPerElement && autoStartMax)) {
    return false;
  }
  for (const interaction of scope2.interactions.list) {
    const otherAction = interaction.prepared.name;
    if (!interaction.interacting()) {
      continue;
    }
    activeInteractions++;
    if (activeInteractions >= autoStartMax) {
      return false;
    }
    if (interaction.interactable !== interactable) {
      continue;
    }
    interactableCount += otherAction === action.name ? 1 : 0;
    if (interactableCount >= maxActions) {
      return false;
    }
    if (interaction.element === element2) {
      elementCount++;
      if (otherAction === action.name && elementCount >= maxPerElement) {
        return false;
      }
    }
  }
  return autoStartMax > 0;
}
function maxInteractions(newValue, scope2) {
  if (is.number(newValue)) {
    scope2.autoStart.maxInteractions = newValue;
    return this;
  }
  return scope2.autoStart.maxInteractions;
}
function setCursor(element2, cursor, scope2) {
  const {
    cursorElement: prevCursorElement
  } = scope2.autoStart;
  if (prevCursorElement && prevCursorElement !== element2) {
    prevCursorElement.style.cursor = "";
  }
  element2.ownerDocument.documentElement.style.cursor = cursor;
  element2.style.cursor = cursor;
  scope2.autoStart.cursorElement = cursor ? element2 : null;
}
function setInteractionCursor(interaction, scope2) {
  const {
    interactable,
    element: element2,
    prepared
  } = interaction;
  if (!(interaction.pointerType === "mouse" && interactable && interactable.options.styleCursor)) {
    if (scope2.autoStart.cursorElement) {
      setCursor(scope2.autoStart.cursorElement, "", scope2);
    }
    return;
  }
  let cursor = "";
  if (prepared.name) {
    const cursorChecker = interactable.options[prepared.name].cursorChecker;
    if (is.func(cursorChecker)) {
      cursor = cursorChecker(prepared, interactable, element2, interaction._interacting);
    } else {
      cursor = scope2.actions.map[prepared.name].getCursor(prepared);
    }
  }
  setCursor(interaction.element, cursor || "", scope2);
}
const autoStart = {
  id: "auto-start/base",
  before: ["actions"],
  install: install$2,
  listeners: {
    "interactions:down": prepareOnDown,
    "interactions:move": (arg, scope2) => {
      prepareOnMove(arg, scope2);
      startOnMove(arg, scope2);
    },
    "interactions:stop": clearCursorOnStop
  },
  maxInteractions,
  withinInteractionLimit,
  validateAction
};
var autoStart$1 = autoStart;
function beforeStart({
  interaction,
  eventTarget,
  dx,
  dy
}, scope2) {
  if (interaction.prepared.name !== "drag")
    return;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);
  const targetOptions = interaction.interactable.options.drag;
  const startAxis = targetOptions.startAxis;
  const currentAxis = absX > absY ? "x" : absX < absY ? "y" : "xy";
  interaction.prepared.axis = targetOptions.lockAxis === "start" ? currentAxis[0] : targetOptions.lockAxis;
  if (currentAxis !== "xy" && startAxis !== "xy" && startAxis !== currentAxis) {
    interaction.prepared.name = null;
    let element2 = eventTarget;
    const getDraggable = function(interactable) {
      if (interactable === interaction.interactable)
        return;
      const options = interaction.interactable.options.drag;
      if (!options.manualStart && interactable.testIgnoreAllow(options, element2, eventTarget)) {
        const action = interactable.getAction(interaction.downPointer, interaction.downEvent, interaction, element2);
        if (action && action.name === "drag" && checkStartAxis(currentAxis, interactable) && autoStart$1.validateAction(action, interactable, element2, eventTarget, scope2)) {
          return interactable;
        }
      }
    };
    while (is.element(element2)) {
      const interactable = scope2.interactables.forEachMatch(element2, getDraggable);
      if (interactable) {
        interaction.prepared.name = "drag";
        interaction.interactable = interactable;
        interaction.element = element2;
        break;
      }
      element2 = parentNode(element2);
    }
  }
}
function checkStartAxis(startAxis, interactable) {
  if (!interactable) {
    return false;
  }
  const thisAxis = interactable.options.drag.startAxis;
  return startAxis === "xy" || thisAxis === "xy" || thisAxis === startAxis;
}
var dragAxis = {
  id: "auto-start/dragAxis",
  listeners: {
    "autoStart:before-start": beforeStart
  }
};
function install$1(scope2) {
  const {
    defaults: defaults2
  } = scope2;
  scope2.usePlugin(autoStart$1);
  defaults2.perAction.hold = 0;
  defaults2.perAction.delay = 0;
}
function getHoldDuration(interaction) {
  const actionName = interaction.prepared && interaction.prepared.name;
  if (!actionName) {
    return null;
  }
  const options = interaction.interactable.options;
  return options[actionName].hold || options[actionName].delay;
}
const hold = {
  id: "auto-start/hold",
  install: install$1,
  listeners: {
    "interactions:new": ({
      interaction
    }) => {
      interaction.autoStartHoldTimer = null;
    },
    "autoStart:prepared": ({
      interaction
    }) => {
      const hold2 = getHoldDuration(interaction);
      if (hold2 > 0) {
        interaction.autoStartHoldTimer = setTimeout(() => {
          interaction.start(interaction.prepared, interaction.interactable, interaction.element);
        }, hold2);
      }
    },
    "interactions:move": ({
      interaction,
      duplicate
    }) => {
      if (interaction.autoStartHoldTimer && interaction.pointerWasMoved && !duplicate) {
        clearTimeout(interaction.autoStartHoldTimer);
        interaction.autoStartHoldTimer = null;
      }
    },
    "autoStart:before-start": ({
      interaction
    }) => {
      const holdDuration = getHoldDuration(interaction);
      if (holdDuration > 0) {
        interaction.prepared.name = null;
      }
    }
  },
  getHoldDuration
};
var hold$1 = hold;
var plugin$1 = {
  id: "auto-start",
  install(scope2) {
    scope2.usePlugin(autoStart$1);
    scope2.usePlugin(hold$1);
    scope2.usePlugin(dragAxis);
  }
};
interact$1.use(plugin$1);
var dist$1 = {};
var SimpleEventDispatcher$1 = {};
var dist = {};
var DispatcherBase$1 = {};
Object.defineProperty(DispatcherBase$1, "__esModule", { value: true });
DispatcherBase$1.DispatcherBase = void 0;
const __1$2 = dist;
class DispatcherBase {
  constructor() {
    this._subscriptions = new Array();
  }
  get count() {
    return this._subscriptions.length;
  }
  get onSubscriptionChange() {
    if (this._onSubscriptionChange == null) {
      this._onSubscriptionChange = new __1$2.SubscriptionChangeEventDispatcher();
    }
    return this._onSubscriptionChange.asEvent();
  }
  subscribe(fn) {
    if (fn) {
      this._subscriptions.push(this.createSubscription(fn, false));
      this.triggerSubscriptionChange();
    }
    return () => {
      this.unsubscribe(fn);
    };
  }
  sub(fn) {
    return this.subscribe(fn);
  }
  one(fn) {
    if (fn) {
      this._subscriptions.push(this.createSubscription(fn, true));
      this.triggerSubscriptionChange();
    }
    return () => {
      this.unsubscribe(fn);
    };
  }
  has(fn) {
    if (!fn)
      return false;
    return this._subscriptions.some((sub) => sub.handler == fn);
  }
  unsubscribe(fn) {
    if (!fn)
      return;
    let changes = false;
    for (let i = 0; i < this._subscriptions.length; i++) {
      if (this._subscriptions[i].handler == fn) {
        this._subscriptions.splice(i, 1);
        changes = true;
        break;
      }
    }
    if (changes) {
      this.triggerSubscriptionChange();
    }
  }
  unsub(fn) {
    this.unsubscribe(fn);
  }
  _dispatch(executeAsync, scope2, args) {
    for (let sub of [...this._subscriptions]) {
      let ev = new __1$2.EventManagement(() => this.unsub(sub.handler));
      let nargs = Array.prototype.slice.call(args);
      nargs.push(ev);
      let s = sub;
      s.execute(executeAsync, scope2, nargs);
      this.cleanup(sub);
      if (!executeAsync && ev.propagationStopped) {
        return { propagationStopped: true };
      }
    }
    if (executeAsync) {
      return null;
    }
    return { propagationStopped: false };
  }
  createSubscription(handler, isOnce) {
    return new __1$2.Subscription(handler, isOnce);
  }
  cleanup(sub) {
    let changes = false;
    if (sub.isOnce && sub.isExecuted) {
      let i = this._subscriptions.indexOf(sub);
      if (i > -1) {
        this._subscriptions.splice(i, 1);
        changes = true;
      }
    }
    if (changes) {
      this.triggerSubscriptionChange();
    }
  }
  asEvent() {
    if (this._wrap == null) {
      this._wrap = new __1$2.DispatcherWrapper(this);
    }
    return this._wrap;
  }
  clear() {
    if (this._subscriptions.length != 0) {
      this._subscriptions.splice(0, this._subscriptions.length);
      this.triggerSubscriptionChange();
    }
  }
  triggerSubscriptionChange() {
    if (this._onSubscriptionChange != null) {
      this._onSubscriptionChange.dispatch(this.count);
    }
  }
}
DispatcherBase$1.DispatcherBase = DispatcherBase;
var DispatchError$1 = {};
Object.defineProperty(DispatchError$1, "__esModule", { value: true });
DispatchError$1.DispatchError = void 0;
class DispatchError extends Error {
  constructor(message) {
    super(message);
  }
}
DispatchError$1.DispatchError = DispatchError;
var DispatcherWrapper$1 = {};
Object.defineProperty(DispatcherWrapper$1, "__esModule", { value: true });
DispatcherWrapper$1.DispatcherWrapper = void 0;
class DispatcherWrapper {
  constructor(dispatcher) {
    this._subscribe = (fn) => dispatcher.subscribe(fn);
    this._unsubscribe = (fn) => dispatcher.unsubscribe(fn);
    this._one = (fn) => dispatcher.one(fn);
    this._has = (fn) => dispatcher.has(fn);
    this._clear = () => dispatcher.clear();
    this._count = () => dispatcher.count;
    this._onSubscriptionChange = () => dispatcher.onSubscriptionChange;
  }
  get onSubscriptionChange() {
    return this._onSubscriptionChange();
  }
  get count() {
    return this._count();
  }
  subscribe(fn) {
    return this._subscribe(fn);
  }
  sub(fn) {
    return this.subscribe(fn);
  }
  unsubscribe(fn) {
    this._unsubscribe(fn);
  }
  unsub(fn) {
    this.unsubscribe(fn);
  }
  one(fn) {
    return this._one(fn);
  }
  has(fn) {
    return this._has(fn);
  }
  clear() {
    this._clear();
  }
}
DispatcherWrapper$1.DispatcherWrapper = DispatcherWrapper;
var EventListBase$1 = {};
Object.defineProperty(EventListBase$1, "__esModule", { value: true });
EventListBase$1.EventListBase = void 0;
class EventListBase {
  constructor() {
    this._events = {};
  }
  get(name) {
    let event = this._events[name];
    if (event) {
      return event;
    }
    event = this.createDispatcher();
    this._events[name] = event;
    return event;
  }
  remove(name) {
    delete this._events[name];
  }
}
EventListBase$1.EventListBase = EventListBase;
var EventManagement$1 = {};
Object.defineProperty(EventManagement$1, "__esModule", { value: true });
EventManagement$1.EventManagement = void 0;
class EventManagement {
  constructor(unsub) {
    this.unsub = unsub;
    this.propagationStopped = false;
  }
  stopPropagation() {
    this.propagationStopped = true;
  }
}
EventManagement$1.EventManagement = EventManagement;
var HandlingBase$1 = {};
Object.defineProperty(HandlingBase$1, "__esModule", { value: true });
HandlingBase$1.HandlingBase = void 0;
class HandlingBase {
  constructor(events2) {
    this.events = events2;
  }
  one(name, fn) {
    this.events.get(name).one(fn);
  }
  has(name, fn) {
    return this.events.get(name).has(fn);
  }
  subscribe(name, fn) {
    this.events.get(name).subscribe(fn);
  }
  sub(name, fn) {
    this.subscribe(name, fn);
  }
  unsubscribe(name, fn) {
    this.events.get(name).unsubscribe(fn);
  }
  unsub(name, fn) {
    this.unsubscribe(name, fn);
  }
}
HandlingBase$1.HandlingBase = HandlingBase;
var PromiseDispatcherBase$1 = {};
Object.defineProperty(PromiseDispatcherBase$1, "__esModule", { value: true });
PromiseDispatcherBase$1.PromiseDispatcherBase = void 0;
const __1$1 = dist;
class PromiseDispatcherBase extends __1$1.DispatcherBase {
  _dispatch(executeAsync, scope2, args) {
    throw new __1$1.DispatchError("_dispatch not supported. Use _dispatchAsPromise.");
  }
  createSubscription(handler, isOnce) {
    return new __1$1.PromiseSubscription(handler, isOnce);
  }
  async _dispatchAsPromise(executeAsync, scope2, args) {
    for (let sub of [...this._subscriptions]) {
      let ev = new __1$1.EventManagement(() => this.unsub(sub.handler));
      let nargs = Array.prototype.slice.call(args);
      nargs.push(ev);
      let ps = sub;
      await ps.execute(executeAsync, scope2, nargs);
      this.cleanup(sub);
      if (!executeAsync && ev.propagationStopped) {
        return { propagationStopped: true };
      }
    }
    if (executeAsync) {
      return null;
    }
    return { propagationStopped: false };
  }
}
PromiseDispatcherBase$1.PromiseDispatcherBase = PromiseDispatcherBase;
var PromiseSubscription$1 = {};
Object.defineProperty(PromiseSubscription$1, "__esModule", { value: true });
PromiseSubscription$1.PromiseSubscription = void 0;
class PromiseSubscription {
  constructor(handler, isOnce) {
    this.handler = handler;
    this.isOnce = isOnce;
    this.isExecuted = false;
  }
  async execute(executeAsync, scope2, args) {
    if (!this.isOnce || !this.isExecuted) {
      this.isExecuted = true;
      var fn = this.handler;
      if (executeAsync) {
        setTimeout(() => {
          fn.apply(scope2, args);
        }, 1);
        return;
      }
      let result = fn.apply(scope2, args);
      await result;
    }
  }
}
PromiseSubscription$1.PromiseSubscription = PromiseSubscription;
var Subscription$1 = {};
Object.defineProperty(Subscription$1, "__esModule", { value: true });
Subscription$1.Subscription = void 0;
class Subscription {
  constructor(handler, isOnce) {
    this.handler = handler;
    this.isOnce = isOnce;
    this.isExecuted = false;
  }
  execute(executeAsync, scope2, args) {
    if (!this.isOnce || !this.isExecuted) {
      this.isExecuted = true;
      var fn = this.handler;
      if (executeAsync) {
        setTimeout(() => {
          fn.apply(scope2, args);
        }, 1);
      } else {
        fn.apply(scope2, args);
      }
    }
  }
}
Subscription$1.Subscription = Subscription;
var SubscriptionChangeEventHandler = {};
Object.defineProperty(SubscriptionChangeEventHandler, "__esModule", { value: true });
SubscriptionChangeEventHandler.SubscriptionChangeEventDispatcher = void 0;
const __1 = dist;
class SubscriptionChangeEventDispatcher extends __1.DispatcherBase {
  dispatch(count) {
    this._dispatch(false, this, arguments);
  }
}
SubscriptionChangeEventHandler.SubscriptionChangeEventDispatcher = SubscriptionChangeEventDispatcher;
(function(exports) {
  /*!
   * Strongly Typed Events for TypeScript - Core
   * https://github.com/KeesCBakker/StronlyTypedEvents/
   * http://keestalkstech.com
   *
   * Copyright Kees C. Bakker / KeesTalksTech
   * Released under the MIT license
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SubscriptionChangeEventDispatcher = exports.HandlingBase = exports.PromiseDispatcherBase = exports.PromiseSubscription = exports.DispatchError = exports.EventManagement = exports.EventListBase = exports.DispatcherWrapper = exports.DispatcherBase = exports.Subscription = void 0;
  const DispatcherBase_1 = DispatcherBase$1;
  Object.defineProperty(exports, "DispatcherBase", { enumerable: true, get: function() {
    return DispatcherBase_1.DispatcherBase;
  } });
  const DispatchError_1 = DispatchError$1;
  Object.defineProperty(exports, "DispatchError", { enumerable: true, get: function() {
    return DispatchError_1.DispatchError;
  } });
  const DispatcherWrapper_1 = DispatcherWrapper$1;
  Object.defineProperty(exports, "DispatcherWrapper", { enumerable: true, get: function() {
    return DispatcherWrapper_1.DispatcherWrapper;
  } });
  const EventListBase_1 = EventListBase$1;
  Object.defineProperty(exports, "EventListBase", { enumerable: true, get: function() {
    return EventListBase_1.EventListBase;
  } });
  const EventManagement_1 = EventManagement$1;
  Object.defineProperty(exports, "EventManagement", { enumerable: true, get: function() {
    return EventManagement_1.EventManagement;
  } });
  const HandlingBase_1 = HandlingBase$1;
  Object.defineProperty(exports, "HandlingBase", { enumerable: true, get: function() {
    return HandlingBase_1.HandlingBase;
  } });
  const PromiseDispatcherBase_1 = PromiseDispatcherBase$1;
  Object.defineProperty(exports, "PromiseDispatcherBase", { enumerable: true, get: function() {
    return PromiseDispatcherBase_1.PromiseDispatcherBase;
  } });
  const PromiseSubscription_1 = PromiseSubscription$1;
  Object.defineProperty(exports, "PromiseSubscription", { enumerable: true, get: function() {
    return PromiseSubscription_1.PromiseSubscription;
  } });
  const Subscription_1 = Subscription$1;
  Object.defineProperty(exports, "Subscription", { enumerable: true, get: function() {
    return Subscription_1.Subscription;
  } });
  const SubscriptionChangeEventHandler_1 = SubscriptionChangeEventHandler;
  Object.defineProperty(exports, "SubscriptionChangeEventDispatcher", { enumerable: true, get: function() {
    return SubscriptionChangeEventHandler_1.SubscriptionChangeEventDispatcher;
  } });
})(dist);
Object.defineProperty(SimpleEventDispatcher$1, "__esModule", { value: true });
SimpleEventDispatcher$1.SimpleEventDispatcher = void 0;
const ste_core_1$2 = dist;
class SimpleEventDispatcher extends ste_core_1$2.DispatcherBase {
  constructor() {
    super();
  }
  dispatch(args) {
    const result = this._dispatch(false, this, arguments);
    if (result == null) {
      throw new ste_core_1$2.DispatchError("Got `null` back from dispatch.");
    }
    return result;
  }
  dispatchAsync(args) {
    this._dispatch(true, this, arguments);
  }
  asEvent() {
    return super.asEvent();
  }
}
SimpleEventDispatcher$1.SimpleEventDispatcher = SimpleEventDispatcher;
var SimpleEventHandlingBase$1 = {};
var SimpleEventList$1 = {};
Object.defineProperty(SimpleEventList$1, "__esModule", { value: true });
SimpleEventList$1.SimpleEventList = void 0;
const ste_core_1$1 = dist;
const SimpleEventDispatcher_1$1 = SimpleEventDispatcher$1;
class SimpleEventList extends ste_core_1$1.EventListBase {
  constructor() {
    super();
  }
  createDispatcher() {
    return new SimpleEventDispatcher_1$1.SimpleEventDispatcher();
  }
}
SimpleEventList$1.SimpleEventList = SimpleEventList;
Object.defineProperty(SimpleEventHandlingBase$1, "__esModule", { value: true });
SimpleEventHandlingBase$1.SimpleEventHandlingBase = void 0;
const ste_core_1 = dist;
const SimpleEventList_1 = SimpleEventList$1;
class SimpleEventHandlingBase extends ste_core_1.HandlingBase {
  constructor() {
    super(new SimpleEventList_1.SimpleEventList());
  }
}
SimpleEventHandlingBase$1.SimpleEventHandlingBase = SimpleEventHandlingBase;
var NonUniformSimpleEventList$1 = {};
Object.defineProperty(NonUniformSimpleEventList$1, "__esModule", { value: true });
NonUniformSimpleEventList$1.NonUniformSimpleEventList = void 0;
const SimpleEventDispatcher_1 = SimpleEventDispatcher$1;
class NonUniformSimpleEventList {
  constructor() {
    this._events = {};
  }
  get(name) {
    if (this._events[name]) {
      return this._events[name];
    }
    const event = this.createDispatcher();
    this._events[name] = event;
    return event;
  }
  remove(name) {
    delete this._events[name];
  }
  createDispatcher() {
    return new SimpleEventDispatcher_1.SimpleEventDispatcher();
  }
}
NonUniformSimpleEventList$1.NonUniformSimpleEventList = NonUniformSimpleEventList;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.NonUniformSimpleEventList = exports.SimpleEventList = exports.SimpleEventHandlingBase = exports.SimpleEventDispatcher = void 0;
  const SimpleEventDispatcher_12 = SimpleEventDispatcher$1;
  Object.defineProperty(exports, "SimpleEventDispatcher", { enumerable: true, get: function() {
    return SimpleEventDispatcher_12.SimpleEventDispatcher;
  } });
  const SimpleEventHandlingBase_1 = SimpleEventHandlingBase$1;
  Object.defineProperty(exports, "SimpleEventHandlingBase", { enumerable: true, get: function() {
    return SimpleEventHandlingBase_1.SimpleEventHandlingBase;
  } });
  const NonUniformSimpleEventList_1 = NonUniformSimpleEventList$1;
  Object.defineProperty(exports, "NonUniformSimpleEventList", { enumerable: true, get: function() {
    return NonUniformSimpleEventList_1.NonUniformSimpleEventList;
  } });
  const SimpleEventList_12 = SimpleEventList$1;
  Object.defineProperty(exports, "SimpleEventList", { enumerable: true, get: function() {
    return SimpleEventList_12.SimpleEventList;
  } });
})(dist$1);
class DashItem$1 {
  constructor({ id, x, y, width, height, minWidth, maxWidth, minHeight, maxHeight, colWidth, rowHeight, margin, draggable: draggable3, resizable: resizable2, resizeEdges, resizeHandleSize, moveHold, resizeHold, locked }) {
    __publicField(this, "_id");
    __publicField(this, "_x");
    __publicField(this, "_y");
    __publicField(this, "_colWidth");
    __publicField(this, "_rowHeight");
    __publicField(this, "_margin");
    __publicField(this, "_left");
    __publicField(this, "_top");
    __publicField(this, "_width");
    __publicField(this, "_height");
    __publicField(this, "_minWidth");
    __publicField(this, "_maxWidth");
    __publicField(this, "_minHeight");
    __publicField(this, "_maxHeight");
    __publicField(this, "_widthPx");
    __publicField(this, "_heightPx");
    __publicField(this, "_draggable");
    __publicField(this, "_resizable");
    __publicField(this, "_resizeEdges");
    __publicField(this, "_resizeHandleSize");
    __publicField(this, "_moved", false);
    __publicField(this, "_hover", false);
    __publicField(this, "_resizeHold");
    __publicField(this, "_moveHold");
    __publicField(this, "_locked");
    __publicField(this, "_moving", false);
    __publicField(this, "_resizing", false);
    __publicField(this, "_onMoveStartEventDispatcher", new dist$1.SimpleEventDispatcher());
    __publicField(this, "_onMoveEventDispatcher", new dist$1.SimpleEventDispatcher());
    __publicField(this, "_onMoveEndEventDispatcher", new dist$1.SimpleEventDispatcher());
    __publicField(this, "_onResizeStartEventDispatcher", new dist$1.SimpleEventDispatcher());
    __publicField(this, "_onResizeEventDispatcher", new dist$1.SimpleEventDispatcher());
    __publicField(this, "_onResizeEndEventDispatcher", new dist$1.SimpleEventDispatcher());
    this._id = id;
    if (typeof colWidth !== "undefined") {
      this._colWidth = colWidth;
    } else {
      this._colWidth = 1;
    }
    if (typeof rowHeight !== "undefined") {
      this._rowHeight = rowHeight;
    } else {
      this._rowHeight = 1;
    }
    if (typeof margin !== "undefined") {
      this._margin = margin;
    } else {
      this._margin = { x: 1, y: 1 };
    }
    if (typeof x !== "undefined") {
      this._x = x;
    } else {
      this._x = DashItem$1.defaults.x;
    }
    this._left = DashItem$1.getLeftFromX(this._x, this._colWidth, this._margin);
    if (typeof y !== "undefined") {
      this._y = y;
    } else {
      this._y = DashItem$1.defaults.y;
    }
    this._top = DashItem$1.getTopFromY(this._y, this._rowHeight, this._margin);
    if (typeof minWidth !== "undefined") {
      this._minWidth = minWidth;
    } else {
      this._minWidth = DashItem$1.defaults.minWidth;
    }
    if (typeof maxWidth !== "undefined") {
      this._maxWidth = maxWidth;
    } else {
      this._maxWidth = DashItem$1.defaults.maxWidth;
    }
    if (typeof width !== "undefined") {
      this._width = width;
    } else {
      this._width = DashItem$1.defaults.width;
    }
    if (typeof minHeight !== "undefined") {
      this._minHeight = minHeight;
    } else {
      this._minHeight = DashItem$1.defaults.minHeight;
    }
    if (typeof maxHeight !== "undefined") {
      this._maxHeight = maxHeight;
    } else {
      this._maxHeight = DashItem$1.defaults.maxHeight;
    }
    if (typeof height !== "undefined") {
      this._height = height;
    } else {
      this._height = DashItem$1.defaults.height;
    }
    this._widthPx = DashItem$1.getWidthInPx(this._width, this._colWidth, this._margin);
    this._heightPx = DashItem$1.getHeightInPx(this._height, this._rowHeight, this._margin);
    if (typeof draggable3 !== "undefined") {
      this._draggable = draggable3;
    } else {
      this._draggable = DashItem$1.defaults.draggable;
    }
    if (typeof resizable2 !== "undefined") {
      this._resizable = resizable2;
    } else {
      this._resizable = DashItem$1.defaults.resizable;
    }
    if (typeof resizeEdges !== "undefined") {
      this._resizeEdges = resizeEdges;
    } else {
      this._resizeEdges = "top bottom left right";
    }
    if (typeof resizeHandleSize !== "undefined") {
      this._resizeHandleSize = resizeHandleSize;
    } else {
      this._resizeHandleSize = 8;
    }
    if (typeof moveHold !== "undefined") {
      this._moveHold = moveHold;
    } else {
      this._moveHold = 0;
    }
    if (typeof resizeHold !== "undefined") {
      this._resizeHold = resizeHold;
    } else {
      this._resizeHold = 0;
    }
    if (typeof locked !== "undefined") {
      this._locked = locked;
    } else {
      this._locked = DashItem$1.defaults.locked;
    }
  }
  get id() {
    return this._id;
  }
  get x() {
    return this._x;
  }
  set x(x) {
    this._x = x;
    this.updatePositionAndSize();
  }
  get y() {
    return this._y;
  }
  set y(y) {
    this._y = y;
    this.updatePositionAndSize();
  }
  get colWidth() {
    return this._colWidth;
  }
  set colWidth(c) {
    this._colWidth = c;
    this.updatePositionAndSize();
  }
  get rowHeight() {
    return this._rowHeight;
  }
  set rowHeight(r) {
    this._rowHeight = r;
    this.updatePositionAndSize();
  }
  get margin() {
    return this._margin;
  }
  set margin(m) {
    this._margin = m;
    this.updatePositionAndSize();
  }
  get left() {
    return this._left;
  }
  set left(l) {
    if (!this._moving && !this._resizing) {
      this._left = l;
    }
  }
  get top() {
    return this._top;
  }
  set top(t) {
    if (!this._moving && !this._resizing) {
      this._top = t;
    }
  }
  get minWidth() {
    return this._minWidth;
  }
  set minWidth(mW) {
    this._minWidth = mW;
  }
  get maxWidth() {
    return this._maxWidth;
  }
  set maxWidth(mW) {
    this._maxWidth = mW;
  }
  get width() {
    return this._width;
  }
  set width(w) {
    this._width = w;
    this.checkSizeLimits();
    this.updatePositionAndSize();
  }
  get minHeight() {
    return this._minHeight;
  }
  set minHeight(mW) {
    this._minHeight = mW;
  }
  get maxHeight() {
    return this._maxHeight;
  }
  set maxHeight(mW) {
    this._maxHeight = mW;
  }
  get height() {
    return this._height;
  }
  set height(h) {
    this._height = h;
    this.checkSizeLimits();
    this.updatePositionAndSize();
  }
  get widthPx() {
    return this._widthPx;
  }
  set widthPx(w) {
    if (!this._resizing) {
      this._widthPx = w;
    }
  }
  get heightPx() {
    return this._heightPx;
  }
  set heightPx(h) {
    if (!this._resizing) {
      this._heightPx = h;
    }
  }
  get hover() {
    return this._hover;
  }
  set hover(h) {
    this._hover = h;
  }
  get moveHold() {
    return this._moveHold;
  }
  set moveHold(dh) {
    this._moveHold = dh;
  }
  get resizeHold() {
    return this._resizeHold;
  }
  set resizeHold(rh) {
    this._resizeHold = rh;
  }
  get moving() {
    return this._moving;
  }
  get resizing() {
    return this._resizing;
  }
  checkSizeLimits() {
    if (typeof this.maxWidth == "number") {
      if (this.width > this.maxWidth) {
        this.width = this.maxWidth;
      }
    }
    if (typeof this.minWidth == "number") {
      if (this.width < this.minWidth) {
        this.width = this.minWidth;
      }
    }
    if (typeof this.maxHeight == "number") {
      if (this.height > this.maxHeight) {
        this.height = this.maxHeight;
      }
    }
    if (typeof this.minHeight == "number") {
      if (this.height < this.minHeight) {
        this.height = this.minHeight;
      }
    }
  }
  updatePositionAndSize() {
    this.left = DashItem$1.getLeftFromX(this.x, this.colWidth, this.margin);
    this.top = DashItem$1.getTopFromY(this.y, this.rowHeight, this.margin);
    this.widthPx = DashItem$1.getWidthInPx(this.width, this.colWidth, this.margin);
    this.heightPx = DashItem$1.getHeightInPx(this.height, this.rowHeight, this.margin);
  }
  get draggable() {
    return this._draggable;
  }
  set draggable(d) {
    this._draggable = d;
  }
  get resizable() {
    return this._resizable;
  }
  set resizable(r) {
    this._resizable = r;
  }
  get resizeEdges() {
    return this._resizeEdges;
  }
  set resizeEdges(e) {
    this._resizeEdges = e;
  }
  get resizeHandleSize() {
    return this._resizeHandleSize;
  }
  set resizeHandleSize(rhs) {
    this._resizeHandleSize = rhs;
  }
  get moved() {
    return this._moved;
  }
  set moved(m) {
    this._moved = m;
  }
  get locked() {
    return this._locked;
  }
  set locked(l) {
    this._locked = l;
  }
  toItem() {
    let item = {
      id: this.id,
      x: this.x,
      y: this.y,
      top: this.top,
      left: this.left,
      width: this.width,
      maxWidth: this.maxWidth,
      minWidth: this.minWidth,
      widthPx: this.widthPx,
      height: this.height,
      maxHeight: this.maxHeight,
      minHeight: this.minHeight,
      heightPx: this.heightPx,
      draggable: this.draggable,
      resizable: this.resizable,
      locked: this.locked
    };
    return item;
  }
  fromItem(item) {
    this._x = item.x;
    this._y = item.y;
    this._width = item.width;
    this._height = item.height;
    this.updatePositionAndSize();
  }
  _onMoveStart() {
    this._moving = true;
    this._onMoveStartEventDispatcher.dispatch(this.toItem());
  }
  _onMove(left, top) {
    this._left += left;
    this._top += top;
    this._onMoveEventDispatcher.dispatch(this.toItem());
  }
  _onMoveEnd() {
    this._moving = false;
    this._onMoveEndEventDispatcher.dispatch(this.toItem());
  }
  get onMoveStart() {
    return this._onMoveStartEventDispatcher.asEvent();
  }
  get onMove() {
    return this._onMoveEventDispatcher.asEvent();
  }
  get onMoveEnd() {
    return this._onMoveEndEventDispatcher.asEvent();
  }
  _onResizeStart() {
    this._resizing = true;
    this._onResizeStartEventDispatcher.dispatch(this.toItem());
  }
  _onResize(event) {
    this._left += event.deltaRect.left;
    this._top += event.deltaRect.top;
    this._widthPx = event.rect.width;
    this._heightPx = event.rect.height;
    this._onResizeEventDispatcher.dispatch(this.toItem());
  }
  _onResizeEnd() {
    this._resizing = false;
    this._onResizeEndEventDispatcher.dispatch(this.toItem());
  }
  get onResizeStart() {
    return this._onResizeStartEventDispatcher.asEvent();
  }
  get onResize() {
    return this._onResizeEventDispatcher.asEvent();
  }
  get onResizeEnd() {
    return this._onResizeEndEventDispatcher.asEvent();
  }
  static getLeftFromX(x, colWidth, margin) {
    return Math.round(colWidth * x + (x + 1) * margin.x);
  }
  static getXFromLeft(l, colWidth, margin) {
    return Math.round((l - margin.x) / (colWidth + margin.x));
  }
  static getTopFromY(y, rowHeight, margin) {
    return Math.round(rowHeight * y + (y + 1) * margin.y);
  }
  static getYFromTop(t, rowHeight, margin) {
    return Math.round((t - margin.y) / (rowHeight + margin.y));
  }
  static getWidthInPx(w, colWidth, margin) {
    return Math.round(colWidth * w + Math.max(0, w - 1) * margin.x);
  }
  static getWidthFromPx(widthPx, colWidth, margin) {
    return Math.round((widthPx + margin.x) / (colWidth + margin.x));
  }
  static getHeightInPx(h, rowHeight, margin) {
    return Math.round(rowHeight * h + Math.max(0, h - 1) * margin.y);
  }
  static getHeightFromPx(heightPx, rowHeight, margin) {
    return Math.round((heightPx + margin.y) / (rowHeight + margin.y));
  }
  static get defaults() {
    let defaults2 = {
      id: "",
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      minWidth: 1,
      maxWidth: false,
      minHeight: 1,
      maxHeight: false,
      draggable: true,
      resizable: true,
      locked: false
    };
    return defaults2;
  }
  static cssTransform(top, left, widthPx, heightPx) {
    const translate = "translate3d(" + left + "px," + top + "px, 0)";
    return {
      transform: translate,
      WebkitTransform: translate,
      MozTransform: translate,
      msTransform: translate,
      OTransform: translate,
      width: widthPx + "px",
      height: heightPx + "px"
    };
  }
  static cssTopLeft(top, left, widthPx, heightPx) {
    return {
      top: top + "px",
      left: left + "px",
      width: widthPx + "px",
      height: heightPx + "px"
    };
  }
}
class Layout {
  constructor({ breakpoint, numberOfCols, numberOfRows, breakpointWidth, margin, autoHeight, useCssTransforms, width, height, rowHeight, minRowHeight, maxRowHeight, colWidth, minColWidth, maxColWidth, compact, initialItems }) {
    __publicField(this, "_breakpoint");
    __publicField(this, "_breakpointWidth");
    __publicField(this, "_margin");
    __publicField(this, "_width");
    __publicField(this, "_height");
    __publicField(this, "_numberOfCols");
    __publicField(this, "_numberOfRows");
    __publicField(this, "_autoHeight");
    __publicField(this, "_rowHeight");
    __publicField(this, "_minRowHeight");
    __publicField(this, "_maxRowHeight");
    __publicField(this, "_colWidth");
    __publicField(this, "_minColWidth");
    __publicField(this, "_maxColWidth");
    __publicField(this, "_compact");
    __publicField(this, "_useCssTransforms");
    __publicField(this, "_itemBeingDragged", false);
    __publicField(this, "_itemBeingResized", false);
    __publicField(this, "_initalItemIds", []);
    __publicField(this, "_dashItems", []);
    __publicField(this, "_dragStartListeners", []);
    __publicField(this, "_dragListeners", []);
    __publicField(this, "_dragEndListeners", []);
    __publicField(this, "_resizeStartListeners", []);
    __publicField(this, "_resizeListeners", []);
    __publicField(this, "_resizeEndListeners", []);
    this._breakpoint = breakpoint;
    this._numberOfCols = numberOfCols;
    this._numberOfRows = numberOfRows;
    if (typeof breakpointWidth !== "undefined") {
      this._breakpointWidth = breakpointWidth;
    } else {
      this._breakpointWidth = Layout.defaults.breakpointWidth;
    }
    if (typeof margin !== "undefined") {
      this._margin = margin;
    } else {
      this._margin = Layout.defaults.margin;
    }
    if (typeof autoHeight !== "undefined") {
      this._autoHeight = autoHeight;
    } else {
      this._autoHeight = Layout.defaults.autoHeight;
    }
    if (typeof useCssTransforms !== "undefined") {
      this._useCssTransforms = useCssTransforms;
    } else {
      this._useCssTransforms = Layout.defaults.useCssTransforms;
    }
    if (typeof width !== "undefined") {
      this._width = width;
    } else {
      this._width = Layout.defaults.width;
    }
    if (typeof height !== "undefined") {
      this._height = height;
    } else {
      this._height = Layout.defaults.height;
    }
    if (typeof rowHeight !== "undefined") {
      this._rowHeight = rowHeight;
    } else {
      this._rowHeight = Layout.defaults.rowHeight;
    }
    if (typeof minRowHeight !== "undefined") {
      this._minRowHeight = minRowHeight;
    } else {
      this._minRowHeight = Layout.defaults.minRowHeight;
    }
    if (typeof maxRowHeight !== "undefined") {
      this._maxRowHeight = maxRowHeight;
    } else {
      this._maxRowHeight = Layout.defaults.maxRowHeight;
    }
    if (typeof colWidth !== "undefined") {
      this._colWidth = colWidth;
    } else {
      this._colWidth = Layout.defaults.colWidth;
    }
    if (typeof minColWidth !== "undefined") {
      this._minColWidth = minColWidth;
    } else {
      this._minColWidth = Layout.defaults.minColWidth;
    }
    if (typeof maxColWidth !== "undefined") {
      this._maxColWidth = maxColWidth;
    } else {
      this._maxColWidth = Layout.defaults.maxColWidth;
    }
    if (typeof compact !== "undefined") {
      this._compact = compact;
    } else {
      this._compact = Layout.defaults.compact;
    }
    if (typeof initialItems !== "undefined") {
      this._initalItemIds = initialItems.map((item) => {
        return item.id;
      });
    }
  }
  get breakpoint() {
    return this._breakpoint;
  }
  set breakpoint(b) {
    this._breakpoint = b;
  }
  get breakpointWidth() {
    return this._breakpointWidth;
  }
  set breakpointWidth(bw) {
    this._breakpointWidth = bw;
  }
  get margin() {
    return this._margin;
  }
  set margin(m) {
    this._margin = m;
  }
  get width() {
    return this.calculateWidth();
  }
  set width(w) {
    this._width = w;
    this.updateDashItems();
  }
  get height() {
    if (this.autoHeight) {
      return this.calculateHeight();
    }
    return this._height;
  }
  set height(h) {
    this._height = h;
  }
  get numberOfCols() {
    return this._numberOfCols;
  }
  set numberOfCols(n) {
    this._numberOfCols = n;
    this.updateDashItems();
  }
  get numberOfRows() {
    return this._numberOfRows;
  }
  set numberOfRows(n) {
    this._numberOfRows = n;
    this.updateDashItems();
  }
  get autoHeight() {
    return this._autoHeight;
  }
  set autoHeight(ah) {
    this._autoHeight = ah;
  }
  get maxRowHeight() {
    return this._maxRowHeight;
  }
  set maxRowHeight(mrh) {
    this._maxRowHeight = mrh;
    this.updateDashItems();
  }
  get minRowHeight() {
    return this._minRowHeight;
  }
  set minRowHeight(mrh) {
    this._minRowHeight = mrh;
    this.updateDashItems();
  }
  get rowHeight() {
    let rowHeightCalc = 0;
    if (typeof this._rowHeight == "number") {
      rowHeightCalc = this._rowHeight;
    } else {
      rowHeightCalc = (this.height - this.margin.y * (this.numberOfRows + 1)) / this.numberOfRows;
    }
    return rowHeightCalc;
  }
  set rowHeight(rh) {
    this._rowHeight = rh;
    this.updateDashItems();
  }
  set maxColWidth(mcw) {
    this._maxColWidth = mcw;
    this.updateDashItems();
  }
  get maxColWidth() {
    return this._maxColWidth;
  }
  set minColWidth(mcw) {
    this._minColWidth = mcw;
    this.updateDashItems();
  }
  get minColWidth() {
    return this._minColWidth;
  }
  set colWidth(cw) {
    this._colWidth = cw;
  }
  get colWidth() {
    let colWidthCalc = 0;
    if (typeof this._colWidth == "number") {
      colWidthCalc = this._colWidth;
    } else {
      colWidthCalc = (this.width - this.margin.x * (this.numberOfCols + 1)) / this.numberOfCols;
    }
    if (typeof this.maxColWidth == "number") {
      if (colWidthCalc > this.maxColWidth) {
        colWidthCalc = this.maxColWidth;
      }
    }
    if (typeof this.minColWidth == "number") {
      if (colWidthCalc < this.minColWidth) {
        colWidthCalc = this.minColWidth;
      }
    }
    return colWidthCalc;
  }
  get itemBeingDragged() {
    return this._itemBeingDragged;
  }
  set itemBeingDragged(ibd) {
    this._itemBeingDragged = ibd;
  }
  get itemBeingResized() {
    return this._itemBeingResized;
  }
  set itemBeingResized(ibr) {
    this._itemBeingResized = ibr;
  }
  get placeholder() {
    return this.getDashItemById("-1Placeholder");
  }
  set placeholder(p) {
    this.placeholder = p;
  }
  get compact() {
    return this._compact;
  }
  set compact(c) {
    this._compact = c;
  }
  get useCssTransforms() {
    return this._useCssTransforms;
  }
  set useCssTransforms(uct) {
    this._useCssTransforms = uct;
  }
  calculateWidth() {
    if (typeof this._colWidth == "number" && typeof this.colWidth == "number") {
      return this.numberOfCols * (this.colWidth + this.margin.x) + this.margin.x;
    }
    return this._width;
  }
  calculateHeight() {
    if (typeof this._rowHeight == "number" && typeof this.rowHeight == "number") {
      return this.numberOfRows * (this.rowHeight + this.margin.y) + this.margin.y;
    }
    return this._height;
  }
  addDashItem(d) {
    this._dashItems.push(d);
    this.updateDashItems();
    let unDragStart = d.onMoveStart.subscribe((item) => {
      this.itemDragging(item);
    });
    this._dragStartListeners.push({
      id: d.id,
      unsubscribe: unDragStart
    });
    let unDrag = d.onMove.subscribe((item) => {
      this.itemDragging(item);
    });
    this._dragListeners.push({
      id: d.id,
      unsubscribe: unDrag
    });
    let unDragEnd = d.onMoveEnd.subscribe((item) => {
      this.itemDraggingComplete(item);
    });
    this._dragEndListeners.push({ id: d.id, unsubscribe: unDragEnd });
    let unResizeStart = d.onResizeStart.subscribe((item) => {
      this.itemResizing(item);
    });
    this._resizeStartListeners.push({
      id: d.id,
      unsubscribe: unResizeStart
    });
    let unResize = d.onResize.subscribe((item) => {
      this.itemResizing(item);
    });
    this._resizeListeners.push({
      id: d.id,
      unsubscribe: unResize
    });
    let unResizeEnd = d.onResizeEnd.subscribe((item) => {
      this.itemResizingComplete(item);
    });
    this._resizeEndListeners.push({
      id: d.id,
      unsubscribe: unResizeEnd
    });
    if (!this._initalItemIds.includes(d.id)) {
      let items = this.compactLayout(this.items);
      this.syncItems(items);
    }
  }
  removeDashItem(d) {
    let index = this._dashItems.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._dashItems.splice(index, 1);
    }
    index = this._dragStartListeners.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._dragStartListeners[index].unsubscribe();
      this._dragStartListeners.splice(index, 1);
    }
    index = this._dragListeners.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._dragListeners[index].unsubscribe();
      this._dragListeners.splice(index, 1);
    }
    index = this._dragEndListeners.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._dragEndListeners[index].unsubscribe();
      this._dragEndListeners.splice(index, 1);
    }
    index = this._resizeStartListeners.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._resizeStartListeners[index].unsubscribe();
      this._resizeStartListeners.splice(index, 1);
    }
    index = this._resizeListeners.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._resizeListeners[index].unsubscribe();
      this._resizeListeners.splice(index, 1);
    }
    index = this._resizeEndListeners.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._resizeEndListeners[index].unsubscribe();
      this._resizeEndListeners.splice(index, 1);
    }
    let initialItemIdIndex = this._initalItemIds.findIndex((id) => {
      id === d.id;
    });
    if (initialItemIdIndex > -1) {
      this._initalItemIds.splice(initialItemIdIndex, 1);
    }
    let items = this.compactLayout(this.items);
    this.syncItems(items);
  }
  getDashItemById(id) {
    let index = this._dashItems.findIndex((item) => {
      return item.id === id;
    });
    if (index >= 0) {
      return this._dashItems[index];
    }
    return null;
  }
  updateDashItems() {
    this._dashItems.forEach((item) => {
      item.colWidth = this.colWidth;
      item.rowHeight = this.rowHeight;
      item.margin = this.margin;
    });
  }
  get items() {
    let items = [];
    this._dashItems.forEach((dashItem) => {
      items.push(dashItem.toItem());
    });
    return items;
  }
  itemDragging(item) {
    if (!this.itemBeingDragged) {
      this.placeholder.x = item.x;
      this.placeholder.y = item.y;
      this.placeholder.width = item.width;
      this.placeholder.height = item.height;
      this.itemBeingDragged = true;
    }
    let itemsCopy = JSON.parse(JSON.stringify(this.items));
    let items = itemsCopy.filter((i) => {
      return i.id !== item.id;
    });
    let placeholderIndex = items.findIndex((i) => {
      return i.id === this.placeholder.id;
    });
    items = this.moveItem(items, items[placeholderIndex], DashItem$1.getXFromLeft(item.left, this.colWidth, this.margin), DashItem$1.getYFromTop(item.top, this.rowHeight, this.margin), true);
    items = this.compactLayout(items);
    this.syncItems(items);
  }
  itemDraggingComplete(item) {
    this.itemBeingDragged = false;
    let dashItem = this.getDashItemById(item.id);
    if (dashItem) {
      dashItem.x = this.placeholder.x;
      dashItem.y = this.placeholder.y;
    }
    this.placeholder.x = 0;
    this.placeholder.y = 0;
    this.placeholder.width = 0;
    this.placeholder.height = 0;
  }
  itemResizing(item) {
    this.itemBeingResized = true;
    this.placeholder.minWidth = item.minWidth;
    this.placeholder.maxWidth = item.maxWidth;
    this.placeholder.minHeight = item.minHeight;
    this.placeholder.maxHeight = item.maxHeight;
    this.placeholder.x = DashItem$1.getXFromLeft(item.left, this.colWidth, this.margin);
    this.placeholder.y = DashItem$1.getYFromTop(item.top, this.rowHeight, this.margin);
    this.placeholder.width = DashItem$1.getWidthFromPx(item.widthPx, this.colWidth, this.margin);
    this.placeholder.height = DashItem$1.getHeightFromPx(item.heightPx, this.rowHeight, this.margin);
    let itemsCopy = JSON.parse(JSON.stringify(this.items));
    let items = itemsCopy.filter((i) => {
      return i.id !== item.id;
    });
    let placeholderIndex = items.findIndex((i) => {
      return i.id === this.placeholder.id;
    });
    items = this.moveItem(items, items[placeholderIndex], DashItem$1.getXFromLeft(item.left, this.colWidth, this.margin), DashItem$1.getYFromTop(item.top, this.rowHeight, this.margin), true);
    items = this.compactLayout(items);
    this.syncItems(items);
  }
  itemResizingComplete(item) {
    this.itemBeingResized = false;
    let dashItem = this.getDashItemById(item.id);
    if (dashItem) {
      dashItem.x = this.placeholder.x;
      dashItem.y = this.placeholder.y;
      dashItem.width = this.placeholder.width;
      dashItem.height = this.placeholder.height;
    }
    this.placeholder.x = 0;
    this.placeholder.y = 0;
    this.placeholder.width = 0;
    this.placeholder.height = 0;
  }
  checkForCollision(d1, d2) {
    if (d1.id === d2.id) {
      return false;
    }
    if (d1.x + d1.width <= d2.x) {
      return false;
    }
    if (d1.x >= d2.x + d2.width) {
      return false;
    }
    if (d1.y + d1.height <= d2.y) {
      return false;
    }
    if (d1.y >= d2.y + d2.height) {
      return false;
    }
    return true;
  }
  getFirstCollision(items, d) {
    for (let i of items) {
      if (this.checkForCollision(d, i)) {
        return i;
      }
    }
    return null;
  }
  getAllCollisions(items, d) {
    return items.filter((item) => this.checkForCollision(item, d));
  }
  correctItemBounds(item) {
    if (item.x + item.width > this.numberOfCols) {
      item.x = this.numberOfCols - item.width;
    }
    if (item.x < 0) {
      item.x = 0;
    }
    if (item.width > this.numberOfCols) {
      item.x = 0;
      item.width = this.numberOfCols;
    }
    if (item.y + item.height > this.numberOfRows) {
      item.y = this.numberOfRows - item.height;
    }
    if (item.y < 0) {
      item.y = 0;
    }
    if (item.height > this.numberOfRows) {
      item.y = 0;
      item.height = this.numberOfRows;
    }
    return item;
  }
  correctBounds(items) {
    for (let i = 0; i < items.length; i++) {
      items[i] = this.correctItemBounds(items[i]);
    }
    return items;
  }
  getLockedItems(items) {
    return this.items.filter((item) => item.locked);
  }
  compactLayout(items) {
    const sorted = this.sortItems(items);
    const compareWith = this.getLockedItems(items);
    const out = Array(items.length);
    for (let i = 0; i < sorted.length; i++) {
      let l = sorted[i];
      if (!l.locked) {
        l = this.compactItem(compareWith, l);
        compareWith.push(l);
      }
      let index = items.findIndex((item) => {
        return item.id === l.id;
      });
      out[index] = l;
      l.moved = false;
    }
    return out;
  }
  compactItem(items, d) {
    if (this.compact) {
      while (d.y > 0 && !this.getFirstCollision(items, d)) {
        d.y--;
      }
    }
    let collides;
    while (collides = this.getFirstCollision(items, d)) {
      d.y = collides.y + collides.height;
    }
    return d;
  }
  sortItems(items, reverse) {
    let i = JSON.parse(JSON.stringify(items));
    i.sort((a, b) => {
      if (a.y > b.y || a.y === b.y && a.x > b.x) {
        return 1;
      }
      return -1;
    });
    if (reverse) {
      i.reverse();
    }
    return i;
  }
  moveItem(items, d, x, y, isUserAction) {
    if (d.locked) {
      return items;
    }
    const movingUp = d.y > y;
    d.x = x;
    d.y = y;
    d.moved = true;
    d = this.correctItemBounds(d);
    const sorted = this.sortItems(items, movingUp);
    const collisions = this.getAllCollisions(sorted, d);
    for (let collision of collisions) {
      if (collision.moved) {
        continue;
      }
      if (d.y > collision.y && d.y - collision.y > collision.height / 4) {
        continue;
      }
      let collisionIndex = items.findIndex((item) => {
        return item.id === collision.id;
      });
      if (collision.locked) {
        items = this.moveItemFromCollision(items, items[collisionIndex], d, isUserAction);
      } else {
        items = this.moveItemFromCollision(items, d, items[collisionIndex], isUserAction);
      }
    }
    return items;
  }
  moveItemFromCollision(items, colllidesWith, itemToMove, isUserAction) {
    if (isUserAction) {
      const fakeItem = {
        id: "-1fakeItem",
        x: itemToMove.x,
        y: itemToMove.y,
        width: itemToMove.width,
        maxWidth: itemToMove.maxWidth,
        minWidth: itemToMove.minWidth,
        height: itemToMove.height,
        maxHeight: itemToMove.maxHeight,
        minHeight: itemToMove.minHeight
      };
      fakeItem.y = Math.max(colllidesWith.y - itemToMove.height, 0);
      if (!this.getFirstCollision(items, fakeItem)) {
        return this.moveItem(items, itemToMove, itemToMove.x, fakeItem.y);
      }
    }
    return this.moveItem(items, itemToMove, itemToMove.x, itemToMove.y + 1);
  }
  syncItems(items) {
    items.forEach((i) => {
      let dashItem = this.getDashItemById(i.id);
      dashItem.fromItem(i);
    });
  }
  static get defaults() {
    var body = document.body;
    var html = document.documentElement;
    var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    documentHeight -= 120;
    var documentWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || document.body.offsetWidth;
    documentWidth -= 20;
    return {
      numberOfCols: 12,
      numberOfRows: 8,
      breakpointWidth: void 0,
      margin: { x: 10, y: 10 },
      autoHeight: true,
      keepSquare: true,
      useCssTransforms: false,
      width: documentWidth,
      height: documentHeight,
      rowHeight: documentHeight / 8,
      maxRowHeight: documentHeight,
      minRowHeight: false,
      colWidth: false,
      maxColWidth: false,
      minColWidth: false,
      compact: true
    };
  }
}
var DashItem_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const watchProp$2 = (key, deep) => ({
  handler(newValue) {
    if (this.item[key] === newValue) {
      return;
    }
    this.item[key] = newValue;
  },
  deep
});
const EMIT_PROPS = ["x", "y", "width", "height"];
const watchEmitProp = (key, deep) => ({
  handler(newValue) {
    if (this.$props[key] === newValue) {
      return;
    }
    this.$emit("update:" + key, newValue);
  },
  deep
});
const _sfc_main$4 = {
  name: "DashItem",
  inheritAttrs: false,
  props: {
    id: { type: [Number, String], required: true },
    x: { type: Number, default: DashItem$1.defaults.x },
    y: { type: Number, default: DashItem$1.defaults.y },
    width: { type: Number, default: DashItem$1.defaults.width },
    maxWidth: { type: [Number, Boolean], default: DashItem$1.defaults.maxWidth },
    minWidth: { type: [Number, Boolean], default: DashItem$1.defaults.minWidth },
    height: { type: Number, default: DashItem$1.defaults.height },
    maxHeight: {
      type: [Number, Boolean],
      default: DashItem$1.defaults.maxHeight
    },
    minHeight: {
      type: [Number, Boolean],
      default: DashItem$1.defaults.minHeight
    },
    draggable: { type: Boolean, default: DashItem$1.defaults.draggable },
    resizable: { type: Boolean, default: DashItem$1.defaults.resizable },
    resizeEdges: { type: String, default: "bottom right" },
    resizeHandleSize: { type: Number, default: 8 },
    draggableZIndex: { type: Number, default: 1 },
    resizableZIndex: { type: Number, default: 1 },
    moveHold: { type: Number, default: 0 },
    resizeHold: { type: Number, default: 0 },
    dragAllowFrom: { type: String, default: null },
    dragIgnoreFrom: { type: String, default: null },
    locked: { type: Boolean, default: DashItem$1.defaults.locked }
  },
  inject: { $layout: { default: null } },
  provide() {
    return {
      $item: () => this.item
    };
  },
  data() {
    return {
      interactInstance: null,
      item: null,
      dragging: false,
      resizing: false,
      unWatch: null,
      hover: false
    };
  },
  computed: {
    resizingOrDragging() {
      return (this.resizing || this.dragging) && !this.locked;
    },
    classObj() {
      return {
        dragging: this.resizingOrDragging,
        cssTransforms: this.useCssTransforms
      };
    },
    layout() {
      if (this.$layout) {
        return this.$layout();
      }
      return null;
    },
    useCssTransforms() {
      if (this.layout) {
        return this.layout.useCssTransforms;
      }
      return Layout.default.useCssTransforms;
    },
    left() {
      if (this.item) {
        return this.item.left;
      }
      return 0;
    },
    top() {
      if (this.item) {
        return this.item.top;
      }
      return 0;
    },
    widthPx() {
      if (this.item) {
        return this.item.widthPx;
      }
      return 0;
    },
    heightPx() {
      if (this.item) {
        return this.item.heightPx;
      }
      return 0;
    },
    cssStyle() {
      if (this.useCssTransforms) {
        return DashItem$1.cssTransform(this.top, this.left, this.widthPx, this.heightPx);
      } else {
        return DashItem$1.cssTopLeft(this.top, this.left, this.widthPx, this.heightPx);
      }
    },
    resizeTop() {
      return !this.locked && this.resizable && this.resizeEdges.includes("top");
    },
    resizeBottom() {
      return !this.locked && this.resizable && this.resizeEdges.includes("bottom");
    },
    resizeLeft() {
      return !this.locked && this.resizable && this.resizeEdges.includes("left");
    },
    resizeRight() {
      return !this.locked && this.resizable && this.resizeEdges.includes("right");
    },
    resizeTopLeft() {
      return !this.locked && this.resizeTop && this.resizeLeft;
    },
    resizeBottomLeft() {
      return !this.locked && this.resizeBottom && this.resizeLeft;
    },
    resizeTopRight() {
      return !this.locked && this.resizeTop && this.resizeRight;
    },
    resizeBottomRight() {
      return !this.locked && this.resizeBottom && this.resizeRight;
    }
  },
  methods: {
    setDraggable() {
      if (this.draggable && !this.locked) {
        this.interactInstance.draggable({
          enabled: true,
          hold: this.moveHold,
          allowFrom: this.dragAllowFrom,
          ignoreFrom: this.dragIgnoreFrom,
          listeners: {
            start: (event) => {
              this.onMoveStart(event);
            },
            move: (event) => {
              this.onMove(event);
            },
            end: (event) => {
              this.onMoveEnd(event);
            }
          }
        });
      } else {
        this.interactInstance.draggable(false);
      }
    },
    setResizable() {
      if (this.resizable && !this.locked) {
        this.interactInstance.resizable({
          enabled: true,
          hold: this.resizeHold,
          edges: {
            top: ".resize-top",
            left: ".resize-left",
            bottom: ".resize-bottom",
            right: ".resize-right"
          },
          listeners: {
            start: (event) => {
              this.onResizeStart(event);
            },
            move: (event) => {
              this.onResize(event);
            },
            end: (event) => {
              this.onResizeEnd(event);
            }
          }
        });
      } else {
        this.interactInstance.resizable(false);
      }
    },
    onMoveStart(e) {
      this.dragging = true;
      this.item._onMoveStart();
      this.$emit("moveStart", __spreadValues({}, this.item.toItem()));
    },
    onMove(event) {
      if (this.dragging) {
        this.item._onMove(event.dx, event.dy);
        this.$emit("moving", __spreadValues({}, this.item.toItem()));
      }
    },
    onMoveEnd(e) {
      this.item._onMoveEnd();
      this.dragging = false;
      this.$emit("moveEnd", __spreadValues({}, this.item.toItem()));
    },
    onResizeStart(e) {
      this.resizing = true;
      this.item._onResizeStart();
      this.$emit("resizeStart", __spreadValues({}, this.item.toItem()));
    },
    onResize(e) {
      if (this.resizing) {
        this.item._onResize(e);
        this.$emit("resizing", __spreadValues({}, this.item.toItem()));
      }
    },
    onResizeEnd(e) {
      this.item._onResizeEnd();
      this.resizing = false;
      this.$emit("resizeEnd", __spreadValues({}, this.item.toItem()));
    },
    createPropWatchers() {
      Object.keys(this.$props).forEach((key) => {
        this.$watch(key, watchProp$2(key, true));
      });
    },
    createDashItemWatchers() {
      EMIT_PROPS.forEach((prop) => {
        this.$watch("item." + prop, watchEmitProp(prop, true));
      });
    }
  },
  watch: {
    hover(newValue) {
      this.item.hover = newValue;
      if (newValue) {
        this.$emit("hoverStart", this.item);
      } else {
        this.$emit("hovenEnd", this.item);
      }
    },
    draggable() {
      this.setDraggable();
    },
    resizable() {
      this.setResizable();
    },
    locked() {
      this.setDraggable();
      this.setResizable();
    },
    moveHold() {
      this.setDraggable();
    },
    resizeHold() {
      this.setResizable();
    },
    dragAllowFrom() {
      this.setDraggable();
    },
    dragIgnoreFrom() {
      this.setDraggable();
    }
  },
  mounted() {
    this.item = new DashItem$1(this.$props);
    this.interactInstance = interact$1(this.$refs.item);
    this.setDraggable();
    this.setResizable();
    if (this.layout) {
      this.layout.addDashItem(this.item);
      this.createPropWatchers();
      this.createDashItemWatchers();
    } else {
      this.unWatch = this.$watch("layout", function(newValue) {
        if (newValue) {
          this.layout.addDashItem(this.item);
          this.createPropWatchers();
          this.createDashItemWatchers();
          this.unWatch();
        }
      }, { immediate: true });
    }
  },
  beforeDestroy() {
    if (this.interactInstance) {
      this.interactInstance.unset();
    }
    if (this.layout) {
      this.layout.removeDashItem(this.item);
    }
  }
};
const _hoisted_1$4 = ["id"];
const _hoisted_2$3 = ["id"];
const _hoisted_3$1 = ["id"];
const _hoisted_4$1 = ["id"];
const _hoisted_5$1 = ["id"];
const _hoisted_6$1 = ["id"];
const _hoisted_7$1 = ["id"];
const _hoisted_8$1 = ["id"];
const _hoisted_9$1 = ["id"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    id: "item_" + $props.id,
    ref: "item",
    class: normalizeClass(["item", $options.classObj]),
    style: normalizeStyle($options.cssStyle),
    onMouseover: _cache[0] || (_cache[0] = ($event) => $data.hover = true),
    onMouseleave: _cache[1] || (_cache[1] = ($event) => $data.hover = false)
  }, [
    $options.resizeTop ? (openBlock(), createElementBlock("div", {
      key: 0,
      id: $props.id + "-resizeTop",
      ref: $props.id + "-resizeTop",
      class: "resize resize-top",
      style: normalizeStyle({
        height: $props.resizeHandleSize + "px",
        top: -($props.resizeHandleSize / 2) + "px",
        left: 0,
        right: 0,
        cursor: "ns-resize",
        position: "absolute",
        zIndex: $props.resizableZIndex
      })
    }, [
      renderSlot(_ctx.$slots, "resizeTop", {}, void 0, true)
    ], 12, _hoisted_2$3)) : createCommentVNode("", true),
    $options.resizeBottom ? (openBlock(), createElementBlock("div", {
      key: 1,
      id: $props.id + "-resizeBottom",
      ref: $props.id + "-resizeBottom",
      class: "resize resize-bottom",
      style: normalizeStyle({
        height: $props.resizeHandleSize + "px",
        left: 0 + "px",
        right: 0 + "px",
        bottom: -($props.resizeHandleSize / 2) + "px",
        cursor: "ns-resize",
        position: "absolute",
        zIndex: $props.resizableZIndex
      })
    }, [
      renderSlot(_ctx.$slots, "resizeBottom", {}, void 0, true)
    ], 12, _hoisted_3$1)) : createCommentVNode("", true),
    $options.resizeLeft ? (openBlock(), createElementBlock("div", {
      key: 2,
      id: $props.id + "-resizeLeft",
      ref: $props.id + "-resizeLeft",
      class: "resize resize-left",
      style: normalizeStyle({
        width: $props.resizeHandleSize + "px",
        top: 0 + "px",
        bottom: 0 + "px",
        left: -($props.resizeHandleSize / 2) + "px",
        cursor: "ew-resize",
        position: "absolute",
        zIndex: $props.resizableZIndex
      })
    }, [
      renderSlot(_ctx.$slots, "resizeLeft", {}, void 0, true)
    ], 12, _hoisted_4$1)) : createCommentVNode("", true),
    $options.resizeRight ? (openBlock(), createElementBlock("div", {
      key: 3,
      id: $props.id + "-resizeRight",
      ref: $props.id + "-resizeRight",
      class: "resize resize-right",
      style: normalizeStyle({
        width: $props.resizeHandleSize + "px",
        top: 0 + "px",
        bottom: 0 + "px",
        right: -($props.resizeHandleSize / 2) + "px",
        cursor: "ew-resize",
        position: "absolute",
        zIndex: $props.resizableZIndex
      })
    }, [
      renderSlot(_ctx.$slots, "resizeRight", {}, void 0, true)
    ], 12, _hoisted_5$1)) : createCommentVNode("", true),
    $options.resizeTopLeft ? (openBlock(), createElementBlock("div", {
      key: 4,
      id: $props.id + "-resizeTopLeft",
      ref: $props.id + "-resizeTopLeft",
      class: "resize resize-left resize-top",
      style: normalizeStyle({
        width: $props.resizeHandleSize * 2 + "px",
        height: $props.resizeHandleSize * 2 + "px",
        top: -$props.resizeHandleSize + "px",
        left: -$props.resizeHandleSize + "px",
        cursor: "nw-resize",
        position: "absolute",
        zIndex: $props.resizableZIndex
      })
    }, [
      renderSlot(_ctx.$slots, "resizeTopLeft", {}, void 0, true)
    ], 12, _hoisted_6$1)) : createCommentVNode("", true),
    $options.resizeTopRight ? (openBlock(), createElementBlock("div", {
      key: 5,
      id: $props.id + "-resizeTopRight",
      ref: $props.id + "-resizeTopRight",
      class: "resize resize-right resize-top",
      style: normalizeStyle({
        width: $props.resizeHandleSize * 2 + "px",
        height: $props.resizeHandleSize * 2 + "px",
        top: -$props.resizeHandleSize + "px",
        right: -$props.resizeHandleSize + "px",
        cursor: "ne-resize",
        position: "absolute",
        zIndex: $props.resizableZIndex
      })
    }, [
      renderSlot(_ctx.$slots, "resizeTopRight", {}, void 0, true)
    ], 12, _hoisted_7$1)) : createCommentVNode("", true),
    $options.resizeBottomLeft ? (openBlock(), createElementBlock("div", {
      key: 6,
      id: $props.id + "-resizeBottomLeft",
      ref: $props.id + "-resizeBottomLeft",
      class: "resize resize-left resize-bottom",
      style: normalizeStyle({
        width: $props.resizeHandleSize * 2 + "px",
        height: $props.resizeHandleSize * 2 + "px",
        bottom: -$props.resizeHandleSize + "px",
        left: -$props.resizeHandleSize + "px",
        cursor: "ne-resize",
        position: "absolute",
        zIndex: $props.resizableZIndex
      })
    }, [
      renderSlot(_ctx.$slots, "resizeBottomLeft", {}, void 0, true)
    ], 12, _hoisted_8$1)) : createCommentVNode("", true),
    $options.resizeBottomRight ? (openBlock(), createElementBlock("div", {
      key: 7,
      id: $props.id + "-resizeBottomRight",
      ref: $props.id + "-resizeBottomRight",
      class: "resize resize-right resize-bottom",
      style: normalizeStyle({
        width: $props.resizeHandleSize * 2 + "px",
        height: $props.resizeHandleSize * 2 + "px",
        bottom: -$props.resizeHandleSize + "px",
        right: -$props.resizeHandleSize + "px",
        cursor: "nw-resize",
        position: "absolute",
        zIndex: $props.resizableZIndex
      })
    }, [
      renderSlot(_ctx.$slots, "resizeBottomRight", {}, void 0, true)
    ], 12, _hoisted_9$1)) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 46, _hoisted_1$4);
}
var DashItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-6d986ea7"]]);
var DashLayout_vue_vue_type_style_index_0_scoped_true_lang = "";
const watchProp$1 = (key, deep) => ({
  handler(newValue) {
    if (this.l[key] === newValue) {
      return;
    }
    this.l[key] = newValue;
  },
  deep
});
const _sfc_main$3 = {
  name: "DashLayout",
  inheritAttrs: false,
  props: {
    breakpoint: { type: String, required: true },
    breakpointWidth: { type: Number, default: Layout.defaults.breakpointWidth },
    numberOfCols: { type: Number, default: Layout.defaults.numberOfCols },
    numberOfRows: { type: Number, default: Layout.defaults.numberOfRows },
    useCssTransforms: {
      type: Boolean,
      default: Layout.defaults.useCssTransforms
    },
    compact: { type: Boolean, default: Layout.defaults.compact },
    debug: { type: Boolean, default: false },
    margin: { type: Object, default: () => Layout.defaults.margin },
    rowHeight: {
      type: [Boolean, Number],
      default: Layout.defaults.rowHeight
    },
    maxRowHeight: {
      type: [Boolean, Number],
      default: Layout.defaults.maxRowHeight
    },
    minRowHeight: {
      type: [Boolean, Number],
      default: Layout.defaults.minRowHeight
    },
    colWidth: {
      type: [Boolean, Number],
      default: Layout.defaults.colWidth
    },
    maxColWidth: {
      type: [Boolean, Number],
      default: Layout.defaults.maxColWidth
    },
    minColWidth: {
      type: [Boolean, Number],
      default: Layout.defaults.minColWidth
    }
  },
  components: {
    DashItem
  },
  data() {
    return {
      l: null,
      placeholderId: "-1Placeholder",
      placeholderY: 0,
      placeholderHeight: 0,
      placeholderMaxWidth: false,
      unWatch: null
    };
  },
  provide() {
    return {
      $layout: () => this.l
    };
  },
  inject: { $dashboard: { default: null } },
  computed: {
    dashboard() {
      if (this.$dashboard) {
        return this.$dashboard();
      }
      return null;
    },
    currentBreakpoint() {
      if (this.dashboard) {
        return this.dashboard.currentBreakpoint;
      }
      return "";
    },
    dragging() {
      return this.l.itemBeingDragged;
    },
    resizing() {
      return this.l.itemBeingResized;
    },
    placeholder() {
      var _a;
      if ((_a = this.l) == null ? void 0 : _a.placeholder) {
        return this.l.placeholder.toItem();
      }
      return "";
    },
    itemsFromLayout() {
      if (this.l) {
        return this.l.items;
      }
      return [];
    },
    height() {
      return this.l.height + "px";
    },
    width() {
      return this.l.width + "px";
    }
  },
  methods: {
    createPropWatchers() {
      Object.keys(this.$props).forEach((key) => {
        this.$watch(key, watchProp$1(key, true));
      });
    }
  },
  mounted() {
    var _a;
    let initialItems = [];
    if ((_a = this.$attrs) == null ? void 0 : _a.items) {
      initialItems = this.$attrs.items;
    }
    this.l = new Layout(__spreadProps(__spreadValues({}, this.$props), { initialItems }));
    if (this.dashboard) {
      this.dashboard.addLayoutInstance(this.l);
      this.createPropWatchers();
    } else {
      this.unWatch = this.$watch("dashboard", function(newValue) {
        if (newValue) {
          this.dashboard.addLayoutInstance(this.l);
          this.createPropWatchers();
          this.unWatch();
        }
      }, { immediate: true });
    }
  },
  beforeDestroy() {
    if (this.dashboard) {
      this.dashboard.removeLayoutInstance(this.l);
    }
  }
};
const _withScopeId = (n) => (pushScopeId("data-v-5d614f79"), n = n(), popScopeId(), n);
const _hoisted_1$3 = { key: 0 };
const _hoisted_2$2 = { key: 0 };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("br", null, null, -1));
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "placeholder" }, null, -1));
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DashItem = resolveComponent("DashItem");
  return $options.currentBreakpoint === $props.breakpoint ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
    $props.debug ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
      createTextVNode(" Layout Breakpoint: " + toDisplayString($props.breakpoint) + " ", 1),
      _hoisted_3,
      createTextVNode(" Layout Number of Cols: " + toDisplayString($props.numberOfCols) + " ", 1),
      _hoisted_4,
      createTextVNode(" Layout Number of Rows: " + toDisplayString($props.numberOfRows) + " ", 1),
      _hoisted_5,
      createTextVNode(" placeholder: " + toDisplayString(JSON.stringify($options.placeholder)) + " ", 1),
      _hoisted_6,
      createTextVNode(" Items: " + toDisplayString(JSON.stringify($options.itemsFromLayout)) + " ", 1),
      _hoisted_7,
      createTextVNode(" Height: " + toDisplayString($options.height) + " ", 1),
      _hoisted_8,
      createTextVNode(" placeholderMaxWidth: " + toDisplayString($data.placeholderMaxWidth) + " ", 1),
      _hoisted_9,
      createTextVNode(" Attrs: " + toDisplayString(_ctx.$attrs), 1)
    ])) : createCommentVNode("", true),
    $data.l ? (openBlock(), createElementBlock("div", {
      key: 1,
      style: normalizeStyle({ position: "relative", height: $options.height, width: $options.width })
    }, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true),
      withDirectives(createVNode(_component_DashItem, {
        id: $data.placeholderId,
        draggable: false,
        resizable: false,
        y: $data.placeholderY,
        height: $data.placeholderHeight,
        maxWidth: $data.placeholderMaxWidth
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "placeholder", {}, () => [
            _hoisted_10
          ], true)
        ]),
        _: 3
      }, 8, ["id", "y", "height", "maxWidth"]), [
        [vShow, $options.dragging || $options.resizing]
      ])
    ], 4)) : createCommentVNode("", true)
  ])) : createCommentVNode("", true);
}
var DashLayout = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-5d614f79"]]);
class Dashboard$1 {
  constructor({ id, autoHeight, width, height }) {
    __publicField(this, "_id");
    __publicField(this, "_layouts");
    __publicField(this, "_autoHeight");
    __publicField(this, "_width");
    __publicField(this, "_height");
    this._id = id;
    this._layouts = [];
    this._autoHeight = false;
    if (typeof width !== "undefined") {
      this._width = width;
    } else {
      this._width = 800;
    }
    if (typeof height !== "undefined") {
      this._height = height;
    } else {
      this._height = 800;
    }
  }
  get id() {
    return this._id;
  }
  get breakpoints() {
    let bp = [];
    for (let layout of this._layouts) {
      bp.push({
        name: layout.breakpoint,
        numberOfCols: layout.numberOfCols,
        numberOfRows: layout.numberOfRows,
        setpoint: layout.breakpointWidth
      });
    }
    bp.sort((a, b) => {
      if (typeof a.setpoint !== "undefined" && typeof b.setpoint !== "undefined") {
        return +a.setpoint - +b.setpoint;
      }
      if (typeof a.setpoint == "undefined") {
        return 1;
      }
      return -1;
    });
    return bp;
  }
  get currentBreakpoint() {
    return this.updateCurrentBreakpoint();
  }
  get layouts() {
    return this._layouts;
  }
  set layouts(l) {
    this._layouts = l;
  }
  get autoHeight() {
    return this._autoHeight;
  }
  set autoHeight(ah) {
    this._autoHeight = ah;
  }
  get width() {
    return this._width;
  }
  set width(w) {
    this._width = w;
    this.updateCurrentBreakpoint();
    this.updateLayouts();
  }
  get height() {
    return this._height;
  }
  set height(h) {
    this.height = h;
    this.updateCurrentBreakpoint();
    this.updateLayouts();
  }
  updateCurrentBreakpoint() {
    if (this.breakpoints.length == 0) {
      return "";
    }
    let matching = this.breakpoints[0].name;
    for (let i = 1; i < this.breakpoints.length; i++) {
      if (typeof this.breakpoints[i].setpoint !== void 0) {
        if (this.width > this.breakpoints[i].setpoint) {
          matching = this.breakpoints[i].name;
        }
      }
    }
    return matching;
  }
  sortBreakpoints() {
    this.breakpoints.sort((a, b) => {
      if (typeof a.setpoint !== "undefined" && typeof b.setpoint !== "undefined") {
        return +a.setpoint - +b.setpoint;
      }
      if (typeof a.setpoint == "undefined") {
        return 1;
      }
      return -1;
    });
  }
  addLayoutInstance(l) {
    this._layouts.push(l);
  }
  updateLayouts() {
    this._layouts.forEach((layout) => {
      layout.width = this.width;
      layout.height = this.height;
    });
  }
  removeLayoutInstance(l) {
    let index = this.layouts.findIndex((layout) => {
      return l.breakpoint === layout.breakpoint;
    });
    if (index >= 0) {
      this._layouts.splice(index, 1);
    }
  }
  static get defaults() {
    return {
      autoHeight: true,
      width: 800,
      height: 800
    };
  }
}
var vueElementResizeDetector_common = { exports: {} };
(function(module) {
  module.exports = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var module2 = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      };
      modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
      module2.l = true;
      return module2.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
      if (!__webpack_require__.o(exports, name)) {
        Object.defineProperty(exports, name, { enumerable: true, get: getter });
      }
    };
    __webpack_require__.r = function(exports) {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
    __webpack_require__.t = function(value, mode) {
      if (mode & 1)
        value = __webpack_require__(value);
      if (mode & 8)
        return value;
      if (mode & 4 && typeof value === "object" && value && value.__esModule)
        return value;
      var ns = Object.create(null);
      __webpack_require__.r(ns);
      Object.defineProperty(ns, "default", { enumerable: true, value });
      if (mode & 2 && typeof value != "string")
        for (var key in value)
          __webpack_require__.d(ns, key, function(key2) {
            return value[key2];
          }.bind(null, key));
      return ns;
    };
    __webpack_require__.n = function(module2) {
      var getter = module2 && module2.__esModule ? function getDefault() {
        return module2["default"];
      } : function getModuleExports() {
        return module2;
      };
      __webpack_require__.d(getter, "a", getter);
      return getter;
    };
    __webpack_require__.o = function(object2, property) {
      return Object.prototype.hasOwnProperty.call(object2, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = "fb15");
  }({
    "18d2": function(module2, exports, __webpack_require__) {
      var browserDetector = __webpack_require__("18e9");
      module2.exports = function(options) {
        options = options || {};
        var reporter = options.reporter;
        var batchProcessor = options.batchProcessor;
        var getState = options.stateHandler.getState;
        if (!reporter) {
          throw new Error("Missing required dependency: reporter.");
        }
        function addListener(element2, listener) {
          function listenerProxy() {
            listener(element2);
          }
          if (browserDetector.isIE(8)) {
            getState(element2).object = {
              proxy: listenerProxy
            };
            element2.attachEvent("onresize", listenerProxy);
          } else {
            var object2 = getObject(element2);
            if (!object2) {
              throw new Error("Element is not detectable by this strategy.");
            }
            object2.contentDocument.defaultView.addEventListener("resize", listenerProxy);
          }
        }
        function buildCssTextString(rules) {
          var seperator = options.important ? " !important; " : "; ";
          return (rules.join(seperator) + seperator).trim();
        }
        function makeDetectable(options2, element2, callback) {
          if (!callback) {
            callback = element2;
            element2 = options2;
            options2 = null;
          }
          options2 = options2 || {};
          options2.debug;
          function injectObject(element3, callback2) {
            var OBJECT_STYLE = buildCssTextString(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]);
            var positionCheckPerformed = false;
            var style = window.getComputedStyle(element3);
            var width = element3.offsetWidth;
            var height = element3.offsetHeight;
            getState(element3).startSize = {
              width,
              height
            };
            function mutateDom() {
              function alterPositionStyles() {
                if (style.position === "static") {
                  element3.style.setProperty("position", "relative", options2.important ? "important" : "");
                  var removeRelativeStyles = function(reporter2, element4, style2, property) {
                    function getNumericalValue(value2) {
                      return value2.replace(/[^-\d\.]/g, "");
                    }
                    var value = style2[property];
                    if (value !== "auto" && getNumericalValue(value) !== "0") {
                      reporter2.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element4);
                      element4.style.setProperty(property, "0", options2.important ? "important" : "");
                    }
                  };
                  removeRelativeStyles(reporter, element3, style, "top");
                  removeRelativeStyles(reporter, element3, style, "right");
                  removeRelativeStyles(reporter, element3, style, "bottom");
                  removeRelativeStyles(reporter, element3, style, "left");
                }
              }
              function onObjectLoad() {
                if (!positionCheckPerformed) {
                  alterPositionStyles();
                }
                function getDocument(element4, callback3) {
                  if (!element4.contentDocument) {
                    var state = getState(element4);
                    if (state.checkForObjectDocumentTimeoutId) {
                      window.clearTimeout(state.checkForObjectDocumentTimeoutId);
                    }
                    state.checkForObjectDocumentTimeoutId = setTimeout(function checkForObjectDocument() {
                      state.checkForObjectDocumentTimeoutId = 0;
                      getDocument(element4, callback3);
                    }, 100);
                    return;
                  }
                  callback3(element4.contentDocument);
                }
                var objectElement = this;
                getDocument(objectElement, function onObjectDocumentReady(objectDocument) {
                  callback2(element3);
                });
              }
              if (style.position !== "") {
                alterPositionStyles();
                positionCheckPerformed = true;
              }
              var object2 = document.createElement("object");
              object2.style.cssText = OBJECT_STYLE;
              object2.tabIndex = -1;
              object2.type = "text/html";
              object2.setAttribute("aria-hidden", "true");
              object2.onload = onObjectLoad;
              if (!browserDetector.isIE()) {
                object2.data = "about:blank";
              }
              if (!getState(element3)) {
                return;
              }
              element3.appendChild(object2);
              getState(element3).object = object2;
              if (browserDetector.isIE()) {
                object2.data = "about:blank";
              }
            }
            if (batchProcessor) {
              batchProcessor.add(mutateDom);
            } else {
              mutateDom();
            }
          }
          if (browserDetector.isIE(8)) {
            callback(element2);
          } else {
            injectObject(element2, callback);
          }
        }
        function getObject(element2) {
          return getState(element2).object;
        }
        function uninstall(element2) {
          if (!getState(element2)) {
            return;
          }
          var object2 = getObject(element2);
          if (!object2) {
            return;
          }
          if (browserDetector.isIE(8)) {
            element2.detachEvent("onresize", object2.proxy);
          } else {
            element2.removeChild(object2);
          }
          if (getState(element2).checkForObjectDocumentTimeoutId) {
            window.clearTimeout(getState(element2).checkForObjectDocumentTimeoutId);
          }
          delete getState(element2).object;
        }
        return {
          makeDetectable,
          addListener,
          uninstall
        };
      };
    },
    "18e9": function(module2, exports, __webpack_require__) {
      var detector = module2.exports = {};
      detector.isIE = function(version) {
        function isAnyIeVersion() {
          var agent = navigator.userAgent.toLowerCase();
          return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
        }
        if (!isAnyIeVersion()) {
          return false;
        }
        if (!version) {
          return true;
        }
        var ieVersion = function() {
          var undef, v = 3, div = document.createElement("div"), all = div.getElementsByTagName("i");
          do {
            div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->";
          } while (all[0]);
          return v > 4 ? v : undef;
        }();
        return version === ieVersion;
      };
      detector.isLegacyOpera = function() {
        return !!window.opera;
      };
    },
    "2cef": function(module2, exports, __webpack_require__) {
      module2.exports = function() {
        var idCount = 1;
        function generate() {
          return idCount++;
        }
        return {
          generate
        };
      };
    },
    "49ad": function(module2, exports, __webpack_require__) {
      module2.exports = function(idHandler) {
        var eventListeners = {};
        function getListeners(element2) {
          var id = idHandler.get(element2);
          if (id === void 0) {
            return [];
          }
          return eventListeners[id] || [];
        }
        function addListener(element2, listener) {
          var id = idHandler.get(element2);
          if (!eventListeners[id]) {
            eventListeners[id] = [];
          }
          eventListeners[id].push(listener);
        }
        function removeListener(element2, listener) {
          var listeners = getListeners(element2);
          for (var i = 0, len = listeners.length; i < len; ++i) {
            if (listeners[i] === listener) {
              listeners.splice(i, 1);
              break;
            }
          }
        }
        function removeAllListeners(element2) {
          var listeners = getListeners(element2);
          if (!listeners) {
            return;
          }
          listeners.length = 0;
        }
        return {
          get: getListeners,
          add: addListener,
          removeListener,
          removeAllListeners
        };
      };
    },
    "5058": function(module2, exports, __webpack_require__) {
      module2.exports = function(options) {
        var idGenerator = options.idGenerator;
        var getState = options.stateHandler.getState;
        function getId(element2) {
          var state = getState(element2);
          if (state && state.id !== void 0) {
            return state.id;
          }
          return null;
        }
        function setId(element2) {
          var state = getState(element2);
          if (!state) {
            throw new Error("setId required the element to have a resize detection state.");
          }
          var id = idGenerator.generate();
          state.id = id;
          return id;
        }
        return {
          get: getId,
          set: setId
        };
      };
    },
    "50bf": function(module2, exports, __webpack_require__) {
      var utils = module2.exports = {};
      utils.getOption = getOption;
      function getOption(options, name, defaultValue) {
        var value = options[name];
        if ((value === void 0 || value === null) && defaultValue !== void 0) {
          return defaultValue;
        }
        return value;
      }
    },
    "5be5": function(module2, exports, __webpack_require__) {
      module2.exports = function(options) {
        var getState = options.stateHandler.getState;
        function isDetectable(element2) {
          var state = getState(element2);
          return state && !!state.isDetectable;
        }
        function markAsDetectable(element2) {
          getState(element2).isDetectable = true;
        }
        function isBusy(element2) {
          return !!getState(element2).busy;
        }
        function markBusy(element2, busy) {
          getState(element2).busy = !!busy;
        }
        return {
          isDetectable,
          markAsDetectable,
          isBusy,
          markBusy
        };
      };
    },
    "abb4": function(module2, exports, __webpack_require__) {
      module2.exports = function(quiet) {
        function noop() {
        }
        var reporter = {
          log: noop,
          warn: noop,
          error: noop
        };
        if (!quiet && window.console) {
          var attachFunction = function(reporter2, name) {
            reporter2[name] = function reporterProxy() {
              var f = console[name];
              if (f.apply) {
                f.apply(console, arguments);
              } else {
                for (var i = 0; i < arguments.length; i++) {
                  f(arguments[i]);
                }
              }
            };
          };
          attachFunction(reporter, "log");
          attachFunction(reporter, "warn");
          attachFunction(reporter, "error");
        }
        return reporter;
      };
    },
    "b770": function(module2, exports, __webpack_require__) {
      var utils = module2.exports = {};
      utils.forEach = function(collection, callback) {
        for (var i = 0; i < collection.length; i++) {
          var result = callback(collection[i]);
          if (result) {
            return result;
          }
        }
      };
    },
    "c274": function(module2, exports, __webpack_require__) {
      var utils = __webpack_require__("50bf");
      module2.exports = function batchProcessorMaker(options) {
        options = options || {};
        var reporter = options.reporter;
        var asyncProcess = utils.getOption(options, "async", true);
        var autoProcess = utils.getOption(options, "auto", true);
        if (autoProcess && !asyncProcess) {
          reporter && reporter.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true.");
          asyncProcess = true;
        }
        var batch = Batch();
        var asyncFrameHandler;
        var isProcessing = false;
        function addFunction(level, fn) {
          if (!isProcessing && autoProcess && asyncProcess && batch.size() === 0) {
            processBatchAsync();
          }
          batch.add(level, fn);
        }
        function processBatch() {
          isProcessing = true;
          while (batch.size()) {
            var processingBatch = batch;
            batch = Batch();
            processingBatch.process();
          }
          isProcessing = false;
        }
        function forceProcessBatch(localAsyncProcess) {
          if (isProcessing) {
            return;
          }
          if (localAsyncProcess === void 0) {
            localAsyncProcess = asyncProcess;
          }
          if (asyncFrameHandler) {
            cancelFrame(asyncFrameHandler);
            asyncFrameHandler = null;
          }
          if (localAsyncProcess) {
            processBatchAsync();
          } else {
            processBatch();
          }
        }
        function processBatchAsync() {
          asyncFrameHandler = requestFrame(processBatch);
        }
        function cancelFrame(listener) {
          var cancel2 = clearTimeout;
          return cancel2(listener);
        }
        function requestFrame(callback) {
          var raf2 = function(fn) {
            return setTimeout(fn, 0);
          };
          return raf2(callback);
        }
        return {
          add: addFunction,
          force: forceProcessBatch
        };
      };
      function Batch() {
        var batch = {};
        var size = 0;
        var topLevel = 0;
        var bottomLevel = 0;
        function add(level, fn) {
          if (!fn) {
            fn = level;
            level = 0;
          }
          if (level > topLevel) {
            topLevel = level;
          } else if (level < bottomLevel) {
            bottomLevel = level;
          }
          if (!batch[level]) {
            batch[level] = [];
          }
          batch[level].push(fn);
          size++;
        }
        function process() {
          for (var level = bottomLevel; level <= topLevel; level++) {
            var fns = batch[level];
            for (var i = 0; i < fns.length; i++) {
              var fn = fns[i];
              fn();
            }
          }
        }
        function getSize() {
          return size;
        }
        return {
          add,
          process,
          size: getSize
        };
      }
    },
    "c946": function(module2, exports, __webpack_require__) {
      var forEach = __webpack_require__("b770").forEach;
      module2.exports = function(options) {
        options = options || {};
        var reporter = options.reporter;
        var batchProcessor = options.batchProcessor;
        var getState = options.stateHandler.getState;
        options.stateHandler.hasState;
        var idHandler = options.idHandler;
        if (!batchProcessor) {
          throw new Error("Missing required dependency: batchProcessor");
        }
        if (!reporter) {
          throw new Error("Missing required dependency: reporter.");
        }
        var scrollbarSizes = getScrollbarSizes();
        var styleId = "erd_scroll_detection_scrollbar_style";
        var detectionContainerClass = "erd_scroll_detection_container";
        function initDocument(targetDocument) {
          injectScrollStyle(targetDocument, styleId, detectionContainerClass);
        }
        initDocument(window.document);
        function buildCssTextString(rules) {
          var seperator = options.important ? " !important; " : "; ";
          return (rules.join(seperator) + seperator).trim();
        }
        function getScrollbarSizes() {
          var width = 500;
          var height = 500;
          var child = document.createElement("div");
          child.style.cssText = buildCssTextString(["position: absolute", "width: " + width * 2 + "px", "height: " + height * 2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
          var container = document.createElement("div");
          container.style.cssText = buildCssTextString(["position: absolute", "width: " + width + "px", "height: " + height + "px", "overflow: scroll", "visibility: none", "top: " + -width * 3 + "px", "left: " + -height * 3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
          container.appendChild(child);
          document.body.insertBefore(container, document.body.firstChild);
          var widthSize = width - container.clientWidth;
          var heightSize = height - container.clientHeight;
          document.body.removeChild(container);
          return {
            width: widthSize,
            height: heightSize
          };
        }
        function injectScrollStyle(targetDocument, styleId2, containerClass) {
          function injectStyle(style2, method) {
            method = method || function(element2) {
              targetDocument.head.appendChild(element2);
            };
            var styleElement = targetDocument.createElement("style");
            styleElement.innerHTML = style2;
            styleElement.id = styleId2;
            method(styleElement);
            return styleElement;
          }
          if (!targetDocument.getElementById(styleId2)) {
            var containerAnimationClass = containerClass + "_animation";
            var containerAnimationActiveClass = containerClass + "_animation_active";
            var style = "/* Created by the element-resize-detector library. */\n";
            style += "." + containerClass + " > div::-webkit-scrollbar { " + buildCssTextString(["display: none"]) + " }\n\n";
            style += "." + containerAnimationActiveClass + " { " + buildCssTextString(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + containerAnimationClass, "animation-name: " + containerAnimationClass]) + " }\n";
            style += "@-webkit-keyframes " + containerAnimationClass + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n";
            style += "@keyframes " + containerAnimationClass + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }";
            injectStyle(style);
          }
        }
        function addAnimationClass(element2) {
          element2.className += " " + detectionContainerClass + "_animation_active";
        }
        function addEvent(el, name, cb) {
          if (el.addEventListener) {
            el.addEventListener(name, cb);
          } else if (el.attachEvent) {
            el.attachEvent("on" + name, cb);
          } else {
            return reporter.error("[scroll] Don't know how to add event listeners.");
          }
        }
        function removeEvent(el, name, cb) {
          if (el.removeEventListener) {
            el.removeEventListener(name, cb);
          } else if (el.detachEvent) {
            el.detachEvent("on" + name, cb);
          } else {
            return reporter.error("[scroll] Don't know how to remove event listeners.");
          }
        }
        function getExpandElement(element2) {
          return getState(element2).container.childNodes[0].childNodes[0].childNodes[0];
        }
        function getShrinkElement(element2) {
          return getState(element2).container.childNodes[0].childNodes[0].childNodes[1];
        }
        function addListener(element2, listener) {
          var listeners = getState(element2).listeners;
          if (!listeners.push) {
            throw new Error("Cannot add listener to an element that is not detectable.");
          }
          getState(element2).listeners.push(listener);
        }
        function makeDetectable(options2, element2, callback) {
          if (!callback) {
            callback = element2;
            element2 = options2;
            options2 = null;
          }
          options2 = options2 || {};
          function debug() {
            if (options2.debug) {
              var args = Array.prototype.slice.call(arguments);
              args.unshift(idHandler.get(element2), "Scroll: ");
              if (reporter.log.apply) {
                reporter.log.apply(null, args);
              } else {
                for (var i = 0; i < args.length; i++) {
                  reporter.log(args[i]);
                }
              }
            }
          }
          function isDetached(element3) {
            function isInDocument(element4) {
              return element4 === element4.ownerDocument.body || element4.ownerDocument.body.contains(element4);
            }
            if (!isInDocument(element3)) {
              return true;
            }
            if (window.getComputedStyle(element3) === null) {
              return true;
            }
            return false;
          }
          function isUnrendered(element3) {
            var container = getState(element3).container.childNodes[0];
            var style = window.getComputedStyle(container);
            return !style.width || style.width.indexOf("px") === -1;
          }
          function getStyle() {
            var elementStyle = window.getComputedStyle(element2);
            var style = {};
            style.position = elementStyle.position;
            style.width = element2.offsetWidth;
            style.height = element2.offsetHeight;
            style.top = elementStyle.top;
            style.right = elementStyle.right;
            style.bottom = elementStyle.bottom;
            style.left = elementStyle.left;
            style.widthCSS = elementStyle.width;
            style.heightCSS = elementStyle.height;
            return style;
          }
          function storeStartSize() {
            var style = getStyle();
            getState(element2).startSize = {
              width: style.width,
              height: style.height
            };
            debug("Element start size", getState(element2).startSize);
          }
          function initListeners() {
            getState(element2).listeners = [];
          }
          function storeStyle() {
            debug("storeStyle invoked.");
            if (!getState(element2)) {
              debug("Aborting because element has been uninstalled");
              return;
            }
            var style = getStyle();
            getState(element2).style = style;
          }
          function storeCurrentSize(element3, width, height) {
            getState(element3).lastWidth = width;
            getState(element3).lastHeight = height;
          }
          function getExpandChildElement(element3) {
            return getExpandElement(element3).childNodes[0];
          }
          function getWidthOffset() {
            return 2 * scrollbarSizes.width + 1;
          }
          function getHeightOffset() {
            return 2 * scrollbarSizes.height + 1;
          }
          function getExpandWidth(width) {
            return width + 10 + getWidthOffset();
          }
          function getExpandHeight(height) {
            return height + 10 + getHeightOffset();
          }
          function getShrinkWidth(width) {
            return width * 2 + getWidthOffset();
          }
          function getShrinkHeight(height) {
            return height * 2 + getHeightOffset();
          }
          function positionScrollbars(element3, width, height) {
            var expand = getExpandElement(element3);
            var shrink = getShrinkElement(element3);
            var expandWidth = getExpandWidth(width);
            var expandHeight = getExpandHeight(height);
            var shrinkWidth = getShrinkWidth(width);
            var shrinkHeight = getShrinkHeight(height);
            expand.scrollLeft = expandWidth;
            expand.scrollTop = expandHeight;
            shrink.scrollLeft = shrinkWidth;
            shrink.scrollTop = shrinkHeight;
          }
          function injectContainerElement() {
            var container = getState(element2).container;
            if (!container) {
              container = document.createElement("div");
              container.className = detectionContainerClass;
              container.style.cssText = buildCssTextString(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]);
              getState(element2).container = container;
              addAnimationClass(container);
              element2.appendChild(container);
              var onAnimationStart = function() {
                getState(element2).onRendered && getState(element2).onRendered();
              };
              addEvent(container, "animationstart", onAnimationStart);
              getState(element2).onAnimationStart = onAnimationStart;
            }
            return container;
          }
          function injectScrollElements() {
            function alterPositionStyles() {
              var style = getState(element2).style;
              if (style.position === "static") {
                element2.style.setProperty("position", "relative", options2.important ? "important" : "");
                var removeRelativeStyles = function(reporter2, element3, style2, property) {
                  function getNumericalValue(value2) {
                    return value2.replace(/[^-\d\.]/g, "");
                  }
                  var value = style2[property];
                  if (value !== "auto" && getNumericalValue(value) !== "0") {
                    reporter2.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element3);
                    element3.style[property] = 0;
                  }
                };
                removeRelativeStyles(reporter, element2, style, "top");
                removeRelativeStyles(reporter, element2, style, "right");
                removeRelativeStyles(reporter, element2, style, "bottom");
                removeRelativeStyles(reporter, element2, style, "left");
              }
            }
            function getLeftTopBottomRightCssText(left, top, bottom, right) {
              left = !left ? "0" : left + "px";
              top = !top ? "0" : top + "px";
              bottom = !bottom ? "0" : bottom + "px";
              right = !right ? "0" : right + "px";
              return ["left: " + left, "top: " + top, "right: " + right, "bottom: " + bottom];
            }
            debug("Injecting elements");
            if (!getState(element2)) {
              debug("Aborting because element has been uninstalled");
              return;
            }
            alterPositionStyles();
            var rootContainer = getState(element2).container;
            if (!rootContainer) {
              rootContainer = injectContainerElement();
            }
            var scrollbarWidth = scrollbarSizes.width;
            var scrollbarHeight = scrollbarSizes.height;
            var containerContainerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]);
            var containerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(getLeftTopBottomRightCssText(-(1 + scrollbarWidth), -(1 + scrollbarHeight), -scrollbarHeight, -scrollbarWidth)));
            var expandStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
            var shrinkStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
            var expandChildStyle = buildCssTextString(["position: absolute", "left: 0", "top: 0"]);
            var shrinkChildStyle = buildCssTextString(["position: absolute", "width: 200%", "height: 200%"]);
            var containerContainer = document.createElement("div");
            var container = document.createElement("div");
            var expand = document.createElement("div");
            var expandChild = document.createElement("div");
            var shrink = document.createElement("div");
            var shrinkChild = document.createElement("div");
            containerContainer.dir = "ltr";
            containerContainer.style.cssText = containerContainerStyle;
            containerContainer.className = detectionContainerClass;
            container.className = detectionContainerClass;
            container.style.cssText = containerStyle;
            expand.style.cssText = expandStyle;
            expandChild.style.cssText = expandChildStyle;
            shrink.style.cssText = shrinkStyle;
            shrinkChild.style.cssText = shrinkChildStyle;
            expand.appendChild(expandChild);
            shrink.appendChild(shrinkChild);
            container.appendChild(expand);
            container.appendChild(shrink);
            containerContainer.appendChild(container);
            rootContainer.appendChild(containerContainer);
            function onExpandScroll() {
              getState(element2).onExpand && getState(element2).onExpand();
            }
            function onShrinkScroll() {
              getState(element2).onShrink && getState(element2).onShrink();
            }
            addEvent(expand, "scroll", onExpandScroll);
            addEvent(shrink, "scroll", onShrinkScroll);
            getState(element2).onExpandScroll = onExpandScroll;
            getState(element2).onShrinkScroll = onShrinkScroll;
          }
          function registerListenersAndPositionElements() {
            function updateChildSizes(element3, width, height) {
              var expandChild = getExpandChildElement(element3);
              var expandWidth = getExpandWidth(width);
              var expandHeight = getExpandHeight(height);
              expandChild.style.setProperty("width", expandWidth + "px", options2.important ? "important" : "");
              expandChild.style.setProperty("height", expandHeight + "px", options2.important ? "important" : "");
            }
            function updateDetectorElements(done) {
              var width = element2.offsetWidth;
              var height = element2.offsetHeight;
              var sizeChanged = width !== getState(element2).lastWidth || height !== getState(element2).lastHeight;
              debug("Storing current size", width, height);
              storeCurrentSize(element2, width, height);
              batchProcessor.add(0, function performUpdateChildSizes() {
                if (!sizeChanged) {
                  return;
                }
                if (!getState(element2)) {
                  debug("Aborting because element has been uninstalled");
                  return;
                }
                if (!areElementsInjected()) {
                  debug("Aborting because element container has not been initialized");
                  return;
                }
                if (options2.debug) {
                  var w = element2.offsetWidth;
                  var h = element2.offsetHeight;
                  if (w !== width || h !== height) {
                    reporter.warn(idHandler.get(element2), "Scroll: Size changed before updating detector elements.");
                  }
                }
                updateChildSizes(element2, width, height);
              });
              batchProcessor.add(1, function updateScrollbars() {
                if (!getState(element2)) {
                  debug("Aborting because element has been uninstalled");
                  return;
                }
                if (!areElementsInjected()) {
                  debug("Aborting because element container has not been initialized");
                  return;
                }
                positionScrollbars(element2, width, height);
              });
              if (sizeChanged && done) {
                batchProcessor.add(2, function() {
                  if (!getState(element2)) {
                    debug("Aborting because element has been uninstalled");
                    return;
                  }
                  if (!areElementsInjected()) {
                    debug("Aborting because element container has not been initialized");
                    return;
                  }
                  done();
                });
              }
            }
            function areElementsInjected() {
              return !!getState(element2).container;
            }
            function notifyListenersIfNeeded() {
              function isFirstNotify() {
                return getState(element2).lastNotifiedWidth === void 0;
              }
              debug("notifyListenersIfNeeded invoked");
              var state = getState(element2);
              if (isFirstNotify() && state.lastWidth === state.startSize.width && state.lastHeight === state.startSize.height) {
                return debug("Not notifying: Size is the same as the start size, and there has been no notification yet.");
              }
              if (state.lastWidth === state.lastNotifiedWidth && state.lastHeight === state.lastNotifiedHeight) {
                return debug("Not notifying: Size already notified");
              }
              debug("Current size not notified, notifying...");
              state.lastNotifiedWidth = state.lastWidth;
              state.lastNotifiedHeight = state.lastHeight;
              forEach(getState(element2).listeners, function(listener) {
                listener(element2);
              });
            }
            function handleRender() {
              debug("startanimation triggered.");
              if (isUnrendered(element2)) {
                debug("Ignoring since element is still unrendered...");
                return;
              }
              debug("Element rendered.");
              var expand = getExpandElement(element2);
              var shrink = getShrinkElement(element2);
              if (expand.scrollLeft === 0 || expand.scrollTop === 0 || shrink.scrollLeft === 0 || shrink.scrollTop === 0) {
                debug("Scrollbars out of sync. Updating detector elements...");
                updateDetectorElements(notifyListenersIfNeeded);
              }
            }
            function handleScroll() {
              debug("Scroll detected.");
              if (isUnrendered(element2)) {
                debug("Scroll event fired while unrendered. Ignoring...");
                return;
              }
              updateDetectorElements(notifyListenersIfNeeded);
            }
            debug("registerListenersAndPositionElements invoked.");
            if (!getState(element2)) {
              debug("Aborting because element has been uninstalled");
              return;
            }
            getState(element2).onRendered = handleRender;
            getState(element2).onExpand = handleScroll;
            getState(element2).onShrink = handleScroll;
            var style = getState(element2).style;
            updateChildSizes(element2, style.width, style.height);
          }
          function finalizeDomMutation() {
            debug("finalizeDomMutation invoked.");
            if (!getState(element2)) {
              debug("Aborting because element has been uninstalled");
              return;
            }
            var style = getState(element2).style;
            storeCurrentSize(element2, style.width, style.height);
            positionScrollbars(element2, style.width, style.height);
          }
          function ready() {
            callback(element2);
          }
          function install2() {
            debug("Installing...");
            initListeners();
            storeStartSize();
            batchProcessor.add(0, storeStyle);
            batchProcessor.add(1, injectScrollElements);
            batchProcessor.add(2, registerListenersAndPositionElements);
            batchProcessor.add(3, finalizeDomMutation);
            batchProcessor.add(4, ready);
          }
          debug("Making detectable...");
          if (isDetached(element2)) {
            debug("Element is detached");
            injectContainerElement();
            debug("Waiting until element is attached...");
            getState(element2).onRendered = function() {
              debug("Element is now attached");
              install2();
            };
          } else {
            install2();
          }
        }
        function uninstall(element2) {
          var state = getState(element2);
          if (!state) {
            return;
          }
          state.onExpandScroll && removeEvent(getExpandElement(element2), "scroll", state.onExpandScroll);
          state.onShrinkScroll && removeEvent(getShrinkElement(element2), "scroll", state.onShrinkScroll);
          state.onAnimationStart && removeEvent(state.container, "animationstart", state.onAnimationStart);
          state.container && element2.removeChild(state.container);
        }
        return {
          makeDetectable,
          addListener,
          uninstall,
          initDocument
        };
      };
    },
    "d6eb": function(module2, exports, __webpack_require__) {
      var prop = "_erd";
      function initState(element2) {
        element2[prop] = {};
        return getState(element2);
      }
      function getState(element2) {
        return element2[prop];
      }
      function cleanState(element2) {
        delete element2[prop];
      }
      module2.exports = {
        initState,
        getState,
        cleanState
      };
    },
    "eec4": function(module2, exports, __webpack_require__) {
      var forEach = __webpack_require__("b770").forEach;
      var elementUtilsMaker = __webpack_require__("5be5");
      var listenerHandlerMaker = __webpack_require__("49ad");
      var idGeneratorMaker = __webpack_require__("2cef");
      var idHandlerMaker = __webpack_require__("5058");
      var reporterMaker = __webpack_require__("abb4");
      var browserDetector = __webpack_require__("18e9");
      var batchProcessorMaker = __webpack_require__("c274");
      var stateHandler = __webpack_require__("d6eb");
      var objectStrategyMaker = __webpack_require__("18d2");
      var scrollStrategyMaker = __webpack_require__("c946");
      function isCollection(obj) {
        return Array.isArray(obj) || obj.length !== void 0;
      }
      function toArray(collection) {
        if (!Array.isArray(collection)) {
          var array2 = [];
          forEach(collection, function(obj) {
            array2.push(obj);
          });
          return array2;
        } else {
          return collection;
        }
      }
      function isElement(obj) {
        return obj && obj.nodeType === 1;
      }
      module2.exports = function(options) {
        options = options || {};
        var idHandler;
        if (options.idHandler) {
          idHandler = {
            get: function(element2) {
              return options.idHandler.get(element2, true);
            },
            set: options.idHandler.set
          };
        } else {
          var idGenerator = idGeneratorMaker();
          var defaultIdHandler = idHandlerMaker({
            idGenerator,
            stateHandler
          });
          idHandler = defaultIdHandler;
        }
        var reporter = options.reporter;
        if (!reporter) {
          var quiet = reporter === false;
          reporter = reporterMaker(quiet);
        }
        var batchProcessor = getOption(options, "batchProcessor", batchProcessorMaker({ reporter }));
        var globalOptions = {};
        globalOptions.callOnAdd = !!getOption(options, "callOnAdd", true);
        globalOptions.debug = !!getOption(options, "debug", false);
        var eventListenerHandler = listenerHandlerMaker(idHandler);
        var elementUtils = elementUtilsMaker({
          stateHandler
        });
        var detectionStrategy;
        var desiredStrategy = getOption(options, "strategy", "object");
        var importantCssRules = getOption(options, "important", false);
        var strategyOptions = {
          reporter,
          batchProcessor,
          stateHandler,
          idHandler,
          important: importantCssRules
        };
        if (desiredStrategy === "scroll") {
          if (browserDetector.isLegacyOpera()) {
            reporter.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy.");
            desiredStrategy = "object";
          } else if (browserDetector.isIE(9)) {
            reporter.warn("Scroll strategy is not supported on IE9. Changing to object strategy.");
            desiredStrategy = "object";
          }
        }
        if (desiredStrategy === "scroll") {
          detectionStrategy = scrollStrategyMaker(strategyOptions);
        } else if (desiredStrategy === "object") {
          detectionStrategy = objectStrategyMaker(strategyOptions);
        } else {
          throw new Error("Invalid strategy name: " + desiredStrategy);
        }
        var onReadyCallbacks = {};
        function listenTo(options2, elements, listener) {
          function onResizeCallback(element2) {
            var listeners = eventListenerHandler.get(element2);
            forEach(listeners, function callListenerProxy(listener2) {
              listener2(element2);
            });
          }
          function addListener(callOnAdd2, element2, listener2) {
            eventListenerHandler.add(element2, listener2);
            if (callOnAdd2) {
              listener2(element2);
            }
          }
          if (!listener) {
            listener = elements;
            elements = options2;
            options2 = {};
          }
          if (!elements) {
            throw new Error("At least one element required.");
          }
          if (!listener) {
            throw new Error("Listener required.");
          }
          if (isElement(elements)) {
            elements = [elements];
          } else if (isCollection(elements)) {
            elements = toArray(elements);
          } else {
            return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
          }
          var elementsReady = 0;
          var callOnAdd = getOption(options2, "callOnAdd", globalOptions.callOnAdd);
          var onReadyCallback = getOption(options2, "onReady", function noop() {
          });
          var debug = getOption(options2, "debug", globalOptions.debug);
          forEach(elements, function attachListenerToElement(element2) {
            if (!stateHandler.getState(element2)) {
              stateHandler.initState(element2);
              idHandler.set(element2);
            }
            var id = idHandler.get(element2);
            debug && reporter.log("Attaching listener to element", id, element2);
            if (!elementUtils.isDetectable(element2)) {
              debug && reporter.log(id, "Not detectable.");
              if (elementUtils.isBusy(element2)) {
                debug && reporter.log(id, "System busy making it detectable");
                addListener(callOnAdd, element2, listener);
                onReadyCallbacks[id] = onReadyCallbacks[id] || [];
                onReadyCallbacks[id].push(function onReady() {
                  elementsReady++;
                  if (elementsReady === elements.length) {
                    onReadyCallback();
                  }
                });
                return;
              }
              debug && reporter.log(id, "Making detectable...");
              elementUtils.markBusy(element2, true);
              return detectionStrategy.makeDetectable({ debug, important: importantCssRules }, element2, function onElementDetectable(element3) {
                debug && reporter.log(id, "onElementDetectable");
                if (stateHandler.getState(element3)) {
                  elementUtils.markAsDetectable(element3);
                  elementUtils.markBusy(element3, false);
                  detectionStrategy.addListener(element3, onResizeCallback);
                  addListener(callOnAdd, element3, listener);
                  var state = stateHandler.getState(element3);
                  if (state && state.startSize) {
                    var width = element3.offsetWidth;
                    var height = element3.offsetHeight;
                    if (state.startSize.width !== width || state.startSize.height !== height) {
                      onResizeCallback(element3);
                    }
                  }
                  if (onReadyCallbacks[id]) {
                    forEach(onReadyCallbacks[id], function(callback) {
                      callback();
                    });
                  }
                } else {
                  debug && reporter.log(id, "Element uninstalled before being detectable.");
                }
                delete onReadyCallbacks[id];
                elementsReady++;
                if (elementsReady === elements.length) {
                  onReadyCallback();
                }
              });
            }
            debug && reporter.log(id, "Already detecable, adding listener.");
            addListener(callOnAdd, element2, listener);
            elementsReady++;
          });
          if (elementsReady === elements.length) {
            onReadyCallback();
          }
        }
        function uninstall(elements) {
          if (!elements) {
            return reporter.error("At least one element is required.");
          }
          if (isElement(elements)) {
            elements = [elements];
          } else if (isCollection(elements)) {
            elements = toArray(elements);
          } else {
            return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
          }
          forEach(elements, function(element2) {
            eventListenerHandler.removeAllListeners(element2);
            detectionStrategy.uninstall(element2);
            stateHandler.cleanState(element2);
          });
        }
        function initDocument(targetDocument) {
          detectionStrategy.initDocument && detectionStrategy.initDocument(targetDocument);
        }
        return {
          listenTo,
          removeListener: eventListenerHandler.removeListener,
          removeAllListeners: eventListenerHandler.removeAllListeners,
          uninstall,
          initDocument
        };
      };
      function getOption(options, name, defaultValue) {
        var value = options[name];
        if ((value === void 0 || value === null) && defaultValue !== void 0) {
          return defaultValue;
        }
        return value;
      }
    },
    "f6fd": function(module2, exports) {
      (function(document2) {
        var currentScript = "currentScript", scripts = document2.getElementsByTagName("script");
        if (!(currentScript in document2)) {
          Object.defineProperty(document2, currentScript, {
            get: function() {
              try {
                throw new Error();
              } catch (err) {
                var i, res = (/.*at [^\(]*\((.*):.+:.+\)$/ig.exec(err.stack) || [false])[1];
                for (i in scripts) {
                  if (scripts[i].src == res || scripts[i].readyState == "interactive") {
                    return scripts[i];
                  }
                }
                return null;
              }
            }
          });
        }
      })(document);
    },
    "fb15": function(module2, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, "resize", function() {
        return elementResizeDetector;
      });
      if (typeof window !== "undefined") {
        {
          __webpack_require__("f6fd");
        }
        var i;
        if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
          __webpack_require__.p = i[1];
        }
      }
      var elementResizeDetectorMaker = __webpack_require__("eec4");
      var erd = elementResizeDetectorMaker({
        strategy: "scroll"
      });
      function bind(el, binding, vnode) {
        var options = {};
        if (binding.value) {
          options = binding.value;
        }
        erd.listenTo(options, el, function(element2) {
          var width = element2.offsetWidth;
          var height = element2.offsetHeight;
          if (vnode.componentInstance) {
            vnode.componentInstance.$emit("resize", {
              detail: {
                width,
                height
              }
            });
          } else {
            vnode.elm.dispatchEvent(new CustomEvent("resize", {
              detail: {
                width,
                height
              }
            }));
          }
        });
      }
      function unbind(el) {
        erd.uninstall(el);
      }
      var elementResizeDetector = {
        bind,
        unbind
      };
      var src = {
        install: function install2(Vue) {
          Vue.directive("resize", elementResizeDetector);
        }
      };
      __webpack_exports__["default"] = src;
    }
  });
})(vueElementResizeDetector_common);
const watchProp = (key, deep) => ({
  handler(newValue) {
    if (this.d[key] === newValue) {
      return;
    }
    this.d[key] = newValue;
  },
  deep
});
const _sfc_main$2 = {
  name: "Dashboard",
  inheritAttrs: false,
  props: {
    id: { type: [Number, String], required: true },
    autoHeight: { type: Boolean, default: Dashboard$1.defaults.autoHeight }
  },
  directives: {
    rlocal: vueElementResizeDetector_common.exports.resize
  },
  data() {
    return {
      d: null
    };
  },
  provide() {
    return {
      $dashboard: () => this.d
    };
  },
  computed: {
    currentBreakpoint() {
      if (this.d) {
        return this.d.currentBreakpoint;
      }
      return null;
    }
  },
  watch: {
    currentBreakpoint(newValue) {
      if (newValue) {
        this.$emit("currentBreakpointUpdated", newValue);
      }
    }
  },
  methods: {
    onResize(e) {
      this.d.width = e.detail.width;
    },
    createPropWatchers() {
      Object.keys(this.$props).forEach((key) => {
        this.$watch(key, watchProp(key, true));
      });
    }
  },
  created() {
    this.d = new Dashboard$1(this.$props);
    this.createPropWatchers();
  }
};
const _hoisted_1$2 = ["id"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_rlocal = resolveDirective("rlocal");
  return $data.d ? withDirectives((openBlock(), createElementBlock("div", {
    key: 0,
    id: $props.id,
    ref: $props.id,
    onResize: _cache[0] || (_cache[0] = (...args) => $options.onResize && $options.onResize(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 40, _hoisted_1$2)), [
    [_directive_rlocal]
  ]) : createCommentVNode("", true);
}
var Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
var DashboardGrid_vue_vue_type_style_index_0_lang = "";
var nc$1 = 12;
var nr$1 = 8;
const _sfc_main$1 = {
  components: {
    DashItem,
    DashLayout,
    Dashboard
  },
  data() {
    return {
      compact: false,
      draggable: true,
      resizable: true,
      moveHold: 0,
      margin: { x: 8, y: 8 },
      numberOfCols: nc$1,
      numberOfRows: nr$1,
      layouts: [
        {
          breakpoint: "",
          numberOfCols: nc$1,
          numberOfRows: nr$1,
          items: []
        }
      ],
      currentBreakpoint: ""
    };
  },
  methods: {
    addItem() {
      for (let layout of this.layouts) {
        layout.items.push({
          id: (layout.items.length + 1).toString(),
          x: 0,
          y: 0,
          width: 1,
          height: 1
        });
      }
    },
    removeItem() {
      for (let layout of this.layouts) {
        layout.items.splice(0, 1);
      }
    },
    updateCurrentBreakpoint(val) {
      this.currentBreakpoint = val;
    }
  }
};
const _hoisted_1$1 = /* @__PURE__ */ createElementVNode("div", { class: "content" }, null, -1);
const _hoisted_2$1 = /* @__PURE__ */ createElementVNode("div", { class: "placeholderTest" }, null, -1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Dash_Item = resolveComponent("Dash-Item");
  const _component_DashLayout = resolveComponent("DashLayout");
  const _component_Dashboard = resolveComponent("Dashboard");
  return openBlock(), createBlock(_component_Dashboard, {
    id: "layout",
    onCurrentBreakpointUpdated: $options.updateCurrentBreakpoint
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.layouts, (layout) => {
        return openBlock(), createBlock(_component_DashLayout, mergeProps({
          key: layout.breakpoint
        }, layout, { compact: false }), {
          placeholder: withCtx(() => [
            _hoisted_2$1
          ]),
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(layout.items, (item) => {
              return openBlock(), createBlock(_component_Dash_Item, {
                id: item.id,
                x: item.x,
                y: item.y,
                width: item.width,
                height: item.height,
                locked: item.locked,
                key: item.id,
                resizable: $data.resizable,
                numberOfRows: $data.numberOfRows,
                draggable: $data.draggable,
                moveHold: $data.moveHold,
                debug: true
              }, {
                default: withCtx(() => [
                  _hoisted_1$1
                ]),
                _: 2
              }, 1032, ["id", "x", "y", "width", "height", "locked", "resizable", "numberOfRows", "draggable", "moveHold"]);
            }), 128))
          ]),
          _: 2
        }, 1040);
      }), 128))
    ]),
    _: 1
  }, 8, ["onCurrentBreakpointUpdated"]);
}
var DashboardGrid = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
var DashboardTemplate_vue_vue_type_style_index_0_lang = "";
var nc = 12;
var nr = 8;
const _sfc_main = {
  components: {
    DashItem,
    DashLayout,
    Dashboard
  },
  data() {
    return {
      compact: false,
      draggable: true,
      resizable: true,
      moveHold: 0,
      margin: { x: 8, y: 8 },
      numberOfCols: nc,
      numberOfRows: nr,
      layouts: [
        {
          breakpoint: "",
          numberOfCols: nc,
          numberOfRows: nr,
          items: [
            { id: "1", x: 0, y: 0, width: 1, height: 1 },
            { id: "2", x: 1, y: 0, width: 1, height: 1 },
            { id: "3", x: 2, y: 0, width: 1, height: 1 },
            { id: "4", x: 3, y: 0, width: 1, height: 1 },
            { id: "5", x: 4, y: 0, width: 1, height: 1 },
            { id: "6", x: 5, y: 0, width: 1, height: 1 },
            { id: "7", x: 6, y: 0, width: 1, height: 1 },
            { id: "8", x: 7, y: 0, width: 1, height: 1 }
          ]
        }
      ],
      currentBreakpoint: ""
    };
  },
  methods: {
    addItem() {
      for (let layout of this.layouts) {
        layout.items.push({
          id: (layout.items.length + 1).toString(),
          x: 0,
          y: 0,
          width: 2,
          height: 1
        });
      }
    },
    removeItem() {
      for (let layout of this.layouts) {
        layout.items.splice(0, 1);
      }
    },
    updateCurrentBreakpoint(val) {
      this.currentBreakpoint = val;
    }
  }
};
const _hoisted_1 = { class: "content" };
const _hoisted_2 = /* @__PURE__ */ createElementVNode("div", { class: "placeholderTest" }, null, -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DashItem = resolveComponent("DashItem");
  const _component_DashLayout = resolveComponent("DashLayout");
  const _component_Dashboard = resolveComponent("Dashboard");
  return openBlock(), createBlock(_component_Dashboard, {
    id: "layout",
    onCurrentBreakpointUpdated: $options.updateCurrentBreakpoint
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.layouts, (layout) => {
        return openBlock(), createBlock(_component_DashLayout, mergeProps({
          key: layout.breakpoint
        }, layout, { compact: false }), {
          placeholder: withCtx(() => [
            _hoisted_2
          ]),
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(layout.items, (item) => {
              return openBlock(), createBlock(_component_DashItem, {
                id: item.id,
                x: item.x,
                y: item.y,
                width: item.width,
                height: item.height,
                locked: item.locked,
                key: item.id,
                resizable: $data.resizable,
                numberOfRows: $data.numberOfRows,
                draggable: $data.draggable,
                moveHold: $data.moveHold,
                debug: true
              }, {
                default: withCtx(() => [
                  createElementVNode("div", _hoisted_1, toDisplayString(item.id), 1)
                ]),
                _: 2
              }, 1032, ["id", "x", "y", "width", "height", "locked", "resizable", "numberOfRows", "draggable", "moveHold"]);
            }), 128))
          ]),
          _: 2
        }, 1040);
      }), 128))
    ]),
    _: 1
  }, 8, ["onCurrentBreakpointUpdated"]);
}
var DashboardTemplate = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const VueDashboardGrid = {
  DashItem,
  DashLayout,
  Dashboard,
  DashboardGrid,
  DashboardTemplate
};
function install(Vue) {
  if (install.installed)
    return;
  install.installed = true;
  Object.keys(VueDashboardGrid).forEach((name) => {
    Vue.component(name, VueDashboardGrid[name]);
  });
}
const plugin = {
  install
};
let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}
export { DashItem, DashLayout, Dashboard, VueDashboardGrid as default, install };
