! function(i) { "use strict";

    function e() { return w.urlPrefix + w.visitsUrl }

    function o() { return w.urlPrefix + w.eventsUrl }

    function r() { return (w.useBeacon || w.trackNow) && j && "undefined" != typeof i.navigator.sendBeacon }

    function n(t, e, n) { var i = "",
            r = ""; if (n) { var o = new Date;
            o.setTime(o.getTime() + 60 * n * 1e3), i = "; expires=" + o.toGMTString() } var a = w.cookieDomain || w.domain;
        a && (r = "; domain=" + a), document.cookie = t + "=" + escape(e) + i + r + "; path=/" }

    function a(t) { var e, n, i = t + "=",
            r = document.cookie.split(";"); for (e = 0; e < r.length; e++) { for (n = r[e];
                " " === n.charAt(0);) n = n.substring(1, n.length); if (0 === n.indexOf(i)) return unescape(n.substring(i.length, n.length)) } return null }

    function c(t) { n(t, "", -1) }

    function s(t) { a("ahoy_debug") && i.console.log(t) }

    function u() { for (var t; t = P.shift();) t();
        J = !0 }

    function f(t) { J ? t() : P.push(t) }

    function h() { return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) { var e = 16 * Math.random() | 0; return ("x" == t ? e : 3 & e | 8).toString(16) }) }

    function v() { j && n("ahoy_events", JSON.stringify(B), 1) }

    function g() { return N("meta[name=csrf-token]").attr("content") }

    function l() { return N("meta[name=csrf-param]").attr("content") }

    function d(t) { var e = g();
        e && t.setRequestHeader("X-CSRF-Token", e) }

    function k(t, e, n) { j && N.ajax({ type: "POST", url: t, data: JSON.stringify(e), contentType: "application/json; charset=utf-8", dataType: "json", beforeSend: d, success: n }) }

    function p(t) { var e = { events: [t], visit_token: t.visit_token, visitor_token: t.visitor_token }; return delete t.visit_token, delete t.visitor_token, e }

    function x(e) { f(function() { k(o(), p(e), function() { for (var t = 0; t < B.length; t++)
                    if (B[t].id == e.id) { B.splice(t, 1); break }
                v() }) }) }

    function y(r) { f(function() { var t = p(r),
                e = l(),
                n = g();
            e && n && (t[e] = n); var i = new Blob([JSON.stringify(t)], { type: "application/json; charset=utf-8" });
            navigator.sendBeacon(o(), i) }) }

    function m() { return w.page || i.location.pathname }

    function _(t) { var e = N(t.currentTarget); return { tag: e.get(0).tagName.toLowerCase(), id: e.attr("id"), "class": e.attr("class"), page: m(), section: e.closest("*[data-section]").data("section") } }

    function b() { if (J = !1, T = S.getVisitId(), V = S.getVisitorId(), O = a("ahoy_track"), T && V && !O) s("Active visit"), u();
        else if (O && c("ahoy_track"), T || n("ahoy_visit", T = h(), C), a("ahoy_visit")) { s("Visit started"), V || n("ahoy_visitor", V = h(), I); var t = { visit_token: T, visitor_token: V, platform: w.platform, landing_page: i.location.href, screen_width: i.screen.width, screen_height: i.screen.height };
            0 < document.referrer.length && (t.referrer = document.referrer), s(t), k(e(), t, u) } else s("Cookies disabled"), u() } var w = { urlPrefix: "", visitsUrl: "https://usebasin.com/ahoy/visits", eventsUrl: "https://usebasin.com/ahoy/events", cookieDomain: null, page: "363b98eca5af", platform: "Web", useBeacon: !1, startOnReady: !0 },
        S = i.ahoy || i.Ahoy || {};
    S.configure = function(t) { for (var e in t) t.hasOwnProperty(e) && (w[e] = t[e]) }, S.configure(S); var T, V, O, N = i.jQuery || i.Zepto || i.$,
        C = 240,
        I = 1051200,
        J = !1,
        P = [],
        j = "undefined" != typeof JSON && "undefined" != typeof JSON.stringify,
        B = [];
    S.getVisitId = S.getVisitToken = function() { return a("ahoy_visit") }, S.getVisitorId = S.getVisitorToken = function() { return a("ahoy_visitor") }, S.reset = function() { return c("ahoy_visit"), c("ahoy_visitor"), c("ahoy_events"), c("ahoy_track"), !0 }, S.debug = function(t) { return !1 === t ? c("ahoy_debug") : n("ahoy_debug", "t", 525600), !0 }, S.track = function(t, e) { var n = { id: h(), name: t, properties: e || {}, time: (new Date).getTime() / 1e3 };
        N(function() { s(n) }), f(function() { S.getVisitId() || b(), n.visit_token = S.getVisitId(), n.visitor_token = S.getVisitorId(), r() ? y(n) : (B.push(n), v(), setTimeout(function() { x(n) }, 1e3)) }) }, S.trackView = function(t) { var e = { url: i.location.href, title: document.title, page: m() }; if (t)
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        S.track("$view", e) }, S.trackClicks = function() { N(document).on("click", "a, button, input[type=submit]", function(t) { var e = N(t.currentTarget),
                n = _(t);
            n.text = "input" == n.tag ? e.val() : N.trim(e.text().replace(/[\s\r\n]+/g, " ")), n.href = e.attr("href"), S.track("$click", n) }) }, S.trackSubmits = function() { N(document).on("submit", "form", function(t) { var e = _(t);
            S.track("$submit", e) }) }, S.trackChanges = function() { N(document).on("change", "input, textarea, select", function(t) { var e = _(t);
            S.track("$change", e) }) }, S.trackAll = function() { S.trackView(), S.trackClicks(), S.trackSubmits(), S.trackChanges() }; try { B = JSON.parse(a("ahoy_events") || "[]") } catch ($) {} for (var t = 0; t < B.length; t++) x(B[t]);
    S.start = function() { b(), S.trackView(), S.trackSubmits(), S.start = function() {} }, N(function() { w.startOnReady && S.start() }), i.ahoy = S }(window);