/*
 Highstock JS v5.0.12 (2017-05-24)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (L, T) {
  "object" === typeof module && module.exports
    ? (module.exports = L.document ? T(L) : T)
    : (L.Highcharts = T(L));
})("undefined" !== typeof window ? window : this, function (L) {
  L = (function () {
    var a = window,
      E = a.document,
      B = (a.navigator && a.navigator.userAgent) || "",
      F =
        E &&
        E.createElementNS &&
        !!E.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
      D = /(edge|msie|trident)/i.test(B) && !window.opera,
      n = !F,
      h = /Firefox/.test(B),
      u = h && 4 > parseInt(B.split("Firefox/")[1], 10);
    return a.Highcharts
      ? a.Highcharts.error(16, !0)
      : {
          product: "Highstock",
          version: "5.0.12",
          deg2rad: (2 * Math.PI) / 360,
          doc: E,
          hasBidiBug: u,
          hasTouch: E && void 0 !== E.documentElement.ontouchstart,
          isMS: D,
          isWebKit: /AppleWebKit/.test(B),
          isFirefox: h,
          isTouchDevice: /(Mobile|Android|Windows Phone)/.test(B),
          SVG_NS: "http://www.w3.org/2000/svg",
          chartCount: 0,
          seriesTypes: {},
          symbolSizes: {},
          svg: F,
          vml: n,
          win: a,
          marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
          noop: function () {},
          charts: [],
        };
  })();
  (function (a) {
    var E = [],
      B = a.charts,
      F = a.doc,
      D = a.win;
    a.error = function (n, h) {
      n = a.isNumber(n)
        ? "Highcharts error #" + n + ": www.highcharts.com/errors/" + n
        : n;
      if (h) throw Error(n);
      D.console && console.log(n);
    };
    a.Fx = function (a, h, u) {
      this.options = h;
      this.elem = a;
      this.prop = u;
    };
    a.Fx.prototype = {
      dSetter: function () {
        var a = this.paths[0],
          h = this.paths[1],
          u = [],
          r = this.now,
          x = a.length,
          t;
        if (1 === r) u = this.toD;
        else if (x === h.length && 1 > r)
          for (; x--; )
            (t = parseFloat(a[x])),
              (u[x] = isNaN(t) ? a[x] : r * parseFloat(h[x] - t) + t);
        else u = h;
        this.elem.attr("d", u, null, !0);
      },
      update: function () {
        var a = this.elem,
          h = this.prop,
          u = this.now,
          r = this.options.step;
        if (this[h + "Setter"]) this[h + "Setter"]();
        else
          a.attr
            ? a.element && a.attr(h, u, null, !0)
            : (a.style[h] = u + this.unit);
        r && r.call(a, u, this);
      },
      run: function (a, h, u) {
        var r = this,
          n = function (a) {
            return n.stopped ? !1 : r.step(a);
          },
          t;
        this.startTime = +new Date();
        this.start = a;
        this.end = h;
        this.unit = u;
        this.now = this.start;
        this.pos = 0;
        n.elem = this.elem;
        n.prop = this.prop;
        n() &&
          1 === E.push(n) &&
          (n.timerId = setInterval(function () {
            for (t = 0; t < E.length; t++) E[t]() || E.splice(t--, 1);
            E.length || clearInterval(n.timerId);
          }, 13));
      },
      step: function (n) {
        var h = +new Date(),
          u,
          r = this.options,
          x = this.elem,
          t = r.complete,
          m = r.duration,
          f = r.curAnim;
        x.attr && !x.element
          ? (n = !1)
          : n || h >= m + this.startTime
          ? ((this.now = this.end),
            (this.pos = 1),
            this.update(),
            (u = f[this.prop] = !0),
            a.objectEach(f, function (a) {
              !0 !== a && (u = !1);
            }),
            u && t && t.call(x),
            (n = !1))
          : ((this.pos = r.easing((h - this.startTime) / m)),
            (this.now = this.start + (this.end - this.start) * this.pos),
            this.update(),
            (n = !0));
        return n;
      },
      initPath: function (n, h, u) {
        function r(a) {
          var c, b;
          for (A = a.length; A--; )
            (c = "M" === a[A] || "L" === a[A]),
              (b = /[a-zA-Z]/.test(a[A + 3])),
              c &&
                b &&
                a.splice(A + 1, 0, a[A + 1], a[A + 2], a[A + 1], a[A + 2]);
        }
        function x(a, c) {
          for (; a.length < p; ) {
            a[0] = c[p - a.length];
            var b = a.slice(0, d);
            [].splice.apply(a, [0, 0].concat(b));
            v &&
              ((b = a.slice(a.length - d)),
              [].splice.apply(a, [a.length, 0].concat(b)),
              A--);
          }
          a[0] = "M";
        }
        function t(a, c) {
          for (var q = (p - a.length) / d; 0 < q && q--; )
            (b = a.slice().splice(a.length / H - d, d * H)),
              (b[0] = c[p - d - q * d]),
              e && ((b[d - 6] = b[d - 2]), (b[d - 5] = b[d - 1])),
              [].splice.apply(a, [a.length / H, 0].concat(b)),
              v && q--;
        }
        h = h || "";
        var m,
          f = n.startX,
          g = n.endX,
          e = -1 < h.indexOf("C"),
          d = e ? 7 : 3,
          p,
          b,
          A;
        h = h.split(" ");
        u = u.slice();
        var v = n.isArea,
          H = v ? 2 : 1,
          q;
        e && (r(h), r(u));
        if (f && g) {
          for (A = 0; A < f.length; A++)
            if (f[A] === g[0]) {
              m = A;
              break;
            } else if (f[0] === g[g.length - f.length + A]) {
              m = A;
              q = !0;
              break;
            }
          void 0 === m && (h = []);
        }
        h.length &&
          a.isNumber(m) &&
          ((p = u.length + m * H * d),
          q ? (x(h, u), t(u, h)) : (x(u, h), t(h, u)));
        return [h, u];
      },
    };
    a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function () {
      this.elem.attr(
        this.prop,
        a.color(this.start).tweenTo(a.color(this.end), this.pos),
        null,
        !0
      );
    };
    a.extend = function (a, h) {
      var n;
      a || (a = {});
      for (n in h) a[n] = h[n];
      return a;
    };
    a.merge = function () {
      var n,
        h = arguments,
        u,
        r = {},
        x = function (h, m) {
          "object" !== typeof h && (h = {});
          a.objectEach(m, function (f, g) {
            !a.isObject(f, !0) || a.isClass(f) || a.isDOMElement(f)
              ? (h[g] = m[g])
              : (h[g] = x(h[g] || {}, f));
          });
          return h;
        };
      !0 === h[0] && ((r = h[1]), (h = Array.prototype.slice.call(h, 2)));
      u = h.length;
      for (n = 0; n < u; n++) r = x(r, h[n]);
      return r;
    };
    a.pInt = function (a, h) {
      return parseInt(a, h || 10);
    };
    a.isString = function (a) {
      return "string" === typeof a;
    };
    a.isArray = function (a) {
      a = Object.prototype.toString.call(a);
      return "[object Array]" === a || "[object Array Iterator]" === a;
    };
    a.isObject = function (n, h) {
      return !!n && "object" === typeof n && (!h || !a.isArray(n));
    };
    a.isDOMElement = function (n) {
      return a.isObject(n) && "number" === typeof n.nodeType;
    };
    a.isClass = function (n) {
      var h = n && n.constructor;
      return !(
        !a.isObject(n, !0) ||
        a.isDOMElement(n) ||
        !h ||
        !h.name ||
        "Object" === h.name
      );
    };
    a.isNumber = function (a) {
      return "number" === typeof a && !isNaN(a);
    };
    a.erase = function (a, h) {
      for (var n = a.length; n--; )
        if (a[n] === h) {
          a.splice(n, 1);
          break;
        }
    };
    a.defined = function (a) {
      return void 0 !== a && null !== a;
    };
    a.attr = function (n, h, u) {
      var r;
      a.isString(h)
        ? a.defined(u)
          ? n.setAttribute(h, u)
          : n && n.getAttribute && (r = n.getAttribute(h))
        : a.defined(h) &&
          a.isObject(h) &&
          a.objectEach(h, function (a, h) {
            n.setAttribute(h, a);
          });
      return r;
    };
    a.splat = function (n) {
      return a.isArray(n) ? n : [n];
    };
    a.syncTimeout = function (a, h, u) {
      if (h) return setTimeout(a, h, u);
      a.call(0, u);
    };
    a.pick = function () {
      var a = arguments,
        h,
        u,
        r = a.length;
      for (h = 0; h < r; h++)
        if (((u = a[h]), void 0 !== u && null !== u)) return u;
    };
    a.css = function (n, h) {
      a.isMS &&
        !a.svg &&
        h &&
        void 0 !== h.opacity &&
        (h.filter = "alpha(opacity\x3d" + 100 * h.opacity + ")");
      a.extend(n.style, h);
    };
    a.createElement = function (n, h, u, r, x) {
      n = F.createElement(n);
      var t = a.css;
      h && a.extend(n, h);
      x && t(n, { padding: 0, border: "none", margin: 0 });
      u && t(n, u);
      r && r.appendChild(n);
      return n;
    };
    a.extendClass = function (n, h) {
      var u = function () {};
      u.prototype = new n();
      a.extend(u.prototype, h);
      return u;
    };
    a.pad = function (a, h, u) {
      return Array((h || 2) + 1 - String(a).length).join(u || 0) + a;
    };
    a.relativeLength = function (a, h) {
      return /%$/.test(a) ? (h * parseFloat(a)) / 100 : parseFloat(a);
    };
    a.wrap = function (a, h, u) {
      var r = a[h];
      a[h] = function () {
        var a = Array.prototype.slice.call(arguments),
          h = arguments,
          m = this;
        m.proceed = function () {
          r.apply(m, arguments.length ? arguments : h);
        };
        a.unshift(r);
        a = u.apply(this, a);
        m.proceed = null;
        return a;
      };
    };
    a.getTZOffset = function (n) {
      var h = a.Date;
      return (
        6e4 *
        ((h.hcGetTimezoneOffset && h.hcGetTimezoneOffset(n)) ||
          h.hcTimezoneOffset ||
          0)
      );
    };
    a.dateFormat = function (n, h, u) {
      if (!a.defined(h) || isNaN(h))
        return a.defaultOptions.lang.invalidDate || "";
      n = a.pick(n, "%Y-%m-%d %H:%M:%S");
      var r = a.Date,
        x = new r(h - a.getTZOffset(h)),
        t = x[r.hcGetHours](),
        m = x[r.hcGetDay](),
        f = x[r.hcGetDate](),
        g = x[r.hcGetMonth](),
        e = x[r.hcGetFullYear](),
        d = a.defaultOptions.lang,
        p = d.weekdays,
        b = d.shortWeekdays,
        A = a.pad,
        r = a.extend(
          {
            a: b ? b[m] : p[m].substr(0, 3),
            A: p[m],
            d: A(f),
            e: A(f, 2, " "),
            w: m,
            b: d.shortMonths[g],
            B: d.months[g],
            m: A(g + 1),
            y: e.toString().substr(2, 2),
            Y: e,
            H: A(t),
            k: t,
            I: A(t % 12 || 12),
            l: t % 12 || 12,
            M: A(x[r.hcGetMinutes]()),
            p: 12 > t ? "AM" : "PM",
            P: 12 > t ? "am" : "pm",
            S: A(x.getSeconds()),
            L: A(Math.round(h % 1e3), 3),
          },
          a.dateFormats
        );
      a.objectEach(r, function (a, b) {
        for (; -1 !== n.indexOf("%" + b); )
          n = n.replace("%" + b, "function" === typeof a ? a(h) : a);
      });
      return u ? n.substr(0, 1).toUpperCase() + n.substr(1) : n;
    };
    a.formatSingle = function (n, h) {
      var u = /\.([0-9])/,
        r = a.defaultOptions.lang;
      /f$/.test(n)
        ? ((u = (u = n.match(u)) ? u[1] : -1),
          null !== h &&
            (h = a.numberFormat(
              h,
              u,
              r.decimalPoint,
              -1 < n.indexOf(",") ? r.thousandsSep : ""
            )))
        : (h = a.dateFormat(n, h));
      return h;
    };
    a.format = function (n, h) {
      for (var u = "{", r = !1, x, t, m, f, g = [], e; n; ) {
        u = n.indexOf(u);
        if (-1 === u) break;
        x = n.slice(0, u);
        if (r) {
          x = x.split(":");
          t = x.shift().split(".");
          f = t.length;
          e = h;
          for (m = 0; m < f; m++) e = e[t[m]];
          x.length && (e = a.formatSingle(x.join(":"), e));
          g.push(e);
        } else g.push(x);
        n = n.slice(u + 1);
        u = (r = !r) ? "}" : "{";
      }
      g.push(n);
      return g.join("");
    };
    a.getMagnitude = function (a) {
      return Math.pow(10, Math.floor(Math.log(a) / Math.LN10));
    };
    a.normalizeTickInterval = function (n, h, u, r, x) {
      var t,
        m = n;
      u = a.pick(u, 1);
      t = n / u;
      h ||
        ((h = x
          ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]
          : [1, 2, 2.5, 5, 10]),
        !1 === r &&
          (1 === u
            ? (h = a.grep(h, function (a) {
                return 0 === a % 1;
              }))
            : 0.1 >= u && (h = [1 / u])));
      for (
        r = 0;
        r < h.length &&
        !((m = h[r]),
        (x && m * u >= n) || (!x && t <= (h[r] + (h[r + 1] || h[r])) / 2));
        r++
      );
      return (m = a.correctFloat(
        m * u,
        -Math.round(Math.log(0.001) / Math.LN10)
      ));
    };
    a.stableSort = function (a, h) {
      var n = a.length,
        r,
        x;
      for (x = 0; x < n; x++) a[x].safeI = x;
      a.sort(function (a, m) {
        r = h(a, m);
        return 0 === r ? a.safeI - m.safeI : r;
      });
      for (x = 0; x < n; x++) delete a[x].safeI;
    };
    a.arrayMin = function (a) {
      for (var h = a.length, n = a[0]; h--; ) a[h] < n && (n = a[h]);
      return n;
    };
    a.arrayMax = function (a) {
      for (var h = a.length, n = a[0]; h--; ) a[h] > n && (n = a[h]);
      return n;
    };
    a.destroyObjectProperties = function (n, h) {
      a.objectEach(n, function (a, r) {
        a && a !== h && a.destroy && a.destroy();
        delete n[r];
      });
    };
    a.discardElement = function (n) {
      var h = a.garbageBin;
      h || (h = a.createElement("div"));
      n && h.appendChild(n);
      h.innerHTML = "";
    };
    a.correctFloat = function (a, h) {
      return parseFloat(a.toPrecision(h || 14));
    };
    a.setAnimation = function (n, h) {
      h.renderer.globalAnimation = a.pick(n, h.options.chart.animation, !0);
    };
    a.animObject = function (n) {
      return a.isObject(n) ? a.merge(n) : { duration: n ? 500 : 0 };
    };
    a.timeUnits = {
      millisecond: 1,
      second: 1e3,
      minute: 6e4,
      hour: 36e5,
      day: 864e5,
      week: 6048e5,
      month: 24192e5,
      year: 314496e5,
    };
    a.numberFormat = function (n, h, u, r) {
      n = +n || 0;
      h = +h;
      var x = a.defaultOptions.lang,
        t = (n.toString().split(".")[1] || "").length,
        m,
        f;
      -1 === h ? (h = Math.min(t, 20)) : a.isNumber(h) || (h = 2);
      f = (Math.abs(n) + Math.pow(10, -Math.max(h, t) - 1)).toFixed(h);
      t = String(a.pInt(f));
      m = 3 < t.length ? t.length % 3 : 0;
      u = a.pick(u, x.decimalPoint);
      r = a.pick(r, x.thousandsSep);
      n = (0 > n ? "-" : "") + (m ? t.substr(0, m) + r : "");
      n += t.substr(m).replace(/(\d{3})(?=\d)/g, "$1" + r);
      h && (n += u + f.slice(-h));
      return n;
    };
    Math.easeInOutSine = function (a) {
      return -0.5 * (Math.cos(Math.PI * a) - 1);
    };
    a.getStyle = function (n, h, u) {
      if ("width" === h)
        return (
          Math.min(n.offsetWidth, n.scrollWidth) -
          a.getStyle(n, "padding-left") -
          a.getStyle(n, "padding-right")
        );
      if ("height" === h)
        return (
          Math.min(n.offsetHeight, n.scrollHeight) -
          a.getStyle(n, "padding-top") -
          a.getStyle(n, "padding-bottom")
        );
      if ((n = D.getComputedStyle(n, void 0)))
        (n = n.getPropertyValue(h)), a.pick(u, !0) && (n = a.pInt(n));
      return n;
    };
    a.inArray = function (a, h) {
      return h.indexOf ? h.indexOf(a) : [].indexOf.call(h, a);
    };
    a.grep = function (a, h) {
      return [].filter.call(a, h);
    };
    a.find = function (a, h) {
      return [].find.call(a, h);
    };
    a.map = function (a, h) {
      for (var n = [], r = 0, x = a.length; r < x; r++)
        n[r] = h.call(a[r], a[r], r, a);
      return n;
    };
    a.offset = function (a) {
      var h = F.documentElement;
      a = a.getBoundingClientRect();
      return {
        top: a.top + (D.pageYOffset || h.scrollTop) - (h.clientTop || 0),
        left: a.left + (D.pageXOffset || h.scrollLeft) - (h.clientLeft || 0),
      };
    };
    a.stop = function (a, h) {
      for (var n = E.length; n--; )
        E[n].elem !== a || (h && h !== E[n].prop) || (E[n].stopped = !0);
    };
    a.each = function (a, h, u) {
      return Array.prototype.forEach.call(a, h, u);
    };
    a.objectEach = function (a, h, u) {
      for (var r in a) a.hasOwnProperty(r) && h.call(u, a[r], r, a);
    };
    a.addEvent = function (n, h, u) {
      function r(a) {
        a.target = a.srcElement || D;
        u.call(n, a);
      }
      var x = (n.hcEvents = n.hcEvents || {});
      n.addEventListener
        ? n.addEventListener(h, u, !1)
        : n.attachEvent &&
          (n.hcEventsIE || (n.hcEventsIE = {}),
          (n.hcEventsIE[u.toString()] = r),
          n.attachEvent("on" + h, r));
      x[h] || (x[h] = []);
      x[h].push(u);
      return function () {
        a.removeEvent(n, h, u);
      };
    };
    a.removeEvent = function (n, h, u) {
      function r(a, e) {
        n.removeEventListener
          ? n.removeEventListener(a, e, !1)
          : n.attachEvent &&
            ((e = n.hcEventsIE[e.toString()]), n.detachEvent("on" + a, e));
      }
      function x() {
        var f, e;
        n.nodeName &&
          (h ? ((f = {}), (f[h] = !0)) : (f = m),
          a.objectEach(f, function (a, f) {
            if (m[f]) for (e = m[f].length; e--; ) r(f, m[f][e]);
          }));
      }
      var t,
        m = n.hcEvents,
        f;
      m &&
        (h
          ? ((t = m[h] || []),
            u
              ? ((f = a.inArray(u, t)),
                -1 < f && (t.splice(f, 1), (m[h] = t)),
                r(h, u))
              : (x(), (m[h] = [])))
          : (x(), (n.hcEvents = {})));
    };
    a.fireEvent = function (n, h, u, r) {
      var x;
      x = n.hcEvents;
      var t, m;
      u = u || {};
      if (F.createEvent && (n.dispatchEvent || n.fireEvent))
        (x = F.createEvent("Events")),
          x.initEvent(h, !0, !0),
          a.extend(x, u),
          n.dispatchEvent ? n.dispatchEvent(x) : n.fireEvent(h, x);
      else if (x)
        for (
          x = x[h] || [],
            t = x.length,
            u.target ||
              a.extend(u, {
                preventDefault: function () {
                  u.defaultPrevented = !0;
                },
                target: n,
                type: h,
              }),
            h = 0;
          h < t;
          h++
        )
          (m = x[h]) && !1 === m.call(n, u) && u.preventDefault();
      r && !u.defaultPrevented && r(u);
    };
    a.animate = function (n, h, u) {
      var r,
        x = "",
        t,
        m,
        f;
      a.isObject(u) ||
        ((f = arguments),
        (u = { duration: f[2], easing: f[3], complete: f[4] }));
      a.isNumber(u.duration) || (u.duration = 400);
      u.easing =
        "function" === typeof u.easing
          ? u.easing
          : Math[u.easing] || Math.easeInOutSine;
      u.curAnim = a.merge(h);
      a.objectEach(h, function (f, e) {
        a.stop(n, e);
        m = new a.Fx(n, u, e);
        t = null;
        "d" === e
          ? ((m.paths = m.initPath(n, n.d, h.d)),
            (m.toD = h.d),
            (r = 0),
            (t = 1))
          : n.attr
          ? (r = n.attr(e))
          : ((r = parseFloat(a.getStyle(n, e)) || 0),
            "opacity" !== e && (x = "px"));
        t || (t = f);
        t && t.match && t.match("px") && (t = t.replace(/px/g, ""));
        m.run(r, t, x);
      });
    };
    a.seriesType = function (n, h, u, r, x) {
      var t = a.getOptions(),
        m = a.seriesTypes;
      if (m[n]) return a.error(27);
      t.plotOptions[n] = a.merge(t.plotOptions[h], u);
      m[n] = a.extendClass(m[h] || function () {}, r);
      m[n].prototype.type = n;
      x && (m[n].prototype.pointClass = a.extendClass(a.Point, x));
      return m[n];
    };
    a.uniqueKey = (function () {
      var a = Math.random().toString(36).substring(2, 9),
        h = 0;
      return function () {
        return "highcharts-" + a + "-" + h++;
      };
    })();
    D.jQuery &&
      (D.jQuery.fn.highcharts = function () {
        var n = [].slice.call(arguments);
        if (this[0])
          return n[0]
            ? (new a[a.isString(n[0]) ? n.shift() : "Chart"](
                this[0],
                n[0],
                n[1]
              ),
              this)
            : B[a.attr(this[0], "data-highcharts-chart")];
      });
    F &&
      !F.defaultView &&
      (a.getStyle = function (n, h) {
        var u = { width: "clientWidth", height: "clientHeight" }[h];
        if (n.style[h]) return a.pInt(n.style[h]);
        "opacity" === h && (h = "filter");
        if (u)
          return (
            (n.style.zoom = 1), Math.max(n[u] - 2 * a.getStyle(n, "padding"), 0)
          );
        n =
          n.currentStyle[
            h.replace(/\-(\w)/g, function (a, h) {
              return h.toUpperCase();
            })
          ];
        "filter" === h &&
          (n = n.replace(/alpha\(opacity=([0-9]+)\)/, function (a, h) {
            return h / 100;
          }));
        return "" === n ? 1 : a.pInt(n);
      });
    Array.prototype.forEach ||
      (a.each = function (a, h, u) {
        for (var r = 0, n = a.length; r < n; r++)
          if (!1 === h.call(u, a[r], r, a)) return r;
      });
    Array.prototype.indexOf ||
      (a.inArray = function (a, h) {
        var n,
          r = 0;
        if (h) for (n = h.length; r < n; r++) if (h[r] === a) return r;
        return -1;
      });
    Array.prototype.filter ||
      (a.grep = function (a, h) {
        for (var n = [], r = 0, x = a.length; r < x; r++)
          h(a[r], r) && n.push(a[r]);
        return n;
      });
    Array.prototype.find ||
      (a.find = function (a, h) {
        var n,
          r = a.length;
        for (n = 0; n < r; n++) if (h(a[n], n)) return a[n];
      });
  })(L);
  (function (a) {
    var E = a.each,
      B = a.isNumber,
      F = a.map,
      D = a.merge,
      n = a.pInt;
    a.Color = function (h) {
      if (!(this instanceof a.Color)) return new a.Color(h);
      this.init(h);
    };
    a.Color.prototype = {
      parsers: [
        {
          regex:
            /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
          parse: function (a) {
            return [n(a[1]), n(a[2]), n(a[3]), parseFloat(a[4], 10)];
          },
        },
        {
          regex:
            /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
          parse: function (a) {
            return [n(a[1]), n(a[2]), n(a[3]), 1];
          },
        },
      ],
      names: {
        none: "rgba(255,255,255,0)",
        white: "#ffffff",
        black: "#000000",
      },
      init: function (h) {
        var n, r, x, t;
        if (
          (this.input = h =
            this.names[h && h.toLowerCase ? h.toLowerCase() : ""] || h) &&
          h.stops
        )
          this.stops = F(h.stops, function (m) {
            return new a.Color(m[1]);
          });
        else if (
          (h &&
            "#" === h[0] &&
            ((n = h.length),
            (h = parseInt(h.substr(1), 16)),
            7 === n
              ? (r = [(h & 16711680) >> 16, (h & 65280) >> 8, h & 255, 1])
              : 4 === n &&
                (r = [
                  ((h & 3840) >> 4) | ((h & 3840) >> 8),
                  ((h & 240) >> 4) | (h & 240),
                  ((h & 15) << 4) | (h & 15),
                  1,
                ])),
          !r)
        )
          for (x = this.parsers.length; x-- && !r; )
            (t = this.parsers[x]), (n = t.regex.exec(h)) && (r = t.parse(n));
        this.rgba = r || [];
      },
      get: function (a) {
        var h = this.input,
          r = this.rgba,
          n;
        this.stops
          ? ((n = D(h)),
            (n.stops = [].concat(n.stops)),
            E(this.stops, function (h, m) {
              n.stops[m] = [n.stops[m][0], h.get(a)];
            }))
          : (n =
              r && B(r[0])
                ? "rgb" === a || (!a && 1 === r[3])
                  ? "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")"
                  : "a" === a
                  ? r[3]
                  : "rgba(" + r.join(",") + ")"
                : h);
        return n;
      },
      brighten: function (a) {
        var h,
          r = this.rgba;
        if (this.stops)
          E(this.stops, function (h) {
            h.brighten(a);
          });
        else if (B(a) && 0 !== a)
          for (h = 0; 3 > h; h++)
            (r[h] += n(255 * a)),
              0 > r[h] && (r[h] = 0),
              255 < r[h] && (r[h] = 255);
        return this;
      },
      setOpacity: function (a) {
        this.rgba[3] = a;
        return this;
      },
      tweenTo: function (a, n) {
        var h, x;
        a.rgba.length
          ? ((h = this.rgba),
            (a = a.rgba),
            (x = 1 !== a[3] || 1 !== h[3]),
            (a =
              (x ? "rgba(" : "rgb(") +
              Math.round(a[0] + (h[0] - a[0]) * (1 - n)) +
              "," +
              Math.round(a[1] + (h[1] - a[1]) * (1 - n)) +
              "," +
              Math.round(a[2] + (h[2] - a[2]) * (1 - n)) +
              (x ? "," + (a[3] + (h[3] - a[3]) * (1 - n)) : "") +
              ")"))
          : (a = a.input || "none");
        return a;
      },
    };
    a.color = function (h) {
      return new a.Color(h);
    };
  })(L);
  (function (a) {
    var E,
      B,
      F = a.addEvent,
      D = a.animate,
      n = a.attr,
      h = a.charts,
      u = a.color,
      r = a.css,
      x = a.createElement,
      t = a.defined,
      m = a.deg2rad,
      f = a.destroyObjectProperties,
      g = a.doc,
      e = a.each,
      d = a.extend,
      p = a.erase,
      b = a.grep,
      A = a.hasTouch,
      v = a.inArray,
      H = a.isArray,
      q = a.isFirefox,
      J = a.isMS,
      c = a.isObject,
      w = a.isString,
      K = a.isWebKit,
      y = a.merge,
      G = a.noop,
      l = a.objectEach,
      I = a.pick,
      k = a.pInt,
      z = a.removeEvent,
      Q = a.stop,
      M = a.svg,
      N = a.SVG_NS,
      P = a.symbolSizes,
      O = a.win;
    E = a.SVGElement = function () {
      return this;
    };
    d(E.prototype, {
      opacity: 1,
      SVG_NS: N,
      textProps:
        "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(
          " "
        ),
      init: function (a, k) {
        this.element = "span" === k ? x(k) : g.createElementNS(this.SVG_NS, k);
        this.renderer = a;
      },
      animate: function (C, k, c) {
        k = a.animObject(I(k, this.renderer.globalAnimation, !0));
        0 !== k.duration
          ? (c && (k.complete = c), D(this, C, k))
          : (this.attr(C, null, c), k.step && k.step.call(this));
        return this;
      },
      colorGradient: function (C, k, c) {
        var z = this.renderer,
          b,
          d,
          q,
          f,
          w,
          G,
          g,
          M,
          v,
          R,
          p = [],
          I;
        C.radialGradient
          ? (d = "radialGradient")
          : C.linearGradient && (d = "linearGradient");
        d &&
          ((q = C[d]),
          (w = z.gradients),
          (g = C.stops),
          (R = c.radialReference),
          H(q) &&
            (C[d] = q =
              {
                x1: q[0],
                y1: q[1],
                x2: q[2],
                y2: q[3],
                gradientUnits: "userSpaceOnUse",
              }),
          "radialGradient" === d &&
            R &&
            !t(q.gradientUnits) &&
            ((f = q),
            (q = y(q, z.getRadialAttr(R, f), {
              gradientUnits: "userSpaceOnUse",
            }))),
          l(q, function (a, C) {
            "id" !== C && p.push(C, a);
          }),
          l(g, function (a) {
            p.push(a);
          }),
          (p = p.join(",")),
          w[p]
            ? (R = w[p].attr("id"))
            : ((q.id = R = a.uniqueKey()),
              (w[p] = G = z.createElement(d).attr(q).add(z.defs)),
              (G.radAttr = f),
              (G.stops = []),
              e(g, function (C) {
                0 === C[1].indexOf("rgba")
                  ? ((b = a.color(C[1])), (M = b.get("rgb")), (v = b.get("a")))
                  : ((M = C[1]), (v = 1));
                C = z
                  .createElement("stop")
                  .attr({ offset: C[0], "stop-color": M, "stop-opacity": v })
                  .add(G);
                G.stops.push(C);
              })),
          (I = "url(" + z.url + "#" + R + ")"),
          c.setAttribute(k, I),
          (c.gradient = p),
          (C.toString = function () {
            return I;
          }));
      },
      applyTextOutline: function (C) {
        var k = this.element,
          c,
          z,
          l,
          b,
          d;
        -1 !== C.indexOf("contrast") &&
          (C = C.replace(/contrast/g, this.renderer.getContrast(k.style.fill)));
        C = C.split(" ");
        z = C[C.length - 1];
        if ((l = C[0]) && "none" !== l && a.svg) {
          this.fakeTS = !0;
          C = [].slice.call(k.getElementsByTagName("tspan"));
          this.ySetter = this.xSetter;
          l = l.replace(/(^[\d\.]+)(.*?)$/g, function (a, C, k) {
            return 2 * C + k;
          });
          for (d = C.length; d--; )
            (c = C[d]),
              "highcharts-text-outline" === c.getAttribute("class") &&
                p(C, k.removeChild(c));
          b = k.firstChild;
          e(C, function (a, C) {
            0 === C &&
              (a.setAttribute("x", k.getAttribute("x")),
              (C = k.getAttribute("y")),
              a.setAttribute("y", C || 0),
              null === C && k.setAttribute("y", 0));
            a = a.cloneNode(1);
            n(a, {
              class: "highcharts-text-outline",
              fill: z,
              stroke: z,
              "stroke-width": l,
              "stroke-linejoin": "round",
            });
            k.insertBefore(a, b);
          });
        }
      },
      attr: function (a, k, c, z) {
        var C,
          b = this.element,
          d,
          q = this,
          e,
          y;
        "string" === typeof a &&
          void 0 !== k &&
          ((C = a), (a = {}), (a[C] = k));
        "string" === typeof a
          ? (q = (this[a + "Getter"] || this._defaultGetter).call(this, a, b))
          : (l(
              a,
              function (k, C) {
                e = !1;
                z || Q(this, C);
                this.symbolName &&
                  /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(
                    C
                  ) &&
                  (d || (this.symbolAttr(a), (d = !0)), (e = !0));
                !this.rotation ||
                  ("x" !== C && "y" !== C) ||
                  (this.doTransform = !0);
                e ||
                  ((y = this[C + "Setter"] || this._defaultSetter),
                  y.call(this, k, C, b),
                  this.shadows &&
                    /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(
                      C
                    ) &&
                    this.updateShadows(C, k, y));
              },
              this
            ),
            this.afterSetters());
        c && c();
        return q;
      },
      afterSetters: function () {
        this.doTransform && (this.updateTransform(), (this.doTransform = !1));
      },
      updateShadows: function (a, k, c) {
        for (var C = this.shadows, z = C.length; z--; )
          c.call(
            C[z],
            "height" === a
              ? Math.max(k - (C[z].cutHeight || 0), 0)
              : "d" === a
              ? this.d
              : k,
            a,
            C[z]
          );
      },
      addClass: function (a, k) {
        var C = this.attr("class") || "";
        -1 === C.indexOf(a) &&
          (k || (a = (C + (C ? " " : "") + a).replace("  ", " ")),
          this.attr("class", a));
        return this;
      },
      hasClass: function (a) {
        return -1 !== n(this.element, "class").indexOf(a);
      },
      removeClass: function (a) {
        n(
          this.element,
          "class",
          (n(this.element, "class") || "").replace(a, "")
        );
        return this;
      },
      symbolAttr: function (a) {
        var k = this;
        e(
          "x y r start end width height innerR anchorX anchorY".split(" "),
          function (C) {
            k[C] = I(a[C], k[C]);
          }
        );
        k.attr({
          d: k.renderer.symbols[k.symbolName](k.x, k.y, k.width, k.height, k),
        });
      },
      clip: function (a) {
        return this.attr(
          "clip-path",
          a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none"
        );
      },
      crisp: function (a, k) {
        var C = this,
          c = {},
          z;
        k = k || a.strokeWidth || 0;
        z = (Math.round(k) % 2) / 2;
        a.x = Math.floor(a.x || C.x || 0) + z;
        a.y = Math.floor(a.y || C.y || 0) + z;
        a.width = Math.floor((a.width || C.width || 0) - 2 * z);
        a.height = Math.floor((a.height || C.height || 0) - 2 * z);
        t(a.strokeWidth) && (a.strokeWidth = k);
        l(a, function (a, k) {
          C[k] !== a && (C[k] = c[k] = a);
        });
        return c;
      },
      css: function (a) {
        var C = this.styles,
          c = {},
          z = this.element,
          b,
          q = "",
          e,
          y = !C,
          f = ["textOutline", "textOverflow", "width"];
        a && a.color && (a.fill = a.color);
        C &&
          l(a, function (a, k) {
            a !== C[k] && ((c[k] = a), (y = !0));
          });
        y &&
          (C && (a = d(C, c)),
          (b = this.textWidth =
            a &&
            a.width &&
            "auto" !== a.width &&
            "text" === z.nodeName.toLowerCase() &&
            k(a.width)),
          (this.styles = a),
          b && !M && this.renderer.forExport && delete a.width,
          J && !M
            ? r(this.element, a)
            : ((e = function (a, k) {
                return "-" + k.toLowerCase();
              }),
              l(a, function (a, k) {
                -1 === v(k, f) &&
                  (q += k.replace(/([A-Z])/g, e) + ":" + a + ";");
              }),
              q && n(z, "style", q)),
          this.added &&
            ("text" === this.element.nodeName && this.renderer.buildText(this),
            a && a.textOutline && this.applyTextOutline(a.textOutline)));
        return this;
      },
      strokeWidth: function () {
        return this["stroke-width"] || 0;
      },
      on: function (a, k) {
        var C = this,
          c = C.element;
        A && "click" === a
          ? ((c.ontouchstart = function (a) {
              C.touchEventFired = Date.now();
              a.preventDefault();
              k.call(c, a);
            }),
            (c.onclick = function (a) {
              (-1 === O.navigator.userAgent.indexOf("Android") ||
                1100 < Date.now() - (C.touchEventFired || 0)) &&
                k.call(c, a);
            }))
          : (c["on" + a] = k);
        return this;
      },
      setRadialReference: function (a) {
        var k = this.renderer.gradients[this.element.gradient];
        this.element.radialReference = a;
        k && k.radAttr && k.animate(this.renderer.getRadialAttr(a, k.radAttr));
        return this;
      },
      translate: function (a, k) {
        return this.attr({ translateX: a, translateY: k });
      },
      invert: function (a) {
        this.inverted = a;
        this.updateTransform();
        return this;
      },
      updateTransform: function () {
        var a = this.translateX || 0,
          k = this.translateY || 0,
          c = this.scaleX,
          z = this.scaleY,
          l = this.inverted,
          b = this.rotation,
          d = this.element;
        l && ((a += this.width), (k += this.height));
        a = ["translate(" + a + "," + k + ")"];
        l
          ? a.push("rotate(90) scale(-1,1)")
          : b &&
            a.push(
              "rotate(" +
                b +
                " " +
                (d.getAttribute("x") || 0) +
                " " +
                (d.getAttribute("y") || 0) +
                ")"
            );
        (t(c) || t(z)) && a.push("scale(" + I(c, 1) + " " + I(z, 1) + ")");
        a.length && d.setAttribute("transform", a.join(" "));
      },
      toFront: function () {
        var a = this.element;
        a.parentNode.appendChild(a);
        return this;
      },
      align: function (a, k, c) {
        var C,
          z,
          l,
          b,
          d = {};
        z = this.renderer;
        l = z.alignedObjects;
        var q, e;
        if (a) {
          if (
            ((this.alignOptions = a), (this.alignByTranslate = k), !c || w(c))
          )
            (this.alignTo = C = c || "renderer"),
              p(l, this),
              l.push(this),
              (c = null);
        } else
          (a = this.alignOptions),
            (k = this.alignByTranslate),
            (C = this.alignTo);
        c = I(c, z[C], z);
        C = a.align;
        z = a.verticalAlign;
        l = (c.x || 0) + (a.x || 0);
        b = (c.y || 0) + (a.y || 0);
        "right" === C ? (q = 1) : "center" === C && (q = 2);
        q && (l += (c.width - (a.width || 0)) / q);
        d[k ? "translateX" : "x"] = Math.round(l);
        "bottom" === z ? (e = 1) : "middle" === z && (e = 2);
        e && (b += (c.height - (a.height || 0)) / e);
        d[k ? "translateY" : "y"] = Math.round(b);
        this[this.placed ? "animate" : "attr"](d);
        this.placed = !0;
        this.alignAttr = d;
        return this;
      },
      getBBox: function (a, k) {
        var C,
          c = this.renderer,
          z,
          l = this.element,
          b = this.styles,
          q,
          y = this.textStr,
          f,
          w = c.cache,
          G = c.cacheKeys,
          g;
        k = I(k, this.rotation);
        z = k * m;
        q = b && b.fontSize;
        void 0 !== y &&
          ((g = y.toString()),
          -1 === g.indexOf("\x3c") && (g = g.replace(/[0-9]/g, "0")),
          (g += ["", k || 0, q, b && b.width, b && b.textOverflow].join()));
        g && !a && (C = w[g]);
        if (!C) {
          if (l.namespaceURI === this.SVG_NS || c.forExport) {
            try {
              (f =
                this.fakeTS &&
                function (a) {
                  e(
                    l.querySelectorAll(".highcharts-text-outline"),
                    function (k) {
                      k.style.display = a;
                    }
                  );
                }) && f("none"),
                (C = l.getBBox
                  ? d({}, l.getBBox())
                  : { width: l.offsetWidth, height: l.offsetHeight }),
                f && f("");
            } catch (W) {}
            if (!C || 0 > C.width) C = { width: 0, height: 0 };
          } else C = this.htmlGetBBox();
          c.isSVG &&
            ((a = C.width),
            (c = C.height),
            b &&
              "11px" === b.fontSize &&
              17 === Math.round(c) &&
              (C.height = c = 14),
            k &&
              ((C.width =
                Math.abs(c * Math.sin(z)) + Math.abs(a * Math.cos(z))),
              (C.height =
                Math.abs(c * Math.cos(z)) + Math.abs(a * Math.sin(z)))));
          if (g && 0 < C.height) {
            for (; 250 < G.length; ) delete w[G.shift()];
            w[g] || G.push(g);
            w[g] = C;
          }
        }
        return C;
      },
      show: function (a) {
        return this.attr({ visibility: a ? "inherit" : "visible" });
      },
      hide: function () {
        return this.attr({ visibility: "hidden" });
      },
      fadeOut: function (a) {
        var k = this;
        k.animate(
          { opacity: 0 },
          {
            duration: a || 150,
            complete: function () {
              k.attr({ y: -9999 });
            },
          }
        );
      },
      add: function (a) {
        var k = this.renderer,
          c = this.element,
          C;
        a && (this.parentGroup = a);
        this.parentInverted = a && a.inverted;
        void 0 !== this.textStr && k.buildText(this);
        this.added = !0;
        if (!a || a.handleZ || this.zIndex) C = this.zIndexSetter();
        C || (a ? a.element : k.box).appendChild(c);
        if (this.onAdd) this.onAdd();
        return this;
      },
      safeRemoveChild: function (a) {
        var k = a.parentNode;
        k && k.removeChild(a);
      },
      destroy: function () {
        var a = this,
          k = a.element || {},
          c = a.renderer.isSVG && "SPAN" === k.nodeName && a.parentGroup,
          z = k.ownerSVGElement;
        k.onclick =
          k.onmouseout =
          k.onmouseover =
          k.onmousemove =
          k.point =
            null;
        Q(a);
        a.clipPath &&
          z &&
          (e(z.querySelectorAll("[clip-path]"), function (k) {
            -1 <
              k
                .getAttribute("clip-path")
                .indexOf(a.clipPath.element.id + ")") &&
              k.removeAttribute("clip-path");
          }),
          (a.clipPath = a.clipPath.destroy()));
        if (a.stops) {
          for (z = 0; z < a.stops.length; z++)
            a.stops[z] = a.stops[z].destroy();
          a.stops = null;
        }
        a.safeRemoveChild(k);
        for (a.destroyShadows(); c && c.div && 0 === c.div.childNodes.length; )
          (k = c.parentGroup), a.safeRemoveChild(c.div), delete c.div, (c = k);
        a.alignTo && p(a.renderer.alignedObjects, a);
        l(a, function (k, c) {
          delete a[c];
        });
        return null;
      },
      shadow: function (a, k, c) {
        var C = [],
          z,
          l,
          b = this.element,
          d,
          q,
          e,
          y;
        if (!a) this.destroyShadows();
        else if (!this.shadows) {
          q = I(a.width, 3);
          e = (a.opacity || 0.15) / q;
          y = this.parentInverted
            ? "(-1,-1)"
            : "(" + I(a.offsetX, 1) + ", " + I(a.offsetY, 1) + ")";
          for (z = 1; z <= q; z++)
            (l = b.cloneNode(0)),
              (d = 2 * q + 1 - 2 * z),
              n(l, {
                isShadow: "true",
                stroke: a.color || "#000000",
                "stroke-opacity": e * z,
                "stroke-width": d,
                transform: "translate" + y,
                fill: "none",
              }),
              c &&
                (n(l, "height", Math.max(n(l, "height") - d, 0)),
                (l.cutHeight = d)),
              k ? k.element.appendChild(l) : b.parentNode.insertBefore(l, b),
              C.push(l);
          this.shadows = C;
        }
        return this;
      },
      destroyShadows: function () {
        e(
          this.shadows || [],
          function (a) {
            this.safeRemoveChild(a);
          },
          this
        );
        this.shadows = void 0;
      },
      xGetter: function (a) {
        "circle" === this.element.nodeName &&
          ("x" === a ? (a = "cx") : "y" === a && (a = "cy"));
        return this._defaultGetter(a);
      },
      _defaultGetter: function (a) {
        a = I(this[a], this.element ? this.element.getAttribute(a) : null, 0);
        /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
        return a;
      },
      dSetter: function (a, k, c) {
        a && a.join && (a = a.join(" "));
        /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
        c.setAttribute(k, a);
        this[k] = a;
      },
      dashstyleSetter: function (a) {
        var c,
          z = this["stroke-width"];
        "inherit" === z && (z = 1);
        if ((a = a && a.toLowerCase())) {
          a = a
            .replace("shortdashdotdot", "3,1,1,1,1,1,")
            .replace("shortdashdot", "3,1,1,1")
            .replace("shortdot", "1,1,")
            .replace("shortdash", "3,1,")
            .replace("longdash", "8,3,")
            .replace(/dot/g, "1,3,")
            .replace("dash", "4,3,")
            .replace(/,$/, "")
            .split(",");
          for (c = a.length; c--; ) a[c] = k(a[c]) * z;
          a = a.join(",").replace(/NaN/g, "none");
          this.element.setAttribute("stroke-dasharray", a);
        }
      },
      alignSetter: function (a) {
        this.element.setAttribute(
          "text-anchor",
          { left: "start", center: "middle", right: "end" }[a]
        );
      },
      opacitySetter: function (a, k, c) {
        this[k] = a;
        c.setAttribute(k, a);
      },
      titleSetter: function (a) {
        var k = this.element.getElementsByTagName("title")[0];
        k ||
          ((k = g.createElementNS(this.SVG_NS, "title")),
          this.element.appendChild(k));
        k.firstChild && k.removeChild(k.firstChild);
        k.appendChild(
          g.createTextNode(String(I(a), "").replace(/<[^>]*>/g, ""))
        );
      },
      textSetter: function (a) {
        a !== this.textStr &&
          (delete this.bBox,
          (this.textStr = a),
          this.added && this.renderer.buildText(this));
      },
      fillSetter: function (a, k, c) {
        "string" === typeof a
          ? c.setAttribute(k, a)
          : a && this.colorGradient(a, k, c);
      },
      visibilitySetter: function (a, k, c) {
        "inherit" === a ? c.removeAttribute(k) : c.setAttribute(k, a);
      },
      zIndexSetter: function (a, c) {
        var z = this.renderer,
          l = this.parentGroup,
          C = (l || z).element || z.box,
          b,
          d = this.element,
          q;
        b = this.added;
        var e;
        t(a) &&
          ((d.zIndex = a), (a = +a), this[c] === a && (b = !1), (this[c] = a));
        if (b) {
          (a = this.zIndex) && l && (l.handleZ = !0);
          c = C.childNodes;
          for (e = 0; e < c.length && !q; e++)
            (l = c[e]),
              (b = l.zIndex),
              l !== d &&
                (k(b) > a ||
                  (!t(a) && t(b)) ||
                  (0 > a && !t(b) && C !== z.box)) &&
                (C.insertBefore(d, l), (q = !0));
          q || C.appendChild(d);
        }
        return q;
      },
      _defaultSetter: function (a, k, c) {
        c.setAttribute(k, a);
      },
    });
    E.prototype.yGetter = E.prototype.xGetter;
    E.prototype.translateXSetter =
      E.prototype.translateYSetter =
      E.prototype.rotationSetter =
      E.prototype.verticalAlignSetter =
      E.prototype.scaleXSetter =
      E.prototype.scaleYSetter =
        function (a, k) {
          this[k] = a;
          this.doTransform = !0;
        };
    E.prototype["stroke-widthSetter"] = E.prototype.strokeSetter = function (
      a,
      k,
      c
    ) {
      this[k] = a;
      this.stroke && this["stroke-width"]
        ? (E.prototype.fillSetter.call(this, this.stroke, "stroke", c),
          c.setAttribute("stroke-width", this["stroke-width"]),
          (this.hasStroke = !0))
        : "stroke-width" === k &&
          0 === a &&
          this.hasStroke &&
          (c.removeAttribute("stroke"), (this.hasStroke = !1));
    };
    B = a.SVGRenderer = function () {
      this.init.apply(this, arguments);
    };
    d(B.prototype, {
      Element: E,
      SVG_NS: N,
      init: function (a, k, c, z, l, b) {
        var C;
        z = this.createElement("svg")
          .attr({ version: "1.1", class: "highcharts-root" })
          .css(this.getStyle(z));
        C = z.element;
        a.appendChild(C);
        -1 === a.innerHTML.indexOf("xmlns") && n(C, "xmlns", this.SVG_NS);
        this.isSVG = !0;
        this.box = C;
        this.boxWrapper = z;
        this.alignedObjects = [];
        this.url =
          (q || K) && g.getElementsByTagName("base").length
            ? O.location.href
                .replace(/#.*?$/, "")
                .replace(/<[^>]*>/g, "")
                .replace(/([\('\)])/g, "\\$1")
                .replace(/ /g, "%20")
            : "";
        this.createElement("desc")
          .add()
          .element.appendChild(
            g.createTextNode("Created with Highstock 5.0.12")
          );
        this.defs = this.createElement("defs").add();
        this.allowHTML = b;
        this.forExport = l;
        this.gradients = {};
        this.cache = {};
        this.cacheKeys = [];
        this.imgCount = 0;
        this.setSize(k, c, !1);
        var d;
        q &&
          a.getBoundingClientRect &&
          ((k = function () {
            r(a, { left: 0, top: 0 });
            d = a.getBoundingClientRect();
            r(a, {
              left: Math.ceil(d.left) - d.left + "px",
              top: Math.ceil(d.top) - d.top + "px",
            });
          }),
          k(),
          (this.unSubPixelFix = F(O, "resize", k)));
      },
      getStyle: function (a) {
        return (this.style = d(
          {
            fontFamily:
              '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
            fontSize: "12px",
          },
          a
        ));
      },
      setStyle: function (a) {
        this.boxWrapper.css(this.getStyle(a));
      },
      isHidden: function () {
        return !this.boxWrapper.getBBox().width;
      },
      destroy: function () {
        var a = this.defs;
        this.box = null;
        this.boxWrapper = this.boxWrapper.destroy();
        f(this.gradients || {});
        this.gradients = null;
        a && (this.defs = a.destroy());
        this.unSubPixelFix && this.unSubPixelFix();
        return (this.alignedObjects = null);
      },
      createElement: function (a) {
        var k = new this.Element();
        k.init(this, a);
        return k;
      },
      draw: G,
      getRadialAttr: function (a, k) {
        return {
          cx: a[0] - a[2] / 2 + k.cx * a[2],
          cy: a[1] - a[2] / 2 + k.cy * a[2],
          r: k.r * a[2],
        };
      },
      getSpanWidth: function (a, k) {
        var c = a.getBBox(!0).width;
        !M &&
          this.forExport &&
          (c = this.measureSpanWidth(k.firstChild.data, a.styles));
        return c;
      },
      applyEllipsis: function (a, k, c, z) {
        var l = this.getSpanWidth(a, k),
          b = l > z,
          l = c,
          d,
          q = 0,
          C = c.length,
          e = function (a) {
            k.removeChild(k.firstChild);
            a && k.appendChild(g.createTextNode(a));
          };
        if (b) {
          for (; q <= C; )
            (d = Math.ceil((q + C) / 2)),
              (l = c.substring(0, d) + "\u2026"),
              e(l),
              (l = this.getSpanWidth(a, k)),
              q === C ? (q = C + 1) : l > z ? (C = d - 1) : (q = d);
          0 === C && e("");
        }
        return b;
      },
      buildText: function (a) {
        var c = a.element,
          z = this,
          l = z.forExport,
          d = I(a.textStr, "").toString(),
          q = -1 !== d.indexOf("\x3c"),
          C = c.childNodes,
          y,
          f,
          w,
          G,
          v = n(c, "x"),
          p = a.styles,
          J = a.textWidth,
          m = p && p.lineHeight,
          A = p && p.textOutline,
          H = p && "ellipsis" === p.textOverflow,
          K = p && "nowrap" === p.whiteSpace,
          h = p && p.fontSize,
          Q,
          t,
          x = C.length,
          p = J && !a.added && this.box,
          u = function (a) {
            var l;
            l = /(px|em)$/.test(a && a.style.fontSize)
              ? a.style.fontSize
              : h || z.style.fontSize || 12;
            return m
              ? k(m)
              : z.fontMetrics(l, a.getAttribute("style") ? a : c).h;
          };
        Q = [d, H, K, m, A, h, J].join();
        if (Q !== a.textCache) {
          for (a.textCache = Q; x--; ) c.removeChild(C[x]);
          q || A || H || J || -1 !== d.indexOf(" ")
            ? ((y = /<.*class="([^"]+)".*>/),
              (f = /<.*style="([^"]+)".*>/),
              (w = /<.*href="([^"]+)".*>/),
              p && p.appendChild(c),
              (d = q
                ? d
                    .replace(
                      /<(b|strong)>/g,
                      '\x3cspan style\x3d"font-weight:bold"\x3e'
                    )
                    .replace(
                      /<(i|em)>/g,
                      '\x3cspan style\x3d"font-style:italic"\x3e'
                    )
                    .replace(/<a/g, "\x3cspan")
                    .replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e")
                    .split(/<br.*?>/g)
                : [d]),
              (d = b(d, function (a) {
                return "" !== a;
              })),
              e(d, function (k, b) {
                var d,
                  q = 0;
                k = k
                  .replace(/^\s+|\s+$/g, "")
                  .replace(/<span/g, "|||\x3cspan")
                  .replace(/<\/span>/g, "\x3c/span\x3e|||");
                d = k.split("|||");
                e(d, function (k) {
                  if ("" !== k || 1 === d.length) {
                    var C = {},
                      e = g.createElementNS(z.SVG_NS, "tspan"),
                      p,
                      I;
                    y.test(k) && ((p = k.match(y)[1]), n(e, "class", p));
                    f.test(k) &&
                      ((I = k
                        .match(f)[1]
                        .replace(/(;| |^)color([ :])/, "$1fill$2")),
                      n(e, "style", I));
                    w.test(k) &&
                      !l &&
                      (n(
                        e,
                        "onclick",
                        'location.href\x3d"' + k.match(w)[1] + '"'
                      ),
                      r(e, { cursor: "pointer" }));
                    k = (k.replace(/<(.|\n)*?>/g, "") || " ")
                      .replace(/&lt;/g, "\x3c")
                      .replace(/&gt;/g, "\x3e");
                    if (" " !== k) {
                      e.appendChild(g.createTextNode(k));
                      q ? (C.dx = 0) : b && null !== v && (C.x = v);
                      n(e, C);
                      c.appendChild(e);
                      !q &&
                        t &&
                        (!M && l && r(e, { display: "block" }),
                        n(e, "dy", u(e)));
                      if (J) {
                        C = k.replace(/([^\^])-/g, "$1- ").split(" ");
                        p = 1 < d.length || b || (1 < C.length && !K);
                        var m = [],
                          A,
                          h = u(e),
                          Q = a.rotation;
                        for (
                          H && (G = z.applyEllipsis(a, e, k, J));
                          !H && p && (C.length || m.length);

                        )
                          (a.rotation = 0),
                            (A = z.getSpanWidth(a, e)),
                            (k = A > J),
                            void 0 === G && (G = k),
                            k && 1 !== C.length
                              ? (e.removeChild(e.firstChild),
                                m.unshift(C.pop()))
                              : ((C = m),
                                (m = []),
                                C.length &&
                                  !K &&
                                  ((e = g.createElementNS(N, "tspan")),
                                  n(e, { dy: h, x: v }),
                                  I && n(e, "style", I),
                                  c.appendChild(e)),
                                A > J && (J = A)),
                            C.length &&
                              e.appendChild(
                                g.createTextNode(
                                  C.join(" ").replace(/- /g, "-")
                                )
                              );
                        a.rotation = Q;
                      }
                      q++;
                    }
                  }
                });
                t = t || c.childNodes.length;
              }),
              G && a.attr("title", a.textStr),
              p && p.removeChild(c),
              A && a.applyTextOutline && a.applyTextOutline(A))
            : c.appendChild(
                g.createTextNode(
                  d.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")
                )
              );
        }
      },
      getContrast: function (a) {
        a = u(a).rgba;
        return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF";
      },
      button: function (a, k, c, z, l, b, q, e, f) {
        var C = this.label(a, k, c, f, null, null, null, null, "button"),
          w = 0;
        C.attr(y({ padding: 8, r: 2 }, l));
        var G, g, p, v;
        l = y(
          {
            fill: "#f7f7f7",
            stroke: "#cccccc",
            "stroke-width": 1,
            style: {
              color: "#333333",
              cursor: "pointer",
              fontWeight: "normal",
            },
          },
          l
        );
        G = l.style;
        delete l.style;
        b = y(l, { fill: "#e6e6e6" }, b);
        g = b.style;
        delete b.style;
        q = y(
          l,
          { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } },
          q
        );
        p = q.style;
        delete q.style;
        e = y(l, { style: { color: "#cccccc" } }, e);
        v = e.style;
        delete e.style;
        F(C.element, J ? "mouseover" : "mouseenter", function () {
          3 !== w && C.setState(1);
        });
        F(C.element, J ? "mouseout" : "mouseleave", function () {
          3 !== w && C.setState(w);
        });
        C.setState = function (a) {
          1 !== a && (C.state = w = a);
          C.removeClass(
            /highcharts-button-(normal|hover|pressed|disabled)/
          ).addClass(
            "highcharts-button-" +
              ["normal", "hover", "pressed", "disabled"][a || 0]
          );
          C.attr([l, b, q, e][a || 0]).css([G, g, p, v][a || 0]);
        };
        C.attr(l).css(d({ cursor: "default" }, G));
        return C.on("click", function (a) {
          3 !== w && z.call(C, a);
        });
      },
      crispLine: function (a, k) {
        a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - (k % 2) / 2);
        a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + (k % 2) / 2);
        return a;
      },
      path: function (a) {
        var k = { fill: "none" };
        H(a) ? (k.d = a) : c(a) && d(k, a);
        return this.createElement("path").attr(k);
      },
      circle: function (a, k, z) {
        a = c(a) ? a : { x: a, y: k, r: z };
        k = this.createElement("circle");
        k.xSetter = k.ySetter = function (a, k, c) {
          c.setAttribute("c" + k, a);
        };
        return k.attr(a);
      },
      arc: function (a, k, z, l, b, d) {
        c(a)
          ? ((l = a), (k = l.y), (z = l.r), (a = l.x))
          : (l = { innerR: l, start: b, end: d });
        a = this.symbol("arc", a, k, z, z, l);
        a.r = z;
        return a;
      },
      rect: function (a, k, z, l, b, d) {
        b = c(a) ? a.r : b;
        var q = this.createElement("rect");
        a = c(a)
          ? a
          : void 0 === a
          ? {}
          : { x: a, y: k, width: Math.max(z, 0), height: Math.max(l, 0) };
        void 0 !== d && ((a.strokeWidth = d), (a = q.crisp(a)));
        a.fill = "none";
        b && (a.r = b);
        q.rSetter = function (a, k, c) {
          n(c, { rx: a, ry: a });
        };
        return q.attr(a);
      },
      setSize: function (a, k, c) {
        var z = this.alignedObjects,
          l = z.length;
        this.width = a;
        this.height = k;
        for (
          this.boxWrapper.animate(
            { width: a, height: k },
            {
              step: function () {
                this.attr({
                  viewBox:
                    "0 0 " + this.attr("width") + " " + this.attr("height"),
                });
              },
              duration: I(c, !0) ? void 0 : 0,
            }
          );
          l--;

        )
          z[l].align();
      },
      g: function (a) {
        var k = this.createElement("g");
        return a ? k.attr({ class: "highcharts-" + a }) : k;
      },
      image: function (a, k, c, z, l) {
        var b = { preserveAspectRatio: "none" };
        1 < arguments.length && d(b, { x: k, y: c, width: z, height: l });
        b = this.createElement("image").attr(b);
        b.element.setAttributeNS
          ? b.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a)
          : b.element.setAttribute("hc-svg-href", a);
        return b;
      },
      symbol: function (a, k, c, z, l, b) {
        var q = this,
          y,
          C = /^url\((.*?)\)$/,
          f = C.test(a),
          w = !f && (this.symbols[a] ? a : "circle"),
          G = w && this.symbols[w],
          p =
            t(k) &&
            G &&
            G.call(this.symbols, Math.round(k), Math.round(c), z, l, b),
          v,
          M;
        G
          ? ((y = this.path(p)),
            y.attr("fill", "none"),
            d(y, { symbolName: w, x: k, y: c, width: z, height: l }),
            b && d(y, b))
          : f &&
            ((v = a.match(C)[1]),
            (y = this.image(v)),
            (y.imgwidth = I(P[v] && P[v].width, b && b.width)),
            (y.imgheight = I(P[v] && P[v].height, b && b.height)),
            (M = function () {
              y.attr({ width: y.width, height: y.height });
            }),
            e(["width", "height"], function (a) {
              y[a + "Setter"] = function (a, k) {
                var c = {},
                  z = this["img" + k],
                  l = "width" === k ? "translateX" : "translateY";
                this[k] = a;
                t(z) &&
                  (this.element && this.element.setAttribute(k, z),
                  this.alignByTranslate ||
                    ((c[l] = ((this[k] || 0) - z) / 2), this.attr(c)));
              };
            }),
            t(k) && y.attr({ x: k, y: c }),
            (y.isImg = !0),
            t(y.imgwidth) && t(y.imgheight)
              ? M()
              : (y.attr({ width: 0, height: 0 }),
                x("img", {
                  onload: function () {
                    var a = h[q.chartIndex];
                    0 === this.width &&
                      (r(this, { position: "absolute", top: "-999em" }),
                      g.body.appendChild(this));
                    P[v] = { width: this.width, height: this.height };
                    y.imgwidth = this.width;
                    y.imgheight = this.height;
                    y.element && M();
                    this.parentNode && this.parentNode.removeChild(this);
                    q.imgCount--;
                    if (!q.imgCount && a && a.onload) a.onload();
                  },
                  src: v,
                }),
                this.imgCount++));
        return y;
      },
      symbols: {
        circle: function (a, k, c, z) {
          return this.arc(a + c / 2, k + z / 2, c / 2, z / 2, {
            start: 0,
            end: 2 * Math.PI,
            open: !1,
          });
        },
        square: function (a, k, c, z) {
          return ["M", a, k, "L", a + c, k, a + c, k + z, a, k + z, "Z"];
        },
        triangle: function (a, k, c, z) {
          return ["M", a + c / 2, k, "L", a + c, k + z, a, k + z, "Z"];
        },
        "triangle-down": function (a, k, c, z) {
          return ["M", a, k, "L", a + c, k, a + c / 2, k + z, "Z"];
        },
        diamond: function (a, k, c, z) {
          return [
            "M",
            a + c / 2,
            k,
            "L",
            a + c,
            k + z / 2,
            a + c / 2,
            k + z,
            a,
            k + z / 2,
            "Z",
          ];
        },
        arc: function (a, k, c, z, l) {
          var b = l.start,
            d = l.r || c,
            q = l.r || z || c,
            e = l.end - 0.001;
          c = l.innerR;
          z = l.open;
          var y = Math.cos(b),
            f = Math.sin(b),
            C = Math.cos(e),
            e = Math.sin(e);
          l = l.end - b < Math.PI ? 0 : 1;
          d = [
            "M",
            a + d * y,
            k + q * f,
            "A",
            d,
            q,
            0,
            l,
            1,
            a + d * C,
            k + q * e,
          ];
          t(c) &&
            d.push(
              z ? "M" : "L",
              a + c * C,
              k + c * e,
              "A",
              c,
              c,
              0,
              l,
              0,
              a + c * y,
              k + c * f
            );
          d.push(z ? "" : "Z");
          return d;
        },
        callout: function (a, k, c, z, l) {
          var b = Math.min((l && l.r) || 0, c, z),
            d = b + 6,
            q = l && l.anchorX;
          l = l && l.anchorY;
          var e;
          e = [
            "M",
            a + b,
            k,
            "L",
            a + c - b,
            k,
            "C",
            a + c,
            k,
            a + c,
            k,
            a + c,
            k + b,
            "L",
            a + c,
            k + z - b,
            "C",
            a + c,
            k + z,
            a + c,
            k + z,
            a + c - b,
            k + z,
            "L",
            a + b,
            k + z,
            "C",
            a,
            k + z,
            a,
            k + z,
            a,
            k + z - b,
            "L",
            a,
            k + b,
            "C",
            a,
            k,
            a,
            k,
            a + b,
            k,
          ];
          q && q > c
            ? l > k + d && l < k + z - d
              ? e.splice(
                  13,
                  3,
                  "L",
                  a + c,
                  l - 6,
                  a + c + 6,
                  l,
                  a + c,
                  l + 6,
                  a + c,
                  k + z - b
                )
              : e.splice(
                  13,
                  3,
                  "L",
                  a + c,
                  z / 2,
                  q,
                  l,
                  a + c,
                  z / 2,
                  a + c,
                  k + z - b
                )
            : q && 0 > q
            ? l > k + d && l < k + z - d
              ? e.splice(33, 3, "L", a, l + 6, a - 6, l, a, l - 6, a, k + b)
              : e.splice(33, 3, "L", a, z / 2, q, l, a, z / 2, a, k + b)
            : l && l > z && q > a + d && q < a + c - d
            ? e.splice(
                23,
                3,
                "L",
                q + 6,
                k + z,
                q,
                k + z + 6,
                q - 6,
                k + z,
                a + b,
                k + z
              )
            : l &&
              0 > l &&
              q > a + d &&
              q < a + c - d &&
              e.splice(3, 3, "L", q - 6, k, q, k - 6, q + 6, k, c - b, k);
          return e;
        },
      },
      clipRect: function (k, c, z, l) {
        var b = a.uniqueKey(),
          d = this.createElement("clipPath").attr({ id: b }).add(this.defs);
        k = this.rect(k, c, z, l, 0).add(d);
        k.id = b;
        k.clipPath = d;
        k.count = 0;
        return k;
      },
      text: function (a, k, c, z) {
        var l = !M && this.forExport,
          b = {};
        if (z && (this.allowHTML || !this.forExport)) return this.html(a, k, c);
        b.x = Math.round(k || 0);
        c && (b.y = Math.round(c));
        if (a || 0 === a) b.text = a;
        a = this.createElement("text").attr(b);
        l && a.css({ position: "absolute" });
        z ||
          (a.xSetter = function (a, k, c) {
            var z = c.getElementsByTagName("tspan"),
              l,
              b = c.getAttribute(k),
              d;
            for (d = 0; d < z.length; d++)
              (l = z[d]), l.getAttribute(k) === b && l.setAttribute(k, a);
            c.setAttribute(k, a);
          });
        return a;
      },
      fontMetrics: function (a, c) {
        a =
          a ||
          (c && c.style && c.style.fontSize) ||
          (this.style && this.style.fontSize);
        a = /px/.test(a)
          ? k(a)
          : /em/.test(a)
          ? parseFloat(a) * (c ? this.fontMetrics(null, c.parentNode).f : 16)
          : 12;
        c = 24 > a ? a + 3 : Math.round(1.2 * a);
        return { h: c, b: Math.round(0.8 * c), f: a };
      },
      rotCorr: function (a, k, c) {
        var z = a;
        k && c && (z = Math.max(z * Math.cos(k * m), 4));
        return { x: (-a / 3) * Math.sin(k * m), y: z };
      },
      label: function (k, c, l, b, q, f, w, G, g) {
        var v = this,
          p = v.g("button" !== g && "label"),
          M = (p.text = v.text("", 0, 0, w).attr({ zIndex: 1 })),
          C,
          I,
          J = 0,
          m = 3,
          A = 0,
          H,
          h,
          K,
          Q,
          r,
          N = {},
          n,
          x,
          u = /^url\((.*?)\)$/.test(b),
          P = u,
          R,
          V,
          U,
          O;
        g && p.addClass("highcharts-" + g);
        P = u;
        R = function () {
          return ((n || 0) % 2) / 2;
        };
        V = function () {
          var a = M.element.style,
            k = {};
          I =
            (void 0 === H || void 0 === h || r) && t(M.textStr) && M.getBBox();
          p.width = (H || I.width || 0) + 2 * m + A;
          p.height = (h || I.height || 0) + 2 * m;
          x = m + v.fontMetrics(a && a.fontSize, M).b;
          P &&
            (C ||
              ((p.box = C = v.symbols[b] || u ? v.symbol(b) : v.rect()),
              C.addClass(
                ("button" === g ? "" : "highcharts-label-box") +
                  (g ? " highcharts-" + g + "-box" : "")
              ),
              C.add(p),
              (a = R()),
              (k.x = a),
              (k.y = (G ? -x : 0) + a)),
            (k.width = Math.round(p.width)),
            (k.height = Math.round(p.height)),
            C.attr(d(k, N)),
            (N = {}));
        };
        U = function () {
          var a = A + m,
            k;
          k = G ? 0 : x;
          t(H) &&
            I &&
            ("center" === r || "right" === r) &&
            (a += { center: 0.5, right: 1 }[r] * (H - I.width));
          if (a !== M.x || k !== M.y)
            M.attr("x", a), void 0 !== k && M.attr("y", k);
          M.x = a;
          M.y = k;
        };
        O = function (a, k) {
          C ? C.attr(a, k) : (N[a] = k);
        };
        p.onAdd = function () {
          M.add(p);
          p.attr({ text: k || 0 === k ? k : "", x: c, y: l });
          C && t(q) && p.attr({ anchorX: q, anchorY: f });
        };
        p.widthSetter = function (k) {
          H = a.isNumber(k) ? k : null;
        };
        p.heightSetter = function (a) {
          h = a;
        };
        p["text-alignSetter"] = function (a) {
          r = a;
        };
        p.paddingSetter = function (a) {
          t(a) && a !== m && ((m = p.padding = a), U());
        };
        p.paddingLeftSetter = function (a) {
          t(a) && a !== A && ((A = a), U());
        };
        p.alignSetter = function (a) {
          a = { left: 0, center: 0.5, right: 1 }[a];
          a !== J && ((J = a), I && p.attr({ x: K }));
        };
        p.textSetter = function (a) {
          void 0 !== a && M.textSetter(a);
          V();
          U();
        };
        p["stroke-widthSetter"] = function (a, k) {
          a && (P = !0);
          n = this["stroke-width"] = a;
          O(k, a);
        };
        p.strokeSetter =
          p.fillSetter =
          p.rSetter =
            function (a, k) {
              "fill" === k && a && (P = !0);
              O(k, a);
            };
        p.anchorXSetter = function (a, k) {
          q = p.anchorX = a;
          O(k, Math.round(a) - R() - K);
        };
        p.anchorYSetter = function (a, k) {
          f = p.anchorY = a;
          O(k, a - Q);
        };
        p.xSetter = function (a) {
          p.x = a;
          J && (a -= J * ((H || I.width) + 2 * m));
          K = Math.round(a);
          p.attr("translateX", K);
        };
        p.ySetter = function (a) {
          Q = p.y = Math.round(a);
          p.attr("translateY", Q);
        };
        var B = p.css;
        return d(p, {
          css: function (a) {
            if (a) {
              var k = {};
              a = y(a);
              e(p.textProps, function (c) {
                void 0 !== a[c] && ((k[c] = a[c]), delete a[c]);
              });
              M.css(k);
            }
            return B.call(p, a);
          },
          getBBox: function () {
            return {
              width: I.width + 2 * m,
              height: I.height + 2 * m,
              x: I.x - m,
              y: I.y - m,
            };
          },
          shadow: function (a) {
            a && (V(), C && C.shadow(a));
            return p;
          },
          destroy: function () {
            z(p.element, "mouseenter");
            z(p.element, "mouseleave");
            M && (M = M.destroy());
            C && (C = C.destroy());
            E.prototype.destroy.call(p);
            p = v = V = U = O = null;
          },
        });
      },
    });
    a.Renderer = B;
  })(L);
  (function (a) {
    var E = a.attr,
      B = a.createElement,
      F = a.css,
      D = a.defined,
      n = a.each,
      h = a.extend,
      u = a.isFirefox,
      r = a.isMS,
      x = a.isWebKit,
      t = a.pInt,
      m = a.SVGRenderer,
      f = a.win,
      g = a.wrap;
    h(a.SVGElement.prototype, {
      htmlCss: function (a) {
        var d = this.element;
        if ((d = a && "SPAN" === d.tagName && a.width))
          delete a.width, (this.textWidth = d), this.updateTransform();
        a &&
          "ellipsis" === a.textOverflow &&
          ((a.whiteSpace = "nowrap"), (a.overflow = "hidden"));
        this.styles = h(this.styles, a);
        F(this.element, a);
        return this;
      },
      htmlGetBBox: function () {
        var a = this.element;
        "text" === a.nodeName && (a.style.position = "absolute");
        return {
          x: a.offsetLeft,
          y: a.offsetTop,
          width: a.offsetWidth,
          height: a.offsetHeight,
        };
      },
      htmlUpdateTransform: function () {
        if (this.added) {
          var a = this.renderer,
            d = this.element,
            f = this.translateX || 0,
            b = this.translateY || 0,
            g = this.x || 0,
            v = this.y || 0,
            m = this.textAlign || "left",
            q = { left: 0, center: 0.5, right: 1 }[m],
            J = this.styles;
          F(d, { marginLeft: f, marginTop: b });
          this.shadows &&
            n(this.shadows, function (a) {
              F(a, { marginLeft: f + 1, marginTop: b + 1 });
            });
          this.inverted &&
            n(d.childNodes, function (c) {
              a.invertChild(c, d);
            });
          if ("SPAN" === d.tagName) {
            var c = this.rotation,
              w = t(this.textWidth),
              K = J && J.whiteSpace,
              y = [c, m, d.innerHTML, this.textWidth, this.textAlign].join();
            y !== this.cTT &&
              ((J = a.fontMetrics(d.style.fontSize).b),
              D(c) && this.setSpanRotation(c, q, J),
              F(d, { width: "", whiteSpace: K || "nowrap" }),
              d.offsetWidth > w &&
                /[ \-]/.test(d.textContent || d.innerText) &&
                F(d, {
                  width: w + "px",
                  display: "block",
                  whiteSpace: K || "normal",
                }),
              this.getSpanCorrection(d.offsetWidth, J, q, c, m));
            F(d, {
              left: g + (this.xCorr || 0) + "px",
              top: v + (this.yCorr || 0) + "px",
            });
            x && (J = d.offsetHeight);
            this.cTT = y;
          }
        } else this.alignOnAdd = !0;
      },
      setSpanRotation: function (a, d, p) {
        var b = {},
          e = r
            ? "-ms-transform"
            : x
            ? "-webkit-transform"
            : u
            ? "MozTransform"
            : f.opera
            ? "-o-transform"
            : "";
        b[e] = b.transform = "rotate(" + a + "deg)";
        b[e + (u ? "Origin" : "-origin")] = b.transformOrigin =
          100 * d + "% " + p + "px";
        F(this.element, b);
      },
      getSpanCorrection: function (a, d, f) {
        this.xCorr = -a * f;
        this.yCorr = -d;
      },
    });
    h(m.prototype, {
      html: function (a, d, f) {
        var b = this.createElement("span"),
          e = b.element,
          p = b.renderer,
          m = p.isSVG,
          q = function (a, c) {
            n(["opacity", "visibility"], function (b) {
              g(a, b + "Setter", function (a, b, d, l) {
                a.call(this, b, d, l);
                c[d] = b;
              });
            });
          };
        b.textSetter = function (a) {
          a !== e.innerHTML && delete this.bBox;
          e.innerHTML = this.textStr = a;
          b.htmlUpdateTransform();
        };
        m && q(b, b.element.style);
        b.xSetter =
          b.ySetter =
          b.alignSetter =
          b.rotationSetter =
            function (a, c) {
              "align" === c && (c = "textAlign");
              b[c] = a;
              b.htmlUpdateTransform();
            };
        b.attr({ text: a, x: Math.round(d), y: Math.round(f) }).css({
          fontFamily: this.style.fontFamily,
          fontSize: this.style.fontSize,
          position: "absolute",
        });
        e.style.whiteSpace = "nowrap";
        b.css = b.htmlCss;
        m &&
          (b.add = function (a) {
            var c,
              d = p.box.parentNode,
              f = [];
            if ((this.parentGroup = a)) {
              if (((c = a.div), !c)) {
                for (; a; ) f.push(a), (a = a.parentGroup);
                n(f.reverse(), function (a) {
                  var e,
                    l = E(a.element, "class");
                  l && (l = { className: l });
                  c = a.div =
                    a.div ||
                    B(
                      "div",
                      l,
                      {
                        position: "absolute",
                        left: (a.translateX || 0) + "px",
                        top: (a.translateY || 0) + "px",
                        display: a.display,
                        opacity: a.opacity,
                        pointerEvents: a.styles && a.styles.pointerEvents,
                      },
                      c || d
                    );
                  e = c.style;
                  h(a, {
                    on: function () {
                      b.on.apply({ element: f[0].div }, arguments);
                      return a;
                    },
                    translateXSetter: function (c, k) {
                      e.left = c + "px";
                      a[k] = c;
                      a.doTransform = !0;
                    },
                    translateYSetter: function (c, k) {
                      e.top = c + "px";
                      a[k] = c;
                      a.doTransform = !0;
                    },
                  });
                  q(a, e);
                });
              }
            } else c = d;
            c.appendChild(e);
            b.added = !0;
            b.alignOnAdd && b.htmlUpdateTransform();
            return b;
          });
        return b;
      },
    });
  })(L);
  (function (a) {
    var E,
      B,
      F = a.createElement,
      D = a.css,
      n = a.defined,
      h = a.deg2rad,
      u = a.discardElement,
      r = a.doc,
      x = a.each,
      t = a.erase,
      m = a.extend;
    E = a.extendClass;
    var f = a.isArray,
      g = a.isNumber,
      e = a.isObject,
      d = a.merge;
    B = a.noop;
    var p = a.pick,
      b = a.pInt,
      A = a.SVGElement,
      v = a.SVGRenderer,
      H = a.win;
    a.svg ||
      ((B = {
        docMode8: r && 8 === r.documentMode,
        init: function (a, b) {
          var c = ["\x3c", b, ' filled\x3d"f" stroked\x3d"f"'],
            d = ["position: ", "absolute", ";"],
            q = "div" === b;
          ("shape" === b || q) && d.push("left:0;top:0;width:1px;height:1px;");
          d.push("visibility: ", q ? "hidden" : "visible");
          c.push(' style\x3d"', d.join(""), '"/\x3e');
          b &&
            ((c = q || "span" === b || "img" === b ? c.join("") : a.prepVML(c)),
            (this.element = F(c)));
          this.renderer = a;
        },
        add: function (a) {
          var b = this.renderer,
            c = this.element,
            d = b.box,
            q = a && a.inverted,
            d = a ? a.element || a : d;
          a && (this.parentGroup = a);
          q && b.invertChild(c, d);
          d.appendChild(c);
          this.added = !0;
          this.alignOnAdd &&
            !this.deferUpdateTransform &&
            this.updateTransform();
          if (this.onAdd) this.onAdd();
          this.className && this.attr("class", this.className);
          return this;
        },
        updateTransform: A.prototype.htmlUpdateTransform,
        setSpanRotation: function () {
          var a = this.rotation,
            b = Math.cos(a * h),
            c = Math.sin(a * h);
          D(this.element, {
            filter: a
              ? [
                  "progid:DXImageTransform.Microsoft.Matrix(M11\x3d",
                  b,
                  ", M12\x3d",
                  -c,
                  ", M21\x3d",
                  c,
                  ", M22\x3d",
                  b,
                  ", sizingMethod\x3d'auto expand')",
                ].join("")
              : "none",
          });
        },
        getSpanCorrection: function (a, b, c, d, e) {
          var q = d ? Math.cos(d * h) : 1,
            f = d ? Math.sin(d * h) : 0,
            l = p(this.elemHeight, this.element.offsetHeight),
            w;
          this.xCorr = 0 > q && -a;
          this.yCorr = 0 > f && -l;
          w = 0 > q * f;
          this.xCorr += f * b * (w ? 1 - c : c);
          this.yCorr -= q * b * (d ? (w ? c : 1 - c) : 1);
          e &&
            "left" !== e &&
            ((this.xCorr -= a * c * (0 > q ? -1 : 1)),
            d && (this.yCorr -= l * c * (0 > f ? -1 : 1)),
            D(this.element, { textAlign: e }));
        },
        pathToVML: function (a) {
          for (var b = a.length, c = []; b--; )
            g(a[b])
              ? (c[b] = Math.round(10 * a[b]) - 5)
              : "Z" === a[b]
              ? (c[b] = "x")
              : ((c[b] = a[b]),
                !a.isArc ||
                  ("wa" !== a[b] && "at" !== a[b]) ||
                  (c[b + 5] === c[b + 7] &&
                    (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1),
                  c[b + 6] === c[b + 8] &&
                    (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
          return c.join(" ") || "x";
        },
        clip: function (a) {
          var b = this,
            c;
          a
            ? ((c = a.members),
              t(c, b),
              c.push(b),
              (b.destroyClip = function () {
                t(c, b);
              }),
              (a = a.getCSS(b)))
            : (b.destroyClip && b.destroyClip(),
              (a = { clip: b.docMode8 ? "inherit" : "rect(auto)" }));
          return b.css(a);
        },
        css: A.prototype.htmlCss,
        safeRemoveChild: function (a) {
          a.parentNode && u(a);
        },
        destroy: function () {
          this.destroyClip && this.destroyClip();
          return A.prototype.destroy.apply(this);
        },
        on: function (a, b) {
          this.element["on" + a] = function () {
            var a = H.event;
            a.target = a.srcElement;
            b(a);
          };
          return this;
        },
        cutOffPath: function (a, d) {
          var c;
          a = a.split(/[ ,]/);
          c = a.length;
          if (9 === c || 11 === c) a[c - 4] = a[c - 2] = b(a[c - 2]) - 10 * d;
          return a.join(" ");
        },
        shadow: function (a, d, c) {
          var e = [],
            q,
            f = this.element,
            g = this.renderer,
            l,
            v = f.style,
            k,
            z = f.path,
            m,
            M,
            A,
            J;
          z && "string" !== typeof z.value && (z = "x");
          M = z;
          if (a) {
            A = p(a.width, 3);
            J = (a.opacity || 0.15) / A;
            for (q = 1; 3 >= q; q++)
              (m = 2 * A + 1 - 2 * q),
                c && (M = this.cutOffPath(z.value, m + 0.5)),
                (k = [
                  '\x3cshape isShadow\x3d"true" strokeweight\x3d"',
                  m,
                  '" filled\x3d"false" path\x3d"',
                  M,
                  '" coordsize\x3d"10 10" style\x3d"',
                  f.style.cssText,
                  '" /\x3e',
                ]),
                (l = F(g.prepVML(k), null, {
                  left: b(v.left) + p(a.offsetX, 1),
                  top: b(v.top) + p(a.offsetY, 1),
                })),
                c && (l.cutOff = m + 1),
                (k = [
                  '\x3cstroke color\x3d"',
                  a.color || "#000000",
                  '" opacity\x3d"',
                  J * q,
                  '"/\x3e',
                ]),
                F(g.prepVML(k), null, null, l),
                d ? d.element.appendChild(l) : f.parentNode.insertBefore(l, f),
                e.push(l);
            this.shadows = e;
          }
          return this;
        },
        updateShadows: B,
        setAttr: function (a, b) {
          this.docMode8
            ? (this.element[a] = b)
            : this.element.setAttribute(a, b);
        },
        classSetter: function (a) {
          (this.added ? this.element : this).className = a;
        },
        dashstyleSetter: function (a, b, c) {
          (c.getElementsByTagName("stroke")[0] ||
            F(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, c))[b] =
            a || "solid";
          this[b] = a;
        },
        dSetter: function (a, b, c) {
          var d = this.shadows;
          a = a || [];
          this.d = a.join && a.join(" ");
          c.path = a = this.pathToVML(a);
          if (d)
            for (c = d.length; c--; )
              d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) : a;
          this.setAttr(b, a);
        },
        fillSetter: function (a, b, c) {
          var d = c.nodeName;
          "SPAN" === d
            ? (c.style.color = a)
            : "IMG" !== d &&
              ((c.filled = "none" !== a),
              this.setAttr("fillcolor", this.renderer.color(a, c, b, this)));
        },
        "fill-opacitySetter": function (a, b, c) {
          F(
            this.renderer.prepVML([
              "\x3c",
              b.split("-")[0],
              ' opacity\x3d"',
              a,
              '"/\x3e',
            ]),
            null,
            null,
            c
          );
        },
        opacitySetter: B,
        rotationSetter: function (a, b, c) {
          c = c.style;
          this[b] = c[b] = a;
          c.left = -Math.round(Math.sin(a * h) + 1) + "px";
          c.top = Math.round(Math.cos(a * h)) + "px";
        },
        strokeSetter: function (a, b, c) {
          this.setAttr("strokecolor", this.renderer.color(a, c, b, this));
        },
        "stroke-widthSetter": function (a, b, c) {
          c.stroked = !!a;
          this[b] = a;
          g(a) && (a += "px");
          this.setAttr("strokeweight", a);
        },
        titleSetter: function (a, b) {
          this.setAttr(b, a);
        },
        visibilitySetter: function (a, b, c) {
          "inherit" === a && (a = "visible");
          this.shadows &&
            x(this.shadows, function (c) {
              c.style[b] = a;
            });
          "DIV" === c.nodeName &&
            ((a = "hidden" === a ? "-999em" : 0),
            this.docMode8 || (c.style[b] = a ? "visible" : "hidden"),
            (b = "top"));
          c.style[b] = a;
        },
        xSetter: function (a, b, c) {
          this[b] = a;
          "x" === b ? (b = "left") : "y" === b && (b = "top");
          this.updateClipping
            ? ((this[b] = a), this.updateClipping())
            : (c.style[b] = a);
        },
        zIndexSetter: function (a, b, c) {
          c.style[b] = a;
        },
      }),
      (B["stroke-opacitySetter"] = B["fill-opacitySetter"]),
      (a.VMLElement = B = E(A, B)),
      (B.prototype.ySetter =
        B.prototype.widthSetter =
        B.prototype.heightSetter =
          B.prototype.xSetter),
      (B = {
        Element: B,
        isIE8: -1 < H.navigator.userAgent.indexOf("MSIE 8.0"),
        init: function (a, b, c) {
          var d, e;
          this.alignedObjects = [];
          d = this.createElement("div").css({ position: "relative" });
          e = d.element;
          a.appendChild(d.element);
          this.isVML = !0;
          this.box = e;
          this.boxWrapper = d;
          this.gradients = {};
          this.cache = {};
          this.cacheKeys = [];
          this.imgCount = 0;
          this.setSize(b, c, !1);
          if (!r.namespaces.hcv) {
            r.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
            try {
              r.createStyleSheet().cssText =
                "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
            } catch (y) {
              r.styleSheets[0].cssText +=
                "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
            }
          }
        },
        isHidden: function () {
          return !this.box.offsetWidth;
        },
        clipRect: function (a, b, c, d) {
          var f = this.createElement(),
            q = e(a);
          return m(f, {
            members: [],
            count: 0,
            left: (q ? a.x : a) + 1,
            top: (q ? a.y : b) + 1,
            width: (q ? a.width : c) - 1,
            height: (q ? a.height : d) - 1,
            getCSS: function (a) {
              var c = a.element,
                b = c.nodeName,
                k = a.inverted,
                z = this.top - ("shape" === b ? c.offsetTop : 0),
                d = this.left,
                c = d + this.width,
                e = z + this.height,
                z = {
                  clip:
                    "rect(" +
                    Math.round(k ? d : z) +
                    "px," +
                    Math.round(k ? e : c) +
                    "px," +
                    Math.round(k ? c : e) +
                    "px," +
                    Math.round(k ? z : d) +
                    "px)",
                };
              !k &&
                a.docMode8 &&
                "DIV" === b &&
                m(z, { width: c + "px", height: e + "px" });
              return z;
            },
            updateClipping: function () {
              x(f.members, function (a) {
                a.element && a.css(f.getCSS(a));
              });
            },
          });
        },
        color: function (b, d, c, e) {
          var f = this,
            y,
            q = /^rgba/,
            l,
            p,
            k = "none";
          b && b.linearGradient
            ? (p = "gradient")
            : b && b.radialGradient && (p = "pattern");
          if (p) {
            var z,
              g,
              v = b.linearGradient || b.radialGradient,
              w,
              m,
              A,
              C,
              H,
              h = "";
            b = b.stops;
            var J,
              r = [],
              n = function () {
                l = [
                  '\x3cfill colors\x3d"' + r.join(",") + '" opacity\x3d"',
                  A,
                  '" o:opacity2\x3d"',
                  m,
                  '" type\x3d"',
                  p,
                  '" ',
                  h,
                  'focus\x3d"100%" method\x3d"any" /\x3e',
                ];
                F(f.prepVML(l), null, null, d);
              };
            w = b[0];
            J = b[b.length - 1];
            0 < w[0] && b.unshift([0, w[1]]);
            1 > J[0] && b.push([1, J[1]]);
            x(b, function (k, c) {
              q.test(k[1])
                ? ((y = a.color(k[1])), (z = y.get("rgb")), (g = y.get("a")))
                : ((z = k[1]), (g = 1));
              r.push(100 * k[0] + "% " + z);
              c ? ((A = g), (C = z)) : ((m = g), (H = z));
            });
            if ("fill" === c)
              if ("gradient" === p)
                (c = v.x1 || v[0] || 0),
                  (b = v.y1 || v[1] || 0),
                  (w = v.x2 || v[2] || 0),
                  (v = v.y2 || v[3] || 0),
                  (h =
                    'angle\x3d"' +
                    (90 - (180 * Math.atan((v - b) / (w - c))) / Math.PI) +
                    '"'),
                  n();
              else {
                var k = v.r,
                  t = 2 * k,
                  u = 2 * k,
                  B = v.cx,
                  E = v.cy,
                  D = d.radialReference,
                  S,
                  k = function () {
                    D &&
                      ((S = e.getBBox()),
                      (B += (D[0] - S.x) / S.width - 0.5),
                      (E += (D[1] - S.y) / S.height - 0.5),
                      (t *= D[2] / S.width),
                      (u *= D[2] / S.height));
                    h =
                      'src\x3d"' +
                      a.getOptions().global.VMLRadialGradientURL +
                      '" size\x3d"' +
                      t +
                      "," +
                      u +
                      '" origin\x3d"0.5,0.5" position\x3d"' +
                      B +
                      "," +
                      E +
                      '" color2\x3d"' +
                      H +
                      '" ';
                    n();
                  };
                e.added ? k() : (e.onAdd = k);
                k = C;
              }
            else k = z;
          } else
            q.test(b) && "IMG" !== d.tagName
              ? ((y = a.color(b)),
                e[c + "-opacitySetter"](y.get("a"), c, d),
                (k = y.get("rgb")))
              : ((k = d.getElementsByTagName(c)),
                k.length && ((k[0].opacity = 1), (k[0].type = "solid")),
                (k = b));
          return k;
        },
        prepVML: function (a) {
          var b = this.isIE8;
          a = a.join("");
          b
            ? ((a = a.replace(
                "/\x3e",
                ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'
              )),
              (a =
                -1 === a.indexOf('style\x3d"')
                  ? a.replace(
                      "/\x3e",
                      ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e'
                    )
                  : a.replace(
                      'style\x3d"',
                      'style\x3d"display:inline-block;behavior:url(#default#VML);'
                    )))
            : (a = a.replace("\x3c", "\x3chcv:"));
          return a;
        },
        text: v.prototype.html,
        path: function (a) {
          var b = { coordsize: "10 10" };
          f(a) ? (b.d = a) : e(a) && m(b, a);
          return this.createElement("shape").attr(b);
        },
        circle: function (a, b, c) {
          var d = this.symbol("circle");
          e(a) && ((c = a.r), (b = a.y), (a = a.x));
          d.isCircle = !0;
          d.r = c;
          return d.attr({ x: a, y: b });
        },
        g: function (a) {
          var b;
          a && (b = { className: "highcharts-" + a, class: "highcharts-" + a });
          return this.createElement("div").attr(b);
        },
        image: function (a, b, c, d, e) {
          var f = this.createElement("img").attr({ src: a });
          1 < arguments.length && f.attr({ x: b, y: c, width: d, height: e });
          return f;
        },
        createElement: function (a) {
          return "rect" === a
            ? this.symbol(a)
            : v.prototype.createElement.call(this, a);
        },
        invertChild: function (a, d) {
          var c = this;
          d = d.style;
          var e = "IMG" === a.tagName && a.style;
          D(a, {
            flip: "x",
            left: b(d.width) - (e ? b(e.top) : 1),
            top: b(d.height) - (e ? b(e.left) : 1),
            rotation: -90,
          });
          x(a.childNodes, function (b) {
            c.invertChild(b, a);
          });
        },
        symbols: {
          arc: function (a, b, c, d, e) {
            var f = e.start,
              p = e.end,
              l = e.r || c || d;
            c = e.innerR;
            d = Math.cos(f);
            var g = Math.sin(f),
              k = Math.cos(p),
              z = Math.sin(p);
            if (0 === p - f) return ["x"];
            f = [
              "wa",
              a - l,
              b - l,
              a + l,
              b + l,
              a + l * d,
              b + l * g,
              a + l * k,
              b + l * z,
            ];
            e.open && !c && f.push("e", "M", a, b);
            f.push(
              "at",
              a - c,
              b - c,
              a + c,
              b + c,
              a + c * k,
              b + c * z,
              a + c * d,
              b + c * g,
              "x",
              "e"
            );
            f.isArc = !0;
            return f;
          },
          circle: function (a, b, c, d, e) {
            e && n(e.r) && (c = d = 2 * e.r);
            e && e.isCircle && ((a -= c / 2), (b -= d / 2));
            return [
              "wa",
              a,
              b,
              a + c,
              b + d,
              a + c,
              b + d / 2,
              a + c,
              b + d / 2,
              "e",
            ];
          },
          rect: function (a, b, c, d, e) {
            return v.prototype.symbols[n(e) && e.r ? "callout" : "square"].call(
              0,
              a,
              b,
              c,
              d,
              e
            );
          },
        },
      }),
      (a.VMLRenderer = E =
        function () {
          this.init.apply(this, arguments);
        }),
      (E.prototype = d(v.prototype, B)),
      (a.Renderer = E));
    v.prototype.measureSpanWidth = function (a, b) {
      var c = r.createElement("span");
      a = r.createTextNode(a);
      c.appendChild(a);
      D(c, b);
      this.box.appendChild(c);
      b = c.offsetWidth;
      u(c);
      return b;
    };
  })(L);
  (function (a) {
    function E() {
      var h = a.defaultOptions.global,
        n = r.moment;
      if (h.timezone) {
        if (n)
          return function (a) {
            return -n.tz(a, h.timezone).utcOffset();
          };
        a.error(25);
      }
      return h.useUTC && h.getTimezoneOffset;
    }
    function B() {
      var h = a.defaultOptions.global,
        t,
        m = h.useUTC,
        f = m ? "getUTC" : "get",
        g = m ? "setUTC" : "set";
      a.Date = t = h.Date || r.Date;
      t.hcTimezoneOffset = m && h.timezoneOffset;
      t.hcGetTimezoneOffset = E();
      t.hcMakeTime = function (a, d, f, b, g, v) {
        var e;
        m
          ? ((e = t.UTC.apply(0, arguments)), (e += n(e)))
          : (e = new t(a, d, u(f, 1), u(b, 0), u(g, 0), u(v, 0)).getTime());
        return e;
      };
      D("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
        t["hcGet" + a] = f + a;
      });
      D(
        "Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),
        function (a) {
          t["hcSet" + a] = g + a;
        }
      );
    }
    var F = a.color,
      D = a.each,
      n = a.getTZOffset,
      h = a.merge,
      u = a.pick,
      r = a.win;
    a.defaultOptions = {
      colors:
        "#000000 #7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(
          " "
        ),
      symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
      lang: {
        loading: "Loading...",
        months:
          "January February March April May June July August September October November December".split(
            " "
          ),
        shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(
          " "
        ),
        weekdays:
          "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        decimalPoint: ".",
        numericSymbols: "kMGTPE".split(""),
        resetZoom: "Reset zoom",
        resetZoomTitle: "Reset zoom level 1:1",
        thousandsSep: " ",
      },
      global: {
        useUTC: !0,
        VMLRadialGradientURL:
          "http://code.highcharts.com/5.0.12/gfx/vml-radial-gradient.png",
      },
      chart: {
        borderRadius: 0,
        defaultSeriesType: "line",
        ignoreHiddenSeries: !0,
        spacing: [10, 10, 15, 10],
        resetZoomButton: {
          theme: { zIndex: 20 },
          position: { align: "right", x: -10, y: 10 },
        },
        width: null,
        height: null,
        borderColor: "#335cad",
        backgroundColor: "#ffffff",
        plotBorderColor: "#cccccc",
      },
      title: {
        text: "Chart title",
        align: "center",
        margin: 15,
        widthAdjust: -44,
      },
      subtitle: { text: "", align: "center", widthAdjust: -44 },
      plotOptions: {},
      labels: { style: { position: "absolute", color: "#333333" } },
      legend: {
        enabled: !0,
        align: "center",
        layout: "horizontal",
        labelFormatter: function () {
          return this.name;
        },
        borderColor: "#999999",
        borderRadius: 0,
        navigation: { activeColor: "#003399", inactiveColor: "#cccccc" },
        itemStyle: {
          color: "#333333",
          fontSize: "12px",
          fontWeight: "bold",
          textOverflow: "ellipsis",
        },
        itemHoverStyle: { color: "#000000" },
        itemHiddenStyle: { color: "#cccccc" },
        shadow: !1,
        itemCheckboxStyle: {
          position: "absolute",
          width: "13px",
          height: "13px",
        },
        squareSymbol: !0,
        symbolPadding: 5,
        verticalAlign: "bottom",
        x: 0,
        y: 0,
        title: { style: { fontWeight: "bold" } },
      },
      loading: {
        labelStyle: { fontWeight: "bold", position: "relative", top: "45%" },
        style: {
          position: "absolute",
          backgroundColor: "#ffffff",
          opacity: 0.5,
          textAlign: "center",
        },
      },
      tooltip: {
        enabled: !0,
        animation: a.svg,
        borderRadius: 3,
        dateTimeLabelFormats: {
          millisecond: "%A, %b %e, %H:%M:%S.%L",
          second: "%A, %b %e, %H:%M:%S",
          minute: "%A, %b %e, %H:%M",
          hour: "%A, %b %e, %H:%M",
          day: "%A, %b %e, %Y",
          week: "Week from %A, %b %e, %Y",
          month: "%B %Y",
          year: "%Y",
        },
        footerFormat: "",
        padding: 8,
        snap: a.isTouchDevice ? 25 : 10,
        backgroundColor: F("#f7f7f7").setOpacity(0.85).get(),
        borderWidth: 1,
        headerFormat:
          '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
        pointFormat:
          '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
        shadow: !0,
        style: {
          color: "#333333",
          cursor: "default",
          fontSize: "12px",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        },
      },
      credits: {
        enabled: !0,
        href: "http://www.highcharts.com",
        position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 },
        style: { cursor: "pointer", color: "#999999", fontSize: "9px" },
        text: "Highcharts.com",
      },
    };
    a.setOptions = function (r) {
      a.defaultOptions = h(!0, a.defaultOptions, r);
      B();
      return a.defaultOptions;
    };
    a.getOptions = function () {
      return a.defaultOptions;
    };
    a.defaultPlotOptions = a.defaultOptions.plotOptions;
    B();
  })(L);
  (function (a) {
    var E = a.correctFloat,
      B = a.defined,
      F = a.destroyObjectProperties,
      D = a.isNumber,
      n = a.merge,
      h = a.pick,
      u = a.deg2rad;
    a.Tick = function (a, h, n, m) {
      this.axis = a;
      this.pos = h;
      this.type = n || "";
      this.isNewLabel = this.isNew = !0;
      n || m || this.addLabel();
    };
    a.Tick.prototype = {
      addLabel: function () {
        var a = this.axis,
          x = a.options,
          t = a.chart,
          m = a.categories,
          f = a.names,
          g = this.pos,
          e = x.labels,
          d = a.tickPositions,
          p = g === d[0],
          b = g === d[d.length - 1],
          f = m ? h(m[g], f[g], g) : g,
          m = this.label,
          d = d.info,
          A;
        a.isDatetimeAxis &&
          d &&
          (A = x.dateTimeLabelFormats[d.higherRanks[g] || d.unitName]);
        this.isFirst = p;
        this.isLast = b;
        x = a.labelFormatter.call({
          axis: a,
          chart: t,
          isFirst: p,
          isLast: b,
          dateTimeLabelFormat: A,
          value: a.isLog ? E(a.lin2log(f)) : f,
        });
        B(m)
          ? m && m.attr({ text: x })
          : ((this.labelLength =
              (this.label = m =
                B(x) && e.enabled
                  ? t.renderer
                      .text(x, 0, 0, e.useHTML)
                      .css(n(e.style))
                      .add(a.labelGroup)
                  : null) && m.getBBox().width),
            (this.rotation = 0));
      },
      getLabelSize: function () {
        return this.label
          ? this.label.getBBox()[this.axis.horiz ? "height" : "width"]
          : 0;
      },
      handleOverflow: function (a) {
        var r = this.axis,
          n = a.x,
          m = r.chart.chartWidth,
          f = r.chart.spacing,
          g = h(r.labelLeft, Math.min(r.pos, f[3])),
          f = h(r.labelRight, Math.max(r.pos + r.len, m - f[1])),
          e = this.label,
          d = this.rotation,
          p = { left: 0, center: 0.5, right: 1 }[r.labelAlign],
          b = e.getBBox().width,
          A = r.getSlotWidth(),
          v = A,
          H = 1,
          q,
          J = {};
        if (d)
          0 > d && n - p * b < g
            ? (q = Math.round(n / Math.cos(d * u) - g))
            : 0 < d &&
              n + p * b > f &&
              (q = Math.round((m - n) / Math.cos(d * u)));
        else if (
          ((m = n + (1 - p) * b),
          n - p * b < g
            ? (v = a.x + v * (1 - p) - g)
            : m > f && ((v = f - a.x + v * p), (H = -1)),
          (v = Math.min(A, v)),
          v < A &&
            "center" === r.labelAlign &&
            (a.x += H * (A - v - p * (A - Math.min(b, v)))),
          b > v || (r.autoRotation && (e.styles || {}).width))
        )
          q = v;
        q &&
          ((J.width = q),
          (r.options.labels.style || {}).textOverflow ||
            (J.textOverflow = "ellipsis"),
          e.css(J));
      },
      getPosition: function (a, h, n, m) {
        var f = this.axis,
          g = f.chart,
          e = (m && g.oldChartHeight) || g.chartHeight;
        return {
          x: a
            ? f.translate(h + n, null, null, m) + f.transB
            : f.left +
              f.offset +
              (f.opposite
                ? ((m && g.oldChartWidth) || g.chartWidth) - f.right - f.left
                : 0),
          y: a
            ? e - f.bottom + f.offset - (f.opposite ? f.height : 0)
            : e - f.translate(h + n, null, null, m) - f.transB,
        };
      },
      getLabelPosition: function (a, h, n, m, f, g, e, d) {
        var p = this.axis,
          b = p.transA,
          A = p.reversed,
          v = p.staggerLines,
          H = p.tickRotCorr || { x: 0, y: 0 },
          q = f.y;
        B(q) ||
          (q =
            0 === p.side
              ? n.rotation
                ? -8
                : -n.getBBox().height
              : 2 === p.side
              ? H.y + 8
              : Math.cos(n.rotation * u) * (H.y - n.getBBox(!1, 0).height / 2));
        a = a + f.x + H.x - (g && m ? g * b * (A ? -1 : 1) : 0);
        h = h + q - (g && !m ? g * b * (A ? 1 : -1) : 0);
        v &&
          ((n = (e / (d || 1)) % v),
          p.opposite && (n = v - n - 1),
          (h += (p.labelOffset / v) * n));
        return { x: a, y: Math.round(h) };
      },
      getMarkPath: function (a, h, n, m, f, g) {
        return g.crispLine(
          ["M", a, h, "L", a + (f ? 0 : -n), h + (f ? n : 0)],
          m
        );
      },
      renderGridLine: function (a, h, n) {
        var m = this.axis,
          f = m.options,
          g = this.gridLine,
          e = {},
          d = this.pos,
          p = this.type,
          b = m.tickmarkOffset,
          A = m.chart.renderer,
          v = p ? p + "Grid" : "grid",
          H = f[v + "LineWidth"],
          q = f[v + "LineColor"],
          f = f[v + "LineDashStyle"];
        g ||
          ((e.stroke = q),
          (e["stroke-width"] = H),
          f && (e.dashstyle = f),
          p || (e.zIndex = 1),
          a && (e.opacity = 0),
          (this.gridLine = g =
            A.path()
              .attr(e)
              .addClass("highcharts-" + (p ? p + "-" : "") + "grid-line")
              .add(m.gridGroup)));
        if (
          !a &&
          g &&
          (a = m.getPlotLinePath(d + b, g.strokeWidth() * n, a, !0))
        )
          g[this.isNew ? "attr" : "animate"]({ d: a, opacity: h });
      },
      renderMark: function (a, n, t) {
        var m = this.axis,
          f = m.options,
          g = m.chart.renderer,
          e = this.type,
          d = e ? e + "Tick" : "tick",
          p = m.tickSize(d),
          b = this.mark,
          A = !b,
          v = a.x;
        a = a.y;
        var H = h(f[d + "Width"], !e && m.isXAxis ? 1 : 0),
          f = f[d + "Color"];
        p &&
          (m.opposite && (p[0] = -p[0]),
          A &&
            ((this.mark = b =
              g
                .path()
                .addClass("highcharts-" + (e ? e + "-" : "") + "tick")
                .add(m.axisGroup)),
            b.attr({ stroke: f, "stroke-width": H })),
          b[A ? "attr" : "animate"]({
            d: this.getMarkPath(v, a, p[0], b.strokeWidth() * t, m.horiz, g),
            opacity: n,
          }));
      },
      renderLabel: function (a, n, t, m) {
        var f = this.axis,
          g = f.horiz,
          e = f.options,
          d = this.label,
          p = e.labels,
          b = p.step,
          A = f.tickmarkOffset,
          v = !0,
          H = a.x;
        a = a.y;
        d &&
          D(H) &&
          ((d.xy = a = this.getLabelPosition(H, a, d, g, p, A, m, b)),
          (this.isFirst && !this.isLast && !h(e.showFirstLabel, 1)) ||
          (this.isLast && !this.isFirst && !h(e.showLastLabel, 1))
            ? (v = !1)
            : !g ||
              f.isRadial ||
              p.step ||
              p.rotation ||
              n ||
              0 === t ||
              this.handleOverflow(a),
          b && m % b && (v = !1),
          v && D(a.y)
            ? ((a.opacity = t),
              d[this.isNewLabel ? "attr" : "animate"](a),
              (this.isNewLabel = !1))
            : (d.attr("y", -9999), (this.isNewLabel = !0)),
          (this.isNew = !1));
      },
      render: function (a, n, t) {
        var m = this.axis,
          f = m.horiz,
          g = this.getPosition(f, this.pos, m.tickmarkOffset, n),
          e = g.x,
          d = g.y,
          m = (f && e === m.pos + m.len) || (!f && d === m.pos) ? -1 : 1;
        t = h(t, 1);
        this.isActive = !0;
        this.renderGridLine(n, t, m);
        this.renderMark(g, t, m);
        this.renderLabel(g, n, t, a);
      },
      destroy: function () {
        F(this, this.axis);
      },
    };
  })(L);
  var T = (function (a) {
    var E = a.addEvent,
      B = a.animObject,
      F = a.arrayMax,
      D = a.arrayMin,
      n = a.color,
      h = a.correctFloat,
      u = a.defaultOptions,
      r = a.defined,
      x = a.deg2rad,
      t = a.destroyObjectProperties,
      m = a.each,
      f = a.extend,
      g = a.fireEvent,
      e = a.format,
      d = a.getMagnitude,
      p = a.grep,
      b = a.inArray,
      A = a.isArray,
      v = a.isNumber,
      H = a.isString,
      q = a.merge,
      J = a.normalizeTickInterval,
      c = a.objectEach,
      w = a.pick,
      K = a.removeEvent,
      y = a.splat,
      G = a.syncTimeout,
      l = a.Tick,
      I = function () {
        this.init.apply(this, arguments);
      };
    a.extend(I.prototype, {
      defaultOptions: {
        dateTimeLabelFormats: {
          millisecond: "%H:%M:%S.%L",
          second: "%H:%M:%S",
          minute: "%H:%M",
          hour: "%H:%M",
          day: "%e. %b",
          week: "%e. %b",
          month: "%b '%y",
          year: "%Y",
        },
        endOnTick: !1,
        labels: {
          enabled: !0,
          style: { color: "#666666", cursor: "default", fontSize: "11px" },
          x: 0,
        },
        minPadding: 0.01,
        maxPadding: 0.01,
        minorTickLength: 2,
        minorTickPosition: "outside",
        startOfWeek: 1,
        startOnTick: !1,
        tickLength: 10,
        tickmarkPlacement: "between",
        tickPixelInterval: 100,
        tickPosition: "outside",
        title: { align: "middle", style: { color: "#666666" } },
        type: "linear",
        minorGridLineColor: "#f2f2f2",
        minorGridLineWidth: 1,
        minorTickColor: "#999999",
        lineColor: "#ccd6eb",
        lineWidth: 1,
        gridLineColor: "#e6e6e6",
        tickColor: "#ccd6eb",
      },
      defaultYAxisOptions: {
        endOnTick: !0,
        tickPixelInterval: 72,
        showLastLabel: !0,
        labels: { x: -8 },
        maxPadding: 0.05,
        minPadding: 0.05,
        startOnTick: !0,
        title: { rotation: 270, text: "Values" },
        stackLabels: {
          enabled: !1,
          formatter: function () {
            return a.numberFormat(this.total, -1);
          },
          style: {
            fontSize: "11px",
            fontWeight: "bold",
            color: "#000000",
            textOutline: "1px contrast",
          },
        },
        gridLineWidth: 1,
        lineWidth: 0,
      },
      defaultLeftAxisOptions: { labels: { x: -15 }, title: { rotation: 270 } },
      defaultRightAxisOptions: { labels: { x: 15 }, title: { rotation: 90 } },
      defaultBottomAxisOptions: {
        labels: { autoRotation: [-45], x: 0 },
        title: { rotation: 0 },
      },
      defaultTopAxisOptions: {
        labels: { autoRotation: [-45], x: 0 },
        title: { rotation: 0 },
      },
      init: function (a, z) {
        var k = z.isX,
          l = this;
        l.chart = a;
        l.horiz = a.inverted && !l.isZAxis ? !k : k;
        l.isXAxis = k;
        l.coll = l.coll || (k ? "xAxis" : "yAxis");
        l.opposite = z.opposite;
        l.side =
          z.side || (l.horiz ? (l.opposite ? 0 : 2) : l.opposite ? 1 : 3);
        l.setOptions(z);
        var d = this.options,
          e = d.type;
        l.labelFormatter = d.labels.formatter || l.defaultLabelFormatter;
        l.userOptions = z;
        l.minPixelPadding = 0;
        l.reversed = d.reversed;
        l.visible = !1 !== d.visible;
        l.zoomEnabled = !1 !== d.zoomEnabled;
        l.hasNames = "category" === e || !0 === d.categories;
        l.categories = d.categories || l.hasNames;
        l.names = l.names || [];
        l.plotLinesAndBandsGroups = {};
        l.isLog = "logarithmic" === e;
        l.isDatetimeAxis = "datetime" === e;
        l.positiveValuesOnly = l.isLog && !l.allowNegativeLog;
        l.isLinked = r(d.linkedTo);
        l.ticks = {};
        l.labelEdge = [];
        l.minorTicks = {};
        l.plotLinesAndBands = [];
        l.alternateBands = {};
        l.len = 0;
        l.minRange = l.userMinRange = d.minRange || d.maxZoom;
        l.range = d.range;
        l.offset = d.offset || 0;
        l.stacks = {};
        l.oldStacks = {};
        l.stacksTouched = 0;
        l.max = null;
        l.min = null;
        l.crosshair = w(
          d.crosshair,
          y(a.options.tooltip.crosshairs)[k ? 0 : 1],
          !1
        );
        z = l.options.events;
        -1 === b(l, a.axes) &&
          (k ? a.axes.splice(a.xAxis.length, 0, l) : a.axes.push(l),
          a[l.coll].push(l));
        l.series = l.series || [];
        a.inverted &&
          !l.isZAxis &&
          k &&
          void 0 === l.reversed &&
          (l.reversed = !0);
        c(z, function (a, k) {
          E(l, k, a);
        });
        l.lin2log = d.linearToLogConverter || l.lin2log;
        l.isLog && ((l.val2lin = l.log2lin), (l.lin2val = l.lin2log));
      },
      setOptions: function (a) {
        this.options = q(
          this.defaultOptions,
          "yAxis" === this.coll && this.defaultYAxisOptions,
          [
            this.defaultTopAxisOptions,
            this.defaultRightAxisOptions,
            this.defaultBottomAxisOptions,
            this.defaultLeftAxisOptions,
          ][this.side],
          q(u[this.coll], a)
        );
      },
      defaultLabelFormatter: function () {
        var k = this.axis,
          c = this.value,
          b = k.categories,
          l = this.dateTimeLabelFormat,
          d = u.lang,
          f = d.numericSymbols,
          d = d.numericSymbolMagnitude || 1e3,
          y = f && f.length,
          p,
          g = k.options.labels.format,
          k = k.isLog ? Math.abs(c) : k.tickInterval;
        if (g) p = e(g, this);
        else if (b) p = c;
        else if (l) p = a.dateFormat(l, c);
        else if (y && 1e3 <= k)
          for (; y-- && void 0 === p; )
            (b = Math.pow(d, y + 1)),
              k >= b &&
                0 === (10 * c) % b &&
                null !== f[y] &&
                0 !== c &&
                (p = a.numberFormat(c / b, -1) + f[y]);
        void 0 === p &&
          (p =
            1e4 <= Math.abs(c)
              ? a.numberFormat(c, -1)
              : a.numberFormat(c, -1, void 0, ""));
        return p;
      },
      getSeriesExtremes: function () {
        var a = this,
          c = a.chart;
        a.hasVisibleSeries = !1;
        a.dataMin = a.dataMax = a.threshold = null;
        a.softThreshold = !a.isXAxis;
        a.buildStacks && a.buildStacks();
        m(a.series, function (k) {
          if (k.visible || !c.options.chart.ignoreHiddenSeries) {
            var b = k.options,
              l = b.threshold,
              z;
            a.hasVisibleSeries = !0;
            a.positiveValuesOnly && 0 >= l && (l = null);
            if (a.isXAxis)
              (b = k.xData),
                b.length &&
                  ((k = D(b)),
                  v(k) ||
                    k instanceof Date ||
                    ((b = p(b, function (a) {
                      return v(a);
                    })),
                    (k = D(b))),
                  (a.dataMin = Math.min(w(a.dataMin, b[0]), k)),
                  (a.dataMax = Math.max(w(a.dataMax, b[0]), F(b))));
            else if (
              (k.getExtremes(),
              (z = k.dataMax),
              (k = k.dataMin),
              r(k) &&
                r(z) &&
                ((a.dataMin = Math.min(w(a.dataMin, k), k)),
                (a.dataMax = Math.max(w(a.dataMax, z), z))),
              r(l) && (a.threshold = l),
              !b.softThreshold || a.positiveValuesOnly)
            )
              a.softThreshold = !1;
          }
        });
      },
      translate: function (a, c, b, l, d, e) {
        var k = this.linkedParent || this,
          z = 1,
          f = 0,
          y = l ? k.oldTransA : k.transA;
        l = l ? k.oldMin : k.min;
        var p = k.minPixelPadding;
        d = (k.isOrdinal || k.isBroken || (k.isLog && d)) && k.lin2val;
        y || (y = k.transA);
        b && ((z *= -1), (f = k.len));
        k.reversed && ((z *= -1), (f -= z * (k.sector || k.len)));
        c
          ? ((a = (a * z + f - p) / y + l), d && (a = k.lin2val(a)))
          : (d && (a = k.val2lin(a)),
            (a = z * (a - l) * y + f + z * p + (v(e) ? y * e : 0)));
        return a;
      },
      toPixels: function (a, c) {
        return (
          this.translate(a, !1, !this.horiz, null, !0) + (c ? 0 : this.pos)
        );
      },
      toValue: function (a, c) {
        return this.translate(
          a - (c ? 0 : this.pos),
          !0,
          !this.horiz,
          null,
          !0
        );
      },
      getPlotLinePath: function (a, c, b, l, d) {
        var k = this.chart,
          z = this.left,
          e = this.top,
          f,
          y,
          p = (b && k.oldChartHeight) || k.chartHeight,
          g = (b && k.oldChartWidth) || k.chartWidth,
          q;
        f = this.transB;
        var G = function (a, k, c) {
          if (a < k || a > c) l ? (a = Math.min(Math.max(k, a), c)) : (q = !0);
          return a;
        };
        d = w(d, this.translate(a, null, null, b));
        a = b = Math.round(d + f);
        f = y = Math.round(p - d - f);
        v(d)
          ? this.horiz
            ? ((f = e),
              (y = p - this.bottom),
              (a = b = G(a, z, z + this.width)))
            : ((a = z),
              (b = g - this.right),
              (f = y = G(f, e, e + this.height)))
          : (q = !0);
        return q && !l
          ? null
          : k.renderer.crispLine(["M", a, f, "L", b, y], c || 1);
      },
      getLinearTickPositions: function (a, c, b) {
        var k,
          l = h(Math.floor(c / a) * a);
        b = h(Math.ceil(b / a) * a);
        var z = [];
        if (this.single) return [c];
        for (c = l; c <= b; ) {
          z.push(c);
          c = h(c + a);
          if (c === k) break;
          k = c;
        }
        return z;
      },
      getMinorTickPositions: function () {
        var a = this,
          c = a.options,
          b = a.tickPositions,
          l = a.minorTickInterval,
          d = [],
          e = a.pointRangePadding || 0,
          f = a.min - e,
          e = a.max + e,
          y = e - f;
        if (y && y / l < a.len / 3)
          if (a.isLog)
            m(this.paddedTicks, function (k, c, b) {
              c &&
                d.push.apply(d, a.getLogTickPositions(l, b[c - 1], b[c], !0));
            });
          else if (a.isDatetimeAxis && "auto" === c.minorTickInterval)
            d = d.concat(
              a.getTimeTicks(
                a.normalizeTimeTickInterval(l),
                f,
                e,
                c.startOfWeek
              )
            );
          else
            for (c = f + ((b[0] - f) % l); c <= e && c !== d[0]; c += l)
              d.push(c);
        0 !== d.length && a.trimTicks(d);
        return d;
      },
      adjustForMinRange: function () {
        var a = this.options,
          c = this.min,
          b = this.max,
          l,
          d,
          e,
          f,
          y,
          p,
          g,
          v;
        this.isXAxis &&
          void 0 === this.minRange &&
          !this.isLog &&
          (r(a.min) || r(a.max)
            ? (this.minRange = null)
            : (m(this.series, function (a) {
                p = a.xData;
                for (f = g = a.xIncrement ? 1 : p.length - 1; 0 < f; f--)
                  if (((y = p[f] - p[f - 1]), void 0 === e || y < e)) e = y;
              }),
              (this.minRange = Math.min(5 * e, this.dataMax - this.dataMin))));
        b - c < this.minRange &&
          ((d = this.dataMax - this.dataMin >= this.minRange),
          (v = this.minRange),
          (l = (v - b + c) / 2),
          (l = [c - l, w(a.min, c - l)]),
          d && (l[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin),
          (c = F(l)),
          (b = [c + v, w(a.max, c + v)]),
          d && (b[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax),
          (b = D(b)),
          b - c < v && ((l[0] = b - v), (l[1] = w(a.min, b - v)), (c = F(l))));
        this.min = c;
        this.max = b;
      },
      getClosest: function () {
        var a;
        this.categories
          ? (a = 1)
          : m(this.series, function (k) {
              var c = k.closestPointRange,
                b = k.visible || !k.chart.options.chart.ignoreHiddenSeries;
              !k.noSharedTooltip &&
                r(c) &&
                b &&
                (a = r(a) ? Math.min(a, c) : c);
            });
        return a;
      },
      nameToX: function (a) {
        var k = A(this.categories),
          c = k ? this.categories : this.names,
          l = a.options.x,
          d;
        a.series.requireSorting = !1;
        r(l) ||
          (l =
            !1 === this.options.uniqueNames
              ? a.series.autoIncrement()
              : b(a.name, c));
        -1 === l ? k || (d = c.length) : (d = l);
        void 0 !== d && (this.names[d] = a.name);
        return d;
      },
      updateNames: function () {
        var a = this;
        0 < this.names.length &&
          ((this.names.length = 0),
          (this.minRange = this.userMinRange),
          m(this.series || [], function (k) {
            k.xIncrement = null;
            if (!k.points || k.isDirtyData) k.processData(), k.generatePoints();
            m(k.points, function (c, b) {
              var l;
              c.options &&
                ((l = a.nameToX(c)),
                void 0 !== l && l !== c.x && ((c.x = l), (k.xData[b] = l)));
            });
          }));
      },
      setAxisTranslation: function (a) {
        var k = this,
          c = k.max - k.min,
          b = k.axisPointRange || 0,
          l,
          d = 0,
          e = 0,
          f = k.linkedParent,
          y = !!k.categories,
          p = k.transA,
          g = k.isXAxis;
        if (g || y || b)
          (l = k.getClosest()),
            f
              ? ((d = f.minPointOffset), (e = f.pointRangePadding))
              : m(k.series, function (a) {
                  var c = y
                    ? 1
                    : g
                    ? w(a.options.pointRange, l, 0)
                    : k.axisPointRange || 0;
                  a = a.options.pointPlacement;
                  b = Math.max(b, c);
                  k.single ||
                    ((d = Math.max(d, H(a) ? 0 : c / 2)),
                    (e = Math.max(e, "on" === a ? 0 : c)));
                }),
            (f = k.ordinalSlope && l ? k.ordinalSlope / l : 1),
            (k.minPointOffset = d *= f),
            (k.pointRangePadding = e *= f),
            (k.pointRange = Math.min(b, c)),
            g && (k.closestPointRange = l);
        a && (k.oldTransA = p);
        k.translationSlope =
          k.transA =
          p =
            k.options.staticScale || k.len / (c + e || 1);
        k.transB = k.horiz ? k.left : k.bottom;
        k.minPixelPadding = p * d;
      },
      minFromRange: function () {
        return this.max - this.range;
      },
      setTickInterval: function (k) {
        var c = this,
          b = c.chart,
          l = c.options,
          e = c.isLog,
          f = c.log2lin,
          y = c.isDatetimeAxis,
          p = c.isXAxis,
          q = c.isLinked,
          G = l.maxPadding,
          I = l.minPadding,
          A = l.tickInterval,
          H = l.tickPixelInterval,
          n = c.categories,
          K = c.threshold,
          t = c.softThreshold,
          u,
          x,
          B,
          D;
        y || n || q || this.getTickAmount();
        B = w(c.userMin, l.min);
        D = w(c.userMax, l.max);
        q
          ? ((c.linkedParent = b[c.coll][l.linkedTo]),
            (b = c.linkedParent.getExtremes()),
            (c.min = w(b.min, b.dataMin)),
            (c.max = w(b.max, b.dataMax)),
            l.type !== c.linkedParent.options.type && a.error(11, 1))
          : (!t &&
              r(K) &&
              (c.dataMin >= K
                ? ((u = K), (I = 0))
                : c.dataMax <= K && ((x = K), (G = 0))),
            (c.min = w(B, u, c.dataMin)),
            (c.max = w(D, x, c.dataMax)));
        e &&
          (c.positiveValuesOnly &&
            !k &&
            0 >= Math.min(c.min, w(c.dataMin, c.min)) &&
            a.error(10, 1),
          (c.min = h(f(c.min), 15)),
          (c.max = h(f(c.max), 15)));
        c.range &&
          r(c.max) &&
          ((c.userMin = c.min = B = Math.max(c.min, c.minFromRange())),
          (c.userMax = D = c.max),
          (c.range = null));
        g(c, "foundExtremes");
        c.beforePadding && c.beforePadding();
        c.adjustForMinRange();
        !(n || c.axisPointRange || c.usePercentage || q) &&
          r(c.min) &&
          r(c.max) &&
          (f = c.max - c.min) &&
          (!r(B) && I && (c.min -= f * I), !r(D) && G && (c.max += f * G));
        v(l.softMin) && (c.min = Math.min(c.min, l.softMin));
        v(l.softMax) && (c.max = Math.max(c.max, l.softMax));
        v(l.floor) && (c.min = Math.max(c.min, l.floor));
        v(l.ceiling) && (c.max = Math.min(c.max, l.ceiling));
        t &&
          r(c.dataMin) &&
          ((K = K || 0),
          !r(B) && c.min < K && c.dataMin >= K
            ? (c.min = K)
            : !r(D) && c.max > K && c.dataMax <= K && (c.max = K));
        c.tickInterval =
          c.min === c.max || void 0 === c.min || void 0 === c.max
            ? 1
            : q && !A && H === c.linkedParent.options.tickPixelInterval
            ? (A = c.linkedParent.tickInterval)
            : w(
                A,
                this.tickAmount
                  ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1)
                  : void 0,
                n ? 1 : ((c.max - c.min) * H) / Math.max(c.len, H)
              );
        p &&
          !k &&
          m(c.series, function (a) {
            a.processData(c.min !== c.oldMin || c.max !== c.oldMax);
          });
        c.setAxisTranslation(!0);
        c.beforeSetTickPositions && c.beforeSetTickPositions();
        c.postProcessTickInterval &&
          (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
        c.pointRange &&
          !A &&
          (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
        k = w(l.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
        !A && c.tickInterval < k && (c.tickInterval = k);
        y ||
          e ||
          A ||
          (c.tickInterval = J(
            c.tickInterval,
            null,
            d(c.tickInterval),
            w(
              l.allowDecimals,
              !(
                0.5 < c.tickInterval &&
                5 > c.tickInterval &&
                1e3 < c.max &&
                9999 > c.max
              )
            ),
            !!this.tickAmount
          ));
        this.tickAmount || (c.tickInterval = c.unsquish());
        this.setTickPositions();
      },
      setTickPositions: function () {
        var a = this.options,
          c,
          b = a.tickPositions,
          l = a.tickPositioner,
          d = a.startOnTick,
          e = a.endOnTick;
        this.tickmarkOffset =
          this.categories &&
          "between" === a.tickmarkPlacement &&
          1 === this.tickInterval
            ? 0.5
            : 0;
        this.minorTickInterval =
          "auto" === a.minorTickInterval && this.tickInterval
            ? this.tickInterval / 5
            : a.minorTickInterval;
        this.single =
          this.min === this.max &&
          r(this.min) &&
          !this.tickAmount &&
          (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
        this.tickPositions = c = b && b.slice();
        !c &&
          ((c = this.isDatetimeAxis
            ? this.getTimeTicks(
                this.normalizeTimeTickInterval(this.tickInterval, a.units),
                this.min,
                this.max,
                a.startOfWeek,
                this.ordinalPositions,
                this.closestPointRange,
                !0
              )
            : this.isLog
            ? this.getLogTickPositions(this.tickInterval, this.min, this.max)
            : this.getLinearTickPositions(
                this.tickInterval,
                this.min,
                this.max
              )),
          c.length > this.len && (c = [c[0], c.pop()]),
          (this.tickPositions = c),
          l && (l = l.apply(this, [this.min, this.max]))) &&
          (this.tickPositions = c = l);
        this.paddedTicks = c.slice(0);
        this.trimTicks(c, d, e);
        this.isLinked ||
          (this.single && ((this.min -= 0.5), (this.max += 0.5)),
          b || l || this.adjustTickAmount());
      },
      trimTicks: function (a, c, b) {
        var k = a[0],
          l = a[a.length - 1],
          d = this.minPointOffset || 0;
        if (!this.isLinked) {
          if (c && -Infinity !== k) this.min = k;
          else for (; this.min - d > a[0]; ) a.shift();
          if (b) this.max = l;
          else for (; this.max + d < a[a.length - 1]; ) a.pop();
          0 === a.length && r(k) && a.push((l + k) / 2);
        }
      },
      alignToOthers: function () {
        var a = {},
          c,
          b = this.options;
        !1 === this.chart.options.chart.alignTicks ||
          !1 === b.alignTicks ||
          this.isLog ||
          m(this.chart[this.coll], function (k) {
            var b = k.options,
              b = [k.horiz ? b.left : b.top, b.width, b.height, b.pane].join();
            k.series.length && (a[b] ? (c = !0) : (a[b] = 1));
          });
        return c;
      },
      getTickAmount: function () {
        var a = this.options,
          c = a.tickAmount,
          b = a.tickPixelInterval;
        !r(a.tickInterval) &&
          this.len < b &&
          !this.isRadial &&
          !this.isLog &&
          a.startOnTick &&
          a.endOnTick &&
          (c = 2);
        !c && this.alignToOthers() && (c = Math.ceil(this.len / b) + 1);
        4 > c && ((this.finalTickAmt = c), (c = 5));
        this.tickAmount = c;
      },
      adjustTickAmount: function () {
        var a = this.tickInterval,
          c = this.tickPositions,
          b = this.tickAmount,
          l = this.finalTickAmt,
          d = c && c.length;
        if (d < b) {
          for (; c.length < b; ) c.push(h(c[c.length - 1] + a));
          this.transA *= (d - 1) / (b - 1);
          this.max = c[c.length - 1];
        } else d > b && ((this.tickInterval *= 2), this.setTickPositions());
        if (r(l)) {
          for (a = b = c.length; a--; )
            ((3 === l && 1 === a % 2) || (2 >= l && 0 < a && a < b - 1)) &&
              c.splice(a, 1);
          this.finalTickAmt = void 0;
        }
      },
      setScale: function () {
        var a, c;
        this.oldMin = this.min;
        this.oldMax = this.max;
        this.oldAxisLength = this.len;
        this.setAxisSize();
        c = this.len !== this.oldAxisLength;
        m(this.series, function (c) {
          if (c.isDirtyData || c.isDirty || c.xAxis.isDirty) a = !0;
        });
        c ||
        a ||
        this.isLinked ||
        this.forceRedraw ||
        this.userMin !== this.oldUserMin ||
        this.userMax !== this.oldUserMax ||
        this.alignToOthers()
          ? (this.resetStacks && this.resetStacks(),
            (this.forceRedraw = !1),
            this.getSeriesExtremes(),
            this.setTickInterval(),
            (this.oldUserMin = this.userMin),
            (this.oldUserMax = this.userMax),
            this.isDirty ||
              (this.isDirty =
                c || this.min !== this.oldMin || this.max !== this.oldMax))
          : this.cleanStacks && this.cleanStacks();
      },
      setExtremes: function (a, c, b, l, d) {
        var k = this,
          e = k.chart;
        b = w(b, !0);
        m(k.series, function (a) {
          delete a.kdTree;
        });
        d = f(d, { min: a, max: c });
        g(k, "setExtremes", d, function () {
          k.userMin = a;
          k.userMax = c;
          k.eventArgs = d;
          b && e.redraw(l);
        });
      },
      zoom: function (a, c) {
        var k = this.dataMin,
          b = this.dataMax,
          l = this.options,
          d = Math.min(k, w(l.min, k)),
          l = Math.max(b, w(l.max, b));
        if (a !== this.min || c !== this.max)
          this.allowZoomOutside ||
            (r(k) && (a < d && (a = d), a > l && (a = l)),
            r(b) && (c < d && (c = d), c > l && (c = l))),
            (this.displayBtn = void 0 !== a || void 0 !== c),
            this.setExtremes(a, c, !1, void 0, { trigger: "zoom" });
        return !0;
      },
      setAxisSize: function () {
        var a = this.chart,
          c = this.options,
          b = c.offsets || [0, 0, 0, 0],
          l = this.horiz,
          d = w(c.width, a.plotWidth - b[3] + b[1]),
          e = w(c.height, a.plotHeight - b[0] + b[2]),
          f = w(c.top, a.plotTop + b[0]),
          c = w(c.left, a.plotLeft + b[3]),
          b = /%$/;
        b.test(e) && (e = Math.round((parseFloat(e) / 100) * a.plotHeight));
        b.test(f) &&
          (f = Math.round((parseFloat(f) / 100) * a.plotHeight + a.plotTop));
        this.left = c;
        this.top = f;
        this.width = d;
        this.height = e;
        this.bottom = a.chartHeight - e - f;
        this.right = a.chartWidth - d - c;
        this.len = Math.max(l ? d : e, 0);
        this.pos = l ? c : f;
      },
      getExtremes: function () {
        var a = this.isLog,
          c = this.lin2log;
        return {
          min: a ? h(c(this.min)) : this.min,
          max: a ? h(c(this.max)) : this.max,
          dataMin: this.dataMin,
          dataMax: this.dataMax,
          userMin: this.userMin,
          userMax: this.userMax,
        };
      },
      getThreshold: function (a) {
        var c = this.isLog,
          k = this.lin2log,
          b = c ? k(this.min) : this.min,
          c = c ? k(this.max) : this.max;
        null === a ? (a = b) : b > a ? (a = b) : c < a && (a = c);
        return this.translate(a, 0, 1, 0, 1);
      },
      autoLabelAlign: function (a) {
        a = (w(a, 0) - 90 * this.side + 720) % 360;
        return 15 < a && 165 > a
          ? "right"
          : 195 < a && 345 > a
          ? "left"
          : "center";
      },
      tickSize: function (a) {
        var c = this.options,
          k = c[a + "Length"],
          b = w(c[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
        if (b && k) return "inside" === c[a + "Position"] && (k = -k), [k, b];
      },
      labelMetrics: function () {
        var a = (this.tickPositions && this.tickPositions[0]) || 0;
        return this.chart.renderer.fontMetrics(
          this.options.labels.style && this.options.labels.style.fontSize,
          this.ticks[a] && this.ticks[a].label
        );
      },
      unsquish: function () {
        var a = this.options.labels,
          c = this.horiz,
          b = this.tickInterval,
          l = b,
          d =
            this.len / (((this.categories ? 1 : 0) + this.max - this.min) / b),
          e,
          f = a.rotation,
          y = this.labelMetrics(),
          p,
          g = Number.MAX_VALUE,
          v,
          q = function (a) {
            a /= d || 1;
            a = 1 < a ? Math.ceil(a) : 1;
            return a * b;
          };
        c
          ? (v =
              !a.staggerLines &&
              !a.step &&
              (r(f)
                ? [f]
                : d < w(a.autoRotationLimit, 80) && a.autoRotation)) &&
            m(v, function (a) {
              var c;
              if (a === f || (a && -90 <= a && 90 >= a))
                (p = q(Math.abs(y.h / Math.sin(x * a)))),
                  (c = p + Math.abs(a / 360)),
                  c < g && ((g = c), (e = a), (l = p));
            })
          : a.step || (l = q(y.h));
        this.autoRotation = v;
        this.labelRotation = w(e, f);
        return l;
      },
      getSlotWidth: function () {
        var a = this.chart,
          c = this.horiz,
          b = this.options.labels,
          l = Math.max(
            this.tickPositions.length - (this.categories ? 0 : 1),
            1
          ),
          d = a.margin[3];
        return (
          (c &&
            2 > (b.step || 0) &&
            !b.rotation &&
            ((this.staggerLines || 1) * this.len) / l) ||
          (!c && ((d && d - a.spacing[3]) || 0.33 * a.chartWidth))
        );
      },
      renderUnsquish: function () {
        var a = this.chart,
          c = a.renderer,
          b = this.tickPositions,
          l = this.ticks,
          d = this.options.labels,
          e = this.horiz,
          f = this.getSlotWidth(),
          y = Math.max(1, Math.round(f - 2 * (d.padding || 5))),
          p = {},
          g = this.labelMetrics(),
          v = d.style && d.style.textOverflow,
          G,
          w = 0,
          I,
          A;
        H(d.rotation) || (p.rotation = d.rotation || 0);
        m(b, function (a) {
          (a = l[a]) && a.labelLength > w && (w = a.labelLength);
        });
        this.maxLabelLength = w;
        if (this.autoRotation)
          w > y && w > g.h
            ? (p.rotation = this.labelRotation)
            : (this.labelRotation = 0);
        else if (f && ((G = { width: y + "px" }), !v))
          for (G.textOverflow = "clip", I = b.length; !e && I--; )
            if (((A = b[I]), (y = l[A].label)))
              y.styles && "ellipsis" === y.styles.textOverflow
                ? y.css({ textOverflow: "clip" })
                : l[A].labelLength > f && y.css({ width: f + "px" }),
                y.getBBox().height > this.len / b.length - (g.h - g.f) &&
                  (y.specCss = { textOverflow: "ellipsis" });
        p.rotation &&
          ((G = {
            width:
              (w > 0.5 * a.chartHeight ? 0.33 * a.chartHeight : a.chartHeight) +
              "px",
          }),
          v || (G.textOverflow = "ellipsis"));
        if (
          (this.labelAlign = d.align || this.autoLabelAlign(this.labelRotation))
        )
          p.align = this.labelAlign;
        m(b, function (a) {
          var c = (a = l[a]) && a.label;
          c &&
            (c.attr(p),
            G && c.css(q(G, c.specCss)),
            delete c.specCss,
            (a.rotation = p.rotation));
        });
        this.tickRotCorr = c.rotCorr(
          g.b,
          this.labelRotation || 0,
          0 !== this.side
        );
      },
      hasData: function () {
        return (
          this.hasVisibleSeries ||
          (r(this.min) && r(this.max) && !!this.tickPositions)
        );
      },
      addTitle: function (a) {
        var c = this.chart.renderer,
          k = this.horiz,
          b = this.opposite,
          l = this.options.title,
          d;
        this.axisTitle ||
          ((d = l.textAlign) ||
            (d = (
              k
                ? { low: "left", middle: "center", high: "right" }
                : {
                    low: b ? "right" : "left",
                    middle: "center",
                    high: b ? "left" : "right",
                  }
            )[l.align]),
          (this.axisTitle = c
            .text(l.text, 0, 0, l.useHTML)
            .attr({ zIndex: 7, rotation: l.rotation || 0, align: d })
            .addClass("highcharts-axis-title")
            .css(l.style)
            .add(this.axisGroup)),
          (this.axisTitle.isNew = !0));
        this.axisTitle[a ? "show" : "hide"](!0);
      },
      generateTick: function (a) {
        var c = this.ticks;
        c[a] ? c[a].addLabel() : (c[a] = new l(this, a));
      },
      getOffset: function () {
        var a = this,
          b = a.chart,
          l = b.renderer,
          d = a.options,
          e = a.tickPositions,
          f = a.ticks,
          y = a.horiz,
          p = a.side,
          g = b.inverted && !a.isZAxis ? [1, 0, 3, 2][p] : p,
          v,
          q,
          G = 0,
          I,
          A = 0,
          h = d.title,
          H = d.labels,
          n = 0,
          K = b.axisOffset,
          b = b.clipOffset,
          J = [-1, 1, 1, -1][p],
          t = d.className,
          u = a.axisParent,
          x = this.tickSize("tick");
        v = a.hasData();
        a.showAxis = q = v || w(d.showEmpty, !0);
        a.staggerLines = a.horiz && H.staggerLines;
        a.axisGroup ||
          ((a.gridGroup = l
            .g("grid")
            .attr({ zIndex: d.gridZIndex || 1 })
            .addClass(
              "highcharts-" + this.coll.toLowerCase() + "-grid " + (t || "")
            )
            .add(u)),
          (a.axisGroup = l
            .g("axis")
            .attr({ zIndex: d.zIndex || 2 })
            .addClass("highcharts-" + this.coll.toLowerCase() + " " + (t || ""))
            .add(u)),
          (a.labelGroup = l
            .g("axis-labels")
            .attr({ zIndex: H.zIndex || 7 })
            .addClass(
              "highcharts-" + a.coll.toLowerCase() + "-labels " + (t || "")
            )
            .add(u)));
        v || a.isLinked
          ? (m(e, function (c, b) {
              a.generateTick(c, b);
            }),
            a.renderUnsquish(),
            !1 === H.reserveSpace ||
              (0 !== p &&
                2 !== p &&
                { 1: "left", 3: "right" }[p] !== a.labelAlign &&
                "center" !== a.labelAlign) ||
              m(e, function (a) {
                n = Math.max(f[a].getLabelSize(), n);
              }),
            a.staggerLines &&
              ((n *= a.staggerLines),
              (a.labelOffset = n * (a.opposite ? -1 : 1))))
          : c(f, function (a, c) {
              a.destroy();
              delete f[c];
            });
        h &&
          h.text &&
          !1 !== h.enabled &&
          (a.addTitle(q),
          q &&
            !1 !== h.reserveSpace &&
            ((a.titleOffset = G =
              a.axisTitle.getBBox()[y ? "height" : "width"]),
            (I = h.offset),
            (A = r(I) ? 0 : w(h.margin, y ? 5 : 10))));
        a.renderLine();
        a.offset = J * w(d.offset, K[p]);
        a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };
        l = 0 === p ? -a.labelMetrics().h : 2 === p ? a.tickRotCorr.y : 0;
        A = Math.abs(n) + A;
        n && (A = A - l + J * (y ? w(H.y, a.tickRotCorr.y + 8 * J) : H.x));
        a.axisTitleMargin = w(I, A);
        K[p] = Math.max(
          K[p],
          a.axisTitleMargin + G + J * a.offset,
          A,
          v && e.length && x ? x[0] + J * a.offset : 0
        );
        e = 2 * Math.floor(a.axisLine.strokeWidth() / 2);
        0 < d.offset && (e -= 2 * d.offset);
        b[g] = Math.max(b[g] || e, e);
      },
      getLinePath: function (a) {
        var c = this.chart,
          b = this.opposite,
          k = this.offset,
          l = this.horiz,
          d = this.left + (b ? this.width : 0) + k,
          k = c.chartHeight - this.bottom - (b ? this.height : 0) + k;
        b && (a *= -1);
        return c.renderer.crispLine(
          [
            "M",
            l ? this.left : d,
            l ? k : this.top,
            "L",
            l ? c.chartWidth - this.right : d,
            l ? k : c.chartHeight - this.bottom,
          ],
          a
        );
      },
      renderLine: function () {
        this.axisLine ||
          ((this.axisLine = this.chart.renderer
            .path()
            .addClass("highcharts-axis-line")
            .add(this.axisGroup)),
          this.axisLine.attr({
            stroke: this.options.lineColor,
            "stroke-width": this.options.lineWidth,
            zIndex: 7,
          }));
      },
      getTitlePosition: function () {
        var a = this.horiz,
          c = this.left,
          b = this.top,
          l = this.len,
          d = this.options.title,
          e = a ? c : b,
          f = this.opposite,
          y = this.offset,
          p = d.x || 0,
          g = d.y || 0,
          v = this.chart.renderer.fontMetrics(
            d.style && d.style.fontSize,
            this.axisTitle
          ).f,
          l = {
            low: e + (a ? 0 : l),
            middle: e + l / 2,
            high: e + (a ? l : 0),
          }[d.align],
          c =
            (a ? b + this.height : c) +
            (a ? 1 : -1) * (f ? -1 : 1) * this.axisTitleMargin +
            (2 === this.side ? v : 0);
        return {
          x: a ? l + p : c + (f ? this.width : 0) + y + p,
          y: a ? c + g - (f ? this.height : 0) + y : l + g,
        };
      },
      renderMinorTick: function (a) {
        var c = this.chart.hasRendered && v(this.oldMin),
          b = this.minorTicks;
        b[a] || (b[a] = new l(this, a, "minor"));
        c && b[a].isNew && b[a].render(null, !0);
        b[a].render(null, !1, 1);
      },
      renderTick: function (a, c) {
        var b = this.isLinked,
          k = this.ticks,
          d = this.chart.hasRendered && v(this.oldMin);
        if (!b || (a >= this.min && a <= this.max))
          k[a] || (k[a] = new l(this, a)),
            d && k[a].isNew && k[a].render(c, !0, 0.1),
            k[a].render(c);
      },
      render: function () {
        var b = this,
          d = b.chart,
          e = b.options,
          f = b.isLog,
          y = b.lin2log,
          p = b.isLinked,
          g = b.tickPositions,
          q = b.axisTitle,
          w = b.ticks,
          I = b.minorTicks,
          A = b.alternateBands,
          h = e.stackLabels,
          H = e.alternateGridColor,
          n = b.tickmarkOffset,
          K = b.axisLine,
          J = b.showAxis,
          r = B(d.renderer.globalAnimation),
          t,
          u;
        b.labelEdge.length = 0;
        b.overlap = !1;
        m([w, I, A], function (a) {
          c(a, function (a) {
            a.isActive = !1;
          });
        });
        if (b.hasData() || p)
          b.minorTickInterval &&
            !b.categories &&
            m(b.getMinorTickPositions(), function (a) {
              b.renderMinorTick(a);
            }),
            g.length &&
              (m(g, function (a, c) {
                b.renderTick(a, c);
              }),
              n &&
                (0 === b.min || b.single) &&
                (w[-1] || (w[-1] = new l(b, -1, null, !0)), w[-1].render(-1))),
            H &&
              m(g, function (c, l) {
                u = void 0 !== g[l + 1] ? g[l + 1] + n : b.max - n;
                0 === l % 2 &&
                  c < b.max &&
                  u <= b.max + (d.polar ? -n : n) &&
                  (A[c] || (A[c] = new a.PlotLineOrBand(b)),
                  (t = c + n),
                  (A[c].options = {
                    from: f ? y(t) : t,
                    to: f ? y(u) : u,
                    color: H,
                  }),
                  A[c].render(),
                  (A[c].isActive = !0));
              }),
            b._addedPlotLB ||
              (m((e.plotLines || []).concat(e.plotBands || []), function (a) {
                b.addPlotBandOrLine(a);
              }),
              (b._addedPlotLB = !0));
        m([w, I, A], function (a) {
          var b,
            l = [],
            k = r.duration;
          c(a, function (a, c) {
            a.isActive || (a.render(c, !1, 0), (a.isActive = !1), l.push(c));
          });
          G(
            function () {
              for (b = l.length; b--; )
                a[l[b]] &&
                  !a[l[b]].isActive &&
                  (a[l[b]].destroy(), delete a[l[b]]);
            },
            a !== A && d.hasRendered && k ? k : 0
          );
        });
        K &&
          (K[K.isPlaced ? "animate" : "attr"]({
            d: this.getLinePath(K.strokeWidth()),
          }),
          (K.isPlaced = !0),
          K[J ? "show" : "hide"](!0));
        q &&
          J &&
          ((e = b.getTitlePosition()),
          v(e.y)
            ? (q[q.isNew ? "attr" : "animate"](e), (q.isNew = !1))
            : (q.attr("y", -9999), (q.isNew = !0)));
        h && h.enabled && b.renderStackTotals();
        b.isDirty = !1;
      },
      redraw: function () {
        this.visible &&
          (this.render(),
          m(this.plotLinesAndBands, function (a) {
            a.render();
          }));
        m(this.series, function (a) {
          a.isDirty = !0;
        });
      },
      keepProps: "extKey hcEvents names series userMax userMin".split(" "),
      destroy: function (a) {
        var l = this,
          k = l.stacks,
          d = l.plotLinesAndBands,
          e;
        a || K(l);
        c(k, function (a, c) {
          t(a);
          k[c] = null;
        });
        m([l.ticks, l.minorTicks, l.alternateBands], function (a) {
          t(a);
        });
        if (d) for (a = d.length; a--; ) d[a].destroy();
        m(
          "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(
            " "
          ),
          function (a) {
            l[a] && (l[a] = l[a].destroy());
          }
        );
        for (e in l.plotLinesAndBandsGroups)
          l.plotLinesAndBandsGroups[e] = l.plotLinesAndBandsGroups[e].destroy();
        c(l, function (a, c) {
          -1 === b(c, l.keepProps) && delete l[c];
        });
      },
      drawCrosshair: function (a, c) {
        var b,
          l = this.crosshair,
          k = w(l.snap, !0),
          d,
          e = this.cross;
        a || (a = this.cross && this.cross.e);
        this.crosshair && !1 !== (r(c) || !k)
          ? (k
              ? r(c) && (d = this.isXAxis ? c.plotX : this.len - c.plotY)
              : (d =
                  a &&
                  (this.horiz
                    ? a.chartX - this.pos
                    : this.len - a.chartY + this.pos)),
            r(d) &&
              (b =
                this.getPlotLinePath(
                  c && (this.isXAxis ? c.x : w(c.stackY, c.y)),
                  null,
                  null,
                  null,
                  d
                ) || null),
            r(b)
              ? ((c = this.categories && !this.isRadial),
                e ||
                  ((this.cross = e =
                    this.chart.renderer
                      .path()
                      .addClass(
                        "highcharts-crosshair highcharts-crosshair-" +
                          (c ? "category " : "thin ") +
                          l.className
                      )
                      .attr({ zIndex: w(l.zIndex, 2) })
                      .add()),
                  e.attr({
                    stroke:
                      l.color ||
                      (c ? n("#ccd6eb").setOpacity(0.25).get() : "#cccccc"),
                    "stroke-width": w(l.width, 1),
                  }),
                  l.dashStyle && e.attr({ dashstyle: l.dashStyle })),
                e.show().attr({ d: b }),
                c && !l.width && e.attr({ "stroke-width": this.transA }),
                (this.cross.e = a))
              : this.hideCrosshair())
          : this.hideCrosshair();
      },
      hideCrosshair: function () {
        this.cross && this.cross.hide();
      },
    });
    return (a.Axis = I);
  })(L);
  (function (a) {
    var E = a.Axis,
      B = a.Date,
      F = a.dateFormat,
      D = a.defaultOptions,
      n = a.defined,
      h = a.each,
      u = a.extend,
      r = a.getMagnitude,
      x = a.getTZOffset,
      t = a.normalizeTickInterval,
      m = a.pick,
      f = a.timeUnits;
    E.prototype.getTimeTicks = function (a, e, d, p) {
      var b = [],
        g = {},
        v = D.global.useUTC,
        H,
        q = new B(e - Math.max(x(e), x(d))),
        J = B.hcMakeTime,
        c = a.unitRange,
        w = a.count,
        K;
      if (n(e)) {
        q[B.hcSetMilliseconds](
          c >= f.second ? 0 : w * Math.floor(q.getMilliseconds() / w)
        );
        if (c >= f.second)
          q[B.hcSetSeconds](
            c >= f.minute ? 0 : w * Math.floor(q.getSeconds() / w)
          );
        if (c >= f.minute)
          q[B.hcSetMinutes](
            c >= f.hour ? 0 : w * Math.floor(q[B.hcGetMinutes]() / w)
          );
        if (c >= f.hour)
          q[B.hcSetHours](
            c >= f.day ? 0 : w * Math.floor(q[B.hcGetHours]() / w)
          );
        if (c >= f.day)
          q[B.hcSetDate](
            c >= f.month ? 1 : w * Math.floor(q[B.hcGetDate]() / w)
          );
        c >= f.month &&
          (q[B.hcSetMonth](
            c >= f.year ? 0 : w * Math.floor(q[B.hcGetMonth]() / w)
          ),
          (H = q[B.hcGetFullYear]()));
        if (c >= f.year) q[B.hcSetFullYear](H - (H % w));
        if (c === f.week)
          q[B.hcSetDate](q[B.hcGetDate]() - q[B.hcGetDay]() + m(p, 1));
        H = q[B.hcGetFullYear]();
        p = q[B.hcGetMonth]();
        var y = q[B.hcGetDate](),
          G = q[B.hcGetHours]();
        if (B.hcTimezoneOffset || B.hcGetTimezoneOffset)
          (K =
            (!v || !!B.hcGetTimezoneOffset) &&
            (d - e > 4 * f.month || x(e) !== x(d))),
            (q = q.getTime()),
            (q = new B(q + x(q)));
        v = q.getTime();
        for (e = 1; v < d; )
          b.push(v),
            (v =
              c === f.year
                ? J(H + e * w, 0)
                : c === f.month
                ? J(H, p + e * w)
                : !K || (c !== f.day && c !== f.week)
                ? K && c === f.hour
                  ? J(H, p, y, G + e * w)
                  : v + c * w
                : J(H, p, y + e * w * (c === f.day ? 1 : 7))),
            e++;
        b.push(v);
        c <= f.hour &&
          1e4 > b.length &&
          h(b, function (a) {
            0 === a % 18e5 &&
              "000000000" === F("%H%M%S%L", a) &&
              (g[a] = "day");
          });
      }
      b.info = u(a, { higherRanks: g, totalRange: c * w });
      return b;
    };
    E.prototype.normalizeTimeTickInterval = function (a, e) {
      var d = e || [
        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
        ["second", [1, 2, 5, 10, 15, 30]],
        ["minute", [1, 2, 5, 10, 15, 30]],
        ["hour", [1, 2, 3, 4, 6, 8, 12]],
        ["day", [1, 2]],
        ["week", [1, 2]],
        ["month", [1, 2, 3, 4, 6]],
        ["year", null],
      ];
      e = d[d.length - 1];
      var p = f[e[0]],
        b = e[1],
        g;
      for (
        g = 0;
        g < d.length &&
        !((e = d[g]),
        (p = f[e[0]]),
        (b = e[1]),
        d[g + 1] && a <= (p * b[b.length - 1] + f[d[g + 1][0]]) / 2);
        g++
      );
      p === f.year && a < 5 * p && (b = [1, 2, 5]);
      a = t(a / p, b, "year" === e[0] ? Math.max(r(a / p), 1) : 1);
      return { unitRange: p, count: a, unitName: e[0] };
    };
  })(L);
  (function (a) {
    var E = a.Axis,
      B = a.getMagnitude,
      F = a.map,
      D = a.normalizeTickInterval,
      n = a.pick;
    E.prototype.getLogTickPositions = function (a, u, r, x) {
      var h = this.options,
        m = this.len,
        f = this.lin2log,
        g = this.log2lin,
        e = [];
      x || (this._minorAutoInterval = null);
      if (0.5 <= a)
        (a = Math.round(a)), (e = this.getLinearTickPositions(a, u, r));
      else if (0.08 <= a)
        for (
          var m = Math.floor(u),
            d,
            p,
            b,
            A,
            v,
            h =
              0.3 < a
                ? [1, 2, 4]
                : 0.15 < a
                ? [1, 2, 4, 6, 8]
                : [1, 2, 3, 4, 5, 6, 7, 8, 9];
          m < r + 1 && !v;
          m++
        )
          for (p = h.length, d = 0; d < p && !v; d++)
            (b = g(f(m) * h[d])),
              b > u && (!x || A <= r) && void 0 !== A && e.push(A),
              A > r && (v = !0),
              (A = b);
      else
        (u = f(u)),
          (r = f(r)),
          (a = h[x ? "minorTickInterval" : "tickInterval"]),
          (a = n(
            "auto" === a ? null : a,
            this._minorAutoInterval,
            ((h.tickPixelInterval / (x ? 5 : 1)) * (r - u)) /
              ((x ? m / this.tickPositions.length : m) || 1)
          )),
          (a = D(a, null, B(a))),
          (e = F(this.getLinearTickPositions(a, u, r), g)),
          x || (this._minorAutoInterval = a / 5);
      x || (this.tickInterval = a);
      return e;
    };
    E.prototype.log2lin = function (a) {
      return Math.log(a) / Math.LN10;
    };
    E.prototype.lin2log = function (a) {
      return Math.pow(10, a);
    };
  })(L);
  (function (a, E) {
    var B = a.arrayMax,
      F = a.arrayMin,
      D = a.defined,
      n = a.destroyObjectProperties,
      h = a.each,
      u = a.erase,
      r = a.merge,
      x = a.pick;
    a.PlotLineOrBand = function (a, m) {
      this.axis = a;
      m && ((this.options = m), (this.id = m.id));
    };
    a.PlotLineOrBand.prototype = {
      render: function () {
        var h = this,
          m = h.axis,
          f = m.horiz,
          g = h.options,
          e = g.label,
          d = h.label,
          p = g.to,
          b = g.from,
          A = g.value,
          v = D(b) && D(p),
          H = D(A),
          q = h.svgElem,
          n = !q,
          c = [],
          w = g.color,
          K = x(g.zIndex, 0),
          y = g.events,
          c = {
            class:
              "highcharts-plot-" +
              (v ? "band " : "line ") +
              (g.className || ""),
          },
          G = {},
          l = m.chart.renderer,
          I = v ? "bands" : "lines",
          k = m.log2lin;
        m.isLog && ((b = k(b)), (p = k(p)), (A = k(A)));
        H
          ? ((c = { stroke: w, "stroke-width": g.width }),
            g.dashStyle && (c.dashstyle = g.dashStyle))
          : v &&
            (w && (c.fill = w),
            g.borderWidth &&
              ((c.stroke = g.borderColor),
              (c["stroke-width"] = g.borderWidth)));
        G.zIndex = K;
        I += "-" + K;
        (w = m.plotLinesAndBandsGroups[I]) ||
          (m.plotLinesAndBandsGroups[I] = w =
            l
              .g("plot-" + I)
              .attr(G)
              .add());
        n && (h.svgElem = q = l.path().attr(c).add(w));
        if (H) c = m.getPlotLinePath(A, q.strokeWidth());
        else if (v) c = m.getPlotBandPath(b, p, g);
        else return;
        n && c && c.length
          ? (q.attr({ d: c }),
            y &&
              a.objectEach(y, function (a, c) {
                q.on(c, function (a) {
                  y[c].apply(h, [a]);
                });
              }))
          : q &&
            (c
              ? (q.show(), q.animate({ d: c }))
              : (q.hide(), d && (h.label = d = d.destroy())));
        e &&
        D(e.text) &&
        c &&
        c.length &&
        0 < m.width &&
        0 < m.height &&
        !c.flat
          ? ((e = r(
              {
                align: f && v && "center",
                x: f ? !v && 4 : 10,
                verticalAlign: !f && v && "middle",
                y: f ? (v ? 16 : 10) : v ? 6 : -4,
                rotation: f && !v && 90,
              },
              e
            )),
            this.renderLabel(e, c, v, K))
          : d && d.hide();
        return h;
      },
      renderLabel: function (a, m, f, g) {
        var e = this.label,
          d = this.axis.chart.renderer;
        e ||
          ((e = {
            align: a.textAlign || a.align,
            rotation: a.rotation,
            class:
              "highcharts-plot-" +
              (f ? "band" : "line") +
              "-label " +
              (a.className || ""),
          }),
          (e.zIndex = g),
          (this.label = e = d.text(a.text, 0, 0, a.useHTML).attr(e).add()),
          e.css(a.style));
        g = [m[1], m[4], f ? m[6] : m[1]];
        m = [m[2], m[5], f ? m[7] : m[2]];
        f = F(g);
        d = F(m);
        e.align(a, !1, { x: f, y: d, width: B(g) - f, height: B(m) - d });
        e.show();
      },
      destroy: function () {
        u(this.axis.plotLinesAndBands, this);
        delete this.axis;
        n(this);
      },
    };
    a.extend(E.prototype, {
      getPlotBandPath: function (a, m) {
        var f = this.getPlotLinePath(m, null, null, !0),
          g = this.getPlotLinePath(a, null, null, !0),
          e = this.horiz,
          d = 1;
        a = (a < this.min && m < this.min) || (a > this.max && m > this.max);
        g && f
          ? (a && ((g.flat = g.toString() === f.toString()), (d = 0)),
            g.push(
              e && f[4] === g[4] ? f[4] + d : f[4],
              e || f[5] !== g[5] ? f[5] : f[5] + d,
              e && f[1] === g[1] ? f[1] + d : f[1],
              e || f[2] !== g[2] ? f[2] : f[2] + d
            ))
          : (g = null);
        return g;
      },
      addPlotBand: function (a) {
        return this.addPlotBandOrLine(a, "plotBands");
      },
      addPlotLine: function (a) {
        return this.addPlotBandOrLine(a, "plotLines");
      },
      addPlotBandOrLine: function (h, m) {
        var f = new a.PlotLineOrBand(this, h).render(),
          g = this.userOptions;
        f &&
          (m && ((g[m] = g[m] || []), g[m].push(h)),
          this.plotLinesAndBands.push(f));
        return f;
      },
      removePlotBandOrLine: function (a) {
        for (
          var m = this.plotLinesAndBands,
            f = this.options,
            g = this.userOptions,
            e = m.length;
          e--;

        )
          m[e].id === a && m[e].destroy();
        h(
          [
            f.plotLines || [],
            g.plotLines || [],
            f.plotBands || [],
            g.plotBands || [],
          ],
          function (d) {
            for (e = d.length; e--; ) d[e].id === a && u(d, d[e]);
          }
        );
      },
      removePlotBand: function (a) {
        this.removePlotBandOrLine(a);
      },
      removePlotLine: function (a) {
        this.removePlotBandOrLine(a);
      },
    });
  })(L, T);
  (function (a) {
    var E = a.dateFormat,
      B = a.each,
      F = a.extend,
      D = a.format,
      n = a.isNumber,
      h = a.map,
      u = a.merge,
      r = a.pick,
      x = a.splat,
      t = a.syncTimeout,
      m = a.timeUnits;
    a.Tooltip = function () {
      this.init.apply(this, arguments);
    };
    a.Tooltip.prototype = {
      init: function (a, g) {
        this.chart = a;
        this.options = g;
        this.crosshairs = [];
        this.now = { x: 0, y: 0 };
        this.isHidden = !0;
        this.split = g.split && !a.inverted;
        this.shared = g.shared || this.split;
      },
      cleanSplit: function (a) {
        B(this.chart.series, function (f) {
          var e = f && f.tt;
          e && (!e.isActive || a ? (f.tt = e.destroy()) : (e.isActive = !1));
        });
      },
      getLabel: function () {
        var a = this.chart.renderer,
          g = this.options;
        this.label ||
          (this.split
            ? (this.label = a.g("tooltip"))
            : ((this.label = a
                .label(
                  "",
                  0,
                  0,
                  g.shape || "callout",
                  null,
                  null,
                  g.useHTML,
                  null,
                  "tooltip"
                )
                .attr({ padding: g.padding, r: g.borderRadius })),
              this.label
                .attr({
                  fill: g.backgroundColor,
                  "stroke-width": g.borderWidth,
                })
                .css(g.style)
                .shadow(g.shadow)),
          this.label.attr({ zIndex: 8 }).add());
        return this.label;
      },
      update: function (a) {
        this.destroy();
        u(!0, this.chart.options.tooltip.userOptions, a);
        this.init(this.chart, u(!0, this.options, a));
      },
      destroy: function () {
        this.label && (this.label = this.label.destroy());
        this.split &&
          this.tt &&
          (this.cleanSplit(this.chart, !0), (this.tt = this.tt.destroy()));
        clearTimeout(this.hideTimer);
        clearTimeout(this.tooltipTimeout);
      },
      move: function (a, g, e, d) {
        var f = this,
          b = f.now,
          m =
            !1 !== f.options.animation &&
            !f.isHidden &&
            (1 < Math.abs(a - b.x) || 1 < Math.abs(g - b.y)),
          v = f.followPointer || 1 < f.len;
        F(b, {
          x: m ? (2 * b.x + a) / 3 : a,
          y: m ? (b.y + g) / 2 : g,
          anchorX: v ? void 0 : m ? (2 * b.anchorX + e) / 3 : e,
          anchorY: v ? void 0 : m ? (b.anchorY + d) / 2 : d,
        });
        f.getLabel().attr(b);
        m &&
          (clearTimeout(this.tooltipTimeout),
          (this.tooltipTimeout = setTimeout(function () {
            f && f.move(a, g, e, d);
          }, 32)));
      },
      hide: function (a) {
        var f = this;
        clearTimeout(this.hideTimer);
        a = r(a, this.options.hideDelay, 500);
        this.isHidden ||
          (this.hideTimer = t(function () {
            f.getLabel()[a ? "fadeOut" : "hide"]();
            f.isHidden = !0;
          }, a));
      },
      getAnchor: function (a, g) {
        var e,
          d = this.chart,
          f = d.inverted,
          b = d.plotTop,
          m = d.plotLeft,
          v = 0,
          H = 0,
          q,
          n;
        a = x(a);
        e = a[0].tooltipPos;
        this.followPointer &&
          g &&
          (void 0 === g.chartX && (g = d.pointer.normalize(g)),
          (e = [g.chartX - d.plotLeft, g.chartY - b]));
        e ||
          (B(a, function (a) {
            q = a.series.yAxis;
            n = a.series.xAxis;
            v += a.plotX + (!f && n ? n.left - m : 0);
            H +=
              (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) +
              (!f && q ? q.top - b : 0);
          }),
          (v /= a.length),
          (H /= a.length),
          (e = [
            f ? d.plotWidth - H : v,
            this.shared && !f && 1 < a.length && g
              ? g.chartY - b
              : f
              ? d.plotHeight - v
              : H,
          ]));
        return h(e, Math.round);
      },
      getPosition: function (a, g, e) {
        var d = this.chart,
          f = this.distance,
          b = {},
          m = e.h || 0,
          v,
          h = [
            "y",
            d.chartHeight,
            g,
            e.plotY + d.plotTop,
            d.plotTop,
            d.plotTop + d.plotHeight,
          ],
          q = [
            "x",
            d.chartWidth,
            a,
            e.plotX + d.plotLeft,
            d.plotLeft,
            d.plotLeft + d.plotWidth,
          ],
          n = !this.followPointer && r(e.ttBelow, !d.inverted === !!e.negative),
          c = function (a, c, d, k, e, y) {
            var l = d < k - f,
              p = k + f + d < c,
              g = k - f - d;
            k += f;
            if (n && p) b[a] = k;
            else if (!n && l) b[a] = g;
            else if (l) b[a] = Math.min(y - d, 0 > g - m ? g : g - m);
            else if (p) b[a] = Math.max(e, k + m + d > c ? k : k + m);
            else return !1;
          },
          w = function (a, c, d, k) {
            var l;
            k < f || k > c - f
              ? (l = !1)
              : (b[a] = k < d / 2 ? 1 : k > c - d / 2 ? c - d - 2 : k - d / 2);
            return l;
          },
          K = function (a) {
            var c = h;
            h = q;
            q = c;
            v = a;
          },
          y = function () {
            !1 !== c.apply(0, h)
              ? !1 !== w.apply(0, q) || v || (K(!0), y())
              : v
              ? (b.x = b.y = 0)
              : (K(!0), y());
          };
        (d.inverted || 1 < this.len) && K();
        y();
        return b;
      },
      defaultFormatter: function (a) {
        var f = this.points || x(this),
          e;
        e = [a.tooltipFooterHeaderFormatter(f[0])];
        e = e.concat(a.bodyFormatter(f));
        e.push(a.tooltipFooterHeaderFormatter(f[0], !0));
        return e;
      },
      refresh: function (a, g) {
        var e,
          d = this.options,
          f,
          b = a,
          m,
          v = {},
          h = [];
        e = d.formatter || this.defaultFormatter;
        var v = this.shared,
          q;
        clearTimeout(this.hideTimer);
        this.followPointer = x(b)[0].series.tooltipOptions.followPointer;
        m = this.getAnchor(b, g);
        g = m[0];
        f = m[1];
        !v || (b.series && b.series.noSharedTooltip)
          ? (v = b.getLabelConfig())
          : (B(b, function (a) {
              a.setState("hover");
              h.push(a.getLabelConfig());
            }),
            (v = { x: b[0].category, y: b[0].y }),
            (v.points = h),
            (b = b[0]));
        this.len = h.length;
        v = e.call(v, this);
        q = b.series;
        this.distance = r(q.tooltipOptions.distance, 16);
        !1 === v
          ? this.hide()
          : ((e = this.getLabel()),
            this.isHidden && e.attr({ opacity: 1 }).show(),
            this.split
              ? this.renderSplit(v, a)
              : (d.style.width || e.css({ width: this.chart.spacingBox.width }),
                e.attr({ text: v && v.join ? v.join("") : v }),
                e
                  .removeClass(/highcharts-color-[\d]+/g)
                  .addClass(
                    "highcharts-color-" + r(b.colorIndex, q.colorIndex)
                  ),
                e.attr({
                  stroke: d.borderColor || b.color || q.color || "#666666",
                }),
                this.updatePosition({
                  plotX: g,
                  plotY: f,
                  negative: b.negative,
                  ttBelow: b.ttBelow,
                  h: m[2] || 0,
                })),
            (this.isHidden = !1));
      },
      renderSplit: function (f, g) {
        var e = this,
          d = [],
          p = this.chart,
          b = p.renderer,
          m = !0,
          v = this.options,
          h,
          q = this.getLabel();
        B(f.slice(0, g.length + 1), function (a, c) {
          c = g[c - 1] || { isHeader: !0, plotX: g[0].plotX };
          var f = c.series || e,
            A = f.tt,
            y = c.series || {},
            G = "highcharts-color-" + r(c.colorIndex, y.colorIndex, "none");
          A ||
            (f.tt = A =
              b
                .label(null, null, null, "callout")
                .addClass("highcharts-tooltip-box " + G)
                .attr({
                  padding: v.padding,
                  r: v.borderRadius,
                  fill: v.backgroundColor,
                  stroke: c.color || y.color || "#333333",
                  "stroke-width": v.borderWidth,
                })
                .add(q));
          A.isActive = !0;
          A.attr({ text: a });
          A.css(v.style);
          a = A.getBBox();
          y = a.width + A.strokeWidth();
          c.isHeader
            ? ((h = a.height),
              (y = Math.max(
                0,
                Math.min(c.plotX + p.plotLeft - y / 2, p.chartWidth - y)
              )))
            : (y = c.plotX + p.plotLeft - r(v.distance, 16) - y);
          0 > y && (m = !1);
          a =
            (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
          a -= p.plotTop;
          d.push({
            target: c.isHeader ? p.plotHeight + h : a,
            rank: c.isHeader ? 1 : 0,
            size: f.tt.getBBox().height + 1,
            point: c,
            x: y,
            tt: A,
          });
        });
        this.cleanSplit();
        a.distribute(d, p.plotHeight + h);
        B(d, function (a) {
          var c = a.point,
            b = c.series;
          a.tt.attr({
            visibility: void 0 === a.pos ? "hidden" : "inherit",
            x: m || c.isHeader ? a.x : c.plotX + p.plotLeft + r(v.distance, 16),
            y: a.pos + p.plotTop,
            anchorX: c.isHeader ? c.plotX + p.plotLeft : c.plotX + b.xAxis.pos,
            anchorY: c.isHeader
              ? a.pos + p.plotTop - 15
              : c.plotY + b.yAxis.pos,
          });
        });
      },
      updatePosition: function (a) {
        var f = this.chart,
          e = this.getLabel(),
          e = (this.options.positioner || this.getPosition).call(
            this,
            e.width,
            e.height,
            a
          );
        this.move(
          Math.round(e.x),
          Math.round(e.y || 0),
          a.plotX + f.plotLeft,
          a.plotY + f.plotTop
        );
      },
      getDateFormat: function (a, g, e, d) {
        var f = E("%m-%d %H:%M:%S.%L", g),
          b,
          A,
          v = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
          h = "millisecond";
        for (A in m) {
          if (
            a === m.week &&
            +E("%w", g) === e &&
            "00:00:00.000" === f.substr(6)
          ) {
            A = "week";
            break;
          }
          if (m[A] > a) {
            A = h;
            break;
          }
          if (v[A] && f.substr(v[A]) !== "01-01 00:00:00.000".substr(v[A]))
            break;
          "week" !== A && (h = A);
        }
        A && (b = d[A]);
        return b;
      },
      getXDateFormat: function (a, g, e) {
        g = g.dateTimeLabelFormats;
        var d = e && e.closestPointRange;
        return (
          (d ? this.getDateFormat(d, a.x, e.options.startOfWeek, g) : g.day) ||
          g.year
        );
      },
      tooltipFooterHeaderFormatter: function (a, g) {
        var e = g ? "footer" : "header";
        g = a.series;
        var d = g.tooltipOptions,
          f = d.xDateFormat,
          b = g.xAxis,
          m = b && "datetime" === b.options.type && n(a.key),
          e = d[e + "Format"];
        m && !f && (f = this.getXDateFormat(a, d, b));
        m && f && (e = e.replace("{point.key}", "{point.key:" + f + "}"));
        return D(e, { point: a, series: g });
      },
      bodyFormatter: function (a) {
        return h(a, function (a) {
          var e = a.series.tooltipOptions;
          return (e.pointFormatter || a.point.tooltipFormatter).call(
            a.point,
            e.pointFormat
          );
        });
      },
    };
  })(L);
  (function (a) {
    var E = a.addEvent,
      B = a.attr,
      F = a.charts,
      D = a.color,
      n = a.css,
      h = a.defined,
      u = a.doc,
      r = a.each,
      x = a.extend,
      t = a.fireEvent,
      m = a.offset,
      f = a.pick,
      g = a.removeEvent,
      e = a.splat,
      d = a.Tooltip,
      p = a.win;
    a.Pointer = function (a, d) {
      this.init(a, d);
    };
    a.Pointer.prototype = {
      init: function (a, e) {
        this.options = e;
        this.chart = a;
        this.runChartClick = e.chart.events && !!e.chart.events.click;
        this.pinchDown = [];
        this.lastValidTouch = {};
        d &&
          e.tooltip.enabled &&
          ((a.tooltip = new d(a, e.tooltip)),
          (this.followTouchMove = f(e.tooltip.followTouchMove, !0)));
        this.setDOMEvents();
      },
      zoomOption: function (a) {
        var b = this.chart,
          d = b.options.chart,
          e = d.zoomType || "",
          b = b.inverted;
        /touch/.test(a.type) && (e = f(d.pinchType, e));
        this.zoomX = a = /x/.test(e);
        this.zoomY = e = /y/.test(e);
        this.zoomHor = (a && !b) || (e && b);
        this.zoomVert = (e && !b) || (a && b);
        this.hasZoom = a || e;
      },
      normalize: function (a, d) {
        var b, e;
        a = a || p.event;
        a.target || (a.target = a.srcElement);
        e = a.touches
          ? a.touches.length
            ? a.touches.item(0)
            : a.changedTouches[0]
          : a;
        d || (this.chartPosition = d = m(this.chart.container));
        void 0 === e.pageX
          ? ((b = Math.max(a.x, a.clientX - d.left)), (d = a.y))
          : ((b = e.pageX - d.left), (d = e.pageY - d.top));
        return x(a, { chartX: Math.round(b), chartY: Math.round(d) });
      },
      getCoordinates: function (a) {
        var b = { xAxis: [], yAxis: [] };
        r(this.chart.axes, function (d) {
          b[d.isXAxis ? "xAxis" : "yAxis"].push({
            axis: d,
            value: d.toValue(a[d.horiz ? "chartX" : "chartY"]),
          });
        });
        return b;
      },
      getKDPoints: function (a, d, e) {
        var b = [],
          p,
          g,
          c;
        r(a, function (a) {
          p = a.noSharedTooltip && d;
          g = !d && a.directTouch;
          a.visible &&
            !g &&
            f(a.options.enableMouseTracking, !0) &&
            (c = a.searchPoint(
              e,
              !p && 0 > a.options.findNearestPointBy.indexOf("y")
            )) &&
            c.series &&
            b.push(c);
        });
        b.sort(function (a, c) {
          var b = a.distX - c.distX,
            e = a.dist - c.dist,
            l =
              (c.series.group && c.series.group.zIndex) -
              (a.series.group && a.series.group.zIndex);
          return 0 !== b && d
            ? b
            : 0 !== e
            ? e
            : 0 !== l
            ? l
            : a.series.index > c.series.index
            ? -1
            : 1;
        });
        if (d && b[0] && !b[0].series.noSharedTooltip)
          for (a = b.length; a--; )
            (b[a].x !== b[0].x || b[a].series.noSharedTooltip) &&
              b.splice(a, 1);
        return b;
      },
      getPointFromEvent: function (a) {
        a = a.target;
        for (var b; a && !b; ) (b = a.point), (a = a.parentNode);
        return b;
      },
      getChartCoordinatesFromPoint: function (a, d) {
        var b = a.series,
          e = b.xAxis,
          b = b.yAxis;
        if (e && b)
          return d
            ? {
                chartX: e.len + e.pos - a.clientX,
                chartY: b.len + b.pos - a.plotY,
              }
            : { chartX: a.clientX + e.pos, chartY: a.plotY + b.pos };
      },
      getHoverData: function (b, d, e, f, p, g) {
        var c = b,
          v = d,
          c = p ? e : [v];
        f = !(!f || !b);
        d = v && !v.stickyTracking;
        var q = function (a, c) {
            return 0 === c;
          },
          y;
        f
          ? (q = function (a) {
              return a === b;
            })
          : d
          ? (q = function (a) {
              return a.series === v;
            })
          : (c = a.grep(e, function (a) {
              return a.stickyTracking;
            }));
        y = f && !p ? [b] : this.getKDPoints(c, p, g);
        v = (c = a.find(y, q)) && c.series;
        f || d || !p || (y = this.getKDPoints(e, p, g));
        y.sort(function (a, c) {
          return a.series.index - c.series.index;
        });
        return { hoverPoint: c, hoverSeries: v, hoverPoints: y };
      },
      runPointActions: function (b, d) {
        var e = this.chart,
          p = e.tooltip,
          g = p ? p.shared : !1,
          m = d || e.hoverPoint,
          c = (m && m.series) || e.hoverSeries;
        d = this.getHoverData(
          m,
          c,
          e.series,
          !!d || (c && c.directTouch && this.isDirectTouch),
          g,
          b
        );
        var w,
          h,
          m = d.hoverPoint;
        w = (c = d.hoverSeries) && c.tooltipOptions.followPointer;
        h = (g = g && m && !m.series.noSharedTooltip)
          ? d.hoverPoints
          : m
          ? [m]
          : [];
        if (m && (m !== e.hoverPoint || (p && p.isHidden))) {
          r(e.hoverPoints || [], function (c) {
            -1 === a.inArray(c, h) && c.setState();
          });
          r(h || [], function (a) {
            a.setState("hover");
          });
          if (e.hoverSeries !== c) c.onMouseOver();
          e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
          m.firePointEvent("mouseOver");
          e.hoverPoints = h;
          e.hoverPoint = m;
          p && p.refresh(g ? h : m, b);
        } else
          w &&
            p &&
            !p.isHidden &&
            ((c = p.getAnchor([{}], b)),
            p.updatePosition({ plotX: c[0], plotY: c[1] }));
        this.unDocMouseMove ||
          (this.unDocMouseMove = E(u, "mousemove", function (c) {
            var b = F[a.hoverChartIndex];
            if (b) b.pointer.onDocumentMouseMove(c);
          }));
        r(e.axes, function (c) {
          f(c.crosshair.snap, !0)
            ? a.find(h, function (a) {
                return a.series[c.coll] === c;
              })
              ? c.drawCrosshair(b, m)
              : c.hideCrosshair()
            : c.drawCrosshair(b);
        });
      },
      reset: function (a, d) {
        var b = this.chart,
          f = b.hoverSeries,
          p = b.hoverPoint,
          g = b.hoverPoints,
          c = b.tooltip,
          m = c && c.shared ? g : p;
        a &&
          m &&
          r(e(m), function (c) {
            c.series.isCartesian && void 0 === c.plotX && (a = !1);
          });
        if (a)
          c &&
            m &&
            (c.refresh(m),
            p &&
              (p.setState(p.state, !0),
              r(b.axes, function (a) {
                a.crosshair && a.drawCrosshair(null, p);
              })));
        else {
          if (p) p.onMouseOut();
          g &&
            r(g, function (a) {
              a.setState();
            });
          if (f) f.onMouseOut();
          c && c.hide(d);
          this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
          r(b.axes, function (a) {
            a.hideCrosshair();
          });
          this.hoverX = b.hoverPoints = b.hoverPoint = null;
        }
      },
      scaleGroups: function (a, d) {
        var b = this.chart,
          e;
        r(b.series, function (f) {
          e = a || f.getPlotBox();
          f.xAxis &&
            f.xAxis.zoomEnabled &&
            f.group &&
            (f.group.attr(e),
            f.markerGroup &&
              (f.markerGroup.attr(e),
              f.markerGroup.clip(d ? b.clipRect : null)),
            f.dataLabelsGroup && f.dataLabelsGroup.attr(e));
        });
        b.clipRect.attr(d || b.clipBox);
      },
      dragStart: function (a) {
        var b = this.chart;
        b.mouseIsDown = a.type;
        b.cancelClick = !1;
        b.mouseDownX = this.mouseDownX = a.chartX;
        b.mouseDownY = this.mouseDownY = a.chartY;
      },
      drag: function (a) {
        var b = this.chart,
          d = b.options.chart,
          e = a.chartX,
          f = a.chartY,
          p = this.zoomHor,
          c = this.zoomVert,
          g = b.plotLeft,
          m = b.plotTop,
          y = b.plotWidth,
          G = b.plotHeight,
          l,
          I = this.selectionMarker,
          k = this.mouseDownX,
          z = this.mouseDownY,
          h = d.panKey && a[d.panKey + "Key"];
        (I && I.touch) ||
          (e < g ? (e = g) : e > g + y && (e = g + y),
          f < m ? (f = m) : f > m + G && (f = m + G),
          (this.hasDragged = Math.sqrt(
            Math.pow(k - e, 2) + Math.pow(z - f, 2)
          )),
          10 < this.hasDragged &&
            ((l = b.isInsidePlot(k - g, z - m)),
            b.hasCartesianSeries &&
              (this.zoomX || this.zoomY) &&
              l &&
              !h &&
              !I &&
              (this.selectionMarker = I =
                b.renderer
                  .rect(g, m, p ? 1 : y, c ? 1 : G, 0)
                  .attr({
                    fill:
                      d.selectionMarkerFill ||
                      D("#335cad").setOpacity(0.25).get(),
                    class: "highcharts-selection-marker",
                    zIndex: 7,
                  })
                  .add()),
            I &&
              p &&
              ((e -= k),
              I.attr({ width: Math.abs(e), x: (0 < e ? 0 : e) + k })),
            I &&
              c &&
              ((e = f - z),
              I.attr({ height: Math.abs(e), y: (0 < e ? 0 : e) + z })),
            l && !I && d.panning && b.pan(a, d.panning)));
      },
      drop: function (a) {
        var b = this,
          d = this.chart,
          e = this.hasPinched;
        if (this.selectionMarker) {
          var f = { originalEvent: a, xAxis: [], yAxis: [] },
            p = this.selectionMarker,
            c = p.attr ? p.attr("x") : p.x,
            g = p.attr ? p.attr("y") : p.y,
            m = p.attr ? p.attr("width") : p.width,
            y = p.attr ? p.attr("height") : p.height,
            G;
          if (this.hasDragged || e)
            r(d.axes, function (l) {
              if (
                l.zoomEnabled &&
                h(l.min) &&
                (e || b[{ xAxis: "zoomX", yAxis: "zoomY" }[l.coll]])
              ) {
                var d = l.horiz,
                  k = "touchend" === a.type ? l.minPixelPadding : 0,
                  p = l.toValue((d ? c : g) + k),
                  d = l.toValue((d ? c + m : g + y) - k);
                f[l.coll].push({
                  axis: l,
                  min: Math.min(p, d),
                  max: Math.max(p, d),
                });
                G = !0;
              }
            }),
              G &&
                t(d, "selection", f, function (a) {
                  d.zoom(x(a, e ? { animation: !1 } : null));
                });
          this.selectionMarker = this.selectionMarker.destroy();
          e && this.scaleGroups();
        }
        d &&
          (n(d.container, { cursor: d._cursor }),
          (d.cancelClick = 10 < this.hasDragged),
          (d.mouseIsDown = this.hasDragged = this.hasPinched = !1),
          (this.pinchDown = []));
      },
      onContainerMouseDown: function (a) {
        a = this.normalize(a);
        this.zoomOption(a);
        a.preventDefault && a.preventDefault();
        this.dragStart(a);
      },
      onDocumentMouseUp: function (b) {
        F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(b);
      },
      onDocumentMouseMove: function (a) {
        var b = this.chart,
          d = this.chartPosition;
        a = this.normalize(a, d);
        !d ||
          this.inClass(a.target, "highcharts-tracker") ||
          b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) ||
          this.reset();
      },
      onContainerMouseLeave: function (b) {
        var d = F[a.hoverChartIndex];
        d &&
          (b.relatedTarget || b.toElement) &&
          (d.pointer.reset(), (d.pointer.chartPosition = null));
      },
      onContainerMouseMove: function (b) {
        var d = this.chart;
        (h(a.hoverChartIndex) &&
          F[a.hoverChartIndex] &&
          F[a.hoverChartIndex].mouseIsDown) ||
          (a.hoverChartIndex = d.index);
        b = this.normalize(b);
        b.returnValue = !1;
        "mousedown" === d.mouseIsDown && this.drag(b);
        (!this.inClass(b.target, "highcharts-tracker") &&
          !d.isInsidePlot(b.chartX - d.plotLeft, b.chartY - d.plotTop)) ||
          d.openMenu ||
          this.runPointActions(b);
      },
      inClass: function (a, d) {
        for (var b; a; ) {
          if ((b = B(a, "class"))) {
            if (-1 !== b.indexOf(d)) return !0;
            if (-1 !== b.indexOf("highcharts-container")) return !1;
          }
          a = a.parentNode;
        }
      },
      onTrackerMouseOut: function (a) {
        var b = this.chart.hoverSeries;
        a = a.relatedTarget || a.toElement;
        this.isDirectTouch = !1;
        if (
          !(
            !b ||
            !a ||
            b.stickyTracking ||
            this.inClass(a, "highcharts-tooltip") ||
            (this.inClass(a, "highcharts-series-" + b.index) &&
              this.inClass(a, "highcharts-tracker"))
          )
        )
          b.onMouseOut();
      },
      onContainerClick: function (a) {
        var b = this.chart,
          d = b.hoverPoint,
          e = b.plotLeft,
          f = b.plotTop;
        a = this.normalize(a);
        b.cancelClick ||
          (d && this.inClass(a.target, "highcharts-tracker")
            ? (t(d.series, "click", x(a, { point: d })),
              b.hoverPoint && d.firePointEvent("click", a))
            : (x(a, this.getCoordinates(a)),
              b.isInsidePlot(a.chartX - e, a.chartY - f) && t(b, "click", a)));
      },
      setDOMEvents: function () {
        var b = this,
          d = b.chart.container;
        d.onmousedown = function (a) {
          b.onContainerMouseDown(a);
        };
        d.onmousemove = function (a) {
          b.onContainerMouseMove(a);
        };
        d.onclick = function (a) {
          b.onContainerClick(a);
        };
        E(d, "mouseleave", b.onContainerMouseLeave);
        1 === a.chartCount && E(u, "mouseup", b.onDocumentMouseUp);
        a.hasTouch &&
          ((d.ontouchstart = function (a) {
            b.onContainerTouchStart(a);
          }),
          (d.ontouchmove = function (a) {
            b.onContainerTouchMove(a);
          }),
          1 === a.chartCount && E(u, "touchend", b.onDocumentTouchEnd));
      },
      destroy: function () {
        var b = this;
        b.unDocMouseMove && b.unDocMouseMove();
        g(b.chart.container, "mouseleave", b.onContainerMouseLeave);
        a.chartCount ||
          (g(u, "mouseup", b.onDocumentMouseUp),
          g(u, "touchend", b.onDocumentTouchEnd));
        clearInterval(b.tooltipTimeout);
        a.objectEach(b, function (a, d) {
          b[d] = null;
        });
      },
    };
  })(L);
  (function (a) {
    var E = a.charts,
      B = a.each,
      F = a.extend,
      D = a.map,
      n = a.noop,
      h = a.pick;
    F(a.Pointer.prototype, {
      pinchTranslate: function (a, h, n, t, m, f) {
        this.zoomHor && this.pinchTranslateDirection(!0, a, h, n, t, m, f);
        this.zoomVert && this.pinchTranslateDirection(!1, a, h, n, t, m, f);
      },
      pinchTranslateDirection: function (a, h, n, t, m, f, g, e) {
        var d = this.chart,
          p = a ? "x" : "y",
          b = a ? "X" : "Y",
          A = "chart" + b,
          v = a ? "width" : "height",
          H = d["plot" + (a ? "Left" : "Top")],
          q,
          r,
          c = e || 1,
          w = d.inverted,
          K = d.bounds[a ? "h" : "v"],
          y = 1 === h.length,
          G = h[0][A],
          l = n[0][A],
          I = !y && h[1][A],
          k = !y && n[1][A],
          z;
        n = function () {
          !y &&
            20 < Math.abs(G - I) &&
            (c = e || Math.abs(l - k) / Math.abs(G - I));
          r = (H - l) / c + G;
          q = d["plot" + (a ? "Width" : "Height")] / c;
        };
        n();
        h = r;
        h < K.min
          ? ((h = K.min), (z = !0))
          : h + q > K.max && ((h = K.max - q), (z = !0));
        z
          ? ((l -= 0.8 * (l - g[p][0])), y || (k -= 0.8 * (k - g[p][1])), n())
          : (g[p] = [l, k]);
        w || ((f[p] = r - H), (f[v] = q));
        f = w ? 1 / c : c;
        m[v] = q;
        m[p] = h;
        t[w ? (a ? "scaleY" : "scaleX") : "scale" + b] = c;
        t["translate" + b] = f * H + (l - f * G);
      },
      pinch: function (a) {
        var r = this,
          u = r.chart,
          t = r.pinchDown,
          m = a.touches,
          f = m.length,
          g = r.lastValidTouch,
          e = r.hasZoom,
          d = r.selectionMarker,
          p = {},
          b =
            1 === f &&
            ((r.inClass(a.target, "highcharts-tracker") && u.runTrackerClick) ||
              r.runChartClick),
          A = {};
        1 < f && (r.initiated = !0);
        e && r.initiated && !b && a.preventDefault();
        D(m, function (a) {
          return r.normalize(a);
        });
        "touchstart" === a.type
          ? (B(m, function (a, b) {
              t[b] = { chartX: a.chartX, chartY: a.chartY };
            }),
            (g.x = [t[0].chartX, t[1] && t[1].chartX]),
            (g.y = [t[0].chartY, t[1] && t[1].chartY]),
            B(u.axes, function (a) {
              if (a.zoomEnabled) {
                var b = u.bounds[a.horiz ? "h" : "v"],
                  d = a.minPixelPadding,
                  e = a.toPixels(h(a.options.min, a.dataMin)),
                  c = a.toPixels(h(a.options.max, a.dataMax)),
                  f = Math.max(e, c);
                b.min = Math.min(a.pos, Math.min(e, c) - d);
                b.max = Math.max(a.pos + a.len, f + d);
              }
            }),
            (r.res = !0))
          : r.followTouchMove && 1 === f
          ? this.runPointActions(r.normalize(a))
          : t.length &&
            (d ||
              (r.selectionMarker = d = F({ destroy: n, touch: !0 }, u.plotBox)),
            r.pinchTranslate(t, m, p, d, A, g),
            (r.hasPinched = e),
            r.scaleGroups(p, A),
            r.res && ((r.res = !1), this.reset(!1, 0)));
      },
      touch: function (n, r) {
        var u = this.chart,
          t,
          m;
        if (u.index !== a.hoverChartIndex)
          this.onContainerMouseLeave({ relatedTarget: !0 });
        a.hoverChartIndex = u.index;
        1 === n.touches.length
          ? ((n = this.normalize(n)),
            (m = u.isInsidePlot(n.chartX - u.plotLeft, n.chartY - u.plotTop)) &&
            !u.openMenu
              ? (r && this.runPointActions(n),
                "touchmove" === n.type &&
                  ((r = this.pinchDown),
                  (t = r[0]
                    ? 4 <=
                      Math.sqrt(
                        Math.pow(r[0].chartX - n.chartX, 2) +
                          Math.pow(r[0].chartY - n.chartY, 2)
                      )
                    : !1)),
                h(t, !0) && this.pinch(n))
              : r && this.reset())
          : 2 === n.touches.length && this.pinch(n);
      },
      onContainerTouchStart: function (a) {
        this.zoomOption(a);
        this.touch(a, !0);
      },
      onContainerTouchMove: function (a) {
        this.touch(a);
      },
      onDocumentTouchEnd: function (h) {
        E[a.hoverChartIndex] && E[a.hoverChartIndex].pointer.drop(h);
      },
    });
  })(L);
  (function (a) {
    var E = a.addEvent,
      B = a.charts,
      F = a.css,
      D = a.doc,
      n = a.extend,
      h = a.noop,
      u = a.Pointer,
      r = a.removeEvent,
      x = a.win,
      t = a.wrap;
    if (!a.hasTouch && (x.PointerEvent || x.MSPointerEvent)) {
      var m = {},
        f = !!x.PointerEvent,
        g = function () {
          var d = [];
          d.item = function (a) {
            return this[a];
          };
          a.objectEach(m, function (a) {
            d.push({ pageX: a.pageX, pageY: a.pageY, target: a.target });
          });
          return d;
        },
        e = function (d, e, b, f) {
          ("touch" !== d.pointerType &&
            d.pointerType !== d.MSPOINTER_TYPE_TOUCH) ||
            !B[a.hoverChartIndex] ||
            (f(d),
            (f = B[a.hoverChartIndex].pointer),
            f[e]({
              type: b,
              target: d.currentTarget,
              preventDefault: h,
              touches: g(),
            }));
        };
      n(u.prototype, {
        onContainerPointerDown: function (a) {
          e(a, "onContainerTouchStart", "touchstart", function (a) {
            m[a.pointerId] = {
              pageX: a.pageX,
              pageY: a.pageY,
              target: a.currentTarget,
            };
          });
        },
        onContainerPointerMove: function (a) {
          e(a, "onContainerTouchMove", "touchmove", function (a) {
            m[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };
            m[a.pointerId].target || (m[a.pointerId].target = a.currentTarget);
          });
        },
        onDocumentPointerUp: function (a) {
          e(a, "onDocumentTouchEnd", "touchend", function (a) {
            delete m[a.pointerId];
          });
        },
        batchMSEvents: function (a) {
          a(
            this.chart.container,
            f ? "pointerdown" : "MSPointerDown",
            this.onContainerPointerDown
          );
          a(
            this.chart.container,
            f ? "pointermove" : "MSPointerMove",
            this.onContainerPointerMove
          );
          a(D, f ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
        },
      });
      t(u.prototype, "init", function (a, e, b) {
        a.call(this, e, b);
        this.hasZoom &&
          F(e.container, {
            "-ms-touch-action": "none",
            "touch-action": "none",
          });
      });
      t(u.prototype, "setDOMEvents", function (a) {
        a.apply(this);
        (this.hasZoom || this.followTouchMove) && this.batchMSEvents(E);
      });
      t(u.prototype, "destroy", function (a) {
        this.batchMSEvents(r);
        a.call(this);
      });
    }
  })(L);
  (function (a) {
    var E = a.addEvent,
      B = a.css,
      F = a.discardElement,
      D = a.defined,
      n = a.each,
      h = a.isFirefox,
      u = a.marginNames,
      r = a.merge,
      x = a.pick,
      t = a.setAnimation,
      m = a.stableSort,
      f = a.win,
      g = a.wrap;
    a.Legend = function (a, d) {
      this.init(a, d);
    };
    a.Legend.prototype = {
      init: function (a, d) {
        this.chart = a;
        this.setOptions(d);
        d.enabled &&
          (this.render(),
          E(this.chart, "endResize", function () {
            this.legend.positionCheckboxes();
          }));
      },
      setOptions: function (a) {
        var d = x(a.padding, 8);
        this.options = a;
        this.itemStyle = a.itemStyle;
        this.itemHiddenStyle = r(this.itemStyle, a.itemHiddenStyle);
        this.itemMarginTop = a.itemMarginTop || 0;
        this.padding = d;
        this.initialItemY = d - 5;
        this.itemHeight = this.maxItemWidth = 0;
        this.symbolWidth = x(a.symbolWidth, 16);
        this.pages = [];
      },
      update: function (a, d) {
        var e = this.chart;
        this.setOptions(r(!0, this.options, a));
        this.destroy();
        e.isDirtyLegend = e.isDirtyBox = !0;
        x(d, !0) && e.redraw();
      },
      colorizeItem: function (e, d) {
        e.legendGroup[d ? "removeClass" : "addClass"](
          "highcharts-legend-item-hidden"
        );
        var f = this.options,
          b = e.legendItem,
          g = e.legendLine,
          m = e.legendSymbol,
          h = this.itemHiddenStyle.color,
          f = d ? f.itemStyle.color : h,
          q = d ? e.color || h : h,
          n = e.options && e.options.marker,
          c = { fill: q };
        b && b.css({ fill: f, color: f });
        g && g.attr({ stroke: q });
        m &&
          (n &&
            m.isMarker &&
            ((c = e.pointAttribs()),
            d ||
              a.objectEach(c, function (a, b) {
                c[b] = h;
              })),
          m.attr(c));
      },
      positionItem: function (a) {
        var d = this.options,
          e = d.symbolPadding,
          d = !d.rtl,
          b = a._legendItemPos,
          f = b[0],
          b = b[1],
          g = a.checkbox;
        (a = a.legendGroup) &&
          a.element &&
          a.translate(d ? f : this.legendWidth - f - 2 * e - 4, b);
        g && ((g.x = f), (g.y = b));
      },
      destroyItem: function (a) {
        var d = a.checkbox;
        n(
          ["legendItem", "legendLine", "legendSymbol", "legendGroup"],
          function (d) {
            a[d] && (a[d] = a[d].destroy());
          }
        );
        d && F(a.checkbox);
      },
      destroy: function () {
        function a(a) {
          this[a] && (this[a] = this[a].destroy());
        }
        n(this.getAllItems(), function (d) {
          n(["legendItem", "legendGroup"], a, d);
        });
        n("clipRect up down pager nav box title group".split(" "), a, this);
        this.display = null;
      },
      positionCheckboxes: function (a) {
        var d = this.group && this.group.alignAttr,
          e,
          b = this.clipHeight || this.legendHeight,
          f = this.titleHeight;
        d &&
          ((e = d.translateY),
          n(this.allItems, function (g) {
            var p = g.checkbox,
              m;
            p &&
              ((m = e + f + p.y + (a || 0) + 3),
              B(p, {
                left: d.translateX + g.checkboxOffset + p.x - 20 + "px",
                top: m + "px",
                display: m > e - 6 && m < e + b - 6 ? "" : "none",
              }));
          }));
      },
      renderTitle: function () {
        var a = this.options,
          d = this.padding,
          f = a.title,
          b = 0;
        f.text &&
          (this.title ||
            (this.title = this.chart.renderer
              .label(
                f.text,
                d - 3,
                d - 4,
                null,
                null,
                null,
                a.useHTML,
                null,
                "legend-title"
              )
              .attr({ zIndex: 1 })
              .css(f.style)
              .add(this.group)),
          (a = this.title.getBBox()),
          (b = a.height),
          (this.offsetWidth = a.width),
          this.contentGroup.attr({ translateY: b }));
        this.titleHeight = b;
      },
      setText: function (e) {
        var d = this.options;
        e.legendItem.attr({
          text: d.labelFormat
            ? a.format(d.labelFormat, e)
            : d.labelFormatter.call(e),
        });
      },
      renderItem: function (a) {
        var d = this.chart,
          e = d.renderer,
          b = this.options,
          f = "horizontal" === b.layout,
          g = this.symbolWidth,
          m = b.symbolPadding,
          q = this.itemStyle,
          h = this.itemHiddenStyle,
          c = this.padding,
          w = f ? x(b.itemDistance, 20) : 0,
          n = !b.rtl,
          y = b.width,
          G = b.itemMarginBottom || 0,
          l = this.itemMarginTop,
          I = a.legendItem,
          k = !a.series,
          z = !k && a.series.drawLegendSymbol ? a.series : a,
          u = z.options,
          M = this.createCheckboxForItem && u && u.showCheckbox,
          u = g + m + w + (M ? 20 : 0),
          t = b.useHTML,
          P = a.options.className;
        I ||
          ((a.legendGroup = e
            .g("legend-item")
            .addClass(
              "highcharts-" +
                z.type +
                "-series highcharts-color-" +
                a.colorIndex +
                (P ? " " + P : "") +
                (k ? " highcharts-series-" + a.index : "")
            )
            .attr({ zIndex: 1 })
            .add(this.scrollGroup)),
          (a.legendItem = I =
            e
              .text("", n ? g + m : -m, this.baseline || 0, t)
              .css(r(a.visible ? q : h))
              .attr({ align: n ? "left" : "right", zIndex: 2 })
              .add(a.legendGroup)),
          this.baseline ||
            ((g = q.fontSize),
            (this.fontMetrics = e.fontMetrics(g, I)),
            (this.baseline = this.fontMetrics.f + 3 + l),
            I.attr("y", this.baseline)),
          (this.symbolHeight = b.symbolHeight || this.fontMetrics.f),
          z.drawLegendSymbol(this, a),
          this.setItemEvents && this.setItemEvents(a, I, t),
          M && this.createCheckboxForItem(a));
        this.colorizeItem(a, a.visible);
        q.width || I.css({ width: (b.itemWidth || d.spacingBox.width) - u });
        this.setText(a);
        e = I.getBBox();
        q = a.checkboxOffset = b.itemWidth || a.legendItemWidth || e.width + u;
        this.itemHeight = e = Math.round(
          a.legendItemHeight || e.height || this.symbolHeight
        );
        f &&
          this.itemX - c + q > (y || d.spacingBox.width - 2 * c - b.x) &&
          ((this.itemX = c),
          (this.itemY += l + this.lastLineHeight + G),
          (this.lastLineHeight = 0));
        this.maxItemWidth = Math.max(this.maxItemWidth, q);
        this.lastItemY = l + this.itemY + G;
        this.lastLineHeight = Math.max(e, this.lastLineHeight);
        a._legendItemPos = [this.itemX, this.itemY];
        f
          ? (this.itemX += q)
          : ((this.itemY += l + e + G), (this.lastLineHeight = e));
        this.offsetWidth =
          y || Math.max((f ? this.itemX - c - w : q) + c, this.offsetWidth);
      },
      getAllItems: function () {
        var a = [];
        n(this.chart.series, function (d) {
          var e = d && d.options;
          d &&
            x(e.showInLegend, D(e.linkedTo) ? !1 : void 0, !0) &&
            (a = a.concat(
              d.legendItems || ("point" === e.legendType ? d.data : d)
            ));
        });
        return a;
      },
      adjustMargins: function (a, d) {
        var e = this.chart,
          b = this.options,
          f =
            b.align.charAt(0) + b.verticalAlign.charAt(0) + b.layout.charAt(0);
        b.floating ||
          n(
            [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/],
            function (g, p) {
              g.test(f) &&
                !D(a[p]) &&
                (e[u[p]] = Math.max(
                  e[u[p]],
                  e.legend[(p + 1) % 2 ? "legendHeight" : "legendWidth"] +
                    [1, -1, -1, 1][p] * b[p % 2 ? "x" : "y"] +
                    x(b.margin, 12) +
                    d[p]
                ));
            }
          );
      },
      render: function () {
        var a = this,
          d = a.chart,
          f = d.renderer,
          b = a.group,
          g,
          h,
          H,
          q,
          u = a.box,
          c = a.options,
          w = a.padding;
        a.itemX = w;
        a.itemY = a.initialItemY;
        a.offsetWidth = 0;
        a.lastItemY = 0;
        b ||
          ((a.group = b = f.g("legend").attr({ zIndex: 7 }).add()),
          (a.contentGroup = f.g().attr({ zIndex: 1 }).add(b)),
          (a.scrollGroup = f.g().add(a.contentGroup)));
        a.renderTitle();
        g = a.getAllItems();
        m(g, function (a, c) {
          return (
            ((a.options && a.options.legendIndex) || 0) -
            ((c.options && c.options.legendIndex) || 0)
          );
        });
        c.reversed && g.reverse();
        a.allItems = g;
        a.display = h = !!g.length;
        a.lastLineHeight = 0;
        n(g, function (c) {
          a.renderItem(c);
        });
        H = (c.width || a.offsetWidth) + w;
        q = a.lastItemY + a.lastLineHeight + a.titleHeight;
        q = a.handleOverflow(q);
        q += w;
        u ||
          ((a.box = u =
            f
              .rect()
              .addClass("highcharts-legend-box")
              .attr({ r: c.borderRadius })
              .add(b)),
          (u.isNew = !0));
        u.attr({
          stroke: c.borderColor,
          "stroke-width": c.borderWidth || 0,
          fill: c.backgroundColor || "none",
        }).shadow(c.shadow);
        0 < H &&
          0 < q &&
          (u[u.isNew ? "attr" : "animate"](
            u.crisp({ x: 0, y: 0, width: H, height: q }, u.strokeWidth())
          ),
          (u.isNew = !1));
        u[h ? "show" : "hide"]();
        a.legendWidth = H;
        a.legendHeight = q;
        n(g, function (c) {
          a.positionItem(c);
        });
        h && b.align(r(c, { width: H, height: q }), !0, "spacingBox");
        d.isResizing || this.positionCheckboxes();
      },
      handleOverflow: function (a) {
        var d = this,
          e = this.chart,
          b = e.renderer,
          f = this.options,
          g = f.y,
          m = this.padding,
          e = e.spacingBox.height + ("top" === f.verticalAlign ? -g : g) - m,
          g = f.maxHeight,
          q,
          h = this.clipRect,
          c = f.navigation,
          w = x(c.animation, !0),
          r = c.arrowSize || 12,
          y = this.nav,
          G = this.pages,
          l,
          I = this.allItems,
          k = function (a) {
            "number" === typeof a
              ? h.attr({ height: a })
              : h && ((d.clipRect = h.destroy()), d.contentGroup.clip());
            d.contentGroup.div &&
              (d.contentGroup.div.style.clip = a
                ? "rect(" + m + "px,9999px," + (m + a) + "px,0)"
                : "auto");
          };
        "horizontal" !== f.layout ||
          "middle" === f.verticalAlign ||
          f.floating ||
          (e /= 2);
        g && (e = Math.min(e, g));
        G.length = 0;
        a > e && !1 !== c.enabled
          ? ((this.clipHeight = q = Math.max(e - 20 - this.titleHeight - m, 0)),
            (this.currentPage = x(this.currentPage, 1)),
            (this.fullHeight = a),
            n(I, function (a, c) {
              var b = a._legendItemPos[1];
              a = Math.round(a.legendItem.getBBox().height);
              var d = G.length;
              if (!d || (b - G[d - 1] > q && (l || b) !== G[d - 1]))
                G.push(l || b), d++;
              c === I.length - 1 && b + a - G[d - 1] > q && G.push(b);
              b !== l && (l = b);
            }),
            h ||
              ((h = d.clipRect = b.clipRect(0, m, 9999, 0)),
              d.contentGroup.clip(h)),
            k(q),
            y ||
              ((this.nav = y = b.g().attr({ zIndex: 1 }).add(this.group)),
              (this.up = b
                .symbol("triangle", 0, 0, r, r)
                .on("click", function () {
                  d.scroll(-1, w);
                })
                .add(y)),
              (this.pager = b
                .text("", 15, 10)
                .addClass("highcharts-legend-navigation")
                .css(c.style)
                .add(y)),
              (this.down = b
                .symbol("triangle-down", 0, 0, r, r)
                .on("click", function () {
                  d.scroll(1, w);
                })
                .add(y))),
            d.scroll(0),
            (a = e))
          : y &&
            (k(),
            (this.nav = y.destroy()),
            this.scrollGroup.attr({ translateY: 1 }),
            (this.clipHeight = 0));
        return a;
      },
      scroll: function (a, d) {
        var e = this.pages,
          b = e.length;
        a = this.currentPage + a;
        var f = this.clipHeight,
          g = this.options.navigation,
          m = this.pager,
          q = this.padding;
        a > b && (a = b);
        0 < a &&
          (void 0 !== d && t(d, this.chart),
          this.nav.attr({
            translateX: q,
            translateY: f + this.padding + 7 + this.titleHeight,
            visibility: "visible",
          }),
          this.up.attr({
            class:
              1 === a
                ? "highcharts-legend-nav-inactive"
                : "highcharts-legend-nav-active",
          }),
          m.attr({ text: a + "/" + b }),
          this.down.attr({
            x: 18 + this.pager.getBBox().width,
            class:
              a === b
                ? "highcharts-legend-nav-inactive"
                : "highcharts-legend-nav-active",
          }),
          this.up
            .attr({ fill: 1 === a ? g.inactiveColor : g.activeColor })
            .css({ cursor: 1 === a ? "default" : "pointer" }),
          this.down
            .attr({ fill: a === b ? g.inactiveColor : g.activeColor })
            .css({ cursor: a === b ? "default" : "pointer" }),
          (d = -e[a - 1] + this.initialItemY),
          this.scrollGroup.animate({ translateY: d }),
          (this.currentPage = a),
          this.positionCheckboxes(d));
      },
    };
    a.LegendSymbolMixin = {
      drawRectangle: function (a, d) {
        var e = a.symbolHeight,
          b = a.options.squareSymbol;
        d.legendSymbol = this.chart.renderer
          .rect(
            b ? (a.symbolWidth - e) / 2 : 0,
            a.baseline - e + 1,
            b ? e : a.symbolWidth,
            e,
            x(a.options.symbolRadius, e / 2)
          )
          .addClass("highcharts-point")
          .attr({ zIndex: 3 })
          .add(d.legendGroup);
      },
      drawLineMarker: function (a) {
        var d = this.options,
          e = d.marker,
          b = a.symbolWidth,
          f = a.symbolHeight,
          g = f / 2,
          m = this.chart.renderer,
          q = this.legendGroup;
        a = a.baseline - Math.round(0.3 * a.fontMetrics.b);
        var h;
        h = { "stroke-width": d.lineWidth || 0 };
        d.dashStyle && (h.dashstyle = d.dashStyle);
        this.legendLine = m
          .path(["M", 0, a, "L", b, a])
          .addClass("highcharts-graph")
          .attr(h)
          .add(q);
        e &&
          !1 !== e.enabled &&
          ((d = Math.min(x(e.radius, g), g)),
          0 === this.symbol.indexOf("url") &&
            ((e = r(e, { width: f, height: f })), (d = 0)),
          (this.legendSymbol = e =
            m
              .symbol(this.symbol, b / 2 - d, a - d, 2 * d, 2 * d, e)
              .addClass("highcharts-point")
              .add(q)),
          (e.isMarker = !0));
      },
    };
    (/Trident\/7\.0/.test(f.navigator.userAgent) || h) &&
      g(a.Legend.prototype, "positionItem", function (a, d) {
        var e = this,
          b = function () {
            d._legendItemPos && a.call(e, d);
          };
        b();
        setTimeout(b);
      });
  })(L);
  (function (a) {
    var E = a.addEvent,
      B = a.animate,
      F = a.animObject,
      D = a.attr,
      n = a.doc,
      h = a.Axis,
      u = a.createElement,
      r = a.defaultOptions,
      x = a.discardElement,
      t = a.charts,
      m = a.css,
      f = a.defined,
      g = a.each,
      e = a.extend,
      d = a.find,
      p = a.fireEvent,
      b = a.getStyle,
      A = a.grep,
      v = a.isNumber,
      H = a.isObject,
      q = a.isString,
      J = a.Legend,
      c = a.marginNames,
      w = a.merge,
      K = a.objectEach,
      y = a.Pointer,
      G = a.pick,
      l = a.pInt,
      I = a.removeEvent,
      k = a.seriesTypes,
      z = a.splat,
      Q = a.svg,
      M = a.syncTimeout,
      N = a.win,
      P = a.Renderer,
      O = (a.Chart = function () {
        this.getArgs.apply(this, arguments);
      });
    a.chart = function (a, c, b) {
      return new O(a, c, b);
    };
    e(O.prototype, {
      callbacks: [],
      getArgs: function () {
        var a = [].slice.call(arguments);
        if (q(a[0]) || a[0].nodeName) this.renderTo = a.shift();
        this.init(a[0], a[1]);
      },
      init: function (c, b) {
        var l,
          d,
          k = c.series,
          e = c.plotOptions || {};
        c.series = null;
        l = w(r, c);
        for (d in l.plotOptions)
          l.plotOptions[d].tooltip = (e[d] && w(e[d].tooltip)) || void 0;
        l.tooltip.userOptions =
          (c.chart && c.chart.forExport && c.tooltip.userOptions) || c.tooltip;
        l.series = c.series = k;
        this.userOptions = c;
        c = l.chart;
        d = c.events;
        this.margin = [];
        this.spacing = [];
        this.bounds = { h: {}, v: {} };
        this.callback = b;
        this.isResizing = 0;
        this.options = l;
        this.axes = [];
        this.series = [];
        this.hasCartesianSeries = c.showAxes;
        var f = this;
        f.index = t.length;
        t.push(f);
        a.chartCount++;
        d &&
          K(d, function (a, c) {
            E(f, c, a);
          });
        f.xAxis = [];
        f.yAxis = [];
        f.pointCount = f.colorCounter = f.symbolCounter = 0;
        f.firstRender();
      },
      initSeries: function (c) {
        var b = this.options.chart;
        (b = k[c.type || b.type || b.defaultSeriesType]) || a.error(17, !0);
        b = new b();
        b.init(this, c);
        return b;
      },
      orderSeries: function (a) {
        var c = this.series;
        for (a = a || 0; a < c.length; a++)
          c[a] &&
            ((c[a].index = a),
            (c[a].name = c[a].name || "Series " + (c[a].index + 1)));
      },
      isInsidePlot: function (a, c, b) {
        var l = b ? c : a;
        a = b ? a : c;
        return 0 <= l && l <= this.plotWidth && 0 <= a && a <= this.plotHeight;
      },
      redraw: function (c) {
        var b = this.axes,
          l = this.series,
          d = this.pointer,
          k = this.legend,
          f = this.isDirtyLegend,
          y,
          m,
          G = this.hasCartesianSeries,
          q = this.isDirtyBox,
          z,
          h = this.renderer,
          w = h.isHidden(),
          I = [];
        this.setResponsive && this.setResponsive(!1);
        a.setAnimation(c, this);
        w && this.temporaryDisplay();
        this.layOutTitles();
        for (c = l.length; c--; )
          if (((z = l[c]), z.options.stacking && ((y = !0), z.isDirty))) {
            m = !0;
            break;
          }
        if (m)
          for (c = l.length; c--; )
            (z = l[c]), z.options.stacking && (z.isDirty = !0);
        g(l, function (a) {
          a.isDirty &&
            "point" === a.options.legendType &&
            (a.updateTotals && a.updateTotals(), (f = !0));
          a.isDirtyData && p(a, "updatedData");
        });
        f && k.options.enabled && (k.render(), (this.isDirtyLegend = !1));
        y && this.getStacks();
        G &&
          g(b, function (a) {
            a.updateNames();
            a.setScale();
          });
        this.getMargins();
        G &&
          (g(b, function (a) {
            a.isDirty && (q = !0);
          }),
          g(b, function (a) {
            var c = a.min + "," + a.max;
            a.extKey !== c &&
              ((a.extKey = c),
              I.push(function () {
                p(a, "afterSetExtremes", e(a.eventArgs, a.getExtremes()));
                delete a.eventArgs;
              }));
            (q || y) && a.redraw();
          }));
        q && this.drawChartBox();
        p(this, "predraw");
        g(l, function (a) {
          (q || a.isDirty) && a.visible && a.redraw();
          a.isDirtyData = !1;
        });
        d && d.reset(!0);
        h.draw();
        p(this, "redraw");
        p(this, "render");
        w && this.temporaryDisplay(!0);
        g(I, function (a) {
          a.call();
        });
      },
      get: function (a) {
        function c(c) {
          return c.id === a || (c.options && c.options.id === a);
        }
        var b,
          l = this.series,
          k;
        b = d(this.axes, c) || d(this.series, c);
        for (k = 0; !b && k < l.length; k++) b = d(l[k].points || [], c);
        return b;
      },
      getAxes: function () {
        var a = this,
          c = this.options,
          b = (c.xAxis = z(c.xAxis || {})),
          c = (c.yAxis = z(c.yAxis || {}));
        g(b, function (a, c) {
          a.index = c;
          a.isX = !0;
        });
        g(c, function (a, c) {
          a.index = c;
        });
        b = b.concat(c);
        g(b, function (c) {
          new h(a, c);
        });
      },
      getSelectedPoints: function () {
        var a = [];
        g(this.series, function (c) {
          a = a.concat(
            A(c.data || [], function (a) {
              return a.selected;
            })
          );
        });
        return a;
      },
      getSelectedSeries: function () {
        return A(this.series, function (a) {
          return a.selected;
        });
      },
      setTitle: function (a, c, b) {
        var l = this,
          d = l.options,
          k;
        k = d.title = w(
          {
            style: { color: "#333333", fontSize: d.isStock ? "16px" : "18px" },
          },
          d.title,
          a
        );
        d = d.subtitle = w({ style: { color: "#666666" } }, d.subtitle, c);
        g(
          [
            ["title", a, k],
            ["subtitle", c, d],
          ],
          function (a, c) {
            var b = a[0],
              d = l[b],
              k = a[1];
            a = a[2];
            d && k && (l[b] = d = d.destroy());
            a &&
              a.text &&
              !d &&
              ((l[b] = l.renderer
                .text(a.text, 0, 0, a.useHTML)
                .attr({
                  align: a.align,
                  class: "highcharts-" + b,
                  zIndex: a.zIndex || 4,
                })
                .add()),
              (l[b].update = function (a) {
                l.setTitle(!c && a, c && a);
              }),
              l[b].css(a.style));
          }
        );
        l.layOutTitles(b);
      },
      layOutTitles: function (a) {
        var c = 0,
          b,
          l = this.renderer,
          d = this.spacingBox;
        g(
          ["title", "subtitle"],
          function (a) {
            var b = this[a],
              k = this.options[a];
            a = "title" === a ? -3 : k.verticalAlign ? 0 : c + 2;
            var f;
            b &&
              ((f = k.style.fontSize),
              (f = l.fontMetrics(f, b).b),
              b
                .css({ width: (k.width || d.width + k.widthAdjust) + "px" })
                .align(e({ y: a + f }, k), !1, "spacingBox"),
              k.floating ||
                k.verticalAlign ||
                (c = Math.ceil(c + b.getBBox(k.useHTML).height)));
          },
          this
        );
        b = this.titleOffset !== c;
        this.titleOffset = c;
        !this.isDirtyBox &&
          b &&
          ((this.isDirtyBox = b),
          this.hasRendered && G(a, !0) && this.isDirtyBox && this.redraw());
      },
      getChartSize: function () {
        var c = this.options.chart,
          l = c.width,
          c = c.height,
          d = this.renderTo;
        f(l) || (this.containerWidth = b(d, "width"));
        f(c) || (this.containerHeight = b(d, "height"));
        this.chartWidth = Math.max(0, l || this.containerWidth || 600);
        this.chartHeight = Math.max(
          0,
          a.relativeLength(c, this.chartWidth) || this.containerHeight || 400
        );
      },
      temporaryDisplay: function (c) {
        var l = this.renderTo;
        if (c)
          for (; l && l.style; )
            l.hcOrigStyle && (a.css(l, l.hcOrigStyle), delete l.hcOrigStyle),
              (l = l.parentNode);
        else
          for (; l && l.style; )
            "none" === b(l, "display", !1) &&
              ((l.hcOrigStyle = {
                display: l.style.display,
                height: l.style.height,
                overflow: l.style.overflow,
              }),
              (c = { display: "block", overflow: "hidden" }),
              l !== this.renderTo && (c.height = 0),
              a.css(l, c),
              l.style.setProperty &&
                l.style.setProperty("display", "block", "important")),
              (l = l.parentNode);
      },
      setClassName: function (a) {
        this.container.className = "highcharts-container " + (a || "");
      },
      getContainer: function () {
        var c,
          b = this.options,
          d = b.chart,
          k,
          f;
        c = this.renderTo;
        var g = a.uniqueKey(),
          y;
        c || (this.renderTo = c = d.renderTo);
        q(c) && (this.renderTo = c = n.getElementById(c));
        c || a.error(13, !0);
        k = l(D(c, "data-highcharts-chart"));
        v(k) && t[k] && t[k].hasRendered && t[k].destroy();
        D(c, "data-highcharts-chart", this.index);
        c.innerHTML = "";
        d.skipClone || c.offsetWidth || this.temporaryDisplay();
        this.getChartSize();
        k = this.chartWidth;
        f = this.chartHeight;
        y = e(
          {
            position: "relative",
            overflow: "hidden",
            width: k + "px",
            height: f + "px",
            textAlign: "left",
            lineHeight: "normal",
            zIndex: 0,
            "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
          },
          d.style
        );
        this.container = c = u("div", { id: g }, y, c);
        this._cursor = c.style.cursor;
        this.renderer = new (a[d.renderer] || P)(
          c,
          k,
          f,
          null,
          d.forExport,
          b.exporting && b.exporting.allowHTML
        );
        this.setClassName(d.className);
        this.renderer.setStyle(d.style);
        this.renderer.chartIndex = this.index;
      },
      getMargins: function (a) {
        var c = this.spacing,
          b = this.margin,
          l = this.titleOffset;
        this.resetMargins();
        l &&
          !f(b[0]) &&
          (this.plotTop = Math.max(
            this.plotTop,
            l + this.options.title.margin + c[0]
          ));
        this.legend.display && this.legend.adjustMargins(b, c);
        this.extraMargin &&
          (this[this.extraMargin.type] =
            (this[this.extraMargin.type] || 0) + this.extraMargin.value);
        this.extraTopMargin && (this.plotTop += this.extraTopMargin);
        a || this.getAxisMargins();
      },
      getAxisMargins: function () {
        var a = this,
          b = (a.axisOffset = [0, 0, 0, 0]),
          l = a.margin;
        a.hasCartesianSeries &&
          g(a.axes, function (a) {
            a.visible && a.getOffset();
          });
        g(c, function (c, d) {
          f(l[d]) || (a[c] += b[d]);
        });
        a.setChartSize();
      },
      reflow: function (a) {
        var c = this,
          l = c.options.chart,
          d = c.renderTo,
          k = f(l.width),
          e = l.width || b(d, "width"),
          l = l.height || b(d, "height"),
          d = a ? a.target : N;
        if (!k && !c.isPrinting && e && l && (d === N || d === n)) {
          if (e !== c.containerWidth || l !== c.containerHeight)
            clearTimeout(c.reflowTimeout),
              (c.reflowTimeout = M(
                function () {
                  c.container && c.setSize(void 0, void 0, !1);
                },
                a ? 100 : 0
              ));
          c.containerWidth = e;
          c.containerHeight = l;
        }
      },
      initReflow: function () {
        var a = this,
          c;
        c = E(N, "resize", function (c) {
          a.reflow(c);
        });
        E(a, "destroy", c);
      },
      setSize: function (c, b, l) {
        var d = this,
          k = d.renderer;
        d.isResizing += 1;
        a.setAnimation(l, d);
        d.oldChartHeight = d.chartHeight;
        d.oldChartWidth = d.chartWidth;
        void 0 !== c && (d.options.chart.width = c);
        void 0 !== b && (d.options.chart.height = b);
        d.getChartSize();
        c = k.globalAnimation;
        (c ? B : m)(
          d.container,
          { width: d.chartWidth + "px", height: d.chartHeight + "px" },
          c
        );
        d.setChartSize(!0);
        k.setSize(d.chartWidth, d.chartHeight, l);
        g(d.axes, function (a) {
          a.isDirty = !0;
          a.setScale();
        });
        d.isDirtyLegend = !0;
        d.isDirtyBox = !0;
        d.layOutTitles();
        d.getMargins();
        d.redraw(l);
        d.oldChartHeight = null;
        p(d, "resize");
        M(function () {
          d &&
            p(d, "endResize", null, function () {
              --d.isResizing;
            });
        }, F(c).duration);
      },
      setChartSize: function (a) {
        function c(a) {
          a = y[a] || 0;
          return Math.max(z || a, a) / 2;
        }
        var b = this.inverted,
          l = this.renderer,
          d = this.chartWidth,
          k = this.chartHeight,
          f = this.options.chart,
          e = this.spacing,
          y = this.clipOffset,
          m,
          p,
          G,
          q,
          z;
        this.plotLeft = m = Math.round(this.plotLeft);
        this.plotTop = p = Math.round(this.plotTop);
        this.plotWidth = G = Math.max(0, Math.round(d - m - this.marginRight));
        this.plotHeight = q = Math.max(
          0,
          Math.round(k - p - this.marginBottom)
        );
        this.plotSizeX = b ? q : G;
        this.plotSizeY = b ? G : q;
        this.plotBorderWidth = f.plotBorderWidth || 0;
        this.spacingBox = l.spacingBox = {
          x: e[3],
          y: e[0],
          width: d - e[3] - e[1],
          height: k - e[0] - e[2],
        };
        this.plotBox = l.plotBox = { x: m, y: p, width: G, height: q };
        z = 2 * Math.floor(this.plotBorderWidth / 2);
        b = Math.ceil(c(3));
        l = Math.ceil(c(0));
        this.clipBox = {
          x: b,
          y: l,
          width: Math.floor(this.plotSizeX - c(1) - b),
          height: Math.max(0, Math.floor(this.plotSizeY - c(2) - l)),
        };
        a ||
          g(this.axes, function (a) {
            a.setAxisSize();
            a.setAxisTranslation();
          });
      },
      resetMargins: function () {
        var a = this,
          b = a.options.chart;
        g(["margin", "spacing"], function (c) {
          var l = b[c],
            d = H(l) ? l : [l, l, l, l];
          g(["Top", "Right", "Bottom", "Left"], function (l, k) {
            a[c][k] = G(b[c + l], d[k]);
          });
        });
        g(c, function (c, b) {
          a[c] = G(a.margin[b], a.spacing[b]);
        });
        a.axisOffset = [0, 0, 0, 0];
        a.clipOffset = [];
      },
      drawChartBox: function () {
        var a = this.options.chart,
          c = this.renderer,
          b = this.chartWidth,
          l = this.chartHeight,
          d = this.chartBackground,
          k = this.plotBackground,
          e = this.plotBorder,
          f,
          g = this.plotBGImage,
          y = a.backgroundColor,
          m = a.plotBackgroundColor,
          p = a.plotBackgroundImage,
          G,
          q = this.plotLeft,
          z = this.plotTop,
          h = this.plotWidth,
          w = this.plotHeight,
          I = this.plotBox,
          v = this.clipRect,
          n = this.clipBox,
          r = "animate";
        d ||
          ((this.chartBackground = d =
            c.rect().addClass("highcharts-background").add()),
          (r = "attr"));
        f = a.borderWidth || 0;
        G = f + (a.shadow ? 8 : 0);
        y = { fill: y || "none" };
        if (f || d["stroke-width"])
          (y.stroke = a.borderColor), (y["stroke-width"] = f);
        d.attr(y).shadow(a.shadow);
        d[r]({
          x: G / 2,
          y: G / 2,
          width: b - G - (f % 2),
          height: l - G - (f % 2),
          r: a.borderRadius,
        });
        r = "animate";
        k ||
          ((r = "attr"),
          (this.plotBackground = k =
            c.rect().addClass("highcharts-plot-background").add()));
        k[r](I);
        k.attr({ fill: m || "none" }).shadow(a.plotShadow);
        p &&
          (g
            ? g.animate(I)
            : (this.plotBGImage = c.image(p, q, z, h, w).add()));
        v
          ? v.animate({ width: n.width, height: n.height })
          : (this.clipRect = c.clipRect(n));
        r = "animate";
        e ||
          ((r = "attr"),
          (this.plotBorder = e =
            c
              .rect()
              .addClass("highcharts-plot-border")
              .attr({ zIndex: 1 })
              .add()));
        e.attr({
          stroke: a.plotBorderColor,
          "stroke-width": a.plotBorderWidth || 0,
          fill: "none",
        });
        e[r](e.crisp({ x: q, y: z, width: h, height: w }, -e.strokeWidth()));
        this.isDirtyBox = !1;
      },
      propFromSeries: function () {
        var a = this,
          c = a.options.chart,
          b,
          l = a.options.series,
          d,
          e;
        g(["inverted", "angular", "polar"], function (f) {
          b = k[c.type || c.defaultSeriesType];
          e = c[f] || (b && b.prototype[f]);
          for (d = l && l.length; !e && d--; )
            (b = k[l[d].type]) && b.prototype[f] && (e = !0);
          a[f] = e;
        });
      },
      linkSeries: function () {
        var a = this,
          c = a.series;
        g(c, function (a) {
          a.linkedSeries.length = 0;
        });
        g(c, function (c) {
          var b = c.options.linkedTo;
          q(b) &&
            (b = ":previous" === b ? a.series[c.index - 1] : a.get(b)) &&
            b.linkedParent !== c &&
            (b.linkedSeries.push(c),
            (c.linkedParent = b),
            (c.visible = G(c.options.visible, b.options.visible, c.visible)));
        });
      },
      renderSeries: function () {
        g(this.series, function (a) {
          a.translate();
          a.render();
        });
      },
      renderLabels: function () {
        var a = this,
          c = a.options.labels;
        c.items &&
          g(c.items, function (b) {
            var d = e(c.style, b.style),
              k = l(d.left) + a.plotLeft,
              f = l(d.top) + a.plotTop + 12;
            delete d.left;
            delete d.top;
            a.renderer.text(b.html, k, f).attr({ zIndex: 2 }).css(d).add();
          });
      },
      render: function () {
        var a = this.axes,
          c = this.renderer,
          b = this.options,
          l,
          d,
          k;
        this.setTitle();
        this.legend = new J(this, b.legend);
        this.getStacks && this.getStacks();
        this.getMargins(!0);
        this.setChartSize();
        b = this.plotWidth;
        l = this.plotHeight -= 21;
        g(a, function (a) {
          a.setScale();
        });
        this.getAxisMargins();
        d = 1.1 < b / this.plotWidth;
        k = 1.05 < l / this.plotHeight;
        if (d || k)
          g(a, function (a) {
            ((a.horiz && d) || (!a.horiz && k)) && a.setTickInterval(!0);
          }),
            this.getMargins();
        this.drawChartBox();
        this.hasCartesianSeries &&
          g(a, function (a) {
            a.visible && a.render();
          });
        this.seriesGroup ||
          (this.seriesGroup = c.g("series-group").attr({ zIndex: 3 }).add());
        this.renderSeries();
        this.renderLabels();
        this.addCredits();
        this.setResponsive && this.setResponsive();
        this.hasRendered = !0;
      },
      addCredits: function (a) {
        var c = this;
        a = w(!0, this.options.credits, a);
        a.enabled &&
          !this.credits &&
          ((this.credits = this.renderer
            .text(a.text + (this.mapCredits || ""), 0, 0)
            .addClass("highcharts-credits")
            .on("click", function () {
              a.href && (N.location.href = a.href);
            })
            .attr({ align: a.position.align, zIndex: 8 })
            .css(a.style)
            .add()
            .align(a.position)),
          (this.credits.update = function (a) {
            c.credits = c.credits.destroy();
            c.addCredits(a);
          }));
      },
      destroy: function () {
        var c = this,
          b = c.axes,
          d = c.series,
          l = c.container,
          k,
          f = l && l.parentNode;
        p(c, "destroy");
        c.renderer.forExport ? a.erase(t, c) : (t[c.index] = void 0);
        a.chartCount--;
        c.renderTo.removeAttribute("data-highcharts-chart");
        I(c);
        for (k = b.length; k--; ) b[k] = b[k].destroy();
        this.scroller && this.scroller.destroy && this.scroller.destroy();
        for (k = d.length; k--; ) d[k] = d[k].destroy();
        g(
          "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(
            " "
          ),
          function (a) {
            var b = c[a];
            b && b.destroy && (c[a] = b.destroy());
          }
        );
        l && ((l.innerHTML = ""), I(l), f && x(l));
        K(c, function (a, b) {
          delete c[b];
        });
      },
      isReadyToRender: function () {
        var a = this;
        return Q || N != N.top || "complete" === n.readyState
          ? !0
          : (n.attachEvent("onreadystatechange", function () {
              n.detachEvent("onreadystatechange", a.firstRender);
              "complete" === n.readyState && a.firstRender();
            }),
            !1);
      },
      firstRender: function () {
        var a = this,
          c = a.options;
        if (a.isReadyToRender()) {
          a.getContainer();
          p(a, "init");
          a.resetMargins();
          a.setChartSize();
          a.propFromSeries();
          a.getAxes();
          g(c.series || [], function (c) {
            a.initSeries(c);
          });
          a.linkSeries();
          p(a, "beforeRender");
          y && (a.pointer = new y(a, c));
          a.render();
          if (!a.renderer.imgCount && a.onload) a.onload();
          a.temporaryDisplay(!0);
        }
      },
      onload: function () {
        g(
          [this.callback].concat(this.callbacks),
          function (a) {
            a && void 0 !== this.index && a.apply(this, [this]);
          },
          this
        );
        p(this, "load");
        p(this, "render");
        f(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
        this.onload = null;
      },
    });
  })(L);
  (function (a) {
    var E,
      B = a.each,
      F = a.extend,
      D = a.erase,
      n = a.fireEvent,
      h = a.format,
      u = a.isArray,
      r = a.isNumber,
      x = a.pick,
      t = a.removeEvent;
    a.Point = E = function () {};
    a.Point.prototype = {
      init: function (a, f, g) {
        this.series = a;
        this.color = a.color;
        this.applyOptions(f, g);
        a.options.colorByPoint
          ? ((f = a.options.colors || a.chart.options.colors),
            (this.color = this.color || f[a.colorCounter]),
            (f = f.length),
            (g = a.colorCounter),
            a.colorCounter++,
            a.colorCounter === f && (a.colorCounter = 0))
          : (g = a.colorIndex);
        this.colorIndex = x(this.colorIndex, g);
        a.chart.pointCount++;
        return this;
      },
      applyOptions: function (a, f) {
        var g = this.series,
          e = g.options.pointValKey || g.pointValKey;
        a = E.prototype.optionsToObject.call(this, a);
        F(this, a);
        this.options = this.options ? F(this.options, a) : a;
        a.group && delete this.group;
        e && (this.y = this[e]);
        this.isNull = x(
          this.isValid && !this.isValid(),
          null === this.x || !r(this.y, !0)
        );
        this.selected && (this.state = "select");
        "name" in this &&
          void 0 === f &&
          g.xAxis &&
          g.xAxis.hasNames &&
          (this.x = g.xAxis.nameToX(this));
        void 0 === this.x &&
          g &&
          (this.x = void 0 === f ? g.autoIncrement(this) : f);
        return this;
      },
      optionsToObject: function (a) {
        var f = {},
          g = this.series,
          e = g.options.keys,
          d = e || g.pointArrayMap || ["y"],
          p = d.length,
          b = 0,
          m = 0;
        if (r(a) || null === a) f[d[0]] = a;
        else if (u(a))
          for (
            !e &&
            a.length > p &&
            ((g = typeof a[0]),
            "string" === g ? (f.name = a[0]) : "number" === g && (f.x = a[0]),
            b++);
            m < p;

          )
            (e && void 0 === a[b]) || (f[d[m]] = a[b]), b++, m++;
        else
          "object" === typeof a &&
            ((f = a),
            a.dataLabels && (g._hasPointLabels = !0),
            a.marker && (g._hasPointMarkers = !0));
        return f;
      },
      getClassName: function () {
        return (
          "highcharts-point" +
          (this.selected ? " highcharts-point-select" : "") +
          (this.negative ? " highcharts-negative" : "") +
          (this.isNull ? " highcharts-null-point" : "") +
          (void 0 !== this.colorIndex
            ? " highcharts-color-" + this.colorIndex
            : "") +
          (this.options.className ? " " + this.options.className : "") +
          (this.zone && this.zone.className
            ? " " + this.zone.className.replace("highcharts-negative", "")
            : "")
        );
      },
      getZone: function () {
        var a = this.series,
          f = a.zones,
          a = a.zoneAxis || "y",
          g = 0,
          e;
        for (e = f[g]; this[a] >= e.value; ) e = f[++g];
        e && e.color && !this.options.color && (this.color = e.color);
        return e;
      },
      destroy: function () {
        var a = this.series.chart,
          f = a.hoverPoints,
          g;
        a.pointCount--;
        f && (this.setState(), D(f, this), f.length || (a.hoverPoints = null));
        if (this === a.hoverPoint) this.onMouseOut();
        if (this.graphic || this.dataLabel) t(this), this.destroyElements();
        this.legendItem && a.legend.destroyItem(this);
        for (g in this) this[g] = null;
      },
      destroyElements: function () {
        for (
          var a = [
              "graphic",
              "dataLabel",
              "dataLabelUpper",
              "connector",
              "shadowGroup",
            ],
            f,
            g = 6;
          g--;

        )
          (f = a[g]), this[f] && (this[f] = this[f].destroy());
      },
      getLabelConfig: function () {
        return {
          x: this.category,
          y: this.y,
          color: this.color,
          colorIndex: this.colorIndex,
          key: this.name || this.category,
          series: this.series,
          point: this,
          percentage: this.percentage,
          total: this.total || this.stackTotal,
        };
      },
      tooltipFormatter: function (a) {
        var f = this.series,
          g = f.tooltipOptions,
          e = x(g.valueDecimals, ""),
          d = g.valuePrefix || "",
          p = g.valueSuffix || "";
        B(f.pointArrayMap || ["y"], function (b) {
          b = "{point." + b;
          if (d || p) a = a.replace(b + "}", d + b + "}" + p);
          a = a.replace(b + "}", b + ":,." + e + "f}");
        });
        return h(a, { point: this, series: this.series });
      },
      firePointEvent: function (a, f, g) {
        var e = this,
          d = this.series.options;
        (d.point.events[a] ||
          (e.options && e.options.events && e.options.events[a])) &&
          this.importEvents();
        "click" === a &&
          d.allowPointSelect &&
          (g = function (a) {
            e.select && e.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
          });
        n(this, a, f, g);
      },
      visible: !0,
    };
  })(L);
  (function (a) {
    var E = a.addEvent,
      B = a.animObject,
      F = a.arrayMax,
      D = a.arrayMin,
      n = a.correctFloat,
      h = a.Date,
      u = a.defaultOptions,
      r = a.defaultPlotOptions,
      x = a.defined,
      t = a.each,
      m = a.erase,
      f = a.extend,
      g = a.fireEvent,
      e = a.grep,
      d = a.isArray,
      p = a.isNumber,
      b = a.isString,
      A = a.merge,
      v = a.objectEach,
      H = a.pick,
      q = a.removeEvent,
      J = a.splat,
      c = a.SVGElement,
      w = a.syncTimeout,
      K = a.win;
    a.Series = a.seriesType(
      "line",
      null,
      {
        lineWidth: 2,
        allowPointSelect: !1,
        showCheckbox: !1,
        animation: { duration: 1e3 },
        events: {},
        marker: {
          lineWidth: 0,
          lineColor: "#ffffff",
          radius: 4,
          states: {
            hover: {
              animation: { duration: 50 },
              enabled: !0,
              radiusPlus: 2,
              lineWidthPlus: 1,
            },
            select: {
              fillColor: "#cccccc",
              lineColor: "#000000",
              lineWidth: 2,
            },
          },
        },
        point: { events: {} },
        dataLabels: {
          align: "center",
          formatter: function () {
            return null === this.y ? "" : a.numberFormat(this.y, -1);
          },
          style: {
            fontSize: "11px",
            fontWeight: "bold",
            color: "contrast",
            textOutline: "1px contrast",
          },
          verticalAlign: "bottom",
          x: 0,
          y: 0,
          padding: 5,
        },
        cropThreshold: 300,
        pointRange: 0,
        softThreshold: !0,
        states: {
          hover: {
            animation: { duration: 50 },
            lineWidthPlus: 1,
            marker: {},
            halo: { size: 10, opacity: 0.25 },
          },
          select: { marker: {} },
        },
        stickyTracking: !0,
        turboThreshold: 1e3,
        findNearestPointBy: "x",
      },
      {
        isCartesian: !0,
        pointClass: a.Point,
        sorted: !0,
        requireSorting: !0,
        directTouch: !1,
        axisTypes: ["xAxis", "yAxis"],
        colorCounter: 0,
        parallelArrays: ["x", "y"],
        coll: "series",
        init: function (a, c) {
          var b = this,
            d,
            k = a.series,
            e;
          b.chart = a;
          b.options = c = b.setOptions(c);
          b.linkedSeries = [];
          b.bindAxes();
          f(b, {
            name: c.name,
            state: "",
            visible: !1 !== c.visible,
            selected: !0 === c.selected,
          });
          d = c.events;
          v(d, function (a, c) {
            E(b, c, a);
          });
          if (
            (d && d.click) ||
            (c.point && c.point.events && c.point.events.click) ||
            c.allowPointSelect
          )
            a.runTrackerClick = !0;
          b.getColor();
          b.getSymbol();
          t(b.parallelArrays, function (a) {
            b[a + "Data"] = [];
          });
          b.setData(c.data, !1);
          b.isCartesian && (a.hasCartesianSeries = !0);
          k.length && (e = k[k.length - 1]);
          b._i = H(e && e._i, -1) + 1;
          a.orderSeries(this.insert(k));
        },
        insert: function (a) {
          var c = this.options.index,
            b;
          if (p(c)) {
            for (b = a.length; b--; )
              if (c >= H(a[b].options.index, a[b]._i)) {
                a.splice(b + 1, 0, this);
                break;
              }
            -1 === b && a.unshift(this);
            b += 1;
          } else a.push(this);
          return H(b, a.length - 1);
        },
        bindAxes: function () {
          var c = this,
            b = c.options,
            d = c.chart,
            e;
          t(c.axisTypes || [], function (l) {
            t(d[l], function (a) {
              e = a.options;
              if (
                b[l] === e.index ||
                (void 0 !== b[l] && b[l] === e.id) ||
                (void 0 === b[l] && 0 === e.index)
              )
                c.insert(a.series), (c[l] = a), (a.isDirty = !0);
            });
            c[l] || c.optionalAxis === l || a.error(18, !0);
          });
        },
        updateParallelArrays: function (a, c) {
          var b = a.series,
            d = arguments,
            k = p(c)
              ? function (d) {
                  var l = "y" === d && b.toYData ? b.toYData(a) : a[d];
                  b[d + "Data"][c] = l;
                }
              : function (a) {
                  Array.prototype[c].apply(
                    b[a + "Data"],
                    Array.prototype.slice.call(d, 2)
                  );
                };
          t(b.parallelArrays, k);
        },
        autoIncrement: function () {
          var a = this.options,
            c = this.xIncrement,
            b,
            d = a.pointIntervalUnit,
            c = H(c, a.pointStart, 0);
          this.pointInterval = b = H(this.pointInterval, a.pointInterval, 1);
          d &&
            ((a = new h(c)),
            "day" === d
              ? (a = +a[h.hcSetDate](a[h.hcGetDate]() + b))
              : "month" === d
              ? (a = +a[h.hcSetMonth](a[h.hcGetMonth]() + b))
              : "year" === d &&
                (a = +a[h.hcSetFullYear](a[h.hcGetFullYear]() + b)),
            (b = a - c));
          this.xIncrement = c + b;
          return c;
        },
        setOptions: function (a) {
          var c = this.chart,
            b = c.options,
            d = b.plotOptions,
            k = (c.userOptions || {}).plotOptions || {},
            e = d[this.type];
          this.userOptions = a;
          c = A(e, d.series, a);
          this.tooltipOptions = A(
            u.tooltip,
            u.plotOptions.series && u.plotOptions.series.tooltip,
            u.plotOptions[this.type].tooltip,
            b.tooltip.userOptions,
            d.series && d.series.tooltip,
            d[this.type].tooltip,
            a.tooltip
          );
          this.stickyTracking = H(
            a.stickyTracking,
            k[this.type] && k[this.type].stickyTracking,
            k.series && k.series.stickyTracking,
            this.tooltipOptions.shared && !this.noSharedTooltip
              ? !0
              : c.stickyTracking
          );
          null === e.marker && delete c.marker;
          this.zoneAxis = c.zoneAxis;
          a = this.zones = (c.zones || []).slice();
          (!c.negativeColor && !c.negativeFillColor) ||
            c.zones ||
            a.push({
              value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
              className: "highcharts-negative",
              color: c.negativeColor,
              fillColor: c.negativeFillColor,
            });
          a.length &&
            x(a[a.length - 1].value) &&
            a.push({ color: this.color, fillColor: this.fillColor });
          return c;
        },
        getCyclic: function (a, c, b) {
          var d,
            l = this.chart,
            e = this.userOptions,
            f = a + "Index",
            g = a + "Counter",
            y = b ? b.length : H(l.options.chart[a + "Count"], l[a + "Count"]);
          c ||
            ((d = H(e[f], e["_" + f])),
            x(d) ||
              (l.series.length || (l[g] = 0),
              (e["_" + f] = d = l[g] % y),
              (l[g] += 1)),
            b && (c = b[d]));
          void 0 !== d && (this[f] = d);
          this[a] = c;
        },
        getColor: function () {
          this.options.colorByPoint
            ? (this.options.color = null)
            : this.getCyclic(
                "color",
                this.options.color || r[this.type].color,
                this.chart.options.colors
              );
        },
        getSymbol: function () {
          this.getCyclic(
            "symbol",
            this.options.marker.symbol,
            this.chart.options.symbols
          );
        },
        drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
        setData: function (c, e, l, f) {
          var k = this,
            g = k.points,
            y = (g && g.length) || 0,
            q,
            m = k.options,
            h = k.chart,
            w = null,
            G = k.xAxis,
            I = m.turboThreshold,
            v = this.xData,
            n = this.yData,
            r = (q = k.pointArrayMap) && q.length;
          c = c || [];
          q = c.length;
          e = H(e, !0);
          if (
            !1 !== f &&
            q &&
            y === q &&
            !k.cropped &&
            !k.hasGroupedData &&
            k.visible
          )
            t(c, function (a, c) {
              g[c].update && a !== m.data[c] && g[c].update(a, !1, null, !1);
            });
          else {
            k.xIncrement = null;
            k.colorCounter = 0;
            t(this.parallelArrays, function (a) {
              k[a + "Data"].length = 0;
            });
            if (I && q > I) {
              for (l = 0; null === w && l < q; ) (w = c[l]), l++;
              if (p(w))
                for (l = 0; l < q; l++)
                  (v[l] = this.autoIncrement()), (n[l] = c[l]);
              else if (d(w))
                if (r)
                  for (l = 0; l < q; l++)
                    (w = c[l]), (v[l] = w[0]), (n[l] = w.slice(1, r + 1));
                else
                  for (l = 0; l < q; l++)
                    (w = c[l]), (v[l] = w[0]), (n[l] = w[1]);
              else a.error(12);
            } else
              for (l = 0; l < q; l++)
                void 0 !== c[l] &&
                  ((w = { series: k }),
                  k.pointClass.prototype.applyOptions.apply(w, [c[l]]),
                  k.updateParallelArrays(w, l));
            b(n[0]) && a.error(14, !0);
            k.data = [];
            k.options.data = k.userOptions.data = c;
            for (l = y; l--; ) g[l] && g[l].destroy && g[l].destroy();
            G && (G.minRange = G.userMinRange);
            k.isDirty = h.isDirtyBox = !0;
            k.isDirtyData = !!g;
            l = !1;
          }
          "point" === m.legendType &&
            (this.processData(), this.generatePoints());
          e && h.redraw(l);
        },
        processData: function (c) {
          var b = this.xData,
            d = this.yData,
            e = b.length,
            k;
          k = 0;
          var f,
            g,
            y = this.xAxis,
            p,
            q = this.options;
          p = q.cropThreshold;
          var m = this.getExtremesFromAll || q.getExtremesFromAll,
            w = this.isCartesian,
            q = y && y.val2lin,
            h = y && y.isLog,
            v,
            n;
          if (w && !this.isDirty && !y.isDirty && !this.yAxis.isDirty && !c)
            return !1;
          y && ((c = y.getExtremes()), (v = c.min), (n = c.max));
          if (w && this.sorted && !m && (!p || e > p || this.forceCrop))
            if (b[e - 1] < v || b[0] > n) (b = []), (d = []);
            else if (b[0] < v || b[e - 1] > n)
              (k = this.cropData(this.xData, this.yData, v, n)),
                (b = k.xData),
                (d = k.yData),
                (k = k.start),
                (f = !0);
          for (p = b.length || 1; --p; )
            (e = h ? q(b[p]) - q(b[p - 1]) : b[p] - b[p - 1]),
              0 < e && (void 0 === g || e < g)
                ? (g = e)
                : 0 > e && this.requireSorting && a.error(15);
          this.cropped = f;
          this.cropStart = k;
          this.processedXData = b;
          this.processedYData = d;
          this.closestPointRange = g;
        },
        cropData: function (a, c, b, d) {
          var l = a.length,
            e = 0,
            f = l,
            g = H(this.cropShoulder, 1),
            y;
          for (y = 0; y < l; y++)
            if (a[y] >= b) {
              e = Math.max(0, y - g);
              break;
            }
          for (b = y; b < l; b++)
            if (a[b] > d) {
              f = b + g;
              break;
            }
          return {
            xData: a.slice(e, f),
            yData: c.slice(e, f),
            start: e,
            end: f,
          };
        },
        generatePoints: function () {
          var a = this.options,
            c = a.data,
            b = this.data,
            d,
            k = this.processedXData,
            e = this.processedYData,
            f = this.pointClass,
            g = k.length,
            p = this.cropStart || 0,
            q,
            m = this.hasGroupedData,
            a = a.keys,
            w,
            h = [],
            v;
          b || m || ((b = []), (b.length = c.length), (b = this.data = b));
          a && m && (this.options.keys = !1);
          for (v = 0; v < g; v++)
            (q = p + v),
              m
                ? ((w = new f().init(this, [k[v]].concat(J(e[v])))),
                  (w.dataGroup = this.groupMap[v]))
                : (w = b[q]) ||
                  void 0 === c[q] ||
                  (b[q] = w = new f().init(this, c[q], k[v])),
              w && ((w.index = q), (h[v] = w));
          this.options.keys = a;
          if (b && (g !== (d = b.length) || m))
            for (v = 0; v < d; v++)
              v !== p || m || (v += g),
                b[v] && (b[v].destroyElements(), (b[v].plotX = void 0));
          this.data = b;
          this.points = h;
        },
        getExtremes: function (a) {
          var c = this.yAxis,
            b = this.processedXData,
            e,
            k = [],
            f = 0;
          e = this.xAxis.getExtremes();
          var g = e.min,
            y = e.max,
            q,
            m,
            w,
            h;
          a = a || this.stackedYData || this.processedYData || [];
          e = a.length;
          for (h = 0; h < e; h++)
            if (
              ((m = b[h]),
              (w = a[h]),
              (q =
                (p(w, !0) || d(w)) &&
                (!c.positiveValuesOnly || w.length || 0 < w)),
              (m =
                this.getExtremesFromAll ||
                this.options.getExtremesFromAll ||
                this.cropped ||
                ((b[h] || m) >= g && (b[h] || m) <= y)),
              q && m)
            )
              if ((q = w.length))
                for (; q--; ) null !== w[q] && (k[f++] = w[q]);
              else k[f++] = w;
          this.dataMin = D(k);
          this.dataMax = F(k);
        },
        translate: function () {
          this.processedXData || this.processData();
          this.generatePoints();
          var a = this.options,
            c = a.stacking,
            b = this.xAxis,
            d = b.categories,
            k = this.yAxis,
            e = this.points,
            f = e.length,
            g = !!this.modifyValue,
            q = a.pointPlacement,
            m = "between" === q || p(q),
            w = a.threshold,
            h = a.startFromThreshold ? w : 0,
            v,
            r,
            K,
            A,
            u = Number.MAX_VALUE;
          "between" === q && (q = 0.5);
          p(q) && (q *= H(a.pointRange || b.pointRange));
          for (a = 0; a < f; a++) {
            var t = e[a],
              J = t.x,
              B = t.y;
            r = t.low;
            var D =
                c &&
                k.stacks[
                  (this.negStacks && B < (h ? 0 : w) ? "-" : "") + this.stackKey
                ],
              E;
            k.positiveValuesOnly && null !== B && 0 >= B && (t.isNull = !0);
            t.plotX = v = n(
              Math.min(
                Math.max(
                  -1e5,
                  b.translate(J, 0, 0, 0, 1, q, "flags" === this.type)
                ),
                1e5
              )
            );
            c &&
              this.visible &&
              !t.isNull &&
              D &&
              D[J] &&
              ((A = this.getStackIndicator(A, J, this.index)),
              (E = D[J]),
              (B = E.points[A.key]),
              (r = B[0]),
              (B = B[1]),
              r === h && A.key === D[J].base && (r = H(w, k.min)),
              k.positiveValuesOnly && 0 >= r && (r = null),
              (t.total = t.stackTotal = E.total),
              (t.percentage = E.total && (t.y / E.total) * 100),
              (t.stackY = B),
              E.setOffset(this.pointXOffset || 0, this.barW || 0));
            t.yBottom = x(r) ? k.translate(r, 0, 1, 0, 1) : null;
            g && (B = this.modifyValue(B, t));
            t.plotY = r =
              "number" === typeof B && Infinity !== B
                ? Math.min(Math.max(-1e5, k.translate(B, 0, 1, 0, 1)), 1e5)
                : void 0;
            t.isInside =
              void 0 !== r && 0 <= r && r <= k.len && 0 <= v && v <= b.len;
            t.clientX = m ? n(b.translate(J, 0, 0, 0, 1, q)) : v;
            t.negative = t.y < (w || 0);
            t.category = d && void 0 !== d[t.x] ? d[t.x] : t.x;
            t.isNull ||
              (void 0 !== K && (u = Math.min(u, Math.abs(v - K))), (K = v));
            t.zone = this.zones.length && t.getZone();
          }
          this.closestPointRangePx = u;
        },
        getValidPoints: function (a, c) {
          var b = this.chart;
          return e(a || this.points || [], function (a) {
            return c && !b.isInsidePlot(a.plotX, a.plotY, b.inverted)
              ? !1
              : !a.isNull;
          });
        },
        setClip: function (a) {
          var c = this.chart,
            b = this.options,
            d = c.renderer,
            k = c.inverted,
            e = this.clipBox,
            f = e || c.clipBox,
            g =
              this.sharedClipKey ||
              [
                "_sharedClip",
                a && a.duration,
                a && a.easing,
                f.height,
                b.xAxis,
                b.yAxis,
              ].join(),
            p = c[g],
            q = c[g + "m"];
          p ||
            (a &&
              ((f.width = 0),
              (c[g + "m"] = q =
                d.clipRect(
                  -99,
                  k ? -c.plotLeft : -c.plotTop,
                  99,
                  k ? c.chartWidth : c.chartHeight
                ))),
            (c[g] = p = d.clipRect(f)),
            (p.count = { length: 0 }));
          a &&
            !p.count[this.index] &&
            ((p.count[this.index] = !0), (p.count.length += 1));
          !1 !== b.clip &&
            (this.group.clip(a || e ? p : c.clipRect),
            this.markerGroup.clip(q),
            (this.sharedClipKey = g));
          a ||
            (p.count[this.index] &&
              (delete p.count[this.index], --p.count.length),
            0 === p.count.length &&
              g &&
              c[g] &&
              (e || (c[g] = c[g].destroy()),
              c[g + "m"] && (c[g + "m"] = c[g + "m"].destroy())));
        },
        animate: function (a) {
          var c = this.chart,
            b = B(this.options.animation),
            d;
          a
            ? this.setClip(b)
            : ((d = this.sharedClipKey),
              (a = c[d]) && a.animate({ width: c.plotSizeX }, b),
              c[d + "m"] && c[d + "m"].animate({ width: c.plotSizeX + 99 }, b),
              (this.animate = null));
        },
        afterAnimate: function () {
          this.setClip();
          g(this, "afterAnimate");
        },
        drawPoints: function () {
          var a = this.points,
            c = this.chart,
            b,
            d,
            k,
            e,
            f = this.options.marker,
            g,
            q,
            m,
            w,
            h = this[this.specialGroup] || this.markerGroup,
            v = H(
              f.enabled,
              this.xAxis.isRadial ? !0 : null,
              this.closestPointRangePx >= 2 * f.radius
            );
          if (!1 !== f.enabled || this._hasPointMarkers)
            for (d = 0; d < a.length; d++)
              (k = a[d]),
                (b = k.plotY),
                (e = k.graphic),
                (g = k.marker || {}),
                (q = !!k.marker),
                (m = (v && void 0 === g.enabled) || g.enabled),
                (w = k.isInside),
                m && p(b) && null !== k.y
                  ? ((b = H(g.symbol, this.symbol)),
                    (k.hasImage = 0 === b.indexOf("url")),
                    (m = this.markerAttribs(k, k.selected && "select")),
                    e
                      ? e[w ? "show" : "hide"](!0).animate(m)
                      : w &&
                        (0 < m.width || k.hasImage) &&
                        (k.graphic = e =
                          c.renderer
                            .symbol(b, m.x, m.y, m.width, m.height, q ? g : f)
                            .add(h)),
                    e && e.attr(this.pointAttribs(k, k.selected && "select")),
                    e && e.addClass(k.getClassName(), !0))
                  : e && (k.graphic = e.destroy());
        },
        markerAttribs: function (a, c) {
          var b = this.options.marker,
            d = a.marker || {},
            k = H(d.radius, b.radius);
          c &&
            ((b = b.states[c]),
            (c = d.states && d.states[c]),
            (k = H(
              c && c.radius,
              b && b.radius,
              k + ((b && b.radiusPlus) || 0)
            )));
          a.hasImage && (k = 0);
          a = { x: Math.floor(a.plotX) - k, y: a.plotY - k };
          k && (a.width = a.height = 2 * k);
          return a;
        },
        pointAttribs: function (a, c) {
          var b = this.options.marker,
            d = a && a.options,
            k = (d && d.marker) || {},
            e = this.color,
            f = d && d.color,
            g = a && a.color,
            d = H(k.lineWidth, b.lineWidth);
          a = a && a.zone && a.zone.color;
          e = f || a || g || e;
          a = k.fillColor || b.fillColor || e;
          e = k.lineColor || b.lineColor || e;
          c &&
            ((b = b.states[c]),
            (c = (k.states && k.states[c]) || {}),
            (d = H(
              c.lineWidth,
              b.lineWidth,
              d + H(c.lineWidthPlus, b.lineWidthPlus, 0)
            )),
            (a = c.fillColor || b.fillColor || a),
            (e = c.lineColor || b.lineColor || e));
          return { stroke: e, "stroke-width": d, fill: a };
        },
        destroy: function () {
          var a = this,
            b = a.chart,
            d = /AppleWebKit\/533/.test(K.navigator.userAgent),
            e,
            k,
            f = a.data || [],
            p,
            w;
          g(a, "destroy");
          q(a);
          t(a.axisTypes || [], function (c) {
            (w = a[c]) &&
              w.series &&
              (m(w.series, a), (w.isDirty = w.forceRedraw = !0));
          });
          a.legendItem && a.chart.legend.destroyItem(a);
          for (k = f.length; k--; ) (p = f[k]) && p.destroy && p.destroy();
          a.points = null;
          clearTimeout(a.animationTimeout);
          v(a, function (a, b) {
            a instanceof c &&
              !a.survive &&
              ((e = d && "group" === b ? "hide" : "destroy"), a[e]());
          });
          b.hoverSeries === a && (b.hoverSeries = null);
          m(b.series, a);
          b.orderSeries();
          v(a, function (c, b) {
            delete a[b];
          });
        },
        getGraphPath: function (a, c, b) {
          var d = this,
            l = d.options,
            e = l.step,
            f,
            g = [],
            p = [],
            q;
          a = a || d.points;
          (f = a.reversed) && a.reverse();
          (e = { right: 1, center: 2 }[e] || (e && 3)) && f && (e = 4 - e);
          !l.connectNulls || c || b || (a = this.getValidPoints(a));
          t(a, function (k, f) {
            var m = k.plotX,
              w = k.plotY,
              h = a[f - 1];
            (k.leftCliff || (h && h.rightCliff)) && !b && (q = !0);
            k.isNull && !x(c) && 0 < f
              ? (q = !l.connectNulls)
              : k.isNull && !c
              ? (q = !0)
              : (0 === f || q
                  ? (f = ["M", k.plotX, k.plotY])
                  : d.getPointSpline
                  ? (f = d.getPointSpline(a, k, f))
                  : e
                  ? ((f =
                      1 === e
                        ? ["L", h.plotX, w]
                        : 2 === e
                        ? [
                            "L",
                            (h.plotX + m) / 2,
                            h.plotY,
                            "L",
                            (h.plotX + m) / 2,
                            w,
                          ]
                        : ["L", m, h.plotY]),
                    f.push("L", m, w))
                  : (f = ["L", m, w]),
                p.push(k.x),
                e && p.push(k.x),
                g.push.apply(g, f),
                (q = !1));
          });
          g.xMap = p;
          return (d.graphPath = g);
        },
        drawGraph: function () {
          var a = this,
            c = this.options,
            b = (this.gappedPath || this.getGraphPath).call(this),
            d = [
              [
                "graph",
                "highcharts-graph",
                c.lineColor || this.color,
                c.dashStyle,
              ],
            ];
          t(this.zones, function (b, l) {
            d.push([
              "zone-graph-" + l,
              "highcharts-graph highcharts-zone-graph-" +
                l +
                " " +
                (b.className || ""),
              b.color || a.color,
              b.dashStyle || c.dashStyle,
            ]);
          });
          t(d, function (d, l) {
            var k = d[0],
              e = a[k];
            e
              ? ((e.endX = b.xMap), e.animate({ d: b }))
              : b.length &&
                ((a[k] = a.chart.renderer
                  .path(b)
                  .addClass(d[1])
                  .attr({ zIndex: 1 })
                  .add(a.group)),
                (e = {
                  stroke: d[2],
                  "stroke-width": c.lineWidth,
                  fill: (a.fillGraph && a.color) || "none",
                }),
                d[3]
                  ? (e.dashstyle = d[3])
                  : "square" !== c.linecap &&
                    (e["stroke-linecap"] = e["stroke-linejoin"] = "round"),
                (e = a[k].attr(e).shadow(2 > l && c.shadow)));
            e && ((e.startX = b.xMap), (e.isArea = b.isArea));
          });
        },
        applyZones: function () {
          var a = this,
            c = this.chart,
            b = c.renderer,
            d = this.zones,
            k,
            e,
            f = this.clips || [],
            g,
            p = this.graph,
            q = this.area,
            m = Math.max(c.chartWidth, c.chartHeight),
            w = this[(this.zoneAxis || "y") + "Axis"],
            h,
            v,
            n = c.inverted,
            r,
            K,
            A,
            u,
            J = !1;
          d.length &&
            (p || q) &&
            w &&
            void 0 !== w.min &&
            ((v = w.reversed),
            (r = w.horiz),
            p && p.hide(),
            q && q.hide(),
            (h = w.getExtremes()),
            t(d, function (d, l) {
              k = v ? (r ? c.plotWidth : 0) : r ? 0 : w.toPixels(h.min);
              k = Math.min(Math.max(H(e, k), 0), m);
              e = Math.min(
                Math.max(Math.round(w.toPixels(H(d.value, h.max), !0)), 0),
                m
              );
              J && (k = e = w.toPixels(h.max));
              K = Math.abs(k - e);
              A = Math.min(k, e);
              u = Math.max(k, e);
              w.isXAxis
                ? ((g = { x: n ? u : A, y: 0, width: K, height: m }),
                  r || (g.x = c.plotHeight - g.x))
                : ((g = { x: 0, y: n ? u : A, width: m, height: K }),
                  r && (g.y = c.plotWidth - g.y));
              n &&
                b.isVML &&
                (g = w.isXAxis
                  ? { x: 0, y: v ? A : u, height: g.width, width: c.chartWidth }
                  : {
                      x: g.y - c.plotLeft - c.spacingBox.x,
                      y: 0,
                      width: g.height,
                      height: c.chartHeight,
                    });
              f[l]
                ? f[l].animate(g)
                : ((f[l] = b.clipRect(g)),
                  p && a["zone-graph-" + l].clip(f[l]),
                  q && a["zone-area-" + l].clip(f[l]));
              J = d.value > h.max;
            }),
            (this.clips = f));
        },
        invertGroups: function (a) {
          function c() {
            t(["group", "markerGroup"], function (c) {
              b[c] &&
                (d.renderer.isVML &&
                  b[c].attr({ width: b.yAxis.len, height: b.xAxis.len }),
                (b[c].width = b.yAxis.len),
                (b[c].height = b.xAxis.len),
                b[c].invert(a));
            });
          }
          var b = this,
            d = b.chart,
            k;
          b.xAxis &&
            ((k = E(d, "resize", c)),
            E(b, "destroy", k),
            c(a),
            (b.invertGroups = c));
        },
        plotGroup: function (a, c, b, d, k) {
          var l = this[a],
            e = !l;
          e &&
            (this[a] = l =
              this.chart.renderer
                .g()
                .attr({ zIndex: d || 0.1 })
                .add(k));
          l.addClass(
            "highcharts-" +
              c +
              " highcharts-series-" +
              this.index +
              " highcharts-" +
              this.type +
              "-series highcharts-color-" +
              this.colorIndex +
              " " +
              (this.options.className || ""),
            !0
          );
          l.attr({ visibility: b })[e ? "attr" : "animate"](this.getPlotBox());
          return l;
        },
        getPlotBox: function () {
          var a = this.chart,
            c = this.xAxis,
            b = this.yAxis;
          a.inverted && ((c = b), (b = this.xAxis));
          return {
            translateX: c ? c.left : a.plotLeft,
            translateY: b ? b.top : a.plotTop,
            scaleX: 1,
            scaleY: 1,
          };
        },
        render: function () {
          var a = this,
            c = a.chart,
            b,
            d = a.options,
            k = !!a.animate && c.renderer.isSVG && B(d.animation).duration,
            e = a.visible ? "inherit" : "hidden",
            f = d.zIndex,
            g = a.hasRendered,
            p = c.seriesGroup,
            q = c.inverted;
          b = a.plotGroup("group", "series", e, f, p);
          a.markerGroup = a.plotGroup("markerGroup", "markers", e, f, p);
          k && a.animate(!0);
          b.inverted = a.isCartesian ? q : !1;
          a.drawGraph && (a.drawGraph(), a.applyZones());
          a.drawDataLabels && a.drawDataLabels();
          a.visible && a.drawPoints();
          a.drawTracker &&
            !1 !== a.options.enableMouseTracking &&
            a.drawTracker();
          a.invertGroups(q);
          !1 === d.clip || a.sharedClipKey || g || b.clip(c.clipRect);
          k && a.animate();
          g ||
            (a.animationTimeout = w(function () {
              a.afterAnimate();
            }, k));
          a.isDirty = !1;
          a.hasRendered = !0;
        },
        redraw: function () {
          var a = this.chart,
            c = this.isDirty || this.isDirtyData,
            b = this.group,
            d = this.xAxis,
            k = this.yAxis;
          b &&
            (a.inverted && b.attr({ width: a.plotWidth, height: a.plotHeight }),
            b.animate({
              translateX: H(d && d.left, a.plotLeft),
              translateY: H(k && k.top, a.plotTop),
            }));
          this.translate();
          this.render();
          c && delete this.kdTree;
        },
        kdAxisArray: ["clientX", "plotY"],
        searchPoint: function (a, c) {
          var b = this.xAxis,
            d = this.yAxis,
            k = this.chart.inverted;
          return this.searchKDTree(
            {
              clientX: k ? b.len - a.chartY + b.pos : a.chartX - b.pos,
              plotY: k ? d.len - a.chartX + d.pos : a.chartY - d.pos,
            },
            c
          );
        },
        buildKDTree: function () {
          function a(b, d, l) {
            var k, e;
            if ((e = b && b.length))
              return (
                (k = c.kdAxisArray[d % l]),
                b.sort(function (a, c) {
                  return a[k] - c[k];
                }),
                (e = Math.floor(e / 2)),
                {
                  point: b[e],
                  left: a(b.slice(0, e), d + 1, l),
                  right: a(b.slice(e + 1), d + 1, l),
                }
              );
          }
          this.buildingKdTree = !0;
          var c = this,
            b = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          delete c.kdTree;
          w(
            function () {
              c.kdTree = a(c.getValidPoints(null, !c.directTouch), b, b);
              c.buildingKdTree = !1;
            },
            c.options.kdNow ? 0 : 1
          );
        },
        searchKDTree: function (a, c) {
          function b(a, c, l, g) {
            var p = c.point,
              q = d.kdAxisArray[l % g],
              m,
              w,
              h = p;
            w = x(a[k]) && x(p[k]) ? Math.pow(a[k] - p[k], 2) : null;
            m = x(a[e]) && x(p[e]) ? Math.pow(a[e] - p[e], 2) : null;
            m = (w || 0) + (m || 0);
            p.dist = x(m) ? Math.sqrt(m) : Number.MAX_VALUE;
            p.distX = x(w) ? Math.sqrt(w) : Number.MAX_VALUE;
            q = a[q] - p[q];
            m = 0 > q ? "left" : "right";
            w = 0 > q ? "right" : "left";
            c[m] && ((m = b(a, c[m], l + 1, g)), (h = m[f] < h[f] ? m : p));
            c[w] &&
              Math.sqrt(q * q) < h[f] &&
              ((a = b(a, c[w], l + 1, g)), (h = a[f] < h[f] ? a : h));
            return h;
          }
          var d = this,
            k = this.kdAxisArray[0],
            e = this.kdAxisArray[1],
            f = c ? "distX" : "dist";
          c = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          this.kdTree || this.buildingKdTree || this.buildKDTree();
          if (this.kdTree) return b(a, this.kdTree, c, c);
        },
      }
    );
  })(L);
  (function (a) {
    function E(a, f, g, e, d) {
      var p = a.chart.inverted;
      this.axis = a;
      this.isNegative = g;
      this.options = f;
      this.x = e;
      this.total = null;
      this.points = {};
      this.stack = d;
      this.rightCliff = this.leftCliff = 0;
      this.alignOptions = {
        align: f.align || (p ? (g ? "left" : "right") : "center"),
        verticalAlign: f.verticalAlign || (p ? "middle" : g ? "bottom" : "top"),
        y: t(f.y, p ? 4 : g ? 14 : -6),
        x: t(f.x, p ? (g ? -6 : 6) : 0),
      };
      this.textAlign = f.textAlign || (p ? (g ? "right" : "left") : "center");
    }
    var B = a.Axis,
      F = a.Chart,
      D = a.correctFloat,
      n = a.defined,
      h = a.destroyObjectProperties,
      u = a.each,
      r = a.format,
      x = a.objectEach,
      t = a.pick;
    a = a.Series;
    E.prototype = {
      destroy: function () {
        h(this, this.axis);
      },
      render: function (a) {
        var f = this.options,
          g = f.format,
          g = g ? r(g, this) : f.formatter.call(this);
        this.label
          ? this.label.attr({ text: g, visibility: "hidden" })
          : (this.label = this.axis.chart.renderer
              .text(g, null, null, f.useHTML)
              .css(f.style)
              .attr({
                align: this.textAlign,
                rotation: f.rotation,
                visibility: "hidden",
              })
              .add(a));
      },
      setOffset: function (a, f) {
        var g = this.axis,
          e = g.chart,
          d = e.inverted,
          p = g.reversed,
          p = (this.isNegative && !p) || (!this.isNegative && p),
          b = g.translate(g.usePercentage ? 100 : this.total, 0, 0, 0, 1),
          g = g.translate(0),
          g = Math.abs(b - g);
        a = e.xAxis[0].translate(this.x) + a;
        var m = e.plotHeight,
          d = {
            x: d ? (p ? b : b - g) : a,
            y: d ? m - a - f : p ? m - b - g : m - b,
            width: d ? g : f,
            height: d ? f : g,
          };
        if ((f = this.label))
          f.align(this.alignOptions, null, d),
            (d = f.alignAttr),
            f[
              !1 === this.options.crop || e.isInsidePlot(d.x, d.y)
                ? "show"
                : "hide"
            ](!0);
      },
    };
    F.prototype.getStacks = function () {
      var a = this;
      u(a.yAxis, function (a) {
        a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks);
      });
      u(a.series, function (f) {
        !f.options.stacking ||
          (!0 !== f.visible && !1 !== a.options.chart.ignoreHiddenSeries) ||
          (f.stackKey = f.type + t(f.options.stack, ""));
      });
    };
    B.prototype.buildStacks = function () {
      var a = this.series,
        f,
        g = t(this.options.reversedStacks, !0),
        e = a.length,
        d;
      if (!this.isXAxis) {
        this.usePercentage = !1;
        for (d = e; d--; ) a[g ? d : e - d - 1].setStackedPoints();
        for (d = e; d--; )
          (f = a[g ? d : e - d - 1]), f.setStackCliffs && f.setStackCliffs();
        if (this.usePercentage) for (d = 0; d < e; d++) a[d].setPercentStacks();
      }
    };
    B.prototype.renderStackTotals = function () {
      var a = this.chart,
        f = a.renderer,
        g = this.stacks,
        e = this.stackTotalGroup;
      e ||
        (this.stackTotalGroup = e =
          f.g("stack-labels").attr({ visibility: "visible", zIndex: 6 }).add());
      e.translate(a.plotLeft, a.plotTop);
      x(g, function (a) {
        x(a, function (a) {
          a.render(e);
        });
      });
    };
    B.prototype.resetStacks = function () {
      var a = this,
        f = a.stacks;
      a.isXAxis ||
        x(f, function (f) {
          x(f, function (e, d) {
            e.touched < a.stacksTouched
              ? (e.destroy(), delete f[d])
              : ((e.total = null), (e.cum = null));
          });
        });
    };
    B.prototype.cleanStacks = function () {
      var a;
      this.isXAxis ||
        (this.oldStacks && (a = this.stacks = this.oldStacks),
        x(a, function (a) {
          x(a, function (a) {
            a.cum = a.total;
          });
        }));
    };
    a.prototype.setStackedPoints = function () {
      if (
        this.options.stacking &&
        (!0 === this.visible ||
          !1 === this.chart.options.chart.ignoreHiddenSeries)
      ) {
        var a = this.processedXData,
          f = this.processedYData,
          g = [],
          e = f.length,
          d = this.options,
          p = d.threshold,
          b = d.startFromThreshold ? p : 0,
          h = d.stack,
          d = d.stacking,
          v = this.stackKey,
          r = "-" + v,
          q = this.negStacks,
          u = this.yAxis,
          c = u.stacks,
          w = u.oldStacks,
          K,
          y,
          G,
          l,
          I,
          k,
          z;
        u.stacksTouched += 1;
        for (I = 0; I < e; I++)
          (k = a[I]),
            (z = f[I]),
            (K = this.getStackIndicator(K, k, this.index)),
            (l = K.key),
            (G = (y = q && z < (b ? 0 : p)) ? r : v),
            c[G] || (c[G] = {}),
            c[G][k] ||
              (w[G] && w[G][k]
                ? ((c[G][k] = w[G][k]), (c[G][k].total = null))
                : (c[G][k] = new E(u, u.options.stackLabels, y, k, h))),
            (G = c[G][k]),
            null !== z &&
              ((G.points[l] = G.points[this.index] = [t(G.cum, b)]),
              n(G.cum) || (G.base = l),
              (G.touched = u.stacksTouched),
              0 < K.index &&
                !1 === this.singleStacks &&
                (G.points[l][0] = G.points[this.index + "," + k + ",0"][0])),
            "percent" === d
              ? ((y = y ? v : r),
                q && c[y] && c[y][k]
                  ? ((y = c[y][k]),
                    (G.total = y.total =
                      Math.max(y.total, G.total) + Math.abs(z) || 0))
                  : (G.total = D(G.total + (Math.abs(z) || 0))))
              : (G.total = D(G.total + (z || 0))),
            (G.cum = t(G.cum, b) + (z || 0)),
            null !== z && (G.points[l].push(G.cum), (g[I] = G.cum));
        "percent" === d && (u.usePercentage = !0);
        this.stackedYData = g;
        u.oldStacks = {};
      }
    };
    a.prototype.setPercentStacks = function () {
      var a = this,
        f = a.stackKey,
        g = a.yAxis.stacks,
        e = a.processedXData,
        d;
      u([f, "-" + f], function (f) {
        for (var b = e.length, p, h; b--; )
          if (
            ((p = e[b]),
            (d = a.getStackIndicator(d, p, a.index, f)),
            (p = (h = g[f] && g[f][p]) && h.points[d.key]))
          )
            (h = h.total ? 100 / h.total : 0),
              (p[0] = D(p[0] * h)),
              (p[1] = D(p[1] * h)),
              (a.stackedYData[b] = p[1]);
      });
    };
    a.prototype.getStackIndicator = function (a, f, g, e) {
      !n(a) || a.x !== f || (e && a.key !== e)
        ? (a = { x: f, index: 0, key: e })
        : a.index++;
      a.key = [g, f, a.index].join();
      return a;
    };
  })(L);
  (function (a) {
    var E = a.addEvent,
      B = a.animate,
      F = a.Axis,
      D = a.createElement,
      n = a.css,
      h = a.defined,
      u = a.each,
      r = a.erase,
      x = a.extend,
      t = a.fireEvent,
      m = a.inArray,
      f = a.isNumber,
      g = a.isObject,
      e = a.isArray,
      d = a.merge,
      p = a.objectEach,
      b = a.pick,
      A = a.Point,
      v = a.Series,
      H = a.seriesTypes,
      q = a.setAnimation,
      J = a.splat;
    x(a.Chart.prototype, {
      addSeries: function (a, d, e) {
        var c,
          f = this;
        a &&
          ((d = b(d, !0)),
          t(f, "addSeries", { options: a }, function () {
            c = f.initSeries(a);
            f.isDirtyLegend = !0;
            f.linkSeries();
            d && f.redraw(e);
          }));
        return c;
      },
      addAxis: function (a, e, f, g) {
        var c = e ? "xAxis" : "yAxis",
          l = this.options;
        a = d(a, { index: this[c].length, isX: e });
        new F(this, a);
        l[c] = J(l[c] || {});
        l[c].push(a);
        b(f, !0) && this.redraw(g);
      },
      showLoading: function (a) {
        var c = this,
          b = c.options,
          d = c.loadingDiv,
          e = b.loading,
          l = function () {
            d &&
              n(d, {
                left: c.plotLeft + "px",
                top: c.plotTop + "px",
                width: c.plotWidth + "px",
                height: c.plotHeight + "px",
              });
          };
        d ||
          ((c.loadingDiv = d =
            D(
              "div",
              { className: "highcharts-loading highcharts-loading-hidden" },
              null,
              c.container
            )),
          (c.loadingSpan = D(
            "span",
            { className: "highcharts-loading-inner" },
            null,
            d
          )),
          E(c, "redraw", l));
        d.className = "highcharts-loading";
        c.loadingSpan.innerHTML = a || b.lang.loading;
        n(d, x(e.style, { zIndex: 10 }));
        n(c.loadingSpan, e.labelStyle);
        c.loadingShown ||
          (n(d, { opacity: 0, display: "" }),
          B(
            d,
            { opacity: e.style.opacity || 0.5 },
            { duration: e.showDuration || 0 }
          ));
        c.loadingShown = !0;
        l();
      },
      hideLoading: function () {
        var a = this.options,
          b = this.loadingDiv;
        b &&
          ((b.className = "highcharts-loading highcharts-loading-hidden"),
          B(
            b,
            { opacity: 0 },
            {
              duration: a.loading.hideDuration || 100,
              complete: function () {
                n(b, { display: "none" });
              },
            }
          ));
        this.loadingShown = !1;
      },
      propsRequireDirtyBox:
        "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(
          " "
        ),
      propsRequireUpdateSeries:
        "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(
          " "
        ),
      update: function (a, e) {
        var c = this,
          g = {
            credits: "addCredits",
            title: "setTitle",
            subtitle: "setSubtitle",
          },
          q = a.chart,
          l,
          w;
        if (q) {
          d(!0, c.options.chart, q);
          "className" in q && c.setClassName(q.className);
          if ("inverted" in q || "polar" in q) c.propFromSeries(), (l = !0);
          "alignTicks" in q && (l = !0);
          p(q, function (a, b) {
            -1 !== m("chart." + b, c.propsRequireUpdateSeries) && (w = !0);
            -1 !== m(b, c.propsRequireDirtyBox) && (c.isDirtyBox = !0);
          });
          "style" in q && c.renderer.setStyle(q.style);
        }
        a.colors && (this.options.colors = a.colors);
        a.plotOptions && d(!0, this.options.plotOptions, a.plotOptions);
        p(a, function (a, b) {
          if (c[b] && "function" === typeof c[b].update) c[b].update(a, !1);
          else if ("function" === typeof c[g[b]]) c[g[b]](a);
          "chart" !== b && -1 !== m(b, c.propsRequireUpdateSeries) && (w = !0);
        });
        u("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
          a[b] &&
            u(J(a[b]), function (a, d) {
              (d = (h(a.id) && c.get(a.id)) || c[b][d]) &&
                d.coll === b &&
                d.update(a, !1);
            });
        });
        l &&
          u(c.axes, function (a) {
            a.update({}, !1);
          });
        w &&
          u(c.series, function (a) {
            a.update({}, !1);
          });
        a.loading && d(!0, c.options.loading, a.loading);
        l = q && q.width;
        q = q && q.height;
        (f(l) && l !== c.chartWidth) || (f(q) && q !== c.chartHeight)
          ? c.setSize(l, q)
          : b(e, !0) && c.redraw();
      },
      setSubtitle: function (a) {
        this.setTitle(void 0, a);
      },
    });
    x(A.prototype, {
      update: function (a, d, e, f) {
        function c() {
          l.applyOptions(a);
          null === l.y && k && (l.graphic = k.destroy());
          g(a, !0) &&
            (k &&
              k.element &&
              a &&
              a.marker &&
              a.marker.symbol &&
              (l.graphic = k.destroy()),
            a &&
              a.dataLabels &&
              l.dataLabel &&
              (l.dataLabel = l.dataLabel.destroy()));
          q = l.index;
          p.updateParallelArrays(l, q);
          w.data[q] = g(w.data[q], !0) || g(a, !0) ? l.options : a;
          p.isDirty = p.isDirtyData = !0;
          !p.fixedBox && p.hasCartesianSeries && (h.isDirtyBox = !0);
          "point" === w.legendType && (h.isDirtyLegend = !0);
          d && h.redraw(e);
        }
        var l = this,
          p = l.series,
          k = l.graphic,
          q,
          h = p.chart,
          w = p.options;
        d = b(d, !0);
        !1 === f ? c() : l.firePointEvent("update", { options: a }, c);
      },
      remove: function (a, b) {
        this.series.removePoint(m(this, this.series.data), a, b);
      },
    });
    x(v.prototype, {
      addPoint: function (a, d, e, f) {
        var c = this.options,
          l = this.data,
          g = this.chart,
          k = this.xAxis,
          k = k && k.hasNames && k.names,
          p = c.data,
          q,
          h,
          m = this.xData,
          w,
          v;
        d = b(d, !0);
        q = { series: this };
        this.pointClass.prototype.applyOptions.apply(q, [a]);
        v = q.x;
        w = m.length;
        if (this.requireSorting && v < m[w - 1])
          for (h = !0; w && m[w - 1] > v; ) w--;
        this.updateParallelArrays(q, "splice", w, 0, 0);
        this.updateParallelArrays(q, w);
        k && q.name && (k[v] = q.name);
        p.splice(w, 0, a);
        h && (this.data.splice(w, 0, null), this.processData());
        "point" === c.legendType && this.generatePoints();
        e &&
          (l[0] && l[0].remove
            ? l[0].remove(!1)
            : (l.shift(), this.updateParallelArrays(q, "shift"), p.shift()));
        this.isDirtyData = this.isDirty = !0;
        d && g.redraw(f);
      },
      removePoint: function (a, d, e) {
        var c = this,
          f = c.data,
          l = f[a],
          g = c.points,
          k = c.chart,
          p = function () {
            g && g.length === f.length && g.splice(a, 1);
            f.splice(a, 1);
            c.options.data.splice(a, 1);
            c.updateParallelArrays(l || { series: c }, "splice", a, 1);
            l && l.destroy();
            c.isDirty = !0;
            c.isDirtyData = !0;
            d && k.redraw();
          };
        q(e, k);
        d = b(d, !0);
        l ? l.firePointEvent("remove", null, p) : p();
      },
      remove: function (a, d, e) {
        function c() {
          f.destroy();
          l.isDirtyLegend = l.isDirtyBox = !0;
          l.linkSeries();
          b(a, !0) && l.redraw(d);
        }
        var f = this,
          l = f.chart;
        !1 !== e ? t(f, "remove", null, c) : c();
      },
      update: function (a, e) {
        var c = this,
          f = c.chart,
          g = c.userOptions,
          l = c.oldType || c.type,
          p = a.type || g.type || f.options.chart.type,
          k = H[l].prototype,
          q = ["group", "markerGroup", "dataLabelsGroup"],
          h;
        if (Object.keys && "data" === Object.keys(a).toString())
          return this.setData(a.data, e);
        if ((p && p !== l) || void 0 !== a.zIndex) q.length = 0;
        u(q, function (a) {
          q[a] = c[a];
          delete c[a];
        });
        a = d(
          g,
          { animation: !1, index: c.index, pointStart: c.xData[0] },
          { data: c.options.data },
          a
        );
        c.remove(!1, null, !1);
        for (h in k) c[h] = void 0;
        x(c, H[p || l].prototype);
        u(q, function (a) {
          c[a] = q[a];
        });
        c.init(f, a);
        c.oldType = l;
        f.linkSeries();
        b(e, !0) && f.redraw(!1);
      },
    });
    x(F.prototype, {
      update: function (a, e) {
        var c = this.chart;
        a = c.options[this.coll][this.options.index] = d(this.userOptions, a);
        this.destroy(!0);
        this.init(c, x(a, { events: void 0 }));
        c.isDirtyBox = !0;
        b(e, !0) && c.redraw();
      },
      remove: function (a) {
        for (
          var c = this.chart, d = this.coll, f = this.series, g = f.length;
          g--;

        )
          f[g] && f[g].remove(!1);
        r(c.axes, this);
        r(c[d], this);
        e(c.options[d])
          ? c.options[d].splice(this.options.index, 1)
          : delete c.options[d];
        u(c[d], function (a, c) {
          a.options.index = c;
        });
        this.destroy();
        c.isDirtyBox = !0;
        b(a, !0) && c.redraw();
      },
      setTitle: function (a, b) {
        this.update({ title: a }, b);
      },
      setCategories: function (a, b) {
        this.update({ categories: a }, b);
      },
    });
  })(L);
  (function (a) {
    var E = a.color,
      B = a.each,
      F = a.map,
      D = a.pick,
      n = a.Series,
      h = a.seriesType;
    h(
      "area",
      "line",
      { softThreshold: !1, threshold: 0 },
      {
        singleStacks: !1,
        getStackPoints: function () {
          var h = [],
            n = [],
            x = this.xAxis,
            t = this.yAxis,
            m = t.stacks[this.stackKey],
            f = {},
            g = this.points,
            e = this.index,
            d = t.series,
            p = d.length,
            b,
            A = D(t.options.reversedStacks, !0) ? 1 : -1,
            v;
          if (this.options.stacking) {
            for (v = 0; v < g.length; v++) f[g[v].x] = g[v];
            a.objectEach(m, function (a, b) {
              null !== a.total && n.push(b);
            });
            n.sort(function (a, b) {
              return a - b;
            });
            b = F(d, function () {
              return this.visible;
            });
            B(n, function (a, d) {
              var g = 0,
                c,
                q;
              if (f[a] && !f[a].isNull)
                h.push(f[a]),
                  B([-1, 1], function (g) {
                    var h = 1 === g ? "rightNull" : "leftNull",
                      w = 0,
                      l = m[n[d + g]];
                    if (l)
                      for (v = e; 0 <= v && v < p; )
                        (c = l.points[v]),
                          c ||
                            (v === e
                              ? (f[a][h] = !0)
                              : b[v] &&
                                (q = m[a].points[v]) &&
                                (w -= q[1] - q[0])),
                          (v += A);
                    f[a][1 === g ? "rightCliff" : "leftCliff"] = w;
                  });
              else {
                for (v = e; 0 <= v && v < p; ) {
                  if ((c = m[a].points[v])) {
                    g = c[1];
                    break;
                  }
                  v += A;
                }
                g = t.translate(g, 0, 1, 0, 1);
                h.push({
                  isNull: !0,
                  plotX: x.translate(a, 0, 0, 0, 1),
                  x: a,
                  plotY: g,
                  yBottom: g,
                });
              }
            });
          }
          return h;
        },
        getGraphPath: function (a) {
          var h = n.prototype.getGraphPath,
            u = this.options,
            t = u.stacking,
            m = this.yAxis,
            f,
            g,
            e = [],
            d = [],
            p = this.index,
            b,
            A = m.stacks[this.stackKey],
            v = u.threshold,
            H = m.getThreshold(u.threshold),
            q,
            u = u.connectNulls || "percent" === t,
            J = function (c, f, g) {
              var q = a[c];
              c = t && A[q.x].points[p];
              var h = q[g + "Null"] || 0;
              g = q[g + "Cliff"] || 0;
              var l,
                w,
                q = !0;
              g || h
                ? ((l = (h ? c[0] : c[1]) + g), (w = c[0] + g), (q = !!h))
                : !t && a[f] && a[f].isNull && (l = w = v);
              void 0 !== l &&
                (d.push({
                  plotX: b,
                  plotY: null === l ? H : m.getThreshold(l),
                  isNull: q,
                  isCliff: !0,
                }),
                e.push({
                  plotX: b,
                  plotY: null === w ? H : m.getThreshold(w),
                  doCurve: !1,
                }));
            };
          a = a || this.points;
          t && (a = this.getStackPoints());
          for (f = 0; f < a.length; f++)
            if (
              ((g = a[f].isNull),
              (b = D(a[f].rectPlotX, a[f].plotX)),
              (q = D(a[f].yBottom, H)),
              !g || u)
            )
              u || J(f, f - 1, "left"),
                (g && !t && u) ||
                  (d.push(a[f]), e.push({ x: f, plotX: b, plotY: q })),
                u || J(f, f + 1, "right");
          f = h.call(this, d, !0, !0);
          e.reversed = !0;
          g = h.call(this, e, !0, !0);
          g.length && (g[0] = "L");
          g = f.concat(g);
          h = h.call(this, d, !1, u);
          g.xMap = f.xMap;
          this.areaPath = g;
          return h;
        },
        drawGraph: function () {
          this.areaPath = [];
          n.prototype.drawGraph.apply(this);
          var a = this,
            h = this.areaPath,
            x = this.options,
            t = [["area", "highcharts-area", this.color, x.fillColor]];
          B(this.zones, function (h, f) {
            t.push([
              "zone-area-" + f,
              "highcharts-area highcharts-zone-area-" + f + " " + h.className,
              h.color || a.color,
              h.fillColor || x.fillColor,
            ]);
          });
          B(t, function (m) {
            var f = m[0],
              g = a[f];
            g
              ? ((g.endX = h.xMap), g.animate({ d: h }))
              : ((g = a[f] =
                  a.chart.renderer
                    .path(h)
                    .addClass(m[1])
                    .attr({
                      fill: D(
                        m[3],
                        E(m[2]).setOpacity(D(x.fillOpacity, 0.75)).get()
                      ),
                      zIndex: 0,
                    })
                    .add(a.group)),
                (g.isArea = !0));
            g.startX = h.xMap;
            g.shiftUnit = x.step ? 2 : 1;
          });
        },
        drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
      }
    );
  })(L);
  (function (a) {
    var E = a.pick;
    a = a.seriesType;
    a(
      "spline",
      "line",
      {},
      {
        getPointSpline: function (a, F, D) {
          var n = F.plotX,
            h = F.plotY,
            u = a[D - 1];
          D = a[D + 1];
          var r, x, t, m;
          if (
            u &&
            !u.isNull &&
            !1 !== u.doCurve &&
            !F.isCliff &&
            D &&
            !D.isNull &&
            !1 !== D.doCurve &&
            !F.isCliff
          ) {
            a = u.plotY;
            t = D.plotX;
            D = D.plotY;
            var f = 0;
            r = (1.5 * n + u.plotX) / 2.5;
            x = (1.5 * h + a) / 2.5;
            t = (1.5 * n + t) / 2.5;
            m = (1.5 * h + D) / 2.5;
            t !== r && (f = ((m - x) * (t - n)) / (t - r) + h - m);
            x += f;
            m += f;
            x > a && x > h
              ? ((x = Math.max(a, h)), (m = 2 * h - x))
              : x < a && x < h && ((x = Math.min(a, h)), (m = 2 * h - x));
            m > D && m > h
              ? ((m = Math.max(D, h)), (x = 2 * h - m))
              : m < D && m < h && ((m = Math.min(D, h)), (x = 2 * h - m));
            F.rightContX = t;
            F.rightContY = m;
          }
          F = [
            "C",
            E(u.rightContX, u.plotX),
            E(u.rightContY, u.plotY),
            E(r, n),
            E(x, h),
            n,
            h,
          ];
          u.rightContX = u.rightContY = null;
          return F;
        },
      }
    );
  })(L);
  (function (a) {
    var E = a.seriesTypes.area.prototype,
      B = a.seriesType;
    B("areaspline", "spline", a.defaultPlotOptions.area, {
      getStackPoints: E.getStackPoints,
      getGraphPath: E.getGraphPath,
      setStackCliffs: E.setStackCliffs,
      drawGraph: E.drawGraph,
      drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
    });
  })(L);
  (function (a) {
    var E = a.animObject,
      B = a.color,
      F = a.each,
      D = a.extend,
      n = a.isNumber,
      h = a.merge,
      u = a.pick,
      r = a.Series,
      x = a.seriesType,
      t = a.svg;
    x(
      "column",
      "line",
      {
        borderRadius: 0,
        crisp: !0,
        groupPadding: 0.2,
        marker: null,
        pointPadding: 0.1,
        minPointLength: 0,
        cropThreshold: 50,
        pointRange: null,
        states: {
          hover: { halo: !1, brightness: 0.1, shadow: !1 },
          select: { color: "#cccccc", borderColor: "#000000", shadow: !1 },
        },
        dataLabels: { align: null, verticalAlign: null, y: null },
        softThreshold: !1,
        startFromThreshold: !0,
        stickyTracking: !1,
        tooltip: { distance: 6 },
        threshold: 0,
        borderColor: "#ffffff",
      },
      {
        cropShoulder: 0,
        directTouch: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
        negStacks: !0,
        init: function () {
          r.prototype.init.apply(this, arguments);
          var a = this,
            f = a.chart;
          f.hasRendered &&
            F(f.series, function (f) {
              f.type === a.type && (f.isDirty = !0);
            });
        },
        getColumnMetrics: function () {
          var a = this,
            f = a.options,
            g = a.xAxis,
            e = a.yAxis,
            d = g.reversed,
            p,
            b = {},
            h = 0;
          !1 === f.grouping
            ? (h = 1)
            : F(a.chart.series, function (d) {
                var c = d.options,
                  f = d.yAxis,
                  g;
                d.type !== a.type ||
                  (!d.visible && a.chart.options.chart.ignoreHiddenSeries) ||
                  e.len !== f.len ||
                  e.pos !== f.pos ||
                  (c.stacking
                    ? ((p = d.stackKey),
                      void 0 === b[p] && (b[p] = h++),
                      (g = b[p]))
                    : !1 !== c.grouping && (g = h++),
                  (d.columnIndex = g));
              });
          var v = Math.min(
              Math.abs(g.transA) *
                (g.ordinalSlope ||
                  f.pointRange ||
                  g.closestPointRange ||
                  g.tickInterval ||
                  1),
              g.len
            ),
            n = v * f.groupPadding,
            q = (v - 2 * n) / (h || 1),
            f = Math.min(
              f.maxPointWidth || g.len,
              u(f.pointWidth, q * (1 - 2 * f.pointPadding))
            );
          a.columnMetrics = {
            width: f,
            offset:
              (q - f) / 2 +
              (n + ((a.columnIndex || 0) + (d ? 1 : 0)) * q - v / 2) *
                (d ? -1 : 1),
          };
          return a.columnMetrics;
        },
        crispCol: function (a, f, g, e) {
          var d = this.chart,
            p = this.borderWidth,
            b = -(p % 2 ? 0.5 : 0),
            p = p % 2 ? 0.5 : 1;
          d.inverted && d.renderer.isVML && (p += 1);
          this.options.crisp &&
            ((g = Math.round(a + g) + b), (a = Math.round(a) + b), (g -= a));
          e = Math.round(f + e) + p;
          b = 0.5 >= Math.abs(f) && 0.5 < e;
          f = Math.round(f) + p;
          e -= f;
          b && e && (--f, (e += 1));
          return { x: a, y: f, width: g, height: e };
        },
        translate: function () {
          var a = this,
            f = a.chart,
            g = a.options,
            e = (a.dense = 2 > a.closestPointRange * a.xAxis.transA),
            e = (a.borderWidth = u(g.borderWidth, e ? 0 : 1)),
            d = a.yAxis,
            p = (a.translatedThreshold = d.getThreshold(g.threshold)),
            b = u(g.minPointLength, 5),
            h = a.getColumnMetrics(),
            v = h.width,
            n = (a.barW = Math.max(v, 1 + 2 * e)),
            q = (a.pointXOffset = h.offset);
          f.inverted && (p -= 0.5);
          g.pointPadding && (n = Math.ceil(n));
          r.prototype.translate.apply(a);
          F(a.points, function (e) {
            var c = u(e.yBottom, p),
              g = 999 + Math.abs(c),
              g = Math.min(Math.max(-g, e.plotY), d.len + g),
              h = e.plotX + q,
              m = n,
              r = Math.min(g, c),
              l,
              I = Math.max(g, c) - r;
            Math.abs(I) < b &&
              b &&
              ((I = b),
              (l = (!d.reversed && !e.negative) || (d.reversed && e.negative)),
              (r = Math.abs(r - p) > b ? c - b : p - (l ? b : 0)));
            e.barX = h;
            e.pointWidth = v;
            e.tooltipPos = f.inverted
              ? [d.len + d.pos - f.plotLeft - g, a.xAxis.len - h - m / 2, I]
              : [h + m / 2, g + d.pos - f.plotTop, I];
            e.shapeType = "rect";
            e.shapeArgs = a.crispCol.apply(
              a,
              e.isNull ? [h, p, m, 0] : [h, r, m, I]
            );
          });
        },
        getSymbol: a.noop,
        drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
        drawGraph: function () {
          this.group[this.dense ? "addClass" : "removeClass"](
            "highcharts-dense-data"
          );
        },
        pointAttribs: function (a, f) {
          var g = this.options,
            e,
            d = this.pointAttrToOptions || {};
          e = d.stroke || "borderColor";
          var p = d["stroke-width"] || "borderWidth",
            b = (a && a.color) || this.color,
            m = a[e] || g[e] || this.color || b,
            v = a[p] || g[p] || this[p] || 0,
            d = g.dashStyle;
          a &&
            this.zones.length &&
            ((b = a.getZone()),
            (b = a.options.color || (b && b.color) || this.color));
          f &&
            ((a = h(
              g.states[f],
              (a.options.states && a.options.states[f]) || {}
            )),
            (f = a.brightness),
            (b =
              a.color ||
              (void 0 !== f && B(b).brighten(a.brightness).get()) ||
              b),
            (m = a[e] || m),
            (v = a[p] || v),
            (d = a.dashStyle || d));
          e = { fill: b, stroke: m, "stroke-width": v };
          g.borderRadius && (e.r = g.borderRadius);
          d && (e.dashstyle = d);
          return e;
        },
        drawPoints: function () {
          var a = this,
            f = this.chart,
            g = a.options,
            e = f.renderer,
            d = g.animationLimit || 250,
            p;
          F(a.points, function (b) {
            var m = b.graphic;
            if (n(b.plotY) && null !== b.y) {
              p = b.shapeArgs;
              if (m) m[f.pointCount < d ? "animate" : "attr"](h(p));
              else b.graphic = m = e[b.shapeType](p).add(b.group || a.group);
              m.attr(a.pointAttribs(b, b.selected && "select")).shadow(
                g.shadow,
                null,
                g.stacking && !g.borderRadius
              );
              m.addClass(b.getClassName(), !0);
            } else m && (b.graphic = m.destroy());
          });
        },
        animate: function (a) {
          var f = this,
            g = this.yAxis,
            e = f.options,
            d = this.chart.inverted,
            p = {};
          t &&
            (a
              ? ((p.scaleY = 0.001),
                (a = Math.min(
                  g.pos + g.len,
                  Math.max(g.pos, g.toPixels(e.threshold))
                )),
                d ? (p.translateX = a - g.len) : (p.translateY = a),
                f.group.attr(p))
              : ((p[d ? "translateX" : "translateY"] = g.pos),
                f.group.animate(
                  p,
                  D(E(f.options.animation), {
                    step: function (a, d) {
                      f.group.attr({ scaleY: Math.max(0.001, d.pos) });
                    },
                  })
                ),
                (f.animate = null)));
        },
        remove: function () {
          var a = this,
            f = a.chart;
          f.hasRendered &&
            F(f.series, function (f) {
              f.type === a.type && (f.isDirty = !0);
            });
          r.prototype.remove.apply(a, arguments);
        },
      }
    );
  })(L);
  (function (a) {
    a = a.seriesType;
    a("bar", "column", null, { inverted: !0 });
  })(L);
  (function (a) {
    var E = a.Series;
    a = a.seriesType;
    a(
      "scatter",
      "line",
      {
        lineWidth: 0,
        findNearestPointBy: "xy",
        marker: { enabled: !0 },
        tooltip: {
          headerFormat:
            '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
          pointFormat:
            "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e",
        },
      },
      {
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
        drawGraph: function () {
          this.options.lineWidth && E.prototype.drawGraph.call(this);
        },
      }
    );
  })(L);
  (function (a) {
    var E = a.pick,
      B = a.relativeLength;
    a.CenteredSeriesMixin = {
      getCenter: function () {
        var a = this.options,
          D = this.chart,
          n = 2 * (a.slicedOffset || 0),
          h = D.plotWidth - 2 * n,
          D = D.plotHeight - 2 * n,
          u = a.center,
          u = [
            E(u[0], "50%"),
            E(u[1], "50%"),
            a.size || "100%",
            a.innerSize || 0,
          ],
          r = Math.min(h, D),
          x,
          t;
        for (x = 0; 4 > x; ++x)
          (t = u[x]),
            (a = 2 > x || (2 === x && /%$/.test(t))),
            (u[x] = B(t, [h, D, r, u[2]][x]) + (a ? n : 0));
        u[3] > u[2] && (u[3] = u[2]);
        return u;
      },
    };
  })(L);
  (function (a) {
    var E = a.addEvent,
      B = a.defined,
      F = a.each,
      D = a.extend,
      n = a.inArray,
      h = a.noop,
      u = a.pick,
      r = a.Point,
      x = a.Series,
      t = a.seriesType,
      m = a.setAnimation;
    t(
      "pie",
      "line",
      {
        center: [null, null],
        clip: !1,
        colorByPoint: !0,
        dataLabels: {
          distance: 30,
          enabled: !0,
          formatter: function () {
            return this.point.isNull ? void 0 : this.point.name;
          },
          x: 0,
        },
        ignoreHiddenPoint: !0,
        legendType: "point",
        marker: null,
        size: null,
        showInLegend: !1,
        slicedOffset: 10,
        stickyTracking: !1,
        tooltip: { followPointer: !0 },
        borderColor: "#ffffff",
        borderWidth: 1,
        states: { hover: { brightness: 0.1, shadow: !1 } },
      },
      {
        isCartesian: !1,
        requireSorting: !1,
        directTouch: !0,
        noSharedTooltip: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
        axisTypes: [],
        pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
        animate: function (a) {
          var f = this,
            e = f.points,
            d = f.startAngleRad;
          a ||
            (F(e, function (a) {
              var b = a.graphic,
                e = a.shapeArgs;
              b &&
                (b.attr({ r: a.startR || f.center[3] / 2, start: d, end: d }),
                b.animate(
                  { r: e.r, start: e.start, end: e.end },
                  f.options.animation
                ));
            }),
            (f.animate = null));
        },
        updateTotals: function () {
          var a,
            g = 0,
            e = this.points,
            d = e.length,
            p,
            b = this.options.ignoreHiddenPoint;
          for (a = 0; a < d; a++)
            (p = e[a]), (g += b && !p.visible ? 0 : p.isNull ? 0 : p.y);
          this.total = g;
          for (a = 0; a < d; a++)
            (p = e[a]),
              (p.percentage = 0 < g && (p.visible || !b) ? (p.y / g) * 100 : 0),
              (p.total = g);
        },
        generatePoints: function () {
          x.prototype.generatePoints.call(this);
          this.updateTotals();
        },
        translate: function (a) {
          this.generatePoints();
          var f = 0,
            e = this.options,
            d = e.slicedOffset,
            p = d + (e.borderWidth || 0),
            b,
            h,
            v,
            m = e.startAngle || 0,
            q = (this.startAngleRad = (Math.PI / 180) * (m - 90)),
            m =
              (this.endAngleRad =
                (Math.PI / 180) * (u(e.endAngle, m + 360) - 90)) - q,
            n = this.points,
            c,
            w = e.dataLabels.distance,
            e = e.ignoreHiddenPoint,
            r,
            y = n.length,
            t;
          a || (this.center = a = this.getCenter());
          this.getX = function (c, b, d) {
            v = Math.asin(
              Math.min((c - a[1]) / (a[2] / 2 + d.labelDistance), 1)
            );
            return (
              a[0] + (b ? -1 : 1) * Math.cos(v) * (a[2] / 2 + d.labelDistance)
            );
          };
          for (r = 0; r < y; r++) {
            t = n[r];
            t.labelDistance = u(
              t.options.dataLabels && t.options.dataLabels.distance,
              w
            );
            this.maxLabelDistance = Math.max(
              this.maxLabelDistance || 0,
              t.labelDistance
            );
            b = q + f * m;
            if (!e || t.visible) f += t.percentage / 100;
            h = q + f * m;
            t.shapeType = "arc";
            t.shapeArgs = {
              x: a[0],
              y: a[1],
              r: a[2] / 2,
              innerR: a[3] / 2,
              start: Math.round(1e3 * b) / 1e3,
              end: Math.round(1e3 * h) / 1e3,
            };
            v = (h + b) / 2;
            v > 1.5 * Math.PI
              ? (v -= 2 * Math.PI)
              : v < -Math.PI / 2 && (v += 2 * Math.PI);
            t.slicedTranslation = {
              translateX: Math.round(Math.cos(v) * d),
              translateY: Math.round(Math.sin(v) * d),
            };
            h = (Math.cos(v) * a[2]) / 2;
            c = (Math.sin(v) * a[2]) / 2;
            t.tooltipPos = [a[0] + 0.7 * h, a[1] + 0.7 * c];
            t.half = v < -Math.PI / 2 || v > Math.PI / 2 ? 1 : 0;
            t.angle = v;
            b = Math.min(p, t.labelDistance / 5);
            t.labelPos = [
              a[0] + h + Math.cos(v) * t.labelDistance,
              a[1] + c + Math.sin(v) * t.labelDistance,
              a[0] + h + Math.cos(v) * b,
              a[1] + c + Math.sin(v) * b,
              a[0] + h,
              a[1] + c,
              0 > t.labelDistance ? "center" : t.half ? "right" : "left",
              v,
            ];
          }
        },
        drawGraph: null,
        drawPoints: function () {
          var a = this,
            g = a.chart.renderer,
            e,
            d,
            p,
            b,
            h = a.options.shadow;
          h && !a.shadowGroup && (a.shadowGroup = g.g("shadow").add(a.group));
          F(a.points, function (f) {
            if (!f.isNull) {
              d = f.graphic;
              b = f.shapeArgs;
              e = f.getTranslate();
              var m = f.shadowGroup;
              h && !m && (m = f.shadowGroup = g.g("shadow").add(a.shadowGroup));
              m && m.attr(e);
              p = a.pointAttribs(f, f.selected && "select");
              d
                ? d.setRadialReference(a.center).attr(p).animate(D(b, e))
                : ((f.graphic = d =
                    g[f.shapeType](b)
                      .setRadialReference(a.center)
                      .attr(e)
                      .add(a.group)),
                  f.visible || d.attr({ visibility: "hidden" }),
                  d.attr(p).attr({ "stroke-linejoin": "round" }).shadow(h, m));
              d.addClass(f.getClassName());
            }
          });
        },
        searchPoint: h,
        sortByAngle: function (a, g) {
          a.sort(function (a, d) {
            return void 0 !== a.angle && (d.angle - a.angle) * g;
          });
        },
        drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
        getCenter: a.CenteredSeriesMixin.getCenter,
        getSymbol: h,
      },
      {
        init: function () {
          r.prototype.init.apply(this, arguments);
          var a = this,
            g;
          a.name = u(a.name, "Slice");
          g = function (e) {
            a.slice("select" === e.type);
          };
          E(a, "select", g);
          E(a, "unselect", g);
          return a;
        },
        isValid: function () {
          return a.isNumber(this.y, !0) && 0 <= this.y;
        },
        setVisible: function (a, g) {
          var e = this,
            d = e.series,
            f = d.chart,
            b = d.options.ignoreHiddenPoint;
          g = u(g, b);
          a !== e.visible &&
            ((e.visible =
              e.options.visible =
              a =
                void 0 === a ? !e.visible : a),
            (d.options.data[n(e, d.data)] = e.options),
            F(
              ["graphic", "dataLabel", "connector", "shadowGroup"],
              function (b) {
                if (e[b]) e[b][a ? "show" : "hide"](!0);
              }
            ),
            e.legendItem && f.legend.colorizeItem(e, a),
            a || "hover" !== e.state || e.setState(""),
            b && (d.isDirty = !0),
            g && f.redraw());
        },
        slice: function (a, g, e) {
          var d = this.series;
          m(e, d.chart);
          u(g, !0);
          this.sliced = this.options.sliced = B(a) ? a : !this.sliced;
          d.options.data[n(this, d.data)] = this.options;
          this.graphic.animate(this.getTranslate());
          this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
        },
        getTranslate: function () {
          return this.sliced
            ? this.slicedTranslation
            : { translateX: 0, translateY: 0 };
        },
        haloPath: function (a) {
          var f = this.shapeArgs;
          return this.sliced || !this.visible
            ? []
            : this.series.chart.renderer.symbols.arc(
                f.x,
                f.y,
                f.r + a,
                f.r + a,
                { innerR: this.shapeArgs.r, start: f.start, end: f.end }
              );
        },
      }
    );
  })(L);
  (function (a) {
    var E = a.addEvent,
      B = a.arrayMax,
      F = a.defined,
      D = a.each,
      n = a.extend,
      h = a.format,
      u = a.map,
      r = a.merge,
      x = a.noop,
      t = a.pick,
      m = a.relativeLength,
      f = a.Series,
      g = a.seriesTypes,
      e = a.stableSort;
    a.distribute = function (a, f) {
      function b(a, b) {
        return a.target - b.target;
      }
      var d,
        g = !0,
        p = a,
        q = [],
        h;
      h = 0;
      for (d = a.length; d--; ) h += a[d].size;
      if (h > f) {
        e(a, function (a, b) {
          return (b.rank || 0) - (a.rank || 0);
        });
        for (h = d = 0; h <= f; ) (h += a[d].size), d++;
        q = a.splice(d - 1, a.length);
      }
      e(a, b);
      for (
        a = u(a, function (a) {
          return { size: a.size, targets: [a.target] };
        });
        g;

      ) {
        for (d = a.length; d--; )
          (g = a[d]),
            (h =
              (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) /
              2),
            (g.pos = Math.min(Math.max(0, h - g.size / 2), f - g.size));
        d = a.length;
        for (g = !1; d--; )
          0 < d &&
            a[d - 1].pos + a[d - 1].size > a[d].pos &&
            ((a[d - 1].size += a[d].size),
            (a[d - 1].targets = a[d - 1].targets.concat(a[d].targets)),
            a[d - 1].pos + a[d - 1].size > f &&
              (a[d - 1].pos = f - a[d - 1].size),
            a.splice(d, 1),
            (g = !0));
      }
      d = 0;
      D(a, function (a) {
        var c = 0;
        D(a.targets, function () {
          p[d].pos = a.pos + c;
          c += p[d].size;
          d++;
        });
      });
      p.push.apply(p, q);
      e(p, b);
    };
    f.prototype.drawDataLabels = function () {
      var d = this,
        e = d.options,
        b = e.dataLabels,
        f = d.points,
        g,
        m,
        q = d.hasRendered || 0,
        n,
        c,
        w = t(b.defer, !!e.animation),
        u = d.chart.renderer;
      if (b.enabled || d._hasPointLabels)
        d.dlProcessOptions && d.dlProcessOptions(b),
          (c = d.plotGroup(
            "dataLabelsGroup",
            "data-labels",
            w && !q ? "hidden" : "visible",
            b.zIndex || 6
          )),
          w &&
            (c.attr({ opacity: +q }),
            q ||
              E(d, "afterAnimate", function () {
                d.visible && c.show(!0);
                c[e.animation ? "animate" : "attr"](
                  { opacity: 1 },
                  { duration: 200 }
                );
              })),
          (m = b),
          D(f, function (f) {
            var q,
              l = f.dataLabel,
              p,
              k,
              w = f.connector,
              v = !l,
              y;
            g = f.dlOptions || (f.options && f.options.dataLabels);
            if ((q = t(g && g.enabled, m.enabled) && null !== f.y))
              (b = r(m, g)),
                (p = f.getLabelConfig()),
                (n = b.format ? h(b.format, p) : b.formatter.call(p, b)),
                (y = b.style),
                (p = b.rotation),
                (y.color = t(b.color, y.color, d.color, "#000000")),
                "contrast" === y.color &&
                  ((f.contrastColor = u.getContrast(f.color || d.color)),
                  (y.color =
                    b.inside || 0 > t(f.labelDistance, b.distance) || e.stacking
                      ? f.contrastColor
                      : "#000000")),
                e.cursor && (y.cursor = e.cursor),
                (k = {
                  fill: b.backgroundColor,
                  stroke: b.borderColor,
                  "stroke-width": b.borderWidth,
                  r: b.borderRadius || 0,
                  rotation: p,
                  padding: b.padding,
                  zIndex: 1,
                }),
                a.objectEach(k, function (a, c) {
                  void 0 === a && delete k[c];
                });
            !l || (q && F(n))
              ? q &&
                F(n) &&
                (l
                  ? (k.text = n)
                  : ((l = f.dataLabel =
                      u[p ? "text" : "label"](
                        n,
                        0,
                        -9999,
                        b.shape,
                        null,
                        null,
                        b.useHTML,
                        null,
                        "data-label"
                      )),
                    l.addClass(
                      "highcharts-data-label-color-" +
                        f.colorIndex +
                        " " +
                        (b.className || "") +
                        (b.useHTML ? "highcharts-tracker" : "")
                    )),
                l.attr(k),
                l.css(y).shadow(b.shadow),
                l.added || l.add(c),
                d.alignDataLabel(f, l, b, null, v))
              : ((f.dataLabel = l = l.destroy()),
                w && (f.connector = w.destroy()));
          });
    };
    f.prototype.alignDataLabel = function (a, e, b, f, g) {
      var d = this.chart,
        q = d.inverted,
        h = t(a.plotX, -9999),
        c = t(a.plotY, -9999),
        p = e.getBBox(),
        m,
        v = b.rotation,
        r = b.align,
        l =
          this.visible &&
          (a.series.forceDL ||
            d.isInsidePlot(h, Math.round(c), q) ||
            (f && d.isInsidePlot(h, q ? f.x + 1 : f.y + f.height - 1, q))),
        I = "justify" === t(b.overflow, "justify");
      if (
        l &&
        ((m = b.style.fontSize),
        (m = d.renderer.fontMetrics(m, e).b),
        (f = n(
          {
            x: q ? d.plotWidth - c : h,
            y: Math.round(q ? d.plotHeight - h : c),
            width: 0,
            height: 0,
          },
          f
        )),
        n(b, { width: p.width, height: p.height }),
        v
          ? ((I = !1),
            (h = d.renderer.rotCorr(m, v)),
            (h = {
              x: f.x + b.x + f.width / 2 + h.x,
              y:
                f.y +
                b.y +
                { top: 0, middle: 0.5, bottom: 1 }[b.verticalAlign] * f.height,
            }),
            e[g ? "attr" : "animate"](h).attr({ align: r }),
            (c = (v + 720) % 360),
            (c = 180 < c && 360 > c),
            "left" === r
              ? (h.y -= c ? p.height : 0)
              : "center" === r
              ? ((h.x -= p.width / 2), (h.y -= p.height / 2))
              : "right" === r && ((h.x -= p.width), (h.y -= c ? 0 : p.height)))
          : (e.align(b, null, f), (h = e.alignAttr)),
        I
          ? (a.isLabelJustified = this.justifyDataLabel(e, b, h, p, f, g))
          : t(b.crop, !0) &&
            (l =
              d.isInsidePlot(h.x, h.y) &&
              d.isInsidePlot(h.x + p.width, h.y + p.height)),
        b.shape && !v)
      )
        e[g ? "attr" : "animate"]({
          anchorX: q ? d.plotWidth - a.plotY : a.plotX,
          anchorY: q ? d.plotHeight - a.plotX : a.plotY,
        });
      l || (e.attr({ y: -9999 }), (e.placed = !1));
    };
    f.prototype.justifyDataLabel = function (a, e, b, f, g, h) {
      var d = this.chart,
        p = e.align,
        c = e.verticalAlign,
        m,
        n,
        v = a.box ? 0 : a.padding || 0;
      m = b.x + v;
      0 > m && ("right" === p ? (e.align = "left") : (e.x = -m), (n = !0));
      m = b.x + f.width - v;
      m > d.plotWidth &&
        ("left" === p ? (e.align = "right") : (e.x = d.plotWidth - m),
        (n = !0));
      m = b.y + v;
      0 > m &&
        ("bottom" === c ? (e.verticalAlign = "top") : (e.y = -m), (n = !0));
      m = b.y + f.height - v;
      m > d.plotHeight &&
        ("top" === c ? (e.verticalAlign = "bottom") : (e.y = d.plotHeight - m),
        (n = !0));
      n && ((a.placed = !h), a.align(e, null, g));
      return n;
    };
    g.pie &&
      ((g.pie.prototype.drawDataLabels = function () {
        var d = this,
          e = d.data,
          b,
          g = d.chart,
          h = d.options.dataLabels,
          m = t(h.connectorPadding, 10),
          q = t(h.connectorWidth, 1),
          n = g.plotWidth,
          c = g.plotHeight,
          w,
          r = d.center,
          y = r[2] / 2,
          u = r[1],
          l,
          I,
          k,
          z,
          x = [[], []],
          M,
          N,
          E,
          O,
          C = [0, 0, 0, 0];
        d.visible &&
          (h.enabled || d._hasPointLabels) &&
          (D(e, function (a) {
            a.dataLabel &&
              a.visible &&
              a.dataLabel.shortened &&
              (a.dataLabel
                .attr({ width: "auto" })
                .css({ width: "auto", textOverflow: "clip" }),
              (a.dataLabel.shortened = !1));
          }),
          f.prototype.drawDataLabels.apply(d),
          D(e, function (a) {
            a.dataLabel &&
              a.visible &&
              (x[a.half].push(a), (a.dataLabel._pos = null));
          }),
          D(x, function (e, f) {
            var q,
              p,
              w = e.length,
              v = [],
              t;
            if (w)
              for (
                d.sortByAngle(e, f - 0.5),
                  0 < d.maxLabelDistance &&
                    ((q = Math.max(0, u - y - d.maxLabelDistance)),
                    (p = Math.min(u + y + d.maxLabelDistance, g.plotHeight)),
                    D(e, function (a) {
                      0 < a.labelDistance &&
                        a.dataLabel &&
                        ((a.top = Math.max(0, u - y - a.labelDistance)),
                        (a.bottom = Math.min(
                          u + y + a.labelDistance,
                          g.plotHeight
                        )),
                        (t = a.dataLabel.getBBox().height || 21),
                        (a.positionsIndex =
                          v.push({
                            target: a.labelPos[1] - a.top + t / 2,
                            size: t,
                            rank: a.y,
                          }) - 1));
                    }),
                    a.distribute(v, p + t - q)),
                  O = 0;
                O < w;
                O++
              )
                (b = e[O]),
                  (p = b.positionsIndex),
                  (k = b.labelPos),
                  (l = b.dataLabel),
                  (E = !1 === b.visible ? "hidden" : "inherit"),
                  (q = k[1]),
                  v && F(v[p])
                    ? void 0 === v[p].pos
                      ? (E = "hidden")
                      : ((z = v[p].size), (N = b.top + v[p].pos))
                    : (N = q),
                  delete b.positionIndex,
                  (M = h.justify
                    ? r[0] + (f ? -1 : 1) * (y + b.labelDistance)
                    : d.getX(N < b.top + 2 || N > b.bottom - 2 ? q : N, f, b)),
                  (l._attr = { visibility: E, align: k[6] }),
                  (l._pos = {
                    x: M + h.x + ({ left: m, right: -m }[k[6]] || 0),
                    y: N + h.y - 10,
                  }),
                  (k.x = M),
                  (k.y = N),
                  (I = l.getBBox().width),
                  (q = null),
                  M - I < m
                    ? ((q = Math.round(I - M + m)), (C[3] = Math.max(q, C[3])))
                    : M + I > n - m &&
                      ((q = Math.round(M + I - n + m)),
                      (C[1] = Math.max(q, C[1]))),
                  0 > N - z / 2
                    ? (C[0] = Math.max(Math.round(-N + z / 2), C[0]))
                    : N + z / 2 > c &&
                      (C[2] = Math.max(Math.round(N + z / 2 - c), C[2])),
                  (l.sideOverflow = q);
          }),
          0 === B(C) || this.verifyDataLabelOverflow(C)) &&
          (this.placeDataLabels(),
          q &&
            D(this.points, function (a) {
              var c;
              w = a.connector;
              if (
                (l = a.dataLabel) &&
                l._pos &&
                a.visible &&
                0 < a.labelDistance
              ) {
                E = l._attr.visibility;
                if ((c = !w))
                  (a.connector = w =
                    g.renderer
                      .path()
                      .addClass(
                        "highcharts-data-label-connector highcharts-color-" +
                          a.colorIndex
                      )
                      .add(d.dataLabelsGroup)),
                    w.attr({
                      "stroke-width": q,
                      stroke: h.connectorColor || a.color || "#666666",
                    });
                w[c ? "attr" : "animate"]({ d: d.connectorPath(a.labelPos) });
                w.attr("visibility", E);
              } else w && (a.connector = w.destroy());
            }));
      }),
      (g.pie.prototype.connectorPath = function (a) {
        var d = a.x,
          b = a.y;
        return t(this.options.dataLabels.softConnector, !0)
          ? [
              "M",
              d + ("left" === a[6] ? 5 : -5),
              b,
              "C",
              d,
              b,
              2 * a[2] - a[4],
              2 * a[3] - a[5],
              a[2],
              a[3],
              "L",
              a[4],
              a[5],
            ]
          : [
              "M",
              d + ("left" === a[6] ? 5 : -5),
              b,
              "L",
              a[2],
              a[3],
              "L",
              a[4],
              a[5],
            ];
      }),
      (g.pie.prototype.placeDataLabels = function () {
        D(
          this.points,
          function (a) {
            var d = a.dataLabel;
            d &&
              a.visible &&
              ((a = d._pos)
                ? (d.sideOverflow &&
                    ((d._attr.width = d.getBBox().width - d.sideOverflow),
                    d.css({
                      width: d._attr.width + "px",
                      textOverflow: "ellipsis",
                    }),
                    (d.shortened = !0)),
                  d.attr(d._attr),
                  d[d.moved ? "animate" : "attr"](a),
                  (d.moved = !0))
                : d && d.attr({ y: -9999 }));
          },
          this
        );
      }),
      (g.pie.prototype.alignDataLabel = x),
      (g.pie.prototype.verifyDataLabelOverflow = function (a) {
        var d = this.center,
          b = this.options,
          e = b.center,
          f = b.minSize || 80,
          g,
          h = null !== b.size;
        h ||
          (null !== e[0]
            ? (g = Math.max(d[2] - Math.max(a[1], a[3]), f))
            : ((g = Math.max(d[2] - a[1] - a[3], f)),
              (d[0] += (a[3] - a[1]) / 2)),
          null !== e[1]
            ? (g = Math.max(Math.min(g, d[2] - Math.max(a[0], a[2])), f))
            : ((g = Math.max(Math.min(g, d[2] - a[0] - a[2]), f)),
              (d[1] += (a[0] - a[2]) / 2)),
          g < d[2]
            ? ((d[2] = g),
              (d[3] = Math.min(m(b.innerSize || 0, g), g)),
              this.translate(d),
              this.drawDataLabels && this.drawDataLabels())
            : (h = !0));
        return h;
      }));
    g.column &&
      (g.column.prototype.alignDataLabel = function (a, e, b, g, h) {
        var d = this.chart.inverted,
          q = a.series,
          p = a.dlBox || a.shapeArgs,
          c = t(a.below, a.plotY > t(this.translatedThreshold, q.yAxis.len)),
          m = t(b.inside, !!this.options.stacking);
        p &&
          ((g = r(p)),
          0 > g.y && ((g.height += g.y), (g.y = 0)),
          (p = g.y + g.height - q.yAxis.len),
          0 < p && (g.height -= p),
          d &&
            (g = {
              x: q.yAxis.len - g.y - g.height,
              y: q.xAxis.len - g.x - g.width,
              width: g.height,
              height: g.width,
            }),
          m ||
            (d
              ? ((g.x += c ? 0 : g.width), (g.width = 0))
              : ((g.y += c ? g.height : 0), (g.height = 0))));
        b.align = t(b.align, !d || m ? "center" : c ? "right" : "left");
        b.verticalAlign = t(
          b.verticalAlign,
          d || m ? "middle" : c ? "top" : "bottom"
        );
        f.prototype.alignDataLabel.call(this, a, e, b, g, h);
        a.isLabelJustified &&
          a.contrastColor &&
          a.dataLabel.css({ color: a.contrastColor });
      });
  })(L);
  (function (a) {
    var E = a.Chart,
      B = a.each,
      F = a.pick,
      D = a.addEvent;
    E.prototype.callbacks.push(function (a) {
      function h() {
        var h = [];
        B(a.series || [], function (a) {
          var n = a.options.dataLabels,
            r = a.dataLabelCollections || ["dataLabel"];
          (n.enabled || a._hasPointLabels) &&
            !n.allowOverlap &&
            a.visible &&
            B(r, function (m) {
              B(a.points, function (a) {
                a[m] &&
                  ((a[m].labelrank = F(
                    a.labelrank,
                    a.shapeArgs && a.shapeArgs.height
                  )),
                  h.push(a[m]));
              });
            });
        });
        a.hideOverlappingLabels(h);
      }
      h();
      D(a, "redraw", h);
    });
    E.prototype.hideOverlappingLabels = function (a) {
      var h = a.length,
        n,
        r,
        x,
        t,
        m,
        f,
        g,
        e,
        d,
        p = function (a, d, e, f, g, h, c, p) {
          return !(g > a + e || g + c < a || h > d + f || h + p < d);
        };
      for (r = 0; r < h; r++)
        if ((n = a[r])) (n.oldOpacity = n.opacity), (n.newOpacity = 1);
      a.sort(function (a, d) {
        return (d.labelrank || 0) - (a.labelrank || 0);
      });
      for (r = 0; r < h; r++)
        for (x = a[r], n = r + 1; n < h; ++n)
          if (
            ((t = a[n]),
            x &&
              t &&
              x !== t &&
              x.placed &&
              t.placed &&
              0 !== x.newOpacity &&
              0 !== t.newOpacity &&
              ((m = x.alignAttr),
              (f = t.alignAttr),
              (g = x.parentGroup),
              (e = t.parentGroup),
              (d = 2 * (x.box ? 0 : x.padding)),
              (m = p(
                m.x + g.translateX,
                m.y + g.translateY,
                x.width - d,
                x.height - d,
                f.x + e.translateX,
                f.y + e.translateY,
                t.width - d,
                t.height - d
              ))))
          )
            (x.labelrank < t.labelrank ? x : t).newOpacity = 0;
      B(a, function (a) {
        var b, d;
        a &&
          ((d = a.newOpacity),
          a.oldOpacity !== d &&
            a.placed &&
            (d
              ? a.show(!0)
              : (b = function () {
                  a.hide();
                }),
            (a.alignAttr.opacity = d),
            a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)),
          (a.isOld = !0));
      });
    };
  })(L);
  (function (a) {
    var E = a.addEvent,
      B = a.Chart,
      F = a.createElement,
      D = a.css,
      n = a.defaultOptions,
      h = a.defaultPlotOptions,
      u = a.each,
      r = a.extend,
      x = a.fireEvent,
      t = a.hasTouch,
      m = a.inArray,
      f = a.isObject,
      g = a.Legend,
      e = a.merge,
      d = a.pick,
      p = a.Point,
      b = a.Series,
      A = a.seriesTypes,
      v = a.svg,
      H;
    H = a.TrackerMixin = {
      drawTrackerPoint: function () {
        var a = this,
          b = a.chart.pointer,
          c = function (a) {
            var c = b.getPointFromEvent(a);
            void 0 !== c && ((b.isDirectTouch = !0), c.onMouseOver(a));
          };
        u(a.points, function (a) {
          a.graphic && (a.graphic.element.point = a);
          a.dataLabel &&
            (a.dataLabel.div
              ? (a.dataLabel.div.point = a)
              : (a.dataLabel.element.point = a));
        });
        a._hasTracking ||
          (u(a.trackerGroups, function (d) {
            if (a[d]) {
              a[d]
                .addClass("highcharts-tracker")
                .on("mouseover", c)
                .on("mouseout", function (a) {
                  b.onTrackerMouseOut(a);
                });
              if (t) a[d].on("touchstart", c);
              a.options.cursor && a[d].css(D).css({ cursor: a.options.cursor });
            }
          }),
          (a._hasTracking = !0));
      },
      drawTrackerGraph: function () {
        var a = this,
          b = a.options,
          c = b.trackByArea,
          d = [].concat(c ? a.areaPath : a.graphPath),
          e = d.length,
          f = a.chart,
          g = f.pointer,
          l = f.renderer,
          h = f.options.tooltip.snap,
          k = a.tracker,
          p,
          m = function () {
            if (f.hoverSeries !== a) a.onMouseOver();
          },
          n = "rgba(192,192,192," + (v ? 0.0001 : 0.002) + ")";
        if (e && !c)
          for (p = e + 1; p--; )
            "M" === d[p] && d.splice(p + 1, 0, d[p + 1] - h, d[p + 2], "L"),
              ((p && "M" === d[p]) || p === e) &&
                d.splice(p, 0, "L", d[p - 2] + h, d[p - 1]);
        k
          ? k.attr({ d: d })
          : a.graph &&
            ((a.tracker = l
              .path(d)
              .attr({
                "stroke-linejoin": "round",
                visibility: a.visible ? "visible" : "hidden",
                stroke: n,
                fill: c ? n : "none",
                "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * h),
                zIndex: 2,
              })
              .add(a.group)),
            u([a.tracker, a.markerGroup], function (a) {
              a.addClass("highcharts-tracker")
                .on("mouseover", m)
                .on("mouseout", function (a) {
                  g.onTrackerMouseOut(a);
                });
              b.cursor && a.css({ cursor: b.cursor });
              if (t) a.on("touchstart", m);
            }));
      },
    };
    A.column && (A.column.prototype.drawTracker = H.drawTrackerPoint);
    A.pie && (A.pie.prototype.drawTracker = H.drawTrackerPoint);
    A.scatter && (A.scatter.prototype.drawTracker = H.drawTrackerPoint);
    r(g.prototype, {
      setItemEvents: function (a, b, c) {
        var d = this,
          f = d.chart.renderer.boxWrapper,
          g =
            "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
        (c ? b : a.legendGroup)
          .on("mouseover", function () {
            a.setState("hover");
            f.addClass(g);
            b.css(d.options.itemHoverStyle);
          })
          .on("mouseout", function () {
            b.css(e(a.visible ? d.itemStyle : d.itemHiddenStyle));
            f.removeClass(g);
            a.setState();
          })
          .on("click", function (c) {
            var b = function () {
              a.setVisible && a.setVisible();
            };
            c = { browserEvent: c };
            a.firePointEvent
              ? a.firePointEvent("legendItemClick", c, b)
              : x(a, "legendItemClick", c, b);
          });
      },
      createCheckboxForItem: function (a) {
        a.checkbox = F(
          "input",
          { type: "checkbox", checked: a.selected, defaultChecked: a.selected },
          this.options.itemCheckboxStyle,
          this.chart.container
        );
        E(a.checkbox, "click", function (b) {
          x(
            a.series || a,
            "checkboxClick",
            { checked: b.target.checked, item: a },
            function () {
              a.select();
            }
          );
        });
      },
    });
    n.legend.itemStyle.cursor = "pointer";
    r(B.prototype, {
      showResetZoom: function () {
        var a = this,
          b = n.lang,
          c = a.options.chart.resetZoomButton,
          d = c.theme,
          e = d.states,
          f = "chart" === c.relativeTo ? null : "plotBox";
        this.resetZoomButton = a.renderer
          .button(
            b.resetZoom,
            null,
            null,
            function () {
              a.zoomOut();
            },
            d,
            e && e.hover
          )
          .attr({ align: c.position.align, title: b.resetZoomTitle })
          .addClass("highcharts-reset-zoom")
          .add()
          .align(c.position, !1, f);
      },
      zoomOut: function () {
        var a = this;
        x(a, "selection", { resetSelection: !0 }, function () {
          a.zoom();
        });
      },
      zoom: function (a) {
        var b,
          c = this.pointer,
          e = !1,
          g;
        !a || a.resetSelection
          ? u(this.axes, function (a) {
              b = a.zoom();
            })
          : u(a.xAxis.concat(a.yAxis), function (a) {
              var d = a.axis;
              c[d.isXAxis ? "zoomX" : "zoomY"] &&
                ((b = d.zoom(a.min, a.max)), d.displayBtn && (e = !0));
            });
        g = this.resetZoomButton;
        e && !g
          ? this.showResetZoom()
          : !e && f(g) && (this.resetZoomButton = g.destroy());
        b &&
          this.redraw(
            d(
              this.options.chart.animation,
              a && a.animation,
              100 > this.pointCount
            )
          );
      },
      pan: function (a, b) {
        var c = this,
          d = c.hoverPoints,
          e;
        d &&
          u(d, function (a) {
            a.setState();
          });
        u("xy" === b ? [1, 0] : [1], function (b) {
          b = c[b ? "xAxis" : "yAxis"][0];
          var d = b.horiz,
            l = a[d ? "chartX" : "chartY"],
            d = d ? "mouseDownX" : "mouseDownY",
            f = c[d],
            k = (b.pointRange || 0) / 2,
            g = b.getExtremes(),
            h = b.toValue(f - l, !0) + k,
            k = b.toValue(f + b.len - l, !0) - k,
            p = k < h,
            f = p ? k : h,
            h = p ? h : k,
            k = Math.min(
              g.dataMin,
              b.toValue(b.toPixels(g.min) - b.minPixelPadding)
            ),
            p = Math.max(
              g.dataMax,
              b.toValue(b.toPixels(g.max) + b.minPixelPadding)
            ),
            q;
          q = k - f;
          0 < q && ((h += q), (f = k));
          q = h - p;
          0 < q && ((h = p), (f -= q));
          b.series.length &&
            f !== g.min &&
            h !== g.max &&
            (b.setExtremes(f, h, !1, !1, { trigger: "pan" }), (e = !0));
          c[d] = l;
        });
        e && c.redraw(!1);
        D(c.container, { cursor: "move" });
      },
    });
    r(p.prototype, {
      select: function (a, b) {
        var c = this,
          e = c.series,
          f = e.chart;
        a = d(a, !c.selected);
        c.firePointEvent(
          a ? "select" : "unselect",
          { accumulate: b },
          function () {
            c.selected = c.options.selected = a;
            e.options.data[m(c, e.data)] = c.options;
            c.setState(a && "select");
            b ||
              u(f.getSelectedPoints(), function (a) {
                a.selected &&
                  a !== c &&
                  ((a.selected = a.options.selected = !1),
                  (e.options.data[m(a, e.data)] = a.options),
                  a.setState(""),
                  a.firePointEvent("unselect"));
              });
          }
        );
      },
      onMouseOver: function (a) {
        var b = this.series.chart,
          c = b.pointer;
        a = a
          ? c.normalize(a)
          : c.getChartCoordinatesFromPoint(this, b.inverted);
        c.runPointActions(a, this);
      },
      onMouseOut: function () {
        var a = this.series.chart;
        this.firePointEvent("mouseOut");
        u(a.hoverPoints || [], function (a) {
          a.setState();
        });
        a.hoverPoints = a.hoverPoint = null;
      },
      importEvents: function () {
        if (!this.hasImportedEvents) {
          var b = this,
            d = e(b.series.options.point, b.options).events;
          b.events = d;
          a.objectEach(d, function (a, d) {
            E(b, d, a);
          });
          this.hasImportedEvents = !0;
        }
      },
      setState: function (a, b) {
        var c = Math.floor(this.plotX),
          e = this.plotY,
          f = this.series,
          g = f.options.states[a] || {},
          p = h[f.type].marker && f.options.marker,
          l = p && !1 === p.enabled,
          q = (p && p.states && p.states[a]) || {},
          k = !1 === q.enabled,
          m = f.stateMarkerGraphic,
          n = this.marker || {},
          v = f.chart,
          t = f.halo,
          u,
          x = p && f.markerAttribs;
        a = a || "";
        if (
          !(
            (a === this.state && !b) ||
            (this.selected && "select" !== a) ||
            !1 === g.enabled ||
            (a && (k || (l && !1 === q.enabled))) ||
            (a && n.states && n.states[a] && !1 === n.states[a].enabled)
          )
        ) {
          x && (u = f.markerAttribs(this, a));
          if (this.graphic)
            this.state &&
              this.graphic.removeClass("highcharts-point-" + this.state),
              a && this.graphic.addClass("highcharts-point-" + a),
              this.graphic.attr(f.pointAttribs(this, a)),
              u &&
                this.graphic.animate(
                  u,
                  d(v.options.chart.animation, q.animation, p.animation)
                ),
              m && m.hide();
          else {
            if (a && q) {
              p = n.symbol || f.symbol;
              m && m.currentSymbol !== p && (m = m.destroy());
              if (m) m[b ? "animate" : "attr"]({ x: u.x, y: u.y });
              else
                p &&
                  ((f.stateMarkerGraphic = m =
                    v.renderer
                      .symbol(p, u.x, u.y, u.width, u.height)
                      .add(f.markerGroup)),
                  (m.currentSymbol = p));
              m && m.attr(f.pointAttribs(this, a));
            }
            m &&
              (m[a && v.isInsidePlot(c, e, v.inverted) ? "show" : "hide"](),
              (m.element.point = this));
          }
          (c = g.halo) && c.size
            ? (t ||
                (f.halo = t =
                  v.renderer.path().add((this.graphic || m).parentGroup)),
              t[b ? "animate" : "attr"]({ d: this.haloPath(c.size) }),
              t.attr({
                class:
                  "highcharts-halo highcharts-color-" +
                  d(this.colorIndex, f.colorIndex),
              }),
              (t.point = this),
              t.attr(
                r(
                  {
                    fill: this.color || f.color,
                    "fill-opacity": c.opacity,
                    zIndex: -1,
                  },
                  c.attributes
                )
              ))
            : t &&
              t.point &&
              t.point.haloPath &&
              t.animate({ d: t.point.haloPath(0) });
          this.state = a;
        }
      },
      haloPath: function (a) {
        return this.series.chart.renderer.symbols.circle(
          Math.floor(this.plotX) - a,
          this.plotY - a,
          2 * a,
          2 * a
        );
      },
    });
    r(b.prototype, {
      onMouseOver: function () {
        var a = this.chart,
          b = a.hoverSeries;
        if (b && b !== this) b.onMouseOut();
        this.options.events.mouseOver && x(this, "mouseOver");
        this.setState("hover");
        a.hoverSeries = this;
      },
      onMouseOut: function () {
        var a = this.options,
          b = this.chart,
          c = b.tooltip,
          d = b.hoverPoint;
        b.hoverSeries = null;
        if (d) d.onMouseOut();
        this && a.events.mouseOut && x(this, "mouseOut");
        !c ||
          this.stickyTracking ||
          (c.shared && !this.noSharedTooltip) ||
          c.hide();
        this.setState();
      },
      setState: function (a) {
        var b = this,
          c = b.options,
          e = b.graph,
          f = c.states,
          g = c.lineWidth,
          c = 0;
        a = a || "";
        if (
          b.state !== a &&
          (u([b.group, b.markerGroup, b.dataLabelsGroup], function (c) {
            c &&
              (b.state && c.removeClass("highcharts-series-" + b.state),
              a && c.addClass("highcharts-series-" + a));
          }),
          (b.state = a),
          !f[a] || !1 !== f[a].enabled) &&
          (a && (g = f[a].lineWidth || g + (f[a].lineWidthPlus || 0)),
          e && !e.dashstyle)
        )
          for (
            g = { "stroke-width": g },
              e.animate(
                g,
                d(b.chart.options.chart.animation, f[a] && f[a].animation)
              );
            b["zone-graph-" + c];

          )
            b["zone-graph-" + c].attr(g), (c += 1);
      },
      setVisible: function (a, b) {
        var c = this,
          d = c.chart,
          e = c.legendItem,
          f,
          g = d.options.chart.ignoreHiddenSeries,
          l = c.visible;
        f = (c.visible =
          a =
          c.options.visible =
          c.userOptions.visible =
            void 0 === a ? !l : a)
          ? "show"
          : "hide";
        u(
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"],
          function (a) {
            if (c[a]) c[a][f]();
          }
        );
        if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c)
          c.onMouseOut();
        e && d.legend.colorizeItem(c, a);
        c.isDirty = !0;
        c.options.stacking &&
          u(d.series, function (a) {
            a.options.stacking && a.visible && (a.isDirty = !0);
          });
        u(c.linkedSeries, function (c) {
          c.setVisible(a, !1);
        });
        g && (d.isDirtyBox = !0);
        !1 !== b && d.redraw();
        x(c, f);
      },
      show: function () {
        this.setVisible(!0);
      },
      hide: function () {
        this.setVisible(!1);
      },
      select: function (a) {
        this.selected = a = void 0 === a ? !this.selected : a;
        this.checkbox && (this.checkbox.checked = a);
        x(this, a ? "select" : "unselect");
      },
      drawTracker: H.drawTrackerGraph,
    });
  })(L);
  (function (a) {
    var E = a.Chart,
      B = a.each,
      F = a.inArray,
      D = a.isArray,
      n = a.isObject,
      h = a.pick,
      u = a.splat;
    E.prototype.setResponsive = function (h) {
      var n = this.options.responsive,
        r = [],
        m = this.currentResponsive;
      n &&
        n.rules &&
        B(
          n.rules,
          function (f) {
            void 0 === f._id && (f._id = a.uniqueKey());
            this.matchResponsiveRule(f, r, h);
          },
          this
        );
      var f = a.merge.apply(
          0,
          a.map(r, function (f) {
            return a.find(n.rules, function (a) {
              return a._id === f;
            }).chartOptions;
          })
        ),
        r = r.toString() || void 0;
      r !== (m && m.ruleIds) &&
        (m && this.update(m.undoOptions, h),
        r
          ? ((this.currentResponsive = {
              ruleIds: r,
              mergedOptions: f,
              undoOptions: this.currentOptions(f),
            }),
            this.update(f, h))
          : (this.currentResponsive = void 0));
    };
    E.prototype.matchResponsiveRule = function (a, n) {
      var r = a.condition;
      (
        r.callback ||
        function () {
          return (
            this.chartWidth <= h(r.maxWidth, Number.MAX_VALUE) &&
            this.chartHeight <= h(r.maxHeight, Number.MAX_VALUE) &&
            this.chartWidth >= h(r.minWidth, 0) &&
            this.chartHeight >= h(r.minHeight, 0)
          );
        }
      ).call(this) && n.push(a._id);
    };
    E.prototype.currentOptions = function (h) {
      function r(h, f, g, e) {
        var d;
        a.objectEach(h, function (a, b) {
          if (!e && -1 < F(b, ["series", "xAxis", "yAxis"]))
            for (h[b] = u(h[b]), g[b] = [], d = 0; d < h[b].length; d++)
              f[b][d] && ((g[b][d] = {}), r(a[d], f[b][d], g[b][d], e + 1));
          else
            n(a)
              ? ((g[b] = D(a) ? [] : {}), r(a, f[b] || {}, g[b], e + 1))
              : (g[b] = f[b] || null);
        });
      }
      var t = {};
      r(h, this.options, t, 0);
      return t;
    };
  })(L);
  (function (a) {
    var E = a.addEvent,
      B = a.Axis,
      F = a.Chart,
      D = a.css,
      n = a.dateFormat,
      h = a.defined,
      u = a.each,
      r = a.extend,
      x = a.noop,
      t = a.timeUnits,
      m = a.wrap;
    m(a.Series.prototype, "init", function (a) {
      var f;
      a.apply(this, Array.prototype.slice.call(arguments, 1));
      (f = this.xAxis) &&
        f.options.ordinal &&
        E(this, "updatedData", function () {
          delete f.ordinalIndex;
        });
    });
    m(B.prototype, "getTimeTicks", function (a, g, e, d, p, b, m, v) {
      var f = 0,
        q,
        r,
        c = {},
        w,
        u,
        y,
        x = [],
        l = -Number.MAX_VALUE,
        I = this.options.tickPixelInterval;
      if (
        (!this.options.ordinal && !this.options.breaks) ||
        !b ||
        3 > b.length ||
        void 0 === e
      )
        return a.call(this, g, e, d, p);
      u = b.length;
      for (q = 0; q < u; q++) {
        y = q && b[q - 1] > d;
        b[q] < e && (f = q);
        if (q === u - 1 || b[q + 1] - b[q] > 5 * m || y) {
          if (b[q] > l) {
            for (r = a.call(this, g, b[f], b[q], p); r.length && r[0] <= l; )
              r.shift();
            r.length && (l = r[r.length - 1]);
            x = x.concat(r);
          }
          f = q + 1;
        }
        if (y) break;
      }
      a = r.info;
      if (v && a.unitRange <= t.hour) {
        q = x.length - 1;
        for (f = 1; f < q; f++)
          n("%d", x[f]) !== n("%d", x[f - 1]) && ((c[x[f]] = "day"), (w = !0));
        w && (c[x[0]] = "day");
        a.higherRanks = c;
      }
      x.info = a;
      if (v && h(I)) {
        v = a = x.length;
        q = [];
        var k;
        for (w = []; v--; )
          (f = this.translate(x[v])), k && (w[v] = k - f), (q[v] = k = f);
        w.sort();
        w = w[Math.floor(w.length / 2)];
        w < 0.6 * I && (w = null);
        v = x[a - 1] > d ? a - 1 : a;
        for (k = void 0; v--; )
          (f = q[v]),
            (d = Math.abs(k - f)),
            k && d < 0.8 * I && (null === w || d < 0.8 * w)
              ? (c[x[v]] && !c[x[v + 1]] ? ((d = v + 1), (k = f)) : (d = v),
                x.splice(d, 1))
              : (k = f);
      }
      return x;
    });
    r(B.prototype, {
      beforeSetTickPositions: function () {
        var a,
          g = [],
          e = !1,
          d,
          h = this.getExtremes(),
          b = h.min,
          m = h.max,
          n,
          r = this.isXAxis && !!this.options.breaks,
          h = this.options.ordinal,
          q = this.chart.options.chart.ignoreHiddenSeries;
        if (h || r) {
          u(this.series, function (b, c) {
            if (
              !(
                (q && !1 === b.visible) ||
                (!1 === b.takeOrdinalPosition && !r)
              ) &&
              ((g = g.concat(b.processedXData)),
              (a = g.length),
              g.sort(function (a, c) {
                return a - c;
              }),
              a)
            )
              for (c = a - 1; c--; ) g[c] === g[c + 1] && g.splice(c, 1);
          });
          a = g.length;
          if (2 < a) {
            d = g[1] - g[0];
            for (n = a - 1; n-- && !e; ) g[n + 1] - g[n] !== d && (e = !0);
            !this.options.keepOrdinalPadding &&
              (g[0] - b > d || m - g[g.length - 1] > d) &&
              (e = !0);
          }
          e
            ? ((this.ordinalPositions = g),
              (d = this.ordinal2lin(Math.max(b, g[0]), !0)),
              (n = Math.max(
                this.ordinal2lin(Math.min(m, g[g.length - 1]), !0),
                1
              )),
              (this.ordinalSlope = m = (m - b) / (n - d)),
              (this.ordinalOffset = b - d * m))
            : (this.ordinalPositions =
                this.ordinalSlope =
                this.ordinalOffset =
                  void 0);
        }
        this.isOrdinal = h && e;
        this.groupIntervalFactor = null;
      },
      val2lin: function (a, g) {
        var e = this.ordinalPositions;
        if (e) {
          var d = e.length,
            f,
            b;
          for (f = d; f--; )
            if (e[f] === a) {
              b = f;
              break;
            }
          for (f = d - 1; f--; )
            if (a > e[f] || 0 === f) {
              a = (a - e[f]) / (e[f + 1] - e[f]);
              b = f + a;
              break;
            }
          g = g ? b : this.ordinalSlope * (b || 0) + this.ordinalOffset;
        } else g = a;
        return g;
      },
      lin2val: function (a, g) {
        var e = this.ordinalPositions;
        if (e) {
          var d = this.ordinalSlope,
            f = this.ordinalOffset,
            b = e.length - 1,
            h;
          if (g)
            0 > a
              ? (a = e[0])
              : a > b
              ? (a = e[b])
              : ((b = Math.floor(a)), (h = a - b));
          else
            for (; b--; )
              if (((g = d * b + f), a >= g)) {
                d = d * (b + 1) + f;
                h = (a - g) / (d - g);
                break;
              }
          return void 0 !== h && void 0 !== e[b]
            ? e[b] + (h ? h * (e[b + 1] - e[b]) : 0)
            : a;
        }
        return a;
      },
      getExtendedPositions: function () {
        var a = this.chart,
          g = this.series[0].currentDataGrouping,
          e = this.ordinalIndex,
          d = g ? g.count + g.unitName : "raw",
          h = this.getExtremes(),
          b,
          m;
        e || (e = this.ordinalIndex = {});
        e[d] ||
          ((b = {
            series: [],
            chart: a,
            getExtremes: function () {
              return { min: h.dataMin, max: h.dataMax };
            },
            options: { ordinal: !0 },
            val2lin: B.prototype.val2lin,
            ordinal2lin: B.prototype.ordinal2lin,
          }),
          u(this.series, function (d) {
            m = { xAxis: b, xData: d.xData, chart: a, destroyGroupedData: x };
            m.options = {
              dataGrouping: g
                ? {
                    enabled: !0,
                    forced: !0,
                    approximation: "open",
                    units: [[g.unitName, [g.count]]],
                  }
                : { enabled: !1 },
            };
            d.processData.apply(m);
            b.series.push(m);
          }),
          this.beforeSetTickPositions.apply(b),
          (e[d] = b.ordinalPositions));
        return e[d];
      },
      getGroupIntervalFactor: function (a, g, e) {
        var d;
        e = e.processedXData;
        var f = e.length,
          b = [];
        d = this.groupIntervalFactor;
        if (!d) {
          for (d = 0; d < f - 1; d++) b[d] = e[d + 1] - e[d];
          b.sort(function (a, b) {
            return a - b;
          });
          b = b[Math.floor(f / 2)];
          a = Math.max(a, e[0]);
          g = Math.min(g, e[f - 1]);
          this.groupIntervalFactor = d = (f * b) / (g - a);
        }
        return d;
      },
      postProcessTickInterval: function (a) {
        var f = this.ordinalSlope;
        return f
          ? this.options.breaks
            ? this.closestPointRange
            : a / (f / this.closestPointRange)
          : a;
      },
    });
    B.prototype.ordinal2lin = B.prototype.val2lin;
    m(F.prototype, "pan", function (a, g) {
      var e = this.xAxis[0],
        d = g.chartX,
        f = !1;
      if (e.options.ordinal && e.series.length) {
        var b = this.mouseDownX,
          h = e.getExtremes(),
          m = h.dataMax,
          n = h.min,
          q = h.max,
          r = this.hoverPoints,
          c = e.closestPointRange,
          b = (b - d) / (e.translationSlope * (e.ordinalSlope || c)),
          w = { ordinalPositions: e.getExtendedPositions() },
          c = e.lin2val,
          t = e.val2lin,
          y;
        w.ordinalPositions
          ? 1 < Math.abs(b) &&
            (r &&
              u(r, function (a) {
                a.setState();
              }),
            0 > b
              ? ((r = w), (y = e.ordinalPositions ? e : w))
              : ((r = e.ordinalPositions ? e : w), (y = w)),
            (w = y.ordinalPositions),
            m > w[w.length - 1] && w.push(m),
            (this.fixedRange = q - n),
            (b = e.toFixedRange(
              null,
              null,
              c.apply(r, [t.apply(r, [n, !0]) + b, !0]),
              c.apply(y, [t.apply(y, [q, !0]) + b, !0])
            )),
            b.min >= Math.min(h.dataMin, n) &&
              b.max <= Math.max(m, q) &&
              e.setExtremes(b.min, b.max, !0, !1, { trigger: "pan" }),
            (this.mouseDownX = d),
            D(this.container, { cursor: "move" }))
          : (f = !0);
      } else f = !0;
      f && a.apply(this, Array.prototype.slice.call(arguments, 1));
    });
  })(L);
  (function (a) {
    function E() {
      return Array.prototype.slice.call(arguments, 1);
    }
    function B(a) {
      a.apply(this);
      this.drawBreaks(this.xAxis, ["x"]);
      this.drawBreaks(this.yAxis, F(this.pointArrayMap, ["y"]));
    }
    var F = a.pick,
      D = a.wrap,
      n = a.each,
      h = a.extend,
      u = a.isArray,
      r = a.fireEvent,
      x = a.Axis,
      t = a.Series;
    h(x.prototype, {
      isInBreak: function (a, f) {
        var g = a.repeat || Infinity,
          e = a.from,
          d = a.to - a.from;
        f = f >= e ? (f - e) % g : g - ((e - f) % g);
        return a.inclusive ? f <= d : f < d && 0 !== f;
      },
      isInAnyBreak: function (a, f) {
        var g = this.options.breaks,
          e = g && g.length,
          d,
          h,
          b;
        if (e) {
          for (; e--; )
            this.isInBreak(g[e], a) &&
              ((d = !0), h || (h = F(g[e].showPoints, this.isXAxis ? !1 : !0)));
          b = d && f ? d && !h : d;
        }
        return b;
      },
    });
    D(x.prototype, "setTickPositions", function (a) {
      a.apply(this, Array.prototype.slice.call(arguments, 1));
      if (this.options.breaks) {
        var f = this.tickPositions,
          g = this.tickPositions.info,
          e = [],
          d;
        for (d = 0; d < f.length; d++) this.isInAnyBreak(f[d]) || e.push(f[d]);
        this.tickPositions = e;
        this.tickPositions.info = g;
      }
    });
    D(x.prototype, "init", function (a, f, g) {
      var e = this;
      g.breaks && g.breaks.length && (g.ordinal = !1);
      a.call(this, f, g);
      a = this.options.breaks;
      e.isBroken = u(a) && !!a.length;
      e.isBroken &&
        ((e.val2lin = function (a) {
          var d = a,
            b,
            f;
          for (f = 0; f < e.breakArray.length; f++)
            if (((b = e.breakArray[f]), b.to <= a)) d -= b.len;
            else if (b.from >= a) break;
            else if (e.isInBreak(b, a)) {
              d -= a - b.from;
              break;
            }
          return d;
        }),
        (e.lin2val = function (a) {
          var d, b;
          for (
            b = 0;
            b < e.breakArray.length && !((d = e.breakArray[b]), d.from >= a);
            b++
          )
            d.to < a ? (a += d.len) : e.isInBreak(d, a) && (a += d.len);
          return a;
        }),
        (e.setExtremes = function (a, e, b, f, g) {
          for (; this.isInAnyBreak(a); ) a -= this.closestPointRange;
          for (; this.isInAnyBreak(e); ) e -= this.closestPointRange;
          x.prototype.setExtremes.call(this, a, e, b, f, g);
        }),
        (e.setAxisTranslation = function (a) {
          x.prototype.setAxisTranslation.call(this, a);
          a = e.options.breaks;
          var d = [],
            b = [],
            f = 0,
            g,
            h,
            m = e.userMin || e.min,
            u = e.userMax || e.max,
            c = F(e.pointRangePadding, 0),
            w,
            t;
          n(a, function (a) {
            h = a.repeat || Infinity;
            e.isInBreak(a, m) && (m += (a.to % h) - (m % h));
            e.isInBreak(a, u) && (u -= (u % h) - (a.from % h));
          });
          n(a, function (a) {
            w = a.from;
            for (h = a.repeat || Infinity; w - h > m; ) w -= h;
            for (; w < m; ) w += h;
            for (t = w; t < u; t += h)
              d.push({ value: t, move: "in" }),
                d.push({
                  value: t + (a.to - a.from),
                  move: "out",
                  size: a.breakSize,
                });
          });
          d.sort(function (a, c) {
            return a.value === c.value
              ? ("in" === a.move ? 0 : 1) - ("in" === c.move ? 0 : 1)
              : a.value - c.value;
          });
          g = 0;
          w = m;
          n(d, function (a) {
            g += "in" === a.move ? 1 : -1;
            1 === g && "in" === a.move && (w = a.value);
            0 === g &&
              (b.push({
                from: w,
                to: a.value,
                len: a.value - w - (a.size || 0),
              }),
              (f += a.value - w - (a.size || 0)));
          });
          e.breakArray = b;
          e.unitLength = u - m - f + c;
          r(e, "afterBreaks");
          e.options.staticScale
            ? (e.transA = e.options.staticScale)
            : e.unitLength && (e.transA *= (u - e.min + c) / e.unitLength);
          c && (e.minPixelPadding = e.transA * e.minPointOffset);
          e.min = m;
          e.max = u;
        }));
    });
    D(t.prototype, "generatePoints", function (a) {
      a.apply(this, E(arguments));
      var f = this.xAxis,
        g = this.yAxis,
        e = this.points,
        d,
        h = e.length,
        b = this.options.connectNulls,
        m;
      if (f && g && (f.options.breaks || g.options.breaks))
        for (; h--; )
          (d = e[h]),
            (m = null === d.y && !1 === b),
            m ||
              (!f.isInAnyBreak(d.x, !0) && !g.isInAnyBreak(d.y, !0)) ||
              (e.splice(h, 1), this.data[h] && this.data[h].destroyElements());
    });
    a.Series.prototype.drawBreaks = function (a, f) {
      var g = this,
        e = g.points,
        d,
        h,
        b,
        m;
      a &&
        n(f, function (f) {
          d = a.breakArray || [];
          h = a.isXAxis ? a.min : F(g.options.threshold, a.min);
          n(e, function (e) {
            m = F(e["stack" + f.toUpperCase()], e[f]);
            n(d, function (d) {
              b = !1;
              if ((h < d.from && m > d.to) || (h > d.from && m < d.from))
                b = "pointBreak";
              else if (
                (h < d.from && m > d.from && m < d.to) ||
                (h > d.from && m > d.to && m < d.from)
              )
                b = "pointInBreak";
              b && r(a, b, { point: e, brk: d });
            });
          });
        });
    };
    a.Series.prototype.gappedPath = function () {
      var a = this.options.gapSize,
        f = this.points.slice(),
        g = f.length - 1;
      if (a && 0 < g)
        for (; g--; )
          f[g + 1].x - f[g].x > this.closestPointRange * a &&
            f.splice(g + 1, 0, { isNull: !0 });
      return this.getGraphPath(f);
    };
    D(a.seriesTypes.column.prototype, "drawPoints", B);
    D(a.Series.prototype, "drawPoints", B);
  })(L);
  (function (a) {
    var E = a.arrayMax,
      B = a.arrayMin,
      F = a.Axis,
      D = a.defaultPlotOptions,
      n = a.defined,
      h = a.each,
      u = a.extend,
      r = a.format,
      x = a.isNumber,
      t = a.merge,
      m = a.pick,
      f = a.Point,
      g = a.Tooltip,
      e = a.wrap,
      d = a.Series.prototype,
      p = d.processData,
      b = d.generatePoints,
      A = d.destroy,
      v = {
        approximation: "average",
        groupPixelWidth: 2,
        dateTimeLabelFormats: {
          millisecond: [
            "%A, %b %e, %H:%M:%S.%L",
            "%A, %b %e, %H:%M:%S.%L",
            "-%H:%M:%S.%L",
          ],
          second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
          minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
          hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
          day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
          week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
          month: ["%B %Y", "%B", "-%B %Y"],
          year: ["%Y", "%Y", "-%Y"],
        },
      },
      H = {
        line: {},
        spline: {},
        area: {},
        areaspline: {},
        column: { approximation: "sum", groupPixelWidth: 10 },
        arearange: { approximation: "range" },
        areasplinerange: { approximation: "range" },
        columnrange: { approximation: "range", groupPixelWidth: 10 },
        candlestick: { approximation: "ohlc", groupPixelWidth: 10 },
        ohlc: { approximation: "ohlc", groupPixelWidth: 5 },
      },
      q = (a.defaultDataGroupingUnits = [
        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
        ["second", [1, 2, 5, 10, 15, 30]],
        ["minute", [1, 2, 5, 10, 15, 30]],
        ["hour", [1, 2, 3, 4, 6, 8, 12]],
        ["day", [1]],
        ["week", [1]],
        ["month", [1, 3, 6]],
        ["year", null],
      ]),
      J = {
        sum: function (a) {
          var c = a.length,
            b;
          if (!c && a.hasNulls) b = null;
          else if (c) for (b = 0; c--; ) b += a[c];
          return b;
        },
        average: function (a) {
          var c = a.length;
          a = J.sum(a);
          x(a) && c && (a /= c);
          return a;
        },
        averages: function () {
          var a = [];
          h(arguments, function (c) {
            a.push(J.average(c));
          });
          return a;
        },
        open: function (a) {
          return a.length ? a[0] : a.hasNulls ? null : void 0;
        },
        high: function (a) {
          return a.length ? E(a) : a.hasNulls ? null : void 0;
        },
        low: function (a) {
          return a.length ? B(a) : a.hasNulls ? null : void 0;
        },
        close: function (a) {
          return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0;
        },
        ohlc: function (a, b, d, e) {
          a = J.open(a);
          b = J.high(b);
          d = J.low(d);
          e = J.close(e);
          if (x(a) || x(b) || x(d) || x(e)) return [a, b, d, e];
        },
        range: function (a, b) {
          a = J.low(a);
          b = J.high(b);
          if (x(a) || x(b)) return [a, b];
          if (null === a && null === b) return null;
        },
      };
    d.groupData = function (a, b, d, e) {
      var c = this.data,
        f = this.options.data,
        g = [],
        k = [],
        p = [],
        m = a.length,
        n,
        q,
        r = !!b,
        w = [];
      e =
        "function" === typeof e
          ? e
          : J[e] ||
            (H[this.type] && J[H[this.type].approximation]) ||
            J[v.approximation];
      var u = this.pointArrayMap,
        t = u && u.length,
        y = 0;
      q = 0;
      var K, A;
      t
        ? h(u, function () {
            w.push([]);
          })
        : w.push([]);
      K = t || 1;
      for (A = 0; A <= m && !(a[A] >= d[0]); A++);
      for (A; A <= m; A++) {
        for (; (void 0 !== d[y + 1] && a[A] >= d[y + 1]) || A === m; ) {
          n = d[y];
          this.dataGroupInfo = { start: q, length: w[0].length };
          q = e.apply(this, w);
          void 0 !== q && (g.push(n), k.push(q), p.push(this.dataGroupInfo));
          q = A;
          for (n = 0; n < K; n++) (w[n].length = 0), (w[n].hasNulls = !1);
          y += 1;
          if (A === m) break;
        }
        if (A === m) break;
        if (u) {
          n = this.cropStart + A;
          var B =
              (c && c[n]) ||
              this.pointClass.prototype.applyOptions.apply({ series: this }, [
                f[n],
              ]),
            D;
          for (n = 0; n < t; n++)
            (D = B[u[n]]),
              x(D) ? w[n].push(D) : null === D && (w[n].hasNulls = !0);
        } else
          (n = r ? b[A] : null),
            x(n) ? w[0].push(n) : null === n && (w[0].hasNulls = !0);
      }
      return [g, k, p];
    };
    d.processData = function () {
      var a = this.chart,
        b = this.options.dataGrouping,
        e = !1 !== this.allowDG && b && m(b.enabled, a.options.isStock),
        f = this.visible || !a.options.chart.ignoreHiddenSeries,
        g;
      this.forceCrop = e;
      this.groupPixelWidth = null;
      this.hasProcessed = !0;
      if (!1 !== p.apply(this, arguments) && e) {
        this.destroyGroupedData();
        var l = this.processedXData,
          h = this.processedYData,
          k = a.plotSizeX,
          a = this.xAxis,
          v = a.options.ordinal,
          r = (this.groupPixelWidth =
            a.getGroupPixelWidth && a.getGroupPixelWidth());
        if (r) {
          this.isDirty = g = !0;
          this.points = null;
          var u = a.getExtremes(),
            e = u.min,
            u = u.max,
            v = (v && a.getGroupIntervalFactor(e, u, this)) || 1,
            k = ((r * (u - e)) / k) * v,
            r = a.getTimeTicks(
              a.normalizeTimeTickInterval(k, b.units || q),
              Math.min(e, l[0]),
              Math.max(u, l[l.length - 1]),
              a.options.startOfWeek,
              l,
              this.closestPointRange
            ),
            l = d.groupData.apply(this, [l, h, r, b.approximation]),
            h = l[0],
            v = l[1];
          if (b.smoothed) {
            b = h.length - 1;
            for (h[b] = Math.min(h[b], u); b-- && 0 < b; ) h[b] += k / 2;
            h[0] = Math.max(h[0], e);
          }
          this.currentDataGrouping = r.info;
          this.closestPointRange = r.info.totalRange;
          this.groupMap = l[2];
          n(h[0]) &&
            h[0] < a.dataMin &&
            f &&
            (a.min === a.dataMin && (a.min = h[0]), (a.dataMin = h[0]));
          this.processedXData = h;
          this.processedYData = v;
        } else this.currentDataGrouping = this.groupMap = null;
        this.hasGroupedData = g;
      }
    };
    d.destroyGroupedData = function () {
      var a = this.groupedData;
      h(a || [], function (c, b) {
        c && (a[b] = c.destroy ? c.destroy() : null);
      });
      this.groupedData = null;
    };
    d.generatePoints = function () {
      b.apply(this);
      this.destroyGroupedData();
      this.groupedData = this.hasGroupedData ? this.points : null;
    };
    e(f.prototype, "update", function (c) {
      this.dataGroup ? a.error(24) : c.apply(this, [].slice.call(arguments, 1));
    });
    e(g.prototype, "tooltipFooterHeaderFormatter", function (c, b, d) {
      var e = b.series,
        f = e.tooltipOptions,
        l = e.options.dataGrouping,
        g = f.xDateFormat,
        k,
        h = e.xAxis,
        p = a.dateFormat;
      return h && "datetime" === h.options.type && l && x(b.key)
        ? ((c = e.currentDataGrouping),
          (l = l.dateTimeLabelFormats),
          c
            ? ((h = l[c.unitName]),
              1 === c.count ? (g = h[0]) : ((g = h[1]), (k = h[2])))
            : !g && l && (g = this.getXDateFormat(b, f, h)),
          (g = p(g, b.key)),
          k && (g += p(k, b.key + c.totalRange - 1)),
          r(f[(d ? "footer" : "header") + "Format"], {
            point: u(b.point, { key: g }),
            series: e,
          }))
        : c.call(this, b, d);
    });
    d.destroy = function () {
      for (var a = this.groupedData || [], b = a.length; b--; )
        a[b] && a[b].destroy();
      A.apply(this);
    };
    e(d, "setOptions", function (a, b) {
      a = a.call(this, b);
      var c = this.type,
        d = this.chart.options.plotOptions,
        e = D[c].dataGrouping;
      H[c] &&
        (e || (e = t(v, H[c])),
        (a.dataGrouping = t(
          e,
          d.series && d.series.dataGrouping,
          d[c].dataGrouping,
          b.dataGrouping
        )));
      this.chart.options.isStock && (this.requireSorting = !0);
      return a;
    });
    e(F.prototype, "setScale", function (a) {
      a.call(this);
      h(this.series, function (a) {
        a.hasProcessed = !1;
      });
    });
    F.prototype.getGroupPixelWidth = function () {
      var a = this.series,
        b = a.length,
        d,
        e = 0,
        f = !1,
        l;
      for (d = b; d--; )
        (l = a[d].options.dataGrouping) && (e = Math.max(e, l.groupPixelWidth));
      for (d = b; d--; )
        (l = a[d].options.dataGrouping) &&
          a[d].hasProcessed &&
          ((b = (a[d].processedXData || a[d].data).length),
          a[d].groupPixelWidth ||
            b > this.chart.plotSizeX / e ||
            (b && l.forced)) &&
          (f = !0);
      return f ? e : 0;
    };
    F.prototype.setDataGrouping = function (a, b) {
      var c;
      b = m(b, !0);
      a || (a = { forced: !1, units: null });
      if (this instanceof F)
        for (c = this.series.length; c--; )
          this.series[c].update({ dataGrouping: a }, !1);
      else
        h(
          this.chart.options.series,
          function (c) {
            c.dataGrouping = a;
          },
          !1
        );
      b && this.chart.redraw();
    };
  })(L);
  (function (a) {
    var E = a.each,
      B = a.Point,
      F = a.seriesType,
      D = a.seriesTypes;
    F(
      "ohlc",
      "column",
      {
        lineWidth: 1,
        tooltip: {
          pointFormat:
            '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e',
        },
        threshold: null,
        states: { hover: { lineWidth: 3 } },
        stickyTracking: !0,
      },
      {
        directTouch: !1,
        pointArrayMap: ["open", "high", "low", "close"],
        toYData: function (a) {
          return [a.open, a.high, a.low, a.close];
        },
        pointValKey: "close",
        pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" },
        pointAttribs: function (a, h) {
          h = D.column.prototype.pointAttribs.call(this, a, h);
          var n = this.options;
          delete h.fill;
          !a.options.color &&
            n.upColor &&
            a.open < a.close &&
            (h.stroke = n.upColor);
          return h;
        },
        translate: function () {
          var a = this,
            h = a.yAxis,
            u = !!a.modifyValue,
            r = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
          D.column.prototype.translate.apply(a);
          E(a.points, function (n) {
            E([n.open, n.high, n.low, n.close, n.low], function (t, m) {
              null !== t &&
                (u && (t = a.modifyValue(t)), (n[r[m]] = h.toPixels(t, !0)));
            });
            n.tooltipPos[1] = n.plotHigh + h.pos - a.chart.plotTop;
          });
        },
        drawPoints: function () {
          var a = this,
            h = a.chart;
          E(a.points, function (n) {
            var r,
              u,
              t,
              m,
              f = n.graphic,
              g,
              e = !f;
            void 0 !== n.plotY &&
              (f || (n.graphic = f = h.renderer.path().add(a.group)),
              f.attr(a.pointAttribs(n, n.selected && "select")),
              (u = (f.strokeWidth() % 2) / 2),
              (g = Math.round(n.plotX) - u),
              (t = Math.round(n.shapeArgs.width / 2)),
              (m = [
                "M",
                g,
                Math.round(n.yBottom),
                "L",
                g,
                Math.round(n.plotHigh),
              ]),
              null !== n.open &&
                ((r = Math.round(n.plotOpen) + u),
                m.push("M", g, r, "L", g - t, r)),
              null !== n.close &&
                ((r = Math.round(n.plotClose) + u),
                m.push("M", g, r, "L", g + t, r)),
              f[e ? "attr" : "animate"]({ d: m }).addClass(
                n.getClassName(),
                !0
              ));
          });
        },
        animate: null,
      },
      {
        getClassName: function () {
          return (
            B.prototype.getClassName.call(this) +
            (this.open < this.close
              ? " highcharts-point-up"
              : " highcharts-point-down")
          );
        },
      }
    );
  })(L);
  (function (a) {
    var E = a.defaultPlotOptions,
      B = a.each,
      F = a.merge,
      D = a.seriesType,
      n = a.seriesTypes;
    D(
      "candlestick",
      "ohlc",
      F(E.column, {
        states: { hover: { lineWidth: 2 } },
        tooltip: E.ohlc.tooltip,
        threshold: null,
        lineColor: "#000000",
        lineWidth: 1,
        upColor: "#ffffff",
        stickyTracking: !0,
      }),
      {
        pointAttribs: function (a, u) {
          var h = n.column.prototype.pointAttribs.call(this, a, u),
            x = this.options,
            t = a.open < a.close,
            m = x.lineColor || this.color;
          h["stroke-width"] = x.lineWidth;
          h.fill =
            a.options.color || (t ? x.upColor || this.color : this.color);
          h.stroke = a.lineColor || (t ? x.upLineColor || m : m);
          u &&
            ((a = x.states[u]),
            (h.fill = a.color || h.fill),
            (h.stroke = a.lineColor || h.stroke),
            (h["stroke-width"] = a.lineWidth || h["stroke-width"]));
          return h;
        },
        drawPoints: function () {
          var a = this,
            n = a.chart;
          B(a.points, function (h) {
            var r = h.graphic,
              t,
              m,
              f,
              g,
              e,
              d,
              p,
              b = !r;
            void 0 !== h.plotY &&
              (r || (h.graphic = r = n.renderer.path().add(a.group)),
              r
                .attr(a.pointAttribs(h, h.selected && "select"))
                .shadow(a.options.shadow),
              (e = (r.strokeWidth() % 2) / 2),
              (d = Math.round(h.plotX) - e),
              (t = h.plotOpen),
              (m = h.plotClose),
              (f = Math.min(t, m)),
              (t = Math.max(t, m)),
              (p = Math.round(h.shapeArgs.width / 2)),
              (m = Math.round(f) !== Math.round(h.plotHigh)),
              (g = t !== h.yBottom),
              (f = Math.round(f) + e),
              (t = Math.round(t) + e),
              (e = []),
              e.push(
                "M",
                d - p,
                t,
                "L",
                d - p,
                f,
                "L",
                d + p,
                f,
                "L",
                d + p,
                t,
                "Z",
                "M",
                d,
                f,
                "L",
                d,
                m ? Math.round(h.plotHigh) : f,
                "M",
                d,
                t,
                "L",
                d,
                g ? Math.round(h.yBottom) : t
              ),
              r[b ? "attr" : "animate"]({ d: e }).addClass(
                h.getClassName(),
                !0
              ));
          });
        },
      }
    );
  })(L);
  (function (a) {
    var E = a.addEvent,
      B = a.each,
      F = a.merge,
      D = a.noop,
      n = a.Renderer,
      h = a.seriesType,
      u = a.seriesTypes,
      r = a.TrackerMixin,
      x = a.VMLRenderer,
      t = a.SVGRenderer.prototype.symbols,
      m = a.stableSort;
    h(
      "flags",
      "column",
      {
        pointRange: 0,
        shape: "flag",
        stackDistance: 12,
        textAlign: "center",
        tooltip: { pointFormat: "{point.text}\x3cbr/\x3e" },
        threshold: null,
        y: -30,
        fillColor: "#ffffff",
        lineWidth: 1,
        states: { hover: { lineColor: "#000000", fillColor: "#ccd6eb" } },
        style: { fontSize: "11px", fontWeight: "bold" },
      },
      {
        sorted: !1,
        noSharedTooltip: !0,
        allowDG: !1,
        takeOrdinalPosition: !1,
        trackerGroups: ["markerGroup"],
        forceCrop: !0,
        init: a.Series.prototype.init,
        pointAttribs: function (a, g) {
          var e = this.options,
            d = (a && a.color) || this.color,
            f = e.lineColor,
            b = a && a.lineWidth;
          a = (a && a.fillColor) || e.fillColor;
          g &&
            ((a = e.states[g].fillColor),
            (f = e.states[g].lineColor),
            (b = e.states[g].lineWidth));
          return {
            fill: a || d,
            stroke: f || d,
            "stroke-width": b || e.lineWidth || 0,
          };
        },
        translate: function () {
          u.column.prototype.translate.apply(this);
          var a = this.options,
            g = this.chart,
            e = this.points,
            d = e.length - 1,
            h,
            b,
            n = a.onSeries;
          h = n && g.get(n);
          var a = a.onKey || "y",
            n = h && h.options.step,
            v = h && h.points,
            r = v && v.length,
            q = this.xAxis,
            t = this.yAxis,
            c = q.getExtremes(),
            w = 0,
            x,
            y,
            G;
          if (h && h.visible && r)
            for (
              w = (h.pointXOffset || 0) + (h.barW || 0) / 2,
                h = h.currentDataGrouping,
                y = v[r - 1].x + (h ? h.totalRange : 0),
                m(e, function (a, c) {
                  return a.x - c.x;
                }),
                a = "plot" + a[0].toUpperCase() + a.substr(1);
              r-- &&
              e[d] &&
              !((h = e[d]),
              (x = v[r]),
              x.x <= h.x &&
                void 0 !== x[a] &&
                (h.x <= y &&
                  ((h.plotY = x[a]),
                  x.x < h.x &&
                    !n &&
                    (G = v[r + 1]) &&
                    void 0 !== G[a] &&
                    (h.plotY += ((h.x - x.x) / (G.x - x.x)) * (G[a] - x[a]))),
                d--,
                r++,
                0 > d));

            );
          B(e, function (a, d) {
            var f;
            void 0 === a.plotY &&
              (a.x >= c.min && a.x <= c.max
                ? (a.plotY =
                    g.chartHeight -
                    q.bottom -
                    (q.opposite ? q.height : 0) +
                    q.offset -
                    t.top)
                : (a.shapeArgs = {}));
            a.plotX += w;
            (b = e[d - 1]) &&
              b.plotX === a.plotX &&
              (void 0 === b.stackIndex && (b.stackIndex = 0),
              (f = b.stackIndex + 1));
            a.stackIndex = f;
          });
        },
        drawPoints: function () {
          var f = this.points,
            g = this.chart,
            e = g.renderer,
            d,
            h,
            b = this.options,
            m = b.y,
            n,
            r,
            q,
            t,
            c,
            w,
            u,
            y = this.yAxis;
          for (r = f.length; r--; )
            (q = f[r]),
              (u = q.plotX > this.xAxis.len),
              (d = q.plotX),
              (t = q.stackIndex),
              (n = q.options.shape || b.shape),
              (h = q.plotY),
              void 0 !== h &&
                (h = q.plotY + m - (void 0 !== t && t * b.stackDistance)),
              (c = t ? void 0 : q.plotX),
              (w = t ? void 0 : q.plotY),
              (t = q.graphic),
              void 0 !== h && 0 <= d && !u
                ? (t ||
                    ((t = q.graphic =
                      e
                        .label("", null, null, n, null, null, b.useHTML)
                        .attr(this.pointAttribs(q))
                        .css(F(b.style, q.style))
                        .attr({
                          align: "flag" === n ? "left" : "center",
                          width: b.width,
                          height: b.height,
                          "text-align": b.textAlign,
                        })
                        .addClass("highcharts-point")
                        .add(this.markerGroup)),
                    q.graphic.div && (q.graphic.div.point = q),
                    t.shadow(b.shadow)),
                  0 < d && (d -= t.strokeWidth() % 2),
                  t.attr({
                    text: q.options.title || b.title || "A",
                    x: d,
                    y: h,
                    anchorX: c,
                    anchorY: w,
                  }),
                  (q.tooltipPos = g.inverted
                    ? [y.len + y.pos - g.plotLeft - h, this.xAxis.len - d]
                    : [d, h + y.pos - g.plotTop]))
                : t && (q.graphic = t.destroy());
          b.useHTML &&
            a.wrap(this.markerGroup, "on", function (c) {
              return a.SVGElement.prototype.on.apply(
                c.apply(this, [].slice.call(arguments, 1)),
                [].slice.call(arguments, 1)
              );
            });
        },
        drawTracker: function () {
          var a = this.points;
          r.drawTrackerPoint.apply(this);
          B(a, function (f) {
            var e = f.graphic;
            e &&
              E(e.element, "mouseover", function () {
                0 < f.stackIndex &&
                  !f.raised &&
                  ((f._y = e.y), e.attr({ y: f._y - 8 }), (f.raised = !0));
                B(a, function (a) {
                  a !== f &&
                    a.raised &&
                    a.graphic &&
                    (a.graphic.attr({ y: a._y }), (a.raised = !1));
                });
              });
          });
        },
        animate: D,
        buildKDTree: D,
        setClip: D,
      }
    );
    t.flag = function (a, g, e, d, h) {
      return [
        "M",
        (h && h.anchorX) || a,
        (h && h.anchorY) || g,
        "L",
        a,
        g + d,
        a,
        g,
        a + e,
        g,
        a + e,
        g + d,
        a,
        g + d,
        "Z",
      ];
    };
    B(["circle", "square"], function (a) {
      t[a + "pin"] = function (f, e, d, h, b) {
        var g = b && b.anchorX;
        b = b && b.anchorY;
        "circle" === a && h > d && ((f -= Math.round((h - d) / 2)), (d = h));
        f = t[a](f, e, d, h);
        g && b && f.push("M", g, e > b ? e : e + h, "L", g, b);
        return f;
      };
    });
    n === x &&
      B(["flag", "circlepin", "squarepin"], function (a) {
        x.prototype.symbols[a] = t[a];
      });
  })(L);
  (function (a) {
    function E(a, b, d) {
      this.init(a, b, d);
    }
    var B = a.addEvent,
      F = a.Axis,
      D = a.correctFloat,
      n = a.defaultOptions,
      h = a.defined,
      u = a.destroyObjectProperties,
      r = a.doc,
      x = a.each,
      t = a.fireEvent,
      m = a.hasTouch,
      f = a.isTouchDevice,
      g = a.merge,
      e = a.pick,
      d = a.removeEvent,
      p = a.wrap,
      b,
      A = {
        height: f ? 20 : 14,
        barBorderRadius: 0,
        buttonBorderRadius: 0,
        liveRedraw: a.svg && !f,
        margin: 10,
        minWidth: 6,
        step: 0.2,
        zIndex: 3,
        barBackgroundColor: "#cccccc",
        barBorderWidth: 1,
        barBorderColor: "#cccccc",
        buttonArrowColor: "#333333",
        buttonBackgroundColor: "#e6e6e6",
        buttonBorderColor: "#cccccc",
        buttonBorderWidth: 1,
        rifleColor: "#333333",
        trackBackgroundColor: "#f2f2f2",
        trackBorderColor: "#f2f2f2",
        trackBorderWidth: 1,
      };
    n.scrollbar = g(!0, A, n.scrollbar);
    a.swapXY = b = function (a, b) {
      var d = a.length,
        e;
      if (b)
        for (b = 0; b < d; b += 3)
          (e = a[b + 1]), (a[b + 1] = a[b + 2]), (a[b + 2] = e);
      return a;
    };
    E.prototype = {
      init: function (a, b, d) {
        this.scrollbarButtons = [];
        this.renderer = a;
        this.userOptions = b;
        this.options = g(A, b);
        this.chart = d;
        this.size = e(this.options.size, this.options.height);
        b.enabled && (this.render(), this.initEvents(), this.addEvents());
      },
      render: function () {
        var a = this.renderer,
          d = this.options,
          e = this.size,
          f;
        this.group = f = a
          .g("scrollbar")
          .attr({ zIndex: d.zIndex, translateY: -99999 })
          .add();
        this.track = a
          .rect()
          .addClass("highcharts-scrollbar-track")
          .attr({ x: 0, r: d.trackBorderRadius || 0, height: e, width: e })
          .add(f);
        this.track.attr({
          fill: d.trackBackgroundColor,
          stroke: d.trackBorderColor,
          "stroke-width": d.trackBorderWidth,
        });
        this.trackBorderWidth = this.track.strokeWidth();
        this.track.attr({ y: (-this.trackBorderWidth % 2) / 2 });
        this.scrollbarGroup = a.g().add(f);
        this.scrollbar = a
          .rect()
          .addClass("highcharts-scrollbar-thumb")
          .attr({ height: e, width: e, r: d.barBorderRadius || 0 })
          .add(this.scrollbarGroup);
        this.scrollbarRifles = a
          .path(
            b(
              [
                "M",
                -3,
                e / 4,
                "L",
                -3,
                (2 * e) / 3,
                "M",
                0,
                e / 4,
                "L",
                0,
                (2 * e) / 3,
                "M",
                3,
                e / 4,
                "L",
                3,
                (2 * e) / 3,
              ],
              d.vertical
            )
          )
          .addClass("highcharts-scrollbar-rifles")
          .add(this.scrollbarGroup);
        this.scrollbar.attr({
          fill: d.barBackgroundColor,
          stroke: d.barBorderColor,
          "stroke-width": d.barBorderWidth,
        });
        this.scrollbarRifles.attr({ stroke: d.rifleColor, "stroke-width": 1 });
        this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
        this.scrollbarGroup.translate(
          (-this.scrollbarStrokeWidth % 2) / 2,
          (-this.scrollbarStrokeWidth % 2) / 2
        );
        this.drawScrollbarButton(0);
        this.drawScrollbarButton(1);
      },
      position: function (a, b, d, e) {
        var c = this.options.vertical,
          f = 0,
          g = this.rendered ? "animate" : "attr";
        this.x = a;
        this.y = b + this.trackBorderWidth;
        this.width = d;
        this.xOffset = this.height = e;
        this.yOffset = f;
        c
          ? ((this.width = this.yOffset = d = f = this.size),
            (this.xOffset = b = 0),
            (this.barWidth = e - 2 * d),
            (this.x = a += this.options.margin))
          : ((this.height = this.xOffset = e = b = this.size),
            (this.barWidth = d - 2 * e),
            (this.y += this.options.margin));
        this.group[g]({ translateX: a, translateY: this.y });
        this.track[g]({ width: d, height: e });
        this.scrollbarButtons[1][g]({
          translateX: c ? 0 : d - b,
          translateY: c ? e - f : 0,
        });
      },
      drawScrollbarButton: function (a) {
        var d = this.renderer,
          e = this.scrollbarButtons,
          f = this.options,
          c = this.size,
          g;
        g = d.g().add(this.group);
        e.push(g);
        g = d.rect().addClass("highcharts-scrollbar-button").add(g);
        g.attr({
          stroke: f.buttonBorderColor,
          "stroke-width": f.buttonBorderWidth,
          fill: f.buttonBackgroundColor,
        });
        g.attr(
          g.crisp(
            {
              x: -0.5,
              y: -0.5,
              width: c + 1,
              height: c + 1,
              r: f.buttonBorderRadius,
            },
            g.strokeWidth()
          )
        );
        g = d
          .path(
            b(
              [
                "M",
                c / 2 + (a ? -1 : 1),
                c / 2 - 3,
                "L",
                c / 2 + (a ? -1 : 1),
                c / 2 + 3,
                "L",
                c / 2 + (a ? 2 : -2),
                c / 2,
              ],
              f.vertical
            )
          )
          .addClass("highcharts-scrollbar-arrow")
          .add(e[a]);
        g.attr({ fill: f.buttonArrowColor });
      },
      setRange: function (a, b) {
        var d = this.options,
          e = d.vertical,
          c = d.minWidth,
          f = this.barWidth,
          g,
          m,
          n = this.rendered && !this.hasDragged ? "animate" : "attr";
        h(f) &&
          ((a = Math.max(a, 0)),
          (g = Math.ceil(f * a)),
          (this.calculatedWidth = m = D(f * Math.min(b, 1) - g)),
          m < c && ((g = (f - c + m) * a), (m = c)),
          (c = Math.floor(g + this.xOffset + this.yOffset)),
          (f = m / 2 - 0.5),
          (this.from = a),
          (this.to = b),
          e
            ? (this.scrollbarGroup[n]({ translateY: c }),
              this.scrollbar[n]({ height: m }),
              this.scrollbarRifles[n]({ translateY: f }),
              (this.scrollbarTop = c),
              (this.scrollbarLeft = 0))
            : (this.scrollbarGroup[n]({ translateX: c }),
              this.scrollbar[n]({ width: m }),
              this.scrollbarRifles[n]({ translateX: f }),
              (this.scrollbarLeft = c),
              (this.scrollbarTop = 0)),
          12 >= m ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0),
          !1 === d.showFull &&
            (0 >= a && 1 <= b ? this.group.hide() : this.group.show()),
          (this.rendered = !0));
      },
      initEvents: function () {
        var a = this;
        a.mouseMoveHandler = function (b) {
          var d = a.chart.pointer.normalize(b),
            e = a.options.vertical ? "chartY" : "chartX",
            c = a.initPositions;
          !a.grabbedCenter ||
            (b.touches && 0 === b.touches[0][e]) ||
            ((d = a.cursorToScrollbarPosition(d)[e]),
            (e = a[e]),
            (e = d - e),
            (a.hasDragged = !0),
            a.updatePosition(c[0] + e, c[1] + e),
            a.hasDragged &&
              t(a, "changed", {
                from: a.from,
                to: a.to,
                trigger: "scrollbar",
                DOMType: b.type,
                DOMEvent: b,
              }));
        };
        a.mouseUpHandler = function (b) {
          a.hasDragged &&
            t(a, "changed", {
              from: a.from,
              to: a.to,
              trigger: "scrollbar",
              DOMType: b.type,
              DOMEvent: b,
            });
          a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null;
        };
        a.mouseDownHandler = function (b) {
          b = a.chart.pointer.normalize(b);
          b = a.cursorToScrollbarPosition(b);
          a.chartX = b.chartX;
          a.chartY = b.chartY;
          a.initPositions = [a.from, a.to];
          a.grabbedCenter = !0;
        };
        a.buttonToMinClick = function (b) {
          var d = D(a.to - a.from) * a.options.step;
          a.updatePosition(D(a.from - d), D(a.to - d));
          t(a, "changed", {
            from: a.from,
            to: a.to,
            trigger: "scrollbar",
            DOMEvent: b,
          });
        };
        a.buttonToMaxClick = function (b) {
          var d = (a.to - a.from) * a.options.step;
          a.updatePosition(a.from + d, a.to + d);
          t(a, "changed", {
            from: a.from,
            to: a.to,
            trigger: "scrollbar",
            DOMEvent: b,
          });
        };
        a.trackClick = function (b) {
          var d = a.chart.pointer.normalize(b),
            e = a.to - a.from,
            c = a.y + a.scrollbarTop,
            f = a.x + a.scrollbarLeft;
          (a.options.vertical && d.chartY > c) ||
          (!a.options.vertical && d.chartX > f)
            ? a.updatePosition(a.from + e, a.to + e)
            : a.updatePosition(a.from - e, a.to - e);
          t(a, "changed", {
            from: a.from,
            to: a.to,
            trigger: "scrollbar",
            DOMEvent: b,
          });
        };
      },
      cursorToScrollbarPosition: function (a) {
        var b = this.options,
          b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
        return {
          chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - b),
          chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - b),
        };
      },
      updatePosition: function (a, b) {
        1 < b && ((a = D(1 - D(b - a))), (b = 1));
        0 > a && ((b = D(b - a)), (a = 0));
        this.from = a;
        this.to = b;
      },
      update: function (a) {
        this.destroy();
        this.init(this.chart.renderer, g(!0, this.options, a), this.chart);
      },
      addEvents: function () {
        var a = this.options.inverted ? [1, 0] : [0, 1],
          b = this.scrollbarButtons,
          d = this.scrollbarGroup.element,
          e = this.mouseDownHandler,
          c = this.mouseMoveHandler,
          f = this.mouseUpHandler,
          a = [
            [b[a[0]].element, "click", this.buttonToMinClick],
            [b[a[1]].element, "click", this.buttonToMaxClick],
            [this.track.element, "click", this.trackClick],
            [d, "mousedown", e],
            [r, "mousemove", c],
            [r, "mouseup", f],
          ];
        m &&
          a.push([d, "touchstart", e], [r, "touchmove", c], [r, "touchend", f]);
        x(a, function (a) {
          B.apply(null, a);
        });
        this._events = a;
      },
      removeEvents: function () {
        x(this._events, function (a) {
          d.apply(null, a);
        });
        this._events.length = 0;
      },
      destroy: function () {
        var a = this.chart.scroller;
        this.removeEvents();
        x(
          ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"],
          function (a) {
            this[a] && this[a].destroy && (this[a] = this[a].destroy());
          },
          this
        );
        a &&
          this === a.scrollbar &&
          ((a.scrollbar = null), u(a.scrollbarButtons));
      },
    };
    p(F.prototype, "init", function (a) {
      var b = this;
      a.apply(b, Array.prototype.slice.call(arguments, 1));
      b.options.scrollbar &&
        b.options.scrollbar.enabled &&
        ((b.options.scrollbar.vertical = !b.horiz),
        (b.options.startOnTick = b.options.endOnTick = !1),
        (b.scrollbar = new E(b.chart.renderer, b.options.scrollbar, b.chart)),
        B(b.scrollbar, "changed", function (a) {
          var d = Math.min(e(b.options.min, b.min), b.min, b.dataMin),
            c = Math.max(e(b.options.max, b.max), b.max, b.dataMax) - d,
            f;
          (b.horiz && !b.reversed) || (!b.horiz && b.reversed)
            ? ((f = d + c * this.to), (d += c * this.from))
            : ((f = d + c * (1 - this.from)), (d += c * (1 - this.to)));
          b.setExtremes(d, f, !0, !1, a);
        }));
    });
    p(F.prototype, "render", function (a) {
      var b = Math.min(e(this.options.min, this.min), this.min, this.dataMin),
        d = Math.max(e(this.options.max, this.max), this.max, this.dataMax),
        f = this.scrollbar,
        c = this.titleOffset || 0;
      a.apply(this, Array.prototype.slice.call(arguments, 1));
      if (f) {
        this.horiz
          ? (f.position(
              this.left,
              this.top +
                this.height +
                2 +
                this.chart.scrollbarsOffsets[1] +
                (this.opposite ? 0 : c + this.axisTitleMargin + this.offset),
              this.width,
              this.height
            ),
            (c = 1))
          : (f.position(
              this.left +
                this.width +
                2 +
                this.chart.scrollbarsOffsets[0] +
                (this.opposite ? c + this.axisTitleMargin + this.offset : 0),
              this.top,
              this.width,
              this.height
            ),
            (c = 0));
        if ((!this.opposite && !this.horiz) || (this.opposite && this.horiz))
          this.chart.scrollbarsOffsets[c] +=
            this.scrollbar.size + this.scrollbar.options.margin;
        isNaN(b) || isNaN(d) || !h(this.min) || !h(this.max)
          ? f.setRange(0, 0)
          : ((c = (this.min - b) / (d - b)),
            (b = (this.max - b) / (d - b)),
            (this.horiz && !this.reversed) || (!this.horiz && this.reversed)
              ? f.setRange(c, b)
              : f.setRange(1 - b, 1 - c));
      }
    });
    p(F.prototype, "getOffset", function (a) {
      var b = this.horiz ? 2 : 1,
        d = this.scrollbar;
      a.apply(this, Array.prototype.slice.call(arguments, 1));
      d &&
        ((this.chart.scrollbarsOffsets = [0, 0]),
        (this.chart.axisOffset[b] += d.size + d.options.margin));
    });
    p(F.prototype, "destroy", function (a) {
      this.scrollbar && (this.scrollbar = this.scrollbar.destroy());
      a.apply(this, Array.prototype.slice.call(arguments, 1));
    });
    a.Scrollbar = E;
  })(L);
  (function (a) {
    function E(a) {
      this.init(a);
    }
    var B = a.addEvent,
      F = a.Axis,
      D = a.Chart,
      n = a.color,
      h = a.defaultOptions,
      u = a.defined,
      r = a.destroyObjectProperties,
      x = a.doc,
      t = a.each,
      m = a.erase,
      f = a.error,
      g = a.extend,
      e = a.grep,
      d = a.hasTouch,
      p = a.isNumber,
      b = a.isObject,
      A = a.merge,
      v = a.pick,
      H = a.removeEvent,
      q = a.Scrollbar,
      J = a.Series,
      c = a.seriesTypes,
      w = a.wrap,
      K = a.swapXY,
      y = [].concat(a.defaultDataGroupingUnits),
      G = function (a) {
        var b = e(arguments, p);
        if (b.length) return Math[a].apply(0, b);
      };
    y[4] = ["day", [1, 2, 3, 4]];
    y[5] = ["week", [1, 2, 3]];
    c = void 0 === c.areaspline ? "line" : "areaspline";
    g(h, {
      navigator: {
        height: 40,
        margin: 25,
        maskInside: !0,
        handles: { backgroundColor: "#f2f2f2", borderColor: "#999999" },
        maskFill: n("#6685c2").setOpacity(0.3).get(),
        outlineColor: "#cccccc",
        outlineWidth: 1,
        series: {
          type: c,
          color: "#335cad",
          fillOpacity: 0.05,
          lineWidth: 1,
          compare: null,
          dataGrouping: {
            approximation: "average",
            enabled: !0,
            groupPixelWidth: 2,
            smoothed: !0,
            units: y,
          },
          dataLabels: { enabled: !1, zIndex: 2 },
          id: "highcharts-navigator-series",
          className: "highcharts-navigator-series",
          lineColor: null,
          marker: { enabled: !1 },
          pointRange: 0,
          shadow: !1,
          threshold: null,
        },
        xAxis: {
          className: "highcharts-navigator-xaxis",
          tickLength: 0,
          lineWidth: 0,
          gridLineColor: "#e6e6e6",
          gridLineWidth: 1,
          tickPixelInterval: 200,
          labels: { align: "left", style: { color: "#999999" }, x: 3, y: -4 },
          crosshair: !1,
        },
        yAxis: {
          className: "highcharts-navigator-yaxis",
          gridLineWidth: 0,
          startOnTick: !1,
          endOnTick: !1,
          minPadding: 0.1,
          maxPadding: 0.1,
          labels: { enabled: !1 },
          crosshair: !1,
          title: { text: null },
          tickLength: 0,
          tickWidth: 0,
        },
      },
    });
    E.prototype = {
      drawHandle: function (a, b, c, d) {
        this.handles[b][d](
          c
            ? {
                translateX: Math.round(this.left + this.height / 2 - 8),
                translateY: Math.round(this.top + parseInt(a, 10) + 0.5),
              }
            : {
                translateX: Math.round(this.left + parseInt(a, 10)),
                translateY: Math.round(this.top + this.height / 2 - 8),
              }
        );
      },
      getHandlePath: function (a) {
        return K(
          [
            "M",
            -4.5,
            0.5,
            "L",
            3.5,
            0.5,
            "L",
            3.5,
            15.5,
            "L",
            -4.5,
            15.5,
            "L",
            -4.5,
            0.5,
            "M",
            -1.5,
            4,
            "L",
            -1.5,
            12,
            "M",
            0.5,
            4,
            "L",
            0.5,
            12,
          ],
          a
        );
      },
      drawOutline: function (a, b, c, d) {
        var e = this.navigatorOptions.maskInside,
          f = this.outline.strokeWidth(),
          l = f / 2,
          f = (f % 2) / 2,
          k = this.outlineHeight,
          g = this.scrollbarHeight,
          h = this.size,
          m = this.left - g,
          n = this.top;
        c
          ? ((m -= l),
            (c = n + b + f),
            (b = n + a + f),
            (a = [
              "M",
              m + k,
              n - g - f,
              "L",
              m + k,
              c,
              "L",
              m,
              c,
              "L",
              m,
              b,
              "L",
              m + k,
              b,
              "L",
              m + k,
              n + h + g,
            ].concat(e ? ["M", m + k, c - l, "L", m + k, b + l] : [])))
          : ((a += m + g - f),
            (b += m + g - f),
            (n += l),
            (a = [
              "M",
              m,
              n,
              "L",
              a,
              n,
              "L",
              a,
              n + k,
              "L",
              b,
              n + k,
              "L",
              b,
              n,
              "L",
              m + h + 2 * g,
              n,
            ].concat(e ? ["M", a - l, n, "L", b + l, n] : [])));
        this.outline[d]({ d: a });
      },
      drawMasks: function (a, b, c, d) {
        var e = this.left,
          f = this.top,
          l = this.height,
          k,
          g,
          h,
          m;
        c
          ? ((h = [e, e, e]),
            (m = [f, f + a, f + b]),
            (g = [l, l, l]),
            (k = [a, b - a, this.size - b]))
          : ((h = [e, e + a, e + b]),
            (m = [f, f, f]),
            (g = [a, b - a, this.size - b]),
            (k = [l, l, l]));
        t(this.shades, function (a, b) {
          a[d]({ x: h[b], y: m[b], width: g[b], height: k[b] });
        });
      },
      renderElements: function () {
        var a = this,
          b = a.navigatorOptions,
          c = b.maskInside,
          d = a.chart,
          e = d.inverted,
          f = d.renderer,
          g;
        a.navigatorGroup = g = f
          .g("navigator")
          .attr({ zIndex: 8, visibility: "hidden" })
          .add();
        var h = { cursor: e ? "ns-resize" : "ew-resize" };
        t([!c, c, !c], function (c, d) {
          a.shades[d] = f
            .rect()
            .addClass(
              "highcharts-navigator-mask" + (1 === d ? "-inside" : "-outside")
            )
            .attr({ fill: c ? b.maskFill : "rgba(0,0,0,0)" })
            .css(1 === d && h)
            .add(g);
        });
        a.outline = f
          .path()
          .addClass("highcharts-navigator-outline")
          .attr({ "stroke-width": b.outlineWidth, stroke: b.outlineColor })
          .add(g);
        t([0, 1], function (c) {
          a.handles[c] = f
            .path(a.getHandlePath(e))
            .attr({ zIndex: 7 - c })
            .addClass(
              "highcharts-navigator-handle highcharts-navigator-handle-" +
                ["left", "right"][c]
            )
            .add(g);
          var d = b.handles;
          a.handles[c]
            .attr({
              fill: d.backgroundColor,
              stroke: d.borderColor,
              "stroke-width": 1,
            })
            .css(h);
        });
      },
      update: function (a) {
        this.destroy();
        A(!0, this.chart.options.navigator, this.options, a);
        this.init(this.chart);
      },
      render: function (a, b, c, d) {
        var e = this.chart,
          f,
          l,
          k = this.scrollbarHeight,
          g,
          h = this.xAxis;
        f = h.fake ? e.xAxis[0] : h;
        var m = this.navigatorEnabled,
          n,
          q = this.rendered;
        l = e.inverted;
        var r = e.xAxis[0].minRange;
        if (!this.hasDragged || u(c)) {
          if (!p(a) || !p(b))
            if (q) (c = 0), (d = h.width);
            else return;
          this.left = v(h.left, e.plotLeft + k + (l ? e.plotWidth : 0));
          this.size =
            n =
            g =
              v(h.len, (l ? e.plotHeight : e.plotWidth) - 2 * k);
          e = l ? k : g + 2 * k;
          c = v(c, h.toPixels(a, !0));
          d = v(d, h.toPixels(b, !0));
          (p(c) && Infinity !== Math.abs(c)) || ((c = 0), (d = e));
          a = h.toValue(c, !0);
          b = h.toValue(d, !0);
          if (Math.abs(b - a) < r)
            if (this.grabbedLeft) c = h.toPixels(b - r, !0);
            else if (this.grabbedRight) d = h.toPixels(a + r, !0);
            else return;
          this.zoomedMax = Math.min(Math.max(c, d, 0), n);
          this.zoomedMin = Math.min(
            Math.max(
              this.fixedWidth
                ? this.zoomedMax - this.fixedWidth
                : Math.min(c, d),
              0
            ),
            n
          );
          this.range = this.zoomedMax - this.zoomedMin;
          n = Math.round(this.zoomedMax);
          c = Math.round(this.zoomedMin);
          m &&
            (this.navigatorGroup.attr({ visibility: "visible" }),
            (q = q && !this.hasDragged ? "animate" : "attr"),
            this.drawMasks(c, n, l, q),
            this.drawOutline(c, n, l, q),
            this.drawHandle(c, 0, l, q),
            this.drawHandle(n, 1, l, q));
          this.scrollbar &&
            (l
              ? ((l = this.top - k),
                (f =
                  this.left -
                  k +
                  (m || !f.opposite
                    ? 0
                    : (f.titleOffset || 0) + f.axisTitleMargin)),
                (k = g + 2 * k))
              : ((l = this.top + (m ? this.height : -k)), (f = this.left - k)),
            this.scrollbar.position(f, l, e, k),
            this.scrollbar.setRange(this.zoomedMin / g, this.zoomedMax / g));
          this.rendered = !0;
        }
      },
      addMouseEvents: function () {
        var a = this,
          b = a.chart,
          c = b.container,
          e = [],
          f,
          g;
        a.mouseMoveHandler = f = function (b) {
          a.onMouseMove(b);
        };
        a.mouseUpHandler = g = function (b) {
          a.onMouseUp(b);
        };
        e = a.getPartsEvents("mousedown");
        e.push(B(c, "mousemove", f), B(x, "mouseup", g));
        d &&
          (e.push(B(c, "touchmove", f), B(x, "touchend", g)),
          e.concat(a.getPartsEvents("touchstart")));
        a.eventsToUnbind = e;
        a.series &&
          a.series[0] &&
          e.push(
            B(a.series[0].xAxis, "foundExtremes", function () {
              b.navigator.modifyNavigatorAxisExtremes();
            })
          );
      },
      getPartsEvents: function (a) {
        var b = this,
          c = [];
        t(["shades", "handles"], function (d) {
          t(b[d], function (e, f) {
            c.push(
              B(e.element, a, function (a) {
                b[d + "Mousedown"](a, f);
              })
            );
          });
        });
        return c;
      },
      shadesMousedown: function (a, b) {
        a = this.chart.pointer.normalize(a);
        var c = this.chart,
          d = this.xAxis,
          e = this.zoomedMin,
          f = this.left,
          l = this.size,
          g = this.range,
          h = a.chartX,
          m;
        c.inverted && ((h = a.chartY), (f = this.top));
        1 === b
          ? ((this.grabbedCenter = h),
            (this.fixedWidth = g),
            (this.dragOffset = h - e))
          : ((a = h - f - g / 2),
            0 === b
              ? (a = Math.max(0, a))
              : 2 === b &&
                a + g >= l &&
                ((a = l - g), (m = this.getUnionExtremes().dataMax)),
            a !== e &&
              ((this.fixedWidth = g),
              (b = d.toFixedRange(a, a + g, null, m)),
              c.xAxis[0].setExtremes(
                Math.min(b.min, b.max),
                Math.max(b.min, b.max),
                !0,
                null,
                { trigger: "navigator" }
              )));
      },
      handlesMousedown: function (a, b) {
        this.chart.pointer.normalize(a);
        a = this.chart;
        var c = a.xAxis[0],
          d = (a.inverted && !c.reversed) || (!a.inverted && c.reversed);
        0 === b
          ? ((this.grabbedLeft = !0),
            (this.otherHandlePos = this.zoomedMax),
            (this.fixedExtreme = d ? c.min : c.max))
          : ((this.grabbedRight = !0),
            (this.otherHandlePos = this.zoomedMin),
            (this.fixedExtreme = d ? c.max : c.min));
        a.fixedRange = null;
      },
      onMouseMove: function (a) {
        var b = this,
          c = b.chart,
          d = b.left,
          e = b.navigatorSize,
          f = b.range,
          l = b.dragOffset,
          g = c.inverted;
        (a.touches && 0 === a.touches[0].pageX) ||
          ((a = c.pointer.normalize(a)),
          (c = a.chartX),
          g && ((d = b.top), (c = a.chartY)),
          b.grabbedLeft
            ? ((b.hasDragged = !0), b.render(0, 0, c - d, b.otherHandlePos))
            : b.grabbedRight
            ? ((b.hasDragged = !0), b.render(0, 0, b.otherHandlePos, c - d))
            : b.grabbedCenter &&
              ((b.hasDragged = !0),
              c < l ? (c = l) : c > e + l - f && (c = e + l - f),
              b.render(0, 0, c - l, c - l + f)),
          b.hasDragged &&
            b.scrollbar &&
            b.scrollbar.options.liveRedraw &&
            ((a.DOMType = a.type),
            setTimeout(function () {
              b.onMouseUp(a);
            }, 0)));
      },
      onMouseUp: function (a) {
        var b = this.chart,
          c = this.xAxis,
          d = this.scrollbar,
          e,
          f,
          l = a.DOMEvent || a;
        ((!this.hasDragged || (d && d.hasDragged)) &&
          "scrollbar" !== a.trigger) ||
          (this.zoomedMin === this.otherHandlePos
            ? (e = this.fixedExtreme)
            : this.zoomedMax === this.otherHandlePos && (f = this.fixedExtreme),
          this.zoomedMax === this.size && (f = this.getUnionExtremes().dataMax),
          (c = c.toFixedRange(this.zoomedMin, this.zoomedMax, e, f)),
          u(c.min) &&
            b.xAxis[0].setExtremes(
              Math.min(c.min, c.max),
              Math.max(c.min, c.max),
              !0,
              this.hasDragged ? !1 : null,
              { trigger: "navigator", triggerOp: "navigator-drag", DOMEvent: l }
            ));
        "mousemove" !== a.DOMType &&
          (this.grabbedLeft =
            this.grabbedRight =
            this.grabbedCenter =
            this.fixedWidth =
            this.fixedExtreme =
            this.otherHandlePos =
            this.hasDragged =
            this.dragOffset =
              null);
      },
      removeEvents: function () {
        this.eventsToUnbind &&
          (t(this.eventsToUnbind, function (a) {
            a();
          }),
          (this.eventsToUnbind = void 0));
        this.removeBaseSeriesEvents();
      },
      removeBaseSeriesEvents: function () {
        var a = this.baseSeries || [];
        this.navigatorEnabled &&
          a[0] &&
          !1 !== this.navigatorOptions.adaptToUpdatedData &&
          (t(
            a,
            function (a) {
              H(a, "updatedData", this.updatedDataHandler);
            },
            this
          ),
          a[0].xAxis &&
            H(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
      },
      init: function (a) {
        var b = a.options,
          c = b.navigator,
          d = c.enabled,
          e = b.scrollbar,
          f = e.enabled,
          b = d ? c.height : 0,
          l = f ? e.height : 0;
        this.handles = [];
        this.shades = [];
        this.chart = a;
        this.setBaseSeries();
        this.height = b;
        this.scrollbarHeight = l;
        this.scrollbarEnabled = f;
        this.navigatorEnabled = d;
        this.navigatorOptions = c;
        this.scrollbarOptions = e;
        this.outlineHeight = b + l;
        this.opposite = v(c.opposite, !d && a.inverted);
        var g = this,
          e = g.baseSeries,
          f = a.xAxis.length,
          h = a.yAxis.length,
          m = (e && e[0] && e[0].xAxis) || a.xAxis[0];
        a.extraMargin = {
          type: g.opposite ? "plotTop" : "marginBottom",
          value: (d || !a.inverted ? g.outlineHeight : 0) + c.margin,
        };
        a.inverted &&
          (a.extraMargin.type = g.opposite ? "marginRight" : "plotLeft");
        a.isDirtyBox = !0;
        g.navigatorEnabled
          ? ((g.xAxis = new F(
              a,
              A(
                { breaks: m.options.breaks, ordinal: m.options.ordinal },
                c.xAxis,
                {
                  id: "navigator-x-axis",
                  yAxis: "navigator-y-axis",
                  isX: !0,
                  type: "datetime",
                  index: f,
                  offset: 0,
                  keepOrdinalPadding: !0,
                  startOnTick: !1,
                  endOnTick: !1,
                  minPadding: 0,
                  maxPadding: 0,
                  zoomEnabled: !1,
                },
                a.inverted
                  ? { offsets: [l, 0, -l, 0], width: b }
                  : { offsets: [0, -l, 0, l], height: b }
              )
            )),
            (g.yAxis = new F(
              a,
              A(
                c.yAxis,
                {
                  id: "navigator-y-axis",
                  alignTicks: !1,
                  offset: 0,
                  index: h,
                  zoomEnabled: !1,
                },
                a.inverted ? { width: b } : { height: b }
              )
            )),
            e || c.series.data
              ? g.addBaseSeries()
              : 0 === a.series.length &&
                w(a, "redraw", function (b, c) {
                  0 < a.series.length &&
                    !g.series &&
                    (g.setBaseSeries(), (a.redraw = b));
                  b.call(a, c);
                }),
            g.renderElements(),
            g.addMouseEvents())
          : (g.xAxis = {
              translate: function (b, c) {
                var d = a.xAxis[0],
                  e = d.getExtremes(),
                  f = d.len - 2 * l,
                  k = G("min", d.options.min, e.dataMin),
                  d = G("max", d.options.max, e.dataMax) - k;
                return c ? (b * d) / f + k : (f * (b - k)) / d;
              },
              toPixels: function (a) {
                return this.translate(a);
              },
              toValue: function (a) {
                return this.translate(a, !0);
              },
              toFixedRange: F.prototype.toFixedRange,
              fake: !0,
            });
        a.options.scrollbar.enabled &&
          ((a.scrollbar = g.scrollbar =
            new q(
              a.renderer,
              A(a.options.scrollbar, {
                margin: g.navigatorEnabled ? 0 : 10,
                vertical: a.inverted,
              }),
              a
            )),
          B(g.scrollbar, "changed", function (b) {
            var c = g.size,
              d = c * this.to,
              c = c * this.from;
            g.hasDragged = g.scrollbar.hasDragged;
            g.render(0, 0, c, d);
            (a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType) &&
              setTimeout(function () {
                g.onMouseUp(b);
              });
          }));
        g.addBaseSeriesEvents();
        g.addChartEvents();
      },
      getUnionExtremes: function (a) {
        var b = this.chart.xAxis[0],
          c = this.xAxis,
          d = c.options,
          e = b.options,
          f;
        (a && null === b.dataMin) ||
          (f = {
            dataMin: v(
              d && d.min,
              G("min", e.min, b.dataMin, c.dataMin, c.min)
            ),
            dataMax: v(
              d && d.max,
              G("max", e.max, b.dataMax, c.dataMax, c.max)
            ),
          });
        return f;
      },
      setBaseSeries: function (a) {
        var b = this.chart,
          c;
        a = a || (b.options && b.options.navigator.baseSeries) || 0;
        this.series &&
          (this.removeBaseSeriesEvents(),
          t(this.series, function (a) {
            a.destroy();
          }));
        c = this.baseSeries = [];
        t(b.series || [], function (b, d) {
          (b.options.showInNavigator ||
            ((d === a || b.options.id === a) &&
              !1 !== b.options.showInNavigator)) &&
            c.push(b);
        });
        this.xAxis && !this.xAxis.fake && this.addBaseSeries();
      },
      addBaseSeries: function () {
        var a = this,
          b = a.chart,
          c = (a.series = []),
          d = a.baseSeries,
          e,
          f,
          g = a.navigatorOptions.series,
          h,
          m = {
            enableMouseTracking: !1,
            index: null,
            group: "nav",
            padXAxis: !1,
            xAxis: "navigator-x-axis",
            yAxis: "navigator-y-axis",
            showInLegend: !1,
            stacking: !1,
            isInternal: !0,
            visible: !0,
          };
        d
          ? t(d, function (d, k) {
              m.name = "Navigator " + (k + 1);
              e = d.options || {};
              h = e.navigatorOptions || {};
              f = A(e, m, g, h);
              k = h.data || g.data;
              a.hasNavigatorData = a.hasNavigatorData || !!k;
              f.data = k || (e.data && e.data.slice(0));
              d.navigatorSeries = b.initSeries(f);
              c.push(d.navigatorSeries);
            })
          : ((f = A(g, m)),
            (f.data = g.data),
            (a.hasNavigatorData = !!f.data),
            c.push(b.initSeries(f)));
        this.addBaseSeriesEvents();
      },
      addBaseSeriesEvents: function () {
        var a = this,
          b = a.baseSeries || [];
        b[0] &&
          b[0].xAxis &&
          B(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
        !1 !== this.navigatorOptions.adaptToUpdatedData &&
          t(
            b,
            function (b) {
              b.xAxis && B(b, "updatedData", this.updatedDataHandler);
              B(b, "remove", function () {
                this.navigatorSeries &&
                  (m(a.series, this.navigatorSeries),
                  this.navigatorSeries.remove(!1),
                  delete this.navigatorSeries);
              });
            },
            this
          );
      },
      modifyNavigatorAxisExtremes: function () {
        var a = this.xAxis,
          b;
        a.getExtremes &&
          (!(b = this.getUnionExtremes(!0)) ||
            (b.dataMin === a.min && b.dataMax === a.max) ||
            ((a.min = b.dataMin), (a.max = b.dataMax)));
      },
      modifyBaseAxisExtremes: function () {
        var a = this.chart.navigator,
          b = this.getExtremes(),
          c = b.dataMin,
          d = b.dataMax,
          b = b.max - b.min,
          e = a.stickToMin,
          f = a.stickToMax,
          g,
          h,
          m = a.series && a.series[0],
          n = !!this.setExtremes;
        (this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger) ||
          (e && ((h = c), (g = h + b)),
          f &&
            ((g = d),
            e ||
              (h = Math.max(
                g - b,
                m && m.xData ? m.xData[0] : -Number.MAX_VALUE
              ))),
          n &&
            (e || f) &&
            p(h) &&
            ((this.min = this.userMin = h), (this.max = this.userMax = g)));
        a.stickToMin = a.stickToMax = null;
      },
      updatedDataHandler: function () {
        var a = this.chart.navigator,
          b = this.navigatorSeries;
        a.stickToMin = p(this.xAxis.min) && this.xAxis.min <= this.xData[0];
        a.stickToMax = Math.round(a.zoomedMax) >= Math.round(a.size);
        b &&
          !a.hasNavigatorData &&
          ((b.options.pointStart = this.xData[0]),
          b.setData(this.options.data, !1, null, !1));
      },
      addChartEvents: function () {
        B(this.chart, "redraw", function () {
          var a = this.navigator,
            b =
              a &&
              ((a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis) ||
                (a.scrollbar && this.xAxis[0]));
          b && a.render(b.min, b.max);
        });
      },
      destroy: function () {
        this.removeEvents();
        this.xAxis &&
          (m(this.chart.xAxis, this.xAxis), m(this.chart.axes, this.xAxis));
        this.yAxis &&
          (m(this.chart.yAxis, this.yAxis), m(this.chart.axes, this.yAxis));
        t(this.series || [], function (a) {
          a.destroy && a.destroy();
        });
        t(
          "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(
            " "
          ),
          function (a) {
            this[a] && this[a].destroy && this[a].destroy();
            this[a] = null;
          },
          this
        );
        t(
          [this.handles],
          function (a) {
            r(a);
          },
          this
        );
      },
    };
    a.Navigator = E;
    w(F.prototype, "zoom", function (a, b, c) {
      var d = this.chart,
        e = d.options,
        f = e.chart.zoomType,
        g = e.navigator,
        e = e.rangeSelector,
        k;
      this.isXAxis &&
        ((g && g.enabled) || (e && e.enabled)) &&
        ("x" === f
          ? (d.resetZoomButton = "blocked")
          : "y" === f
          ? (k = !1)
          : "xy" === f &&
            ((d = this.previousZoom),
            u(b)
              ? (this.previousZoom = [this.min, this.max])
              : d && ((b = d[0]), (c = d[1]), delete this.previousZoom)));
      return void 0 !== k ? k : a.call(this, b, c);
    });
    w(D.prototype, "init", function (a, b, c) {
      B(this, "beforeRender", function () {
        var a = this.options;
        if (a.navigator.enabled || a.scrollbar.enabled)
          this.scroller = this.navigator = new E(this);
      });
      a.call(this, b, c);
    });
    w(D.prototype, "setChartSize", function (a) {
      var b = this.legend,
        c = this.navigator,
        d,
        e,
        f,
        g;
      a.apply(this, [].slice.call(arguments, 1));
      c &&
        ((e = b.options),
        (f = c.xAxis),
        (g = c.yAxis),
        (d = c.scrollbarHeight),
        this.inverted
          ? ((c.left = c.opposite
              ? this.chartWidth - d - c.height
              : this.spacing[3] + d),
            (c.top = this.plotTop + d))
          : ((c.left = this.plotLeft + d),
            (c.top =
              c.navigatorOptions.top ||
              this.chartHeight -
                c.height -
                d -
                this.spacing[2] -
                ("bottom" === e.verticalAlign && e.enabled && !e.floating
                  ? b.legendHeight + v(e.margin, 10)
                  : 0))),
        f &&
          g &&
          (this.inverted
            ? (f.options.left = g.options.left = c.left)
            : (f.options.top = g.options.top = c.top),
          f.setAxisSize(),
          g.setAxisSize()));
    });
    w(J.prototype, "addPoint", function (a, c, d, e, g) {
      var k = this.options.turboThreshold;
      k &&
        this.xData.length > k &&
        b(c, !0) &&
        this.chart.navigator &&
        f(20, !0);
      a.call(this, c, d, e, g);
    });
    w(D.prototype, "addSeries", function (a, b, c, d) {
      a = a.call(this, b, !1, d);
      this.navigator && this.navigator.setBaseSeries();
      v(c, !0) && this.redraw();
      return a;
    });
    w(J.prototype, "update", function (a, b, c) {
      a.call(this, b, !1);
      this.chart.navigator && this.chart.navigator.setBaseSeries();
      v(c, !0) && this.chart.redraw();
    });
    D.prototype.callbacks.push(function (a) {
      var b = a.navigator;
      b && ((a = a.xAxis[0].getExtremes()), b.render(a.min, a.max));
    });
  })(L);
  (function (a) {
    function E(a) {
      this.init(a);
    }
    var B = a.addEvent,
      F = a.Axis,
      D = a.Chart,
      n = a.css,
      h = a.createElement,
      u = a.dateFormat,
      r = a.defaultOptions,
      x = r.global.useUTC,
      t = a.defined,
      m = a.destroyObjectProperties,
      f = a.discardElement,
      g = a.each,
      e = a.extend,
      d = a.fireEvent,
      p = a.Date,
      b = a.isNumber,
      A = a.merge,
      v = a.pick,
      H = a.pInt,
      q = a.splat,
      J = a.wrap;
    e(r, {
      rangeSelector: {
        buttonTheme: {
          "stroke-width": 0,
          width: 28,
          height: 18,
          padding: 2,
          zIndex: 7,
        },
        height: 35,
        inputPosition: { align: "right" },
        labelStyle: { color: "#666666" },
      },
    });
    r.lang = A(r.lang, {
      rangeSelectorZoom: "Zoom",
      rangeSelectorFrom: "From",
      rangeSelectorTo: "To",
    });
    E.prototype = {
      clickButton: function (a, d) {
        var c = this,
          e = c.chart,
          f = c.buttonOptions[a],
          h = e.xAxis[0],
          m = (e.scroller && e.scroller.getUnionExtremes()) || h || {},
          k = m.dataMin,
          n = m.dataMax,
          p,
          r = h && Math.round(Math.min(h.max, v(n, h.max))),
          t = f.type,
          u,
          m = f._range,
          w,
          C,
          A,
          D = f.dataGrouping;
        if (null !== k && null !== n) {
          e.fixedRange = m;
          D &&
            ((this.forcedDataGrouping = !0),
            F.prototype.setDataGrouping.call(
              h || { chart: this.chart },
              D,
              !1
            ));
          if ("month" === t || "year" === t)
            h
              ? ((t = { range: f, max: r, dataMin: k, dataMax: n }),
                (p = h.minFromRange.call(t)),
                b(t.newMax) && (r = t.newMax))
              : (m = f);
          else if (m) (p = Math.max(r - m, k)), (r = Math.min(p + m, n));
          else if ("ytd" === t)
            if (h)
              void 0 === n &&
                ((k = Number.MAX_VALUE),
                (n = Number.MIN_VALUE),
                g(e.series, function (a) {
                  a = a.xData;
                  k = Math.min(a[0], k);
                  n = Math.max(a[a.length - 1], n);
                }),
                (d = !1)),
                (r = c.getYTDExtremes(n, k, x)),
                (p = w = r.min),
                (r = r.max);
            else {
              B(e, "beforeRender", function () {
                c.clickButton(a);
              });
              return;
            }
          else "all" === t && h && ((p = k), (r = n));
          c.setSelected(a);
          h
            ? h.setExtremes(p, r, v(d, 1), null, {
                trigger: "rangeSelectorButton",
                rangeSelectorButton: f,
              })
            : ((u = q(e.options.xAxis)[0]),
              (A = u.range),
              (u.range = m),
              (C = u.min),
              (u.min = w),
              B(e, "load", function () {
                u.range = A;
                u.min = C;
              }));
        }
      },
      setSelected: function (a) {
        this.selected = this.options.selected = a;
      },
      defaultButtons: [
        { type: "month", count: 1, text: "1m" },
        { type: "month", count: 3, text: "3m" },
        { type: "month", count: 6, text: "6m" },
        { type: "ytd", text: "YTD" },
        { type: "year", count: 1, text: "1y" },
        { type: "all", text: "All" },
      ],
      init: function (a) {
        var b = this,
          c = a.options.rangeSelector,
          e = c.buttons || [].concat(b.defaultButtons),
          f = c.selected,
          h = function () {
            var a = b.minInput,
              c = b.maxInput;
            a && a.blur && d(a, "blur");
            c && c.blur && d(c, "blur");
          };
        b.chart = a;
        b.options = c;
        b.buttons = [];
        a.extraTopMargin = c.height;
        b.buttonOptions = e;
        this.unMouseDown = B(a.container, "mousedown", h);
        this.unResize = B(a, "resize", h);
        g(e, b.computeButtonRange);
        void 0 !== f && e[f] && this.clickButton(f, !1);
        B(a, "load", function () {
          B(a.xAxis[0], "setExtremes", function (c) {
            this.max - this.min !== a.fixedRange &&
              "rangeSelectorButton" !== c.trigger &&
              "updatedData" !== c.trigger &&
              b.forcedDataGrouping &&
              this.setDataGrouping(!1, !1);
          });
        });
      },
      updateButtonStates: function () {
        var a = this.chart,
          d = a.xAxis[0],
          e = Math.round(d.max - d.min),
          f = !d.hasVisibleSeries,
          a = (a.scroller && a.scroller.getUnionExtremes()) || d,
          h = a.dataMin,
          l = a.dataMax,
          a = this.getYTDExtremes(l, h, x),
          m = a.min,
          k = a.max,
          n = this.selected,
          p = b(n),
          q = this.options.allButtonsEnabled,
          r = this.buttons;
        g(this.buttonOptions, function (a, b) {
          var c = a._range,
            g = a.type,
            t = a.count || 1;
          a = r[b];
          var u = 0;
          b = b === n;
          var w = c > l - h,
            v = c < d.minRange,
            x = !1,
            y = !1,
            c = c === e;
          ("month" === g || "year" === g) &&
          e >= 864e5 * { month: 28, year: 365 }[g] * t &&
          e <= 864e5 * { month: 31, year: 366 }[g] * t
            ? (c = !0)
            : "ytd" === g
            ? ((c = k - m === e), (x = !b))
            : "all" === g && ((c = d.max - d.min >= l - h), (y = !b && p && c));
          g = !q && (w || v || y || f);
          c = (b && c) || (c && !p && !x);
          g ? (u = 3) : c && ((p = !0), (u = 2));
          a.state !== u && a.setState(u);
        });
      },
      computeButtonRange: function (a) {
        var b = a.type,
          c = a.count || 1,
          d = {
            millisecond: 1,
            second: 1e3,
            minute: 6e4,
            hour: 36e5,
            day: 864e5,
            week: 6048e5,
          };
        if (d[b]) a._range = d[b] * c;
        else if ("month" === b || "year" === b)
          a._range = 864e5 * { month: 30, year: 365 }[b] * c;
      },
      setInputValue: function (a, b) {
        var c = this.chart.options.rangeSelector,
          d = this[a + "Input"];
        t(b) && ((d.previousValue = d.HCTime), (d.HCTime = b));
        d.value = u(c.inputEditDateFormat || "%Y-%m-%d", d.HCTime);
        this[a + "DateBox"].attr({
          text: u(c.inputDateFormat || "%b %e, %Y", d.HCTime),
        });
      },
      showInput: function (a) {
        var b = this.inputGroup,
          c = this[a + "DateBox"];
        n(this[a + "Input"], {
          left: b.translateX + c.x + "px",
          top: b.translateY + "px",
          width: c.width - 2 + "px",
          height: c.height - 2 + "px",
          border: "2px solid silver",
        });
      },
      hideInput: function (a) {
        n(this[a + "Input"], { border: 0, width: "1px", height: "1px" });
        this.setInputValue(a);
      },
      drawInput: function (a) {
        function c() {
          var a = q.value,
            c = (m.inputDateParser || Date.parse)(a),
            e = f.xAxis[0],
            g = f.scroller && f.scroller.xAxis ? f.scroller.xAxis : e,
            k = g.dataMin,
            g = g.dataMax;
          c !== q.previousValue &&
            ((q.previousValue = c),
            b(c) ||
              ((c = a.split("-")),
              (c = Date.UTC(H(c[0]), H(c[1]) - 1, H(c[2])))),
            b(c) &&
              (x || (c += 6e4 * new Date().getTimezoneOffset()),
              p
                ? c > d.maxInput.HCTime
                  ? (c = void 0)
                  : c < k && (c = k)
                : c < d.minInput.HCTime
                ? (c = void 0)
                : c > g && (c = g),
              void 0 !== c &&
                e.setExtremes(p ? c : e.min, p ? e.max : c, void 0, void 0, {
                  trigger: "rangeSelectorInput",
                })));
        }
        var d = this,
          f = d.chart,
          g = f.renderer.style || {},
          l = f.renderer,
          m = f.options.rangeSelector,
          k = d.div,
          p = "min" === a,
          q,
          t,
          u = this.inputGroup;
        this[a + "Label"] = t = l
          .label(
            r.lang[p ? "rangeSelectorFrom" : "rangeSelectorTo"],
            this.inputGroup.offset
          )
          .addClass("highcharts-range-label")
          .attr({ padding: 2 })
          .add(u);
        u.offset += t.width + 5;
        this[a + "DateBox"] = l = l
          .label("", u.offset)
          .addClass("highcharts-range-input")
          .attr({
            padding: 2,
            width: m.inputBoxWidth || 90,
            height: m.inputBoxHeight || 17,
            stroke: m.inputBoxBorderColor || "#cccccc",
            "stroke-width": 1,
            "text-align": "center",
          })
          .on("click", function () {
            d.showInput(a);
            d[a + "Input"].focus();
          })
          .add(u);
        u.offset += l.width + (p ? 10 : 0);
        this[a + "Input"] = q = h(
          "input",
          { name: a, className: "highcharts-range-selector", type: "text" },
          { top: f.plotTop + "px" },
          k
        );
        t.css(A(g, m.labelStyle));
        l.css(A({ color: "#333333" }, g, m.inputStyle));
        n(
          q,
          e(
            {
              position: "absolute",
              border: 0,
              width: "1px",
              height: "1px",
              padding: 0,
              textAlign: "center",
              fontSize: g.fontSize,
              fontFamily: g.fontFamily,
              left: "-9em",
            },
            m.inputStyle
          )
        );
        q.onfocus = function () {
          d.showInput(a);
        };
        q.onblur = function () {
          d.hideInput(a);
        };
        q.onchange = c;
        q.onkeypress = function (a) {
          13 === a.keyCode && c();
        };
      },
      getPosition: function () {
        var a = this.chart,
          b = a.options.rangeSelector,
          a = v(
            (b.buttonPosition || {}).y,
            a.plotTop - a.axisOffset[0] - b.height
          );
        return { buttonTop: a, inputTop: a - 10 };
      },
      getYTDExtremes: function (a, b, d) {
        var c = new p(a),
          e = c[p.hcGetFullYear]();
        d = d ? p.UTC(e, 0, 1) : +new p(e, 0, 1);
        b = Math.max(b || 0, d);
        c = c.getTime();
        return { max: Math.min(a || c, c), min: b };
      },
      render: function (a, b) {
        var c = this,
          d = c.chart,
          f = d.renderer,
          l = d.container,
          m = d.options,
          k =
            m.exporting &&
            !1 !== m.exporting.enabled &&
            m.navigation &&
            m.navigation.buttonOptions,
          n = m.rangeSelector,
          p = c.buttons,
          m = r.lang,
          q = c.div,
          q = c.inputGroup,
          u = n.buttonTheme,
          w = n.buttonPosition || {},
          x = n.inputEnabled,
          C = u && u.states,
          A = d.plotLeft,
          B,
          D = this.getPosition(),
          E = c.group,
          F = c.rendered;
        !1 !== n.enabled &&
          (F ||
            ((c.group = E = f.g("range-selector-buttons").add()),
            (c.zoomText = f
              .text(m.rangeSelectorZoom, v(w.x, A), 15)
              .css(n.labelStyle)
              .add(E)),
            (B = v(w.x, A) + c.zoomText.getBBox().width + 5),
            g(c.buttonOptions, function (a, b) {
              p[b] = f
                .button(
                  a.text,
                  B,
                  0,
                  function () {
                    c.clickButton(b);
                    c.isActive = !0;
                  },
                  u,
                  C && C.hover,
                  C && C.select,
                  C && C.disabled
                )
                .attr({ "text-align": "center" })
                .add(E);
              B += p[b].width + v(n.buttonSpacing, 5);
            }),
            !1 !== x &&
              ((c.div = q =
                h("div", null, { position: "relative", height: 0, zIndex: 1 })),
              l.parentNode.insertBefore(q, l),
              (c.inputGroup = q = f.g("input-group").add()),
              (q.offset = 0),
              c.drawInput("min"),
              c.drawInput("max"))),
          c.updateButtonStates(),
          E[F ? "animate" : "attr"]({ translateY: D.buttonTop }),
          !1 !== x &&
            (q.align(
              e(
                {
                  y: D.inputTop,
                  width: q.offset,
                  x:
                    k && D.inputTop < (k.y || 0) + k.height - d.spacing[0]
                      ? -40
                      : 0,
                },
                n.inputPosition
              ),
              !0,
              d.spacingBox
            ),
            t(x) ||
              ((d = E.getBBox()),
              q[
                q.alignAttr.translateX < d.x + d.width + 10 ? "hide" : "show"
              ]()),
            c.setInputValue("min", a),
            c.setInputValue("max", b)),
          (c.rendered = !0));
      },
      update: function (a) {
        var b = this.chart;
        A(!0, b.options.rangeSelector, a);
        this.destroy();
        this.init(b);
      },
      destroy: function () {
        var b = this,
          d = b.minInput,
          e = b.maxInput;
        b.unMouseDown();
        b.unResize();
        m(b.buttons);
        d && (d.onfocus = d.onblur = d.onchange = null);
        e && (e.onfocus = e.onblur = e.onchange = null);
        a.objectEach(
          b,
          function (a, c) {
            a &&
              "chart" !== c &&
              (a.destroy ? a.destroy() : a.nodeType && f(this[c]));
            a !== E.prototype[c] && (b[c] = null);
          },
          this
        );
      },
    };
    F.prototype.toFixedRange = function (a, d, e, f) {
      var c = this.chart && this.chart.fixedRange;
      a = v(e, this.translate(a, !0, !this.horiz));
      d = v(f, this.translate(d, !0, !this.horiz));
      e = c && (d - a) / c;
      0.7 < e && 1.3 > e && (f ? (a = d - c) : (d = a + c));
      b(a) || (a = d = void 0);
      return { min: a, max: d };
    };
    F.prototype.minFromRange = function () {
      var a = this.range,
        d = { month: "Month", year: "FullYear" }[a.type],
        e,
        f = this.max,
        g,
        h,
        m = function (a, b) {
          var c = new Date(a),
            e = c["get" + d]();
          c["set" + d](e + b);
          e === c["get" + d]() && c.setDate(0);
          return c.getTime() - a;
        };
      b(a)
        ? ((e = f - a), (h = a))
        : ((e = f + m(f, -a.count)),
          this.chart && (this.chart.fixedRange = f - e));
      g = v(this.dataMin, Number.MIN_VALUE);
      b(e) || (e = g);
      e <= g &&
        ((e = g),
        void 0 === h && (h = m(e, a.count)),
        (this.newMax = Math.min(e + h, this.dataMax)));
      b(f) || (e = void 0);
      return e;
    };
    J(D.prototype, "init", function (a, b, d) {
      B(this, "init", function () {
        this.options.rangeSelector.enabled &&
          (this.rangeSelector = new E(this));
      });
      a.call(this, b, d);
    });
    D.prototype.callbacks.push(function (a) {
      function c() {
        d = a.xAxis[0].getExtremes();
        b(d.min) && e.render(d.min, d.max);
      }
      var d,
        e = a.rangeSelector,
        f,
        g;
      e &&
        ((g = B(a.xAxis[0], "afterSetExtremes", function (a) {
          e.render(a.min, a.max);
        })),
        (f = B(a, "redraw", c)),
        c());
      B(a, "destroy", function () {
        e && (f(), g());
      });
    });
    a.RangeSelector = E;
  })(L);
  (function (a) {
    var E = a.arrayMax,
      B = a.arrayMin,
      F = a.Axis,
      D = a.Chart,
      n = a.defined,
      h = a.each,
      u = a.extend,
      r = a.format,
      x = a.grep,
      t = a.inArray,
      m = a.isNumber,
      f = a.isString,
      g = a.map,
      e = a.merge,
      d = a.pick,
      p = a.Point,
      b = a.Renderer,
      A = a.Series,
      v = a.splat,
      H = a.SVGRenderer,
      q = a.VMLRenderer,
      J = a.wrap,
      c = A.prototype,
      w = c.init,
      K = c.processData,
      y = p.prototype.tooltipFormatter;
    a.StockChart = a.stockChart = function (b, c, h) {
      var k = f(b) || b.nodeName,
        l = arguments[k ? 1 : 0],
        m = l.series,
        n = a.getOptions(),
        p,
        q = d(l.navigator && l.navigator.enabled, n.navigator.enabled, !0),
        r = q ? { startOnTick: !1, endOnTick: !1 } : null,
        t = { marker: { enabled: !1, radius: 2 } },
        u = { shadow: !1, borderWidth: 0 };
      l.xAxis = g(v(l.xAxis || {}), function (a) {
        return e(
          {
            minPadding: 0,
            maxPadding: 0,
            ordinal: !0,
            title: { text: null },
            labels: { overflow: "justify" },
            showLastLabel: !0,
          },
          n.xAxis,
          a,
          { type: "datetime", categories: null },
          r
        );
      });
      l.yAxis = g(v(l.yAxis || {}), function (a) {
        p = d(a.opposite, !0);
        return e(
          {
            labels: { y: -2 },
            opposite: p,
            showLastLabel: !1,
            title: { text: null },
          },
          n.yAxis,
          a
        );
      });
      l.series = null;
      l = e(
        {
          chart: { panning: !0, pinchType: "x" },
          navigator: { enabled: q },
          scrollbar: { enabled: d(n.scrollbar.enabled, !0) },
          rangeSelector: { enabled: d(n.rangeSelector.enabled, !0) },
          title: { text: null },
          tooltip: { shared: !0, crosshairs: !0 },
          legend: { enabled: !1 },
          plotOptions: {
            line: t,
            spline: t,
            area: t,
            areaspline: t,
            arearange: t,
            areasplinerange: t,
            column: u,
            columnrange: u,
            candlestick: u,
            ohlc: u,
          },
        },
        l,
        { isStock: !0 }
      );
      l.series = m;
      return k ? new D(b, l, h) : new D(l, c);
    };
    J(F.prototype, "autoLabelAlign", function (a) {
      var b = this.chart,
        c = this.options,
        b = (b._labelPanes = b._labelPanes || {}),
        d = this.options.labels;
      return this.chart.options.isStock &&
        "yAxis" === this.coll &&
        ((c = c.top + "," + c.height), !b[c] && d.enabled)
        ? (15 === d.x && (d.x = 0),
          void 0 === d.align && (d.align = "right"),
          (b[c] = this),
          "right")
        : a.call(this, [].slice.call(arguments, 1));
    });
    J(F.prototype, "destroy", function (a) {
      var b = this.chart,
        c = this.options && this.options.top + "," + this.options.height;
      c &&
        b._labelPanes &&
        b._labelPanes[c] === this &&
        delete b._labelPanes[c];
      return a.call(this, Array.prototype.slice.call(arguments, 1));
    });
    J(F.prototype, "getPlotLinePath", function (b, c, e, k, p, q) {
      var l = this,
        r =
          this.isLinked && !this.series
            ? this.linkedParent.series
            : this.series,
        u = l.chart,
        v = u.renderer,
        w = l.left,
        x = l.top,
        z,
        y,
        A,
        B,
        G = [],
        D = [],
        E,
        I;
      if ("xAxis" !== l.coll && "yAxis" !== l.coll)
        return b.apply(this, [].slice.call(arguments, 1));
      D = (function (a) {
        var b = "xAxis" === a ? "yAxis" : "xAxis";
        a = l.options[b];
        return m(a)
          ? [u[b][a]]
          : f(a)
          ? [u.get(a)]
          : g(r, function (a) {
              return a[b];
            });
      })(l.coll);
      h(l.isXAxis ? u.yAxis : u.xAxis, function (a) {
        if (n(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
          var b = a.isXAxis ? "yAxis" : "xAxis",
            b = n(a.options[b]) ? u[b][a.options[b]] : u[b][0];
          l === b && D.push(a);
        }
      });
      E = D.length ? [] : [l.isXAxis ? u.yAxis[0] : u.xAxis[0]];
      h(D, function (b) {
        -1 !== t(b, E) ||
          a.find(E, function (a) {
            return a.pos === b.pos && a.len && b.len;
          }) ||
          E.push(b);
      });
      I = d(q, l.translate(c, null, null, k));
      m(I) &&
        (l.horiz
          ? h(E, function (a) {
              var b;
              y = a.pos;
              B = y + a.len;
              z = A = Math.round(I + l.transB);
              if (z < w || z > w + l.width)
                p ? (z = A = Math.min(Math.max(w, z), w + l.width)) : (b = !0);
              b || G.push("M", z, y, "L", A, B);
            })
          : h(E, function (a) {
              var b;
              z = a.pos;
              A = z + a.len;
              y = B = Math.round(x + l.height - I);
              if (y < x || y > x + l.height)
                p
                  ? (y = B = Math.min(Math.max(x, y), l.top + l.height))
                  : (b = !0);
              b || G.push("M", z, y, "L", A, B);
            }));
      return 0 < G.length ? v.crispPolyLine(G, e || 1) : null;
    });
    F.prototype.getPlotBandPath = function (a, b) {
      b = this.getPlotLinePath(b, null, null, !0);
      a = this.getPlotLinePath(a, null, null, !0);
      var c = [],
        d;
      if (a && b)
        if (a.toString() === b.toString()) (c = a), (c.flat = !0);
        else
          for (d = 0; d < a.length; d += 6)
            c.push(
              "M",
              a[d + 1],
              a[d + 2],
              "L",
              a[d + 4],
              a[d + 5],
              b[d + 4],
              b[d + 5],
              b[d + 1],
              b[d + 2],
              "z"
            );
      else c = null;
      return c;
    };
    H.prototype.crispPolyLine = function (a, b) {
      var c;
      for (c = 0; c < a.length; c += 6)
        a[c + 1] === a[c + 4] &&
          (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - (b % 2) / 2),
          a[c + 2] === a[c + 5] &&
            (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + (b % 2) / 2);
      return a;
    };
    b === q && (q.prototype.crispPolyLine = H.prototype.crispPolyLine);
    J(F.prototype, "hideCrosshair", function (a, b) {
      a.call(this, b);
      this.crossLabel && (this.crossLabel = this.crossLabel.hide());
    });
    J(F.prototype, "drawCrosshair", function (a, b, c) {
      var e, f;
      a.call(this, b, c);
      if (
        n(this.crosshair.label) &&
        this.crosshair.label.enabled &&
        this.cross
      ) {
        a = this.chart;
        var g = this.options.crosshair.label,
          h = this.horiz;
        e = this.opposite;
        f = this.left;
        var l = this.top,
          m = this.crossLabel,
          p,
          q = g.format,
          t = "",
          v = "inside" === this.options.tickPosition,
          w = !1 !== this.crosshair.snap,
          x = 0;
        b || (b = this.cross && this.cross.e);
        p = h
          ? "center"
          : e
          ? "right" === this.labelAlign
            ? "right"
            : "left"
          : "left" === this.labelAlign
          ? "left"
          : "center";
        m ||
          ((m = this.crossLabel =
            a.renderer
              .label(null, null, null, g.shape || "callout")
              .addClass(
                "highcharts-crosshair-label" +
                  (this.series[0] &&
                    " highcharts-color-" + this.series[0].colorIndex)
              )
              .attr({
                align: g.align || p,
                padding: d(g.padding, 8),
                r: d(g.borderRadius, 3),
                zIndex: 2,
              })
              .add(this.labelGroup)),
          m
            .attr({
              fill:
                g.backgroundColor ||
                (this.series[0] && this.series[0].color) ||
                "#666666",
              stroke: g.borderColor || "",
              "stroke-width": g.borderWidth || 0,
            })
            .css(
              u(
                {
                  color: "#ffffff",
                  fontWeight: "normal",
                  fontSize: "11px",
                  textAlign: "center",
                },
                g.style
              )
            ));
        h
          ? ((p = w ? c.plotX + f : b.chartX), (l += e ? 0 : this.height))
          : ((p = e ? this.width + f : 0), (l = w ? c.plotY + l : b.chartY));
        q ||
          g.formatter ||
          (this.isDatetimeAxis && (t = "%b %d, %Y"),
          (q = "{value" + (t ? ":" + t : "") + "}"));
        b = w
          ? c[this.isXAxis ? "x" : "y"]
          : this.toValue(h ? b.chartX : b.chartY);
        m.attr({
          text: q ? r(q, { value: b }) : g.formatter.call(this, b),
          x: p,
          y: l,
          visibility: "visible",
        });
        b = m.getBBox();
        if (h) {
          if ((v && !e) || (!v && e)) l = m.y - b.height;
        } else l = m.y - b.height / 2;
        h
          ? ((e = f - b.x), (f = f + this.width - b.x))
          : ((e = "left" === this.labelAlign ? f : 0),
            (f = "right" === this.labelAlign ? f + this.width : a.chartWidth));
        m.translateX < e && (x = e - m.translateX);
        m.translateX + b.width >= f && (x = -(m.translateX + b.width - f));
        m.attr({
          x: p + x,
          y: l,
          anchorX: h ? p : this.opposite ? 0 : a.chartWidth,
          anchorY: h ? (this.opposite ? a.chartHeight : 0) : l + b.height / 2,
        });
      }
    });
    c.init = function () {
      w.apply(this, arguments);
      this.setCompare(this.options.compare);
    };
    c.setCompare = function (a) {
      this.modifyValue =
        "value" === a || "percent" === a
          ? function (b, c) {
              var d = this.compareValue;
              if (void 0 !== b && void 0 !== d)
                return (
                  (b =
                    "value" === a
                      ? b - d
                      : (b / d) * 100 -
                        (100 === this.options.compareBase ? 0 : 100)),
                  c && (c.change = b),
                  b
                );
            }
          : null;
      this.userOptions.compare = a;
      this.chart.hasRendered && (this.isDirty = !0);
    };
    c.processData = function () {
      var a,
        b = -1,
        c,
        d,
        e,
        f;
      K.apply(this, arguments);
      if (this.xAxis && this.processedYData)
        for (
          c = this.processedXData,
            d = this.processedYData,
            e = d.length,
            this.pointArrayMap &&
              ((b = t("close", this.pointArrayMap)),
              -1 === b && (b = t(this.pointValKey || "y", this.pointArrayMap))),
            a = 0;
          a < e - 1;
          a++
        )
          if (
            ((f = d[a] && -1 < b ? d[a][b] : d[a]),
            m(f) && c[a + 1] >= this.xAxis.min && 0 !== f)
          ) {
            this.compareValue = f;
            break;
          }
    };
    J(c, "getExtremes", function (a) {
      var b;
      a.apply(this, [].slice.call(arguments, 1));
      this.modifyValue &&
        ((b = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)]),
        (this.dataMin = B(b)),
        (this.dataMax = E(b)));
    });
    F.prototype.setCompare = function (a, b) {
      this.isXAxis ||
        (h(this.series, function (b) {
          b.setCompare(a);
        }),
        d(b, !0) && this.chart.redraw());
    };
    p.prototype.tooltipFormatter = function (b) {
      b = b.replace(
        "{point.change}",
        (0 < this.change ? "+" : "") +
          a.numberFormat(
            this.change,
            d(this.series.tooltipOptions.changeDecimals, 2)
          )
      );
      return y.apply(this, [b]);
    };
    J(A.prototype, "render", function (a) {
      (this.chart.is3d && this.chart.is3d()) ||
        this.chart.polar ||
        !this.xAxis ||
        this.xAxis.isRadial ||
        (!this.clipBox && this.animate
          ? ((this.clipBox = e(this.chart.clipBox)),
            (this.clipBox.width = this.xAxis.len),
            (this.clipBox.height = this.yAxis.len))
          : this.chart[this.sharedClipKey]
          ? this.chart[this.sharedClipKey].attr({
              width: this.xAxis.len,
              height: this.yAxis.len,
            })
          : this.clipBox &&
            ((this.clipBox.width = this.xAxis.len),
            (this.clipBox.height = this.yAxis.len)));
      a.call(this);
    });
    J(D.prototype, "getSelectedPoints", function (a) {
      var b = a.call(this);
      h(this.series, function (a) {
        a.hasGroupedData &&
          (b = b.concat(
            x(a.points || [], function (a) {
              return a.selected;
            })
          ));
      });
      return b;
    });
    J(D.prototype, "update", function (a, b) {
      "scrollbar" in b &&
        this.navigator &&
        (e(!0, this.options.scrollbar, b.scrollbar),
        this.navigator.update({}, !1),
        delete b.scrollbar);
      return a.apply(this, Array.prototype.slice.call(arguments, 1));
    });
  })(L);
  return L;
});
