function(e) {
    for (var t = 0, n = ["ms", "moz", "webkit", "o"], r = 0; r < n.length && !e.requestAnimationFrame; ++r) e.requestAnimationFrame = e[n[r] + "RequestAnimationFrame"], e.cancelAnimationFrame = e[n[r] + "CancelAnimationFrame"] || e[n[r] + "CancelRequestAnimationFrame"];
    e.requestAnimationFrame || (e.requestAnimationFrame = function(n) {
        var r = (new Date).getTime(),
            o = Math.max(0, 16 - (r - t)),
            i = e.setTimeout(function() {
                n(r + o)
            }, o);
        return t = r + o, i
    }), e.cancelAnimationFrame || (e.cancelAnimationFrame = function(e) {
        clearTimeout(e)
    }), e.performance = e.performance || {}, e.performance.now = function() {
        return e.performance.now || e.performance.mozNow || e.performance.msNow || e.performance.oNow || e.performance.webkitNow || function() {
            return (new Date).getTime()
        }
    }()
}(window),
function() {
    Math.log10 || (Math.log10 = function(e) {
        return Math.log(e) / Math.LN10
    })
}(),
function() {
    void 0 !== window.Blob && (window.Blob.prototype.slice = window.Blob.prototype.slice || window.Blob.prototype.webkitSlice || window.Blob.prototype.mozSlice)
}(),
function() {
    var e = $.Event,
        t = $.Event.prototype;
    $.Event = function(t, n) {
        return this instanceof $.Event ? (e.call(this, t, n), this.originalEvent && (this.state = this.originalEvent.state, this.touches = this.originalEvent.touches, this.changedTouches = this.originalEvent.changedTouches, this.pointerType = this.originalEvent.pointerType, this.MSPOINTER_TYPE_TOUCH = this.originalEvent.MSPOINTER_TYPE_TOUCH, this.isPrimary = this.originalEvent.isPrimary, this.key = this.originalEvent.key, this.newValue = this.originalEvent.newValue, this.source = this.originalEvent.source, this.data = this.originalEvent.data, this.origin = this.originalEvent.origin), void 0) : new $.Event(t, n)
    }, $.Event.prototype = t
}(),
function() {
    function e(e) {
        return function(t) {
            var n = t.type.match(/pointer/i);
            if (!n || ("touch" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_TOUCH) && t.isPrimary) {
                var r = t.changedTouches[0];
                r && e(r)
            }
        }
    }

    function t(e) {
        r(e.identifier), s[e.identifier] = {
            pageX: e.pageX,
            pageY: e.pageY,
            target: e.target,
            timeout: null
        }
    }

    function n(e) {
        var t = s[e.identifier];
        t && (Math.abs(t.pageX - e.pageX) > f || Math.abs(t.pageY - e.pageY) > f || e.target !== t.target || "label|input|select|textarea".indexOf((t.target.tagName || "").toLowerCase()) > -1 || (t.clickHandler = function() {
            r(e.identifier)
        }, $(t.target).on("click", t.clickHandler), t.timeout = setTimeout(function() {
            var t = s[e.identifier];
            if (t) {
                t.timeout = null, r(t.identifier);
                var n = $("tagName" in t.target ? t.target : t.target.parentNode),
                    o = $.Event("fastclick");
                o.preventGhostClick = function() {
                    a(e.pageX, e.pageY)
                }, n.trigger(o)
            }
        }, 0)))
    }

    function r(e) {
        var t = s[e];
        t && (null !== t.timeout && clearTimeout(t.timeout), t.clickHandler && $(t.target).off("click", t.clickHandler))
    }

    function o() {
        for (var e in s) s.hasOwnProperty(e) && r(e);
        s = {}
    }

    function i(e) {
        for (var t = 0; t < l.length; t += 2)
            if (Math.abs(e.pageX - l[t]) < c && Math.abs(e.pageY - l[t + 1]) < c) {
                e.stopPropagation(), e.preventDefault();
                break
            }
    }

    function a(e, t) {
        l.push(e, t), setTimeout(function() {
            l.splice(0, 2)
        }, u)
    }
    var l = [],
        s = {},
        c = 25,
        u = 2500,
        f = 30;
    $(document.body).on("touchstart MSPointerDown pointerdown", e(t)).on("touchend MSPointerUp pointerup", e(n)).on("touchcancel MSPointerCancel pointercancel", o), $(window).on("scroll", o), document.addEventListener && document.addEventListener("click", i, !0)
}(),
function(e, t, n) {
    "use strict";

    function r(e) {
        return function() {
            var t, r, o = arguments[0],
                i = "[" + (e ? e + ":" : "") + o + "] ",
                a = arguments[1],
                l = arguments,
                s = function(e) {
                    return "function" == typeof e ? ("" + e).replace(/ \{[\s\S]*$/, "") : n === e ? "undefined" : "string" != typeof e ? JSON.stringify(e) : e
                };
            for (t = i + a.replace(/\{\d+\}/g, function(e) {
                    var t, r = +e.slice(1, -1);
                    return r + 2 < l.length ? (t = l[r + 2], "function" == typeof t ? ("" + t).replace(/ ?\{[\s\S]*$/, "") : n === t ? "undefined" : "string" != typeof t ? H(t) : t) : e
                }), t = t + "\nhttp://errors.angularjs.org/1.2.13/" + (e ? e + "/" : "") + o, r = 2; r < arguments.length; r++) t = t + (2 == r ? "?" : "&") + "p" + (r - 2) + "=" + encodeURIComponent(s(arguments[r]));
            return Error(t)
        }
    }

    function o(e) {
        if (null == e || C(e)) return !1;
        var t = e.length;
        return 1 === e.nodeType && t ? !0 : w(e) || S(e) || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function i(e, t, n) {
        var r;
        if (e)
            if (k(e))
                for (r in e) "prototype" == r || "length" == r || "name" == r || e.hasOwnProperty && !e.hasOwnProperty(r) || t.call(n, e[r], r);
            else if (e.forEach && e.forEach !== i) e.forEach(t, n);
        else if (o(e))
            for (r = 0; r < e.length; r++) t.call(n, e[r], r);
        else
            for (r in e) e.hasOwnProperty(r) && t.call(n, e[r], r);
        return e
    }

    function a(e) {
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push(n);
        return t.sort()
    }

    function l(e, t, n) {
        for (var r = a(e), o = 0; o < r.length; o++) t.call(n, e[r[o]], r[o]);
        return r
    }

    function s(e) {
        return function(t, n) {
            e(n, t)
        }
    }

    function c() {
        for (var e, t = br.length; t;) {
            if (t--, e = br[t].charCodeAt(0), 57 == e) return br[t] = "A", br.join("");
            if (90 != e) return br[t] = String.fromCharCode(e + 1), br.join("");
            br[t] = "0"
        }
        return br.unshift("0"), br.join("")
    }

    function u(e, t) {
        t ? e.$$hashKey = t : delete e.$$hashKey
    }

    function f(e) {
        var t = e.$$hashKey;
        return i(arguments, function(t) {
            t !== e && i(t, function(t, n) {
                e[n] = t
            })
        }), u(e, t), e
    }

    function d(e) {
        return parseInt(e, 10)
    }

    function p(e, t) {
        return f(new(f(function() {}, {
            prototype: e
        })), t)
    }

    function h() {}

    function m(e) {
        return e
    }

    function g(e) {
        return function() {
            return e
        }
    }

    function v(e) {
        return n === e
    }

    function y(e) {
        return n !== e
    }

    function $(e) {
        return null != e && "object" == typeof e
    }

    function w(e) {
        return "string" == typeof e
    }

    function b(e) {
        return "number" == typeof e
    }

    function x(e) {
        return "[object Date]" === yr.call(e)
    }

    function S(e) {
        return "[object Array]" === yr.call(e)
    }

    function k(e) {
        return "function" == typeof e
    }

    function P(e) {
        return "[object RegExp]" === yr.call(e)
    }

    function C(e) {
        return e && e.document && e.location && e.alert && e.setInterval
    }

    function T(e) {
        return e && e.$evalAsync && e.$watch
    }

    function E(e) {
        return "[object File]" === yr.call(e)
    }

    function A(e) {
        return !(!e || !(e.nodeName || e.on && e.find))
    }

    function W(e, t, n) {
        var r = [];
        return i(e, function(e, o, i) {
            r.push(t.call(n, e, o, i))
        }), r
    }

    function _(e, t) {
        return -1 != I(e, t)
    }

    function I(e, t) {
        if (e.indexOf) return e.indexOf(t);
        for (var n = 0; n < e.length; n++)
            if (t === e[n]) return n;
        return -1
    }

    function M(e, t) {
        var n = I(e, t);
        return n >= 0 && e.splice(n, 1), t
    }

    function O(e, t) {
        if (C(e) || T(e)) throw $r("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
        if (t) {
            if (e === t) throw $r("cpi", "Can't copy! Source and destination are identical.");
            if (S(e)) {
                t.length = 0;
                for (var n = 0; n < e.length; n++) t.push(O(e[n]))
            } else {
                var r = t.$$hashKey;
                i(t, function(e, n) {
                    delete t[n]
                });
                for (var o in e) t[o] = O(e[o]);
                u(t, r)
            }
        } else t = e, e && (S(e) ? t = O(e, []) : x(e) ? t = new Date(e.getTime()) : P(e) ? t = RegExp(e.source) : $(e) && (t = O(e, {})));
        return t
    }

    function D(e, t) {
        t = t || {};
        for (var n in e) !e.hasOwnProperty(n) || "$" === n.charAt(0) && "$" === n.charAt(1) || (t[n] = e[n]);
        return t
    }

    function j(e, t) {
        if (e === t) return !0;
        if (null === e || null === t) return !1;
        if (e !== e && t !== t) return !0;
        var r, o, i, a = typeof e,
            l = typeof t;
        if (a == l && "object" == a) {
            if (!S(e)) {
                if (x(e)) return x(t) && e.getTime() == t.getTime();
                if (P(e) && P(t)) return "" + e == "" + t;
                if (T(e) || T(t) || C(e) || C(t) || S(t)) return !1;
                i = {};
                for (o in e)
                    if ("$" !== o.charAt(0) && !k(e[o])) {
                        if (!j(e[o], t[o])) return !1;
                        i[o] = !0
                    }
                for (o in t)
                    if (!i.hasOwnProperty(o) && "$" !== o.charAt(0) && t[o] !== n && !k(t[o])) return !1;
                return !0
            }
            if (!S(t)) return !1;
            if ((r = e.length) == t.length) {
                for (o = 0; r > o; o++)
                    if (!j(e[o], t[o])) return !1;
                return !0
            }
        }
        return !1
    }

    function U() {
        return t.securityPolicy && t.securityPolicy.isActive || t.querySelector && !(!t.querySelector("[ng-csp]") && !t.querySelector("[data-ng-csp]"))
    }

    function F(e, t, n) {
        return e.concat(gr.call(t, n))
    }

    function L(e, t) {
        return gr.call(e, t || 0)
    }

    function R(e, t) {
        var n = arguments.length > 2 ? L(arguments, 2) : [];
        return !k(t) || t instanceof RegExp ? t : n.length ? function() {
            return arguments.length ? t.apply(e, n.concat(gr.call(arguments, 0))) : t.apply(e, n)
        } : function() {
            return arguments.length ? t.apply(e, arguments) : t.call(e)
        }
    }

    function N(e, r) {
        var o = r;
        return "string" == typeof e && "$" === e.charAt(0) ? o = n : C(r) ? o = "$WINDOW" : r && t === r ? o = "$DOCUMENT" : T(r) && (o = "$SCOPE"), o
    }

    function H(e, t) {
        return n === e ? n : JSON.stringify(e, N, t ? "  " : null)
    }

    function q(e) {
        return w(e) ? JSON.parse(e) : e
    }

    function B(e) {
        if ("function" == typeof e) e = !0;
        else if (e && 0 !== e.length) {
            var t = ar("" + e);
            e = !("f" == t || "0" == t || "false" == t || "no" == t || "n" == t || "[]" == t)
        } else e = !1;
        return e
    }

    function V(e) {
        e = dr(e).clone();
        try {
            e.empty()
        } catch (t) {}
        var n = 3,
            r = dr("<div>").append(e).html();
        try {
            return e[0].nodeType === n ? ar(r) : r.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(e, t) {
                return "<" + ar(t)
            })
        } catch (t) {
            return ar(r)
        }
    }

    function z(e) {
        try {
            return decodeURIComponent(e)
        } catch (t) {}
    }

    function Q(e) {
        var t, n, r = {};
        return i((e || "").split("&"), function(e) {
            if (e && (t = e.split("="), n = z(t[0]), y(n))) {
                var o = y(t[1]) ? z(t[1]) : !0;
                r[n] ? S(r[n]) ? r[n].push(o) : r[n] = [r[n], o] : r[n] = o
            }
        }), r
    }

    function G(e) {
        var t = [];
        return i(e, function(e, n) {
            S(e) ? i(e, function(e) {
                t.push(K(n, !0) + (e === !0 ? "" : "=" + K(e, !0)))
            }) : t.push(K(n, !0) + (e === !0 ? "" : "=" + K(e, !0)))
        }), t.length ? t.join("&") : ""
    }

    function X(e) {
        return K(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function K(e, t) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
    }

    function J(e, n) {
        function r(e) {
            e && l.push(e)
        }
        var o, a, l = [e],
            s = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"],
            c = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        i(s, function(n) {
            s[n] = !0, r(t.getElementById(n)), n = n.replace(":", "\\:"), e.querySelectorAll && (i(e.querySelectorAll("." + n), r), i(e.querySelectorAll("." + n + "\\:"), r), i(e.querySelectorAll("[" + n + "]"), r))
        }), i(l, function(e) {
            if (!o) {
                var t = " " + e.className + " ",
                    n = c.exec(t);
                n ? (o = e, a = (n[2] || "").replace(/\s+/g, ",")) : i(e.attributes, function(t) {
                    !o && s[t.name] && (o = e, a = t.value)
                })
            }
        }), o && n(o, a ? [a] : [])
    }

    function Y(r, o) {
        var a = function() {
                if (r = dr(r), r.injector()) {
                    var e = r[0] === t ? "document" : V(r);
                    throw $r("btstrpd", "App Already Bootstrapped with this Element '{0}'", e)
                }
                o = o || [], o.unshift(["$provide", function(e) {
                    e.value("$rootElement", r)
                }]), o.unshift("ng");
                var n = Wt(o);
                return n.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate", function(e, t, n, r) {
                    e.$apply(function() {
                        t.data("$injector", r), n(t)(e)
                    })
                }]), n
            },
            l = /^NG_DEFER_BOOTSTRAP!/;
        return e && !l.test(e.name) ? a() : (e.name = e.name.replace(l, ""), wr.resumeBootstrap = function(e) {
            i(e, function(e) {
                o.push(e)
            }), a()
        }, n)
    }

    function Z(e, t) {
        return t = t || "_", e.replace(Sr, function(e, n) {
            return (n ? t : "") + e.toLowerCase()
        })
    }

    function et() {
        pr = e.jQuery, pr ? (dr = pr, f(pr.fn, {
            scope: Mr.scope,
            isolateScope: Mr.isolateScope,
            controller: Mr.controller,
            injector: Mr.injector,
            inheritedData: Mr.inheritedData
        }), ut("remove", !0, !0, !1), ut("empty", !1, !1, !1), ut("html", !1, !1, !0)) : dr = ft, wr.element = dr
    }

    function tt(e, t, n) {
        if (!e) throw $r("areq", "Argument '{0}' is {1}", t || "?", n || "required");
        return e
    }

    function nt(e, t, n) {
        return n && S(e) && (e = e[e.length - 1]), tt(k(e), t, "not a function, got " + (e && "object" == typeof e ? e.constructor.name || "Object" : typeof e)), e
    }

    function rt(e, t) {
        if ("hasOwnProperty" === e) throw $r("badname", "hasOwnProperty is not a valid {0} name", t)
    }

    function ot(e, t, n) {
        if (!t) return e;
        for (var r, o = t.split("."), i = e, a = o.length, l = 0; a > l; l++) r = o[l], e && (e = (i = e)[r]);
        return !n && k(e) ? R(i, e) : e
    }

    function it(e) {
        var t = e[0],
            n = e[e.length - 1];
        if (t === n) return dr(t);
        var r = t,
            o = [r];
        do {
            if (r = r.nextSibling, !r) break;
            o.push(r)
        } while (r !== n);
        return dr(o)
    }

    function at(e) {
        function t(e, t, n) {
            return e[t] || (e[t] = n())
        }
        var n = r("$injector"),
            o = r("ng"),
            i = t(e, "angular", Object);
        return i.$$minErr = i.$$minErr || r, t(i, "module", function() {
            var e = {};
            return function(r, i, a) {
                var l = function(e, t) {
                    if ("hasOwnProperty" === e) throw o("badname", "hasOwnProperty is not a valid {0} name", t)
                };
                return l(r, "module"), i && e.hasOwnProperty(r) && (e[r] = null), t(e, r, function() {
                    function e(e, n, r) {
                        return function() {
                            return t[r || "push"]([e, n, arguments]), s
                        }
                    }
                    if (!i) throw n("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", r);
                    var t = [],
                        o = [],
                        l = e("$injector", "invoke"),
                        s = {
                            _invokeQueue: t,
                            _runBlocks: o,
                            requires: i,
                            name: r,
                            provider: e("$provide", "provider"),
                            factory: e("$provide", "factory"),
                            service: e("$provide", "service"),
                            value: e("$provide", "value"),
                            constant: e("$provide", "constant", "unshift"),
                            animation: e("$animateProvider", "register"),
                            filter: e("$filterProvider", "register"),
                            controller: e("$controllerProvider", "register"),
                            directive: e("$compileProvider", "directive"),
                            config: l,
                            run: function(e) {
                                return o.push(e), this
                            }
                        };
                    return a && l(a), s
                })
            }
        })
    }

    function lt(t) {
        f(t, {
            bootstrap: Y,
            copy: O,
            extend: f,
            equals: j,
            element: dr,
            forEach: i,
            injector: Wt,
            noop: h,
            bind: R,
            toJson: H,
            fromJson: q,
            identity: m,
            isUndefined: v,
            isDefined: y,
            isString: w,
            isFunction: k,
            isObject: $,
            isNumber: b,
            isElement: A,
            isArray: S,
            version: kr,
            isDate: x,
            lowercase: ar,
            uppercase: sr,
            callbacks: {
                counter: 0
            },
            $$minErr: r,
            $$csp: U
        }), hr = at(e);
        try {
            hr("ngLocale")
        } catch (n) {
            hr("ngLocale", []).provider("$locale", Yt)
        }
        hr("ng", ["ngLocale"], ["$provide", function(e) {
            e.provider({
                $$sanitizeUri: Pn
            }), e.provider("$compile", jt).directive({
                a: ho,
                input: ko,
                textarea: ko,
                form: yo,
                script: ii,
                select: si,
                style: ui,
                option: ci,
                ngBind: jo,
                ngBindHtml: Fo,
                ngBindTemplate: Uo,
                ngClass: Lo,
                ngClassEven: No,
                ngClassOdd: Ro,
                ngCloak: Ho,
                ngController: qo,
                ngForm: $o,
                ngHide: Zo,
                ngIf: Vo,
                ngInclude: zo,
                ngInit: Go,
                ngNonBindable: Xo,
                ngPluralize: Ko,
                ngRepeat: Jo,
                ngShow: Yo,
                ngStyle: ei,
                ngSwitch: ti,
                ngSwitchWhen: ni,
                ngSwitchDefault: ri,
                ngOptions: li,
                ngTransclude: oi,
                ngModel: Wo,
                ngList: Mo,
                ngChange: _o,
                required: Io,
                ngRequired: Io,
                ngValue: Do
            }).directive({
                ngInclude: Qo
            }).directive(mo).directive(Bo), e.provider({
                $anchorScroll: _t,
                $animate: Hr,
                $browser: Mt,
                $cacheFactory: Ot,
                $controller: Lt,
                $document: Rt,
                $exceptionHandler: Nt,
                $filter: jn,
                $interpolate: Kt,
                $interval: Jt,
                $http: zt,
                $httpBackend: Gt,
                $location: dn,
                $log: pn,
                $parse: bn,
                $rootScope: kn,
                $q: xn,
                $sce: Wn,
                $sceDelegate: An,
                $sniffer: _n,
                $templateCache: Dt,
                $timeout: In,
                $window: Dn
            })
        }])
    }

    function st() {
        return ++Tr
    }

    function ct(e) {
        return e.replace(Wr, function(e, t, n, r) {
            return r ? n.toUpperCase() : n
        }).replace(_r, "Moz$1")
    }

    function ut(e, t, n, r) {
        function o(e) {
            var o, a, l, s, c, u, f, d = n && e ? [this.filter(e)] : [this],
                p = t;
            if (!r || null != e)
                for (; d.length;)
                    for (o = d.shift(), a = 0, l = o.length; l > a; a++)
                        for (s = dr(o[a]), p ? s.triggerHandler("$destroy") : p = !p, c = 0, u = (f = s.children()).length; u > c; c++) d.push(pr(f[c]));
            return i.apply(this, arguments)
        }
        var i = pr.fn[e];
        i = i.$original || i, o.$original = i, pr.fn[e] = o
    }

    function ft(e) {
        if (e instanceof ft) return e;
        if (w(e) && (e = xr(e)), !(this instanceof ft)) {
            if (w(e) && "<" != e.charAt(0)) throw Ir("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new ft(e)
        }
        if (w(e)) {
            var n = t.createElement("div");
            n.innerHTML = "<div>&#160;</div>" + e, n.removeChild(n.firstChild), bt(this, n.childNodes);
            var r = dr(t.createDocumentFragment());
            r.append(this)
        } else bt(this, e)
    }

    function dt(e) {
        return e.cloneNode(!0)
    }

    function pt(e) {
        mt(e);
        for (var t = 0, n = e.childNodes || []; t < n.length; t++) pt(n[t])
    }

    function ht(e, t, n, r) {
        if (y(r)) throw Ir("offargs", "jqLite#off() does not support the `selector` argument");
        var o = gt(e, "events"),
            a = gt(e, "handle");
        a && (v(t) ? i(o, function(t, n) {
            Ar(e, n, t), delete o[n]
        }) : i(t.split(" "), function(t) {
            v(n) ? (Ar(e, t, o[t]), delete o[t]) : M(o[t] || [], n)
        }))
    }

    function mt(e, t) {
        var r = e[Cr],
            o = Pr[r];
        if (o) {
            if (t) return delete Pr[r].data[t], n;
            o.handle && (o.events.$destroy && o.handle({}, "$destroy"), ht(e)), delete Pr[r], e[Cr] = n
        }
    }

    function gt(e, t, r) {
        var o = e[Cr],
            i = Pr[o || -1];
        return y(r) ? (i || (e[Cr] = o = st(), i = Pr[o] = {}), i[t] = r, n) : i && i[t]
    }

    function vt(e, t, n) {
        var r = gt(e, "data"),
            o = y(n),
            i = !o && y(t),
            a = i && !$(t);
        if (r || a || gt(e, "data", r = {}), o) r[t] = n;
        else {
            if (!i) return r;
            if (a) return r && r[t];
            f(r, t)
        }
    }

    function yt(e, t) {
        return e.getAttribute ? (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + t + " ") > -1 : !1
    }

    function $t(e, t) {
        t && e.setAttribute && i(t.split(" "), function(t) {
            e.setAttribute("class", xr((" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + xr(t) + " ", " ")))
        })
    }

    function wt(e, t) {
        if (t && e.setAttribute) {
            var n = (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            i(t.split(" "), function(e) {
                e = xr(e), -1 === n.indexOf(" " + e + " ") && (n += e + " ")
            }), e.setAttribute("class", xr(n))
        }
    }

    function bt(e, t) {
        if (t) {
            t = t.nodeName || !y(t.length) || C(t) ? [t] : t;
            for (var n = 0; n < t.length; n++) e.push(t[n])
        }
    }

    function xt(e, t) {
        return St(e, "$" + (t || "ngController") + "Controller")
    }

    function St(e, t, r) {
        e = dr(e), 9 == e[0].nodeType && (e = e.find("html"));
        for (var o = S(t) ? t : [t]; e.length;) {
            for (var i = 0, a = o.length; a > i; i++)
                if ((r = e.data(o[i])) !== n) return r;
            e = e.parent()
        }
    }

    function kt(e) {
        for (var t = 0, n = e.childNodes; t < n.length; t++) pt(n[t]);
        for (; e.firstChild;) e.removeChild(e.firstChild)
    }

    function Pt(e, t) {
        var n = Or[t.toLowerCase()];
        return n && Dr[e.nodeName] && n
    }

    function Ct(e, n) {
        var r = function(r, o) {
            if (r.preventDefault || (r.preventDefault = function() {
                    r.returnValue = !1
                }), r.stopPropagation || (r.stopPropagation = function() {
                    r.cancelBubble = !0
                }), r.target || (r.target = r.srcElement || t), v(r.defaultPrevented)) {
                var a = r.preventDefault;
                r.preventDefault = function() {
                    r.defaultPrevented = !0, a.call(r)
                }, r.defaultPrevented = !1
            }
            r.isDefaultPrevented = function() {
                return r.defaultPrevented || r.returnValue === !1
            };
            var l = D(n[o || r.type] || []);
            i(l, function(t) {
                t.call(e, r)
            }), 8 >= fr ? (r.preventDefault = null, r.stopPropagation = null, r.isDefaultPrevented = null) : (delete r.preventDefault, delete r.stopPropagation, delete r.isDefaultPrevented)
        };
        return r.elem = e, r
    }

    function Tt(e) {
        var t, r = typeof e;
        return "object" == r && null !== e ? "function" == typeof(t = e.$$hashKey) ? t = e.$$hashKey() : t === n && (t = e.$$hashKey = c()) : t = e, r + ":" + t
    }

    function Et(e) {
        i(e, this.put, this)
    }

    function At(e) {
        var t, n, r, o;
        return "function" == typeof e ? (t = e.$inject) || (t = [], e.length && (n = ("" + e).replace(Lr, ""), r = n.match(jr), i(r[1].split(Ur), function(e) {
            e.replace(Fr, function(e, n, r) {
                t.push(r)
            })
        })), e.$inject = t) : S(e) ? (o = e.length - 1, nt(e[o], "fn"), t = e.slice(0, o)) : nt(e, "fn", !0), t
    }

    function Wt(e) {
        function t(e) {
            return function(t, r) {
                return $(t) ? (i(t, s(e)), n) : e(t, r)
            }
        }

        function r(e, t) {
            if (rt(e, "service"), (k(t) || S(t)) && (t = x.instantiate(t)), !t.$get) throw Rr("pget", "Provider '{0}' must define $get factory method.", e);
            return b[e + m] = t
        }

        function o(e, t) {
            return r(e, {
                $get: t
            })
        }

        function a(e, t) {
            return o(e, ["$injector", function(e) {
                return e.instantiate(t)
            }])
        }

        function l(e, t) {
            return o(e, g(t))
        }

        function c(e, t) {
            rt(e, "constant"), b[e] = t, P[e] = t
        }

        function u(e, t) {
            var n = x.get(e + m),
                r = n.$get;
            n.$get = function() {
                var e = C.invoke(r, n);
                return C.invoke(t, null, {
                    $delegate: e
                })
            }
        }

        function f(e) {
            var t, n, r, o, a = [];
            return i(e, function(e) {
                if (!y.get(e)) {
                    y.put(e, !0);
                    try {
                        if (w(e))
                            for (t = hr(e), a = a.concat(f(t.requires)).concat(t._runBlocks), n = t._invokeQueue, r = 0, o = n.length; o > r; r++) {
                                var i = n[r],
                                    l = x.get(i[0]);
                                l[i[1]].apply(l, i[2])
                            } else k(e) ? a.push(x.invoke(e)) : S(e) ? a.push(x.invoke(e)) : nt(e, "module")
                    } catch (s) {
                        throw S(e) && (e = e[e.length - 1]), s.message && s.stack && -1 == s.stack.indexOf(s.message) && (s = s.message + "\n" + s.stack), Rr("modulerr", "Failed to instantiate module {0} due to:\n{1}", e, s.stack || s.message || s)
                    }
                }
            }), a
        }

        function d(e, t) {
            function n(n) {
                if (e.hasOwnProperty(n)) {
                    if (e[n] === p) throw Rr("cdep", "Circular dependency found: {0}", v.join(" <- "));
                    return e[n]
                }
                try {
                    return v.unshift(n), e[n] = p, e[n] = t(n)
                } catch (r) {
                    throw e[n] === p && delete e[n], r
                } finally {
                    v.shift()
                }
            }

            function r(e, t, r) {
                var o, i, a, l = [],
                    s = At(e);
                for (i = 0, o = s.length; o > i; i++) {
                    if (a = s[i], "string" != typeof a) throw Rr("itkn", "Incorrect injection token! Expected service name as string, got {0}", a);
                    l.push(r && r.hasOwnProperty(a) ? r[a] : n(a))
                }
                return e.$inject || (e = e[o]), e.apply(t, l)
            }

            function o(e, t) {
                var n, o, i = function() {};
                return i.prototype = (S(e) ? e[e.length - 1] : e).prototype, n = new i, o = r(e, n, t), $(o) || k(o) ? o : n
            }
            return {
                invoke: r,
                instantiate: o,
                get: n,
                annotate: At,
                has: function(t) {
                    return b.hasOwnProperty(t + m) || e.hasOwnProperty(t)
                }
            }
        }
        var p = {},
            m = "Provider",
            v = [],
            y = new Et,
            b = {
                $provide: {
                    provider: t(r),
                    factory: t(o),
                    service: t(a),
                    value: t(l),
                    constant: t(c),
                    decorator: u
                }
            },
            x = b.$injector = d(b, function() {
                throw Rr("unpr", "Unknown provider: {0}", v.join(" <- "))
            }),
            P = {},
            C = P.$injector = d(P, function(e) {
                var t = x.get(e + m);
                return C.invoke(t.$get, t)
            });
        return i(f(e), function(e) {
            C.invoke(e || h)
        }), C
    }

    function _t() {
        var e = !0;
        this.disableAutoScrolling = function() {
            e = !1
        }, this.$get = ["$window", "$location", "$rootScope", function(t, n, r) {
            function o(e) {
                var t = null;
                return i(e, function(e) {
                    t || "a" !== ar(e.nodeName) || (t = e)
                }), t
            }

            function a() {
                var e, r = n.hash();
                r ? (e = l.getElementById(r)) ? e.scrollIntoView() : (e = o(l.getElementsByName(r))) ? e.scrollIntoView() : "top" === r && t.scrollTo(0, 0) : t.scrollTo(0, 0)
            }
            var l = t.document;
            return e && r.$watch(function() {
                return n.hash()
            }, function() {
                r.$evalAsync(a)
            }), a
        }]
    }

    function It(e, t, r, o) {
        function a(e) {
            try {
                e.apply(null, L(arguments, 1))
            } finally {
                if (y--, 0 === y)
                    for (; $.length;) try {
                        $.pop()()
                    } catch (t) {
                        r.error(t)
                    }
            }
        }

        function l(e, t) {
            ! function n() {
                i(x, function(e) {
                    e()
                }), b = t(n, e)
            }()
        }

        function s() {
            P = null, S != c.url() && (S = c.url(), i(C, function(e) {
                e(c.url())
            }))
        }
        var c = this,
            u = t[0],
            f = e.location,
            d = e.history,
            p = e.setTimeout,
            m = e.clearTimeout,
            g = {};
        c.isMock = !1;
        var y = 0,
            $ = [];
        c.$$completeOutstandingRequest = a, c.$$incOutstandingRequestCount = function() {
            y++
        }, c.notifyWhenNoOutstandingRequests = function(e) {
            i(x, function(e) {
                e()
            }), 0 === y ? e() : $.push(e)
        };
        var b, x = [];
        c.addPollFn = function(e) {
            return v(b) && l(100, p), x.push(e), e
        };
        var S = f.href,
            k = t.find("base"),
            P = null;
        c.url = function(t, n) {
            if (f !== e.location && (f = e.location), d !== e.history && (d = e.history), t) {
                if (S == t) return;
                return S = t, o.history ? n ? d.replaceState(null, "", t) : (d.pushState(null, "", t), k.attr("href", k.attr("href"))) : (P = t, n ? f.replace(t) : f.href = t), c
            }
            return P || f.href.replace(/%27/g, "'")
        };
        var C = [],
            T = !1;
        c.onUrlChange = function(t) {
            return T || (o.history && dr(e).on("popstate", s), o.hashchange ? dr(e).on("hashchange", s) : c.addPollFn(s), T = !0), C.push(t), t
        }, c.baseHref = function() {
            var e = k.attr("href");
            return e ? e.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
        };
        var E = {},
            A = "",
            W = c.baseHref();
        c.cookies = function(e, t) {
            var o, i, a, l, s;
            if (!e) {
                if (u.cookie !== A)
                    for (A = u.cookie, i = A.split("; "), E = {}, l = 0; l < i.length; l++) a = i[l], s = a.indexOf("="), s > 0 && (e = unescape(a.substring(0, s)), E[e] === n && (E[e] = unescape(a.substring(s + 1))));
                return E
            }
            t === n ? u.cookie = escape(e) + "=;path=" + W + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : w(t) && (o = (u.cookie = escape(e) + "=" + escape(t) + ";path=" + W).length + 1, o > 4096 && r.warn("Cookie '" + e + "' possibly not set or overflowed because it was too large (" + o + " > 4096 bytes)!"))
        }, c.defer = function(e, t) {
            var n;
            return y++, n = p(function() {
                delete g[n], a(e)
            }, t || 0), g[n] = !0, n
        }, c.defer.cancel = function(e) {
            return g[e] ? (delete g[e], m(e), a(h), !0) : !1
        }
    }

    function Mt() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function(e, t, n, r) {
            return new It(e, r, t, n)
        }]
    }

    function Ot() {
        this.$get = function() {
            function e(e, o) {
                function i(e) {
                    e != p && (h ? h == e && (h = e.n) : h = e, a(e.n, e.p), a(e, p), p = e, p.n = null)
                }

                function a(e, t) {
                    e != t && (e && (e.p = t), t && (t.n = e))
                }
                if (e in t) throw r("$cacheFactory")("iid", "CacheId '{0}' is already taken!", e);
                var l = 0,
                    s = f({}, o, {
                        id: e
                    }),
                    c = {},
                    u = o && o.capacity || Number.MAX_VALUE,
                    d = {},
                    p = null,
                    h = null;
                return t[e] = {
                    put: function(e, t) {
                        var r = d[e] || (d[e] = {
                            key: e
                        });
                        return i(r), v(t) ? n : (e in c || l++, c[e] = t, l > u && this.remove(h.key), t)
                    },
                    get: function(e) {
                        var t = d[e];
                        if (t) return i(t), c[e]
                    },
                    remove: function(e) {
                        var t = d[e];
                        t && (t == p && (p = t.p), t == h && (h = t.n), a(t.n, t.p), delete d[e], delete c[e], l--)
                    },
                    removeAll: function() {
                        c = {}, l = 0, d = {}, p = h = null
                    },
                    destroy: function() {
                        c = null, s = null, d = null, delete t[e]
                    },
                    info: function() {
                        return f({}, s, {
                            size: l
                        })
                    }
                }
            }
            var t = {};
            return e.info = function() {
                var e = {};
                return i(t, function(t, n) {
                    e[n] = t.info()
                }), e
            }, e.get = function(e) {
                return t[e]
            }, e
        }
    }

    function Dt() {
        this.$get = ["$cacheFactory", function(e) {
            return e("templates")
        }]
    }

    function jt(e, r) {
        var o = {},
            a = "Directive",
            l = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,
            c = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/,
            u = /^<\s*(tr|th|td|tbody)(\s+[^>]*)?>/i,
            d = /^(on[a-z]+|formaction)$/;
        this.directive = function h(t, n) {
            return rt(t, "directive"), w(t) ? (tt(n, "directiveFactory"), o.hasOwnProperty(t) || (o[t] = [], e.factory(t + a, ["$injector", "$exceptionHandler", function(e, n) {
                var r = [];
                return i(o[t], function(o, i) {
                    try {
                        var a = e.invoke(o);
                        k(a) ? a = {
                            compile: g(a)
                        } : !a.compile && a.link && (a.compile = g(a.link)), a.priority = a.priority || 0, a.index = i, a.name = a.name || t, a.require = a.require || a.controller && a.name, a.restrict = a.restrict || "A", r.push(a)
                    } catch (l) {
                        n(l)
                    }
                }), r
            }])), o[t].push(n)) : i(t, s(h)), this
        }, this.aHrefSanitizationWhitelist = function(e) {
            return y(e) ? (r.aHrefSanitizationWhitelist(e), this) : r.aHrefSanitizationWhitelist()
        }, this.imgSrcSanitizationWhitelist = function(e) {
            return y(e) ? (r.imgSrcSanitizationWhitelist(e), this) : r.imgSrcSanitizationWhitelist()
        }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(e, r, s, h, v, y, b, x, P, C, T, E) {
            function A(e, t, n, r, o) {
                e instanceof dr || (e = dr(e)), i(e, function(t, n) {
                    3 == t.nodeType && t.nodeValue.match(/\S+/) && (e[n] = t = dr(t).wrap("<span></span>").parent()[0])
                });
                var a = _(e, t, e, n, r, o);
                return W(e, "ng-scope"),
                    function(t, n, r) {
                        tt(t, "scope");
                        var o = n ? Mr.clone.call(e) : e;
                        i(r, function(e, t) {
                            o.data("$" + t + "Controller", e)
                        });
                        for (var l = 0, s = o.length; s > l; l++) {
                            var c = o[l],
                                u = c.nodeType;
                            (1 === u || 9 === u) && o.eq(l).data("$scope", t)
                        }
                        return n && n(o, t), a && a(t, o, o), o
                    }
            }

            function W(e, t) {
                try {
                    e.addClass(t)
                } catch (n) {}
            }

            function _(e, t, r, o, i, a) {
                function l(e, r, o, i) {
                    var a, l, s, c, u, f, d, p, m, g = r.length,
                        v = Array(g);
                    for (d = 0; g > d; d++) v[d] = r[d];
                    for (d = 0, m = 0, p = h.length; p > d; m++) s = v[m], a = h[d++], l = h[d++], c = dr(s), a ? (a.scope ? (u = e.$new(), c.data("$scope", u)) : u = e, f = a.transclude, f || !i && t ? a(l, u, s, o, I(e, f || t)) : a(l, u, s, o, i)) : l && l(e, s.childNodes, n, i)
                }
                for (var s, c, u, f, d, p, h = [], m = 0; m < e.length; m++) s = new nt, c = M(e[m], [], s, 0 === m ? o : n, i), u = c.length ? F(c, e[m], s, t, r, null, [], [], a) : null, u && u.scope && W(dr(e[m]), "ng-scope"), d = u && u.terminal || !(f = e[m].childNodes) || !f.length ? null : _(f, u ? u.transclude : t), h.push(u, d), p = p || u || d, a = null;
                return p ? l : null
            }

            function I(e, t) {
                return function(n, r, o) {
                    var i = !1;
                    n || (n = e.$new(), n.$$transcluded = !0, i = !0);
                    var a = t(n, r, o);
                    return i && a.on("$destroy", R(n, n.$destroy)), a
                }
            }

            function M(e, t, n, r, o) {
                var i, a, s = e.nodeType,
                    u = n.$attr;
                switch (s) {
                    case 1:
                        H(t, Ut(mr(e).toLowerCase()), "E", r, o);
                        for (var f, d, p, h, m, g = e.attributes, v = 0, y = g && g.length; y > v; v++) {
                            var $ = !1,
                                b = !1;
                            if (f = g[v], !fr || fr >= 8 || f.specified) {
                                d = f.name, h = Ut(d), at.test(h) && (d = Z(h.substr(6), "-"));
                                var x = h.replace(/(Start|End)$/, "");
                                h === x + "Start" && ($ = d, b = d.substr(0, d.length - 5) + "end", d = d.substr(0, d.length - 6)), p = Ut(d.toLowerCase()), u[p] = d, n[p] = m = xr(f.value), Pt(e, p) && (n[p] = !0), J(e, t, m, p), H(t, p, "A", r, o, $, b)
                            }
                        }
                        if (a = e.className, w(a) && "" !== a)
                            for (; i = c.exec(a);) p = Ut(i[2]), H(t, p, "C", r, o) && (n[p] = xr(i[3])), a = a.substr(i.index + i[0].length);
                        break;
                    case 3:
                        X(t, e.nodeValue);
                        break;
                    case 8:
                        try {
                            i = l.exec(e.nodeValue), i && (p = Ut(i[1]), H(t, p, "M", r, o) && (n[p] = xr(i[2])))
                        } catch (S) {}
                }
                return t.sort(Q), t
            }

            function O(e, t, n) {
                var r = [],
                    o = 0;
                if (t && e.hasAttribute && e.hasAttribute(t)) {
                    do {
                        if (!e) throw qr("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", t, n);
                        1 == e.nodeType && (e.hasAttribute(t) && o++, e.hasAttribute(n) && o--), r.push(e), e = e.nextSibling
                    } while (o > 0)
                } else r.push(e);
                return dr(r)
            }

            function U(e, t, n) {
                return function(r, o, i, a, l) {
                    return o = O(o[0], t, n), e(r, o, i, a, l)
                }
            }

            function F(e, o, a, l, c, u, f, d, p) {
                function h(e, t, n, r) {
                    e && (n && (e = U(e, n, r)), e.require = x.require, (F === x || x.$$isolateScope) && (e = et(e, {
                        isolateScope: !0
                    })), f.push(e)), t && (n && (t = U(t, n, r)), t.require = x.require, (F === x || x.$$isolateScope) && (t = et(t, {
                        isolateScope: !0
                    })), d.push(t))
                }

                function m(e, t, n) {
                    var r, o = "data",
                        a = !1;
                    if (w(e)) {
                        for (;
                            "^" == (r = e.charAt(0)) || "?" == r;) e = e.substr(1), "^" == r && (o = "inheritedData"), a = a || "?" == r;
                        if (r = null, n && "data" === o && (r = n[e]), r = r || t[o]("$" + e + "Controller"), !r && !a) throw qr("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", e, P);
                        return r
                    }
                    return S(e) && (r = [], i(e, function(e) {
                        r.push(m(e, t, n))
                    })), r
                }

                function g(e, t, l, c, u) {
                    function p(e, t) {
                        var r;
                        return arguments.length < 2 && (t = e, e = n), X && (r = P), u(e, t, r)
                    }
                    var h, g, v, $, w, x, S, k, P = {};
                    if (h = o === l ? a : D(a, new nt(dr(l), a.$attr)), g = h.$$element, F) {
                        var C = /^\s*([@=&])(\??)\s*(\w*)\s*$/,
                            T = dr(l);
                        S = t.$new(!0), R && R === F.$$originalDirective ? T.data("$isolateScope", S) : T.data("$isolateScopeNoTemplate", S), W(T, "ng-isolate-scope"), i(F.scope, function(e, n) {
                            var o, i, a, l, s = e.match(C) || [],
                                c = s[3] || n,
                                u = "?" == s[2],
                                f = s[1];
                            switch (S.$$isolateBindings[n] = f + c, f) {
                                case "@":
                                    h.$observe(c, function(e) {
                                        S[n] = e
                                    }), h.$$observers[c].$$scope = t, h[c] && (S[n] = r(h[c])(t));
                                    break;
                                case "=":
                                    if (u && !h[c]) return;
                                    i = y(h[c]), l = i.literal ? j : function(e, t) {
                                        return e === t
                                    }, a = i.assign || function() {
                                        throw o = S[n] = i(t), qr("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", h[c], F.name)
                                    }, o = S[n] = i(t), S.$watch(function() {
                                        var e = i(t);
                                        return l(e, S[n]) || (l(e, o) ? a(t, e = S[n]) : S[n] = e), o = e
                                    }, null, i.literal);
                                    break;
                                case "&":
                                    i = y(h[c]), S[n] = function(e) {
                                        return i(t, e)
                                    };
                                    break;
                                default:
                                    throw qr("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", F.name, n, e)
                            }
                        })
                    }
                    for (k = u && p, I && i(I, function(e) {
                            var n, r = {
                                $scope: e === F || e.$$isolateScope ? S : t,
                                $element: g,
                                $attrs: h,
                                $transclude: k
                            };
                            x = e.controller, "@" == x && (x = h[e.name]), n = b(x, r), P[e.name] = n, X || g.data("$" + e.name + "Controller", n), e.controllerAs && (r.$scope[e.controllerAs] = n)
                        }), v = 0, $ = f.length; $ > v; v++) try {
                        w = f[v], w(w.isolateScope ? S : t, g, h, w.require && m(w.require, g, P), k)
                    } catch (E) {
                        s(E, V(g))
                    }
                    var A = t;
                    for (F && (F.template || null === F.templateUrl) && (A = S), e && e(A, l.childNodes, n, u), v = d.length - 1; v >= 0; v--) try {
                        w = d[v], w(w.isolateScope ? S : t, g, h, w.require && m(w.require, g, P), k)
                    } catch (E) {
                        s(E, V(g))
                    }
                }
                p = p || {};
                for (var v, x, P, C, T, E, _ = -Number.MAX_VALUE, I = p.controllerDirectives, F = p.newIsolateScopeDirective, R = p.templateDirective, H = p.nonTlbTranscludeDirective, Q = !1, X = p.hasElementTranscludeDirective, K = a.$$element = dr(o), J = u, Z = l, tt = 0, rt = e.length; rt > tt; tt++) {
                    x = e[tt];
                    var ot = x.$$start,
                        at = x.$$end;
                    if (ot && (K = O(o, ot, at)), C = n, _ > x.priority) break;
                    if ((E = x.scope) && (v = v || x, x.templateUrl || (G("new/isolated scope", F, x, K), $(E) && (F = x))), P = x.name, !x.templateUrl && x.controller && (E = x.controller, I = I || {}, G("'" + P + "' controller", I[P], x, K), I[P] = x), (E = x.transclude) && (Q = !0, x.$$tlb || (G("transclusion", H, x, K), H = x), "element" == E ? (X = !0, _ = x.priority, C = O(o, ot, at), K = a.$$element = dr(t.createComment(" " + P + ": " + a[P] + " ")), o = K[0], Y(c, dr(L(C)), o), Z = A(C, l, _, J && J.name, {
                            nonTlbTranscludeDirective: H
                        })) : (C = dr(dt(o)).contents(), K.empty(), Z = A(C, l))), x.template)
                        if (G("template", R, x, K), R = x, E = k(x.template) ? x.template(K, a) : x.template, E = it(E), x.replace) {
                            if (J = x, C = B(E), o = C[0], 1 != C.length || 1 !== o.nodeType) throw qr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", P, "");
                            Y(c, K, o);
                            var lt = {
                                    $attr: {}
                                },
                                st = M(o, [], lt),
                                ct = e.splice(tt + 1, e.length - (tt + 1));
                            F && N(st), e = e.concat(st).concat(ct), q(a, lt), rt = e.length
                        } else K.html(E);
                    if (x.templateUrl) G("template", R, x, K), R = x, x.replace && (J = x), g = z(e.splice(tt, e.length - tt), K, a, c, Z, f, d, {
                        controllerDirectives: I,
                        newIsolateScopeDirective: F,
                        templateDirective: R,
                        nonTlbTranscludeDirective: H
                    }), rt = e.length;
                    else if (x.compile) try {
                        T = x.compile(K, a, Z), k(T) ? h(null, T, ot, at) : T && h(T.pre, T.post, ot, at)
                    } catch (ut) {
                        s(ut, V(K))
                    }
                    x.terminal && (g.terminal = !0, _ = Math.max(_, x.priority))
                }
                return g.scope = v && v.scope === !0, g.transclude = Q && Z, p.hasElementTranscludeDirective = X, g
            }

            function N(e) {
                for (var t = 0, n = e.length; n > t; t++) e[t] = p(e[t], {
                    $$isolateScope: !0
                })
            }

            function H(t, r, i, l, c, u, f) {
                if (r === c) return null;
                var d = null;
                if (o.hasOwnProperty(r))
                    for (var h, m = e.get(r + a), g = 0, v = m.length; v > g; g++) try {
                        h = m[g], (l === n || l > h.priority) && -1 != h.restrict.indexOf(i) && (u && (h = p(h, {
                            $$start: u,
                            $$end: f
                        })), t.push(h), d = h)
                    } catch (y) {
                        s(y)
                    }
                return d
            }

            function q(e, t) {
                var n = t.$attr,
                    r = e.$attr,
                    o = e.$$element;
                i(e, function(r, o) {
                    "$" != o.charAt(0) && (t[o] && (r += ("style" === o ? ";" : " ") + t[o]), e.$set(o, r, !0, n[o]))
                }), i(t, function(t, i) {
                    "class" == i ? (W(o, t), e["class"] = (e["class"] ? e["class"] + " " : "") + t) : "style" == i ? (o.attr("style", o.attr("style") + ";" + t), e.style = (e.style ? e.style + ";" : "") + t) : "$" == i.charAt(0) || e.hasOwnProperty(i) || (e[i] = t, r[i] = n[i])
                })
            }

            function B(e) {
                var t;
                if (e = xr(e), t = u.exec(e)) {
                    t = t[1].toLowerCase();
                    var n = dr("<table>" + e + "</table>"),
                        r = n.children("tbody"),
                        o = /(td|th)/.test(t) && n.find("tr");
                    return r.length && "tbody" !== t && (n = r), o && o.length && (n = o), n.contents()
                }
                return dr("<div>" + e + "</div>").contents()
            }

            function z(e, t, n, r, o, a, l, s) {
                var c, u, d = [],
                    p = t[0],
                    m = e.shift(),
                    g = f({}, m, {
                        templateUrl: null,
                        transclude: null,
                        replace: null,
                        $$originalDirective: m
                    }),
                    y = k(m.templateUrl) ? m.templateUrl(t, n) : m.templateUrl;
                return t.empty(), h.get(C.getTrustedResourceUrl(y), {
                        cache: v
                    }).success(function(f) {
                        var h, v, w, b;
                        if (f = it(f), m.replace) {
                            if (w = B(f), h = w[0], 1 != w.length || 1 !== h.nodeType) throw qr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", m.name, y);
                            v = {
                                $attr: {}
                            }, Y(r, t, h);
                            var x = M(h, [], v);
                            $(m.scope) && N(x), e = x.concat(e), q(n, v)
                        } else h = p, t.html(f);
                        for (e.unshift(g), c = F(e, h, n, o, t, m, a, l, s), i(r, function(e, n) {
                                e == h && (r[n] = t[0])
                            }), u = _(t[0].childNodes, o); d.length;) {
                            var S = d.shift(),
                                k = d.shift(),
                                P = d.shift(),
                                C = d.shift(),
                                T = t[0];
                            if (k !== p) {
                                var E = k.className;
                                s.hasElementTranscludeDirective && m.replace || (T = dt(h)), Y(P, dr(k), T), W(dr(T), E)
                            }
                            b = c.transclude ? I(S, c.transclude) : C, c(u, S, T, r, b)
                        }
                        d = null
                    }).error(function(e, t, n, r) {
                        throw qr("tpload", "Failed to load template: {0}", r.url)
                    }),
                    function(e, t, n, r, o) {
                        d ? (d.push(t), d.push(n), d.push(r), d.push(o)) : c(u, t, n, r, o)
                    }
            }

            function Q(e, t) {
                var n = t.priority - e.priority;
                return 0 !== n ? n : e.name !== t.name ? e.name < t.name ? -1 : 1 : e.index - t.index
            }

            function G(e, t, n, r) {
                if (t) throw qr("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", t.name, n.name, e, V(r))
            }

            function X(e, t) {
                var n = r(t, !0);
                n && e.push({
                    priority: 0,
                    compile: g(function(e, t) {
                        var r = t.parent(),
                            o = r.data("$binding") || [];
                        o.push(n), W(r.data("$binding", o), "ng-binding"), e.$watch(n, function(e) {
                            t[0].nodeValue = e
                        })
                    })
                })
            }

            function K(e, t) {
                if ("srcdoc" == t) return C.HTML;
                var r = mr(e);
                return "xlinkHref" == t || "FORM" == r && "action" == t || "IMG" != r && ("src" == t || "ngSrc" == t) ? C.RESOURCE_URL : n
            }

            function J(e, t, n, o) {
                var i = r(n, !0);
                if (i) {
                    if ("multiple" === o && "SELECT" === mr(e)) throw qr("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", V(e));
                    t.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(t, n, a) {
                                    var l = a.$$observers || (a.$$observers = {});
                                    if (d.test(o)) throw qr("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                    i = r(a[o], !0, K(e, o)), i && (a[o] = i(t), (l[o] || (l[o] = [])).$$inter = !0, (a.$$observers && a.$$observers[o].$$scope || t).$watch(i, function(e, t) {
                                        "class" === o && e != t ? a.$updateClass(e, t) : a.$set(o, e)
                                    }))
                                }
                            }
                        }
                    })
                }
            }

            function Y(e, n, r) {
                var o, i, a = n[0],
                    l = n.length,
                    s = a.parentNode;
                if (e)
                    for (o = 0, i = e.length; i > o; o++)
                        if (e[o] == a) {
                            e[o++] = r;
                            for (var c = o, u = c + l - 1, f = e.length; f > c; c++, u++) f > u ? e[c] = e[u] : delete e[c];
                            e.length -= l - 1;
                            break
                        }
                s && s.replaceChild(r, a);
                var d = t.createDocumentFragment();
                d.appendChild(a), r[dr.expando] = a[dr.expando];
                for (var p = 1, h = n.length; h > p; p++) {
                    var m = n[p];
                    dr(m).remove(), d.appendChild(m), delete n[p]
                }
                n[0] = r, n.length = 1
            }

            function et(e, t) {
                return f(function() {
                    return e.apply(null, arguments)
                }, e, t)
            }
            var nt = function(e, t) {
                this.$$element = e, this.$attr = t || {}
            };
            nt.prototype = {
                $normalize: Ut,
                $addClass: function(e) {
                    e && e.length > 0 && T.addClass(this.$$element, e)
                },
                $removeClass: function(e) {
                    e && e.length > 0 && T.removeClass(this.$$element, e)
                },
                $updateClass: function(e, t) {
                    var n = Ft(e, t),
                        r = Ft(t, e);
                    0 === n.length ? T.removeClass(this.$$element, r) : 0 === r.length ? T.addClass(this.$$element, n) : T.setClass(this.$$element, n, r)
                },
                $set: function(e, t, r, o) {
                    var a, l = Pt(this.$$element[0], e);
                    l && (this.$$element.prop(e, t), o = l), this[e] = t, o ? this.$attr[e] = o : (o = this.$attr[e], o || (this.$attr[e] = o = Z(e, "-"))), a = mr(this.$$element), ("A" === a && "href" === e || "IMG" === a && "src" === e) && (this[e] = t = E(t, "src" === e)), r !== !1 && (null === t || t === n ? this.$$element.removeAttr(o) : this.$$element.attr(o, t));
                    var c = this.$$observers;
                    c && i(c[e], function(e) {
                        try {
                            e(t)
                        } catch (n) {
                            s(n)
                        }
                    })
                },
                $observe: function(e, t) {
                    var n = this,
                        r = n.$$observers || (n.$$observers = {}),
                        o = r[e] || (r[e] = []);
                    return o.push(t), x.$evalAsync(function() {
                        o.$$inter || t(n[e])
                    }), t
                }
            };
            var rt = r.startSymbol(),
                ot = r.endSymbol(),
                it = "{{" == rt || "}}" == ot ? m : function(e) {
                    return e.replace(/\{\{/g, rt).replace(/}}/g, ot)
                },
                at = /^ngAttr[A-Z]/;
            return A
        }]
    }

    function Ut(e) {
        return ct(e.replace(Br, ""))
    }

    function Ft(e, t) {
        var n = "",
            r = e.split(/\s+/),
            o = t.split(/\s+/);
        e: for (var i = 0; i < r.length; i++) {
            for (var a = r[i], l = 0; l < o.length; l++)
                if (a == o[l]) continue e;
            n += (n.length > 0 ? " " : "") + a
        }
        return n
    }

    function Lt() {
        var e = {},
            t = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(t, n) {
            rt(t, "controller"), $(t) ? f(e, t) : e[t] = n
        }, this.$get = ["$injector", "$window", function(n, o) {
            return function(i, a) {
                var l, s, c, u;
                if (w(i) && (s = i.match(t), c = s[1], u = s[3], i = e.hasOwnProperty(c) ? e[c] : ot(a.$scope, c, !0) || ot(o, c, !0), nt(i, c, !0)), l = n.instantiate(i, a), u) {
                    if (!a || "object" != typeof a.$scope) throw r("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", c || i.name, u);
                    a.$scope[u] = l
                }
                return l
            }
        }]
    }

    function Rt() {
        this.$get = ["$window", function(e) {
            return dr(e.document)
        }]
    }

    function Nt() {
        this.$get = ["$log", function(e) {
            return function() {
                e.error.apply(e, arguments)
            }
        }]
    }

    function Ht(e) {
        var t, n, r, o = {};
        return e ? (i(e.split("\n"), function(e) {
            r = e.indexOf(":"), t = ar(xr(e.substr(0, r))), n = xr(e.substr(r + 1)), t && (o[t] ? o[t] += ", " + n : o[t] = n)
        }), o) : o
    }

    function qt(e) {
        var t = $(e) ? e : n;
        return function(n) {
            return t || (t = Ht(e)), n ? t[ar(n)] || null : t
        }
    }

    function Bt(e, t, n) {
        return k(n) ? n(e, t) : (i(n, function(n) {
            e = n(e, t)
        }), e)
    }

    function Vt(e) {
        return e >= 200 && 300 > e
    }

    function zt() {
        var e = /^\s*(\[|\{[^\{])/,
            t = /[\}\]]\s*$/,
            r = /^\)\]\}',?\n/,
            o = {
                "Content-Type": "application/json;charset=utf-8"
            },
            a = this.defaults = {
                transformResponse: [function(n) {
                    return w(n) && (n = n.replace(r, ""), e.test(n) && t.test(n) && (n = q(n))), n
                }],
                transformRequest: [function(e) {
                    return $(e) && !E(e) ? H(e) : e
                }],
                headers: {
                    common: {
                        Accept: "application/json, text/plain, */*"
                    },
                    post: O(o),
                    put: O(o),
                    patch: O(o)
                },
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN"
            },
            s = this.interceptors = [],
            c = this.responseInterceptors = [];
        this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(e, t, r, o, u, d) {
            function p(e) {
                function r(e) {
                    var t = f({}, e, {
                        data: Bt(e.data, e.headers, l.transformResponse)
                    });
                    return Vt(e.status) ? t : u.reject(t)
                }

                function o(e) {
                    function t(e) {
                        var t;
                        i(e, function(n, r) {
                            k(n) && (t = n(), null != t ? e[r] = t : delete e[r])
                        })
                    }
                    var n, r, o, l = a.headers,
                        s = f({}, e.headers);
                    l = f({}, l.common, l[ar(e.method)]), t(l), t(s);
                    e: for (n in l) {
                        r = ar(n);
                        for (o in s)
                            if (ar(o) === r) continue e;
                        s[n] = l[n]
                    }
                    return s
                }
                var l = {
                        transformRequest: a.transformRequest,
                        transformResponse: a.transformResponse
                    },
                    s = o(e);
                f(l, e), l.headers = s, l.method = sr(l.method);
                var c = On(l.url) ? t.cookies()[l.xsrfCookieName || a.xsrfCookieName] : n;
                c && (s[l.xsrfHeaderName || a.xsrfHeaderName] = c);
                var d = function(e) {
                        s = e.headers;
                        var t = Bt(e.data, qt(s), e.transformRequest);
                        return v(e.data) && i(s, function(e, t) {
                            "content-type" === ar(t) && delete s[t]
                        }), v(e.withCredentials) && !v(a.withCredentials) && (e.withCredentials = a.withCredentials), g(e, t, s).then(r, r)
                    },
                    p = [d, n],
                    h = u.when(l);
                for (i(P, function(e) {
                        (e.request || e.requestError) && p.unshift(e.request, e.requestError), (e.response || e.responseError) && p.push(e.response, e.responseError)
                    }); p.length;) {
                    var m = p.shift(),
                        y = p.shift();
                    h = h.then(m, y)
                }
                return h.success = function(e) {
                    return h.then(function(t) {
                        e(t.data, t.status, t.headers, l)
                    }), h
                }, h.error = function(e) {
                    return h.then(null, function(t) {
                        e(t.data, t.status, t.headers, l)
                    }), h
                }, h
            }

            function h() {
                i(arguments, function(e) {
                    p[e] = function(t, n) {
                        return p(f(n || {}, {
                            method: e,
                            url: t
                        }))
                    }
                })
            }

            function m() {
                i(arguments, function(e) {
                    p[e] = function(t, n, r) {
                        return p(f(r || {}, {
                            method: e,
                            url: t,
                            data: n
                        }))
                    }
                })
            }

            function g(t, n, r) {
                function i(e, t, n) {
                    c && (Vt(e) ? c.put(m, [e, t, Ht(n)]) : c.remove(m)), l(t, e, n), o.$$phase || o.$apply()
                }

                function l(e, n, r) {
                    n = Math.max(n, 0), (Vt(n) ? d.resolve : d.reject)({
                        data: e,
                        status: n,
                        headers: qt(r),
                        config: t
                    })
                }

                function s() {
                    var e = I(p.pendingRequests, t); - 1 !== e && p.pendingRequests.splice(e, 1)
                }
                var c, f, d = u.defer(),
                    h = d.promise,
                    m = b(t.url, t.params);
                if (p.pendingRequests.push(t), h.then(s, s), (t.cache || a.cache) && t.cache !== !1 && "GET" == t.method && (c = $(t.cache) ? t.cache : $(a.cache) ? a.cache : x), c)
                    if (f = c.get(m), y(f)) {
                        if (f.then) return f.then(s, s), f;
                        S(f) ? l(f[1], f[0], O(f[2])) : l(f, 200, {})
                    } else c.put(m, h);
                return v(f) && e(t.method, m, n, i, r, t.timeout, t.withCredentials, t.responseType), h
            }

            function b(e, t) {
                if (!t) return e;
                var n = [];
                return l(t, function(e, t) {
                    null === e || v(e) || (S(e) || (e = [e]), i(e, function(e) {
                        $(e) && (e = H(e)), n.push(K(t) + "=" + K(e))
                    }))
                }), e + (-1 == e.indexOf("?") ? "?" : "&") + n.join("&")
            }
            var x = r("$http"),
                P = [];
            return i(s, function(e) {
                P.unshift(w(e) ? d.get(e) : d.invoke(e))
            }), i(c, function(e, t) {
                var n = w(e) ? d.get(e) : d.invoke(e);
                P.splice(t, 0, {
                    response: function(e) {
                        return n(u.when(e))
                    },
                    responseError: function(e) {
                        return n(u.reject(e))
                    }
                })
            }), p.pendingRequests = [], h("get", "delete", "head", "jsonp"), m("post", "put"), p.defaults = a, p
        }]
    }

    function Qt(t) {
        if (8 >= fr && (!t.match(/^(get|post|head|put|delete|options)$/i) || !e.XMLHttpRequest)) return new e.ActiveXObject("Microsoft.XMLHTTP");
        if (e.XMLHttpRequest) return new e.XMLHttpRequest;
        throw r("$httpBackend")("noxhr", "This browser does not support XMLHttpRequest.")
    }

    function Gt() {
        this.$get = ["$browser", "$window", "$document", function(e, t, n) {
            return Xt(e, Qt, e.defer, t.angular.callbacks, n[0])
        }]
    }

    function Xt(e, t, n, r, o) {
        function a(e, t) {
            var n = o.createElement("script"),
                r = function() {
                    n.onreadystatechange = n.onload = n.onerror = null, o.body.removeChild(n), t && t()
                };
            return n.type = "text/javascript", n.src = e, fr && 8 >= fr ? n.onreadystatechange = function() {
                /loaded|complete/.test(n.readyState) && r()
            } : n.onload = n.onerror = function() {
                r()
            }, o.body.appendChild(n), r
        }
        var l = -1;
        return function(o, s, c, u, f, d, p, m) {
            function g() {
                $ = l, b && b(), x && x.abort()
            }

            function v(t, r, o, i) {
                k && n.cancel(k), b = x = null, r = 0 === r ? o ? 200 : 404 : r, r = 1223 == r ? 204 : r, t(r, o, i), e.$$completeOutstandingRequest(h)
            }
            var $;
            if (e.$$incOutstandingRequestCount(), s = s || e.url(), "jsonp" == ar(o)) {
                var w = "_" + (r.counter++).toString(36);
                r[w] = function(e) {
                    r[w].data = e
                };
                var b = a(s.replace("JSON_CALLBACK", "angular.callbacks." + w), function() {
                    r[w].data ? v(u, 200, r[w].data) : v(u, $ || -2), r[w] = wr.noop
                })
            } else {
                var x = t(o);
                if (x.open(o, s, !0), i(f, function(e, t) {
                        y(e) && x.setRequestHeader(t, e)
                    }), x.onreadystatechange = function() {
                        if (x && 4 == x.readyState) {
                            var e = null,
                                t = null;
                            $ !== l && (e = x.getAllResponseHeaders(), t = "response" in x ? x.response : x.responseText), v(u, $ || x.status, t, e)
                        }
                    }, p && (x.withCredentials = !0), m) try {
                    x.responseType = m
                } catch (S) {
                    if ("json" !== m) throw S
                }
                x.send(c || null)
            }
            if (d > 0) var k = n(g, d);
            else d && d.then && d.then(g)
        }
    }

    function Kt() {
        var e = "{{",
            t = "}}";
        this.startSymbol = function(t) {
            return t ? (e = t, this) : e
        }, this.endSymbol = function(e) {
            return e ? (t = e, this) : t
        }, this.$get = ["$parse", "$exceptionHandler", "$sce", function(r, o, i) {
            function a(a, c, u) {
                for (var f, d, p, h, m = 0, g = [], y = a.length, $ = !1, w = []; y > m;) - 1 != (f = a.indexOf(e, m)) && -1 != (d = a.indexOf(t, f + l)) ? (m != f && g.push(a.substring(m, f)), g.push(p = r(h = a.substring(f + l, d))), p.exp = h, m = d + s, $ = !0) : (m != y && g.push(a.substring(m)), m = y);
                if ((y = g.length) || (g.push(""), y = 1), u && g.length > 1) throw Vr("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", a);
                return !c || $ ? (w.length = y, p = function(e) {
                    try {
                        for (var t, n = 0, r = y; r > n; n++) "function" == typeof(t = g[n]) && (t = t(e), t = u ? i.getTrusted(u, t) : i.valueOf(t), null === t || v(t) ? t = "" : "string" != typeof t && (t = H(t))), w[n] = t;
                        return w.join("")
                    } catch (l) {
                        var s = Vr("interr", "Can't interpolate: {0}\n{1}", a, "" + l);
                        o(s)
                    }
                }, p.exp = a, p.parts = g, p) : n
            }
            var l = e.length,
                s = t.length;
            return a.startSymbol = function() {
                return e
            }, a.endSymbol = function() {
                return t
            }, a
        }]
    }

    function Jt() {
        this.$get = ["$rootScope", "$window", "$q", function(e, t, n) {
            function r(r, i, a, l) {
                var s = t.setInterval,
                    c = t.clearInterval,
                    u = n.defer(),
                    f = u.promise,
                    d = 0,
                    p = y(l) && !l;
                return a = y(a) ? a : 0, f.then(null, null, r), f.$$intervalId = s(function() {
                    u.notify(d++), a > 0 && d >= a && (u.resolve(d), c(f.$$intervalId), delete o[f.$$intervalId]), p || e.$apply()
                }, i), o[f.$$intervalId] = u, f
            }
            var o = {};
            return r.cancel = function(e) {
                return e && e.$$intervalId in o ? (o[e.$$intervalId].reject("canceled"), clearInterval(e.$$intervalId), delete o[e.$$intervalId], !0) : !1
            }, r
        }]
    }

    function Yt() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    }],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                    SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                    DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                    SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                    AMPMS: ["AM", "PM"],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(e) {
                    return 1 === e ? "one" : "other"
                }
            }
        }
    }

    function Zt(e) {
        for (var t = e.split("/"), n = t.length; n--;) t[n] = X(t[n]);
        return t.join("/")
    }

    function en(e, t, n) {
        var r = Mn(e, n);
        t.$$protocol = r.protocol, t.$$host = r.hostname, t.$$port = d(r.port) || Qr[r.protocol] || null
    }

    function tn(e, t, n) {
        var r = "/" !== e.charAt(0);
        r && (e = "/" + e);
        var o = Mn(e, n);
        t.$$path = decodeURIComponent(r && "/" === o.pathname.charAt(0) ? o.pathname.substring(1) : o.pathname), t.$$search = Q(o.search), t.$$hash = decodeURIComponent(o.hash), t.$$path && "/" != t.$$path.charAt(0) && (t.$$path = "/" + t.$$path)
    }

    function nn(e, t) {
        return 0 === t.indexOf(e) ? t.substr(e.length) : n
    }

    function rn(e) {
        var t = e.indexOf("#");
        return -1 == t ? e : e.substr(0, t)
    }

    function on(e) {
        return e.substr(0, rn(e).lastIndexOf("/") + 1)
    }

    function an(e) {
        return e.substring(0, e.indexOf("/", e.indexOf("//") + 2))
    }

    function ln(e, t) {
        this.$$html5 = !0, t = t || "";
        var r = on(e);
        en(e, this, e), this.$$parse = function(t) {
            var n = nn(r, t);
            if (!w(n)) throw Gr("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', t, r);
            tn(n, this, e), this.$$path || (this.$$path = "/"), this.$$compose()
        }, this.$$compose = function() {
            var e = G(this.$$search),
                t = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = Zt(this.$$path) + (e ? "?" + e : "") + t, this.$$absUrl = r + this.$$url.substr(1)
        }, this.$$rewrite = function(o) {
            var i, a;
            return (i = nn(e, o)) !== n ? (a = i, (i = nn(t, i)) !== n ? r + (nn("/", i) || i) : e + a) : (i = nn(r, o)) !== n ? r + i : r == o + "/" ? r : n
        }
    }

    function sn(e, t) {
        var r = on(e);
        en(e, this, e), this.$$parse = function(n) {
            function o(e, t, n) {
                var r, o = /^\/?.*?:(\/.*)/;
                return 0 === t.indexOf(n) && (t = t.replace(n, "")), o.exec(t) ? e : (r = o.exec(e), r ? r[1] : e)
            }
            var i = nn(e, n) || nn(r, n),
                a = "#" == i.charAt(0) ? nn(t, i) : this.$$html5 ? i : "";
            if (!w(a)) throw Gr("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', n, t);
            tn(a, this, e), this.$$path = o(this.$$path, a, e), this.$$compose()
        }, this.$$compose = function() {
            var n = G(this.$$search),
                r = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = Zt(this.$$path) + (n ? "?" + n : "") + r, this.$$absUrl = e + (this.$$url ? t + this.$$url : "")
        }, this.$$rewrite = function(t) {
            return rn(e) == rn(t) ? t : n
        }
    }

    function cn(e, t) {
        this.$$html5 = !0, sn.apply(this, arguments);
        var r = on(e);
        this.$$rewrite = function(o) {
            var i;
            return e == rn(o) ? o : (i = nn(r, o)) ? e + t + i : r === o + "/" ? r : n
        }
    }

    function un(e) {
        return function() {
            return this[e]
        }
    }

    function fn(e, t) {
        return function(n) {
            return v(n) ? this[e] : (this[e] = t(n), this.$$compose(), this)
        }
    }

    function dn() {
        var t = "",
            n = !1;
        this.hashPrefix = function(e) {
            return y(e) ? (t = e, this) : t
        }, this.html5Mode = function(e) {
            return y(e) ? (n = e, this) : n
        }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function(r, o, i, a) {
            function l(e) {
                r.$broadcast("$locationChangeSuccess", s.absUrl(), e)
            }
            var s, c, u, f = o.baseHref(),
                d = o.url();
            n ? (u = an(d) + (f || "/"), c = i.history ? ln : cn) : (u = rn(d), c = sn), s = new c(u, "#" + t), s.$$parse(s.$$rewrite(d)), a.on("click", function(t) {
                if (!t.ctrlKey && !t.metaKey && 2 != t.which) {
                    for (var n = dr(t.target);
                        "a" !== ar(n[0].nodeName);)
                        if (n[0] === a[0] || !(n = n.parent())[0]) return;
                    var i = n.prop("href");
                    $(i) && "[object SVGAnimatedString]" == "" + i && (i = Mn(i.animVal).href);
                    var l = s.$$rewrite(i);
                    i && !n.attr("target") && l && !t.isDefaultPrevented() && (t.preventDefault(), l != o.url() && (s.$$parse(l), r.$apply(), e.angular["ff-684208-preventDefault"] = !0))
                }
            }), s.absUrl() != d && o.url(s.absUrl(), !0), o.onUrlChange(function(e) {
                s.absUrl() != e && (r.$evalAsync(function() {
                    var t = s.absUrl();
                    s.$$parse(e), r.$broadcast("$locationChangeStart", e, t).defaultPrevented ? (s.$$parse(t), o.url(t)) : l(t)
                }), r.$$phase || r.$digest())
            });
            var p = 0;
            return r.$watch(function() {
                var e = o.url(),
                    t = s.$$replace;
                return p && e == s.absUrl() || (p++, r.$evalAsync(function() {
                    r.$broadcast("$locationChangeStart", s.absUrl(), e).defaultPrevented ? s.$$parse(e) : (o.url(s.absUrl(), t), l(e))
                })), s.$$replace = !1, p
            }), s
        }]
    }

    function pn() {
        var e = !0,
            t = this;
        this.debugEnabled = function(t) {
            return y(t) ? (e = t, this) : e
        }, this.$get = ["$window", function(n) {
            function r(e) {
                return e instanceof Error && (e.stack ? e = e.message && -1 === e.stack.indexOf(e.message) ? "Error: " + e.message + "\n" + e.stack : e.stack : e.sourceURL && (e = e.message + "\n" + e.sourceURL + ":" + e.line)), e
            }

            function o(e) {
                var t = n.console || {},
                    o = t[e] || t.log || h,
                    a = !1;
                try {
                    a = !!o.apply
                } catch (l) {}
                return a ? function() {
                    var e = [];
                    return i(arguments, function(t) {
                        e.push(r(t))
                    }), o.apply(t, e)
                } : function(e, t) {
                    o(e, null == t ? "" : t)
                }
            }
            return {
                log: o("log"),
                info: o("info"),
                warn: o("warn"),
                error: o("error"),
                debug: function() {
                    var n = o("debug");
                    return function() {
                        e && n.apply(t, arguments)
                    }
                }()
            }
        }]
    }

    function hn(e, t) {
        if ("constructor" === e) throw Kr("isecfld", 'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}', t);
        return e
    }

    function mn(e, t) {
        if (e) {
            if (e.constructor === e) throw Kr("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
            if (e.document && e.location && e.alert && e.setInterval) throw Kr("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", t);
            if (e.children && (e.nodeName || e.on && e.find)) throw Kr("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", t)
        }
        return e
    }

    function gn(e, t, r, o, i) {
        i = i || {};
        for (var a, l = t.split("."), s = 0; l.length > 1; s++) {
            a = hn(l.shift(), o);
            var c = e[a];
            c || (c = {}, e[a] = c), e = c, e.then && i.unwrapPromises && (Xr(o), "$$v" in e || ! function(e) {
                e.then(function(t) {
                    e.$$v = t
                })
            }(e), e.$$v === n && (e.$$v = {}), e = e.$$v)
        }
        return a = hn(l.shift(), o), e[a] = r, r
    }

    function vn(e, t, r, o, i, a, l) {
        return hn(e, a), hn(t, a), hn(r, a), hn(o, a), hn(i, a), l.unwrapPromises ? function(l, s) {
            var c, u = s && s.hasOwnProperty(e) ? s : l;
            return null == u ? u : (u = u[e], u && u.then && (Xr(a), "$$v" in u || (c = u, c.$$v = n, c.then(function(e) {
                c.$$v = e
            })), u = u.$$v), t ? null == u ? n : (u = u[t], u && u.then && (Xr(a), "$$v" in u || (c = u, c.$$v = n, c.then(function(e) {
                c.$$v = e
            })), u = u.$$v), r ? null == u ? n : (u = u[r], u && u.then && (Xr(a), "$$v" in u || (c = u, c.$$v = n, c.then(function(e) {
                c.$$v = e
            })), u = u.$$v), o ? null == u ? n : (u = u[o], u && u.then && (Xr(a), "$$v" in u || (c = u, c.$$v = n, c.then(function(e) {
                c.$$v = e
            })), u = u.$$v), i ? null == u ? n : (u = u[i], u && u.then && (Xr(a), "$$v" in u || (c = u, c.$$v = n, c.then(function(e) {
                c.$$v = e
            })), u = u.$$v), u) : u) : u) : u) : u)
        } : function(a, l) {
            var s = l && l.hasOwnProperty(e) ? l : a;
            return null == s ? s : (s = s[e], t ? null == s ? n : (s = s[t], r ? null == s ? n : (s = s[r], o ? null == s ? n : (s = s[o], i ? null == s ? n : s = s[i] : s) : s) : s) : s)
        }
    }

    function yn(e, t) {
        return hn(e, t),
            function(t, r) {
                return null == t ? n : (r && r.hasOwnProperty(e) ? r : t)[e]
            }
    }

    function $n(e, t, r) {
        return hn(e, r), hn(t, r),
            function(r, o) {
                return null == r ? n : (r = (o && o.hasOwnProperty(e) ? o : r)[e], null == r ? n : r[t])
            }
    }

    function wn(e, t, r) {
        if (no.hasOwnProperty(e)) return no[e];
        var o, a = e.split("."),
            l = a.length;
        if (t.unwrapPromises || 1 !== l)
            if (t.unwrapPromises || 2 !== l)
                if (t.csp) o = 6 > l ? vn(a[0], a[1], a[2], a[3], a[4], r, t) : function(e, o) {
                    var i, s = 0;
                    do i = vn(a[s++], a[s++], a[s++], a[s++], a[s++], r, t)(e, o), o = n, e = i; while (l > s);
                    return i
                };
                else {
                    var s = "var p;\n";
                    i(a, function(e, n) {
                        hn(e, r), s += "if(s == null) return undefined;\ns=" + (n ? "s" : '((k&&k.hasOwnProperty("' + e + '"))?k:s)') + '["' + e + '"]' + ";\n" + (t.unwrapPromises ? 'if (s && s.then) {\n pw("' + r.replace(/(["\r\n])/g, "\\$1") + '");\n' + ' if (!("$$v" in s)) {\n' + " p=s;\n" + " p.$$v = undefined;\n" + " p.then(function(v) {p.$$v=v;});\n" + "}\n" + " s=s.$$v\n" + "}\n" : "")
                    }), s += "return s;";
                    var c = Function("s", "k", "pw", s);
                    c.toString = g(s), o = t.unwrapPromises ? function(e, t) {
                        return c(e, t, Xr)
                    } : c
                } else o = $n(a[0], a[1], r);
        else o = yn(a[0], r);
        return "hasOwnProperty" !== e && (no[e] = o), o
    }

    function bn() {
        var e = {},
            t = {
                csp: !1,
                unwrapPromises: !1,
                logPromiseWarnings: !0
            };
        this.unwrapPromises = function(e) {
            return y(e) ? (t.unwrapPromises = !!e, this) : t.unwrapPromises
        }, this.logPromiseWarnings = function(e) {
            return y(e) ? (t.logPromiseWarnings = e, this) : t.logPromiseWarnings
        }, this.$get = ["$filter", "$sniffer", "$log", function(n, r, o) {
            return t.csp = r.csp, Xr = function(e) {
                    t.logPromiseWarnings && !Jr.hasOwnProperty(e) && (Jr[e] = !0, o.warn("[$parse] Promise found in the expression `" + e + "`. " + "Automatic unwrapping of promises in Angular expressions is deprecated."))
                },
                function(r) {
                    var o;
                    switch (typeof r) {
                        case "string":
                            if (e.hasOwnProperty(r)) return e[r];
                            var i = new eo(t),
                                a = new to(i, n, t);
                            return o = a.parse(r, !1), "hasOwnProperty" !== r && (e[r] = o), o;
                        case "function":
                            return r;
                        default:
                            return h
                    }
                }
        }]
    }

    function xn() {
        this.$get = ["$rootScope", "$exceptionHandler", function(e, t) {
            return Sn(function(t) {
                e.$evalAsync(t)
            }, t)
        }]
    }

    function Sn(e, t) {
        function r(e) {
            return e
        }

        function o(e) {
            return c(e)
        }

        function a(e) {
            var t = l(),
                n = 0,
                r = S(e) ? [] : {};
            return i(e, function(e, o) {
                n++, s(e).then(function(e) {
                    r.hasOwnProperty(o) || (r[o] = e, --n || t.resolve(r))
                }, function(e) {
                    r.hasOwnProperty(o) || t.reject(e)
                })
            }), 0 === n && t.resolve(r), t.promise
        }
        var l = function() {
                var i, a, c = [];
                return a = {
                    resolve: function(t) {
                        if (c) {
                            var r = c;
                            c = n, i = s(t), r.length && e(function() {
                                for (var e, t = 0, n = r.length; n > t; t++) e = r[t], i.then(e[0], e[1], e[2])
                            })
                        }
                    },
                    reject: function(e) {
                        a.resolve(u(e))
                    },
                    notify: function(t) {
                        if (c) {
                            var n = c;
                            c.length && e(function() {
                                for (var e, r = 0, o = n.length; o > r; r++) e = n[r], e[2](t)
                            })
                        }
                    },
                    promise: {
                        then: function(e, n, a) {
                            var s = l(),
                                u = function(n) {
                                    try {
                                        s.resolve((k(e) ? e : r)(n))
                                    } catch (o) {
                                        s.reject(o), t(o)
                                    }
                                },
                                f = function(e) {
                                    try {
                                        s.resolve((k(n) ? n : o)(e))
                                    } catch (r) {
                                        s.reject(r), t(r)
                                    }
                                },
                                d = function(e) {
                                    try {
                                        s.notify((k(a) ? a : r)(e))
                                    } catch (n) {
                                        t(n)
                                    }
                                };
                            return c ? c.push([u, f, d]) : i.then(u, f, d), s.promise
                        },
                        "catch": function(e) {
                            return this.then(null, e)
                        },
                        "finally": function(e) {
                            function t(e, t) {
                                var n = l();
                                return t ? n.resolve(e) : n.reject(e), n.promise
                            }

                            function n(n, o) {
                                var i = null;
                                try {
                                    i = (e || r)()
                                } catch (a) {
                                    return t(a, !1)
                                }
                                return i && k(i.then) ? i.then(function() {
                                    return t(n, o)
                                }, function(e) {
                                    return t(e, !1)
                                }) : t(n, o)
                            }
                            return this.then(function(e) {
                                return n(e, !0)
                            }, function(e) {
                                return n(e, !1)
                            })
                        }
                    }
                }
            },
            s = function(t) {
                return t && k(t.then) ? t : {
                    then: function(n) {
                        var r = l();
                        return e(function() {
                            r.resolve(n(t))
                        }), r.promise
                    }
                }
            },
            c = function(e) {
                var t = l();
                return t.reject(e), t.promise
            },
            u = function(n) {
                return {
                    then: function(r, i) {
                        var a = l();
                        return e(function() {
                            try {
                                a.resolve((k(i) ? i : o)(n))
                            } catch (e) {
                                a.reject(e), t(e)
                            }
                        }), a.promise
                    }
                }
            },
            f = function(n, i, a, u) {
                var f, d = l(),
                    p = function(e) {
                        try {
                            return (k(i) ? i : r)(e)
                        } catch (n) {
                            return t(n), c(n)
                        }
                    },
                    h = function(e) {
                        try {
                            return (k(a) ? a : o)(e)
                        } catch (n) {
                            return t(n), c(n)
                        }
                    },
                    m = function(e) {
                        try {
                            return (k(u) ? u : r)(e)
                        } catch (n) {
                            t(n)
                        }
                    };
                return e(function() {
                    s(n).then(function(e) {
                        f || (f = !0, d.resolve(s(e).then(p, h, m)))
                    }, function(e) {
                        f || (f = !0, d.resolve(h(e)))
                    }, function(e) {
                        f || d.notify(m(e))
                    })
                }), d.promise
            };
        return {
            defer: l,
            reject: c,
            when: f,
            all: a
        }
    }

    function kn() {
        var e = 10,
            t = r("$rootScope"),
            n = null;
        this.digestTtl = function(t) {
            return arguments.length && (e = t), e
        }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function(r, a, l, s) {
            function u() {
                this.$id = c(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this["this"] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$postDigestQueue = [], this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = {}
            }

            function f(e) {
                if (v.$$phase) throw t("inprog", "{0} already in progress", v.$$phase);
                v.$$phase = e
            }

            function d() {
                v.$$phase = null
            }

            function p(e, t) {
                var n = l(e);
                return nt(n, t), n
            }

            function m(e, t, n) {
                do e.$$listenerCount[n] -= t, 0 === e.$$listenerCount[n] && delete e.$$listenerCount[n]; while (e = e.$parent)
            }

            function g() {}
            u.prototype = {
                constructor: u,
                $new: function(e) {
                    var t, n;
                    return e ? (n = new u, n.$root = this.$root, n.$$asyncQueue = this.$$asyncQueue, n.$$postDigestQueue = this.$$postDigestQueue) : (t = function() {}, t.prototype = this, n = new t, n.$id = c()), n["this"] = n, n.$$listeners = {}, n.$$listenerCount = {}, n.$parent = this, n.$$watchers = n.$$nextSibling = n.$$childHead = n.$$childTail = null, n.$$prevSibling = this.$$childTail, this.$$childHead ? (this.$$childTail.$$nextSibling = n, this.$$childTail = n) : this.$$childHead = this.$$childTail = n, n
                },
                $watch: function(e, t, r) {
                    var o = this,
                        i = p(e, "watch"),
                        a = o.$$watchers,
                        l = {
                            fn: t,
                            last: g,
                            get: i,
                            exp: e,
                            eq: !!r
                        };
                    if (n = null, !k(t)) {
                        var s = p(t || h, "listener");
                        l.fn = function(e, t, n) {
                            s(n)
                        }
                    }
                    if ("string" == typeof e && i.constant) {
                        var c = l.fn;
                        l.fn = function(e, t, n) {
                            c.call(this, e, t, n), M(a, l)
                        }
                    }
                    return a || (a = o.$$watchers = []), a.unshift(l),
                        function() {
                            M(a, l), n = null
                        }
                },
                $watchCollection: function(e, t) {
                    function n() {
                        a = u(s);
                        var e, t;
                        if ($(a))
                            if (o(a)) {
                                i !== f && (i = f, p = i.length = 0, c++), e = a.length, p !== e && (c++, i.length = p = e);
                                for (var n = 0; e > n; n++) i[n] !== a[n] && (c++, i[n] = a[n])
                            } else {
                                i !== d && (i = d = {}, p = 0, c++), e = 0;
                                for (t in a) a.hasOwnProperty(t) && (e++, i.hasOwnProperty(t) ? i[t] !== a[t] && (c++, i[t] = a[t]) : (p++, i[t] = a[t], c++));
                                if (p > e) {
                                    c++;
                                    for (t in i) i.hasOwnProperty(t) && !a.hasOwnProperty(t) && (p--, delete i[t])
                                }
                            } else i !== a && (i = a, c++);
                        return c
                    }

                    function r() {
                        t(a, i, s)
                    }
                    var i, a, s = this,
                        c = 0,
                        u = l(e),
                        f = [],
                        d = {},
                        p = 0;
                    return this.$watch(n, r)
                },
                $digest: function() {
                    var r, o, i, l, s, c, u, p, h, m, v, y = this.$$asyncQueue,
                        $ = this.$$postDigestQueue,
                        w = e,
                        b = this,
                        x = [];
                    f("$digest"), n = null;
                    do {
                        for (c = !1, p = b; y.length;) {
                            try {
                                v = y.shift(), v.scope.$eval(v.expression)
                            } catch (S) {
                                d(), a(S)
                            }
                            n = null
                        }
                        e: do {
                            if (l = p.$$watchers)
                                for (s = l.length; s--;) try {
                                    if (r = l[s])
                                        if ((o = r.get(p)) === (i = r.last) || (r.eq ? j(o, i) : "number" == typeof o && "number" == typeof i && isNaN(o) && isNaN(i))) {
                                            if (r === n) {
                                                c = !1;
                                                break e
                                            }
                                        } else c = !0, n = r, r.last = r.eq ? O(o) : o, r.fn(o, i === g ? o : i, p), 5 > w && (h = 4 - w, x[h] || (x[h] = []), m = k(r.exp) ? "fn: " + (r.exp.name || "" + r.exp) : r.exp, m += "; newVal: " + H(o) + "; oldVal: " + H(i), x[h].push(m))
                                } catch (S) {
                                    d(), a(S)
                                }
                            if (!(u = p.$$childHead || p !== b && p.$$nextSibling))
                                for (; p !== b && !(u = p.$$nextSibling);) p = p.$parent
                        } while (p = u);
                        if ((c || y.length) && !w--) throw d(), t("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", e, H(x))
                    } while (c || y.length);
                    for (d(); $.length;) try {
                        $.shift()()
                    } catch (S) {
                        a(S)
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var e = this.$parent;
                        this.$broadcast("$destroy"), this.$$destroyed = !0, this !== v && (i(this.$$listenerCount, R(null, m, this)), e.$$childHead == this && (e.$$childHead = this.$$nextSibling), e.$$childTail == this && (e.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null)
                    }
                },
                $eval: function(e, t) {
                    return l(e)(this, t)
                },
                $evalAsync: function(e) {
                    v.$$phase || v.$$asyncQueue.length || s.defer(function() {
                        v.$$asyncQueue.length && v.$digest()
                    }), this.$$asyncQueue.push({
                        scope: this,
                        expression: e
                    })
                },
                $$postDigest: function(e) {
                    this.$$postDigestQueue.push(e)
                },
                $apply: function(e) {
                    try {
                        return f("$apply"), this.$eval(e)
                    } catch (t) {
                        a(t)
                    } finally {
                        d();
                        try {
                            v.$digest()
                        } catch (t) {
                            throw a(t), t
                        }
                    }
                },
                $on: function(e, t) {
                    var n = this.$$listeners[e];
                    n || (this.$$listeners[e] = n = []), n.push(t);
                    var r = this;
                    do r.$$listenerCount[e] || (r.$$listenerCount[e] = 0), r.$$listenerCount[e] ++; while (r = r.$parent);
                    var o = this;
                    return function() {
                        n[I(n, t)] = null, m(o, 1, e)
                    }
                },
                $emit: function(e) {
                    var t, n, r, o = [],
                        i = this,
                        l = !1,
                        s = {
                            name: e,
                            targetScope: i,
                            stopPropagation: function() {
                                l = !0
                            },
                            preventDefault: function() {
                                s.defaultPrevented = !0
                            },
                            defaultPrevented: !1
                        },
                        c = F([s], arguments, 1);
                    do {
                        for (t = i.$$listeners[e] || o, s.currentScope = i, n = 0, r = t.length; r > n; n++)
                            if (t[n]) try {
                                t[n].apply(null, c)
                            } catch (u) {
                                a(u)
                            } else t.splice(n, 1), n--, r--;
                        if (l) return s;
                        i = i.$parent
                    } while (i);
                    return s
                },
                $broadcast: function(e) {
                    for (var t, n, r, o = this, i = o, l = o, s = {
                            name: e,
                            targetScope: o,
                            preventDefault: function() {
                                s.defaultPrevented = !0
                            },
                            defaultPrevented: !1
                        }, c = F([s], arguments, 1); i = l;) {
                        for (s.currentScope = i, t = i.$$listeners[e] || [], n = 0, r = t.length; r > n; n++)
                            if (t[n]) try {
                                t[n].apply(null, c)
                            } catch (u) {
                                a(u)
                            } else t.splice(n, 1), n--, r--;
                        if (!(l = i.$$listenerCount[e] && i.$$childHead || i !== o && i.$$nextSibling))
                            for (; i !== o && !(l = i.$$nextSibling);) i = i.$parent
                    }
                    return s
                }
            };
            var v = new u;
            return v
        }]
    }

    function Pn() {
        var e = /^\s*(https?|ftp|mailto|tel|file):/,
            t = /^\s*(https?|ftp|file):|data:image\//;
        this.aHrefSanitizationWhitelist = function(t) {
            return y(t) ? (e = t, this) : e
        }, this.imgSrcSanitizationWhitelist = function(e) {
            return y(e) ? (t = e, this) : t
        }, this.$get = function() {
            return function(n, r) {
                var o, i = r ? t : e;
                return fr && !(fr >= 8) || (o = Mn(n).href, "" === o || o.match(i)) ? n : "unsafe:" + o
            }
        }
    }

    function Cn(e) {
        return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    }

    function Tn(e) {
        if ("self" === e) return e;
        if (w(e)) {
            if (e.indexOf("***") > -1) throw ro("iwcard", "Illegal sequence *** in string matcher.  String: {0}", e);
            return e = Cn(e).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), RegExp("^" + e + "$")
        }
        if (P(e)) return RegExp("^" + e.source + "$");
        throw ro("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
    }

    function En(e) {
        var t = [];
        return y(e) && i(e, function(e) {
            t.push(Tn(e))
        }), t
    }

    function An() {
        this.SCE_CONTEXTS = oo;
        var e = ["self"],
            t = [];
        this.resourceUrlWhitelist = function(t) {
            return arguments.length && (e = En(t)), e
        }, this.resourceUrlBlacklist = function(e) {
            return arguments.length && (t = En(e)), t
        }, this.$get = ["$injector", function(r) {
            function o(e, t) {
                return "self" === e ? On(t) : !!e.exec(t.href)
            }

            function i(n) {
                var r, i, a = Mn("" + n),
                    l = !1;
                for (r = 0, i = e.length; i > r; r++)
                    if (o(e[r], a)) {
                        l = !0;
                        break
                    }
                if (l)
                    for (r = 0, i = t.length; i > r; r++)
                        if (o(t[r], a)) {
                            l = !1;
                            break
                        }
                return l
            }

            function a(e) {
                var t = function(e) {
                    this.$$unwrapTrustedValue = function() {
                        return e
                    }
                };
                return e && (t.prototype = new e), t.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue()
                }, t.prototype.toString = function() {
                    return "" + this.$$unwrapTrustedValue()
                }, t
            }

            function l(e, t) {
                var r = d.hasOwnProperty(e) ? d[e] : null;
                if (!r) throw ro("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", e, t);
                if (null === t || t === n || "" === t) return t;
                if ("string" != typeof t) throw ro("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", e);
                return new r(t)
            }

            function s(e) {
                return e instanceof f ? e.$$unwrapTrustedValue() : e
            }

            function c(e, t) {
                if (null === t || t === n || "" === t) return t;
                var r = d.hasOwnProperty(e) ? d[e] : null;
                if (r && t instanceof r) return t.$$unwrapTrustedValue();
                if (e === oo.RESOURCE_URL) {
                    if (i(t)) return t;
                    throw ro("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", "" + t)
                }
                if (e === oo.HTML) return u(t);
                throw ro("unsafe", "Attempting to use an unsafe value in a safe context.")
            }
            var u = function() {
                throw ro("unsafe", "Attempting to use an unsafe value in a safe context.")
            };
            r.has("$sanitize") && (u = r.get("$sanitize"));
            var f = a(),
                d = {};
            return d[oo.HTML] = a(f), d[oo.CSS] = a(f), d[oo.URL] = a(f), d[oo.JS] = a(f), d[oo.RESOURCE_URL] = a(d[oo.URL]), {
                trustAs: l,
                getTrusted: c,
                valueOf: s
            }
        }]
    }

    function Wn() {
        var e = !0;
        this.enabled = function(t) {
            return arguments.length && (e = !!t), e
        }, this.$get = ["$parse", "$sniffer", "$sceDelegate", function(t, n, r) {
            if (e && n.msie && n.msieDocumentMode < 8) throw ro("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            var o = O(oo);
            o.isEnabled = function() {
                return e
            }, o.trustAs = r.trustAs, o.getTrusted = r.getTrusted, o.valueOf = r.valueOf, e || (o.trustAs = o.getTrusted = function(e, t) {
                return t
            }, o.valueOf = m), o.parseAs = function(e, n) {
                var r = t(n);
                return r.literal && r.constant ? r : function(t, n) {
                    return o.getTrusted(e, r(t, n))
                }
            };
            var a = o.parseAs,
                l = o.getTrusted,
                s = o.trustAs;
            return i(oo, function(e, t) {
                var n = ar(t);
                o[ct("parse_as_" + n)] = function(t) {
                    return a(e, t)
                }, o[ct("get_trusted_" + n)] = function(t) {
                    return l(e, t)
                }, o[ct("trust_as_" + n)] = function(t) {
                    return s(e, t)
                }
            }), o
        }]
    }

    function _n() {
        this.$get = ["$window", "$document", function(e, t) {
            var n, r, o = {},
                i = d((/android (\d+)/.exec(ar((e.navigator || {}).userAgent)) || [])[1]),
                a = /Boxee/i.test((e.navigator || {}).userAgent),
                l = t[0] || {},
                s = l.documentMode,
                c = /^(Moz|webkit|O|ms)(?=[A-Z])/,
                u = l.body && l.body.style,
                f = !1,
                p = !1;
            if (u) {
                for (var h in u)
                    if (r = c.exec(h)) {
                        n = r[0], n = n.substr(0, 1).toUpperCase() + n.substr(1);
                        break
                    }
                n || (n = "WebkitOpacity" in u && "webkit"), f = !!("transition" in u || n + "Transition" in u), p = !!("animation" in u || n + "Animation" in u), !i || f && p || (f = w(l.body.style.webkitTransition), p = w(l.body.style.webkitAnimation))
            }
            return {
                history: !(!e.history || !e.history.pushState || 4 > i || a),
                hashchange: "onhashchange" in e && (!s || s > 7),
                hasEvent: function(e) {
                    if ("input" == e && 9 == fr) return !1;
                    if (v(o[e])) {
                        var t = l.createElement("div");
                        o[e] = "on" + e in t
                    }
                    return o[e]
                },
                csp: U(),
                vendorPrefix: n,
                transitions: f,
                animations: p,
                android: i,
                msie: fr,
                msieDocumentMode: s
            }
        }]
    }

    function In() {
        this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function(e, t, n, r) {
            function o(o, a, l) {
                var s, c = n.defer(),
                    u = c.promise,
                    f = y(l) && !l;
                return s = t.defer(function() {
                    try {
                        c.resolve(o())
                    } catch (t) {
                        c.reject(t), r(t)
                    } finally {
                        delete i[u.$$timeoutId]
                    }
                    f || e.$apply()
                }, a), u.$$timeoutId = s, i[s] = c, u
            }
            var i = {};
            return o.cancel = function(e) {
                return e && e.$$timeoutId in i ? (i[e.$$timeoutId].reject("canceled"), delete i[e.$$timeoutId], t.defer.cancel(e.$$timeoutId)) : !1
            }, o
        }]
    }

    function Mn(e) {
        var t = e;
        return fr && (io.setAttribute("href", t), t = io.href), io.setAttribute("href", t), {
            href: io.href,
            protocol: io.protocol ? io.protocol.replace(/:$/, "") : "",
            host: io.host,
            search: io.search ? io.search.replace(/^\?/, "") : "",
            hash: io.hash ? io.hash.replace(/^#/, "") : "",
            hostname: io.hostname,
            port: io.port,
            pathname: "/" === io.pathname.charAt(0) ? io.pathname : "/" + io.pathname
        }
    }

    function On(e) {
        var t = w(e) ? Mn(e) : e;
        return t.protocol === ao.protocol && t.host === ao.host
    }

    function Dn() {
        this.$get = g(e)
    }

    function jn(e) {
        function t(r, o) {
            if ($(r)) {
                var a = {};
                return i(r, function(e, n) {
                    a[n] = t(n, e)
                }), a
            }
            return e.factory(r + n, o)
        }
        var n = "Filter";
        this.register = t, this.$get = ["$injector", function(e) {
            return function(t) {
                return e.get(t + n)
            }
        }], t("currency", Fn), t("date", zn), t("filter", Un), t("json", Qn), t("limitTo", Gn), t("lowercase", fo), t("number", Ln), t("orderBy", Xn), t("uppercase", po)
    }

    function Un() {
        return function(e, t, r) {
            if (!S(e)) return e;
            var o = typeof r,
                i = [];
            i.check = function(e) {
                for (var t = 0; t < i.length; t++)
                    if (!i[t](e)) return !1;
                return !0
            }, "function" !== o && (r = "boolean" === o && r ? function(e, t) {
                return wr.equals(e, t)
            } : function(e, t) {
                if (e && t && "object" == typeof e && "object" == typeof t) {
                    for (var n in e)
                        if ("$" !== n.charAt(0) && lr.call(e, n) && r(e[n], t[n])) return !0;
                    return !1
                }
                return t = ("" + t).toLowerCase(), ("" + e).toLowerCase().indexOf(t) > -1
            });
            var a = function(e, t) {
                if ("string" == typeof t && "!" === t.charAt(0)) return !a(e, t.substr(1));
                switch (typeof e) {
                    case "boolean":
                    case "number":
                    case "string":
                        return r(e, t);
                    case "object":
                        switch (typeof t) {
                            case "object":
                                return r(e, t);
                            default:
                                for (var n in e)
                                    if ("$" !== n.charAt(0) && a(e[n], t)) return !0
                        }
                        return !1;
                    case "array":
                        for (var o = 0; o < e.length; o++)
                            if (a(e[o], t)) return !0;
                        return !1;
                    default:
                        return !1
                }
            };
            switch (typeof t) {
                case "boolean":
                case "number":
                case "string":
                    t = {
                        $: t
                    };
                case "object":
                    for (var l in t) ! function(e) {
                        n !== t[e] && i.push(function(n) {
                            return a("$" == e ? n : n && n[e], t[e])
                        })
                    }(l);
                    break;
                case "function":
                    i.push(t);
                    break;
                default:
                    return e
            }
            for (var s = [], c = 0; c < e.length; c++) {
                var u = e[c];
                i.check(u) && s.push(u)
            }
            return s
        }
    }

    function Fn(e) {
        var t = e.NUMBER_FORMATS;
        return function(e, n) {
            return v(n) && (n = t.CURRENCY_SYM), Rn(e, t.PATTERNS[1], t.GROUP_SEP, t.DECIMAL_SEP, 2).replace(/\u00A4/g, n)
        }
    }

    function Ln(e) {
        var t = e.NUMBER_FORMATS;
        return function(e, n) {
            return Rn(e, t.PATTERNS[0], t.GROUP_SEP, t.DECIMAL_SEP, n)
        }
    }

    function Rn(e, t, n, r, o) {
        if (isNaN(e) || !isFinite(e)) return "";
        var i = 0 > e;
        e = Math.abs(e);
        var a = e + "",
            l = "",
            s = [],
            c = !1;
        if (-1 !== a.indexOf("e")) {
            var u = a.match(/([\d\.]+)e(-?)(\d+)/);
            u && "-" == u[2] && u[3] > o + 1 ? a = "0" : (l = a, c = !0)
        }
        if (c) o > 0 && e > -1 && 1 > e && (l = e.toFixed(o));
        else {
            var f = (a.split(lo)[1] || "").length;
            v(o) && (o = Math.min(Math.max(t.minFrac, f), t.maxFrac));
            var d = Math.pow(10, o);
            e = Math.round(e * d) / d;
            var p = ("" + e).split(lo),
                h = p[0];
            p = p[1] || "";
            var m, g = 0,
                y = t.lgSize,
                $ = t.gSize;
            if (h.length >= y + $)
                for (g = h.length - y, m = 0; g > m; m++) 0 === (g - m) % $ && 0 !== m && (l += n), l += h.charAt(m);
            for (m = g; m < h.length; m++) 0 === (h.length - m) % y && 0 !== m && (l += n), l += h.charAt(m);
            for (; p.length < o;) p += "0";
            o && "0" !== o && (l += r + p.substr(0, o))
        }
        return s.push(i ? t.negPre : t.posPre), s.push(l), s.push(i ? t.negSuf : t.posSuf), s.join("")
    }

    function Nn(e, t, n) {
        var r = "";
        for (0 > e && (r = "-", e = -e), e = "" + e; e.length < t;) e = "0" + e;
        return n && (e = e.substr(e.length - t)), r + e
    }

    function Hn(e, t, n, r) {
        return n = n || 0,
            function(o) {
                var i = o["get" + e]();
                return (n > 0 || i > -n) && (i += n), 0 === i && -12 == n && (i = 12), Nn(i, t, r)
            }
    }

    function qn(e, t) {
        return function(n, r) {
            var o = n["get" + e](),
                i = sr(t ? "SHORT" + e : e);
            return r[i][o]
        }
    }

    function Bn(e) {
        var t = -1 * e.getTimezoneOffset(),
            n = t >= 0 ? "+" : "";
        return n += Nn(Math[t > 0 ? "floor" : "ceil"](t / 60), 2) + Nn(Math.abs(t % 60), 2)
    }

    function Vn(e, t) {
        return e.getHours() < 12 ? t.AMPMS[0] : t.AMPMS[1]
    }

    function zn(e) {
        function t(e) {
            var t;
            if (t = e.match(n)) {
                var r = new Date(0),
                    o = 0,
                    i = 0,
                    a = t[8] ? r.setUTCFullYear : r.setFullYear,
                    l = t[8] ? r.setUTCHours : r.setHours;
                t[9] && (o = d(t[9] + t[10]), i = d(t[9] + t[11])), a.call(r, d(t[1]), d(t[2]) - 1, d(t[3]));
                var s = d(t[4] || 0) - o,
                    c = d(t[5] || 0) - i,
                    u = d(t[6] || 0),
                    f = Math.round(1e3 * parseFloat("0." + (t[7] || 0)));
                return l.call(r, s, c, u, f), r
            }
            return e
        }
        var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(n, r) {
            var o, a, l = "",
                s = [];
            if (r = r || "mediumDate", r = e.DATETIME_FORMATS[r] || r, w(n) && (n = uo.test(n) ? d(n) : t(n)), b(n) && (n = new Date(n)), !x(n)) return n;
            for (; r;) a = co.exec(r), a ? (s = F(s, a, 1), r = s.pop()) : (s.push(r), r = null);
            return i(s, function(t) {
                o = so[t], l += o ? o(n, e.DATETIME_FORMATS) : t.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), l
        }
    }

    function Qn() {
        return function(e) {
            return H(e, !0)
        }
    }

    function Gn() {
        return function(e, t) {
            if (!S(e) && !w(e)) return e;
            if (t = d(t), w(e)) return t ? t >= 0 ? e.slice(0, t) : e.slice(t, e.length) : "";
            var n, r, o = [];
            for (t > e.length ? t = e.length : t < -e.length && (t = -e.length), t > 0 ? (n = 0, r = t) : (n = e.length + t, r = e.length); r > n; n++) o.push(e[n]);
            return o
        }
    }

    function Xn(e) {
        return function(t, n, r) {
            function o(e, t) {
                for (var r = 0; r < n.length; r++) {
                    var o = n[r](e, t);
                    if (0 !== o) return o
                }
                return 0
            }

            function i(e, t) {
                return B(t) ? function(t, n) {
                    return e(n, t)
                } : e
            }

            function a(e, t) {
                var n = typeof e,
                    r = typeof t;
                return n == r ? ("string" == n && (e = e.toLowerCase(), t = t.toLowerCase()), e === t ? 0 : t > e ? -1 : 1) : r > n ? -1 : 1
            }
            if (!S(t)) return t;
            if (!n) return t;
            n = S(n) ? n : [n], n = W(n, function(t) {
                var n = !1,
                    r = t || m;
                return w(t) && (("+" == t.charAt(0) || "-" == t.charAt(0)) && (n = "-" == t.charAt(0), t = t.substring(1)), r = e(t)), i(function(e, t) {
                    return a(r(e), r(t))
                }, n)
            });
            for (var l = [], s = 0; s < t.length; s++) l.push(t[s]);
            return l.sort(i(o, r))
        }
    }

    function Kn(e) {
        return k(e) && (e = {
            link: e
        }), e.restrict = e.restrict || "AC", g(e)
    }

    function Jn(e, t) {
        function n(t, n) {
            n = n ? "-" + Z(n, "-") : "", e.removeClass((t ? Co : Po) + n).addClass((t ? Po : Co) + n)
        }
        var r = this,
            o = e.parent().controller("form") || go,
            a = 0,
            l = r.$error = {},
            s = [];
        r.$name = t.name || t.ngForm, r.$dirty = !1, r.$pristine = !0, r.$valid = !0, r.$invalid = !1, o.$addControl(r), e.addClass(To), n(!0), r.$addControl = function(e) {
            rt(e.$name, "input"), s.push(e), e.$name && (r[e.$name] = e)
        }, r.$removeControl = function(e) {
            e.$name && r[e.$name] === e && delete r[e.$name], i(l, function(t, n) {
                r.$setValidity(n, !0, e)
            }), M(s, e)
        }, r.$setValidity = function(e, t, i) {
            var s = l[e];
            if (t) s && (M(s, i), s.length || (a--, a || (n(t), r.$valid = !0, r.$invalid = !1), l[e] = !1, n(!0, e), o.$setValidity(e, !0, r)));
            else {
                if (a || n(t), s) {
                    if (_(s, i)) return
                } else l[e] = s = [], a++, n(!1, e), o.$setValidity(e, !1, r);
                s.push(i), r.$valid = !1, r.$invalid = !0
            }
        }, r.$setDirty = function() {
            e.removeClass(To).addClass(Eo), r.$dirty = !0, r.$pristine = !1, o.$setDirty()
        }, r.$setPristine = function() {
            e.removeClass(Eo).addClass(To), r.$dirty = !1, r.$pristine = !0, i(s, function(e) {
                e.$setPristine()
            })
        }
    }

    function Yn(e, t, r, o) {
        return e.$setValidity(t, r), r ? o : n
    }

    function Zn(e, t, n, o, i, a) {
        if (!i.android) {
            var l = !1;
            t.on("compositionstart", function() {
                l = !0
            }), t.on("compositionend", function() {
                l = !1, s()
            })
        }
        var s = function() {
            if (!l) {
                var r = t.val();
                B(n.ngTrim || "T") && (r = xr(r)), o.$viewValue !== r && (e.$$phase ? o.$setViewValue(r) : e.$apply(function() {
                    o.$setViewValue(r)
                }))
            }
        };
        if (i.hasEvent("input")) t.on("input", s);
        else {
            var c, u = function() {
                c || (c = a.defer(function() {
                    s(), c = null
                }))
            };
            t.on("keydown", function(e) {
                var t = e.keyCode;
                91 === t || t > 15 && 19 > t || t >= 37 && 40 >= t || u()
            }), i.hasEvent("paste") && t.on("paste cut", u)
        }
        t.on("change", s), o.$render = function() {
            t.val(o.$isEmpty(o.$viewValue) ? "" : o.$viewValue)
        };
        var f, p, h = n.ngPattern;
        if (h) {
            var m = function(e, t) {
                return Yn(o, "pattern", o.$isEmpty(t) || e.test(t), t)
            };
            p = h.match(/^\/(.*)\/([gim]*)$/), p ? (h = RegExp(p[1], p[2]), f = function(e) {
                return m(h, e)
            }) : f = function(n) {
                var o = e.$eval(h);
                if (!o || !o.test) throw r("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", h, o, V(t));
                return m(o, n)
            }, o.$formatters.push(f), o.$parsers.push(f)
        }
        if (n.ngMinlength) {
            var g = d(n.ngMinlength),
                v = function(e) {
                    return Yn(o, "minlength", o.$isEmpty(e) || e.length >= g, e)
                };
            o.$parsers.push(v), o.$formatters.push(v)
        }
        if (n.ngMaxlength) {
            var y = d(n.ngMaxlength),
                $ = function(e) {
                    return Yn(o, "maxlength", o.$isEmpty(e) || e.length <= y, e)
                };
            o.$parsers.push($), o.$formatters.push($)
        }
    }

    function er(e, t, r, o, i, a) {
        if (Zn(e, t, r, o, i, a), o.$parsers.push(function(e) {
                var t = o.$isEmpty(e);
                return t || xo.test(e) ? (o.$setValidity("number", !0), "" === e ? null : t ? e : parseFloat(e)) : (o.$setValidity("number", !1), n)
            }), o.$formatters.push(function(e) {
                return o.$isEmpty(e) ? "" : "" + e
            }), r.min) {
            var l = function(e) {
                var t = parseFloat(r.min);
                return Yn(o, "min", o.$isEmpty(e) || e >= t, e)
            };
            o.$parsers.push(l), o.$formatters.push(l)
        }
        if (r.max) {
            var s = function(e) {
                var t = parseFloat(r.max);
                return Yn(o, "max", o.$isEmpty(e) || t >= e, e)
            };
            o.$parsers.push(s), o.$formatters.push(s)
        }
        o.$formatters.push(function(e) {
            return Yn(o, "number", o.$isEmpty(e) || b(e), e)
        })
    }

    function tr(e, t, n, r, o, i) {
        Zn(e, t, n, r, o, i);
        var a = function(e) {
            return Yn(r, "url", r.$isEmpty(e) || wo.test(e), e)
        };
        r.$formatters.push(a), r.$parsers.push(a)
    }

    function nr(e, t, n, r, o, i) {
        Zn(e, t, n, r, o, i);
        var a = function(e) {
            return Yn(r, "email", r.$isEmpty(e) || bo.test(e), e)
        };
        r.$formatters.push(a), r.$parsers.push(a)
    }

    function rr(e, t, n, r) {
        v(n.name) && t.attr("name", c()), t.on("click", function() {
            t[0].checked && e.$apply(function() {
                r.$setViewValue(n.value)
            })
        }), r.$render = function() {
            var e = n.value;
            t[0].checked = e == r.$viewValue
        }, n.$observe("value", r.$render)
    }

    function or(e, t, n, r) {
        var o = n.ngTrueValue,
            i = n.ngFalseValue;
        w(o) || (o = !0), w(i) || (i = !1), t.on("click", function() {
            e.$apply(function() {
                r.$setViewValue(t[0].checked)
            })
        }), r.$render = function() {
            t[0].checked = r.$viewValue
        }, r.$isEmpty = function(e) {
            return e !== o
        }, r.$formatters.push(function(e) {
            return e === o
        }), r.$parsers.push(function(e) {
            return e ? o : i
        })
    }

    function ir(e, t) {
        return e = "ngClass" + e,
            function() {
                return {
                    restrict: "AC",
                    link: function(n, r, o) {
                        function a(e) {
                            if (t === !0 || n.$index % 2 === t) {
                                var r = l(e || "");
                                s ? j(e, s) || o.$updateClass(r, l(s)) : o.$addClass(r)
                            }
                            s = O(e)
                        }

                        function l(e) {
                            if (S(e)) return e.join(" ");
                            if ($(e)) {
                                var t = [];
                                return i(e, function(e, n) {
                                    e && t.push(n)
                                }), t.join(" ")
                            }
                            return e
                        }
                        var s;
                        n.$watch(o[e], a, !0), o.$observe("class", function() {
                            a(n.$eval(o[e]))
                        }), "ngClass" !== e && n.$watch("$index", function(r, i) {
                            var a = 1 & r;
                            if (1 & a !== i) {
                                var s = l(n.$eval(o[e]));
                                a === t ? o.$addClass(s) : o.$removeClass(s)
                            }
                        })
                    }
                }
            }
    }
    var ar = function(e) {
            return w(e) ? e.toLowerCase() : e
        },
        lr = Object.prototype.hasOwnProperty,
        sr = function(e) {
            return w(e) ? e.toUpperCase() : e
        },
        cr = function(e) {
            return w(e) ? e.replace(/[A-Z]/g, function(e) {
                return String.fromCharCode(32 | e.charCodeAt(0))
            }) : e
        },
        ur = function(e) {
            return w(e) ? e.replace(/[a-z]/g, function(e) {
                return String.fromCharCode(-33 & e.charCodeAt(0))
            }) : e
        };
    "i" !== "I".toLowerCase() && (ar = cr, sr = ur);
    var fr, dr, pr, hr, mr, gr = [].slice,
        vr = [].push,
        yr = Object.prototype.toString,
        $r = r("ng"),
        wr = (e.angular, e.angular || (e.angular = {})),
        br = ["0", "0", "0"];
    fr = d((/msie (\d+)/.exec(ar(navigator.userAgent)) || [])[1]), isNaN(fr) && (fr = d((/trident\/.*; rv:(\d+)/.exec(ar(navigator.userAgent)) || [])[1])), h.$inject = [], m.$inject = [];
    var xr = function() {
        return String.prototype.trim ? function(e) {
            return w(e) ? e.trim() : e
        } : function(e) {
            return w(e) ? e.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : e
        }
    }();
    mr = 9 > fr ? function(e) {
        return e = e.nodeName ? e : e[0], e.scopeName && "HTML" != e.scopeName ? sr(e.scopeName + ":" + e.nodeName) : e.nodeName
    } : function(e) {
        return e.nodeName ? e.nodeName : e[0].nodeName
    };
    var Sr = /[A-Z]/g,
        kr = {
            full: "1.2.13",
            major: 1,
            minor: 2,
            dot: 13,
            codeName: "romantic-transclusion"
        },
        Pr = ft.cache = {},
        Cr = ft.expando = "ng-" + (new Date).getTime(),
        Tr = 1,
        Er = e.document.addEventListener ? function(e, t, n) {
            e.addEventListener(t, n, !1)
        } : function(e, t, n) {
            e.attachEvent("on" + t, n)
        },
        Ar = e.document.removeEventListener ? function(e, t, n) {
            e.removeEventListener(t, n, !1)
        } : function(e, t, n) {
            e.detachEvent("on" + t, n)
        };
    ft._data = function(e) {
        return this.cache[e[this.expando]] || {}
    };
    var Wr = /([\:\-\_]+(.))/g,
        _r = /^moz([A-Z])/,
        Ir = r("jqLite"),
        Mr = ft.prototype = {
            ready: function(n) {
                function r() {
                    o || (o = !0, n())
                }
                var o = !1;
                "complete" === t.readyState ? setTimeout(r) : (this.on("DOMContentLoaded", r), ft(e).on("load", r))
            },
            toString: function() {
                var e = [];
                return i(this, function(t) {
                    e.push("" + t)
                }), "[" + e.join(", ") + "]"
            },
            eq: function(e) {
                return e >= 0 ? dr(this[e]) : dr(this[this.length + e])
            },
            length: 0,
            push: vr,
            sort: [].sort,
            splice: [].splice
        },
        Or = {};
    i("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(e) {
        Or[ar(e)] = e
    });
    var Dr = {};
    i("input,select,option,textarea,button,form,details".split(","), function(e) {
        Dr[sr(e)] = !0
    }), i({
        data: vt,
        inheritedData: St,
        scope: function(e) {
            return dr(e).data("$scope") || St(e.parentNode || e, ["$isolateScope", "$scope"])
        },
        isolateScope: function(e) {
            return dr(e).data("$isolateScope") || dr(e).data("$isolateScopeNoTemplate")
        },
        controller: xt,
        injector: function(e) {
            return St(e, "$injector")
        },
        removeAttr: function(e, t) {
            e.removeAttribute(t)
        },
        hasClass: yt,
        css: function(e, t, r) {
            if (t = ct(t), !y(r)) {
                var o;
                return 8 >= fr && (o = e.currentStyle && e.currentStyle[t], "" === o && (o = "auto")), o = o || e.style[t], 8 >= fr && (o = "" === o ? n : o), o
            }
            e.style[t] = r
        },
        attr: function(e, t, r) {
            var o = ar(t);
            if (Or[o]) {
                if (!y(r)) return e[t] || (e.attributes.getNamedItem(t) || h).specified ? o : n;
                r ? (e[t] = !0, e.setAttribute(t, o)) : (e[t] = !1, e.removeAttribute(o))
            } else if (y(r)) e.setAttribute(t, r);
            else if (e.getAttribute) {
                var i = e.getAttribute(t, 2);
                return null === i ? n : i
            }
        },
        prop: function(e, t, r) {
            return y(r) ? (e[t] = r, n) : e[t]
        },
        text: function() {
            function e(e, r) {
                var o = t[e.nodeType];
                return v(r) ? o ? e[o] : "" : (e[o] = r, n)
            }
            var t = [];
            return 9 > fr ? (t[1] = "innerText", t[3] = "nodeValue") : t[1] = t[3] = "textContent", e.$dv = "", e
        }(),
        val: function(e, t) {
            if (v(t)) {
                if ("SELECT" === mr(e) && e.multiple) {
                    var n = [];
                    return i(e.options, function(e) {
                        e.selected && n.push(e.value || e.text)
                    }), 0 === n.length ? null : n
                }
                return e.value
            }
            e.value = t
        },
        html: function(e, t) {
            if (v(t)) return e.innerHTML;
            for (var n = 0, r = e.childNodes; n < r.length; n++) pt(r[n]);
            e.innerHTML = t
        },
        empty: kt
    }, function(e, t) {
        ft.prototype[t] = function(t, r) {
            var o, i;
            if (e !== kt && (2 == e.length && e !== yt && e !== xt ? t : r) === n) {
                if ($(t)) {
                    for (o = 0; o < this.length; o++)
                        if (e === vt) e(this[o], t);
                        else
                            for (i in t) e(this[o], i, t[i]);
                    return this
                }
                for (var a = e.$dv, l = a === n ? Math.min(this.length, 1) : this.length, s = 0; l > s; s++) {
                    var c = e(this[s], t, r);
                    a = a ? a + c : c
                }
                return a
            }
            for (o = 0; o < this.length; o++) e(this[o], t, r);
            return this
        }
    }), i({
        removeData: mt,
        dealoc: pt,
        on: function fi(e, n, r, o) {
            if (y(o)) throw Ir("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            var a = gt(e, "events"),
                l = gt(e, "handle");
            a || gt(e, "events", a = {}), l || gt(e, "handle", l = Ct(e, a)), i(n.split(" "), function(n) {
                var o = a[n];
                if (!o) {
                    if ("mouseenter" == n || "mouseleave" == n) {
                        var i = t.body.contains || t.body.compareDocumentPosition ? function(e, t) {
                            var n = 9 === e.nodeType ? e.documentElement : e,
                                r = t && t.parentNode;
                            return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                        } : function(e, t) {
                            if (t)
                                for (; t = t.parentNode;)
                                    if (t === e) return !0;
                            return !1
                        };
                        a[n] = [];
                        var s = {
                            mouseleave: "mouseout",
                            mouseenter: "mouseover"
                        };
                        fi(e, s[n], function(e) {
                            var t = this,
                                r = e.relatedTarget;
                            (!r || r !== t && !i(t, r)) && l(e, n)
                        })
                    } else Er(e, n, l), a[n] = [];
                    o = a[n]
                }
                o.push(r)
            })
        },
        off: ht,
        one: function(e, t, n) {
            e = dr(e), e.on(t, function r() {
                e.off(t, n), e.off(t, r)
            }), e.on(t, n)
        },
        replaceWith: function(e, t) {
            var n, r = e.parentNode;
            pt(e), i(new ft(t), function(t) {
                n ? r.insertBefore(t, n.nextSibling) : r.replaceChild(t, e), n = t
            })
        },
        children: function(e) {
            var t = [];
            return i(e.childNodes, function(e) {
                1 === e.nodeType && t.push(e)
            }), t
        },
        contents: function(e) {
            return e.childNodes || []
        },
        append: function(e, t) {
            i(new ft(t), function(t) {
                (1 === e.nodeType || 11 === e.nodeType) && e.appendChild(t)
            })
        },
        prepend: function(e, t) {
            if (1 === e.nodeType) {
                var n = e.firstChild;
                i(new ft(t), function(t) {
                    e.insertBefore(t, n)
                })
            }
        },
        wrap: function(e, t) {
            t = dr(t)[0];
            var n = e.parentNode;
            n && n.replaceChild(t, e), t.appendChild(e)
        },
        remove: function(e) {
            pt(e);
            var t = e.parentNode;
            t && t.removeChild(e)
        },
        after: function(e, t) {
            var n = e,
                r = e.parentNode;
            i(new ft(t), function(e) {
                r.insertBefore(e, n.nextSibling), n = e
            })
        },
        addClass: wt,
        removeClass: $t,
        toggleClass: function(e, t, n) {
            v(n) && (n = !yt(e, t)), (n ? wt : $t)(e, t)
        },
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        next: function(e) {
            if (e.nextElementSibling) return e.nextElementSibling;
            for (var t = e.nextSibling; null != t && 1 !== t.nodeType;) t = t.nextSibling;
            return t
        },
        find: function(e, t) {
            return e.getElementsByTagName ? e.getElementsByTagName(t) : []
        },
        clone: dt,
        triggerHandler: function(e, t, n) {
            var r = (gt(e, "events") || {})[t];
            n = n || [];
            var o = [{
                preventDefault: h,
                stopPropagation: h
            }];
            i(r, function(t) {
                t.apply(e, o.concat(n))
            })
        }
    }, function(e, t) {
        ft.prototype[t] = function(t, n, r) {
            for (var o, i = 0; i < this.length; i++) v(o) ? (o = e(this[i], t, n, r), y(o) && (o = dr(o))) : bt(o, e(this[i], t, n, r));
            return y(o) ? o : this
        }, ft.prototype.bind = ft.prototype.on, ft.prototype.unbind = ft.prototype.off
    }), Et.prototype = {
        put: function(e, t) {
            this[Tt(e)] = t
        },
        get: function(e) {
            return this[Tt(e)]
        },
        remove: function(e) {
            var t = this[e = Tt(e)];
            return delete this[e], t
        }
    };
    var jr = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
        Ur = /,/,
        Fr = /^\s*(_?)(\S+?)\1\s*$/,
        Lr = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
        Rr = r("$injector"),
        Nr = r("$animate"),
        Hr = ["$provide", function(e) {
            this.$$selectors = {}, this.register = function(t, n) {
                var r = t + "-animation";
                if (t && "." != t.charAt(0)) throw Nr("notcsel", "Expecting class selector starting with '.' got '{0}'.", t);
                this.$$selectors[t.substr(1)] = r, e.factory(r, n)
            }, this.classNameFilter = function(e) {
                return 1 === arguments.length && (this.$$classNameFilter = e instanceof RegExp ? e : null), this.$$classNameFilter
            }, this.$get = ["$timeout", function(e) {
                return {
                    enter: function(t, n, r, o) {
                        r ? r.after(t) : (n && n[0] || (n = r.parent()), n.append(t)), o && e(o, 0, !1)
                    },
                    leave: function(t, n) {
                        t.remove(), n && e(n, 0, !1)
                    },
                    move: function(e, t, n, r) {
                        this.enter(e, t, n, r)
                    },
                    addClass: function(t, n, r) {
                        n = w(n) ? n : S(n) ? n.join(" ") : "", i(t, function(e) {
                            wt(e, n)
                        }), r && e(r, 0, !1)
                    },
                    removeClass: function(t, n, r) {
                        n = w(n) ? n : S(n) ? n.join(" ") : "", i(t, function(e) {
                            $t(e, n)
                        }), r && e(r, 0, !1)
                    },
                    setClass: function(t, n, r, o) {
                        i(t, function(e) {
                            wt(e, n), $t(e, r)
                        }), o && e(o, 0, !1)
                    },
                    enabled: h
                }
            }]
        }],
        qr = r("$compile");
    jt.$inject = ["$provide", "$$sanitizeUriProvider"];
    var Br = /^(x[\:\-_]|data[\:\-_])/i,
        Vr = r("$interpolate"),
        zr = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
        Qr = {
            http: 80,
            https: 443,
            ftp: 21
        },
        Gr = r("$location");
    cn.prototype = sn.prototype = ln.prototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: un("$$absUrl"),
        url: function(e, t) {
            if (v(e)) return this.$$url;
            var n = zr.exec(e);
            return n[1] && this.path(decodeURIComponent(n[1])), (n[2] || n[1]) && this.search(n[3] || ""), this.hash(n[5] || "", t), this
        },
        protocol: un("$$protocol"),
        host: un("$$host"),
        port: un("$$port"),
        path: fn("$$path", function(e) {
            return "/" == e.charAt(0) ? e : "/" + e
        }),
        search: function(e, t) {
            switch (arguments.length) {
                case 0:
                    return this.$$search;
                case 1:
                    if (w(e)) this.$$search = Q(e);
                    else {
                        if (!$(e)) throw Gr("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                        this.$$search = e
                    }
                    break;
                default:
                    v(t) || null === t ? delete this.$$search[e] : this.$$search[e] = t
            }
            return this.$$compose(), this
        },
        hash: fn("$$hash", m),
        replace: function() {
            return this.$$replace = !0, this
        }
    };
    var Xr, Kr = r("$parse"),
        Jr = {},
        Yr = {
            "null": function() {
                return null
            },
            "true": function() {
                return !0
            },
            "false": function() {
                return !1
            },
            undefined: h,
            "+": function(e, t, r, o) {
                return r = r(e, t), o = o(e, t), y(r) ? y(o) ? r + o : r : y(o) ? o : n
            },
            "-": function(e, t, n, r) {
                return n = n(e, t), r = r(e, t), (y(n) ? n : 0) - (y(r) ? r : 0)
            },
            "*": function(e, t, n, r) {
                return n(e, t) * r(e, t)
            },
            "/": function(e, t, n, r) {
                return n(e, t) / r(e, t)
            },
            "%": function(e, t, n, r) {
                return n(e, t) % r(e, t)
            },
            "^": function(e, t, n, r) {
                return n(e, t) ^ r(e, t)
            },
            "=": h,
            "===": function(e, t, n, r) {
                return n(e, t) === r(e, t)
            },
            "!==": function(e, t, n, r) {
                return n(e, t) !== r(e, t)
            },
            "==": function(e, t, n, r) {
                return n(e, t) == r(e, t)
            },
            "!=": function(e, t, n, r) {
                return n(e, t) != r(e, t)
            },
            "<": function(e, t, n, r) {
                return n(e, t) < r(e, t)
            },
            ">": function(e, t, n, r) {
                return n(e, t) > r(e, t)
            },
            "<=": function(e, t, n, r) {
                return n(e, t) <= r(e, t)
            },
            ">=": function(e, t, n, r) {
                return n(e, t) >= r(e, t)
            },
            "&&": function(e, t, n, r) {
                return n(e, t) && r(e, t)
            },
            "||": function(e, t, n, r) {
                return n(e, t) || r(e, t)
            },
            "&": function(e, t, n, r) {
                return n(e, t) & r(e, t)
            },
            "|": function(e, t, n, r) {
                return r(e, t)(e, t, n(e, t))
            },
            "!": function(e, t, n) {
                return !n(e, t)
            }
        },
        Zr = {
            n: "\n",
            f: "\f",
            r: "\r",
            t: "  ",
            v: "",
            "'": "'",
            '"': '"'
        },
        eo = function(e) {
            this.options = e
        };
    eo.prototype = {
        constructor: eo,
        lex: function(e) {
            this.text = e, this.index = 0, this.ch = n, this.lastCh = ":", this.tokens = [];
            for (var t, r = []; this.index < this.text.length;) {
                if (this.ch = this.text.charAt(this.index), this.is("\"'")) this.readString(this.ch);
                else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber();
                else if (this.isIdent(this.ch)) this.readIdent(), this.was("{,") && "{" === r[0] && (t = this.tokens[this.tokens.length - 1]) && (t.json = -1 === t.text.indexOf("."));
                else if (this.is("(){}[].,;:?")) this.tokens.push({
                    index: this.index,
                    text: this.ch,
                    json: this.was(":[,") && this.is("{[") || this.is("}]:,")
                }), this.is("{[") && r.unshift(this.ch), this.is("}]") && r.shift(), this.index++;
                else {
                    if (this.isWhitespace(this.ch)) {
                        this.index++;
                        continue
                    }
                    var o = this.ch + this.peek(),
                        i = o + this.peek(2),
                        a = Yr[this.ch],
                        l = Yr[o],
                        s = Yr[i];
                    s ? (this.tokens.push({
                        index: this.index,
                        text: i,
                        fn: s
                    }), this.index += 3) : l ? (this.tokens.push({
                        index: this.index,
                        text: o,
                        fn: l
                    }), this.index += 2) : a ? (this.tokens.push({
                        index: this.index,
                        text: this.ch,
                        fn: a,
                        json: this.was("[,:") && this.is("+-")
                    }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
                this.lastCh = this.ch
            }
            return this.tokens
        },
        is: function(e) {
            return -1 !== e.indexOf(this.ch)
        },
        was: function(e) {
            return -1 !== e.indexOf(this.lastCh)
        },
        peek: function(e) {
            var t = e || 1;
            return this.index + t < this.text.length ? this.text.charAt(this.index + t) : !1
        },
        isNumber: function(e) {
            return e >= "0" && "9" >= e
        },
        isWhitespace: function(e) {
            return " " === e || "\r" === e || " " === e || "\n" === e || "" === e || " " === e
        },
        isIdent: function(e) {
            return e >= "a" && "z" >= e || e >= "A" && "Z" >= e || "_" === e || "$" === e
        },
        isExpOperator: function(e) {
            return "-" === e || "+" === e || this.isNumber(e)
        },
        throwError: function(e, t, n) {
            n = n || this.index;
            var r = y(t) ? "s " + t + "-" + this.index + " [" + this.text.substring(t, n) + "]" : " " + n;
            throw Kr("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", e, r, this.text)
        },
        readNumber: function() {
            for (var e = "", t = this.index; this.index < this.text.length;) {
                var n = ar(this.text.charAt(this.index));
                if ("." == n || this.isNumber(n)) e += n;
                else {
                    var r = this.peek();
                    if ("e" == n && this.isExpOperator(r)) e += n;
                    else if (this.isExpOperator(n) && r && this.isNumber(r) && "e" == e.charAt(e.length - 1)) e += n;
                    else {
                        if (!this.isExpOperator(n) || r && this.isNumber(r) || "e" != e.charAt(e.length - 1)) break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            e = 1 * e, this.tokens.push({
                index: t,
                text: e,
                json: !0,
                fn: function() {
                    return e
                }
            })
        },
        readIdent: function() {
            for (var e, t, n, r, o = this, i = "", a = this.index; this.index < this.text.length && (r = this.text.charAt(this.index), "." === r || this.isIdent(r) || this.isNumber(r));) "." === r && (e = this.index), i += r, this.index++;
            if (e)
                for (t = this.index; t < this.text.length;) {
                    if (r = this.text.charAt(t), "(" === r) {
                        n = i.substr(e - a + 1), i = i.substr(0, e - a), this.index = t;
                        break
                    }
                    if (!this.isWhitespace(r)) break;
                    t++
                }
            var l = {
                index: a,
                text: i
            };
            if (Yr.hasOwnProperty(i)) l.fn = Yr[i], l.json = Yr[i];
            else {
                var s = wn(i, this.options, this.text);
                l.fn = f(function(e, t) {
                    return s(e, t)
                }, {
                    assign: function(e, t) {
                        return gn(e, i, t, o.text, o.options)
                    }
                })
            }
            this.tokens.push(l), n && (this.tokens.push({
                index: e,
                text: ".",
                json: !1
            }), this.tokens.push({
                index: e + 1,
                text: n,
                json: !1
            }))
        },
        readString: function(e) {
            var t = this.index;
            this.index++;
            for (var r = "", o = e, i = !1; this.index < this.text.length;) {
                var a = this.text.charAt(this.index);
                if (o += a, i) {
                    if ("u" === a) {
                        var l = this.text.substring(this.index + 1, this.index + 5);
                        l.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + l + "]"), this.index += 4, r += String.fromCharCode(parseInt(l, 16))
                    } else {
                        var s = Zr[a];
                        r += s ? s : a
                    }
                    i = !1
                } else if ("\\" === a) i = !0;
                else {
                    if (a === e) return this.index++, this.tokens.push({
                        index: t,
                        text: o,
                        string: r,
                        json: !0,
                        fn: function() {
                            return r
                        }
                    }), n;
                    r += a
                }
                this.index++
            }
            this.throwError("Unterminated quote", t)
        }
    };
    var to = function(e, t, n) {
        this.lexer = e, this.$filter = t, this.options = n
    };
    to.ZERO = function() {
        return 0
    }, to.prototype = {
        constructor: to,
        parse: function(e, t) {
            this.text = e, this.json = t, this.tokens = this.lexer.lex(e), t && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function() {
                this.throwError("is not valid json", {
                    text: e,
                    index: 0
                })
            });
            var n = t ? this.primary() : this.statements();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), n.literal = !!n.literal, n.constant = !!n.constant, n
        },
        primary: function() {
            var e;
            if (this.expect("(")) e = this.filterChain(), this.consume(")");
            else if (this.expect("[")) e = this.arrayDeclaration();
            else if (this.expect("{")) e = this.object();
            else {
                var t = this.expect();
                e = t.fn, e || this.throwError("not a primary expression", t), t.json && (e.constant = !0, e.literal = !0)
            }
            for (var n, r; n = this.expect("(", "[", ".");) "(" === n.text ? (e = this.functionCall(e, r), r = null) : "[" === n.text ? (r = e, e = this.objectIndex(e)) : "." === n.text ? (r = e, e = this.fieldAccess(e)) : this.throwError("IMPOSSIBLE");
            return e
        },
        throwError: function(e, t) {
            throw Kr("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", t.text, e, t.index + 1, this.text, this.text.substring(t.index))
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw Kr("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0]
        },
        peek: function(e, t, n, r) {
            if (this.tokens.length > 0) {
                var o = this.tokens[0],
                    i = o.text;
                if (i === e || i === t || i === n || i === r || !e && !t && !n && !r) return o
            }
            return !1
        },
        expect: function(e, t, n, r) {
            var o = this.peek(e, t, n, r);
            return o ? (this.json && !o.json && this.throwError("is not valid json", o), this.tokens.shift(), o) : !1
        },
        consume: function(e) {
            this.expect(e) || this.throwError("is unexpected, expecting [" + e + "]", this.peek())
        },
        unaryFn: function(e, t) {
            return f(function(n, r) {
                return e(n, r, t)
            }, {
                constant: t.constant
            })
        },
        ternaryFn: function(e, t, n) {
            return f(function(r, o) {
                return e(r, o) ? t(r, o) : n(r, o)
            }, {
                constant: e.constant && t.constant && n.constant
            })
        },
        binaryFn: function(e, t, n) {
            return f(function(r, o) {
                return t(r, o, e, n)
            }, {
                constant: e.constant && n.constant
            })
        },
        statements: function() {
            for (var e = [];;)
                if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && e.push(this.filterChain()), !this.expect(";")) return 1 === e.length ? e[0] : function(t, n) {
                    for (var r, o = 0; o < e.length; o++) {
                        var i = e[o];
                        i && (r = i(t, n))
                    }
                    return r
                }
        },
        filterChain: function() {
            for (var e, t = this.expression();;) {
                if (!(e = this.expect("|"))) return t;
                t = this.binaryFn(t, e.fn, this.filter())
            }
        },
        filter: function() {
            for (var e = this.expect(), t = this.$filter(e.text), n = [];;) {
                if (!(e = this.expect(":"))) {
                    var r = function(e, r, o) {
                        for (var i = [o], a = 0; a < n.length; a++) i.push(n[a](e, r));
                        return t.apply(e, i)
                    };
                    return function() {
                        return r
                    }
                }
                n.push(this.expression())
            }
        },
        expression: function() {
            return this.assignment()
        },
        assignment: function() {
            var e, t, n = this.ternary();
            return (t = this.expect("=")) ? (n.assign || this.throwError("implies assignment but [" + this.text.substring(0, t.index) + "] can not be assigned to", t), e = this.ternary(), function(t, r) {
                return n.assign(t, e(t, r), r)
            }) : n
        },
        ternary: function() {
            var e, t, r = this.logicalOR();
            return (t = this.expect("?")) ? (e = this.ternary(), (t = this.expect(":")) ? this.ternaryFn(r, e, this.ternary()) : (this.throwError("expected :", t), n)) : r
        },
        logicalOR: function() {
            for (var e, t = this.logicalAND();;) {
                if (!(e = this.expect("||"))) return t;
                t = this.binaryFn(t, e.fn, this.logicalAND())
            }
        },
        logicalAND: function() {
            var e, t = this.equality();
            return (e = this.expect("&&")) && (t = this.binaryFn(t, e.fn, this.logicalAND())), t
        },
        equality: function() {
            var e, t = this.relational();
            return (e = this.expect("==", "!=", "===", "!==")) && (t = this.binaryFn(t, e.fn, this.equality())), t
        },
        relational: function() {
            var e, t = this.additive();
            return (e = this.expect("<", ">", "<=", ">=")) && (t = this.binaryFn(t, e.fn, this.relational())), t
        },
        additive: function() {
            for (var e, t = this.multiplicative(); e = this.expect("+", "-");) t = this.binaryFn(t, e.fn, this.multiplicative());
            return t
        },
        multiplicative: function() {
            for (var e, t = this.unary(); e = this.expect("*", "/", "%");) t = this.binaryFn(t, e.fn, this.unary());
            return t
        },
        unary: function() {
            var e;
            return this.expect("+") ? this.primary() : (e = this.expect("-")) ? this.binaryFn(to.ZERO, e.fn, this.unary()) : (e = this.expect("!")) ? this.unaryFn(e.fn, this.unary()) : this.primary()
        },
        fieldAccess: function(e) {
            var t = this,
                n = this.expect().text,
                r = wn(n, this.options, this.text);
            return f(function(t, n, o) {
                return r(o || e(t, n))
            }, {
                assign: function(r, o, i) {
                    return gn(e(r, i), n, o, t.text, t.options)
                }
            })
        },
        objectIndex: function(e) {
            var t = this,
                r = this.expression();
            return this.consume("]"), f(function(o, i) {
                var a, l, s = e(o, i),
                    c = r(o, i);
                return s ? (a = mn(s[c], t.text), a && a.then && t.options.unwrapPromises && (l = a, "$$v" in a || (l.$$v = n, l.then(function(e) {
                    l.$$v = e
                })), a = a.$$v), a) : n
            }, {
                assign: function(n, o, i) {
                    var a = r(n, i),
                        l = mn(e(n, i), t.text);
                    return l[a] = o
                }
            })
        },
        functionCall: function(e, t) {
            var n = [];
            if (")" !== this.peekToken().text)
                do n.push(this.expression()); while (this.expect(","));
            this.consume(")");
            var r = this;
            return function(o, i) {
                for (var a = [], l = t ? t(o, i) : o, s = 0; s < n.length; s++) a.push(n[s](o, i));
                var c = e(o, i, l) || h;
                mn(l, r.text), mn(c, r.text);
                var u = c.apply ? c.apply(l, a) : c(a[0], a[1], a[2], a[3], a[4]);
                return mn(u, r.text)
            }
        },
        arrayDeclaration: function() {
            var e = [],
                t = !0;
            if ("]" !== this.peekToken().text)
                do {
                    var n = this.expression();
                    e.push(n), n.constant || (t = !1)
                } while (this.expect(","));
            return this.consume("]"), f(function(t, n) {
                for (var r = [], o = 0; o < e.length; o++) r.push(e[o](t, n));
                return r
            }, {
                literal: !0,
                constant: t
            })
        },
        object: function() {
            var e = [],
                t = !0;
            if ("}" !== this.peekToken().text)
                do {
                    var n = this.expect(),
                        r = n.string || n.text;
                    this.consume(":");
                    var o = this.expression();
                    e.push({
                        key: r,
                        value: o
                    }), o.constant || (t = !1)
                } while (this.expect(","));
            return this.consume("}"), f(function(t, n) {
                for (var r = {}, o = 0; o < e.length; o++) {
                    var i = e[o];
                    r[i.key] = i.value(t, n)
                }
                return r
            }, {
                literal: !0,
                constant: t
            })
        }
    };
    var no = {},
        ro = r("$sce"),
        oo = {
            HTML: "html",
            CSS: "css",
            URL: "url",
            RESOURCE_URL: "resourceUrl",
            JS: "js"
        },
        io = t.createElement("a"),
        ao = Mn(e.location.href, !0);
    jn.$inject = ["$provide"], Fn.$inject = ["$locale"], Ln.$inject = ["$locale"];
    var lo = ".",
        so = {
            yyyy: Hn("FullYear", 4),
            yy: Hn("FullYear", 2, 0, !0),
            y: Hn("FullYear", 1),
            MMMM: qn("Month"),
            MMM: qn("Month", !0),
            MM: Hn("Month", 2, 1),
            M: Hn("Month", 1, 1),
            dd: Hn("Date", 2),
            d: Hn("Date", 1),
            HH: Hn("Hours", 2),
            H: Hn("Hours", 1),
            hh: Hn("Hours", 2, -12),
            h: Hn("Hours", 1, -12),
            mm: Hn("Minutes", 2),
            m: Hn("Minutes", 1),
            ss: Hn("Seconds", 2),
            s: Hn("Seconds", 1),
            sss: Hn("Milliseconds", 3),
            EEEE: qn("Day"),
            EEE: qn("Day", !0),
            a: Vn,
            Z: Bn
        },
        co = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
        uo = /^\-?\d+$/;
    zn.$inject = ["$locale"];
    var fo = g(ar),
        po = g(sr);
    Xn.$inject = ["$parse"];
    var ho = g({
            restrict: "E",
            compile: function(e, r) {
                return 8 >= fr && (r.href || r.name || r.$set("href", ""), e.append(t.createComment("IE fix"))), r.href || r.xlinkHref || r.name ? n : function(e, t) {
                    var n = "[object SVGAnimatedString]" === yr.call(t.prop("href")) ? "xlink:href" : "href";
                    t.on("click", function(e) {
                        t.attr(n) || e.preventDefault()
                    })
                }
            }
        }),
        mo = {};
    i(Or, function(e, t) {
        if ("multiple" != e) {
            var n = Ut("ng-" + t);
            mo[n] = function() {
                return {
                    priority: 100,
                    link: function(e, r, o) {
                        e.$watch(o[n], function(e) {
                            o.$set(t, !!e)
                        })
                    }
                }
            }
        }
    }), i(["src", "srcset", "href"], function(e) {
        var t = Ut("ng-" + e);
        mo[t] = function() {
            return {
                priority: 99,
                link: function(n, r, o) {
                    o.$observe(t, function(t) {
                        t && (o.$set(e, t), fr && r.prop(e, o[e]))
                    })
                }
            }
        }
    });
    var go = {
        $addControl: h,
        $removeControl: h,
        $setValidity: h,
        $setDirty: h,
        $setPristine: h
    };
    Jn.$inject = ["$element", "$attrs", "$scope"];
    var vo = function(e) {
            return ["$timeout", function(t) {
                var r = {
                    name: "form",
                    restrict: e ? "EAC" : "E",
                    controller: Jn,
                    compile: function() {
                        return {
                            pre: function(e, r, o, i) {
                                if (!o.action) {
                                    var a = function(e) {
                                        e.preventDefault ? e.preventDefault() : e.returnValue = !1
                                    };
                                    Er(r[0], "submit", a), r.on("$destroy", function() {
                                        t(function() {
                                            Ar(r[0], "submit", a)
                                        }, 0, !1)
                                    })
                                }
                                var l = r.parent().controller("form"),
                                    s = o.name || o.ngForm;
                                s && gn(e, s, i, s), l && r.on("$destroy", function() {
                                    l.$removeControl(i), s && gn(e, s, n, s), f(i, go)
                                })
                            }
                        }
                    }
                };
                return r
            }]
        },
        yo = vo(),
        $o = vo(!0),
        wo = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        bo = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
        xo = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
        So = {
            text: Zn,
            number: er,
            url: tr,
            email: nr,
            radio: rr,
            checkbox: or,
            hidden: h,
            button: h,
            submit: h,
            reset: h,
            file: h
        },
        ko = ["$browser", "$sniffer", function(e, t) {
            return {
                restrict: "E",
                require: "?ngModel",
                link: function(n, r, o, i) {
                    i && (So[ar(o.type)] || So.text)(n, r, o, i, t, e)
                }
            }
        }],
        Po = "ng-valid",
        Co = "ng-invalid",
        To = "ng-pristine",
        Eo = "ng-dirty",
        Ao = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", function(e, t, n, o, a) {
            function l(e, t) {
                t = t ? "-" + Z(t, "-") : "", o.removeClass((e ? Co : Po) + t).addClass((e ? Po : Co) + t)
            }
            this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = n.name;
            var s = a(n.ngModel),
                c = s.assign;
            if (!c) throw r("ngModel")("nonassign", "Expression '{0}' is non-assignable. Element: {1}", n.ngModel, V(o));
            this.$render = h, this.$isEmpty = function(e) {
                return v(e) || "" === e || null === e || e !== e
            };
            var u = o.inheritedData("$formController") || go,
                f = 0,
                d = this.$error = {};
            o.addClass(To), l(!0), this.$setValidity = function(e, t) {
                d[e] !== !t && (t ? (d[e] && f--, f || (l(!0), this.$valid = !0, this.$invalid = !1)) : (l(!1), this.$invalid = !0, this.$valid = !1, f++), d[e] = !t, l(t, e), u.$setValidity(e, t, this))
            }, this.$setPristine = function() {
                this.$dirty = !1, this.$pristine = !0, o.removeClass(Eo).addClass(To)
            }, this.$setViewValue = function(n) {
                this.$viewValue = n, this.$pristine && (this.$dirty = !0, this.$pristine = !1, o.removeClass(To).addClass(Eo), u.$setDirty()), i(this.$parsers, function(e) {
                    n = e(n)
                }), this.$modelValue !== n && (this.$modelValue = n, c(e, n), i(this.$viewChangeListeners, function(e) {
                    try {
                        e()
                    } catch (n) {
                        t(n)
                    }
                }))
            };
            var p = this;
            e.$watch(function() {
                var t = s(e);
                if (p.$modelValue !== t) {
                    var n = p.$formatters,
                        r = n.length;
                    for (p.$modelValue = t; r--;) t = n[r](t);
                    p.$viewValue !== t && (p.$viewValue = t, p.$render())
                }
                return t
            })
        }],
        Wo = function() {
            return {
                require: ["ngModel", "^?form"],
                controller: Ao,
                link: function(e, t, n, r) {
                    var o = r[0],
                        i = r[1] || go;
                    i.$addControl(o), e.$on("$destroy", function() {
                        i.$removeControl(o)
                    })
                }
            }
        },
        _o = g({
            require: "ngModel",
            link: function(e, t, n, r) {
                r.$viewChangeListeners.push(function() {
                    e.$eval(n.ngChange)
                })
            }
        }),
        Io = function() {
            return {
                require: "?ngModel",
                link: function(e, t, r, o) {
                    if (o) {
                        r.required = !0;
                        var i = function(e) {
                            return r.required && o.$isEmpty(e) ? (o.$setValidity("required", !1), n) : (o.$setValidity("required", !0), e)
                        };
                        o.$formatters.push(i), o.$parsers.unshift(i), r.$observe("required", function() {
                            i(o.$viewValue)
                        })
                    }
                }
            }
        },
        Mo = function() {
            return {
                require: "ngModel",
                link: function(e, t, r, o) {
                    var a = /\/(.*)\//.exec(r.ngList),
                        l = a && RegExp(a[1]) || r.ngList || ",",
                        s = function(e) {
                            if (!v(e)) {
                                var t = [];
                                return e && i(e.split(l), function(e) {
                                    e && t.push(xr(e))
                                }), t
                            }
                        };
                    o.$parsers.push(s), o.$formatters.push(function(e) {
                        return S(e) ? e.join(", ") : n
                    }), o.$isEmpty = function(e) {
                        return !e || !e.length
                    }
                }
            }
        },
        Oo = /^(true|false|\d+)$/,
        Do = function() {
            return {
                priority: 100,
                compile: function(e, t) {
                    return Oo.test(t.ngValue) ? function(e, t, n) {
                        n.$set("value", e.$eval(n.ngValue))
                    } : function(e, t, n) {
                        e.$watch(n.ngValue, function(e) {
                            n.$set("value", e)
                        })
                    }
                }
            }
        },
        jo = Kn(function(e, t, r) {
            t.addClass("ng-binding").data("$binding", r.ngBind), e.$watch(r.ngBind, function(e) {
                t.text(e == n ? "" : e)
            })
        }),
        Uo = ["$interpolate", function(e) {
            return function(t, n, r) {
                var o = e(n.attr(r.$attr.ngBindTemplate));
                n.addClass("ng-binding").data("$binding", o), r.$observe("ngBindTemplate", function(e) {
                    n.text(e)
                })
            }
        }],
        Fo = ["$sce", "$parse", function(e, t) {
            return function(n, r, o) {
                function i() {
                    return "" + (a(n) || "")
                }
                r.addClass("ng-binding").data("$binding", o.ngBindHtml);
                var a = t(o.ngBindHtml);
                n.$watch(i, function() {
                    r.html(e.getTrustedHtml(a(n)) || "")
                })
            }
        }],
        Lo = ir("", !0),
        Ro = ir("Odd", 0),
        No = ir("Even", 1),
        Ho = Kn({
            compile: function(e, t) {
                t.$set("ngCloak", n), e.removeClass("ng-cloak")
            }
        }),
        qo = [function() {
            return {
                scope: !0,
                controller: "@",
                priority: 500
            }
        }],
        Bo = {};
    i("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(e) {
        var t = Ut("ng-" + e);
        Bo[t] = ["$parse", function(n) {
            return {
                compile: function(r, o) {
                    var i = n(o[t]);
                    return function(t, n) {
                        n.on(ar(e), function(e) {
                            t.$apply(function() {
                                i(t, {
                                    $event: e
                                })
                            })
                        })
                    }
                }
            }
        }]
    });
    var Vo = ["$animate", function(e) {
            return {
                transclude: "element",
                priority: 600,
                terminal: !0,
                restrict: "A",
                $$tlb: !0,
                link: function(n, r, o, i, a) {
                    var l, s;
                    n.$watch(o.ngIf, function(i) {
                        B(i) ? s || (s = n.$new(), a(s, function(n) {
                            n[n.length++] = t.createComment(" end ngIf: " + o.ngIf + " "), l = {
                                clone: n
                            }, e.enter(n, r.parent(), r)
                        })) : (s && (s.$destroy(), s = null), l && (e.leave(it(l.clone)), l = null))
                    })
                }
            }
        }],
        zo = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function(e, t, n, r, o) {
            return {
                restrict: "ECA",
                priority: 400,
                terminal: !0,
                transclude: "element",
                controller: wr.noop,
                compile: function(i, a) {
                    var l = a.ngInclude || a.src,
                        s = a.onload || "",
                        c = a.autoscroll;
                    return function(i, a, u, f, d) {
                        var p, h, m = 0,
                            g = function() {
                                p && (p.$destroy(), p = null), h && (r.leave(h), h = null)
                            };
                        i.$watch(o.parseAsResourceUrl(l), function(o) {
                            var l = function() {
                                    !y(c) || c && !i.$eval(c) || n()
                                },
                                u = ++m;
                            o ? (e.get(o, {
                                cache: t
                            }).success(function(e) {
                                if (u === m) {
                                    var t = i.$new();
                                    f.template = e;
                                    var n = d(t, function(e) {
                                        g(), r.enter(e, null, a, l)
                                    });
                                    p = t, h = n, p.$emit("$includeContentLoaded"), i.$eval(s)
                                }
                            }).error(function() {
                                u === m && g()
                            }), i.$emit("$includeContentRequested")) : (g(), f.template = null)
                        })
                    }
                }
            }
        }],
        Qo = ["$compile", function(e) {
            return {
                restrict: "ECA",
                priority: -400,
                require: "ngInclude",
                link: function(t, n, r, o) {
                    n.html(o.template), e(n.contents())(t)
                }
            }
        }],
        Go = Kn({
            priority: 450,
            compile: function() {
                return {
                    pre: function(e, t, n) {
                        e.$eval(n.ngInit)
                    }
                }
            }
        }),
        Xo = Kn({
            terminal: !0,
            priority: 1e3
        }),
        Ko = ["$locale", "$interpolate", function(e, t) {
            var n = /{}/g;
            return {
                restrict: "EA",
                link: function(r, o, a) {
                    var l = a.count,
                        s = a.$attr.when && o.attr(a.$attr.when),
                        c = a.offset || 0,
                        u = r.$eval(s) || {},
                        f = {},
                        d = t.startSymbol(),
                        p = t.endSymbol(),
                        h = /^when(Minus)?(.+)$/;
                    i(a, function(e, t) {
                        h.test(t) && (u[ar(t.replace("when", "").replace("Minus", "-"))] = o.attr(a.$attr[t]))
                    }), i(u, function(e, r) {
                        f[r] = t(e.replace(n, d + l + "-" + c + p))
                    }), r.$watch(function() {
                        var t = parseFloat(r.$eval(l));
                        return isNaN(t) ? "" : (t in u || (t = e.pluralCat(t - c)), f[t](r, o, !0))
                    }, function(e) {
                        o.text(e)
                    })
                }
            }
        }],
        Jo = ["$parse", "$animate", function(e, n) {
            function a(e) {
                return e.clone[0]
            }

            function l(e) {
                return e.clone[e.clone.length - 1]
            }
            var s = "$$NG_REMOVED",
                c = r("ngRepeat");
            return {
                transclude: "element",
                priority: 1e3,
                terminal: !0,
                $$tlb: !0,
                link: function(r, u, f, d, p) {
                    var h, m, g, v, y, $, w, b, x, S = f.ngRepeat,
                        k = S.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
                        P = {
                            $id: Tt
                        };
                    if (!k) throw c("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", S);
                    if ($ = k[1], w = k[2], h = k[3], h ? (m = e(h), g = function(e, t, n) {
                            return x && (P[x] = e), P[b] = t, P.$index = n, m(r, P)
                        }) : (v = function(e, t) {
                            return Tt(t)
                        }, y = function(e) {
                            return e
                        }), k = $.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !k) throw c("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", $);
                    b = k[3] || k[1], x = k[2];
                    var C = {};
                    r.$watchCollection(w, function(e) {
                        var f, d, h, m, $, w, k, P, T, E, A, W, _ = u[0],
                            I = {},
                            M = [];
                        if (o(e)) E = e, T = g || v;
                        else {
                            T = g || y, E = [];
                            for (w in e) e.hasOwnProperty(w) && "$" != w.charAt(0) && E.push(w);
                            E.sort()
                        }
                        for (m = E.length, d = M.length = E.length, f = 0; d > f; f++)
                            if (w = e === E ? f : E[f], k = e[w], P = T(w, k, f), rt(P, "`track by` id"), C.hasOwnProperty(P)) A = C[P], delete C[P], I[P] = A, M[f] = A;
                            else {
                                if (I.hasOwnProperty(P)) throw i(M, function(e) {
                                    e && e.scope && (C[e.id] = e)
                                }), c("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}", S, P);
                                M[f] = {
                                    id: P
                                }, I[P] = !1
                            }
                        for (w in C) C.hasOwnProperty(w) && (A = C[w], W = it(A.clone), n.leave(W), i(W, function(e) {
                            e[s] = !0
                        }), A.scope.$destroy());
                        for (f = 0, d = E.length; d > f; f++) {
                            if (w = e === E ? f : E[f], k = e[w], A = M[f], M[f - 1] && (_ = l(M[f - 1])), A.scope) {
                                $ = A.scope, h = _;
                                do h = h.nextSibling; while (h && h[s]);
                                a(A) != h && n.move(it(A.clone), null, dr(_)), _ = l(A)
                            } else $ = r.$new();
                            $[b] = k, x && ($[x] = w), $.$index = f, $.$first = 0 === f, $.$last = f === m - 1, $.$middle = !($.$first || $.$last), $.$odd = !($.$even = 0 === (1 & f)), A.scope || p($, function(e) {
                                e[e.length++] = t.createComment(" end ngRepeat: " + S + " "), n.enter(e, null, dr(_)), _ = e, A.scope = $, A.clone = e, I[A.id] = A
                            })
                        }
                        C = I
                    })
                }
            }
        }],
        Yo = ["$animate", function(e) {
            return function(t, n, r) {
                t.$watch(r.ngShow, function(t) {
                    e[B(t) ? "removeClass" : "addClass"](n, "ng-hide")
                })
            }
        }],
        Zo = ["$animate", function(e) {
            return function(t, n, r) {
                t.$watch(r.ngHide, function(t) {
                    e[B(t) ? "addClass" : "removeClass"](n, "ng-hide")
                })
            }
        }],
        ei = Kn(function(e, t, n) {
            e.$watch(n.ngStyle, function(e, n) {
                n && e !== n && i(n, function(e, n) {
                    t.css(n, "")
                }), e && t.css(e)
            }, !0)
        }),
        ti = ["$animate", function(e) {
            return {
                restrict: "EA",
                require: "ngSwitch",
                controller: ["$scope", function() {
                    this.cases = {}
                }],
                link: function(t, n, r, o) {
                    var a, l, s = r.ngSwitch || r.on,
                        c = [];
                    t.$watch(s, function(n) {
                        for (var s = 0, u = c.length; u > s; s++) c[s].$destroy(), e.leave(l[s]);
                        l = [], c = [], (a = o.cases["!" + n] || o.cases["?"]) && (t.$eval(r.change), i(a, function(n) {
                            var r = t.$new();
                            c.push(r), n.transclude(r, function(t) {
                                var r = n.element;
                                l.push(t), e.enter(t, r.parent(), r)
                            })
                        }))
                    })
                }
            }
        }],
        ni = Kn({
            transclude: "element",
            priority: 800,
            require: "^ngSwitch",
            link: function(e, t, n, r, o) {
                r.cases["!" + n.ngSwitchWhen] = r.cases["!" + n.ngSwitchWhen] || [], r.cases["!" + n.ngSwitchWhen].push({
                    transclude: o,
                    element: t
                })
            }
        }),
        ri = Kn({
            transclude: "element",
            priority: 800,
            require: "^ngSwitch",
            link: function(e, t, n, r, o) {
                r.cases["?"] = r.cases["?"] || [], r.cases["?"].push({
                    transclude: o,
                    element: t
                })
            }
        }),
        oi = Kn({
            link: function(e, t, n, o, i) {
                if (!i) throw r("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", V(t));
                i(function(e) {
                    t.empty(), t.append(e)
                })
            }
        }),
        ii = ["$templateCache", function(e) {
            return {
                restrict: "E",
                terminal: !0,
                compile: function(t, n) {
                    if ("text/ng-template" == n.type) {
                        var r = n.id,
                            o = t[0].text;
                        e.put(r, o)
                    }
                }
            }
        }],
        ai = r("ngOptions"),
        li = g({
            terminal: !0
        }),
        si = ["$compile", "$parse", function(e, r) {
            var o = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
                l = {
                    $setViewValue: h
                };
            return {
                restrict: "E",
                require: ["select", "?ngModel"],
                controller: ["$element", "$scope", "$attrs", function(e, t, n) {
                    var r, o, i = this,
                        a = {},
                        s = l;
                    i.databound = n.ngModel, i.init = function(e, t, n) {
                        s = e, r = t, o = n
                    }, i.addOption = function(t) {
                        rt(t, '"option value"'), a[t] = !0, s.$viewValue == t && (e.val(t), o.parent() && o.remove())
                    }, i.removeOption = function(e) {
                        this.hasOption(e) && (delete a[e], s.$viewValue == e && this.renderUnknownOption(e))
                    }, i.renderUnknownOption = function(t) {
                        var n = "? " + Tt(t) + " ?";
                        o.val(n), e.prepend(o), e.val(n), o.prop("selected", !0)
                    }, i.hasOption = function(e) {
                        return a.hasOwnProperty(e)
                    }, t.$on("$destroy", function() {
                        i.renderUnknownOption = h
                    })
                }],
                link: function(l, s, c, u) {
                    function f(e, t, n, r) {
                        n.$render = function() {
                            var e = n.$viewValue;
                            r.hasOption(e) ? (P.parent() && P.remove(), t.val(e), "" === e && h.prop("selected", !0)) : v(e) && h ? t.val("") : r.renderUnknownOption(e)
                        }, t.on("change", function() {
                            e.$apply(function() {
                                P.parent() && P.remove(), n.$setViewValue(t.val())
                            })
                        })
                    }

                    function d(e, t, n) {
                        var r;
                        n.$render = function() {
                            var e = new Et(n.$viewValue);
                            i(t.find("option"), function(t) {
                                t.selected = y(e.get(t.value))
                            })
                        }, e.$watch(function() {
                            j(r, n.$viewValue) || (r = O(n.$viewValue), n.$render())
                        }), t.on("change", function() {
                            e.$apply(function() {
                                var e = [];
                                i(t.find("option"), function(t) {
                                    t.selected && e.push(t.value)
                                }), n.$setViewValue(e)
                            })
                        })
                    }

                    function p(t, i, l) {
                        function s() {
                            var e, n, r, o, s, c, g, w, C, T, E, A, W, _, I, M = {
                                    "": []
                                },
                                O = [""],
                                D = l.$modelValue,
                                j = m(t) || [],
                                U = d ? a(j) : j,
                                F = {},
                                L = !1;
                            if ($)
                                if (v && S(D)) {
                                    L = new Et([]);
                                    for (var R = 0; R < D.length; R++) F[f] = D[R], L.put(v(t, F), D[R])
                                } else L = new Et(D);
                            for (E = 0; C = U.length, C > E; E++) {
                                if (g = E, d) {
                                    if (g = U[E], "$" === g.charAt(0)) continue;
                                    F[d] = g
                                }
                                if (F[f] = j[g], e = p(t, F) || "", (n = M[e]) || (n = M[e] = [], O.push(e)), $) A = y(L.remove(v ? v(t, F) : h(t, F)));
                                else {
                                    if (v) {
                                        var N = {};
                                        N[f] = D, A = v(t, N) === v(t, F)
                                    } else A = D === h(t, F);
                                    L = L || A
                                }
                                I = u(t, F), I = y(I) ? I : "", n.push({
                                    id: v ? v(t, F) : d ? U[E] : E,
                                    label: I,
                                    selected: A
                                })
                            }
                            for ($ || (b || null === D ? M[""].unshift({
                                    id: "",
                                    label: "",
                                    selected: !L
                                }) : L || M[""].unshift({
                                    id: "?",
                                    label: "",
                                    selected: !0
                                })), T = 0, w = O.length; w > T; T++) {
                                for (e = O[T], n = M[e], P.length <= T ? (o = {
                                        element: k.clone().attr("label", e),
                                        label: n.label
                                    }, s = [o], P.push(s), i.append(o.element)) : (s = P[T], o = s[0], o.label != e && o.element.attr("label", o.label = e)), W = null, E = 0, C = n.length; C > E; E++) r = n[E], (c = s[E + 1]) ? (W = c.element, c.label !== r.label && W.text(c.label = r.label), c.id !== r.id && W.val(c.id = r.id), W[0].selected !== r.selected && W.prop("selected", c.selected = r.selected)) : ("" === r.id && b ? _ = b : (_ = x.clone()).val(r.id).attr("selected", r.selected).text(r.label), s.push(c = {
                                    element: _,
                                    label: r.label,
                                    id: r.id,
                                    selected: r.selected
                                }), W ? W.after(_) : o.element.append(_), W = _);
                                for (E++; s.length > E;) s.pop().element.remove()
                            }
                            for (; P.length > T;) P.pop()[0].element.remove()
                        }
                        var c;
                        if (!(c = w.match(o))) throw ai("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", w, V(i));
                        var u = r(c[2] || c[1]),
                            f = c[4] || c[6],
                            d = c[5],
                            p = r(c[3] || ""),
                            h = r(c[2] ? c[1] : f),
                            m = r(c[7]),
                            g = c[8],
                            v = g ? r(c[8]) : null,
                            P = [
                                [{
                                    element: i,
                                    label: ""
                                }]
                            ];
                        b && (e(b)(t), b.removeClass("ng-scope"), b.remove()), i.empty(), i.on("change", function() {
                            t.$apply(function() {
                                var e, r, o, a, s, c, u, p, g, y = m(t) || [],
                                    w = {};
                                if ($) {
                                    for (o = [], c = 0, p = P.length; p > c; c++)
                                        for (e = P[c], s = 1, u = e.length; u > s; s++)
                                            if ((a = e[s].element)[0].selected) {
                                                if (r = a.val(), d && (w[d] = r), v)
                                                    for (g = 0; g < y.length && (w[f] = y[g], v(t, w) != r); g++);
                                                else w[f] = y[r];
                                                o.push(h(t, w))
                                            }
                                } else if (r = i.val(), "?" == r) o = n;
                                else if ("" === r) o = null;
                                else if (v) {
                                    for (g = 0; g < y.length; g++)
                                        if (w[f] = y[g], v(t, w) == r) {
                                            o = h(t, w);
                                            break
                                        }
                                } else w[f] = y[r], d && (w[d] = r), o = h(t, w);
                                l.$setViewValue(o)
                            })
                        }), l.$render = s, t.$watch(s)
                    }
                    if (u[1]) {
                        for (var h, m = u[0], g = u[1], $ = c.multiple, w = c.ngOptions, b = !1, x = dr(t.createElement("option")), k = dr(t.createElement("optgroup")), P = x.clone(), C = 0, T = s.children(), E = T.length; E > C; C++)
                            if ("" === T[C].value) {
                                h = b = T.eq(C);
                                break
                            }
                        m.init(g, b, P), $ && (g.$isEmpty = function(e) {
                            return !e || 0 === e.length
                        }), w ? p(l, s, g) : $ ? d(l, s, g) : f(l, s, g, m)
                    }
                }
            }
        }],
        ci = ["$interpolate", function(e) {
            var t = {
                addOption: h,
                removeOption: h
            };
            return {
                restrict: "E",
                priority: 100,
                compile: function(n, r) {
                    if (v(r.value)) {
                        var o = e(n.text(), !0);
                        o || r.$set("value", n.text())
                    }
                    return function(e, n, r) {
                        var i = "$selectController",
                            a = n.parent(),
                            l = a.data(i) || a.parent().data(i);
                        l && l.databound ? n.prop("selected", !1) : l = t, o ? e.$watch(o, function(e, t) {
                            r.$set("value", e), e !== t && l.removeOption(t), l.addOption(e)
                        }) : l.addOption(r.value), n.on("$destroy", function() {
                            l.removeOption(r.value)
                        })
                    }
                }
            }
        }],
        ui = g({
            restrict: "E",
            terminal: !0
        });
    et(), lt(wr), dr(t).ready(function() {
        J(t, Y)
    })
}(window, document), !angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>'),
    function(e, t) {
        "use strict";

        function n() {
            this.$get = ["$$sanitizeUri", function(e) {
                return function(t) {
                    var n = [];
                    return i(t, s(n, function(t, n) {
                        return !/^unsafe/.test(e(t, n))
                    })), n.join("")
                }
            }]
        }

        function r(e) {
            var n = [],
                r = s(n, t.noop);
            return r.chars(e), n.join("")
        }

        function o(e) {
            var t, n = {},
                r = e.split(",");
            for (t = 0; t < r.length; t++) n[r[t]] = !0;
            return n
        }

        function i(e, n) {
            function r(e, r, i, l) {
                if (r = t.lowercase(r), S[r])
                    for (; y.last() && k[y.last()];) o("", y.last());
                x[r] && y.last() == r && o("", r), l = $[r] || !!l, l || y.push(r);
                var s = {};
                i.replace(d, function(e, t, n, r, o) {
                    var i = n || r || o || "";
                    s[t] = a(i)
                }), n.start && n.start(r, s, l)
            }

            function o(e, r) {
                var o, i = 0;
                if (r = t.lowercase(r))
                    for (i = y.length - 1; i >= 0 && y[i] != r; i--);
                if (i >= 0) {
                    for (o = y.length - 1; o >= i; o--) n.end && n.end(y[o]);
                    y.length = i
                }
            }
            var i, l, s, y = [],
                w = e;
            for (y.last = function() {
                    return y[y.length - 1]
                }; e;) {
                if (l = !0, y.last() && P[y.last()]) e = e.replace(RegExp("(.*)<\\s*\\/\\s*" + y.last() + "[^>]*>", "i"), function(e, t) {
                    return t = t.replace(m, "$1").replace(v, "$1"), n.chars && n.chars(a(t)), ""
                }), o("", y.last());
                else if (0 === e.indexOf("<!--") ? (i = e.indexOf("--", 4), i >= 0 && e.lastIndexOf("-->", i) === i && (n.comment && n.comment(e.substring(4, i)), e = e.substring(i + 3), l = !1)) : g.test(e) ? (s = e.match(g), s && (e = e.replace(s[0], ""), l = !1)) : h.test(e) ? (s = e.match(f), s && (e = e.substring(s[0].length), s[0].replace(f, o), l = !1)) : p.test(e) && (s = e.match(u), s && (e = e.substring(s[0].length), s[0].replace(u, r), l = !1)), l) {
                    i = e.indexOf("<");
                    var b = 0 > i ? e : e.substring(0, i);
                    e = 0 > i ? "" : e.substring(i), n.chars && n.chars(a(b))
                }
                if (e == w) throw c("badparse", "The sanitizer was unable to parse the following block of html: {0}", e);
                w = e
            }
            o()
        }

        function a(e) {
            if (!e) return "";
            var t = W.exec(e),
                n = t[1],
                r = t[3],
                o = t[2];
            return o && (A.innerHTML = o.replace(/</g, "&lt;"), o = "textContent" in A ? A.textContent : A.innerText), n + o + r
        }

        function l(e) {
            return e.replace(/&/g, "&amp;").replace(y, function(e) {
                return "&#" + e.charCodeAt(0) + ";"
            }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        function s(e, n) {
            var r = !1,
                o = t.bind(e, e.push);
            return {
                start: function(e, i, a) {
                    e = t.lowercase(e), !r && P[e] && (r = e), r || C[e] !== !0 || (o("<"), o(e), t.forEach(i, function(r, i) {
                        var a = t.lowercase(i),
                            s = "img" === e && "src" === a || "background" === a;
                        E[a] !== !0 || T[a] === !0 && !n(r, s) || (o(" "), o(i), o('="'), o(l(r)), o('"'))
                    }), o(a ? "/>" : ">"))
                },
                end: function(e) {
                    e = t.lowercase(e), r || C[e] !== !0 || (o("</"), o(e), o(">")), e == r && (r = !1)
                },
                chars: function(e) {
                    r || o(l(e))
                }
            }
        }
        var c = t.$$minErr("$sanitize"),
            u = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,
            f = /^<\s*\/\s*([\w:-]+)[^>]*>/,
            d = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
            p = /^</,
            h = /^<\s*\//,
            m = /<!--(.*?)-->/g,
            g = /<!DOCTYPE([^>]*?)>/i,
            v = /<!\[CDATA\[(.*?)]]>/g,
            y = /([^\#-~| |!])/g,
            $ = o("area,br,col,hr,img,wbr"),
            w = o("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
            b = o("rp,rt"),
            x = t.extend({}, b, w),
            S = t.extend({}, w, o("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
            k = t.extend({}, b, o("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
            P = o("script,style"),
            C = t.extend({}, $, S, k, x),
            T = o("background,cite,href,longdesc,src,usemap"),
            E = t.extend({}, T, o("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),
            A = document.createElement("pre"),
            W = /^(\s*)([\s\S]*?)(\s*)$/;
        t.module("ngSanitize", []).provider("$sanitize", n), t.module("ngSanitize").filter("linky", ["$sanitize", function(e) {
            var n = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,
                o = /^mailto:/;
            return function(i, a) {
                function l(e) {
                    e && p.push(r(e))
                }

                function s(e, n) {
                    p.push("<a "), t.isDefined(a) && (p.push('target="'), p.push(a), p.push('" ')), p.push('href="'), p.push(e), p.push('">'), l(n), p.push("</a>")
                }
                if (!i) return i;
                for (var c, u, f, d = i, p = []; c = d.match(n);) u = c[0], c[2] == c[3] && (u = "mailto:" + u), f = c.index, l(d.substr(0, f)), s(u, c[0].replace(o, "")), d = d.substring(f + c[0].length);
                return l(d), e(p.join(""))
            }
        }])
    }(window, window.angular), ! function(e) {
        function t(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }

        function n(e) {
            return void 0 === e
        }
        var r = {},
            o = e.TraceKit,
            i = [].slice,
            a = "?";
        r.noConflict = function() {
            return e.TraceKit = o, r
        }, r.wrap = function(e) {
            function t() {
                try {
                    return e.apply(this, arguments)
                } catch (t) {
                    throw r.report(t), t
                }
            }
            return t
        }, r.report = function() {
            function o(e) {
                c(), p.push(e)
            }

            function a(e) {
                for (var t = p.length - 1; t >= 0; --t) p[t] === e && p.splice(t, 1)
            }

            function l(e, n) {
                var o = null;
                if (!n || r.collectWindowErrors) {
                    for (var a in p)
                        if (t(p, a)) try {
                            p[a].apply(null, [e].concat(i.call(arguments, 2)))
                        } catch (l) {
                            o = l
                        }
                        if (o) throw o
                }
            }

            function s(e, t, o, i, a) {
                var s = null,
                    c = !1;
                if (n(a))
                    if (m) r.computeStackTrace.augmentStackTraceWithInitialElement(m, t, o, e), s = m, m = null, h = null;
                    else {
                        var d = {
                            url: t,
                            line: o,
                            column: i
                        };
                        d.func = r.computeStackTrace.guessFunctionName(d.url, d.line), d.context = r.computeStackTrace.gatherContext(d.url, d.line), s = {
                            mode: "onerror",
                            message: e,
                            url: document.location.href,
                            stack: [d],
                            useragent: navigator.userAgent
                        }
                    } else u(a, !1), c = !0;
                return c || l(s, "from window.onerror"), f ? f.apply(this, arguments) : !1
            }

            function c() {
                d !== !0 && (f = e.onerror, e.onerror = s, d = !0)
            }

            function u(t, n) {
                var o = i.call(arguments, 1);
                if (m) {
                    if (h === t) return;
                    var a = m;
                    m = null, h = null, l.apply(null, [a, null].concat(o))
                }
                var s = r.computeStackTrace(t);
                if (m = s, h = t, e.setTimeout(function() {
                        h === t && (m = null, h = null, l.apply(null, [s, null].concat(o)))
                    }, s.incomplete ? 2e3 : 0), n !== !1) throw t
            }
            var f, d, p = [],
                h = null,
                m = null;
            return u.subscribe = o, u.unsubscribe = a, u
        }(), r.computeStackTrace = function() {
            function o(t) {
                if (!r.remoteFetching) return "";
                try {
                    var n = function() {
                            try {
                                return new e.XMLHttpRequest
                            } catch (t) {
                                return new e.ActiveXObject("Microsoft.XMLHTTP")
                            }
                        },
                        o = n();
                    return o.open("GET", t, !1), o.send(""), o.responseText
                } catch (i) {
                    return ""
                }
            }

            function i(e) {
                if (!t(x, e)) {
                    var n = ""; - 1 !== e.indexOf(document.domain) && (n = o(e)), x[e] = n ? n.split("\n") : []
                }
                return x[e]
            }

            function l(e, t) {
                var r, o = /function ([^(]*)\(([^)]*)\)/,
                    l = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,
                    s = "",
                    c = 10,
                    u = i(e);
                if (!u.length) return a;
                for (var f = 0; c > f; ++f)
                    if (s = u[t - f] + s, !n(s)) {
                        if (r = l.exec(s)) return r[1];
                        if (r = o.exec(s)) return r[1]
                    }
                return a
            }

            function s(e, t) {
                var o = i(e);
                if (!o.length) return null;
                var a = [],
                    l = Math.floor(r.linesOfContext / 2),
                    s = l + r.linesOfContext % 2,
                    c = Math.max(0, t - l - 1),
                    u = Math.min(o.length, t + s - 1);
                t -= 1;
                for (var f = c; u > f; ++f) n(o[f]) || a.push(o[f]);
                return a.length > 0 ? a : null
            }

            function c(e) {
                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, "\\$&")
            }

            function u(e) {
                return c(e).replace("<", "(?:<|&lt;)").replace(">", "(?:>|&gt;)").replace("&", "(?:&|&amp;)").replace('"', '(?:"|&quot;)').replace(/\s+/g, "\\s+")
            }

            function f(e, t) {
                for (var n, r, o = 0, a = t.length; a > o; ++o)
                    if ((n = i(t[o])).length && (n = n.join("\n"), r = e.exec(n))) return {
                        url: t[o],
                        line: n.substring(0, r.index).split("\n").length,
                        column: r.index - n.lastIndexOf("\n", r.index) - 1
                    };
                return null
            }

            function d(e, t, n) {
                var r, o = i(t),
                    a = RegExp("\\b" + c(e) + "\\b");
                return n -= 1, o && o.length > n && (r = a.exec(o[n])) ? r.index : null
            }

            function p(t) {
                for (var n, r, o, i, a = [e.location.href], l = document.getElementsByTagName("script"), s = "" + t, d = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, p = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, h = 0; h < l.length; ++h) {
                    var m = l[h];
                    m.src && a.push(m.src)
                }
                if (o = d.exec(s)) {
                    var g = o[1] ? "\\s+" + o[1] : "",
                        v = o[2].split(",").join("\\s*,\\s*");
                    n = c(o[3]).replace(/;$/, ";?"), r = RegExp("function" + g + "\\s*\\(\\s*" + v + "\\s*\\)\\s*{\\s*" + n + "\\s*}")
                } else r = RegExp(c(s).replace(/\s+/g, "\\s+"));
                if (i = f(r, a)) return i;
                if (o = p.exec(s)) {
                    var y = o[1];
                    if (n = u(o[2]), r = RegExp("on" + y + "=[\\'\"]\\s*" + n + "\\s*[\\'\"]", "i"), i = f(r, a[0])) return i;
                    if (r = RegExp(n), i = f(r, a)) return i
                }
                return null
            }

            function h(e) {
                if (!e.stack) return null;
                for (var t, n, r = /^\s*at (?:((?:\[object object\])?\S+(?: \[as \S+\])?) )?\(?((?:file|https?):.*?):(\d+)(?::(\d+))?\)?\s*$/i, o = /^\s*(\S*)(?:\((.*?)\))?@((?:file|https?).*?):(\d+)(?::(\d+))?\s*$/i, i = e.stack.split("\n"), c = [], u = /^(.*) is undefined$/.exec(e.message), f = 0, p = i.length; p > f; ++f) {
                    if (t = o.exec(i[f])) n = {
                        url: t[3],
                        func: t[1] || a,
                        args: t[2] ? t[2].split(",") : "",
                        line: +t[4],
                        column: t[5] ? +t[5] : null
                    };
                    else {
                        if (!(t = r.exec(i[f]))) continue;
                        n = {
                            url: t[2],
                            func: t[1] || a,
                            line: +t[3],
                            column: t[4] ? +t[4] : null
                        }
                    }!n.func && n.line && (n.func = l(n.url, n.line)), n.line && (n.context = s(n.url, n.line)), c.push(n)
                }
                return c[0] && c[0].line && !c[0].column && u && (c[0].column = d(u[1], c[0].url, c[0].line)), c.length ? {
                    mode: "stack",
                    name: e.name,
                    message: e.message,
                    url: document.location.href,
                    stack: c,
                    useragent: navigator.userAgent
                } : null
            }

            function m(e) {
                for (var t, n = e.stacktrace, r = / line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i, o = n.split("\n"), i = [], a = 0, c = o.length; c > a; a += 2)
                    if (t = r.exec(o[a])) {
                        var u = {
                            line: +t[1],
                            column: +t[2],
                            func: t[3] || t[4],
                            args: t[5] ? t[5].split(",") : [],
                            url: t[6]
                        };
                        if (!u.func && u.line && (u.func = l(u.url, u.line)), u.line) try {
                            u.context = s(u.url, u.line)
                        } catch (f) {}
                        u.context || (u.context = [o[a + 1]]), i.push(u)
                    }
                return i.length ? {
                    mode: "stacktrace",
                    name: e.name,
                    message: e.message,
                    url: document.location.href,
                    stack: i,
                    useragent: navigator.userAgent
                } : null
            }

            function g(n) {
                var r = n.message.split("\n");
                if (r.length < 4) return null;
                var o, a, c, d, p = /^\s*Line (\d+) of linked script ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,
                    h = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,
                    m = /^\s*Line (\d+) of function script\s*$/i,
                    g = [],
                    v = document.getElementsByTagName("script"),
                    y = [];
                for (a in v) t(v, a) && !v[a].src && y.push(v[a]);
                for (a = 2, c = r.length; c > a; a += 2) {
                    var $ = null;
                    if (o = p.exec(r[a])) $ = {
                        url: o[2],
                        func: o[3],
                        line: +o[1]
                    };
                    else if (o = h.exec(r[a])) {
                        $ = {
                            url: o[3],
                            func: o[4]
                        };
                        var w = +o[1],
                            b = y[o[2] - 1];
                        if (b && (d = i($.url))) {
                            d = d.join("\n");
                            var x = d.indexOf(b.innerText);
                            x >= 0 && ($.line = w + d.substring(0, x).split("\n").length)
                        }
                    } else if (o = m.exec(r[a])) {
                        var S = e.location.href.replace(/#.*$/, ""),
                            k = o[1],
                            P = RegExp(u(r[a + 1]));
                        d = f(P, [S]), $ = {
                            url: S,
                            line: d ? d.line : k,
                            func: ""
                        }
                    }
                    if ($) {
                        $.func || ($.func = l($.url, $.line));
                        var C = s($.url, $.line),
                            T = C ? C[Math.floor(C.length / 2)] : null;
                        $.context = C && T.replace(/^\s*/, "") === r[a + 1].replace(/^\s*/, "") ? C : [r[a + 1]], g.push($)
                    }
                }
                return g.length ? {
                    mode: "multiline",
                    name: n.name,
                    message: r[0],
                    url: document.location.href,
                    stack: g,
                    useragent: navigator.userAgent
                } : null
            }

            function v(e, t, n, r) {
                var o = {
                    url: t,
                    line: n
                };
                if (o.url && o.line) {
                    e.incomplete = !1, o.func || (o.func = l(o.url, o.line)), o.context || (o.context = s(o.url, o.line));
                    var i = / '([^']+)' /.exec(r);
                    if (i && (o.column = d(i[1], o.url, o.line)), e.stack.length > 0 && e.stack[0].url === o.url) {
                        if (e.stack[0].line === o.line) return !1;
                        if (!e.stack[0].line && e.stack[0].func === o.func) return e.stack[0].line = o.line, e.stack[0].context = o.context, !1
                    }
                    return e.stack.unshift(o), e.partial = !0, !0
                }
                return e.incomplete = !0, !1
            }

            function y(e, t) {
                for (var n, o, i, s = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, c = [], u = {}, f = !1, h = y.caller; h && !f; h = h.caller)
                    if (h !== $ && h !== r.report) {
                        if (o = {
                                url: null,
                                func: a,
                                line: null,
                                column: null
                            }, h.name ? o.func = h.name : (n = s.exec("" + h)) && (o.func = n[1]), i = p(h)) {
                            o.url = i.url, o.line = i.line, o.func === a && (o.func = l(o.url, o.line));
                            var m = / '([^']+)' /.exec(e.message || e.description);
                            m && (o.column = d(m[1], i.url, i.line))
                        }
                        u["" + h] ? f = !0 : u["" + h] = !0, c.push(o)
                    }
                t && c.splice(0, t);
                var g = {
                    mode: "callers",
                    name: e.name,
                    message: e.message,
                    url: document.location.href,
                    stack: c,
                    useragent: navigator.userAgent
                };
                return v(g, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description), g
            }

            function $(e, t) {
                var n = null;
                t = null == t ? 0 : +t;
                try {
                    if (n = m(e)) return n
                } catch (r) {
                    if (b) throw r
                }
                try {
                    if (n = h(e)) return n
                } catch (r) {
                    if (b) throw r
                }
                try {
                    if (n = g(e)) return n
                } catch (r) {
                    if (b) throw r
                }
                try {
                    if (n = y(e, t + 1)) return n
                } catch (r) {
                    if (b) throw r
                }
                return {
                    mode: "failed"
                }
            }

            function w(e) {
                e = (null == e ? 0 : +e) + 1;
                try {
                    throw Error()
                } catch (t) {
                    return $(t, e + 1)
                }
            }
            var b = !1,
                x = {};
            return $.augmentStackTraceWithInitialElement = v, $.guessFunctionName = l, $.gatherContext = s, $.ofCaller = w, $
        }(), r.remoteFetching || (r.remoteFetching = !0), r.collectWindowErrors || (r.collectWindowErrors = !0), (!r.linesOfContext || r.linesOfContext < 1) && (r.linesOfContext = 7), e.TraceKit = r
    }(window),
    function(e, t) {
        "use strict";

        function n(e, t) {
            var n, r;
            t = t || {}, e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1), document.createEvent ? (n = document.createEvent("HTMLEvents"), n.initEvent(e, !0, !0)) : (n = document.createEventObject(), n.eventType = e);
            for (r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
            if (document.createEvent) document.dispatchEvent(n);
            else try {
                document.fireEvent("on" + n.eventType.toLowerCase(), n)
            } catch (o) {}
        }

        function r(e) {
            this.name = "RavenConfigError", this.message = e
        }

        function o(e) {
            var t = I.exec(e),
                n = {},
                o = 7;
            try {
                for (; o--;) n[_[o]] = t[o] || ""
            } catch (i) {
                throw new r("Invalid DSN: " + e)
            }
            if (n.pass) throw new r("Do not specify your private key in the DSN!");
            return n
        }

        function i(e) {
            return void 0 === e
        }

        function a(e) {
            return "function" == typeof e
        }

        function l(e) {
            return "string" == typeof e
        }

        function s(e) {
            for (var t in e) return !1;
            return !0
        }

        function c(e, t) {
            var n, r;
            if (i(e.length))
                for (n in e) e.hasOwnProperty(n) && t.call(null, n, e[n]);
            else if (r = e.length)
                for (n = 0; r > n; n++) t.call(null, n, e[n])
        }

        function u() {
            if (M) return M;
            var e = ["sentry_version=4", "sentry_client=raven-js/" + W.VERSION];
            return k && e.push("sentry_key=" + k), M = "?" + e.join("&")
        }

        function f(e, t) {
            var r = [];
            e.stack && e.stack.length && c(e.stack, function(e, t) {
                var n = d(t);
                n && r.push(n)
            }), n("handle", {
                stackInfo: e,
                options: t
            }), h(e.name, e.message, e.url, e.lineno, r, t)
        }

        function d(e) {
            if (e.url) {
                var t, n = {
                        filename: e.url,
                        lineno: e.line,
                        colno: e.column,
                        "function": e.func || "?"
                    },
                    r = p(e);
                if (r) {
                    var o = ["pre_context", "context_line", "post_context"];
                    for (t = 3; t--;) n[o[t]] = r[t]
                }
                return n.in_app = !(!E.includePaths.test(n.filename) || /(Raven|TraceKit)\./.test(n["function"]) || /raven\.(min\.)js$/.test(n.filename)), n
            }
        }

        function p(e) {
            if (e.context && E.fetchContext) {
                for (var t = e.context, n = ~~(t.length / 2), r = t.length, o = !1; r--;)
                    if (t[r].length > 300) {
                        o = !0;
                        break
                    }
                if (o) {
                    if (i(e.column)) return;
                    return [
                        [], t[n].substr(e.column, 50), []
                    ]
                }
                return [t.slice(0, n), t[n], t.slice(n + 1)]
            }
        }

        function h(e, t, n, r, o, i) {
            var a, l;
            t && (E.ignoreErrors.test(t) || (o && o.length ? (n = o[0].filename || n, o.reverse(), a = {
                frames: o
            }) : n && (a = {
                frames: [{
                    filename: n,
                    lineno: r
                }]
            }), E.ignoreUrls && E.ignoreUrls.test(n) || (!E.whitelistUrls || E.whitelistUrls.test(n)) && (l = r ? t + " at " + r : t, v(m({
                exception: {
                    type: e,
                    value: t
                },
                stacktrace: a,
                culprit: n,
                message: l
            }, i)))))
        }

        function m(e, t) {
            return t ? (c(t, function(t, n) {
                e[t] = n
            }), e) : e
        }

        function g() {
            var e = {
                url: document.location.href,
                headers: {
                    "User-Agent": navigator.userAgent
                }
            };
            return document.referrer && (e.headers.Referer = document.referrer), e
        }

        function v(e) {
            $() && (e = m({
                project: P,
                logger: E.logger,
                site: E.site,
                platform: "javascript",
                request: g()
            }, e), e.tags = m(E.tags, e.tags), e.extra = m(E.extra, e.extra), s(e.tags) && delete e.tags, s(e.extra) && delete e.extra, S && (e.user = S), a(E.dataCallback) && (e = E.dataCallback(e)), (!a(E.shouldSendCallback) || E.shouldSendCallback(e)) && y(e))
        }

        function y(e) {
            var t = new Image,
                r = x + u() + "&sentry_data=" + encodeURIComponent(JSON.stringify(e));
            t.onload = function() {
                n("success", {
                    data: e,
                    src: r
                })
            }, t.onerror = t.onabort = function() {
                n("failure", {
                    data: e,
                    src: r
                })
            }, t.src = r
        }

        function $() {
            return T ? x ? !0 : (e.console && console.error && console.error("Error: Raven has not been configured."), !1) : !1
        }

        function w(e) {
            for (var t, n = [], r = 0, o = e.length; o > r; r++) t = e[r], l(t) ? n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && n.push(t.source);
            return RegExp(n.join("|"), "i")
        }
        var b, x, S, k, P, C = e.Raven,
            T = !(!e.JSON || !e.JSON.stringify),
            E = {
                logger: "javascript",
                ignoreErrors: [],
                ignoreUrls: [],
                whitelistUrls: [],
                includePaths: [],
                collectWindowErrors: !0,
                tags: {},
                extra: {}
            },
            A = TraceKit.noConflict();
        A.remoteFetching = !1;
        var W = {
                VERSION: "1.1.8",
                TraceKit: A,
                afterLoad: function() {
                    var t = e.RavenConfig;
                    t && this.config(t.dsn, t.config).install()
                },
                noConflict: function() {
                    return e.Raven = C, W
                },
                config: function(e, t) {
                    var n = o(e),
                        r = n.path.lastIndexOf("/"),
                        i = n.path.substr(1, r);
                    return t && c(t, function(e, t) {
                        E[e] = t
                    }), E.ignoreErrors.push("Script error."), E.ignoreErrors.push("Script error"), E.ignoreErrors = w(E.ignoreErrors), E.ignoreUrls = E.ignoreUrls.length ? w(E.ignoreUrls) : !1, E.whitelistUrls = E.whitelistUrls.length ? w(E.whitelistUrls) : !1, E.includePaths = w(E.includePaths), k = n.user, P = ~~n.path.substr(r + 1), x = "//" + n.host + (n.port ? ":" + n.port : "") + "/" + i + "api/" + P + "/store/", n.protocol && (x = n.protocol + ":" + x), E.fetchContext && (A.remoteFetching = !0), E.linesOfContext && (A.linesOfContext = E.linesOfContext), A.collectWindowErrors = !!E.collectWindowErrors, W
                },
                install: function() {
                    return $() && A.report.subscribe(f), W
                },
                context: function(e, n, r) {
                    return a(e) && (r = n || [], n = e, e = t), W.wrap(e, n).apply(this, r)
                },
                wrap: function(e, n) {
                    function r() {
                        for (var t = [], r = arguments.length; r--;) t[r] = W.wrap(e, arguments[r]);
                        try {
                            return n.apply(this, t)
                        } catch (o) {
                            throw W.captureException(o, e), o
                        }
                    }
                    if (i(n) && !a(e)) return e;
                    if (a(e) && (n = e, e = t), !a(n)) return n;
                    if (n.__raven__) return n;
                    for (var o in n) n.hasOwnProperty(o) && (r[o] = n[o]);
                    return r.__raven__ = !0, r
                },
                uninstall: function() {
                    return A.report.unsubscribe(f), W
                },
                captureException: function(e, t) {
                    if (l(e)) return W.captureMessage(e, t);
                    b = e;
                    try {
                        A.report(e, t)
                    } catch (n) {
                        if (e !== n) throw n
                    }
                    return W
                },
                captureMessage: function(e, t) {
                    return v(m({
                        message: e
                    }, t)), W
                },
                setUser: function(e) {
                    return S = e, W
                },
                lastException: function() {
                    return b
                }
            },
            _ = "source protocol user pass host port path".split(" "),
            I = /^(?:(\w+):)?\/\/(\w+)(:\w+)?@([\w\.-]+)(?::(\d+))?(\/.*)/;
        r.prototype = Error(), r.prototype.constructor = r;
        var M;
        W.afterLoad(), e.Raven = W, "function" == typeof define && define.amd && define("raven", [], function() {
            return W
        })
    }(window),
    function(e, t, n) {
        "use strict";
        if (n) {
            var r = n.event.add;
            n.event.add = function(e, o, i, a, l) {
                var s;
                return i && i.handler ? (s = i.handler, i.handler = t.wrap(i.handler)) : (s = i, i = t.wrap(i)), i.guid = s.guid ? s.guid : s.guid = n.guid++, r.call(this, e, o, i, a, l)
            };
            var o = n.fn.ready;
            n.fn.ready = function(e) {
                return o.call(this, t.wrap(e))
            };
            var i = n.ajax;
            n.ajax = function(e, r) {
                var o, a = ["complete", "error", "success"];
                for ("object" == typeof e && (r = e, e = void 0), r = r || {}; o = a.pop();) n.isFunction(r[o]) && (r[o] = t.wrap(r[o]));
                try {
                    return i.call(this, e, r)
                } catch (l) {
                    throw t.captureException(l), l
                }
            }
        }
    }(this, Raven, window.jQuery),
    function(e, t) {
        "use strict";
        var n = function(n) {
            var r = e[n];
            e[n] = function() {
                var e = [].slice.call(arguments),
                    n = e[0];
                return "function" == typeof n && (e[0] = t.wrap(n)), r.apply ? r.apply(this, e) : r(e[0], e[1])
            }
        };
        n("setTimeout"), n("setInterval")
    }(this, Raven), LazyLoad = function(e) {
        function t(t, n) {
            var r, o = e.createElement(t);
            for (r in n) n.hasOwnProperty(r) && o.setAttribute(r, n[r]);
            return o
        }

        function n(e) {
            var t, n, r = c[e];
            r && (t = r.callback, n = r.urls, n.shift(), u = 0, n.length || (t && t.call(r.context, r.obj), c[e] = null, f[e].length && o(e)))
        }

        function r() {
            var t = navigator.userAgent;
            l = {
                async: e.createElement("script").async === !0
            }, (l.webkit = /AppleWebKit\//.test(t)) || (l.ie = /MSIE|Trident/.test(t)) || (l.opera = /Opera/.test(t)) || (l.gecko = /Gecko\//.test(t)) || (l.unknown = !0)
        }

        function o(o, u, d, p, h) {
            var m, g, v, y, $, w, b = function() {
                    n(o)
                },
                x = "css" === o,
                S = [];
            if (l || r(), u)
                if (u = "string" == typeof u ? [u] : u.concat(), x || l.async || l.gecko || l.opera) f[o].push({
                    urls: u,
                    callback: d,
                    obj: p,
                    context: h
                });
                else
                    for (m = 0, g = u.length; g > m; ++m) f[o].push({
                        urls: [u[m]],
                        callback: m === g - 1 ? d : null,
                        obj: p,
                        context: h
                    });
            if (!c[o] && (y = c[o] = f[o].shift())) {
                for (s || (s = e.head || e.getElementsByTagName("head")[0]), $ = y.urls, m = 0, g = $.length; g > m; ++m) w = $[m], x ? v = l.gecko ? t("style") : t("link", {
                    href: w,
                    rel: "stylesheet"
                }) : (v = t("script", {
                    src: w
                }), v.async = !1), v.className = "lazyload", v.setAttribute("charset", "utf-8"), l.ie && !x && "onreadystatechange" in v && !("draggable" in v) ? v.onreadystatechange = function() {
                    /loaded|complete/.test(v.readyState) && (v.onreadystatechange = null, b())
                } : x && (l.gecko || l.webkit) ? l.webkit ? (y.urls[m] = v.href, a()) : (v.innerHTML = '@import "' + w + '";', i(v)) : v.onload = v.onerror = b, S.push(v);
                for (m = 0, g = S.length; g > m; ++m) s.appendChild(S[m])
            }
        }

        function i(e) {
            var t;
            try {
                t = !!e.sheet.cssRules
            } catch (r) {
                return u += 1, 200 > u ? setTimeout(function() {
                    i(e)
                }, 50) : t && n("css"), void 0
            }
            n("css")
        }

        function a() {
            var e, t = c.css;
            if (t) {
                for (e = d.length; --e >= 0;)
                    if (d[e].href === t.urls[0]) {
                        n("css");
                        break
                    }
                u += 1, t && (200 > u ? setTimeout(a, 50) : n("css"))
            }
        }
        var l, s, c = {},
            u = 0,
            f = {
                css: [],
                js: []
            },
            d = e.styleSheets;
        return {
            css: function(e, t, n, r) {
                o("css", e, t, n, r)
            },
            js: function(e, t, n, r) {
                o("js", e, t, n, r)
            }
        }
    }(this.document),
    function() {
        "use strict";
        var e, t = function() {
                var e = /\-([a-z])/g,
                    t = function(e, t) {
                        return t.toUpperCase()
                    };
                return function(n) {
                    return n.replace(e, t)
                }
            }(),
            n = function(e, n) {
                var r, o, i, a, l, s;
                if (window.getComputedStyle ? r = window.getComputedStyle(e, null).getPropertyValue(n) : (o = t(n), r = e.currentStyle ? e.currentStyle[o] : e.style[o]), "auto" === r && "cursor" === n)
                    for (i = e.tagName.toLowerCase(), a = ["a"], l = 0, s = a.length; s > l; l++)
                        if (i === a[l]) return "pointer";
                return r
            },
            r = function(e) {
                if (m.prototype._singleton) {
                    e || (e = window.event);
                    var t;
                    this !== window ? t = this : e.target ? t = e.target : e.srcElement && (t = e.srcElement), m.prototype._singleton.setCurrent(t)
                }
            },
            o = function(e, t, n) {
                e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
            },
            i = function(e, t, n) {
                e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
            },
            a = function(e, t) {
                if (e.addClass) return e.addClass(t), e;
                if (t && "string" == typeof t) {
                    var n = (t || "").split(/\s+/);
                    if (1 === e.nodeType)
                        if (e.className) {
                            for (var r = " " + e.className + " ", o = e.className, i = 0, a = n.length; a > i; i++) r.indexOf(" " + n[i] + " ") < 0 && (o += " " + n[i]);
                            e.className = o.replace(/^\s+|\s+$/g, "")
                        } else e.className = t
                }
                return e
            },
            l = function(e, t) {
                if (e.removeClass) return e.removeClass(t), e;
                if (t && "string" == typeof t || void 0 === t) {
                    var n = (t || "").split(/\s+/);
                    if (1 === e.nodeType && e.className)
                        if (t) {
                            for (var r = (" " + e.className + " ").replace(/[\n\t]/g, " "), o = 0, i = n.length; i > o; o++) r = r.replace(" " + n[o] + " ", " ");
                            e.className = r.replace(/^\s+|\s+$/g, "")
                        } else e.className = ""
                }
                return e
            },
            s = function() {
                var e, t, n, r = 1;
                return "function" == typeof document.body.getBoundingClientRect && (e = document.body.getBoundingClientRect(), t = e.right - e.left, n = document.body.offsetWidth, r = Math.round(100 * (t / n)) / 100), r
            },
            c = function(e) {
                var t = {
                        left: 0,
                        top: 0,
                        width: 0,
                        height: 0,
                        zIndex: 999999999
                    },
                    r = n(e, "z-index");
                if (r && "auto" !== r && (t.zIndex = parseInt(r, 10)), e.getBoundingClientRect) {
                    var o, i, a, l = e.getBoundingClientRect();
                    "pageXOffset" in window && "pageYOffset" in window ? (o = window.pageXOffset, i = window.pageYOffset) : (a = s(), o = Math.round(document.documentElement.scrollLeft / a), i = Math.round(document.documentElement.scrollTop / a));
                    var c = document.documentElement.clientLeft || 0,
                        u = document.documentElement.clientTop || 0;
                    t.left = l.left + o - c, t.top = l.top + i - u, t.width = "width" in l ? l.width : l.right - l.left, t.height = "height" in l ? l.height : l.bottom - l.top
                }
                return t
            },
            u = function(e) {
                var t = m.prototype._singleton;
                return t.options.useNoCache ? (e.indexOf("?") >= 0 ? "&nocache=" : "?nocache=") + (new Date).getTime() : ""
            },
            f = function(e) {
                var t = [];
                if (e.trustedDomains) {
                    var n;
                    "string" == typeof e.trustedDomains && e.trustedDomains ? n = [e.trustedDomains] : "length" in e.trustedDomains && (n = e.trustedDomains), t.push("trustedDomain=" + encodeURIComponent(n.join(",")))
                }
                return "string" == typeof e.amdModuleId && e.amdModuleId && t.push("amdModuleId=" + encodeURIComponent(e.amdModuleId)), "string" == typeof e.cjsModuleId && e.cjsModuleId && t.push("cjsModuleId=" + encodeURIComponent(e.cjsModuleId)), t.join("&")
            },
            d = function(e, t) {
                if (t.indexOf) return t.indexOf(e);
                for (var n = 0, r = t.length; r > n; n++)
                    if (t[n] === e) return n;
                return -1
            },
            p = function(e) {
                if ("string" == typeof e) throw new TypeError("ZeroClipboard doesn't accept query strings.");
                return e.length ? e : [e]
            },
            h = function(e, t, n, r, o) {
                o ? window.setTimeout(function() {
                    e.call(t, n, r)
                }, 0) : e.call(t, n, r)
            },
            m = function(e, t) {
                if (e && (m.prototype._singleton || this).glue(e), m.prototype._singleton) return m.prototype._singleton;
                m.prototype._singleton = this, this.options = {};
                for (var n in v) this.options[n] = v[n];
                for (var r in t) this.options[r] = t[r];
                this.handlers = {}, m.detectFlashSupport() && w()
            },
            g = [];
        m.prototype.setCurrent = function(t) {
            e = t, this.reposition(), t.getAttribute("title") && this.setTitle(t.getAttribute("title")), this.setHandCursor("pointer" === n(t, "cursor"))
        }, m.prototype.setText = function(e) {
            e && "" !== e && (this.options.text = e, this.ready() && this.flashBridge.setText(e))
        }, m.prototype.setTitle = function(e) {
            e && "" !== e && this.htmlBridge.setAttribute("title", e)
        }, m.prototype.setSize = function(e, t) {
            this.ready() && this.flashBridge.setSize(e, t)
        }, m.prototype.setHandCursor = function(e) {
            this.ready() && this.flashBridge.setHandCursor(e)
        }, m.version = "1.2.0-beta.3";
        var v = {
            moviePath: "ZeroClipboard.swf",
            trustedDomains: null,
            text: null,
            hoverClass: "zeroclipboard-is-hover",
            activeClass: "zeroclipboard-is-active",
            allowScriptAccess: "sameDomain",
            useNoCache: !0
        };
        m.setDefaults = function(e) {
            for (var t in e) v[t] = e[t]
        }, m.destroy = function() {
            m.prototype._singleton.unglue(g);
            var e = m.prototype._singleton.htmlBridge;
            e.parentNode.removeChild(e), delete m.prototype._singleton
        }, m.detectFlashSupport = function() {
            var e = !1;
            if ("function" == typeof ActiveXObject) try {
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash") && (e = !0)
            } catch (t) {}
            return !e && navigator.mimeTypes["application/x-shockwave-flash"] && (e = !0), e
        };
        var y = null,
            $ = null,
            w = function() {
                var e = m.prototype._singleton,
                    t = document.getElementById("global-zeroclipboard-html-bridge");
                if (!t) {
                    var n = {};
                    for (var r in e.options) n[r] = e.options[r];
                    n.amdModuleId = y, n.cjsModuleId = $;
                    var o = f(n),
                        i = '      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="' + e.options.moviePath + u(e.options.moviePath) + '"/>         <param name="allowScriptAccess" value="' + e.options.allowScriptAccess + '"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="' + o + '"/>         <embed src="' + e.options.moviePath + u(e.options.moviePath) + '"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="' + o + '"           scale="exactfit">         </embed>       </object>';
                    t = document.createElement("div"), t.id = "global-zeroclipboard-html-bridge", t.setAttribute("class", "global-zeroclipboard-container"), t.setAttribute("data-clipboard-ready", !1), t.style.position = "absolute", t.style.left = "-9999px", t.style.top = "-9999px", t.style.width = "15px", t.style.height = "15px", t.style.zIndex = "9999", t.innerHTML = i, document.body.appendChild(t)
                }
                e.htmlBridge = t, e.flashBridge = document["global-zeroclipboard-flash-bridge"] || t.children[0].lastElementChild
            };
        m.prototype.resetBridge = function() {
            this.htmlBridge.style.left = "-9999px", this.htmlBridge.style.top = "-9999px", this.htmlBridge.removeAttribute("title"), this.htmlBridge.removeAttribute("data-clipboard-text"), l(e, this.options.activeClass), e = null, this.options.text = null
        }, m.prototype.ready = function() {
            var e = this.htmlBridge.getAttribute("data-clipboard-ready");
            return "true" === e || e === !0
        }, m.prototype.reposition = function() {
            if (!e) return !1;
            var t = c(e);
            this.htmlBridge.style.top = t.top + "px", this.htmlBridge.style.left = t.left + "px", this.htmlBridge.style.width = t.width + "px", this.htmlBridge.style.height = t.height + "px", this.htmlBridge.style.zIndex = t.zIndex + 1, this.setSize(t.width, t.height)
        }, m.dispatch = function(e, t) {
            m.prototype._singleton.receiveEvent(e, t)
        }, m.prototype.on = function(e, t) {
            for (var n = ("" + e).split(/\s/g), r = 0; r < n.length; r++) e = n[r].toLowerCase().replace(/^on/, ""), this.handlers[e] || (this.handlers[e] = t);
            this.handlers.noflash && !m.detectFlashSupport() && this.receiveEvent("onNoFlash", null)
        }, m.prototype.addEventListener = m.prototype.on, m.prototype.off = function(e, t) {
            for (var n = ("" + e).split(/\s/g), r = 0; r < n.length; r++) {
                e = n[r].toLowerCase().replace(/^on/, "");
                for (var o in this.handlers) o === e && this.handlers[o] === t && delete this.handlers[o]
            }
        }, m.prototype.removeEventListener = m.prototype.off, m.prototype.receiveEvent = function(t, n) {
            t = ("" + t).toLowerCase().replace(/^on/, "");
            var r = e,
                o = !0;
            switch (t) {
                case "load":
                    if (n && parseFloat(n.flashVersion.replace(",", ".").replace(/[^0-9\.]/gi, "")) < 10) return this.receiveEvent("onWrongFlash", {
                        flashVersion: n.flashVersion
                    }), void 0;
                    this.htmlBridge.setAttribute("data-clipboard-ready", !0);
                    break;
                case "mouseover":
                    a(r, this.options.hoverClass);
                    break;
                case "mouseout":
                    l(r, this.options.hoverClass), this.resetBridge();
                    break;
                case "mousedown":
                    a(r, this.options.activeClass);
                    break;
                case "mouseup":
                    l(r, this.options.activeClass);
                    break;
                case "datarequested":
                    var i = r.getAttribute("data-clipboard-target"),
                        s = i ? document.getElementById(i) : null;
                    if (s) {
                        var c = s.value || s.textContent || s.innerText;
                        c && this.setText(c)
                    } else {
                        var u = r.getAttribute("data-clipboard-text");
                        u && this.setText(u)
                    }
                    o = !1;
                    break;
                case "complete":
                    this.options.text = null
            }
            if (this.handlers[t]) {
                var f = this.handlers[t];
                "string" == typeof f && "function" == typeof window[f] && (f = window[f]), "function" == typeof f && h(f, r, this, n, o)
            }
        }, m.prototype.glue = function(e) {
            e = p(e);
            for (var t = 0; t < e.length; t++) - 1 == d(e[t], g) && (g.push(e[t]), o(e[t], "mouseover", r))
        }, m.prototype.unglue = function(e) {
            e = p(e);
            for (var t = 0; t < e.length; t++) {
                i(e[t], "mouseover", r);
                var n = d(e[t], g); - 1 != n && g.splice(n, 1)
            }
        }, "function" == typeof define && define.amd ? define(["require", "exports", "module"], function(e, t, n) {
            return y = n && n.id || null, m
        }) : "undefined" != typeof module && module ? ($ = module.id || null, module.exports = m) : window.ZeroClipboard = m
    }(), window.miniPromise = function() {
        function e() {
            t && n && setTimeout(function() {
                t.apply(r, n), t = n = null
            }, 0)
        }
        var t = null,
            n = null,
            r = {
                resolve: function() {
                    n = Array.prototype.slice.call(arguments), e()
                },
                then: function(n) {
                    t = n, e()
                }
            };
        return r
    };
var mixcloudShared = angular.module("mixcloudShared", [], ["$interpolateProvider", function(e) {
    e.startSymbol("[["), e.endSymbol("]]")
}]);
mixcloudShared.value("Date", Date);
var mixcloudSharedRun = angular.module("mixcloudSharedRun", ["mixcloudShared"]),
    mixcloudWWW = angular.module("mixcloudWWW", ["mixcloudShared", "ngSanitize"]),
    mixcloudWWWRun = angular.module("mixcloudWWWRun", ["mixcloudWWW", "mixcloudSharedRun"]);
mixcloudWWWRun.run(["lazyLoadInjector", function(e) {
        e.monkeyPatchModule(mixcloudWWW), e.monkeyPatchModule(mixcloudWWWRun)
    }]), mixcloudShared.controller("PlayerCtrl", ["$scope", "$timeout", "chainedActions", "googleAnalytics", "mHttp", "nowPlayingFactory", "settings", "webPlayer", function(e, t, n, r, o, i, a, l) {
        function s() {
            e.player.currentCloudcast = {}, e.player.error = !1, e.player.playing = !l.paused && !!l.url, e.player.buffering = l.buffering, e.player.seeking = !1, e.player.volume = l.volume, e.player.playingPreroll = l.playingPreroll, e.player.audioPosition = l.position, c(), e.player.latestSeekablePosition = l.latestSeekablePosition, e.sectionStartTimes = [], e.player.shouldHideTracklist = !1, e.player.nowPlaying = null, e.player.showTracklist = !1, e.player.isFavorited = !1, e.player.favoriteUrl = null, e.player.unfavoriteUrl = null, e.player.isReposted = !1, e.player.repostUrl = null, e.player.repostDeleteUrl = null, e.player.isFollowing = !1, e.player.followBack = !1, e.player.followUrl = null, e.player.unfollowUrl = null, e.player.addToCollectionPopoverUrl = null, e.postUrl = null, e.player.shareDialogUrl = null, e.player.waveformUrl = null, e.profileNamespace = null, e.player.favoriteChainedActionUrl = null, e.player.listenChainedActionUrl = null, e.player.hasStartedPlayback = !1, P = !1, k && (k.setPlaying(!1), k = null), e.$broadcast("chained:autoclose")
        }

        function c() {
            e.player.audioLength = (l.url ? l.duration : e.player.currentCloudcast.audioLength) || 1
        }

        function u() {
            l.url && (e.player.error = !0, e.player.buffering = !1, e.player.playing = !1)
        }

        function f() {
            k && (k.setPlaying(!1), k = null), S.onEnded()
        }

        function d() {
            l.position > 300 && e.player.audioPosition <= 300 && !P && (P = !0, n.trigger("player_listened_5_minutes")), e.player.error = !1, e.player.playing = !l.paused, e.player.audioPosition = l.position, e.player.audioLength = l.duration, e.player.latestSeekablePosition = l.latestSeekablePosition, v(l.position)
        }

        function p(t) {
            e.player.buffering = t
        }

        function h() {
            e.player.playingPreroll = l.playingPreroll
        }

        function m(t) {
            e.player.volume = t
        }

        function g(e) {
            l.url === A.url ? l.seek(e) : (b(e), x())
        }

        function v(e) {
            k && !l.playingPreroll && k.setPosition(l.position, l.duration, e)
        }

        function y() {
            k && k.setPlaying(l.playing && !l.playingPreroll)
        }

        function $(e) {
            C = o.get(a.urls.player.cloudcastDetails, {
                data: {
                    key: e
                },
                dataType: "json"
            }), C.then(w, function(n) {
                n && n.status >= 400 || (T = t(function() {
                    $(e)
                }, E))
            })
        }

        function w(t) {
            k = i(t.cloudcast.url, t.cloudcast.sections, t.lastfm, l.playing && !l.playingPreroll, t.juno, l.position, l.duration, t.should_hide_tracklist), e.player.nowPlaying = k.model, e.player.shouldHideTracklist = !!t.should_hide_tracklist, e.player.currentCloudcast = {
                mobilePlayerBarImage: t.cloudcast.pictures.mobile_player_bar,
                mobilePlayerFullImage: t.cloudcast.pictures.mobile_player_full,
                wwwThumbnail: t.cloudcast.pictures.www_thumbnail,
                widgetImage: t.cloudcast.pictures.widget,
                title: t.cloudcast.title,
                owner: t.cloudcast.owner_name,
                ownerUrl: t.cloudcast.owner_url,
                hovercardUrl: t.cloudcast.hovercard_url,
                url: t.cloudcast.url,
                playCount: t.cloudcast.play_count,
                favoriteCount: t.cloudcast.favorite_count,
                repostCount: t.cloudcast.repost_count,
                audioLength: t.cloudcast.audio_length || 1,
                shareUrl: t.cloudcast.share_url,
                embedCode: t.cloudcast.embed_code,
                id: t.cloudcast.id,
                emailShareUrl: t.cloudcast.email_share_url,
                twitterShareUrl: t.cloudcast.twitter_share_url,
                gplusShareUrl: t.cloudcast.gplus_share_url,
                tumblrShareUrl: t.cloudcast.tumblr_share_url,
                featuringArtists: t.cloudcast.featuring_artist_list,
                moreFeaturingArtists: t.cloudcast.more_featuring_artists,
                primaryColor: t.cloudcast.primary_color
            }, c(), t.cloudcast.sections.length && 0 === t.cloudcast.sections[0].start_time && (e.sectionStartTimes = t.cloudcast.sections.map(function(e) {
                return e.start_time
            })), e.player.isFavorited = !!t.is_favorited, e.player.favoriteUrl = t.favorite_url, e.player.unfavoriteUrl = t.unfavorite_url, e.player.isReposted = !!t.is_reposted, e.player.repostUrl = t.repost_url, e.player.repostDeleteUrl = t.repost_delete_url, e.player.isFollowing = !!t.is_following, e.player.followBack = !!t.follow_back, e.player.followUrl = t.follow_url, e.player.hideFollow = t.hide_follow, e.player.unfollowUrl = t.unfollow_url, e.player.addToCollectionPopoverUrl = t.add_to_collection_popover_url, e.postUrl = t.comment_post_url, e.player.shareDialogUrl = t.share_dialog_url, e.player.waveformUrl = t.waveform_url, e.profileNamespace = t.profile_namespace, e.player.favoriteChainedActionUrl = t.favorite_chained_action, e.player.listenChainedActionUrl = t.listen_chained_action
        }

        function b(e) {
            A = angular.extend({}, A, {
                start_seconds: e
            })
        }

        function x() {
            A.restricted_reason || (l.play(A), e.player.hasStartedPlayback = !0, e.player.playerStarted = !0, r.trackEvent("cloudcast", "play"))
        }
        var S = this,
            k = null,
            P = !1,
            C = null,
            T = null,
            E = 1e4;
        e.soundExchange = {}, e.player = {
            toggleTracklist: function() {
                e.player.nowPlaying && e.player.nowPlaying.displayTracklist.length && (e.player.showTracklist = !e.player.showTracklist)
            },
            hasFormatSupport: "html5" !== l.playerType || l.hasFormatSupport,
            playerStarted: !1,
            playAttempted: !1,
            togglePlayClick: function() {
                return e.player.playAttempted = !0, e.player.error ? (l.retry(), void 0) : l.url !== A.url ? (x(), void 0) : (l.togglePlay(), void 0)
            },
            togglePlayFastClick: function() {
                return e.player.error || l.url !== A.url ? !1 : (e.player.togglePlayClick(), !0)
            }
        }, s(), l.on("error", u, !0), l.on("buffering", p, !0), l.on("playStateChanged", d, !0), l.on("ended", f, !0), l.on("volume", m, !0), l.on("playing playingPreroll", y, !0), l.on("playingPreroll", h, !0), e.$on("$destroy", function() {
            e.$emit("player:title", null), l.off("error", u), l.off("buffering", p), l.off("playStateChanged", d), l.off("ended", f), l.off("volume", m), l.off("playing playingPreroll", y), l.off("playingPreroll", h)
        }), S.onEnded = angular.noop, e.$watch("player.volume", function(e) {
            l.volume = e
        }), e.$on("slider:start", function() {
            e.player.seeking = !0
        }), e.$on("slider:stop", function(t, n) {
            e.player.seeking = !1, g(n)
        }), e.$on("slider:position", function(e, t) {
            v(t)
        }), e.$watch(function() {
            return !l.paused && !e.player.error && l.url && e.player.currentCloudcast && e.player.currentCloudcast.title
        }, function(t) {
            t && (t += " (" + e.player.currentCloudcast.owner + ")"), e.$emit("player:title", t || null)
        }), S.onPlayEvent = function(e) {
            S.load({
                playerInfo: e,
                startPlaying: !0
            })
        }, e.$on("player:play", function(e, t) {
            (t.length || t.url !== A.url) && S.onPlayEvent.apply(S, Array.prototype.slice.call(arguments, 1))
        }), S.play = function() {
            (l.url !== A.url || l.paused) && e.player.togglePlayClick()
        };
        var A = {};
        S.load = function(n) {
            l.pause(), s(), t.cancel(T), o.cancel(C), A = n.playerInfo, n.cloudcastDetails ? w(n.cloudcastDetails) : $(A.url), n.positionState && n.positionState.position && (e.player.audioLength = n.positionState.duration || 1, e.player.latestSeekablePosition = e.player.audioLength, e.player.audioPosition = Math.min(n.positionState.position, n.positionState.duration), b(e.player.audioPosition)), e.webPlayer.playerOpen = !0, n.startPlaying && x()
        }, e.$on("ajaxtoggle:togglechange", function(t, n, r) {
            "player_follow" === r && (e.player.isFollowing = n)
        }), e.addOne = function(e) {
            return e + 1
        }
    }]), mixcloudShared.directive("mAjaxToggle", ["$injector", "$parse", "$rootScope", "$timeout", "addTouchClickListener", "chainedActions", "mHttp", "prerequisites", "settings", "sourceTracking", "throttle", function(e, t, n, r, o, i, a, l, s, c, u) {
        return {
            scope: !0,
            controller: function() {},
            link: function(r, f, d, p) {
                function h() {
                    r.toggled = "mToggled" in d && "false" !== d.mToggled
                }

                function m() {
                    b = d.mAjaxToggleCount && parseInt(d.mAjaxToggleCount, 10), !b || isNaN(b) ? b = 0 : r.toggled && (b -= 1), g()
                }

                function g() {
                    r.toggleCount = b + (r.toggled ? 1 : 0)
                }

                function v(e, t) {
                    var n = {};
                    d.mRef && (n.ref = d.mRef), r.sourceDetail ? (n.source_detail = r.sourceDetail, n.source = "mixcloud.com") : r.profileNamespace && c.getSource(r.profileNamespace) ? (n.source = c.getSource(r.profileNamspace), n.source_detail = c.getSourceDetail(r.profileNamespace)) : (n.source_detail = "", n.source = "mixcloud.com"), a({
                        method: t,
                        url: e,
                        data: n
                    }).then(function() {
                        r.$emit("ajaxtoggle:toggle", r.toggled, d.mAjaxToggleType)
                    }, function() {
                        r.toggled = !r.toggled
                    })
                }
                var y = u(function() {
                        r.toggle()
                    }, 300),
                    $ = null;
                if ("mToggleActionOn" in d && d.mToggleActionOn && ($ = t(d.mToggleActionOn)), o(f, function() {
                        return r.$apply(function() {
                            y()
                        }), !1
                    }), d.$observe("mToggled", h), d.$observe("mAjaxToggle", h), d.$observe("mAjaxToggleUrlOn", h), h(), p.prerequisites = p.prerequisites || [], !("mLoggedInOnly" in d)) {
                    var w = e.get("login");
                    p.prerequisites.push(w.requireLoggedIn), d.mToggleOnHash && !w.loggedIn() && r.$watch(function() {
                        return s.pageState.initialHash
                    }, function(e) {
                        e !== d.mToggleOnHash || r.toggled || r.toggle()
                    })
                }
                d.$observe("mAjaxToggleCount", m);
                var b;
                m(), r.$on("ajaxtoggle:sync", function(e, t, n, o, i) {
                    n === d.mAjaxToggle && o === d.mAjaxToggleUrlOn && i === d.mAjaxToggleUrlOff && (r.toggled = t)
                }), r.$on("ajaxtoggle:togglemany", function(e, t, n) {
                    d.mAjaxToggleType === n && r.toggled === t && r.toggle()
                }), r.$watch("toggled", function() {
                    g(), r.$emit("ajaxtoggle:togglechange", r.toggled, d.mAjaxToggleType), n.$broadcast("ajaxtoggle:sync", r.toggled, d.mAjaxToggle, d.mAjaxToggleUrlOn, d.mAjaxToggleUrlOff)
                });
                var x = !1;
                r.toggle = function() {
                    x || (x = !0, l.check(p.prerequisites).then(function() {
                        x = !1, r.toggled = !r.toggled, "mAjaxToggle" in d && d.mAjaxToggle ? v(d.mAjaxToggle, r.toggled ? "POST" : "DELETE") : v(r.toggled ? d.mAjaxToggleUrlOn : d.mAjaxToggleUrlOff, "POST"), r.toggled && ("mChainedActionOn" in d && d.mChainedActionOn && i.trigger(d.mChainedActionOn), $ && $(r))
                    }, function() {
                        x = !1
                    }))
                }
            }
        }
    }]), mixcloudShared.directive("mChainedAction", ["$timeout", "chainedActions", "mHttp", "trackEvent", function(e, t, n, r) {
        return {
            scope: !0,
            link: function(o, i, a) {
                function l() {
                    a.mChainedActionUrl && (o.modalsHighlander ? (f = o.modalsHighlander.acquire(), f.releasePromise.then(function() {
                        f = null, c("modalclose")
                    }), f.acquirePromise.then(s)) : s())
                }

                function s() {
                    u = n.load(i, o, a.mChainedActionUrl), u.then(function() {
                        i.removeClass("ng-hide"), "mChainedActionNoCenter" in a || (i.outerWidth ? i.css("margin-left", -i.outerWidth() / 2 + "px") : i.css("margin-left", -i.width() / 2 + "px")), r(t.EVENT_NAME, "show", a.mChainedAction)
                    })
                }

                function c(e) {
                    n.cancel(u), i.addClass("ng-hide"), i.empty(), e && r(t.EVENT_NAME, e, a.mChainedAction), f && f.release()
                }
                o.chainedAction = {
                    delayedCloseAfterInteraction: function() {
                        e(function() {
                            c("interact")
                        }, 1e3)
                    },
                    closeAfterInteraction: function() {
                        c("interact")
                    },
                    close: function() {
                        c("close")
                    },
                    autoClose: function() {
                        c()
                    }
                }, i.on("$destroy", function() {
                    n.cancel(u), t.off(a.mChainedAction, l)
                }), t.on(a.mChainedAction, l);
                var u = null,
                    f = null;
                o.$on("chained:autoclose", o.chainedAction.autoClose), o.$on("chained:closeAfterInteraction", o.chainedAction.closeAfterInteraction), o.$on("ajaxtoggle:toggle", o.chainedAction.closeAfterInteraction)
            }
        }
    }]), mixcloudShared.directive("mChProtect", ["$document", "$timeout", function(e, t) {
        return {
            scope: {
                confirmed: "=mChProtect"
            },
            link: function(e, n) {
                function r() {
                    t.cancel(a)
                }

                function o() {
                    r(), e.$apply(function() {
                        e.confirmed = "y"
                    })
                }

                function i() {
                    n.off("keydown change click", i), a = t(function() {
                        o()
                    }, 1e3)
                }
                var a = null;
                e.confirmed = "n", n.on("$destroy", r), n.on("keydown change click", i)
            }
        }
    }]), mixcloudShared.directive("mClick", ["$parse", "addTouchClickListener", "prerequisites", "throttle", function(e, t, n, r) {
        var o = 300;
        return {
            controller: function() {},
            link: function(i, a, l, s) {
                var c = e(l.mClick),
                    u = r(function() {
                        i.$apply(function() {
                            n.check(s.prerequisites).then(function() {
                                c(i)
                            })
                        })
                    }, o);
                t(a, function() {
                    return u(), "mStopPropagation" in l ? !1 : void 0
                })
            }
        }
    }]), mixcloudShared.directive("mClickEventTracking", ["addTouchClickListener", "throttle", "trackEvent", function(e, t, n) {
        var r = 300;
        return function(o, i, a) {
            a.mCategory && a.mAction && e(i, t(function() {
                n(a.mCategory, a.mAction, a.mLabel)
            }, r))
        }
    }]), mixcloudShared.directive("mClickGoal", ["addTouchClickListener", "experiments", "throttle", function(e, t, n) {
        var r = 300;
        return function(o, i, a) {
            e(i, n(function() {
                t.goal(a.mClickGoal)
            }, r))
        }
    }]), mixcloudShared.directive("mClickSelect", function() {
        return function(e, t) {
            t.on("click", function() {
                t.select()
            })
        }
    }), mixcloudShared.directive("mCloudcastList", ["$window", "safeApply", "throttle", function(e, t, n) {
        return function(r, o, i) {
            function a() {
                var e = f.children().length * u,
                    t = o.width();
                f.css("width", e), h = e > t ? -Math.ceil((e - t) / u) * u : 0, c()
            }

            function l() {
                p -= u, c()
            }

            function s() {
                p += u, c()
            }

            function c() {
                p = Math.min(0, Math.max(h, p)), f.css("left", p + "px"), r.cloudcastList.backDisabled = 0 === p, r.cloudcastList.nextDisabled = p === h
            }
            var u = "mCloudcastWidth" in i ? parseInt(i.mCloudcastWidth, 10) : 110,
                f = o.find("[m-list-container]"),
                d = n(function() {
                    t(r, a)
                }, 100);
            $(e).on("resize", d), o.on("$destroy", function() {
                $(e).off("resize", d)
            }), r.$on("cloudcast_list:set_width", function() {
                e.requestAnimationFrame(a)
            }), r.cloudcastList = {
                backDisabled: !0,
                nextDisabled: !0,
                next: l,
                back: s
            };
            var p = 0,
                h = 0;
            "mCloudcastListSetWidth" in i && a()
        }
    }]), mixcloudShared.directive("mContents", ["$compile", "navigation", function(e, t) {
        return {
            scope: !0,
            link: function(n, r, o) {
                function i(t, o) {
                    a.scope().$destroy(), a.remove(), a = $("<div m-contents-inner></div>").append(t).appendTo(r), o.then(function() {
                        e(a)(n)
                    })
                }
                var a = r.children("[m-contents-inner]");
                t.content.on(o.mContents, i), n.$on("$destroy", function() {
                    t.content.off(o.mContents, i)
                })
            }
        }
    }]), mixcloudShared.directive("mContentsInner", function() {
        return {
            scope: !0,
            link: angular.noop
        }
    }), mixcloudShared.directive("mFacebookShare", ["facebook", "mHttp", function(e, t) {
        return {
            link: function(n, r, o) {
                n.facebookShare = function() {
                    var n = e.share({
                        url: o.mFacebookShare,
                        ref: o.mRef,
                        popup: "mFacebookPopup" in o
                    });
                    n.then(function(e) {
                        t.post(o.mTrackUrl, {
                            data: {
                                post_id: e,
                                content_type: o.mContentType,
                                content_id: o.mContentId,
                                ref: o.mRef
                            },
                            dataType: "json"
                        })
                    })
                }
            }
        }
    }]), mixcloudShared.directive("mFocus", ["$timeout", function(e) {
        return function(t, n, r) {
            var o = t.$eval(r.mFocus);
            t.$watch(r.mFocus, function(t) {
                t !== o && (o = t, t ? e(function() {
                    n.focus()
                }, 0, !1) : n.blur())
            })
        }
    }]), mixcloudShared.directive("form", [function() {
        return {
            restrict: "E",
            link: function(e, t, n) {
                n.name && n.action && (e.$eval(n.name).action = n.action)
            }
        }
    }]), mixcloudShared.directive("mGoogleInteractivePost", ["googlePlus", function(e) {
        return {
            link: function(t, n, r) {
                e.interactivePost(n[0], {
                    contenturl: r.mGoogleInteractivePost,
                    clientid: "719113321940-ov9ukfh0ok0sdn4l3dq8g3dl9vr805l5.apps.googleusercontent.com",
                    cookiepolicy: "single_host_origin",
                    calltoactionlabel: "LISTEN",
                    calltoactionurl: r.mGoogleInteractivePost
                })
            }
        }
    }]),
    function() {
        function e(e, t, n) {
            e.requireLoggedIn().then(function(e) {
                n = n || e, n && t.navigate(n)
            }, function() {
                t.navigate("/")
            })
        }
        mixcloudShared.directive("mLoginButton", ["addTouchClickListener", "login", "navigation", function(t, n, r) {
            return function(o, i) {
                t(i, function() {
                    e(n, r)
                })
            }
        }]), mixcloudShared.directive("mLoginNow", ["$timeout", "login", "navigation", function(t, n, r) {
            return function(o, i, a) {
                t(function() {
                    e(n, r, a.mLoginNow)
                })
            }
        }])
    }(), mixcloudShared.directive("mLogoutButton", ["addTouchClickListener", "login", function(e, t) {
        return function(n, r) {
            e(r, function() {
                t.logout()
            })
        }
    }]), mixcloudShared.directive("mNextPageUrl", ["$compile", "$window", "afterFirstPaint", "debouncedScrollEvent", "mHttp", "scrolling", "throttle", function(e, t, n, r, o, i, a) {
        var l = $(t);
        return {
            require: "^?mMasonry",
            link: function(s, c, u, f) {
                function d() {
                    x ? r.off(p) : w.off("scroll", m)
                }

                function p() {
                    if (v) {
                        var e;
                        e = x ? i.getScrollTop() + (t.innerHeight ? t.innerHeight : l.height()) : w.offset().top + w.height(), c.is(":visible") && c.offset().top - y < e && (d(), h())
                    }
                }

                function h() {
                    g || (g = !0, o.get(u.mNextPageUrl, {
                        data: {
                            list: u.mIdentifier || "main",
                            _ajax: 1
                        }
                    }).then(function(t) {
                        var n = $(t);
                        f ? (c.remove(), f.addItems(n)) : x || w.is("[m-scroll-only]") ? b.length ? (b.append(n), c.remove(), e(n)(s)) : (c.parent().after(n), c.remove(), e(n)(s)) : (c.remove(), w.append(n), e(n)(s))
                    }))
                }
                var m, g = !1,
                    v = !1,
                    y = u.mTriggerDistance && parseInt(u.mTriggerDistance, 10) || 300,
                    w = c.closest("[m-infinite-scroll-container]"),
                    b = c.closest("[m-item-container]"),
                    x = !w.length;
                x ? r.on(p) : (m = a(p, 250), w.on("scroll", m)), n(function() {
                    v = !0, p()
                }), c.on("$destroy", d)
            }
        }
    }]), mixcloudShared.controller("mPlayerTimeCtrl", ["$scope", "settings", function(e, t) {
        e.timeRemaining = function() {
            return e.player.audioLength - e.sliderAudioPosition
        };
        var n = !1;
        e.$watch("player.audioPosition", function(t) {
            n || e.player && e.player.playingPreroll || (e.sliderAudioPosition = t || 0)
        }), e.$watch("sliderAudioPosition", function(t) {
            e.$emit("slider:position", t)
        }), this.seekRestriction = t.player && t.player.seekRestriction, this.onStartSlide = function() {
            n = !0, e.$emit("slider:start")
        }, this.onStopSlide = function() {
            n = !1, "forwards_only" === this.seekRestriction && e.sliderAudioPosition <= e.player.audioPosition || e.$emit("slider:stop", e.sliderAudioPosition)
        }, this.onSlide = function(t) {
            e.sliderAudioPosition = t * e.player.latestSeekablePosition
        }, this.getMinSeekPosition = function() {
            return e.player.audioPosition / e.player.latestSeekablePosition
        }
    }]), mixcloudShared.directive("mPlayerTime", function() {
        return {
            scope: !0,
            controller: "mPlayerTimeCtrl"
        }
    }), mixcloudShared.directive("mSliderButton", ["$document", "safeApply", "webPlayer", function(e, t, n) {
        return {
            require: "^mPlayerTime",
            link: function(r, o, i, a) {
                function l() {
                    e.off("touchend mouseup", l).off("touchmove mousemove", s), r.$apply(function() {
                        a.onStopSlide()
                    })
                }

                function s(e) {
                    var t, n = (u(e) - m.left - y) / h,
                        o = 1 / (Math.max(Math.abs(f(e) - m.top) / 4 - 30, 0) || 1);
                    return "forwards_only" === a.seekRestriction ? (t = a.getMinSeekPosition(), t - p > n ? r.soundExchange.showSeekWarning || r.$apply(function() {
                        r.soundExchange.showSeekWarning = !0
                    }) : r.soundExchange.showSeekWarning && r.$apply(function() {
                        r.soundExchange.showSeekWarning = !1
                    }), n = Math.min(Math.max(n, t), 1)) : n = Math.min(Math.max(n, 0), 1), n = v + (n - v) * o, n !== v && (v = n, r.$apply(function() {
                        a.onSlide(v)
                    })), !1
                }

                function c(t) {
                    return t.which && t.which > 1 || t.metaKey || t.ctrlKey ? void 0 : r.player && r.player.playingPreroll ? !1 : (r.$apply(function() {
                        a.onStartSlide()
                    }), t.target === o[0] && (y = u(t) - (o.offset().left + o.width() / 2)), m = g.offset(), m.top += g.height() / 2, h = g.width(), p = 50 / h, s(t), e.on("touchend mouseup", l).on("touchmove mousemove", s), !1)
                }

                function u(e) {
                    return e.touches && e.touches.length > 0 ? e.touches[0].pageX : e.pageX
                }

                function f(e) {
                    return e.touches && e.touches.length > 0 ? e.touches[0].pageY : e.pageY
                }

                function d(e) {
                    "forwards_only" === e && t(r, function() {
                        r.soundExchange.showSeekWarning = !0
                    })
                }
                var p = .1;
                "mAlwaysAllowSeek" in i && (a.seekRestriction = null), n.on("seekRestriction", d), o.on("$destroy", function() {
                    n.off("seekRestriction", d)
                }), o.on("selectstart", function() {
                    return !1
                });
                var h, m, g = o.closest("[m-slider-container]"),
                    v = 0,
                    y = 0;
                o.on("touchstart", c), g.on("touchstart", function() {
                    return !1
                }), g.on("mousedown", c)
            }
        }
    }]), mixcloudShared.directive("mPlayerPlayButton", function() {
        return function(e, t, n) {
            t.on("fastclick click", function(t) {
                return "fastclick" === t.type ? e.$apply(function() {
                    e.player.togglePlayFastClick() && t.preventGhostClick && t.preventGhostClick()
                }) : e.$apply(function() {
                    e.player.togglePlayClick()
                }), "mStopPropagation" in n ? !1 : void 0
            })
        }
    }), mixcloudShared.directive("mRefTracking", ["refTracking", function(e) {
        return function(t, n, r) {
            n.on("click", function() {
                e.setLinkRef(r.mRefCategory, r.mRefTracking)
            })
        }
    }]), mixcloudShared.directive("mRequireLoggedIn", ["login", "prerequisites", function(e, t) {
        return t.directive(function() {
            return e.requireLoggedIn
        })
    }]), mixcloudShared.directive("mSelectedLinkClass", ["$window", function(e) {
        return {
            scope: !0,
            link: function(t, n, r) {
                function o(e, t) {
                    t === i ? n.addClass(r.mSelectedLinkClass) : n.removeClass(r.mSelectedLinkClass)
                }
                var i = r.href.replace(/#.*$/, "");
                (t.navigation.nextUrl === i || !t.navigation.nextUrl && e.location.pathname + e.location.search === i) && n.addClass(r.mSelectedLinkClass), t.$on("navigation:start", o), t.$on("navigation:cancel", o), t.$on("navigation:end", o), n.on("fastclick click", function() {
                    n.addClass(r.mSelectedLinkClass)
                })
            }
        }
    }]), mixcloudShared.directive("mSelectedChildLinkClass", ["$window", function(e) {
        return function(t, n, r) {
            function o() {
                e.requestAnimationFrame(function() {
                    n.find("a." + r.mSelectedChildLinkClass).length ? i.addClass(r.mSelectedChildLinkClass) : i.removeClass(r.mSelectedChildLinkClass)
                })
            }
            var i = n.find("[m-selected-child-link-target]");
            t.$on("navigation:start", o), t.$on("navigation:cancel", o), t.$on("navigation:end", o), t.$on("movetodropdown:changed", o), o()
        }
    }]), mixcloudShared.directive("mShowMore", ["$window", "afterFirstPaint", function(e, t) {
        return {
            scope: !0,
            require: "?mBindHtml",
            link: function(n, r, o, i) {
                function a() {
                    null === s && (s = r.height(), r.removeClass("m-show-more-init")), n.$apply(function() {
                        n.showMore.contentsFit = (r.attr("scrollHeight") || r.prop("scrollHeight")) <= s
                    })
                }
                n.showMore = {
                    shown: !1,
                    contentsFit: !0
                };
                var l = r.find("[m-show-more-container]");
                l.length || (l = r), l.on("fastclick click", function(e) {
                    return n.showMore.contentsFit || $(e.target).is("a") ? void 0 : (n.$apply(function() {
                        n.showMore.shown = !n.showMore.shown
                    }), e.preventGhostClick && e.preventGhostClick(), !1)
                });
                var s = null;
                i ? i.$render = function(t) {
                    r.html(t), e.requestAnimationFrame(a)
                } : t(a)
            }
        }
    }]), mixcloudShared.directive("mSourceDetail", function() {
        return {
            scope: !0,
            link: function(e, t, n) {
                e.sourceDetail = n.mSourceDetail
            }
        }
    }), mixcloudShared.directive("mStopPropagation", function() {
        return function(e, t, n) {
            t.on(n.mStopPropagation, function(e) {
                e.stopPropagation()
            })
        }
    }), angular.forEach(["width", "left"], function(e) {
        var t = "mStyle" + e.charAt(0).toUpperCase() + e.slice(1);
        mixcloudShared.directive(t, function() {
            return function(n, r, o) {
                n.$watch(o[t], function(t) {
                    r.css(e, t)
                })
            }
        })
    }), mixcloudShared.directive("mSubmitButton", ["addTouchClickListener", "throttle", function(e, t) {
        var n = 300;
        return {
            link: function(r, o, i) {
                e(o, t(function() {
                    (!i.mConfirm || confirm(i.mConfirm)) && o.closest("form").submit()
                }, n))
            }
        }
    }]), mixcloudShared.directive("mSubmit", ["$parse", "prerequisites", "safeApply", function(e, t, n) {
        return {
            controller: function() {},
            link: function(r, o, i, a) {
                var l = e(i.mSubmit);
                o.on("submit", function() {
                    return n(r, function() {
                        t.check(a.prerequisites).then(function() {
                            l(r)
                        })
                    }), !1
                })
            }
        }
    }]), mixcloudShared.directive("mSubmitOnEnter", function() {
        return {
            link: function(e, t) {
                t.on("keypress", function(e) {
                    13 === (e.which || e.keyCode) && t.closest("form").submit()
                })
            }
        }
    }),
    function() {
        function e(e, t) {
            mixcloudShared.directive(e, [function() {
                return {
                    scope: !0,
                    controller: "TooltipCtrl",
                    link: function(n, r, o, i) {
                        r.on("mouseover", function() {
                            i.showHoverTooltip(o[e], t)
                        }), r.on("mouseout", function() {
                            i.hideHoverTooltip()
                        })
                    }
                }
            }])
        }
        mixcloudShared.controller("TooltipCtrl", ["$element", "$scope", "$timeout", "positionRelative", function(e, t, n, r) {
            function o(o, i) {
                i = i || "top", r(e), a(t, n), l(t);
                var s = $('<span class="tooltip"></span>').addClass(i).text(o).appendTo(e);
                return "top" === i || "bottom" === i ? s.outerWidth ? s.css("margin-left", -s.outerWidth() / 2 + "px") : s.css("margin-left", -s.width() / 2 + "px") : s.outerHeight ? s.css("margin-top", -s.outerHeight() / 2 + "px") : s.css("margin-top", -s.height() / 2 + "px"), s
            }

            function i(e) {
                t[e] && (t[e].hide().remove(), t[e] = void 0)
            }

            function a() {
                t.tooltipTimeoutTimeout && (n.cancel(t.tooltipTimeoutTimeout), t.tooltipTimeoutTimeout = void 0), i("tooltipTimeout")
            }

            function l() {
                i("tooltipHover")
            }
            this.showHoverTooltip = function(e, n) {
                t.tooltipHover = o(e, n)
            }, this.showTimeoutTooltip = function(e) {
                t.tooltipTimeout = o(e), t.tooltipTimeoutTimeout = n(function() {
                    a(t, n)
                }, 1e3)
            }, this.hideHoverTooltip = l
        }]), e("mTooltip", "top"), e("mTooltipTop", "top"), e("mTooltipLeft", "left"), e("mTooltipRight", "right"), e("mTooltipBottom", "bottom"), mixcloudShared.directive("mTooltipOnClick", ["addTouchClickListener", function(e) {
            return {
                scope: !0,
                controller: "TooltipCtrl",
                link: function(t, n, r, o) {
                    e(n, function() {
                        o.showTimeoutTooltip(r.mTooltipOnClick)
                    })
                }
            }
        }])
    }(), mixcloudShared.filter("hmmss", function() {
        return function(e) {
            if (isNaN(e)) return "00:00";
            var t = Math.floor(e / 3600),
                n = Math.floor(e / 60) % 60,
                r = Math.floor(e) % 60;
            return 10 > n && (n = "0" + n), 10 > r && (r = "0" + r), e >= 3600 ? t + ":" + n + ":" + r : n + ":" + r
        }
    }), mixcloudShared.filter("intSi", function() {
        var e = ["k", "m", "b"];
        return function(t) {
            if (1e3 > t) return "" + t;
            for (var n = Math.pow(10, Math.floor(Math.log10(t)) - 1), r = Math.round(t / n) * n, o = 0; o < e.length; o++)
                if (r /= 1e3, 1e3 > r) return r === Math.floor(r) ? "" + r + e[o] : r.toFixed(1) + e[o]
        }
    }), mixcloudShared.filter("percentageComplete", function() {
        return function(e, t) {
            return Math.min(Math.max(0, 100 * e / t), 100) + "%"
        }
    }), mixcloudShared.factory("addTouchClickListener", [function() {
        return function(e, t) {
            e.on(e.is("a") ? "click" : "fastclick click", function(e) {
                return e.preventGhostClick && e.preventGhostClick(), t(e)
            })
        }
    }]), mixcloudShared.factory("afterFirstPaint", ["$window", function(e) {
        return function(t) {
            e.requestAnimationFrame(function() {
                e.requestAnimationFrame(function() {
                    t()
                })
            })
        }
    }]), mixcloudShared.factory("assetManager", ["$document", "$q", "$rootScope", "safeApply", "waitForLoad", function($document, $q, $rootScope, safeApply, waitForLoad) {
        function executeInlineScripts($html) {
            $html.find("script").filter(function() {
                var e = $(this),
                    t = e.attr("type");
                return !(e.is("[src]") || t && "text/javascript" !== t)
            }).each(function() {
                var code = $.trim($(this).html());
                code.length && eval(code)
            })
        }

        function getAssetUrlsFromHtml(e, t, n, r) {
            return e.find(t).filter(function() {
                var e = $(this),
                    t = e.attr("type");
                return !(!e.attr(n) || t && t !== r)
            }).map(function() {
                return $(this).attr(n)
            }).toArray()
        }

        function getAssetUrls(e) {
            return {
                js: getAssetUrlsFromHtml(e, "script", "src", "text/javascript"),
                css: getAssetUrlsFromHtml(e, 'link[rel="stylesheet"]', "href", "text/css")
            }
        }

        function getUrlsToLoad(e) {
            var t = {};
            return angular.forEach(e, function(e, n) {
                var r = [],
                    o = $q.defer(),
                    i = [];
                e.forEach(function(e) {
                    var t = promiseKeyUrl(e);
                    return promises[n].hasOwnProperty(t) ? (r.push(promises[n][t]), !1) : (r.push(o.promise), promises[n][t] = o.promise, i.push(e), void 0)
                }), t[n] = {
                    urlsToLoad: i,
                    deferred: o,
                    promise: $q.all(r)
                }
            }), t
        }

        function loadAssets(e) {
            var t = {};
            return angular.forEach(e, function(e, n) {
                e.urlsToLoad.length ? LazyLoad[n](e.urlsToLoad, function() {
                    safeApply($rootScope, e.deferred.resolve)
                }) : e.deferred.resolve(), t[n] = e.promise
            }), t
        }

        function promiseKeyUrl(e) {
            var t = e.match(BUNDLE_RE);
            return t ? e.replace(t[1], "") : e
        }
        var promises = {
                js: {},
                css: {}
            },
            enabled = !1,
            preloads = [],
            BUNDLE_RE = /\/media\/js2\/[a-z_]+(\.[a-f0-9]{32})\.js$/;
        return {
            init: function() {
                var e = getUrlsToLoad(getAssetUrls($document));
                angular.forEach(e, function(e) {
                    e.deferred.resolve()
                }), enabled = !0, preloads.forEach(this.preload)
            },
            load: function(e) {
                var t = loadAssets(getUrlsToLoad(getAssetUrls(e)));
                return t.js.then(function() {
                    executeInlineScripts(e)
                }), t
            },
            preload: function(e) {
                return enabled ? (waitForLoad.then(function() {
                    loadAssets(getUrlsToLoad(e))
                }), void 0) : (preloads.push(e), void 0)
            }
        }
    }]), mixcloudShared.factory("beforeUnload", ["$window", "callbacks", function(e, t) {
        function n() {
            var e = i.getMessageFromHandlers(i, o);
            return e ? e : void 0
        }
        var r = $(e),
            o = t({
                firstItemAddedCallback: function() {
                    r.on("beforeunload", n)
                },
                lastItemRemovedCallback: function() {
                    r.off("beforeunload", n)
                }
            }),
            i = o.listenable();
        return i.getMessageFromHandlers = function(e, t) {
            return t.call(e).reduce(function(e, t) {
                return e || t
            }, null)
        }, i
    }]), mixcloudShared.factory("callbacks", ["$rootScope", "safeApply", function(e, t) {
        return function(n) {
            var r = [];
            return n = n || {}, {
                call: function(n) {
                    var o = Array.prototype.slice.call(arguments, 1),
                        i = [];
                    return angular.forEach(r, function(r) {
                        i.push(r.fn.apply(n, o)), r.invokeApply && t(e)
                    }), i
                },
                on: function(e, t) {
                    n.firstItemAddedCallback && 0 === r.length && n.firstItemAddedCallback(), r.push({
                        fn: e,
                        invokeApply: !!t
                    })
                },
                off: function(e) {
                    for (var t = 0, o = null; t < r.length; t++)
                        if (r[t].fn === e) {
                            o = t;
                            break
                        }
                    null !== o && (r.splice(o, 1), n.lastItemRemovedCallback && 0 === r.length && n.lastItemRemovedCallback())
                },
                listenable: function() {
                    return {
                        on: this.on,
                        off: this.off
                    }
                }
            }
        }
    }]), mixcloudShared.factory("cancellableTimeout", function() {
        return function() {
            var e = null,
                t = {
                    schedule: function(n, r) {
                        t.cancel(), e = setTimeout(function() {
                            e = null, n()
                        }, r)
                    },
                    scheduleIfInactive: function(t, n) {
                        null === e && this.schedule(t, n)
                    },
                    cancel: function() {
                        null !== e && (clearTimeout(e), e = null)
                    }
                };
            return t
        }
    }), mixcloudShared.factory("chainedActions", ["callbacks", function(e) {
        var t = {};
        return {
            on: function(n, r) {
                n in t || (t[n] = e({
                    lastItemRemovedCallback: function() {
                        delete t[n]
                    }
                })), t[n].on(r, !0)
            },
            off: function(e, n) {
                e in t && t[e].off(n)
            },
            trigger: function(e) {
                e in t && t[e].call(this)
            },
            EVENT_NAME: "chainedaction2"
        }
    }]), mixcloudShared.factory("ch", ["$document", "$q", "mHttp", "propertyObject", "settings", function(e, t, n, r, o) {
        return function(i) {
            i && (window._phantom || window.callPhantom || i(r, t).then(function(t) {
                e[0].cookie = "ch=" + t + ";path=/", n.post(o.urls.ch)
            }))
        }
    }]), mixcloudShared.factory("debouncedScrollEvent", ["$window", "callbacks", "scrolling", "throttle", function(e, t, n, r) {
        function o() {
            var e = n.getScrollTop();
            null !== a && Math.abs(a - e) < 5 || (a = e, s.call())
        }
        var i = $(e),
            a = null,
            l = r(o, 250),
            s = t({
                firstItemAddedCallback: function() {
                    i.on("scroll", l)
                },
                lastItemRemovedCallback: function() {
                    i.off("scroll", l)
                }
            });
        return {
            on: s.on,
            off: s.off
        }
    }]), mixcloudShared.factory("debounce", function() {
        return function(e, t) {
            var n = null,
                r = angular.isFunction(t) ? t : function() {
                    return t
                },
                o = function() {
                    var t = this,
                        i = Array.prototype.slice.call(arguments);
                    o.cancel(), n = setTimeout(function() {
                        n = null, e.apply(t, i)
                    }, r())
                };
            return o.cancel = function() {
                null !== n && (clearTimeout(n), n = null)
            }, o.running = function() {
                return null !== n
            }, o
        }
    }), mixcloudShared.factory("dfp", ["$compile", "$injector", "$rootScope", "$timeout", "$window", "Date", "settings", "uniqueId", function(e, t, n, r, o, i, a, l) {
        function s() {
            function e(e) {
                for (var n = 0; n < t.length; n++)
                    if (e(t[n])) return t[n];
                return null
            }
            var t = [];
            return {
                add: function(e) {
                    t.push(e);
                    var n = $("[m-dfp-slot]").filter(function() {
                        var e = $(this),
                            t = e.data("deferred");
                        return "maybe" === t && (e.trigger("dfp:check_deferred"), t = e.data("deferred")), !(e.data("added") || "yes" === t)
                    }).length;
                    n || u()
                },
                remove: function(e) {
                    var n = t.indexOf(e);
                    n >= 0 && t.splice(n, 1)
                },
                getByWindow: function(t) {
                    return e(function(e) {
                        return e.getWindow() == t
                    })
                },
                getByDfpSlot: function(t) {
                    return e(function(e) {
                        return e.dfpSlot === t
                    })
                },
                forEachUnrendered: function(e) {
                    angular.forEach(t, function(t) {
                        t.rendered || e(t)
                    })
                }
            }
        }

        function c(e, t, o) {
            function i() {
                if (!a()) {
                    var e = u.find("iframe");
                    e.length ? a() || (e.on("load", function() {
                        a()
                    }), d = r(a, 25, !1)) : d = r(i, 50, !1)
                }
            }

            function a() {
                return "none" === u.css("display") ? (o.closest("[m-dfp-slot-container]").hide(), o.hide(), !0) : !1
            }
            var s = "dfp-" + l() + "-" + e,
                u = $('<div id="' + s + '"></div>').appendTo(o),
                d = null,
                p = null,
                h = !1;
            return o.data("added", !0), {
                rendered: !1,
                elementId: s,
                dfpSlot: null,
                dfpSlotId: e,
                sizes: t,
                getWindow: function() {
                    if (!p) {
                        var e = u.find("iframe:visible");
                        p = e.length && e[0].contentWindow || null
                    }
                    return p
                },
                destroy: function() {
                    r.cancel(d), v && this.getWindow() && this.getWindow() === v && n.skin === y && f()
                },
                resize: function(e, t) {
                    var n = {
                        width: e,
                        height: t
                    };
                    o.css(n), u.find("iframe:visible").css(n), h = !0
                },
                check: i,
                onRenderEnded: function() {
                    if (r.cancel(d), a(), !h && t.length > 1) {
                        var e = u.find("iframe:visible");
                        e.length && this.resize(e.width(), e.height())
                    }
                },
                reset: function() {
                    return this.resize({
                        width: t[0][0],
                        height: t[0][0]
                    }), this.destroy(), u.remove(), c(e, t, o)
                }
            }
        }

        function u() {
            m = i.now(), o.googletag = h = {
                cmd: []
            }, x && LazyLoad.js("//www.googletagservices.com/tag/js/gpt.js"), h.cmd.push(function() {
                S.forEachUnrendered(function(e) {
                    e.dfpSlot = h.defineSlot("/" + a.dfp.accountId + "/" + e.dfpSlotId, 1 === e.sizes.length ? e.sizes[0] : e.sizes, e.elementId).addService(h.pubads())
                }), a.pageState.dfp && a.pageState.dfp.targeting && angular.forEach(a.pageState.dfp.targeting, function(e, t) {
                    h.pubads().setTargeting(t, e)
                }), h.pubads().setTargeting("page_url", o.location.pathname), h.pubads().setTargeting("narrow", o.screen.availWidth < 1200 ? "y" : "n"), h.pubads().collapseEmptyDivs(), h.pubads().enableSingleRequest(), h.pubads().addEventListener && h.pubads().addEventListener("slotRenderEnded", function(e) {
                    var t = S.getByDfpSlot(e.slot);
                    t && t.onRenderEnded(), b = !0
                }), h.enableServices(), S.forEachUnrendered(function(e) {
                    h.display(e.elementId), e.rendered = !0, e.check()
                }), p()
            })
        }

        function f() {
            n.$apply(function() {
                n.skin = null
            }), v = null, y = null
        }

        function d(e) {
            for (var t, n = [];;) {
                if (t = g.exec(e), !t) break;
                n.push([parseInt(t[1], 10), parseInt(t[2], 10)])
            }
            return n
        }

        function p() {
            w || (w = !0, a.ads && a.ads.detect && (0 === $("#AD_google:visible, #ADoverThePlayer:visible").length ? r(function() {
                b || (t.get("googleAnalytics").trackEvent("dfp", "failed"), n.$broadcast("dfp:premium_upsell"))
            }, 300) : t.get("googleAnalytics").trackEvent("dfp", "succeeded")))
        }
        var h, m, g = /(\d+)\s*,\s*(\d+)/g,
            v = null,
            y = null,
            w = !1,
            b = !1,
            x = a.useExternalScripts,
            S = s();
        return o.mDFP = {
            resize: function(e, t) {
                var n = S.getByWindow(e);
                n && n.resize(t.width, t.height)
            },
            takeover: function(e, t) {
                v = e, y = {
                    takeover: !0,
                    url: t.backgroundImage,
                    repeat: !!t.repeat,
                    color: t.backgroundColor,
                    clickUrl: t.clickUrl
                }, n.$apply(function() {
                    n.skin = y
                })
            }
        }, {
            enable: function() {
                x = !0
            },
            directiveFactory: function(t, n, r) {
                return {
                    init: function() {
                        var o = c(r.mDfpSlot, d(r.mDfpSlotSize), n);
                        S.add(o), n.on("$destroy", function() {
                            o.destroy(), S.remove(o)
                        }), "mDfpShowUpsell" in r && t.$on("dfp:premium_upsell", function() {
                            o.destroy(), S.remove(o), n.addClass("premium-upsell-hpu").append(e('<a href="' + a.urls.premium + '" class="premium-upsell-ad" m-click-event-tracking m-category="premium_link" m-action="premium_upsell"></a>')(t))
                        })
                    }
                }
            }
        }
    }]), mixcloudShared.value("Raven", Raven), mixcloudShared.factory("$exceptionHandler", ["$injector", "$log", "$window", "Raven", function(e, t, n, r) {
        var o = null;
        return function(n) {
            if (t.error.apply(t, arguments), null === o) try {
                o = e.get("settings").sentry.tags
            } catch (i) {}
            o ? r.captureException(n, {
                tags: o
            }) : r.captureException(n)
        }
    }]), mixcloudShared.factory("experiments", ["mHttp", function(e) {
        return {
            confirm_human: function() {
                e.post("/experiments/confirm_human/")
            },
            goal: function(t) {
                e.post("/experiments/goal/" + t + "/")
            }
        }
    }]),
    function() {
        var e = miniPromise();
        window.fbAsyncInit = function() {
            e.resolve()
        }, mixcloudShared.factory("facebook", ["$q", "$rootScope", "$timeout", "safeApply", "settings", function(t, n, r, o, i) {
            var a, l = t.defer();
            a = i.facebook && i.facebook.delayLoad ? {
                then: function() {
                    var e = document.createElement("script");
                    return e.type = "text/javascript", e.src = document.location.protocol + "//connect.facebook.net/en_US/sdk.js", e.async = !0, document.getElementById("fb-root").appendChild(e), l.promise.then.apply(l.promise, Array.prototype.slice.call(arguments))
                }
            } : l.promise, e.then(function() {
                FB && (FB.init(angular.extend({
                    status: !0,
                    oauth: !0,
                    version: "v2.0"
                }, i.facebook.initParams)), n.$apply(l.resolve))
            });
            var s = {
                ready: a,
                login: function(e) {
                    return a.then(function() {
                        var r = t.defer();
                        return FB.login(function(e) {
                            e.authResponse ? r.resolve(e) : r.reject(e), o(n)
                        }, {
                            scope: e.join(",")
                        }), r.promise
                    })
                },
                logout: function() {
                    return a.then(function() {
                        var e = t.defer();
                        return FB.getLoginStatus(function(t) {
                            "connected" === t.status ? FB.logout(e.resolve) : e.resolve(), o(n)
                        }), e.promise
                    })
                },
                share: function(e) {
                    var r = t.defer();
                    return a.then(function() {
                        var t = {
                            method: "feed",
                            link: e.url,
                            ref: e.ref
                        };
                        t.ref && t.ref.length > 14 && (t.ref = t.ref.substring(0, 14), console.log("WARNING: FB ref truncated")), e.popup && (t.display = "popup"), FB.ui(t, function(e) {
                            e && e.post_id ? r.resolve(e.post_id) : r.reject(), o(n)
                        })
                    }), r.promise
                },
                addTab: function() {
                    return a.then(function() {
                        var e = t.defer();
                        return FB.ui({
                            method: "pagetab"
                        }, function(t) {
                            "length" in t.tabs_added ? e.reject() : e.resolve(t), o(n)
                        }), e.promise
                    })
                },
                getLoginStatus: function() {
                    return a.then(function() {
                        var e = t.defer();
                        return FB.getLoginStatus(function(t) {
                            t.authResponse ? e.resolve(t) : e.reject(t), o(n)
                        }), e.promise
                    })
                },
                api: function(e) {
                    var r = t.defer();
                    return FB.api(e, function(e) {
                        e.data ? r.resolve(e.data) : r.reject("Error making API call"), o(n)
                    }), r.promise
                },
                sendCloudcastListen: function(e) {
                    return a.then(function() {
                        var n = t.defer();
                        return FB.api(e.url, "post", e.params, function(e) {
                            e.id ? n.resolve(e) : n.reject(e)
                        }), n.promise
                    })
                },
                deleteCloudcastListen: function(e) {
                    return a.then(function() {
                        var n = t.defer();
                        return FB.api(e.facebookId, "delete", function(e) {
                            !e || e.error ? n.reject(e) : n.resolve(e)
                        }), n.promise
                    })
                },
                hasPermission: function(e) {
                    return s.api("/me/permissions").then(function(t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            if (r.permission === e) return "granted" === r.status
                        }
                        return !1
                    })
                },
                requestPermission: function(e) {
                    var t = i.facebook.perms.slice();
                    return t.push(e), s.login(t)
                },
                handlers: {
                    facebook_permissions: function() {
                        var e = t.defer();
                        return r(function() {
                            e.resolve({
                                success: !1
                            })
                        }), e.promise
                    }
                }
            };
            return s
        }])
    }(), mixcloudShared.factory("facebookListenFactory", ["facebook", "mHttp", "playTimer", "settings", function(e, t, n, r) {
        return function(o, i, a, l) {
            function s(e, t) {
                i = e, a = t, u()
            }

            function c(e) {
                e ? (u(), d.start()) : (d.stop(), f())
            }

            function u() {
                g || h || m || !i || !a || d.value() < 1 || r.facebook && r.facebook.post && r.facebook.post.listen && (m = e.sendCloudcastListen({
                    url: r.facebook.listenActionUrl,
                    params: {
                        song: r.facebook.shareBaseUrl + o,
                        expires_in: a ? a - i : null
                    }
                }).then(function(e) {
                    return h = e.id, m = null, t.post(r.urls.player.musicListenCreate, {
                        data: {
                            facebook_post_id: h,
                            key: o
                        }
                    }).then(function() {
                        m = null
                    })
                }, function() {
                    m = null, g = !0
                }))
            }

            function f() {
                return m ? (m.then(f), void 0) : (!h || d.value() >= p || e.deleteCloudcastListen({
                    facebookId: h
                }).then(function() {
                    t.post(r.urls.player.musicListenDelete, {
                        data: {
                            facebook_post_id: h
                        }
                    }), h = null
                }), void 0)
            }
            var d = n(),
                p = 3e5,
                h = null,
                m = null,
                g = !1;
            return l && d.start(), {
                setPosition: s,
                setPlaying: c
            }
        }
    }]), mixcloudShared.factory("featureDetection", function() {
        var e = {},
            t = {};
        return t.localStorage = function() {
            try {
                window.localStorage.setItem("m:localstoragetest", "test");
                var e = window.localStorage["m:localstoragetest"];
                return window.localStorage.removeItem("m:localstoragetest"), "test" === e
            } catch (t) {}
            return !1
        }, t.webSocket = function() {
            return window.WebSocket && window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest
        }, t.audio = function() {
            var e = document.createElement("audio");
            return e.canPlayType && e.canPlayType("audio/mpeg").replace(/no/, "") && e.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, "")
        }, t.mp3Audio = function() {
            var e = document.createElement("audio");
            return e.canPlayType && e.canPlayType("audio/mpeg").replace(/no/, "")
        }, t.pushState = function() {
            return window.history && window.history.pushState && window.history.replaceState
        }, t.retina = function() {
            return window.devicePixelRatio > 1
        }, t.canvas = function() {
            return document.createElement("canvas").getContext
        }, t.FormData = function() {
            return "FormData" in window
        }, t.fileApi = function() {
            return window.File && window.FileReader
        }, t.fileSlice = function() {
            return void 0 !== window.File && void 0 !== window.Blob && void 0 !== window.FileList && window.Blob.prototype.slice
        }, t.definePropertyOnArbitraryObject = function() {
            var e = {};
            try {
                return e.defineProperty("testProperty", {
                    get: angular.noop,
                    set: angular.noop
                }), !0
            } catch (t) {}
            return Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__
        }, t.inlineSvg = function() {
            var e = document.createElement("div");
            return e.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" === (e.firstChild && e.firstChild.namespaceURI)
        }, t.cssTransitions = function() {
            var e = document.body || document.documentElement,
                t = e.style;
            return void 0 !== t.transition || void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.MsTransition || void 0 !== t.OTransition
        }, t.xhr2 = function() {
            return "XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest
        }, {
            test: function(n) {
                return n in e || (e[n] = !!t[n]()), e[n]
            }
        }
    }), mixcloudShared.factory("flashPlayerFactory", ["$document", "$q", "$timeout", "$window", "afterFirstPaint", "propertyObject", "settings", "swfobject", "uniqueId", function(e, t, n, r, o, i, a, l, s) {
        return function(c) {
            function u(e) {
                var t = Math.min(Math.max(e, 0), 1);
                return C && d().MixcloudPlayer_volume && d().MixcloudPlayer_volume(t), t
            }

            function f(e) {
                return C && d().MixcloudPlayer_seek(e), e
            }

            function d() {
                return null === b && (b = document.getElementById(y.playerId)), b
            }

            function p() {
                if (!x) {
                    x = !0, m = $('<div class="flash-player-module"></div>').appendTo(y.container || e.find("body")), m.append('<div id="mixcloud-player-swf"></div>');
                    var t = {
                        standalone: "1",
                        playinfourl: a.urls.player.playInfo,
                        hasPriority: "true",
                        ppu: a.urls.player.ping
                    };
                    t.pskd = "false", t.psku = a.urls.player.pingSocket, y.reporting === !1 && (t.gpo = "true"), w && (t.jeep = w + "."), y.embedOnPlay || (t.pop = "true"), l.embedSWF(a.urls.player.swf, "mixcloud-player-swf", "100%", "100%", "10", !1, t, {
                        allowscriptaccess: "always",
                        wmode: "transparent"
                    }, {
                        id: y.playerId
                    }, function(e) {
                        e.success || P.reject()
                    })
                }
            }

            function h() {
                g.playing = "playing" === k && !g.buffering
            }
            var m, g = i.internalObject(),
                v = i(g),
                y = angular.extend({
                    reporting: !0,
                    embedOnPlay: !(!a.player || !a.player.embedOnPlay),
                    playerId: "mx-player-module"
                }, c),
                w = null,
                b = null,
                x = !1;
            v.playerType = "flash", y.container && y.container.on("$destroy", function() {
                v && v.unload && v.unload()
            }), y.useFlashPrefix && (w = "_flashPlayer" + s()), g.publicProperty("position", void 0, f), g.publicProperty("duration"), g.publicProperty("latestSeekablePosition"), g.publicProperty("volume", void 0, u), g.publicProperty("paused"), g.publicProperty("loading"), g.publicProperty("buffering"), g.publicProperty("playing"), g.publicProperty("currentCloudcastKey", null), g.publicProperty("playingPreroll", !1), g.publicEvent("error"), g.publicEvent("resume"), g.publicEvent("ended");
            var S;
            S = w ? r[w] = {} : r;
            var k = null;
            S.MixcloudPlayer_playbackStatus = function(e) {
                k = e, "paused" === e ? (g.paused = !0, g.playing = !1) : "playing" === e ? (g.loading = !1, g.paused = !1) : "complete" === e ? g.trigger("ended") : "errored" === e && g.trigger("error"), h()
            }, S.MixcloudPlayer_soundProgress = function(e, t, n, r, o) {
                g.duration = Math.floor(t), g.position = Math.floor(e), g.latestSeekablePosition = Math.floor(t * n / r), g.buffering = o, h()
            }, S.MixcloudPlayer_ready = function() {
                m.addClass("ready"), n(function() {
                    C = !0, T && (v.play.apply(v, T), T = null), n(function() {
                        P.resolve()
                    })
                })
            }, S.MixcloudPlayer_volume = function(e) {
                g.volume = e
            }, S.MixcloudPlayer_error = function() {
                g.buffering = !1, g.trigger("error")
            }, S.MixcloudPlayer_playbackResumed = function() {
                g.trigger("resume")
            }, S.MixcloudPlayer_playbackType = function(e, t, n) {
                g.playingPreroll = "preroll" === n
            };
            var P = t.defer(),
                C = !1,
                T = null,
                E = !1;
            return v.ready = P.promise, v.play = function(e, t) {
                return p(), g.loading = !0, C ? (g.buffering = !0, g.position = 0, g.duration = 0, g.currentCloudcastKey = e, E = !0, b = null, d().MixcloudPlayer_load(e, "NULL", t.startSeconds || "NULL", t.situation, t.playInfo || "NULL"), void 0) : (T = [e, t], void 0)
            }, v.resume = function() {
                C && d().MixcloudPlayer_play()
            }, v.pause = function() {
                C && d().MixcloudPlayer_pause()
            }, v.unload = v.stop = function() {
                C && d().MixcloudPlayer_stop(), w && delete r[w]
            }, y.embedOnPlay || o(function() {
                p()
            }), v
        }
    }]), mixcloudShared.factory("formset", function() {
        function e(e, t, n, r) {
            var o = {};
            return o[e + "-TOTAL_FORMS"] = r.length, o[e + "-INITIAL_FORMS"] = t, o[e + "-MAX_NUM_FORMS"] = n, angular.forEach(r, function(t, n) {
                angular.forEach(t, function(t, r) {
                    "$" !== r.charAt(0) && null !== t && void 0 !== t && t !== !1 && (t === !0 && (t = "on"), o[e + "-" + n + "-" + r] = t)
                })
            }), o
        }
        return e.fromJsonForm = function(t) {
            return e(t.prefix, t.INITIAL_FORMS, t.MAX_NUM_FORMS, t.forms)
        }, e
    }), mixcloudShared.factory("googleAnalytics", ["$window", "settings", "uuid", function(e, t, n) {
        e.GoogleAnalyticsObject = "ga", e.ga = e.ga || function() {
            (e.ga.q = e.ga.q || []).push(arguments)
        }, e.ga.l = 1 * new Date;
        var r = {
            pageview: function() {
                t.pageState && t.pageState.googleAnalytics && t.pageState.googleAnalytics.pageType && e.ga("set", "dimension2", t.pageState.googleAnalytics.pageType), e.ga("set", "location", e.location.protocol + "//" + e.location.hostname + e.location.pathname + e.location.search), e.ga("send", "pageview")
            },
            trackEvent: function(t, n, r) {
                e.ga("send", "event", t, n, r)
            },
            trackEcommerceTransaction: function(r, o, i, a, l, s) {
                if (t.googleAnalytics.ecommerce) {
                    var c = n();
                    e.ga("ecommerce:addTransaction", {
                        id: c,
                        revenue: r,
                        currency: o
                    }), e.ga("ecommerce:addItem", {
                        id: c,
                        name: i,
                        category: a,
                        price: l,
                        quantity: s,
                        currency: o
                    }), e.ga("ecommerce:send")
                }
            },
            trackSearch: function(t) {
                e.ga("set", "dimension2", "search"), e.ga("send", "pageview", "/search/?mixcloud_query=" + encodeURIComponent(t))
            },
            setUserId: function(t) {
                e.ga("set", "&uid", t)
            }
        };
        return t.googleAnalytics && t.googleAnalytics.account && t.useExternalScripts && (e.ga("create", t.googleAnalytics.account, "auto"), t.googleAnalytics.userId && e.ga("set", "&uid", t.googleAnalytics.userId), e.ga("require", "displayfeatures"), t.googleAnalytics.ecommerce && e.ga("require", "ecommerce", "ecommerce.js"), t.googleAnalytics.accountType && e.ga("set", "dimension1", t.googleAnalytics.accountType), t.readyPromise.then(function() {
            r.pageview()
        }), setTimeout(function() {
            LazyLoad.js("//www.google-analytics.com/analytics.js")
        }, 1)), r
    }]), mixcloudSharedRun.run(["googleAnalytics", function() {}]),
    function() {
        var e = miniPromise();
        window.googlePlusInit = function() {
            e.resolve()
        }, mixcloudShared.factory("googlePlus", ["$q", "$rootScope", "$window", function(t, n, r) {
            var o = t.defer(),
                i = null;
            e.then(function() {
                r.gapi ? (i = r.gapi, a.ready = !0, n.$apply(o.resolve)) : n.$apply(o.reject)
            });
            var a = {
                interactivePost: function(e, t) {
                    o.promise.then(function() {
                        i.interactivepost.render(e, t)
                    })
                },
                signIn: function(e) {
                    o.promise.then(function() {
                        i.auth.signIn(e)
                    })
                },
                readyPromise: o.promise,
                ready: !1
            };
            return a
        }])
    }(), mixcloudShared.factory("html5AudioWrapperFactory", ["$document", "cancellableTimeout", "propertyObject", function(e, t, n) {
        var r = !1,
            o = 0,
            i = {
                m4a: 'audio/mp4; codecs="mp4a.40.2"',
                mp3: "audio/mpeg"
            },
            a = {
                m4a: !0,
                mp3: !1
            },
            l = /\.(.{3})($|\?)/,
            s = 200,
            c = 4e3,
            u = 12,
            f = 1,
            d = 2,
            p = 0,
            h = 1,
            m = 2,
            g = 3,
            v = 4;
        return function(y) {
            function w() {
                L.loading = L.playState === h && !L.errorState, L.buffering = L.playState === m && !L.errorState, L.paused = L.playState === g
            }

            function b() {
                L.playing = !(L.playState !== v || L.seeking || et || G || L.errorState)
            }

            function x(t) {
                null === V && (V = $("<div></div>").appendTo(y || e.find("body"))), V.html("<audio>" + t.map(function(e) {
                    return '<source src="' + e + "\" type='" + i[l.exec(e)[1]] + "'></source>"
                }).join("") + "</audio>"), z = V.find("audio")[0], z.addEventListener("play", k), z.addEventListener("pause", P), z.addEventListener("canplay", C), z.addEventListener("durationchange", _), z.addEventListener("timeupdate", _), z.addEventListener("progress", _), z.addEventListener("stalled", _), z.addEventListener("error", T), z.addEventListener("ended", E), z.addEventListener("volumechange", A), z.volume = L.volume, z.load()
            }

            function S() {
                z && (z.removeEventListener("play", k), z.removeEventListener("pause", P), z.removeEventListener("canplay", C), z.removeEventListener("durationchange", _), z.removeEventListener("timeupdate", _), z.removeEventListener("progress", _), z.removeEventListener("stalled", _), z.removeEventListener("error", T), z.removeEventListener("ended", E), z.removeEventListener("volumechange", A), $(z).remove(), z = null)
            }

            function k() {
                N ? L.playState !== h && (L.playState = v) : L.playState = m, _()
            }

            function P() {
                L.playState = g, _()
            }

            function C() {
                L.playState !== g && z && z.play()
            }

            function T() {
                N && r && a[l.exec(z.currentSrc)[1]] ? F() : L.errorState = d
            }

            function E() {
                L.playState = g, X.cancel(), L.trigger("ended")
            }

            function A() {
                z && (L.volume = z.volume)
            }

            function W() {
                L.disablePropertyEvents(), L.playState = p, L.paused = !1, L.loading = !1, L.seeking = !1, L.buffering = !1, L.errorState = null, L.position = 0, L.duration = 1, L.latestSeekablePosition = 0, ot = 0, it = null, N = !1, H = null, q = 0, B = new Date, Q = 0, G = !1, L.enablePropertyEvents()
            }

            function _() {
                if (X.cancel(), z) {
                    if (L.playState === h || G) {
                        var e = z.childNodes[z.childNodes.length - 1].getAttribute("src");
                        if (e.match(/^(https?:)?\/\//i) || (e = window.location.origin + e), z.networkState === z.NETWORK_NO_SOURCE && (0 === z.childNodes.length || z.currentSrc === e)) return L.errorState = f, void 0;
                        (z.readyState === z.HAVE_ENOUGH_DATA && z.networkState >= z.NETWORK_IDLE || z.currentTime && z.currentTime > 0) && (L.playState !== g && (L.playState = m), G && (U(), G = !1), b())
                    }
                    L.playState !== h && (L.playState === g ? z.paused || z.pause() : (H !== z.seekable && H !== z.buffered && (H = a[l.exec(z.currentSrc)[1]] ? z.seekable : z.buffered), L.duration = z.duration || 1, L.latestSeekablePosition = H && H.length && H.end(0) || 0, L.seeking || et || G || (null !== K ? Math.abs(z.currentTime - K) < 10 ? (K = null, J.cancel(), L.position = z.currentTime || 0) : J.scheduleIfInactive(function() {
                        K = null
                    }, 5e3) : L.position = z.currentTime || 0, L.position > 0 && (N = !0)), L.playState === m ? q === L.position || L.seeking || et || (L.playState = v) : q === L.position && new Date - B > 1e3 && (L.playState = m), q !== L.position && (q = L.position, B = new Date)), D()), X.schedule(_, s)
                }
            }

            function I(e) {
                return e = Math.min(Math.max(e, 0), 1), z && (z.volume = e, e = z.volume), e
            }

            function M(e) {
                return !!(z && H && H.length && H.start(0) <= e && e <= H.end(0))
            }

            function O(e) {
                return M(e) ? (rt.cancel(), Q = 0, et || (L.seeking = !0, L.playState = m, o && N && a[l.exec(z.currentSrc)[1]] && Y.schedule(F(), o)), J.cancel(), K = e, z.currentTime = e, e) : L.position
            }

            function D() {
                et && !z.seeking ? (et = !1, b(), nt && (nt(), nt = null)) : L.seeking && !z.seeking && (L.seeking = !1), tt && j()
            }

            function j() {
                M(tt) ? U() : L.playState !== m && Z.scheduleIfInactive(function() {
                    tt = null, nt = null
                }, c)
            }

            function U() {
                et = !0, J.cancel(), K = tt, z.currentTime = tt, G || (rt.cancel(), L.position = tt), tt = null, Z.cancel(), Q = 0
            }

            function F() {
                X.cancel(), rt.cancel(), L.position && (nt = null, tt = L.position), Q > u ? L.errorState = d : rt.schedule(function() {
                    Q++, H = null, G = !0, L.playState = m, b(), z.load(), _()
                }, 100 * Math.pow(2, Math.max(0, Q - 5)))
            }
            var L = n.internalObject(),
                R = n(L);
            R.NO_SOURCE = f, R.PLAYBACK = d, R.STATE_STOPPED = p, R.STATE_LOADING = h, R.STATE_BUFFERING = m, R.STATE_PAUSED = g, R.STATE_PLAYING = v, L.publicProperty("paused", !1), L.publicProperty("loading", !1), L.publicProperty("buffering", !1), L.publicProperty("playing", !1), L.publicProperty("seeking"), L.publicProperty("duration"), L.publicProperty("position", void 0, O), L.publicProperty("latestSeekablePosition"), L.publicProperty("errorState"), L.publicProperty("volume", 1, I), L.publicEvent("resume"), L.publicEvent("ended"), L.privateProperty("playState"), L.on("playState", w), L.on("paused buffering loading seeking", b);
            var N, H, q, B, V = null,
                z = null,
                Q = 0,
                G = !1,
                X = t(),
                K = null,
                J = t(),
                Y = t(),
                Z = t(),
                et = !1,
                tt = null,
                nt = null,
                rt = t();
            L.on("errorState", function() {
                null !== L.errorState && X.cancel(), b(), w()
            }), R.play = function(e, t) {
                "string" == typeof e && (e = [e]), R.unload(), L.playState = h, t && (tt = t, nt = function() {
                    L.trigger("resume")
                }), x(e), _()
            }, R.unload = function() {
                X.cancel(), Z.cancel(), rt.cancel(), S(), W()
            }, R.pause = function() {
                L.playState = g, rt.cancel(), Q = 0, z && z.pause()
            }, R.resume = function() {
                L.playState = N ? v : m, z && z.play()
            };
            var ot = 0,
                it = null;
            return L.on("playing", function(e) {
                e && null === it ? it = new Date : e || null === it || (ot += (new Date - it) / 1e3, it = null)
            }), Object.defineProperty(R, "listenSeconds", {
                get: function() {
                    return null === it ? ot : ot + (new Date - it) / 1e3
                }
            }), R
        }
    }]), mixcloudShared.provider("html5PlayerFactory", function() {
        var e = "-",
            t = !1;
        this.setRetainClickStack = function(e) {
            return t = e, this
        }, this.$get = ["$q", "$timeout", "$window", "featureDetection", "html5AudioWrapperFactory", "html5PlayerReportingFactory", "localStorageWrapper", "mHttp", "propertyObject", "resumeStore", "settings", function(n, r, o, i, a, l, s, c, u, f, d) {
            return function(p) {
                function h(e) {
                    return k.playingPreroll ? T.position : (T.position = e, T.position)
                }

                function m(e, t) {
                    M = t, I = v(e), _ = {
                        cloudcastId: I.id,
                        sessionId: I.html5_ping_session_id,
                        widget: t.widget !== !1
                    }, t.situation && (_.situation = t.situation), I.ping_socket_url2 && (_.pingSocketUrl = I.ping_socket_url2), I.play_ping_url && (_.pingUrl = I.play_ping_url), I.preroll_stream_url || I.preroll ? w() : g(), x(_.sessionId)
                }

                function g() {
                    var e, t = M && M.startSeconds || f.getPos(P.currentCloudcastKey);
                    e = I.stream_url ? [I.stream_url] : (I.audio_formats.m4a && I.audio_formats.m4a["64"] || []).concat(I.audio_formats.mp3), T.play(e, t)
                }

                function v(e) {
                    var t, n, r = "pleasedontdownloadourmusictheartistswontgetpaid",
                        o = r.length,
                        i = 0,
                        a = [];
                    for (n = atob(e), t = n.length; t > i; i++) a[i] = n.charCodeAt(i) ^ r.charCodeAt(i % o);
                    return JSON.parse(String.fromCharCode.apply(String, a))
                }

                function y() {
                    k.buffering = !0, k.loading = !0, k.playing = !1, k.paused = !1, k.position = 0, k.duration = 0, k.playingPreroll = !1
                }

                function w() {
                    k.playingPreroll = !0, I.preroll_stream_url ? T.play([I.preroll_stream_url]) : T.play((I.preroll.audio_formats.m4a && I.preroll.audio_formats.m4a["64"] || []).concat(I.preroll.audio_formats.mp3))
                }

                function b() {
                    y(), g()
                }

                function x(t) {
                    if (!t) {
                        if (s.getItem("mx:player:sync") !== _.sessionId) return;
                        t = e
                    }
                    s.setItem("mx:player:sync", t)
                }
                var S, k = u.internalObject(),
                    P = u(k),
                    C = angular.extend({
                        reporting: !0
                    }, p),
                    T = a(C.container);
                P.playerType = "html5", P.hasFormatSupport = i.test("audio"), S = C.reporting === !1 ? {
                    init: angular.noop,
                    playStart: angular.noop,
                    playing: angular.noop,
                    notPlaying: angular.noop,
                    unload: angular.noop
                } : l(T), C.container && C.container.on("$destroy", function() {
                    P.unload()
                }), k.publicDerivedProperty(T, "duration", {
                    fn: Math.floor
                }), k.publicDerivedProperty(T, "latestSeekablePosition", {
                    fn: Math.floor
                }), k.publicDerivedProperty(T, "volume", {
                    readOnly: !1
                }), k.publicDerivedProperty(T, "paused"), k.publicDerivedProperty(T, "loading"), k.publicDerivedProperty(T, "buffering"), k.publicDerivedProperty(T, "playing"), k.publicProperty("currentCloudcastKey", null), k.publicProperty("playingPreroll", !1), k.publicProperty("position", Math.floor(T.position), h), k.publicDerivedEvent(T, "resume"), k.publicEvent("ended"), k.publicEvent("error");
                var E = n.defer();
                P.ready = E.promise, r(function() {
                    E.resolve()
                });
                var A = null,
                    W = null;
                P.play = function(e, n) {
                    P.hasFormatSupport && (S.init(), c.cancel(A), W = new Date, y(), k.currentCloudcastKey = e, n.playInfo ? m(n.playInfo, n) : (A = c.get(d.urls.player.playInfo, {
                        dataType: "text",
                        async: !t,
                        data: {
                            key: e,
                            v: 2
                        }
                    }), A.then(function(e) {
                        m(e, n)
                    })))
                }, T.on("playing", function(e) {
                    k.playingPreroll || (e ? (W ? (S.playStart((new Date - W) / 1e3, _), W = null) : S.playing(), x(_.sessionId)) : (S.notPlaying(), x()))
                }), P.resume = function() {
                    T.resume()
                }, P.pause = function() {
                    T.pause()
                }, P.stop = function() {
                    T.unload(), _ = null, M = null, I = null
                }, P.unload = function() {
                    P.stop(), S.unload()
                }, T.on("position", function(e) {
                    k.position = Math.floor(e)
                }), k.on("position duration", function() {
                    0 === k.position % 5 && k.position > 30 && k.position < k.duration - 30 && f.setPos(P.currentCloudcastKey, k.position)
                }), T.volume = parseFloat(s.getItem("mx:player:volume")) || 1, T.on("volume", function(e) {
                    s.setItem("mx:player:volume", e)
                });
                var _ = null,
                    I = null,
                    M = null;
                return T.on("errorState", function() {
                    k.playingPreroll ? b() : (k.buffering = !1, k.trigger("error"))
                }), T.on("ended", function() {
                    k.playingPreroll ? b() : k.trigger("ended")
                }), $(o).bind("storage", function(t) {
                    "mx:player:sync" === t.key && t.newValue !== e && t.newValue !== _.sessionId && T.pause()
                }), P
            }
        }]
    }), mixcloudShared.factory("html5PlayerReportingFactory", ["debounce", "featureDetection", "mHttp", "settings", "timer", function(e, t, n, r, o) {
        return function(i) {
            function a() {
                w = n.get(r.urls.player.pingSocket + "/discover/", {
                    dataType: "text",
                    data: {
                        module: h,
                        version: 10,
                        widget: m.widget ? 1 : 0,
                        time: (new Date).getTime()
                    },
                    withCredentials: !0,
                    timeout: p,
                    invokeApply: !1
                }), w.then(function(e) {
                    var t, n, r, o, i = e.split("::");
                    return 4 === i.length && (t = i[0], "1" === t) ? (n = i[1], r = i[2], o = i[3], x.open(n, r, o), void 0) : (x.hasConnected || S.start(), void 0)
                }, function() {
                    x.hasConnected || g || S.start()
                })
            }

            function l() {
                null === y && (y = e(c, 1e3 * x.debounceTimeout)), m.playing && s()
            }

            function s() {
                x.isConnected ? m.firstPingSent ? null !== y && y() : (m.firstPingSent = !0, null !== y && y.cancel(), c(!0, m.loadToPlaySeconds)) : S.isActive && S.playStart()
            }

            function c(e, t) {
                var n = {
                    cloudcast_id: m.playData.cloudcastId,
                    ping_session_id: m.playData.sessionId,
                    widget: m.playData.widget,
                    situation: m.playData.situation,
                    user_session_id: x.sid,
                    pos_ms: i.position || 0,
                    de_bounced: e ? 0 : 1,
                    html5: 1
                };
                t && (n.load_to_play_seconds = t), x.send("start", n)
            }

            function u() {
                var e = "0000",
                    t = function() {
                        var t = Math.floor(65536 * Math.random()).toString(16).toUpperCase();
                        return e.substring(0, e.length - t.length) + t
                    };
                return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
            }
            var f = 3e4,
                d = 3e4,
                p = 3e4,
                h = u(),
                m = {
                    playData: null,
                    loadToPlaySeconds: null,
                    lastAudioPosition: null,
                    playing: !1,
                    firstPingSent: !1
                },
                g = !1,
                v = !1,
                y = null,
                w = null,
                b = {
                    init: function() {
                        v || (v = !0, t.test("webSocket") ? a() : S.start())
                    },
                    playStart: function(e, n) {
                        this.notPlaying(), "pingSocketUrl" in n && (r.urls.player.pingSocket = n.pingSocketUrl), "pingUrl" in n && (r.urls.player.ping = n.pingUrl), S.isActive && null !== m && t.test("webSocket") && (S.stop(), a()), m.loadToPlaySeconds = Math.round(e, 0), m.firstPingSent = !1, m.playData = angular.extend({}, n), this.playing()
                    },
                    playing: function() {
                        m.playing = !0, s()
                    },
                    notPlaying: function() {
                        null !== y && y.cancel(), m.playing && (m.playing = !1, x.isConnected ? x.send("stop") : S.isActive && S.playStop())
                    },
                    unload: function() {
                        g = !0, x.stop(), S.stop(), n.cancel(w)
                    }
                },
                x = function() {
                    var e = null,
                        t = null,
                        n = null,
                        i = null,
                        s = !1,
                        c = function() {
                            s || (x.stop(), x.hasConnected ? n = setTimeout(function() {
                                n = null, a()
                            }, d) : S.start())
                        };
                    return {
                        hasConnected: !1,
                        isConnected: !1,
                        send: function(t, n) {
                            null !== e && e.send(t + "::" + (n ? JSON.stringify(n) : ""))
                        },
                        stop: function() {
                            if (this.isConnected = !1, null !== n && (clearTimeout(n), n = null), null !== t && (clearTimeout(t), t = null), null !== i && (i.stop(), i = null), null !== e) {
                                s = !0;
                                try {
                                    e.close()
                                } catch (r) {}
                                s = !1, e = null
                            }
                        },
                        sid: null,
                        debounceTimeout: null,
                        open: function(n, a, s) {
                            this.stop();
                            var u = this;
                            this.sid = s, this.debounceTimeout = a, e = new WebSocket(r.urls.player.pingSocket.replace(/^http/i, "ws") + "/?" + $.param({
                                module: h,
                                version: 10,
                                widget: m.widget ? 1 : 0
                            })), t = setTimeout(function() {
                                t = null, x.stop(), S.start()
                            }, f), i = o(1e3 * .8 * n, function() {
                                e.send("hb")
                            }, !1), e.onopen = function() {
                                clearTimeout(t), t = null, i.start(), u.isConnected = u.hasConnected = !0, l()
                            }, e.onerror = c, e.onclose = c
                        }
                    }
                }(),
                S = function() {
                    var e = function(e) {
                            var t = {
                                cloudcast_id: m.playData.cloudcastId,
                                ping_session_id: m.playData.sessionId,
                                pos_ms: Math.floor(1e3 * (i.position || 0)),
                                html5: 1
                            };
                            e && (t.load_to_play = e), m.playData.situation && (t.situation = m.playData.situation), $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: r.urls.player.ping,
                                data: t
                            })
                        },
                        t = 0,
                        n = o(3e3, function() {
                            var n = i.listenSeconds;
                            n >= 60 && Math.floor(n / 60) > Math.floor(t / 60) && e(), t = n
                        }, !1);
                    return {
                        isActive: !1,
                        start: function() {
                            this.isActive || (this.isActive = !0, l())
                        },
                        stop: function() {
                            n.stop(), this.isActive = !1
                        },
                        playStart: function() {
                            m.firstPingSent || (e(m.loadToPlaySeconds), m.firstPingSent = !0), n.start()
                        },
                        playStop: function() {
                            n.stop()
                        }
                    }
                }();
            return b
        }
    }]), mixcloudShared.factory("ie10pushStateFix", ["$timeout", "$window", function(e, t) {
        function n() {
            if (e.cancel(l), t.history.length < d) {
                u.splice(f + 1, u.length - f - 1), c.apply(t.history, u[0]);
                for (var r = 1; r < u.length; r++) s.apply(t.history, u[r]);
                d = t.history.length
            }
            l = e(n, 250, !1)
        }

        function r(e, r, o) {
            n(), s.call(t.history, e, r, o), u.splice(f + 1, u.length - f - 1), u.push([e, r, o]), f = u.length - 1, d = t.history.length
        }

        function o(e, r, o) {
            n(), c.call(t.history, e, r, o), u[f] = [e, r, o], d = t.history.length
        }

        function i(e) {
            if (e.state && e.state.id)
                if (u[f - 1][0].id === e.state.id) f--;
                else if (u[f + 1][0].id === e.state.id) f++;
            else
                for (var n = 0; n < u.length; n++)
                    if (u[n][0].id === e.state.id) {
                        f = n;
                        break
                    }
            d = t.history.length
        }
        var a = !1,
            l = null,
            s = t.history.pushState,
            c = t.history.replaceState,
            u = [],
            f = 0,
            d = t.history.length;
        return {
            start: function() {
                a || (a = !0, t.history.pushState = r, t.history.replaceState = o, d = t.history.length, $(window).on("popstate", i), l = e(n, 250, !1))
            },
            stop: function() {
                a = !1, e.cancel(l), t.history.pushState = s, t.history.replaceState = c, $(window).off("popstate", i)
            }
        }
    }]), mixcloudShared.factory("juno", ["mHttp", "settings", function(e, t) {
        var n = null,
            r = null;
        return function(o, i) {
            function a(e) {
                var t = [];
                return e && e.results && e.results.result && e.results.result.length && (t = e.results.result.map(function(e) {
                    var t = e.trackclients && e.trackclients.trackclient && e.trackclients.trackclient.length && e.trackclients.trackclient[0],
                        n = {
                            startTime: parseInt(e.start, 10)
                        };
                    return t && (n.title = t.track_title, t.track_mix_title && (n.title += " (" + t.track_mix_title + ")"), n.artist = t.track_mix_artist ? t.track_mix_artist : t.bundle_mirror_artists && t.bundle_mirror_artists.artist && t.bundle_mirror_artists.artist[0] ? t.bundle_mirror_artists.artist.join(", ") : "", n.buyUrl = i + "?timein=" + encodeURIComponent(e.start) + "&utm_source=Mixcloud&utm_medium=html5&utm_campaign=mixcloud&ref=mixcloud&a_cid=44db7396"), n.title || (n.chapter = "Unknown"), n
                })), 1 === t.length && t[0].chapter && (t = []), t
            }
            return o === r ? n : (r = o, n = e.get(t.urls.juno.resultsUser, {
                data: {
                    guid: o
                }
            }).then(a))
        }
    }]), mixcloudShared.factory("lastfmScrobbleFactory", ["formset", "mHttp", "playTimer", "settings", function(e, t, n, r) {
        return function(o, i, a, l) {
            function s(e) {
                l = e, l ? (g.start(), m && m.start()) : (g.stop(), a || d(), m && (m.stop(), f()))
            }

            function c(e) {
                i = e
            }

            function u(e) {
                m && (m.stop(), f()), h = !1, p = e, m = n(), l && m.start()
            }

            function f() {
                !h && p && !p.chapter && m.value() >= 3e4 && (h = !0, t.post(r.urls.lastfm.scrobble, {
                    dataType: "json",
                    data: {
                        artist: p.artist,
                        title: p.title
                    }
                }))
            }

            function d() {
                if (!v && i && g.value() > 1e3 * .95 * i) {
                    v = !0;
                    var n = o.filter(function(e) {
                        return !e.chapter
                    }).map(function(e) {
                        return {
                            artist: e.artist,
                            title: e.title
                        }
                    });
                    n.length && t.post(r.urls.lastfm.scrobbleTracklist, {
                        dataType: "json",
                        data: e("form", n.length, 1e3, n)
                    })
                }
            }
            var p = null,
                h = !1,
                m = null,
                g = n(),
                v = !1;
            return l && g.start(), {
                setPlaying: s,
                setDuration: c,
                setCurrentSection: u,
                setSections: function(e, t) {
                    o = e, a = t
                }
            }
        }
    }]), mixcloudShared.provider("lazyLoadInjector", ["$controllerProvider", "$compileProvider", "$provide", "$filterProvider", function(e, t, n, r) {
        this.$get = ["$injector", "$timeout", function(o, i) {
            return {
                monkeyPatchModule: function(a) {
                    function l(e, t) {
                        a[e] = function() {
                            t.apply(null, Array.prototype.slice.call(arguments))
                        }
                    }
                    angular.forEach(["value", "factory", "service", "provider"], function(e) {
                        l(e, n[e])
                    }), l("filter", r.register), l("directive", t.directive), l("controller", e.register), a.run = function(e) {
                        i(function() {
                            o.invoke(e)
                        })
                    }
                }
            }
        }]
    }]), mixcloudSharedRun.run(["lazyLoadInjector", function(e) {
        e.monkeyPatchModule(mixcloudShared), e.monkeyPatchModule(mixcloudSharedRun)
    }]), mixcloudShared.factory("localStorageWrapper", ["$rootScope", "$window", "featureDetection", "callbacks", "safeApply", function(e, t, n, r, o) {
        function i(t) {
            o(e, function() {
                s.call(c, t)
            })
        }
        if (!n.test("localStorage")) {
            var a = {};
            return {
                on: angular.noop,
                off: angular.noop,
                getItem: function(e) {
                    return a[e]
                },
                setItem: function(e, t) {
                    a[e] = t
                },
                removeItem: function(e) {
                    delete a[e]
                }
            }
        }
        var l = $(t),
            s = r({
                firstItemAddedCallback: function() {
                    l.on("storage", i)
                },
                lastItemRemovedCallback: function() {
                    l.off("storage", i)
                }
            }),
            c = s.listenable();
        return c.getItem = function(e) {
            return t.localStorage[e]
        }, c.setItem = function(e, n) {
            try {
                t.localStorage.setItem(e, n)
            } catch (r) {}
        }, c.removeItem = function(e) {
            t.localStorage.removeItem(e)
        }, c
    }]), mixcloudShared.factory("mHttpBackend", function() {
        return function(e) {
            return $.ajax(e)
        }
    }), mixcloudShared.factory("mHttp", ["$compile", "$document", "$q", "$rootScope", "$window", "featureDetection", "mHttpBackend", "safeApply", "settings", "uniqueId", function(e, t, n, r, o, i, a, l, s, c) {
        function u(e) {
            var t = "//" + o.location.host,
                n = o.location.protocol + t;
            return e === n || e.slice(0, n.length + 1) === n + "/" || e === t || e.slice(0, t.length + 1) === t + "/" || !/^(\/\/|http:|https:).*/.test(e)
        }

        function f(e, t) {
            u(t.url) && (/^(GET|HEAD|OPTIONS|TRACE)$/.test(t.type.toUpperCase()) || e.setRequestHeader("X-CSRFToken", p.getCsrfCookie()), s.jsVersion && e.setRequestHeader("X-JS-Version", s.jsVersion))
        }
        var d = {},
            p = function(e) {
                function t(e, t) {
                    w || (v[t ? "resolve" : "reject"].apply(v, Array.prototype.slice.call(e)), h.invokeApply && l(r))
                }

                function u() {
                    delete d[y._requestId]
                }
                var h = angular.extend({
                    method: "GET",
                    async: !0,
                    headers: {},
                    invokeApply: !0
                }, e);
                angular.extend(h.headers, s.ajaxHeaders);
                var m = {
                    url: h.url,
                    type: h.method,
                    beforeSend: f,
                    timeout: h.timeout,
                    data: h.data,
                    dataType: h.dataType,
                    async: h.async,
                    headers: h.headers,
                    success: function() {
                        h.onSuccess && h.onSuccess.apply(p, Array.prototype.slice.call(arguments)), t(arguments, !0)
                    },
                    error: function() {
                        t(arguments, !1)
                    }
                };
                if (h.withCredentials && angular.extend(m, {
                        beforeSend: function(e) {
                            e.withCredentials = !0
                        },
                        xhrFields: {
                            withCredentials: !0
                        },
                        headers: {}
                    }), h.requestProgress && (m.xhr = function() {
                        function e() {
                            n.proportion = (n.upload.loaded / n.upload.total + n.download.loaded / n.download.total) / 2, h.invokeApply ? l(r, function() {
                                h.requestProgress(n)
                            }) : h.requestProgress(n)
                        }
                        var t = $.ajaxSettings.xhr(),
                            n = {
                                upload: {
                                    total: 1,
                                    loaded: 0
                                },
                                download: {
                                    total: 1,
                                    loaded: 0
                                },
                                proportion: 0
                            };
                        return t.addEventListener("progress", function(r) {
                            r.total > 0 && t.readyState < 4 && (n.download.total = r.total, n.download.loaded = r.loaded, e())
                        }, !1), t.addEventListener("readystatechange", function() {
                            t.readyState >= 2 && (n.upload.loaded = n.upload.total, 4 === t.readyState && (n.download.loaded = n.download.total)), e()
                        }), i.test("xhr2") && t.upload.addEventListener("progress", function(r) {
                            r.total > 0 && t.readyState < 2 && (n.upload.total = r.total, n.upload.loaded = r.loaded, e())
                        }), t
                    }), h.formData && !h.data) {
                    var g = new o.FormData;
                    angular.forEach(h.formData, function(e, t) {
                        g.append(t, e)
                    }), m.data = g, m.processData = !1, m.contentType = !1
                }
                var v = n.defer(),
                    y = v.promise,
                    w = !1;
                y._requestId = c(), d[y._requestId] = function() {
                    w = !0, b.abort()
                }, y.then(u, u);
                var b = a(m);
                return y
            };
        p.isInProgress = function(e) {
            return e && e._requestId in d
        }, p.cancel = function(e) {
            p.isInProgress(e) && d[e._requestId]()
        }, p.get = function(e, t) {
            return p(angular.extend({
                method: "GET",
                url: e
            }, t))
        }, p.post = function(e, t) {
            return p(angular.extend({
                method: "POST",
                url: e
            }, t))
        }, p.del = function(e, t) {
            return p(angular.extend({
                method: "DELETE",
                url: e
            }, t))
        }, p.load = function(t, n, r, o) {
            return p(angular.extend({
                method: "GET",
                url: r,
                element: t,
                onSuccess: function(r) {
                    t.html(r), e(t.contents())(n)
                }
            }, o))
        };
        var h = /(?:^|;)\s*csrftoken=([^;\s]*)/;
        return p.getCsrfCookie = function() {
            var e = h.exec(t[0].cookie);
            return e ? e[1] : null
        }, p
    }]), mixcloudShared.factory("hashScroll", ["$window", function(e) {
        return function(t, n) {
            var r = $("html");
            ("" === t || (r = $("#" + t), r.length || (r = $("a[name=" + t + "]"), r.length))) && $("html, body").animate({
                scrollTop: r.offset().top
            }, 500, function() {
                n && (e.location.hash = "#" + t)
            })
        }
    }]), mixcloudShared.directive("a", ["$rootScope", "hashScroll", "navigation", function(e, t, n) {
        var r = /#(.*)/;
        return {
            restrict: "E",
            link: function(o, i, a) {
                n.pushState && i.on("click", function(l) {
                    if (!(l.which > 1 || l.metaKey || l.ctrlKey || a.target)) {
                        n.cancel();
                        var s = a.href,
                            c = s && s.match(r);
                        if (c) {
                            var u = s.replace(c[0], "");
                            if ("" === u || u === n.getCurrentUrl()) return t(c[1], !0), !1
                        }
                        return s.match(n.INTERNAL_URL_RE) ? (e.$apply(function() {
                            var e = n.navigate(s, o);
                            c && e.then(function() {
                                t(c[1], !1)
                            })
                        }), !1) : (i.attr("target", "_blank"), void 0)
                    }
                })
            }
        }
    }]), mixcloudShared.factory("pushStateNavigationBackend", ["$document", "$q", "$rootScope", "$timeout", "$window", "assetManager", "beforeUnload", "callbacks", "googleAnalytics", "hashScroll", "mHttp", "safeApply", "scrolling", "settings", "uniqueId", function(e, t, n, r, o, i, a, l, s, c, u, f, d, p, h) {
        function m() {
            var t = M || W;
            I && (t = (100 * I).toFixed(0) + "% uploaded | " + t), t !== _ && (e[0].title = t, _ = t)
        }

        function g() {
            T || (T = !0, _ = W = e[0].title, n.$apply(function() {
                var e = (o.location.hash || "").replace(/^#/, "");
                p.readyPromise.then(function() {
                    p.pageState.initialHash = e
                }), e && c(e), x({
                    url: b().replace(/\?play(=[^&]*)?$/, "").replace(/\?playall(=[^&]*)?$/, ""),
                    id: h()
                })
            }), $(window).on("popstate", function(e) {
                e.state && e.state.url && f(n, function() {
                    k(e.state)
                })
            }), i.init())
        }

        function v() {
            if (0 === n.navigation.requestProgress) n.navigation.requestProgress = .2;
            else {
                if (!(n.navigation.requestProgress < .25)) return;
                n.navigation.requestProgress += .01
            }
            O = r(v, Math.floor(500 + 1e3 * Math.random()))
        }

        function y(e, l, c) {
            function f(t) {
                if (n.navigation.loading = !1, r.cancel(O), t) {
                    C && !g.fromPopState && (C.scrollPos = d.getScrollTop(), x(C));
                    var a = $(t),
                        l = a.find("#title").text();
                    p.setPageState(a);
                    var u = i.load(a);
                    angular.forEach(D, function(e, t) {
                        var n = a.find("#" + t);
                        n.length && e.call(L, n.children(), u.js)
                    }), g.scrollPos > 20 ? o.scrollTo(0, g.scrollPos) : o.scrollTo(0, 1 === d.scrollTop ? 0 : 1), l && (W = l, m()), n.navigation.nextUrl = null, g.fromPopState || b() !== e && S({
                        url: e,
                        id: h()
                    }), s.pageview(), o.COMSCORE && o.COMSCORE.beacon({
                        c1: "2",
                        c2: "17954447"
                    }), u.js.then(function() {
                        n.$broadcast("navigation:compiled", e, c)
                    }), n.$broadcast("navigation:end", e, c), y.resolve()
                }
            }
            var g = angular.extend({
                    fromPopState: !1,
                    scrollPos: null
                }, l),
                y = t.defer();
            if (j) {
                var w = a.getMessageFromHandlers(L, U);
                if (w && !o.confirm(w)) return n.$broadcast("navigation:cancel", C.url), y.reject(), {
                    promise: y.promise,
                    cancelled: !0
                }
            }
            L.cancel(), n.navigation.requestProgress = 0, O = r(v, 200), n.navigation.loading = !0, n.navigation.nextUrl = e, n.$broadcast("navigation:start", e, c), C && C.overlay && n.navigation.hideOverlay();
            var k = {
                "X-Requested-With": "PushState"
            };
            return P = u.get(e, {
                dataType: "html",
                headers: k,
                requestProgress: function(e) {
                    e.proportion > 0 && (r.cancel(O), n.navigation.requestProgress = e.proportion)
                }
            }), P.then(f, function(t) {
                var o = t && t.status;
                404 === o ? f(t.responseText) : (n.navigation.loading = !1, n.navigation.nextUrl = null, n.navigation.error = o ? E : A, n.navigation.retryUrl = e, r.cancel(O), y.reject())
            }), {
                promise: y.promise,
                cancelled: !1
            }
        }

        function w(e, t) {
            C = e, n.navigation.url = e.url, n.navigation.overlay = t || !e.overlay ? null : e.overlay
        }

        function b() {
            return o.location.pathname + o.location.search
        }

        function x(e) {
            w(e), o.history.replaceState(e, null, e.url)
        }

        function S(e) {
            w(e), o.history.pushState(e, null, e.url)
        }

        function k(e) {
            if (e.id !== C.id && e.url.match(L.INTERNAL_URL_RE)) {
                L.cancel();
                var t = y(e.url, {
                    fromPopState: !0,
                    scrollPos: e.scrollPos
                });
                if (t.cancelled) {
                    var n = angular.copy(C);
                    r(function() {
                        S(n)
                    })
                }
            }
            var i = !1;
            e.overlay && !C.overlay ? (i = !0, C.id === e.id ? o.history.forward() : o.history.back()) : C.overlay && e.overlay !== C.overlay && F[C.overlay].hide(), w(e, i)
        }
        var P = null,
            C = null,
            T = !1,
            E = "Oops, there was a problem loading that page",
            A = "We couldn't communicate with Mixcloud - is your internet up?";
        n.navigation = {
            requestProgress: 0,
            url: b(),
            nextUrl: null,
            loading: !1,
            error: null,
            retryUrl: null,
            overlay: !1,
            hideOverlay: function() {
                C && C.overlay && o.history.back()
            },
            clearError: function() {
                n.navigation.error = null, n.navigation.retryUrl = null
            }
        };
        var W = "Mixcloud",
            _ = W,
            I = null,
            M = null;
        n.$on("upload:progress", function(e, t) {
            I = t, m()
        }), n.$on("player:title", function(e, t) {
            M = t, m()
        });
        var O = null,
            D = {},
            j = !1,
            U = l({
                firstItemAddedCallback: function() {
                    j = !0
                },
                lastItemRemovedCallback: function() {
                    j = !1
                }
            }),
            F = {},
            L = {
                init: g,
                pushState: !0,
                INTERNAL_URL_RE: /^(\/[^\/]|\?|\/$)/,
                navigate: function(e, t) {
                    return y(e, {}, t).promise
                },
                cancel: function() {
                    u.cancel(P), r.cancel(O), n.navigation.loading = !1, n.navigation.nextUrl = null, n.navigation.error = null, n.navigation.retryUrl = null
                },
                reload: function() {
                    y(o.location.pathname + o.location.search + o.location.hash)
                },
                getCurrentUrl: b,
                content: {
                    on: function(e, t) {
                        e in D || (D[e] = l()), D[e].on(t)
                    },
                    off: function(e, t) {
                        e in D && D[e].off(t)
                    }
                },
                beforeUnload: {
                    on: function(e, t) {
                        a.on(e, t), U.on(e, t)
                    },
                    off: function(e) {
                        a.off(e), U.off(e)
                    }
                },
                registerOverlay: function(e, t) {
                    return F[e] = {
                        hide: function() {
                            t && t()
                        }
                    }, {
                        show: function() {
                            C && C.overlay === e || (C && C.overlay && C.overlay !== e && F[C.overlay].hide(), L.cancel(), C.overlay = e, S(C))
                        },
                        hide: function() {
                            C && C.overlay === e && o.history.back()
                        }
                    }
                }
            };
        return L
    }]), mixcloudShared.factory("navigationBackend", ["$q", "$rootScope", "$window", "beforeUnload", "webPlayer", function(e, t, n, r, o) {
        var i = {},
            a = function(e) {
                n.location = e
            };
        return t.navigation = {
            overlay: !1,
            hideOverlay: function() {
                this.overlay && i[this.overlay].hide()
            }
        }, o.one("url", function() {
            $("a").attr("target", "_blank"), a = function(e) {
                n.open(e)
            }
        }), {
            init: angular.noop,
            pushState: !1,
            navigate: function(t) {
                return a(t), e.defer().promise
            },
            reload: function() {
                a(n.location.pathname + n.location.search + n.location.hash)
            },
            getCurrentUrl: function() {
                return n.location.pathname + n.location.search
            },
            content: {
                on: angular.noop,
                off: angular.noop
            },
            beforeUnload: r,
            registerOverlay: function(e, n) {
                return i[e] = {
                    hide: function() {
                        t.navigation.overlay = null, n && n()
                    }
                }, {
                    show: function() {
                        t.navigation.overlay = e
                    },
                    hide: i[e].hide
                }
            }
        }
    }]), mixcloudShared.factory("navigation", ["$injector", "featureDetection", function(e, t) {
        return t.test("pushState") ? e.get("pushStateNavigationBackend") : e.get("navigationBackend")
    }]), mixcloudSharedRun.run(["$window", "ie10pushStateFix", "navigation", function(e, t, n) {
        -1 !== e.navigator.appVersion.indexOf("MSIE 10") && t.start(), n.init()
    }]), mixcloudShared.factory("nowPlayingFactory", ["$rootScope", "facebookListenFactory", "juno", "lastfmScrobbleFactory", function(e, t, n, r) {
        function o(e) {
            var t;
            return t = e.chapter ? {
                chapter: e.chapter
            } : {
                title: e.title,
                artist: e.artist,
                trackUrl: e.track_url,
                artistUrl: e.artist_url
            }, t.startTime = e.start_time, t
        }
        return function(e, i, a, l, s, c, u, f) {
            function d(e) {
                $.setPlaying(e), y && y.setPlaying(e)
            }

            function p(e, t, n) {
                if (c = e, u = t, y && y.setDuration(u), $.setPosition(c, u), n || 0 === n) {
                    var r = null,
                        o = null,
                        i = null;
                    if (w && (angular.forEach(w, function(e) {
                            n >= e.startTime && (i = e)
                        }), i && i.chapter && (i = null)), !v || !y && i || (angular.forEach(m, function(e) {
                            n >= e.startTime && (r = e), c >= e.startTime && (o = e)
                        }), y && o !== g && (g = o, y.setCurrentSection(g))), f && m) {
                        var a = null;
                        r ? a = m.indexOf(r) + 1 : v || (a = Math.floor(1 + (m.length + 1) * (n / (u + 1)))), a && a > b && (b = a, h.displayTracklist = m.slice(0, b))
                    }
                    h.currentDisplayTrack = i || r
                }
            }
            var h = {
                    displayTracklist: [],
                    currentDisplayTrack: null
                },
                m = null,
                g = null,
                v = !1,
                y = null,
                $ = t(e, c, u, l),
                w = null,
                b = 0;
            return i && i.length && (m = i.map(o), v = m.length && 0 === m[0].startTime, h.displayTracklist = f ? [] : m, a.scrobble && (y = r(m, u, v, l))), s && s.guid && n(s.guid, s.chart_url).then(function(e) {
                s.replace_tracklist ? (m = e, h.displayTracklist = f ? [] : m, v = !0, y && y.setSections(e, !0)) : w = e
            }), {
                model: h,
                setPlaying: d,
                setPosition: p
            }
        }
    }]), mixcloudShared.factory("playerFactory", ["$injector", "$window", "featureDetection", "localStorageWrapper", "settings", function(e, t, n, r, o) {
        var i = r.getItem("mx:use_html5_player");
        if ("y" === i) return e.get("html5PlayerFactory");
        if ("n" === i) return e.get("flashPlayerFactory");
        var a = o.player.canUseFlash && e.get("swfobject").hasFlashPlayerVersion("10.1"),
            l = o.player.preferHtml5 && n.test("audio");
        return a && !l ? e.get("flashPlayerFactory") : e.get("html5PlayerFactory")
    }]), mixcloudShared.factory("playTimer", function() {
        return function() {
            var e = null,
                t = 0;
            return {
                value: function() {
                    return null === e ? t : t + Date.now() - e
                },
                start: function() {
                    null === e && (e = Date.now())
                },
                stop: function() {
                    null !== e && (t = this.value(), e = null)
                }
            }
        }
    }), mixcloudShared.factory("positionRelative", function() {
        var e = /^(absolute|relative|fixed)$/;
        return function(t) {
            var n = t.css("position");
            n.match(e) || t.css("position", "relative")
        }
    }), mixcloudShared.factory("refTracking", ["$rootScope", function(e) {
        var t = {};
        return e.$on("navigation:compiled", function() {
            t.play = null
        }), {
            clearLinkRef: function(e) {
                t[e] = null
            },
            getLinkRef: function(e) {
                return t[e] || null
            },
            setLinkRef: function(e, n) {
                t[e] = n
            }
        }
    }]), mixcloudShared.factory("prerequisites", ["$q", function(e) {
        return {
            directive: function(e) {
                return {
                    require: ["?mClick", "?mSubmit", "?mAjaxToggle", "?mStripeButton", "?mDialog"],
                    link: function(t, n, r, o) {
                        for (var i = !1, a = 0; a < o.length; a++) o[a] && (o[a].prerequisites = o[a].prerequisites || [], o[a].prerequisites.push(e(t, n, r)), i = !0);
                        if (!i) throw Error("No directives impacted by prerequisite")
                    }
                }
            },
            check: function(t) {
                function n() {
                    var e = t && t[r];
                    e ? (r++, e().then(n, function() {
                        o.reject()
                    })) : o.resolve()
                }
                var r = 0,
                    o = e.defer();
                return n(), o.promise
            }
        }
    }]), mixcloudShared.factory("propertyObject", ["$document", "callbacks", "featureDetection", function(e, t, n) {
        var r = function(e) {
            function n(e, t, n, r) {
                angular.forEach(t.split(" "), function(t) {
                    if (!(t in e)) throw "No such event " + t;
                    e[t].on(n, r)
                })
            }

            function o(e, t, r, o) {
                function a() {
                    setTimeout(function() {
                        i(e, t, a)
                    }, 0), r.apply(this, Array.prototype.slice.call(arguments))
                }
                n(e, t, a, o)
            }

            function i(e, t, n) {
                angular.forEach(t.split(" "), function(t) {
                    if (!(t in e)) throw "No such event " + t;
                    e[t].off(n)
                })
            }

            function a(n, r, o, i) {
                function a() {
                    return p
                }

                function f(t) {
                    t !== p && (p = t, s && e.trigger(r, p))
                }

                function d(e) {
                    f(i(e))
                }
                n ? c[r] = t() : u[r] = t();
                var p = o;
                if (Object.defineProperty(e, r, {
                        get: a,
                        set: f
                    }), n) {
                    var h = {
                        get: a
                    };
                    i && (h.set = d), Object.defineProperty(l, r, h)
                }
            }
            e = e || r.internalObject();
            var l = r.internalObject(),
                s = !0;
            e.disablePropertyEvents = function() {
                s = !1
            }, e.enablePropertyEvents = function() {
                s = !0
            };
            var c = new function() {},
                u = function() {
                    var e = function() {};
                    return e.prototype = c, new e
                }();
            return e.trigger = function(t) {
                if (!(t in u)) throw "No such event " + t;
                u[t].call.apply(e, [l].concat(Array.prototype.slice.call(arguments, 1)))
            }, e.on = function(e, t, r) {
                n(u, e, t, r)
            }, l.on = function(e, t, r) {
                n(c, e, t, r)
            }, e.one = function(e, t, n) {
                o(u, e, t, n)
            }, l.one = function(e, t, n) {
                o(c, e, t, n)
            }, e.off = function(e, t) {
                i(u, e, t)
            }, l.off = function(e, t) {
                i(c, e, t)
            }, e.publicEvent = function(e) {
                c[e] = t()
            }, e.privateEvent = function(e) {
                u[e] = t()
            }, e.publicProperty = function(e, t, n) {
                a(!0, e, t, n)
            }, e.privateProperty = function(e, t) {
                a(!1, e, t)
            }, e.publicDerivedProperty = function(t, n, r) {
                var o = angular.extend({
                        derivedPropertyName: n,
                        fn: function(e) {
                            return e
                        },
                        readOnly: !0
                    }, r),
                    i = o.readOnly ? void 0 : function(e) {
                        return t[n] = e, e
                    };
                e.publicProperty(o.derivedPropertyName, o.fn(t[n]), i), t.on(n, function(t) {
                    e[n] = o.fn(t)
                })
            }, e.publicDerivedEvent = function(t, n, r) {
                e.publicEvent(n), t.on(n, function() {
                    e.trigger(n)
                }, r && r.invokeApply)
            }, l
        };
        return r.internalObject = function() {
            return n.test("definePropertyOnArbitraryObject") ? {} : e[0].createElement("div")
        }, r
    }]), mixcloudShared.factory("resumeStore", ["localStorageWrapper", function(e) {
        var t = function() {
                try {
                    return JSON.parse(e.getItem("mx:player:resume") || "{}")
                } catch (t) {}
                return {}
            },
            n = function(t) {
                e.setItem("mx:player:resume", JSON.stringify(t))
            };
        return {
            getPos: function(e) {
                var r, o = t(),
                    i = {},
                    a = (new Date).getTime() - 864e5;
                for (r in o) o.hasOwnProperty(r) && o[r].exp > a && (i[r] = o[r]);
                return n(i), i[e] && i[e].pos || null
            },
            setPos: function(e, r) {
                var o = t();
                o[e] = {
                    pos: r,
                    exp: (new Date).getTime()
                }, n(o)
            }
        }
    }]), mixcloudShared.factory("safeApply", function() {
        return function(e, t) {
            e.$$phase ? t && t(e) : e.$apply(t)
        }
    }), mixcloudShared.factory("scrolling", ["$document", "$timeout", "$window", function(e, t, n) {
        var r = e[0],
            o = {
                scrollTop: 1
            },
            i = !1;
        return o.getScrollTop = function() {
            return n.pageYOffset || "CSS1Compat" === r.compatMode && r.documentElement.scrollTop || r.body.scrollTop || 0
        }, o.scrollToTop = function() {
            t(function() {
                n.scrollTo(0, 1)
            }, 1, !1)
        }, o.mobileInit = function() {
            if (!i) {
                i = !0;
                var e, a = $(n);
                n.location.hash || (n.scrollTo(0, 1), e = setInterval(function() {
                    r.body && (clearInterval(e), o.scrollTop = o.getScrollTop(), n.scrollTo(0, 1 === o.scrollTop ? 0 : 1))
                }, 20), a.on("load", function() {
                    t(function() {
                        o.getScrollTop() < 20 && n.scrollTo(0, 1 === o.scrollTop ? 0 : 1)
                    }, 0, !1)
                }))
            }
        }, o
    }]), mixcloudShared.provider("settings", function() {
        function e(t, n) {
            return angular.forEach(n, function(n, r) {
                r in t && angular.isObject(t[r]) && angular.isObject(n) ? e(t[r], n) : t[r] = n
            }), t
        }
        var t = {};
        this.addSettings = function(n) {
            return e(t, n), this
        }, this.$get = ["$q", "$rootScope", "$window", function(n, r, o) {
            var i = n.defer();
            return t.readyPromise = i.promise, t.pageState = {}, t.setPageState = function(t) {
                var n = {};
                t.find('script[type="text/x-js-state"]').each(function() {
                    var t = $.trim($(this).html());
                    t && e(n, JSON.parse(t))
                }), r.headerTransparent = !!n.headerTransparent, r.headerOnramp = !!n.headerOnramp, r.skinPosition = n.skinPosition, r.skin = n.skin || null, n.sentryJSVersion && (o.sentryJSVersion = n.sentryJSVersion), this.pageState = n, i.resolve()
            }, t
        }]
    }), mixcloudSharedRun.run(["$document", "settings", function(e, t) {
        t.setPageState(e)
    }]), mixcloudShared.factory("sourceTracking", ["$document", "$window", "$rootScope", "Date", "localStorageWrapper", "settings", "url", function(e, t, n, r, o, i, a) {
        function l(e) {
            if (!e && i.pageState.profile_namespace) return i.pageState.profile_namespace;
            var n = a(e || t.location.origin + t.location.pathname + t.location.search),
                r = n.pathname;
            return r = r.replace(/^\/+|\/+$/, ""), r = r.split("/")[0]
        }

        function s() {
            var e = JSON.parse(o.getItem(f) || "{}");
            if (Object.keys(e).length > d) {
                var t = $.map(e, function(e) {
                    return e.lastUsed
                });
                t.sort();
                var n = t[t.length - d];
                n = Math.min(n, r.now() - p), $.each(e, function(t, r) {
                    r.lastUsed < n && delete e[t]
                })
            }
            return e
        }

        function c(e) {
            o.setItem(f, JSON.stringify(e))
        }
        var u = {},
            f = "sourceTracking2",
            d = 20,
            p = 432e5,
            h = null,
            m = null;
        return n.$watch(function() {
            return i.pageState.profile_namespace
        }, function(e) {
            n.profileNamespace = e
        }), n.$on("navigation:start", function(e, n, r) {
            h = r && r.profile_namespace ? r.profile_namespace : i.pageState.profile_namespace, m = r && r.sourceDetail ? r.sourceDetail : t.location.href
        }), n.$on("navigation:end", function() {
            u.setWithinSiteDetail(m, i.pageState.profile_namespace, h), h = null, m = null
        }), u.setInitialPageSource = function() {
            var n = e[0].referrer,
                r = a(t.location.href);
            if ("email" === r.params().utm_medium) i.readyPromise.then(function() {
                u.setWithinSiteDetail("Notification email", i.pageState.profile_namespace, void 0)
            });
            else if (n) {
                var o = a(n);
                o.hostname.match(/(^|\.)mixcloud.com$/) || i.readyPromise.then(function() {
                    u.setSourceAndDetail(o.hostname, n, i.pageState.profile_namespace, void 0)
                })
            } else i.readyPromise.then(function() {
                u.getSource(i.pageState.profile_namespace) || u.setSourceAndDetail("Unknown Link", "Unknown Link", i.pageState.profile_namespace, void 0)
            })
        }, u.setSourceAndDetail = function(e, t, n, o) {
            if (o !== n && n) {
                var i = s();
                i[n] = {
                    source: e,
                    sourceDetail: t,
                    lastUsed: r.now()
                }, c(i)
            }
        }, u.setWithinSiteDetail = function(e, t, n) {
            u.setSourceAndDetail("mixcloud.com", e, t, n)
        }, u.setDetailFromCurrentUrl = function(e, n) {
            u.setWithinSiteDetail(t.location.href, e, n)
        }, u.getSource = function(e) {
            var t = l(e),
                n = s();
            return t in n ? (n[t].lastUsed = r.now(), c(n), n[t].source) : ""
        }, u.getSourceDetail = function(e) {
            var t = l(e),
                n = s();
            return t in n ? (n[t].lastUsed = r.now(), c(n), n[t].sourceDetail) : ""
        }, u
    }]), mixcloudSharedRun.run(["sourceTracking", function(e) {
        e.setInitialPageSource()
    }]), mixcloudShared.factory("swfobject", ["$document", "$window", function(e, t) {
        function n(e, t, n) {
            var r, i = o.getElementById(n);
            if (i)
                if (a.ie && a.win) {
                    t.movie = e.data;
                    var s = "",
                        c = "";
                    angular.forEach(e, function(e, t) {
                        "data" !== t && (c += " " + t + '="' + e + '"')
                    }), angular.forEach(t, function(e, t) {
                        s += '<param name="' + t + '" value="' + e + '" />'
                    }), i.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + c + ">" + s + "</object>", l[l.length] = e.id, r = o.getElementById(e.id)
                } else {
                    var u = o.createElement("object");
                    u.setAttribute("type", "application/x-shockwave-flash"), angular.forEach(e, function(e, t) {
                        u.setAttribute(t, e)
                    }), angular.forEach(t, function(e, t) {
                        if ("movie" !== t) {
                            var n = o.createElement("param");
                            n.setAttribute("name", t), n.setAttribute("value", e), u.appendChild(n)
                        }
                    }), i.parentNode.replaceChild(u, i), r = u
                }
            return r
        }

        function r(e) {
            if (4 === e.readyState) {
                for (var t in e) "function" == typeof e[t] && (e[t] = null);
                e.parentNode.removeChild(e)
            } else setTimeout(function() {
                r(e)
            }, 10)
        }
        var o = e[0],
            i = navigator,
            a = function() {
                var e = i.userAgent.toLowerCase(),
                    n = i.platform.toLowerCase(),
                    r = n ? /win/.test(n) : /win/.test(e),
                    o = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                    a = !1,
                    l = [0, 0, 0],
                    s = null;
                if (i.plugins && "object" == typeof i.plugins["Shockwave Flash"]) s = i.plugins["Shockwave Flash"].description, !s || i.mimeTypes && i.mimeTypes["application/x-shockwave-flash"] && !i.mimeTypes["application/x-shockwave-flash"].enabledPlugin || (a = !1, s = s.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), l[0] = parseInt(s.replace(/^(.*)\..*$/, "$1"), 10), l[1] = parseInt(s.replace(/^.*\.(.*)\s.*$/, "$1"), 10), l[2] = /[a-zA-Z]/.test(s) ? parseInt(s.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
                else if (t.ActiveXObject) try {
                    var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    c && (s = c.GetVariable("$version"), s && (a = !0, s = s.split(" ")[1].split(","), l = [parseInt(s[0], 10), parseInt(s[1], 10), parseInt(s[2], 10)]))
                } catch (u) {}
                return {
                    pv: l,
                    wk: o,
                    ie: a,
                    win: r
                }
            }(),
            l = [];
        return a.ie && a.win && t.attachEvent("onunload", function() {
            angular.forEach(l, function(e) {
                var t = o.getElementById(e);
                t && "OBJECT" === t.nodeName && (t.style.display = "none", r(t))
            })
        }), {
            hasFlashPlayerVersion: function(e) {
                var t = a.pv,
                    n = e.split(".");
                return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, !!(t[0] > n[0] || t[0] === n[0] && t[1] > n[1] || t[0] === n[0] && t[1] === n[1] && t[2] >= n[2])
            },
            embedSWF: function(e, t, r, o, i, l, s, c, u, f) {
                var d = {
                    success: !1,
                    id: t
                };
                if (!(a.wk && a.wk < 312) && e && t && r && o && i && (u.data = e, u.width = r, u.height = o, angular.forEach(s, function(e, t) {
                        c.flashvars ? c.flashvars += "&" : c.flashvars = "", c.flashvars += t + "=" + e
                    }), this.hasFlashPlayerVersion(i))) {
                    var p = n(u, c, t);
                    d.success = !0, d.ref = p
                }
                f && f(d)
            }
        }
    }]), mixcloudShared.factory("throttle", function() {
        return function(e, t) {
            var n = 0;
            return function() {
                Date.now() - n < t || (n = new Date, e.apply(this, Array.prototype.slice.call(arguments)))
            }
        }
    }), mixcloudShared.factory("timer", function() {
        return function(e, t, n) {
            var r = null,
                o = n,
                i = function() {
                    r = setTimeout(function() {
                        r = null, t(), o && i()
                    }, e)
                };
            return n !== !1 && i(), {
                stop: function() {
                    null !== r && (clearTimeout(r), r = null), o = !1
                },
                start: function() {
                    o || (o = !0, i())
                }
            }
        }
    }), mixcloudShared.factory("trackEvent", ["$window", "googleAnalytics", "mHttp", "settings", function(e, t, n, r) {
        return function(o, i, a) {
            e.location.pathname && o && i && (n.post(r.urls.analytics.recordUserAction, {
                data: {
                    url: e.location.pathname,
                    category: o,
                    action: i,
                    label: a || ""
                }
            }), t.trackEvent(o, i, a || void 0))
        }
    }]), mixcloudShared.factory("uniqueId", function() {
        var e = 0;
        return function() {
            return e++, e
        }
    }), mixcloudShared.factory("url", ["$document", "$window", function(e, t) {
        return function(n) {
            var r = e[0],
                o = r.createElement("a");
            o.href = n;
            var i = null,
                a = o.pathname;
            "/" !== a.substring(0, 1) && (a = "/" + a);
            var l = o.port || t.location.port,
                s = o.protocol;
            return ("" === s || ":" === s) && (s = t.location.protocol), {
                protocol: s,
                hostname: o.hostname || t.location.hostname,
                port: l && parseInt(l, 10),
                pathname: a,
                search: o.search,
                hash: o.hash,
                host: o.host || t.location.host,
                relative: a + o.search + o.hash,
                params: function() {
                    return null === i && (i = {}, o.search.replace(/^\?/, "").replace("+", " ").split("&").forEach(function(e) {
                        var t = e.split("=");
                        t[0] && (i[decodeURIComponent(t[0])] = decodeURIComponent(t[1] || ""))
                    })), i
                }
            }
        }
    }]), mixcloudShared.factory("uuid", function() {
        return function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                var t = 0 | 16 * Math.random(),
                    n = "x" === e ? t : 8 | 3 & t;
                return n.toString(16)
            })
        }
    }),
    function() {
        var e = miniPromise();
        $(window).on("load", function() {
            e.resolve()
        }), mixcloudShared.factory("waitForLoad", ["$q", "$rootScope", "safeApply", function(t, n, r) {
            var o = t.defer();
            return e.then(function() {
                r(n, function() {
                    o.resolve()
                })
            }), o.promise
        }])
    }(), mixcloudShared.factory("webPlayerBase", ["$rootScope", "beforeUnload", "playerFactory", "propertyObject", "settings", "sourceTracking", function(e, t, n, r, o, i) {
        function a() {
            return !l.paused && (l.playing || l.loading || l.buffering) ? "Are you sure you want to stop listening and leave this page?" : void 0
        }
        var l = n(),
            s = r.internalObject(),
            c = r(s);
        c.playerType = l.playerType, c.hasFormatSupport = l.hasFormatSupport, s.publicProperty("url", null), s.publicDerivedProperty(l, "position"), s.publicDerivedProperty(l, "latestSeekablePosition"), s.publicDerivedProperty(l, "duration"), s.publicDerivedProperty(l, "paused"), s.publicDerivedProperty(l, "playing"), s.publicDerivedProperty(l, "volume", {
            readOnly: !1
        }), s.publicDerivedProperty(l, "playingPreroll"), s.publicProperty("buffering", !1), s.publicDerivedEvent(l, "ended", {
            invokeApply: !0
        }), s.publicDerivedEvent(l, "error", {
            invokeApply: !0
        }), s.publicEvent("playStateChanged"), s.publicEvent("seekRestriction"), l.on("buffering loading", function() {
            s.buffering = l.buffering || l.loading
        }, !0), l.on("latestSeekablePosition position duration paused", function() {
            s.trigger("playStateChanged")
        }, !0), t.on(a);
        var u = null;
        return c.play = function(e) {
            u = e, s.url = e.url, l.play(e.url, {
                situation: $.param({
                    p_ref: e.p_ref || "",
                    medium: o.medium,
                    source: i.getSource(e.url),
                    source_detail: i.getSourceDetail(e.url),
                    from_upnext: e.from_upnext || !1
                }),
                playInfo: e.play_info,
                startSeconds: e.start_seconds
            })
        }, c.retry = function() {
            u && (delete u.play_info, c.play(u))
        }, c.pause = function() {
            l.pause()
        }, c.resume = function() {
            l.resume()
        }, c.seek = function(e) {
            return o.player && "forwards_only" === o.player.seekRestriction && e < l.position ? (s.trigger("seekRestriction", "forwards_only"), !1) : (l.position = e, !0)
        }, c.togglePlay = function() {
            l.paused ? l.resume() : l.pause()
        }, e.webPlayer = {
            playerOpen: !1,
            upNextOpen: !1
        }, s.on("url paused buffering", function() {
            e.webPlayer.url = s.url, e.webPlayer.paused = s.paused, e.webPlayer.loading = s.buffering
        }, !0), {
            internals: s,
            externals: c
        }
    }]), mixcloudSharedRun.run(["$document", "$timeout", function(e, t) {
        e.on("touchstart MSPointerDown mousedown", function(n) {
            function r() {
                i && (t.cancel(i), i = null), e.off("touchmove touchend", r), o.off("mouseup mouseleave", r), o.removeClass("fake-active")
            }
            if ("MSPointerDown" !== n.type || n.pointerType === n.MSPOINTER_TYPE_TOUCH && n.isPrimary) {
                var o = $(n.target),
                    i = null;
                i = t(function() {
                    i = null, o.addClass("fake-active")
                }, 50, !1), e.on("touchmove touchend", r), o.on("mouseup mouseleave", r)
            }
        })
    }]), mixcloudWWW.controller("AccountSettingsCtrl", ["$scope", "$timeout", "mHttp", "settings", function(e, t, n, r) {
        var o = 5e3;
        angular.extend(e, r.pageState.userSettings), e.passwordSave = function() {
            e.passwordState = "in-progress", n.post(e.passwordForm.action, {
                data: e.password,
                dataType: "json"
            }).then(function(n) {
                n.form && (e.password = n.form), n.success ? (e.passwordState = "saved", t(function() {
                    e.passwordState = "ready"
                }, o), e.password = {}) : (e.passwordState = "error", t(function() {
                    e.passwordState = "ready"
                }, o))
            })
        }, e.podcastImport = function() {
            n.post(e.podcastImportForm.action)
        }
    }]), mixcloudWWW.controller("AppsSettingsCtrl", ["$scope", "mHttp", "settings", function(e, t, n) {
        function r(e, t) {
            var n = e.indexOf(t);
            n >= 0 && e.splice(n, 1)
        }
        angular.extend(e, n.pageState.userSettings), e.revokeApp = function(n) {
            t.post(e.appForm.action, {
                data: {
                    consumer_id: n.consumer_id
                }
            }).then(function() {
                r(e.apps, n)
            })
        }
    }]), mixcloudWWW.controller("AddToPlaylistCtrl", ["$scope", "$timeout", "mHttp", function(e, t, n) {
        var r = 2e3;
        e.addToPlaylist = function(t) {
            if (!t.loadingState) {
                var r = t.alreadyAdded ? "remove" : "add";
                t.loadingState = !0, t.showFeedback = !1, n.post(e.addToCollectionUrl, {
                    data: {
                        action: r,
                        playlist_slug: t.slug
                    },
                    dataType: "json"
                }).then(function(e) {
                    e.success ? (t.alreadyAdded = !t.alreadyAdded, t.errorMessage = !1) : t.errorMessage = !0, t.message = e.message, t.loadingState = !1, o(t)
                }, function() {
                    t.message = "Error - please try again later", t.errorMessage = !0, t.loadingState = !1, o(t)
                })
            }
        }, e.addToNewPlaylist = function() {
            e.newPlaylistSubmitted || e.newPlaylistForm.$valid && (e.newPlaylistSubmitted = !0, n.post(e.newPlaylistForm.action, {
                data: e.newPlaylistData,
                dataType: "json"
            }).then(function(t) {
                t.success ? (e.newPlaylistData.playlistName = "", e.newPlaylistAdded = !0, t.newPlaylist.message = t.message, t.newPlaylist.errorMessage = !1, e.playlists.unshift(t.newPlaylist), o(t.newPlaylist)) : (e.message = t.message, e.errorMessage = !1, o(e)), e.newPlaylistSubmitted = !1
            }, function() {
                e.message = "Error - please try again later", e.errorMessage = !0, o(e), e.newPlaylistSubmitted = !1
            }))
        };
        var o = function(e) {
            e.showFeedback = !0, e.feedbackPromise && t.cancel(e.feedbackPromise), e.feedbackPromise = t(function() {
                e.showFeedback = !1, e.feedbackPromise = null
            }, r)
        }
    }]), mixcloudWWW.controller("BrowserSupportWarningCtrl", ["$scope", "$window", function(e, t) {
        e.internetExplorer = "Microsoft Internet Explorer" === t.navigator.appName && parseFloat(window.navigator.appVersion.split(" ", 1)[0]) < 9
    }]), mixcloudWWW.controller("ChangePasswordCtrl", ["$scope", "mHttp", function(e, t) {
        e.changePassword = function() {
            e.newPasswordForm.$valid && t.post(e.newPasswordForm.action, {
                dataType: "json",
                data: e.passwordData
            }).then(function(t) {
                t.success ? e.resetCompleted = !0 : e.errors = t.errors
            }, function() {
                e.errors = {
                    __all__: "Something went wrong, please try again later"
                }
            })
        }
    }]), mixcloudWWW.controller("ClickFeedbackCtrl", ["$scope", "debounce", function(e, t) {
        var n = t(function() {
            e.$apply(function() {
                e.showFeedback = !1
            })
        }, 1e3);
        e.clickFeedback = function() {
            e.showFeedback = !0, n()
        }
    }]), mixcloudWWW.controller("CloudcastEmbedCtrl", ["$sce", "$scope", "cloudcastEmbed", "debounce", function(e, t, n, r) {
        var o, i, a = !0;
        t.useLegacy = !1, t.embed = {
            styleColorUI: ""
        }, t.maxWidthUI = 710, t.maxHeightUI = 400, t.fullWidth = !1, t.advancedOptions = {}, t.currentWidget = {}, t.showCopied = !1, t.getEmbedCode = function() {
            return t.currentWidget && t.currentWidget.generator ? t.currentWidget.generator(t.currentWidget.defaultCode, t.currentWidget.width, t.currentWidget.height, t.advancedOptions, t.fullWidth, !1, t.maxWidthUI, t.maxHeightUI) : null
        }, t.getPreviewEmbedCode = function() {
            return t.currentWidget && t.currentWidget.generator ? t.currentWidget.generator(t.currentWidget.defaultCode, t.currentWidget.width, t.currentWidget.height, t.advancedOptions, t.fullWidth, !0, t.maxWidthUI, t.maxHeightUI) : null
        }, t.getWordpressEmbedCode = function() {
            return t.currentWidget ? n.getWordpressEmbedCode(t.shareLink, t.currentWidget.width, t.currentWidget.height, t.advancedOptions, t.fullWidth) : null
        }, t.validateSize = function() {
            return t.currentWidget && t.currentWidget.validateSize ? t.currentWidget.validateSize(t.currentWidget.width, t.currentWidget.height, t.advancedOptions) : null
        }, t.$watch(t.getEmbedCode, function(e) {
            e && (t.code = e.code)
        }, !0), t.$watch(t.getPreviewEmbedCode, r(function(n) {
            n && (a = !1, t.$apply(function() {
                t.previewCode = e.trustAsHtml(n.code), t.previewWidth = n.widthUI, t.previewHeight = n.heightUI
            }))
        }, function() {
            return a ? 0 : 1e3
        }), !0), t.$watch(t.getWordpressEmbedCode, function(e) {
            e && (t.wordpressShortcode = e)
        }, !0), t.$watch(t.validateSize, r(function(e) {
            e && t.$apply(function() {
                t.currentWidget.width = e.width, t.currentWidget.height = e.height
            })
        }, 600), !0), t.$watch("embed.styleColorUI", r(function(e) {
            t.$apply(function() {
                t.advancedOptions.stylecolor = "#" + (e || "")
            })
        }, 1e3)), t.$watch("useLegacy", function(e) {
            a = !0, t.currentWidget = e === !0 ? i : o
        }), t.$watch("advancedOptions.autoplay", function(e) {
            e === !0 && (t.advancedOptions.showCover = !1)
        }), t.$watch("advancedOptions.showCover", function(e) {
            e === !0 && (t.advancedOptions.autoplay = !1)
        }), t.init = function(e, r, a) {
            var l = n.getWidgetSize(r),
                s = n.getWidgetSize(a);
            o = {
                defaultCode: r,
                generator: n.getIframeEmbedCode,
                validateSize: n.validateSize,
                width: l.width,
                height: l.height
            }, i = {
                defaultCode: a,
                generator: n.getFlashEmbedCode,
                validateSize: n.validateSize,
                width: s.width,
                height: s.height
            }, t.shareLink = e, t.advancedOptions = n.getWidgetOptions(r), t.embed.styleColorUI = t.advancedOptions.stylecolor
        }
    }]), mixcloudWWW.controller("CloudcastHeaderCtrl", ["$scope", "$timeout", "juno", function(e, t, n) {
        e.juno = e.juno || {}, e.juno.sections = [];
        var r = e.$watch("juno.replaceTracklist", function(o) {
            o && (t(function() {
                n(e.juno.guid, e.juno.chartUrl).then(function(t) {
                    e.juno.sections = t
                })
            }, 100), r())
        })
    }]), mixcloudWWW.controller("ConfirmCtrl", ["$scope", "mHttp", "navigation", function(e, t, n) {
        e.displayConfirm = function() {
            e.showConfirm = !0, e.confirmCompleted = !1
        }, e.confirm = function(r) {
            t.post(r, {
                dataType: "json"
            }).then(function(t) {
                t.next_url ? n.navigate(t.next_url) : e.confirmCompleted = !0
            }, function() {
                e.confirmError = !0
            })
        }
    }]), mixcloudWWW.controller("CommentCtrl", ["$sce", "$scope", "login", "mHttp", "settings", "sourceTracking", function(e, t, n, r, o, i) {
        t.commentData = {
            share_facebook: !0
        }, t.postComment = function(e, o, a) {
            function l(n) {
                if (o)
                    for (var r = 0; r < o.length; r++)
                        if (o[r] === c) {
                            o.splice(r, 1);
                            break
                        }
                e.comment = c.comment, a && (a.replying = !0), (a || t).postError = n || "There was a problem posting your comment"
            }
            if ((a || t).postError = "", !e || !e.comment) return !1;
            a && (a.replying = !1, e.parent = a.pk);
            var s = n.getCurrentUser(),
                c = {
                    pk: null,
                    parent: a ? a.pk : null,
                    comment: e.comment.replace("<", "&lt;").replace(">", "&gt;"),
                    created: "Just now",
                    userUrl: s.url,
                    thumbnail: s.thumbnail,
                    displayName: s.displayName,
                    canDelete: !1,
                    canBlock: !1,
                    isDeleted: !1,
                    noReply: !0
                };
            o && o.unshift(c);
            var u = $.extend({}, e, {
                source: i.getSource(t.profileNamspace),
                source_detail: i.getSourceDetail(t.profileNamespace)
            });
            return r.post(t.postUrl, {
                dataType: "json",
                data: u
            }).then(function(e) {
                e.success ? (c.pk = e.pk, c.canDelete = !0, t.$emit("comment:success")) : l(e.error)
            }, function() {
                l()
            }), e.comment = "", !0
        }, t.deleteComment = function(e, t) {
            function n() {
                e.isDeleted = !1
            }
            var i = {
                comment_id: e.pk
            };
            t && (i.block = "y"), e.isDeleted = !0, r.post(o.urls.comment_delete, {
                dataType: "json",
                data: i
            }).then(function(e) {
                e.success || n()
            }, n)
        }, t.toggleReply = function(e) {
            angular.forEach(t.comments, function(t) {
                t.replying = t.pk === e.pk ? !t.replying : !1
            })
        }, t.loadMore = function() {
            t.nextPage && !t.loadingMore && (t.loadingMore = !0, r.get(t.loadMoreUrl, {
                data: {
                    page: t.nextPage
                },
                dataType: "json"
            }).then(function(n) {
                t.loadingMore = !1, t.nextPage = n.next_page, angular.forEach(n.comments, function(t) {
                    t.comment = e.trustAsHtml(t.comment), angular.forEach(t.children, function(t) {
                        t.comment = e.trustAsHtml(t.comment)
                    })
                }), t.comments.push.apply(t.comments, n.comments)
            }, function() {
                t.loadingMore = !1
            }))
        }
    }]), mixcloudWWW.controller("CompetitionEmailCtrl", ["$sce", "$scope", function(e, t) {
        t.safeHtml = function(t) {
            return e.trustAsHtml(t)
        }
    }]), mixcloudWWW.controller("ConnectionSettingsCtrl", ["$scope", "mHttp", "facebook", "googlePlus", "popupWindow", "settings", function(e, t, n, r, o, i) {
        function a() {
            return !0
        }

        function l() {
            e.facebookPages.loadingPages = !0, n.getLoginStatus().then(function(e) {
                return "connected" === e.status ? n.hasPermission("manage_pages") : !1
            }, function() {
                e.facebookPages.needMorePermissions = !0, e.facebookPages.loadingPages = !1
            }).then(function(t) {
                t ? s() : (e.facebookPages.needMorePermissions = !0, e.facebookPages.loadingPages = !1)
            })
        }

        function s() {
            n.api("/me/accounts").then(function(t) {
                t.forEach(function(t) {
                    for (var n = !1, r = 0; r < e.facebookPages.pages.forms.length; r++) {
                        var o = e.facebookPages.pages.forms[r];
                        o.facebook_page_id + "" === t.id && (n = !0, o.facebook_page_name = t.name)
                    }
                    n || e.facebookPages.pages.forms.push({
                        facebook_page_name: t.name,
                        facebook_page_id: t.id,
                        connected: !1
                    })
                }), e.facebookPages.loadingPages = !1
            })
        }

        function c(n) {
            e.gplus.error = null, n.code ? (e.gplus.inProgress = !0, t.post(e.gplusForm.action, {
                data: {
                    code: n.code
                },
                dataType: "json"
            }).then(function(t) {
                t.success ? (e.gplus.inProgress = !1, e.gplus.enabled = !0) : (e.gplus.inProgress = !1, e.gplus.error = t.message)
            })) : e.gplus.error = "There was an error connecting to Google+"
        }
        angular.extend(e, i.pageState.userSettings), e.facebookReady = !1, n.ready.then(function() {
            e.facebookReady = !0
        }), e.facebookConnect = function() {
            return e.facebook.inProgress = !0, e.facebook.error = null, n.login(i.facebook.perms).then(function(n) {
                return t.post(e.facebookConnectForm.action, {
                    dataType: "json",
                    data: {
                        facebook_access_token: n.authResponse.accessToken
                    }
                })
            }).then(function(t) {
                t.success ? (e.facebook.enabled = !0, e.facebook.configurable = !0, e.facebook.shareActivity = t.share_activity, l()) : (e.facebook.enabled = !1, e.facebook.error = t.error), e.facebook.inProgress = !1
            }, function() {
                e.facebook.enabled = !1, e.facebook.error = "Unknown error trying to connect to facebook", e.facebook.inProgress = !1
            }), !1
        }, e.facebookDisconnect = function() {
            return e.facebook.inProgress = !0, e.facebook.error = null, e.facebook.configurable = !1, n.logout().then(a, a).then(function() {
                return t.del(e.facebookConnectForm.action, {
                    dataType: "json"
                })
            }).then(function(t) {
                t.success ? e.facebook.enabled = !1 : (e.facebook.error = t.error, e.facebook.enabled = !0), e.facebook.inProgress = !1
            }, function() {
                e.facebook.enabled = !0, e.facebook.configurable = !0, e.facebook.error = "Unknown error trying to disconnect from facebook", e.facebook.inProgress = !1
            }), !1
        }, e.facebook.enabled && l(), e.manageFacebookPages = function() {
            e.facebookPages.loadingPages = !0, n.requestPermission("manage_pages").then(function(t) {
                t ? (e.facebookPages.needMorePermissions = !1, s()) : e.facebookPages.loadingPages = !1
            }, function() {
                e.facebookPages.loadingPages = !1
            })
        }, e.addFacebookTab = function() {
            e.facebookTabAdded = !1, e.facebookTabWarning = !1, n.addTab().then(function(t) {
                var n = !1;
                for (var r in t.tabs_added)
                    if (t.tabs_added[r])
                        for (var o = 0; o < e.facebookPages.pages.forms.length; o++) {
                            var i = e.facebookPages.pages.forms[o];
                            i.facebook_page_id === r && (i.connected || (n = !0))
                        }
                    e.facebookTabAdded = !n, e.facebookTabWarning = n
            })
        }, e.onTwitterChanged = function() {
            e.twitter.error = null, e.twitter.configurable = !1, e.twitter.inProgress = !0, e.twitter.enabled ? o(e.twitterForm.action).then(function(t) {
                e.twitter.inProgress = !1, t.no_request_token || (t.success ? e.twitter.configurable = !0 : (e.twitter.enabled = !1, e.twitter.error = t.message, e.twitter.configurable = !1), t.twitterSettings && (e.twitterSettings = t.twitterSettings))
            }, function() {
                e.twitter.inProgress = !1, e.twitter.enabled = !1, e.twitter.error = "Connecting to twitter was cancelled", e.twitter.configurable = !1
            }) : t.del(e.twitterForm.action).then(function() {
                e.twitter.inProgress = !1
            })
        }, e.onTumblrChanged = function() {
            e.tumblr.inProgress = !0, e.tumblr.error = null, e.tumblr.configurable = !1, e.tumblr.enabled ? o(e.tumblrForm.action).then(function(t) {
                e.tumblr.inProgress = !1, t.success ? e.tumblr.configurable = !0 : (e.tumblr.enabled = !1, e.tumblr.error = t.message), t.tumblrSettings && (e.tumblrSettings = t.tumblrSettings)
            }, function() {
                e.tumblr.inProgress = !1, e.tumblr.enabled = !1
            }) : t.del(e.tumblrForm.action).then(function() {
                e.tumblr.inProgress = !1
            })
        }, e.onGplusChanged = function() {
            e.gplus.enabled && r.ready ? r.signIn({
                scope: "https://www.googleapis.com/auth/plus.login",
                clientid: e.gplus.clientId,
                apppackagename: "com.mixcloud.player",
                redirecturi: "postmessage",
                accesstype: "offline",
                approvalprompt: "force",
                cookiepolicy: "single_host_origin",
                requestvisibleactions: "http://schemas.google.com/AddActivity http://schemas.google.com/ListenActivity http://schemas.google.com/CreateActivity http://schemas.google.com/CommentActivity",
                callback: c
            }) : (e.gplus.error = null, e.gplus.inProgress = !0, t.del(e.gplusForm.action).then(function() {
                e.gplus.inProgress = !1, e.gplus.enabled = !1
            }))
        }, e.onSoundcloudChanged = function() {
            e.soundcloud.inProgress = !0, e.soundcloud.error = null, e.soundcloud.enabled ? o(e.soundcloudForm.action, {
                width: 1024,
                height: 600
            }).then(function(t) {
                e.soundcloud.inProgress = !1, t.success || (e.soundcloud.enabled = !1, e.soundcloud.error = t.message)
            }, function() {
                e.soundcloud.inProgress = !1, e.soundcloud.enabled = !1
            }) : t.del(e.soundcloudForm.action).then(function() {
                e.soundcloud.inProgress = !1
            })
        }, e.onLastfmChanged = function() {
            e.lastfm.inProgress = !0, e.lastfm.error = null, e.lastfm.enabled ? o(e.lastfmForm.action, {
                width: 1024,
                height: 600
            }).then(function(t) {
                e.lastfm.inProgress = !1, t.success || (e.lastfm.enabled = !1, e.lastfm.error = t.message)
            }, function() {
                e.lastfm.inProgress = !1, e.lastfm.enabled = !1
            }) : t.del(e.lastfmForm.action).then(function() {
                e.lastfm.inProgress = !1
            })
        }
    }]), mixcloudWWW.controller("DeleteAccountCtrl", ["$scope", "login", "navigation", "mHttp", "settings", function(e, t, n, r, o) {
        e.deleteAccount = function() {
            return r.post(e.deleteForm.action, {
                data: {
                    reason: e.reason
                },
                dataType: "json"
            }).then(function(r) {
                r.success ? (t.setLoggedIn(!1), n.navigate(o.urls.settings.account_deleted)) : e.message = r.message
            }), !1
        }
    }]), mixcloudWWW.controller("DropdownCtrl", ["$scope", "hotkeys", function(e, t) {
        function n() {
            e.dropdown.highlander && e.dropdown.highlander.release()
        }
        var r;
        e.dropdown = {
            shown: !1,
            highlander: null
        }, e.$watch("dropdown.shown", function(o, i) {
            o !== i && (o ? (e.dropdown.highlander = e.modalsHighlander.acquire(), e.dropdown.highlander.releasePromise.then(function() {
                r(), t.off(t.ESCAPE, n), e.dropdown.shown = !1, e.dropdown.highlander = null
            }), t.on(t.ESCAPE, n), r = e.$on("navigation:start", n)) : n())
        })
    }]), mixcloudWWW.controller("EmailLoginRegisterCtrl", ["$scope", "mHttp", "login", "refTracking", "trackEvent", "settings", function(e, t, n, r, o, i) {
        e.formData = {}, e.progress = "ready", e.login = function() {
            e.formData.$errors = {}, e.errors = {}, e.progress = "in-progress";
            var a = "sign_up_source",
                l = r.getLinkRef(a),
                s = i.pageState.googleAnalytics.pageType;
            t.post(e.form.action, {
                data: e.formData,
                dataType: "json"
            }).then(function(t) {
                t.success ? (t.authentication.new_registration && l && (o(a, l, s), r.clearLinkRef(a)), e.progress = "done", n.setLoggedIn(!0, t.authentication), e.$emit("action:complete"), e.dialog.close()) : (e.formData.$errors = t.data.$errors, e.errors = t.data.$errors, e.progress = "ready")
            })
        }
    }]), mixcloudWWW.controller("FacebookLoginCtrl", ["$scope", "mHttp", "login", "facebook", "refTracking", "trackEvent", "settings", function(e, t, n, r, o, i, a) {
        var l = !1;
        r.ready.then(function() {
            l = !0, e.showFacebookBlockerError = !1
        }), e.showFacebookBlockerError = !1, e.login = function(s) {
            if (!l) return e.showFacebookBlockerError = !0, void 0;
            var c = "sign_up_source",
                u = o.getLinkRef(c),
                f = a.pageState.googleAnalytics.pageType;
            r.login(a.facebook.perms).then(function(e) {
                var n = {
                    fb_access_token: e.authResponse.accessToken
                };
                return s && (n.ref = s), t.post(a.urls.authentication.facebook_login, {
                    dataType: "json",
                    data: n
                })
            }).then(function(t) {
                t.success ? (t.authentication.new_registration && u && (i(c, u, f), o.clearLinkRef(c)), n.setLoggedIn(!0, t.authentication), e.$emit("action:complete"), e.dialog && e.dialog.close()) : e.errors = t.errors
            }, function() {
                e.errors = {
                    __all__: "Something went wrong when trying to log in. Please try again later."
                }
            })
        }
    }]), mixcloudWWW.controller("FeedbackCtrl", ["$scope", "mHttp", function(e, t) {
        e.sendFeedback = function() {
            t.post(e.feedbackForm.action, {
                dataType: "json",
                data: e.feedbackData
            }).then(function(t) {
                e.success = t.success, e.errors = t.errors
            }, function() {
                e.errors = "Something went wrong while submitting form. Please try again later."
            })
        }
    }]), mixcloudWWW.controller("GlobalMessagesCtrl", ["$scope", "$timeout", "settings", function(e, t, n) {
        e.$watch(function() {
            return n.pageState.messages
        }, function(n) {
            n && (e.globalMessages = n, t(function() {
                e.globalMessages = []
            }, 1e4))
        }), e.dismiss = function(t) {
            e.globalMessages.splice(t, 1)
        }
    }]), mixcloudWWW.controller("NavigateCtrl", ["$scope", "navigation", function(e, t) {
        e.navigate = function(e) {
            t.navigate(e)
        }
    }]), mixcloudWWW.controller("NotificationsCtrl", ["$sce", "$scope", "$timeout", "crossTab", "mHttp", "pageVisibility", function(e, t, n, r, o, i) {
        function a() {
            t.unreadCount && t.markAsReadUrl && (o.post(t.markAsReadUrl), r.emit("clear_unread_count", {
                url: t.markAsReadUrl
            }))
        }

        function l() {
            t.$$destroyed || o.get(t.contentUrl, {
                dataType: "json"
            }).then(function(r) {
                t.unreadCount = r.unread_count, t.contentHtml = e.trustAsHtml(r.notifications_html), u = Date.now(), n.cancel(c), c = n(l, 1e3 * Math.floor(300 + 30 * Math.random()), !1)
            }, function() {
                n.cancel(c), c = n(l, 1e3 * Math.floor(600 + 30 * Math.random()), !1)
            })
        }

        function s(e) {
            n.cancel(c), e && t.contentUrl && (c = Date.now() - u < 3e5 ? n(l, 1e3 * Math.floor(300 + 30 * Math.random()), !1) : n(l, 100, !1))
        }
        t.$watch("dropdown.shown", function(e, t) {
            e && !t && a()
        }), r.on("clear_unread_count", function(e) {
            e.url === t.markAsReadUrl && (t.unreadCount = 0)
        });
        var c = null,
            u = 0;
        i.on("visible", s), t.$on("$destroy", function() {
            n.cancel(c), i.off("visible", s)
        }), t.$watch("contentUrl", function(e) {
            n.cancel(c), e && i.visible && (c = n(l, 100, !1))
        })
    }]), mixcloudWWW.controller("NotificationSettingsCtrl", ["$scope", "settings", "mHttp", function(e, t, n) {
        angular.extend(e, t.pageState.userSettings), e.formData = {}, e.onGlobalNotificationsChanged = function() {
            e.formData.disable_email = !e.globalNotifications.email, n.post(e.form.action, {
                data: e.formData,
                dataType: "json"
            }).then(function(t) {
                t.success && (e.globalEmail = e.globalNotifications.email)
            })
        }
    }]), mixcloudWWW.controller("NPSScoreCtrl", ["$scope", "$timeout", "mHttp", "settings", function(e, t, n, r) {
        e.nps = {
            campaign: "",
            hideScore: !0,
            showSuccessMessage: !1
        }, n.get(r.pageState.npsUrls.campaignName, {
            data: {},
            dataType: "json"
        }).then(function(t) {
            t.campaign && (e.nps.campaign = t.campaign, e.nps.hideScore = !1)
        }), e.submitNPSScore = function(o) {
            e.nps.campaign && n.post(r.pageState.npsUrls.setScore, {
                data: {
                    campaign: e.nps.campaign,
                    score: o
                },
                dataType: "json"
            }).then(function(n) {
                n.success && (e.nps.hideScore = !0, e.nps.showSuccessMessage = !0, t(function() {
                    e.nps.showSuccessMessage = !1
                }, 5e3))
            })
        }, e.closeNPS = function() {
            n.post(r.pageState.npsUrls.close, {
                data: {
                    campaign: e.nps.campaign
                },
                dataType: "json"
            }).then(function(t) {
                t.success && (e.nps.hideScore = !0)
            })
        }
    }]), mixcloudWWW.controller("OnRampGenreCtrl", ["$scope", "navigation", "settings", "trackEvent", function(e, t, n, r) {
        e.MINIMUM_GENRES_TO_SELECT = 1, e.genresSelected = 0, e.genresSelected = n.pageState.genresSelected, e.$on("ajaxtoggle:toggle", function(t, n, o) {
            n ? (r("onramp genre", "selected", o), e.genresSelected += 1) : (r("onramp genre", "deselected", o), e.genresSelected -= 1)
        }), e.nextStep = function() {
            var e = n.urls.onRamp.followUsers;
            n.pageState.linkedFromFeed && (e += "?linked_from_feed=1"), t.navigate(e)
        }
    }]), mixcloudWWW.controller("OnRampFollowCtrl", ["$compile", "$scope", "settings", function(e, t, n) {
        var r;
        t.followedUsers = 0, t.genreAjaxLoad = {}, t.genres = n.pageState.genresSelectState, t.previewing = [], t.selectedGenre = n.pageState.selectedGenre, t.showMoreCategories = !1, t.toggleFollowAll = {}, t.followAll = function(e) {
            t.$broadcast("ajaxtoggle:togglemany", !1, e), t.toggleFollowAll[e] = !0
        }, t.unfollowAll = function(e) {
            t.$broadcast("ajaxtoggle:togglemany", !0, e), t.toggleFollowAll[e] = !1
        }, t.isFollowingMinimumUserCount = function(e) {
            return t.followedUsers >= e
        }, t.isFollowingSuggestedUserCount = function(e) {
            return t.followedUsers >= e
        }, t.selectGenre = function(e, n) {
            t.search.searching && (t.search.searching = !1), t.selectedGenre = e, n || t.genreAjaxLoad[e] || (t.$broadcast("ajaxload", e), t.genreAjaxLoad[e] = "loaded")
        }, t.genreClass = function(e) {
            return e === t.selectedGenre
        }, t.toggleMoreCategories = function() {
            t.genres[t.selectedGenre] === !1 && (t.selectedGenre = n.pageState.selectedGenre), t.showMoreCategories = !t.showMoreCategories
        }, t.$on("ajaxtoggle:toggle", function(e, n) {
            n ? t.followedUsers++ : t.followedUsers--
        }), t.$watch("search.searching", function(e) {
            e ? (t.search.filters.values.type = "users", r = t.selectedGenre, t.selectedGenre = "") : e || t.selectedGenre || (t.selectedGenre = r)
        })
    }]), mixcloudWWW.controller("OnRampEmailCtrl", ["$scope", "$timeout", "mHttp", "navigation", "settings", "trackEvent", function(e, t, n, r, o, i) {
        var a = 3e3;
        e.appSelected = null, e.skipSend = null, e.sendAndroidLink = function() {
            e.appSelected = !0, n.post(o.urls.onRamp.sendAndroid), l(), i("onramp send app", "android")
        }, e.sendiOSLink = function() {
            e.appSelected = !0, n.post(o.urls.onRamp.sendiOS), l(), i("onramp send app", "ios")
        }, e.skipSendLink = function() {
            e.skipSend = !0, l(), i("onramp send app", "skip")
        };
        var l = function() {
            t(function() {
                r.navigate(o.urls.home + "?preview=1")
            }, a)
        }
    }]), mixcloudWWW.controller("PasswordResetCtrl", ["$scope", "mHttp", function(e, t) {
        e.emailPasswordReset = function() {
            n(e.resetForm)
        }, e.generalPasswordReset = function() {
            n(e.generalResetForm)
        };
        var n = function(n) {
            n.$valid && t.post(n.action, {
                dataType: "json",
                data: e.resetData
            }).then(function(t) {
                t.success ? e.emailSent = !0 : t.suggest_facebook ? e.suggestFacebookLogin = !0 : e.errors = t.errors
            }, function() {
                e.errors = {
                    __all__: "Something went wrong, please try again later"
                }
            })
        }
    }]), mixcloudWWW.controller("PaymentCtrl", ["$q", "$scope", "googleAnalytics", "mHttp", "navigation", "stripe", "trackEvent", function(e, t, n, r, o, i, a) {
        function l(e, l) {
            function c(e) {
                t.payment.eventCategory && a(t.payment.eventCategory, "stripe_success");
                var i = {
                    stripeToken: e.id
                };
                angular.extend(i, l || {}), t.payment.loading = !0, r.post(t.payment.postUrl, {
                    data: i,
                    dataType: "json"
                }).then(function(e) {
                    return e.error ? (t.payment.cardError = !0, s(), void 0) : (e && e.ecommerce && n.trackEcommerceTransaction(e.ecommerce.grand_total, e.ecommerce.currency, e.ecommerce.product_name, e.ecommerce.product_category, e.ecommerce.unit_price, e.ecommerce.quantity), o.navigate(t.payment.redirectUrl), void 0)
                }, s)
            }
            t.payment.eventCategory && a(t.payment.eventCategory, "stripe_open");
            var u = i.open(e.amount, e.currency, e.name, e.description, e.label, e.email);
            u.token.then(c), u.close.then(s)
        }

        function s() {
            c.beforeFinish(), t.payment.processing = !1, t.payment.loading = !1
        }
        var c = this;
        t.payment = {
            cardError: !1,
            processing: !1,
            loading: !1,
            pay: function(e) {
                this.processing || (this.processing = !0, c.beforePay(e).then(function(t) {
                    l(e, t)
                }, s))
            }
        }, c.beforePay = function() {
            var t = e.defer();
            return t.resolve(), t.promise
        }, c.beforeFinish = angular.noop
    }]), mixcloudWWW.controller("AbstractSubscriptionPaymentCtrl", ["$controller", "$q", "$scope", "login", "mHttp", "navigation", "settings", function(e, t, n, r, o, i, a) {
        var l = this,
            s = e("PaymentCtrl", {
                $scope: n
            }),
            c = null;
        n.payment.planProcessing = {}, s.beforeFinish = function() {
            angular.forEach(n.payment.planProcessing, function(e, t) {
                n.payment.planProcessing[t] = !1
            })
        }, s.beforePay = function(e) {
            return n.payment.planProcessing[e.interval] = !0, r.requireLoggedIn().then(function() {
                return {
                    then: function(e, t) {
                        l.checkForSubscriber(r.getCurrentUser()) ? (i.navigate(l.subscriberRedirectUrl), t()) : e()
                    }
                }
            }).then(function() {
                return {
                    then: function(e, t) {
                        o.isInProgress(c) ? c.then(function() {
                            e()
                        }, function() {
                            n.payment.showCouponError = !0, t()
                        }) : n.payment.invalidCoupon() ? (n.payment.showCouponError = !0, t()) : e()
                    }
                }
            }).then(function() {
                return {
                    then: function(t) {
                        n.payment.coupon ? (e.description = "with " + n.payment.couponDescription(), t({
                            coupon: n.payment.coupon.name,
                            plan: e.plan
                        })) : t({
                            plan: e.plan
                        })
                    }
                }
            })
        }, l.subscriberRedirectUrl = null, l.checkForSubscriber = angular.noop, n.payment.invalidCoupon = function() {
            return !(!n.payment.couponName || n.payment.coupon)
        }, n.payment.couponDescription = function() {
            return n.payment.coupon ? 100 === n.payment.coupon.percentOff ? n.payment.coupon.durationInMonths + " month" + (1 === n.payment.coupon.durationInMonths ? "" : "s") + " free" : n.payment.coupon.percentOff + "% off for " + n.payment.coupon.durationInMonths + " month" + (1 === n.payment.coupon.durationInMonths ? "" : "s") : null
        }, n.$watch("payment.couponName", function(e) {
            n.payment.coupon = null, n.payment.showCouponError = !1, e && (o.cancel(c), c = o.get(a.urls.subscription.couponDetails, {
                data: {
                    name: e
                },
                dataType: "json"
            }), c.then(function(e) {
                n.payment.coupon = {
                    percentOff: e.percent_off,
                    durationInMonths: e.duration_in_months,
                    name: e.name
                }
            }, function() {
                n.payment.coupon = null
            }))
        })
    }]), mixcloudWWW.controller("PremiumPaymentCtrl", ["$controller", "$scope", "login", "navigation", "settings", function(e, t, n, r, o) {
        var i = e("AbstractSubscriptionPaymentCtrl", {
            $scope: t
        });
        i.subscriberRedirectUrl = o.urls.premium, i.checkForSubscriber = function(e) {
            return e.isPremium
        }, t.payment.postUrl = o.urls.subscription.subscribe, t.payment.redirectUrl = o.urls.subscription.premiumWelcome, t.payment.eventCategory = "premium"
    }]), mixcloudWWW.controller("ProPaymentCtrl", ["$controller", "$scope", "login", "navigation", "settings", function(e, t, n, r, o) {
        var i = e("AbstractSubscriptionPaymentCtrl", {
            $scope: t
        });
        i.subscriberRedirectUrl = o.urls.pro, i.checkForSubscriber = function(e) {
            return e.isPro
        }, t.payment.postUrl = o.urls.subscription.subscribe, t.payment.redirectUrl = o.urls.subscription.proWelcome, t.payment.eventCategory = "pro"
    }]), mixcloudWWW.controller("PlayerQueueCtrl", ["$controller", "$rootScope", "$scope", "addToQueue", "crossTab", "localStorageWrapper", "mHttp", "settings", "sourceTracking", "uniqueId", "webPlayer", function(e, t, n, r, o, i, a, l, s, c, u) {
        function f() {
            a.cancel(b);
            var e = n.playerQueue.cloudcastQueue.length - 1;
            if (e >= 0 && n.playerQueue.cloudcastQueue[e].nowPlaying) {
                var t = n.playerQueue.cloudcastQueue[e].url;
                if (n.playerQueue.upNext && n.playerQueue.upNext.seed === t) return;
                b = a.get(l.urls.player.upNext, {
                    data: {
                        key: t
                    },
                    dataType: "json"
                }), b.then(function(e) {
                    n.playerQueue.upNext = e.upNext ? {
                        seed: t,
                        nextCloudcast: e.nextCloudcast
                    } : null
                }, function() {
                    n.playerQueue.upNext = null
                })
            } else n.playerQueue.upNext = null
        }

        function d(e, t, r) {
            var o = n.playerQueue.cloudcastQueue.length,
                i = r || 0 === o,
                a = o;
            if (t)
                for (var l = 0; o - 1 > l; l++)
                    if (n.playerQueue.cloudcastQueue[l].nowPlaying) {
                        a = l + 1;
                        break
                    }
            n.playerQueue.cloudcastQueue.splice.apply(n.playerQueue.cloudcastQueue, [a, 0].concat(e)), i && n.playerQueue.playFromQueue(n.playerQueue.cloudcastQueue[a]), n.playerQueue.cloudcastQueue.length > 1 && (n.webPlayer.upNextOpen = !0), r || h()
        }

        function p(e) {
            d([e])
        }

        function h() {
            x || (x = !0, m(), g(), n.$watch("playerQueue.cloudcastQueue", m, !0), n.$on("$destroy", function() {
                u.off("position", v), u.off("url", g)
            }), u.on("position", v), u.on("url", g))
        }

        function m() {
            i.setItem("mx:player:queue_state", JSON.stringify(n.playerQueue.cloudcastQueue))
        }

        function g() {
            void 0 !== u.position && void 0 !== u.duration && i.setItem("mx:player:position_state", JSON.stringify({
                position: u.position,
                duration: u.duration
            }))
        }

        function v(e) {
            e && 0 === e % 5 && g()
        }

        function y() {
            var e, t = null,
                r = null;
            try {
                t = JSON.parse(i.getItem("mx:player:queue_state")), r = JSON.parse(i.getItem("mx:player:position_state"))
            } catch (o) {}
            if (t && t.length && !(1 === t.length && r && r.duration - r.position < 120)) {
                for (e = 0; e < t.length; e++) t[e].hashKey = c();
                n.playerQueue.cloudcastQueue = t;
                var a;
                for (e = 0; e < n.playerQueue.cloudcastQueue.length; e++)
                    if (n.playerQueue.cloudcastQueue[e].nowPlaying) {
                        a = n.playerQueue.cloudcastQueue[e];
                        break
                    }
                w.load({
                    playerInfo: a,
                    positionState: r,
                    startPlaying: !1
                }), n.playerQueue.cloudcastQueue.length > 1 && (n.webPlayer.upNextOpen = !0), h()
            }
        }
        var w = e("PlayerCtrl", {
                $scope: n
            }),
            b = null;
        n.playerQueue = {
            cloudcastQueue: [],
            upNext: null,
            removeItem: function(e) {
                n.playerQueue.cloudcastQueue.splice(e, 1)
            },
            playFromQueue: function(e) {
                e.nowPlaying || (w.load({
                    playerInfo: {
                        url: e.url,
                        p_ref: e.pRef,
                        play_info: e.playInfo,
                        from_upnext: !!e.fromUpNext
                    },
                    startPlaying: !0
                }), angular.forEach(n.playerQueue.cloudcastQueue, function(t) {
                    t.nowPlaying = t === e
                }), f())
            },
            playUpNext: function() {
                n.playerQueue.upNext && !n.playerQueue.upNext.hide && (s.setWithinSiteDetail(n.playerQueue.upNext.nextCloudcast.promoted ? "Promoted" : "Up Next", n.playerQueue.upNext.nextCloudcast.profileNamespace, n.profileNamespace), p(n.playerQueue.upNext.nextCloudcast), n.playerQueue.playFromQueue(n.playerQueue.cloudcastQueue[n.playerQueue.cloudcastQueue.length - 1]))
            },
            makeHashKey: function(e) {
                return e.hashKey || (e.hashKey = c()), e.hashKey
            }
        }, n.$watchCollection("playerQueue.cloudcastQueue", f), w.onPlayEvent = function(e, t) {
            var r;
            if (angular.isArray(e)) {
                if (0 === e.length) return;
                n.playerQueue.cloudcastQueue = e;
                var o = e[0];
                o.nowPlaying = !0, w.load({
                    playerInfo: {
                        url: o.url,
                        p_ref: o.pRef,
                        play_info: o.playInfo
                    },
                    startPlaying: !0
                }), n.webPlayer.upNextOpen = !0
            } else {
                var i = {
                        url: e.url,
                        pRef: e.p_ref,
                        playInfo: e.play_info
                    },
                    a = !1;
                for (r = 0; r < n.playerQueue.cloudcastQueue.length - 1; r++)
                    if (n.playerQueue.cloudcastQueue[r].nowPlaying) {
                        n.playerQueue.cloudcastQueue.splice(r + 1, 0, i), n.playerQueue.playFromQueue(i), a = !0, n.webPlayer.upNextOpen = !0;
                        break
                    }
                a || (i.nowPlaying = !0, n.playerQueue.cloudcastQueue = [i], w.load({
                    playerInfo: e,
                    startPlaying: !0
                }))
            }
            t || h()
        }, w.onEnded = function() {
            for (var e = 0; e < n.playerQueue.cloudcastQueue.length - 1; e++)
                if (n.playerQueue.cloudcastQueue[e].nowPlaying) return n.playerQueue.playFromQueue(n.playerQueue.cloudcastQueue[e + 1]), void 0;
            n.playerQueue.playUpNext()
        }, n.$watch("player.currentCloudcast", function(e) {
            e && $.each(n.playerQueue.cloudcastQueue, function() {
                this.url === e.url && (this.title = e.title, this.owner = e.owner, this.wwwThumbnail = e.wwwThumbnail, this.primaryColor = e.primaryColor)
            })
        }), r.on(p), n.$on("$destroy", function() {
            r.off(p)
        });
        var x = !1;
        l.readyPromise.then(function() {
            function e(e) {
                l.pageState.autoplayAll ? d(l.pageState.autoplayAll, !0, !0) : l.pageState.autoplay && (e || l.pageState.autoplayReplaceIfPlaying) && w.onPlayEvent(l.pageState.autoplay, !0)
            }
            o.emit("check_for_player").then(function() {
                e(!1)
            }, function() {
                n.playerQueue.cloudcastQueue.length || y(), e(!0)
            })
        })
    }]), mixcloudWWW.controller("PlaylistDeleteCtrl", ["$scope", "mHttp", "navigation", function(e, t, n) {
        e.deleteInProgress = !1, e.deletePlaylist = function() {
            e.deleteInProgress || (e.deleteInProgress = !0, t.post(e.deletePlaylistUrl, {
                dataType: "json"
            }).then(function(t) {
                t.success ? n.navigate(t.nextUrl) : (e.deleteInProgress = !0, e.confirmDelete = !1)
            }, function() {
                e.deleteInProgress = !0, e.confirmDelete = !1
            }))
        }
    }]), mixcloudWWW.controller("PlaylistEditCtrl", ["$scope", "formset", "mHttp", "navigation", "settings", function(e, t, n, r, o) {
        e.playlistItems = o.pageState.playlistEdit.formset.playlistItems, e.playlistName = o.pageState.playlistEdit.playlistName, e.saveInProgress = !1, e.savePlaylist = function() {
            if (!e.saveInProgress) {
                var i = {
                    name: e.playlistName
                };
                angular.extend(i, t(o.pageState.playlistEdit.formset.prefix, o.pageState.playlistEdit.formset.INITIAL_FORMS, o.pageState.playlistEdit.formset.MAX_NUM_FORMS, e.playlistItems.map(function(e, t) {
                    return {
                        id: e.id,
                        weight: t + 1,
                        DELETE: e.toDelete ? "true" : "false"
                    }
                }))), e.saveInProgress = !0, e.editError = null, n.post(e.editPlaylistForm.action, {
                    data: i,
                    dataType: "json"
                }).then(function(t) {
                    t.success ? r.navigate(t.nextUrl) : (e.editError = t.message, e.saveInProgress = !1)
                }, function() {
                    e.editError = "There was a problem fulfilling your request. Please try again later.", e.saveInProgress = !1
                })
            }
        }
    }]), mixcloudWWW.controller("PreviewHintCtrl", ["$scope", function(e) {
        e.previewHint = {
            hide: !1
        }, e.modals.modalOverlay = !0;
        var t = e.$watch("modalsHighlander", function(n) {
            if (n) {
                t();
                var r = e.modalsHighlander.acquire();
                r.releasePromise.then(function() {
                    e.previewHint.hide = !0, e.modals.modalOverlay = !1
                }), e.$on("preview:start", function() {
                    r.release()
                })
            }
        })
    }]), mixcloudWWW.controller("ProfileSettingsCtrl", ["$q", "$scope", "$timeout", "formset", "mHttp", "navigation", "settings", "featureDetection", function(e, t, n, r, o, i, a, l) {
        function s(e) {
            return e[0].success === !1 ? (c(), void 0) : (t.userSettings.successSubmit = !0, e[0].nextUrl && i.navigate(e[0].nextUrl), void 0)
        }

        function c() {
            t.userSettings.networkError = !0, n(function() {
                t.userSettings.savingPersonal = !1
            }, 1e3)
        }
        angular.extend(t, a.pageState.userSettings), t.brandedDetails = a.pageState.userSettings.brandedDetails, t.personalDetails = a.pageState.userSettings.personalDetails, t.userSettings = {
            coverPictureUrl: a.pageState.userSettings.coverPictureUrl,
            networkError: !1,
            personalDetailsUrl: a.pageState.userSettings.personalDetailsUrl,
            profilePictureUrl: a.pageState.userSettings.profilePictureUrl,
            savingPersonal: !1,
            menuItems: a.pageState.customNavigation.menuItems
        }, t.savePersonal = function() {
            t.userSettings.networkError = !1;
            var n = {};
            t.brandedDetails.backgroundTiled && (n.background_tiled = t.brandedDetails.backgroundTiled), t.brandedDetails.backgroundColor && (n.background_color = t.brandedDetails.backgroundColor), t.personalDetails.biog && (n.biog = t.personalDetails.biog), t.personalDetails.birthyear && (n.birthyear = t.personalDetails.birthyear), t.personalDetails.city && (n.city = t.personalDetails.city), t.personalDetails.country && (n.country = t.personalDetails.country), t.personalDetails.display_name && (n.display_name = t.personalDetails.display_name), t.personalDetails.gender && (n.gender = t.personalDetails.gender), angular.extend(n, r("menu_items", t.userSettings.menuItems.length, t.userSettings.menuItems.length, t.userSettings.menuItems));
            var i = [];
            l.test("FormData") ? (t.brandedDetails.background_picture && (n.background_picture = t.brandedDetails.background_picture.file), t.personalDetails.cover_picture && (n.cover_picture = t.personalDetails.cover_picture.file), t.personalDetails.profile_picture && (n.picture = t.personalDetails.profile_picture.file), i.push(o.post(t.userSettings.personalDetailsUrl, {
                formData: n,
                dataType: "json"
            }))) : (i.push(o.post(t.userSettings.personalDetailsUrl, {
                data: n,
                dataType: "json"
            })), t.brandedDetails.background_picture && i.push(t.brandedDetails.background_picture.postTo(t.brandedDetails.backgroundPictureUrl)), t.personalDetails.cover_picture && i.push(t.personalDetails.cover_picture.postTo(t.userSettings.coverPictureUrl)), t.personalDetails.profile_picture && i.push(t.personalDetails.profile_picture.postTo(t.userSettings.profilePictureUrl))), t.userSettings.savingPersonal = !0, e.all(i).then(s, c)
        }
    }]), mixcloudWWW.controller("PromoteCtrl", ["$controller", "$q", "$scope", "settings", function(e, t, n, r) {
        var o = e("PaymentCtrl", {
            $scope: n
        });
        n.payment.eventCategory = "promotions", n.promote = n.promote || {}, angular.extend(n.promote, {
            days: 5,
            show: !1
        }), o.beforePay = function(e) {
            var r = t.defer();
            return e.amount = n.promote.days * n.promote.pricePerDay, e.description = "Purchase " + n.promote.days + " day" + (1 === n.promote.days ? "" : "s") + " of promotion", r.resolve({
                days_active: n.promote.days
            }), r.promise
        }, r.readyPromise.then(function() {
            "promote" === r.pageState.initialHash && (n.promote.show = !0)
        })
    }]), mixcloudWWW.controller("RegisterFollowBumperCtrl", ["$scope", "mHttp", function(e, t) {
        e.$on("action:complete", function() {
            t({
                method: "POST",
                url: e.followUrl,
                data: {
                    ref: "register_bumper"
                }
            })
        })
    }]), mixcloudWWW.controller("SearchCtrl", ["$scope", function(e) {
        e.search = {}
    }]), mixcloudWWW.controller("SoundcloudImportCtrl", ["$scope", "formset", "mHttp", "navigation", "popupWindow", "settings", function(e, t, n, r, o, i) {
        e.soundcloud = {}, e.totalSelected = 0, e.totalSounds = 0;
        var a = function() {
            e.soundcloud.fetchingInProgress = !0, e.soundcloud.fetchError = null, n.post(i.pageState.soundcloud.fetchUrl, {
                dataType: "json"
            }).then(function(t) {
                e.soundcloud.fetchingInProgress = !1, t.success ? (e.soundcloud.sounds = t.sounds, e.totalSounds = e.soundcloud.sounds.reduce(function(e, t) {
                    return t.disable ? e : e + 1
                }, 0)) : e.soundcloud.fetchError = t.error
            }, function() {
                e.soundcloud.fetchError = "Something went wrong, please try again later"
            })
        };
        e.soundcloudConnect = function() {
            e.soundcloud.connectInProgress = !0, e.soundcloud.connectError = null, o(i.pageState.soundcloud.connectUrl, {
                width: 1024,
                height: 600
            }).then(function(t) {
                e.soundcloud.connectInProgress = !1, t.success ? (e.soundcloud.connected = !0, a()) : e.soundcloud.connectError = t.message
            }, function() {
                e.soundcloud.connectInProgress = !1
            })
        }, e.toggleSelected = function(t) {
            t.disable || (t.selected = !t.selected, t.selected ? e.totalSelected++ : e.totalSelected--)
        }, e.selectAll = function() {
            e.totalSelected < e.totalSounds ? e.soundcloud.sounds.forEach(function(t) {
                t.disable || t.selected || e.toggleSelected(t)
            }) : e.soundcloud.sounds.forEach(function(t) {
                !t.disable && t.selected && e.toggleSelected(t)
            })
        }, e.startImport = function() {
            if (e.totalSelected) {
                e.soundcloud.importInProgress = !0;
                var o = [];
                e.soundcloud.sounds.forEach(function(e) {
                    !e.disable && e.selected && o.push({
                        name: e.name,
                        id: e.id,
                        publish_date: e.publish_date
                    })
                }), n.post(i.pageState.soundcloud.importUrl, {
                    data: t("tracks", o.length, o.length, o),
                    dataType: "json"
                }).then(function(t) {
                    e.soundcloud.fetchingInProgress = !1, t.success ? r.navigate(t.next_url) : e.soundcloud.importError = t.error, e.soundcloud.importInProgress = !1
                }, function() {
                    e.soundcloud.importError = "Something went wrong, please try again later", e.soundcloud.importInProgress = !1
                })
            }
        }, e.init = function() {
            e.soundcloud.connected = i.pageState.soundcloud.connected, e.soundcloud.connected && a()
        }
    }]), mixcloudWWW.controller("SpeedbarCtrl", ["$q", "$scope", "mHttp", "settings", function(e, t, n, r) {
        function o() {
            i().then(function() {
                t.details = a[t.activeMetric], t.detailHeadings = [], t.details.length && angular.forEach(t.details[0], function(e, n) {
                    "$" !== n.charAt(0) && t.detailHeadings.push(n)
                })
            })
        }

        function i() {
            var o = e.defer();
            return null === a ? (t.loadingDetails = !0, n.get(r.pageState.speedbar.details_url, {
                dataType: "json"
            }).then(function(e) {
                a = e, t.loadingDetails = !1, o.resolve()
            }, function() {
                t.loadingDetails = !1, o.reject()
            })) : o.resolve(), o.promise
        }
        var a = null;
        t.$watch(function() {
            return r.pageState.speedbar
        }, function(e) {
            t.speedbar = e, a = null, t.showDetails && o()
        }), t.togglePanel = function(e) {
            e !== t.activeMetric ? (t.showDetails = !0, t.activeMetric = e, o()) : (t.showDetails = !1, t.activeMetric = null)
        }
    }]), mixcloudWWW.controller("StatsTotalsCtrl", ["$scope", "mHttp", function(e, t) {
        var n = this;
        this.loading = !0, this.init = function(e) {
            t.get(e, {
                dataType: "json"
            }).then(function(e) {
                n.loading = !1, n.totals = e
            })
        }
    }]), mixcloudWWW.controller("UserProfileEmbedCtrl", ["$sce", "$scope", "debounce", "userProfileEmbed", function(e, t, n, r) {
        function o(e) {
            t.widgetSizeUI = e, t.widget.width = e.width, t.widget.height = e.height
        }
        var i = r(),
            a = !0;
        t.profilePreviewCode = null, t.widget = null, t.widgetSizeUI = null, t.profileMaxWidthUI = 325, t.profileMaxHeightUI = 250, t.profileAdvancedOptions = {
            profileFullWidth: !1
        }, t.profileInit = function(e, n) {
            var r = i.getWidgetSize(n);
            t.widget = {
                defaultCode: n,
                generator: i.getEmbedCode,
                validateSize: i.validateEmbedSize
            }, o(r), t.profileShareLink = e, t.profileAdvancedOptions = i.getWidgetOptions(n)
        }, t.getProfileEmbedCode = function() {
            return t.widget && t.widget.generator ? t.widget.generator(t.widget.defaultCode, t.widget.width, t.widget.height, t.profileAdvancedOptions, t.profileAdvancedOptions.profileFullWidth, !1, t.profileMaxWidthUI, t.profileMaxHeightUI) : null
        }, t.getProfilePreviewEmbedCode = function() {
            return t.widget && t.widget.generator ? t.widget.generator(t.widget.defaultCode, t.widget.width, t.widget.height, t.profileAdvancedOptions, t.profileAdvancedOptions.profileFullWidth, !0, t.profileMaxWidthUI, t.profileMaxWidthUI) : null
        }, t.getProfileWordpressEmbedCode = function() {
            return t.widget ? i.getWordpressEmbedCode(t.profileShareLink, t.widget.width, t.widget.height, t.profileAdvancedOptions, t.profileAdvancedOptions.profileFullWidth) : null
        }, t.$watch(t.getProfileEmbedCode, function(e) {
            e && (t.profileCode = e.code)
        }, !0), t.$watch(t.getProfilePreviewEmbedCode, n(function(n) {
            n && (a = !1, t.$apply(function() {
                t.profilePreviewCode = e.trustAsHtml(n.code), t.profilePreviewWidth = n.widthUI, t.profilePreviewHeight = n.heightUI
            }))
        }, function() {
            return a ? 0 : 200
        }), !0), t.$watch(t.getProfileWordpressEmbedCode, function(e) {
            e && (t.profileWordpressShortcode = e)
        }, !0), t.$watch("widgetSizeUI.width", n(function(e) {
            if (e) {
                var n = t.widget && t.widget.validateSize ? t.widget.validateSize(e, t.widget.height) : null;
                n && (t.$$phase ? o(n) : t.$apply(function() {
                    o(n)
                }))
            }
        }, 1e3))
    }]), mixcloudWWW.directive("mAddClassAndRemove", ["cssTransitions", function(e) {
        return function(t, n, r) {
            t.$watch(r.mAddClassAndRemove, function(t, r) {
                t && r !== t && e.addClassAndRemove(n, "m-removing")
            })
        }
    }]), mixcloudWWW.directive("mAddToQueue", ["addTouchClickListener", "addToQueue", function(e, t) {
        return function(n, r, o) {
            e(r, function() {
                n.$apply(function() {
                    t.add(n.$eval(o.mAddToQueue))
                })
            })
        }
    }]), mixcloudWWW.directive("mAjaxLoadUrl", ["cancellableTimeout", "mHttp", function(e, t) {
        return function(n, r, o) {
            var i = e(),
                a = null;
            n.ajaxLoad = {}, n.$on("ajaxload", function(e, l, s) {
                l === o.mAjaxLoad && i.schedule(function() {
                    n.$apply(function() {
                        var e;
                        n.ajaxLoad.loading = !0, "mAjaxLoadClone" in o ? (e = r.clone(), e.removeAttr("m-ajax-load", "m-ajax-load-clone", "m-ajax-load-url"), r.after(e), a = t.load(e, n, o.mAjaxLoadUrl, s)) : a = t.load(r, n, o.mAjaxLoadUrl, s), a.then(function() {
                            n.ajaxLoad.loading = !1
                        }, function() {
                            n.ajaxLoad.loading = !1
                        })
                    })
                })
            })
        }
    }]), mixcloudWWW.directive("mAutoFillFix", ["$window", function(e) {
        return {
            require: "ngModel",
            link: function(t, n, r, o) {
                e.requestAnimationFrame(function() {
                    t.$apply(function() {
                        o.$setViewValue(n.val())
                    })
                })
            }
        }
    }]), mixcloudWWW.directive("mAutoSubmit", ["cancellableTimeout", "safeApply", function(e, t) {
        var n = 750;
        return {
            link: function(r, o) {
                var i = e();
                o.on("change", "input, textarea, select", function() {
                    t(r, function() {
                        r.$emit("form:willSubmit")
                    }), i.schedule(function() {
                        o.submit()
                    }, n)
                })
            }
        }
    }]), mixcloudWWW.directive("mAutoSubmitOnModelChange", ["cancellableTimeout", function(e) {
        var t = 750;
        return {
            link: function(n, r, o) {
                var i = e();
                n.$watch(o.mPostOnSubmit, function(e, o) {
                    e !== o && (n.$emit("form:willSubmit"), i.schedule(function() {
                        r.submit()
                    }, t))
                }, !0)
            }
        }
    }]), mixcloudWWW.directive("mBind", ["$parse", function(e) {
        return {
            link: function(t, n, r) {
                var o = e(r.mBind),
                    i = o(t);
                void 0 === i ? o.assign(t, n.text()) : n.text(i), t.$watch(r.mBind, function(e) {
                    n.text(void 0 === e ? "" : e)
                })
            }
        }
    }]), mixcloudWWW.directive("mBindAttrs", ["$parse", function(e) {
        return function(t, n, r) {
            angular.forEach(t.$eval(r.mBindAttrs), function(o, i) {
                var a = e(o),
                    l = a(t);
                void 0 === l ? a.assign(t, n.attr(i)) : r.$set(i, l), t.$watch(o, function(e) {
                    r.$set(i, void 0 === e ? "" : e)
                })
            })
        }
    }]), mixcloudWWW.directive("mBindHtml", ["$compile", "$parse", "$sce", function(e, t, n) {
        return {
            controller: function() {},
            link: function(r, o, i, a) {
                function l(e) {
                    a.$render(n.getTrustedHtml(e))
                }
                var s = t(i.mBindHtml),
                    c = s(r);
                a.$render = a.$render || function(t) {
                    o.html(t || ""), e(o.contents())(r)
                }, void 0 === c ? s.assign(r, n.trustAsHtml(o.html())) : l(c), r.$watch(function() {
                    return "" + (s(r) || "")
                }, function() {
                    l(s(r))
                })
            }
        }
    }]), mixcloudWWW.directive("mClipboardText", ["$document", function(e) {
        ZeroClipboard.setDefaults({
            moviePath: "/media/swf/clipboard/ZeroClipboard.swf"
        });
        var t = new ZeroClipboard,
            n = null,
            r = !1;
        return t.on("mouseover", function() {
                $(this).trigger("mouseover"), r = !0
            }), t.on("mouseout", function() {
                $(this).trigger("mouseout")
            }), t.on("mouseup", function() {
                $(this).trigger("click")
            }), t.on("dataRequested", function(e) {
                e.setText(n())
            }),
            function(o, i, a) {
                function l(n) {
                    if (r) return e.off("mousemove", l), void 0;
                    var o = n.pageX - i.offset().left,
                        a = n.pageY - i.offset().top;
                    o >= 0 && o <= i.outerWidth() && a >= 0 && a <= i.outerHeight() || (e.off("mousemove", l), t.receiveEvent("mouseout"))
                }

                function s() {
                    return a.mClipboardText
                }
                t.glue(i), i.on("$destroy", function() {
                    t.unglue(i)
                }), i.on("mouseover", function() {
                    r || e.on("mousemove", l), n = s
                })
            }
    }]), mixcloudWWW.directive("mColorPicker", ["$parse", "safeApply", function(e, t) {
        return {
            scope: !0,
            controller: "DropdownCtrl",
            template: '<div class="picker-button" m-tooltip="Pick a color" ng-style="{\'background-color\':color}" m-click="dropdown.shown=!dropdown.shown" m-stop-propagation></div><div class="embed-picker-holder" ng-show="dropdown.shown" m-stop-propagation="click">    <div id="embed-picker-wrapper">         <div m-picker id="embed-picker"></div>         <div m-picker-indicator id="embed-picker-indicator"></div>     </div>     <div id="embed-slider-wrapper">         <div m-slider id="embed-slider"></div>         <div m-slider-indicator id="embed-slider-indicator"></div>     </div>     <div class="close-picker close close-light" m-click="dropdown.shown=false"></div></div>',
            require: "ngModel",
            link: function(n, r, o) {
                var i = e(o.ngModel),
                    a = r.find("[m-slider-indicator]")[0],
                    l = r.find("[m-picker-indicator]")[0];
                n.$watch(o.ngModel, function(e) {
                    n.color = e, n.color && "#" !== n.color.charAt(0) && (n.color = "#" + n.color)
                }), n.$on("editimage:color", function(e, t) {
                    t && n.dropdown.shown && i.assign(n, t)
                }), ColorPicker.fixIndicators(a, l), ColorPicker(r.find("[m-slider]")[0], r.find("[m-picker]")[0], function(e, r, o, s, c) {
                    i.assign(n, e.replace(/^#/, "")), t(n), ColorPicker.positionIndicators(a, l, c, s)
                })
            }
        }
    }]), mixcloudWWW.directive("mCommentPopover", ["$timeout", "addTouchClickListener", function(e, t) {
        return function(n, r) {
            n.commentPopover = {
                success: !1
            }, t(r, function(e) {
                e.target === r[0] && n.postUrl && n.$apply(function() {
                    n.dropdown.shown = !n.dropdown.shown
                }), e.stopPropagation()
            });
            var o = null;
            n.$on("comment:success", function() {
                n.commentPopover.success = !0, o = e(function() {
                    n.dropdown.highlander && n.dropdown.highlander.release()
                }, 2e3)
            }), n.$watch("dropdown.shown", function() {
                n.commentPopover.success = !1, e.cancel(o)
            })
        }
    }]), mixcloudWWW.directive("mCommentList", ["$compile", "$parse", "$rootScope", function(e, t, n) {
        return {
            compile: function(r, o) {
                var i = o.mCommentList,
                    a = i.match(/\s*(.*)\s+in\s+(.*)\s*/),
                    l = a[1],
                    s = a[2],
                    c = n.$new(),
                    u = r.children(),
                    f = u.eq(0),
                    d = [];
                u = u.slice(1);
                for (var p = 0; p < u.length; p++) d[p] = c[l] = {}, e(u[p])(c);
                return c.$destroy(), u.remove(), f.attr("ng-repeat", i),
                    function(e) {
                        var n = t(s);
                        void 0 === n(e) && n.assign(e, d)
                    }
            }
        }
    }]), mixcloudWWW.directive("mCompetitionTracking", ["mHttp", function(e) {
        return function(t, n, r) {
            e.post(r.mCompetitionTracking, {
                data: {
                    competition: r.mCompetition,
                    referring_url: r.mReferringUrl,
                    referring_source: r.mReferringSource
                },
                dataType: "json"
            })
        }
    }]), mixcloudShared.directive("mDfpSlot", ["$window", "afterFirstPaint", "dfp", function(e, t, n) {
        return function(r, o, i) {
            function a() {
                o.data("deferred", "no"), u.init()
            }

            function l() {
                o.data("deferred", s() ? "no" : "yes"), o.off("dfp:check_deferred", l)
            }

            function s() {
                return null === p && (p = $(e), d = p.height()), o[0].getBoundingClientRect().top < d
            }

            function c() {
                s() && (p.off("scroll", c), a())
            }
            var u = n.directiveFactory(r, o, i),
                f = "mDfpLoadOnScroll" in i;
            if (!f) return t(function() {
                u.init()
            }), void 0;
            var d, p = null;
            t(function() {
                "no" === o.data("deferred") || s() ? a() : (p.on("scroll", c), o.on("$destroy", function() {
                    p.off("scroll", c)
                }))
            }), o.data("deferred", "maybe"), o.on("dfp:check_deferred", l)
        }
    }]), mixcloudWWW.directive("mDialog", ["$timeout", "addTouchClickListener", "dialog", "prerequisites", "settings", "trackEvent", function(e, t, n, r, o, i) {
        return {
            controller: function() {},
            link: function(a, l, s, c) {
                function u() {
                    r.check(c.prerequisites).then(function() {
                        s.mDialogEventCategory && s.mDialogEventAction && i(s.mDialogEventCategory, s.mDialogEventAction, s.mDialogEventLabel), n.openDialog(s.mDialog, a)
                    })
                }
                t(l, function() {
                    return l.is("a[href]") ? (e(u), void 0) : (a.$apply(u), !1)
                }), s.mDialogOnHash && a.$watch(function() {
                    return o.pageState.initialHash
                }, function(e) {
                    e === s.mDialogOnHash && u()
                })
            }
        }
    }]), mixcloudWWW.directive("mDialogInPlace", ["addTouchClickListener", function(e) {
        return function(t, n, r) {
            e(n, function() {
                return t.$apply(function() {
                    t.dialog.load(r.mDialogInPlace)
                }), !1
            })
        }
    }]), mixcloudWWW.directive("mPopover", ["addTouchClickListener", "dialog", function(e, t) {
        return {
            scope: !0,
            link: function(n, r, o) {
                n.open = !1, e(r, function() {
                    return n.$apply(function() {
                        n.open ? n.dialog.close() : (t.openPopover(o.mPopover, n, r, o.hasOwnProperty("mFixedPopover")), n.open = !0, n.dialog.closePromise.then(function() {
                            n.open = !1
                        }))
                    }), !1
                })
            }
        }
    }]), mixcloudWWW.directive("mResizeDialog", [function() {
        return function(e, t, n) {
            e.$watch(n.mResizeDialog, e.dialog.setPosition)
        }
    }]), mixcloudWWW.directive("mDraggable", ["$document", "$parse", "$window", "hotkeys", "scrolling", function(e, t, n, r, o) {
        function i(e) {
            return e.touches && e.touches.length > 0 ? {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY
            } : {
                x: e.pageX,
                y: e.pageY
            }
        }
        return {
            scope: !0,
            link: function(a, l, s) {
                function c(e) {
                    if (u(), s.mClick && e && ("mouseup" === e.type || "touchend" === e.type)) {
                        var t = i(e);
                        if (Math.abs(t.x - m.x) < 2 && Math.abs(t.y - m.y) < 2) return a.$apply(function() {
                            h(a)
                        }), l.trigger("drag:cancel"), void 0
                    }
                    l.trigger("drag:stop")
                }

                function u() {
                    g && (g.$container.off("scroll", p), g = null), e.off("touchmove mousemove", f), e.off("touchend mouseleave mouseup", c), r.off(r.ESCAPE, d)
                }

                function f(e, t) {
                    return e && (y = i(e), v = angular.copy(y), g && (w = void 0 === t ? g.getScrollPosition() : t)), void 0 === t && g && g.setScroll(), l.trigger($.Event("drag:move", {
                        drag: v
                    })), !1
                }

                function d() {
                    u(), l.trigger("drag:cancel")
                }

                function p() {
                    g.updatePosition(), f()
                }
                var h = s.mClick && t(s.mClick);
                l.on("selectstart", function() {
                    return !1
                });
                var m, g = null;
                l.on("touchstart mousedown", function(t) {
                    function u(e) {
                        g = angular.extend({
                            min: 0,
                            getScrollPosition: o.getScrollTop,
                            $target: $("html, body"),
                            $container: $(n),
                            scrollProp: "scrollTop",
                            scrollSizeProp: "scrollHeight",
                            buffer: 200,
                            updatePosition: function() {
                                v.y = y.y + this.getScrollPosition() - w
                            },
                            setScroll: function() {
                                var e, t, r = this.getScrollPosition(),
                                    o = 0,
                                    i = this.$container.height();
                                r > this.min && v.y < r + this.buffer / 2 ? o = -2 : r > this.min && v.y < r + this.buffer ? o = -1 : r < this.max - i && v.y > r + i - this.buffer / 2 ? o = 2 : r < this.max - i && v.y > r + i - this.buffer && (o = 1), 0 !== o && (e = this.$target, t = this.scrollProp, n.requestAnimationFrame(function() {
                                    e.prop(t, 15 * o + r)
                                }))
                            }
                        }, e), g.$container.on("scroll", p), h = g.getScrollPosition()
                    }
                    if (!(t.which && t.which > 1 || t.metaKey || t.ctrlKey)) {
                        if (s.mDraggable && !a.$eval(s.mDraggable)) return !1;
                        g = null, m = i(t);
                        var h = null;
                        return l.trigger($.Event("drag:start", {
                            drag: angular.extend({
                                handleScrolling: u
                            }, m)
                        })), f(t, h), e.on("touchmove mousemove", f), e.on("touchend mouseleave mouseup", c), r.on(r.ESCAPE, d), !1
                    }
                });
                var v, y, w
            }
        }
    }]), mixcloudWWW.directive("mDragToReorder", [function() {
        return function(e, t, n) {
            function r(e) {
                c = 0;
                var t = h.filter(":visible").css("margin-top", 0);
                e.drag.y < m + f - p ? t.first().css("margin-top", f - p) : t.each(function() {
                    var t = $(this),
                        n = t.offset().top;
                    return e.drag.y >= n && e.drag.y < n + t.outerHeight(!0) ? (t.css("margin-top", f), !1) : (c++, void 0)
                }), u.css("top", Math.min(t.last().offset().top + f - p, Math.max(e.drag.y - d, m)))
            }

            function o() {
                e.dragging = !1, u.remove(), l.show(), h.css("margin-top", 0)
            }

            function i() {
                e.$apply(o)
            }

            function a() {
                e.$apply(function() {
                    if (o(), c !== s) {
                        var e = g.splice(s, 1)[0];
                        g.splice(c, 0, e)
                    }
                })
            }
            var l, s, c, u, f, d, p, h, m = t.offset().top,
                g = e.$eval(n.mDragToReorder);
            e.dragging = !1, t.on("drag:start", function(n) {
                t.css({
                    "min-height": t.outerHeight()
                }), e.$apply(function() {
                    n.drag.handleScrolling({
                        min: m - 150,
                        max: m + t.outerHeight(!0) + 50
                    }), e.dragging = !0, l = $(n.target).closest("[m-drag-row]");
                    var r = l.offset();
                    p = l.outerHeight(!0) - l.outerHeight(), f = l.outerHeight(!0) + p, d = n.drag.y - r.top, h = t.find("[m-drag-row]"), s = c = h.index(l), u = l.clone().css({
                        position: "absolute",
                        top: r.top,
                        left: r.left,
                        width: l.width(),
                        "z-index": 1e3
                    }).addClass("dragging").appendTo("body"), l.hide()
                })
            }), t.on("drag:move", r), t.on("drag:cancel", i), t.on("drag:stop", a)
        }
    }]), mixcloudWWW.directive("mEditImage", ["$window", "featureDetection", function(e, t) {
        return function(n, r, o) {
            function i(e) {
                return 1 === e.length ? "0" + e : e
            }

            function a(e) {
                return d = c.getImageData(0, 0, u, f).data, p = r.offset(), r.on("mousemove", l), r.on("mouseup mouseleave", s), l(e), !1
            }

            function l(e) {
                var t = 4 * (u * (Math.floor(e.pageY) - Math.floor(p.top)) + Math.floor(e.pageX) - Math.floor(p.left));
                n.$apply(function() {
                    n.$broadcast("editimage:color", i(d[t].toString(16)) + i(d[t + 1].toString(16)) + i(d[t + 2].toString(16)))
                })
            }

            function s() {
                r.off("mousemove", l), r.off("mouseup mouseleave", s)
            }
            if (t.test("fileApi") && t.test("canvas") && e.URL) {
                var c = null,
                    u = parseInt(o.width, 10),
                    f = parseInt(o.height, 10);
                n.$watch(o.mEditImage, function(t) {
                    if (t && t.file) {
                        null === c && (c = r[0].getContext("2d")), c.clearRect(0, 0, u, f);
                        var n = new Image;
                        n.onload = function() {
                            var e = n.width,
                                t = n.height,
                                o = Math.max(u / e, f / t),
                                i = o * e,
                                l = o * t,
                                s = 0,
                                d = 0;
                            i > u && (s = (u - i) / 2), l > f && (d = (f - l) / 2), c.drawImage(n, s, d, i, l), r.on("mousedown", a)
                        }, n.src = e.URL.createObjectURL(t.file)
                    } else c && (c.clearRect(0, 0, u, f), r.off("mousedown", a))
                });
                var d, p
            }
        }
    }]), mixcloudWWW.directive("mFileInputModel", ["$parse", "$q", "mHttp", "uniqueId", function(e, t, n, r) {
        return {
            controller: ["$attrs", "$element", "$parse", "$scope", function(e, t, n, r) {
                var o = null,
                    i = null;
                e.$observe("mMaxSize", function(e) {
                    o = e
                }), e.$observe("mExtension", function(e) {
                    i = e
                });
                var a = t.inheritedData("$formController"),
                    l = this,
                    s = n(e.mFileInputModel);
                a && (this.$name = e.name, a.$addControl(this), this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, r.$on("$destroy", function() {
                    a.$removeControl(l)
                })), this.setModel = function(t, n) {
                    var l = !0,
                        c = !0,
                        u = !0;
                    s.assign(r, t), "mRequired" in e && (l = !!t, this.$setValidity("required", l)), o && (c = !(t && t.file) || t.file.size < o, this.$setValidity("size", c)), i && (u = !(t && t.file && !t.name.match(RegExp("\\.(" + i + ")$", "i"))), this.$setValidity("extension", u)), this.$valid = l && c && u, this.$invalid = !this.$valid, this.$pristine && !n && (this.$pristine = !1, this.$dirty = !0, a.$setDirty())
                }, this.$setValidity = function(e, t) {
                    a.$setValidity(e, t, this)
                }
            }],
            link: function(e, o, i, a) {
                function l(e) {
                    var t = o[0].files,
                        n = o.val(),
                        r = n && n.replace(/^.*[\\\/]/, "");
                    t ? t.length ? "multiple" in i ? a.setModel({
                        files: t,
                        postTo: s
                    }, e) : a.setModel({
                        file: t[0],
                        size: t[0].size,
                        name: r,
                        postTo: s
                    }, e) : a.setModel(void 0, e) : n ? a.setModel({
                        name: r,
                        postTo: s
                    }, e) : a.setModel(void 0, e)
                }

                function s(i) {
                    if (c = t.defer(), !f) {
                        var a = "form_target_iframe_" + r();
                        u = $("<iframe/>", {
                            name: a,
                            id: a,
                            frameborder: "0"
                        }).insertAfter(o).css({
                            width: 0,
                            height: 0
                        }).load(function() {
                            var t = this;
                            e.$apply(function() {
                                var e = null;
                                try {
                                    e = JSON.parse(t.contentWindow.document.body.innerHTML)
                                } catch (n) {}
                                e && c.resolve(e)
                            })
                        }), f = $("<form></form>", {
                            target: a,
                            method: "post",
                            enctype: "multipart/form-data"
                        }).insertAfter(o), f.append('<input type="hidden" name="csrfmiddlewaretoken" value="' + n.getCsrfCookie() + '">'), o.appendTo(f)
                    }
                    return f.attr("action", i), f.submit(), c.promise
                }
                o.on("change", function() {
                    e.$apply(function() {
                        l()
                    })
                }), l(!0), o.on("$destroy", function() {
                    f && (f.remove(), u.remove())
                });
                var c, u = null,
                    f = null
            }
        }
    }]), mixcloudWWW.directive("mFixToTopClass", ["$window", function(e) {
        return function(t, n, r) {
            function o() {
                a = "mExtraOffset" in r ? parseInt(r.mExtraOffset, 10) : 0, i()
            }

            function i() {
                if (l && s[0].getBoundingClientRect().top + a > 0) l = !1, s.hide(), n.removeClass(r.mFixToTopClass);
                else if (!l) {
                    var e = n[0].getBoundingClientRect();
                    0 !== e.height && e.top + a <= 0 && (l = !0, s.css({
                        height: n.outerHeight(),
                        "margin-top": n.css("margin-top"),
                        "margin-bottom": n.css("margin-bottom")
                    }).show(), n.addClass(r.mFixToTopClass))
                }
            }
            var a, l = !1,
                s = $('<div style="display:none;" class="fix-to-top-placeholder"></div>');
            r.$observe("mExtraOffset", o), n.after(s), $(e).on("scroll", i), n.on("$destroy", function() {
                $(e).off("scroll", i)
            }), "mFixToTopWatch" in r && t.$watch(r.mFixToTopWatch, i), o()
        }
    }]), mixcloudWWW.directive("mFixInView", ["$window", function(e) {
        return function(t, n, r) {
            function o() {
                a = "mTopMargin" in r ? parseInt(r.mTopMargin, 10) : 0, l = "mBottomMargin" in r ? parseInt(r.mBottomMargin, 10) : 0, i()
            }

            function i() {
                var t = n[0].getBoundingClientRect();
                if (c && u[0].getBoundingClientRect().top > t.top) c = !1, u.hide(), n.css({
                    position: s,
                    top: "auto",
                    bottom: "auto"
                });
                else if (!c && 0 !== t.height) {
                    var r = $(e).height(),
                        o = "auto",
                        i = "auto";
                    t.top <= a && t.bottom + l <= r && (t.height < r - (a + l) ? o = a + "px" : i = l + "px", c = !0, u.css({
                        height: n.outerHeight(),
                        margin: n.css("margin")
                    }).attr("class", n.attr("class")).show(), s = n.css("position"), n.css({
                        position: "fixed",
                        top: o,
                        bottom: i
                    }))
                }
            }
            var a, l, s, c = !1,
                u = $('<div style="display:none;visibility:hidden;"></div>');
            n.after(u), r.$observe("mTopMargin", o), r.$observe("mBottomMargin", o), $(e).on("scroll resize", i), n.on("$destroy", function() {
                $(e).off("scroll resize", i)
            }), "mFixToTopWatch" in r && t.$watch(r.mFixToTopWatch, i), o()
        }
    }]), mixcloudWWW.directive("mHideable", ["hideable", function(e) {
        return {
            scope: !0,
            link: function(t, n, r) {
                t.hide = function() {
                    e.hide(r.mHideable)
                }, t.$on("hideable:hide", function(e, t) {
                    r.mHideable === t && n.addClass("hidden")
                })
            }
        }
    }]), mixcloudWWW.directive("mHighlander", ["highlander", function(e) {
        return function(t, n, r) {
            t[r.mHighlander] = e()
        }
    }]), mixcloudWWW.directive("mHighlightedContent", ["mHttp", function(e) {
        return {
            scope: !0,
            link: function(t, n, r) {
                var o = n.find("[m-highlighted-container]");
                t.highlightedContent = {
                    isEmpty: !o.children().length
                }, t.$on("ajaxtoggle:toggle", function(n, i, a) {
                    "highlight" === a && e.load(o, t, r.mHighlightedContent).then(function() {
                        t.highlightedContent.isEmpty = !o.children().length
                    })
                })
            }
        }
    }]), mixcloudWWW.directive("mHoverCard", ["$document", "$rootScope", "$window", "cancellableTimeout", "cssTransitions", "mHttp", function(e, t, n, r, o, i) {
        var a = e.find("body");
        return {
            link: function(l, s, c) {
                function u() {
                    if (!h) return d(), void 0;
                    if (y++, y >= 2) {
                        var e = h.find("[m-hovercard-container]");
                        e.removeClass("hovercard-loading")
                    }
                }

                function f() {
                    g.cancel(), h && v.schedule(function() {
                        i.cancel(p), l.$apply(function() {
                            o.removeClass(h, "showing-hovercard").then(function() {
                                m && m.$destroy(), h && h.remove(), h = null, m = null
                            })
                        })
                    }, 200)
                }

                function d() {
                    v.cancel(), g.cancel(), m && m.$destroy(), h && h.remove(), h = null, m = null
                }
                var p, h = null,
                    m = null,
                    g = r(),
                    v = r(),
                    y = 0;
                s.on("$destroy", d), s.on("mouseout", f), s.on("mouseover", function() {
                    v.cancel(), !h && c.mHoverCard && g.schedule(function() {
                        h = $('<div class="hovercard-card" style="position:absolute;"></div>'), h.on("mouseover", function() {
                            v.cancel()
                        }), h.on("mouseout", f), m && m.$destroy(), m = t.$new(), i.cancel(p), p = i.load(h, m, c.mHoverCard), p.then(function() {
                            if (!h) return d(), void 0;
                            var t = $(s).offset(),
                                r = h.find("[m-hovercard-container]"),
                                o = t.top - e.scrollTop() > 300;
                            o || r.addClass("pos-above");
                            var i = h.find("[m-hovercard-avatar]");
                            i.on("load", u);
                            var l = h.find("[m-hovercard-cover]"),
                                c = new Image;
                            c.onload = function() {
                                c = null, u()
                            };
                            var f = /url\(\s*(['"]?)(.*?)\1\s*\)/g.exec(l.css("background-image"));
                            f ? c.src = f[2] : (c = null, u()), a.append(h), h.offset({
                                top: o ? t.top - (r.height() + 20) : t.top + s.height() + 10,
                                left: t.left + s.width() / 2 - r.width() / 2
                            }), n.requestAnimationFrame(function() {
                                h && h.addClass("showing-hovercard")
                            })
                        })
                    }, 200)
                })
            }
        }
    }]), mixcloudWWW.directive("mLoadHtml", ["$timeout", "mHttp", function(e, t) {
        return function(n, r, o) {
            e(function() {
                t.load(r, n, o.mLoadHtml)
            })
        }
    }]), mixcloudWWW.directive("mLoadOnLogin", ["login", "mHttp", function(e, t) {
        return function(n, r, o) {
            n.$watch(function() {
                var t = e.getCurrentUser();
                return t && t.username
            }, function(e, i) {
                e !== i && t.load(r, n, o.mLoadOnLogin)
            })
        }
    }]), mixcloudWWW.directive("mMasonry", ["$compile", "$window", "masonryItems", "throttle", function(e, t, n, r) {
        return {
            controller: function() {},
            link: function(o, i, a, l) {
                function s(t) {
                    var n = $.grep(t, function(e) {
                            return !e.compiled
                        }),
                        r = $.map(n, function(e) {
                            return e.$item.get(0)
                        });
                    i.append(r), e(r)(o), $.each(n, function() {
                        this.compiled = !0
                    })
                }

                function c(e) {
                    var t = $.grep(e, function() {
                        return !this.height
                    });
                    $.each(t, function() {
                        this.height = this.$item.outerHeight(!0), this.leftColumn = this.$item.hasClass("masonry-left"), this.rightColumn = this.$item.hasClass("masonry-right"), this.isAd = this.$item.is("[m-dfp-slot-container]")
                    })
                }

                function u(e) {
                    var t = 0;
                    s(e), c(e), $.each(e, function() {
                        this.isAd && this.added && (this.$item.remove(), this.removed = !0), this.removed || (this.added = !0, this.leftColumn ? t = 0 : this.rightColumn && (t = v - 1), m[t].append(this.$item), g[t] += this.height, t = g.indexOf(Math.min.apply(null, g)))
                    }), S = S.concat(e), i.find("[m-masonry-last]").appendTo(i)
                }

                function f() {
                    var e = i.parent().outerWidth();
                    return Math.abs(e - k) < 10 ? !1 : i.is(":hidden") ? !1 : (k = e, !0)
                }

                function d() {
                    if (f()) {
                        i.css("width", "100%");
                        var e = Math.floor((i.width() + w) / (b + w));
                        if (e === v) return i.css("width", y), void 0;
                        v = e, t.requestAnimationFrame(h)
                    }
                }

                function p() {
                    m = [], g = [];
                    for (var e = 0; v > e; e++) m[e] = $('<div class="' + a.mMasonry + '"></div>').appendTo(i), g[e] = 0;
                    m[v - 1].addClass("last")
                }

                function h() {
                    y = v * b + (v - 1) * w + "px", i.css("width", y);
                    var e = i.find("." + a.mMasonry);
                    p(), S = [], u(n.getAll()), e.remove()
                }
                var m, g, v = null,
                    y = null,
                    w = parseInt(a.mMasonryGutter, 10),
                    b = parseInt(a.mMasonryColumnWidth, 10),
                    x = r(d, 100),
                    S = [];
                i.on("$destroy", function() {
                    n.reset()
                }), o.$watchCollection(n.getAll, function(e) {
                    if (!m) return S = e, void 0;
                    var t = !0;
                    if (e.length < S.length) t = !1;
                    else
                        for (var n = 0; n < S.length; n++)
                            if (e[n] !== S[n]) {
                                t = !1;
                                break
                            }
                    t ? u(e.slice(S.length)) : h()
                }), o.$watch(n.footerElement, function(t, n) {
                    n && n !== t && n.$item.remove(), t && (n !== t && i.append(t.$item), t.compiled || (e(t.$item)(o), t.compiled = !0))
                }), n.addItems(i.children(), !0), d(), $(t).on("resize", x), i.on("$destroy", function() {
                    $(t).off("resize", x)
                }), l.addItems = function(e) {
                    n.addItems(e)
                };
                var k = 0
            }
        }
    }]), mixcloudWWW.directive("mMaxlength", function() {
        var e = /(^|[^\r])\n/g;
        return {
            require: "ngModel",
            link: function(t, n, r, o) {
                function i(e) {
                    var t = o.getStringLength(e) <= a;
                    return o.$setValidity("maxlength", t), t ? e : void 0
                }
                var a = parseInt(r.mMaxlength, 10);
                isNaN(a) || (o.$parsers.push(i), o.$formatters.push(i), o.getStringLength = function(t) {
                    if (o.$isEmpty(t)) return 0;
                    var n = t.match(e);
                    return n ? t.length + n.length : t.length
                })
            }
        }
    }), mixcloudWWW.directive("mMoveToDropdown", ["$window", "throttle", function(e, t) {
        return function(n, r) {
            function o(e) {
                if (s) {
                    var t = r.width();
                    if (t !== c) {
                        c = t;
                        for (var o = l.width, a = !1, u = 0; u < s.length - 1; u++) o += s[u].width, c > o ? s[u].subNav || (s[u].$el.insertBefore(l.$el), s[u].subNav = !0, a = !0) : s[u].subNav && (s[u].$el.prependTo(i), s[u].subNav = !1, a = !0);
                        if (a || e) {
                            var f = i.children().length;
                            0 === f ? (l.$el.addClass("ng-hide"), s[s.length - 2].$el.addClass("sub-nav-list-item-last")) : (l.$el.removeClass("ng-hide"), s[s.length - 2].$el.removeClass("sub-nav-list-item-last")), n.$apply(function() {
                                n.moveToDropdown.moreCount = f, n.$broadcast("movetodropdown:changed")
                            })
                        }
                    }
                }
            }
            var i = r.find("[m-move-to-dropdown-target]"),
                a = t(o, 100);
            n.moveToDropdown = {
                moreCount: i.children().length
            }, $(e).on("resize", a), r.on("$destroy", function() {
                $(e).off("resize", a)
            });
            var l, s = null,
                c = null;
            e.requestAnimationFrame(function() {
                s = r.children().map(function() {
                    var e = $(this);
                    return {
                        $el: e,
                        subNav: !0,
                        width: e.outerWidth(!0)
                    }
                }).toArray(), l = s[s.length - 1], o(!0)
            })
        }
    }]), mixcloudWWW.directive("mPlayAllButton", ["$rootScope", "addTouchClickListener", "addToQueue", "masonryItems", function(e, t, n, r) {
        var o = 24;
        return {
            scope: !0,
            link: function(n, i) {
                t(i, function() {
                    var t, n = $("[m-list-view-container]");
                    t = n.length ? n.find("[m-play-button]").toArray() : $.map(r.getAll(), function(e) {
                        return e.$item.find("[m-play-button]").toArray()
                    }), t = t.slice(0, o).map(function(e) {
                        var t = $(e);
                        return {
                            url: t.attr("m-url"),
                            title: t.attr("m-title"),
                            owner: t.attr("m-owner-name"),
                            wwwThumbnail: t.attr("m-thumbnail-url"),
                            playInfo: t.attr("m-play-info"),
                            pRef: t.attr("m-p-ref")
                        }
                    }), e.$broadcast("player:play", t)
                })
            }
        }
    }]), mixcloudWWW.directive("mPlayButton", ["$rootScope", "$timeout", "addTouchClickListener", "hotkeys", "refTracking", "settings", "sourceTracking", "webPlayer", function(e, t, n, r, o, i, a, l) {
        return {
            scope: !0,
            link: function(t, n, s) {
                function c(e) {
                    if (l.url === s.mUrl) l.paused ? l.resume() : l.pause(), e.preventGhostClick && e.preventGhostClick();
                    else {
                        if (t.previewing) return;
                        i.player && i.player.playInClickStack ? "click" === e.type && p() : (p(), e.preventGhostClick && e.preventGhostClick())
                    }
                }

                function u() {
                    l.url && r.off(r.SPACE, p), f()
                }

                function f() {
                    l.url === s.mUrl ? l.on("position duration", d) : l.off("position duration", d)
                }

                function d() {
                    var e = l.duration > 0 ? l.position / l.duration : 0;
                    s.$set("mPreviewProportionListened", e || 0)
                }

                function p() {
                    r.off(r.SPACE, p), s.mTargetProfileNamespace && (t.sourceDetail ? a.setWithinSiteDetail(t.sourceDetail, s.mTargetProfileNamespace, t.profileNamespace) : a.setDetailFromCurrentUrl(s.mTargetProfileNamespace, t.profileNamespace)), t.$emit("chained:closeAfterInteraction");
                    var n = parseInt(s.mPlayButtonStartSeconds, 10),
                        o = {
                            url: s.mUrl,
                            p_ref: h ? h + "__" + s.mPRef : s.mPRef,
                            play_info: s.mPlayInfo
                        };
                    isNaN(n) || (o.start_seconds = n), e.$broadcast("player:play", o)
                }
                t.loadingState = function() {
                    return t.webPlayer.loading && t.webPlayer.url === s.mUrl
                }, t.pauseState = function() {
                    return !t.webPlayer.loading && !t.webPlayer.paused && t.webPlayer.url === s.mUrl
                }, n.on("click", function(e) {
                    t.$apply(function() {
                        c(e)
                    })
                }), s.hasOwnProperty("mPlayOnSpacebar") && !l.url && r.on(r.SPACE, p), f(), n.on("$destroy", function() {
                    r.off(r.SPACE, p), l.off("url", u), l.off("position duration", d)
                }), l.on("url", u);
                var h = s.hasOwnProperty("mPRefTrackingTarget") && o.getLinkRef("play")
            }
        }
    }]), mixcloudWWW.directive("mPlayerQueue", ["$rootScope", "cancellableTimeout", function(e, t) {
        return function(e, n) {
            function r() {
                var t = e.playerQueue.upNext ? 1 : 0;
                n.css("width", 210 * (e.playerQueue.cloudcastQueue.length + t))
            }

            function o(e) {
                g.cancel();
                var t = Math.min(Math.max(e.drag.x - p, s), c),
                    r = Math.max(e.drag.x, s);
                if (d.css("left", t), f = 0, n.children(":visible").css("margin-left", 0).each(function() {
                        var e = $(this),
                            t = e.offset().left;
                        return e.is("[m-up-next]") || r >= t && r <= t + e.outerWidth(!0) ? (e.css("margin-left", l), !1) : (f++, void 0)
                    }), 0 > t && m.scrollLeft > 0) m.scrollLeft = Math.max(m.scrollLeft - 15, 0), g.scheduleIfInactive(function() {
                    o(e)
                }, 30);
                else {
                    var i = h.innerWidth(),
                        a = m.scrollWidth,
                        u = t + l;
                    u > i && a > u ? (m.scrollLeft = Math.min(m.scrollLeft + 15, a - i), g.scheduleIfInactive(function() {
                        o(e)
                    }, 30)) : g.cancel()
                }
            }

            function i() {
                g.cancel(), n.children().css("margin-left", 0), d.remove(), a.show()
            }
            e.$watch("playerQueue.cloudcastQueue.length", r), e.$watch("playerQueue.upNext", r);
            var a, l, s, c, u, f, d, p;
            n.on("drag:start", function(e) {
                a = $(e.target).closest("[m-player-queue-item]");
                var t = a.offset();
                p = e.drag.x - t.left, l = a.outerWidth(!0), s = c = n.children().first().offset().left, n.children().each(function() {
                    var e = $(this);
                    this === a[0] || e.is("[m-up-next]") || (c += $(this).outerWidth(!0))
                }), u = f = n.children().index(a), d = a.clone().addClass("dragging").css({
                    position: "absolute",
                    top: t.top,
                    left: t.left,
                    "z-index": 1e3
                }).appendTo("body"), a.hide()
            });
            var h = n.closest("[m-scroll-container]"),
                m = h[0],
                g = t();
            n.on("drag:move", o), n.on("drag:stop", function() {
                i(), f !== u && e.$apply(function() {
                    var t = e.playerQueue.cloudcastQueue.splice(u, 1)[0];
                    e.playerQueue.cloudcastQueue.splice(f, 0, t)
                })
            }), n.on("drag:cancel", i)
        }
    }]), mixcloudWWW.directive("mPlaylistDropdownHeight", ["$window", function(e) {
        return function(t, n) {
            function r() {
                o.off("mousedown touchstart", r);
                var t = parseInt(("" + n.css("margin-bottom")).replace("px", ""), 10);
                isNaN(t) && (t = 15), n.css({
                    "max-height": $(e).height() - o.outerHeight() - t,
                    overflow: "auto"
                })
            }
            var o = n.closest("[m-playlist-dropdown-button]");
            o.on("mousedown touchstart", r)
        }
    }]), mixcloudWWW.directive("mPostOnSubmit", ["$timeout", "$parse", "formset", "mHttp", "navigation", "safeApply", function(e, t, n, r, o, i) {
        var a = 2e3;
        return {
            scope: !0,
            link: function(l, s, c) {
                function u(e) {
                    d = e, p && p.assign(l.$parent, e)
                }

                function f() {
                    r.cancel(m), g && (e.cancel(g), g = null), "saved" === d && u("in-progress")
                }
                var d, p = c.mProgressVar && t(c.mProgressVar),
                    h = t(c.mPostOnSubmit),
                    m = null,
                    g = null,
                    v = c.hasOwnProperty("mSerialized"),
                    y = c.mOnSuccessfulPost && t(c.mOnSuccessfulPost);
                u("ready"), l.$on("form:willSubmit", f), s.on("submit", function() {
                    return i(l, function() {
                        if (!v || !r.isInProgress(m)) {
                            f(), u("in-progress");
                            var t = h(l) || {};
                            t.MAX_NUM_FORMS && (t = n.fromJsonForm(t)), m = r.post(c.action, {
                                data: t,
                                dataType: "json"
                            }), m.then(function(t) {
                                t && t.data && h.assign(l.$parent, t.data), t && t.success === !1 ? u("ready") : (u("saved"), g = e(function() {
                                    u("ready"), g = null
                                }, a), y && y(l, {
                                    response: t
                                })), t && t.next_url && o.navigate(t.next_url)
                            }, function() {
                                u("ready")
                            })
                        }
                    }), !1
                })
            }
        }
    }]), mixcloudWWW.directive("mPreview", ["cancellableTimeout", "crossTab", "hotkeys", "pageVisibility", "simpleAudioPlayer", "webPlayer", function(e, t, n, r, o, i) {
        return {
            controller: ["$q", function(e) {
                this.getAudioPosition = function() {
                    return 0
                }, this.prepare = function() {
                    var t = e.defer();
                    return t.resolve(), t.promise
                }, this.end = function() {}
            }],
            link: function(a, l, s, c) {
                function u(e) {
                    e || p()
                }

                function f() {
                    a.$emit("preview:start"), y = o(s.mPreview, {
                        onEnded: p,
                        onError: function() {
                            g = !0, d(), h("No preview available")
                        }
                    }), c.getAudioPosition = function() {
                        return y.getPosition() || 0
                    }, h("Previewing"), n.on(n.ESCAPE, p), r.on("visible", u), c.prepare().then(function() {
                        !g && y && (t.emit("preview:start"), y.play())
                    })
                }

                function d() {
                    y && (y.stop(), n.off(n.ESCAPE, p), r.off("visible", u), t.emit("preview:stop"), c.end(), c.getAudioPosition = function() {
                        return 0
                    }, y = null)
                }

                function p() {
                    v.cancel(), w && (w.remove(), w = null), l.attr("title", m), d()
                }

                function h(e) {
                    w && w.remove(), w = $('<span class="tooltip top"></span>').text(e).appendTo(l), w.css("margin-left", -w.outerWidth() / 2 + "px")
                }
                var m, g = !s.mPreview,
                    v = e(),
                    y = null,
                    w = null;
                l.on("mouseenter", function() {
                    return i.url !== s.mUrl ? (m = l.attr("title"), l.attr("title", ""), g ? (h("No preview available"), void 0) : (v.scheduleIfInactive(function() {
                        a.$apply(f)
                    }, 150), void 0)) : void 0
                }), l.on("mousedown click", function() {
                    "mPreviewIgnoreClick" in s || p()
                }), l.on("mouseleave", p);
                var b = a.$on("navigation:start", p),
                    x = a.$on("navigation:end", p);
                l.on("$destroy", function() {
                    p(), b(), x()
                })
            }
        }
    }]), mixcloudWWW.directive("mPreviewBar", ["$q", "cssTransitions", function(e, t) {
        return {
            require: "mPreview",
            link: function(n, r, o, i) {
                var a = null,
                    l = r.find("[m-preview-bar-background]");
                i.prepare = function() {
                    a || (a = t.timelessAnimation(function() {
                        l.css("transform", "translateX(" + 100 * -(1 - i.getAudioPosition()) + "%)")
                    })), r.addClass("previewing"), a.start();
                    var n = e.defer();
                    return n.resolve(), n.promise
                }, i.end = function() {
                    a.stop(), r.removeClass("previewing"), l.css("transform", "translateX(-100%)")
                }
            }
        }
    }]), mixcloudWWW.directive("mPreviewRing", ["cssTransitions", "featureDetection", function(e, t) {
        var n = 100,
            r = 550;
        return {
            require: "mPreview",
            link: function(o, i, a, l) {
                function s() {
                    var t = i.find("[m-play-button-ring]");
                    f = parseInt(a.mPreviewRing, 10), d = f / 2, p = parseInt(t.css("border-left-width").replace(/[^0-9.]/g, ""), 10), h = i.width(), m = (h - t.outerWidth()) / 2, g = parseInt(a.mPreviewRingBorder, 10) || m, v = p + (f - h + (m - g)) / 2, y = $("<canvas></canvas>").css({
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        "margin-left": -d + "px",
                        "margin-top": -d + "px",
                        width: f + "px",
                        height: f + "px"
                    }).insertBefore(i.find("[m-play-button-background]"))[0], w = window.devicePixelRatio || 1, b = y.getContext("2d"), x = i.find("[m-play-button-background]").css("background-color"), S = t.css("border-left-color"), k = "mPreviewRingColor" in a, P = "mPreviewLight" in a, C = k ? P ? "#d1d1d1" : "#ffffff" : S, T = "#589fc3", y.width = f * w, y.height = f * w, b.scale(w, w), i.addClass("previewing"), c(), A = e.timelessAnimation(function() {
                        W = l.getAudioPosition(), I = 1, M = 1, c()
                    }), E = e.getAnimation([{
                        forwards: {
                            duration: n
                        },
                        backwards: {
                            duration: n
                        }
                    }, {
                        forwards: {
                            duration: r,
                            delay: n
                        },
                        backwards: {
                            duration: n,
                            delay: 0
                        }
                    }], function(e, t) {
                        I = e, M = t, c()
                    })
                }

                function c() {
                    b.clearRect(0, 0, f, f), b.beginPath(), b.arc(d, d, Math.max(0, u(h / 2, f / 2, I)), 0, 2 * Math.PI, !1), b.fillStyle = x, b.fill();
                    var e = u(p, v, M),
                        t = 2 * Math.PI * (W - .25);
                    1 === M && W > 0 ? (b.beginPath(), b.arc(d, d, Math.max(0, u(h / 2 - m, f / 2 - g, M) - e / 2), .5 * -Math.PI, t, !0), b.lineWidth = e, b.strokeStyle = C, b.stroke()) : ((!k || 1 > I) && (b.beginPath(), b.arc(d, d, Math.max(0, u(h / 2 - m, f / 2 - g, M) - e / 2), -.5 * Math.PI, (2 * (_ || 1) - .5) * Math.PI, !0), b.lineWidth = e, b.strokeStyle = S, b.stroke(), _ && (b.beginPath(), b.arc(d, d, Math.max(0, u(h / 2 - m, f / 2 - g, M) - e / 2), -.5 * Math.PI, (2 * _ - .5) * Math.PI, !1), b.lineWidth = e, b.strokeStyle = T, b.stroke())), (k || _) && (b.beginPath(), b.arc(d, d, Math.max(0, u(h / 2 - m, f / 2 - g, M) - e / 2), 0, 2 * Math.PI, !1), b.lineWidth = e, b.strokeStyle = "rgba(" + (k && P ? "209, 209, 209" : "255, 255, 255") + ", " + I + ")", b.stroke())), W > 0 && (b.beginPath(), b.arc(d, d, Math.max(0, u(h / 2 - m, f / 2 - g, M) - e / 2), .5 * -Math.PI, t, !1), b.lineWidth = e, b.strokeStyle = "rgba(82, 181, 74, " + M + ")", b.stroke())
                }

                function u(e, t, n) {
                    return e * (1 - n) + t * n
                }
                if (t.test("canvas")) {
                    var f, d, p, h, m, g, v, y, w, b, x, S, k, P, C, T, E = null,
                        A = null,
                        W = 0,
                        _ = null,
                        I = 0,
                        M = 0;
                    l.prepare = function() {
                        return E || s(), W = 0, E.forwards().then(function() {
                            A.start()
                        })
                    }, l.end = function() {
                        A.stop(), E.backwards()
                    }, a.$observe("mPreviewProportionListened", function(e) {
                        var t = null === _;
                        _ = e, t || (E || s(), c())
                    })
                }
            }
        }
    }]), mixcloudShared.directive("mPromoteSlider", ["$document", function(e) {
        return {
            link: function(t, n) {
                function r(e) {
                    f.css({
                        left: 100 * (e - 1) / (c - 1) + "%"
                    })
                }

                function o() {
                    e.off({
                        mouseup: o,
                        mousemove: i
                    })
                }

                function i(e) {
                    var n = Math.round((c - 1) * (e.pageX - s) / l) + 1;
                    n = Math.min(Math.max(1, n), c), n !== t.promote.days && t.$apply(function() {
                        t.promote.days = n
                    })
                }

                function a(t) {
                    return t.which > 1 ? void 0 : (l = u.width(), s = u.offset().left, i(t), e.on({
                        mouseup: o,
                        mousemove: i
                    }), !1)
                }
                var l, s, c = 28,
                    u = n,
                    f = u.find("[m-promote-slider-button]");
                f.on("selectstart", !1), r(t.promote.days), t.$watch("promote.days", function(e, t) {
                    e !== t && r(e)
                }), u.on("mousedown", a)
            }
        }
    }]), mixcloudWWW.directive("mRepostedContent", ["cssTransitions", function(e) {
        return {
            scope: !0,
            link: function(t, n) {
                t.$on("ajaxtoggle:toggle", function(t, r, o) {
                    "repost" === o && e.addClassAndRemove(n, "card-fade-out")
                })
            }
        }
    }]), mixcloudWWW.directive("mScrollEffect", ["$window", function(e) {
        return function(t, n, r) {
            function o() {
                var e = n[0].getBoundingClientRect();
                if (isNaN(c) || e.top < c && (n.addClass(r.mScrollEffectClass), r.mScrollEffect || a.off("scroll", o)), r.mScrollEffect) {
                    var t = Math.max(Math.min(1, 1 - e.bottom / (a.height() + e.height)), 0),
                        u = Math.round(l + t * (s - l));
                    u !== i && (n.css(r.mScrollEffect, u), i = u)
                }
            }
            var i = null,
                a = $(e),
                l = parseInt(r.mScrollEffectFrom, 10),
                s = parseInt(r.mScrollEffectTo, 10),
                c = parseInt(r.mScrollClassThreshold, 10);
            a.on("scroll", o), n.on("$destroy", function() {
                a.off("scroll", o)
            }), o()
        }
    }]), mixcloudWWW.directive("mScrollToTop", ["$window", "afterFirstPaint", "scrolling", function(e, t, n) {
        return function(r, o, i) {
            function a() {
                var e;
                if (f) {
                    var t = f.getBoundingClientRect();
                    if (0 === t.width && 0 === t.height) return;
                    e = t.top <= 0
                } else {
                    var r;
                    r = s.length ? s.scrollTop() : n.getScrollTop(), e = r > c
                }
                e !== u && (u = e, u ? o.addClass("back-to-top-show") : o.removeClass("back-to-top-show"))
            }
            var l, s = o.closest("[m-scroll-container]"),
                c = 0,
                u = !1,
                f = null;
            t(function() {
                if (i.mScrollToTop) c = parseInt(i.mScrollToTop, 10);
                else {
                    var t;
                    t = s.length ? s.find("[m-scroll-to-top-trigger]").first() : $("[m-scroll-to-top-trigger]").first(), t.length && (f = t[0])
                }
                s.length ? (l = s, s.on("scroll", a), o.on("$destroy", function() {
                    s.off("scroll", a)
                })) : (l = $("html, body"), $(e).on("scroll", a), o.on("$destroy", function() {
                    $(e).off("scroll", a)
                })), a()
            }), o.on("click", function(e) {
                return e.which <= 1 && !e.metaKey && !e.ctrlKey ? (o.removeClass("back-to-top-show"), l.animate({
                    scrollTop: 0
                }, 500), !1) : void 0
            })
        }
    }]), mixcloudWWW.directive("mSearchInput", ["$document", "debounce", "googleAnalytics", "hotkeys", "safeApply", function(e, t, n, r, o) {
        return function(e, i) {
            function a() {
                i.blur(), e.$apply(function() {
                    e.search.searching = !1
                })
            }
            var l = t(n.trackSearch, 100);
            i.on("keydown", function(e) {
                return (e.which || e.keyCode) === r.ENTER ? !1 : void 0
            }), e.search = {
                searching: !!$.trim(e.query),
                loading: !1,
                close: function() {
                    e.search.searching = !1
                }
            }, e.$watch("query", function(t) {
                var n = $.trim(t);
                e.search.searching = !!n, e.search.query = n
            }), e.$on("navigation:start", function() {
                e.search.searching = !1
            }), i.on("focus", function() {
                e.search.searching || o(e, function() {
                    e.search.searching = !0
                })
            }), i.on("blur", function() {
                l(e.search.query)
            }), e.$watch("search.searching", function(e, t) {
                e !== t && (e ? r.on(r.ESCAPE, a) : r.off(r.ESCAPE, a))
            })
        }
    }]), mixcloudWWW.directive("mSearchResults", ["cancellableTimeout", "debounce", "mHttp", function(e, t, n) {
        return function(t, r, o) {
            function i() {
                if (n.cancel(a), t.search.query) {
                    var e = {
                        mixcloud_query: t.search.query
                    };
                    angular.forEach(t.search.filters.values, function(t, n) {
                        t && (e[n] = t)
                    });
                    var i = $.param(e);
                    if (i === l) return;
                    r.empty(), l = i, s.schedule(function() {
                        t.$apply(function() {
                            t.search.loading = !0, a = n.load(r, t, o.mSearchResults, {
                                data: e
                            }), a.then(function() {
                                t.search.loading = !1, r.parent()[0].scrollTop = 0
                            }, function() {
                                t.search.loading = !1
                            })
                        })
                    }, 250)
                } else s.cancel(), r.empty()
            }
            var a = null,
                l = null,
                s = e();
            t.search.filters = {
                toggles: {
                    cloudcast: !1,
                    user: !1
                },
                values: {
                    created_after: null,
                    is_timestamped: null,
                    date_joined_after: null,
                    is_uploader: null
                }
            }, t.$watch("search.searching", function(e) {
                e || n.cancel(a)
            }), t.$watch("search.query", i), t.$watch("search.filters.values", i, !0)
        }
    }]), mixcloudWWW.directive("mSet", ["$parse", function(e) {
        return function(t, n, r) {
            angular.forEach(t.$eval(r.mSet), function(n, r) {
                var o = e(r);
                void 0 === o(t) && o.assign(t, n)
            })
        }
    }]), mixcloudWWW.directive("mSideScroll", function() {
        return function(e, t) {
            t.mousewheel(function(e, t) {
                this.scrollLeft -= 10 * t, e.preventDefault()
            })
        }
    }), mixcloudWWW.directive("mSkinClick", ["$window", function(e) {
        return function(t, n) {
            n.on("click", "[m-contents-inner]", function(r) {
                t.skin && t.skin.clickUrl && r.target === n.children("[m-contents-inner]")[0] && e.open(t.skin.clickUrl)
            })
        }
    }]), mixcloudWWW.directive("mBrandedSkinClick", ["$window", function(e) {
        return function(t, n) {
            n.on("click", function(r) {
                t.skin && t.skin.clickUrl && r.target === n[0] && e.open(t.skin.clickUrl)
            })
        }
    }]), mixcloudWWW.directive("mMoreSuggestedUsers", ["$compile", "cssTransitions", "mHttp", function(e, t, n) {
        return {
            scope: {},
            controller: ["$scope", function(e) {
                var t = [];
                this.addPrefetchedSuggestion = function(e) {
                    t.push(e)
                }, this.replaceSuggestion = function(n) {
                    var r = t.length > 0 ? t.shift() : !1;
                    e.removeSuggestion(n, r), t.length === e.mPrefetchedSuggestionsLength ? e.fetchMoreSuggestions() : e.noMoreSuggestions === !0 && (e.hide(), e.noMoreSuggestions = !1)
                }
            }],
            link: function(r, o, i) {
                function a() {
                    return $(this).attr("m-suggestion")
                }
                r.mPrefetchedSuggestionsLength = parseInt(i.mPrefetchedSuggestionsLength, 10) || 1, r.alreadyShown = o.find("[m-suggestion]:visible").map(a).get().join(","), r.fetchMoreSuggestions = function() {
                    r.alreadyShown += "," + o.find("[m-suggestion]:hidden").map(a).get().join(","), n.get(i.mMoreSuggestedUsers, {
                        dataType: "html",
                        data: {
                            already_shown: r.alreadyShown,
                            type: i.mSuggestedUsersType
                        }
                    }).then(function(t) {
                        var n = $(t).appendTo(o);
                        e(n)(r), $.trim(t) || (r.noMoreSuggestions = !0)
                    })
                }, r.hide = function() {
                    t.addClass(o, "card-fade-out").then(function() {
                        o.addClass("ng-hide")
                    })
                }, r.removeSuggestion = function(e, n) {
                    1 === o.find("[m-suggestion]").length ? t.addClassAndRemove(o, "fade-out") : (n && e.after(n), t.addClass(e, "fade-out").then(function() {
                        e.remove(), n && n.show()
                    }))
                }
            }
        }
    }]), mixcloudWWW.directive("mSuggestion", ["mHttp", function(e) {
        return {
            require: "^mMoreSuggestedUsers",
            scope: !0,
            link: function(t, n, r, o) {
                r.hasOwnProperty("mPrefetch") && o.addPrefetchedSuggestion(n), t.$on("ajaxtoggle:toggle", function(e, i) {
                    i && ("mSuggestionCloudcastCard" in r && t.$emit("ajaxload", "injectCloudcastCard", {
                        data: {
                            followed: r.mSuggestion
                        }
                    }), o.replaceSuggestion(n))
                }), t.close = function() {
                    e.post(r.mIgnoreUrl).then(function() {
                        o.replaceSuggestion(n)
                    })
                }
            }
        }
    }]), mixcloudWWW.directive("mSuggestionsRefresh", ["$timeout", function(e) {
        return {
            require: "^mMoreSuggestedUsers",
            scope: !0,
            link: function(t, n, r, o) {
                n.on("click", function() {
                    n.addClass("refresh-spin"), e(function() {
                        n.removeClass("refresh-spin")
                    }, 1e3), n.closest("div").find("div[m-suggestion]:visible").each(function() {
                        o.replaceSuggestion($(this))
                    })
                })
            }
        }
    }]), mixcloudWWW.directive("mTimeInput", ["$document", "$parse", function(e, t) {
        var n = /^\s*((\d+):)?(\d?\d):(\d\d)\s*$/;
        return {
            require: "ngModel",
            link: function(r, o, i, a) {
                function l(e) {
                    if (null === e || void 0 === e || isNaN(e)) return void 0;
                    var t = Math.floor(e / 3600),
                        n = Math.floor(e % 3600 / 60),
                        r = Math.floor(e % 60);
                    return (t ? t + ":" : "") + (10 > n ? "0" : "") + n + ":" + (10 > r ? "0" : "") + r
                }

                function s() {
                    var e = !0;
                    void 0 !== a.$modelValue && (angular.isNumber(a.$modelValue) && a.$modelValue >= d ? p && a.$modelValue > p && (e = !1) : e = !1), (e || void 0 === a.$modelValue) && r.$emit("timeinput:change"), a.$setValidity("validTimeError", e)
                }

                function c(e) {
                    var t = e.pageY - h;
                    if (!angular.isNumber(m)) {
                        if (!(t > 15)) return;
                        m = d
                    }
                    t /= 100, t = 60 * t * Math.abs(t);
                    var n = Math.floor(Math.max(m + t, d));
                    return p && (n = Math.min(n, p)), r.$apply(function() {
                        f.assign(r, n)
                    }), !1
                }

                function u() {
                    r.$apply(function() {
                        r.$emit("m-time-input:dragstop")
                    }), o.removeClass("dragging"), e.off("mousemove", c), e.off("mouseup mouseleave", u)
                }
                var f = t(i.ngModel),
                    d = 0,
                    p = null;
                i.$observe("mTimeMin", function(e) {
                    e = parseInt(e, 10), d = isNaN(e) ? 0 : e, s()
                }), i.$observe("mTimeMax", function(e) {
                    e = parseInt(e, 10), p = isNaN(e) ? null : e, s()
                }), a.$parsers.push(function(e) {
                    if (!e) return void 0;
                    var t = e.match(n);
                    if (t) {
                        var r = 3600 * (t[2] ? parseInt(t[2], 10) : 0) + 60 * parseInt(t[3], 10) + parseInt(t[4], 10);
                        return d > r || p && r > p ? null : r
                    }
                    return null
                }), a.$formatters.push(l), r.$watch(i.ngModel, s);
                var h, m;
                o.on("mousedown", function(t) {
                    t.which > 1 || t.metaKey || (h = t.pageY, m = a.$modelValue, r.$emit("m-time-input:dragstart"), o.addClass("dragging"), e.on("mousemove", c), e.on("mouseup mouseleave", u))
                })
            }
        }
    }]), mixcloudWWW.directive("mValidateUploadName", ["mHttp", function(e) {
        return {
            require: "ngModel",
            link: function(t, n, r, o) {
                function i(e) {
                    return o.validateUploadName(!0, e), e
                }
                var a = null;
                o.validateUploadName = function(t, n) {
                    o.$setValidity("slugify", !0), o.$setValidity("duplicate", !0);
                    var i = $.trim((void 0 === n ? o.$modelValue : n) || "");
                    return i && (e.cancel(a), a = e.get(r.mValidateUploadName, {
                        data: {
                            name: i
                        },
                        dataType: "json",
                        async: t
                    }), a.then(function(e) {
                        e.success || "required" !== e.error ? (o.$setValidity("slugify", e.success || "slugify" !== e.error), o.$setValidity("duplicate", e.success || "duplicate" !== e.error)) : o.$setValidity("required", !1)
                    })), a
                }, o.$formatters.push(i), o.$parsers.push(i)
            }
        }
    }]), mixcloudWWW.directive("mVolumeSlider", ["$document", function(e) {
        return {
            scope: {
                volume: "=mVolumeSlider"
            },
            link: function(t, n) {
                function r() {
                    e.off("touchend mouseup", r).off("touchmove mousemove", o)
                }

                function o(e) {
                    var n = 1 - ((e.touches && e.touches.length > 0 ? e.touches[0].pageY : e.pageY) - a) / l;
                    return n = Math.min(Math.max(n, 0), 1), n !== t.volume && (i.css("height", 100 * n + "%"), t.$apply(function() {
                        t.volume = n
                    })), !1
                }
                var i = n.find("[m-volume-slider-bar]");
                t.$watch("volume", function() {
                    i.css("height", 100 * t.volume + "%")
                });
                var a, l;
                n.on("selectstart", function() {
                    return !1
                }), n.on("touchstart mousedown", function(t) {
                    return t.which && t.which > 1 || t.metaKey || t.ctrlKey ? void 0 : (a = n.offset().top, l = n.height(), o(t), e.on("touchend mouseup", r).on("touchmove mousemove", o), !1)
                })
            }
        }
    }]), mixcloudWWW.directive("mWaveform", ["$document", "$window", "featureDetection", "mHttp", "throttle", function(e, t, n, r, o) {
        if (!n.test("canvas")) return function() {};
        var i = /^#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
            a = /^#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
            l = /^rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(,\s*\d+)?\)$/,
            s = window.devicePixelRatio || 1;
        return function(n, c, u) {
            function f() {
                v = n.audioLength && n.sectionStartTimes ? n.sectionStartTimes.map(function(e) {
                    return e / n.audioLength
                }) : [], h()
            }

            function d() {
                if (null === C) {
                    C = e[0].createElement("canvas"), x = C.getContext("2d");
                    var n = c.css("color"),
                        r = l.exec(n);
                    if (S = [], r) S[0] = "rgba(" + r[1] + "," + r[2] + "," + r[3] + ", 0.3)", S[1] = "rgba(" + r[1] + "," + r[2] + "," + r[3] + ", 0.25)";
                    else {
                        var o = i.exec(n) || a.exec(n);
                        S[0] = "rgba(" + parseInt(o[1], 16) + "," + parseInt(o[2], 16) + "," + parseInt(o[3], 16) + ", 0.3)", S[1] = "rgba(" + parseInt(o[1], 16) + "," + parseInt(o[2], 16) + "," + parseInt(o[3], 16) + ", 0.25)"
                    }
                    p(), c.append(C), $(t).on("resize", w), c.on("$destroy", function() {
                        $(t).off("resize", w)
                    })
                }
            }

            function p() {
                P = c.height(), k = c.width(), $(C).css({
                    width: "100%",
                    height: P + "px"
                }), x.scale(s, s), k *= s, P *= s, C.width = k, C.height = P
            }

            function h() {
                if (m) {
                    d();
                    var e, t = 0;
                    p(), x.clearRect(0, 0, k, P), x.lineWidth = 1, x.strokeStyle = S[t % 2], x.beginPath();
                    for (var n = 0; k > n; n++) n / k > v[t] && (t++, x.strokeStyle = S[t % 2], x.stroke(), x.beginPath()), e = m[Math.floor(g * (n - n % Math.floor(s)) / k)], y ? (x.moveTo(n + .5, Math.ceil(P * (1 + e) / 2)), x.lineTo(n + .5, Math.ceil(P * (1 - e) / 2))) : (x.moveTo(n + .5, P), x.lineTo(n + .5, Math.ceil(P * (1 - e))));
                    x.stroke(), setTimeout(function() {
                        c.addClass("ready")
                    }, 1)
                }
            }
            var m = null,
                g = null,
                v = [],
                y = "mWaveformMirrored" in u,
                w = o(h, 500);
            n.$watch("audioLength", f), n.$watch("sectionStartTimes", f), u.mWaveformRedraw && n.$watch(u.mWaveformRedraw, function() {
                t.requestAnimationFrame(function() {
                    h()
                })
            });
            var b = null;
            u.$observe("mWaveform", function(e) {
                r.cancel(b), e && (b = r.get(e, {
                    dataType: "json"
                }), b.then(function(e) {
                    e && e.width && (g = e.width, m = e.data.map(function(t) {
                        return t[0] / e.height
                    }), h())
                }))
            });
            var x, S, k, P, C = null
        }
    }]), mixcloudShared.filter("numberPlus", function() {
        return function(e, t) {
            return t = t || 5, e > t ? t + "+" : e
        }
    }), mixcloudShared.filter("urlencode", function() {
        return function(e) {
            return encodeURIComponent(e)
        }
    }), mixcloudWWW.factory("addToQueue", ["callbacks", "crossTab", "webPlayer", function(e, t, n) {
        var r = e(),
            o = r.listenable();
        return o.add = function(e) {
            n.playerOpen() ? r.call(o, e) : t.emit("add_to_queue", e, {
                excludeSelf: !0
            }).then(angular.noop, function() {
                r.call(o, e)
            })
        }, t.on("add_to_queue", function(e) {
            return n.playerOpen() ? (r.call(o, e), !0) : !1
        }), o
    }]), mixcloudWWW.factory("cssTransitions", ["$q", "$rootScope", "$window", "featureDetection", "safeApply", function(e, t, n, r, o) {
        function i(n) {
            var i = e.defer();
            return r.test("cssTransitions") ? n.one(f, function() {
                o(t, function() {
                    i.resolve()
                })
            }) : i.resolve(), i.promise
        }

        function a(e) {
            function t() {
                e(), r = n.requestAnimationFrame(t)
            }
            var r = null;
            return {
                start: function() {
                    r = n.requestAnimationFrame(t)
                },
                stop: function() {
                    null !== r && (n.cancelAnimationFrame(r), r = null)
                }
            }
        }

        function l(e, t, n) {
            function r(e) {
                return i.forEach(function(t) {
                    t.start(e)
                }), a[e](l[e])
            }

            function o(e, n) {
                var r = i.map(function(t) {
                    return t.step(e, n)
                });
                t && t.apply(window, r)
            }
            var i, a = c(o),
                l = {
                    forwards: 0,
                    backwards: 0
                },
                f = {
                    forwards: 1,
                    backwards: 0
                };
            return n = n || s, i = e.map(function(e) {
                e.forwards.delay || (e.forwards.delay = 0), "delay" in e.backwards || (e.backwards.delay = e.forwards.delay), e.backwards.duration || (e.backwards.duration = e.forwards.duration), l.forwards += e.forwards.duration + e.forwards.delay, l.backwards += e.backwards.duration + e.backwards.delay;
                var t = 0;
                return {
                    start: function(r) {
                        t = n(u((a.getX() * l[r] - e[r].delay) / e[r].duration)), e.start && e.start(t)
                    },
                    step: function(r, o) {
                        var i = n(u((r * l[o] - e[o].delay) / e[o].duration));
                        return i !== t && (t = i, e.step && e.step(t), t === f[o] && e.end && e.end(f[o])), i
                    }
                }
            }), {
                forwards: function() {
                    return r("forwards")
                },
                backwards: function() {
                    return r("backwards")
                }
            }
        }

        function s(e) {
            return e
        }

        function c(r) {
            function o(r, o, c, f) {
                function d() {
                    var e = n.performance.now();
                    s = u((e + o - p) / r), f(), c() ? a = n.requestAnimationFrame(d) : (a = null, t.$apply(l.resolve))
                }
                i();
                var p = n.performance.now();
                return l = e.defer(), a = n.requestAnimationFrame(d), l.promise
            }

            function i() {
                null !== a && (n.cancelAnimationFrame(a), a = null)
            }
            var a = null,
                l = null,
                s = 0;
            return {
                getX: function() {
                    return s
                },
                forwards: function(e) {
                    return o(e, e * s, function() {
                        return 1 > s
                    }, function() {
                        r(s, "forwards")
                    })
                },
                backwards: function(e) {
                    return o(e, e * (1 - s), function() {
                        return s > 0
                    }, function() {
                        s = 1 - s, r(s, "backwards")
                    })
                }
            }
        }

        function u(e) {
            return Math.min(Math.max(e, 0), 1)
        }
        var f = "transitionend webkitTransitionEnd";
        return {
            addClass: function(e, t) {
                var n = i(e);
                return e.addClass(t), n
            },
            removeClass: function(e, t) {
                var n = i(e);
                return e.removeClass(t), n
            },
            addClassAndRemove: function(e, t) {
                e.one(f, function() {
                    e.remove()
                }), e.addClass(t)
            },
            getAnimation: l,
            timelessAnimation: a
        }
    }]), mixcloudWWW.factory("crossTab", ["$q", "$rootScope", "$timeout", "$window", "callbacks", "localStorageWrapper", "uniqueId", function(e, t, n, r, o, i, a) {
        function l() {
            h || (h = !0, i.on(function(e) {
                if (null !== e.newValue) {
                    var t = u.exec(e.key);
                    if (t)
                        if ("ack" === t[1]) d.hasOwnProperty(e.newValue) && (d[e.newValue].callback(), setTimeout(function() {
                            i.removeItem(e.key)
                        }, 0));
                        else if (f.hasOwnProperty(t[1])) {
                        var n = null;
                        try {
                            n = JSON.parse(e.newValue)
                        } catch (r) {}
                        n && n.tabId !== p && s(t[1], n.data) !== !1 && i.setItem(c + "ack", n.tabId + "|" + n.emitId), setTimeout(function() {
                            i.removeItem(e.key)
                        }, 0)
                    }
                }
            }))
        }

        function s(e, t) {
            return f[e].call(m, t).reduce(function(e, t) {
                return e || t ? !0 : e === !1 || t === !1 ? !1 : void 0
            })
        }
        var c = "mx:comms:",
            u = /^mx:comms:(.*)$/,
            f = {},
            d = {},
            p = Math.floor(1e4 * Math.random()),
            h = !1,
            m = {
                emit: function(t, r, o) {
                    l();
                    var u = e.defer(),
                        h = a(),
                        m = c + t,
                        g = p + "|" + h,
                        v = angular.extend({
                            timeout: 600,
                            excludeSelf: !1
                        }, o);
                    return d[g] = {
                        opts: v,
                        callback: function() {
                            n.cancel(this.timeoutPromise), delete d[g], u.resolve()
                        },
                        timeoutPromise: n(function() {
                            delete d[g], i.removeItem(m), u.reject()
                        }, v.timeout)
                    }, i.setItem(m, JSON.stringify({
                        data: r,
                        tabId: p,
                        emitId: h
                    })), !v.excludeSelf && f.hasOwnProperty(t) && s(t, r) !== !1 && n(function() {
                        d.hasOwnProperty(g) && (d[g].callback(), setTimeout(function() {
                            i.removeItem(m)
                        }, 0))
                    }, 0), u.promise
                },
                on: function(e, t) {
                    l(), f.hasOwnProperty(e) || (f[e] = o()), f[e].on(t, !0)
                }
            };
        return m
    }]), mixcloudWWW.factory("cloudcastEmbed", ["url", function(e) {
        function t(e, t, n) {
            var r = parseInt(t, 10),
                o = n.mini ? u : c;
            return o += n.showTracklist ? f : 0, (!n.showTracklist || o > r) && (r = o), {
                width: e,
                height: r
            }
        }

        function n(e, t, n, r, o, i, a, l) {
            var c, u, f, d = $("<div></div>").append($(e).clone()),
                p = d.find("iframe"),
                h = d.find("p, div");
            i && (u = o ? "100%" : parseInt(t, 10) > a ? a : t, f = parseInt(n, 10) > l ? l : n), p.attr("width", o ? "100%" : i === !0 && parseInt(t, 10) > a ? a : t), p.attr("height", i === !0 && parseInt(n, 10) > l ? l : n), h.each(function() {
                $(this).css("width", o ? "auto" : i === !0 && parseInt(t, 10) > a ? a - 8 + "px" : parseInt(t, 10) - 8 + "px")
            });
            var m = r.stylecolor ? "#" + r.stylecolor.replace("#", "") : "#808080";
            h.find("a").css("color", m);
            var g = s(e, r);
            return p.attr("src", p.attr("src").split("?")[0] + "?" + $.param(g)), c = {
                code: d.html()
            }, i && (c.widthUI = u, c.heightUI = f), c
        }

        function r(e, t, n, r, o, i, a, l) {
            var c, u, f, d = $("<div></div>").append($(e).clone()),
                p = d.find("embed"),
                h = d.find("param[name='movie']"),
                m = d.find("object, embed"),
                g = d.find("p, div");
            i && (u = o ? "100%" : parseInt(t, 10) > a ? a : t, f = parseInt(n, 10) > l ? l : n), m.each(function() {
                $(this).attr("width", o ? "100%" : i === !0 && parseInt(t, 10) > a ? a : t), $(this).attr("height", i === !0 && parseInt(n, 10) > l ? l : n)
            }), g.each(function() {
                $(this).css("width", o ? "auto" : i === !0 && parseInt(t, 10) > a ? a - 8 + "px" : parseInt(t, 10) - 8 + "px")
            });
            var v = r.stylecolor ? "#" + r.stylecolor.replace("#", "") : "#02a0c7";
            g.find("a").css("color", v);
            var y = s(e, r),
                w = p.attr("src").split("?")[0] + "?" + $.param(y);
            return p.attr("src", w), h.attr("value", w), c = {
                code: d.html()
            }, i && (c.widthUI = u, c.heightUI = f), c
        }

        function o(e, t, n, r, o) {
            var i = "[mixcloud " + e;
            i += o ? " width=100%" : " width=" + t, i += " height=" + (n + 28);
            var a = (r.stylecolor || "").replace("#", "");
            return a && a.length && (i += " color=" + a), r.light && (i += " light=1"), r.showCover || (i += " hide_cover=1"), r.showTracklist || (i += " hide_tracklist=1"), r.showArtwork || (i += " hide_artwork=1"), r.mini && (i += " mini=1"), i += "]"
        }

        function i(e) {
            var t = $("<div></div>").append($(e).clone()),
                n = t.find("iframe, object");
            return {
                width: n.attr("width"),
                height: n.attr("height")
            }
        }

        function a(t) {
            var n = $("<div></div>").append($(t).clone()),
                r = n.find("iframe, embed");
            return e(r.attr("src")).params()
        }

        function l(e) {
            var t = a(e),
                n = ["1", "true"];
            return {
                stylecolor: t.stylecolor ? "#" + t.stylecolor.replace("#", "") : "",
                showCover: $.inArray(t.hide_cover, n) < 0,
                showTracklist: $.inArray(t.hide_tracklist, n) < 0,
                mini: $.inArray(t.mini, n) >= 0,
                showArtwork: $.inArray(t.hide_artwork, n) < 0,
                autoplay: $.inArray(t.autoplay, n) >= 0,
                light: $.inArray(t.light, n) >= 0
            }
        }

        function s(e, t) {
            var n = a(e),
                r = {};
            return n.stylecolor = t.stylecolor ? t.stylecolor.replace("#", "") : n.stylecolor, n.hide_cover = t.showCover === !0 ? "" : "1", n.hide_tracklist = t.showTracklist === !0 ? "" : "1", n.mini = t.mini === !0 ? "1" : "", n.hide_artwork = t.showArtwork === !0 ? "" : "1", n.autoplay = t.autoplay === !0 ? "1" : "", n.light = t.light === !0 ? "1" : "", angular.forEach(n, function(e, t) {
                e && (r[t] = e)
            }), r
        }
        var c = 180,
            u = 60,
            f = 180,
            d = {
                getIframeEmbedCode: n,
                getFlashEmbedCode: r,
                getWordpressEmbedCode: o,
                validateSize: t,
                getWidgetSize: i,
                getWidgetOptions: l
            };
        return d
    }]), mixcloudWWW.factory("dialog", ["$document", "$q", "$rootScope", "hotkeys", "mHttp", "scrolling", function(e, t, n, r, o, i) {
        function a(t, i, a, l) {
            function s() {
                c.release()
            }
            var c = i.modalsHighlander.acquire(),
                u = {
                    closePromise: c.releasePromise,
                    close: s
                };
            return i.dialog = u, c.acquirePromise.then(function() {
                var f, d = n.$new(),
                    p = null;
                a.appendTo(e.find("body")), l(), r.on(r.ESCAPE, s), f = i.$on("navigation:start", s), c.releasePromise.then(function() {
                    o.cancel(p), r.off(r.ESCAPE, s), f(), d.$destroy(), a.remove(), i.dialog === u && (i.dialog = null)
                }), angular.extend(i.dialog, {
                    load: function(e) {
                        a.addClass("modal-loading"), p = o.load(a, d, e), p.then(function() {
                            a.removeClass("modal-loading"), l()
                        }, function() {
                            c.release()
                        })
                    },
                    setPosition: l,
                    scope: d
                }), d.dialog = i.dialog, i.dialog.load(t)
            })
        }
        return n.modals = {
            modalOverlay: !1
        }, {
            openDialog: function(e, t) {
                var r = $('<div class="modal"></div>');
                return n.modals.modalOverlay = !0, a(e, t, r, function() {
                    "fixed" === r.css("position") && r.css({
                        position: "absolute",
                        top: r.offset().top
                    }), r.css("margin-left", -r.outerWidth() / 2)
                }).then(function() {
                    n.modals.modalOverlay = !0, t.dialog.closePromise.then(function() {
                        n.modals.modalOverlay = !1
                    })
                })
            },
            openPopover: function(e, t, n, r) {
                var o = $('<div class="popover"></div>');
                return a(e, t, o, function() {
                    var e = n.offset();
                    o.css({
                        left: e.left + (n.outerWidth() - o.outerWidth()) / 2,
                        top: e.top - o.outerHeight()
                    }), r && o.css({
                        position: "fixed",
                        top: e.top - o.outerHeight() - i.getScrollTop()
                    })
                })
            }
        }
    }]), mixcloudWWW.factory("favicon", ["$document", "featureDetection", "settings", function(e, t, n) {
        function r(e) {
            return 2 === f ? e.replace(/.png$/i, "@2x.png") : e
        }

        function o(e) {
            e !== p && (p = e, u.attr("rel", "x-not-an-icon"), setTimeout(function() {
                u.attr({
                    rel: "icon",
                    href: e,
                    type: c
                })
            }, 1))
        }
        var i, a, l, s = null,
            c = "image/png",
            u = e.find("head").find("link[rel=icon]"),
            f = t.test("retina") ? 2 : 1;
        n.urls.favicons.normal.large = u.attr("href"), t.test("canvas") && (s = e[0].createElement("canvas"), s.width = 16 * f, s.height = 16 * f, i = s.getContext("2d"), c = "image/x-icon");
        var d = {
            NORMAL: "normal",
            PAUSED: "paused",
            UPLOADING: "uploading",
            update: function(e, t) {
                if (e !== l || t !== a)
                    if (l = e, a = t, s && void 0 !== t) {
                        var c = new Image;
                        c.onload = function() {
                            i.clearRect(0, 0, 16 * f, 16 * f);
                            try {
                                i.drawImage(c, 0, 0, c.width, c.height, 4 * f, 4 * f, 8 * f, 8 * f)
                            } catch (a) {
                                return
                            }
                            i.beginPath(), i.moveTo(16 * f - 1, 8 * f), i.arc(8 * f, 8 * f, 7 * f, 0, 2 * Math.PI, !1), i.lineWidth = 2 * f, i.strokeStyle = "rgba(120, 120, 120, 0.2)", i.stroke(), i.beginPath(), i.moveTo(8 * f, f), i.arc(8 * f, 8 * f, 7 * f, .5 * -Math.PI, Math.PI * (-.5 + 2 * t), !1), i.lineWidth = 2 * f, i.strokeStyle = "rgba(39, 141, 186, 1)", i.stroke(), i.beginPath(), i.moveTo(8 * f, 2.5 * f), i.arc(8 * f, 8 * f, 5.5 * f, .5 * -Math.PI, Math.PI * (-.5 + 2 * t), !1), i.lineWidth = f, i.strokeStyle = "rgba(39, 141, 186, 0.3)", i.stroke();
                            try {
                                o(s.toDataURL())
                            } catch (a) {
                                o(r(n.urls.favicons[e].large))
                            }
                        }, c.src = r(n.urls.favicons[e].small)
                    } else o(r(n.urls.favicons[e].large))
            }
        };
        l = d.NORMAL;
        var p = null;
        return d
    }]), mixcloudShared.factory("hotkeys", ["$document", "callbacks", function(e, t) {
        function n(e) {
            var t = e.which || e.keyCode;
            if (t in i && (t === l.ESCAPE || !$(e.target).is("input, textarea, a"))) {
                var n = i[t];
                if (n.opts && n.opts.ignoreWithMeta && (e.metaKey || e.ctrlKey)) return;
                return n.call(l), !1
            }
        }

        function r(r, o, l) {
            r in i || (i[r] = t({
                lastItemRemovedCallback: function() {
                    delete i[r], a--, 0 === a && e.off("keydown", n)
                }
            }), i[r].opts = l, a++, 1 === a && e.on("keydown", n)), i[r].on(o, !0)
        }

        function o(e, t) {
            e in i && i[e].off(t)
        }
        var i = {},
            a = 0,
            l = {
                on: r,
                off: o,
                ESCAPE: 27,
                SPACE: 32,
                "<": 188,
                ">": 190,
                ENTER: 13,
                BACKSPACE: 8,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                isArrowKey: function(e) {
                    return e >= 37 && 40 >= e
                }
            };
        return l
    }]), mixcloudWWW.factory("hideable", ["$rootScope", "mHttp", "settings", function(e, t, n) {
        return {
            hide: function(r) {
                e.$broadcast("hideable:hide", r), t.post(n.urls.hide_content, {
                    data: {
                        content_key: r
                    }
                })
            }
        }
    }]), mixcloudWWW.factory("highlander", ["$q", function(e) {
        return function() {
            var t = null;
            return {
                acquire: function() {
                    var n = e.defer(),
                        r = e.defer();
                    return t ? (t.releasePromise.then(n.resolve), t.release()) : n.resolve(), t = {
                        acquirePromise: n.promise,
                        releasePromise: r.promise,
                        release: function() {
                            t === this && (n.reject(), r.resolve(), t = null)
                        }
                    }
                },
                releaseAll: function() {
                    t && t.release()
                },
                isAcquired: function() {
                    return !!t
                }
            }
        }
    }]), mixcloudWWW.factory("login", ["$q", "$rootScope", "$window", "dialog", "facebook", "googleAnalytics", "mHttp", "navigation", "settings", function(e, t, n, r, o, i, a, l, s) {
        function c(e) {
            t.login.currentUser = e || null, e ? Raven.setUser({
                id: e.username
            }) : Raven.setUser()
        }

        function u() {
            var n = e.defer();
            return r.openDialog(s.urls.authentication.register_modal, t).then(function() {
                t.dialog.scope.$on("action:complete", function() {
                    n.resolve()
                }), t.dialog.closePromise.then(function() {
                    n.reject()
                })
            }), n.promise
        }
        var f = {
            loggedIn: function() {
                return s.pageState.login._loggedIn
            },
            setLoggedIn: function(e, t) {
                var n = e && t && t.currentUser ? t.currentUser : null;
                s.pageState.login._loggedIn = e, s.pageState.login._currentUser = n, c(n), i.setUserId(n && n.id), t && t.redirectionTarget ? l.navigate(t.redirectionTarget) : e && s.pageState.redirectHomeOnLogin ? l.navigate("/") : e && s.pageState.reloadOnLogin && l.reload()
            },
            getCurrentUser: function() {
                return s.pageState.login._currentUser
            },
            logout: function() {
                a.post(s.urls.authentication.logout).then(function() {
                    f.setLoggedIn(!1), o.logout(), l.navigate(s.urls.authentication.post_logout_page)
                })
            },
            requireLoggedIn: function() {
                if (f.loggedIn()) {
                    var t = e.defer();
                    return t.resolve(), t.promise
                }
                return u()
            },
            loginAutomaticallyViaFacebook: function() {
                f.loggedIn() || o.getLoginStatus().then(function(e) {
                    a.post(s.urls.authentication.facebook_login, {
                        dataType: "json",
                        data: {
                            fb_access_token: e.authResponse.accessToken
                        }
                    }).then(function(e) {
                        e.success && f.setLoggedIn(!0, e.authentication)
                    })
                })
            }
        };
        return t.login = {
            currentUser: null
        }, t.$watch(f.getCurrentUser, c), f
    }]), mixcloudWWWRun.run(["login", function(e) {
        e.loginAutomaticallyViaFacebook()
    }]), mixcloudWWW.factory("masonryItems", [function() {
        function e(e, t) {
            return $.makeArray(e.not("[m-masonry-last]").map(function() {
                var e = $(this),
                    n = e.data(o);
                return n ? n : (n = {
                    $item: $(this)
                }, t && (n.compiled = !0), e.data(o, n), n)
            }))
        }

        function t(e, t) {
            var r = e.filter("[m-masonry-last]");
            n = r.length ? {
                $item: r,
                compiled: !!t
            } : null
        }
        var n, r = [],
            o = "masonryWrapper";
        return {
            getAll: function() {
                return r
            },
            footerElement: function() {
                return n
            },
            addItems: function(n, o) {
                var i = e(n, o);
                r = r.concat(i), t(n, o)
            },
            setItems: function(n, o) {
                r = e(n, o), t(n, o)
            },
            reset: function() {
                r = []
            }
        }
    }]), mixcloudShared.factory("pageVisibility", ["$document", "$window", "cancellableTimeout", "propertyObject", function(e, t, n, r) {
        function o() {
            l.active = l.focus && l.visible, l.active && i()
        }

        function i() {
            e.off("mousemove", a), h.cancel(), p.schedule(function() {
                e.on("mousemove", a), h.schedule(function() {
                    l.active = !1
                }, g)
            }, m)
        }

        function a() {
            l.active = !0, i()
        }
        var l = r.internalObject(),
            s = r(l),
            c = e[0],
            u = $(t),
            f = null,
            d = null;
        void 0 !== c.hidden ? (d = "hidden", f = "visibilitychange") : void 0 !== c.mozHidden ? (d = "mozHidden", f = "mozvisibilitychange") : void 0 !== c.msHidden ? (d = "msHidden", f = "msvisibilitychange") : void 0 !== c.webkitHidden && (d = "webkitHidden", f = "webkitvisibilitychange"), s.supported = !!d;
        var p = n(),
            h = n(),
            m = 6e4,
            g = 6e4;
        if (l.publicProperty("visible", d ? !c[d] : !0), l.publicProperty("focus", d ? !c[d] : !0), l.publicProperty("active", d ? !c[d] : !0), s.supported) {
            if (e.on(f, function() {
                    l.visible = !c[d]
                }), u.on("focus", function() {
                    l.focus = l.visible
                }), void 0 === c.onfocusout) u.on("blur", function() {
                l.focus = !1
            });
            else {
                var v = null;
                e.on("focusout", function() {
                    v === c.activeElement ? l.focus = !1 : v = c.activeElement
                })
            }
            l.on("focus", o), o()
        }
        return s
    }]), mixcloudWWW.factory("popupWindow", ["$interval", "$q", "$rootScope", "$window", "uniqueId", function(e, t, n, r, o) {
        var i = 500,
            a = {};
        return r.popupWindowCallback = function(e, t) {
                n.$apply(function() {
                    var n = a[e];
                    n && n.resolve(t)
                })
            },
            function(n, l) {
                var s = "callback" + o(),
                    c = a[s] = t.defer(),
                    u = angular.extend({
                        width: 800,
                        height: 600
                    }, l);
                u.left = (r.screen.width - u.width) / 2, u.top = (r.screen.height - u.height) / 2;
                var f = "location=0,status=0,width=" + u.width + ",height=" + u.height + ",left=" + u.left + ",top=" + u.top,
                    d = r.open(n, "", f);
                d.name = s;
                var p = e(function() {
                    d.closed && c.reject()
                }, i);
                return c.promise["finally"](function() {
                    e.cancel(p), delete a[s]
                }), c.promise
            }
    }]), mixcloudWWW.provider("simpleAudioPlayer", function() {
        var e = "/media/swf/audiojs/audiojs.swf";
        this.setSwfUrl = function(t) {
            return e = t, this
        }, this.$get = ["$document", "$window", "featureDetection", "uniqueId", function(e, t, n, r) {
            var o = e.find("body");
            return function(i, a) {
                var l, s, c, u, f = null;
                if (n.test("audio")) c = $('<audio preload src="' + i + '"></audio>').appendTo(o), f = c[0], c.on("ended", a.onEnded), c.on("error", a.onError), l = function() {
                    f.play()
                }, s = function() {
                    c.off("error ended"), c.remove()
                }, u = function() {
                    return 0 === f.duration ? 0 : f.currentTime / f.duration
                };
                else {
                    c = $("<div></div>").appendTo(o);
                    var d = r(),
                        p = 0;
                    u = function() {
                        return p
                    };
                    var h = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="audio-preview-swf' + d + '" width="20" height="20" name="audio-preview-swf' + d + '" style="position: fixed; bottom: 0; left: 0; z-index: 10000;">' + '<param name="movie" value="/media/swf/audiojs/audiojs.swf?playerInstance=audioJsInterface._' + d + "&datetime=" + d + '">' + '<param name="allowscriptaccess" value="always">' + '<embed name="audio-preview-swf' + d + '" src="/media/swf/audiojs/audiojs.swf?playerInstance=audioJsInterface._' + d + "&datetime=" + d + '" width="1" height="1" allowscriptaccess="always">' + "</object>";
                    c.html(h), t.audioJsInterface = t.audioJsInterface || {}, t.audioJsInterface["_" + d] = {
                        loadStarted: function() {
                            f = e[0]["audio-preview-swf" + d] || t["audio-preview-swf" + d], f = f.length > 1 ? f[f.length - 1] : f, f.init(i), m && f.pplay()
                        },
                        updatePlayhead: function(e) {
                            1 === e && a.onEnded(), p = e
                        }
                    };
                    var m = !1;
                    l = function() {
                        if (f) try {
                            f.pplay()
                        } catch (e) {
                            a.onError()
                        } else m = !0
                    }, s = function() {
                        c.remove(), delete t.audioJsInterface["_" + d]
                    }
                }
                return {
                    play: l,
                    stop: s,
                    getPosition: u
                }
            }
        }]
    }), mixcloudWWW.factory("stripe", ["$q", "$rootScope", "$window", "safeApply", "settings", function(e, t, n, r, o) {
        function i() {
            LazyLoad.js("https://checkout.stripe.com/checkout.js", function() {
                n.StripeCheckout ? r(t, function() {
                    a.resolve(n.StripeCheckout)
                }) : l && (l = !1, i())
            })
        }
        var a = e.defer(),
            l = !0;
        return i(), {
            open: function(n, i, l, s, c, u) {
                var f = e.defer(),
                    d = e.defer();
                return a.promise.then(function(e) {
                    e.configure({
                        key: o.stripe.key,
                        image: o.stripe.image,
                        token: function(e, n) {
                            r(t, function() {
                                f.resolve(e, n)
                            })
                        }
                    }).open({
                        name: l,
                        description: s,
                        amount: n,
                        currency: i,
                        panelLabel: c,
                        allowRememberMe: !1,
                        zipCode: !0,
                        email: u,
                        closed: function() {
                            r(t, function() {
                                d.resolve()
                            })
                        }
                    })
                }), {
                    token: f.promise,
                    close: d.promise
                }
            }
        }
    }]), mixcloudWWW.factory("tracklistParser", function() {
        function e(e) {
            var t = $.trim(e);
            return angular.forEach(o, function(e) {
                t = t.replace(e, function(e, t) {
                    return t
                })
            }), t
        }

        function t(e) {
            return !!e
        }
        var n = [/\(([^\)]+)\)$/, /\[([^\]]+)\]$/, /\-([^\-]+)$/, /,([^,]+)$/],
            r = [/"([^"]+)" *\-(.+)/, /'([^"]+)' *\-(.+)/, /([^\-]+)\-(.+)/, /([^']+)'(.+)'/, /([^"]+)"(.+)"/, /([^,]+),(.+)/],
            o = [/^\((.*)\)$/, /^"(.*)"$/, /^'(.*)'$/, /^\[(.*)\]$/],
            i = /^\d+(?!:)/,
            a = /\b(remix|mix|edit)\b/,
            l = /((\d+)[:,.-])?(\d?\d)[:,.-](\d\d)(?!\d)/,
            s = /\s*(\[\s*\]|\(\s*\)|\{\s*\}|<\s*>)\s*/;
        return function(o) {
            o = o.replace(/[\u2013\u2014—]/g, "-").replace(/-+/g, "-");
            var c = o.split(/\n/g).map($.trim).filter(t),
                u = c.map(function(e) {
                    return e.match(i)
                }).filter(t);
            if (u.length >= .9 * c.length) {
                var f = null;
                c = c.map(function(e) {
                    var t = $.trim(e.replace(i, ""));
                    return t !== e && (null === f ? f = t.charAt(0) : f !== t.charAt(0) && (f = !1)), t
                }), f && (c = c.map(function(e) {
                    return e.charAt(0) === f ? $.trim(e.substring(1)) : e
                }))
            }
            var d = c.map(function(e) {
                    return e.match(l)
                }).filter(t).length >= c.length / 2,
                p = [],
                h = c.length,
                m = c.length;
            angular.forEach(n, function(e) {
                angular.forEach(r, function(t) {
                    var n = 0,
                        r = 0,
                        o = 0,
                        i = 0,
                        u = 0,
                        f = !0;
                    angular.forEach(c, function(c) {
                        d && (c = c.replace(l, "").replace(s, ""));
                        var f = c.match(e),
                            p = c;
                        null === f || "" === f[1] ? n++ : f[1].toLowerCase().match(a) ? r++ : p = $.trim(c.replace(e, ""));
                        var h = p.match(t),
                            m = c.match(t),
                            g = null === h || "" === h[1] || "" === h[2],
                            v = null === m || "" === m[1] || "" === m[2];
                        g && (v ? o++ : i++), v && u++
                    }), (r > 2 || i > c.length / 2) && (f = !1), m > o && (m = o), h > u && (h = u), p.push({
                        labelRE: e,
                        titleArtistRE: t,
                        allFailedCount: o,
                        failedCount: u,
                        missingLabelCount: n,
                        hasLabel: f
                    })
                })
            }), p = p.filter(function(e) {
                return e.allFailedCount <= m && e.failedCount <= h
            }), p.reduce(function(e, t) {
                return e || t.hasLabel && t.missingLabelCount < c.length / 2
            }, !1) && (p = p.filter(function(e) {
                return e.hasLabel
            }));
            var g = Math.min.apply(Math, p.map(function(e) {
                return e.missingLabelCount
            }));
            p = p.filter(function(e) {
                return e.missingLabelCount === g
            });
            var v = [],
                y = p[0];
            return angular.forEach(c, function(t) {
                var n = {};
                if (d) {
                    var r = t.match(l);
                    r && (n.startTime = 3600 * (r[2] ? parseInt(r[2], 10) : 0) + 60 * parseInt(r[3], 10) + parseInt(r[4], 10), t = t.replace(l, "").replace(s, ""))
                }
                var o = t,
                    i = t.match(y.labelRE);
                null !== i && "" !== i[1] && (o = $.trim(t.replace(y.labelRE, "")));
                var a = null;
                y.hasLabel && (a = o.match(y.titleArtistRE)), null === a && (a = t.match(y.titleArtistRE)), null === a ? n.chapter = t : (n.artist = e(a[1]), n.title = e(a[2])), v.push(n)
            }), {
                sections: v
            }
        }
    }), mixcloudWWW.factory("userProfileEmbed", ["url", function(e) {
        var t = 120;
        return function() {
            function n(t) {
                var n = $("<div></div>").append($(t).clone()),
                    r = n.find("iframe");
                return e(r.attr("src")).params()
            }

            function r(e, t) {
                var r = n(e),
                    o = {};
                return r.dark = t.darkTheme === !0 ? "1" : "", r.hide_followers = t.hideFollowers === !0 ? "1" : "", angular.forEach(r, function(e, t) {
                    e && (o[t] = e)
                }), o
            }
            return {
                getWidgetSize: function(e) {
                    var t = $("<div></div>").append($(e).clone()),
                        n = t.find("iframe");
                    return {
                        width: n.attr("width"),
                        height: n.attr("height")
                    }
                },
                getEmbedCode: function(e, t, n, o, i, a, l, s) {
                    var c, u, f, d = $("<div></div>").append($(e).clone()),
                        p = d.find("iframe");
                    a && (u = i ? "100%" : parseInt(t, 10) > l ? l : t, f = parseInt(n, 10) > s ? s : n), p.attr("width", i ? "100%" : a === !0 && parseInt(t, 10) > l ? l : t), p.attr("height", a === !0 && parseInt(n, 10) > s ? s : n);
                    var h = r(e, o);
                    return p.attr("src", p.attr("src").split("?")[0] + "?" + $.param(h)), c = {
                        code: d.html()
                    }, a && (c.widthUI = u, c.heightUI = f), c
                },
                getWordpressEmbedCode: function(e, t, n, r, o) {
                    var i = "[mixcloud " + e;
                    return i += o ? " width=100%" : " width=" + t, i += " height=" + n, r.darkTheme && (i += " dark=1"), r.hideFollowers && (i += " hide_followers=1"), i += "]"
                },
                getWidgetOptions: function(e) {
                    var t = n(e),
                        r = ["1", "true"];
                    return {
                        darkTheme: $.inArray(t.dark, r) >= 0,
                        hideFollowers: $.inArray(t.hide_followers, r) >= 0
                    }
                },
                validateEmbedSize: function(e, n) {
                    var r = parseInt(e, 10);
                    return r = t > r ? t : r, {
                        width: r,
                        height: n
                    }
                }
            }
        }
    }]), mixcloudWWW.factory("webPlayer", ["crossTab", "favicon", "hotkeys", "settings", "webPlayerBase", function(e, t, n, r, o) {
        function i() {
            n.on(n.SPACE, l.togglePlay), n.on(n["<"], function() {
                l.volume > 0 && (l.volume = (Math.floor(10 * l.volume) - 1) / 10)
            }, {
                ignoreWithMeta: !0
            }), n.on(n[">"], function() {
                l.volume < 1 && (l.volume = (Math.floor(10 * l.volume) + 1) / 10)
            }, {
                ignoreWithMeta: !0
            })
        }
        var a = o.internals,
            l = o.externals;
        l.one("url", i), a.on("url paused position duration", function() {
            a.url && a.position < a.duration ? t.update(a.paused ? t.PAUSED : t.NORMAL, a.position / a.duration) : t.update(t.NORMAL)
        }), a.on("ended", function() {
            t.update(t.NORMAL)
        });
        var s = !1;
        return a.on("url paused", function() {
            s = !1
        }), e.on("preview:start", function() {
            a.url && !a.paused ? (l.pause(), s = !0) : s = !1
        }), e.on("preview:stop", function() {
            s && (l.resume(), s = !1)
        }), l.playerOpen = function() {
            return !!a.url
        }, e.on("check_for_player", function() {
            return l.playerOpen()
        }), l
    }]),
    function(e, t, n) {
        function r(t) {
            if (e.event && e.event.contentOverflow !== n) return {
                x: e.event.offsetX,
                y: e.event.offsetY
            };
            if (t.offsetX !== n && t.offsetY !== n) return {
                x: t.offsetX,
                y: t.offsetY
            };
            var r = t.target.parentNode.parentNode;
            return {
                x: t.layerX - r.offsetLeft,
                y: t.layerY - r.offsetTop
            }
        }

        function o(e, n, r) {
            e = t.createElementNS(v, e);
            for (var o in n) e.setAttribute(o, n[o]);
            "[object Array]" != Object.prototype.toString.call(r) && (r = [r]);
            for (var i = 0, a = r[0] && r.length || 0; a > i; i++) e.appendChild(r[i]);
            return e
        }

        function i(e) {
            var t, n, r, o, i, a = e.h % 360 / 60;
            i = e.v * e.s, o = i * (1 - Math.abs(a % 2 - 1)), t = n = r = e.v - i, a = ~~a, t += [i, o, 0, 0, o, i][a], n += [o, i, i, o, 0, 0][a], r += [0, 0, o, i, i, o][a];
            var l = Math.floor(255 * t),
                s = Math.floor(255 * n),
                c = Math.floor(255 * r);
            return {
                r: l,
                g: s,
                b: c,
                hex: "#" + (16777216 | c | s << 8 | l << 16).toString(16).slice(1)
            }
        }

        function a(e) {
            var t = e.r,
                n = e.g,
                r = e.b;
            (e.r > 1 || e.g > 1 || e.b > 1) && (t /= 255, n /= 255, r /= 255);
            var o, i, a, l;
            return a = Math.max(t, n, r), l = a - Math.min(t, n, r), o = 0 == l ? null : a == t ? (n - r) / l + (r > n ? 6 : 0) : a == n ? (r - t) / l + 2 : (t - n) / l + 4, o = 60 * (o % 6), i = 0 == l ? 0 : l / a, {
                h: o,
                s: i,
                v: a
            }
        }

        function l(t, o, a) {
            return function(l) {
                l = l || e.event;
                var s = r(l);
                t.h = 360 * (s.y / o.offsetHeight) + g, t.s = t.v = 1;
                var c = i({
                    h: t.h,
                    s: 1,
                    v: 1
                });
                a.style.backgroundColor = c.hex, t.callback && t.callback(c.hex, {
                    h: t.h - g,
                    s: t.s,
                    v: t.v
                }, {
                    r: c.r,
                    g: c.g,
                    b: c.b
                }, n, s)
            }
        }

        function s(t, n) {
            return function(o) {
                o = o || e.event;
                var a = r(o),
                    l = n.offsetWidth,
                    s = n.offsetHeight;
                t.s = a.x / l, t.v = (s - a.y) / s;
                var c = i(t);
                t.callback && t.callback(c.hex, {
                    h: t.h - g,
                    s: t.s,
                    v: t.v
                }, {
                    r: c.r,
                    g: c.g,
                    b: c.b
                }, a)
            }
        }

        function c(e, t, n) {
            if (!(this instanceof c)) return new c(e, t, n);
            if (this.h = 0, this.s = 1, this.v = 1, n) this.callback = n, this.pickerElement = t, this.slideElement = e;
            else {
                var r = e;
                r.innerHTML = y, this.slideElement = r.getElementsByClassName("slide")[0], this.pickerElement = r.getElementsByClassName("picker")[0];
                var o = r.getElementsByClassName("slide-indicator")[0],
                    i = r.getElementsByClassName("picker-indicator")[0];
                c.fixIndicators(o, i), this.callback = function(e, n, r, a, l) {
                    c.positionIndicators(o, i, l, a), t(e, n, r)
                }
            }
            if ("SVG" == m) {
                var a = h.cloneNode(!0),
                    d = p.cloneNode(!0),
                    g = a.getElementById("gradient-hsv"),
                    v = a.getElementsByTagName("rect")[0];
                g.id = "gradient-hsv-" + $, v.setAttribute("fill", "url(#" + g.id + ")");
                var w = [d.getElementById("gradient-black"), d.getElementById("gradient-white")],
                    b = d.getElementsByTagName("rect");
                w[0].id = "gradient-black-" + $, w[1].id = "gradient-white-" + $, b[0].setAttribute("fill", "url(#" + w[1].id + ")"), b[1].setAttribute("fill", "url(#" + w[0].id + ")"), this.slideElement.appendChild(a), this.pickerElement.appendChild(d), $++
            } else this.slideElement.innerHTML = h, this.pickerElement.innerHTML = p;
            u(this.slideElement, "click", l(this, this.slideElement, this.pickerElement)), u(this.pickerElement, "click", s(this, this.pickerElement)), f(this, this.slideElement, l(this, this.slideElement, this.pickerElement)), f(this, this.pickerElement, s(this, this.pickerElement))
        }

        function u(e, t, n) {
            e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener && e.addEventListener(t, n, !1)
        }

        function f(e, t, n) {
            var r = !1;
            u(t, "mousedown", function() {
                r = !0
            }), u(t, "mouseup", function() {
                r = !1
            }), u(t, "mouseout", function() {
                r = !1
            }), u(t, "mousemove", function(e) {
                r && n(e)
            })
        }

        function d(e, t, n, r) {
            e.h = t.h % 360, e.s = t.s, e.v = t.v;
            var o = i(e),
                a = {
                    y: e.h * e.slideElement.offsetHeight / 360,
                    x: 0
                },
                l = e.pickerElement.offsetHeight,
                s = {
                    x: e.s * e.pickerElement.offsetWidth,
                    y: l - e.v * l
                };
            return e.pickerElement.style.backgroundColor = i({
                h: e.h,
                s: 1,
                v: 1
            }).hex, e.callback && e.callback(r || o.hex, {
                h: e.h,
                s: e.s,
                v: e.v
            }, n || {
                r: o.r,
                g: o.g,
                b: o.b
            }, s, a), e
        }
        var p, h, m = e.SVGAngle || t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML",
            g = 15,
            v = "http://www.w3.org/2000/svg",
            y = ['<div class="picker-wrapper">', '<div class="picker"></div>', '<div class="picker-indicator"></div>', "</div>", '<div class="slide-wrapper">', '<div class="slide"></div>', '<div class="slide-indicator"></div>', "</div>"].join("");
        "SVG" == m ? (h = o("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1",
            width: "100%",
            height: "100%"
        }, [o("defs", {}, o("linearGradient", {
            id: "gradient-hsv",
            x1: "0%",
            y1: "100%",
            x2: "0%",
            y2: "0%"
        }, [o("stop", {
            offset: "0%",
            "stop-color": "#FF0000",
            "stop-opacity": "1"
        }), o("stop", {
            offset: "13%",
            "stop-color": "#FF00FF",
            "stop-opacity": "1"
        }), o("stop", {
            offset: "25%",
            "stop-color": "#8000FF",
            "stop-opacity": "1"
        }), o("stop", {
            offset: "38%",
            "stop-color": "#0040FF",
            "stop-opacity": "1"
        }), o("stop", {
            offset: "50%",
            "stop-color": "#00FFFF",
            "stop-opacity": "1"
        }), o("stop", {
            offset: "63%",
            "stop-color": "#00FF40",
            "stop-opacity": "1"
        }), o("stop", {
            offset: "75%",
            "stop-color": "#0BED00",
            "stop-opacity": "1"
        }), o("stop", {
            offset: "88%",
            "stop-color": "#FFFF00",
            "stop-opacity": "1"
        }), o("stop", {
            offset: "100%",
            "stop-color": "#FF0000",
            "stop-opacity": "1"
        })])), o("rect", {
            x: "0",
            y: "0",
            width: "100%",
            height: "100%",
            fill: "url(#gradient-hsv)"
        })]), p = o("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1",
            width: "100%",
            height: "100%"
        }, [o("defs", {}, [o("linearGradient", {
            id: "gradient-black",
            x1: "0%",
            y1: "100%",
            x2: "0%",
            y2: "0%"
        }, [o("stop", {
            offset: "0%",
            "stop-color": "#000000",
            "stop-opacity": "1"
        }), o("stop", {
            offset: "100%",
            "stop-color": "#CC9A81",
            "stop-opacity": "0"
        })]), o("linearGradient", {
            id: "gradient-white",
            x1: "0%",
            y1: "100%",
            x2: "100%",
            y2: "100%"
        }, [o("stop", {
            offset: "0%",
            "stop-color": "#FFFFFF",
            "stop-opacity": "1"
        }), o("stop", {
            offset: "100%",
            "stop-color": "#CC9A81",
            "stop-opacity": "0"
        })])]), o("rect", {
            x: "0",
            y: "0",
            width: "100%",
            height: "100%",
            fill: "url(#gradient-white)"
        }), o("rect", {
            x: "0",
            y: "0",
            width: "100%",
            height: "100%",
            fill: "url(#gradient-black)"
        })])) : "VML" == m && (h = ['<DIV style="position: relative; width: 100%; height: 100%">', '<v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">', '<v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>', "</v:rect>", "</DIV>"].join(""), p = ['<DIV style="position: relative; width: 100%; height: 100%">', '<v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t">', '<v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>', "</v:rect>", '<v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t">', '<v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>', "</v:rect>", "</DIV>"].join(""), t.namespaces.v || t.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML"));
        var $ = 0;
        c.hsv2rgb = function(e) {
            var t = i(e);
            return delete t.hex, t
        }, c.hsv2hex = function(e) {
            return i(e).hex
        }, c.rgb2hsv = a, c.rgb2hex = function(e) {
            return i(a(e)).hex
        }, c.hex2hsv = function(e) {
            return a(c.hex2rgb(e))
        }, c.hex2rgb = function(e) {
            return {
                r: parseInt(e.substr(1, 2), 16),
                g: parseInt(e.substr(3, 2), 16),
                b: parseInt(e.substr(5, 2), 16)
            }
        }, c.prototype.setHsv = function(e) {
            return d(this, e)
        }, c.prototype.setRgb = function(e) {
            return d(this, a(e), e)
        }, c.prototype.setHex = function(e) {
            return d(this, c.hex2hsv(e), n, e)
        }, c.positionIndicators = function(e, t, n, r) {
            n && (t.style.left = "auto", t.style.right = "0px", t.style.top = "0px", e.style.top = n.y - e.offsetHeight / 2 + "px"), r && (t.style.top = r.y - t.offsetHeight / 2 + "px", t.style.left = r.x - t.offsetWidth / 2 + "px")
        }, c.fixIndicators = function(e, t) {
            t.style.pointerEvents = "none", e.style.pointerEvents = "none"
        }, e.ColorPicker = c
    }(window, window.document),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
    }(function(e) {
        function t(t) {
            var o, i = t || window.event,
                a = [].slice.call(arguments, 1),
                l = 0,
                s = 0,
                c = 0,
                u = 0,
                f = 0;
            return t = e.event.fix(i), t.type = "mousewheel", i.wheelDelta && (l = i.wheelDelta), i.detail && (l = -1 * i.detail), i.deltaY && (c = -1 * i.deltaY, l = c), i.deltaX && (s = i.deltaX, l = -1 * s), void 0 !== i.wheelDeltaY && (c = i.wheelDeltaY), void 0 !== i.wheelDeltaX && (s = -1 * i.wheelDeltaX), u = Math.abs(l), (!n || n > u) && (n = u), f = Math.max(Math.abs(c), Math.abs(s)), (!r || r > f) && (r = f), o = l > 0 ? "floor" : "ceil", l = Math[o](l / n), s = Math[o](s / r), c = Math[o](c / r), a.unshift(t, l, s, c), (e.event.dispatch || e.event.handle).apply(this, a)
        }
        var n, r, o = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            i = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"];
        if (e.event.fixHooks)
            for (var a = o.length; a;) e.event.fixHooks[o[--a]] = e.event.mouseHooks;
        e.event.special.mousewheel = {
            setup: function() {
                if (this.addEventListener)
                    for (var e = i.length; e;) this.addEventListener(i[--e], t, !1);
                else this.onmousewheel = t
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var e = i.length; e;) this.removeEventListener(i[--e], t, !1);
                else this.onmousewheel = null
            }
        }, e.fn.extend({
            mousewheel: function(e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
            },
            unmousewheel: function(e) {
                return this.unbind("mousewheel", e)
            }
        })
    }),
    function() {
        function e(e) {
            if (!e.culprit.match(o)) return !1;
            var i, a = e && e.stacktrace && e.stacktrace.frames;
            if (a && a.length)
                for (i = 0; i < a.length; i++)
                    if (!(a[i].filename || "").match(o)) return !1;
            var l = $.trim(e.message || "");
            if (!l || t.hasOwnProperty(l) || window.sentryJSVersion !== n) return !1;
            for (i = 0; i < r.length; i++)
                if (l.match(r[i])) return !1;
            return t[l] = !0, !0
        }
        var t = {},
            n = "11",
            r = [/SelectedDivWithSearchText/, /dzPlayer/, /Permission denied to access property 'toString'/, /Error connecting to extension/, /Out of memory/, /Script error/, /dpQuery/, /Error in Actionscript/, /\.htc$/],
            o = /^((https?:)?\/\/[^\/]+)?\/media\//;
        window.sentryJSVersion = n, Raven.config("https://2ce5b0046abc423d82687a2493119e81@app.getsentry.com/13841", {
            whitelistUrls: [/(mixcloud\.com|media-([a-z]+-)?mix\.netdna-ssl\.com)/],
            ignoreErrors: r,
            shouldSendCallback: e
        }).install()
    }(), mixcloudShared.config(["settingsProvider", function(e) {
        e.addSettings({
            jsVersion: "11",
            sentry: {
                tags: {
                    platform: "www",
                    bundleVersion: "11"
                }
            },
            dfp: {
                accountId: "4090634"
            },
            player: {
                canUseFlash: !0
            },
            facebook: {
                initParams: {
                    appId: "49631911630",
                    channelUrl: "//www.mixcloud.com/fb_channel.html"
                },
                shareBaseUrl: "https://www.mixcloud.com",
                perms: "publish_actions,email,user_friends,public_profile".split(",")
            },
            urls: {
                ch: "/ch/challenge/response/",
                home: "/",
                lastfm: {
                    scrobble: "/lastfm/scrobble/",
                    scrobbleTracklist: "/lastfm/scrobble-tracklist/"
                },
                analytics: {
                    recordUserAction: "/analytics/record_user_action/"
                },
                authentication: {
                    logout: "/authentication/logout/",
                    facebook_login: "/authentication/facebook-login/",
                    register_modal: "/authentication/register-modal/",
                    post_logout_page: "/logout/"
                },
                player: {
                    playInfo: "//www.mixcloud.com/player/play_info/",
                    ping: "//www.mixcloud.com/play_tracking/play_ping/",
                    pingSocket: "https://ping.mixcloud.com",
                    swf: "//www.mixcloud.com/media/swf/player/apiplayer.203.swf",
                    cloudcastDetails: "/player/details/",
                    musicListenCreate: "/player/facebook/music.listen/create/",
                    musicListenDelete: "/player/facebook/music.listen/delete/",
                    upNext: "/player/next/"
                },
                favicons: {
                    normal: {
                        small: "/media/images/www/global/play-favicon.png"
                    },
                    paused: {
                        large: "/media/images/www/global/pause-favicon.png",
                        small: "/media/images/www/global/pause-favicon.png"
                    },
                    uploading: {
                        large: "/media/images/www/global/uploading-favicon.png",
                        small: "/media/images/www/global/uploading-favicon.png"
                    }
                },
                hide_content: "/hideable/",
                comment_delete: "/comments/delete/",
                settings: {
                    account_deleted: "/settings/account-deleted/"
                },
                upload: {
                    tracking: "/upload/tracking/",
                    progress: "/uploadprogress"
                },
                juno: {
                    resultsUser: "/tracklist/"
                },
                onRamp: {
                    followUsers: "/getting-started/2/",
                    installApp: "/getting-started/3/",
                    sendAndroid: "/getting-started/send_android/",
                    sendiOS: "/getting-started/send_ios/"
                },
                premium: "/premium/",
                pro: "/pro/",
                subscription: {
                    couponDetails: "/subscription/coupon/",
                    subscribe: "/subscription/subscribe/",
                    premiumWelcome: "/premium/welcome/",
                    proWelcome: "/pro/welcome/"
                }
            },
            stripe: {
                image: "https://media-mix.netdna-ssl.com/media/images/www/global/stripe-logo.png",
                key: "pk_live_vfgF0zO1WBUegocT4l5wZRfY"
            },
            ads: {
                detect: !0
            },
            medium: "www",
            useExternalScripts: !0
        })
    }]);
//# sourceMappingURL=https://www.mixcloud.com/media/sourcemaps/www_js.9a3daaa5035cf253db45ad186428ae16.js.map
