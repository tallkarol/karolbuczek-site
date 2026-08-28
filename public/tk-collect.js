/* First-party collector. Same-origin POSTs only — never talks to Google. */
(function () {
  var CID = "tk_cid";
  var FIRST = "tk_first";
  var LAST = "tk_last";
  var PATH = "tk_path";
  var SID = "tk_sid";
  var SLAT = "tk_slat";
  var KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "gbraid",
    "wbraid",
    "msclkid",
    "fbclid",
    "li_fat_id",
  ];
  var FIRST_TTL = 90 * 24 * 60 * 60 * 1000;
  var SESSION_TTL = 30 * 60 * 1000;
  var startedNewSession = false;
  var pageStart = Date.now();
  var lastPath = "";
  var seenScroll = {};

  function clientId() {
    return Math.floor(1e9 + Math.random() * 9e9) + "." + Math.floor(Date.now() / 1000);
  }

  function read(store, key) {
    try {
      var raw = store.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function write(store, key, value) {
    try {
      store.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    } catch (e) {}
  }

  function capture() {
    var params = new URLSearchParams(location.search);
    var touch = {
      landing_page: location.pathname + location.search,
      referrer: document.referrer || "",
      at: Date.now(),
    };
    var has = false;
    KEYS.forEach(function (key) {
      var value = params.get(key);
      if (value) {
        touch[key] = value.slice(0, 200);
        has = true;
      }
    });
    var existing = localStorage.getItem(CID);
    if (!existing || existing.indexOf(".") < 0) write(localStorage, CID, clientId());
    var first = read(localStorage, FIRST);
    if (!first || !first.at || Date.now() - first.at > FIRST_TTL) {
      write(localStorage, FIRST, touch);
    } else if (has && !first.utm_source && !first.gclid) {
      write(localStorage, FIRST, touch);
    }
    if (has || !sessionStorage.getItem(LAST)) write(sessionStorage, LAST, touch);
    var sid = sessionStorage.getItem(SID);
    var slat = +(sessionStorage.getItem(SLAT) || 0);
    if (!sid || Date.now() - slat > SESSION_TTL) {
      sid = String(Math.floor(Date.now() / 1000));
      write(sessionStorage, SID, sid);
      startedNewSession = true;
    }
    write(sessionStorage, SLAT, String(Date.now()));
    return touch;
  }

  function pushPath() {
    var path = location.pathname;
    var arr = read(sessionStorage, PATH) || [];
    if (!Array.isArray(arr)) arr = [];
    if (arr[arr.length - 1] !== path) {
      arr.push(path);
      if (arr.length > 25) arr = arr.slice(-25);
      write(sessionStorage, PATH, arr);
    }
  }

  function attribution() {
    return {
      client_id: localStorage.getItem(CID) || "",
      session_id: sessionStorage.getItem(SID) || "",
      first: read(localStorage, FIRST) || {},
      last: read(sessionStorage, LAST) || {},
      path: read(sessionStorage, PATH) || [],
    };
  }

  function campaign(touch) {
    if (!touch) return {};
    var out = {};
    if (touch.utm_source) out.source = touch.utm_source;
    if (touch.utm_medium) out.medium = touch.utm_medium;
    if (touch.utm_campaign) out.campaign = touch.utm_campaign;
    if (touch.utm_term) out.term = touch.utm_term;
    if (touch.utm_content) out.content = touch.utm_content;
    if (touch.gclid) out.campaign_id = touch.gclid;
    return out;
  }

  function send(events) {
    var cid = localStorage.getItem(CID);
    if (!cid || !events.length) return;
    var payload = JSON.stringify({
      client_id: cid,
      session_id: sessionStorage.getItem(SID) || "",
      events: events,
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/collect", new Blob([payload], { type: "application/json" }));
        return;
      }
    } catch (e) {}
    try {
      fetch("/api/collect", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(function () {});
    } catch (e) {}
  }

  function track(name, params) {
    write(sessionStorage, SLAT, String(Date.now()));
    var extras = Object.assign(
      {
        page_location: location.href,
        page_title: document.title,
        page_referrer: document.referrer || "",
      },
      campaign(read(sessionStorage, LAST) || read(localStorage, FIRST)),
      params || {}
    );
    send([{ name: name, params: extras }]);
  }

  function pageView() {
    var path = location.pathname + location.search;
    if (path === lastPath) return;
    lastPath = path;
    capture();
    pushPath();
    pageStart = Date.now();
    if (startedNewSession) {
      track("session_start");
      startedNewSession = false;
    }
    track("page_view");
  }

  function onScroll() {
    var key = location.pathname;
    if (!seenScroll[key]) seenScroll[key] = {};
    var root = document.documentElement;
    var height = root.scrollHeight || 1;
    var pct = ((root.scrollTop + innerHeight) / height) * 100;
    ;[25, 50, 75, 90].forEach(function (mark) {
      if (pct >= mark && !seenScroll[key][mark]) {
        seenScroll[key][mark] = true;
        track("scroll", { percent_scrolled: mark });
      }
    });
  }

  function textOf(el) {
    return (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
  }

  function onClick(event) {
    var node = event.target;
    if (!node || !node.closest) return;
    var cta = node.closest("[data-track=cta]");
    if (cta) {
      track("cta_click", {
        cta_id: cta.getAttribute("data-track-id") || "cta",
        cta_location: cta.getAttribute("data-track-loc") || "page",
        link_url: (cta.href || "").slice(0, 500),
        link_text: textOf(cta),
      });
    }
    var anchor = node.closest("a");
    if (!anchor || !anchor.href) return;
    var url;
    try {
      url = new URL(anchor.href, location.origin);
    } catch (e) {
      return;
    }
    if (url.protocol === "mailto:" || url.protocol === "tel:") {
      track("outbound_click", {
        link_url: anchor.href.slice(0, 500),
        outbound_type: url.protocol === "mailto:" ? "email" : "phone",
        link_text: textOf(anchor),
      });
      return;
    }
    if (url.origin !== location.origin) {
      track("outbound_click", {
        link_url: url.href.slice(0, 500),
        outbound_type: "web",
        link_text: textOf(anchor),
      });
      return;
    }
    if (!cta && (url.pathname === "/contact" || url.hash === "#start" || url.hash === "#intake")) {
      track("cta_click", {
        cta_id: url.hash === "#start" ? "engagement-start" : "contact",
        cta_location: "link",
        link_url: (url.pathname + url.hash).slice(0, 200),
        link_text: textOf(anchor),
      });
    }
  }

  function patchHistory() {
    var push = history.pushState;
    var replace = history.replaceState;
    history.pushState = function () {
      push.apply(this, arguments);
      pageView();
    };
    history.replaceState = function () {
      replace.apply(this, arguments);
      pageView();
    };
    addEventListener("popstate", pageView);
  }

  function engage() {
    var ms = Date.now() - pageStart;
    if (ms < 250) return;
    track("user_engagement", { engagement_time_msec: ms });
  }

  var queued = (window.tk && window.tk.q) || [];
  window.tk = {
    track: track,
    attribution: attribution,
    q: [],
  };
  queued.forEach(function (item) {
    track(item[0], item[1]);
  });

  capture();
  patchHistory();
  addEventListener("click", onClick, true);
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") engage();
  });
  addEventListener("pagehide", engage);

  if ("requestIdleCallback" in window) {
    requestIdleCallback(pageView, { timeout: 2000 });
  } else {
    setTimeout(pageView, 1);
  }
})();
