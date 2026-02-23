import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// node_modules/.pnpm/fullpage.js@4.0.40/node_modules/fullpage.js/dist/fullpage.js
var require_fullpage = __commonJS({
  "node_modules/.pnpm/fullpage.js@4.0.40/node_modules/fullpage.js/dist/fullpage.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.fullpage = factory());
    })(exports, (function() {
      "use strict";
      if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, "find", {
          value: function value(predicate) {
            if (this == null) {
              throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (typeof predicate !== "function") {
              throw new TypeError("predicate must be a function");
            }
            var thisArg = arguments[1];
            var k = 0;
            while (k < len) {
              var kValue = o[k];
              if (predicate.call(thisArg, kValue, k, o)) {
                return kValue;
              }
              k++;
            }
            return void 0;
          }
        });
      }
      if (!Array.from) {
        Array.from = (function() {
          var toStr = Object.prototype.toString;
          var isCallable = function isCallable2(fn) {
            return typeof fn === "function" || toStr.call(fn) === "[object Function]";
          };
          var toInteger = function toInteger2(value) {
            var number = Number(value);
            if (isNaN(number)) {
              return 0;
            }
            if (number === 0 || !isFinite(number)) {
              return number;
            }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
          };
          var maxSafeInteger = Math.pow(2, 53) - 1;
          var toLength = function toLength2(value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
          };
          return function from(arrayLike) {
            var C = this;
            var items = Object(arrayLike);
            if (arrayLike == null) {
              throw new TypeError("Array.from requires an array-like object - not null or undefined");
            }
            var mapFn = arguments.length > 1 ? arguments[1] : void 0;
            var T;
            if (typeof mapFn !== "undefined") {
              if (!isCallable(mapFn)) {
                throw new TypeError("Array.from: when provided, the second argument must be a function");
              }
              if (arguments.length > 2) {
                T = arguments[2];
              }
            }
            var len = toLength(items.length);
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);
            var k = 0;
            var kValue;
            while (k < len) {
              kValue = items[k];
              if (mapFn) {
                A[k] = typeof T === "undefined" ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
              } else {
                A[k] = kValue;
              }
              k += 1;
            }
            A.length = len;
            return A;
          };
        })();
      }
      var win = window;
      var doc = document;
      var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
      var isMacDevice = /(Mac|iPhone|iPod|iPad)/i.test(win.navigator.userAgent);
      var isTouch = "ontouchstart" in win || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints;
      var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
      var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], summary:not([disabled]), [contenteditable]';
      var FP = {
        test: {},
        shared: {}
      };
      var extensions = ["parallax", "scrollOverflowReset", "dragAndMove", "offsetSections", "fadingEffect", "responsiveSlides", "continuousHorizontal", "interlockedSlides", "scrollHorizontally", "resetSliders", "cards", "dropEffect", "waterEffect"];
      var isInsideIframe = (function() {
        var inIframe = window.self !== window.top;
        return function() {
          return inIframe;
        };
      })();
      if (win.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function(callback, thisArg) {
          thisArg = thisArg || window;
          for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
          }
        };
      }
      if (typeof Object.assign != "function") {
        Object.defineProperty(Object, "assign", {
          value: function assign(target, varArgs) {
            if (target == null) {
              throw new TypeError("Cannot convert undefined or null to object");
            }
            var to = Object(target);
            for (var index2 = 1; index2 < arguments.length; index2++) {
              var nextSource = arguments[index2];
              if (nextSource != null) {
                for (var nextKey in nextSource) {
                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                  }
                }
              }
            }
            return to;
          },
          writable: true,
          configurable: true
        });
      }
      if (!String.prototype.padStart) {
        String.prototype.padStart = function padStart(targetLength, padString) {
          targetLength = targetLength >> 0;
          padString = String(typeof padString !== "undefined" ? padString : " ");
          if (this.length > targetLength) {
            return String(this);
          } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
              padString += Array.apply(null, Array(targetLength)).map(function() {
                return padString;
              }).join("");
            }
            return padString.slice(0, targetLength) + String(this);
          }
        };
      }
      function showError(type, text) {
        win.console && win.console[type] && win.console[type]("fullPage: " + text);
      }
      function isVisible(el) {
        var style = win.getComputedStyle(el);
        return style.display !== "none";
      }
      function getVisible(elements) {
        return Array.from(elements).filter(function(e) {
          return isVisible(e);
        });
      }
      function $(selector, context) {
        context = arguments.length > 1 ? context : document;
        return context ? context.querySelectorAll(selector) : null;
      }
      function deepExtend(out) {
        out = out || {};
        for (var i = 1, len = arguments.length; i < len; ++i) {
          var obj = arguments[i];
          if (!obj) {
            continue;
          }
          for (var key in obj) {
            if (!obj.hasOwnProperty(key) || key == "__proto__" || key == "constructor") {
              continue;
            }
            if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
              out[key] = deepExtend(out[key], obj[key]);
              continue;
            }
            out[key] = obj[key];
          }
        }
        return out;
      }
      function hasClass(el, className) {
        if (el == null) {
          return false;
        }
        return el.classList.contains(className);
      }
      function getWindowHeight() {
        return "innerHeight" in win ? win.innerHeight : doc.documentElement.offsetHeight;
      }
      function getWindowWidth() {
        return win.innerWidth;
      }
      function css(items, props) {
        items = getList(items);
        var key;
        for (key in props) {
          if (props.hasOwnProperty(key)) {
            if (key !== null) {
              for (var i = 0; i < items.length; i++) {
                var item = items[i];
                item.style[key] = props[key];
              }
            }
          }
        }
        return items;
      }
      function prev(item) {
        return item.previousElementSibling;
      }
      function next(item) {
        return item.nextElementSibling;
      }
      function last(item) {
        return item[item.length - 1];
      }
      function index(item, selector) {
        item = isArrayOrList(item) ? item[0] : item;
        var children = selector != null ? $(selector, item.parentNode) : item.parentNode.childNodes;
        var num = 0;
        for (var i = 0; i < children.length; i++) {
          if (children[i] == item) return num;
          if (children[i].nodeType == 1) num++;
        }
        return -1;
      }
      function getList(item) {
        return !isArrayOrList(item) ? [item] : item;
      }
      function hide(el) {
        el = getList(el);
        for (var i = 0; i < el.length; i++) {
          el[i].style.display = "none";
        }
        return el;
      }
      function show(el) {
        el = getList(el);
        for (var i = 0; i < el.length; i++) {
          el[i].style.display = "block";
        }
        return el;
      }
      function isArrayOrList(el) {
        return Object.prototype.toString.call(el) === "[object Array]" || Object.prototype.toString.call(el) === "[object NodeList]";
      }
      function addClass(el, className) {
        el = getList(el);
        for (var i = 0; i < el.length; i++) {
          var item = el[i];
          item.classList.add(className);
        }
        return el;
      }
      function removeClass(el, className) {
        el = getList(el);
        var classNames = className.split(" ");
        for (var a = 0; a < classNames.length; a++) {
          className = classNames[a];
          for (var i = 0; i < el.length; i++) {
            var item = el[i];
            item.classList.remove(className);
          }
        }
        return el;
      }
      function appendTo(el, parent) {
        parent.appendChild(el);
      }
      function wrap(toWrap, wrapper, isWrapAll) {
        var newParent;
        wrapper = wrapper || doc.createElement("div");
        for (var i = 0; i < toWrap.length; i++) {
          var item = toWrap[i];
          if (isWrapAll && !i || !isWrapAll) {
            newParent = wrapper.cloneNode(true);
            item.parentNode.insertBefore(newParent, item);
          }
          newParent.appendChild(item);
        }
        return toWrap;
      }
      function wrapAll(toWrap, wrapper) {
        wrap(toWrap, wrapper, true);
      }
      function wrapInner(parent, wrapper) {
        parent.appendChild(wrapper);
        while (parent.firstChild !== wrapper) {
          wrapper.appendChild(parent.firstChild);
        }
      }
      function unwrap(wrapper) {
        var wrapperContent = doc.createDocumentFragment();
        while (wrapper.firstChild) {
          wrapperContent.appendChild(wrapper.firstChild);
        }
        wrapper.parentNode.replaceChild(wrapperContent, wrapper);
      }
      function closest(el, selector) {
        if (el && el.nodeType === 1) {
          if (matches(el, selector)) {
            return el;
          }
          return closest(el.parentNode, selector);
        }
        return null;
      }
      function after(reference, el) {
        insertBefore(reference, reference.nextSibling, el);
      }
      function before(reference, el) {
        insertBefore(reference, reference, el);
      }
      function insertBefore(reference, beforeElement, el) {
        if (!isArrayOrList(el)) {
          if (typeof el == "string") {
            el = createElementFromHTML(el);
          }
          el = [el];
        }
        for (var i = 0; i < el.length; i++) {
          reference.parentNode.insertBefore(el[i], beforeElement);
        }
      }
      function getScrollTop() {
        var docElement = doc.documentElement;
        return (win.pageYOffset || docElement.scrollTop) - (docElement.clientTop || 0);
      }
      function siblings(el) {
        return Array.prototype.filter.call(el.parentNode.children, function(child) {
          return child !== el;
        });
      }
      function preventDefault(event) {
        event.preventDefault();
      }
      function getAttr(el, attr) {
        return el.getAttribute(attr);
      }
      function docAddEvent(event, callback, options) {
        doc.addEventListener(event, callback, options === "undefined" ? null : options);
      }
      function windowAddEvent(event, callback, options) {
        win.addEventListener(event, callback, options === "undefined" ? null : options);
      }
      function docRemoveEvent(event, callback, options) {
        doc.removeEventListener(event, callback, options === "undefined" ? null : options);
      }
      function windowRemoveEvent(event, callback, options) {
        win.removeEventListener(event, callback, options === "undefined" ? null : options);
      }
      function isFunction(item) {
        if (typeof item === "function") {
          return true;
        }
        var type = Object.prototype.toString.call(item);
        return type === "[object Function]" || type === "[object GeneratorFunction]";
      }
      function trigger(el, eventName, data) {
        var event;
        data = typeof data === "undefined" ? {} : data;
        if (typeof win.CustomEvent === "function") {
          event = new CustomEvent(eventName, {
            detail: data
          });
        } else {
          event = doc.createEvent("CustomEvent");
          event.initCustomEvent(eventName, true, true, data);
        }
        el.dispatchEvent(event);
      }
      function matches(el, selector) {
        return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
      }
      function toggle(el, value) {
        if (typeof value === "boolean") {
          for (var i = 0; i < el.length; i++) {
            el[i].style.display = value ? "block" : "none";
          }
        }
        return el;
      }
      function createElementFromHTML(htmlString) {
        var div = doc.createElement("div");
        div.innerHTML = htmlString.trim();
        return div.firstChild;
      }
      function remove(items) {
        items = getList(items);
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (item && item.parentElement) {
            item.parentNode.removeChild(item);
          }
        }
      }
      function untilAll(item, selector, fn) {
        var sibling = item[fn];
        var siblings2 = [];
        while (sibling) {
          if (matches(sibling, selector) || selector == null) {
            siblings2.push(sibling);
          }
          sibling = sibling[fn];
        }
        return siblings2;
      }
      function nextAll(item, selector) {
        return untilAll(item, selector, "nextElementSibling");
      }
      function prevAll(item, selector) {
        return untilAll(item, selector, "previousElementSibling");
      }
      function toArray(objectData) {
        return Object.keys(objectData).map(function(key) {
          return objectData[key];
        });
      }
      function getLast(items) {
        return items[items.length - 1];
      }
      function getAverage(elements, number) {
        var sum = 0;
        var lastElements = elements.slice(Math.max(elements.length - number, 1));
        for (var i = 0; i < lastElements.length; i++) {
          sum = sum + lastElements[i];
        }
        return Math.ceil(sum / number);
      }
      function setSrc(element, attribute) {
        element.setAttribute(attribute, getAttr(element, "data-" + attribute));
        element.removeAttribute("data-" + attribute);
      }
      function getParentsUntil(item, topParentSelector) {
        var parents = [item];
        do {
          item = item.parentNode;
          parents.push(item);
        } while (!matches(item, topParentSelector));
        return parents;
      }
      function isInsideInput() {
        var activeElement = doc.activeElement;
        return matches(activeElement, "textarea") || matches(activeElement, "input") || matches(activeElement, "select") || getAttr(activeElement, "contentEditable") == "true" || getAttr(activeElement, "contentEditable") == "";
      }
      window["fp_utils"] = {
        "$": $,
        "deepExtend": deepExtend,
        "hasClass": hasClass,
        "getWindowHeight": getWindowHeight,
        "css": css,
        "prev": prev,
        "next": next,
        "last": last,
        "index": index,
        "getList": getList,
        "hide": hide,
        "show": show,
        "isArrayOrList": isArrayOrList,
        "addClass": addClass,
        "removeClass": removeClass,
        "appendTo": appendTo,
        "wrap": wrap,
        "wrapAll": wrapAll,
        "unwrap": unwrap,
        "closest": closest,
        "after": after,
        "before": before,
        "insertBefore": insertBefore,
        "getScrollTop": getScrollTop,
        "siblings": siblings,
        "preventDefault": preventDefault,
        "isFunction": isFunction,
        "trigger": trigger,
        "matches": matches,
        "toggle": toggle,
        "createElementFromHTML": createElementFromHTML,
        "remove": remove,
        // "filter": filter,
        "untilAll": untilAll,
        "nextAll": nextAll,
        "prevAll": prevAll,
        "showError": showError
      };
      var utils = Object.freeze({
        __proto__: null,
        showError,
        isVisible,
        getVisible,
        $,
        deepExtend,
        hasClass,
        getWindowHeight,
        getWindowWidth,
        css,
        prev,
        next,
        last,
        index,
        getList,
        hide,
        show,
        isArrayOrList,
        addClass,
        removeClass,
        appendTo,
        wrap,
        wrapAll,
        wrapInner,
        unwrap,
        closest,
        after,
        before,
        insertBefore,
        getScrollTop,
        siblings,
        preventDefault,
        getAttr,
        docAddEvent,
        windowAddEvent,
        docRemoveEvent,
        windowRemoveEvent,
        isFunction,
        trigger,
        matches,
        toggle,
        createElementFromHTML,
        remove,
        untilAll,
        nextAll,
        prevAll,
        toArray,
        getLast,
        getAverage,
        setSrc,
        getParentsUntil,
        isInsideInput
      });
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      var EventEmitter = {
        events: {},
        on: function on(event, listener) {
          var _this = this;
          if (_typeof(this.events[event]) !== "object") {
            this.events[event] = [];
          }
          this.events[event].push(listener);
          return function() {
            return _this.removeListener(event, listener);
          };
        },
        removeListener: function removeListener(event, listener) {
          if (_typeof(this.events[event]) === "object") {
            var idx = this.events[event].indexOf(listener);
            if (idx > -1) {
              this.events[event].splice(idx, 1);
            }
          }
        },
        emit: function emit(event) {
          var _this2 = this;
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          if (_typeof(this.events[event]) === "object") {
            this.events[event].forEach(function(listener) {
              return listener.apply(_this2, args);
            });
          }
        },
        once: function once(event, listener) {
          var _this3 = this;
          var remove2 = this.on(event, function() {
            remove2();
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            listener.apply(_this3, args);
          });
        }
      };
      var defaultState = {
        numSections: 0,
        numSlides: 0,
        slides: [],
        sections: [],
        activeSection: null,
        scrollTrigger: null,
        isBeyondFullpage: false,
        aboutToScrollToFullPage: false,
        slideMoving: false,
        isResizing: false,
        isScrolling: false,
        lastScrolledDestiny: void 0,
        lastScrolledSlide: void 0,
        activeAnimation: false,
        canScroll: true,
        touchDirection: "none",
        wheelDirection: "none",
        isGrabbing: false,
        isUsingWheel: false,
        isWindowFocused: true,
        previousDestTop: 0,
        windowsHeight: getWindowHeight(),
        isDoingContinousVertical: false,
        timeouts: {},
        scrollY: 0,
        scrollX: 0,
        isFullpageInitDone: false
      };
      var state = Object.assign({}, defaultState);
      win.state = state;
      function setState(props) {
        Object.assign(state, props);
      }
      function getState() {
        return state;
      }
      function getActivePanel() {
        return state.activeSection && state.activeSection.activeSlide ? state.activeSection.activeSlide : state.activeSection;
      }
      function resetState() {
        setState(defaultState);
      }
      var events = {
        onAfterRenderNoAnchor: "onAfterRenderNoAnchor",
        onClickOrTouch: "onClickOrTouch",
        moveSlideLeft: "moveSlideLeft",
        moveSlideRight: "moveSlideRight",
        onInitialise: "onInitialise",
        beforeInit: "beforeInit",
        bindEvents: "bindEvents",
        onDestroy: "onDestroy",
        onDestroyAll: "onDestroyAll",
        contentChanged: "contentChanged",
        onScrollOverflowScrolled: "onScrollOverflowScrolled",
        onScrollPageAndSlide: "onScrollPageAndSlide",
        onKeyDown: "onKeyDown",
        onMenuClick: "onMenuClick",
        scrollPage: "scrollPage",
        landscapeScroll: "landscapeScroll",
        scrollBeyondFullpage: "scrollBeyondFullpage",
        onPerformMovement: "onPerformMovement",
        onSlideLeave: "onSlideLeave",
        onLeave: "onLeave",
        afterSectionLoads: "afterSectionLoads",
        afterSlideLoads: "afterSlideLoads"
      };
      EventEmitter.on(events.bindEvents, bindEvents$c);
      function bindEvents$c() {
        ["click", "touchstart"].forEach(function(eventName) {
          docAddEvent(eventName, delegatedEvents);
        });
        windowAddEvent("focus", focusHandler);
        internalEvents();
      }
      function internalEvents() {
        EventEmitter.on(events.onDestroy, onDestroy$9);
      }
      function delegatedEvents(e) {
        EventEmitter.emit(events.onClickOrTouch, {
          e,
          target: e.target
        });
      }
      function onDestroy$9() {
        ["click", "touchstart"].forEach(function(eventName) {
          docRemoveEvent(eventName, delegatedEvents);
        });
      }
      function focusHandler() {
        setState({
          isWindowFocused: true
        });
      }
      var WRAPPER = "fullpage-wrapper";
      var WRAPPER_SEL = "." + WRAPPER;
      var SCROLLABLE = "fp-scrollable";
      var RESPONSIVE = "fp-responsive";
      var NO_TRANSITION = "fp-notransition";
      var DESTROYED = "fp-destroyed";
      var ENABLED = "fp-enabled";
      var VIEWING_PREFIX = "fp-viewing";
      var ACTIVE = "active";
      var ACTIVE_SEL = "." + ACTIVE;
      var COMPLETELY = "fp-completely";
      var COMPLETELY_SEL = "." + COMPLETELY;
      var LOADED = "fp-loaded";
      var SECTION_DEFAULT_SEL = ".section";
      var SECTION = "fp-section";
      var SECTION_SEL = "." + SECTION;
      var SECTION_ACTIVE_SEL = SECTION_SEL + ACTIVE_SEL;
      var TABLE_CELL = "fp-tableCell";
      var TABLE_CELL_SEL = "." + TABLE_CELL;
      var AUTO_HEIGHT = "fp-auto-height";
      var AUTO_HEIGHT_SEL = "." + AUTO_HEIGHT;
      var AUTO_HEIGHT_RESPONSIVE = "fp-auto-height-responsive";
      var AUTO_HEIGHT_RESPONSIVE_SEL = "." + AUTO_HEIGHT_RESPONSIVE;
      var NORMAL_SCROLL = "fp-normal-scroll";
      var SECTION_NAV = "fp-nav";
      var SECTION_NAV_SEL = "#" + SECTION_NAV;
      var SECTION_NAV_TOOLTIP = "fp-tooltip";
      var SECTION_NAV_TOOLTIP_SEL = "." + SECTION_NAV_TOOLTIP;
      var SHOW_ACTIVE_TOOLTIP = "fp-show-active";
      var SLIDE_DEFAULT_SEL = ".slide";
      var SLIDE = "fp-slide";
      var SLIDE_SEL = "." + SLIDE;
      var SLIDE_ACTIVE_SEL = SLIDE_SEL + ACTIVE_SEL;
      var SLIDES_WRAPPER = "fp-slides";
      var SLIDES_WRAPPER_SEL = "." + SLIDES_WRAPPER;
      var SLIDES_CONTAINER = "fp-slidesContainer";
      var SLIDES_CONTAINER_SEL = "." + SLIDES_CONTAINER;
      var TABLE = "fp-table";
      var OVERFLOW = "fp-overflow";
      var OVERFLOW_SEL = "." + OVERFLOW;
      var IS_OVERFLOW = "fp-is-overflow";
      var SLIDES_NAV = "fp-slidesNav";
      var SLIDES_NAV_SEL = "." + SLIDES_NAV;
      var SLIDES_NAV_LINK_SEL = SLIDES_NAV_SEL + " a";
      var SLIDES_STYLED_ARROW = "fp-arrow";
      var SLIDES_ARROW = "fp-controlArrow";
      var SLIDES_ARROW_SEL = "." + SLIDES_ARROW;
      var SLIDES_PREV = "fp-prev";
      var SLIDES_PREV_SEL = "." + SLIDES_PREV;
      var SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL;
      var SLIDES_NEXT = "fp-next";
      var SLIDES_NEXT_SEL = "." + SLIDES_NEXT;
      var SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + SLIDES_NEXT_SEL;
      var WATERMARK = "fp-watermark";
      var WATERMARK_SEL = "." + WATERMARK;
      var defaultOptions = {
        //navigation
        menu: false,
        anchors: [],
        lockAnchors: false,
        navigation: false,
        navigationPosition: "right",
        navigationTooltips: [],
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: "bottom",
        scrollBar: false,
        hybrid: false,
        licenseKey: "",
        credits: {
          "enabled": true,
          "label": "Made with fullPage.js",
          "position": "right"
        },
        //scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 600,
        easing: "easeInOutCubic",
        easingcss3: "ease",
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        dragAndMove: false,
        offsetSections: false,
        resetSliders: false,
        fadingEffect: false,
        normalScrollElements: null,
        scrollOverflow: true,
        scrollOverflowReset: false,
        skipIntermediateItems: false,
        touchSensitivity: 5,
        touchWrapper: null,
        bigSectionsDestination: null,
        adjustOnNavChange: true,
        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,
        allowCorrectDirection: false,
        //design
        scrollOverflowMacStyle: true,
        controlArrows: true,
        controlArrowsHTML: ['<div class="' + SLIDES_STYLED_ARROW + '"></div>', '<div class="' + SLIDES_STYLED_ARROW + '"></div>'],
        controlArrowColor: "#fff",
        verticalCentered: true,
        sectionsColor: [],
        paddingTop: 0,
        paddingBottom: 0,
        fixedElements: null,
        responsive: 0,
        //backwards compabitility with responsiveWiddth
        responsiveWidth: 0,
        responsiveHeight: 0,
        responsiveSlides: false,
        parallax: false,
        parallaxOptions: {
          type: "reveal",
          percentage: 62,
          property: "translate"
        },
        cards: false,
        cardsOptions: {
          perspective: 100,
          fadeContent: true,
          fadeBackground: true
        },
        //Custom selectors
        sectionSelector: SECTION_DEFAULT_SEL,
        slideSelector: SLIDE_DEFAULT_SEL,
        //events
        afterLoad: null,
        beforeLeave: null,
        onLeave: null,
        afterRender: null,
        afterResize: null,
        afterReBuild: null,
        afterSlideLoad: null,
        onSlideLeave: null,
        afterResponsive: null,
        onScrollOverflow: null,
        lazyLoading: true,
        lazyLoadThreshold: 0,
        observer: true,
        scrollBeyondFullpage: true,
        rtl: false
      };
      var container = null;
      var g_initialAnchorsInDom = false;
      var originals = deepExtend({}, defaultOptions);
      var g_options = null;
      function getInitialAnchorsInDom() {
        return g_initialAnchorsInDom;
      }
      function setContainer(value) {
        container = value;
      }
      function getContainer(value) {
        return container;
      }
      function getOptions() {
        return g_options || defaultOptions;
      }
      function setOptions(options) {
        g_options = deepExtend({}, defaultOptions, options);
        originals = Object.assign({}, g_options);
      }
      function getOriginals() {
        return originals;
      }
      function setOption(name, value) {
        defaultOptions[name] = value;
      }
      function setVariableState(variable, value, type) {
        g_options[variable] = value;
        if (type !== "internal") {
          originals[variable] = value;
        }
      }
      function setOptionsFromDOM() {
        if (!getOptions().anchors.length) {
          var anchorsAttribute = "[data-anchor]";
          var anchors = $(getOptions().sectionSelector.split(",").join(anchorsAttribute + ",") + anchorsAttribute, container);
          if (anchors.length && anchors.length === $(getOptions().sectionSelector, container).length) {
            g_initialAnchorsInDom = true;
            anchors.forEach(function(item) {
              getOptions().anchors.push(getAttr(item, "data-anchor").toString());
            });
          }
        }
        if (!getOptions().navigationTooltips.length) {
          var tooltipsAttribute = "[data-tooltip]";
          var tooltips = $(getOptions().sectionSelector.split(",").join(tooltipsAttribute + ",") + tooltipsAttribute, container);
          if (tooltips.length) {
            tooltips.forEach(function(item) {
              getOptions().navigationTooltips.push(getAttr(item, "data-tooltip").toString());
            });
          }
        }
      }
      var plainItem = function plainItem2(panel) {
        this.anchor = panel.anchor;
        this.item = panel.item;
        this.index = panel.index();
        this.isLast = this.index === panel.item.parentElement.querySelectorAll(panel.selector).length - 1;
        this.isFirst = !this.index;
        this.isActive = panel.isActive;
      };
      var Item = function Item2(el, selector) {
        this.parent = this.parent || null;
        this.selector = selector;
        this.anchor = getAttr(el, "data-anchor") || getOptions().anchors[index(el, getOptions().sectionSelector)];
        this.item = el;
        this.isVisible = isVisible(el);
        this.isActive = hasClass(el, ACTIVE);
        this.hasScroll = hasClass(el, OVERFLOW) || $(OVERFLOW_SEL, el)[0] != null;
        this.isSection = selector === getOptions().sectionSelector;
        this.container = closest(el, SLIDES_CONTAINER_SEL) || closest(el, WRAPPER_SEL);
        this.index = function() {
          return this.siblings().indexOf(this);
        };
      };
      Item.prototype.siblings = function() {
        if (this.isSection) {
          if (this.isVisible) {
            return state.sections;
          } else {
            return state.sectionsIncludingHidden;
          }
        }
        return this.parent ? this.parent.slides : 0;
      };
      Item.prototype.prev = function() {
        var siblings2 = this.siblings();
        var currentIndex = this.isSection ? siblings2.indexOf(this) : this.parent.slides.indexOf(this);
        var prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          return siblings2[prevIndex];
        }
        return null;
      };
      Item.prototype.next = function() {
        var siblings2 = this.siblings();
        var currentIndex = this.isSection ? siblings2.indexOf(this) : this.parent.slides.indexOf(this);
        var nextIndex = currentIndex + 1;
        if (nextIndex < siblings2.length) {
          return siblings2[nextIndex];
        }
        return null;
      };
      Item.prototype["prevPanel"] = function() {
        return this.prev() || (this.parent ? this.parent.prev() : null);
      };
      Item.prototype["nextPanel"] = function() {
        return this.next() || (this.parent ? this.parent.next() : null);
      };
      Item.prototype.getSiblings = function() {
        if (this.isSection) {
          return state.sections;
        }
        return state.panels;
      };
      function getNodes(panels) {
        return panels.map(function(panel) {
          return panel.item;
        });
      }
      function getPanelByElement(panels, el) {
        return panels.find(function(panel) {
          return panel.item === el;
        });
      }
      var Section = function Section2(el) {
        plainItem.call(this, el);
      };
      var Slide = function Slide2(el) {
        plainItem.call(this, el);
      };
      function getSlideOrSection(destiny) {
        var slide = $(SLIDE_ACTIVE_SEL, destiny);
        if (slide.length) {
          destiny = slide[0];
        }
        return destiny;
      }
      function getSlideOrSectionPanel(panel) {
        if (!panel) {
          return null;
        }
        return panel.activeSlide ? panel.activeSlide : panel;
      }
      function isFullPageAbove() {
        return getContainer().getBoundingClientRect().bottom >= 0;
      }
      function getScrollSettings(top) {
        var options = getOptions();
        var position;
        var element;
        if (options.autoScrolling && !options.scrollBar) {
          position = -top;
          element = $(WRAPPER_SEL)[0];
        } else {
          position = top;
          element = window;
        }
        return {
          options: position,
          element
        };
      }
      function setScrolling(element, val) {
        if (!getOptions().autoScrolling || getOptions().scrollBar || element.self != window && hasClass(element, SLIDES_WRAPPER)) {
          if (element.self != window && hasClass(element, SLIDES_WRAPPER)) {
            element.scrollLeft = val;
          } else {
            element.scrollTo(0, val);
          }
        } else {
          element.style.top = val + "px";
        }
      }
      function addAnimation(element) {
        var transition = "transform " + getOptions().scrollingSpeed + "ms " + getOptions().easingcss3;
        removeClass(element, NO_TRANSITION);
        return css(element, {
          "-webkit-transition": transition,
          "transition": transition
        });
      }
      function getYmovement(activeSection, destiny) {
        var fromIndex = activeSection.index();
        var toIndex = index(destiny, SECTION_SEL);
        if (fromIndex == toIndex) {
          return "none";
        }
        if (fromIndex > toIndex) {
          return "up";
        }
        return "down";
      }
      function removeAnimation(element) {
        return addClass(element, NO_TRANSITION);
      }
      function getTransforms(translate3d) {
        return {
          "-webkit-transform": translate3d,
          "-moz-transform": translate3d,
          "-ms-transform": translate3d,
          "transform": translate3d
        };
      }
      var silentScrollId;
      function transformContainer(translate3d, animated) {
        if (animated) {
          addAnimation(getContainer());
        } else {
          removeAnimation(getContainer());
        }
        clearTimeout(silentScrollId);
        css(getContainer(), getTransforms(translate3d));
        FP.test.translate3d = translate3d;
        silentScrollId = setTimeout(function() {
          removeClass(getContainer(), NO_TRANSITION);
        }, 10);
      }
      function silentScroll(top) {
        var roundedTop = Math.round(top);
        if (getOptions().css3 && getOptions().autoScrolling && !getOptions().scrollBar) {
          var translate3d = "translate3d(0px, -" + roundedTop + "px, 0px)";
          transformContainer(translate3d, false);
        } else if (getOptions().autoScrolling && !getOptions().scrollBar) {
          css(getContainer(), {
            "top": -roundedTop + "px"
          });
          FP.test.top = -roundedTop + "px";
        } else {
          var scrollSettings = getScrollSettings(roundedTop);
          setScrolling(scrollSettings.element, scrollSettings.options);
        }
      }
      FP.setScrollingSpeed = setScrollingSpeed;
      function setScrollingSpeed(value, type) {
        setVariableState("scrollingSpeed", value, type);
      }
      var $body = null;
      var $html = null;
      var $htmlBody = null;
      function setCache() {
        $body = $("body")[0];
        $html = $("html")[0];
        $htmlBody = $("html, body");
      }
      var _g_animateScroll;
      function scrollTo(element, to, duration, callback) {
        var start = getScrolledPosition(element);
        var change = to - start;
        var isCallbackFired = false;
        var startTime;
        var wasAnimationActive = state.activeAnimation;
        setState({
          activeAnimation: true
        });
        if (_g_animateScroll) {
          window.cancelAnimationFrame(_g_animateScroll);
        }
        _g_animateScroll = function g_animateScroll(timestamp) {
          if (!startTime) {
            startTime = timestamp;
          }
          var currentTime = Math.floor(timestamp - startTime);
          if (state.activeAnimation) {
            var val = to;
            if (duration) {
              val = win.fp_easings[getOptions().easing](currentTime, start, change, duration);
            }
            if (currentTime <= duration) {
              setScrolling(element, val);
            }
            if (currentTime < duration) {
              window.requestAnimationFrame(_g_animateScroll);
            } else if (typeof callback !== "undefined" && !isCallbackFired) {
              setScrolling(element, to);
              callback();
              setState({
                activeAnimation: false
              });
              isCallbackFired = true;
            }
          } else if (!isCallbackFired && !wasAnimationActive) {
            callback();
            setState({
              activeAnimation: false
            });
            isCallbackFired = true;
          }
        };
        window.requestAnimationFrame(_g_animateScroll);
      }
      function getScrolledPosition(element) {
        var position;
        if (element.self != win && hasClass(element, SLIDES_WRAPPER)) {
          position = element.scrollLeft;
        } else if (!getOptions().autoScrolling || getOptions().scrollBar) {
          position = getScrollTop();
        } else {
          position = element.offsetTop;
        }
        return position;
      }
      function nullOrSection(el) {
        if (el && !el.item) {
          return new Section(new SectionPanel(el));
        }
        return el ? new Section(el) : null;
      }
      function nullOrSlide(el) {
        return el ? new Slide(el) : null;
      }
      function fireCallback(eventName, v) {
        var eventData = getEventData(eventName, v);
        trigger(getContainer(), eventName, eventData);
        if (getOptions()[eventName].apply(eventData[Object.keys(eventData)[0]], toArray(eventData)) === false) {
          return false;
        }
        return true;
      }
      function getEventData(eventName, v) {
        var paramsPerEvent = {
          afterRender: function afterRender2() {
            return {
              section: nullOrSection(getState().activeSection),
              slide: nullOrSlide(getState().activeSection.activeSlide)
            };
          },
          onLeave: function onLeave() {
            return {
              origin: nullOrSection(v.items.origin),
              destination: nullOrSection(v.items.destination),
              direction: v.direction,
              trigger: getState().scrollTrigger
            };
          },
          afterLoad: function afterLoad() {
            return paramsPerEvent.onLeave();
          },
          afterSlideLoad: function afterSlideLoad() {
            return {
              section: nullOrSection(v.items.section),
              origin: nullOrSection(v.items.origin),
              destination: nullOrSection(v.items.destination),
              direction: v.direction,
              trigger: getState().scrollTrigger
            };
          },
          onSlideLeave: function onSlideLeave() {
            return paramsPerEvent.afterSlideLoad();
          },
          beforeLeave: function beforeLeave() {
            return paramsPerEvent.onLeave();
          },
          onScrollOverflow: function onScrollOverflow() {
            return {
              section: nullOrSection(getState().activeSection),
              slide: nullOrSlide(getState().activeSection.activeSlide),
              position: v.position,
              direction: v.direction
            };
          }
        };
        return paramsPerEvent[eventName]();
      }
      function hasAutoPlay(item) {
        return item.hasAttribute("data-autoplay") || item.hasAttribute("autoplay");
      }
      function playMedia(destiny) {
        var panel = getSlideOrSection(destiny);
        $("video, audio", panel).forEach(function(element) {
          if (hasAutoPlay(element) && typeof element.play === "function") {
            element.play();
          }
        });
        $('iframe[src*="youtube.com/embed/"]', panel).forEach(function(element) {
          if (hasAutoPlay(element)) {
            playYoutube(element);
          }
          element.onload = function() {
            if (hasAutoPlay(element)) {
              playYoutube(element);
            }
          };
        });
      }
      function playYoutube(element) {
        element.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
      }
      function stopMedia(destiny) {
        var panel = getSlideOrSection(destiny);
        $("video, audio", panel).forEach(function(element) {
          if (!element.hasAttribute("data-keepplaying") && typeof element.pause === "function") {
            element.pause();
          }
        });
        $('iframe[src*="youtube.com/embed/"]', panel).forEach(function(element) {
          if (/youtube\.com\/embed\//.test(getAttr(element, "src")) && !element.hasAttribute("data-keepplaying")) {
            element.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
          }
        });
      }
      function enableYoutubeAPI() {
        $('iframe[src*="youtube.com/embed/"]', getContainer()).forEach(function(item) {
          addURLParam(item, "enablejsapi=1");
        });
      }
      function addURLParam(element, newParam) {
        var originalSrc = getAttr(element, "src");
        element.setAttribute("src", originalSrc + getUrlParamSign(originalSrc) + newParam);
      }
      function getUrlParamSign(url) {
        return !/\?/.test(url) ? "?" : "&";
      }
      function lazyLoad(destiny) {
        if (!getOptions().lazyLoading) {
          return;
        }
        var panel = getSlideOrSection(destiny);
        $("img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]", panel).forEach(function(element) {
          ["src", "srcset"].forEach(function(type) {
            var attribute = getAttr(element, "data-" + type);
            if (attribute != null && attribute) {
              setSrc(element, type);
              element.addEventListener("load", function() {
              });
            }
          });
          if (matches(element, "source")) {
            var elementToPlay = closest(element, "video, audio");
            if (elementToPlay) {
              elementToPlay.load();
              elementToPlay.onloadeddata = function() {
              };
            }
          }
        });
        addClass(panel, LOADED);
      }
      function lazyLoadPanels(panel) {
        var lazyLoadThresold = getOptions().lazyLoadThreshold;
        lazyLoad(panel.item);
        if (lazyLoadThresold) {
          lazyLoadDirection(panel, "prev", lazyLoadThresold);
          lazyLoadDirection(panel, "next", lazyLoadThresold);
        }
      }
      function lazyLoadDirection(startPanel, direction, count) {
        var currentPanel = startPanel;
        for (var i = 0; i < count && (currentPanel = currentPanel[direction]()); i++) {
          lazyLoad(currentPanel.item);
        }
      }
      function setBodyClass() {
        var section = getState().activeSection.item;
        var slide = getState().activeSection.activeSlide;
        var sectionAnchor = getAnchor(section);
        var text = String(sectionAnchor);
        if (slide) {
          var slideAnchor = getAnchor(slide.item);
          text = text + "-" + slideAnchor;
        }
        text = text.replace("/", "-").replace("#", "").replace(/\s/g, "");
        var classRe = new RegExp("\\b\\s?" + VIEWING_PREFIX + "-[^\\s]+\\b", "g");
        $body.className = $body.className.replace(classRe, "");
        addClass($body, VIEWING_PREFIX + "-" + text);
      }
      function getAnchor(element) {
        if (!element) {
          return null;
        }
        var anchor = getAttr(element, "data-anchor");
        var elementIndex = index(element);
        if (anchor == null) {
          anchor = elementIndex;
        }
        return anchor;
      }
      EventEmitter.on(events.onDestroyAll, onDestroyAll$1);
      function onDestroyAll$1() {
        win.history.replaceState(null, "", win.location.pathname + window.location.search);
      }
      function setPageStatus(slideIndex, slideAnchor, anchorLink) {
        var sectionHash = "";
        if (getOptions().anchors.length && !getOptions().lockAnchors) {
          if (slideIndex) {
            if (anchorLink != null) {
              sectionHash = anchorLink;
            }
            if (slideAnchor == null) {
              slideAnchor = slideIndex;
            }
            setState({
              lastScrolledSlide: slideAnchor
            });
            setUrlHash(sectionHash + "/" + slideAnchor);
          } else if (slideIndex != null) {
            setState({
              lastScrolledSlide: slideAnchor
            });
            setUrlHash(anchorLink);
          } else {
            setUrlHash(anchorLink);
          }
        }
        setBodyClass();
      }
      function setUrlHash(url) {
        if (getOptions().recordHistory) {
          location.hash = url;
        } else {
          win.history.replaceState(void 0, void 0, "#" + url);
        }
      }
      function getBulletLinkName(i, defaultName, item) {
        var anchor = defaultName === "Section" ? getOptions().anchors[i] : getAttr(item, "data-anchor");
        return encodeURI(getOptions().navigationTooltips[i] || anchor || defaultName + " " + (i + 1));
      }
      function slideBulletHandler(e) {
        if (e.cancelable) {
          preventDefault(e);
        }
        setState({
          scrollTrigger: "horizontalNav"
        });
        var sectionElem = closest(this, SECTION_SEL);
        var slides = $(SLIDES_WRAPPER_SEL, closest(this, SECTION_SEL))[0];
        var section = getPanelByElement(getState().sections, sectionElem);
        var destiny = section.slides[index(closest(this, "li"))];
        EventEmitter.emit(events.landscapeScroll, {
          slides,
          destination: destiny.item
        });
      }
      function activeSlidesNavigation(slidesNav, slideIndex) {
        if (getOptions().slidesNavigation && slidesNav != null) {
          removeClass($(ACTIVE_SEL, slidesNav), ACTIVE);
          addClass($("a", $("li", slidesNav)[slideIndex]), ACTIVE);
        }
      }
      function addSlidesNavigation(section) {
        var sectionElem = section.item;
        var numSlides = section.slides.length;
        appendTo(createElementFromHTML('<div class="' + SLIDES_NAV + '"><ul></ul></div>'), sectionElem);
        var nav = $(SLIDES_NAV_SEL, sectionElem)[0];
        addClass(nav, "fp-" + getOptions().slidesNavPosition);
        for (var i = 0; i < numSlides; i++) {
          var slide = $(SLIDE_SEL, sectionElem)[i];
          appendTo(createElementFromHTML('<li><a href="#"><span class="fp-sr-only">' + getBulletLinkName(i, "Slide", slide) + "</span><span></span></a></li>"), $("ul", nav)[0]);
        }
        css(nav, {
          "margin-left": "-" + nav.innerWidth / 2 + "px"
        });
        var activeSlideIndex = section.activeSlide ? section.activeSlide.index() : 0;
        addClass($("a", $("li", nav)[activeSlideIndex]), ACTIVE);
      }
      var isScrollAllowed = {};
      isScrollAllowed.m = {
        "up": true,
        "down": true,
        "left": true,
        "right": true
      };
      isScrollAllowed.k = deepExtend({}, isScrollAllowed.m);
      function setIsScrollAllowed(value, direction, type) {
        if (direction !== "all") {
          isScrollAllowed[type][direction] = value;
        } else {
          Object.keys(isScrollAllowed[type]).forEach(function(key) {
            isScrollAllowed[type][key] = value;
          });
        }
      }
      function getIsScrollAllowed() {
        return isScrollAllowed;
      }
      EventEmitter.on(events.onClickOrTouch, onClickOrTouch$2);
      function onClickOrTouch$2(params) {
        var target = params.target;
        if (matches(target, SLIDES_ARROW_SEL) || closest(target, SLIDES_ARROW_SEL)) {
          slideArrowHandler.call(target, params);
        }
      }
      function slideArrowHandler() {
        var section = closest(this, SECTION_SEL);
        var isPrevArrow = hasClass(this, SLIDES_PREV) || closest(this, SLIDES_PREV_SEL);
        if (isPrevArrow) {
          if (getIsScrollAllowed().m.left) {
            setState({
              scrollTrigger: "slideArrow"
            });
            EventEmitter.emit(events.moveSlideLeft, {
              section
            });
          }
        } else {
          if (getIsScrollAllowed().m.right) {
            setState({
              scrollTrigger: "slideArrow"
            });
            EventEmitter.emit(events.moveSlideRight, {
              section
            });
          }
        }
      }
      function createSlideArrows(section) {
        var sectionElem = section.item;
        var arrows = [createElementFromHTML(getOptions().controlArrowsHTML[0]), createElementFromHTML(getOptions().controlArrowsHTML[1])];
        after($(SLIDES_WRAPPER_SEL, sectionElem)[0], arrows);
        addClass(arrows, SLIDES_ARROW);
        addClass(arrows[0], SLIDES_PREV);
        addClass(arrows[1], SLIDES_NEXT);
        if (getOptions().controlArrowColor !== "#fff") {
          css($(SLIDES_ARROW_NEXT_SEL, sectionElem), {
            "border-color": "transparent transparent transparent " + getOptions().controlArrowColor
          });
          css($(SLIDES_ARROW_PREV_SEL, sectionElem), {
            "border-color": "transparent " + getOptions().controlArrowColor + " transparent transparent"
          });
        }
        if (!getOptions().loopHorizontal) {
          hide($(SLIDES_ARROW_PREV_SEL, sectionElem));
        }
      }
      function toggleControlArrows(v) {
        if (!getOptions().loopHorizontal && getOptions().controlArrows) {
          toggle($(SLIDES_ARROW_PREV_SEL, v.section), v.slideIndex !== 0);
          toggle($(SLIDES_ARROW_NEXT_SEL, v.section), next(v.destiny) != null);
        }
      }
      FP.setRecordHistory = setRecordHistory;
      function setRecordHistory(value, type) {
        setVariableState("recordHistory", value, type);
      }
      FP.setAutoScrolling = setAutoScrolling;
      FP.test.setAutoScrolling = setAutoScrolling;
      function setAutoScrolling(value, type) {
        if (!value) {
          silentScroll(0);
        }
        setVariableState("autoScrolling", value, type);
        var element = getState().activeSection.item;
        if (getOptions().autoScrolling && !getOptions().scrollBar) {
          css($htmlBody, {
            "overflow": "hidden",
            "height": "100%"
          });
          removeClass($body, SCROLLABLE);
          setRecordHistory(getOriginals().recordHistory, "internal");
          css(getContainer(), {
            "-ms-touch-action": "none",
            "touch-action": "none"
          });
          if (element != null) {
            silentScroll(element.offsetTop);
          }
        } else {
          css($htmlBody, {
            "overflow": "visible",
            "height": "initial"
          });
          addClass($body, SCROLLABLE);
          var recordHistory = !getOptions().autoScrolling ? false : getOriginals().recordHistory;
          setRecordHistory(recordHistory, "internal");
          css(getContainer(), {
            "-ms-touch-action": "",
            "touch-action": ""
          });
          if (element != null) {
            var scrollSettings = getScrollSettings(element.offsetTop);
            scrollSettings.element.scrollTo(0, scrollSettings.options);
          }
        }
      }
      function getTmpPosition(v) {
        return hasClass(getState().activeSection.item, AUTO_HEIGHT) ? getDestinationPosition(getState().activeSection.item) : getState().activeSection.item.offsetTop;
      }
      function getDestinationPosForInfiniteScroll(v) {
        if (v.isMovementUp && hasClass(v.element, AUTO_HEIGHT)) {
          return getDestinationPosition(v.element) - getWindowHeight() + v.element.offsetHeight;
        }
        return v.element.offsetTop;
      }
      function createInfiniteSections(v) {
        setState({
          isDoingContinousVertical: true
        });
        var activeSectionItem = getState().activeSection.item;
        if (!v.isMovementUp) {
          var prevSectionsReversed = prevAll(activeSectionItem, SECTION_SEL).reverse();
          after(activeSectionItem, prevSectionsReversed[0]);
        } else {
          before(activeSectionItem, nextAll(activeSectionItem, SECTION_SEL));
        }
        silentScroll(getTmpPosition());
        keepSlidesPosition$1();
        v.wrapAroundElements = activeSectionItem;
        v.dtop = getDestinationPosForInfiniteScroll(v);
        v.yMovement = getYmovement(getState().activeSection, v.element);
        return v;
      }
      function keepSlidesPosition$1() {
        var activeSlides = $(SLIDE_ACTIVE_SEL);
        for (var i = 0; i < activeSlides.length; i++) {
          silentLandscapeScroll(activeSlides[i], "internal");
        }
      }
      function keepSlidesPosition() {
        var activeSlides = $(SLIDE_ACTIVE_SEL);
        for (var i = 0; i < activeSlides.length; i++) {
          silentLandscapeScroll(activeSlides[i], "internal");
        }
      }
      function continuousVerticalFixSectionOrder(v) {
        if (v.wrapAroundElements == null) {
          return;
        }
        if (v.isMovementUp) {
          before($(SECTION_SEL)[0], v.wrapAroundElements);
        } else {
          after($(SECTION_SEL)[getState().sections.length - 1], prevAll(v.element, SECTION_SEL).reverse());
        }
        silentScroll(getTmpPosition());
        keepSlidesPosition();
        setState({
          isDoingContinousVertical: false
        });
      }
      function lazyLoadOthers() {
        var hasAutoHeightSections = $(AUTO_HEIGHT_SEL)[0] || isResponsiveMode() && $(AUTO_HEIGHT_RESPONSIVE_SEL)[0];
        if (!getOptions().lazyLoading || !hasAutoHeightSections) {
          return;
        }
        $(SECTION_SEL + ":not(" + ACTIVE_SEL + ")").forEach(function(section) {
          if (isSectionInViewport(section)) {
            lazyLoadPanels(getPanelByElement(getState().sections, section));
          }
        });
      }
      function isSectionInViewport(el) {
        var rect = el.getBoundingClientRect();
        var top = rect.top;
        var bottom = rect.bottom;
        var pixelOffset = 2;
        var isTopInView = top + pixelOffset < state.windowsHeight && top > 0;
        var isBottomInView = bottom > pixelOffset && bottom < state.windowsHeight;
        return isTopInView || isBottomInView;
      }
      function tooltipTextHandler() {
        trigger(prev(this), "click");
      }
      function activateNavDots(name, sectionIndex) {
        var nav = $(SECTION_NAV_SEL)[0];
        if (getOptions().navigation && nav != null && nav.style.display !== "none") {
          removeClass($(ACTIVE_SEL, nav), ACTIVE);
          if (name) {
            addClass($('a[href="#' + name + '"]', nav), ACTIVE);
          } else {
            addClass($("a", $("li", nav)[sectionIndex]), ACTIVE);
          }
        }
      }
      function addVerticalNavigation() {
        remove($(SECTION_NAV_SEL));
        var navigation = doc.createElement("div");
        navigation.setAttribute("id", SECTION_NAV);
        var divUl = doc.createElement("ul");
        navigation.appendChild(divUl);
        appendTo(navigation, $body);
        var nav = $(SECTION_NAV_SEL)[0];
        addClass(nav, "fp-" + getOptions().navigationPosition);
        if (getOptions().showActiveTooltip) {
          addClass(nav, SHOW_ACTIVE_TOOLTIP);
        }
        var li = "";
        for (var i = 0; i < getState().sections.length; i++) {
          var section = getState().sections[i];
          var link = "";
          if (getOptions().anchors.length) {
            link = section.anchor;
          }
          li += '<li><a href="#' + encodeURI(link) + '"><span class="fp-sr-only">' + getBulletLinkName(section.index(), "Section") + "</span><span></span></a>";
          var tooltip = getOptions().navigationTooltips[section.index()];
          if (typeof tooltip !== "undefined" && tooltip !== "") {
            li += '<div class="' + SECTION_NAV_TOOLTIP + " fp-" + getOptions().navigationPosition + '">' + tooltip + "</div>";
          }
          li += "</li>";
        }
        $("ul", nav)[0].innerHTML = li;
        var bullet = $("li", $(SECTION_NAV_SEL)[0])[getState().activeSection.index()];
        addClass($("a", bullet), ACTIVE);
      }
      function sectionBulletHandler(e) {
        if (e.preventDefault) {
          preventDefault(e);
        }
        setState({
          scrollTrigger: "verticalNav"
        });
        var indexBullet = index(closest(this, SECTION_NAV_SEL + " li"));
        EventEmitter.emit(events.scrollPage, {
          destination: getState().sections[indexBullet]
        });
      }
      function activateMenuAndNav(anchor, index2) {
        activateMenuElement(anchor);
        activateNavDots(anchor, index2);
      }
      function activateMenuElement(name) {
        if (getOptions().menu && getOptions().menu.length) {
          $(getOptions().menu).forEach(function(menu) {
            if (menu != null) {
              removeClass($(ACTIVE_SEL, menu), ACTIVE);
              addClass($('[data-menuanchor="' + name + '"]', menu), ACTIVE);
            }
          });
        }
      }
      (/* @__PURE__ */ new Date()).getTime();
      var oncePerScroll = (function() {
        var canTriggerEvent = true;
        var prevWheelTime = (/* @__PURE__ */ new Date()).getTime();
        var result;
        var isScrollingOnInit = !win.fullpage_api;
        return function(scrollTrigger, callback) {
          var currentTime = (/* @__PURE__ */ new Date()).getTime();
          var timeThreshold = scrollTrigger === "wheel" ? getOptions().scrollingSpeed : 100;
          canTriggerEvent = isScrollingOnInit || currentTime - prevWheelTime >= timeThreshold;
          isScrollingOnInit = !win.fullpage_api;
          if (canTriggerEvent) {
            result = callback();
            prevWheelTime = currentTime;
          }
          return typeof result !== "undefined" ? result : true;
        };
      })();
      function fireCallbackOncePerScroll(callbackName, params) {
        if (!isFunction(getOptions().beforeLeave)) {
          return;
        }
        var result = oncePerScroll(getState().scrollTrigger, function() {
          return fireCallback(callbackName, params);
        });
        return result;
      }
      FP.moveTo = moveTo;
      FP.getScrollY = function() {
        return state.scrollY;
      };
      var g_afterSectionLoadsId;
      var g_transitionLapseId;
      EventEmitter.on(events.onDestroy, onDestroy$8);
      function scrollPage(section, callback, isMovementUp) {
        var element = section.item;
        if (element == null) {
          return;
        }
        var dtop = getDestinationPosition(element);
        var slideAnchorLink;
        var slideIndex;
        var v = {
          "element": element,
          "callback": callback,
          "isMovementUp": isMovementUp,
          "dtop": dtop,
          "yMovement": getYmovement(getState().activeSection, element),
          "anchorLink": section.anchor,
          "sectionIndex": section.index(),
          "activeSlide": section.activeSlide ? section.activeSlide.item : null,
          "leavingSection": getState().activeSection.index() + 1,
          //caching the value of isResizing at the momment the function is called
          //because it will be checked later inside a setTimeout and the value might change
          "localIsResizing": state.isResizing,
          "items": {
            "origin": getState().activeSection,
            "destination": section
          },
          "direction": null
        };
        if (getState().activeSection.item == element && !state.isResizing || getOptions().scrollBar && getScrollTop() === v.dtop && !hasClass(element, AUTO_HEIGHT)) {
          return;
        }
        if (v.activeSlide != null) {
          slideAnchorLink = getAttr(v.activeSlide, "data-anchor");
          slideIndex = index(v.activeSlide, null);
        }
        if (!v.localIsResizing) {
          var direction = v.yMovement;
          if (typeof isMovementUp !== "undefined") {
            direction = isMovementUp ? "up" : "down";
          }
          v.direction = direction;
          if (isFunction(getOptions().beforeLeave)) {
            if (fireCallbackOncePerScroll("beforeLeave", v) === false) {
              return;
            }
          }
          if (isFunction(getOptions().onLeave)) {
            if (!fireCallback("onLeave", v)) {
              return;
            }
          }
        }
        if (getOptions().autoScrolling && getOptions().continuousVertical && typeof v.isMovementUp !== "undefined" && (!v.isMovementUp && v.yMovement == "up" || // Intending to scroll down but about to go up or
        v.isMovementUp && v.yMovement == "down")) {
          v = createInfiniteSections(v);
        }
        if (!v.localIsResizing) {
          stopMedia(getState().activeSection.item);
        }
        addClass(element, ACTIVE);
        removeClass(siblings(element), ACTIVE);
        updateState();
        lazyLoadPanels(section);
        setState({
          canScroll: FP.test.isTesting
        });
        setPageStatus(slideIndex, slideAnchorLink, v.anchorLink);
        EventEmitter.emit(events.onLeave, v);
        performMovement(v);
        setState({
          lastScrolledDestiny: v.anchorLink
        });
        activateMenuAndNav(v.anchorLink, v.sectionIndex);
      }
      function onDestroy$8() {
        clearTimeout(g_afterSectionLoadsId);
        clearTimeout(g_transitionLapseId);
      }
      function getDestinationPosition(element) {
        var elementHeight = element.offsetHeight;
        var elementTop = element.offsetTop;
        var position = elementTop;
        var isScrollingDown = elementTop > state.previousDestTop;
        var sectionBottom = position - getWindowHeight() + elementHeight;
        var bigSectionsDestination = getOptions().bigSectionsDestination;
        if (elementHeight > getWindowHeight()) {
          if (!isScrollingDown && !bigSectionsDestination || bigSectionsDestination === "bottom") {
            position = sectionBottom;
          }
        } else if (isScrollingDown || state.isResizing && next(element) == null) {
          position = sectionBottom;
        }
        setState({
          previousDestTop: position
        });
        return position;
      }
      function performMovement(v) {
        setState({
          touchDirection: "none",
          scrollY: Math.round(v.dtop)
        });
        EventEmitter.emit(events.onPerformMovement, v);
        var isFastSpeed = getOptions().scrollingSpeed < 700;
        var transitionLapse = isFastSpeed ? 700 : getOptions().scrollingSpeed;
        if (getOptions().css3 && getOptions().autoScrolling && !getOptions().scrollBar) {
          var translate3d = "translate3d(0px, -" + Math.round(v.dtop) + "px, 0px)";
          transformContainer(translate3d, true);
          if (getOptions().scrollingSpeed) {
            clearTimeout(g_afterSectionLoadsId);
            g_afterSectionLoadsId = setTimeout(function() {
              afterSectionLoads$1(v);
              setState({
                canScroll: !isFastSpeed || FP.test.isTesting
              });
            }, getOptions().scrollingSpeed);
          } else {
            afterSectionLoads$1(v);
          }
        } else {
          var scrollSettings = getScrollSettings(v.dtop);
          FP.test.top = -v.dtop + "px";
          clearTimeout(g_afterSectionLoadsId);
          scrollTo(scrollSettings.element, scrollSettings.options, getOptions().scrollingSpeed, function() {
            if (getOptions().scrollBar) {
              g_afterSectionLoadsId = setTimeout(function() {
                afterSectionLoads$1(v);
              }, 30);
            } else {
              afterSectionLoads$1(v);
              setState({
                canScroll: !isFastSpeed || FP.test.isTesting
              });
            }
          });
        }
        if (isFastSpeed) {
          clearTimeout(g_transitionLapseId);
          g_transitionLapseId = setTimeout(function() {
            setState({
              canScroll: true
            });
          }, transitionLapse);
        }
      }
      function afterSectionLoads$1(v) {
        setState({
          isBeyondFullpage: false
        });
        continuousVerticalFixSectionOrder(v);
        if (isFunction(getOptions().afterLoad) && !v.localIsResizing) {
          fireCallback("afterLoad", v);
        }
        updateState();
        if (!v.localIsResizing) {
          playMedia(v.element);
        }
        addClass(v.element, COMPLETELY);
        removeClass(siblings(v.element), COMPLETELY);
        lazyLoadOthers();
        setState({
          canScroll: true
        });
        EventEmitter.emit(events.afterSectionLoads, v);
        if (isFunction(v.callback)) {
          v.callback();
        }
      }
      FP.setFitToSection = setFitToSection;
      FP.fitToSection = fitToSection;
      function setFitToSection(value, type) {
        setVariableState("fitToSection", value, type);
      }
      function fitToSection() {
        if (state.canScroll && getOptions().fitToSection) {
          setState({
            isResizing: true
          });
          scrollPage(state.activeSection);
          setState({
            isResizing: false
          });
        }
      }
      FP.setResponsive = setResponsive;
      function responsive() {
        var widthLimit = getOptions().responsive || getOptions().responsiveWidth;
        var heightLimit = getOptions().responsiveHeight;
        var isBreakingPointWidth = widthLimit && win.innerWidth < widthLimit;
        var isBreakingPointHeight = heightLimit && win.innerHeight < heightLimit;
        if (widthLimit && heightLimit) {
          setResponsive(isBreakingPointWidth || isBreakingPointHeight);
        } else if (widthLimit) {
          setResponsive(isBreakingPointWidth);
        } else if (heightLimit) {
          setResponsive(isBreakingPointHeight);
        }
      }
      function setResponsive(active) {
        var isResponsive = isResponsiveMode();
        if (active) {
          if (!isResponsive) {
            setAutoScrolling(false, "internal");
            setFitToSection(false, "internal");
            hide($(SECTION_NAV_SEL));
            addClass($body, RESPONSIVE);
            if (isFunction(getOptions().afterResponsive)) {
              getOptions().afterResponsive.call(getContainer(), active);
            }
          }
        } else if (isResponsive) {
          setAutoScrolling(getOriginals().autoScrolling, "internal");
          setFitToSection(getOriginals().autoScrolling, "internal");
          show($(SECTION_NAV_SEL));
          removeClass($body, RESPONSIVE);
          if (isFunction(getOptions().afterResponsive)) {
            getOptions().afterResponsive.call(getContainer(), active);
          }
        }
      }
      function isResponsiveMode() {
        return hasClass($body, RESPONSIVE);
      }
      function addTableClass(element) {
        if (!getOptions().verticalCentered) {
          return;
        }
        if (!getOptions().scrollOverflow && scrollOverflowHandler.shouldBeScrollable(element.item)) {
          return;
        }
        if (!scrollOverflowHandler.isScrollable(element)) {
          if (!hasClass(element.item, TABLE)) {
            addClass(element.item, TABLE);
          }
        }
      }
      var startingSection = null;
      FP.getActiveSection = getActiveSection;
      function getStartingSection() {
        return startingSection;
      }
      function styleSection(section) {
        var sectionElem = section.item;
        var hasSlides = section.allSlidesItems.length;
        var index2 = section.index();
        if (!getState().activeSection && section.isVisible) {
          addClass(sectionElem, ACTIVE);
          updateState();
        }
        if (!startingSection && section.isVisible) {
          startingSection = getState().activeSection.item;
        }
        if (getOptions().paddingTop) {
          css(sectionElem, {
            "padding-top": getOptions().paddingTop
          });
        }
        if (getOptions().paddingBottom) {
          css(sectionElem, {
            "padding-bottom": getOptions().paddingBottom
          });
        }
        if (typeof getOptions().sectionsColor[index2] !== "undefined") {
          css(sectionElem, {
            "background-color": getOptions().sectionsColor[index2]
          });
        }
        if (typeof getOptions().anchors[index2] !== "undefined") {
          sectionElem.setAttribute("data-anchor", section.anchor);
        }
        if (!hasSlides) {
          addTableClass(section);
        }
      }
      function getActiveSection() {
        return getState().activeSection;
      }
      function getSectionFromPanel(panel) {
        return panel.isSection ? panel : panel.parent;
      }
      var g_focusScrollableId;
      EventEmitter.on(events.bindEvents, bindEvents$b);
      function bindEvents$b() {
        EventEmitter.on(events.onAfterRenderNoAnchor, afterRender);
        EventEmitter.on(events.onLeave, scrollOverflowHandler.onLeave);
        EventEmitter.on(events.onSlideLeave, scrollOverflowHandler.onLeave);
        EventEmitter.on(events.afterSlideLoads, scrollOverflowHandler.afterLoad);
        EventEmitter.on(events.afterSectionLoads, scrollOverflowHandler.afterLoad);
        EventEmitter.on(events.onDestroy, onDestroy$7);
        docAddEvent("keyup", scrollOverflowHandler.keyUpHandler);
      }
      function afterRender() {
        if (getOptions().scrollOverflow && !getOptions().scrollBar) {
          scrollOverflowHandler.makeScrollable();
          scrollOverflowHandler.focusScrollable();
        }
      }
      function onDestroy$7() {
        EventEmitter.removeListener(events.onAfterRenderNoAnchor, afterRender);
        docRemoveEvent("keyup", scrollOverflowHandler.keyUpHandler);
      }
      var scrollOverflowHandler = {
        focusedElem: null,
        shouldFocusScrollable: true,
        isInnerScrollAllowed: true,
        timeBeforeReachingLimit: null,
        timeLastScroll: null,
        preventScrollWithMouseWheel: function preventScrollWithMouseWheel(e) {
          var activeSection = getState().activeSection;
          if (!state.canScroll || isInsideIframe() && getOptions().scrollOverflow && scrollOverflowHandler.isScrollable(activeSection) && scrollOverflowHandler.isScrolled(getState().wheelDirection, activeSection.item)) {
            preventDefault(e);
            return false;
          }
        },
        preventScrollWithKeyboard: function preventScrollWithKeyboard(e) {
          if (!isInsideInput() && getOptions().keyboardScrolling) {
            var directionKeys = [38, 33, 32, 40, 34, 36, 35];
            if (directionKeys.indexOf(e.keyCode) > -1 && !scrollOverflowHandler.isInnerScrollAllowed) {
              preventDefault(e);
              return false;
            }
          }
        },
        keyUpHandler: function keyUpHandler2() {
          scrollOverflowHandler.shouldFocusScrollable = state.canScroll;
        },
        // Leaving sections or slides
        onLeave: function onLeave() {
          clearTimeout(g_focusScrollableId);
          scrollOverflowHandler.isInnerScrollAllowed = false;
        },
        // Loading sections or slides
        afterLoad: function afterLoad() {
          scrollOverflowHandler.isInnerScrollAllowed = false;
          clearTimeout(g_focusScrollableId);
          g_focusScrollableId = setTimeout(function() {
            scrollOverflowHandler.shouldFocusScrollable = state.canScroll;
          }, 200);
        },
        // Unfocusing the scrollable element from the orgin section/slide
        unfocusScrollable: function unfocusScrollable() {
          if (doc.activeElement === this.focusedElem) {
            this.focusedElem.blur();
            scrollOverflowHandler.isInnerScrollAllowed = false;
          }
        },
        focusScrollable: function focusScrollable() {
          if (!getOptions().scrollOverflow || !scrollOverflowHandler.shouldFocusScrollable) {
            return;
          }
          scrollOverflowHandler.unfocusScrollable();
          var scrollableItem = scrollOverflowHandler.getScrollableItem(getState().activeSection.item);
          if (scrollableItem && !isTouchDevice && !isTouch) {
            this.focusedElem = scrollableItem;
            requestAnimationFrame(function() {
              scrollableItem.focus({
                preventScroll: true
              });
              scrollOverflowHandler.isInnerScrollAllowed = true;
            });
          }
          scrollOverflowHandler.shouldFocusScrollable = false;
        },
        makeScrollable: function makeScrollable() {
          if (getOptions().scrollOverflowMacStyle && !isMacDevice) {
            addClass($body, "fp-scroll-mac");
          }
          getState().panels.forEach(function(el) {
            if (el.slides && el.slides.length) {
              return;
            }
            if (hasClass(el.item, AUTO_HEIGHT_RESPONSIVE) && isResponsiveMode()) {
              return;
            } else {
              var item = getSlideOrSection(el.item);
              var shouldBeScrollable = scrollOverflowHandler.shouldBeScrollable(el.item);
              var section = getSectionFromPanel(el);
              if (isIE11) {
                var toggleAction = shouldBeScrollable ? "addClass" : "removeClass";
                utils[toggleAction](section.item, IS_OVERFLOW);
                utils[toggleAction](el.item, IS_OVERFLOW);
              } else {
                addClass(section.item, IS_OVERFLOW);
                addClass(el.item, IS_OVERFLOW);
              }
              if (!el.hasScroll) {
                scrollOverflowHandler.createWrapper(item);
                scrollOverflowHandler.bindEvents(item);
              }
              el.hasScroll = true;
            }
          });
        },
        bindEvents: function bindEvents2(item) {
          var scrollable = scrollOverflowHandler.getScrollableItem(item);
          if (scrollable) {
            scrollable.addEventListener("scroll", scrollOverflowHandler.onPanelScroll);
          }
          item.addEventListener("wheel", scrollOverflowHandler.preventScrollWithMouseWheel, {
            passive: false
          });
          item.addEventListener("keydown", scrollOverflowHandler.preventScrollWithKeyboard, {
            passive: false
          });
        },
        unbindEvents: function unbindEvents2(item) {
          var scrollable = scrollOverflowHandler.getScrollableItem(item);
          if (scrollable) {
            scrollable.removeEventListener("scroll", scrollOverflowHandler.onPanelScroll);
          }
          item.removeEventListener("wheel", scrollOverflowHandler.preventScrollWithMouseWheel, {
            passive: false
          });
          item.removeEventListener("keydown", scrollOverflowHandler.preventScrollWithKeyboard, {
            passive: false
          });
        },
        createWrapper: function createWrapper(item) {
          var overflowWrapper = document.createElement("div");
          overflowWrapper.className = OVERFLOW;
          wrapInner(item, overflowWrapper);
          overflowWrapper.setAttribute("tabindex", "-1");
        },
        destroyScrollable: function destroyScrollable(panel) {
          if (panel.slides && panel.slides.length) {
            return;
          }
          if (panel.hasScroll) {
            scrollOverflowHandler.destroyWrapper(panel.item);
            scrollOverflowHandler.unbindEvents(panel.item);
            panel.hasScroll = false;
          }
        },
        destroyWrapper: function destroyWrapper(item) {
          var overflowWrapper = $(OVERFLOW_SEL, item)[0];
          if (overflowWrapper) {
            unwrap(overflowWrapper);
            item.removeAttribute("tabindex");
          }
        },
        getScrollableItem: function getScrollableItem(sectionItem) {
          var panel = getSlideOrSection(sectionItem);
          return $(OVERFLOW_SEL, panel)[0] || panel;
        },
        hasScroll: function hasScroll(panelItem) {
          return hasClass(panelItem, OVERFLOW) || $(OVERFLOW_SEL, panelItem)[0] != null;
        },
        isScrollable: function isScrollable(panel) {
          return panel.isSection && panel.activeSlide ? panel.activeSlide.hasScroll : panel.hasScroll;
        },
        shouldBeScrollable: function shouldBeScrollable(item) {
          var scrollable = scrollOverflowHandler.getScrollableItem(item);
          return scrollable.scrollHeight > win.innerHeight;
        },
        isScrolled: function isScrolled(direction, el) {
          if (!state.canScroll) {
            return false;
          }
          if (getOptions().scrollBar) {
            return true;
          }
          var scrollableItem = scrollOverflowHandler.getScrollableItem(el);
          if (!getOptions().scrollOverflow || !hasClass(scrollableItem, OVERFLOW) || // Checking the section first 
          // In case they apply to both section + slide #4505
          hasClass(el, "fp-noscroll") || // Checking the slide (in case it has)
          hasClass(getSlideOrSection(el), "fp-noscroll")) {
            return true;
          }
          var ie11offset = isIE11 ? 1 : 0;
          var positionY = scrollableItem.scrollTop;
          var isTopReached = direction === "up" && positionY <= 0;
          var isBottomReached = direction === "down" && scrollableItem.scrollHeight <= Math.ceil(scrollableItem.offsetHeight + positionY) + ie11offset;
          var isScrolled2 = isTopReached || isBottomReached;
          if (!isScrolled2 && direction !== "none") {
            this.timeBeforeReachingLimit = (/* @__PURE__ */ new Date()).getTime();
          }
          return isScrolled2;
        },
        shouldMovePage: function shouldMovePage() {
          this.timeLastScroll = (/* @__PURE__ */ new Date()).getTime();
          var timeDiff = this.timeLastScroll - scrollOverflowHandler.timeBeforeReachingLimit;
          var isUsingTouch = isTouchDevice || isTouch;
          var isGrabbing = isUsingTouch && state.isGrabbing;
          var isNotFirstTimeReachingLimit = state.isUsingWheel && timeDiff > 600;
          return isGrabbing && timeDiff > 400 || isNotFirstTimeReachingLimit;
        },
        onPanelScroll: /* @__PURE__ */ (function() {
          var prevPosition = 0;
          return function(e) {
            var currentPosition = e.target.scrollTop;
            var direction = state.touchDirection !== "none" ? state.touchDirection : prevPosition < currentPosition ? "down" : "up";
            prevPosition = currentPosition;
            if (isFunction(getOptions().onScrollOverflow)) {
              fireCallback("onScrollOverflow", {
                position: currentPosition,
                direction
              });
            }
            if (hasClass(e.target, OVERFLOW) && state.canScroll) {
              if (scrollOverflowHandler.isScrolled(direction, e.target) && scrollOverflowHandler.shouldMovePage()) {
                if (scrollOverflowHandler.shouldBeScrollable(getState().activeSection.item)) {
                  EventEmitter.emit(events.onScrollOverflowScrolled, {
                    direction
                  });
                }
              }
            }
          };
        })()
      };
      var g_afterSlideLoadsId;
      FP.landscapeScroll = landscapeScroll;
      EventEmitter.on(events.bindEvents, bindEvents$a);
      function bindEvents$a() {
        EventEmitter.on(events.onPerformMovement, onPerformMovement);
      }
      function onPerformMovement() {
        clearTimeout(g_afterSlideLoadsId);
        setState({
          slideMoving: false
        });
      }
      function landscapeScroll(slides, destiny, direction) {
        var sectionElem = closest(slides, SECTION_SEL);
        var section = getState().sections.filter(function(section2) {
          return section2.item == sectionElem;
        })[0];
        var slide = section.slides.filter(function(slide2) {
          return slide2.item == destiny;
        })[0];
        var v = {
          "slides": slides,
          "destiny": destiny,
          "direction": direction,
          "destinyPos": {
            "left": destiny.offsetLeft
          },
          "slideIndex": slide.index(),
          "section": sectionElem,
          "sectionIndex": section.index(),
          "anchorLink": section.anchor,
          "slidesNav": $(SLIDES_NAV_SEL, sectionElem)[0],
          "slideAnchor": slide.anchor,
          "prevSlide": section.activeSlide.item,
          "prevSlideIndex": section.activeSlide.index(),
          "items": {
            "section": section,
            "origin": section.activeSlide,
            "destination": slide
          },
          //caching the value of isResizing at the momment the function is called
          //because it will be checked later inside a setTimeout and the value might change
          "localIsResizing": state.isResizing
        };
        v.xMovement = getXmovement(v.prevSlideIndex, v.slideIndex);
        v.direction = v.direction ? v.direction : v.xMovement;
        if (!v.localIsResizing) {
          setState({
            canScroll: false
          });
        }
        if (getOptions().onSlideLeave) {
          if (!v.localIsResizing && v.xMovement !== "none") {
            if (isFunction(getOptions().onSlideLeave)) {
              if (fireCallback("onSlideLeave", v) === false) {
                setState({
                  slideMoving: false
                });
                return;
              }
            }
          }
        }
        addClass(destiny, ACTIVE);
        removeClass(siblings(destiny), ACTIVE);
        updateState();
        if (!v.localIsResizing) {
          stopMedia(v.prevSlide);
          lazyLoadPanels(slide);
        }
        toggleControlArrows(v);
        if (section.isActive && !v.localIsResizing) {
          setPageStatus(v.slideIndex, v.slideAnchor, v.anchorLink);
        }
        EventEmitter.emit(events.onSlideLeave, v);
        performHorizontalMove(slides, v, true);
      }
      function performHorizontalMove(slides, v, fireCallback2) {
        var destinyPos = v.destinyPos;
        activeSlidesNavigation(v.slidesNav, v.slideIndex);
        setState({
          scrollX: Math.round(destinyPos.left)
        });
        if (getOptions().css3) {
          var translate3d = "translate3d(-" + Math.round(destinyPos.left) + "px, 0px, 0px)";
          FP.test.translate3dH[v.sectionIndex] = translate3d;
          css(addAnimation($(SLIDES_CONTAINER_SEL, slides)), getTransforms(translate3d));
          clearTimeout(g_afterSlideLoadsId);
          g_afterSlideLoadsId = setTimeout(function() {
            if (fireCallback2) {
              afterSlideLoads(v);
            }
          }, getOptions().scrollingSpeed);
        } else {
          FP.test.left[v.sectionIndex] = Math.round(destinyPos.left);
          scrollTo(slides, Math.round(destinyPos.left), getOptions().scrollingSpeed, function() {
            if (fireCallback2) {
              afterSlideLoads(v);
            }
          });
        }
      }
      function getXmovement(fromIndex, toIndex) {
        if (fromIndex == toIndex) {
          return "none";
        }
        if (fromIndex > toIndex) {
          return "left";
        }
        return "right";
      }
      function onDestroy$6() {
        clearTimeout(g_afterSlideLoadsId);
      }
      function afterSlideLoads(v) {
        if (!v.localIsResizing) {
          if (isFunction(getOptions().afterSlideLoad)) {
            fireCallback("afterSlideLoad", v);
          }
          setState({
            canScroll: true
          });
          playMedia(v.destiny);
          EventEmitter.emit(events.afterSlideLoads, v);
        }
        setState({
          slideMoving: false
        });
      }
      function silentLandscapeScroll(activeSlide, noCallbacks) {
        setScrollingSpeed(0, "internal");
        if (typeof noCallbacks !== "undefined") {
          setState({
            isResizing: true
          });
        }
        landscapeScroll(closest(activeSlide, SLIDES_WRAPPER_SEL), activeSlide);
        if (typeof noCallbacks !== "undefined") {
          setState({
            isResizing: false
          });
        }
        setScrollingSpeed(getOriginals().scrollingSpeed, "internal");
      }
      var g_prevActiveSectionIndex = null;
      var g_prevActiveSlideIndex = null;
      EventEmitter.on(events.onDestroyAll, onDestroyAll);
      function onDestroyAll() {
        g_prevActiveSectionIndex = null;
        g_prevActiveSlideIndex = null;
      }
      function updateState() {
        state.activeSection = null;
        state.sections.map(function(section) {
          var isActive = hasClass(section.item, ACTIVE);
          section.isActive = isActive;
          section.hasScroll = scrollOverflowHandler.hasScroll(section.item);
          if (isActive) {
            state.activeSection = section;
          }
          if (section.slides.length) {
            section.activeSlide = null;
            section.slides.map(function(slide) {
              var isActiveSlide = hasClass(slide.item, ACTIVE);
              slide.hasScroll = scrollOverflowHandler.hasScroll(section.item);
              slide.isActive = isActiveSlide;
              if (isActiveSlide) {
                section.activeSlide = slide;
              }
            });
            if (!section.slides.find(function(slide) {
              return slide.isActive;
            })) {
              var defaultSlide = getOptions().rtl && section.slides.length > 0 ? section.slides[section.slides.length - 1] : section.slides[0];
              section.activeSlide = defaultSlide;
              if (section.activeSlide) {
                section.activeSlide.isActive = true;
              }
            }
          }
        });
        scrollToNewActivePanel();
      }
      function updateStructuralState() {
        var allSectionItems = $(getOptions().sectionSelector, getContainer());
        var sectionsItems = getVisible(allSectionItems);
        var allSections = Array.from(allSectionItems).map(function(item) {
          return new SectionPanel(item);
        });
        var sections = allSections.filter(function(item) {
          return item.isVisible;
        });
        var slides = sections.reduce(function(acc, section) {
          return acc.concat(section.slides);
        }, []);
        g_prevActiveSectionIndex = getPrevActivePanelIndex(state.activeSection);
        g_prevActiveSlideIndex = getPrevActivePanelIndex(state.activeSection ? state.activeSection.activeSlide : null);
        state.numSections = sectionsItems.length;
        state.numSlides = sections.reduce(function(acc, section) {
          return acc + section.slides.length;
        }, 0);
        state.sections = sections;
        state.sectionsIncludingHidden = allSections;
        state.slides = slides;
        state.panels = state.sections.concat(state.slides);
      }
      function getPrevActivePanelIndex(activePanel) {
        if (!activePanel) {
          return null;
        }
        var prevActivePanelItem = activePanel ? activePanel.item : null;
        var hiddenPanels = activePanel.isSection ? state.sectionsIncludingHidden : state.activeSection.slidesIncludingHidden;
        if (prevActivePanelItem) {
          var panel = getPanelByElement(hiddenPanels, prevActivePanelItem);
          return panel ? panel.index() : null;
        }
        return null;
      }
      function scrollToNewActivePanel() {
        var activeSection = state.activeSection;
        var activeSectionHasSlides = state.activeSection ? state.activeSection.slides.length : false;
        var activeSlide = state.activeSection ? state.activeSection.activeSlide : null;
        if (!activeSection && state.sections.length && !getState().isBeyondFullpage && g_prevActiveSectionIndex !== null) {
          var newActiveSection = getNewActivePanel(g_prevActiveSectionIndex, state.sections);
          if (newActiveSection) {
            state.activeSection = newActiveSection;
            state.activeSection.isActive = true;
            addClass(state.activeSection.item, ACTIVE);
          }
          if (state.activeSection) {
            silentScroll(state.activeSection.item.offsetTop);
          }
        }
        if (activeSectionHasSlides && !activeSlide && g_prevActiveSlideIndex !== null) {
          var newActiveSlide = getNewActivePanel(g_prevActiveSlideIndex, state.activeSection.slides);
          if (newActiveSlide) {
            state.activeSection.activeSlide = newActiveSlide;
            state.activeSection.activeSlide.isActive = true;
            addClass(state.activeSection.activeSlide.item, ACTIVE);
          }
          if (state.activeSection.activeSlide) {
            silentLandscapeScroll(state.activeSection.activeSlide.item, "internal");
          }
        }
      }
      function getNewActivePanel(prevActivePanelIndex, siblings2) {
        var newActiveSection;
        var prevIndex = prevActivePanelIndex - 1;
        var nextIndex = prevActivePanelIndex;
        do {
          newActiveSection = siblings2[prevIndex] || siblings2[nextIndex];
          if (newActiveSection) {
            break;
          }
          prevIndex = prevIndex - 1;
          nextIndex = nextIndex + 1;
        } while (prevIndex >= 0 || nextIndex < siblings2.length);
        return newActiveSection;
      }
      var SectionPanel = function SectionPanel2(el) {
        var _this = this;
        [].push.call(arguments, getOptions().sectionSelector);
        Item.apply(this, arguments);
        this.allSlidesItems = $(getOptions().slideSelector, el);
        this.slidesIncludingHidden = Array.from(this.allSlidesItems).map(function(item) {
          return new SlidePanel(item, _this);
        });
        this.slides = this.slidesIncludingHidden.filter(function(slidePanel) {
          return slidePanel.isVisible;
        });
        var defaultSlide = getOptions().rtl && this.slides.length > 0 ? this.slides[this.slides.length - 1] : this.slides.length > 0 ? this.slides[0] : null;
        this.activeSlide = this.slides.length ? this.slides.filter(function(slide) {
          return slide.isActive;
        })[0] || defaultSlide : null;
        if (this.activeSlide) {
          this.activeSlide.isActive = true;
        }
      };
      SectionPanel.prototype = Item.prototype;
      SectionPanel.prototype.constructor = SectionPanel;
      var SlidePanel = function SlidePanel2(el, section) {
        this.parent = section;
        Item.call(this, el, getOptions().slideSelector);
      };
      SlidePanel.prototype = Item.prototype;
      SlidePanel.prototype.constructor = SectionPanel;
      function addInternalSelectors() {
        addClass($(getOptions().sectionSelector, getContainer()), SECTION);
        addClass($(getOptions().slideSelector, getContainer()), SLIDE);
      }
      function styleSlides(section) {
        var numSlides = section.slides.length;
        var slidesElems = section.allSlidesItems;
        var slides = section.slides;
        var sliderWidth = numSlides * 100;
        var slideWidth = 100 / numSlides;
        if (!$(SLIDES_WRAPPER_SEL, section.item)[0]) {
          var slidesWrapper = doc.createElement("div");
          slidesWrapper.className = SLIDES_WRAPPER;
          wrapAll(slidesElems, slidesWrapper);
          var slidesContainer = doc.createElement("div");
          slidesContainer.className = SLIDES_CONTAINER;
          wrapAll(slidesElems, slidesContainer);
        }
        css($(SLIDES_CONTAINER_SEL, section.item), {
          "width": sliderWidth + "%"
        });
        if (numSlides > 1) {
          if (getOptions().controlArrows) {
            createSlideArrows(section);
          }
          if (getOptions().slidesNavigation) {
            addSlidesNavigation(section);
          }
        }
        slides.forEach(function(slide) {
          css(slide.item, {
            "width": slideWidth + "%"
          });
          if (getOptions().verticalCentered) {
            addTableClass(slide);
          }
        });
        var startingSlide = section.activeSlide || null;
        if (startingSlide != null && state.activeSection && (state.activeSection.index() !== 0 || state.activeSection.index() === 0 && startingSlide.index() !== 0)) {
          silentLandscapeScroll(startingSlide.item, "internal");
        } else {
          var defaultSlideIndex = getOptions().rtl && slidesElems.length > 0 ? slidesElems.length - 1 : 0;
          addClass(slidesElems[defaultSlideIndex], ACTIVE);
        }
      }
      var g_wrapperObserver;
      var g_wrapperObserveConfig = {
        attributes: false,
        subtree: true,
        childList: true,
        characterData: true
      };
      EventEmitter.on(events.bindEvents, bindEvents$9);
      EventEmitter.on(events.onDestroy, unbindEvents);
      FP["render"] = onContentChange;
      function bindEvents$9() {
        if (getOptions().observer && "MutationObserver" in window && $(WRAPPER_SEL)[0]) {
          g_wrapperObserver = createObserver($(WRAPPER_SEL)[0], onContentChange, g_wrapperObserveConfig);
        }
        EventEmitter.on(events.contentChanged, onContentChange);
      }
      function unbindEvents() {
        if (g_wrapperObserver) {
          g_wrapperObserver.disconnect();
          g_wrapperObserver = null;
        }
      }
      function createObserver(target, callback, config) {
        var observer = new MutationObserver(callback);
        observer.observe(target, config);
        return observer;
      }
      function didSlidesChange() {
        return getVisible($(getOptions().slideSelector, getContainer())).length !== getState().numSlides;
      }
      function didSectionsChange() {
        return getVisible($(getOptions().sectionSelector, getContainer())).length !== getState().numSections;
      }
      function didSectionsOrSlidesChange() {
        return didSlidesChange() || didSectionsChange();
      }
      function onContentChange(mutations) {
        var _didSlidesChange = didSlidesChange();
        if (didSectionsOrSlidesChange() && !state.isDoingContinousVertical) {
          if (getOptions().observer && g_wrapperObserver) {
            g_wrapperObserver.disconnect();
          }
          updateStructuralState();
          updateState();
          getOptions().anchors = [];
          remove($(SECTION_NAV_SEL));
          addInternalSelectors();
          setOptionsFromDOM();
          if (getOptions().navigation) {
            addVerticalNavigation();
          }
          if (getOptions().scrollOverflow) {
            scrollOverflowHandler.makeScrollable();
          }
          if (_didSlidesChange) {
            remove($(SLIDES_NAV_SEL));
            remove($(SLIDES_ARROW_SEL));
          }
          getState().sections.forEach(function(section) {
            if (section.slides.length) {
              if (_didSlidesChange) {
                styleSlides(section);
              }
            } else {
              styleSection(section);
            }
          });
        }
        if (getOptions().observer && g_wrapperObserver && $(WRAPPER_SEL)[0]) {
          g_wrapperObserver.observe($(WRAPPER_SEL)[0], g_wrapperObserveConfig);
        }
      }
      var supportsPassiveEvents = (function() {
        var g_supportsPassive = false;
        try {
          var opts = Object.defineProperty({}, "passive", {
            get: function get() {
              g_supportsPassive = true;
            }
          });
          windowAddEvent("testPassive", null, opts);
          windowRemoveEvent("testPassive", null, opts);
        } catch (e) {
        }
        return function() {
          return g_supportsPassive;
        };
      })();
      function getPassiveOptionsIfPossible() {
        return supportsPassiveEvents() ? {
          passive: false
        } : false;
      }
      var wheelDataHandler = (function() {
        var _prevTime = (/* @__PURE__ */ new Date()).getTime();
        var _scrollings = [];
        var isScrollingVertically;
        var direction;
        return {
          registerEvent: function registerEvent(e) {
            e = e || win.event;
            var value = e.wheelDelta || -e.deltaY || -e.detail;
            var delta = Math.max(-1, Math.min(1, value));
            var horizontalDetection = typeof e.wheelDeltaX !== "undefined" || typeof e.deltaX !== "undefined";
            isScrollingVertically = Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY) || !horizontalDetection;
            var curTime = (/* @__PURE__ */ new Date()).getTime();
            direction = delta < 0 ? "down" : "up";
            if (_scrollings.length > 149) {
              _scrollings.shift();
            }
            _scrollings.push(Math.abs(value));
            var timeDiff = curTime - _prevTime;
            _prevTime = curTime;
            if (timeDiff > 200) {
              _scrollings = [];
            }
          },
          isAccelerating: function isAccelerating2() {
            var averageEnd = getAverage(_scrollings, 10);
            var averageMiddle = getAverage(_scrollings, 70);
            var isAccelerating3 = averageEnd >= averageMiddle;
            return _scrollings.length ? isAccelerating3 && isScrollingVertically : false;
          },
          getDirection: function getDirection() {
            return direction;
          }
        };
      })();
      function scrollBeyondFullPage() {
        var dtop = getDestinationOffset();
        var scrollSettings = getScrollSettings(dtop);
        FP.test.top = -dtop + "px";
        setState({
          canScroll: false
        });
        scrollTo(scrollSettings.element, scrollSettings.options, getOptions().scrollingSpeed, function() {
          setTimeout(function() {
            setState({
              isBeyondFullpage: true
            });
            setState({
              canScroll: true
            });
          }, 30);
        });
      }
      function onKeyDown() {
        if (!isFullPageAbove()) {
          return;
        } else {
          scrollUpToFullpage();
        }
      }
      function scrollUpToFullpage() {
        var scrollSettings = getScrollSettings(getLast(getState().sections).item.offsetTop);
        setState({
          canScroll: false
        });
        scrollTo(scrollSettings.element, scrollSettings.options, getOptions().scrollingSpeed, function() {
          setState({
            canScroll: true
          });
          setState({
            isBeyondFullpage: false
          });
          setState({
            isAboutToScrollToFullPage: false
          });
        });
      }
      function getDestinationOffset() {
        if (!getOptions().css3) {
          return getLast(getState().sections).item.offsetTop + getLast(getState().sections).item.offsetHeight;
        }
        return getScrollTop() + getWindowHeight();
      }
      function beyondFullPageHandler(container2, e) {
        (/* @__PURE__ */ new Date()).getTime();
        var pauseScroll = getState().isBeyondFullpage && container2.getBoundingClientRect().bottom >= 0 && wheelDataHandler.getDirection() === "up";
        var g_isAboutToScrollToFullPage = getState().isAboutToScrollToFullPage;
        if (g_isAboutToScrollToFullPage) {
          preventDefault(e);
          return false;
        }
        if (getState().isBeyondFullpage) {
          if (!pauseScroll) {
            keyframeTime("set", "beyondFullpage", 1e3);
          } else {
            var shouldSetFixedPosition = !g_isAboutToScrollToFullPage && (!keyframeTime("isNewKeyframe", "beyondFullpage") || !wheelDataHandler.isAccelerating());
            var scrollSettings;
            if (shouldSetFixedPosition) {
              scrollSettings = getScrollSettings(getLast(getState().sections).item.offsetTop + getLast(getState().sections).item.offsetHeight);
              scrollSettings.element.scrollTo(0, scrollSettings.options);
              setState({
                isAboutToScrollToFullPage: false
              });
              preventDefault(e);
              return false;
            } else if (wheelDataHandler.isAccelerating()) {
              pauseScroll = false;
              setState({
                isAboutToScrollToFullPage: true
              });
              setState({
                scrollTrigger: "wheel"
              });
              scrollUpToFullpage();
              preventDefault(e);
              return false;
            }
          }
          if (!g_isAboutToScrollToFullPage) {
            if (!pauseScroll) {
              return true;
            }
          }
        }
      }
      var keyframeTime = /* @__PURE__ */ (function() {
        var isNew = false;
        var frames = {};
        var timeframes = {};
        return function(action, name, timeframe) {
          switch (action) {
            case "set":
              frames[name] = (/* @__PURE__ */ new Date()).getTime();
              timeframes[name] = timeframe;
              break;
            case "isNewKeyframe":
              var current = (/* @__PURE__ */ new Date()).getTime();
              isNew = current - frames[name] > timeframes[name];
              break;
          }
          return isNew;
        };
      })();
      FP.moveSectionDown = moveSectionDown;
      function moveSectionDown() {
        var next2 = getState().activeSection.next();
        if (!next2 && (getOptions().loopBottom || getOptions().continuousVertical)) {
          next2 = getState().sections[0];
        }
        if (next2 != null) {
          scrollPage(next2, null, false);
        } else if (hasContentBeyondFullPage()) {
          EventEmitter.emit(events.scrollBeyondFullpage);
        }
      }
      function hasContentBeyondFullPage() {
        return getContainer().scrollHeight < $body.scrollHeight && getOptions().scrollBar && getOptions().scrollBeyondFullpage;
      }
      FP.moveSectionUp = moveSectionUp;
      function moveSectionUp() {
        var prev2 = getState().activeSection.prev();
        if (!prev2 && (getOptions().loopTop || getOptions().continuousVertical)) {
          prev2 = getLast(getState().sections);
        }
        if (prev2 != null) {
          scrollPage(prev2, null, true);
        }
      }
      var oldPageY = 0;
      function mouseMoveHandler(e) {
        if (!getOptions().autoScrolling) {
          return;
        }
        if (state.canScroll) {
          if (e.pageY < oldPageY && getIsScrollAllowed().m.up) {
            moveSectionUp();
          } else if (e.pageY > oldPageY && getIsScrollAllowed().m.down) {
            moveSectionDown();
          }
        }
        oldPageY = e.pageY;
      }
      function setOldPageY(value) {
        oldPageY = value;
      }
      function scrolling(type) {
        if (!getIsScrollAllowed().m[type]) {
          return;
        }
        var scrollSection = type === "down" ? moveSectionDown : moveSectionUp;
        if (getOptions().scrollOverflow && scrollOverflowHandler.isScrollable(getState().activeSection)) {
          if (scrollOverflowHandler.isScrolled(type, getState().activeSection.item) && scrollOverflowHandler.shouldMovePage()) {
            scrollSection();
          }
        } else {
          scrollSection();
        }
      }
      var touchStartY = 0;
      var touchStartX = 0;
      var touchEndY = 0;
      var touchEndX = 0;
      var MSPointer = getMSPointer();
      var pointers = {
        touchmove: "ontouchmove" in window ? "touchmove" : MSPointer ? MSPointer.move : null,
        touchstart: "ontouchstart" in window ? "touchstart" : MSPointer ? MSPointer.down : null
      };
      function addTouchHandler() {
        if (!pointers.touchmove) {
          return;
        }
        if (isTouchDevice || isTouch) {
          if (getOptions().autoScrolling) {
            $body.removeEventListener(pointers.touchmove, preventBouncing, {
              passive: false
            });
            $body.addEventListener(pointers.touchmove, preventBouncing, {
              passive: false
            });
          }
          var touchWrapper = getOptions().touchWrapper;
          touchWrapper.removeEventListener(pointers.touchstart, touchStartHandler);
          touchWrapper.removeEventListener(pointers.touchmove, touchMoveHandler, {
            passive: false
          });
          touchWrapper.addEventListener(pointers.touchstart, touchStartHandler);
          touchWrapper.addEventListener(pointers.touchmove, touchMoveHandler, {
            passive: false
          });
        }
      }
      function removeTouchHandler() {
        if (!pointers.touchmove) {
          return;
        }
        if (isTouchDevice || isTouch) {
          if (getOptions().autoScrolling) {
            $body.removeEventListener(pointers.touchmove, touchMoveHandler, {
              passive: false
            });
            $body.removeEventListener(pointers.touchmove, preventBouncing, {
              passive: false
            });
          }
          var touchWrapper = getOptions().touchWrapper;
          touchWrapper.removeEventListener(pointers.touchstart, touchStartHandler);
          touchWrapper.removeEventListener(pointers.touchmove, touchMoveHandler, {
            passive: false
          });
        }
      }
      function touchMoveHandler(e) {
        var activeSection = closest(e.target, SECTION_SEL) || getState().activeSection.item;
        var hasActiveSectionOverflow = scrollOverflowHandler.isScrollable(getState().activeSection);
        if (isReallyTouch(e)) {
          setState({
            isGrabbing: true,
            isUsingWheel: false
          });
          if (getOptions().autoScrolling) {
            if (hasActiveSectionOverflow && !state.canScroll || getOptions().scrollBar) {
              preventDefault(e);
            }
          }
          var touchEvents = getEventsPage(e);
          touchEndY = touchEvents.y;
          touchEndX = touchEvents.x;
          var isVerticalMovementEnough = Math.abs(touchStartY - touchEndY) > win.innerHeight / 100 * getOptions().touchSensitivity;
          var isHorizontalMovementEnough = Math.abs(touchStartX - touchEndX) > getWindowWidth() / 100 * getOptions().touchSensitivity;
          var isHorizontalPredominantMove = $(SLIDES_WRAPPER_SEL, activeSection).length && Math.abs(touchStartX - touchEndX) > Math.abs(touchStartY - touchEndY);
          var directionH = touchStartX > touchEndX ? "right" : "left";
          var directionV = touchStartY > touchEndY ? "down" : "up";
          var direction = isHorizontalPredominantMove ? directionH : directionV;
          setState({
            touchDirection: direction
          });
          if (isHorizontalPredominantMove) {
            if (!state.slideMoving && isHorizontalMovementEnough) {
              if (touchStartX > touchEndX) {
                if (getIsScrollAllowed().m.right) {
                  EventEmitter.emit(events.moveSlideRight, {
                    section: activeSection
                  });
                }
              } else {
                if (getIsScrollAllowed().m.left) {
                  EventEmitter.emit(events.moveSlideLeft, {
                    section: activeSection
                  });
                }
              }
            }
          } else if (getOptions().autoScrolling && state.canScroll) {
            if (isVerticalMovementEnough) {
              scrolling(directionV);
            }
          }
        }
      }
      function isReallyTouch(e) {
        return typeof e.pointerType === "undefined" || e.pointerType != "mouse";
      }
      function touchStartHandler(e) {
        if (getOptions().fitToSection) {
          setState({
            activeAnimation: false
          });
        }
        if (isReallyTouch(e)) {
          var touchEvents = getEventsPage(e);
          touchStartY = touchEvents.y;
          touchStartX = touchEvents.x;
        }
        windowAddEvent("touchend", touchEndHandler);
      }
      function touchEndHandler() {
        windowRemoveEvent("touchend", touchEndHandler);
        setState({
          isGrabbing: false
        });
      }
      function getEventsPage(e) {
        var events2 = {};
        events2.y = typeof e.pageY !== "undefined" && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY;
        events2.x = typeof e.pageX !== "undefined" && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX;
        if (isTouch && isReallyTouch(e) && getOptions().scrollBar && typeof e.touches !== "undefined") {
          events2.y = e.touches[0].pageY;
          events2.x = e.touches[0].pageX;
        }
        return events2;
      }
      function getMSPointer() {
        var pointer;
        if (win.PointerEvent) {
          pointer = {
            down: "pointerdown",
            move: "pointermove"
          };
        }
        return pointer;
      }
      function preventBouncing(e) {
        if (getOptions().autoScrolling && isReallyTouch(e) && getIsScrollAllowed().m.up) {
          if (!state.canScroll) {
            preventDefault(e);
          }
        }
      }
      FP.moveSlideLeft = moveSlideLeft;
      FP.moveSlideRight = moveSlideRight;
      function moveSlide(direction, section) {
        var activeSectionItem = section == null ? getState().activeSection.item : section;
        var activeSection = getPanelByElement(state.sections, activeSectionItem);
        var slides = $(SLIDES_WRAPPER_SEL, activeSectionItem)[0];
        if (slides == null || state.slideMoving || activeSection.slides.length < 2) {
          return;
        }
        var currentSlide = activeSection.activeSlide;
        var destiny = direction === "left" ? currentSlide.prev() : currentSlide.next();
        if (!destiny) {
          if (!getOptions().loopHorizontal) return;
          destiny = direction === "left" ? getLast(activeSection.slides) : activeSection.slides[0];
        }
        setState({
          slideMoving: !FP.test.isTesting
        });
        landscapeScroll(slides, destiny.item, direction);
      }
      function moveSlideLeft(section) {
        moveSlide("left", section);
      }
      function moveSlideRight(section) {
        moveSlide("right", section);
      }
      function getSectionByAnchor(sectionAnchor) {
        var section = getState().sections.filter(function(section2) {
          return section2.anchor === sectionAnchor;
        })[0];
        if (!section) {
          var sectionIndex = typeof sectionAnchor !== "undefined" ? sectionAnchor - 1 : 0;
          section = getState().sections[sectionIndex];
        }
        return section;
      }
      function scrollSlider(slideElem) {
        if (slideElem != null) {
          landscapeScroll(closest(slideElem, SLIDES_WRAPPER_SEL), slideElem);
        }
      }
      function scrollPageAndSlide(sectionAnchor, slideAnchor) {
        var section = getSectionByAnchor(sectionAnchor);
        if (section == null) return;
        var slideElem = getSlideByAnchor(slideAnchor, section);
        if ((!section.anchor || section.anchor !== state.lastScrolledDestiny) && !hasClass(section.item, ACTIVE)) {
          scrollPage(section, function() {
            scrollSlider(slideElem);
          });
        } else {
          scrollSlider(slideElem);
        }
      }
      function getSlideByAnchor(slideAnchor, section) {
        var slide = section.slides.filter(function(slide2) {
          return slide2.anchor === slideAnchor;
        })[0];
        if (slide == null) {
          slideAnchor = typeof slideAnchor !== "undefined" ? slideAnchor : 0;
          slide = section.slides[slideAnchor];
        }
        return slide ? slide.item : null;
      }
      FP.moveTo = moveTo$1;
      function moveTo$1(sectionAnchor, slideAnchor) {
        var destiny = getSectionByAnchor(sectionAnchor);
        if (typeof slideAnchor !== "undefined") {
          scrollPageAndSlide(sectionAnchor, slideAnchor);
        } else if (destiny != null) {
          scrollPage(destiny);
        }
      }
      var g_controlPressed;
      var g_keydownId;
      var g_elToFocus;
      EventEmitter.on(events.bindEvents, bindEvents$8);
      function bindEvents$8() {
        windowAddEvent("blur", blurHandler);
        docAddEvent("keydown", keydownHandler);
        docAddEvent("keyup", keyUpHandler);
        EventEmitter.on(events.onDestroy, onDestroy$5);
        EventEmitter.on(events.afterSlideLoads, onAfterSlideLoads);
        EventEmitter.on(events.afterSectionLoads, afterSectionLoads);
      }
      function onDestroy$5() {
        clearTimeout(g_keydownId);
        docRemoveEvent("keydown", keydownHandler);
        docRemoveEvent("keyup", keyUpHandler);
      }
      function keydownHandler(e) {
        clearTimeout(g_keydownId);
        var keyCode = e.keyCode;
        var isPressingHorizontalArrows = [37, 39].indexOf(keyCode) > -1;
        var canScrollWithKeyboard = getOptions().autoScrolling || getOptions().fitToSection || isPressingHorizontalArrows;
        if (keyCode === 9) {
          onTab(e);
        } else if (!isInsideInput() && getOptions().keyboardScrolling && canScrollWithKeyboard) {
          g_controlPressed = e.ctrlKey;
          g_keydownId = setTimeout(function() {
            onkeydown(e);
          }, 0);
        }
      }
      function onkeydown(e) {
        var shiftPressed = e.shiftKey;
        var activeElement = doc.activeElement;
        var isMediaFocused = matches(activeElement, "video") || matches(activeElement, "audio");
        var isScrolled = {
          up: scrollOverflowHandler.isScrolled("up", getState().activeSection.item),
          down: scrollOverflowHandler.isScrolled("down", getState().activeSection.item)
        };
        var isUsingHorizontalArrowKeys = [37, 39].indexOf(e.keyCode) > -1;
        cancelDirectionKeyEvents(e);
        if (!state.canScroll && !isUsingHorizontalArrowKeys) {
          return;
        }
        setState({
          scrollTrigger: "keydown"
        });
        switch (e.keyCode) {
          //up
          case 38:
          case 33:
            if (getIsScrollAllowed().k.up && isScrolled.up) {
              if (state.isBeyondFullpage) {
                EventEmitter.emit(events.onKeyDown, {
                  e
                });
              } else {
                moveSectionUp();
              }
            } else {
              scrollOverflowHandler.focusScrollable();
            }
            break;
          //down
          case 32:
            if (shiftPressed && getIsScrollAllowed().k.up && !isMediaFocused && isScrolled.up) {
              moveSectionUp();
              break;
            }
          /* falls through */
          case 40:
          case 34:
            if (getIsScrollAllowed().k.down && isScrolled.down) {
              if (state.isBeyondFullpage) {
                return;
              }
              if (e.keyCode !== 32 || !isMediaFocused) {
                moveSectionDown();
              }
            } else {
              scrollOverflowHandler.focusScrollable();
            }
            break;
          //Home
          case 36:
            if (getIsScrollAllowed().k.up) {
              moveTo$1(1);
            }
            break;
          //End
          case 35:
            if (getIsScrollAllowed().k.down) {
              moveTo$1(getState().sections.length);
            }
            break;
          //left
          case 37:
            if (getIsScrollAllowed().k.left) {
              if (getOptions().rtl) {
                moveSlideRight();
              } else {
                moveSlideLeft();
              }
            }
            break;
          //right
          case 39:
            if (getIsScrollAllowed().k.right) {
              if (getOptions().rtl) {
                moveSlideLeft();
              } else {
                moveSlideRight();
              }
            }
            break;
          default:
            return;
        }
      }
      function keyUpHandler(e) {
        if (state.isWindowFocused) {
          g_controlPressed = e.ctrlKey;
        }
      }
      function blurHandler() {
        setState({
          isWindowFocused: false
        });
        g_controlPressed = false;
      }
      function onTab(e) {
        var isShiftPressed = e.shiftKey;
        var activeElement = doc.activeElement;
        var focusableElements = getFocusables(getSlideOrSection(getState().activeSection.item));
        function preventAndFocusFirst(e2) {
          preventDefault(e2);
          return focusableElements[0] ? focusableElements[0].focus() : null;
        }
        if (!state.canScroll) {
          preventDefault(e);
          return;
        }
        if (isFocusOutside(e)) {
          return;
        }
        if (activeElement) {
          if (closest(activeElement, SECTION_ACTIVE_SEL + "," + SECTION_ACTIVE_SEL + " " + SLIDE_ACTIVE_SEL) == null) {
            activeElement = preventAndFocusFirst(e);
          }
        } else {
          preventAndFocusFirst(e);
        }
        var isFirstFocusableInSection = activeElement == focusableElements[0];
        var isLastFocusableInSection = activeElement == focusableElements[focusableElements.length - 1];
        var isNextItem = !isShiftPressed && isLastFocusableInSection;
        var isPrevItem = isShiftPressed && isFirstFocusableInSection;
        if (isPrevItem || isNextItem) {
          preventDefault(e);
          var focusInfo = getPanelWithFocusable(isPrevItem);
          var destinationPanel = focusInfo ? focusInfo.panel : null;
          if (destinationPanel) {
            var destinationSection = destinationPanel.isSection ? destinationPanel : destinationPanel.parent;
            EventEmitter.emit(events.onScrollPageAndSlide, {
              sectionAnchor: destinationSection.index() + 1,
              slideAnchor: destinationPanel.isSection ? 0 : destinationPanel.index()
            });
            g_elToFocus = focusInfo.itemToFocus;
            preventDefault(e);
          }
        }
      }
      function onAfterSlideLoads(v) {
        focusItem();
      }
      function afterSectionLoads(v) {
        if (!closest(g_elToFocus, SLIDE_SEL) || closest(g_elToFocus, SLIDE_ACTIVE_SEL)) {
          focusItem();
        }
      }
      function focusItem() {
        if (g_elToFocus) {
          g_elToFocus.focus();
          g_elToFocus = null;
        }
      }
      function getPanelWithFocusable(isPrevItem) {
        var action = isPrevItem ? "prevPanel" : "nextPanel";
        var focusableElements = [];
        var panelWithFocusables;
        var currentPanel = getSlideOrSectionPanel(getActivePanel()[action]());
        do {
          focusableElements = getFocusables(currentPanel.item);
          if (focusableElements.length) {
            panelWithFocusables = {
              panel: currentPanel,
              itemToFocus: focusableElements[isPrevItem ? focusableElements.length - 1 : 0]
            };
          }
          currentPanel = getSlideOrSectionPanel(currentPanel[action]());
        } while (currentPanel && focusableElements.length === 0);
        return panelWithFocusables;
      }
      function getFocusables(el) {
        return [].slice.call($(focusableElementsString, el)).filter(function(item) {
          return getAttr(item, "tabindex") !== "-1" && //are also not hidden elements (or with hidden parents)
          item.offsetParent !== null;
        });
      }
      function isFocusOutside(e) {
        var allFocusables = getFocusables(doc);
        var currentFocusIndex = allFocusables.indexOf(doc.activeElement);
        var focusDestinationIndex = e.shiftKey ? currentFocusIndex - 1 : currentFocusIndex + 1;
        var focusDestination = allFocusables[focusDestinationIndex];
        var destinationItemSlide = closest(focusDestination, SLIDE_SEL);
        var destinationItemSection = closest(focusDestination, SECTION_SEL);
        return !destinationItemSlide && !destinationItemSection;
      }
      function shouldCancelKeyboardNavigation(e) {
        var keyControls = [40, 38, 32, 33, 34];
        return keyControls.indexOf(e.keyCode) > -1 && !state.isBeyondFullpage;
      }
      function cancelDirectionKeyEvents(e) {
        if (shouldCancelKeyboardNavigation(e) && !closest(e.target, OVERFLOW_SEL)) {
          e.preventDefault();
        }
      }
      function getControlPressed() {
        return g_controlPressed;
      }
      var prevTime = (/* @__PURE__ */ new Date()).getTime();
      var prevHorizontalTime = (/* @__PURE__ */ new Date()).getTime();
      var scrollings = [];
      var horizontalScrollings = [];
      FP.setMouseWheelScrolling = setMouseWheelScrolling;
      function setMouseWheelScrolling(value) {
        if (value) {
          addMouseWheelHandler();
          addMiddleWheelHandler();
        } else {
          removeMouseWheelHandler();
          removeMiddleWheelHandler();
        }
      }
      function addMouseWheelHandler() {
        var prefix = "";
        var _addEventListener;
        if (win.addEventListener) {
          _addEventListener = "addEventListener";
        } else {
          _addEventListener = "attachEvent";
          prefix = "on";
        }
        var support = "onwheel" in doc.createElement("div") ? "wheel" : (
          // Modern browsers support "wheel"
          // @ts-ignore
          doc.onmousewheel !== void 0 ? "mousewheel" : (
            // Webkit and IE support at least "mousewheel"
            "DOMMouseScroll"
          )
        );
        var passiveEvent = getPassiveOptionsIfPossible();
        if (support == "DOMMouseScroll") {
          doc[_addEventListener](prefix + "MozMousePixelScroll", MouseWheelHandler, passiveEvent);
        } else {
          doc[_addEventListener](prefix + support, MouseWheelHandler, passiveEvent);
        }
      }
      function addMiddleWheelHandler() {
        getContainer().addEventListener("mousedown", mouseDownHandler);
        getContainer().addEventListener("mouseup", mouseUpHandler);
      }
      function removeMouseWheelHandler() {
        if (doc.addEventListener) {
          docRemoveEvent("mousewheel", MouseWheelHandler, false);
          docRemoveEvent("wheel", MouseWheelHandler, false);
          docRemoveEvent("MozMousePixelScroll", MouseWheelHandler, false);
        } else {
          doc.detachEvent("onmousewheel", MouseWheelHandler);
        }
      }
      function removeMiddleWheelHandler() {
        getContainer().removeEventListener("mousedown", mouseDownHandler);
        getContainer().removeEventListener("mouseup", mouseUpHandler);
      }
      function isAccelerating(scrollings2) {
        var averageEnd = getAverage(scrollings2, 10);
        var averageMiddle = getAverage(scrollings2, 70);
        return averageEnd >= averageMiddle;
      }
      function MouseWheelHandler(e) {
        var curTime = (/* @__PURE__ */ new Date()).getTime();
        var isNormalScroll = hasClass($(COMPLETELY_SEL)[0], NORMAL_SCROLL);
        var isScrollAllowedBeyondFullPage = beyondFullPageHandler(getContainer(), e);
        if (!state.isUsingWheel) {
          setState({
            isGrabbing: false,
            isUsingWheel: true,
            touchDirection: "none"
          });
        }
        if (isScrollAllowedBeyondFullPage) {
          return true;
        } else if (isScrollAllowedBeyondFullPage === false) {
          preventDefault(e);
          return false;
        }
        if (getOptions().autoScrolling && !getControlPressed() && !isNormalScroll) {
          e = e || win.event;
          var value = e.wheelDelta || -e.deltaY || -e.detail;
          var delta = Math.max(-1, Math.min(1, value));
          var horizontalValue = e.wheelDeltaX || -e.deltaX || 0;
          var deltaY = e.deltaY || 0;
          var deltaX = e.deltaX || 0;
          var isShiftPressed = e.shiftKey || false;
          var horizontalDetection = Math.abs(horizontalValue) > 0 || Math.abs(deltaX) > 0;
          var isScrollingVertically = !isShiftPressed && (Math.abs(deltaX) < Math.abs(deltaY) || !horizontalDetection);
          var isScrollingHorizontally = isShiftPressed || !isScrollingVertically && horizontalDetection && Math.abs(deltaX) > Math.abs(deltaY);
          var direction = delta < 0 ? "down" : delta > 0 ? "up" : "none";
          var horizontalDelta = isShiftPressed ? delta : Math.max(-1, Math.min(1, horizontalValue));
          var horizontalDirection = isScrollingHorizontally ? horizontalDelta < 0 ? "right" : horizontalDelta > 0 ? "left" : "none" : "none";
          if (isScrollingVertically && !getIsScrollAllowed().m.down && !getIsScrollAllowed().m.up) {
            return false;
          }
          if (isScrollingHorizontally && horizontalDirection === "left" && !getIsScrollAllowed().m.left) {
            return false;
          }
          if (isScrollingHorizontally && horizontalDirection === "right" && !getIsScrollAllowed().m.right) {
            return false;
          }
          if (scrollings.length > 149) {
            scrollings.shift();
          }
          if (horizontalScrollings.length > 149) {
            horizontalScrollings.shift();
          }
          if (isScrollingVertically) {
            scrollings.push(Math.abs(value));
          } else if (isScrollingHorizontally) {
            var horizontalScrollValue = isShiftPressed ? Math.abs(value) : Math.abs(horizontalValue);
            horizontalScrollings.push(horizontalScrollValue);
          }
          if (getOptions().scrollBar || !getOptions().scrollOverflow) {
            preventDefault(e);
          }
          var timeDiff = curTime - prevTime;
          var horizontalTimeDiff = curTime - prevHorizontalTime;
          if (isScrollingVertically) {
            prevTime = curTime;
          } else if (isScrollingHorizontally) {
            prevHorizontalTime = curTime;
          }
          if (timeDiff > 200) {
            scrollings = [];
          }
          if (horizontalTimeDiff > 200) {
            horizontalScrollings = [];
          }
          setState({
            wheelDirection: direction
          });
          if (state.canScroll) {
            if (isScrollingVertically && isAccelerating(scrollings)) {
              setState({
                scrollTrigger: "wheel"
              });
              if (delta < 0) {
                scrolling("down");
              } else {
                scrolling("up");
              }
            } else if (isScrollingHorizontally && (isShiftPressed || isAccelerating(horizontalScrollings))) {
              setState({
                scrollTrigger: "wheel"
              });
              if (horizontalDirection === "left") {
                moveSlideLeft();
              } else if (horizontalDirection === "right") {
                moveSlideRight();
              }
            }
          }
          return false;
        }
        if (getOptions().fitToSection) {
          setState({
            activeAnimation: false
          });
        }
      }
      function mouseDownHandler(e) {
        if (e.which == 2) {
          setOldPageY(e.pageY);
          getContainer().addEventListener("mousemove", mouseMoveHandler);
        }
      }
      function mouseUpHandler(e) {
        if (e.which == 2) {
          getContainer().removeEventListener("mousemove", mouseMoveHandler);
        }
      }
      function setMouseHijack(value) {
        if (value) {
          setMouseWheelScrolling(true);
          addTouchHandler();
        } else {
          setMouseWheelScrolling(false);
          removeTouchHandler();
        }
      }
      var g_canFireMouseEnterNormalScroll = true;
      EventEmitter.on(events.bindEvents, bindEvents$7);
      function bindEvents$7() {
        if (getOptions().normalScrollElements) {
          ["mouseenter", "touchstart"].forEach(function(eventName) {
            forMouseLeaveOrTouch(eventName, false);
          });
          ["mouseleave", "touchend"].forEach(function(eventName) {
            forMouseLeaveOrTouch(eventName, true);
          });
        }
        EventEmitter.on(events.onDestroy, onDestroy$4);
      }
      function onDestroy$4() {
        ["mouseenter", "touchstart", "mouseleave", "touchend"].forEach(function(eventName) {
          docRemoveEvent(eventName, onMouseEnterOrLeave, true);
        });
      }
      function forMouseLeaveOrTouch(eventName, allowScrolling) {
        document["fp_" + eventName] = allowScrolling;
        docAddEvent(eventName, onMouseEnterOrLeave, true);
      }
      function onMouseEnterOrLeave(e) {
        var type = e.type;
        var isInsideOneNormalScroll = false;
        var target = type === "mouseleave" ? e.toElement || e.relatedTarget : e.target;
        if (target == document || !target) {
          setMouseHijack(true);
          return;
        }
        if (type === "touchend") {
          g_canFireMouseEnterNormalScroll = false;
          setTimeout(function() {
            g_canFireMouseEnterNormalScroll = true;
          }, 800);
        }
        if (type === "mouseenter" && !g_canFireMouseEnterNormalScroll) {
          return;
        }
        var normalSelectors = getOptions().normalScrollElements.split(",");
        normalSelectors.forEach(function(normalSelector) {
          if (!isInsideOneNormalScroll) {
            var isNormalScrollTarget = matches(target, normalSelector);
            var isNormalScrollChildFocused = closest(target, normalSelector);
            if (isNormalScrollTarget || isNormalScrollChildFocused) {
              if (!FP.shared.isNormalScrollElement) {
                setMouseHijack(false);
              }
              FP.shared.isNormalScrollElement = true;
              isInsideOneNormalScroll = true;
            }
          }
        });
        if (!isInsideOneNormalScroll && FP.shared.isNormalScrollElement) {
          setMouseHijack(true);
          FP.shared.isNormalScrollElement = false;
        }
      }
      FP.silentMoveTo = silentMoveTo;
      function silentMoveTo(sectionAnchor, slideAnchor) {
        setScrollingSpeed(0, "internal");
        moveTo$1(sectionAnchor, slideAnchor);
        setScrollingSpeed(getOriginals().scrollingSpeed, "internal");
      }
      var previousHeight = getWindowHeight();
      var windowsWidth = getWindowWidth();
      var g_resizeId;
      var g_isConsecutiveResize = false;
      var g_resizeMobileHandlerId;
      FP.reBuild = reBuild;
      EventEmitter.on(events.bindEvents, bindEvents$6);
      function bindEvents$6() {
        resizeHandler();
        windowAddEvent("resize", resizeHandler);
        EventEmitter.on(events.onDestroy, onDestroy$3);
      }
      function onDestroy$3() {
        clearTimeout(g_resizeId);
        clearTimeout(g_resizeMobileHandlerId);
        windowRemoveEvent("resize", resizeHandler);
      }
      function resizeHandler() {
        if (!g_isConsecutiveResize) {
          if (getOptions().autoScrolling && !getOptions().scrollBar || !getOptions().fitToSection) {
            setSectionsHeight(getWindowHeight());
          }
        }
        if (state.isFullpageInitDone) {
          fitToActiveSection();
        }
        g_isConsecutiveResize = true;
        clearTimeout(g_resizeId);
        g_resizeId = setTimeout(function() {
          resizeActions();
          g_isConsecutiveResize = false;
        }, 400);
      }
      function fitToActiveSection() {
        if (isTouchDevice) {
          for (var i = 0; i < 4; i++) {
            g_resizeMobileHandlerId = setTimeout(function() {
              window.requestAnimationFrame(function() {
                if (getOptions().autoScrolling && !getOptions().scrollBar) {
                  setState({
                    isResizing: true
                  });
                  silentMoveTo(state.activeSection.index() + 1);
                  setState({
                    isResizing: false
                  });
                }
              });
            }, 200 * i);
          }
        }
      }
      function shouldSetVhUnits() {
        return !state.isBeyondFullpage && !getOptions().autoScrolling;
      }
      function resizeActions() {
        setState({
          isResizing: true
        });
        if (!isTouchDevice || getOptions().adjustOnNavChange) {
          setSectionsHeight("");
          if (shouldSetVhUnits()) {
            setVhUnits();
          }
        }
        EventEmitter.emit(events.contentChanged);
        updateState();
        responsive();
        if (isTouchDevice) {
          var activeElement = doc.activeElement;
          if (!matches(activeElement, "textarea") && !matches(activeElement, "input") && !matches(activeElement, "select")) {
            var currentHeight = getWindowHeight();
            if (Math.abs(currentHeight - previousHeight) > 20 * Math.max(previousHeight, currentHeight) / 100) {
              reBuild(true);
              previousHeight = currentHeight;
            }
          }
        } else {
          adjustToNewViewport();
        }
        setState({
          isResizing: false
        });
      }
      function reBuild(resizing) {
        if (hasClass(getContainer(), DESTROYED)) {
          return;
        }
        setState({
          isResizing: true,
          windowsHeight: getWindowHeight(),
          windowsWidth: getWindowWidth()
        });
        var sections = getState().sections;
        for (var i = 0; i < sections.length; ++i) {
          var section = sections[i];
          var slidesWrap = $(SLIDES_WRAPPER_SEL, section.item)[0];
          var slides = section.slides;
          if (slides.length > 1) {
            landscapeScroll(slidesWrap, section.activeSlide.item);
          }
        }
        if (getOptions().scrollOverflow) {
          scrollOverflowHandler.makeScrollable();
        }
        var sectionIndex = getState().activeSection.index();
        if (!state.isBeyondFullpage) {
          if (sectionIndex) {
            silentMoveTo(sectionIndex + 1);
          }
        }
        setState({
          isResizing: false
        });
        if (isFunction(getOptions().afterResize) && resizing) {
          getOptions().afterResize.call(getContainer(), win.innerWidth, win.innerHeight);
        }
        if (isFunction(getOptions().afterReBuild) && !resizing) {
          getOptions().afterReBuild.call(getContainer());
        }
        trigger(getContainer(), "afterRebuild");
      }
      function adjustToNewViewport() {
        var newWindowHeight = getWindowHeight();
        var newWindowWidth = getWindowWidth();
        if (state.windowsHeight !== newWindowHeight || windowsWidth !== newWindowWidth) {
          setState({
            windowsHeight: newWindowHeight
          });
          windowsWidth = newWindowWidth;
          reBuild(true);
        }
      }
      function setSectionsHeight(value) {
        var propertyValue = value === "" ? "" : value + "px";
        getState().sections.forEach(function(section) {
          css(section.item, {
            "height": propertyValue
          });
        });
      }
      function setVhUnits() {
        var vh = win.innerHeight * 0.01;
        doc.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
      }
      function getAnchorsURL() {
        var section;
        var slide;
        var hash = win.location.hash;
        if (hash.length) {
          var anchorsParts = hash.replace("#", "").split("/");
          var isFunkyAnchor = hash.indexOf("#/") > -1;
          section = isFunkyAnchor ? "/" + anchorsParts[1] : decodeURIComponent(anchorsParts[0]);
          var slideAnchor = isFunkyAnchor ? anchorsParts[2] : anchorsParts[1];
          if (slideAnchor && slideAnchor.length) {
            slide = decodeURIComponent(slideAnchor);
          }
        }
        return {
          section,
          slide
        };
      }
      FP.setLockAnchors = setLockAnchors;
      EventEmitter.on(events.bindEvents, bindEvents$5);
      function bindEvents$5() {
        windowAddEvent("hashchange", hashChangeHandler);
        docAddEvent("click", anchorLinkClickHandler);
        EventEmitter.on(events.onDestroy, onDestroy$2);
      }
      function onDestroy$2() {
        windowRemoveEvent("hashchange", hashChangeHandler);
        docRemoveEvent("click", anchorLinkClickHandler);
      }
      function setLockAnchors(value) {
        getOptions().lockAnchors = value;
      }
      function hashChangeHandler() {
        if (!state.isScrolling && !getOptions().lockAnchors) {
          var anchors = getAnchorsURL();
          var sectionAnchor = anchors.section;
          var slideAnchor = anchors.slide;
          var isFirstSlideMove = typeof state.lastScrolledDestiny === "undefined";
          var isFirstScrollMove = typeof state.lastScrolledDestiny === "undefined" && typeof slideAnchor === "undefined" && !state.slideMoving;
          if (sectionAnchor && sectionAnchor.length) {
            if (sectionAnchor && sectionAnchor !== state.lastScrolledDestiny && !isFirstSlideMove || isFirstScrollMove || !state.slideMoving && state.lastScrolledSlide != slideAnchor) {
              EventEmitter.emit(events.onScrollPageAndSlide, {
                sectionAnchor,
                slideAnchor
              });
            }
          }
        }
      }
      function anchorLinkClickHandler(e) {
        var target = e.target;
        var link = closest(target, 'a[href^="#"]');
        if (!link) return;
        var href = getAttr(link, "href");
        if (!href || href === "#") return;
        var targetElement = $(href)[0];
        if (!targetElement) return;
        var container2 = getContainer();
        if (!container2 || !container2.contains(targetElement)) {
          return;
        }
        var sectionEl = closest(targetElement, getOptions().sectionSelector);
        if (!sectionEl) {
          return;
        }
        var section = getPanelByElement(state.sections, sectionEl);
        if (!section) {
          return;
        }
        var slideEl = closest(targetElement, getOptions().slideSelector);
        var slide = slideEl && sectionEl.contains(slideEl) ? getPanelByElement(section.slides, slideEl) : null;
        preventDefault(e);
        moveTo$1(section.index() + 1, slide ? slide.index() : null);
        var scrollable = $(OVERFLOW_SEL, slide ? slide.item : section.item)[0];
        if (scrollable) {
          scrollable.scrollTo(0, targetElement.offsetTop);
        }
      }
      EventEmitter.on(events.bindEvents, bindEvents$4);
      function bindEvents$4() {
        docAddEvent("wheel", wheelDataHandler.registerEvent, getPassiveOptionsIfPossible());
        EventEmitter.on(events.scrollBeyondFullpage, scrollBeyondFullPage);
        EventEmitter.on(events.onKeyDown, onKeyDown);
      }
      EventEmitter.on(events.bindEvents, bindEvents$3);
      function bindEvents$3() {
        EventEmitter.on(events.onClickOrTouch, onClickOrTouch$1);
      }
      function onClickOrTouch$1(params) {
        var target = params.target;
        if (closest(target, getOptions().menu + " [data-menuanchor]")) {
          menuItemsHandler.call(target, params.e);
        }
      }
      function menuItemsHandler(e) {
        setState({
          scrollTrigger: "menu"
        });
        if ($(getOptions().menu)[0] && (getOptions().lockAnchors || !getOptions().anchors.length)) {
          preventDefault(e);
          var menuAnchorEl = closest(this, "[data-menuanchor]");
          EventEmitter.emit(events.onMenuClick, {
            anchor: getAttr(menuAnchorEl, "data-menuanchor")
          });
        }
      }
      EventEmitter.on(events.bindEvents, bindEvents$2);
      function bindEvents$2() {
        EventEmitter.on(events.onClickOrTouch, onClickOrTouch);
      }
      function onClickOrTouch(params) {
        var target = params.target;
        if (target && closest(target, SECTION_NAV_SEL + " a")) {
          sectionBulletHandler.call(target, params.e);
        } else if (matches(target, SECTION_NAV_TOOLTIP_SEL)) {
          tooltipTextHandler.call(target);
        } else if (matches(target, SLIDES_NAV_LINK_SEL) || closest(target, SLIDES_NAV_LINK_SEL) != null) {
          slideBulletHandler.call(target, params.e);
        }
      }
      var lastScroll = 0;
      var g_scrollId;
      var g_scrollId2;
      EventEmitter.on(events.onDestroy, onDestroy$1);
      function scrollHandler(e) {
        var currentSection;
        var currentSectionElem;
        if (state.isResizing || !getState().activeSection) {
          return;
        }
        getLast(getState().sections);
        if (getState().isBeyondFullpage || getState().isAboutToScrollToFullPage) {
          return;
        }
        if (!getOptions().autoScrolling || getOptions().scrollBar) {
          var currentScroll = getScrollTop();
          var scrollDirection = getScrollDirection(currentScroll);
          var visibleSectionIndex = 0;
          var screen_mid = currentScroll + getWindowHeight() / 2;
          var isAtBottom = $body.scrollHeight - getWindowHeight() === currentScroll;
          var sections = getState().sections;
          setState({
            scrollY: currentScroll
          });
          if (isAtBottom) {
            visibleSectionIndex = sections.length - 1;
          } else if (!currentScroll) {
            visibleSectionIndex = 0;
          } else {
            for (var i = 0; i < sections.length; ++i) {
              var section = sections[i].item;
              if (section.offsetTop <= screen_mid) {
                visibleSectionIndex = i;
              }
            }
          }
          if (isCompletelyInViewPort(scrollDirection)) {
            if (!hasClass(getState().activeSection.item, COMPLETELY)) {
              addClass(getState().activeSection.item, COMPLETELY);
              removeClass(siblings(getState().activeSection.item), COMPLETELY);
            }
          }
          currentSection = sections[visibleSectionIndex];
          currentSectionElem = currentSection.item;
          if (!currentSection.isActive) {
            setState({
              isScrolling: true
            });
            var leavingSection = getState().activeSection.item;
            var leavingSectionIndex = getState().activeSection.index() + 1;
            var yMovement = getYmovement(getState().activeSection, currentSectionElem);
            var anchorLink = currentSection.anchor;
            var sectionIndex = currentSection.index() + 1;
            var activeSlide = currentSection.activeSlide;
            var slideIndex;
            var slideAnchorLink;
            var callbacksParams = {
              activeSection: leavingSection,
              sectionIndex: sectionIndex - 1,
              anchorLink,
              element: currentSectionElem,
              leavingSection: leavingSectionIndex,
              direction: yMovement,
              items: {
                origin: getState().activeSection,
                destination: currentSection
              }
            };
            if (activeSlide) {
              slideAnchorLink = activeSlide.anchor;
              slideIndex = activeSlide.index();
            }
            if (state.canScroll) {
              addClass(currentSectionElem, ACTIVE);
              removeClass(siblings(currentSectionElem), ACTIVE);
              if (isFunction(getOptions().beforeLeave)) {
                fireCallbackOncePerScroll("beforeLeave", callbacksParams);
              }
              if (isFunction(getOptions().onLeave)) {
                fireCallback("onLeave", callbacksParams);
              }
              if (isFunction(getOptions().afterLoad)) {
                fireCallback("afterLoad", callbacksParams);
              }
              stopMedia(leavingSection);
              lazyLoadPanels(currentSection);
              playMedia(currentSectionElem);
              activateMenuAndNav(anchorLink, sectionIndex - 1);
              if (getOptions().anchors.length) {
                setState({
                  lastScrolledDestiny: anchorLink
                });
              }
              updateState();
              setPageStatus(slideIndex, slideAnchorLink, anchorLink);
            }
            clearTimeout(g_scrollId);
            g_scrollId = setTimeout(function() {
              setState({
                isScrolling: false
              });
            }, 100);
          }
          if (getOptions().fitToSection && state.canScroll) {
            clearTimeout(g_scrollId2);
            g_scrollId2 = setTimeout(function() {
              var fixedSections = state.sections.filter(function(section2) {
                var sectionValues = section2.item.getBoundingClientRect();
                return Math.round(sectionValues.bottom) === Math.round(getWindowHeight()) || Math.round(sectionValues.top) === 0;
              });
              if (!fixedSections.length) {
                if (isTouchDevice && isFormElementFocused()) {
                  return;
                } else {
                  fitToSection();
                }
              }
            }, getOptions().fitToSectionDelay);
          }
        }
      }
      function isFormElementFocused() {
        var focusedElement = document.activeElement;
        if (!focusedElement) return false;
        return focusedElement.matches("input, textarea");
      }
      function onDestroy$1() {
        clearTimeout(g_scrollId);
        clearTimeout(g_scrollId2);
      }
      function getScrollDirection(currentScroll) {
        var direction = currentScroll > lastScroll ? "down" : "up";
        lastScroll = currentScroll;
        setState({
          previousDestTop: currentScroll
        });
        return direction;
      }
      function isCompletelyInViewPort(movement) {
        var top = getState().activeSection.item.offsetTop;
        var bottom = top + getWindowHeight();
        if (movement == "up") {
          return bottom >= getScrollTop() + getWindowHeight();
        }
        return top <= getScrollTop();
      }
      EventEmitter.on(events.bindEvents, bindEvents$1);
      EventEmitter.on(events.onDestroy, onDestroy);
      function onDestroy() {
        windowRemoveEvent("scroll", scrollHandler);
      }
      function bindEvents$1() {
        windowAddEvent("scroll", scrollHandler);
        doc.body.addEventListener("scroll", scrollHandler);
        EventEmitter.on(events.onScrollPageAndSlide, function(params) {
          scrollPageAndSlide(params.sectionAnchor, params.slideAnchor);
        });
        EventEmitter.on(events.onMenuClick, function(params) {
          moveTo$1(params.anchor, void 0);
        });
        EventEmitter.on(events.onScrollOverflowScrolled, function(params) {
          var scrollSection = params.direction === "down" ? moveSectionDown : moveSectionUp;
          scrollSection();
        });
        EventEmitter.on(events.scrollPage, function(params) {
          scrollPage(params.destination);
        });
      }
      FP.getActiveSlide = getActiveSlide;
      FP.getScrollX = function() {
        return state.scrollX;
      };
      EventEmitter.on(events.bindEvents, bindEvents);
      function bindEvents() {
        EventEmitter.on(events.onDestroy, onDestroy$6);
        EventEmitter.on(events.landscapeScroll, function(params) {
          landscapeScroll(params.slides, params.destination);
        });
        EventEmitter.on(events.moveSlideRight, function(params) {
          moveSlideRight(params.section);
        });
        EventEmitter.on(events.moveSlideLeft, function(params) {
          moveSlideLeft(params.section);
        });
        EventEmitter.on(events.afterSectionLoads, updateScrollX);
      }
      function updateScrollX(params) {
        var activeSlide = params.items.destination.activeSlide;
        var scrollX = activeSlide ? Math.round(activeSlide.offsetLeft) : 0;
        setState({
          scrollX
        });
      }
      function getActiveSlide() {
        return nullOrSlide(getState().activeSection.activeSlide);
      }
      EventEmitter.on(events.bindEvents, init$1);
      function init$1() {
        var position = getOptions().credits.position || "right";
        var positionStyle = ["left", "right"].indexOf(position) > -1 ? "".concat(position, ": 0;") : "";
        var waterMark = '\n        <div class="'.concat(WATERMARK, '" style="').concat(positionStyle, '">\n            <a href="https://alvarotrigo.com/fullPage/" \n                rel="nofollow noopener" \n                target="_blank" \n                style="text-decoration:none; color: #000;">\n                    ').concat(getOptions().credits.label || "Made with fullPage.js", "\n            </a>\n        </div>\n    ");
        var lastSection = getLast(state.sections);
        var shouldUseWaterMark = !state.isValid || getOptions().credits.enabled;
        if (lastSection && lastSection.item && shouldUseWaterMark) {
          lastSection.item.insertAdjacentHTML("beforeend", waterMark);
        }
      }
      !(function() {
        EventEmitter.on(events.onInitialise, function() {
          var n2, a, l;
          setState({
            isValid: (getOptions().licenseKey, n2 = getOptions().licenseKey, a = (function(n3) {
              var e2 = parseInt("514").toString(16);
              if (!n3 || n3.length < 29 || 4 === n3.split(t[0]).length) return null;
              var r2 = ["Each", "for"][i()]().join(""), a2 = n3[["split"]]("-"), l2 = [];
              a2[r2](function(t2, n4) {
                if (n4 < 4) {
                  var r3 = (function(t3) {
                    var n5 = t3[t3.length - 1], e3 = ["NaN", "is"][i()]().join("");
                    return window[e3](n5) ? o(n5) : (function(t4) {
                      return t4 - ACTIVE.length;
                    })(n5);
                  })(t2);
                  l2.push(r3);
                  var s2 = o(t2[r3]);
                  if (1 === n4) {
                    var a3 = ["pa", "dS", "t", "art"].join("");
                    s2 = s2.toString()[a3](2, "0");
                  }
                  e2 += s2, 0 !== n4 && 1 !== n4 || (e2 += "-");
                }
              });
              var f = 0, m = "";
              return n3.split("-").forEach(function(t2, n4) {
                if (n4 < 4) {
                  var _i = 0;
                  for (var e3 = 0; e3 < 4; e3++) {
                    e3 !== l2[n4] && (_i += Math.abs(o(t2[e3])), isNaN(t2[e3]) || f++);
                  }
                  var r3 = s(_i);
                  m += r3;
                }
              }), m += s(f), {
                v: /* @__PURE__ */ new Date(e2 + "T00:00"),
                o: e2.split("-")[2] === 8 * (ACTIVE.length - 2) + "",
                l: m
              };
            })(n2), l = (function(t2) {
              var n3 = r[i()]().join("");
              return t2 && 0 === n3.indexOf(t2) && t2.length === n3.length;
            })(n2) || (function(t2) {
              return new RegExp("^(?=.*?[A-Y])(?=.*?[a-y])(?=.*?[0-8])(?=.*?[#?!@$%^&*-]).{8,}$").test(t2);
            })(n2), (a || l) && (a && e <= a.v && a.l === n2.split(t[0])[4] || l || a.o) || false)
          });
        });
        var t = ["-"];
        var n = "2025-11-16".split("-"), e = new Date(n[0], n[1], n[2]), r = ["se", "licen", "-", "v3", "l", "gp"];
        function i() {
          return [["re", "verse"].join("")]["".length];
        }
        function o(t2) {
          return t2 ? isNaN(t2) ? t2.charCodeAt(0) - 72 : t2 : "";
        }
        function s(t2) {
          var n2 = 72 + t2;
          return n2 > 90 && n2 < 97 && (n2 += 15), String.fromCharCode(n2).toUpperCase();
        }
      })();
      EventEmitter.on(events.onPerformMovement, onSlideOrScroll);
      EventEmitter.on(events.afterSectionLoads, afterPanelLoad);
      EventEmitter.on(events.onSlideLeave, onSlideOrScroll);
      EventEmitter.on(events.afterSlideLoads, afterPanelLoad);
      function onSlideOrScroll(params) {
        var skipValue = getOptions().skipIntermediateItems;
        var scrollType = params.items.origin.isSection ? "sections" : "slides";
        var areConsecutivePanels = Math.abs(params.items.origin.index() - params.items.destination.index()) > 1;
        var doesApply = (skipValue === true || skipValue === scrollType) && areConsecutivePanels;
        if (doesApply) {
          setScrollingSpeed(0, "internal");
        }
      }
      function afterPanelLoad(params) {
        if (getOptions().skipIntermediateItems) {
          setVariableState("scrollingSpeed", getOriginals().scrollingSpeed, "internal");
        }
      }
      EventEmitter.on(events.beforeInit, beforeInit);
      FP.setKeyboardScrolling = setKeyboardScrolling;
      function beforeInit() {
        setKeyboardScrolling(getOptions().keyboardScrolling);
      }
      function setKeyboardScrolling(value, directions) {
        if (typeof directions !== "undefined") {
          directions = directions.replace(/ /g, "").split(",");
          directions.forEach(function(direction) {
            setIsScrollAllowed(value, direction, "k");
          });
        } else {
          setIsScrollAllowed(value, "all", "k");
          getOptions().keyboardScrolling = value;
        }
      }
      function styleMenu(section) {
        var index2 = section.index();
        if (typeof getOptions().anchors[index2] !== "undefined") {
          if (section.isActive) {
            activateMenuAndNav(getOptions().anchors[index2], index2);
          }
        }
        if (getOptions().menu && getOptions().css3 && closest($(getOptions().menu)[0], WRAPPER_SEL) != null) {
          $(getOptions().menu).forEach(function(menu) {
            $body.appendChild(menu);
          });
        }
      }
      function prepareDom() {
        css(getParentsUntil(getContainer(), "body"), {
          "height": "100%",
          "position": "relative"
        });
        addClass(getContainer(), WRAPPER);
        addClass($html, ENABLED);
        setState({
          windowsHeight: getWindowHeight()
        });
        removeClass(getContainer(), DESTROYED);
        addInternalSelectors();
        var sections = getState().sectionsIncludingHidden;
        for (var i = 0; i < sections.length; i++) {
          var section = sections[i];
          var slides = section.allSlidesItems;
          var originalStyles = getAttr(section.item, "style");
          if (originalStyles) {
            section.item.setAttribute("data-fp-styles", originalStyles);
          }
          styleSection(section);
          styleMenu(section);
          if (slides.length > 0) {
            styleSlides(section);
          }
        }
        if (getOptions().fixedElements && getOptions().css3) {
          $(getOptions().fixedElements).forEach(function(item) {
            $body.appendChild(item);
          });
        }
        if (getOptions().navigation) {
          addVerticalNavigation();
        }
        enableYoutubeAPI();
        if (getOptions().scrollOverflow) {
          scrollOverflowHandler.makeScrollable();
        }
      }
      FP.shared.afterRenderActions = afterRenderActions;
      function afterRenderActions() {
        var section = getState().activeSection;
        var sectionElem = getState().activeSection.item;
        addClass(sectionElem, COMPLETELY);
        lazyLoadPanels(getState().activeSection);
        lazyLoadOthers();
        playMedia(sectionElem);
        if (isDestinyTheStartingSection() && isFunction(getOptions().afterLoad)) {
          fireCallback("afterLoad", {
            activeSection: sectionElem,
            element: sectionElem,
            direction: null,
            //for backwards compatibility callback (to be removed in a future!)
            anchorLink: section.anchor,
            sectionIndex: section.index(),
            items: {
              origin: getState().activeSection,
              destination: getState().activeSection
            }
          });
        }
        if (isFunction(getOptions().afterRender)) {
          fireCallback("afterRender");
        }
      }
      function isDestinyTheStartingSection() {
        var anchor = getAnchorsURL();
        var destinationSection = getSectionByAnchor(anchor.section);
        return !anchor.section || !destinationSection || typeof destinationSection !== "undefined" && destinationSection.index() === index(getStartingSection());
      }
      FP.setAllowScrolling = setAllowScrolling;
      function setAllowScrolling(value, directions) {
        if (typeof directions !== "undefined") {
          directions = directions.replace(/ /g, "").split(",");
          directions.forEach(function(direction) {
            setIsScrollAllowed(value, direction, "m");
          });
        } else {
          setIsScrollAllowed(value, "all", "m");
        }
      }
      function scrollToAnchor() {
        var anchors = getAnchorsURL();
        var sectionAnchor = anchors.section;
        var slideAnchor = anchors.slide;
        if (sectionAnchor) {
          if (getOptions().animateAnchor) {
            scrollPageAndSlide(sectionAnchor, slideAnchor);
          } else {
            silentMoveTo(sectionAnchor, slideAnchor);
          }
        } else {
          EventEmitter.emit(events.onAfterRenderNoAnchor, null);
        }
      }
      function destroyStructure() {
        silentScroll(0);
        $("img[data-src], source[data-src], audio[data-src], iframe[data-src]", getContainer()).forEach(function(item) {
          setSrc(item, "src");
        });
        $("img[data-srcset]").forEach(function(item) {
          setSrc(item, "srcset");
        });
        remove($(SECTION_NAV_SEL + ", " + SLIDES_NAV_SEL + ", " + SLIDES_ARROW_SEL + ", " + WATERMARK_SEL));
        css(getNodes(getState().sections), {
          "height": "",
          "background-color": "",
          "padding": ""
        });
        css(getNodes(getState().slides), {
          "width": ""
        });
        css(getContainer(), {
          "height": "",
          "position": "",
          "-ms-touch-action": "",
          "touch-action": ""
        });
        css($htmlBody, {
          "overflow": "",
          "height": ""
        });
        removeClass($html, ENABLED);
        removeClass($body, RESPONSIVE + " " + SCROLLABLE);
        $body.className.split(/\s+/).forEach(function(className) {
          if (className.indexOf(VIEWING_PREFIX) === 0) {
            removeClass($body, className);
          }
        });
        if (getOptions().scrollOverflow) {
          getState().panels.forEach(function(panel) {
            scrollOverflowHandler.destroyScrollable(panel);
          });
        }
        getNodes(getState().panels).forEach(function(item) {
          removeClass(item, TABLE + " " + ACTIVE + " " + COMPLETELY + " " + IS_OVERFLOW + " " + LOADED);
          var previousStyles = getAttr(item, "data-fp-styles");
          if (previousStyles) {
            item.setAttribute("style", previousStyles);
          }
          if (hasClass(item, SECTION) && !getInitialAnchorsInDom()) {
            item.removeAttribute("data-anchor");
          }
        });
        removeAnimation(getContainer());
        [TABLE_CELL_SEL, SLIDES_CONTAINER_SEL, SLIDES_WRAPPER_SEL].forEach(function(selector) {
          $(selector, getContainer()).forEach(function(item) {
            unwrap(item);
          });
        });
        css(getContainer(), {
          "-webkit-transition": "none",
          "transition": "none"
        });
        removeClass(getContainer(), WRAPPER);
        win.scrollTo(0, 0);
        var usedSelectors = [SECTION, SLIDE, SLIDES_CONTAINER];
        usedSelectors.forEach(function(item) {
          removeClass($("." + item), item);
        });
        resetState();
        EventEmitter.emit(events.onDestroyAll);
      }
      FP.destroy = destroy;
      function init() {
        updateStructuralState();
        updateState();
        getOptions().scrollBar = getOptions().scrollBar || getOptions().hybrid;
        setOptionsFromDOM();
        prepareDom();
        setAllowScrolling(true);
        setMouseHijack(true);
        setAutoScrolling(getOptions().autoScrolling, "internal");
        responsive();
        setBodyClass();
        if (document.readyState !== "loading") {
          scrollToAnchor();
        } else {
          document.addEventListener("DOMContentLoaded", scrollToAnchor);
        }
        afterRenderActions();
        updateStructuralState();
        updateState();
      }
      function destroy(all) {
        setAutoScrolling(false, "internal");
        setAllowScrolling(true);
        setMouseHijack(false);
        setKeyboardScrolling(false);
        addClass(getContainer(), DESTROYED);
        EventEmitter.emit(events.onDestroy);
        if (all) {
          destroyStructure();
        }
      }
      var isOK = function isOK2() {
        return getOptions() && state.isValid || doc.domain.indexOf("alvarotrigo.com") > -1;
      };
      function displayWarnings() {
        var l = getOptions()["licenseKey"];
        var msgStyle = "font-size: 15px;background:yellow;";
        if (getOptions().licenseKey.trim() === "") {
          showError("error", "Fullpage.js requires a `licenseKey` option. Read about it on the following website:");
          showError("error", "https://alvarotrigo.com/fullPage/docs/#licensekey");
        } else if (!isOK()) {
          showError("error", "Incorrect `licenseKey`. Get one for fullPage.js version 4 here:");
          showError("error", "https://alvarotrigo.com/fullPage/pricing");
        } else if (l && l.length < 20) {
          console.warn("%c This website was made using fullPage.js slider. Learn more on the following website:", msgStyle);
          console.warn("%c https://alvarotrigo.com/fullPage/", msgStyle);
        }
        if (hasClass($html, ENABLED)) {
          showError("error", "Fullpage.js can only be initialized once and you are doing it multiple times!");
          return;
        }
        if (getOptions().continuousVertical && (getOptions().loopTop || getOptions().loopBottom)) {
          getOptions().continuousVertical = false;
          showError("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled");
        }
        if (getOptions().scrollOverflow && (getOptions().scrollBar || !getOptions().autoScrolling)) {
          showError("warn", "Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox");
        }
        if (getOptions().continuousVertical && (getOptions().scrollBar || !getOptions().autoScrolling)) {
          getOptions().continuousVertical = false;
          showError("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled");
        }
        extensions.forEach(function(extension) {
          if (getOptions()[extension]) {
            showError("warn", "fullpage.js extensions require fullpage.extensions.min.js file instead of the usual fullpage.js. Requested: " + extension);
          }
        });
        getOptions().anchors.forEach(function(name) {
          var nameAttr = [].slice.call($("[name]")).filter(function(item) {
            return getAttr(item, "name") && getAttr(item, "name").toLowerCase() == name.toLowerCase();
          });
          var idAttr = [].slice.call($("[id]")).filter(function(item) {
            return getAttr(item, "id") && getAttr(item, "id").toLowerCase() == name.toLowerCase();
          });
          if (idAttr.length || nameAttr.length) {
            showError("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).");
            var propertyName = idAttr.length ? "id" : "name";
            if (idAttr.length || nameAttr.length) {
              showError("error", '"' + name + '" is is being used by another element `' + propertyName + "` property");
            }
          }
        });
      }
      function fullpage(containerSelector, options) {
        setCache();
        if (hasClass($html, ENABLED)) {
          displayWarnings();
          return;
        }
        setOption("touchWrapper", typeof containerSelector === "string" ? $(containerSelector)[0] : containerSelector);
        setOptions(options);
        setContainer(typeof containerSelector === "string" ? $(containerSelector)[0] : containerSelector);
        EventEmitter.emit(events.onInitialise);
        displayWarnings();
        setAPI();
        if (getContainer()) {
          EventEmitter.emit(events.beforeInit);
          init();
          EventEmitter.emit(events.bindEvents);
        }
        setState({
          isFullpageInitDone: true
        });
        return win.fullpage_api;
      }
      function setAPI() {
        FP.getFullpageData = function() {
          return {
            options: getOptions()
          };
        };
        FP.version = "4.0.40";
        FP.test = Object.assign(FP.test, {
          top: "0px",
          translate3d: "translate3d(0px, 0px, 0px)",
          translate3dH: (function() {
            var a = [];
            for (var i = 0; i < $(getOptions().sectionSelector, getContainer()).length; i++) {
              a.push("translate3d(0px, 0px, 0px)");
            }
            return a;
          })(),
          left: (function() {
            var a = [];
            for (var i = 0; i < $(getOptions().sectionSelector, getContainer()).length; i++) {
              a.push(0);
            }
            return a;
          })(),
          options: getOptions(),
          setAutoScrolling: null
        });
        FP.shared = Object.assign(FP.shared, {
          afterRenderActions: null,
          isNormalScrollElement: false
        });
        win.fullpage_api = FP;
      }
      win.fp_easings = deepExtend(win.fp_easings, {
        easeInOutCubic: function easeInOutCubic(t, b, c, d) {
          if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
          return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
      });
      if (win.jQuery) {
        (function($2, fullpage2) {
          if (!$2 || !fullpage2) {
            showError("error", "jQuery is required to use the jQuery fullpage adapter!");
            return;
          }
          $2.fn.fullpage = function(options) {
            options = $2.extend({}, options, {
              "$": $2
            });
            new fullpage2(this[0], options);
            Object.keys(FP).forEach(function(key) {
              getOptions().$.fn.fullpage[key] = FP[key];
            });
          };
        })(win.jQuery, fullpage);
      }
      return fullpage;
    }));
  }
});
export default require_fullpage();
//# sourceMappingURL=fullpage__js.js.map
