(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        n = t.dataset.da.trim().split(","),
        i = {};
      (i.element = t),
        (i.parent = t.parentNode),
        (i.destination = document.querySelector(n[0].trim())),
        (i.breakpoint = n[1] ? n[1].trim() : "767"),
        (i.place = n[2] ? n[2].trim() : "last"),
        (i.index = this.indexInParent(i.parent, i.element)),
        this.оbjects.push(i);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, n) {
          return Array.prototype.indexOf.call(n, e) === t;
        }
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const n = this.mediaQueries[t],
        i = String.prototype.split.call(n, ","),
        s = window.matchMedia(i[0]),
        r = i[1],
        o = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === r;
        });
      s.addListener(function () {
        e.mediaHandler(s, o);
      }),
        this.mediaHandler(s, o);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const n = t[e];
          (n.index = this.indexInParent(n.parent, n.element)),
            this.moveTo(n.place, n.element, n.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const n = t[e];
          n.element.classList.contains(this.daClassname) &&
            this.moveBack(n.parent, n.element, n.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, n) {
      t.classList.add(this.daClassname),
        "last" === e || e >= n.children.length
          ? n.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? n.children[e].insertAdjacentElement("beforebegin", t)
          : n.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, n) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[n]
          ? e.children[n].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const n = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(n, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  class t {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this)
        ),
        document.querySelector("form[data-ajax],form[data-dev]") &&
          document.addEventListener(
            "formSent",
            function (e) {
              const t = e.detail.form.dataset.popupMessage;
              t && this.open(t);
            }.bind(this)
          ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const n = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${n}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : r(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. "
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          s &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            r(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        n = Array.prototype.slice.call(t),
        i = n.indexOf(document.activeElement);
      e.shiftKey && 0 === i && (n[n.length - 1].focus(), e.preventDefault()),
        e.shiftKey || i !== n.length - 1 || (n[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging && l(`[Попапос]: ${e}`);
    }
  }
  let n = (e, t = 500, n = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = n ? `${n}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !n),
            !n && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !n && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
        }, t));
    },
    i = (e, t = 500, n = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          n && e.style.removeProperty("height");
        let i = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = n ? `${n}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = i + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t);
      }
    },
    s = !0,
    r = (e = 500) => {
      document.documentElement.classList.contains("lock") ? o(e) : a(e);
    },
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (s) {
        let n = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < n.length; e++) {
            n[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (s = !1),
          setTimeout(function () {
            s = !0;
          }, e);
      }
    },
    a = (e = 500) => {
      let t = document.querySelector("body");
      if (s) {
        let n = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < n.length; e++) {
          n[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (s = !1),
          setTimeout(function () {
            s = !0;
          }, e);
      }
    };
  function l(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function c(e, t) {
    const n = Array.from(e).filter(function (e, n, i) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (n.length) {
      const e = [];
      n.forEach((n) => {
        const i = {},
          s = n.dataset[t].split(",");
        (i.value = s[0]),
          (i.type = s[1] ? s[1].trim() : "max"),
          (i.item = n),
          e.push(i);
      });
      let i = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      i = (function (e) {
        return e.filter(function (e, t, n) {
          return n.indexOf(e) === t;
        });
      })(i);
      const s = [];
      if (i.length)
        return (
          i.forEach((t) => {
            const n = t.split(","),
              i = n[1],
              r = n[2],
              o = window.matchMedia(n[0]),
              a = e.filter(function (e) {
                if (e.value === i && e.type === r) return !0;
              });
            s.push({ itemsArray: a, matchMedia: o });
          }),
          s
        );
    }
  }
  let d = (e, t = !1, n = 500, i = 0) => {
    const s = document.querySelector(e);
    if (s) {
      let r = "",
        a = 0;
      t &&
        ((r = "header.header"), (a = document.querySelector(r).offsetHeight));
      let c = {
        speedAsDuration: !0,
        speed: n,
        header: r,
        offset: i,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (o(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(s, "", c);
      else {
        let e = s.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: a ? e - a : e, behavior: "smooth" });
      }
      l(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else l(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  const p = { inputMaskModule: null, selectModule: null };
  let u = {
    getErrors(e) {
      let t = 0,
        n = e.querySelectorAll("*[data-required]");
      return (
        n.length &&
          n.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(e) {
      e.reset(),
        setTimeout(() => {
          let t = e.querySelectorAll("input,textarea");
          for (let e = 0; e < t.length; e++) {
            const n = t[e];
            n.parentElement.classList.remove("_form-focus"),
              n.classList.remove("_form-focus"),
              u.removeError(n),
              (n.value = n.dataset.placeholder);
          }
          let n = e.querySelectorAll(".checkbox__input");
          if (n.length > 0)
            for (let e = 0; e < n.length; e++) {
              n[e].checked = !1;
            }
          if (p.selectModule) {
            let t = e.querySelectorAll(".select");
            if (t.length)
              for (let e = 0; e < t.length; e++) {
                const n = t[e].querySelector("select");
                p.selectModule.selectBuild(n);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function f(e) {
    if (null == e) return window;
    if ("[object Window]" !== e.toString()) {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
    }
    return e;
  }
  function h(e) {
    return e instanceof f(e).Element || e instanceof Element;
  }
  function m(e) {
    return e instanceof f(e).HTMLElement || e instanceof HTMLElement;
  }
  function g(e) {
    return (
      "undefined" != typeof ShadowRoot &&
      (e instanceof f(e).ShadowRoot || e instanceof ShadowRoot)
    );
  }
  var v = Math.max,
    b = Math.min,
    y = Math.round;
  function w(e, t) {
    void 0 === t && (t = !1);
    var n = e.getBoundingClientRect(),
      i = 1,
      s = 1;
    if (m(e) && t) {
      var r = e.offsetHeight,
        o = e.offsetWidth;
      o > 0 && (i = y(n.width) / o || 1), r > 0 && (s = y(n.height) / r || 1);
    }
    return {
      width: n.width / i,
      height: n.height / s,
      top: n.top / s,
      right: n.right / i,
      bottom: n.bottom / s,
      left: n.left / i,
      x: n.left / i,
      y: n.top / s,
    };
  }
  function x(e) {
    var t = f(e);
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
  }
  function E(e) {
    return e ? (e.nodeName || "").toLowerCase() : null;
  }
  function T(e) {
    return ((h(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement;
  }
  function S(e) {
    return w(T(e)).left + x(e).scrollLeft;
  }
  function C(e) {
    return f(e).getComputedStyle(e);
  }
  function O(e) {
    var t = C(e),
      n = t.overflow,
      i = t.overflowX,
      s = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + s + i);
  }
  function L(e, t, n) {
    void 0 === n && (n = !1);
    var i,
      s,
      r = m(t),
      o =
        m(t) &&
        (function (e) {
          var t = e.getBoundingClientRect(),
            n = y(t.width) / e.offsetWidth || 1,
            i = y(t.height) / e.offsetHeight || 1;
          return 1 !== n || 1 !== i;
        })(t),
      a = T(t),
      l = w(e, o),
      c = { scrollLeft: 0, scrollTop: 0 },
      d = { x: 0, y: 0 };
    return (
      (r || (!r && !n)) &&
        (("body" !== E(t) || O(a)) &&
          (c =
            (i = t) !== f(i) && m(i)
              ? { scrollLeft: (s = i).scrollLeft, scrollTop: s.scrollTop }
              : x(i)),
        m(t)
          ? (((d = w(t, !0)).x += t.clientLeft), (d.y += t.clientTop))
          : a && (d.x = S(a))),
      {
        x: l.left + c.scrollLeft - d.x,
        y: l.top + c.scrollTop - d.y,
        width: l.width,
        height: l.height,
      }
    );
  }
  function A(e) {
    var t = w(e),
      n = e.offsetWidth,
      i = e.offsetHeight;
    return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - i) <= 1 && (i = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: i }
    );
  }
  function k(e) {
    return "html" === E(e)
      ? e
      : e.assignedSlot || e.parentNode || (g(e) ? e.host : null) || T(e);
  }
  function M(e) {
    return ["html", "body", "#document"].indexOf(E(e)) >= 0
      ? e.ownerDocument.body
      : m(e) && O(e)
      ? e
      : M(k(e));
  }
  function P(e, t) {
    var n;
    void 0 === t && (t = []);
    var i = M(e),
      s = i === (null == (n = e.ownerDocument) ? void 0 : n.body),
      r = f(i),
      o = s ? [r].concat(r.visualViewport || [], O(i) ? i : []) : i,
      a = t.concat(o);
    return s ? a : a.concat(P(k(o)));
  }
  function $(e) {
    return ["table", "td", "th"].indexOf(E(e)) >= 0;
  }
  function _(e) {
    return m(e) && "fixed" !== C(e).position ? e.offsetParent : null;
  }
  function D(e) {
    for (var t = f(e), n = _(e); n && $(n) && "static" === C(n).position; )
      n = _(n);
    return n &&
      ("html" === E(n) || ("body" === E(n) && "static" === C(n).position))
      ? t
      : n ||
          (function (e) {
            var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (
              -1 !== navigator.userAgent.indexOf("Trident") &&
              m(e) &&
              "fixed" === C(e).position
            )
              return null;
            var n = k(e);
            for (
              g(n) && (n = n.host);
              m(n) && ["html", "body"].indexOf(E(n)) < 0;

            ) {
              var i = C(n);
              if (
                "none" !== i.transform ||
                "none" !== i.perspective ||
                "paint" === i.contain ||
                -1 !== ["transform", "perspective"].indexOf(i.willChange) ||
                (t && "filter" === i.willChange) ||
                (t && i.filter && "none" !== i.filter)
              )
                return n;
              n = n.parentNode;
            }
            return null;
          })(e) ||
          t;
  }
  var I = "top",
    B = "bottom",
    j = "right",
    z = "left",
    q = "auto",
    H = [I, B, j, z],
    N = "start",
    G = "end",
    V = "viewport",
    F = "popper",
    W = H.reduce(function (e, t) {
      return e.concat([t + "-" + N, t + "-" + G]);
    }, []),
    R = [].concat(H, [q]).reduce(function (e, t) {
      return e.concat([t, t + "-" + N, t + "-" + G]);
    }, []),
    Y = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function X(e) {
    var t = new Map(),
      n = new Set(),
      i = [];
    function s(e) {
      n.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!n.has(e)) {
              var i = t.get(e);
              i && s(i);
            }
          }),
        i.push(e);
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e);
      }),
      e.forEach(function (e) {
        n.has(e.name) || s(e);
      }),
      i
    );
  }
  var U = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function K() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect);
    });
  }
  function Q(e) {
    void 0 === e && (e = {});
    var t = e,
      n = t.defaultModifiers,
      i = void 0 === n ? [] : n,
      s = t.defaultOptions,
      r = void 0 === s ? U : s;
    return function (e, t, n) {
      void 0 === n && (n = r);
      var s,
        o,
        a = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, U, r),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        l = [],
        c = !1,
        d = {
          state: a,
          setOptions: function (n) {
            var s = "function" == typeof n ? n(a.options) : n;
            p(),
              (a.options = Object.assign({}, r, a.options, s)),
              (a.scrollParents = {
                reference: h(e)
                  ? P(e)
                  : e.contextElement
                  ? P(e.contextElement)
                  : [],
                popper: P(t),
              });
            var o = (function (e) {
              var t = X(e);
              return Y.reduce(function (e, n) {
                return e.concat(
                  t.filter(function (e) {
                    return e.phase === n;
                  })
                );
              }, []);
            })(
              (function (e) {
                var t = e.reduce(function (e, t) {
                  var n = e[t.name];
                  return (
                    (e[t.name] = n
                      ? Object.assign({}, n, t, {
                          options: Object.assign({}, n.options, t.options),
                          data: Object.assign({}, n.data, t.data),
                        })
                      : t),
                    e
                  );
                }, {});
                return Object.keys(t).map(function (e) {
                  return t[e];
                });
              })([].concat(i, a.options.modifiers))
            );
            return (
              (a.orderedModifiers = o.filter(function (e) {
                return e.enabled;
              })),
              a.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  n = e.options,
                  i = void 0 === n ? {} : n,
                  s = e.effect;
                if ("function" == typeof s) {
                  var r = s({ state: a, name: t, instance: d, options: i }),
                    o = function () {};
                  l.push(r || o);
                }
              }),
              d.update()
            );
          },
          forceUpdate: function () {
            if (!c) {
              var e = a.elements,
                t = e.reference,
                n = e.popper;
              if (K(t, n)) {
                (a.rects = {
                  reference: L(t, D(n), "fixed" === a.options.strategy),
                  popper: A(n),
                }),
                  (a.reset = !1),
                  (a.placement = a.options.placement),
                  a.orderedModifiers.forEach(function (e) {
                    return (a.modifiersData[e.name] = Object.assign(
                      {},
                      e.data
                    ));
                  });
                for (var i = 0; i < a.orderedModifiers.length; i++)
                  if (!0 !== a.reset) {
                    var s = a.orderedModifiers[i],
                      r = s.fn,
                      o = s.options,
                      l = void 0 === o ? {} : o,
                      p = s.name;
                    "function" == typeof r &&
                      (a =
                        r({ state: a, options: l, name: p, instance: d }) || a);
                  } else (a.reset = !1), (i = -1);
              }
            }
          },
          update:
            ((s = function () {
              return new Promise(function (e) {
                d.forceUpdate(), e(a);
              });
            }),
            function () {
              return (
                o ||
                  (o = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      (o = void 0), e(s());
                    });
                  })),
                o
              );
            }),
          destroy: function () {
            p(), (c = !0);
          },
        };
      if (!K(e, t)) return d;
      function p() {
        l.forEach(function (e) {
          return e();
        }),
          (l = []);
      }
      return (
        d.setOptions(n).then(function (e) {
          !c && n.onFirstUpdate && n.onFirstUpdate(e);
        }),
        d
      );
    };
  }
  var J = { passive: !0 };
  const Z = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: function (e) {
      var t = e.state,
        n = e.instance,
        i = e.options,
        s = i.scroll,
        r = void 0 === s || s,
        o = i.resize,
        a = void 0 === o || o,
        l = f(t.elements.popper),
        c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
      return (
        r &&
          c.forEach(function (e) {
            e.addEventListener("scroll", n.update, J);
          }),
        a && l.addEventListener("resize", n.update, J),
        function () {
          r &&
            c.forEach(function (e) {
              e.removeEventListener("scroll", n.update, J);
            }),
            a && l.removeEventListener("resize", n.update, J);
        }
      );
    },
    data: {},
  };
  function ee(e) {
    return e.split("-")[0];
  }
  function te(e) {
    return e.split("-")[1];
  }
  function ne(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
  }
  function ie(e) {
    var t,
      n = e.reference,
      i = e.element,
      s = e.placement,
      r = s ? ee(s) : null,
      o = s ? te(s) : null,
      a = n.x + n.width / 2 - i.width / 2,
      l = n.y + n.height / 2 - i.height / 2;
    switch (r) {
      case I:
        t = { x: a, y: n.y - i.height };
        break;
      case B:
        t = { x: a, y: n.y + n.height };
        break;
      case j:
        t = { x: n.x + n.width, y: l };
        break;
      case z:
        t = { x: n.x - i.width, y: l };
        break;
      default:
        t = { x: n.x, y: n.y };
    }
    var c = r ? ne(r) : null;
    if (null != c) {
      var d = "y" === c ? "height" : "width";
      switch (o) {
        case N:
          t[c] = t[c] - (n[d] / 2 - i[d] / 2);
          break;
        case G:
          t[c] = t[c] + (n[d] / 2 - i[d] / 2);
      }
    }
    return t;
  }
  var se = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function re(e) {
    var t,
      n = e.popper,
      i = e.popperRect,
      s = e.placement,
      r = e.variation,
      o = e.offsets,
      a = e.position,
      l = e.gpuAcceleration,
      c = e.adaptive,
      d = e.roundOffsets,
      p = e.isFixed,
      u = o.x,
      h = void 0 === u ? 0 : u,
      m = o.y,
      g = void 0 === m ? 0 : m,
      v = "function" == typeof d ? d({ x: h, y: g }) : { x: h, y: g };
    (h = v.x), (g = v.y);
    var b = o.hasOwnProperty("x"),
      w = o.hasOwnProperty("y"),
      x = z,
      E = I,
      S = window;
    if (c) {
      var O = D(n),
        L = "clientHeight",
        A = "clientWidth";
      if (
        (O === f(n) &&
          "static" !== C((O = T(n))).position &&
          "absolute" === a &&
          ((L = "scrollHeight"), (A = "scrollWidth")),
        (O = O),
        s === I || ((s === z || s === j) && r === G))
      )
        (E = B),
          (g -=
            (p && O === S && S.visualViewport
              ? S.visualViewport.height
              : O[L]) - i.height),
          (g *= l ? 1 : -1);
      if (s === z || ((s === I || s === B) && r === G))
        (x = j),
          (h -=
            (p && O === S && S.visualViewport ? S.visualViewport.width : O[A]) -
            i.width),
          (h *= l ? 1 : -1);
    }
    var k,
      M = Object.assign({ position: a }, c && se),
      P =
        !0 === d
          ? (function (e) {
              var t = e.x,
                n = e.y,
                i = window.devicePixelRatio || 1;
              return { x: y(t * i) / i || 0, y: y(n * i) / i || 0 };
            })({ x: h, y: g })
          : { x: h, y: g };
    return (
      (h = P.x),
      (g = P.y),
      l
        ? Object.assign(
            {},
            M,
            (((k = {})[E] = w ? "0" : ""),
            (k[x] = b ? "0" : ""),
            (k.transform =
              (S.devicePixelRatio || 1) <= 1
                ? "translate(" + h + "px, " + g + "px)"
                : "translate3d(" + h + "px, " + g + "px, 0)"),
            k)
          )
        : Object.assign(
            {},
            M,
            (((t = {})[E] = w ? g + "px" : ""),
            (t[x] = b ? h + "px" : ""),
            (t.transform = ""),
            t)
          )
    );
  }
  const oe = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var n = t.styles[e] || {},
          i = t.attributes[e] || {},
          s = t.elements[e];
        m(s) &&
          E(s) &&
          (Object.assign(s.style, n),
          Object.keys(i).forEach(function (e) {
            var t = i[e];
            !1 === t
              ? s.removeAttribute(e)
              : s.setAttribute(e, !0 === t ? "" : t);
          }));
      });
    },
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var i = t.elements[e],
              s = t.attributes[e] || {},
              r = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
              ).reduce(function (e, t) {
                return (e[t] = ""), e;
              }, {});
            m(i) &&
              E(i) &&
              (Object.assign(i.style, r),
              Object.keys(s).forEach(function (e) {
                i.removeAttribute(e);
              }));
          });
        }
      );
    },
    requires: ["computeStyles"],
  };
  const ae = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: function (e) {
      var t = e.state,
        n = e.options,
        i = e.name,
        s = n.offset,
        r = void 0 === s ? [0, 0] : s,
        o = R.reduce(function (e, n) {
          return (
            (e[n] = (function (e, t, n) {
              var i = ee(e),
                s = [z, I].indexOf(i) >= 0 ? -1 : 1,
                r =
                  "function" == typeof n
                    ? n(Object.assign({}, t, { placement: e }))
                    : n,
                o = r[0],
                a = r[1];
              return (
                (o = o || 0),
                (a = (a || 0) * s),
                [z, j].indexOf(i) >= 0 ? { x: a, y: o } : { x: o, y: a }
              );
            })(n, t.rects, r)),
            e
          );
        }, {}),
        a = o[t.placement],
        l = a.x,
        c = a.y;
      null != t.modifiersData.popperOffsets &&
        ((t.modifiersData.popperOffsets.x += l),
        (t.modifiersData.popperOffsets.y += c)),
        (t.modifiersData[i] = o);
    },
  };
  var le = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function ce(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return le[e];
    });
  }
  var de = { start: "end", end: "start" };
  function pe(e) {
    return e.replace(/start|end/g, function (e) {
      return de[e];
    });
  }
  function ue(e, t) {
    var n = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (n && g(n)) {
      var i = t;
      do {
        if (i && e.isSameNode(i)) return !0;
        i = i.parentNode || i.host;
      } while (i);
    }
    return !1;
  }
  function fe(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
    });
  }
  function he(e, t) {
    return t === V
      ? fe(
          (function (e) {
            var t = f(e),
              n = T(e),
              i = t.visualViewport,
              s = n.clientWidth,
              r = n.clientHeight,
              o = 0,
              a = 0;
            return (
              i &&
                ((s = i.width),
                (r = i.height),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                  ((o = i.offsetLeft), (a = i.offsetTop))),
              { width: s, height: r, x: o + S(e), y: a }
            );
          })(e)
        )
      : h(t)
      ? (function (e) {
          var t = w(e);
          return (
            (t.top = t.top + e.clientTop),
            (t.left = t.left + e.clientLeft),
            (t.bottom = t.top + e.clientHeight),
            (t.right = t.left + e.clientWidth),
            (t.width = e.clientWidth),
            (t.height = e.clientHeight),
            (t.x = t.left),
            (t.y = t.top),
            t
          );
        })(t)
      : fe(
          (function (e) {
            var t,
              n = T(e),
              i = x(e),
              s = null == (t = e.ownerDocument) ? void 0 : t.body,
              r = v(
                n.scrollWidth,
                n.clientWidth,
                s ? s.scrollWidth : 0,
                s ? s.clientWidth : 0
              ),
              o = v(
                n.scrollHeight,
                n.clientHeight,
                s ? s.scrollHeight : 0,
                s ? s.clientHeight : 0
              ),
              a = -i.scrollLeft + S(e),
              l = -i.scrollTop;
            return (
              "rtl" === C(s || n).direction &&
                (a += v(n.clientWidth, s ? s.clientWidth : 0) - r),
              { width: r, height: o, x: a, y: l }
            );
          })(T(e))
        );
  }
  function me(e, t, n) {
    var i =
        "clippingParents" === t
          ? (function (e) {
              var t = P(k(e)),
                n =
                  ["absolute", "fixed"].indexOf(C(e).position) >= 0 && m(e)
                    ? D(e)
                    : e;
              return h(n)
                ? t.filter(function (e) {
                    return h(e) && ue(e, n) && "body" !== E(e);
                  })
                : [];
            })(e)
          : [].concat(t),
      s = [].concat(i, [n]),
      r = s[0],
      o = s.reduce(function (t, n) {
        var i = he(e, n);
        return (
          (t.top = v(i.top, t.top)),
          (t.right = b(i.right, t.right)),
          (t.bottom = b(i.bottom, t.bottom)),
          (t.left = v(i.left, t.left)),
          t
        );
      }, he(e, r));
    return (
      (o.width = o.right - o.left),
      (o.height = o.bottom - o.top),
      (o.x = o.left),
      (o.y = o.top),
      o
    );
  }
  function ge(e) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
  }
  function ve(e, t) {
    return t.reduce(function (t, n) {
      return (t[n] = e), t;
    }, {});
  }
  function be(e, t) {
    void 0 === t && (t = {});
    var n = t,
      i = n.placement,
      s = void 0 === i ? e.placement : i,
      r = n.boundary,
      o = void 0 === r ? "clippingParents" : r,
      a = n.rootBoundary,
      l = void 0 === a ? V : a,
      c = n.elementContext,
      d = void 0 === c ? F : c,
      p = n.altBoundary,
      u = void 0 !== p && p,
      f = n.padding,
      m = void 0 === f ? 0 : f,
      g = ge("number" != typeof m ? m : ve(m, H)),
      v = d === F ? "reference" : F,
      b = e.rects.popper,
      y = e.elements[u ? v : d],
      x = me(h(y) ? y : y.contextElement || T(e.elements.popper), o, l),
      E = w(e.elements.reference),
      S = ie({ reference: E, element: b, strategy: "absolute", placement: s }),
      C = fe(Object.assign({}, b, S)),
      O = d === F ? C : E,
      L = {
        top: x.top - O.top + g.top,
        bottom: O.bottom - x.bottom + g.bottom,
        left: x.left - O.left + g.left,
        right: O.right - x.right + g.right,
      },
      A = e.modifiersData.offset;
    if (d === F && A) {
      var k = A[s];
      Object.keys(L).forEach(function (e) {
        var t = [j, B].indexOf(e) >= 0 ? 1 : -1,
          n = [I, B].indexOf(e) >= 0 ? "y" : "x";
        L[e] += k[n] * t;
      });
    }
    return L;
  }
  function ye(e, t, n) {
    return v(e, b(t, n));
  }
  const we = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t = e.state,
        n = e.options,
        i = e.name,
        s = n.mainAxis,
        r = void 0 === s || s,
        o = n.altAxis,
        a = void 0 !== o && o,
        l = n.boundary,
        c = n.rootBoundary,
        d = n.altBoundary,
        p = n.padding,
        u = n.tether,
        f = void 0 === u || u,
        h = n.tetherOffset,
        m = void 0 === h ? 0 : h,
        g = be(t, { boundary: l, rootBoundary: c, padding: p, altBoundary: d }),
        y = ee(t.placement),
        w = te(t.placement),
        x = !w,
        E = ne(y),
        T = "x" === E ? "y" : "x",
        S = t.modifiersData.popperOffsets,
        C = t.rects.reference,
        O = t.rects.popper,
        L =
          "function" == typeof m
            ? m(Object.assign({}, t.rects, { placement: t.placement }))
            : m,
        k =
          "number" == typeof L
            ? { mainAxis: L, altAxis: L }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, L),
        M = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        P = { x: 0, y: 0 };
      if (S) {
        if (r) {
          var $,
            _ = "y" === E ? I : z,
            q = "y" === E ? B : j,
            H = "y" === E ? "height" : "width",
            G = S[E],
            V = G + g[_],
            F = G - g[q],
            W = f ? -O[H] / 2 : 0,
            R = w === N ? C[H] : O[H],
            Y = w === N ? -O[H] : -C[H],
            X = t.elements.arrow,
            U = f && X ? A(X) : { width: 0, height: 0 },
            K = t.modifiersData["arrow#persistent"]
              ? t.modifiersData["arrow#persistent"].padding
              : { top: 0, right: 0, bottom: 0, left: 0 },
            Q = K[_],
            J = K[q],
            Z = ye(0, C[H], U[H]),
            ie = x ? C[H] / 2 - W - Z - Q - k.mainAxis : R - Z - Q - k.mainAxis,
            se = x
              ? -C[H] / 2 + W + Z + J + k.mainAxis
              : Y + Z + J + k.mainAxis,
            re = t.elements.arrow && D(t.elements.arrow),
            oe = re ? ("y" === E ? re.clientTop || 0 : re.clientLeft || 0) : 0,
            ae = null != ($ = null == M ? void 0 : M[E]) ? $ : 0,
            le = G + se - ae,
            ce = ye(f ? b(V, G + ie - ae - oe) : V, G, f ? v(F, le) : F);
          (S[E] = ce), (P[E] = ce - G);
        }
        if (a) {
          var de,
            pe = "x" === E ? I : z,
            ue = "x" === E ? B : j,
            fe = S[T],
            he = "y" === T ? "height" : "width",
            me = fe + g[pe],
            ge = fe - g[ue],
            ve = -1 !== [I, z].indexOf(y),
            we = null != (de = null == M ? void 0 : M[T]) ? de : 0,
            xe = ve ? me : fe - C[he] - O[he] - we + k.altAxis,
            Ee = ve ? fe + C[he] + O[he] - we - k.altAxis : ge,
            Te =
              f && ve
                ? (function (e, t, n) {
                    var i = ye(e, t, n);
                    return i > n ? n : i;
                  })(xe, fe, Ee)
                : ye(f ? xe : me, fe, f ? Ee : ge);
          (S[T] = Te), (P[T] = Te - fe);
        }
        t.modifiersData[i] = P;
      }
    },
    requiresIfExists: ["offset"],
  };
  const xe = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t,
        n = e.state,
        i = e.name,
        s = e.options,
        r = n.elements.arrow,
        o = n.modifiersData.popperOffsets,
        a = ee(n.placement),
        l = ne(a),
        c = [z, j].indexOf(a) >= 0 ? "height" : "width";
      if (r && o) {
        var d = (function (e, t) {
            return ge(
              "number" !=
                typeof (e =
                  "function" == typeof e
                    ? e(Object.assign({}, t.rects, { placement: t.placement }))
                    : e)
                ? e
                : ve(e, H)
            );
          })(s.padding, n),
          p = A(r),
          u = "y" === l ? I : z,
          f = "y" === l ? B : j,
          h =
            n.rects.reference[c] +
            n.rects.reference[l] -
            o[l] -
            n.rects.popper[c],
          m = o[l] - n.rects.reference[l],
          g = D(r),
          v = g ? ("y" === l ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
          b = h / 2 - m / 2,
          y = d[u],
          w = v - p[c] - d[f],
          x = v / 2 - p[c] / 2 + b,
          E = ye(y, x, w),
          T = l;
        n.modifiersData[i] = (((t = {})[T] = E), (t.centerOffset = E - x), t);
      }
    },
    effect: function (e) {
      var t = e.state,
        n = e.options.element,
        i = void 0 === n ? "[data-popper-arrow]" : n;
      null != i &&
        ("string" != typeof i || (i = t.elements.popper.querySelector(i))) &&
        ue(t.elements.popper, i) &&
        (t.elements.arrow = i);
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"],
  };
  function Ee(e, t, n) {
    return (
      void 0 === n && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    );
  }
  function Te(e) {
    return [I, j, B, z].some(function (t) {
      return e[t] >= 0;
    });
  }
  var Se = Q({
      defaultModifiers: [
        Z,
        {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              n = e.name;
            t.modifiersData[n] = ie({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        },
        {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = n.gpuAcceleration,
              s = void 0 === i || i,
              r = n.adaptive,
              o = void 0 === r || r,
              a = n.roundOffsets,
              l = void 0 === a || a,
              c = {
                placement: ee(t.placement),
                variation: te(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: s,
                isFixed: "fixed" === t.options.strategy,
              };
            null != t.modifiersData.popperOffsets &&
              (t.styles.popper = Object.assign(
                {},
                t.styles.popper,
                re(
                  Object.assign({}, c, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: o,
                    roundOffsets: l,
                  })
                )
              )),
              null != t.modifiersData.arrow &&
                (t.styles.arrow = Object.assign(
                  {},
                  t.styles.arrow,
                  re(
                    Object.assign({}, c, {
                      offsets: t.modifiersData.arrow,
                      position: "absolute",
                      adaptive: !1,
                      roundOffsets: l,
                    })
                  )
                )),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement,
              }));
          },
          data: {},
        },
        oe,
        ae,
        {
          name: "flip",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name;
            if (!t.modifiersData[i]._skip) {
              for (
                var s = n.mainAxis,
                  r = void 0 === s || s,
                  o = n.altAxis,
                  a = void 0 === o || o,
                  l = n.fallbackPlacements,
                  c = n.padding,
                  d = n.boundary,
                  p = n.rootBoundary,
                  u = n.altBoundary,
                  f = n.flipVariations,
                  h = void 0 === f || f,
                  m = n.allowedAutoPlacements,
                  g = t.options.placement,
                  v = ee(g),
                  b =
                    l ||
                    (v === g || !h
                      ? [ce(g)]
                      : (function (e) {
                          if (ee(e) === q) return [];
                          var t = ce(e);
                          return [pe(e), t, pe(t)];
                        })(g)),
                  y = [g].concat(b).reduce(function (e, n) {
                    return e.concat(
                      ee(n) === q
                        ? (function (e, t) {
                            void 0 === t && (t = {});
                            var n = t,
                              i = n.placement,
                              s = n.boundary,
                              r = n.rootBoundary,
                              o = n.padding,
                              a = n.flipVariations,
                              l = n.allowedAutoPlacements,
                              c = void 0 === l ? R : l,
                              d = te(i),
                              p = d
                                ? a
                                  ? W
                                  : W.filter(function (e) {
                                      return te(e) === d;
                                    })
                                : H,
                              u = p.filter(function (e) {
                                return c.indexOf(e) >= 0;
                              });
                            0 === u.length && (u = p);
                            var f = u.reduce(function (t, n) {
                              return (
                                (t[n] = be(e, {
                                  placement: n,
                                  boundary: s,
                                  rootBoundary: r,
                                  padding: o,
                                })[ee(n)]),
                                t
                              );
                            }, {});
                            return Object.keys(f).sort(function (e, t) {
                              return f[e] - f[t];
                            });
                          })(t, {
                            placement: n,
                            boundary: d,
                            rootBoundary: p,
                            padding: c,
                            flipVariations: h,
                            allowedAutoPlacements: m,
                          })
                        : n
                    );
                  }, []),
                  w = t.rects.reference,
                  x = t.rects.popper,
                  E = new Map(),
                  T = !0,
                  S = y[0],
                  C = 0;
                C < y.length;
                C++
              ) {
                var O = y[C],
                  L = ee(O),
                  A = te(O) === N,
                  k = [I, B].indexOf(L) >= 0,
                  M = k ? "width" : "height",
                  P = be(t, {
                    placement: O,
                    boundary: d,
                    rootBoundary: p,
                    altBoundary: u,
                    padding: c,
                  }),
                  $ = k ? (A ? j : z) : A ? B : I;
                w[M] > x[M] && ($ = ce($));
                var _ = ce($),
                  D = [];
                if (
                  (r && D.push(P[L] <= 0),
                  a && D.push(P[$] <= 0, P[_] <= 0),
                  D.every(function (e) {
                    return e;
                  }))
                ) {
                  (S = O), (T = !1);
                  break;
                }
                E.set(O, D);
              }
              if (T)
                for (
                  var G = function (e) {
                      var t = y.find(function (t) {
                        var n = E.get(t);
                        if (n)
                          return n.slice(0, e).every(function (e) {
                            return e;
                          });
                      });
                      if (t) return (S = t), "break";
                    },
                    V = h ? 3 : 1;
                  V > 0;
                  V--
                ) {
                  if ("break" === G(V)) break;
                }
              t.placement !== S &&
                ((t.modifiersData[i]._skip = !0),
                (t.placement = S),
                (t.reset = !0));
            }
          },
          requiresIfExists: ["offset"],
          data: { _skip: !1 },
        },
        we,
        xe,
        {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              n = e.name,
              i = t.rects.reference,
              s = t.rects.popper,
              r = t.modifiersData.preventOverflow,
              o = be(t, { elementContext: "reference" }),
              a = be(t, { altBoundary: !0 }),
              l = Ee(o, i),
              c = Ee(a, s, r),
              d = Te(l),
              p = Te(c);
            (t.modifiersData[n] = {
              referenceClippingOffsets: l,
              popperEscapeOffsets: c,
              isReferenceHidden: d,
              hasPopperEscaped: p,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": d,
                "data-popper-escaped": p,
              }));
          },
        },
      ],
    }),
    Ce = "tippy-content",
    Oe = "tippy-backdrop",
    Le = "tippy-arrow",
    Ae = "tippy-svg-arrow",
    ke = { passive: !0, capture: !0 },
    Me = function () {
      return document.body;
    };
  function Pe(e, t, n) {
    if (Array.isArray(e)) {
      var i = e[t];
      return null == i ? (Array.isArray(n) ? n[t] : n) : i;
    }
    return e;
  }
  function $e(e, t) {
    var n = {}.toString.call(e);
    return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1;
  }
  function _e(e, t) {
    return "function" == typeof e ? e.apply(void 0, t) : e;
  }
  function De(e, t) {
    return 0 === t
      ? e
      : function (i) {
          clearTimeout(n),
            (n = setTimeout(function () {
              e(i);
            }, t));
        };
    var n;
  }
  function Ie(e) {
    return [].concat(e);
  }
  function Be(e, t) {
    -1 === e.indexOf(t) && e.push(t);
  }
  function je(e) {
    return e.split("-")[0];
  }
  function ze(e) {
    return [].slice.call(e);
  }
  function qe(e) {
    return Object.keys(e).reduce(function (t, n) {
      return void 0 !== e[n] && (t[n] = e[n]), t;
    }, {});
  }
  function He() {
    return document.createElement("div");
  }
  function Ne(e) {
    return ["Element", "Fragment"].some(function (t) {
      return $e(e, t);
    });
  }
  function Ge(e) {
    return $e(e, "MouseEvent");
  }
  function Ve(e) {
    return !(!e || !e._tippy || e._tippy.reference !== e);
  }
  function Fe(e) {
    return Ne(e)
      ? [e]
      : (function (e) {
          return $e(e, "NodeList");
        })(e)
      ? ze(e)
      : Array.isArray(e)
      ? e
      : ze(document.querySelectorAll(e));
  }
  function We(e, t) {
    e.forEach(function (e) {
      e && (e.style.transitionDuration = t + "ms");
    });
  }
  function Re(e, t) {
    e.forEach(function (e) {
      e && e.setAttribute("data-state", t);
    });
  }
  function Ye(e) {
    var t,
      n = Ie(e)[0];
    return null != n && null != (t = n.ownerDocument) && t.body
      ? n.ownerDocument
      : document;
  }
  function Xe(e, t, n) {
    var i = t + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
      e[i](t, n);
    });
  }
  function Ue(e, t) {
    for (var n = t; n; ) {
      var i;
      if (e.contains(n)) return !0;
      n =
        null == n.getRootNode || null == (i = n.getRootNode())
          ? void 0
          : i.host;
    }
    return !1;
  }
  var Ke = { isTouch: !1 },
    Qe = 0;
  function Je() {
    Ke.isTouch ||
      ((Ke.isTouch = !0),
      window.performance && document.addEventListener("mousemove", Ze));
  }
  function Ze() {
    var e = performance.now();
    e - Qe < 20 &&
      ((Ke.isTouch = !1), document.removeEventListener("mousemove", Ze)),
      (Qe = e);
  }
  function et() {
    var e = document.activeElement;
    if (Ve(e)) {
      var t = e._tippy;
      e.blur && !t.state.isVisible && e.blur();
    }
  }
  var tt =
    !!("undefined" != typeof window && "undefined" != typeof document) &&
    !!window.msCrypto;
  var nt = {
      animateFill: !1,
      followCursor: !1,
      inlinePositioning: !1,
      sticky: !1,
    },
    it = Object.assign(
      {
        appendTo: Me,
        aria: { content: "auto", expanded: "auto" },
        delay: 0,
        duration: [300, 250],
        getReferenceClientRect: null,
        hideOnClick: !0,
        ignoreAttributes: !1,
        interactive: !1,
        interactiveBorder: 2,
        interactiveDebounce: 0,
        moveTransition: "",
        offset: [0, 10],
        onAfterUpdate: function () {},
        onBeforeUpdate: function () {},
        onCreate: function () {},
        onDestroy: function () {},
        onHidden: function () {},
        onHide: function () {},
        onMount: function () {},
        onShow: function () {},
        onShown: function () {},
        onTrigger: function () {},
        onUntrigger: function () {},
        onClickOutside: function () {},
        placement: "top",
        plugins: [],
        popperOptions: {},
        render: null,
        showOnCreate: !1,
        touch: !0,
        trigger: "mouseenter focus",
        triggerTarget: null,
      },
      nt,
      {
        allowHTML: !1,
        animation: "fade",
        arrow: !0,
        content: "",
        inertia: !1,
        maxWidth: 350,
        role: "tooltip",
        theme: "",
        zIndex: 9999,
      }
    ),
    st = Object.keys(it);
  function rt(e) {
    var t = (e.plugins || []).reduce(function (t, n) {
      var i,
        s = n.name,
        r = n.defaultValue;
      s && (t[s] = void 0 !== e[s] ? e[s] : null != (i = it[s]) ? i : r);
      return t;
    }, {});
    return Object.assign({}, e, t);
  }
  function ot(e, t) {
    var n = Object.assign(
      {},
      t,
      { content: _e(t.content, [e]) },
      t.ignoreAttributes
        ? {}
        : (function (e, t) {
            return (
              t ? Object.keys(rt(Object.assign({}, it, { plugins: t }))) : st
            ).reduce(function (t, n) {
              var i = (e.getAttribute("data-tippy-" + n) || "").trim();
              if (!i) return t;
              if ("content" === n) t[n] = i;
              else
                try {
                  t[n] = JSON.parse(i);
                } catch (e) {
                  t[n] = i;
                }
              return t;
            }, {});
          })(e, t.plugins)
    );
    return (
      (n.aria = Object.assign({}, it.aria, n.aria)),
      (n.aria = {
        expanded: "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
        content:
          "auto" === n.aria.content
            ? t.interactive
              ? null
              : "describedby"
            : n.aria.content,
      }),
      n
    );
  }
  function at(e, t) {
    e.innerHTML = t;
  }
  function lt(e) {
    var t = He();
    return (
      !0 === e
        ? (t.className = Le)
        : ((t.className = Ae), Ne(e) ? t.appendChild(e) : at(t, e)),
      t
    );
  }
  function ct(e, t) {
    Ne(t.content)
      ? (at(e, ""), e.appendChild(t.content))
      : "function" != typeof t.content &&
        (t.allowHTML ? at(e, t.content) : (e.textContent = t.content));
  }
  function dt(e) {
    var t = e.firstElementChild,
      n = ze(t.children);
    return {
      box: t,
      content: n.find(function (e) {
        return e.classList.contains(Ce);
      }),
      arrow: n.find(function (e) {
        return e.classList.contains(Le) || e.classList.contains(Ae);
      }),
      backdrop: n.find(function (e) {
        return e.classList.contains(Oe);
      }),
    };
  }
  function pt(e) {
    var t = He(),
      n = He();
    (n.className = "tippy-box"),
      n.setAttribute("data-state", "hidden"),
      n.setAttribute("tabindex", "-1");
    var i = He();
    function s(n, i) {
      var s = dt(t),
        r = s.box,
        o = s.content,
        a = s.arrow;
      i.theme
        ? r.setAttribute("data-theme", i.theme)
        : r.removeAttribute("data-theme"),
        "string" == typeof i.animation
          ? r.setAttribute("data-animation", i.animation)
          : r.removeAttribute("data-animation"),
        i.inertia
          ? r.setAttribute("data-inertia", "")
          : r.removeAttribute("data-inertia"),
        (r.style.maxWidth =
          "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth),
        i.role ? r.setAttribute("role", i.role) : r.removeAttribute("role"),
        (n.content === i.content && n.allowHTML === i.allowHTML) ||
          ct(o, e.props),
        i.arrow
          ? a
            ? n.arrow !== i.arrow &&
              (r.removeChild(a), r.appendChild(lt(i.arrow)))
            : r.appendChild(lt(i.arrow))
          : a && r.removeChild(a);
    }
    return (
      (i.className = Ce),
      i.setAttribute("data-state", "hidden"),
      ct(i, e.props),
      t.appendChild(n),
      n.appendChild(i),
      s(e.props, e.props),
      { popper: t, onUpdate: s }
    );
  }
  pt.$$tippy = !0;
  var ut = 1,
    ft = [],
    ht = [];
  function mt(e, t) {
    var n,
      i,
      s,
      r,
      o,
      a,
      l,
      c,
      d = ot(e, Object.assign({}, it, rt(qe(t)))),
      p = !1,
      u = !1,
      f = !1,
      h = !1,
      m = [],
      g = De(Y, d.interactiveDebounce),
      v = ut++,
      b = (c = d.plugins).filter(function (e, t) {
        return c.indexOf(e) === t;
      }),
      y = {
        id: v,
        reference: e,
        popper: He(),
        popperInstance: null,
        props: d,
        state: {
          isEnabled: !0,
          isVisible: !1,
          isDestroyed: !1,
          isMounted: !1,
          isShown: !1,
        },
        plugins: b,
        clearDelayTimeouts: function () {
          clearTimeout(n), clearTimeout(i), cancelAnimationFrame(s);
        },
        setProps: function (t) {
          0;
          if (y.state.isDestroyed) return;
          _("onBeforeUpdate", [y, t]), W();
          var n = y.props,
            i = ot(e, Object.assign({}, n, qe(t), { ignoreAttributes: !0 }));
          (y.props = i),
            F(),
            n.interactiveDebounce !== i.interactiveDebounce &&
              (B(), (g = De(Y, i.interactiveDebounce)));
          n.triggerTarget && !i.triggerTarget
            ? Ie(n.triggerTarget).forEach(function (e) {
                e.removeAttribute("aria-expanded");
              })
            : i.triggerTarget && e.removeAttribute("aria-expanded");
          I(), $(), E && E(n, i);
          y.popperInstance &&
            (Q(),
            Z().forEach(function (e) {
              requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
            }));
          _("onAfterUpdate", [y, t]);
        },
        setContent: function (e) {
          y.setProps({ content: e });
        },
        show: function () {
          0;
          var e = y.state.isVisible,
            t = y.state.isDestroyed,
            n = !y.state.isEnabled,
            i = Ke.isTouch && !y.props.touch,
            s = Pe(y.props.duration, 0, it.duration);
          if (e || t || n || i) return;
          if (A().hasAttribute("disabled")) return;
          if ((_("onShow", [y], !1), !1 === y.props.onShow(y))) return;
          (y.state.isVisible = !0), L() && (x.style.visibility = "visible");
          $(), H(), y.state.isMounted || (x.style.transition = "none");
          if (L()) {
            var r = M(),
              o = r.box,
              l = r.content;
            We([o, l], 0);
          }
          (a = function () {
            var e;
            if (y.state.isVisible && !h) {
              if (
                ((h = !0),
                x.offsetHeight,
                (x.style.transition = y.props.moveTransition),
                L() && y.props.animation)
              ) {
                var t = M(),
                  n = t.box,
                  i = t.content;
                We([n, i], s), Re([n, i], "visible");
              }
              D(),
                I(),
                Be(ht, y),
                null == (e = y.popperInstance) || e.forceUpdate(),
                _("onMount", [y]),
                y.props.animation &&
                  L() &&
                  (function (e, t) {
                    G(e, t);
                  })(s, function () {
                    (y.state.isShown = !0), _("onShown", [y]);
                  });
            }
          }),
            (function () {
              var e,
                t = y.props.appendTo,
                n = A();
              e =
                (y.props.interactive && t === Me) || "parent" === t
                  ? n.parentNode
                  : _e(t, [n]);
              e.contains(x) || e.appendChild(x);
              (y.state.isMounted = !0), Q(), !1;
            })();
        },
        hide: function () {
          0;
          var e = !y.state.isVisible,
            t = y.state.isDestroyed,
            n = !y.state.isEnabled,
            i = Pe(y.props.duration, 1, it.duration);
          if (e || t || n) return;
          if ((_("onHide", [y], !1), !1 === y.props.onHide(y))) return;
          (y.state.isVisible = !1),
            (y.state.isShown = !1),
            (h = !1),
            (p = !1),
            L() && (x.style.visibility = "hidden");
          if ((B(), N(), $(!0), L())) {
            var s = M(),
              r = s.box,
              o = s.content;
            y.props.animation && (We([r, o], i), Re([r, o], "hidden"));
          }
          D(),
            I(),
            y.props.animation
              ? L() &&
                (function (e, t) {
                  G(e, function () {
                    !y.state.isVisible &&
                      x.parentNode &&
                      x.parentNode.contains(x) &&
                      t();
                  });
                })(i, y.unmount)
              : y.unmount();
        },
        hideWithInteractivity: function (e) {
          0;
          k().addEventListener("mousemove", g), Be(ft, g), g(e);
        },
        enable: function () {
          y.state.isEnabled = !0;
        },
        disable: function () {
          y.hide(), (y.state.isEnabled = !1);
        },
        unmount: function () {
          0;
          y.state.isVisible && y.hide();
          if (!y.state.isMounted) return;
          J(),
            Z().forEach(function (e) {
              e._tippy.unmount();
            }),
            x.parentNode && x.parentNode.removeChild(x);
          (ht = ht.filter(function (e) {
            return e !== y;
          })),
            (y.state.isMounted = !1),
            _("onHidden", [y]);
        },
        destroy: function () {
          0;
          if (y.state.isDestroyed) return;
          y.clearDelayTimeouts(),
            y.unmount(),
            W(),
            delete e._tippy,
            (y.state.isDestroyed = !0),
            _("onDestroy", [y]);
        },
      };
    if (!d.render) return y;
    var w = d.render(y),
      x = w.popper,
      E = w.onUpdate;
    x.setAttribute("data-tippy-root", ""),
      (x.id = "tippy-" + y.id),
      (y.popper = x),
      (e._tippy = y),
      (x._tippy = y);
    var T = b.map(function (e) {
        return e.fn(y);
      }),
      S = e.hasAttribute("aria-expanded");
    return (
      F(),
      I(),
      $(),
      _("onCreate", [y]),
      d.showOnCreate && ee(),
      x.addEventListener("mouseenter", function () {
        y.props.interactive && y.state.isVisible && y.clearDelayTimeouts();
      }),
      x.addEventListener("mouseleave", function () {
        y.props.interactive &&
          y.props.trigger.indexOf("mouseenter") >= 0 &&
          k().addEventListener("mousemove", g);
      }),
      y
    );
    function C() {
      var e = y.props.touch;
      return Array.isArray(e) ? e : [e, 0];
    }
    function O() {
      return "hold" === C()[0];
    }
    function L() {
      var e;
      return !(null == (e = y.props.render) || !e.$$tippy);
    }
    function A() {
      return l || e;
    }
    function k() {
      var e = A().parentNode;
      return e ? Ye(e) : document;
    }
    function M() {
      return dt(x);
    }
    function P(e) {
      return (y.state.isMounted && !y.state.isVisible) ||
        Ke.isTouch ||
        (r && "focus" === r.type)
        ? 0
        : Pe(y.props.delay, e ? 0 : 1, it.delay);
    }
    function $(e) {
      void 0 === e && (e = !1),
        (x.style.pointerEvents = y.props.interactive && !e ? "" : "none"),
        (x.style.zIndex = "" + y.props.zIndex);
    }
    function _(e, t, n) {
      var i;
      (void 0 === n && (n = !0),
      T.forEach(function (n) {
        n[e] && n[e].apply(n, t);
      }),
      n) && (i = y.props)[e].apply(i, t);
    }
    function D() {
      var t = y.props.aria;
      if (t.content) {
        var n = "aria-" + t.content,
          i = x.id;
        Ie(y.props.triggerTarget || e).forEach(function (e) {
          var t = e.getAttribute(n);
          if (y.state.isVisible) e.setAttribute(n, t ? t + " " + i : i);
          else {
            var s = t && t.replace(i, "").trim();
            s ? e.setAttribute(n, s) : e.removeAttribute(n);
          }
        });
      }
    }
    function I() {
      !S &&
        y.props.aria.expanded &&
        Ie(y.props.triggerTarget || e).forEach(function (e) {
          y.props.interactive
            ? e.setAttribute(
                "aria-expanded",
                y.state.isVisible && e === A() ? "true" : "false"
              )
            : e.removeAttribute("aria-expanded");
        });
    }
    function B() {
      k().removeEventListener("mousemove", g),
        (ft = ft.filter(function (e) {
          return e !== g;
        }));
    }
    function j(t) {
      if (!Ke.isTouch || (!f && "mousedown" !== t.type)) {
        var n = (t.composedPath && t.composedPath()[0]) || t.target;
        if (!y.props.interactive || !Ue(x, n)) {
          if (
            Ie(y.props.triggerTarget || e).some(function (e) {
              return Ue(e, n);
            })
          ) {
            if (Ke.isTouch) return;
            if (y.state.isVisible && y.props.trigger.indexOf("click") >= 0)
              return;
          } else _("onClickOutside", [y, t]);
          !0 === y.props.hideOnClick &&
            (y.clearDelayTimeouts(),
            y.hide(),
            (u = !0),
            setTimeout(function () {
              u = !1;
            }),
            y.state.isMounted || N());
        }
      }
    }
    function z() {
      f = !0;
    }
    function q() {
      f = !1;
    }
    function H() {
      var e = k();
      e.addEventListener("mousedown", j, !0),
        e.addEventListener("touchend", j, ke),
        e.addEventListener("touchstart", q, ke),
        e.addEventListener("touchmove", z, ke);
    }
    function N() {
      var e = k();
      e.removeEventListener("mousedown", j, !0),
        e.removeEventListener("touchend", j, ke),
        e.removeEventListener("touchstart", q, ke),
        e.removeEventListener("touchmove", z, ke);
    }
    function G(e, t) {
      var n = M().box;
      function i(e) {
        e.target === n && (Xe(n, "remove", i), t());
      }
      if (0 === e) return t();
      Xe(n, "remove", o), Xe(n, "add", i), (o = i);
    }
    function V(t, n, i) {
      void 0 === i && (i = !1),
        Ie(y.props.triggerTarget || e).forEach(function (e) {
          e.addEventListener(t, n, i),
            m.push({ node: e, eventType: t, handler: n, options: i });
        });
    }
    function F() {
      O() &&
        (V("touchstart", R, { passive: !0 }),
        V("touchend", X, { passive: !0 })),
        (function (e) {
          return e.split(/\s+/).filter(Boolean);
        })(y.props.trigger).forEach(function (e) {
          if ("manual" !== e)
            switch ((V(e, R), e)) {
              case "mouseenter":
                V("mouseleave", X);
                break;
              case "focus":
                V(tt ? "focusout" : "blur", U);
                break;
              case "focusin":
                V("focusout", U);
            }
        });
    }
    function W() {
      m.forEach(function (e) {
        var t = e.node,
          n = e.eventType,
          i = e.handler,
          s = e.options;
        t.removeEventListener(n, i, s);
      }),
        (m = []);
    }
    function R(e) {
      var t,
        n = !1;
      if (y.state.isEnabled && !K(e) && !u) {
        var i = "focus" === (null == (t = r) ? void 0 : t.type);
        (r = e),
          (l = e.currentTarget),
          I(),
          !y.state.isVisible &&
            Ge(e) &&
            ft.forEach(function (t) {
              return t(e);
            }),
          "click" === e.type &&
          (y.props.trigger.indexOf("mouseenter") < 0 || p) &&
          !1 !== y.props.hideOnClick &&
          y.state.isVisible
            ? (n = !0)
            : ee(e),
          "click" === e.type && (p = !n),
          n && !i && te(e);
      }
    }
    function Y(e) {
      var t = e.target,
        n = A().contains(t) || x.contains(t);
      if ("mousemove" !== e.type || !n) {
        var i = Z()
          .concat(x)
          .map(function (e) {
            var t,
              n = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
            return n
              ? {
                  popperRect: e.getBoundingClientRect(),
                  popperState: n,
                  props: d,
                }
              : null;
          })
          .filter(Boolean);
        (function (e, t) {
          var n = t.clientX,
            i = t.clientY;
          return e.every(function (e) {
            var t = e.popperRect,
              s = e.popperState,
              r = e.props.interactiveBorder,
              o = je(s.placement),
              a = s.modifiersData.offset;
            if (!a) return !0;
            var l = "bottom" === o ? a.top.y : 0,
              c = "top" === o ? a.bottom.y : 0,
              d = "right" === o ? a.left.x : 0,
              p = "left" === o ? a.right.x : 0,
              u = t.top - i + l > r,
              f = i - t.bottom - c > r,
              h = t.left - n + d > r,
              m = n - t.right - p > r;
            return u || f || h || m;
          });
        })(i, e) && (B(), te(e));
      }
    }
    function X(e) {
      K(e) ||
        (y.props.trigger.indexOf("click") >= 0 && p) ||
        (y.props.interactive ? y.hideWithInteractivity(e) : te(e));
    }
    function U(e) {
      (y.props.trigger.indexOf("focusin") < 0 && e.target !== A()) ||
        (y.props.interactive &&
          e.relatedTarget &&
          x.contains(e.relatedTarget)) ||
        te(e);
    }
    function K(e) {
      return !!Ke.isTouch && O() !== e.type.indexOf("touch") >= 0;
    }
    function Q() {
      J();
      var t = y.props,
        n = t.popperOptions,
        i = t.placement,
        s = t.offset,
        r = t.getReferenceClientRect,
        o = t.moveTransition,
        l = L() ? dt(x).arrow : null,
        c = r
          ? {
              getBoundingClientRect: r,
              contextElement: r.contextElement || A(),
            }
          : e,
        d = {
          name: "$$tippy",
          enabled: !0,
          phase: "beforeWrite",
          requires: ["computeStyles"],
          fn: function (e) {
            var t = e.state;
            if (L()) {
              var n = M().box;
              ["placement", "reference-hidden", "escaped"].forEach(function (
                e
              ) {
                "placement" === e
                  ? n.setAttribute("data-placement", t.placement)
                  : t.attributes.popper["data-popper-" + e]
                  ? n.setAttribute("data-" + e, "")
                  : n.removeAttribute("data-" + e);
              }),
                (t.attributes.popper = {});
            }
          },
        },
        p = [
          { name: "offset", options: { offset: s } },
          {
            name: "preventOverflow",
            options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
          },
          { name: "flip", options: { padding: 5 } },
          { name: "computeStyles", options: { adaptive: !o } },
          d,
        ];
      L() &&
        l &&
        p.push({ name: "arrow", options: { element: l, padding: 3 } }),
        p.push.apply(p, (null == n ? void 0 : n.modifiers) || []),
        (y.popperInstance = Se(
          c,
          x,
          Object.assign({}, n, { placement: i, onFirstUpdate: a, modifiers: p })
        ));
    }
    function J() {
      y.popperInstance &&
        (y.popperInstance.destroy(), (y.popperInstance = null));
    }
    function Z() {
      return ze(x.querySelectorAll("[data-tippy-root]"));
    }
    function ee(e) {
      y.clearDelayTimeouts(), e && _("onTrigger", [y, e]), H();
      var t = P(!0),
        i = C(),
        s = i[0],
        r = i[1];
      Ke.isTouch && "hold" === s && r && (t = r),
        t
          ? (n = setTimeout(function () {
              y.show();
            }, t))
          : y.show();
    }
    function te(e) {
      if (
        (y.clearDelayTimeouts(), _("onUntrigger", [y, e]), y.state.isVisible)
      ) {
        if (
          !(
            y.props.trigger.indexOf("mouseenter") >= 0 &&
            y.props.trigger.indexOf("click") >= 0 &&
            ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
            p
          )
        ) {
          var t = P(!1);
          t
            ? (i = setTimeout(function () {
                y.state.isVisible && y.hide();
              }, t))
            : (s = requestAnimationFrame(function () {
                y.hide();
              }));
        }
      } else N();
    }
  }
  function gt(e, t) {
    void 0 === t && (t = {});
    var n = it.plugins.concat(t.plugins || []);
    document.addEventListener("touchstart", Je, ke),
      window.addEventListener("blur", et);
    var i = Object.assign({}, t, { plugins: n }),
      s = Fe(e).reduce(function (e, t) {
        var n = t && mt(t, i);
        return n && e.push(n), e;
      }, []);
    return Ne(e) ? s[0] : s;
  }
  (gt.defaultProps = it),
    (gt.setDefaultProps = function (e) {
      Object.keys(e).forEach(function (t) {
        it[t] = e[t];
      });
    }),
    (gt.currentInput = Ke);
  Object.assign({}, oe, {
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0",
          },
          arrow: { position: "absolute" },
          reference: {},
        };
      Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow);
    },
  });
  gt.setDefaultProps({ render: pt });
  function vt(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function bt(e = {}, t = {}) {
    Object.keys(t).forEach((n) => {
      void 0 === e[n]
        ? (e[n] = t[n])
        : vt(t[n]) &&
          vt(e[n]) &&
          Object.keys(t[n]).length > 0 &&
          bt(e[n], t[n]);
    });
  }
  gt("[data-tippy-content]", {});
  const yt = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function wt() {
    const e = "undefined" != typeof document ? document : {};
    return bt(e, yt), e;
  }
  const xt = {
    document: yt,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function Et() {
    const e = "undefined" != typeof window ? window : {};
    return bt(e, xt), e;
  }
  class Tt extends Array {
    constructor(e) {
      "number" == typeof e
        ? super(e)
        : (super(...(e || [])),
          (function (e) {
            const t = e.__proto__;
            Object.defineProperty(e, "__proto__", {
              get: () => t,
              set(e) {
                t.__proto__ = e;
              },
            });
          })(this));
    }
  }
  function St(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...St(e)) : t.push(e);
      }),
      t
    );
  }
  function Ct(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function Ot(e, t) {
    const n = Et(),
      i = wt();
    let s = [];
    if (!t && e instanceof Tt) return e;
    if (!e) return new Tt(s);
    if ("string" == typeof e) {
      const n = e.trim();
      if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
        let e = "div";
        0 === n.indexOf("<li") && (e = "ul"),
          0 === n.indexOf("<tr") && (e = "tbody"),
          (0 !== n.indexOf("<td") && 0 !== n.indexOf("<th")) || (e = "tr"),
          0 === n.indexOf("<tbody") && (e = "table"),
          0 === n.indexOf("<option") && (e = "select");
        const t = i.createElement(e);
        t.innerHTML = n;
        for (let e = 0; e < t.childNodes.length; e += 1)
          s.push(t.childNodes[e]);
      } else
        s = (function (e, t) {
          if ("string" != typeof e) return [e];
          const n = [],
            i = t.querySelectorAll(e);
          for (let e = 0; e < i.length; e += 1) n.push(i[e]);
          return n;
        })(e.trim(), t || i);
    } else if (e.nodeType || e === n || e === i) s.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof Tt) return e;
      s = e;
    }
    return new Tt(
      (function (e) {
        const t = [];
        for (let n = 0; n < e.length; n += 1)
          -1 === t.indexOf(e[n]) && t.push(e[n]);
        return t;
      })(s)
    );
  }
  Ot.fn = Tt.prototype;
  const Lt = "resize scroll".split(" ");
  function At(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          Lt.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : Ot(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  At("click"),
    At("blur"),
    At("focus"),
    At("focusin"),
    At("focusout"),
    At("keyup"),
    At("keydown"),
    At("keypress"),
    At("submit"),
    At("change"),
    At("mousedown"),
    At("mousemove"),
    At("mouseup"),
    At("mouseenter"),
    At("mouseleave"),
    At("mouseout"),
    At("mouseover"),
    At("touchstart"),
    At("touchend"),
    At("touchmove"),
    At("resize"),
    At("scroll");
  const kt = {
    addClass: function (...e) {
      const t = St(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = St(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = St(e.map((e) => e.split(" ")));
      return (
        Ct(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = St(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let n = 0; n < this.length; n += 1)
        if (2 === arguments.length) this[n].setAttribute(e, t);
        else
          for (const t in e) (this[n][t] = e[t]), this[n].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, n, i, s] = e;
      function r(e) {
        const t = e.target;
        if (!t) return;
        const s = e.target.dom7EventData || [];
        if ((s.indexOf(e) < 0 && s.unshift(e), Ot(t).is(n))) i.apply(t, s);
        else {
          const e = Ot(t).parents();
          for (let t = 0; t < e.length; t += 1)
            Ot(e[t]).is(n) && i.apply(e[t], s);
        }
      }
      function o(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
      }
      "function" == typeof e[1] && (([t, i, s] = e), (n = void 0)),
        s || (s = !1);
      const a = t.split(" ");
      let l;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (n)
          for (l = 0; l < a.length; l += 1) {
            const e = a[l];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: i, proxyListener: r }),
              t.addEventListener(e, r, s);
          }
        else
          for (l = 0; l < a.length; l += 1) {
            const e = a[l];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: i, proxyListener: o }),
              t.addEventListener(e, o, s);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, n, i, s] = e;
      "function" == typeof e[1] && (([t, i, s] = e), (n = void 0)),
        s || (s = !1);
      const r = t.split(" ");
      for (let e = 0; e < r.length; e += 1) {
        const t = r[e];
        for (let e = 0; e < this.length; e += 1) {
          const r = this[e];
          let o;
          if (
            (!n && r.dom7Listeners
              ? (o = r.dom7Listeners[t])
              : n && r.dom7LiveListeners && (o = r.dom7LiveListeners[t]),
            o && o.length)
          )
            for (let e = o.length - 1; e >= 0; e -= 1) {
              const n = o[e];
              (i && n.listener === i) ||
              (i &&
                n.listener &&
                n.listener.dom7proxy &&
                n.listener.dom7proxy === i)
                ? (r.removeEventListener(t, n.proxyListener, s), o.splice(e, 1))
                : i ||
                  (r.removeEventListener(t, n.proxyListener, s),
                  o.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = Et(),
        n = e[0].split(" "),
        i = e[1];
      for (let s = 0; s < n.length; s += 1) {
        const r = n[s];
        for (let n = 0; n < this.length; n += 1) {
          const s = this[n];
          if (t.CustomEvent) {
            const n = new t.CustomEvent(r, {
              detail: i,
              bubbles: !0,
              cancelable: !0,
            });
            (s.dom7EventData = e.filter((e, t) => t > 0)),
              s.dispatchEvent(n),
              (s.dom7EventData = []),
              delete s.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function n(i) {
            i.target === this && (e.call(this, i), t.off("transitionend", n));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = Et();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = Et(),
          t = wt(),
          n = this[0],
          i = n.getBoundingClientRect(),
          s = t.body,
          r = n.clientTop || s.clientTop || 0,
          o = n.clientLeft || s.clientLeft || 0,
          a = n === e ? e.scrollY : n.scrollTop,
          l = n === e ? e.scrollX : n.scrollLeft;
        return { top: i.top + a - r, left: i.left + l - o };
      }
      return null;
    },
    css: function (e, t) {
      const n = Et();
      let i;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (i = 0; i < this.length; i += 1)
            for (const t in e) this[i].style[t] = e[t];
          return this;
        }
        if (this[0])
          return n.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, n) => {
            e.apply(t, [t, n]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = Et(),
        n = wt(),
        i = this[0];
      let s, r;
      if (!i || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (i.matches) return i.matches(e);
        if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
        if (i.msMatchesSelector) return i.msMatchesSelector(e);
        for (s = Ot(e), r = 0; r < s.length; r += 1) if (s[r] === i) return !0;
        return !1;
      }
      if (e === n) return i === n;
      if (e === t) return i === t;
      if (e.nodeType || e instanceof Tt) {
        for (s = e.nodeType ? [e] : e, r = 0; r < s.length; r += 1)
          if (s[r] === i) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return Ot([]);
      if (e < 0) {
        const n = t + e;
        return Ot(n < 0 ? [] : [this[n]]);
      }
      return Ot([this[e]]);
    },
    append: function (...e) {
      let t;
      const n = wt();
      for (let i = 0; i < e.length; i += 1) {
        t = e[i];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const i = n.createElement("div");
            for (i.innerHTML = t; i.firstChild; )
              this[e].appendChild(i.firstChild);
          } else if (t instanceof Tt)
            for (let n = 0; n < t.length; n += 1) this[e].appendChild(t[n]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = wt();
      let n, i;
      for (n = 0; n < this.length; n += 1)
        if ("string" == typeof e) {
          const s = t.createElement("div");
          for (s.innerHTML = e, i = s.childNodes.length - 1; i >= 0; i -= 1)
            this[n].insertBefore(s.childNodes[i], this[n].childNodes[0]);
        } else if (e instanceof Tt)
          for (i = 0; i < e.length; i += 1)
            this[n].insertBefore(e[i], this[n].childNodes[0]);
        else this[n].insertBefore(e, this[n].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && Ot(this[0].nextElementSibling).is(e)
            ? Ot([this[0].nextElementSibling])
            : Ot([])
          : this[0].nextElementSibling
          ? Ot([this[0].nextElementSibling])
          : Ot([])
        : Ot([]);
    },
    nextAll: function (e) {
      const t = [];
      let n = this[0];
      if (!n) return Ot([]);
      for (; n.nextElementSibling; ) {
        const i = n.nextElementSibling;
        e ? Ot(i).is(e) && t.push(i) : t.push(i), (n = i);
      }
      return Ot(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && Ot(t.previousElementSibling).is(e)
            ? Ot([t.previousElementSibling])
            : Ot([])
          : t.previousElementSibling
          ? Ot([t.previousElementSibling])
          : Ot([]);
      }
      return Ot([]);
    },
    prevAll: function (e) {
      const t = [];
      let n = this[0];
      if (!n) return Ot([]);
      for (; n.previousElementSibling; ) {
        const i = n.previousElementSibling;
        e ? Ot(i).is(e) && t.push(i) : t.push(i), (n = i);
      }
      return Ot(t);
    },
    parent: function (e) {
      const t = [];
      for (let n = 0; n < this.length; n += 1)
        null !== this[n].parentNode &&
          (e
            ? Ot(this[n].parentNode).is(e) && t.push(this[n].parentNode)
            : t.push(this[n].parentNode));
      return Ot(t);
    },
    parents: function (e) {
      const t = [];
      for (let n = 0; n < this.length; n += 1) {
        let i = this[n].parentNode;
        for (; i; )
          e ? Ot(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
      }
      return Ot(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? Ot([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let n = 0; n < this.length; n += 1) {
        const i = this[n].querySelectorAll(e);
        for (let e = 0; e < i.length; e += 1) t.push(i[e]);
      }
      return Ot(t);
    },
    children: function (e) {
      const t = [];
      for (let n = 0; n < this.length; n += 1) {
        const i = this[n].children;
        for (let n = 0; n < i.length; n += 1)
          (e && !Ot(i[n]).is(e)) || t.push(i[n]);
      }
      return Ot(t);
    },
    filter: function (e) {
      return Ot(Ct(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys(kt).forEach((e) => {
    Object.defineProperty(Ot.fn, e, { value: kt[e], writable: !0 });
  });
  const Mt = Ot;
  function Pt(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function $t() {
    return Date.now();
  }
  function _t(e, t) {
    void 0 === t && (t = "x");
    const n = Et();
    let i, s, r;
    const o = (function (e) {
      const t = Et();
      let n;
      return (
        t.getComputedStyle && (n = t.getComputedStyle(e, null)),
        !n && e.currentStyle && (n = e.currentStyle),
        n || (n = e.style),
        n
      );
    })(e);
    return (
      n.WebKitCSSMatrix
        ? ((s = o.transform || o.webkitTransform),
          s.split(",").length > 6 &&
            (s = s
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (r = new n.WebKitCSSMatrix("none" === s ? "" : s)))
        : ((r =
            o.MozTransform ||
            o.OTransform ||
            o.MsTransform ||
            o.msTransform ||
            o.transform ||
            o
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = r.toString().split(","))),
      "x" === t &&
        (s = n.WebKitCSSMatrix
          ? r.m41
          : 16 === i.length
          ? parseFloat(i[12])
          : parseFloat(i[4])),
      "y" === t &&
        (s = n.WebKitCSSMatrix
          ? r.m42
          : 16 === i.length
          ? parseFloat(i[13])
          : parseFloat(i[5])),
      s || 0
    );
  }
  function Dt(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function It(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement
      ? e instanceof HTMLElement
      : e && (1 === e.nodeType || 11 === e.nodeType);
  }
  function Bt() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let n = 1; n < arguments.length; n += 1) {
      const i = n < 0 || arguments.length <= n ? void 0 : arguments[n];
      if (null != i && !It(i)) {
        const n = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, s = n.length; t < s; t += 1) {
          const s = n[t],
            r = Object.getOwnPropertyDescriptor(i, s);
          void 0 !== r &&
            r.enumerable &&
            (Dt(e[s]) && Dt(i[s])
              ? i[s].__swiper__
                ? (e[s] = i[s])
                : Bt(e[s], i[s])
              : !Dt(e[s]) && Dt(i[s])
              ? ((e[s] = {}), i[s].__swiper__ ? (e[s] = i[s]) : Bt(e[s], i[s]))
              : (e[s] = i[s]));
        }
      }
    }
    return e;
  }
  function jt(e, t, n) {
    e.style.setProperty(t, n);
  }
  function zt(e) {
    let { swiper: t, targetPosition: n, side: i } = e;
    const s = Et(),
      r = -t.translate;
    let o,
      a = null;
    const l = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      s.cancelAnimationFrame(t.cssModeFrameID);
    const c = n > r ? "next" : "prev",
      d = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
      p = () => {
        (o = new Date().getTime()), null === a && (a = o);
        const e = Math.max(Math.min((o - a) / l, 1), 0),
          c = 0.5 - Math.cos(e * Math.PI) / 2;
        let u = r + c * (n - r);
        if ((d(u, n) && (u = n), t.wrapperEl.scrollTo({ [i]: u }), d(u, n)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: u });
            }),
            void s.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = s.requestAnimationFrame(p);
      };
    p();
  }
  let qt, Ht, Nt;
  function Gt() {
    return (
      qt ||
        (qt = (function () {
          const e = Et(),
            t = wt();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const n = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, n);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      qt
    );
  }
  function Vt(e) {
    return (
      void 0 === e && (e = {}),
      Ht ||
        (Ht = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const n = Gt(),
            i = Et(),
            s = i.navigator.platform,
            r = t || i.navigator.userAgent,
            o = { ios: !1, android: !1 },
            a = i.screen.width,
            l = i.screen.height,
            c = r.match(/(Android);?[\s\/]+([\d.]+)?/);
          let d = r.match(/(iPad).*OS\s([\d_]+)/);
          const p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            f = "Win32" === s;
          let h = "MacIntel" === s;
          return (
            !d &&
              h &&
              n.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${a}x${l}`) >= 0 &&
              ((d = r.match(/(Version)\/([\d.]+)/)),
              d || (d = [0, 1, "13_0_0"]),
              (h = !1)),
            c && !f && ((o.os = "android"), (o.android = !0)),
            (d || u || p) && ((o.os = "ios"), (o.ios = !0)),
            o
          );
        })(e)),
      Ht
    );
  }
  function Ft() {
    return (
      Nt ||
        (Nt = (function () {
          const e = Et();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      Nt
    );
  }
  const Wt = {
    on(e, t, n) {
      const i = this;
      if ("function" != typeof t) return i;
      const s = n ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][s](t);
        }),
        i
      );
    },
    once(e, t, n) {
      const i = this;
      if ("function" != typeof t) return i;
      function s() {
        i.off(e, s), s.__emitterProxy && delete s.__emitterProxy;
        for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
          r[o] = arguments[o];
        t.apply(i, r);
      }
      return (s.__emitterProxy = t), i.on(e, s, n);
    },
    onAny(e, t) {
      const n = this;
      if ("function" != typeof e) return n;
      const i = t ? "unshift" : "push";
      return (
        n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[i](e), n
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsAnyListeners) return t;
      const n = t.eventsAnyListeners.indexOf(e);
      return n >= 0 && t.eventsAnyListeners.splice(n, 1), t;
    },
    off(e, t) {
      const n = this;
      return n.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (n.eventsListeners[e] = [])
              : n.eventsListeners[e] &&
                n.eventsListeners[e].forEach((i, s) => {
                  (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                    n.eventsListeners[e].splice(s, 1);
                });
          }),
          n)
        : n;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners) return e;
      let t, n, i;
      for (var s = arguments.length, r = new Array(s), o = 0; o < s; o++)
        r[o] = arguments[o];
      "string" == typeof r[0] || Array.isArray(r[0])
        ? ((t = r[0]), (n = r.slice(1, r.length)), (i = e))
        : ((t = r[0].events), (n = r[0].data), (i = r[0].context || e)),
        n.unshift(i);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(i, [t, ...n]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(i, n);
              });
        }),
        e
      );
    },
  };
  const Rt = {
    updateSize: function () {
      const e = this;
      let t, n;
      const i = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i[0].clientWidth),
        (n =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === n && e.isVertical()) ||
          ((t =
            t -
            parseInt(i.css("padding-left") || 0, 10) -
            parseInt(i.css("padding-right") || 0, 10)),
          (n =
            n -
            parseInt(i.css("padding-top") || 0, 10) -
            parseInt(i.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(n) && (n = 0),
          Object.assign(e, {
            width: t,
            height: n,
            size: e.isHorizontal() ? t : n,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function n(e, n) {
        return parseFloat(e.getPropertyValue(t(n)) || 0);
      }
      const i = e.params,
        { $wrapperEl: s, size: r, rtlTranslate: o, wrongRTL: a } = e,
        l = e.virtual && i.virtual.enabled,
        c = l ? e.virtual.slides.length : e.slides.length,
        d = s.children(`.${e.params.slideClass}`),
        p = l ? e.virtual.slides.length : d.length;
      let u = [];
      const f = [],
        h = [];
      let m = i.slidesOffsetBefore;
      "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
      let g = i.slidesOffsetAfter;
      "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        b = e.slidesGrid.length;
      let y = i.spaceBetween,
        w = -m,
        x = 0,
        E = 0;
      if (void 0 === r) return;
      "string" == typeof y &&
        y.indexOf("%") >= 0 &&
        (y = (parseFloat(y.replace("%", "")) / 100) * r),
        (e.virtualSize = -y),
        o
          ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : d.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        i.centeredSlides &&
          i.cssMode &&
          (jt(e.wrapperEl, "--swiper-centered-offset-before", ""),
          jt(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const T = i.grid && i.grid.rows > 1 && e.grid;
      let S;
      T && e.grid.initSlides(p);
      const C =
        "auto" === i.slidesPerView &&
        i.breakpoints &&
        Object.keys(i.breakpoints).filter(
          (e) => void 0 !== i.breakpoints[e].slidesPerView
        ).length > 0;
      for (let s = 0; s < p; s += 1) {
        S = 0;
        const o = d.eq(s);
        if (
          (T && e.grid.updateSlide(s, o, p, t), "none" !== o.css("display"))
        ) {
          if ("auto" === i.slidesPerView) {
            C && (d[s].style[t("width")] = "");
            const r = getComputedStyle(o[0]),
              a = o[0].style.transform,
              l = o[0].style.webkitTransform;
            if (
              (a && (o[0].style.transform = "none"),
              l && (o[0].style.webkitTransform = "none"),
              i.roundLengths)
            )
              S = e.isHorizontal() ? o.outerWidth(!0) : o.outerHeight(!0);
            else {
              const e = n(r, "width"),
                t = n(r, "padding-left"),
                i = n(r, "padding-right"),
                s = n(r, "margin-left"),
                a = n(r, "margin-right"),
                l = r.getPropertyValue("box-sizing");
              if (l && "border-box" === l) S = e + s + a;
              else {
                const { clientWidth: n, offsetWidth: r } = o[0];
                S = e + t + i + s + a + (r - n);
              }
            }
            a && (o[0].style.transform = a),
              l && (o[0].style.webkitTransform = l),
              i.roundLengths && (S = Math.floor(S));
          } else
            (S = (r - (i.slidesPerView - 1) * y) / i.slidesPerView),
              i.roundLengths && (S = Math.floor(S)),
              d[s] && (d[s].style[t("width")] = `${S}px`);
          d[s] && (d[s].swiperSlideSize = S),
            h.push(S),
            i.centeredSlides
              ? ((w = w + S / 2 + x / 2 + y),
                0 === x && 0 !== s && (w = w - r / 2 - y),
                0 === s && (w = w - r / 2 - y),
                Math.abs(w) < 0.001 && (w = 0),
                i.roundLengths && (w = Math.floor(w)),
                E % i.slidesPerGroup == 0 && u.push(w),
                f.push(w))
              : (i.roundLengths && (w = Math.floor(w)),
                (E - Math.min(e.params.slidesPerGroupSkip, E)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(w),
                f.push(w),
                (w = w + S + y)),
            (e.virtualSize += S + y),
            (x = S),
            (E += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + g),
        o &&
          a &&
          ("slide" === i.effect || "coverflow" === i.effect) &&
          s.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
        i.setWrapperSize &&
          s.css({ [t("width")]: `${e.virtualSize + i.spaceBetween}px` }),
        T && e.grid.updateWrapperSize(S, u, t),
        !i.centeredSlides)
      ) {
        const t = [];
        for (let n = 0; n < u.length; n += 1) {
          let s = u[n];
          i.roundLengths && (s = Math.floor(s)),
            u[n] <= e.virtualSize - r && t.push(s);
        }
        (u = t),
          Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - r);
      }
      if ((0 === u.length && (u = [0]), 0 !== i.spaceBetween)) {
        const n = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
        d.filter((e, t) => !i.cssMode || t !== d.length - 1).css({
          [n]: `${y}px`,
        });
      }
      if (i.centeredSlides && i.centeredSlidesBounds) {
        let e = 0;
        h.forEach((t) => {
          e += t + (i.spaceBetween ? i.spaceBetween : 0);
        }),
          (e -= i.spaceBetween);
        const t = e - r;
        u = u.map((e) => (e < 0 ? -m : e > t ? t + g : e));
      }
      if (i.centerInsufficientSlides) {
        let e = 0;
        if (
          (h.forEach((t) => {
            e += t + (i.spaceBetween ? i.spaceBetween : 0);
          }),
          (e -= i.spaceBetween),
          e < r)
        ) {
          const t = (r - e) / 2;
          u.forEach((e, n) => {
            u[n] = e - t;
          }),
            f.forEach((e, n) => {
              f[n] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: d,
          snapGrid: u,
          slidesGrid: f,
          slidesSizesGrid: h,
        }),
        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
      ) {
        jt(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
          jt(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - h[h.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          n = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + n));
      }
      if (
        (p !== c && e.emit("slidesLengthChange"),
        u.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        f.length !== b && e.emit("slidesGridLengthChange"),
        i.watchSlidesProgress && e.updateSlidesOffset(),
        !(l || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
      ) {
        const t = `${i.containerModifierClass}backface-hidden`,
          n = e.$el.hasClass(t);
        p <= i.maxBackfaceHiddenSlides
          ? n || e.$el.addClass(t)
          : n && e.$el.removeClass(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        n = [],
        i = t.virtual && t.params.virtual.enabled;
      let s,
        r = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const o = (e) =>
        i
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          t.visibleSlides.each((e) => {
            n.push(e);
          });
        else
          for (s = 0; s < Math.ceil(t.params.slidesPerView); s += 1) {
            const e = t.activeIndex + s;
            if (e > t.slides.length && !i) break;
            n.push(o(e));
          }
      else n.push(o(t.activeIndex));
      for (s = 0; s < n.length; s += 1)
        if (void 0 !== n[s]) {
          const e = n[s].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let n = 0; n < t.length; n += 1)
        t[n].swiperSlideOffset = e.isHorizontal()
          ? t[n].offsetLeft
          : t[n].offsetTop;
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        n = t.params,
        { slides: i, rtlTranslate: s, snapGrid: r } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let o = -e;
      s && (o = e),
        i.removeClass(n.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < i.length; e += 1) {
        const a = i[e];
        let l = a.swiperSlideOffset;
        n.cssMode && n.centeredSlides && (l -= i[0].swiperSlideOffset);
        const c =
            (o + (n.centeredSlides ? t.minTranslate() : 0) - l) /
            (a.swiperSlideSize + n.spaceBetween),
          d =
            (o - r[0] + (n.centeredSlides ? t.minTranslate() : 0) - l) /
            (a.swiperSlideSize + n.spaceBetween),
          p = -(o - l),
          u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (p <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(a),
          t.visibleSlidesIndexes.push(e),
          i.eq(e).addClass(n.slideVisibleClass)),
          (a.progress = s ? -c : c),
          (a.originalProgress = s ? -d : d);
      }
      t.visibleSlides = Mt(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const n = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * n) || 0;
      }
      const n = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: s, isBeginning: r, isEnd: o } = t;
      const a = r,
        l = o;
      0 === i
        ? ((s = 0), (r = !0), (o = !0))
        : ((s = (e - t.minTranslate()) / i), (r = s <= 0), (o = s >= 1)),
        Object.assign(t, { progress: s, isBeginning: r, isEnd: o }),
        (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) &&
          t.updateSlidesProgress(e),
        r && !a && t.emit("reachBeginning toEdge"),
        o && !l && t.emit("reachEnd toEdge"),
        ((a && !r) || (l && !o)) && t.emit("fromEdge"),
        t.emit("progress", s);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: n,
          $wrapperEl: i,
          activeIndex: s,
          realIndex: r,
        } = e,
        o = e.virtual && n.virtual.enabled;
      let a;
      t.removeClass(
        `${n.slideActiveClass} ${n.slideNextClass} ${n.slidePrevClass} ${n.slideDuplicateActiveClass} ${n.slideDuplicateNextClass} ${n.slideDuplicatePrevClass}`
      ),
        (a = o
          ? e.$wrapperEl.find(
              `.${n.slideClass}[data-swiper-slide-index="${s}"]`
            )
          : t.eq(s)),
        a.addClass(n.slideActiveClass),
        n.loop &&
          (a.hasClass(n.slideDuplicateClass)
            ? i
                .children(
                  `.${n.slideClass}:not(.${n.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                )
                .addClass(n.slideDuplicateActiveClass)
            : i
                .children(
                  `.${n.slideClass}.${n.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                )
                .addClass(n.slideDuplicateActiveClass));
      let l = a.nextAll(`.${n.slideClass}`).eq(0).addClass(n.slideNextClass);
      n.loop && 0 === l.length && ((l = t.eq(0)), l.addClass(n.slideNextClass));
      let c = a.prevAll(`.${n.slideClass}`).eq(0).addClass(n.slidePrevClass);
      n.loop &&
        0 === c.length &&
        ((c = t.eq(-1)), c.addClass(n.slidePrevClass)),
        n.loop &&
          (l.hasClass(n.slideDuplicateClass)
            ? i
                .children(
                  `.${n.slideClass}:not(.${
                    n.slideDuplicateClass
                  })[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(n.slideDuplicateNextClass)
            : i
                .children(
                  `.${n.slideClass}.${
                    n.slideDuplicateClass
                  }[data-swiper-slide-index="${l.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(n.slideDuplicateNextClass),
          c.hasClass(n.slideDuplicateClass)
            ? i
                .children(
                  `.${n.slideClass}:not(.${
                    n.slideDuplicateClass
                  })[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(n.slideDuplicatePrevClass)
            : i
                .children(
                  `.${n.slideClass}.${
                    n.slideDuplicateClass
                  }[data-swiper-slide-index="${c.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(n.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        n = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: i,
          snapGrid: s,
          params: r,
          activeIndex: o,
          realIndex: a,
          snapIndex: l,
        } = t;
      let c,
        d = e;
      if (void 0 === d) {
        for (let e = 0; e < i.length; e += 1)
          void 0 !== i[e + 1]
            ? n >= i[e] && n < i[e + 1] - (i[e + 1] - i[e]) / 2
              ? (d = e)
              : n >= i[e] && n < i[e + 1] && (d = e + 1)
            : n >= i[e] && (d = e);
        r.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0);
      }
      if (s.indexOf(n) >= 0) c = s.indexOf(n);
      else {
        const e = Math.min(r.slidesPerGroupSkip, d);
        c = e + Math.floor((d - e) / r.slidesPerGroup);
      }
      if ((c >= s.length && (c = s.length - 1), d === o))
        return void (c !== l && ((t.snapIndex = c), t.emit("snapIndexChange")));
      const p = parseInt(
        t.slides.eq(d).attr("data-swiper-slide-index") || d,
        10
      );
      Object.assign(t, {
        snapIndex: c,
        realIndex: p,
        previousIndex: o,
        activeIndex: d,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        a !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        n = t.params,
        i = Mt(e).closest(`.${n.slideClass}`)[0];
      let s,
        r = !1;
      if (i)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === i) {
            (r = !0), (s = e);
            break;
          }
      if (!i || !r)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = i),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              Mt(i).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = s),
        n.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const Yt = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: n, translate: i, $wrapperEl: s } = this;
      if (t.virtualTranslate) return n ? -i : i;
      if (t.cssMode) return i;
      let r = _t(s[0], e);
      return n && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      const n = this,
        {
          rtlTranslate: i,
          params: s,
          $wrapperEl: r,
          wrapperEl: o,
          progress: a,
        } = n;
      let l,
        c = 0,
        d = 0;
      n.isHorizontal() ? (c = i ? -e : e) : (d = e),
        s.roundLengths && ((c = Math.floor(c)), (d = Math.floor(d))),
        s.cssMode
          ? (o[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal()
              ? -c
              : -d)
          : s.virtualTranslate ||
            r.transform(`translate3d(${c}px, ${d}px, 0px)`),
        (n.previousTranslate = n.translate),
        (n.translate = n.isHorizontal() ? c : d);
      const p = n.maxTranslate() - n.minTranslate();
      (l = 0 === p ? 0 : (e - n.minTranslate()) / p),
        l !== a && n.updateProgress(e),
        n.emit("setTranslate", n.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, n, i, s) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === n && (n = !0),
        void 0 === i && (i = !0);
      const r = this,
        { params: o, wrapperEl: a } = r;
      if (r.animating && o.preventInteractionOnTransition) return !1;
      const l = r.minTranslate(),
        c = r.maxTranslate();
      let d;
      if (
        ((d = i && e > l ? l : i && e < c ? c : e),
        r.updateProgress(d),
        o.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -d;
        else {
          if (!r.support.smoothScroll)
            return (
              zt({ swiper: r, targetPosition: -d, side: e ? "left" : "top" }),
              !0
            );
          a.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(d),
            n &&
              (r.emit("beforeTransitionStart", t, s), r.emit("transitionEnd")))
          : (r.setTransition(t),
            r.setTranslate(d),
            n &&
              (r.emit("beforeTransitionStart", t, s),
              r.emit("transitionStart")),
            r.animating ||
              ((r.animating = !0),
              r.onTranslateToWrapperTransitionEnd ||
                (r.onTranslateToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    r.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    (r.onTranslateToWrapperTransitionEnd = null),
                    delete r.onTranslateToWrapperTransitionEnd,
                    n && r.emit("transitionEnd"));
                }),
              r.$wrapperEl[0].addEventListener(
                "transitionend",
                r.onTranslateToWrapperTransitionEnd
              ),
              r.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                r.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function Xt(e) {
    let { swiper: t, runCallbacks: n, direction: i, step: s } = e;
    const { activeIndex: r, previousIndex: o } = t;
    let a = i;
    if (
      (a || (a = r > o ? "next" : r < o ? "prev" : "reset"),
      t.emit(`transition${s}`),
      n && r !== o)
    ) {
      if ("reset" === a) return void t.emit(`slideResetTransition${s}`);
      t.emit(`slideChangeTransition${s}`),
        "next" === a
          ? t.emit(`slideNextTransition${s}`)
          : t.emit(`slidePrevTransition${s}`);
    }
  }
  const Ut = {
    slideTo: function (e, t, n, i, s) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === n && (n = !0),
        "number" != typeof e && "string" != typeof e)
      )
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const r = this;
      let o = e;
      o < 0 && (o = 0);
      const {
        params: a,
        snapGrid: l,
        slidesGrid: c,
        previousIndex: d,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: f,
        enabled: h,
      } = r;
      if ((r.animating && a.preventInteractionOnTransition) || (!h && !i && !s))
        return !1;
      const m = Math.min(r.params.slidesPerGroupSkip, o);
      let g = m + Math.floor((o - m) / r.params.slidesPerGroup);
      g >= l.length && (g = l.length - 1),
        (p || a.initialSlide || 0) === (d || 0) &&
          n &&
          r.emit("beforeSlideChangeStart");
      const v = -l[g];
      if ((r.updateProgress(v), a.normalizeSlideIndex))
        for (let e = 0; e < c.length; e += 1) {
          const t = -Math.floor(100 * v),
            n = Math.floor(100 * c[e]),
            i = Math.floor(100 * c[e + 1]);
          void 0 !== c[e + 1]
            ? t >= n && t < i - (i - n) / 2
              ? (o = e)
              : t >= n && t < i && (o = e + 1)
            : t >= n && (o = e);
        }
      if (r.initialized && o !== p) {
        if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
          return !1;
        if (
          !r.allowSlidePrev &&
          v > r.translate &&
          v > r.maxTranslate() &&
          (p || 0) !== o
        )
          return !1;
      }
      let b;
      if (
        ((b = o > p ? "next" : o < p ? "prev" : "reset"),
        (u && -v === r.translate) || (!u && v === r.translate))
      )
        return (
          r.updateActiveIndex(o),
          a.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          "slide" !== a.effect && r.setTranslate(v),
          "reset" !== b && (r.transitionStart(n, b), r.transitionEnd(n, b)),
          !1
        );
      if (a.cssMode) {
        const e = r.isHorizontal(),
          n = u ? v : -v;
        if (0 === t) {
          const t = r.virtual && r.params.virtual.enabled;
          t &&
            ((r.wrapperEl.style.scrollSnapType = "none"),
            (r._immediateVirtual = !0)),
            (f[e ? "scrollLeft" : "scrollTop"] = n),
            t &&
              requestAnimationFrame(() => {
                (r.wrapperEl.style.scrollSnapType = ""),
                  (r._swiperImmediateVirtual = !1);
              });
        } else {
          if (!r.support.smoothScroll)
            return (
              zt({ swiper: r, targetPosition: n, side: e ? "left" : "top" }), !0
            );
          f.scrollTo({ [e ? "left" : "top"]: n, behavior: "smooth" });
        }
        return !0;
      }
      return (
        r.setTransition(t),
        r.setTranslate(v),
        r.updateActiveIndex(o),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, i),
        r.transitionStart(n, b),
        0 === t
          ? r.transitionEnd(n, b)
          : r.animating ||
            ((r.animating = !0),
            r.onSlideToWrapperTransitionEnd ||
              (r.onSlideToWrapperTransitionEnd = function (e) {
                r &&
                  !r.destroyed &&
                  e.target === this &&
                  (r.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    r.onSlideToWrapperTransitionEnd
                  ),
                  r.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    r.onSlideToWrapperTransitionEnd
                  ),
                  (r.onSlideToWrapperTransitionEnd = null),
                  delete r.onSlideToWrapperTransitionEnd,
                  r.transitionEnd(n, b));
              }),
            r.$wrapperEl[0].addEventListener(
              "transitionend",
              r.onSlideToWrapperTransitionEnd
            ),
            r.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              r.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e, t, n, i) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === n && (n = !0);
      const s = this;
      let r = e;
      return s.params.loop && (r += s.loopedSlides), s.slideTo(r, t, n, i);
    },
    slideNext: function (e, t, n) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        { animating: s, enabled: r, params: o } = i;
      if (!r) return i;
      let a = o.slidesPerGroup;
      "auto" === o.slidesPerView &&
        1 === o.slidesPerGroup &&
        o.slidesPerGroupAuto &&
        (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const l = i.activeIndex < o.slidesPerGroupSkip ? 1 : a;
      if (o.loop) {
        if (s && o.loopPreventsSlide) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      return o.rewind && i.isEnd
        ? i.slideTo(0, e, t, n)
        : i.slideTo(i.activeIndex + l, e, t, n);
    },
    slidePrev: function (e, t, n) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        {
          params: s,
          animating: r,
          snapGrid: o,
          slidesGrid: a,
          rtlTranslate: l,
          enabled: c,
        } = i;
      if (!c) return i;
      if (s.loop) {
        if (r && s.loopPreventsSlide) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      function d(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = d(l ? i.translate : -i.translate),
        u = o.map((e) => d(e));
      let f = o[u.indexOf(p) - 1];
      if (void 0 === f && s.cssMode) {
        let e;
        o.forEach((t, n) => {
          p >= t && (e = n);
        }),
          void 0 !== e && (f = o[e > 0 ? e - 1 : e]);
      }
      let h = 0;
      if (
        (void 0 !== f &&
          ((h = a.indexOf(f)),
          h < 0 && (h = i.activeIndex - 1),
          "auto" === s.slidesPerView &&
            1 === s.slidesPerGroup &&
            s.slidesPerGroupAuto &&
            ((h = h - i.slidesPerViewDynamic("previous", !0) + 1),
            (h = Math.max(h, 0)))),
        s.rewind && i.isBeginning)
      ) {
        const s =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(s, e, t, n);
      }
      return i.slideTo(h, e, t, n);
    },
    slideReset: function (e, t, n) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, n)
      );
    },
    slideToClosest: function (e, t, n, i) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === i && (i = 0.5);
      const s = this;
      let r = s.activeIndex;
      const o = Math.min(s.params.slidesPerGroupSkip, r),
        a = o + Math.floor((r - o) / s.params.slidesPerGroup),
        l = s.rtlTranslate ? s.translate : -s.translate;
      if (l >= s.snapGrid[a]) {
        const e = s.snapGrid[a];
        l - e > (s.snapGrid[a + 1] - e) * i && (r += s.params.slidesPerGroup);
      } else {
        const e = s.snapGrid[a - 1];
        l - e <= (s.snapGrid[a] - e) * i && (r -= s.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, s.slidesGrid.length - 1)),
        s.slideTo(r, e, t, n)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: n } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let s,
        r = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (s = parseInt(Mt(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? r < e.loopedSlides - i / 2 ||
              r > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (r = n
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                Pt(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - i
            ? (e.loopFix(),
              (r = n
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              Pt(() => {
                e.slideTo(r);
              }))
            : e.slideTo(r);
      } else e.slideTo(r);
    },
  };
  const Kt = {
    loopCreate: function () {
      const e = this,
        t = wt(),
        { params: n, $wrapperEl: i } = e,
        s = i.children().length > 0 ? Mt(i.children()[0].parentNode) : i;
      s.children(`.${n.slideClass}.${n.slideDuplicateClass}`).remove();
      let r = s.children(`.${n.slideClass}`);
      if (n.loopFillGroupWithBlank) {
        const e = n.slidesPerGroup - (r.length % n.slidesPerGroup);
        if (e !== n.slidesPerGroup) {
          for (let i = 0; i < e; i += 1) {
            const e = Mt(t.createElement("div")).addClass(
              `${n.slideClass} ${n.slideBlankClass}`
            );
            s.append(e);
          }
          r = s.children(`.${n.slideClass}`);
        }
      }
      "auto" !== n.slidesPerView ||
        n.loopedSlides ||
        (n.loopedSlides = r.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(n.loopedSlides || n.slidesPerView, 10)
        )),
        (e.loopedSlides += n.loopAdditionalSlides),
        e.loopedSlides > r.length && (e.loopedSlides = r.length);
      const o = [],
        a = [];
      r.each((t, n) => {
        const i = Mt(t);
        n < e.loopedSlides && a.push(t),
          n < r.length && n >= r.length - e.loopedSlides && o.push(t),
          i.attr("data-swiper-slide-index", n);
      });
      for (let e = 0; e < a.length; e += 1)
        s.append(Mt(a[e].cloneNode(!0)).addClass(n.slideDuplicateClass));
      for (let e = o.length - 1; e >= 0; e -= 1)
        s.prepend(Mt(o[e].cloneNode(!0)).addClass(n.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: n,
        loopedSlides: i,
        allowSlidePrev: s,
        allowSlideNext: r,
        snapGrid: o,
        rtlTranslate: a,
      } = e;
      let l;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const c = -o[t] - e.getTranslate();
      if (t < i) {
        (l = n.length - 3 * i + t), (l += i);
        e.slideTo(l, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((a ? -e.translate : e.translate) - c);
      } else if (t >= n.length - i) {
        (l = -n.length + t + i), (l += i);
        e.slideTo(l, 0, !1, !0) &&
          0 !== c &&
          e.setTranslate((a ? -e.translate : e.translate) - c);
      }
      (e.allowSlidePrev = s), (e.allowSlideNext = r), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: n } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        n.removeAttr("data-swiper-slide-index");
    },
  };
  function Qt(e) {
    const t = this,
      n = wt(),
      i = Et(),
      s = t.touchEventsData,
      { params: r, touches: o, enabled: a } = t;
    if (!a) return;
    if (t.animating && r.preventInteractionOnTransition) return;
    !t.animating && r.cssMode && r.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let c = Mt(l.target);
    if ("wrapper" === r.touchEventsTarget && !c.closest(t.wrapperEl).length)
      return;
    if (
      ((s.isTouchEvent = "touchstart" === l.type),
      !s.isTouchEvent && "which" in l && 3 === l.which)
    )
      return;
    if (!s.isTouchEvent && "button" in l && l.button > 0) return;
    if (s.isTouched && s.isMoved) return;
    !!r.noSwipingClass &&
      "" !== r.noSwipingClass &&
      l.target &&
      l.target.shadowRoot &&
      e.path &&
      e.path[0] &&
      (c = Mt(e.path[0]));
    const d = r.noSwipingSelector
        ? r.noSwipingSelector
        : `.${r.noSwipingClass}`,
      p = !(!l.target || !l.target.shadowRoot);
    if (
      r.noSwiping &&
      (p
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(n) {
                return n && n !== wt() && n !== Et()
                  ? (n.assignedSlot && (n = n.assignedSlot),
                    n.closest(e) || t(n.getRootNode().host))
                  : null;
              })(t)
            );
          })(d, l.target)
        : c.closest(d)[0])
    )
      return void (t.allowClick = !0);
    if (r.swipeHandler && !c.closest(r.swipeHandler)[0]) return;
    (o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
      (o.currentY =
        "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
    const u = o.currentX,
      f = o.currentY,
      h = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
      m = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
    if (h && (u <= m || u >= i.innerWidth - m)) {
      if ("prevent" !== h) return;
      e.preventDefault();
    }
    if (
      (Object.assign(s, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (o.startX = u),
      (o.startY = f),
      (s.touchStartTime = $t()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      r.threshold > 0 && (s.allowThresholdMove = !1),
      "touchstart" !== l.type)
    ) {
      let e = !0;
      c.is(s.focusableElements) &&
        ((e = !1), "SELECT" === c[0].nodeName && (s.isTouched = !1)),
        n.activeElement &&
          Mt(n.activeElement).is(s.focusableElements) &&
          n.activeElement !== c[0] &&
          n.activeElement.blur();
      const i = e && t.allowTouchMove && r.touchStartPreventDefault;
      (!r.touchStartForcePreventDefault && !i) ||
        c[0].isContentEditable ||
        l.preventDefault();
    }
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !r.cssMode &&
      t.freeMode.onTouchStart(),
      t.emit("touchStart", l);
  }
  function Jt(e) {
    const t = wt(),
      n = this,
      i = n.touchEventsData,
      { params: s, touches: r, rtlTranslate: o, enabled: a } = n;
    if (!a) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        n.emit("touchMoveOpposite", l)
      );
    if (i.isTouchEvent && "touchmove" !== l.type) return;
    const c =
        "touchmove" === l.type &&
        l.targetTouches &&
        (l.targetTouches[0] || l.changedTouches[0]),
      d = "touchmove" === l.type ? c.pageX : l.pageX,
      p = "touchmove" === l.type ? c.pageY : l.pageY;
    if (l.preventedByNestedSwiper) return (r.startX = d), void (r.startY = p);
    if (!n.allowTouchMove)
      return (
        Mt(l.target).is(i.focusableElements) || (n.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(r, { startX: d, startY: p, currentX: d, currentY: p }),
          (i.touchStartTime = $t()))
        )
      );
    if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
      if (n.isVertical()) {
        if (
          (p < r.startY && n.translate <= n.maxTranslate()) ||
          (p > r.startY && n.translate >= n.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (d < r.startX && n.translate <= n.maxTranslate()) ||
        (d > r.startX && n.translate >= n.minTranslate())
      )
        return;
    if (
      i.isTouchEvent &&
      t.activeElement &&
      l.target === t.activeElement &&
      Mt(l.target).is(i.focusableElements)
    )
      return (i.isMoved = !0), void (n.allowClick = !1);
    if (
      (i.allowTouchCallbacks && n.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    (r.currentX = d), (r.currentY = p);
    const u = r.currentX - r.startX,
      f = r.currentY - r.startY;
    if (n.params.threshold && Math.sqrt(u ** 2 + f ** 2) < n.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (n.isHorizontal() && r.currentY === r.startY) ||
      (n.isVertical() && r.currentX === r.startX)
        ? (i.isScrolling = !1)
        : u * u + f * f >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(f), Math.abs(u))) / Math.PI),
          (i.isScrolling = n.isHorizontal()
            ? e > s.touchAngle
            : 90 - e > s.touchAngle));
    }
    if (
      (i.isScrolling && n.emit("touchMoveOpposite", l),
      void 0 === i.startMoving &&
        ((r.currentX === r.startX && r.currentY === r.startY) ||
          (i.startMoving = !0)),
      i.isScrolling)
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (n.allowClick = !1),
      !s.cssMode && l.cancelable && l.preventDefault(),
      s.touchMoveStopPropagation && !s.nested && l.stopPropagation(),
      i.isMoved ||
        (s.loop && !s.cssMode && n.loopFix(),
        (i.startTranslate = n.getTranslate()),
        n.setTransition(0),
        n.animating &&
          n.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (i.allowMomentumBounce = !1),
        !s.grabCursor ||
          (!0 !== n.allowSlideNext && !0 !== n.allowSlidePrev) ||
          n.setGrabCursor(!0),
        n.emit("sliderFirstMove", l)),
      n.emit("sliderMove", l),
      (i.isMoved = !0);
    let h = n.isHorizontal() ? u : f;
    (r.diff = h),
      (h *= s.touchRatio),
      o && (h = -h),
      (n.swipeDirection = h > 0 ? "prev" : "next"),
      (i.currentTranslate = h + i.startTranslate);
    let m = !0,
      g = s.resistanceRatio;
    if (
      (s.touchReleaseOnEdges && (g = 0),
      h > 0 && i.currentTranslate > n.minTranslate()
        ? ((m = !1),
          s.resistance &&
            (i.currentTranslate =
              n.minTranslate() -
              1 +
              (-n.minTranslate() + i.startTranslate + h) ** g))
        : h < 0 &&
          i.currentTranslate < n.maxTranslate() &&
          ((m = !1),
          s.resistance &&
            (i.currentTranslate =
              n.maxTranslate() +
              1 -
              (n.maxTranslate() - i.startTranslate - h) ** g)),
      m && (l.preventedByNestedSwiper = !0),
      !n.allowSlideNext &&
        "next" === n.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !n.allowSlidePrev &&
        "prev" === n.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      n.allowSlidePrev ||
        n.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      s.threshold > 0)
    ) {
      if (!(Math.abs(h) > s.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (i.currentTranslate = i.startTranslate),
          void (r.diff = n.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY)
        );
    }
    s.followFinger &&
      !s.cssMode &&
      (((s.freeMode && s.freeMode.enabled && n.freeMode) ||
        s.watchSlidesProgress) &&
        (n.updateActiveIndex(), n.updateSlidesClasses()),
      n.params.freeMode &&
        s.freeMode.enabled &&
        n.freeMode &&
        n.freeMode.onTouchMove(),
      n.updateProgress(i.currentTranslate),
      n.setTranslate(i.currentTranslate));
  }
  function Zt(e) {
    const t = this,
      n = t.touchEventsData,
      { params: i, touches: s, rtlTranslate: r, slidesGrid: o, enabled: a } = t;
    if (!a) return;
    let l = e;
    if (
      (l.originalEvent && (l = l.originalEvent),
      n.allowTouchCallbacks && t.emit("touchEnd", l),
      (n.allowTouchCallbacks = !1),
      !n.isTouched)
    )
      return (
        n.isMoved && i.grabCursor && t.setGrabCursor(!1),
        (n.isMoved = !1),
        void (n.startMoving = !1)
      );
    i.grabCursor &&
      n.isMoved &&
      n.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = $t(),
      d = c - n.touchStartTime;
    if (t.allowClick) {
      const e = l.path || (l.composedPath && l.composedPath());
      t.updateClickedSlide((e && e[0]) || l.target),
        t.emit("tap click", l),
        d < 300 &&
          c - n.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", l);
    }
    if (
      ((n.lastClickTime = $t()),
      Pt(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !n.isTouched ||
        !n.isMoved ||
        !t.swipeDirection ||
        0 === s.diff ||
        n.currentTranslate === n.startTranslate)
    )
      return (n.isTouched = !1), (n.isMoved = !1), void (n.startMoving = !1);
    let p;
    if (
      ((n.isTouched = !1),
      (n.isMoved = !1),
      (n.startMoving = !1),
      (p = i.followFinger
        ? r
          ? t.translate
          : -t.translate
        : -n.currentTranslate),
      i.cssMode)
    )
      return;
    if (t.params.freeMode && i.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: p });
    let u = 0,
      f = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
    ) {
      const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
      void 0 !== o[e + t]
        ? p >= o[e] && p < o[e + t] && ((u = e), (f = o[e + t] - o[e]))
        : p >= o[e] && ((u = e), (f = o[o.length - 1] - o[o.length - 2]));
    }
    let h = null,
      m = null;
    i.rewind &&
      (t.isBeginning
        ? (m =
            t.params.virtual && t.params.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (h = 0));
    const g = (p - o[u]) / f,
      v = u < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    if (d > i.longSwipesMs) {
      if (!i.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (g >= i.longSwipesRatio
          ? t.slideTo(i.rewind && t.isEnd ? h : u + v)
          : t.slideTo(u)),
        "prev" === t.swipeDirection &&
          (g > 1 - i.longSwipesRatio
            ? t.slideTo(u + v)
            : null !== m && g < 0 && Math.abs(g) > i.longSwipesRatio
            ? t.slideTo(m)
            : t.slideTo(u));
    } else {
      if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
        ? l.target === t.navigation.nextEl
          ? t.slideTo(u + v)
          : t.slideTo(u)
        : ("next" === t.swipeDirection && t.slideTo(null !== h ? h : u + v),
          "prev" === t.swipeDirection && t.slideTo(null !== m ? m : u));
    }
  }
  function en() {
    const e = this,
      { params: t, el: n } = e;
    if (n && 0 === n.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: s, snapGrid: r } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = s),
      (e.allowSlideNext = i),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function tn(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function nn() {
    const e = this,
      { wrapperEl: t, rtlTranslate: n, enabled: i } = e;
    if (!i) return;
    let s;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      -0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (s = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      s !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let sn = !1;
  function rn() {}
  const on = (e, t) => {
    const n = wt(),
      {
        params: i,
        touchEvents: s,
        el: r,
        wrapperEl: o,
        device: a,
        support: l,
      } = e,
      c = !!i.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      p = t;
    if (l.touch) {
      const t = !(
        "touchstart" !== s.start ||
        !l.passiveListener ||
        !i.passiveListeners
      ) && { passive: !0, capture: !1 };
      r[d](s.start, e.onTouchStart, t),
        r[d](
          s.move,
          e.onTouchMove,
          l.passiveListener ? { passive: !1, capture: c } : c
        ),
        r[d](s.end, e.onTouchEnd, t),
        s.cancel && r[d](s.cancel, e.onTouchEnd, t);
    } else
      r[d](s.start, e.onTouchStart, !1),
        n[d](s.move, e.onTouchMove, c),
        n[d](s.end, e.onTouchEnd, !1);
    (i.preventClicks || i.preventClicksPropagation) &&
      r[d]("click", e.onClick, !0),
      i.cssMode && o[d]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[p](
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            en,
            !0
          )
        : e[p]("observerUpdate", en, !0);
  };
  const an = {
      attachEvents: function () {
        const e = this,
          t = wt(),
          { params: n, support: i } = e;
        (e.onTouchStart = Qt.bind(e)),
          (e.onTouchMove = Jt.bind(e)),
          (e.onTouchEnd = Zt.bind(e)),
          n.cssMode && (e.onScroll = nn.bind(e)),
          (e.onClick = tn.bind(e)),
          i.touch && !sn && (t.addEventListener("touchstart", rn), (sn = !0)),
          on(e, "on");
      },
      detachEvents: function () {
        on(this, "off");
      },
    },
    ln = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const cn = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: n,
          loopedSlides: i = 0,
          params: s,
          $el: r,
        } = e,
        o = s.breakpoints;
      if (!o || (o && 0 === Object.keys(o).length)) return;
      const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
      if (!a || e.currentBreakpoint === a) return;
      const l = (a in o ? o[a] : void 0) || e.originalParams,
        c = ln(e, s),
        d = ln(e, l),
        p = s.enabled;
      c && !d
        ? (r.removeClass(
            `${s.containerModifierClass}grid ${s.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !c &&
          d &&
          (r.addClass(`${s.containerModifierClass}grid`),
          ((l.grid.fill && "column" === l.grid.fill) ||
            (!l.grid.fill && "column" === s.grid.fill)) &&
            r.addClass(`${s.containerModifierClass}grid-column`),
          e.emitContainerClasses());
      const u = l.direction && l.direction !== s.direction,
        f = s.loop && (l.slidesPerView !== s.slidesPerView || u);
      u && n && e.changeDirection(), Bt(e.params, l);
      const h = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        p && !h ? e.disable() : !p && h && e.enable(),
        (e.currentBreakpoint = a),
        e.emit("_beforeBreakpoint", l),
        f &&
          n &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - i + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", l);
    },
    getBreakpoint: function (e, t, n) {
      if ((void 0 === t && (t = "window"), !e || ("container" === t && !n)))
        return;
      let i = !1;
      const s = Et(),
        r = "window" === t ? s.innerHeight : n.clientHeight,
        o = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: r * t, point: e };
          }
          return { value: e, point: e };
        });
      o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < o.length; e += 1) {
        const { point: r, value: a } = o[e];
        "window" === t
          ? s.matchMedia(`(min-width: ${a}px)`).matches && (i = r)
          : a <= n.clientWidth && (i = r);
      }
      return i || "max";
    },
  };
  const dn = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: n, rtl: i, $el: s, device: r, support: o } = e,
        a = (function (e, t) {
          const n = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((i) => {
                    e[i] && n.push(t + i);
                  })
                : "string" == typeof e && n.push(t + e);
            }),
            n
          );
        })(
          [
            "initialized",
            n.direction,
            { "pointer-events": !o.touch },
            { "free-mode": e.params.freeMode && n.freeMode.enabled },
            { autoheight: n.autoHeight },
            { rtl: i },
            { grid: n.grid && n.grid.rows > 1 },
            {
              "grid-column":
                n.grid && n.grid.rows > 1 && "column" === n.grid.fill,
            },
            { android: r.android },
            { ios: r.ios },
            { "css-mode": n.cssMode },
            { centered: n.cssMode && n.centeredSlides },
          ],
          n.containerModifierClass
        );
      t.push(...a), s.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const pn = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function un(e, t) {
    return function (n) {
      void 0 === n && (n = {});
      const i = Object.keys(n)[0],
        s = n[i];
      "object" == typeof s && null !== s
        ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
            !0 === e[i] &&
            (e[i] = { auto: !0 }),
          i in e && "enabled" in s
            ? (!0 === e[i] && (e[i] = { enabled: !0 }),
              "object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              Bt(t, n))
            : Bt(t, n))
        : Bt(t, n);
    };
  }
  const fn = {
      eventsEmitter: Wt,
      update: Rt,
      translate: Yt,
      transition: {
        setTransition: function (e, t) {
          const n = this;
          n.params.cssMode || n.$wrapperEl.transition(e),
            n.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const n = this,
            { params: i } = n;
          i.cssMode ||
            (i.autoHeight && n.updateAutoHeight(),
            Xt({ swiper: n, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const n = this,
            { params: i } = n;
          (n.animating = !1),
            i.cssMode ||
              (n.setTransition(0),
              Xt({ swiper: n, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: Ut,
      loop: Kt,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const n =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (n.style.cursor = "move"),
            (n.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
            (n.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
            (n.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: an,
      breakpoints: cn,
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: n } = e,
            { slidesOffsetBefore: i } = n;
          if (i) {
            const t = e.slides.length - 1,
              n = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > n;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === n.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === n.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: dn,
      images: {
        loadImage: function (e, t, n, i, s, r) {
          const o = Et();
          let a;
          function l() {
            r && r();
          }
          Mt(e).parent("picture")[0] || (e.complete && s)
            ? l()
            : t
            ? ((a = new o.Image()),
              (a.onload = l),
              (a.onerror = l),
              i && (a.sizes = i),
              n && (a.srcset = n),
              t && (a.src = t))
            : l();
        },
        preloadImages: function () {
          const e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (let n = 0; n < e.imagesToLoad.length; n += 1) {
            const i = e.imagesToLoad[n];
            e.loadImage(
              i,
              i.currentSrc || i.getAttribute("src"),
              i.srcset || i.getAttribute("srcset"),
              i.sizes || i.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    hn = {};
  class mn {
    constructor() {
      let e, t;
      for (var n = arguments.length, i = new Array(n), s = 0; s < n; s++)
        i[s] = arguments[s];
      if (
        (1 === i.length &&
        i[0].constructor &&
        "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
          ? (t = i[0])
          : ([e, t] = i),
        t || (t = {}),
        (t = Bt({}, t)),
        e && !t.el && (t.el = e),
        t.el && Mt(t.el).length > 1)
      ) {
        const e = [];
        return (
          Mt(t.el).each((n) => {
            const i = Bt({}, t, { el: n });
            e.push(new mn(i));
          }),
          e
        );
      }
      const r = this;
      (r.__swiper__ = !0),
        (r.support = Gt()),
        (r.device = Vt({ userAgent: t.userAgent })),
        (r.browser = Ft()),
        (r.eventsListeners = {}),
        (r.eventsAnyListeners = []),
        (r.modules = [...r.__modules__]),
        t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
      const o = {};
      r.modules.forEach((e) => {
        e({
          swiper: r,
          extendParams: un(t, o),
          on: r.on.bind(r),
          once: r.once.bind(r),
          off: r.off.bind(r),
          emit: r.emit.bind(r),
        });
      });
      const a = Bt({}, pn, o);
      return (
        (r.params = Bt({}, a, hn, t)),
        (r.originalParams = Bt({}, r.params)),
        (r.passedParams = Bt({}, t)),
        r.params &&
          r.params.on &&
          Object.keys(r.params.on).forEach((e) => {
            r.on(e, r.params.on[e]);
          }),
        r.params && r.params.onAny && r.onAny(r.params.onAny),
        (r.$ = Mt),
        Object.assign(r, {
          enabled: r.params.enabled,
          el: e,
          classNames: [],
          slides: Mt(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === r.params.direction,
          isVertical: () => "vertical" === r.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: r.params.allowSlideNext,
          allowSlidePrev: r.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (r.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (r.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              r.support.touch || !r.params.simulateTouch
                ? r.touchEventsTouch
                : r.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: r.params.focusableElements,
            lastClickTime: $t(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: r.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        r.emit("_swiper"),
        r.params.init && r.init(),
        r
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const n = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = n.minTranslate(),
        s = (n.maxTranslate() - i) * e + i;
      n.translateTo(s, void 0 === t ? 0 : t),
        n.updateActiveIndex(),
        n.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return e.className
        .split(" ")
        .filter(
          (e) =>
            0 === e.indexOf("swiper-slide") ||
            0 === e.indexOf(t.params.slideClass)
        )
        .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((n) => {
        const i = e.getSlideClasses(n);
        t.push({ slideEl: n, classNames: i }), e.emit("_slideClass", n, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: n,
        slides: i,
        slidesGrid: s,
        slidesSizesGrid: r,
        size: o,
        activeIndex: a,
      } = this;
      let l = 1;
      if (n.centeredSlides) {
        let e,
          t = i[a].swiperSlideSize;
        for (let n = a + 1; n < i.length; n += 1)
          i[n] &&
            !e &&
            ((t += i[n].swiperSlideSize), (l += 1), t > o && (e = !0));
        for (let n = a - 1; n >= 0; n -= 1)
          i[n] &&
            !e &&
            ((t += i[n].swiperSlideSize), (l += 1), t > o && (e = !0));
      } else if ("current" === e)
        for (let e = a + 1; e < i.length; e += 1) {
          (t ? s[e] + r[e] - s[a] < o : s[e] - s[a] < o) && (l += 1);
        }
      else
        for (let e = a - 1; e >= 0; e -= 1) {
          s[a] - s[e] < o && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: n } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          n = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let s;
      n.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (i(), e.params.autoHeight && e.updateAutoHeight())
          : ((s =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            s || i()),
        n.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const n = this,
        i = n.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (n.$el
            .removeClass(`${n.params.containerModifierClass}${i}`)
            .addClass(`${n.params.containerModifierClass}${e}`),
          n.emitContainerClasses(),
          (n.params.direction = e),
          n.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          n.emit("changeDirection"),
          t && n.update()),
        n
      );
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const n = Mt(e || t.params.el);
      if (!(e = n[0])) return !1;
      e.swiper = t;
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let s = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = Mt(e.shadowRoot.querySelector(i()));
          return (t.children = (e) => n.children(e)), t;
        }
        return n.children(i());
      })();
      if (0 === s.length && t.params.createElements) {
        const e = wt().createElement("div");
        (s = Mt(e)),
          (e.className = t.params.wrapperClass),
          n.append(e),
          n.children(`.${t.params.slideClass}`).each((e) => {
            s.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: n,
          el: e,
          $wrapperEl: s,
          wrapperEl: s[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction")),
          wrongRTL: "-webkit-box" === s.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const n = this,
        { params: i, $el: s, $wrapperEl: r, slides: o } = n;
      return (
        void 0 === n.params ||
          n.destroyed ||
          (n.emit("beforeDestroy"),
          (n.initialized = !1),
          n.detachEvents(),
          i.loop && n.loopDestroy(),
          t &&
            (n.removeClasses(),
            s.removeAttr("style"),
            r.removeAttr("style"),
            o &&
              o.length &&
              o
                .removeClass(
                  [
                    i.slideVisibleClass,
                    i.slideActiveClass,
                    i.slideNextClass,
                    i.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          n.emit("destroy"),
          Object.keys(n.eventsListeners).forEach((e) => {
            n.off(e);
          }),
          !1 !== e &&
            ((n.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(n)),
          (n.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      Bt(hn, e);
    }
    static get extendedDefaults() {
      return hn;
    }
    static get defaults() {
      return pn;
    }
    static installModule(e) {
      mn.prototype.__modules__ || (mn.prototype.__modules__ = []);
      const t = mn.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => mn.installModule(e)), mn)
        : (mn.installModule(e), mn);
    }
  }
  Object.keys(fn).forEach((e) => {
    Object.keys(fn[e]).forEach((t) => {
      mn.prototype[t] = fn[e][t];
    });
  }),
    mn.use([
      function (e) {
        let { swiper: t, on: n, emit: i } = e;
        const s = Et();
        let r = null,
          o = null;
        const a = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          l = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        n("init", () => {
          t.params.resizeObserver && void 0 !== s.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((r = new ResizeObserver((e) => {
                o = s.requestAnimationFrame(() => {
                  const { width: n, height: i } = t;
                  let s = n,
                    r = i;
                  e.forEach((e) => {
                    let { contentBoxSize: n, contentRect: i, target: o } = e;
                    (o && o !== t.el) ||
                      ((s = i ? i.width : (n[0] || n).inlineSize),
                      (r = i ? i.height : (n[0] || n).blockSize));
                  }),
                    (s === n && r === i) || a();
                });
              })),
              r.observe(t.el))
            : (s.addEventListener("resize", a),
              s.addEventListener("orientationchange", l));
        }),
          n("destroy", () => {
            o && s.cancelAnimationFrame(o),
              r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
              s.removeEventListener("resize", a),
              s.removeEventListener("orientationchange", l);
          });
      },
      function (e) {
        let { swiper: t, extendParams: n, on: i, emit: s } = e;
        const r = [],
          o = Et(),
          a = function (e, t) {
            void 0 === t && (t = {});
            const n = new (o.MutationObserver || o.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void s("observerUpdate", e[0]);
                const t = function () {
                  s("observerUpdate", e[0]);
                };
                o.requestAnimationFrame
                  ? o.requestAnimationFrame(t)
                  : o.setTimeout(t, 0);
              }
            );
            n.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              r.push(n);
          };
        n({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = t.$el.parents();
                for (let t = 0; t < e.length; t += 1) a(e[t]);
              }
              a(t.$el[0], { childList: t.params.observeSlideChildren }),
                a(t.$wrapperEl[0], { attributes: !1 });
            }
          }),
          i("destroy", () => {
            r.forEach((e) => {
              e.disconnect();
            }),
              r.splice(0, r.length);
          });
      },
    ]);
  const gn = mn;
  function vn(e, t, n, i) {
    const s = wt();
    return (
      e.params.createElements &&
        Object.keys(i).forEach((r) => {
          if (!n[r] && !0 === n.auto) {
            let o = e.$el.children(`.${i[r]}`)[0];
            o ||
              ((o = s.createElement("div")),
              (o.className = i[r]),
              e.$el.append(o)),
              (n[r] = o),
              (t[r] = o);
          }
        }),
      n
    );
  }
  function bn(e) {
    let { swiper: t, extendParams: n, on: i, emit: s } = e;
    function r(e) {
      let n;
      return (
        e &&
          ((n = Mt(e)),
          t.params.uniqueNavElements &&
            "string" == typeof e &&
            n.length > 1 &&
            1 === t.$el.find(e).length &&
            (n = t.$el.find(e))),
        n
      );
    }
    function o(e, n) {
      const i = t.params.navigation;
      e &&
        e.length > 0 &&
        (e[n ? "addClass" : "removeClass"](i.disabledClass),
        e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = n),
        t.params.watchOverflow &&
          t.enabled &&
          e[t.isLocked ? "addClass" : "removeClass"](i.lockClass));
    }
    function a() {
      if (t.params.loop) return;
      const { $nextEl: e, $prevEl: n } = t.navigation;
      o(n, t.isBeginning && !t.params.rewind),
        o(e, t.isEnd && !t.params.rewind);
    }
    function l(e) {
      e.preventDefault(),
        (!t.isBeginning || t.params.loop || t.params.rewind) && t.slidePrev();
    }
    function c(e) {
      e.preventDefault(),
        (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext();
    }
    function d() {
      const e = t.params.navigation;
      if (
        ((t.params.navigation = vn(
          t,
          t.originalParams.navigation,
          t.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
        )),
        !e.nextEl && !e.prevEl)
      )
        return;
      const n = r(e.nextEl),
        i = r(e.prevEl);
      n && n.length > 0 && n.on("click", c),
        i && i.length > 0 && i.on("click", l),
        Object.assign(t.navigation, {
          $nextEl: n,
          nextEl: n && n[0],
          $prevEl: i,
          prevEl: i && i[0],
        }),
        t.enabled ||
          (n && n.addClass(e.lockClass), i && i.addClass(e.lockClass));
    }
    function p() {
      const { $nextEl: e, $prevEl: n } = t.navigation;
      e &&
        e.length &&
        (e.off("click", c), e.removeClass(t.params.navigation.disabledClass)),
        n &&
          n.length &&
          (n.off("click", l), n.removeClass(t.params.navigation.disabledClass));
    }
    n({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
      },
    }),
      (t.navigation = {
        nextEl: null,
        $nextEl: null,
        prevEl: null,
        $prevEl: null,
      }),
      i("init", () => {
        d(), a();
      }),
      i("toEdge fromEdge lock unlock", () => {
        a();
      }),
      i("destroy", () => {
        p();
      }),
      i("enable disable", () => {
        const { $nextEl: e, $prevEl: n } = t.navigation;
        e &&
          e[t.enabled ? "removeClass" : "addClass"](
            t.params.navigation.lockClass
          ),
          n &&
            n[t.enabled ? "removeClass" : "addClass"](
              t.params.navigation.lockClass
            );
      }),
      i("click", (e, n) => {
        const { $nextEl: i, $prevEl: r } = t.navigation,
          o = n.target;
        if (t.params.navigation.hideOnClick && !Mt(o).is(r) && !Mt(o).is(i)) {
          if (
            t.pagination &&
            t.params.pagination &&
            t.params.pagination.clickable &&
            (t.pagination.el === o || t.pagination.el.contains(o))
          )
            return;
          let e;
          i
            ? (e = i.hasClass(t.params.navigation.hiddenClass))
            : r && (e = r.hasClass(t.params.navigation.hiddenClass)),
            s(!0 === e ? "navigationShow" : "navigationHide"),
            i && i.toggleClass(t.params.navigation.hiddenClass),
            r && r.toggleClass(t.params.navigation.hiddenClass);
        }
      }),
      Object.assign(t.navigation, { update: a, init: d, destroy: p });
  }
  function yn(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function wn(e) {
    let { swiper: t, extendParams: n, on: i, emit: s } = e;
    const r = "swiper-pagination";
    let o;
    n({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${r}-bullet`,
        bulletActiveClass: `${r}-bullet-active`,
        modifierClass: `${r}-`,
        currentClass: `${r}-current`,
        totalClass: `${r}-total`,
        hiddenClass: `${r}-hidden`,
        progressbarFillClass: `${r}-progressbar-fill`,
        progressbarOppositeClass: `${r}-progressbar-opposite`,
        clickableClass: `${r}-clickable`,
        lockClass: `${r}-lock`,
        horizontalClass: `${r}-horizontal`,
        verticalClass: `${r}-vertical`,
      },
    }),
      (t.pagination = { el: null, $el: null, bullets: [] });
    let a = 0;
    function l() {
      return (
        !t.params.pagination.el ||
        !t.pagination.el ||
        !t.pagination.$el ||
        0 === t.pagination.$el.length
      );
    }
    function c(e, n) {
      const { bulletActiveClass: i } = t.params.pagination;
      e[n]().addClass(`${i}-${n}`)[n]().addClass(`${i}-${n}-${n}`);
    }
    function d() {
      const e = t.rtl,
        n = t.params.pagination;
      if (l()) return;
      const i =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        r = t.pagination.$el;
      let d;
      const p = t.params.loop
        ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup)
        : t.snapGrid.length;
      if (
        (t.params.loop
          ? ((d = Math.ceil(
              (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
            )),
            d > i - 1 - 2 * t.loopedSlides && (d -= i - 2 * t.loopedSlides),
            d > p - 1 && (d -= p),
            d < 0 && "bullets" !== t.params.paginationType && (d = p + d))
          : (d = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
        "bullets" === n.type &&
          t.pagination.bullets &&
          t.pagination.bullets.length > 0)
      ) {
        const i = t.pagination.bullets;
        let s, l, p;
        if (
          (n.dynamicBullets &&
            ((o = i.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
            r.css(
              t.isHorizontal() ? "width" : "height",
              o * (n.dynamicMainBullets + 4) + "px"
            ),
            n.dynamicMainBullets > 1 &&
              void 0 !== t.previousIndex &&
              ((a += d - (t.previousIndex - t.loopedSlides || 0)),
              a > n.dynamicMainBullets - 1
                ? (a = n.dynamicMainBullets - 1)
                : a < 0 && (a = 0)),
            (s = Math.max(d - a, 0)),
            (l = s + (Math.min(i.length, n.dynamicMainBullets) - 1)),
            (p = (l + s) / 2)),
          i.removeClass(
            ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
              .map((e) => `${n.bulletActiveClass}${e}`)
              .join(" ")
          ),
          r.length > 1)
        )
          i.each((e) => {
            const t = Mt(e),
              i = t.index();
            i === d && t.addClass(n.bulletActiveClass),
              n.dynamicBullets &&
                (i >= s && i <= l && t.addClass(`${n.bulletActiveClass}-main`),
                i === s && c(t, "prev"),
                i === l && c(t, "next"));
          });
        else {
          const e = i.eq(d),
            r = e.index();
          if ((e.addClass(n.bulletActiveClass), n.dynamicBullets)) {
            const e = i.eq(s),
              o = i.eq(l);
            for (let e = s; e <= l; e += 1)
              i.eq(e).addClass(`${n.bulletActiveClass}-main`);
            if (t.params.loop)
              if (r >= i.length) {
                for (let e = n.dynamicMainBullets; e >= 0; e -= 1)
                  i.eq(i.length - e).addClass(`${n.bulletActiveClass}-main`);
                i.eq(i.length - n.dynamicMainBullets - 1).addClass(
                  `${n.bulletActiveClass}-prev`
                );
              } else c(e, "prev"), c(o, "next");
            else c(e, "prev"), c(o, "next");
          }
        }
        if (n.dynamicBullets) {
          const s = Math.min(i.length, n.dynamicMainBullets + 4),
            r = (o * s - o) / 2 - p * o,
            a = e ? "right" : "left";
          i.css(t.isHorizontal() ? a : "top", `${r}px`);
        }
      }
      if (
        ("fraction" === n.type &&
          (r.find(yn(n.currentClass)).text(n.formatFractionCurrent(d + 1)),
          r.find(yn(n.totalClass)).text(n.formatFractionTotal(p))),
        "progressbar" === n.type)
      ) {
        let e;
        e = n.progressbarOpposite
          ? t.isHorizontal()
            ? "vertical"
            : "horizontal"
          : t.isHorizontal()
          ? "horizontal"
          : "vertical";
        const i = (d + 1) / p;
        let s = 1,
          o = 1;
        "horizontal" === e ? (s = i) : (o = i),
          r
            .find(yn(n.progressbarFillClass))
            .transform(`translate3d(0,0,0) scaleX(${s}) scaleY(${o})`)
            .transition(t.params.speed);
      }
      "custom" === n.type && n.renderCustom
        ? (r.html(n.renderCustom(t, d + 1, p)), s("paginationRender", r[0]))
        : s("paginationUpdate", r[0]),
        t.params.watchOverflow &&
          t.enabled &&
          r[t.isLocked ? "addClass" : "removeClass"](n.lockClass);
    }
    function p() {
      const e = t.params.pagination;
      if (l()) return;
      const n =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        i = t.pagination.$el;
      let r = "";
      if ("bullets" === e.type) {
        let s = t.params.loop
          ? Math.ceil((n - 2 * t.loopedSlides) / t.params.slidesPerGroup)
          : t.snapGrid.length;
        t.params.freeMode &&
          t.params.freeMode.enabled &&
          !t.params.loop &&
          s > n &&
          (s = n);
        for (let n = 0; n < s; n += 1)
          e.renderBullet
            ? (r += e.renderBullet.call(t, n, e.bulletClass))
            : (r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
        i.html(r), (t.pagination.bullets = i.find(yn(e.bulletClass)));
      }
      "fraction" === e.type &&
        ((r = e.renderFraction
          ? e.renderFraction.call(t, e.currentClass, e.totalClass)
          : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
        i.html(r)),
        "progressbar" === e.type &&
          ((r = e.renderProgressbar
            ? e.renderProgressbar.call(t, e.progressbarFillClass)
            : `<span class="${e.progressbarFillClass}"></span>`),
          i.html(r)),
        "custom" !== e.type && s("paginationRender", t.pagination.$el[0]);
    }
    function u() {
      t.params.pagination = vn(
        t,
        t.originalParams.pagination,
        t.params.pagination,
        { el: "swiper-pagination" }
      );
      const e = t.params.pagination;
      if (!e.el) return;
      let n = Mt(e.el);
      0 !== n.length &&
        (t.params.uniqueNavElements &&
          "string" == typeof e.el &&
          n.length > 1 &&
          ((n = t.$el.find(e.el)),
          n.length > 1 &&
            (n = n.filter((e) => Mt(e).parents(".swiper")[0] === t.el))),
        "bullets" === e.type && e.clickable && n.addClass(e.clickableClass),
        n.addClass(e.modifierClass + e.type),
        n.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
        "bullets" === e.type &&
          e.dynamicBullets &&
          (n.addClass(`${e.modifierClass}${e.type}-dynamic`),
          (a = 0),
          e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
        "progressbar" === e.type &&
          e.progressbarOpposite &&
          n.addClass(e.progressbarOppositeClass),
        e.clickable &&
          n.on("click", yn(e.bulletClass), function (e) {
            e.preventDefault();
            let n = Mt(this).index() * t.params.slidesPerGroup;
            t.params.loop && (n += t.loopedSlides), t.slideTo(n);
          }),
        Object.assign(t.pagination, { $el: n, el: n[0] }),
        t.enabled || n.addClass(e.lockClass));
    }
    function f() {
      const e = t.params.pagination;
      if (l()) return;
      const n = t.pagination.$el;
      n.removeClass(e.hiddenClass),
        n.removeClass(e.modifierClass + e.type),
        n.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
        t.pagination.bullets &&
          t.pagination.bullets.removeClass &&
          t.pagination.bullets.removeClass(e.bulletActiveClass),
        e.clickable && n.off("click", yn(e.bulletClass));
    }
    i("init", () => {
      u(), p(), d();
    }),
      i("activeIndexChange", () => {
        (t.params.loop || void 0 === t.snapIndex) && d();
      }),
      i("snapIndexChange", () => {
        t.params.loop || d();
      }),
      i("slidesLengthChange", () => {
        t.params.loop && (p(), d());
      }),
      i("snapGridLengthChange", () => {
        t.params.loop || (p(), d());
      }),
      i("destroy", () => {
        f();
      }),
      i("enable disable", () => {
        const { $el: e } = t.pagination;
        e &&
          e[t.enabled ? "removeClass" : "addClass"](
            t.params.pagination.lockClass
          );
      }),
      i("lock unlock", () => {
        d();
      }),
      i("click", (e, n) => {
        const i = n.target,
          { $el: r } = t.pagination;
        if (
          t.params.pagination.el &&
          t.params.pagination.hideOnClick &&
          r.length > 0 &&
          !Mt(i).hasClass(t.params.pagination.bulletClass)
        ) {
          if (
            t.navigation &&
            ((t.navigation.nextEl && i === t.navigation.nextEl) ||
              (t.navigation.prevEl && i === t.navigation.prevEl))
          )
            return;
          const e = r.hasClass(t.params.pagination.hiddenClass);
          s(!0 === e ? "paginationShow" : "paginationHide"),
            r.toggleClass(t.params.pagination.hiddenClass);
        }
      }),
      Object.assign(t.pagination, {
        render: p,
        update: d,
        init: u,
        destroy: f,
      });
  }
  function xn(e) {
    let { swiper: t, extendParams: n, on: i } = e;
    n({ parallax: { enabled: !1 } });
    const s = (e, n) => {
        const { rtl: i } = t,
          s = Mt(e),
          r = i ? -1 : 1,
          o = s.attr("data-swiper-parallax") || "0";
        let a = s.attr("data-swiper-parallax-x"),
          l = s.attr("data-swiper-parallax-y");
        const c = s.attr("data-swiper-parallax-scale"),
          d = s.attr("data-swiper-parallax-opacity");
        if (
          (a || l
            ? ((a = a || "0"), (l = l || "0"))
            : t.isHorizontal()
            ? ((a = o), (l = "0"))
            : ((l = o), (a = "0")),
          (a =
            a.indexOf("%") >= 0
              ? parseInt(a, 10) * n * r + "%"
              : a * n * r + "px"),
          (l = l.indexOf("%") >= 0 ? parseInt(l, 10) * n + "%" : l * n + "px"),
          null != d)
        ) {
          const e = d - (d - 1) * (1 - Math.abs(n));
          s[0].style.opacity = e;
        }
        if (null == c) s.transform(`translate3d(${a}, ${l}, 0px)`);
        else {
          const e = c - (c - 1) * (1 - Math.abs(n));
          s.transform(`translate3d(${a}, ${l}, 0px) scale(${e})`);
        }
      },
      r = () => {
        const { $el: e, slides: n, progress: i, snapGrid: r } = t;
        e
          .children(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
          )
          .each((e) => {
            s(e, i);
          }),
          n.each((e, n) => {
            let o = e.progress;
            t.params.slidesPerGroup > 1 &&
              "auto" !== t.params.slidesPerView &&
              (o += Math.ceil(n / 2) - i * (r.length - 1)),
              (o = Math.min(Math.max(o, -1), 1)),
              Mt(e)
                .find(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                )
                .each((e) => {
                  s(e, o);
                });
          });
      };
    i("beforeInit", () => {
      t.params.parallax.enabled &&
        ((t.params.watchSlidesProgress = !0),
        (t.originalParams.watchSlidesProgress = !0));
    }),
      i("init", () => {
        t.params.parallax.enabled && r();
      }),
      i("setTranslate", () => {
        t.params.parallax.enabled && r();
      }),
      i("setTransition", (e, n) => {
        t.params.parallax.enabled &&
          (function (e) {
            void 0 === e && (e = t.params.speed);
            const { $el: n } = t;
            n.find(
              "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
            ).each((t) => {
              const n = Mt(t);
              let i =
                parseInt(n.attr("data-swiper-parallax-duration"), 10) || e;
              0 === e && (i = 0), n.transition(i);
            });
          })(n);
      });
  }
  function En(e) {
    let t,
      { swiper: n, extendParams: i, on: s, emit: r } = e;
    function o() {
      const e = n.slides.eq(n.activeIndex);
      let i = n.params.autoplay.delay;
      e.attr("data-swiper-autoplay") &&
        (i = e.attr("data-swiper-autoplay") || n.params.autoplay.delay),
        clearTimeout(t),
        (t = Pt(() => {
          let e;
          n.params.autoplay.reverseDirection
            ? n.params.loop
              ? (n.loopFix(),
                (e = n.slidePrev(n.params.speed, !0, !0)),
                r("autoplay"))
              : n.isBeginning
              ? n.params.autoplay.stopOnLastSlide
                ? l()
                : ((e = n.slideTo(n.slides.length - 1, n.params.speed, !0, !0)),
                  r("autoplay"))
              : ((e = n.slidePrev(n.params.speed, !0, !0)), r("autoplay"))
            : n.params.loop
            ? (n.loopFix(),
              (e = n.slideNext(n.params.speed, !0, !0)),
              r("autoplay"))
            : n.isEnd
            ? n.params.autoplay.stopOnLastSlide
              ? l()
              : ((e = n.slideTo(0, n.params.speed, !0, !0)), r("autoplay"))
            : ((e = n.slideNext(n.params.speed, !0, !0)), r("autoplay")),
            ((n.params.cssMode && n.autoplay.running) || !1 === e) && o();
        }, i));
    }
    function a() {
      return (
        void 0 === t &&
        !n.autoplay.running &&
        ((n.autoplay.running = !0), r("autoplayStart"), o(), !0)
      );
    }
    function l() {
      return (
        !!n.autoplay.running &&
        void 0 !== t &&
        (t && (clearTimeout(t), (t = void 0)),
        (n.autoplay.running = !1),
        r("autoplayStop"),
        !0)
      );
    }
    function c(e) {
      n.autoplay.running &&
        (n.autoplay.paused ||
          (t && clearTimeout(t),
          (n.autoplay.paused = !0),
          0 !== e && n.params.autoplay.waitForTransition
            ? ["transitionend", "webkitTransitionEnd"].forEach((e) => {
                n.$wrapperEl[0].addEventListener(e, p);
              })
            : ((n.autoplay.paused = !1), o())));
    }
    function d() {
      const e = wt();
      "hidden" === e.visibilityState && n.autoplay.running && c(),
        "visible" === e.visibilityState &&
          n.autoplay.paused &&
          (o(), (n.autoplay.paused = !1));
    }
    function p(e) {
      n &&
        !n.destroyed &&
        n.$wrapperEl &&
        e.target === n.$wrapperEl[0] &&
        (["transitionend", "webkitTransitionEnd"].forEach((e) => {
          n.$wrapperEl[0].removeEventListener(e, p);
        }),
        (n.autoplay.paused = !1),
        n.autoplay.running ? o() : l());
    }
    function u() {
      n.params.autoplay.disableOnInteraction ? l() : (r("autoplayPause"), c()),
        ["transitionend", "webkitTransitionEnd"].forEach((e) => {
          n.$wrapperEl[0].removeEventListener(e, p);
        });
    }
    function f() {
      n.params.autoplay.disableOnInteraction ||
        ((n.autoplay.paused = !1), r("autoplayResume"), o());
    }
    (n.autoplay = { running: !1, paused: !1 }),
      i({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      }),
      s("init", () => {
        if (n.params.autoplay.enabled) {
          a();
          wt().addEventListener("visibilitychange", d),
            n.params.autoplay.pauseOnMouseEnter &&
              (n.$el.on("mouseenter", u), n.$el.on("mouseleave", f));
        }
      }),
      s("beforeTransitionStart", (e, t, i) => {
        n.autoplay.running &&
          (i || !n.params.autoplay.disableOnInteraction
            ? n.autoplay.pause(t)
            : l());
      }),
      s("sliderFirstMove", () => {
        n.autoplay.running &&
          (n.params.autoplay.disableOnInteraction ? l() : c());
      }),
      s("touchEnd", () => {
        n.params.cssMode &&
          n.autoplay.paused &&
          !n.params.autoplay.disableOnInteraction &&
          o();
      }),
      s("destroy", () => {
        n.$el.off("mouseenter", u),
          n.$el.off("mouseleave", f),
          n.autoplay.running && l();
        wt().removeEventListener("visibilitychange", d);
      }),
      Object.assign(n.autoplay, { pause: c, run: o, start: a, stop: l });
  }
  function Tn() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)'
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  window.addEventListener("load", function (e) {
    Tn(),
      document.querySelector(".main-block__slider") &&
        new gn(".main-block__slider", {
          modules: [bn, wn, xn, En],
          autoplay: { delay: 3e3, disableOnInteraction: !1 },
          observer: !0,
          observeParents: !0,
          slidesPerView: 1,
          spaceBetween: 50,
          parallax: !0,
          speed: 800,
          loop: !0,
          pagination: {
            el: ".controll-main-block__dotts",
            clickable: !0,
            dynamicBullets: !0,
          },
          on: {
            init: function (e) {
              const t = document.querySelector(".fraction-controll__all"),
                n = document.querySelectorAll(
                  ".slide-main-block:not(.swiper-slide-duplicate)"
                );
              t.innerHTML = n.length < 10 ? `0${n.length}` : n.length;
            },
            slideChange: function (e) {
              document.querySelector(".fraction-controll__current").innerHTML =
                e.realIndex + 1 < 10 ? `0${e.realIndex + 1}` : e.realIndex + 1;
            },
          },
        }),
      document.querySelector(".products-slider") &&
        new gn(".products__slider__slider", {
          modules: [bn, wn, xn, En],
          autoplay: { delay: 3e3, disableOnInteraction: !1 },
          observer: !0,
          watchOverflow: !0,
          observeParents: !0,
          slidesPerView: 4,
          spaceBetween: 30,
          parallax: !0,
          speed: 800,
          pagination: {
            el: ".products__slider__dotts",
            clickable: !0,
            dynamicBullets: !0,
            dynamicMainBullets: 3,
          },
          breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            992: { slidesPerView: 4, spaceBetween: 20 },
            1370: { slidesPerView: 4, spaceBetween: 30 },
          },
          on: {},
        }),
      document.querySelector(".products-new") &&
        new gn(".product-new__slider", {
          modules: [bn, wn, En],
          autoplay: { delay: 3e3, disableOnInteraction: !1 },
          observer: !0,
          watchOverflow: !0,
          observeParents: !0,
          slidesPerView: 3,
          spaceBetween: 30,
          parallax: !0,
          autoHeight: !0,
          speed: 800,
          pagination: {
            el: ".products-new__dotts",
            clickable: !0,
            dynamicBullets: !0,
            dynamicMainBullets: 3,
          },
          breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 1, spaceBetween: 20 },
            992: { slidesPerView: 2, spaceBetween: 20 },
            1330: { slidesPerView: 3, spaceBetween: 30 },
          },
          on: {},
        });
  });
  let Sn = !1;
  setTimeout(() => {
    if (Sn) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    document.addEventListener("click", function (e) {
      const t = e.target;
      if (t.closest("[data-parent]")) {
        const n = t.dataset.parent ? t.dataset.parent : null,
          i = document.querySelector(`[data-submenu="${n}"]`);
        if (i) {
          const e = document.querySelector("._sub-menu-active"),
            n = document.querySelector("._sub-menu-open");
          e &&
            e !== t &&
            (e.classList.remove("_sub-menu-active"),
            n.classList.remove("_sub-menu-open"),
            document.documentElement.classList.remove("sub-menu-open")),
            document.documentElement.classList.toggle("sub-menu-open"),
            t.classList.toggle("_sub-menu-active"),
            i.classList.toggle("_sub-menu-open");
        } else console.log("Error");
        e.preventDefault();
      }
      t.closest(".menu-top-header__link_catalog") &&
        (document.documentElement.classList.add("catalog-open"),
        e.preventDefault());
      t.closest(".menu-catalog__back") &&
        (document.documentElement.classList.remove("catalog-open"),
        document.querySelector("._sub-menu-active") &&
          document
            .querySelector("._sub-menu-active")
            .classList.remove("_sub-menu-active"),
        document.querySelector("._sub-menu-open") &&
          document
            .querySelector("._sub-menu-open")
            .classList.remove("_sub-menu-open"),
        e.preventDefault());
      t.closest(".sub-menu-catalog__back") &&
        (document.documentElement.classList.remove("sub-menu-open"),
        document.querySelector("._sub-menu-active") &&
          document
            .querySelector("._sub-menu-active")
            .classList.remove("_sub-menu-active"),
        document.querySelector("._sub-menu-open") &&
          document
            .querySelector("._sub-menu-open")
            .classList.remove("_sub-menu-open"),
        e.preventDefault());
    });
  const Cn = document.querySelectorAll(".sub-menu-catalog__block");
  Cn.length &&
    Cn.forEach((e) => {
      const t = e.querySelectorAll(".sub-menu-catalog__category").length;
      e.classList.add(`sub-menu-catalog__block_${t}`);
    }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          s &&
            (r(),
            document.documentElement.classList.toggle("menu-open"),
            document.documentElement.classList.contains("catalog-open") &&
              document.documentElement.classList.remove("catalog-open"),
            document.documentElement.classList.contains("sub-menu-open") &&
              document.documentElement.classList.remove("sub-menu-open"),
            document.querySelector(".sub-menu-catalog__block") &&
              document
                .querySelector(".sub-menu-catalog__block")
                .classList.remove("_sub-menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const t = Array.from(e).filter(function (e, t, n) {
          return !e.dataset.spollers.split(",")[0];
        });
        t.length && r(t);
        let s = c(e, "spollers");
        function r(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  o(e),
                  e.addEventListener("click", a))
                : (e.classList.remove("_spoller-init"),
                  o(e, !1),
                  e.removeEventListener("click", a));
          });
        }
        function o(e, t = !0) {
          const n = e.querySelectorAll("[data-spoller]");
          n.length > 0 &&
            n.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            });
        }
        function a(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const s = t.closest("[data-spoller]"),
              r = s.closest("[data-spollers]"),
              o = !!r.hasAttribute("data-one-spoller");
            r.querySelectorAll("._slide").length ||
              (o && !s.classList.contains("_spoller-active") && l(r),
              s.classList.toggle("_spoller-active"),
              ((e, t = 500) => {
                e.hidden ? i(e, t) : n(e, t);
              })(s.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function l(e) {
          const t = e.querySelector("[data-spoller]._spoller-active");
          t &&
            (t.classList.remove("_spoller-active"),
            n(t.nextElementSibling, 500));
        }
        s &&
          s.length &&
          s.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              r(e.itemsArray, e.matchMedia);
            }),
              r(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    new t({}),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            u.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && u.validateInput(t));
        });
    })(),
    (function (e) {
      const t = document.forms;
      if (t.length)
        for (const e of t)
          e.addEventListener("submit", function (e) {
            n(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              u.formClean(t);
            });
      async function n(t, n) {
        if (0 === (e ? u.getErrors(t) : 0)) {
          if (t.hasAttribute("data-ajax")) {
            n.preventDefault();
            const e = t.getAttribute("action")
                ? t.getAttribute("action").trim()
                : "#",
              s = t.getAttribute("method")
                ? t.getAttribute("method").trim()
                : "GET",
              r = new FormData(t);
            t.classList.add("_sending");
            const o = await fetch(e, { method: s, body: r });
            if (o.ok) {
              await o.json();
              t.classList.remove("_sending"), i(t);
            } else alert("Ошибка"), t.classList.remove("_sending");
          } else t.hasAttribute("data-dev") && (n.preventDefault(), i(t));
        } else {
          n.preventDefault();
          const e = t.querySelector("._form-error");
          e && t.hasAttribute("data-goto-error") && d(e, !0, 1e3);
        }
      }
      function i(e) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: e } })
        ),
          u.formClean(e),
          l(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0),
    (function () {
      const e = document.querySelectorAll(".rating");
      e.length > 0 &&
        (function () {
          let t, n;
          for (let t = 0; t < e.length; t++) {
            i(e[t]);
          }
          function i(e) {
            s(e), r(), e.classList.contains("rating_set") && o(e);
          }
          function s(e) {
            (t = e.querySelector(".rating__active")),
              (n = e.querySelector(".rating__value"));
          }
          function r(e = n.innerHTML) {
            const i = e / 0.05;
            t.style.width = `${i}%`;
          }
          function o(e) {
            const t = e.querySelectorAll(".rating__item");
            for (let i = 0; i < t.length; i++) {
              const o = t[i];
              o.addEventListener("mouseenter", function (t) {
                s(e), r(o.value);
              }),
                o.addEventListener("mouseleave", function (e) {
                  r();
                }),
                o.addEventListener("click", function (t) {
                  s(e),
                    e.dataset.ajax
                      ? a(o.value, e)
                      : ((n.innerHTML = i + 1), r());
                });
            }
          }
          async function a(e, t) {
            if (!t.classList.contains("rating_sending")) {
              t.classList.add("rating_sending");
              let e = await fetch("rating.json", { method: "GET" });
              if (e.ok) {
                const i = (await e.json()).newRating;
                (n.innerHTML = i), r(), t.classList.remove("rating_sending");
              } else alert("Ошибка"), t.classList.remove("rating_sending");
            }
          }
        })();
    })();
})();
