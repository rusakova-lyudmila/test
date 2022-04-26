!(function (e, o) {
    "object" == typeof exports && "object" == typeof module ? (module.exports = o()) : "function" == typeof define && define.amd ? define("GDPR", [], o) : "object" == typeof exports ? (exports.GDPR = o()) : (e.GDPR = o());
})(window, function () {
    return (function (e) {
        var o = {};
        function t(n) {
            if (o[n]) return o[n].exports;
            var i = (o[n] = { i: n, l: !1, exports: {} });
            return e[n].call(i.exports, i, i.exports, t), (i.l = !0), i.exports;
        }
        return (
            (t.m = e),
            (t.c = o),
            (t.d = function (e, o, n) {
                t.o(e, o) || Object.defineProperty(e, o, { enumerable: !0, get: n });
            }),
            (t.r = function (e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (t.t = function (e, o) {
                if ((1 & o && (e = t(e)), 8 & o)) return e;
                if (4 & o && "object" == typeof e && e && e.__esModule) return e;
                var n = Object.create(null);
                if ((t.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & o && "string" != typeof e))
                    for (var i in e)
                        t.d(
                            n,
                            i,
                            function (o) {
                                return e[o];
                            }.bind(null, i)
                        );
                return n;
            }),
            (t.n = function (e) {
                var o =
                    e && e.__esModule
                        ? function () {
                              return e.default;
                          }
                        : function () {
                              return e;
                          };
                return t.d(o, "a", o), o;
            }),
            (t.o = function (e, o) {
                return Object.prototype.hasOwnProperty.call(e, o);
            }),
            (t.p = "dist"),
            t((t.s = 33))
        );
    })([
        function (e, o, t) {
            "use strict";
            t.d(o, "a", function () {
                return a;
            });
            var n = t(5),
                i = t(2),
                s = t(4);
            class a {
                constructor(e, o) {
                    (this.onConsent = () => {}), (this.apiService = e), (this.cookieService = o), (this.consent = a.getInitialConsentState()), (this.prevConsent = a.getInitialConsentState());
                }
                get isNeedConsent() {
                    return !this.consent || null === this.consent.gdpr.consent_state || !i.a.getConsentStorageItem() || Object.keys(this.consent.cookie).some((e) => null === this.consent.cookie[e]);
                }
                get apiUrl() {
                    return this.apiService.url;
                }
                set apiUrl(e) {
                    this.apiService.url = e;
                }
                static getInitialConsentState() {
                    return { gdpr: { consent_state: null }, cookie: { analytics_consent_state: null, functional_consent_state: null, targeting_consent_state: null } };
                }
                initConsent() {
                    (this.consent.gdpr.consent_state = this.consent.gdpr.consent_state || !1),
                        Object.keys(this.consent.cookie).forEach((e) => {
                            this.consent.cookie[e] = this.consent.cookie[e] || !1;
                        });
                }
                static getInstance() {
                    return a.instance || (a.instance = new a(new n.a(), new s.a())), a.instance;
                }
                static stateTypeToCookieType(e) {
                    switch (e) {
                        case "analytics_consent_state":
                            return "analytical";
                        case "functional_consent_state":
                            return "functional";
                        case "targeting_consent_state":
                            return "targeting";
                        default:
                            return "essential";
                    }
                }
                sync(e, o, t) {
                    const n = {
                        user_identity_type: this.userIdentityType,
                        user_id: this.userId,
                        product_name: this.productName,
                        consent_id: i.a.getConsentStorageItem(),
                        gdpr: { consent_state: void 0 !== e ? e : this.consent.gdpr.consent_state },
                        cookie: Object.assign(Object.assign({}, this.consent.cookie), o || {}),
                    };
                    this.apiService.request(n, (e, o) => {
                        if (e && t) return t(e);
                        (this.consent = o),
                            i.a.setConsentStorageItem(o.consent_id),
                            this.isNeedConsent ||
                                (Object.keys(this.consent.cookie)
                                    .filter((e) => !this.consent.cookie[e])
                                    .forEach((e) => {
                                        this.cookieService.deleteCookiesByType(a.stateTypeToCookieType(e));
                                    }),
                                this.onConsent(this.consent, this.prevConsent)),
                            t && t(null, o),
                            (this.prevConsent = Object.assign(Object.assign({}, this.consent), { gdpr: Object.assign({}, this.consent.gdpr), cookie: Object.assign({}, this.consent.cookie) }));
                    });
                }
            }
        },
        function (e, o, t) {
            "use strict";
            t.d(o, "a", function () {
                return n;
            });
            class n {}
            (n.COOKIE_URL = "https://xsolla.com/cookie"),
                (n.COOKIE_TYPES_URL = "https://xsolla.com/cookie#chapter2"),
                (n.PRIVACY_URL = "https://xsolla.com/privacypolicy"),
                (n.GROUP_CONSENT_URL = "https://xsolla.com/privacypolicy#section1");
        },
        function (e, o, t) {
            "use strict";
            t.d(o, "a", function () {
                return n;
            });
            class n {
                static getConsentStorageItem() {
                    return window.localStorage.getItem(n.consentIdItemName);
                }
                static setConsentStorageItem(e) {
                    window.localStorage.setItem(n.consentIdItemName, e);
                }
            }
            n.consentIdItemName = "consent_id";
        },
        function (e, o, t) {
            "use strict";
            t.d(o, "a", function () {
                return n;
            });
            class n {
                constructor(e, o) {
                    (this.message = e), (this.additional = o);
                }
            }
        },
        function (e, o, t) {
            "use strict";
            t.d(o, "a", function () {
                return n;
            });
            class n {
                constructor() {
                    this.optionalCookies = t(9);
                }
                getConsentCookie() {
                    return n.getCookie(n.consentCookieName);
                }
                deleteCookiesByType(e) {
                    this.optionalCookies
                        .filter((o) => o.type === e)
                        .forEach((e) => {
                            const o = e.path ? e.path : "/",
                                t = [];
                            e.name && t.push(e.name),
                                e.reg && t.push(...this.getCookieNames(e.reg)),
                                t.forEach((t) => {
                                    e.domain && this.deleteCookie(t, e.domain, o),
                                        n.domains.forEach((e) => {
                                            this.deleteCookie(t, "." + e, o), this.deleteCookie(t, e, o);
                                        }),
                                        this.deleteCookie(t, location.hostname, o);
                                });
                        });
                }
                static getCookie(e) {
                    const o = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([.$?*|{}()\[\]\\\/+^])/g, "\\$1") + "=([^;]*)"));
                    return o ? decodeURIComponent(o[1]) : void 0;
                }
                getCookieNames(e) {
                    return document.cookie
                        .split("; ")
                        .map((o) => {
                            const t = o.match(new RegExp("^(" + e + ")="));
                            return t ? t[1] : null;
                        })
                        .filter((e) => !!e);
                }
                setCookie(e, o, t = {}) {
                    t.expires && t.expires.toUTCString && (t.expires = t.expires.toUTCString());
                    let n = encodeURIComponent(e) + "=" + encodeURIComponent(o);
                    Object.keys(t).forEach((e) => {
                        n += "; " + e;
                        const o = t[e];
                        !0 !== o && (n += "=" + o);
                    }),
                        (document.cookie = n);
                }
                deleteCookie(e, o, t) {
                    this.setCookie(e, "", { "max-age": -1, domain: o, path: t });
                }
            }
            (n.consentCookieName = "consent_id"), (n.domains = ["xsolla.com", "secure.xsolla.com"]);
        },
        function (e, o, t) {
            "use strict";
            t.d(o, "a", function () {
                return i;
            });
            var n = t(3);
            class i {
                constructor(e) {
                    this.url = e;
                }
                getUrl() {
                    return this.url ? this.url : i.defaultUrl;
                }
                request(e, o) {
                    const t = new XMLHttpRequest(),
                        i = e ? JSON.stringify(e) : "";
                    t.open("PUT", this.getUrl(), !0),
                        t.setRequestHeader("Content-Type", "application/json"),
                        (t.responseType = "json"),
                        (t.withCredentials = !0),
                        o &&
                            (t.addEventListener("load", function () {
                                200 === this.status ? o(null, this.response) : o(new n.a("APIService request invalid status: " + this.status));
                            }),
                            t.addEventListener("error", () => o(new n.a("APIService request error"))),
                            t.addEventListener("abort", () => o(new n.a("APIService request abort")))),
                        t.send(i);
                }
            }
            i.defaultUrl = "https://consent-api.xsolla.com/v2/consent";
        },
        function (e, o) {},
        function (e, o, t) {
            "use strict";
            t.d(o, "a", function () {
                return n;
            });
            class n {
                constructor(e) {
                    (this.defaultLocale = "en-US"),
                        (this.groupConsentUrl = "https://xsolla.com/privacypolicy#section1"),
                        (this.SPLIT_VARS_REG_EXP = /{|}/g),
                        (this.customTranslation = {}),
                        e && Object.assign(this, e),
                        this.initTranslations(),
                        (this.locale = this.getNearestExistingLocale(this.locale));
                }
                translate(e) {
                    if (this.customTranslation[e]) return this.injectLinks(this.customTranslation[e]);
                    const o = this.translations[this.locale];
                    if (!o) return "";
                    const t = o[e];
                    if (!t) return "";
                    const n = t.split(new RegExp(this.SPLIT_VARS_REG_EXP));
                    return n.length > 1 ? n : t;
                }
                initTranslations() {
                    this.translations = (() => {
                        const e = {},
                            o = t(10);
                        return (
                            o.keys().forEach((t) => {
                                const n = t.replace("./", "").replace(".json", "").toLowerCase();
                                e[n] = o(t);
                            }),
                            e
                        );
                    })();
                }
                getNearestExistingLocale(e) {
                    const o = this.defaultLocale.toLowerCase();
                    if (!e) return o;
                    const t = Object.keys(this.translations),
                        n = this.locale.replace("_", "-").toLowerCase();
                    if (-1 !== t.indexOf(n)) return n;
                    const i = n.split("-")[0];
                    for (const e of t) {
                        if (i === e.split("-")[0]) return e;
                    }
                    for (const e of t) {
                        if (i === e.split("-")[1]) return e;
                    }
                    return o;
                }
                getFormattedUrl(e) {
                    const o = this[e];
                    return o ? o.replace("%s", this.locale) : "";
                }
                injectLinks(e) {
                    return e ? e.replace("#xsolla-group-consent", this.getFormattedUrl("groupConsentUrl")) : "";
                }
            }
        },
        function (e, o, t) {
            "use strict";
            t.r(o),
                t.d(o, "onConsent", function () {
                    return l;
                }),
                t.d(o, "CookieStorageService", function () {
                    return n.a;
                }),
                t.d(o, "LocalStorageService", function () {
                    return i.a;
                }),
                t.d(o, "APIService", function () {
                    return s.a;
                }),
                t.d(o, "TranslationService", function () {
                    return a.a;
                }),
                t.d(o, "State", function () {
                    return c.a;
                }),
                t.d(o, "Error", function () {
                    return r.a;
                }),
                t.d(o, "Constants", function () {
                    return u.a;
                });
            var n = t(4),
                i = t(2),
                s = t(5),
                a = t(7),
                c = t(0),
                r = t(3);
            function l(e) {
                c.a.getInstance().onConsent = e;
            }
            var u = t(1);
        },
        function (e) {
            e.exports = JSON.parse(
                '[{"name":"corpsite_visit","type":"analytical"},{"name":"ajs_anonymous_id","type":"analytical"},{"name":"pa_visit","type":"analytical"},{"name":"first_visit","type":"analytical"},{"name":"intercom-session-mdu5r5f6","type":"analytical"},{"name":"_gid","type":"analytical"},{"name":"_gcl_au","type":"analytical"},{"name":"_ga","type":"analytical"},{"reg":"_gat_.*","type":"analytical"},{"name":"__insp_wid","type":"analytical"},{"name":"__insp_targlpu","type":"analytical"},{"name":"__insp_targlpt","type":"analytical"},{"name":"__insp_slim","type":"analytical"},{"name":"__insp_nv","type":"analytical"},{"name":"__insp_norec_sess","type":"analytical"},{"name":"__insp_identity","type":"analytical"},{"reg":"_dc_gtm_.*","type":"analytical"},{"name":"wcs_bt","type":"analytical"},{"name":"_ym_uid","type":"analytical"},{"name":"yandexuid","type":"analytical"},{"name":"_ym_d","type":"analytical"},{"name":"i","type":"analytical"},{"name":"yabs-sid","type":"analytical"},{"name":"_gat","type":"analytical"},{"name":"utm_medium","type":"analytical"},{"name":"utm_source","type":"analytical"},{"name":"utm_term","type":"analytical"},{"name":"utm_content","type":"analytical"},{"name":"HSID","type":"analytical"},{"name":"SAPISID","type":"analytical"},{"name":"BizoID","type":"analytical"},{"name":"UserMatchHistory","type":"analytical"},{"name":"__cfduid","type":"analytical"},{"name":"__insp_norec_howoften","type":"analytical"},{"name":"APISID","type":"analytical"},{"name":"SIDCC","type":"analytical"},{"name":"_ym_isad","type":"functional"},{"name":"NID","type":"functional"},{"name":"ATN","type":"functional"},{"name":"AA003","type":"functional"},{"name":"GPS","type":"functional"},{"name":"LOGIN_INFO","type":"functional"},{"reg":"_ym_visorc_*","type":"functional"},{"name":"JSESSIONID","type":"functional"},{"name":"SSID","type":"functional"},{"name":"VISITOR_INFO1_LIVE","type":"functional"},{"name":"YSC","type":"functional"},{"name":"PREF","type":"functional"},{"name":"lang","type":"functional"},{"name":"locale","type":"functional"},{"name":"hideCookieNotify","type":"functional"},{"name":"hideSupportMessage","type":"functional"},{"name":"userType","type":"functional"},{"name":"hideUserTypeOption","type":"functional"},{"name":"hideUserTypeNotify","type":"functional"},{"name":"hideGamerSupportMessage","type":"functional"},{"name":"fontsPrimaryLoaded","type":"functional"},{"name":"fontsSecondaryLoaded","type":"functional"},{"name":"fontsCyrillicLoaded","type":"functional"},{"name":"fontsKoreanLoaded","type":"functional"},{"name":"ajs_group_id","type":"targeting"},{"name":"_derived_epik","type":"targeting"},{"name":"__hssc","type":"targeting"},{"name":"__hssrc","type":"targeting"},{"name":"__hstc","type":"targeting"}]'
            );
        },
        function (e, o, t) {
            var n = {
                "./ar-AE.json": 11,
                "./bg-BG.json": 12,
                "./cs-CZ.json": 13,
                "./de-DE.json": 14,
                "./en-US.json": 15,
                "./es-ES.json": 16,
                "./fr-FR.json": 17,
                "./he-IL.json": 18,
                "./hu-HU.json": 19,
                "./it-IT.json": 20,
                "./ja-JP.json": 21,
                "./ko-KR.json": 22,
                "./pl-PL.json": 23,
                "./pt-PT.json": 24,
                "./ro-RO.json": 25,
                "./ru-RU.json": 26,
                "./th-TH.json": 27,
                "./tr-TR.json": 28,
                "./vi-VN.json": 29,
                "./zh-CN.json": 30,
                "./zh-TW.json": 31,
            };
            function i(e) {
                var o = s(e);
                return t(o);
            }
            function s(e) {
                if (!t.o(n, e)) {
                    var o = new Error("Cannot find module '" + e + "'");
                    throw ((o.code = "MODULE_NOT_FOUND"), o);
                }
                return n[e];
            }
            (i.keys = function () {
                return Object.keys(n);
            }),
                (i.resolve = s),
                (e.exports = i),
                (i.id = 10);
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Щ‚ШЁЩ€Щ„ Ш§Щ„ЩѓЩ„","analytical_performance_cookies_checkbox":"Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Ш§Щ„Ш®Ш§ШµШ© ШЁШ§Щ„ШЄШ­Щ„ЩЉЩ„ Щ€Ш§Щ„ШЈШЇШ§ШЎ","analytical_performance_cookies_description":"ШЄШ¬Щ…Ш№ Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Щ‡Ш°Щ‡ Щ…Ш№Щ„Щ€Щ…Ш§ШЄ Ш­Щ€Щ„ Ш§ШіШЄШ®ШЇШ§Щ…Щѓ Щ„Щ‡Ш°Ш§ Ш§Щ„Щ…Щ€Щ‚Ш№ Щ€ШЄЩ…ЩѓЩ†Щ†Ш§ Щ…Щ† ШЄШ­ШіЩЉЩ† Ш·Ш±ЩЉЩ‚Ш© Ш№Щ…Щ„Щ‡ШЊ ШЁШ§Щ„ШҐШ¶Ш§ЩЃШ© ШҐЩ„Щ‰ ШЄШ№ШІЩЉШІ ШЄШ¬Ш±ШЁШЄЩѓ Щ…Ш№ Щ…Щ†ШЄШ¬Ш§ШЄ ШҐЩЉЩѓШіЩ€Щ„Ш§ Ш§Щ„ШЈШ®Ш±Щ‰. Ш№Щ„Щ‰ ШіШЁЩЉЩ„ Ш§Щ„Щ…Ш«Ш§Щ„ШЊ ЩЉЩ…ЩѓЩ†Щ†Ш§ Ш¶Щ…Ш§Щ† Ш§Щ„Ш№Ш«Щ€Ш± ШЁШіЩ‡Щ€Щ„Ш© Ш№Щ„Щ‰ Щ…Ш§ ШЄШЁШ­Ш« Ш№Щ†Щ‡ ШЈЩ€ ШЄШіШ¬ЩЉЩ„ ШЈЩЉ ШµШ№Щ€ШЁШ§ШЄ Щ‚ШЇ ШЄЩ€Ш§Ш¬Щ‡Щ‡Ш§. <br/>ШҐШ°Ш§ ЩѓЩ†ШЄ Щ„Ш§ ШЄЩ‚ШЁЩ„ Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Щ‡Ш°Щ‡ШЊ ЩЃЩ„Щ† Щ†Ш№Ш±ЩЃ Щ…ШЄЩ‰ Щ‚Щ…ШЄ ШЁШІЩЉШ§Ш±Ш© Щ…Щ€Щ‚Ш№Щ†Ш§ Щ€Щ„Щ† Щ†ШЄЩ…ЩѓЩ† Щ…Щ† Щ…Ш±Ш§Щ‚ШЁШ© ШЈШЇШ§Ш¦Щ‡.","analytical_performance_cookies_link_name":"Щ‚Ш§Ш¦Щ…Ш© Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Ш§Щ„Ш®Ш§ШµШ© ШЁШ§Щ„ШЄШ­Щ„ЩЉЩ„ Щ€Ш§Щ„ШЈШЇШ§ШЎ","cookie_policy_link_name":"ШіЩЉШ§ШіШ© Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш·","data_processing_consent_checkbox":"Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш© Ш№Щ„Щ‰ Щ…Ш№Ш§Щ„Ш¬Ш© Ш§Щ„ШЁЩЉШ§Щ†Ш§ШЄ","data_processing_consent_customer_checkbox_tooltip":"Щ‡Ш°Ш§ Ш§Щ„Щ…Щ€Щ‚Ш№ ЩЉШ№Щ…Щ„ Ш№Щ„Щ‰ Щ…Щ†ШЄШ¬Ш§ШЄ ШҐЩЉЩѓШіЩ€Щ„Ш§. ЩЉШЇЩЉШ± ШҐЩЉЩѓШіЩ€Щ„Ш§ ШЁЩЉШ§Щ†Ш§ШЄЩѓ Ш§Щ„ШґШ®ШµЩЉШ©ШЊ Щ…Ш«Щ„ Ш§Щ„Ш§ШіЩ… Ш§Щ„ЩѓШ§Щ…Щ„ ШЈЩ€ Ш§Щ„Ш§ШіЩ… Ш§Щ„Щ…ШіШЄШ№Ш§Ш± Щ€Ш№Щ†Щ€Ш§Щ† Ш§Щ„ШЁШ±ЩЉШЇ Ш§Щ„ШҐЩ„ЩѓШЄШ±Щ€Щ†ЩЉ Щ€Ш№Щ†Щ€Ш§Щ† IP Щ€Щ…Ш№Щ„Щ€Щ…Ш§ШЄ Ш§Щ„Щ…Щ€Щ‚Ш№ Ш§Щ„Ш¬ШєШ±Ш§ЩЃЩЉ Щ€Щ…Ш№Ш±ЩЃ Ш§Щ„Щ…ШіШЄШ®ШЇЩ… Ш§Щ„ЩЃШ±ЩЉШЇ.","data_processing_consent_description":"Щ†Ш­ШЄШ§Ш¬ ШҐЩ„Щ‰ Щ…Щ€Ш§ЩЃЩ‚ШЄЩѓ Ш№Щ„Щ‰ Ш§ШіШЄШ®ШЇШ§Щ… ШЁЩЉШ§Щ†Ш§ШЄЩѓ Ш§Щ„ШґШ®ШµЩЉШ© Щ€Щ…Ш№Щ„Щ€Щ…Ш§ШЄ Щ…Щ† Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Щ„ШЄЩ‚ШЇЩЉЩ… Ш®ШЇЩ…Ш§ШЄ Щ…Ш®ШµШµШ© Щ„Щѓ. ШҐШ°Ш§ Щ‚Ш±Ш±ШЄ ШҐЩ„ШєШ§ШЎ Ш§Щ„Ш§ШґШЄШ±Ш§Щѓ ЩЃЩЉ Щ…Ш№Ш§Щ„Ш¬Ш© Ш§Щ„ШЁЩЉШ§Щ†Ш§ШЄШЊ ЩЃШіЩ†ШіШЄШ®ШЇЩ… ЩЃЩ‚Ш· Ш§Щ„ШЁЩЉШ§Щ†Ш§ШЄ Щ…Щ† Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Ш§Щ„ШЈШіШ§ШіЩЉШ© Щ€Щ„Щ† ШЄШЄЩ…ЩѓЩ† Щ…Щ† Ш§Щ„Ш§ШіШЄЩ…ШЄШ§Ш№ ШЁШ®ШЇЩ…Ш§ШЄЩ†Ш§ ШЁШ§Щ„ЩѓШ§Щ…Щ„.","data_processing_consent_my_personal_data":"Ш§Щ„ШЁЩЉШ§Щ†Ш§ШЄ Ш§Щ„ШґШ®ШµЩЉШ©","data_processing_consent_partner_checkbox_tooltip":"Щ‡Ш°Ш§ Ш§Щ„Щ…Щ€Щ‚Ш№ ЩЉШ№Щ…Щ„ Ш№Щ„Щ‰ Щ…Щ†ШЄШ¬Ш§ШЄ ШҐЩЉЩѓШіЩ€Щ„Ш§. ШЄШЇЩЉШ± ШҐЩЉЩѓШіЩ€Щ„Ш§ ШЁЩЉШ§Щ†Ш§ШЄЩѓ Ш§Щ„ШґШ®ШµЩЉШ©ШЊ Щ…Ш«Щ„ Ш§Щ„Щ‡Щ€ЩЉШ© ШЈЩ€ ШЄЩЃШ§ШµЩЉЩ„ Ш§Щ„Ш§ШЄШµШ§Щ„ ШЈЩ€ Ш§Щ„Ш№Щ…Щ„ Ш§Щ„ШЄЩЉ ШЄЩ‚ШЇЩ…Щ‡Ш§ ЩЃЩЉ Ш­ШіШ§ШЁ Ш§Щ„Щ†Ш§ШґШ±.","essential_cookies_checkbox":"Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Ш§Щ„ШЈШіШ§ШіЩЉШ©","essential_cookies_description":"ШЄШ№ШЇ Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Щ‡Ш°Щ‡ Ш¶Ш±Щ€Ш±ЩЉШ© Щ„Щ…Щ€Щ‚Ш№Щ†Ш§ Ш§Щ„ШҐЩ„ЩѓШЄШ±Щ€Щ†ЩЉ Щ€Щ…Щ†ШЄШ¬Ш§ШЄ ШҐЩЉЩѓШіЩ€Щ„Ш§ Ш­ШЄЩ‰ ШЄШ№Щ…Щ„ Щ€Щ„Ш§ ЩЉЩ…ЩѓЩ† ШҐЩЉЩ‚Ш§ЩЃ ШЄШґШєЩЉЩ„Щ‡Ш§. Ш№Щ„Щ‰ ШіШЁЩЉЩ„ Ш§Щ„Щ…Ш«Ш§Щ„ШЊ ШЄШЄШ¶Щ…Щ† Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Ш§Щ„ШЄЩЉ ШЄЩ…ЩѓЩ‘Щ†Щѓ Щ…Щ† ШЄШіШ¬ЩЉЩ„ Ш§Щ„ШЇШ®Щ€Щ„ ШҐЩ„Щ‰ Ш­ШіШ§ШЁЩѓ Ш§Щ„ШґШ®ШµЩЉ Щ€Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Ш§Щ„ШЄЩЉ ШЄЩ€ЩЃШ± ШЄШЇЩЃЩ‚ Щ…Ш№Ш§Щ„Ш¬Ш© Ш§Щ„ШЇЩЃШ№ Ш§Щ„ШµШ­ЩЉШ­ Щ€ШЇШ№Щ… Ш§Щ„Ш№Щ…Щ„Ш§ШЎ. <br/>ЩЉЩ…ЩѓЩ†Щѓ Ш¶ШЁШ· Ш§Щ„Щ…ШіШЄШ№Ш±Ш¶ Ш§Щ„Ш®Ш§Шµ ШЁЩѓ Ш№Щ„Щ‰ Ш­ШёШ± Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Щ‡Ш°Щ‡ ШЈЩ€ ШЄЩ†ШЁЩЉЩ‡Щѓ ШЁШґШЈЩ†Щ‡Ш§ШЊ Щ€Щ„ЩѓЩ† ШЁШ№ШЇ Ш°Щ„Щѓ Щ‚ШЇ Щ„Ш§ ШЄШ№Щ…Щ„ ШЁШ№Ш¶ ШЈШ¬ШІШ§ШЎ Щ‡Ш°Ш§ Ш§Щ„Щ…Щ€Щ‚Ш№ ЩѓЩ…Ш§ Щ‡Щ€ Щ…ШЄЩ€Щ‚Ш№.","essential_cookies_list_link_name":"Щ‚Ш§Ш¦Щ…Ш© Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Ш§Щ„ШЈШіШ§ШіЩЉШ©","essential_cookies_tooltip":"Щ„Ш§ ЩЉЩ…ЩѓЩ† ШҐЩЉЩ‚Ш§ЩЃ ШЄШґШєЩЉЩ„ Щ‡Ш°Ш§ Ш§Щ„Щ†Щ€Ш№ Щ…Щ† Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш·","functional_cookies_checkbox":"Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Ш§Щ„Щ€ШёЩЉЩЃЩЉШ©","functional_cookies_description":"ШЄШіЩ…Ш­ Щ„Щ†Ш§ Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Щ‡Ш°Щ‡ ШЁШЄШ°ЩѓШ± Ш§Щ„Ш§Ш®ШЄЩЉШ§Ш±Ш§ШЄ Ш§Щ„ШЄЩЉ ШЄЩ‚Щ€Щ… ШЁЩ‡Ш§ Ш№Щ„Щ‰ Щ…Щ€Щ‚Ш№Щ†Ш§ Ш§Щ„ШҐЩ„ЩѓШЄШ±Щ€Щ†ЩЉ ШЈЩ€ ЩЃЩЉ Щ…Щ†ШЄШ¬Ш§ШЄ ШҐЩЉЩѓШіЩ€Щ„Ш§. ЩЉШіШ§Ш№ШЇЩ†Ш§ Щ‡Ш°Ш§ ЩЃЩЉ ШЄЩ€ЩЃЩЉШ± Щ…ЩЉШІШ§ШЄ Щ…Ш­ШіЩ†Ш© Щ€ШґШ®ШµЩЉШ©. Ш№Щ„Щ‰ ШіШЁЩЉЩ„ Ш§Щ„Щ…Ш«Ш§Щ„ШЊ ЩЉЩ…ЩѓЩ†Щ†Ш§ ШЄШ®ШµЩЉШµ ШµЩЃШ­Ш© Щ…Ш№ЩЉЩ†Ш© Щ„ЩѓШЊ ШЈЩ€ ШЄЩ‚ШЇЩЉЩ… Ш®ШЇЩ…Ш§ШЄ ШЈШ®Ш±Щ‰ ШЁЩ†Ш§ШЎЩ‹ Ш№Щ„Щ‰ Ш·Щ„ШЁЩѓ.<br/>ШҐШ°Ш§ ЩѓЩ†ШЄ Щ„Ш§ ШЄЩ‚ШЁЩ„ Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Щ‡Ш°Щ‡ШЊ ЩЃЩ‚ШЇ Щ„Ш§ ШЄШ№Щ…Щ„ ШЁШ№Ш¶ Щ‡Ш°Щ‡ Ш§Щ„Щ…ЩЉШІШ§ШЄ ШЈЩ€ ЩѓЩ„Щ‡Ш§ ШЁШґЩѓЩ„ ШµШ­ЩЉШ­.","functional_cookies_link_name":"Щ‚Ш§Ш¦Щ…Ш© Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Ш§Щ„Щ€ШёЩЉЩЃЩЉШ©","opt_out_consent":"ШЈЩЃЩ‡Щ… ШЈЩ† ШҐЩЉЩѓШіЩ€Щ„Ш§ Щ‚ШЇ ШЄШґШ§Ш±Щѓ ШЁЩЉШ§Щ†Ш§ШЄЩЉ Ш§Щ„ШґШ®ШµЩЉШ© Ш¶Щ…Щ† Щ†Ш·Ш§Щ‚{xsollaGroupConsentLink}.","opt_out_consent_link_name":"Щ…Ш¬Щ…Щ€Ш№Ш© ШҐЩЉЩѓШіЩ€Щ„Ш§","opt_out_description":"Щ„ШЇЩЉЩѓ Ш§Щ„Ш­Щ‚ ЩЃЩЉ ШЄШєЩЉЩЉШ± Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш© ШЈЩ€ ШіШ­ШЁЩ‡Ш§ ЩЃЩЉ ШЈЩЉ Щ€Щ‚ШЄ. Щ„Ш§ ЩЉШ¤Ш«Ш± ШіШ­ШЁ Ш§Щ„Щ…Щ€Ш§ЩЃЩ‚Ш© Ш№Щ„Щ‰ Щ‚Ш§Щ†Щ€Щ†ЩЉШ© Ш§Щ„Щ…Ш№Ш§Щ„Ш¬Ш© Ш§Щ„ШіШ§ШЁЩ‚Ш©ШЊ Щ„ШЈЩ†Щ‡Ш§ ШЄШіШЄЩ†ШЇ ШҐЩ„Щ‰ Щ…Щ€Ш§ЩЃЩ‚Ш© Щ…ШіШЁЩ‚Ш©.","opt_out_title":"Ш§Щ„Ш§Щ†ШіШ­Ш§ШЁ","privacy_policy_link_name":"ШіЩЉШ§ШіШ© Ш§Щ„Ш®ШµЩ€ШµЩЉШ©","return_button":"Ш№Щ€ШЇШ©","save_and_close_button":"Ш­ЩЃШё Щ€ШҐШєЩ„Ш§Щ‚","saving_button":"Ш¬Ш§Ш±ЩЉ Ш§Щ„Ш­ЩЃШё...","settings_button":"Ш§Щ„ШҐШ№ШЇШ§ШЇШ§ШЄ","settings_footer_description":"* ШҐШ°Ш§ ШЄЩ… ШЄШ­ШЇЩЉШЇ Ш®Ш§Щ†Ш© Ш§Щ„Ш§Ш®ШЄЩЉШ§Ш±ШЊ ЩЃЩ‚ШЇ Щ‚Щ…ШЄ ШЁШ§Щ„ЩЃШ№Щ„ ШЁШ§Щ„Ш§Ш®ШЄЩЉШ§Ш± ЩЃЩЉ Щ…Щ†ШЄШ¬ ШҐЩЉЩѓШіЩ€Щ„Ш§ ШўШ®Ш±.","settings_title":"ШҐШ№ШЇШ§ШЇШ§ШЄ Ш§Щ„Ш®ШµЩ€ШµЩЉШ©","targeting_cookies_checkbox":"Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Ш§Щ„Ш®Ш§ШµШ© ШЁШ§Щ„Ш§ШіШЄЩ‡ШЇШ§ЩЃ","targeting_cookies_description":"ШЄШіШ¬Щ„ Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Щ‡Ш°Щ‡ Ш§Щ„ШµЩЃШ­Ш§ШЄ Ш§Щ„ШЄЩЉ Щ‚Щ…ШЄ ШЁШІЩЉШ§Ш±ШЄЩ‡Ш§ Ш№Щ„Щ‰ Щ‡Ш°Ш§ Ш§Щ„Щ…Щ€Щ‚Ш№ ШЈЩ€ ЩЃЩЉ Щ…Щ†ШЄШ¬Ш§ШЄ ШҐЩЉЩѓШіЩ€Щ„Ш§ Щ€Ш§Щ„Ш±Щ€Ш§ШЁШ· Ш§Щ„ШЄЩЉ Ш§ШЄШЁШ№ШЄЩ‡Ш§. Щ†ШіШЄШ®ШЇЩ… Щ‡Ш°Щ‡ Ш§Щ„Щ…Ш№Щ„Щ€Щ…Ш§ШЄ Щ„Ш¬Ш№Щ„ Щ…Щ€Щ‚Ш№Щ†Ш§ Ш§Щ„ШҐЩ„ЩѓШЄШ±Щ€Щ†ЩЉ Щ€Ш§Щ„ШҐШ№Щ„Ш§Щ†Ш§ШЄ Ш§Щ„Щ…Ш№Ш±Щ€Ш¶Ш© Ш№Щ„ЩЉЩ‡ ШЈЩѓШ«Ш± ШµЩ„Ш© ШЁШ§Щ‡ШЄЩ…Ш§Щ…Ш§ШЄЩѓ. ЩЉШ¬Щ€ШІ Щ„Щ†Ш§ ШЈЩЉШ¶Щ‹Ш§ Щ…ШґШ§Ш±ЩѓШ© Щ‡Ш°Щ‡ Ш§Щ„Щ…Ш№Щ„Щ€Щ…Ш§ШЄ Щ…Ш№ Ш¬Щ‡Ш§ШЄ Ш®Ш§Ш±Ш¬ЩЉШ© Щ„Щ‡Ш°Ш§ Ш§Щ„ШєШ±Ш¶. <br/>ШҐШ°Ш§ ЩѓЩ†ШЄ Щ„Ш§ ШЄЩ‚ШЁЩ„ Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Щ‡Ш°Щ‡ШЊ ЩЃШіШЄШёЩ„ ШЄШ±Щ‰ ШҐШ№Щ„Ш§Щ†Ш§ШЄШЊ Щ„ЩѓЩ†Щ‡Ш§ Щ„Щ† ШЄЩѓЩ€Щ† Щ…Ш®ШµШµШ© Ш­ШіШЁ Ш§Щ‡ШЄЩ…Ш§Щ…Ш§ШЄЩѓ.","targeting_cookies_link_name":"Щ‚Ш§Ш¦Щ…Ш© Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш· Ш§Щ„Ш®Ш§ШµШ© ШЁШ§Щ„Ш§ШіШЄЩ‡ШЇШ§ЩЃ","welcome_screen_allow_cookies":"ШЈЩ€Ш§ЩЃЩ‚ Ш№Щ„Щ‰ Ш§ШіШЄШ®ШЇШ§Щ… Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш·","welcome_screen_data_processing":"ШЈЩ…Щ†Ш­ Щ…Щ€Ш§ЩЃЩ‚ШЄЩЉ Ш№Щ„Щ‰ Ш§ШіШЄШ®ШЇШ§Щ… ШҐЩЉЩѓШіЩ€Щ„Ш§{myPersonalDataTooltip} Щ„ШЄЩ‚ШЇЩЉЩ… Ш®ШЇЩ…Ш§ШЄ Щ…Ш®ШµШµШ© Щ„ЩЉ","welcome_screen_description":"ЩЉЩ…ЩѓЩ†Щѓ ШЄШєЩЉЩЉШ± Щ…Щ€Ш§ЩЃЩ‚ШЄЩѓ ШЈЩ€ ШіШ­ШЁЩ‡Ш§ ЩЃЩЉ ШЈЩЉ Щ€Щ‚ШЄ ШЁШ§Щ„Ш±Ш¬Щ€Ш№ ШҐЩ„Щ‰ ШҐШ№ШЇШ§ШЇШ§ШЄ Ш§Щ„Ш®ШµЩ€ШµЩЉШ©.","welcome_screen_mobile_description":"ШЁШ§Щ„Щ†Щ‚Ш± Ш№Щ„Щ‰ \\"{acceptAllButtonText}\\"ШЊ ЩЃШҐЩ†Щѓ ШЄЩ…Щ†Ш­Щ†Ш§ Щ…Щ€Ш§ЩЃЩ‚ШЄЩѓ Ш№Щ„Щ‰ Щ…Ш№Ш§Щ„Ш¬Ш© ШЁЩЉШ§Щ†Ш§ШЄЩѓ Ш§Щ„ШґШ®ШµЩЉШ© Щ€ШЄШ№ЩЉЩЉЩ† Ш¬Щ…ЩЉШ№ Щ…Щ„ЩЃШ§ШЄ ШЄШ№Ш±ЩЉЩЃ Ш§Щ„Ш§Ш±ШЄШЁШ§Ш·ШЊ ШЈЩ€ ШЁШЇЩ„Ш§Щ‹ Щ…Щ† Ш°Щ„ЩѓШЊ ЩЉЩ…ЩѓЩ†Щѓ ШЄШ®ШµЩЉШµ ШЄЩЃШ¶ЩЉЩ„Ш§ШЄЩѓ ЩЃЩЉ Ш§Щ„ШҐШ№ШЇШ§ШЇШ§ШЄ.","welcome_screen_title":"Щ†Ш­ШЄШ±Щ… Ш®ШµЩ€ШµЩЉШЄЩѓ"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"РџСЂРёРµРјРё РІСЃРёС‡РєРё","analytical_performance_cookies_checkbox":"Р‘РёСЃРєРІРёС‚РєРё Р·Р° Р°РЅР°Р»РёС‚РёРєР° Рё РїСЂРѕРёР·РІРѕРґРёС‚РµР»РЅРѕСЃС‚","analytical_performance_cookies_description":"РўРµР·Рё Р±РёСЃРєРІРёС‚РєРё СЃСЉР±РёСЂР°С‚ РёРЅС„РѕСЂРјР°С†РёСЏ РѕС‚РЅРѕСЃРЅРѕ РёР·РїРѕР»Р·РІР°РЅРµС‚Рѕ РЅР° СЃР°Р№С‚Р° РѕС‚ РІР°СЃ, Рё РЅРё РїРѕР·РІРѕР»СЏРІР°С‚ РґР° РїРѕРґРѕР±СЂРёРј СЂР°Р±РѕС‚Р°С‚Р° РјСѓ Рё РїРѕС‚СЂРµР±РёС‚РµР»СЃРєРёСЏ РІРё РѕРїРёС‚ СЃ РґСЂСѓРіРёС‚Рµ РїСЂРѕРґСѓРєС‚Рё РЅР° Р•РєСЃРѕР»Р°. РќР°РїСЂРёРјРµСЂ, РїСЂР°РІРёРј С‚Р°РєР°, С‡Рµ РґР° РЅР°РјРёСЂР°С‚Рµ Р»РµСЃРЅРѕ С‚РѕРІР°, РєРѕРµС‚Рѕ С‚СЉСЂСЃРёС‚Рµ, Рё Р·Р°РїРёСЃРІР°РјРµ РІСЃРёС‡РєРё РїСЂРѕР±Р»РµРјРё, СЃ РєРѕРёС‚Рѕ СЃРµ СЃР±Р»СЉСЃРєРІР°С‚Рµ.<br/> РђРєРѕ РЅРµ РїСЂРёРµРјРµС‚Рµ С‚РµР·Рё Р±РёСЃРєРІРёС‚РєРё, РЅСЏРјР° РґР° Р·РЅР°РµРј, РєРѕРіР° СЃС‚Рµ РїРѕСЃРµС‰Р°РІР°Р»Рё СЃР°Р№С‚Р° РЅРё Рё РЅСЏРјР° РґР° РјРѕР¶РµРј РґР° СЃР»РµРґРёРј СЂР°Р±РѕС‚Р°С‚Р° РјСѓ.","analytical_performance_cookies_link_name":"РЎРїРёСЃСЉРє РЅР° Р±РёСЃРєРІРёС‚РєРё Р·Р° Р°РЅР°Р»РёС‚РёРєР° Рё РїСЂРѕРёР·РІРѕРґРёС‚РµР»РЅРѕСЃС‚","cookie_policy_link_name":"РџРѕР»РёС‚РёРєР° Р·Р° Р±РёСЃРєРІРёС‚РєРё","data_processing_consent_checkbox":"РЎСЉРіР»Р°СЃРёРµ Р·Р° РѕР±СЂР°Р±РѕС‚РєР° РЅР° РґР°РЅРЅРё","data_processing_consent_customer_checkbox_tooltip":"РўРѕР·Рё СЃР°Р№С‚ Рµ РЅР° Р±Р°Р·Р°С‚Р° РЅР° РїСЂРѕРґСѓРєС‚РёС‚Рµ РЅР° Р•РєСЃРѕР»Р°. Р•РєСЃРѕР»Р° РѕР±СЂР°Р±РѕС‚РІР° Р»РёС‡РЅРёС‚Рµ РІРё РґР°РЅРЅРё (РїСЉР»РЅРѕ РёРјРµ РёР»Рё РїСЃРµРІРґРѕРЅРёРј, РёРјРµР№Р» Р°РґСЂРµСЃ, IP Р°РґСЂРµСЃ, РіРµРѕР»РѕРєР°С†РёРѕРЅРЅРё РґР°РЅРЅРё Рё СѓРЅРёРєР°Р»РµРЅ РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ РЅР° РїРѕС‚СЂРµР±РёС‚РµР»СЏ).","data_processing_consent_description":"РРјР°РјРµ РЅСѓР¶РґР° РѕС‚ СЃСЉРіР»Р°СЃРёРµС‚Рѕ РІРё РґР° РёР·РїРѕР»Р·РІР°РјРµ Р»РёС‡РЅРёС‚Рµ РІРё РґР°РЅРЅРё Рё РёРЅС„РѕСЂРјР°С†РёСЏ РѕС‚ Р±РёСЃРєРІРёС‚РєРёС‚Рµ, Р·Р° РґР° РІРё РїСЂРµРґР»Р°РіР°РјРµ РїРµСЂСЃРѕРЅР°Р»РёР·РёСЂР°РЅРё СѓСЃР»СѓРіРё. РђРєРѕ РЅРµ РёСЃРєР°С‚Рµ РґР° РґР°РІР°С‚Рµ СЃСЉРіР»Р°СЃРёРµС‚Рѕ СЃРё Р·Р° РѕР±СЂР°Р±РѕС‚РєР° РЅР° РґР°РЅРЅРё, С‰Рµ РёР·РїРѕР»Р·РІР°РјРµ СЃР°РјРѕ РґР°РЅРЅРёС‚Рµ РѕС‚ РћСЃРЅРѕРІРЅРё Р±РёСЃРєРІРёС‚РєРё, Рё РЅСЏРјР° РґР° РјРѕР¶РµС‚Рµ РґР° СЃРµ РЅР°СЃР»Р°РґРёС‚Рµ РЅР° СѓСЃР»СѓРіРёС‚Рµ РЅРё РїРѕ РЅР°Р№-РґРѕР±СЂРёСЏ РЅР°С‡РёРЅ.","data_processing_consent_my_personal_data":"РјРѕРёС‚Рµ Р»РёС‡РЅРё РґР°РЅРЅРё","data_processing_consent_partner_checkbox_tooltip":"РўРѕР·Рё СЃР°Р№С‚ Рµ РЅР° Р±Р°Р·Р°С‚Р° РЅР° РїСЂРѕРґСѓРєС‚РёС‚Рµ РЅР° Р•РєСЃРѕР»Р°. Р•РєСЃРѕР»Р° РѕР±СЂР°Р±РѕС‚РІР° Р»РёС‡РЅРёС‚Рµ РІРё РґР°РЅРЅРё (РґР°РЅРЅРё Р·Р° СЃР°РјРѕР»РёС‡РЅРѕСЃС‚, РґР°РЅРЅРё Р·Р° РІСЂСЉР·РєР°, Р±РёР·РЅРµСЃ РґР°РЅРЅРё), РєРѕРёС‚Рѕ РїСЂРµРґРѕСЃС‚Р°РІСЏС‚Рµ РІ РР·РґР°С‚РµР»СЃРєРёСЏ СЃРё РїСЂРѕС„РёР».","essential_cookies_checkbox":"РћСЃРЅРѕРІРЅРё Р±РёСЃРєРІРёС‚РєРё","essential_cookies_description":"РўРµР·Рё Р±РёСЃРєРІРёС‚РєРё СЃР° РЅРµРѕР±С…РѕРґРёРјРё, Р·Р° РґР° РјРѕРіР°С‚ СЃР°Р№С‚Р° РЅРё Рё РїСЂРѕРґСѓРєС‚РёС‚Рµ РЅР° Р•РєСЃРѕР»Р° РґР° С„СѓРЅРєС†РёРѕРЅРёСЂР°С‚, Рё РЅРµ РјРѕРіР°С‚ РґР° Р±СЉРґР°С‚ РёР·РєР»СЋС‡РµРЅРё. РќР°РїСЂРёРјРµСЂ, С‚Рµ РІРєР»СЋС‡РІР°С‚ Р±РёСЃРєРІРёС‚РєРё, РєРѕРёС‚Рѕ РІРё РїРѕР·РІРѕР»СЏРІР°С‚ РґР° РІР»РёР·Р°С‚Рµ РІ Р»РёС‡РЅРёСЏ СЃРё РїСЂРѕС„РёР», РєР°РєС‚Рѕ Рё Р±РёСЃРєРІРёС‚РєРё, СЃ РїРѕРјРѕС‰С‚Р° РЅР° РєРѕРёС‚Рѕ СЃРµ РѕР±СЂР°Р±РѕС‚РІР°С‚ РїР»Р°С‰Р°РЅРёСЏ Рё СЃРµ РѕСЃРёРіСѓСЂСЏРІР° РєР»РёРµРЅС‚СЃРєР° РїРѕРґРґСЂСЉР¶РєР°. <br/> РњРѕР¶РµС‚Рµ РґР° РЅР°СЃС‚СЂРѕРёС‚Рµ Р±СЂР°СѓР·СЉСЂР° СЃРё РґР° Р±Р»РѕРєРёСЂР° С‚РµР·Рё Р±РёСЃРєРІРёС‚РєРё РёР»Рё РґР° РІРё РїСЂРµРґСѓРїСЂРµР¶РґР°РІР° Р·Р° С‚СЏС…, РЅРѕ РІ С‚РѕР·Рё СЃР»СѓС‡Р°Р№ РЅСЏРєРѕРё С‡Р°СЃС‚Рё РЅР° СЃР°Р№С‚Р° РјРѕРіР°С‚ РґР° РЅРµ СЂР°Р±РѕС‚СЏС‚ РїСЂР°РІРёР»РЅРѕ.","essential_cookies_list_link_name":"РЎРїРёСЃСЉРє РЅР° РћСЃРЅРѕРІРЅРё Р±РёСЃРєРІРёС‚РєРё","essential_cookies_tooltip":"РўРѕР·Рё С‚РёРї Р±РёСЃРєРІРёС‚РєРё РЅРµ РјРѕРіР°С‚ РґР° Р±СЉРґР°С‚ РёР·РєР»СЋС‡РµРЅРё.","functional_cookies_checkbox":"Р¤СѓРЅРєС†РёРѕРЅР°Р»РЅРё Р±РёСЃРєРІРёС‚РєРё","functional_cookies_description":"РўРµР·Рё Р±РёСЃРєРІРёС‚РєРё РЅРё РїРѕР·РІРѕР»СЏРІР°С‚ РґР° Р·Р°РїРѕРјРЅРёРј РёР·Р±РѕСЂРёС‚Рµ, РєРѕРёС‚Рѕ РїСЂР°РІРёС‚Рµ РЅР° СЃР°Р№С‚Р° РЅРё РёР»Рё РІ РїСЂРѕРґСѓРєС‚РёС‚Рµ РЅР° Р•РєСЃРѕР»Р°. РўРѕРІР° РЅРё РїРѕРјР°РіР° РґР° РІРё РїСЂРµРґРѕСЃС‚Р°РІСЏРјРµ РїРѕРґРѕР±СЂРµРЅРѕ Рё РїРµСЂСЃРѕРЅР°Р»РёР·РёСЂР°РЅРѕ СЃСЉРґСЉСЂР¶Р°РЅРёРµ. РќР°РїСЂРёРјРµСЂ, РјРѕР¶РµРј РґР° РїСЂРѕРјРµРЅРёРј РѕРїСЂРµРґРµР»РµРЅР° СЃС‚СЂР°РЅРёС†Р° СЃР°РјРѕ Р·Р° РІР°СЃ, РёР»Рё РґР° РІРё РїСЂРµРґРѕСЃС‚Р°РІРёРј РґСЂСѓРіРё СѓСЃР»СѓРіРё РїРѕ РїРѕРёСЃРєРІР°РЅРµ. <br/> РђРєРѕ РЅРµ РїСЂРёРµРјР°С‚Рµ С‚РµР·Рё Р±РёСЃРєРІРёС‚РєРё, РЅСЏРєРѕРё РёР»Рё РІСЃРёС‡РєРё С„СѓРЅРєС†РёРё РјРѕРіР°С‚ РґР° РЅРµ СЂР°Р±РѕС‚СЏС‚ РїСЂР°РІРёР»РЅРѕ.","functional_cookies_link_name":"РЎРїРёСЃСЉРє РЅР° Р¤СѓРЅРєС†РёРѕРЅР°Р»РЅРё Р±РёСЃРєРІРёС‚РєРё","opt_out_consent":"Р Р°Р·Р±РёСЂР°Рј, С‡Рµ Р•РєСЃРѕР»Р° РјРѕР¶Рµ РґР° СЃРїРѕРґРµР»СЏ Р»РёС‡РЅРёС‚Рµ РјРё РґР°РЅРЅРё РІ {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Р“СЂСѓРїР° Р•РєСЃРѕР»Р°","opt_out_description":"РРјР°С‚Рµ РїСЂР°РІРѕС‚Рѕ РґР° РїСЂРѕРјРµРЅРёС‚Рµ РёР»Рё РґР° РѕС‚С‚РµРіР»РёС‚Рµ СЃСЉРіР»Р°СЃРёРµС‚Рѕ СЃРё РїРѕ РІСЃСЏРєРѕ РІСЂРµРјРµ. РћС‚С‚РµРіР»СЏРЅРµС‚Рѕ РЅР° СЃСЉРіР»Р°СЃРёРµ РЅРµ РІР»РёСЏРµ РЅР° Р·Р°РєРѕРЅРЅРѕСЃС‚Р° РЅР° РѕР±СЂР°Р±РѕС‚РєР°С‚Р°, РёР·РІСЉСЂС€РµРЅР° РЅР° Р±Р°Р·Р°С‚Р° РЅР° РїСЂРµРґРёС€РЅРѕС‚Рѕ РІРё СЃСЉРіР»Р°СЃРёРµ.","opt_out_title":"РћС‚РєР°Р¶РµС‚Рµ СЃРµ","privacy_policy_link_name":"РџРѕР»РёС‚РёРєР° Р·Р° РїРѕРІРµСЂРёС‚РµР»РЅРѕСЃС‚","return_button":"Р’СЂСЉС‰Р°РЅРµ","save_and_close_button":"Р—Р°РїР°Р·Рё Рё Р·Р°С‚РІРѕСЂРё","saving_button":"Р—Р°РїР°Р·РІР°РЅРµ...","settings_button":"РќР°СЃС‚СЂРѕР№РєРё","settings_footer_description":"*РђРєРѕ С‚Р°Р·Рё РѕС‚РјРµС‚РєР° Рµ РёР·Р±СЂР°РЅР°, РІРµС‡Рµ СЃС‚Рµ РЅР°РїСЂР°РІРёР»Рё РёР·Р±РѕСЂ РІ РґСЂСѓРі РїСЂРѕРґСѓРєС‚ РЅР° Р•РєСЃРѕР»Р°.","settings_title":"РќР°СЃС‚СЂРѕР№РєРё Р·Р° РїРѕРІРµСЂРёС‚РµР»РЅРѕСЃС‚","targeting_cookies_checkbox":"Р‘РёСЃРєРІРёС‚РєРё Р·Р° С‚Р°СЂРіРµС‚РёСЂР°РЅРµ","targeting_cookies_description":"РўРµР·Рё Р±РёСЃРєРІРёС‚РєРё Р·Р°РїРёСЃРІР°С‚ СЃС‚СЂР°РЅРёС†РёС‚Рµ, РєРѕРёС‚Рѕ РїРѕСЃРµС‰Р°РІР°С‚Рµ РЅР° С‚РѕР·Рё СЃР°Р№С‚ РёР»Рё РІ РїСЂРѕРґСѓРєС‚РёС‚Рµ РЅР° Р•РєСЃРѕР»Р°, Рё РІСЂСЉР·РєРёС‚Рµ, РєРѕРёС‚Рѕ СЃР»РµРґРІР°С‚Рµ. РР·РїРѕР»Р·РІР°РјРµ С‚Р°Р·Рё РёРЅС„РѕСЂРјР°С†РёСЏ Р·Р° РґР° РЅР°РїСЂР°РІРёРј СЃР°Р№С‚Р° РЅРё Рё СЂРµРєР»Р°РјР°С‚Р°, РєРѕСЏС‚Рѕ СЃРµ РїРѕРєР°Р·РІР° РЅР° РЅРµРіРѕ, РїРѕ-РїРѕРґС…РѕРґСЏС‰Рё Р·Р° РІР°СЃ. РЎСЉС‰Рѕ С‚Р°РєР° РјРѕР¶РµРј РґР° СЃРїРѕРґРµР»СЏРјРµ С‚Р°Р·Рё РёРЅС„РѕСЂРјР°С†РёСЏ СЃ С‚СЂРµС‚Рё Р»РёС†Р° Р·Р° СЃСЉС‰Р°С‚Р° С†РµР». <br/> РђРєРѕ РЅРµ РїСЂРёРµРјР°С‚Рµ С‚РµР·Рё Р±РёСЃРєРІРёС‚РєРё, С‰Рµ РїСЂРѕРґСЉР»Р¶Р°РІР°С‚Рµ РґР° РІРёР¶РґР°С‚Рµ СЂРµРєР»Р°РјР°, РЅРѕ С‚СЏ РЅСЏРјР° РґР° Рµ РїРµСЂСЃРѕРЅР°Р»РёР·РёСЂР°РЅР° СЃСЉРіР»Р°СЃРЅРѕ РёРЅС‚РµСЂРµСЃРёС‚Рµ РІРё.","targeting_cookies_link_name":"РЎРїРёСЃСЉРє РЅР° Р‘РёСЃРєРІРёС‚РєРё Р·Р° С‚Р°СЂРіРµС‚РёСЂР°РЅРµ","welcome_screen_allow_cookies":"РЎСЉРіР»Р°СЃРµРЅ СЃСЉРј РґР° РёР·РїРѕР»Р·РІР°Рј Р±РёСЃРєРІРёС‚РєРё","welcome_screen_data_processing":"Р”Р°РІР°Рј СЃСЉРіР»Р°СЃРёРµС‚Рѕ СЃРё РЅР° Р•РєСЃРѕР»Р° Р·Р° РёР·РїРѕР»Р·РІР°РЅРµ РЅР° {myPersonalDataTooltip} СЃ С†РµР» РїСЂРµРґР»Р°РіР°РЅРµ РЅР° РїРµСЂСЃРѕРЅР°Р»РёР·РёСЂР°РЅРё СѓСЃР»СѓРіРё РЅР° РјРµРЅ.","welcome_screen_description":"РњРѕР¶РµС‚Рµ РґР° РїСЂРѕРјРµРЅРёС‚Рµ РёР»Рё РґР° РѕС‚С‚РµРіР»РёС‚Рµ СЃСЉРіР»Р°СЃРёРµС‚Рѕ СЃРё РїРѕ РІСЃСЏРєРѕ РІСЂРµРјРµ, РєР°С‚Рѕ СЃРµ РІСЉСЂРЅРµС‚Рµ РІ РјРµРЅСЋ РќР°СЃС‚СЂРѕР№РєРё Р·Р° РїРѕРІРµСЂРёС‚РµР»РЅРѕСЃС‚.","welcome_screen_mobile_description":"РљР°С‚Рѕ РЅР°С‚РёСЃРєР°С‚Рµ \\"{acceptAllButtonText}\\", РЅРё РґР°РІР°С‚Рµ СЃСЉРіР»Р°СЃРёРµС‚Рѕ СЃРё РґР° РѕР±СЂР°Р±РѕС‚РІР°РјРµ Р»РёС‡РЅРёС‚Рµ РІРё РґР°РЅРЅРё Рё Р±РёСЃРєРІРёС‚РєРёС‚Рµ. РЎСЉС‰Рѕ С‚Р°РєР° РјРѕР¶РµС‚Рµ РґР° РїСЂРѕРјРµРЅРёС‚Рµ РїСЂРµРґРїРѕС‡РёС‚Р°РЅРёСЏС‚Р° СЃРё РІ РќР°СЃС‚СЂРѕР№РєРё.","welcome_screen_title":"РЈРІР°Р¶Р°РІР°РјРµ РїРѕРІРµСЂРёС‚РµР»РЅРѕСЃС‚С‚Р° РІРё."}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"PЕ™ijmout vЕЎe","analytical_performance_cookies_checkbox":"AnalytickГ© a vГЅkonnostnГ­ cookies","analytical_performance_cookies_description":"Tyto cookies shromaЕѕДЏujГ­ informace o vaЕЎem pouЕѕГ­vГЎnГ­ tohoto webu a umoЕѕЕ€ujГ­ nГЎm vylepЕЎit zpЕЇsob jeho fungovГЎnГ­ a vylepЕЎit vaЕЎe zkuЕЎenosti s jinГЅmi produkty Xsolla. MЕЇЕѕeme napЕ™Г­klad zajistit, abyste snadno naЕЎli, co hledГЎte, nebo zaznamenat jakГ©koli potГ­Еѕe, kterГ© byste mohli mГ­t.<br/> Pokud tyto cookies nepЕ™ijmete, nebudeme vД›dД›t, kdy jste navЕЎtГ­vili nГЎЕЎ web a nebudeme moci sledovat jeho vГЅkon.","analytical_performance_cookies_link_name":"Seznam analytickГЅch a vГЅkonnostnГ­ch cookies","cookie_policy_link_name":"ZГЎsady pouЕѕГ­vГЎnГ­ cookies","data_processing_consent_checkbox":"Souhlas se zpracovГЎnГ­m dat","data_processing_consent_customer_checkbox_tooltip":"Tento web je provozovГЎn na produktech Xsolla. Xsolla spravuje vaЕЎe osobnГ­ Гєdaje, jako je celГ© jmГ©no nebo pЕ™ezdГ­vka, e-mailovГЎ adresa, IP adresa, informace o zemД›pisnГ© poloze a jedineДЌnГ© ID uЕѕivatele.","data_processing_consent_description":"PotЕ™ebujeme vГЎЕЎ souhlas s pouЕѕГ­vГЎnГ­m vaЕЎich osobnГ­ch ГєdajЕЇ a informacГ­ z cookies, abychom vГЎm mohli nabГ­dnout pЕ™izpЕЇsobenГ© sluЕѕby. Pokud se rozhodnete odhlГЎsit ze zpracovГЎnГ­ ГєdajЕЇ, pouЕѕijeme pouze data ze zГЎkladnГ­ch cookies a nebudete moci plnД› uЕѕГ­vat naЕЎich sluЕѕeb.","data_processing_consent_my_personal_data":"moje osobnГ­ data","data_processing_consent_partner_checkbox_tooltip":"Tento web je provozovГЎn na produktech Xsolla. Xsolla spravuje vaЕЎe osobnГ­ Гєdaje, napЕ™Г­klad identitu a kontaktnГ­ nebo obchodnГ­ Гєdaje, kterГ© jste uvedli v ГљДЌtu vydavatele.","essential_cookies_checkbox":"ZГЎkladnГ­ cookies","essential_cookies_description":"Tyto cookies jsou nezbytnГ© pro fungovГЎnГ­ naЕЎich webovГЅch strГЎnek a produktЕЇ Xsolla a nelze je vypnout. ZahrnujГ­ napЕ™Г­klad cookies, kterГ© vГЎm umoЕѕЕ€ujГ­ pЕ™ihlГЎsit se ke svГ©mu osobnГ­mu ГєДЌtu, a cookies, kterГ© zajiЕЎЕҐujГ­ sprГЎvnГЅ tok zpracovГЎnГ­ plateb a zГЎkaznickou podporu.<br/> SvЕЇj prohlГ­ЕѕeДЌ mЕЇЕѕete nastavit tak, aby tyto cookies zablokoval nebo vГЎs na nД› upozornil, ale pak nД›kterГ© ДЌГЎsti tohoto webu nemusГ­ fungovat podle oДЌekГЎvГЎnГ­.","essential_cookies_list_link_name":"Seznam zГЎkladnГ­ch cookies","essential_cookies_tooltip":"Tento typ cookies nelze vypnout.","functional_cookies_checkbox":"FunkДЌnГ­ cookies","functional_cookies_description":"Tyto cookies nГЎm umoЕѕЕ€ujГ­ zapamatovat si volby, kterГ© provedete na naЕЎich webovГЅch strГЎnkГЎch nebo v produktech Xsolla. To nГЎm pomГЎhГЎ poskytovat vylepЕЎenГ© a pЕ™izpЕЇsobenГ© funkce. MЕЇЕѕeme vГЎm napЕ™Г­klad pЕ™izpЕЇsobit urДЌitou strГЎnku nebo na poЕѕГЎdГЎnГ­ poskytnout dalЕЎГ­ sluЕѕby.<br/> Pokud tyto cookies nepЕ™ijmete, nД›kterГ© nebo vЕЎechny tyto funkce nemusГ­ fungovat sprГЎvnД›.","functional_cookies_link_name":"Seznam funkДЌnГ­ch cookies","opt_out_consent":"Beru na vД›domГ­, Еѕe spoleДЌnost Xsolla mЕЇЕѕe sdГ­let moje osobnГ­ Гєdaje, a tyto Гєdaje mЕЇЕѕe obdrЕѕet i {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Skupina Xsolla","opt_out_description":"MГЎte prГЎvo kdykoli zmД›nit nebo odvolat souhlas. OdvolГЎnГ­ souhlasu nemГЎ vliv na zГЎkonnost minulГ©ho zpracovГЎnГ­, protoЕѕe je zaloЕѕeno na pЕ™edchozГ­m souhlasu.","opt_out_title":"Odvolat souhlas","privacy_policy_link_name":"ZГЎsady ochrany osobnГ­ch ГєdajЕЇ","return_button":"ZpД›t","save_and_close_button":"UloЕѕit a zavЕ™Г­t","saving_button":"UklГЎdГЎnГ­...","settings_button":"NastavenГ­","settings_footer_description":"*Pokud je polГ­ДЌko jiЕѕ zaЕЎkrtnuto, takovou zmД›nu jste jiЕѕ provedli v jinГ©m produktu Xsolla.","settings_title":"NastavenГ­ ochrany osobnГ­ch ГєdajЕЇ","targeting_cookies_checkbox":"Cookies cГ­lenГ­","targeting_cookies_description":"Tyto cookies zaznamenГЎvajГ­ strГЎnky, kterГ© jste navЕЎtГ­vili na tomto webu nebo v produktech Xsolla, a odkazy, na kterГ© jste kliknuli. Tyto informace pouЕѕГ­vГЎme k tomu, aby naЕЎe webovГ© strГЎnky a reklamy na nich zobrazenГ© byly relevantnД›jЕЎГ­ pro vaЕЎe zГЎjmy. Za tГ­mto ГєДЌelem mЕЇЕѕeme tyto informace sdГ­let takГ© s tЕ™etГ­mi stranami.<br/> Pokud tyto cookies nepЕ™ijmete, budou se vГЎm i nadГЎle zobrazovat reklamy, ale nebudou pЕ™izpЕЇsobeny vaЕЎim zГЎjmЕЇm.","targeting_cookies_link_name":"Seznam cookies cГ­lenГ­","welcome_screen_allow_cookies":"SouhlasГ­m s pouЕѕГ­vГЎnГ­m cookies","welcome_screen_data_processing":"DГЎvГЎm souhlas s tГ­m, Еѕe Xsolla mЕЇЕѕe pouЕѕГ­t {myPersonalDataTooltip} k tomu, aby mi nabГ­dla pЕ™izpЕЇsobenГ© sluЕѕby.","welcome_screen_description":"SvЕЇj souhlas mЕЇЕѕete kdykoli zmД›nit nebo odvolat v NastavenГ­ ochrany osobnГ­ch ГєdajЕЇ.","welcome_screen_mobile_description":"KliknutГ­m na tlaДЌГ­tko вЂћ{acceptAllButtonText}вЂњ nГЎm dГЎvГЎte souhlas se zpracovГЎnГ­m vaЕЎich osobnГ­ch ГєdajЕЇ a nastavenГ­m vЕЎech cookies. JakГ©koli zmД›ny mЕЇЕѕete provГ©st v nastavenГ­.","welcome_screen_title":"Respektujeme vaЕЎe soukromГ­"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Alle akzeptieren","analytical_performance_cookies_checkbox":"Analyse- und Leistungs-Cookies","analytical_performance_cookies_description":"Diese Cookies sammeln Daten Гјber deine Nutzung dieser Website und ermГ¶glichen es uns, die Website und dein Erlebnis mit anderen Xsolla-Produkten zu verbessern. So kГ¶nnen wir beispielsweise sicherstellen, dass du problemlos das findest, wonach du sucht, oder etwaige Schwierigkeiten feststellen. <br/> Wenn du diese Cookies nicht akzeptierst, sind wir im Unklaren darГјber, wann du unsere Website besucht hast und kГ¶nnen deren Leistung nicht Гјberwachen.","analytical_performance_cookies_link_name":"Liste der Analyse- und Leistungs-Cookies","cookie_policy_link_name":"Cookie-Richtlinie","data_processing_consent_checkbox":"Zustimmung zur Datenverarbeitung","data_processing_consent_customer_checkbox_tooltip":"Diese Seite nutzt Xsolla-Produkte. Xsolla verwaltet deine personenbezogenen Daten wie vollstГ¤ndiger Name, Nickname, E-Mail-Adresse, IP-Adresse, Standortdaten und individuelle Benutzer-ID.","data_processing_consent_description":"Wir benГ¶tigen deine Zustimmung zur Verarbeitung deiner personenbezogenen Daten und der Cookie-Daten, um dir maГџgeschneiderte Dienste anbieten zu kГ¶nnen. Wenn du der Datenverarbeitung widersprichst, verwenden wir nur die Daten aus essenziellen Cookies, woraufhin du unsere Dienste nicht in vollem Umfang genieГџen kannst.","data_processing_consent_my_personal_data":"meine personenbezogenen Daten","data_processing_consent_partner_checkbox_tooltip":"Diese Seite nutzt Xsolla-Produkte. Xsolla verwaltet deinen personenbezogenen Daten, darunter von die von dir im Kundenportal angegebenen IdentitГ¤ts-, Kontakt- und Firmenangaben.","essential_cookies_checkbox":"Essenzielle Cookies","essential_cookies_description":"Diese Cookies sind fГјr das Funktionieren unserer Website sowie der Xsolla-Produkte notwendig und kГ¶nnen nicht deaktiviert werden. Dazu gehГ¶ren z.В B. Cookies fГјr das Anmelden bei deinem persГ¶nlichen Konto, den Kundensupport und den korrekten Ablauf der Zahlungsabwicklung. <br/> Du kannst deinen Browser so einstellen, dass er diese Cookies blockiert oder dich davor warnt, allerdings funktionieren dann einige Teile dieser Website mГ¶glicherweise nicht wie erwartet.","essential_cookies_list_link_name":"Liste der essenziellen Cookies","essential_cookies_tooltip":"Dieser Cookie-Typ lГ¤sst sich nicht deaktivieren.","functional_cookies_checkbox":"Funktionale Cookies","functional_cookies_description":"Mithilfe dieser Cookies kГ¶nnen wir deine Entscheidungen speichern, die du auf dieser Website oder in den Xsolla-Produkten getroffen hast. Das hilft uns dabei, bessere und personalisierte Funktionen bereitzustellen. Beispielsweise kГ¶nnen wir eine bestimmte Seite fГјr dich anpassen oder, auf deinen Wunsch hin, andere Dienste anbieten. <br/> Wenn du diese Cookies nicht akzeptierst, funktionieren einige oder alle dieser Funktionen mГ¶glicherweise nicht ordnungsgemГ¤Гџ.","functional_cookies_link_name":"Liste der funktionalen Cookies","opt_out_consent":"Ich habe verstanden, dass Xsolla meine personenbezogenen Daten innerhalb der {xsollaGroupConsentLink} weitergeben darf.","opt_out_consent_link_name":"Xsolla Group","opt_out_description":"Du hast das Recht, deine Einwilligung jederzeit zu Г¤ndern oder zu widerrufen. Der Widerruf der Einwilligung hat keinen Einfluss auf die RechtmГ¤Гџigkeit der bisherigen Verarbeitung, da diese auf einer vorherigen Einwilligung beruht.","opt_out_title":"Widersprechen","privacy_policy_link_name":"Datenschutzrichtlinie","return_button":"ZurГјck","save_and_close_button":"Speichern und schlieГџen","saving_button":"Wird gespeichert...","settings_button":"Einstellungen","settings_footer_description":"*Wenn das KontrollkГ¤stchen aktiviert ist, hast du die Auswahl bereits in einem anderen Xsolla-Produkt getroffen.","settings_title":"Datenschutzeinstellungen","targeting_cookies_checkbox":"Targeting-Cookies","targeting_cookies_description":"Diese Cookies erfassen die Seiten, die du auf dieser Website oder in den Xsolla- Produkten besucht hast, und die Links, auf die du geklickt hast. Wir verwenden diese Daten, um unsere Website und die darauf angezeigte Werbung entsprechend deiner Interessen relevanter zu gestalten. Zu diesem Zweck kГ¶nnen wir diese Daten auch an Dritte weitergeben. <br/> Wenn du diese Cookies nicht akzeptierst, wird dir zwar weiterhin Werbung angezeigt, jedoch ist diese nicht auf deine Interessen zugeschnitten.","targeting_cookies_link_name":"Liste der Targeting-Cookies","welcome_screen_allow_cookies":"Ich stimme der Nutzung von Cookies zu","welcome_screen_data_processing":"Ich willige ein, dass Xsolla {myPersonalDataTooltip} verwenden darf, um mir maГџgeschneiderte Dienstleistungen anzubieten","welcome_screen_description":"Du kannst deine Einwilligung jederzeit Г¤ndern oder widerrufen, wechsle dazu einfach in die Datenschutzeinstellungen.","welcome_screen_mobile_description":"Durch Klick auf \\"{acceptAllButtonText}\\" stimmst du zu, dass wir deine personenbezogenen Daten verarbeiten und Cookies setzen dГјrfen. Deine Vorgaben lassen sich unter \\"Einstellungen\\" Г¤ndern.","welcome_screen_title":"Wir respektieren den Datenschutz"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"essential_cookies_checkbox":"Essential cookies","essential_cookies_tooltip":"This type of cookies cannot be switched off.","analytical_performance_cookies_checkbox":"Analytical and performance cookies","functional_cookies_checkbox":"Functional cookies","targeting_cookies_checkbox":"Targeting cookies","settings_button":"Settings","settings_title":"Privacy settings","settings_footer_description":"*If the checkbox is selected, you have already made your choice in another Xsolla Product.","accept_all_button":"Accept all","return_button":"Return","save_and_close_button":"Save and close","saving_button":"Saving...","welcome_screen_title":"We respect your privacy","welcome_screen_description":"You can change or withdraw your consent at any time by going back to Privacy settings.","welcome_screen_mobile_description":"By clicking \\"{acceptAllButtonText}\\", you give us consent to process your personal data and set all cookies. Alternatively, you can customize your preferences in Settings.","welcome_screen_data_processing":"I give my consent to Xsolla to use {myPersonalDataTooltip} to offer customized services to me","welcome_screen_allow_cookies":"I agree to use cookies","data_processing_consent_checkbox":"Data processing consent","essential_cookies_description":"These cookies are necessary for our website and Xsolla Products to function and cannot be switched off. For example, they include cookies that enable you to log in to your personal account and cookies that provide correct payment processing flow and customer support. <br/> You can set your browser to block or alert you about these cookies, but then some parts of this website might not work as expected.","essential_cookies_list_link_name":"Essential cookies list","analytical_performance_cookies_description":"These cookies collect information about your use of this website and enable us to improve the way it works, as well as enhance your experience with other Xsolla Products. For example, we can ensure you easily find what you\'re looking for or record any difficulties you may have. <br/> If you don\'t accept these cookies, we won\'t know when you have visited our website and won\'t be able to monitor its performance.","analytical_performance_cookies_link_name":"Analytical and performance cookies list","functional_cookies_description":"These cookies allow us to remember the choices you make on our website or in Xsolla Products. This helps us provide enhanced and personalized features. For example, we can customize a certain page for you, or provide other services at your request. <br/> If you don\'t accept these cookies, some or all of these features might not function properly.","functional_cookies_link_name":"Functional cookies list","targeting_cookies_description":"These cookies record the pages you have visited on this website or in Xsolla Products and the links you have followed. We use this information to make our website and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose. <br/> If you do not accept these cookies, you will still see advertisements, but they wonвЂ™t be tailored to your interests.","targeting_cookies_link_name":"Targeting cookies list","data_processing_consent_description":"We need your consent to use your personal data and info from cookies to offer customized services to you. If you decide to opt out of data processing, we will only use the data from essential cookies and you won\'t be able to enjoy our services in full.","data_processing_consent_my_personal_data":"my personal data","data_processing_consent_customer_checkbox_tooltip":"This site is run on Xsolla Products. Xsolla manages your personal data, such as full name or nickname, email address, IP address, geolocation info, and unique user ID.","data_processing_consent_partner_checkbox_tooltip":"This site is run on Xsolla Products. Xsolla manages your personal data, such as identity and contact or business details provided by you in Publisher Account.","opt_out_title":"Opt out","opt_out_description":"You have the right to change or withdraw consent at any time. The withdrawal of consent doesn\'t affect the lawfulness of past processing, because it\'s based on prior consent.","opt_out_consent":"I understand that Xsolla may share my personal data within the {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Xsolla group","cookie_policy_link_name":"Cookie Policy","privacy_policy_link_name":"Privacy Policy"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Aceptar todas","analytical_performance_cookies_checkbox":"Cookies de anГЎlisis y de rendimiento","analytical_performance_cookies_description":"Estas cookies recopilan informaciГіn sobre el uso que haces de este sitio web y nos permiten mejorar su funcionamiento, asГ­ como mejorar tu experiencia con otros Productos Xsolla. Por ejemplo, podemos cerciorarnos de que encuentras fГЎcilmente lo que buscas o registrar cualquier dificultad que puedas encontrar. <br/> Si no aceptas estas cookies, no sabremos cuГЎndo has visitado nuestro sitio web y no podremos monitorizar el rendimiento de este.","analytical_performance_cookies_link_name":"Lista de cookies de anГЎlisis y de rendimiento","cookie_policy_link_name":"PolГ­tica de cookies","data_processing_consent_checkbox":"Consentimiento de tratamiento de datos","data_processing_consent_customer_checkbox_tooltip":"Este sitio web se ejecuta en Productos Xsolla. Xsolla gestiona tus datos personales, como el nombre completo o el apodo, la direcciГіn de correo electrГіnico, la direcciГіn IP, la informaciГіn de geolocalizaciГіn y el identificador de usuario Гєnico.","data_processing_consent_description":"Necesitamos tu consentimiento para usar tus datos personales e informaciГіn derivada de las cookies para ofrecerte servicios personalizados. Si decides ser excluido del procesamiento de datos, solo usaremos los datos de las cookies esenciales y no podrГЎs disfrutar de todos nuestros servicios.","data_processing_consent_my_personal_data":"mis datos personales","data_processing_consent_partner_checkbox_tooltip":"Este sitio web se ejecuta en Productos Xsolla. Xsolla gestiona tus datos personales, como la identidad y los datos de contacto o de negocio que proporcionaste en la Cuenta del editor.","essential_cookies_checkbox":"Cookies esenciales","essential_cookies_description":"Estas cookies son necesarias para que nuestro sitio web y los Productos Xsolla funcionen y no pueden desactivarse. Por ejemplo, incorporan cookies que te permiten acceder a su cuenta personal y cookies que facilitan un flujo de procesamiento de pagos adecuado y asistencia al cliente. <br/> Puedes configurar tu navegador para que bloquee estas cookies o te avise de ellas, pero entonces algunas zonas de este sitio web podrГ­an no funcionar como cabrГ­a esperar.","essential_cookies_list_link_name":"Lista de cookies esenciales","essential_cookies_tooltip":"Este tipo de cookies no puede desactivarse","functional_cookies_checkbox":"Cookies funcionales","functional_cookies_description":"Estas cookies nos permiten recordar las opciones que elegiste en nuestro sitio web o en Productos Xsolla. Esto nos ayuda a brindar funciones mejoradas y personalizadas. Por ejemplo, podemos personalizar determinada pГЎgina para ti o proporcionar otros servicios que solicites. <br/> Si no aceptas estas cookies, algunas de estas funciones o todas ellas podrГ­an no funcionar correctamente.","functional_cookies_link_name":"Lista de cookies funcionales","opt_out_consent":"Acepto que Xsolla podrГ­a compartir mis datos personales dentro del {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Grupo Xsolla","opt_out_description":"Tienes derecho a cambiar o revocar el consentimiento en cualquier momento. La revocaciГіn del consentimiento no afecta a la legalidad de los tratamientos anteriores, porque se basan en un consentimiento previo.","opt_out_title":"Excluirse","privacy_policy_link_name":"PolГ­tica de privacidad","return_button":"Volver","save_and_close_button":"Guardar y cerrar","saving_button":"Guardando...","settings_button":"Ajustes","settings_footer_description":"*Si la casilla estГЎ seleccionada, ya has tomado la decisiГіn en otro Producto Xsolla.","settings_title":"Ajustes de privacidad","targeting_cookies_checkbox":"Cookies de preferencias","targeting_cookies_description":"Estas cookies registran las pГЎginas que has visitado en este sitio web o en Productos Xsolla, y los enlaces que has pulsado. Usamos esta informaciГіn para que nuestro sitio web y la publicidad que aparece en este sea mГЎs relevante para tus intereses. TambiГ©n podemos compartir esta informaciГіn con terceros para este fin. <br/> Si no aceptas estas cookies, seguirГЎs viendo anuncios, pero no estarГЎn adaptados a tus intereses.","targeting_cookies_link_name":"Lista de cookies de preferencias","welcome_screen_allow_cookies":"Acepto el uso de cookies","welcome_screen_data_processing":"Doy mi consentimiento para que Xsolla use {myPersonalDataTooltip} para ofrecerme servicios personalizados.","welcome_screen_description":"Puede cambiar o revocar tu consentimiento en cualquier momento volviendo a los ajustes de Privacidad.","welcome_screen_mobile_description":"Al pulsar \\"{acceptAllButtonText}\\", nos das el consentimiento para procesar tus datos personales y colocar todas las cookies. De lo contrario, puedes personalizar tus preferencias en Ajustes.","welcome_screen_title":"Respetamos tu privacidad"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Accepter tous","analytical_performance_cookies_checkbox":"Cookies d\'analyse et de performance","analytical_performance_cookies_description":"Ces cookies collectent des informations sur votre utilisation de ce site web et nous permettent d\'amГ©liorer son fonctionnement, ainsi que d\'amГ©liorer votre expГ©rience avec les autres produits Xsolla. Par exemple, nous pouvons faire en sorte que vous trouviez facilement ce que vous cherchez ou enregistrer les difficultГ©s que vous pourriez rencontrer. <br/> Si vous n\'acceptez pas ces cookies, nous ne saurons pas quand vous avez visitГ© notre site web et nous ne pourrons pas en contrГґler les performances.","analytical_performance_cookies_link_name":"Liste des cookies d\'analyse et de performance","cookie_policy_link_name":"Politique relative aux cookies","data_processing_consent_checkbox":"Consentement au traitement des donnГ©es","data_processing_consent_customer_checkbox_tooltip":"Ce site est gГ©rГ© par les produits Xsolla. Xsolla gГЁre vos donnГ©es personnelles, telles que votre nom complet ou votre surnom, votre adresse Г©lectronique, votre adresse IP, vos informations de gГ©olocalisation et votre identifiant unique.","data_processing_consent_description":"Nous avons besoin de votre consentement pour utiliser vos donnГ©es personnelles et les informations provenant des cookies afin de vous offrir des services personnalisГ©s. Si vous dГ©cidez de ne pas participer au traitement des donnГ©es, nous n\'utiliserons que les donnГ©es provenant des cookies essentiels et vous ne pourrez pas profiter pleinement de nos services.","data_processing_consent_my_personal_data":"mes donnГ©es personnelles","data_processing_consent_partner_checkbox_tooltip":"Ce site est gГ©rГ© par les produits Xsolla. Xsolla gГЁre vos donnГ©es personnelles, telles que l\'identitГ© et les coordonnГ©es ou les coordonnГ©es professionnelles que vous avez fournies dans le Compte Г©diteur.","essential_cookies_checkbox":"Les cookies essentiels","essential_cookies_description":"Ces cookies sont nГ©cessaires au fonctionnement de notre site web et des produits Xsolla et ne peuvent pas ГЄtre dГ©sactivГ©s. Par exemple, ils comprennent des cookies qui vous permettent de vous connecter Г  votre compte personnel et des cookies qui assurent le bon dГ©roulement du traitement des paiements et l\'assistance Г  la clientГЁle. <br/> Vous pouvez configurer votre navigateur pour qu\'il bloque ou vous avertisse de l\'existence de ces cookies, mais certaines parties de ce site web pourraient alors ne pas fonctionner comme prГ©vu.","essential_cookies_list_link_name":"Liste des cookies essentiels","essential_cookies_tooltip":"Ce type de cookies ne peut pas ГЄtre dГ©sactivГ©.","functional_cookies_checkbox":"Cookies fonctionnels","functional_cookies_description":"Ces cookies nous permettent de nous souvenir des choix que vous faites sur notre site web ou dans Xsolla Products. Cela nous aide Г  fournir des fonctionnalitГ©s amГ©liorГ©es et personnalisГ©es. Par exemple, nous pouvons personnaliser une certaine page pour vous, ou fournir d\'autres services Г  votre demande. <br/> Si vous n\'acceptez pas ces cookies, certaines ou toutes ces fonctionnalitГ©s pourraient ne pas fonctionner correctement.","functional_cookies_link_name":"Liste des cookies fonctionnels","opt_out_consent":"Je comprends que Xsolla puisse partager mes donnГ©es personnelles au sein du {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Groupe Xsolla","opt_out_description":"Vous avez le droit de modifier ou de retirer votre consentement Г  tout moment. Le retrait du consentement n\'affecte pas la lГ©galitГ© du traitement passГ©, car il est basГ© sur un consentement prГ©alable.","opt_out_title":"Se retirer","privacy_policy_link_name":"Politique de confidentialitГ©","return_button":"Retour","save_and_close_button":"Enregistrer et fermer","saving_button":"Enregistrement...","settings_button":"ParamГЁtres","settings_footer_description":"*Si la case est cochГ©e, c\'est que vous avez dГ©jГ  fait votre choix dans un autre produit Xsolla.","settings_title":"ParamГЁtres de confidentialitГ©","targeting_cookies_checkbox":"Cookies de ciblage","targeting_cookies_description":"Ces cookies enregistrent les pages que vous avez visitГ©es sur ce site ou dans les produits Xsolla et les liens que vous avez suivis. Nous utilisons ces informations pour rendre notre site web et la publicitГ© qui y est affichГ©e plus pertinents par rapport Г  vos intГ©rГЄts. Nous pouvons Г©galement partager ces informations avec des tiers Г  cette fin. <br/> Si vous n\'acceptez pas ces cookies, vous verrez toujours des publicitГ©s, mais elles ne seront pas adaptГ©es Г  vos intГ©rГЄts.","targeting_cookies_link_name":"Liste des cookies de ciblage","welcome_screen_allow_cookies":"J\'accepte d\'utiliser des cookies","welcome_screen_data_processing":"Je consens Г  ce que Xsolla utilise {myPersonalDataTooltip} pour m\'offrir des services personnalisГ©s","welcome_screen_description":"Vous pouvez modifier ou retirer votre consentement Г  tout moment en retournant Г  la page ParamГЁtres de confidentialitГ©.","welcome_screen_mobile_description":"En cliquant sur В«{acceptAllButtonText}В», vous nous autorisez Г  traiter vos donnГ©es personnelles et Г  installer tous les cookies. Vous pouvez Г©galement personnaliser vos prГ©fГ©rences dans les paramГЁtres.","welcome_screen_title":"Nous respectons votre vie privГ©e"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Ч”ЧЎЧ›ЧћЧ” ЧњЧ›Чњ Ч”Ч§Ч‘Ч¦Ч™Чќ","analytical_performance_cookies_checkbox":"Ч§Ч•Ч‘Ч¦Ч™ Cookie ЧњЧ Ч™ЧЄЧ•Ч—Ч™Чќ Ч•ЧњЧ‘Ч™Ч¦Ч•ЧўЧ™Чќ","analytical_performance_cookies_description":"Ч§Ч•Ч‘Ч¦Ч™ cookie ЧђЧњЧ” ЧђЧ•ЧЎЧ¤Ч™Чќ ЧћЧ™Ч“Чў Ч‘Ч™Ч—ЧЎ ЧњЧ©Ч™ЧћЧ•Ч© Ч©ЧњЧљ Ч‘ЧђЧЄЧЁ Ч–Ч”, Ч•ЧћЧђЧ¤Ч©ЧЁЧ™Чќ ЧњЧ Ч• ЧњЧ©Ч¤ЧЁ ЧђЧЄ Ч¤ЧўЧ•ЧњЧЄЧ• Ч•Ч›Чџ ЧњЧ©Ч¤ЧЁ ЧђЧЄ Ч—Ч•Ч•Ч™Ч™ЧЄ Ч”Ч©Ч™ЧћЧ•Ч© Ч©ЧњЧљ Ч‘ЧћЧ•Ч¦ЧЁЧ™Чќ ЧђЧ—ЧЁЧ™Чќ Ч©Чњ Xsolla. ЧњЧ“Ч•Ч’ЧћЧ”, Ч Ч•Ч›Чњ ЧњЧђЧ¤Ч©ЧЁ ЧњЧљ ЧњЧћЧ¦Ч•Чђ ЧћЧ™Ч“Чў Ч‘Ч§ЧњЧ•ЧЄ ЧђЧ• ЧњЧЄЧўЧ“ Ч‘ЧўЧ™Ч•ЧЄ ЧђЧ¤Ч©ЧЁЧ™Ч•ЧЄ. <br/> ЧђЧќ ЧњЧђ ЧћЧђЧ©ЧЁЧ™Чќ ЧђЧЄ Ч§Ч•Ч‘Ч¦Ч™ Ч”-cookie Ч”ЧђЧњЧ”, ЧњЧђ Ч Ч•Ч›Чњ ЧњЧ“ЧўЧЄ ЧћЧЄЧ™ Ч‘Ч—ЧЁЧЄ ЧњЧ”Ч™Ч›Ч ЧЎ ЧњЧђЧЄЧЁ Ч©ЧњЧ Ч• Ч•ЧњЧђ Ч Ч•Ч›Чњ ЧњЧўЧ§Ч•Ч‘ ЧђЧ—ЧЁ Ч‘Ч™Ч¦Ч•ЧўЧ™ Ч”ЧђЧЄЧЁ.","analytical_performance_cookies_link_name":"ЧЁЧ©Ч™ЧћЧ” Ч©Чњ Ч§Ч•Ч‘Ч¦Ч™ Cookie ЧњЧ Ч™ЧЄЧ•Ч—Ч™Чќ Ч•ЧњЧ‘Ч™Ч¦Ч•ЧўЧ™Чќ","cookie_policy_link_name":"ЧћЧ“Ч™Ч Ч™Ч•ЧЄ ЧњЧ©Ч™ЧћЧ•Ч© Ч‘Ч§Ч•Ч‘Ч¦Ч™ Cookie","data_processing_consent_checkbox":"Ч”ЧЎЧ›ЧћЧ” ЧњЧўЧ™Ч‘Ч•Ч“ Ч ЧЄЧ•Ч Ч™Чќ","data_processing_consent_customer_checkbox_tooltip":"ЧђЧЄЧЁ Ч–Ч” ЧћЧ•Ч¤ЧўЧњ Ч‘ЧћЧ•Ч¦ЧЁЧ™ Xsolla. Ч—Ч‘ЧЁЧЄ Xsolla ЧћЧ Ч”ЧњЧЄ ЧђЧЄ Ч”Ч ЧЄЧ•Ч Ч™Чќ Ч”ЧђЧ™Ч©Ч™Ч™Чќ Ч©ЧњЧљ вЂ“ Ч›ЧћЧ• Ч©ЧћЧљ Ч”ЧћЧњЧђ ЧђЧ• Ч”Ч›Ч™Ч Ч•Ч™ Ч©ЧњЧљ, Ч›ЧЄЧ•Ч‘ЧЄ Ч”ЧђЧ™ЧћЧ™Ч™Чњ Ч•Ч›ЧЄЧ•Ч‘ЧЄ Ч”-IP Ч©ЧњЧљ, ЧћЧ™Ч“Чў ЧњЧ’Ч‘Ч™ Ч”ЧћЧ™Ч§Ч•Чќ Ч”Ч’Ч™ЧђЧ•Ч’ЧЁЧ¤Ч™ Ч©ЧњЧљ Ч•ЧћЧ–Ч”Ч” Ч”ЧћЧ©ЧЄЧћЧ© Ч”Ч™Ч™Ч—Ч•Ч“Ч™ ЧњЧљ.","data_processing_consent_description":"ЧўЧњ ЧћЧ ЧЄ Ч©Ч Ч•Ч›Чњ ЧњЧ”ЧЄЧђЧ™Чќ ЧђЧЄ Ч”Ч©Ч™ЧЁЧ•ЧЄЧ™Чќ Ч©ЧњЧ Ч• ЧњЧљ Ч‘ЧђЧ•Ч¤Чџ ЧђЧ™Ч©Ч™, Ч“ЧЁЧ•Ч©Ч” ЧњЧ Ч• Ч”ЧЎЧ›ЧћЧЄЧљ ЧњЧ”Ч©ЧЄЧћЧ© Ч‘Ч ЧЄЧ•Ч Ч™Чќ Ч”ЧђЧ™Ч©Ч™Ч™Чќ Ч©ЧњЧљ Ч•Ч‘ЧћЧ™Ч“Чў Ч©Ч Ч’Ч–ЧЁ ЧћЧ§Ч•Ч‘Ч¦Ч™ cookie. ЧђЧќ ЧњЧђ Ч Ч§Ч‘Чњ ЧђЧЄ ЧђЧ™Ч©Ч•ЧЁЧљ ЧњЧўЧ™Ч‘Ч•Ч“ Ч”Ч ЧЄЧ•Ч Ч™Чќ, Ч Ч•Ч›Чњ ЧњЧ”Ч©ЧЄЧћЧ© ЧЁЧ§ Ч‘Ч ЧЄЧ•Ч Ч™Чќ Ч©Ч Ч’Ч–ЧЁЧ™Чќ ЧћЧ§Ч•Ч‘Ч¦Ч™ cookie Ч Ч—Ч•Ч¦Ч™Чќ Ч•ЧњЧђ ЧЄЧ”Ч™Ч” ЧњЧљ ЧђЧ¤Ч©ЧЁЧ•ЧЄ ЧњЧ™Ч”Ч Ч•ЧЄ ЧћЧћЧњЧ•Чђ Ч—Ч•Ч•Ч™Ч™ЧЄ Ч”Ч©Ч™ЧћЧ•Ч© Ч‘Ч©Ч™ЧЁЧ•ЧЄЧ™Чќ Ч©ЧњЧ Ч•.","data_processing_consent_my_personal_data":"Ч ЧЄЧ•Ч Ч™Чќ Ч”ЧђЧ™Ч©Ч™Ч™Чќ Ч©ЧњЧ™","data_processing_consent_partner_checkbox_tooltip":"ЧђЧЄЧЁ Ч–Ч” Ч¤Ч•ЧўЧњ Ч‘ЧћЧ•Ч¦ЧЁЧ™ Xsolla. Ч—Ч‘ЧЁЧЄ Xsolla ЧћЧ Ч”ЧњЧЄ ЧђЧЄ Ч”Ч ЧЄЧ•Ч Ч™Чќ Ч”ЧђЧ™Ч©Ч™Ч™Чќ Ч©ЧњЧљ, Ч“Ч•Ч’ЧћЧЄ Ч–Ч”Ч•ЧЄЧљ Ч•Ч¤ЧЁЧЧ™ Ч”Ч§Ч©ЧЁ Ч©ЧњЧљ ЧђЧ• Ч¤ЧЁЧЧ™Чќ ЧўЧЎЧ§Ч™Ч™Чќ Ч©ЧњЧљ, Ч›Ч¤Ч™ Ч©ЧЎЧ™Ч¤Ч§ЧЄ Ч‘Ч—Ч©Ч‘Ч•Чџ Ч‘ЧўЧњ Ч”ЧђЧЄЧЁ Ч©ЧњЧљ.","essential_cookies_checkbox":"Ч§Ч•Ч‘Ч¦Ч™ Cookie Ч Ч—Ч•Ч¦Ч™Чќ","essential_cookies_description":"ЧђЧњЧ• Ч§Ч•Ч‘Ч¦Ч™ cookie Ч”Ч Ч—Ч•Ч¦Ч™Чќ ЧњЧЄЧ¤ЧўЧ•Чњ Ч”ЧЄЧ§Ч™Чџ Ч©Чњ Ч”ЧђЧЄЧЁ Ч•Ч©Чњ ЧћЧ•Ч¦ЧЁЧ™ Xsolla, Ч•ЧњЧђ Ч Ч™ЧЄЧџ ЧњЧ”Ч©Ч‘Ч™ЧЄЧќ. ЧњЧ“Ч•Ч’ЧћЧ”, Ч”Чќ Ч›Ч•ЧњЧњЧ™Чќ Ч§Ч•Ч‘Ч¦Ч™ cookie Ч©ЧћЧђЧ¤Ч©ЧЁЧ™Чќ ЧњЧљ ЧњЧ”ЧЄЧ—Ч‘ЧЁ ЧњЧ—Ч©Ч‘Ч•Ч Чљ Ч”ЧђЧ™Ч©Ч™, Ч•Ч›Чџ Ч§Ч•Ч‘Ч¦Ч™ cookie Ч©ЧћЧЎЧ¤Ч§Ч™Чќ ЧЄЧ”ЧњЧ™Чљ Ч”Ч•ЧњЧќ ЧњЧўЧ™Ч‘Ч•Ч“ ЧЄЧ©ЧњЧ•ЧћЧ™Чќ Ч•ЧњЧЄЧћЧ™Ч›Ч” Ч‘ЧњЧ§Ч•Ч—Ч•ЧЄ. <br/> Ч‘ЧђЧ¤Ч©ЧЁЧ•ЧЄЧљ ЧњЧ”Ч’Ч“Ч™ЧЁ ЧђЧЄ Ч”Ч“Ч¤Ч“Ч¤Чџ ЧњЧ—ЧЎЧ™ЧћЧЄ Ч§Ч•Ч‘Ч¦Ч™ cookie ЧђЧњЧ” ЧђЧ• ЧњЧ§Ч‘ЧњЧЄ Ч”ЧЄЧЁЧђЧ” ЧњЧ’Ч‘Ч™Ч”Чќ, ЧђЧљ Ч‘ЧћЧ§ЧЁЧ” Ч›Ч–Ч”, Ч™Ч™ЧЄЧ›Чџ Ч©Ч—ЧњЧ§Ч™Чќ ЧћЧЎЧ•Ч™ЧћЧ™Чќ Ч‘ЧђЧЄЧЁ Ч”Ч–Ч” ЧњЧђ Ч™ЧўЧ‘Ч“Ч• Ч›Ч”ЧњЧ›Ч” Ч•Ч›Ч¤Ч™ Ч”ЧћЧ¦Ч•Ч¤Ч”.","essential_cookies_list_link_name":"ЧЁЧ©Ч™ЧћЧ” Ч©Чњ Ч§Ч•Ч‘Ч¦Ч™ Cookie Ч Ч—Ч•Ч¦Ч™Чќ","essential_cookies_tooltip":"ЧњЧђ Ч Ч™ЧЄЧџ ЧњЧ”Ч©Ч‘Ч™ЧЄ Ч§Ч•Ч‘Ч¦Ч™ Cookie ЧћЧЎЧ•Ч’ Ч–Ч”.","functional_cookies_checkbox":"Ч§Ч•Ч‘Ч¦Ч™ Cookie Ч¤Ч•Ч Ч§Ч¦Ч™Ч•Ч ЧњЧ™Ч™Чќ","functional_cookies_description":"Ч§Ч•Ч‘Ч¦Ч™ cookie ЧђЧњЧ” ЧћЧђЧ¤Ч©ЧЁЧ™Чќ ЧњЧ Ч• ЧњЧ–Ч›Ч•ЧЁ ЧђЧЄ Ч”Ч‘Ч—Ч™ЧЁЧ•ЧЄ Ч©ЧњЧљ Ч‘ЧђЧЄЧЁ Ч©ЧњЧ Ч• ЧђЧ• Ч‘ЧћЧ•Ч¦ЧЁЧ™ Xsolla. Ч›Чљ ЧђЧ Ч—Ч Ч• Ч™Ч›Ч•ЧњЧ™Чќ ЧњЧ”Ч¦Ч™Чў ЧњЧљ Ч¤Ч™Ч¦\'ЧЁЧ™Чќ ЧћЧ©Ч•Ч¤ЧЁЧ™Чќ Ч•ЧћЧ•ЧЄЧђЧћЧ™Чќ ЧђЧ™Ч©Ч™ЧЄ. ЧњЧ“Ч•Ч’ЧћЧ”, ЧђЧ Ч—Ч Ч• Ч™Ч›Ч•ЧњЧ™Чќ ЧњЧ”ЧЄЧђЧ™Чќ Ч“ЧЈ ЧћЧЎЧ•Ч™Чќ ЧђЧ™Ч©Ч™ЧЄ ЧњЧљ, ЧђЧ• ЧњЧЎЧ¤Ч§ ЧњЧљ Ч©Ч™ЧЁЧ•ЧЄЧ™Чќ ЧђЧ—ЧЁЧ™Чќ ЧњЧ‘Ч§Ч©ЧЄЧљ. <br/> ЧђЧќ ЧњЧђ Ч Ч§Ч‘Чњ ЧђЧЄ Ч”ЧЎЧ›ЧћЧЄЧљ ЧњЧ§Ч•Ч‘Ч¦Ч™ cookie ЧђЧњЧ”, Ч™Ч™ЧЄЧ›Чџ Ч©Ч—ЧњЧ§ ЧћЧ”ЧЄЧ›Ч•Ч Ч•ЧЄ Ч”ЧђЧњЧ•, ЧђЧ• Ч›Ч•ЧњЧџ, ЧњЧђ Ч™Ч¤ЧўЧњЧ• Ч›Ч”ЧњЧ›Ч”.","functional_cookies_link_name":"ЧЁЧ©Ч™ЧћЧ” Ч©Чњ Ч§Ч•Ч‘Ч¦Ч™ Cookie Ч¤Ч•Ч Ч§Ч¦Ч™Ч•Ч ЧњЧ™Ч™Чќ","opt_out_consent":"ЧћЧ•Ч‘Чџ ЧњЧ™ Ч›Ч™ Xsolla ЧўЧ©Ч•Ч™Ч” ЧњЧ©ЧЄЧЈ ЧђЧЄ Ч”Ч ЧЄЧ•Ч Ч™Чќ Ч”ЧђЧ™Ч©Ч™Ч™Чќ Ч©ЧњЧ™ ЧўЧќ Ч’Ч•ЧЁЧћЧ™Чќ ЧћЧЄЧ•Чљ {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Ч§Ч‘Ч•Ч¦ЧЄ Xsolla","opt_out_description":"ЧўЧ•ЧћЧ“ЧЄ ЧњЧљ Ч”Ч–Ч›Ч•ЧЄ ЧњЧ©Ч Ч•ЧЄ ЧђЧ• ЧњЧ‘ЧЧњ ЧђЧЄ Ч”ЧЎЧ›ЧћЧЄЧљ Ч‘Ч›Чњ ЧўЧЄ. Ч‘Ч™ЧЧ•Чњ Ч”Ч”ЧЎЧ›ЧћЧ” ЧђЧ™Ч Ч• ЧћЧ©Ч¤Ч™Чў ЧўЧњ Ч”Ч—Ч•Ч§Ч™Ч•ЧЄ Ч©Чњ Ч¤ЧўЧ•ЧњЧ•ЧЄ ЧўЧ™Ч‘Ч•Ч“ Ч©Ч‘Ч•Ч¦ЧўЧ• Ч‘ЧўЧ‘ЧЁ, Ч©Ч›Чџ Ч”Чџ ЧћЧ‘Ч•ЧЎЧЎЧ•ЧЄ ЧўЧњ Ч”ЧЎЧ›ЧћЧ” Ч§Ч•Ч“ЧћЧЄ Ч©Ч Ч™ЧЄЧ Ч” ЧўЧњ-Ч™Ч“Чљ.","opt_out_title":"Ч‘Ч™ЧЧ•Чњ Ч”ЧЎЧ›ЧћЧ”","privacy_policy_link_name":"ЧћЧ“Ч™Ч Ч™Ч•ЧЄ Ч”Ч¤ЧЁЧЧ™Ч•ЧЄ","return_button":"Ч—Ч–ЧЁЧ”","save_and_close_button":"Ч©ЧћЧ™ЧЁЧ” Ч•ЧЎЧ’Ч™ЧЁЧ”","saving_button":"ЧћЧЄЧ‘Ч¦ЧўЧЄ Ч©ЧћЧ™ЧЁЧ”...","settings_button":"Ч”Ч’Ч“ЧЁЧ•ЧЄ","settings_footer_description":"*ЧђЧќ Ч”ЧЄЧ™Ч‘Ч” Ч”Ч–Ч• ЧћЧЎЧ•ЧћЧ ЧЄ, Ч¤Ч™ЧЁЧ•Ч© Ч”Ч“Ч‘ЧЁ Ч©Ч›Ч‘ЧЁ Ч‘Ч—ЧЁЧЄ Ч‘Ч” Ч•ЧЎЧ™ЧћЧ ЧЄ ЧђЧ•ЧЄЧ” Ч‘ЧћЧ•Ч¦ЧЁ ЧђЧ—ЧЁ Ч©Чњ Xsolla.","settings_title":"Ч”Ч’Ч“ЧЁЧ•ЧЄ Ч¤ЧЁЧЧ™Ч•ЦјЧЄ","targeting_cookies_checkbox":"Ч§Ч•Ч‘Ч¦Ч™ Cookie ЧњЧћЧ™Ч§Ч•Ч“","targeting_cookies_description":"Ч§Ч•Ч‘Ч¦Ч™ cookie ЧђЧњЧ• ЧћЧЄЧўЧ“Ч™Чќ ЧђЧЄ Ч”Ч“Ч¤Ч™Чќ Ч©Ч‘Ч”Чќ Ч‘Ч™Ч§ЧЁЧЄ Ч‘ЧђЧЄЧЁ Ч–Ч” ЧђЧ• Ч‘ЧћЧ•Ч¦ЧЁЧ™ Xsolla Ч•Ч§Ч™Ч©Ч•ЧЁЧ™Чќ Ч©ЧўЧњЧ™Ч”Чќ ЧњЧ—Ч¦ЧЄ. ЧђЧ Ч—Ч Ч• ЧћЧ©ЧЄЧћЧ©Ч™Чќ Ч‘ЧћЧ™Ч“Чў Ч”Ч–Ч” Ч›Ч“Ч™ ЧњЧ”Ч¤Ч•Чљ ЧђЧЄ Ч”ЧђЧЄЧЁ Ч•ЧђЧЄ Ч”ЧћЧ•Ч“ЧўЧ•ЧЄ Ч©ЧћЧ•Ч¦Ч’Ч•ЧЄ Ч‘Ч• ЧњЧЁЧњЧ•Ч•Ч ЧЧ™Ч™Чќ Ч™Ч•ЧЄЧЁ ЧњЧЄЧ—Ч•ЧћЧ™ Ч”ЧўЧ Ч™Ч™Чџ Ч©ЧњЧљ. ЧђЧ Ч—Ч Ч• Ч’Чќ ЧўЧ©Ч•Ч™Ч™Чќ ЧњЧ©ЧЄЧЈ ЧћЧ™Ч“Чў Ч–Ч” ЧўЧќ Ч’Ч•ЧЁЧћЧ™ Ч¦Ч“ Ч©ЧњЧ™Ч©Ч™ ЧњЧ¦Ч•ЧЁЧљ ЧћЧЧЁЧ” Ч–Ч•. <br/> ЧђЧќ ЧњЧђ ЧЄЧ™Ч ЧЄЧџ Ч”ЧЎЧ›ЧћЧЄЧљ ЧњЧ§Ч•Ч‘Ч¦Ч™ cookie ЧђЧњЧ”, ЧўЧ“Ч™Ч™Чџ Ч™Ч•Ч¦Ч’Ч• ЧњЧљ Ч¤ЧЁЧЎЧ•ЧћЧ•ЧЄ ЧђЧљ Ч”Чџ ЧњЧђ Ч™Ч•ЧЄЧђЧћЧ• ЧњЧЄЧ—Ч•ЧћЧ™ Ч”ЧўЧ Ч™Ч™Чџ Ч©ЧњЧљ.","targeting_cookies_link_name":"ЧЁЧ©Ч™ЧћЧ” Ч©Чњ Ч§Ч•Ч‘Ч¦Ч™ Cookie ЧњЧћЧ™Ч§Ч•Ч“","welcome_screen_allow_cookies":"ЧђЧ Ч™ ЧћЧЁЧ©Ч” ЧњЧ”Ч©ЧЄЧћЧ© Ч‘Ч§Ч•Ч‘Ч¦Ч™ Cookie","welcome_screen_data_processing":"ЧђЧ Ч™ ЧћЧЁЧ©Ч” Чњ-Xsolla ЧњЧ”Ч©ЧЄЧћЧ© Ч‘{myPersonalDataTooltip} Ч›Ч“Ч™ ЧњЧ”ЧЄЧђЧ™Чќ ЧђЧ™Ч©Ч™ЧЄ ЧђЧЄ Ч”Ч©Ч™ЧЁЧ•ЧЄЧ™Чќ Ч©ЧњЧ” ЧђЧњЧ™Ч™","welcome_screen_description":"Ч‘ЧђЧ¤Ч©ЧЁЧ•ЧЄЧљ ЧњЧ©Ч Ч•ЧЄ ЧђЧЄ ЧњЧ‘ЧЧњ ЧђЧЄ Ч”ЧЎЧ›ЧћЧЄЧљ Ч‘Ч›Чњ ЧўЧЄ, Ч“ЧЁЧљ Ч”Ч’Ч“ЧЁЧ•ЧЄ Ч”Ч¤ЧЁЧЧ™Ч•ЦјЧЄ.","welcome_screen_mobile_description":"ЧњЧ—Ч™Ч¦Ч” ЧўЧњ \\"{acceptAllButtonText}\\" ЧћЧ‘ЧЧђЧЄ ЧђЧЄ Ч”ЧЎЧ›ЧћЧЄЧљ ЧњЧђЧ¤Ч©ЧЁ ЧњЧ Ч• ЧњЧўЧ‘Ч“ ЧђЧЄ Ч”Ч ЧЄЧ•Ч Ч™Чќ Ч”ЧђЧ™Ч©Ч™Ч™Чќ Ч©ЧњЧљ Ч•ЧњЧ”Ч’Ч“Ч™ЧЁ ЧђЧЄ Ч›Чњ Ч§Ч•Ч‘Ч¦Ч™ Ч”-Cookie. ЧњЧ—ЧњЧ•Ч¤Ч™Чџ, Ч‘ЧђЧ¤Ч©ЧЁЧ•ЧЄЧљ ЧњЧ”ЧЄЧђЧ™Чќ ЧђЧЄ Ч”Ч”ЧўЧ“Ч¤Ч•ЧЄ Ч©ЧњЧљ, Ч“ЧЁЧљ Ч”Ч§ЧЧў \'Ч”Ч’Ч“ЧЁЧ•ЧЄ\'.","welcome_screen_title":"ЧђЧ Ч—Ч Ч• ЧћЧ›Ч‘Ч“Ч™Чќ ЧђЧЄ Ч”Ч¤ЧЁЧЧ™Ч•ЧЄ Ч©ЧњЧљ"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"agree":"EgyetГ©rtek","disagree":"Nem Г©rtek egyet","message":"Beleegyezem <a href=\\"%1$s\\">a szemГ©lyes adataim</a> feldolgozГЎsГЎba Г©s elfogadom az <a href=\\"%2$s\\">AdatvГ©delmi irГЎnyelveket</a>"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Accetta tutto","analytical_performance_cookies_checkbox":"Cookie analitici e di prestazione","analytical_performance_cookies_description":"Questi cookie raccolgono informazioni sull\'utilizzo di questo sito web e ci permettono di migliorare il suo funzionamento, oltre a migliorare la tua esperienza con altri Prodotti Xsolla. Ad esempio, possiamo assicurare che trovi facilmente ciГІ che stai cercando o registrare eventuali difficoltГ  incontrate. <br/> Se non si accettano questi cookie, non sapremo quando ГЁ stato visitato il nostro sito web e non saremo in grado di monitorarne le prestazioni.","analytical_performance_cookies_link_name":"Lista dei cookie analitici e di prestazione","cookie_policy_link_name":"Cookie Policy","data_processing_consent_checkbox":"Consenso all\'elaborazione dei dati","data_processing_consent_customer_checkbox_tooltip":"Questo sito viene eseguito sui Prodotti Xsolla. Xsolla gestisce i tuoi dati personali quali nome e cognome o nickname, indirizzo e-mail, indirizzo IP, info di georilevazione e ID utente univoco.","data_processing_consent_description":"Abbiamo bisogno del tuo consenso per utilizzare i tuoi dati personali e le informazioni dei cookie per offrirti servizi personalizzati. Se decidi di rinunciare al trattamento dei dati, utilizzeremo solo i dati dei cookie essenziali e non potrai godere appieno dei nostri servizi.","data_processing_consent_my_personal_data":"i miei dati personali","data_processing_consent_partner_checkbox_tooltip":"Questo sito viene eseguito sui Prodotti Xsolla. Xsolla gestisce i tuoi dati personali, quali identitГ  e contatto o dettagli aziendali forniti dal tuo Account Editore.","essential_cookies_checkbox":"Cookie essenziali","essential_cookies_description":"Questi cookie sono necessari per il funzionamento del nostro sito web e dei Prodotti Xsolla e non possono essere disattivati. Ad esempio, includono cookie che ti consentono di accedere al tuo account personale e cookie che forniscono il corretto flusso di elaborazione dei pagamenti e l\'assistenza clienti. <br/> Г€ possibile impostare il browser in modo da bloccare o avvertire l\'utente di questi cookie, ma alcune parti di questo sito web potrebbero non funzionare come previsto.","essential_cookies_list_link_name":"Lista cookie essenziali","essential_cookies_tooltip":"Questo tipo di cookie non possono essere disattivati.","functional_cookies_checkbox":"Cookie funzionali","functional_cookies_description":"Questi cookie ci permettono di ricordare le scelte che fai sul nostro sito web o nei Prodotti Xsolla. Questo ci aiuta a fornire funzionalitГ  avanzate e personalizzate. Ad esempio, possiamo personalizzare una determinata pagina per te o fornire altri servizi su tua richiesta. <br/> Se non accetti questi cookie, alcune o tutte queste funzioni potrebbero non funzionare correttamente.","functional_cookies_link_name":"Lista cookie funzionali","opt_out_consent":"Sono consapevole che Xsolla puГІ condividere i miei dati personali all\'interno di {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Gruppo Xsolla","opt_out_description":"Hai il diritto di modificare o revocare il consenso in qualunque momento. La revoca del consenso non pregiudica la liceitГ  del trattamentoВ precedente in quanto ГЁ basato sul consenso prima della revoca.","opt_out_title":"Rifiuta","privacy_policy_link_name":"Informativa sulla Privacy","return_button":"Indietro","save_and_close_button":"Chiudi e salva","saving_button":"Salvataggio in corso...","settings_button":"Impostazioni","settings_footer_description":"*Se questa casella di controllo ГЁ selezionata, hai giГ  effettuato la tua scelta in un altro Prodotto Xsolla.","settings_title":"Impostazioni sulla Privacy","targeting_cookies_checkbox":"Cookie di targeting","targeting_cookies_description":"Questi cookie registrano le pagine che hai visitato su questo sito web o sui Prodotti Xsolla e i link che hai seguito. Utilizziamo queste informazioni per rendere il nostro sito web e la pubblicitГ  visualizzata su questo, piГ№ pertinente ai tuoi interessi. A tale scopo, potremmo anche condividere queste informazioni con terzi. <br/> Se non accetti questi cookie, vedrai comunque delle pubblicitГ , ma non saranno personalizzate in base ai tuoi interessi.","targeting_cookies_link_name":"Lista cookie di targeting","welcome_screen_allow_cookies":"Acconsento all\'uso dei cookie","welcome_screen_data_processing":"Acconsento affinchГ© Xsolla usi {myPersonalDataTooltip} per offrirmi servizi personalizzati","welcome_screen_description":"Puoi modificare o revocare il tuo consenso in qualunque momento tornando alle impostazioni sulla Privacy.","welcome_screen_mobile_description":"Cliccando \\"{acceptAllButtonText}\\", ci dai il tuo consenso all\'elaborazione dei tuoi dati personali e impostare tutti i cookie. In alternativa puoi personalizzare le tue preferenze sulle Impostazioni.","welcome_screen_title":"Rispettiamo la tua privacy"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"е…ЁгЃ¦г‚’еЏ—гЃ‘е…Ґг‚Њг‚‹","analytical_performance_cookies_checkbox":"е€†жћђг‚Їгѓѓг‚­гѓјгЃЁгѓ‘гѓ•г‚©гѓјгѓћгѓіг‚№г‚Їгѓѓг‚­гѓј","analytical_performance_cookies_description":"гЃ“г‚Њг‚‰гЃ®г‚Їгѓѓг‚­гѓјгЃЇгЂЃгЃЉе®ўж§гЃ®жњ¬г‚¦г‚§гѓ–г‚µг‚¤гѓ€гЃ®гЃ”е€©з”ЁгЃ«й–ўгЃ™г‚‹жѓ…е ±г‚’еЏЋй›†гЃ—гЂЃжњ¬г‚¦г‚§гѓ–г‚µг‚¤гѓ€гЃ®е‹•дЅњж–№жі•г‚’ж”№е–„гЃ—гЃџг‚ЉгЂЃд»–гЃ®г‚Ёг‚Їг‚Ѕгѓ©иЈЅе“ЃгЃ§гЃ®дЅ“йЁ“г‚’еђ‘дёЉгЃ•гЃ›гЃџг‚ЉгЃ™г‚‹гЃ“гЃЁгЃЊгЃ§гЃЌгЃѕгЃ™гЂ‚дѕ‹гЃ€гЃ°гЂЃгЃЉе®ўж§гЃЊжЋўгЃ—гЃ¦гЃ„г‚‹г‚‚гЃ®г‚’з°ЎеЌгЃ«и¦‹гЃ¤гЃ‘гЃџг‚ЉгЂЃе›°й›ЈгЃЄз‚№г‚’иЁйЊІгЃ—гЃџг‚ЉгЃ™г‚‹гЃ“гЃЁгЃЊгЃ§гЃЌгЃѕгЃ™гЂ‚<br/>гЃ“г‚Њг‚‰гЃ®г‚Їгѓѓг‚­гѓјг‚’еЏ—гЃ‘е…Ґг‚ЊгЃЄгЃ„е ґеђ€гЃЇгЂЃгЃЉе®ўж§гЃЊгЃ„гЃ¤еЅ“з¤ѕгЃ®г‚¦г‚§гѓ–г‚µг‚¤гѓ€г‚’иЁЄе•ЏгЃ—гЃџгЃ‹г‚’зџҐг‚‹гЃ“гЃЁгЃЊгЃ§гЃЌгЃљгЂЃгЃќгЃ®гѓ‘гѓ•г‚©гѓјгѓћгѓіг‚№г‚’з›Ји¦–гЃ™г‚‹гЃ“гЃЁгЃЊгЃ§гЃЌгЃѕгЃ›г‚“гЂ‚","analytical_performance_cookies_link_name":"е€†жћђг‚Їгѓѓг‚­гѓјгЃЁгѓ‘гѓ•г‚©гѓјгѓћгѓіг‚№г‚Їгѓѓг‚­гѓјгѓЄг‚№гѓ€","cookie_policy_link_name":"г‚Їгѓѓг‚­гѓјгѓќгѓЄг‚·гѓј","data_processing_consent_checkbox":"гѓ‡гѓјг‚їе‡¦зђ†гЃ®еђЊж„Џ","data_processing_consent_customer_checkbox_tooltip":"гЃ“гЃ®г‚µг‚¤гѓ€гЃЇг‚Ёг‚Їг‚Ѕгѓ©иЈЅе“ЃдёЉгЃ§йЃ‹е–¶гЃ•г‚ЊгЃ¦гЃ„гЃѕгЃ™гЂ‚г‚Ёг‚Їг‚Ѕгѓ©гЃЇгЂЃгѓ•гѓ«гѓЌгѓјгѓ г‚„гѓ‹гѓѓг‚ЇгѓЌгѓјгѓ гЂЃгѓЎгѓјгѓ«г‚ўгѓ‰гѓ¬г‚№гЂЃIPг‚ўгѓ‰гѓ¬г‚№гЂЃг‚ёг‚Єгѓ­г‚±гѓјг‚·гѓ§гѓіжѓ…е ±гЂЃгѓ¦гѓ‹гѓјг‚Їгѓ¦гѓјг‚¶гѓјIDгЃЄгЃ©гЃ®еЂ‹дєєгѓ‡гѓјг‚їг‚’з®Ўзђ†гЃ—гЃ¦гЃ„гЃѕгЃ™гЂ‚","data_processing_consent_description":"гЃЉе®ўж§гЃ«г‚«г‚№г‚їгѓћг‚¤г‚єгЃ•г‚ЊгЃџг‚µгѓјгѓ“г‚№г‚’жЏђдѕ›гЃ™г‚‹гЃџг‚ЃгЃ«гЂЃгЃЉе®ўж§гЃ®еЂ‹дєєгѓ‡гѓјг‚їгЃЁг‚Їгѓѓг‚­гѓјгЃ‹г‚‰гЃ®жѓ…е ±г‚’дЅїз”ЁгЃ™г‚‹гЃ«гЃЇгЂЃгЃЉе®ўж§гЃ®еђЊж„ЏгЃЊеї…и¦ЃгЃ§гЃ™гЂ‚гЃЉе®ўж§гЃЊгѓ‡гѓјг‚їе‡¦зђ†г‚’г‚Єгѓ—гѓ€г‚ўг‚¦гѓ€гЃ™г‚‹гЃ“гЃЁг‚’ж±єе®љгЃ—гЃџе ґеђ€гЂЃеЅ“з¤ѕгЃЇеї…и¦ЃдёЌеЏЇж¬ гЃЄг‚Їгѓѓг‚­гѓјгЃ‹г‚‰гЃ®гѓ‡гѓјг‚їгЃ®гЃїг‚’дЅїз”ЁгЃ—гЂЃгЃЉе®ўж§гЃЇеЅ“з¤ѕгЃ®г‚µгѓјгѓ“г‚№г‚’е®Ње…ЁгЃ«дє«еЏ—гЃ™г‚‹гЃ“гЃЁгЃЊгЃ§гЃЌгЃЄгЃЏгЃЄг‚ЉгЃѕгЃ™гЂ‚","data_processing_consent_my_personal_data":"з§ЃгЃ®еЂ‹дєєгѓ‡гѓјг‚ї","data_processing_consent_partner_checkbox_tooltip":"гЃ“гЃ®г‚µг‚¤гѓ€гЃЇгЂЃг‚Ёг‚Їг‚Ѕгѓ©иЈЅе“ЃдёЉгЃ§йЃ‹е–¶гЃ•г‚ЊгЃ¦гЃ„гЃѕгЃ™гЂ‚г‚Ёг‚Їг‚Ѕгѓ©гЃЇгЂЃгѓ‘гѓ–гѓЄгѓѓг‚·гѓЈгѓјг‚ўг‚«г‚¦гѓігѓ€гЃ§жЏђдѕ›гЃ•г‚ЊгЃџIDгЂЃйЂЈзµЎе…€гЂЃгЃѕгЃџгЃЇдє‹жҐ­е†…е®№гЃЄгЃ©гЃ®еЂ‹дєєгѓ‡гѓјг‚їг‚’з®Ўзђ†гЃ—гЃѕгЃ™гЂ‚","essential_cookies_checkbox":"еї…й €г‚Їгѓѓг‚­гѓј","essential_cookies_description":"гЃ“г‚Њг‚‰гЃ®г‚Їгѓѓг‚­гѓјгЃЇгЂЃеЅ“з¤ѕгЃ®г‚¦г‚§гѓ–г‚µг‚¤гѓ€г‚„г‚Ёг‚Їг‚Ѕгѓ©иЈЅе“ЃгЃЊж©џиѓЅгЃ™г‚‹гЃџг‚ЃгЃ«еї…и¦ЃгЃЄг‚‚гЃ®гЃ§гЃ‚г‚ЉгЂЃг‚Єгѓ•гЃ«гЃ™г‚‹гЃ“гЃЁгЃЇгЃ§гЃЌгЃѕгЃ›г‚“гЂ‚дѕ‹гЃ€гЃ°гЂЃгЃЉе®ўж§гЃ®еЂ‹дєєг‚ўг‚«г‚¦гѓігѓ€гЃёгЃ®гѓ­г‚°г‚¤гѓіг‚’еЏЇиѓЅгЃ«гЃ™г‚‹г‚Їгѓѓг‚­гѓјг‚„гЂЃж­ЈгЃ—гЃ„ж±єжё€е‡¦зђ†гЃ®жµЃг‚Њг‚„г‚«г‚№г‚їгѓћгѓјг‚µгѓќгѓјгѓ€г‚’жЏђдѕ›гЃ™г‚‹гЃџг‚ЃгЃ®г‚Їгѓѓг‚­гѓјгЃЄгЃ©гЃЊгЃ‚г‚ЉгЃѕгЃ™гЂ‚<br/>гѓ–гѓ©г‚¦г‚¶гЃ®иЁ­е®љгЃ«г‚€г‚ЉгЂЃгЃ“г‚Њг‚‰гЃ®г‚Їгѓѓг‚­гѓјг‚’гѓ–гѓ­гѓѓг‚ЇгЃ—гЃџг‚ЉгЂЃи­¦е‘ЉгЃ—гЃџг‚ЉгЃ™г‚‹гЃ“гЃЁгЃЊгЃ§гЃЌгЃѕгЃ™гЃЊгЂЃгЃ“гЃ®г‚¦г‚§гѓ–г‚µг‚¤гѓ€гЃ®дёЂйѓЁгЃЊжњџеѕ…йЂљг‚ЉгЃ«е‹•дЅњгЃ—гЃЄгЃ„е ґеђ€гЃЊгЃ‚г‚ЉгЃѕгЃ™гЂ‚","essential_cookies_list_link_name":"еї…й €г‚Їгѓѓг‚­гѓјгѓЄг‚№гѓ€","essential_cookies_tooltip":"гЃ“гЃ®г‚їг‚¤гѓ—гЃ®г‚Їгѓѓг‚­гѓјгЃЇг‚Єгѓ•гЃ«гЃ§гЃЌгЃѕгЃ›г‚“гЂ‚","functional_cookies_checkbox":"ж©џиѓЅзљ„гЃЄг‚Їгѓѓг‚­гѓј","functional_cookies_description":"гЃ“г‚Њг‚‰гЃ®г‚Їгѓѓг‚­гѓјгЃ«г‚€г‚ЉгЂЃгЃЉе®ўж§гЃЊеЅ“з¤ѕгЃ®г‚¦г‚§гѓ–г‚µг‚¤гѓ€г‚„г‚Ёг‚Їг‚Ѕгѓ©иЈЅе“ЃгЃ§иЎЊгЃЈгЃџйЃёжЉћг‚’иЁж†¶гЃ™г‚‹гЃ“гЃЁгЃЊгЃ§гЃЌгЃѕгЃ™гЂ‚гЃ“г‚ЊгЃ«г‚€г‚ЉгЂЃеј·еЊ–гЃ•г‚ЊгЃџгѓ‘гѓјг‚ЅгѓЉгѓ©г‚¤г‚єгЃ•г‚ЊгЃџж©џиѓЅг‚’жЏђдѕ›гЃ™г‚‹гЃ“гЃЁгЃЊгЃ§гЃЌгЃѕгЃ™гЂ‚дѕ‹гЃ€гЃ°гЂЃгЃЉе®ўж§гЃ®гЃ”и¦Ѓжњ›гЃ«еїњгЃгЃ¦гЂЃз‰№е®љгЃ®гѓљгѓјг‚ёг‚’г‚«г‚№г‚їгѓћг‚¤г‚єгЃ—гЃџг‚ЉгЂЃгЃќгЃ®д»–гЃ®г‚µгѓјгѓ“г‚№г‚’жЏђдѕ›гЃ—гЃџг‚ЉгЃ™г‚‹гЃ“гЃЁгЃЊгЃ§гЃЌгЃѕгЃ™гЂ‚<br/>гЃ“г‚Њг‚‰гЃ®г‚Їгѓѓг‚­гѓјг‚’еЏ—гЃ‘е…Ґг‚ЊгЃЄгЃ„е ґеђ€гЂЃгЃ“г‚Њг‚‰гЃ®ж©џиѓЅгЃ®дёЂйѓЁгЃѕгЃџгЃЇгЃ™гЃ№гЃ¦гЃЊж­ЈгЃ—гЃЏж©џиѓЅгЃ—гЃЄгЃ„е ґеђ€гЃЊгЃ‚г‚ЉгЃѕгЃ™гЂ‚","functional_cookies_link_name":"ж©џиѓЅзљ„гЃЄг‚Їгѓѓг‚­гѓјгѓЄг‚№гѓ€","opt_out_consent":"з§ЃгЃЇгЂЃг‚Ёг‚Їг‚Ѕгѓ©гЃЊ{xsollaGroupConsentLink}е†…гЃ§з§ЃгЃ®еЂ‹дєєгѓ‡гѓјг‚їг‚’е…±жњ‰гЃ™г‚‹гЃ“гЃЁгЃЊгЃ‚г‚‹гЃ“гЃЁг‚’зђ†и§ЈгЃ—гЃ¦гЃ„гЃѕгЃ™гЂ‚","opt_out_consent_link_name":"г‚Ёг‚Їг‚Ѕгѓ©г‚°гѓ«гѓјгѓ—","opt_out_description":"гЃЉе®ўж§гЃЇгЃ„гЃ¤гЃ§г‚‚еђЊж„ЏгЃ®е¤‰ж›ґг‚„ж’¤е›ћг‚’гЃ™г‚‹жЁ©е€©г‚’жЊЃгЃЈгЃ¦гЃ„гЃѕгЃ™гЂ‚еђЊж„ЏгЃ®ж’¤е›ћгЃЇдє‹е‰ЌгЃ®еђЊж„ЏгЃ«еџєгЃҐгЃЏг‚‚гЃ®гЃЄгЃ®гЃ§гЂЃйЃЋеЋ»гЃ®е‡¦зђ†гЃ®йЃ©жі•жЂ§гЃ«гЃЇеЅ±йџїгЃ—гЃѕгЃ›г‚“гЂ‚","opt_out_title":"г‚Єгѓ—гѓ€г‚ўг‚¦гѓ€","privacy_policy_link_name":"еЂ‹дєєжѓ…е ±дїќи­·ж–№й‡ќ","return_button":"ж€»г‚‹","save_and_close_button":"дїќе­гЃ—гЃ¦й–‰гЃг‚‹","saving_button":"дїќе­...","settings_button":"иЁ­е®љ","settings_footer_description":"*гѓЃг‚§гѓѓг‚Їгѓњгѓѓг‚Їг‚№гЃЊйЃёжЉћгЃ•г‚ЊгЃ¦гЃ„г‚‹е ґеђ€гЃЇгЂЃгЃ™гЃ§гЃ«д»–гЃ®г‚Ёг‚Їг‚Ѕгѓ©иЈЅе“Ѓг‚’йЃёжЉћгЃ—гЃ¦гЃ„г‚‹гЃ“гЃЁгЃ«гЃЄг‚ЉгЃѕгЃ™гЂ‚","settings_title":"гѓ—гѓ©г‚¤гѓђг‚·гѓјиЁ­е®љ","targeting_cookies_checkbox":"г‚їгѓјг‚Ігѓ†г‚Јгѓіг‚°г‚Їгѓѓг‚­гѓј","targeting_cookies_description":"гЃ“г‚Њг‚‰гЃ®г‚Їгѓѓг‚­гѓјгЃЇгЂЃгЃ“гЃ®г‚¦г‚§гѓ–г‚µг‚¤гѓ€гЃѕгЃџгЃЇг‚Ёг‚Їг‚Ѕгѓ©иЈЅе“ЃгЃ§г‚ўг‚Їг‚»г‚№гЃ—гЃџгѓљгѓјг‚ёгЃЁгЂЃг‚ўг‚Їг‚»г‚№гЃ—гЃџгѓЄгѓіг‚Їг‚’иЁйЊІгЃ—гЃѕгЃ™гЂ‚еЅ“з¤ѕгЃЇгЂЃгЃ“гЃ®жѓ…е ±г‚’е€©з”ЁгЃ—гЃ¦гЂЃеЅ“з¤ѕгЃ®г‚¦г‚§гѓ–г‚µг‚¤гѓ€гЃЁгЃќгЃ“гЃ«иЎЁз¤єгЃ•г‚Њг‚‹еєѓе‘Љг‚’гЂЃгЃЉе®ўж§гЃ®й–ўеїѓгЃ«г‚€г‚Љй–ўйЂЈжЂ§гЃ®й«гЃ„г‚‚гЃ®гЃ«гЃ™г‚‹гЃџг‚ЃгЃ«дЅїз”ЁгЃ—гЃѕгЃ™гЂ‚гЃѕгЃџгЂЃгЃ“гЃ®жѓ…е ±г‚’з¬¬дё‰иЂ…гЃЁе…±жњ‰гЃ™г‚‹гЃ“гЃЁгЃЊгЃ‚г‚ЉгЃѕгЃ™гЂ‚<br/>гЃ“г‚Њг‚‰гЃ®г‚Їгѓѓг‚­гѓјг‚’еЏ—гЃ‘е…Ґг‚ЊгЃЄгЃ„е ґеђ€гЃ§г‚‚гЂЃеєѓе‘ЉгЃЇиЎЁз¤єгЃ•г‚ЊгЃѕгЃ™гЃЊгЂЃгЃЉе®ўж§гЃ®и€€е‘ігЃ«еђ€г‚ЏгЃ›гЃ¦иЄїж•ґгЃ•г‚Њг‚‹гЃ“гЃЁгЃЇгЃ‚г‚ЉгЃѕгЃ›г‚“гЂ‚","targeting_cookies_link_name":"г‚їгѓјг‚Ігѓ†г‚Јгѓіг‚°г‚Їгѓѓг‚­гѓјгѓЄг‚№гѓ€","welcome_screen_allow_cookies":"з§ЃгЃЇг‚Їгѓѓг‚­гѓјгЃ®дЅїз”ЁгЃ«еђЊж„ЏгЃ—гЃѕгЃ™","welcome_screen_data_processing":"з§ЃгЃЇгЂЃг‚Ёг‚Їг‚Ѕгѓ©гЃЊ{myPersonalDataTooltip}г‚’дЅїз”ЁгЃ—гЃ¦з§ЃгЃ«г‚«г‚№г‚їгѓћг‚¤г‚єгЃ•г‚ЊгЃџг‚µгѓјгѓ“г‚№г‚’жЏђдѕ›гЃ™г‚‹гЃ“гЃЁгЃ«еђЊж„ЏгЃ—гЃѕгЃ™","welcome_screen_description":"гѓ—гѓ©г‚¤гѓђг‚·гѓјиЁ­е®љгЃ«ж€»г‚‹гЃ“гЃЁгЃ§гЂЃгЃ„гЃ¤гЃ§г‚‚еђЊж„Џг‚’е¤‰ж›ґгЃѕгЃџгЃЇж’¤е›ћгЃ™г‚‹гЃ“гЃЁгЃЊгЃ§гЃЌгЃѕгЃ™гЂ‚","welcome_screen_mobile_description":"\\"{acceptAllButtonText}\\"г‚’г‚ЇгѓЄгѓѓг‚ЇгЃ™г‚‹гЃ“гЃЁгЃ§гЂЃгЃЉе®ўж§гЃЇеЅ“з¤ѕгЃЊгЃЉе®ўж§гЃ®еЂ‹дєєжѓ…е ±г‚’е‡¦зђ†гЃ—гЂЃгЃ™гЃ№гЃ¦гЃ®г‚Їгѓѓг‚­гѓјг‚’иЁ­е®љгЃ™г‚‹гЃ“гЃЁгЃ«еђЊж„ЏгЃ—гЃџгЃ“гЃЁгЃ«гЃЄг‚ЉгЃѕгЃ™гЂ‚гЃѕгЃџгЃЇгЂЃиЁ­е®љгЃ§иЁ­е®љг‚’г‚«г‚№г‚їгѓћг‚¤г‚єгЃ™г‚‹гЃ“гЃЁг‚‚гЃ§гЃЌгЃѕгЃ™гЂ‚","welcome_screen_title":"еЅ“з¤ѕгЃЇгЃЉе®ўж§гЃ®гѓ—гѓ©г‚¤гѓђг‚·гѓјг‚’е°Љй‡ЌгЃ—гЃѕгЃ™"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"лЄЁл‘ђ м€лќЅ","analytical_performance_cookies_checkbox":"л¶„м„ќ л°Џ м„±лЉҐ мї н‚¤","analytical_performance_cookies_description":"мќґ мї н‚¤лЉ” к·Ђн•к°Ђ мќґ м›№м‚¬мќґнЉёлҐј м–ґл–»кІЊ м‚¬мљ©н•лЉ”м§Ђм—ђ лЊЂн•њ м •ліґлҐј м€м§‘н•м—¬ мќґ м›№м‚¬мќґнЉёмќ мћ‘лЏ™ л°©м‹ќмќ„ к°њм„ н•  м€ мћ€лЏ„лЎќ н•л©° лђн•њ, м—‘м†”лќј мѓЃн’€ мќґмљ©м—ђм„њмќ к·Ђн•мќ кІЅн—мќ„ м Ђнќ¬к°Ђ лЌ” н–ҐмѓЃн•  м€ мћ€лЏ„лЎќ н•©л‹€л‹¤. м€лҐј л“¤м–ґ, к·Ђн•к°Ђ м°ѕкі  мћ€лЉ” лЊЂмѓЃмќ„ м‰ЅкІЊ м°ѕмќ„ м€ мћ€лЉ”м§Ђ н™•мќён•к±°л‚ к·Ђн•к°Ђ кІЄлЉ” м–ґл ¤м›Ђмќ„ кё°лЎќн•  м€ мћ€мЉµл‹€л‹¤. <br/>мќґ мї н‚¤лҐј м€лќЅн•м§Ђ м•ЉлЉ” кІЅмљ° л‹№м‚¬лЉ” к·Ђн•к°Ђ м–ём њ м Ђнќ¬ м›№м‚¬мќґнЉёлҐј л°©л¬ён–€лЉ”м§Ђ м•Њ м€ м—†мњјл©° м›№м‚¬мќґнЉёмќ м„±лЉҐлЏ„ лЄЁл‹€н„°л§Ѓн•  м€ м—†мЉµл‹€л‹¤.","analytical_performance_cookies_link_name":"л¶„м„ќ л°Џ м„±лЉҐ мї н‚¤ лЄ©лЎќ","cookie_policy_link_name":"мї н‚¤ м •м±…","data_processing_consent_checkbox":"лЌ°мќґн„° мІл¦¬ лЏ™мќ","data_processing_consent_customer_checkbox_tooltip":"мќґ м‚¬мќґнЉёлЉ” м—‘м†”лќј мѓЃн’€м—ђм„њ м‹¤н–‰лђ©л‹€л‹¤. м—‘м†”лќјлЉ” м„±лЄ… лђлЉ” лі„лЄ…, мќґл©”мќј мЈјм†Њ, IP мЈјм†Њ, м§Ђл¦¬м Ѓ мњ„м№, кі мњ  м‚¬мљ©мћђ ID к°™мќЂ к·Ђн•мќ к°њмќё лЌ°мќґн„°лҐј кґЂл¦¬н•©л‹€л‹¤.","data_processing_consent_description":"л‹№м‚¬к°Ђ л§ћм¶¤ м„њл№„мЉ¤лҐј к·Ђн•м—ђкІЊ м њкіµн•л ¤л©ґ мї н‚¤лЎњл¶Ђн„°мќ к·Ђн•мќ к°њмќё лЌ°мќґн„° л°Џ м •ліґлҐј м‚¬мљ©н•лЉ” кІѓм—ђ лЊЂн•њ к·Ђн•мќ лЏ™мќк°Ђ н•„мљ”н•©л‹€л‹¤. лЌ°мќґн„° мІл¦¬ мµнЉём•„м›ѓмќ„ кІ°м •н•лЉ” кІЅмљ° л‹№м‚¬лЉ” н•„м€ мї н‚¤м—ђм„њ м–»мќЂ лЌ°мќґн„°л§Њ м‚¬мљ©н•  кІѓмќґл©° к·Ђн•лЉ” л‹№м‚¬мќ м„њл№„мЉ¤лҐј м „мІґк°Ђ м•„л‹Њ мќјл¶Ђл§Њ м¦ђкёё м€ мћ€мќ„ м€лЏ„ мћ€мЉµл‹€л‹¤.","data_processing_consent_my_personal_data":"л‚ґ к°њмќё лЌ°мќґн„°","data_processing_consent_partner_checkbox_tooltip":"мќґ м‚¬мќґнЉёлЉ” м—‘м†”лќј мѓЃн’€м—ђм„њ м‹¤н–‰лђ©л‹€л‹¤. м—‘м†”лќјлЉ” кІЊм‹њмћђ кі„м •м—ђ к·Ђн•к°Ђ м њкіµн•њ м‹ м›ђ, м—°лќЅмІ, л№„м¦€л‹€мЉ¤ м„ёл¶Ђ м •ліґ к°™мќЂ к·Ђн•мќ к°њмќё лЌ°мќґн„°лҐј кґЂл¦¬н•©л‹€л‹¤.","essential_cookies_checkbox":"н•„м€ мї н‚¤","essential_cookies_description":"мќґ мї н‚¤лЉ” л‹№м‚¬мќ м›№м‚¬мќґнЉё л°Џ м—‘м†”лќј мѓЃн’€мќґ кё°лЉҐн•лЉ” лЌ°м—ђ н•„м€мќґл©° лЃЊ м€ м—†мЉµл‹€л‹¤. м€лҐј л“¤м–ґ, мќґ мї н‚¤м—ђлЉ” к·Ђн•мќ к°њмќё кі„м •м—ђ лЎњк·ёмќён•  м€ мћ€кІЊ н•лЉ” мї н‚¤м™Ђ м¬л°”лҐё кІ°м њ мІл¦¬ нќђл¦„ л°Џ кі к°ќ м§Ђм›ђмќ„ м њкіµн•лЉ” мї н‚¤к°Ђ нЏ¬н•Ёлђм–ґ мћ€мЉµл‹€л‹¤. <br/>мќґ мї н‚¤м—ђ лЊЂн•ґ кІЅкі лҐј н•к±°л‚ мќґ мї н‚¤лҐј м°Ёл‹Ён•лЏ„лЎќ лёЊлќјмљ°м ЂлҐј м„¤м •н•  м€ мћ€мњјл‚, к·ёл ‡кІЊ н•л©ґ мќґ м›№м‚¬мќґнЉёмќ мќјл¶Ђк°Ђ м€мѓЃлЊЂлЎњ мћ‘лЏ™н•м§Ђ м•Љмќ„ м€ мћ€мЉµл‹€л‹¤.","essential_cookies_list_link_name":"н•„м€ мї н‚¤ лЄ©лЎќ","essential_cookies_tooltip":"мќґ мњ н•мќ мї н‚¤лЉ” лЃЊ м€ м—†мЉµл‹€л‹¤.","functional_cookies_checkbox":"кё°лЉҐ мї н‚¤","functional_cookies_description":"мќґ мї н‚¤лЉ” л‹№м‚¬мќ м›№м‚¬мќґнЉё лђлЉ” м—‘м†”лќј мѓЃн’€м—ђ кґЂн•м—¬ к·Ђн•к°Ђ м–ґл–¤ кІ°м •мќ„ н–€лЉ”м§Ђ м Ђнќ¬к°Ђ кё°м–µн•  м€ мћ€кІЊ н•ґ м¤Ќл‹€л‹¤. мќґлЉ” м Ђнќ¬к°Ђ к°њм„  л°Џ л§ћм¶¤н™”лђњ кё°лЉҐмќ„ м њкіµн•  м€ мћ€лЏ„лЎќ н•ґ м¤Ќл‹€л‹¤. м€лҐј л“¤м–ґ, нЉ№м • нЋмќґм§ЂлҐј к·Ђн•лҐј мњ„н•ґ л§ћм¶¤ м„¤м •н•к±°л‚ к·Ђн•мќ мљ”мІ­мњјлЎњ л‹¤лҐё м„њл№„мЉ¤лҐј м њкіµн•  м€ мћ€мЉµл‹€л‹¤. <br/>мќґ мї н‚¤лҐј м€лќЅн•м§Ђ м•ЉлЉ” кІЅмљ° мќґ кё°лЉҐмќ мќјл¶Ђ лђлЉ” м „мІґк°Ђ м Ѓм €н•кІЊ кё°лЉҐн•м§Ђ м•Љмќ„ м€ мћ€мЉµл‹€л‹¤.","functional_cookies_link_name":"кё°лЉҐ мї н‚¤ лЄ©лЎќ","opt_out_consent":"м—‘м†”лќјк°Ђ л‚ґ к°њмќё лЌ°мќґн„°лҐј {xsollaGroupConsentLink} л‚ґм—ђм„њ кіµмњ н•  м€ мћ€мќЊмќ„ мќґн•ґн•©л‹€л‹¤.","opt_out_consent_link_name":"м—‘м†”лќј к·ёлЈ№","opt_out_description":"к·Ђн•лЉ” м–ём њл“ м§Ђ лЏ™мќлҐј ліЂкІЅ л°Џ мІ нљЊн•  м€ мћ€лЉ” к¶Њл¦¬к°Ђ мћ€мЉµл‹€л‹¤. лЏ™мќ мІ нљЊлЉ” кіјк±°м—ђ мћ€м—€лЌ мІл¦¬мќ м ЃлІ•м„±м—ђ мЃн–Ґмќ„ мЈјм§Ђ м•ЉмЉµл‹€л‹¤. кіјк±°мќ мІл¦¬лЉ” к·ё м „мќ лЏ™мќм—ђ кё°л°н•њ кІѓмќґкё° л•Њл¬ёмћ…л‹€л‹¤.","opt_out_title":"мµнЉём•„м›ѓ","privacy_policy_link_name":"к°њмќём •ліґ ліґнём •м±…","return_button":"л°н™","save_and_close_button":"м ЂмћҐ л°Џ л‹«кё°","saving_button":"м ЂмћҐ м¤‘...","settings_button":"м„¤м •","settings_footer_description":"*н™•мќёлћЂмќґ м„ нѓќлђњ кІЅмљ° л‹¤лҐё м—‘м†”лќј мѓЃн’€м—ђм„њ мќґлЇё м„ нѓќмќ„ н•њ кІѓмћ…л‹€л‹¤.","settings_title":"к°њмќё м •ліґ м„¤м •","targeting_cookies_checkbox":"лЊЂмѓЃ мї н‚¤","targeting_cookies_description":"мќґ мї н‚¤лЉ” к·Ђн•к°Ђ л°©л¬ён•њ мќґ м›№м‚¬мќґнЉё лђлЉ” м—‘м†”лќј мѓЃн’€мќ нЋмќґм§Ђм™Ђ к·Ђн•к°Ђ л“¤м–ґк°„ л§ЃнЃ¬лҐј кё°лЎќн•©л‹€л‹¤. м Ђнќ¬лЉ” мќґ м •ліґлҐј л‹№м‚¬мќ м›№м‚¬мќґнЉё л°Џ м›№м‚¬мќґнЉём—ђ н‘њм‹њлђлЉ” кґ‘кі лҐј к·Ђн•мќ кґЂм‹¬м‚¬м—ђ мўЂ лЌ” л§ћкІЊ м„¤м •н•лЉ” лЌ°м—ђ мќґ м •ліґлҐј м‚¬мљ©н•©л‹€л‹¤. м Ђнќ¬лЉ” м–ёкё‰н•њ лЄ©м Ѓмќ„ мњ„н•ґ м њм‚јмћђм™Ђ мќґ м •ліґлҐј кіµмњ н•  м€лЏ„ мћ€мЉµл‹€л‹¤. <br/>мќґ мї н‚¤лҐј м€лќЅн•м§Ђ м•ЉлЉ” кІЅмљ° кґ‘кі лЉ” кі„м†Ќ ліј м€ мћ€м§Ђл§Њ, кґ‘кі к°Ђ к·Ђн•мќ кґЂм‹¬м‚¬м—ђ л§ћкІЊ м„¤м •лђм–ґ мћ€м§ЂлЉ” м•ЉмЉµл‹€л‹¤.","targeting_cookies_link_name":"лЊЂмѓЃ мї н‚¤ лЄ©лЎќ","welcome_screen_allow_cookies":"мї н‚¤ м‚¬мљ©м—ђ лЏ™мќн•©л‹€л‹¤","welcome_screen_data_processing":"л§ћм¶¤н™”лђњ м„њл№„мЉ¤лҐј л‚м—ђкІЊ м њкіµн•  м€ мћ€лЏ„лЎќ м—‘м†”лќјк°Ђ {myPersonalDataTooltip}лҐј мќґмљ©н•лЉ” лЌ°м—ђ лЏ™мќн•©л‹€л‹¤.","welcome_screen_description":"к°њмќё м •ліґ м„¤м •мњјлЎњ лЏЊм•„к°Ђ м–ём њл“ м§Ђ лЏ™мќлҐј ліЂкІЅ лђлЉ” мІ нљЊн•  м€ мћ€мЉµл‹€л‹¤.","welcome_screen_mobile_description":"\'{acceptAllButtonText}\'лҐј нЃґл¦­н•л©ґ к·Ђн•мќ к°њмќё лЌ°мќґн„° мІл¦¬ л°Џ лЄЁл“  мї н‚¤ м„¤м •м—ђ лЏ™мќн•кІЊ лђ©л‹€л‹¤. лђлЉ”, кё°ліё м„¤м •мќ„ м„¤м •м—ђм„њ м‚¬мљ©мћђ м§Ђм •н•  м€ мћ€мЉµл‹€л‹¤.","welcome_screen_title":"м Ђнќ¬лЉ” к·Ђн•мќ к°њмќё м •ліґлҐј м†Њм¤‘нћ€ м—¬к№Ѓл‹€л‹¤"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Akceptuj wszystkie","analytical_performance_cookies_checkbox":"Pliki cookie zwiД…zane z wydajnoЕ›ciД… i danymi analitycznymi","analytical_performance_cookies_description":"Te pliki cookie gromadzД… informacje na temat twojego korzystania z tego serwisu i umoЕјliwiajД… nam udoskonalanie jego dziaЕ‚ania, a takЕјe zapewnienie ci wygodniejszego korzystania z ProduktГіw Xsolla. Na przykЕ‚ad, moЕјemy sprawiД‡, Ејe bД™dziesz mГіgЕ‚ z Е‚atwoЕ›ciД… znaleЕєД‡ to, czego szukasz lub zarejestrowaД‡ wszelkie problemy, jakich moЕјesz doЕ›wiadczyД‡. <br/>JeЕ›li nie wyrazisz zgody na te pliki cookie, nie bД™dziemy wiedzieД‡, kiedy korzystaЕ‚eЕ› z naszego serwisu i nie bД™dziemy mogli monitorowaД‡ jego dziaЕ‚ania.","analytical_performance_cookies_link_name":"Lista plikГіw cookie zwiД…zanych z wydajnoЕ›ciД… i danymi analitycznymi","cookie_policy_link_name":"Polityka plikГіw cookie","data_processing_consent_checkbox":"Zgoda na przetwarzanie danych","data_processing_consent_customer_checkbox_tooltip":"Ta strona dziaЕ‚a na Produktach Xsolla. Xsolla zarzД…dza twoimi danymi osobowymi, takimi jak imiД™ i nazwisko lub nazwa uЕјytkownika, adres e-mail, adres IP, dane lokalizacyjne oraz unikalny identyfikator uЕјytkownika.","data_processing_consent_description":"Potrzebujemy twojej zgody na wykorzystanie twoich danych osobowych i informacji z plikГіw cookie, aby mieД‡ moЕјliwoЕ›Д‡ zaoferowania ci usЕ‚ug dostosowanych do twoich potrzeb. JeЕ›li nie zgodzisz siД™ na przetwarzanie danych, wykorzystamy jedynie dane z niezbД™dnych plikГіw cookie i nie bД™dziesz mГіgЕ‚ w peЕ‚ni korzystaД‡ z naszych usЕ‚ug.","data_processing_consent_my_personal_data":"moje dane osobowe","data_processing_consent_partner_checkbox_tooltip":"Ta strona dziaЕ‚a na Produktach Xsolla. Xsolla zarzД…dza twoimi danymi osobowymi, takimi jak dane umoЕјliwiajД…ce identyfikacjД™ oraz dane kontaktowe lub biznesowe podane przez ciebie w danych Konta Wydawcy.","essential_cookies_checkbox":"NiezbД™dne pliki cookie","essential_cookies_description":"Te pliki cookie sД… konieczne, aby nasz serwis i Produkty Xsolla mogЕ‚y funkcjonowaД‡, i nie moЕјna ich wyЕ‚Д…czyД‡. Na przykЕ‚ad, sД… to pliki cookie, ktГіre umoЕјliwiajД… ci logowanie siД™ do swojego konta, oraz pliki cookie, ktГіre zapewniajД… prawidЕ‚owe przetwarzanie pЕ‚atnoЕ›ci i wsparcie klienta. <br/>MoЕјesz zmieniД‡ ustawienia swojej przeglД…darki i zablokowaД‡ te pliki cookie lub otrzymywaД‡ o nich ostrzeЕјenia, ale wГіwczas niektГіre czД™Е›ci tego serwisu mogД… nie dziaЕ‚aД‡ zgodnie z oczekiwaniami.","essential_cookies_list_link_name":"Lista niezbД™dnych plikГіw cookie","essential_cookies_tooltip":"Tego rodzaju plikГіw cookie nie moЕјna wyЕ‚Д…czyД‡.","functional_cookies_checkbox":"Funkcjonalne pliki cookie","functional_cookies_description":"Te pliki cookies pozwalajД… nam zapamiД™taД‡ twoje wybory dokonywane w naszym serwisie lub w Produktach Xsolla. Pomaga nam to w zapewnieniu ulepszonych i spersonalizowanych funkcjonalnoЕ›ci. Na przykЕ‚ad, moЕјemy dopasowaД‡ okreЕ›lonД… stronД™ do twoich potrzeb lub zapewniД‡ inne usЕ‚ugi na twojД… proЕ›bД™. <br/>JeЕ›li nie wyrazisz zgody na te pliki cookie, niektГіre lub wszystkie te funkcjonalnoЕ›ci mogД… nie funkcjonowaД‡ poprawnie.","functional_cookies_link_name":"Lista funkcjonalnych plikГіw cookie","opt_out_consent":"PrzyjmujД™ do wiadomoЕ›ci, Ејe Xsolla moЕјe udostД™pniaД‡ moje dane osobowe w ramach {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Grupa Xsolla","opt_out_description":"Masz prawo do zmiany lub wycofania zgody w dowolnym momencie. Wycofanie zgody nie wpЕ‚ywa na zgodnoЕ›Д‡ z prawem przetwarzania w przeszЕ‚oЕ›ci z uwagi na fakt, Ејe byЕ‚o ono oparte na poprzedniej zgodzie.","opt_out_title":"Rezygnacja","privacy_policy_link_name":"Polityka prywatnoЕ›ci","return_button":"PowrГіt","save_and_close_button":"Zapisz i zamknij","saving_button":"Zapisywanie...","settings_button":"Ustawienia","settings_footer_description":"*JeЕ›li pole wyboru jest zaznaczone, juЕј dokonaЕ‚eЕ› wyboru w innym Produkcie Xsolla.","settings_title":"Ustawienia prywatnoЕ›ci","targeting_cookies_checkbox":"Reklamowe pliki cookie","targeting_cookies_description":"Te pliki cookies zapisujД… strony, ktГіre odwiedziЕ‚eЕ› w naszym serwisie lub w Produktach Xsolla, oraz linki, na ktГіre wszedЕ‚eЕ›. Wykorzystujemy te informacje, aby nasz serwis i wyЕ›wietlane w nim reklamy odpowiadaЕ‚y twoim zainteresowaniom. MoЕјemy takЕјe udostД™pniД‡ te informacje stronom trzecim w tym celu. <br/>JeЕ›li nie wyrazisz zgody na te pliki cookies, nadal bД™dziesz widzieД‡ reklamy, ale nie bД™dД… one odpowiadaЕ‚y twoim zainteresowaniom.","targeting_cookies_link_name":"Lista reklamowych plikГіw cookie","welcome_screen_allow_cookies":"Zgadzam siД™ na korzystanie z plikГіw cookie","welcome_screen_data_processing":"WyraЕјam zgodД™ na wykorzystywanie {myPersonalDataTooltip} Xsolla, aby otrzymywaД‡ spersonalizowane usЕ‚ugi","welcome_screen_description":"MoЕјesz zmieniД‡ lub wycofaД‡ swojД… zgodД™ w dowolnym momencie wracajД…c do UstawieЕ„ prywatnoЕ›ci.","welcome_screen_mobile_description":"KlikajД…c \\"{acceptAllButtonText}\\", zgadzasz siД™ na przetwarzanie swoich danych osobowych i akceptujesz wszystkie pliki cookies. Ewentualnie moЕјesz ustawiД‡ swoje preferencje w Ustawieniach.","welcome_screen_title":"Szanujemy twojД… prywatnoЕ›Д‡"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Aceitar tudo","analytical_performance_cookies_checkbox":"Cookies analГ­ticos e de desempenho","analytical_performance_cookies_description":"Esses cookies coletam informaГ§Гµes sobre seu uso desse site e nos permitem melhorar o funcionamento dele, bem como melhorar sua experiГЄncia com outros Produtos Xsolla. Por exemplo, podemos garantir que vocГЄ encontre facilmente o que estГЎ procurando ou registrarmos quaisquer dificuldades que vocГЄ enfrente. <br/> Se vocГЄ nГЈo aceitar esses cookies, nГЈo poderemos saber quando vocГЄ visita nosso site e nГЈo poderemos monitorar o desempenho dele.","analytical_performance_cookies_link_name":"Lista de cookies analГ­ticos e de desempenho","cookie_policy_link_name":"PolГ­tica de Cookies","data_processing_consent_checkbox":"Consentimento ao processamento de dados","data_processing_consent_customer_checkbox_tooltip":"Esse site opera em Produtos Xsolla. Xsolla gerencia seus dados pessoais, tais como nome ou apelido, endereГ§o de e-mail, endereГ§o de IP, informaГ§Гµes de geolocalizaГ§ГЈo e identificadores Гєnicos.","data_processing_consent_description":"Precisamos do seu consentimento para usar seus dados e informaГ§Гµes pessoais a partir dos cookies para oferecer serviГ§os personalizados a vocГЄ. Se vocГЄ decidir nГЈo compartilhar seus dados, usaremos apenas os dados advindos de cookies essenciais e vocГЄ nГЈo poderГЎ desfrutar dos nossos serviГ§os por completo.","data_processing_consent_my_personal_data":"meus dados pessoais","data_processing_consent_partner_checkbox_tooltip":"Esse site opera em Produtos Xsolla. Xsolla gerencia seus dados pessoais, tais como identidade e detalhes de contato ou comerciais fornecidos por vocГЄ na Conta de Distribuidor.","essential_cookies_checkbox":"Cookies essenciais","essential_cookies_description":"Esses cookies sГЈo necessГЎrios para que o nosso site e os Produtos Xsolla funcionem e nГЈo podem ser desativados. Por exemplo, eles incluem cookies que permitem que vocГЄ faГ§a login na sua conta pessoal e cookies que fornecem um fluxo correto de processamento de pagamentos e apoio ao consumidor. <br/> VocГЄ pode configurar seu navegador para bloquear ou alertar vocГЄ sobre esses cookies, mas, nesse caso, algumas partes do site podem nГЈo funcionar como esperado.","essential_cookies_list_link_name":"Lista de cookies essenciais","essential_cookies_tooltip":"Esse tipo de cookie nГЈo pode ser desativado.","functional_cookies_checkbox":"Cookies funcionais","functional_cookies_description":"Esses cookies nos permitem lembrar suas escolhas no nosso site ou nos Produtos Xsolla. Isso nos ajuda a fornecer recursos personalizados e melhorados. Por exemplo, podemos customizar uma pГЎgina especГ­fica para vocГЄ, ou fornecer outros serviГ§os quando solicitados. <br/> Se vocГЄ nГЈo aceitar esses cookies, alguns desses ou todos recursos podem nГЈo funcionar corretamente.","functional_cookies_link_name":"Lista de cookies funcionais","opt_out_consent":"Entendo que a Xsolla poderГЎ compartilhar meus dados pessoais dentro da {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Grupo Xsolla","opt_out_description":"VocГЄ tem o direito de alterar ou remover o consentimento a qualquer momento. A remoГ§ГЈo do consentimento nГЈo afeta a legalidade de processamentos anteriores, porque eles se baseiam em consentimento prГ©vio.","opt_out_title":"Recusar","privacy_policy_link_name":"PolГ­tica de Privacidade","return_button":"Retornar","save_and_close_button":"Salvar e fechar","saving_button":"Salvando...","settings_button":"ConfiguraГ§Гµes","settings_footer_description":"*Se a caixa de seleГ§ГЈo estiver marcada, vocГЄ jГЎ fez sua escolha em outro Produto Xsolla.","settings_title":"ConfiguraГ§Гµes de privacidade","targeting_cookies_checkbox":"Cookies de personalizaГ§ГЈo","targeting_cookies_description":"Esses cookies registram as pГЎginas que vocГЄ jГЎ visitou nesse site ou em Produtos Xsolla e os links que vocГЄ acessou. Usamos essa informaГ§ГЈo para tornar nosso site e os anГєncios exibidos nele mais relevantes para os seus interesses. TambГ©m podemos compartilhar essa informaГ§ГЈo com terceiros para esse propГіsito. <br/> Se vocГЄ nГЈo aceitar esses cookies, vocГЄ ainda verГЎ anГєncios, mas eles nГЈo serГЈo personalizados aos seus interesses.","targeting_cookies_link_name":"Lista de cookies de personalizaГ§ГЈo","welcome_screen_allow_cookies":"Eu aceito usar cookies","welcome_screen_data_processing":"Dou meu consentimento Г  Xsolla para usar {myPersonalDataTooltip} para oferecer serviГ§os personalizados a mim","welcome_screen_description":"VocГЄ pode alterar ou remover seu consentimento a qualquer momento nas configuraГ§Гµes de privacidade.","welcome_screen_mobile_description":"Ao clicar em \\"{acceptAllButtonText}\\", vocГЄ nos dГЎ consentimento para processarmos seus dados pessoais e usar todos os cookies. Alternativamente, vocГЄ pode customizar suas preferГЄncias nas ConfiguraГ§Гµes.","welcome_screen_title":"NГіs respeitamos sua privacidade"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"AcceptaИ›i toate","analytical_performance_cookies_checkbox":"FiИ™iere cookie analitice И™i de performanИ›Дѓ","analytical_performance_cookies_description":"Aceste fiИ™iere cookie colecteazДѓ informaИ›ii despre utilizarea dvs. a acestui site web И™i ne permit sДѓ Г®mbunДѓtДѓИ›im modul Г®n care funcИ›ioneazДѓ, precum И™i sДѓ Г®mbunДѓtДѓИ›im experienИ›a dvs. cu alte produse Xsolla. De exemplu, vДѓ putem asigura cДѓ gДѓsiИ›i cu uИ™urinИ›Дѓ ceea ce cДѓutaИ›i sau Г®nregistrДѓm orice dificultДѓИ›i pe care le-aИ›i putea avea. <br/> DacДѓ nu acceptaИ›i aceste fiИ™iere cookie, nu vom И™ti cГўnd aИ›i vizitat site-ul nostru И™i nu vom putea monitoriza performanИ›a acestuia.","analytical_performance_cookies_link_name":"Lista fiИ™ierelor cookie analitice И™i de performanИ›Дѓ","cookie_policy_link_name":"Politica privind fiИ™ierele cookie","data_processing_consent_checkbox":"ConsimИ›ДѓmГўnt de procesare a datelor","data_processing_consent_customer_checkbox_tooltip":"Acest site este rulat pe Produsele Xsolla. Xsolla gestioneazДѓ datele dvs. cu caracter personal, cum ar fi numele complet sau porecla, adresa de e-mail, adresa IP, informaИ›iile despre localizarea geograficДѓ И™i ID-ul de utilizator unic.","data_processing_consent_description":"Avem nevoie de consimИ›ДѓmГўntul dvs. pentru a utiliza datele dvs. cu caracter personal И™i informaИ›iile din fiИ™ierele cookie pentru a vДѓ oferi servicii personalizate. DacДѓ decideИ›i sДѓ renunИ›aИ›i la prelucrarea datelor, vom folosi doar datele din fiИ™ierele cookie de bazДѓ И™i nu veИ›i putea sДѓ vДѓ bucuraИ›i integral de serviciile noastre.","data_processing_consent_my_personal_data":"datele mele cu caracter personal","data_processing_consent_partner_checkbox_tooltip":"Acest site este rulat pe Produsele Xsolla. Xsolla gestioneazДѓ datele cu caracter dvs. personal, cum ar fi identitatea И™i datele de contact sau de afaceri, furnizate de dvs. Г®n Contul de editor.","essential_cookies_checkbox":"FiИ™iere cookie esenИ›iale","essential_cookies_description":"Aceste fiИ™iere cookie sunt necesare pentru ca site-ul nostru web И™i Produsele Xsolla sДѓ funcИ›ioneze И™i nu pot fi dezactivate. De exemplu, acestea includ fiИ™iere cookie, care vДѓ permit sДѓ vДѓ conectaИ›i la contul dvs. personal, И™i fiИ™iere cookie, care oferДѓ un flux corect de procesare a plДѓИ›ilor И™i asistenИ›Дѓ pentru clienИ›i. <br/> PuteИ›i seta browserul sДѓ vДѓ blocheze sau sДѓ vДѓ alerteze Г®n legДѓturДѓ cu aceste modele cookie, Г®nsДѓ este posibil ca anumite pДѓrИ›i ale acestui site sДѓ nu funcИ›ioneze conform aИ™teptДѓrilor.","essential_cookies_list_link_name":"Lista fiИ™ierelor cookie esenИ›iale","essential_cookies_tooltip":"Acest tip de fiИ™iere cookie nu poate fi dezactivat.","functional_cookies_checkbox":"FiИ™iere cookie funcИ›ionale","functional_cookies_description":"Aceste fiИ™iere cookie ne permit sДѓ memorizДѓm alegerile pe care le faceИ›i pe site-ul nostru web sau Г®n Produsele Xsolla. Acest lucru ne ajutДѓ sДѓ oferim funcИ›ii Г®mbunДѓtДѓИ›ite И™i personalizate. <br/> De exemplu, putem personaliza o anumitДѓ paginДѓ pentru dvs. sau vДѓ putem oferi alte servicii la cererea dvs. DacДѓ nu acceptaИ›i aceste fiИ™iere cookie, este posibil ca unele sau toate aceste funcИ›ii sДѓ nu funcИ›ioneze corect.","functional_cookies_link_name":"Lista fiИ™ierelor cookie funcИ›ionale","opt_out_consent":"ГЋnИ›eleg cДѓ Xsolla poate partaja datele mele cu caracter personal Г®n cadrul {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Grupul Xsolla","opt_out_description":"AveИ›i dreptul de a schimba sau retrage consimИ›ДѓmГўntul Г®n orice moment. Retragerea consimИ›ДѓmГўntului nu afecteazДѓ legalitatea procesДѓrii anterioare, deoarece se bazeazДѓ pe consimИ›ДѓmГўntul prealabil.","opt_out_title":"Anularea permisiunii de utilizare a informaЕЈiilor cu caracter personal","privacy_policy_link_name":"Politica de confidenЕЈialitate","return_button":"Revenire","save_and_close_button":"SalvaИ›i И™i Г®nchideИ›i","saving_button":"Se salveazДѓ...","settings_button":"SetДѓri","settings_footer_description":"*DacДѓ este bifatДѓ caseta de selectare, deja aИ›i fДѓcut alegerea dvs. Г®ntr-un alt produs Xsolla.","settings_title":"SetДѓri de confidenИ›ialitate","targeting_cookies_checkbox":"FiИ™iere cookie de analizДѓ a vizitatorilor","targeting_cookies_description":"Aceste fiИ™iere cookie Г®nregistreazДѓ paginile pe care le-aИ›i vizitat pe acest site web sau Г®n Produsele Xsolla И™i linkurile pe care le-aИ›i urmat. Folosim aceste informaИ›ii pentru a face site-ul nostru И™i publicitatea afiИ™atДѓ pe acesta mai relevante pentru interesele dvs. De asemenea, putem sДѓ Г®mpДѓrtДѓИ™im aceste informaИ›ii cu terИ›i Г®n acest scop. <br/> DacДѓ nu acceptaИ›i aceste fiИ™iere cookie, veИ›i vedea Г®n continuare reclame, Г®nsДѓ acestea nu vor fi adaptate intereselor dvs.","targeting_cookies_link_name":"Lista fiИ™ierelor cookie de analizДѓ a vizitatorilor","welcome_screen_allow_cookies":"Sunt de acord sДѓ utilizez fiИ™iere cookie","welcome_screen_data_processing":"ГЋmi dau consimИ›ДѓmГўntul pentru ca Xsolla sДѓ se foloseascДѓ {myPersonalDataTooltip} pentru a-mi oferi servicii personalizate","welcome_screen_description":"PuteИ›i modifica sau retrage consimИ›ДѓmГўntul Г®n orice moment revenind la setДѓrile de confidenИ›ialitate.","welcome_screen_mobile_description":"FДѓcГўnd clic pe вЂћ{acceptAllButtonText}вЂќ, ne oferiИ›i consimИ›ДѓmГўntul pentru a procesa datele dvs. cu caracter personal И™i pentru a seta toate fiИ™ierele cookie. Alternativ, vДѓ puteИ›i personaliza preferinИ›ele Г®n SetДѓri.","welcome_screen_title":"VДѓ respectДѓm confidenИ›ialitatea"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"РџСЂРёРЅСЏС‚СЊ РІСЃС‘","analytical_performance_cookies_checkbox":"РђРЅР°Р»РёС‚РёС‡РµСЃРєРёРµ С„Р°Р№Р»С‹ Cookie","analytical_performance_cookies_description":"Р­С‚РѕС‚ С‚РёРї С„Р°Р№Р»РѕРІ РїРѕР·РІРѕР»СЏРµС‚ РЅР°Рј Р°РЅР°Р»РёР·РёСЂРѕРІР°С‚СЊ РІР°С€Рµ РїРѕРІРµРґРµРЅРёРµ РЅР° СЃР°Р№С‚Рµ Рё СѓР»СѓС‡С€Р°С‚СЊ РµРіРѕ СЂР°Р±РѕС‚Сѓ, Р° С‚Р°РєР¶Рµ СЃРѕРІРµСЂС€РµРЅСЃС‚РІРѕРІР°С‚СЊ РїСЂРѕРґСѓРєС‚С‹ РРєСЃРѕР»Р»Р°. РќР°РїСЂРёРјРµСЂ, СЃ РїРѕРјРѕС‰СЊСЋ СЌС‚РёС… С„Р°Р№Р»РѕРІ РјС‹ РјРѕР¶РµРј РїРѕРЅСЏС‚СЊ, РєР°Рє Р±С‹СЃС‚СЂРѕ РІС‹ РЅР°С…РѕРґРёС‚Рµ РёРЅС‚РµСЂРµСЃСѓСЋС‰СѓСЋ РІР°СЃ РёРЅС„РѕСЂРјР°С†РёСЋ Рё СЃС‚Р°Р»РєРёРІР°РµС‚РµСЃСЊ Р»Рё РїСЂРё СЌС‚РѕРј СЃ РѕС€РёР±РєР°РјРё.<br/>Р‘РµР· СЌС‚РёС… С„Р°Р№Р»РѕРІ Cookie РјС‹ РЅРµ Р±СѓРґРµРј Р·РЅР°С‚СЊ, РєРѕРіРґР° РІС‹ РїРѕСЃРµС‰Р°Р»Рё СЃР°Р№С‚, Рё РЅРµ СЃРјРѕР¶РµРј Р°РЅР°Р»РёР·РёСЂРѕРІР°С‚СЊ РєР°С‡РµСЃС‚РІРѕ РµРіРѕ СЂР°Р±РѕС‚С‹.","analytical_performance_cookies_link_name":"РЎРїРёСЃРѕРє Р°РЅР°Р»РёС‚РёС‡РµСЃРєРёС… С„Р°Р№Р»РѕРІ Cookie","cookie_policy_link_name":"РџРѕР»РёС‚РёРєР° РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ С„Р°Р№Р»РѕРІ Cookie","data_processing_consent_checkbox":"РЎРѕРіР»Р°СЃРёРµ РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ РґР°РЅРЅС‹С…","data_processing_consent_customer_checkbox_tooltip":"РЎР°Р№С‚ СЂР°Р±РѕС‚Р°РµС‚ РЅР° Р±Р°Р·Рµ РїСЂРѕРґСѓРєС‚РѕРІ РРєСЃРѕР»Р»Р°. РРєСЃРѕР»Р»Р° РјРѕР¶РµС‚ РѕР±СЂР°Р±Р°С‚С‹РІР°С‚СЊ РІР°С€Рё РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ, С‚Р°РєРёРµ РєР°Рє: РїРѕР»РЅРѕРµ РёРјСЏ РёР»Рё РЅРёРєРЅРµР№Рј, email-Р°РґСЂРµСЃ, IP-Р°РґСЂРµСЃ, РґР°РЅРЅС‹Рµ Рѕ РјРµСЃС‚РѕРїРѕР»РѕР¶РµРЅРёРё, СѓРЅРёРєР°Р»СЊРЅС‹Р№ ID РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ.","data_processing_consent_description":"РќР°Рј РЅРµРѕР±С…РѕРґРёРјРѕ РІР°С€Рµ СЃРѕРіР»Р°СЃРёРµ РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… РґР°РЅРЅС‹С… Рё С„Р°Р№Р»РѕРІ Cookie РІ С†РµР»СЏС… РїРѕРґР±РѕСЂР° РЅР°РёР±РѕР»РµРµ РїРѕРґС…РѕРґСЏС‰РёС… РІР°Рј РїСЂРµРґР»РѕР¶РµРЅРёР№. Р‘РµР· РІР°С€РµРіРѕ СЃРѕРіР»Р°СЃРёСЏ РјС‹ Р±СѓРґРµРј РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ С‚РѕР»СЊРєРѕ С‚РµС…РЅРёС‡РµСЃРєРёРµ С„Р°Р№Р»С‹ Cookie, Р±РµР· РєРѕС‚РѕСЂС‹С… РЅРµРІРѕР·РјРѕР¶РЅР° СЂР°Р±РѕС‚Р° СЃРµСЂРІРёСЃРѕРІ. РќРµРєРѕС‚РѕСЂС‹Рµ РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё СЃР°Р№С‚Р° РїСЂРё СЌС‚РѕРј РјРѕРіСѓС‚ Р±С‹С‚СЊ РѕРіСЂР°РЅРёС‡РµРЅС‹.","data_processing_consent_my_personal_data":"РјРѕРёС… РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… РґР°РЅРЅС‹С…","data_processing_consent_partner_checkbox_tooltip":"РЎР°Р№С‚ СЂР°Р±РѕС‚Р°РµС‚ РЅР° Р±Р°Р·Рµ РїСЂРѕРґСѓРєС‚РѕРІ РРєСЃРѕР»Р»Р°. РРєСЃРѕР»Р»Р° РѕР±СЂР°Р±Р°С‚С‹РІР°РµС‚ РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ, РєРѕС‚РѕСЂС‹Рµ РІС‹ РїСЂРµРґРѕСЃС‚Р°РІРёР»Рё РІ Р›РёС‡РЅРѕРј РєР°Р±РёРЅРµС‚Рµ: РёРґРµРЅС‚РёС„РёРєР°С†РёРѕРЅРЅС‹Рµ Рё РєРѕРЅС‚Р°РєС‚РЅС‹Рµ РґР°РЅРЅС‹Рµ (Р»РёС‡РЅС‹Рµ РёР»Рё СЂР°Р±РѕС‡РёРµ).","essential_cookies_checkbox":"РўРµС…РЅРёС‡РµСЃРєРёРµ С„Р°Р№Р»С‹ Cookie","essential_cookies_description":"Р­С‚РѕС‚ С‚РёРї С„Р°Р№Р»РѕРІ РЅРµРѕР±С…РѕРґРёРј РґР»СЏ РєРѕСЂСЂРµРєС‚РЅРѕР№ СЂР°Р±РѕС‚С‹ СЃР°Р№С‚Р° Рё РїСЂРѕРґСѓРєС‚РѕРІ РРєСЃРѕР»Р»Р°. РћС‚ СЌС‚РёС… С„Р°Р№Р»РѕРІ Cookie РЅРµР»СЊР·СЏ РѕС‚РєР°Р·Р°С‚СЊСЃСЏ. РќР°РїСЂРёРјРµСЂ, РѕРЅРё РїРѕР·РІРѕР»СЏСЋС‚ РІР°Рј РІС‹РїРѕР»РЅСЏС‚СЊ РІС…РѕРґ РІ Р°РєРєР°СѓРЅС‚, РѕС‚СЃР»РµР¶РёРІР°С‚СЊ СЃС‚Р°С‚СѓСЃ РїР»Р°С‚РµР¶Р° Рё РїРѕР»СѓС‡Р°С‚СЊ РїРѕРјРѕС‰СЊ РѕС‚ СЃР»СѓР¶Р±С‹ РїРѕРґРґРµСЂР¶РєРё.<br/>Р’С‹ РјРѕР¶РµС‚Рµ РЅР°СЃС‚СЂРѕРёС‚СЊ Р±СЂР°СѓР·РµСЂ С‚Р°Рє, С‡С‚РѕР±С‹ РѕРЅ Р±Р»РѕРєРёСЂРѕРІР°Р» СЌС‚Рё С„Р°Р№Р»С‹ РёР»Рё РїСЂРµРґСѓРїСЂРµР¶РґР°Р» РѕР± РёС… РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРё, РЅРѕ С‚РѕРіРґР° РЅРµРєРѕС‚РѕСЂС‹Рµ СЂР°Р·РґРµР»С‹ СЃР°Р№С‚Р° РјРѕРіСѓС‚ СЂР°Р±РѕС‚Р°С‚СЊ СЃ РѕС€РёР±РєР°РјРё.","essential_cookies_list_link_name":"РЎРїРёСЃРѕРє С‚РµС…РЅРёС‡РµСЃРєРёС… С„Р°Р№Р»РѕРІ Cookie","essential_cookies_tooltip":"РћС‚ СЌС‚РёС… С„Р°Р№Р»РѕРІ Cookie РЅРµР»СЊР·СЏ РѕС‚РєР°Р·Р°С‚СЊСЃСЏ.","functional_cookies_checkbox":"Р¤СѓРЅРєС†РёРѕРЅР°Р»СЊРЅС‹Рµ С„Р°Р№Р»С‹ Cookie","functional_cookies_description":"Р­С‚РѕС‚ С‚РёРї С„Р°Р№Р»РѕРІ РїРѕР·РІРѕР»СЏРµС‚ Р·Р°РїРѕРјРёРЅР°С‚СЊ РІР°С€Рё РЅР°СЃС‚СЂРѕР№РєРё Рё РїСЂРµРґРїРѕС‡С‚РµРЅРёСЏ. Р­С‚Рѕ РїРѕРјРѕРіР°РµС‚ РЅР°Рј РїСЂРµРґРѕСЃС‚Р°РІР»СЏС‚СЊ СѓР»СѓС‡С€РµРЅРЅС‹Рµ Рё РїРµСЂСЃРѕРЅР°Р»РёР·РёСЂРѕРІР°РЅРЅС‹Рµ РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё. РќР°РїСЂРёРјРµСЂ, РІР°Рј РЅРµ РїСЂРёРґРµС‚СЃСЏ РїРѕРІС‚РѕСЂРЅРѕ РІРІРѕРґРёС‚СЊ РґР°РЅРЅС‹Рµ РёР»Рё Р·Р°РЅРѕРІРѕ РІС‹РїРѕР»РЅСЏС‚СЊ РЅР°СЃС‚СЂРѕР№РєСѓ.<br/>Р‘РµР· СЌС‚РёС… С„Р°Р№Р»РѕРІ Cookie РЅРµРєРѕС‚РѕСЂС‹Рµ С„СѓРЅРєС†РёРѕРЅР°Р»СЊРЅС‹Рµ РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё РЅРµ Р±СѓРґСѓС‚ СЂР°Р±РѕС‚Р°С‚СЊ РЅР°РґР»РµР¶Р°С‰РёРј РѕР±СЂР°Р·РѕРј.","functional_cookies_link_name":"РЎРїРёСЃРѕРє С„СѓРЅРєС†РёРѕРЅР°Р»СЊРЅС‹С… С„Р°Р№Р»РѕРІ Cookie","opt_out_consent":"РЇ РїРѕРЅРёРјР°СЋ, С‡С‚Рѕ РРєСЃРѕР»Р»Р° РјРѕР¶РµС‚ РґРµР»РёС‚СЊСЃСЏ РјРѕРёРјРё РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹РјРё РґР°РЅРЅС‹РјРё СЃ {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Р°С„С„РёР»РёСЂРѕРІР°РЅРЅС‹РјРё Р»РёС†Р°РјРё РРєСЃРѕР»Р»Р°","opt_out_description":"Р’С‹ РёРјРµРµС‚Рµ РїСЂР°РІРѕ РІ Р»СЋР±РѕР№ РјРѕРјРµРЅС‚ РѕС‚РѕР·РІР°С‚СЊ СЃРІРѕРµ СЃРѕРіР»Р°СЃРёРµ РёР»Рё РёР·РјРµРЅРёС‚СЊ СЃРІРѕР№ РІС‹Р±РѕСЂ. Р’Р°С€ РѕС‚РєР°Р· РЅРµ РїРѕРІР»РёСЏРµС‚ РЅР° Р·Р°РєРѕРЅРЅРѕСЃС‚СЊ РїСЂРµРґС€РµСЃС‚РІСѓСЋС‰РµР№ РѕР±СЂР°Р±РѕС‚РєРё РґР°РЅРЅС‹С…, С‚. Рє. РѕРЅР° РѕСЃРЅРѕРІР°РЅР° РЅР° СЃРѕРіР»Р°СЃРёРё, РєРѕС‚РѕСЂРѕРµ РІС‹ РґР°РІР°Р»Рё СЂР°РЅРµРµ.","opt_out_title":"РћС‚РєР°Р· РѕС‚ РѕР±СЂР°Р±РѕС‚РєРё РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… РґР°РЅРЅС‹С…","privacy_policy_link_name":"РџРѕР»РёС‚РёРєР° РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚Рё","return_button":"РќР°Р·Р°Рґ","save_and_close_button":"РЎРѕС…СЂР°РЅРёС‚СЊ Рё Р·Р°РєСЂС‹С‚СЊ","saving_button":"РЎРѕС…СЂР°РЅРµРЅРёРµ...","settings_button":"РќР°СЃС‚СЂРѕР№РєРё","settings_footer_description":"*Р•СЃР»Рё С„Р»Р°Р¶РѕРє СѓСЃС‚Р°РЅРѕРІР»РµРЅ, Р·РЅР°С‡РёС‚ РІС‹ СѓР¶Рµ СЃРґРµР»Р°Р»Рё СЃРІРѕР№ РІС‹Р±РѕСЂ РІ РґСЂСѓРіРѕРј РїСЂРѕРґСѓРєС‚Рµ РРєСЃРѕР»Р»Р°.","settings_title":"РќР°СЃС‚СЂРѕР№РєРё РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚Рё","targeting_cookies_checkbox":"Р РµРєР»Р°РјРЅС‹Рµ С„Р°Р№Р»С‹ Cookie","targeting_cookies_description":"Р­С‚РѕС‚ С‚РёРї С„Р°Р№Р»РѕРІ РїРѕР·РІРѕР»СЏРµС‚ РѕС‚СЃР»РµР¶РёРІР°С‚СЊ СЃС‚СЂР°РЅРёС†С‹, РєРѕС‚РѕСЂС‹Рµ РІС‹ РїРѕСЃРµС‰Р°РµС‚Рµ РЅР° СЃР°Р№С‚Рµ РёР»Рё РІ РїСЂРѕРґСѓРєС‚Р°С… РРєСЃРѕР»Р»Р°, Рё СЃСЃС‹Р»РєРё, РїРѕ РєРѕС‚РѕСЂС‹Рј РІС‹ РїРµСЂРµС…РѕРґРёС‚Рµ. РњС‹ РёСЃРїРѕР»СЊР·СѓРµРј СЌС‚Сѓ РёРЅС„РѕСЂРјР°С†РёСЋ, С‡С‚РѕР±С‹ РїРѕРґР±РёСЂР°С‚СЊ РґР»СЏ РІР°СЃ РЅР°РёР±РѕР»РµРµ РёРЅС‚РµСЂРµСЃРЅС‹Рµ РјР°С‚РµСЂРёР°Р»С‹. РњС‹ С‚Р°РєР¶Рµ РѕСЃС‚Р°РІР»СЏРµРј Р·Р° СЃРѕР±РѕР№ РїСЂР°РІРѕ РґРµР»РёС‚СЊСЃСЏ РґР°РЅРЅРѕР№ РёРЅС„РѕСЂРјР°С†РёРµР№ СЃ С‚СЂРµС‚СЊРёРјРё Р»РёС†Р°РјРё.<br/>Р‘РµР· СЌС‚РёС… С„Р°Р№Р»РѕРІ Cookie РІС‹ РїРѕ-РїСЂРµР¶РЅРµРјСѓ Р±СѓРґРµС‚Рµ РІРёРґРµС‚СЊ СЂРµРєР»Р°РјРЅС‹Рµ РѕР±СЉСЏРІР»РµРЅРёСЏ, РЅРѕ РѕРЅРё РЅРµ Р±СѓРґСѓС‚ СЃРѕРѕС‚РІРµС‚СЃС‚РІРѕРІР°С‚СЊ РІР°С€РёРј РёРЅС‚РµСЂРµСЃР°Рј.","targeting_cookies_link_name":"РЎРїРёСЃРѕРє СЂРµРєР»Р°РјРЅС‹С… С„Р°Р№Р»РѕРІ Cookie","welcome_screen_allow_cookies":"РЇ РґР°СЋ СЃРІРѕРµ СЃРѕРіР»Р°СЃРёРµ РЅР° РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ С„Р°Р№Р»РѕРІ Cookie","welcome_screen_data_processing":"РЇ РґР°СЋ СЃРІРѕРµ СЃРѕРіР»Р°СЃРёРµ РРєСЃРѕР»Р»Рµ РЅР° РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ {myPersonalDataTooltip} РІ С†РµР»СЏС… РїРѕРґР±РѕСЂР° РЅР°РёР±РѕР»РµРµ РёРЅС‚РµСЂРµСЃРЅС‹С… РґР»СЏ РјРµРЅСЏ РјР°С‚РµСЂРёР°Р»РѕРІ.","welcome_screen_description":"Р’С‹ РјРѕР¶РµС‚Рµ РІ Р»СЋР±РѕР№ РјРѕРјРµРЅС‚ РёР·РјРµРЅРёС‚СЊ СЃРІРѕР№ РІС‹Р±РѕСЂ РІ РќР°СЃС‚СЂРѕР№РєР°С… РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚Рё.","welcome_screen_mobile_description":"РќР°Р¶РёРјР°СЏ \\"{acceptAllButtonText}\\", РІС‹ РґР°РµС‚Рµ СЃРѕРіР»Р°СЃРёРµ РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… РґР°РЅРЅС‹С… Рё С„Р°Р№Р»РѕРІ Cookie. Р’С‹ С‚Р°РєР¶Рµ РјРѕР¶РµС‚Рµ Р·Р°РґР°С‚СЊ РёРЅРґРёРІРёРґСѓР°Р»СЊРЅС‹Рµ РїР°СЂР°РјРµС‚СЂС‹ РІ РќР°СЃС‚СЂРѕР№РєР°С….","welcome_screen_title":"РњС‹ СѓРІР°Р¶Р°РµРј РІР°С€Рµ РїСЂР°РІРѕ РЅР° РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚СЊ"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"аёўаё­аёЎаёЈаё±аёљаё—аё±а№‰аё‡аё«аёЎаё”","analytical_performance_cookies_checkbox":"аё„аёёаёЃаёЃаёµа№‰а№Ђаёћаё·а№€аё­аёЃаёІаёЈаё§аёґа№Ђаё„аёЈаёІаё°аё«а№Ња№ЃаёҐаё°аё§аё±аё”аё›аёЈаё°аёЄаёґаё—аёаёґаё аёІаёћ","analytical_performance_cookies_description":"аё„аёёаёЃаёЃаёµа№‰а№Ђаё«аёҐа№€аёІаё™аёµа№‰аё€аё°аёЈаё§аёљаёЈаё§аёЎаё‚а№‰аё­аёЎаё№аёҐа№ЂаёЃаёµа№€аёўаё§аёЃаё±аёљаёЃаёІаёЈа№ѓаёЉа№‰а№Ђаё§а№‡аёља№„аё‹аё•а№Њаё™аёµа№‰аё‚аё­аё‡аё„аёёаё“а№ЃаёҐаё°аёЉа№€аё§аёўа№ѓаё«а№‰а№ЂаёЈаёІаёЄаёІаёЎаёІаёЈаё–аё›аёЈаё±аёљаё›аёЈаёёаё‡аё§аёґаёаёµаёЃаёІаёЈаё—аёіаё‡аёІаё™аё‚аё­аё‡аё„аёёаёЃаёЃаёµа№‰ аёЈаё§аёЎаё–аё¶аё‡аёЉа№€аё§аёўа№ѓаё«а№‰аё›аёЈаё°аёЄаёљаёЃаёІаёЈаё“а№ЊаёЃаёІаёЈа№ѓаёЉа№‰аё‡аёІаё™аё‚аё­аё‡аё„аёёаё“аёЃаё±аёљаёњаёҐаёґаё•аё аё±аё“аё‘а№Њаё­аё·а№€аё™ а№† аё‚аё­аё‡а№Ђаё­а№‡аёЃаё‹а№Ња№‚аё‹аёҐаёҐа№€аёІаё”аёµаёўаёґа№€аё‡аё‚аё¶а№‰аё™ аё•аё±аё§аё­аёўа№€аёІаё‡а№ЂаёЉа№€аё™ а№ЂаёЈаёІаёЄаёІаёЎаёІаёЈаё–а№ѓаё«а№‰аё„аё§аёІаёЎаёЎаё±а№€аё™а№ѓаё€а№ЃаёЃа№€аё„аёёаё“а№„аё”а№‰аё§а№€аёІаё€аё°аёЄаёІаёЎаёІаёЈаё–аё„а№‰аё™аё«аёІаёЄаёґа№€аё‡аё—аёµа№€аё„аёёаё“аёЃаёіаёҐаё±аё‡аёЎаё­аё‡аё«аёІаё­аёўаё№а№€а№„аё”а№‰аё­аёўа№€аёІаё‡аё‡а№€аёІаёўаё”аёІаёў аё«аёЈаё·аё­аёљаё±аё™аё—аё¶аёЃаё„аё§аёІаёЎаёўаёІаёЃаё—аёµа№€аё„аёёаё“аё­аёІаё€аёЎаёµаё­аёўаё№а№€а№ѓаё” а№† <br/> аё«аёІаёЃаё„аёёаё“а№„аёЎа№€аёўаё­аёЎаёЈаё±аёљаё„аёёаёЃаёЃаёµа№‰а№Ђаё«аёҐа№€аёІаё™аёµа№‰ а№ЂаёЈаёІаё€аё°а№„аёЎа№€аё—аёЈаёІаёљаё§а№€аёІаё„аёёаё“а№„аё”а№‰а№Ђаё‚а№‰аёІаёЉаёЎа№Ђаё§а№‡аёља№„аё‹аё•а№Њаё‚аё­аё‡а№ЂаёЈаёІа№ЂаёЎаё·а№€аё­а№ѓаё” а№ЃаёҐаё°аё€аё°а№„аёЎа№€аёЄаёІаёЎаёІаёЈаё–аё•аёґаё”аё•аёІаёЎаё›аёЈаё°аёЄаёґаё—аёаёґаё аёІаёћаёЃаёІаёЈаё—аёіаё‡аёІаё™аё‚аё­аё‡а№Ђаё§а№‡аёља№„аё‹аё•а№Ња№„аё”а№‰","analytical_performance_cookies_link_name":"аёЈаёІаёўаёЃаёІаёЈаё„аёёаёЃаёЃаёµа№‰а№Ђаёћаё·а№€аё­аёЃаёІаёЈаё§аёґа№Ђаё„аёЈаёІаё°аё«а№Ња№ЃаёҐаё°аё§аё±аё”аё›аёЈаё°аёЄаёґаё—аёаёґаё аёІаёћ","cookie_policy_link_name":"аё™а№‚аёўаёљаёІаёўаё„аёёаёЃаёЃаёµа№‰","data_processing_consent_checkbox":"аё„аё§аёІаёЎаёўаёґаё™аёўаё­аёЎа№ѓаё™аёЃаёІаёЈаё›аёЈаё°аёЎаё§аёҐаёњаёҐаё‚а№‰аё­аёЎаё№аёҐ","data_processing_consent_customer_checkbox_tooltip":"а№Ђаё§а№‡аёља№„аё‹аё•а№Њаё™аёµа№‰аё—аёіаё‡аёІаё™аёљаё™аёњаёҐаёґаё•аё аё±аё“аё‘а№Њаё‚аё­аё‡а№Ђаё­а№‡аёЃаё‹а№Ња№‚аё‹аёҐаёҐа№€аёІ аё‹аё¶а№€аё‡аё€аё°аё€аё±аё”аёЃаёІаёЈаё‚а№‰аё­аёЎаё№аёҐаёЄа№€аё§аё™аё•аё±аё§аё‚аё­аё‡аё„аёёаё“ а№ЂаёЉа№€аё™ аёЉаё·а№€аё­-аё™аёІаёЎаёЄаёЃаёёаёҐ аё«аёЈаё·аё­аёЉаё·а№€аё­а№ЂаёҐа№€аё™ аё—аёµа№€аё­аёўаё№а№€аё­аёµа№ЂаёЎаёҐ аё—аёµа№€аё­аёўаё№а№€а№„аё­аёћаёµ аё‚а№‰аё­аёЎаё№аёҐаё аё№аёЎаёґаёЁаёІаёЄаё•аёЈа№Њ а№ЃаёҐаё°аёЈаё«аё±аёЄаёњаё№а№‰а№ѓаёЉа№‰аё—аёµа№€а№„аёЎа№€аё‹а№‰аёіаёЃаё±аё™","data_processing_consent_description":"а№ЂаёЈаёІаё•а№‰аё­аё‡а№„аё”а№‰аёЈаё±аёљаёЃаёІаёЈаёўаёґаё™аёўаё­аёЎаё€аёІаёЃаё„аёёаё“а№Ђаёћаё·а№€аё­а№ѓаёЉа№‰аё‚а№‰аё­аёЎаё№аёҐаёЄа№€аё§аё™аёљаёёаё„аё„аёҐаё‚аё­аё‡аё„аёёаё“а№ЃаёҐаё°аё‚а№‰аё­аёЎаё№аёҐаё€аёІаёЃаё„аёёаёЃаёЃаёµа№‰а№Ђаёћаё·а№€аё­аё™аёіа№ЂаёЄаё™аё­аёЃаёІаёЈаёљаёЈаёґаёЃаёІаёЈаё—аёµа№€аё›аёЈаё±аёља№Ѓаё•а№€аё‡а№ѓаё«а№‰а№Ђаё«аёЎаёІаё°аёЄаёЎаёЃаё±аёљаё„аёёаё“ аё«аёІаёЃаё„аёёаё“аё•аё±аё”аёЄаёґаё™а№ѓаё€аё—аёµа№€аё€аё°а№„аёЎа№€аё­аё™аёёаёЌаёІаё•а№ѓаё«а№‰аё›аёЈаё°аёЎаё§аёҐаёњаёҐаё‚а№‰аё­аёЎаё№аёҐ а№ЂаёЈаёІаё€аё°а№ѓаёЉа№‰а№Ђаёћаёµаёўаё‡аё‚а№‰аё­аёЎаё№аёҐаё€аёІаёЃаё„аёёаёЃаёЃаёµа№‰аё—аёµа№€аё€аёіа№Ђаё›а№‡аё™а№Ђаё—а№€аёІаё™аё±а№‰аё™а№ЃаёҐаё°аё„аёёаё“аё€аё°а№„аёЎа№€аёЄаёІаёЎаёІаёЈаё–а№ЂаёћаёҐаёґаё”а№ЂаёћаёҐаёґаё™а№„аё›аёЃаё±аёљаёЃаёІаёЈаёљаёЈаёґаёЃаёІаёЈа№Ѓаёљаёљаё„аёЈаёљаё„аёЈаё±аё™аё‚аё­аё‡а№ЂаёЈаёІа№„аё”а№‰","data_processing_consent_my_personal_data":"аё‚а№‰аё­аёЎаё№аёҐаёЄа№€аё§аё™аё•аё±аё§аё‚аё­аё‡аё‰аё±аё™","data_processing_consent_partner_checkbox_tooltip":"а№Ђаё§а№‡аёља№„аё‹аё•а№Њаё™аёµа№‰аё—аёіаё‡аёІаё™аёљаё™аёњаёҐаёґаё•аё аё±аё“аё‘а№Њаё‚аё­аё‡а№Ђаё­а№‡аёЃаё‹а№Ња№‚аё‹аёҐаёҐа№€аёІ аё‹аё¶а№€аё‡аё€аё°аё€аё±аё”аёЃаёІаёЈаё‚а№‰аё­аёЎаё№аёҐаёЄа№€аё§аё™аё•аё±аё§аё‚аё­аё‡аё„аёёаё“ а№ЂаёЉа№€аё™ аё­аё±аё•аёҐаё±аёЃаё©аё“а№Њаёљаёёаё„аё„аёҐа№ЃаёҐаё°аёЈаёІаёўаёЉаё·а№€аё­аё•аёґаё”аё•а№€аё­ аё«аёЈаё·аё­аёЈаёІаёўаёҐаё°а№Ђаё­аёµаёўаё”аё—аёІаё‡аёаёёаёЈаёЃаёґаё€аё—аёµа№€аё„аёёаё“а№„аё”а№‰а№ѓаё«а№‰а№„аё§а№‰а№ѓаё™аёљаё±аёЌаёЉаёµаёњаё№а№‰а№Ђаёњаёўа№ЃаёћаёЈа№€а№‚аё†аё©аё“аёІ","essential_cookies_checkbox":"аё„аёёаёЃаёЃаёµа№‰аё—аёµа№€аё€аёіа№Ђаё›а№‡аё™","essential_cookies_description":"аё„аёёаёЃаёЃаёµа№‰а№Ђаё«аёҐа№€аёІаё™аёµа№‰аё€аёіа№Ђаё›а№‡аё™аёЄаёіаё«аёЈаё±аёљаёЃаёІаёЈаё—аёіаё‡аёІаё™аёљаё™а№Ђаё§а№‡аёља№„аё‹аё•а№Ња№ЃаёҐаё°аёњаёҐаёґаё•аё аё±аё“аё‘а№Њаё‚аё­аё‡а№Ђаё­а№‡аёЃаё‹а№Ња№‚аё‹аёҐаёҐа№€аёІаё‚аё­аё‡а№ЂаёЈаёІ а№ЃаёҐаё°а№„аёЎа№€аёЄаёІаёЎаёІаёЈаё–аё›аёґаё”аёЃаёІаёЈаё—аёіаё‡аёІаё™а№„аё”а№‰ аё•аё±аё§аё­аёўа№€аёІаё‡а№ЂаёЉа№€аё™ а№Ђаё§а№‡аёља№„аё‹аё•а№Ња№ЃаёҐаё°аёњаёҐаёґаё•аё аё±аё“аё‘а№Њаё€аё°аёЎаёµаё„аёёаёЃаёЃаёµа№‰аё‹аё¶а№€аё‡аёЉа№€аё§аёўа№ѓаё«а№‰аё„аёёаё“аёЄаёІаёЎаёІаёЈаё–а№Ђаё‚а№‰аёІаёЄаё№а№€аёЈаё°аёљаёља№„аё›аёўаё±аё‡аёљаё±аёЌаёЉаёµаёЄа№€аё§аё™аё•аё±аё§а№ЃаёҐаё°аё„аёёаёЃаёЃаёµа№‰аё‚аё­аё‡аё„аёёаё“аё‹аё¶а№€аё‡аёЎаё­аёљаёЃаёЈаё°аёљаё§аё™аёЃаёІаёЈаё›аёЈаё°аёЎаё§аёҐаёњаёҐаёЃаёІаёЈаёЉаёіаёЈаё°а№Ђаё‡аёґаё™аё­аёўа№€аёІаё‡аё–аё№аёЃаё•а№‰аё­аё‡ аёЈаё§аёЎаё–аё¶аё‡аёЃаёІаёЈаёЄаё™аё±аёљаёЄаё™аёёаё™аёҐаё№аёЃаё„а№‰аёІ <br/> аё„аёёаё“аёЄаёІаёЎаёІаёЈаё–аё•аё±а№‰аё‡аё„а№€аёІа№ЂаёљаёЈаёІаё§а№Ња№Ђаё‹аё­аёЈа№Ња№Ђаёћаё·а№€аё­аё›аёґаё”аёЃаё±а№‰аё™аё«аёЈаё·аё­а№Ѓаё€а№‰аё‡а№Ђаё•аё·аё­аё™аё„аёёаё“а№ЂаёЃаёµа№€аёўаё§аёЃаё±аёљаё„аёёаёЃаёЃаёµа№‰а№Ђаё«аёҐа№€аёІаё™аёµа№‰ а№Ѓаё•а№€аёљаёІаё‡аёЄа№€а№€аё§аё™аё‚аё­аё‡а№Ђаё§а№‡аёља№„аё‹аё•а№Њаё™аёµа№‰аё­аёІаё€аё—аёіаё‡аёІаё™а№„аёЎа№€а№„аё”а№‰аё•аёІаёЎаё—аёµа№€аё„аёІаё”аё«аё§аё±аё‡а№„аё§а№‰","essential_cookies_list_link_name":"аёЈаёІаёўаёЃаёІаёЈаё‚аё­аё‡аё„аёёаёЃаёЃаёµа№‰аё—аёµа№€аё€аёіа№Ђаё›а№‡аё™","essential_cookies_tooltip":"а№„аёЎа№€аёЄаёІаёЎаёІаёЈаё–аёЄаёҐаё±аёљаё„аёёаёЃаёЃаёµа№‰аё›аёЈаё°а№Ђаё аё—аё™аёµа№‰а№„аё”а№‰","functional_cookies_checkbox":"аё„аёёаёЃаёЃаёµа№‰аё—аёµа№€а№ЂаёЃаёµа№€аёўаё§аёЃаё±аёљаёЃаёІаёЈаё—аёіаё‡аёІаё™","functional_cookies_description":"аё„аёёаёЃаёЃаёµа№‰а№Ђаё«аёҐа№€аёІаё™аёµа№‰аёЉа№€аё§аёўа№ѓаё«а№‰а№ЂаёЈаёІаё€аё”аё€аёіаё•аё±аё§а№ЂаёҐаё·аё­аёЃаё—аёµа№€аё„аёёаё“а№ЂаёҐаё·аё­аёЃаёљаё™а№Ђаё§а№‡аёља№„аё‹аё•а№Њаё«аёЈаё·аё­аёњаёҐаёґаё•аё аё±аё“аё‘а№Њаё‚аё­аё‡а№Ђаё­а№‡аёЃаё‹а№Ња№‚аё‹аёҐаёҐа№€аёІ аё‹аё¶а№€аё‡аёЉа№€аё§аёўа№ѓаё«а№‰а№ЂаёЈаёІаёЄаёІаёЎаёІаёЈаё–аёЎаё­аёљаёџаёµа№Ђаё€аё­аёЈа№Њаё—аёµа№€аё”аёµаёўаёґа№€аё‡аё‚аё¶а№‰аё™а№ЃаёҐаё°а№Ђаё›а№‡аё™аёЄа№€аё§аё™аё•аё±аё§аёЎаёІаёЃаё‚аё¶а№‰аё™ аё•аё±аё§аё­аёўа№€аёІаё‡а№ЂаёЉа№€аё™ а№ЂаёЈаёІаёЄаёІаёЎаёІаёЈаё–аё›аёЈаё±аёља№Ѓаё•а№€аё‡аёљаёІаё‡аё«аё™а№‰аёІа№ѓаё«а№‰а№ЃаёЃа№€аё„аёёаё“ аё«аёЈаё·аё­аёЎаё­аёљаёЃаёІаёЈаёљаёЈаёґаёЃаёІаёЈаё­аё·а№€аё™ а№† аё•аёІаёЎаё—аёµа№€аё„аёёаё“аёЈа№‰аё­аё‡аё‚аё­ <br/> аё«аёІаёЃаё„аёёаё“а№„аёЎа№€аёўаё­аёЎаёЈаё±аёљаё„аёёаёЃаёЃаёµа№‰а№Ђаё«аёҐа№€аёІаё™аёµа№‰ аё„аёёаё“аёЄаёЎаёљаё±аё•аёґаёљаёІаё‡аё­аёўа№€аёІаё‡аё«аёЈаё·аё­аёљаёІаё‡аё—аё±а№‰аё‡аё«аёЎаё”аё­аёІаё€аё—аёіаё‡аёІаё™а№„аёЎа№€аёЄаёЎаёљаё№аёЈаё“а№Њ","functional_cookies_link_name":"аёЈаёІаёўаёЉаё·а№€аё­аё‚аё­аё‡аё„аёёаёЃаёЃаёµа№‰аё—аёµа№€а№ЂаёЃаёµа№€аёўаё§аёЃаё±аёљаёЃаёІаёЈаё—аёіаё‡аёІаё™","opt_out_consent":"аё‰аё±аё™а№Ђаё‚а№‰аёІа№ѓаё€аё§а№€аёІа№Ђаё­а№‡аёЃаё‹а№Ња№‚аё‹аёҐаёҐа№€аёІаё­аёІаё€а№Ѓаёља№€аё‡аё›аё±аё™аё‚а№‰аё­аёЎаё№аёҐаёЄа№€аё§аё™аёљаёёаё„аё„аёҐаё‚аё­аё‡аё‰аё±аё™а№ѓаё™ {xsollaGroupConsentLink}.","opt_out_consent_link_name":"аёЃаёҐаёёа№€аёЎа№Ђаё­а№‡аёЃаё‹а№Ња№‚аё‹аёҐаёҐа№€аёІ","opt_out_description":"аё„аёёаё“аёЎаёµаёЄаёґаё—аёаёґа№Њаё—аёµа№€аё€аё°а№Ђаё›аёҐаёµа№€аёўаё™аё«аёЈаё·аё­а№ЂаёћаёґаёЃаё–аё­аё™аё„аё§аёІаёЎаёўаёґаё™аёўаё­аёЎа№„аё”а№‰аё—аёёаёЃа№ЂаёЎаё·а№€аё­ аёЃаёІаёЈа№ЂаёћаёґаёЃаё–аё­аё™аё„аё§аёІаёЎаёўаёґаё™аёўаё­аёЎа№„аёЎа№€аёЄа№€аё‡аёњаёҐаё•а№€аё­аёЃаёІаёЈаё›аёЏаёґаёљаё±аё•аёґаё•аёІаёЎаёЃаёЋаё«аёЎаёІаёўаё‚аё­аё‡аёЃаёІаёЈаё”аёіа№Ђаё™аёґаё™аёЃаёІаёЈаё—аёµа№€аёња№€аёІаё™аёЎаёІ а№Ђаё™аё·а№€аё­аё‡аё€аёІаёЃаёЃаёІаёЈаё”аёіа№Ђаё™аёґаё™аёЃаёІаёЈаё”аё±аё‡аёЃаёҐа№€аёІаё§аё­а№‰аёІаё‡аё­аёґаё‡аё€аёІаёЃаёЃаёІаёЈаёўаёґаё™аёўаё­аёЎаёЃа№€аё­аё™аё«аё™а№‰аёІ","opt_out_title":"а№ЂаёҐаё·аё­аёЃа№Ђаёћаё·а№€аё­аёўаёЃа№ЂаёҐаёґаёЃ","privacy_policy_link_name":"аё™а№‚аёўаёљаёІаёўаё„аё§аёІаёЎа№Ђаё›а№‡аё™аёЄа№€аё§аё™аё•аё±аё§","return_button":"аёЃаёҐаё±аёљаё„аё·аё™","save_and_close_button":"аёљаё±аё™аё—аё¶аёЃа№ЃаёҐаё°аё›аёґаё”","saving_button":"аёЃаёіаёҐаё±аё‡аёљаё±аё™аё—аё¶аёЃ...","settings_button":"аёЃаёІаёЈаё•аё±а№‰аё‡аё„а№€аёІ","settings_footer_description":"*аё«аёІаёЃаёЎаёµаёЃаёІаёЈаё—аёіа№Ђаё„аёЈаё·а№€аё­аё‡аё«аёЎаёІаёўаё—аёµа№€аёЃаёҐа№€аё­аё‡аёЃаёІа№Ђаё„аёЈаё·а№€аё­аё‡аё«аёЎаёІаёўаё™аёµа№‰ аё«аёЎаёІаёўаё„аё§аёІаёЎаё§а№€аёІаё„аёёаё“а№„аё”а№‰а№ЂаёҐаё·аё­аёЃаё•аё±аё§а№ЂаёҐаё·аё­аёЃа№ѓаё™аёњаёҐаёґаё•аё аё±аё“аё‘а№Њаё­аё·а№€аё™аё‚аё­аё‡а№Ђаё­а№‡аёЃаё‹а№Ња№‚аё‹аёҐаёҐа№€аёІ","settings_title":"аёЃаёІаёЈаё•аё±а№‰аё‡аё„а№€аёІаё„аё§аёІаёЎа№Ђаё›а№‡аё™аёЄа№€аё§аё™аё•аё±аё§","targeting_cookies_checkbox":"аёЃаёІаёЈаёЃаёіаё«аё™аё”а№Ђаё›а№‰аёІаё«аёЎаёІаёўаё‚аё­аё‡аё„аёёаёЃаёЃаёµа№‰","targeting_cookies_description":"аё„аёёаёЃаёЃаёµа№‰а№Ђаё«аёҐа№€аёІаё™аёµа№‰аёљаё±аё™аё—аё¶аёЃаё«аё™а№‰аёІаё—аёµа№€аё„аёёаё“а№„аё”а№‰а№Ђаё‚а№‰аёІаёЉаёЎаёљаё™а№Ђаё§а№‡аёља№„аё‹аё•а№Њаё™аёµа№‰аё«аёЈаё·аё­а№ѓаё™аёњаёҐаёґаё•аё аё±аё“аё‘а№Њаё‚аё­аё‡а№Ђаё­а№‡аёЃаё‹а№Ња№‚аё‹аёҐаёҐа№€аёІа№ЃаёҐаё°аёҐаёґаё‡аёЃа№Њаё—аёµа№€аё„аёёаё“аё•аёґаё”аё•аёІаёЎ а№ЂаёЈаёІа№ѓаёЉа№‰аё‚а№‰аё­аёЎаё№аёҐаё™аёµа№‰а№Ђаёћаё·а№€аё­аёЄаёЈа№‰аёІаё‡а№Ђаё§а№‡аёља№„аё‹аё•а№Ња№ЃаёҐаё°аёЃаёІаёЈа№‚аё†аё©аё“аёІаё‚аё­аё‡а№ЂаёЈаёІаё—аёµа№€аё›аёЈаёІаёЃаёЏа№ѓаё«а№‰аёЎаёµаё„аё§аёІаёЎаёЄаё­аё”аё„аёҐа№‰аё­аё‡аёЃаё±аёљаёЄаёґа№€аё‡аё—аёµа№€аё„аёёаё“аёЄаё™а№ѓаё€аёЎаёІаёЃаёўаёґа№€аё‡аё‚аё¶а№‰аё™ а№ЂаёЈаёІаё­аёІаё€а№Ѓаёља№€аё‡аё›аё±аё™аё‚а№‰аё­аёЎаё№аёҐаё™аёµа№‰аёЃаё±аёљаёљаёёаё„аё„аёҐаё—аёµа№€аёЄаёІаёЎа№Ђаёћаё·а№€аё­аё§аё±аё•аё–аёёаё›аёЈаё°аёЄаё‡аё„а№Њаё”аё±аё‡аёЃаёҐа№€аёІаё§<br/> аё«аёІаёЃаё„аёёаё“а№„аёЎа№€аёўаё­аёЎаёЈаё±аёљаё„аёёаёЃаёЃаёµа№‰а№Ђаё«аёҐа№€аёІаё™аёµа№‰ аё„аёёаё“аё€аё°аёўаё±аё‡аё„аё‡а№Ђаё«а№‡аё™а№‚аё†аё©аё“аёІаё­аёўаё№а№€ а№Ѓаё•а№€аё€аё°а№„аёЎа№€аёЎаёµаёЃаёІаёЈаё›аёЈаё±аёља№Ѓаё•а№€аё‡а№Ђаёћаё·а№€аё­а№ѓаё«а№‰аёЄаё­аё”аё„аёҐа№‰аё­аё‡аёЃаё±аёљаё„аё§аёІаёЎаёЄаё™а№ѓаё€аё‚аё­аё‡аё„аёёаё“","targeting_cookies_link_name":"аёЈаёІаёўаёЉаё·а№€аё­аё‚аё­аё‡аёЃаёІаёЈаёЃаёіаё«аё™аё”а№Ђаё›а№‰аёІаё«аёЎаёІаёўаё‚аё­аё‡аё„аёёаёЃаёЃаёµа№‰","welcome_screen_allow_cookies":"аё‰аё±аё™аёўаёґаё™аёўаё­аёЎаё—аёµа№€аё€аё°а№ѓаёЉа№‰аё„аёёаёЃаёЃаёµа№‰","welcome_screen_data_processing":"аё‰аё±аё™аёўаёґаё™аёўаё­аёЎа№ѓаё«а№‰а№Ђаё­а№‡аёЃаё‹а№Ња№‚аё‹аёҐаёҐа№€аёІа№ѓаёЉа№‰ {myPersonalDataTooltip}а№Ђаёћаё·а№€аё­а№ЂаёЄаё™аё­аёљаёЈаёґаёЃаёІаёЈаё—аёµа№€аё›аёЈаё±аёља№Ѓаё•а№€аё‡а№ѓаё«а№‰а№Ђаё«аёЎаёІаё°аёЄаёЎаёЃаё±аёљаё•аё±аё§аё‰аё±аё™","welcome_screen_description":"аё„аёёаё“аёЄаёІаёЎаёІаёЈаё–а№Ђаё›аёҐаёµа№€аёўаё™аё«аёЈаё·аё­а№ЂаёћаёґаёЃаё–аё­аё™аё„аё§аёІаёЎаёўаёґаё™аёўаё­аёЎаё‚аё­аё‡аё„аёёаё“а№„аё”а№‰аё—аёёаёЃа№ЂаёЎаё·а№€аё­а№‚аё”аёўаёЃаёІаёЈаёЃаёҐаё±аёља№„аё›аё—аёµа№€аёЃаёІаёЈаё•аё±а№‰аё‡аё„а№€аёІаё„аё§аёІаёЎа№Ђаё›а№‡аё™аёЄа№€аё§аё™аё•аё±аё§","welcome_screen_mobile_description":"аёЃаёІаёЈаё„аёҐаёґаёЃ \\"{acceptAllButtonText}\\" аё–аё·аё­аё§а№€аёІаё„аёёаё“а№„аё”а№‰а№ѓаё«а№‰аё„аё§аёІаёЎаёўаёґаё™аёўаё­аёЎа№ЃаёЃа№€а№ЂаёЈаёІа№ѓаё™аёЃаёІаёЈаё›аёЈаё°аёЎаё§аёҐаёњаёҐаё‚а№‰аё­аёЎаё№аёҐаёЄа№€аё§аё™аё•аё±аё§аё‚аё­аё‡аё„аёёаё“а№ЃаёҐаё°аё•аё±а№‰аё‡аё„а№€аёІаё„аёёаёЃаёЃаёµа№‰аё—аё±а№‰аё‡аё«аёЎаё” аё«аёЈаё·аё­аё„аёёаё“аё­аёІаё€аё›аёЈаё±аёља№Ђаё›аёҐаёµа№€аёўаё™аёЃаёІаёЈаёЃаёіаё«аё™аё”аё„а№€аёІаё‚аё­аё‡аё„аёёаё“а№„аё”а№‰а№ѓаё™аёЃаёІаёЈаё•аё±а№‰аё‡аё„а№€аёІ","welcome_screen_title":"а№ЂаёЈаёІа№Ђаё„аёІаёЈаёћаё„аё§аёІаёЎа№Ђаё›а№‡аё™аёЄа№€аё§аё™аё•аё±аё§аё‚аё­аё‡аё„аёёаё“"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"TГјmГјnГј kabul et","analytical_performance_cookies_checkbox":"Analitik Г§erezler ile performans Г§erezleri","analytical_performance_cookies_description":"Bu Г§erezler, bu web sitesini kullanД±mД±nД±z hakkД±nda bilgi toplar ve web sitesinin Г§alД±Еџma Еџeklini iyileЕџtirmemize ve diДџer Xsolla ГњrГјnleriyle ilgili deneyiminizi geliЕџtirmemize olanak tanД±r. Г–rneДџin, aradД±ДџД±nД±zД± kolayca bulmanД±zД± saДџlayabilir veya karЕџД±laЕџabileceДџiniz gГјГ§lГјkleri kaydedebiliriz. <br/> Bu Г§erezleri kabul etmezseniz web sitemizi ne zaman ziyaret ettiДџinizi bilemeyiz ve performansД±nД± izleyemeyiz.","analytical_performance_cookies_link_name":"Analitik Г§erezler ile performans Г§erezleri listesi","cookie_policy_link_name":"Г‡erez PolitikasД±","data_processing_consent_checkbox":"Veri iЕџleme izni","data_processing_consent_customer_checkbox_tooltip":"Bu site Xsolla ГњrГјnleri Гјzerinde Г§alД±ЕџtД±rД±lmaktadД±r. Xsolla, ad, soyad veya takma ad, e-posta adresi, IP adresi, coДџrafi konum bilgisi ve benzersiz kullanД±cД± kimliДџi gibi kiЕџisel verilerinizi yГ¶netir.","data_processing_consent_description":"Size Г¶zelleЕџtirilmiЕџ hizmetler sunmak Гјzere kiЕџisel verilerinizi ve Г§erezlerden elde edilen bilgileri kullanabilmemiz iГ§in izninize ihtiyacД±mД±z var. Veri iЕџlemeyi devre dД±ЕџД± bД±rakmaya karar verirseniz yalnД±zca zorunlu Г§erezlerden elde edilen verileri kullanacaДџД±z ve hizmetlerimizden tam olarak yararlanamayacaksД±nД±z.","data_processing_consent_my_personal_data":"kiЕџisel verilerimi","data_processing_consent_partner_checkbox_tooltip":"Bu site Xsolla ГњrГјnleri Гјzerinde Г§alД±ЕџtД±rД±lmaktadД±r. Xsolla, YayД±ncД± HesabД±nda ilettiДџiniz kimlik ve iletiЕџim veya iЕџ bilgileri gibi kiЕџisel verilerinizi yГ¶netir.","essential_cookies_checkbox":"Zorunlu Г§erezler","essential_cookies_description":"Bu Г§erezler, web sitemizin ve Xsolla ГњrГјnlerinin Г§alД±ЕџmasД± iГ§in gereklidir ve kapatД±lamaz. Г–rneДџin, kiЕџisel hesabД±nД±za giriЕџ yapmanД±zД± saДџlayan Г§erezler ile doДџru Г¶deme iЕџleme akД±ЕџД± ve mГјЕџteri desteДџi saДџlayan Г§erezleri iГ§erirler. <br/> TarayД±cД±nД±zД±, bu Г§erezleri engelleyecek veya bunlarla ilgili olarak sizi uyaracak Еџekilde ayarlayabilirsiniz, ancak bu durumda bu web sitesinin bazД± bГ¶lГјmleri beklendiДџi gibi Г§alД±Еџmayabilir.","essential_cookies_list_link_name":"Zorunlu Г§erezler listesi","essential_cookies_tooltip":"Bu tГјr Г§erezler kapatД±lamaz.","functional_cookies_checkbox":"Fonksiyonel Г§erezler","functional_cookies_description":"Bu Г§erezler, web sitemizde veya Xsolla ГњrГјnlerinde yaptД±ДџД±nД±z seГ§imleri hatД±rlamamД±zД± saДџlar. Bu sayede, geliЕџmiЕџ ve kiЕџiselleЕџtirilmiЕџ Г¶zellikler saДџlarД±z. Г–rneДџin, belirli bir sayfayД± sizin iГ§in Г¶zelleЕџtirebilir veya talebiniz Гјzerine baЕџka hizmetler saДџlayabiliriz. <br/> Bu Г§erezleri kabul etmezseniz, bu Г¶zelliklerin bazД±larД± veya tamamД± dГјzgГјn Г§alД±Еџmayabilir.","functional_cookies_link_name":"Fonksiyonel Г§erezler listesi","opt_out_consent":"Xsolla\'nД±n kiЕџisel bilgilerimi {xsollaGroupConsentLink} dahilinde paylaЕџabileceДџini anlД±yorum.","opt_out_consent_link_name":"Xsolla grubu","opt_out_description":"Д°zninizi dilediДџiniz zaman deДџiЕџtirme veya geri Г§ekme hakkД±na sahipsiniz. Д°znin geri Г§ekilmesi, geГ§miЕџ iЕџlemlerin yasallД±ДџД±nД± etkilemez, Г§ГјnkГј bunlar, Г¶nceden verilmiЕџ olan izne dayanmaktadД±r.","opt_out_title":"VazgeГ§","privacy_policy_link_name":"Gizlilik PolitikasД±","return_button":"Geri Git","save_and_close_button":"Kaydet ve kapat","saving_button":"Kaydediyor...","settings_button":"Ayarlar","settings_footer_description":"*Onay kutusu iЕџaretliyse, seГ§iminizi baЕџka bir Xsolla ГњrГјnГј iГ§in yapmД±ЕџsД±nД±z demektir.","settings_title":"Gizlilik ayarlarД±","targeting_cookies_checkbox":"Hedefleme Г§erezleri","targeting_cookies_description":"Bu Г§erezler, bu web sitesinde veya Xsolla ГњrГјnlerinde ziyaret ettiДџiniz sayfalarД± ve tД±kladД±ДџД±nД±z baДџlantД±larД± kaydeder. Bu bilgileri, web sitemizi ve web sitemizde gГ¶rГјntГјlenen reklamlarД± ilgi alanlarД±nД±za daha uygun hale getirmek iГ§in kullanД±rД±z. Bu bilgileri, bu amaГ§la ГјГ§ГјncГј taraflarla da paylaЕџabiliriz. <br/> Bu Г§erezleri kabul etmezseniz reklamlarД± yine de gГ¶rmeye devam edersiniz, ancak bunlar ilgi alanlarД±nД±za gГ¶re Г¶zelleЕџtirilmiЕџ olmayacaktД±r.","targeting_cookies_link_name":"Hedefleme Г§erezleri listesi","welcome_screen_allow_cookies":"Г‡erez kullanmayД± kabul ediyorum","welcome_screen_data_processing":"Xsolla\'nД±n bana Г¶zelleЕџtirilmiЕџ hizmetler sunmak iГ§in {myPersonalDataTooltip} kullanmasД±na izin veriyorum","welcome_screen_description":"Д°zninizi, gizlilik ayarlarД±na geri dГ¶nerek dilediДџiniz zaman deДџiЕџtirebilir veya geri Г§ekebilirsiniz.","welcome_screen_mobile_description":"\\"{acceptAllButtonText}\\" butonunu tД±klayarak bize kiЕџisel verilerinizi iЕџleme ve tГјm Г§erezleri ayarlama konusunda izin vermiЕџ olursunuz. Alternatif olarak, tercihlerinizi Ayarlar\'da Г¶zelleЕџtirebilirsiniz.","welcome_screen_title":"GizliliДџinize saygД± duyuyoruz"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"ChбєҐp nhбє­n tбєҐt cбєЈ","analytical_performance_cookies_checkbox":"Cookie hiб»‡u nДѓng vГ  phГўn tГ­ch","analytical_performance_cookies_description":"CГЎc cookie nГ y thu thбє­p thГґng tin vб»Ѓ quГЎ trГ¬nh bбєЎn sб»­ dб»Ґng trang web nГ y vГ  cho phГ©p chГєng tГґi cбєЈi thiб»‡n vбє­n hГ nh trang web, cЕ©ng nhЖ° nГўng cao trбєЈi nghiб»‡m cб»§a bбєЎn vб»›i cГЎc sбєЈn phбє©m cб»§a Xsolla. VГ­ dб»Ґ, chГєng tГґi cГі thб»ѓ Д‘бєЈm bбєЈo bбєЎn sбєЅ dб»… dГ ng tГ¬m Д‘Ж°б»Јc thГґng tin mГ¬nh cбє§n hoбє·c ghi nhбє­n cГЎc khГі khДѓn bбєЎn cГі thб»ѓ gбє·p phбєЈi. <br/> Nбєїu bбєЎn khГґng chбєҐp nhбє­n cГЎc cookie nГ y, chГєng tГґi sбєЅ khГґng biбєїt thб»ќi Д‘iб»ѓm bбєЎn truy cбє­p trang web cб»§a chГєng tГґi vГ  sбєЅ khГґng thб»ѓ theo dГµi hiб»‡u nДѓng cб»§a nГі.","analytical_performance_cookies_link_name":"Danh sГЎch cookie hiб»‡u nДѓng vГ  phГўn tГ­ch","cookie_policy_link_name":"ChГ­nh sГЎch Cookie","data_processing_consent_checkbox":"ChбєҐp thuбє­n cho phГ©p xб»­ lГЅ dб»Ї liб»‡u","data_processing_consent_customer_checkbox_tooltip":"Trang nГ y vбє­n hГ nh trГЄn cГЎc sбєЈn phбє©m cб»§a Xsolla. Xsolla quбєЈn lГЅ dб»Ї liб»‡u cГЎ nhГўn cб»§a bбєЎn, chбєіng hбєЎn nhЖ° hб»Ќ tГЄn hoбє·c biб»‡t danh, Д‘б»‹a chб»‰ email, Д‘б»‹a chб»‰ IP, thГґng tin vб»‹ trГ­ Д‘б»‹a lГЅ, vГ  mГЈ ngЖ°б»ќi dГ№ng duy nhбєҐt.","data_processing_consent_description":"ChГєng tГґi cбє§n sб»± chбєҐp thuбє­n cб»§a bбєЎn Д‘б»ѓ sб»­ dб»Ґng dб»Ї liб»‡u vГ  thГґng tin cГЎ nhГўn cб»§a bбєЎn thu Д‘Ж°б»Јc tб»« cookie Д‘б»ѓ cung cбєҐp cГЎc dб»‹ch vб»Ґ tГ№y biбєїn cho bбєЎn. Nбєїu bбєЎn quyбєїt Д‘б»‹nh ngб»«ng cho phГ©p xб»­ lГЅ dб»Ї liб»‡u, chГєng tГґi sбєЅ chб»‰ sб»­ dб»Ґng dб»Ї liб»‡u thu Д‘Ж°б»Јc tб»« cГЎc cookie thiбєїt yбєїu vГ  bбєЎn sбєЅ khГґng thб»ѓ trбєЈi nghiб»‡m tб»‘t nhбєҐt cГЎc dб»‹ch vб»Ґ cб»§a chГєng tГґi.","data_processing_consent_my_personal_data":"dб»Ї liб»‡u cГЎ nhГўn cб»§a tГґi","data_processing_consent_partner_checkbox_tooltip":"Trang nГ y vбє­n hГ nh trГЄn cГЎc sбєЈn phбє©m cб»§a Xsolla. Xsolla quбєЈn lГЅ dб»Ї liб»‡u cГЎ nhГўn cб»§a bбєЎn, chбєіng hбєЎn nhЖ° danh tГ­nh vГ  thГґng tin liГЄn lбєЎc hoбє·c dб»Ї liб»‡u kinh doanh do bбєЎn cung cбєҐp trong TГ i khoбєЈn NhГ  phГЎt hГ nh.","essential_cookies_checkbox":"Cookie thiбєїt yбєїu","essential_cookies_description":"CГЎc cookie nГ y lГ  thiбєїt yбєїu cho trang web cб»§a chГєng tГґi vГ  cГЎc sбєЈn phбє©m cб»§a Xsolla Д‘б»ѓ vбє­n hГ nh vГ  khГґng thб»ѓ bб»‹ tбєЇt. VГ­ dб»Ґ, chГєng bao gб»“m cookie cho phГ©p bбєЎn Д‘Дѓng nhбє­p tГ i khoбєЈn cГЎ nhГўn cб»§a bбєЎn vГ  cookie cung cбєҐp luб»“ng xб»­ lГЅ giao dб»‹ch thanh toГЎn chГ­nh xГЎc vГ  hб»— trб»Ј khГЎch hГ ng. <br/> BбєЎn cГі thб»ѓ thiбєїt lбє­p trГ¬nh duyб»‡t chбє·n hoбє·c thГґng bГЎo cho bбєЎn vб»Ѓ cГЎc cookie nГ y, nhЖ°ng khi Д‘Гі, mб»™t sб»‘ thГ nh phбє§n trang web nГ y cГі thб»ѓ khГґng hoбєЎt Д‘б»™ng nhЖ° mong Д‘б»Јi.","essential_cookies_list_link_name":"Danh sГЎch cookie thiбєїt yбєїu","essential_cookies_tooltip":"LoбєЎi cookie nГ y khГґng thб»ѓ bб»‹ tбєЇt.","functional_cookies_checkbox":"Cookie theo chб»©c nДѓng","functional_cookies_description":"CГЎc cookie nГ y cho phГ©p chГєng tГґi ghi nhб»› cГЎc lб»±a chб»Ќn cб»§a bбєЎn trГЄn trang web cб»§a chГєng tГґi hoбє·c cГЎc sбєЈn phбє©m cб»§a Xsolla. Дђiб»Ѓu nГ y giГєp chГєng tГґi cung cбєҐp cГЎc tГ­nh nДѓng nГўng cao vГ  cГЎ nhГўn hГіa. <br/> Nбєїu bбєЎn khГґng chбєҐp nhбє­n cГЎc cookie nГ y, mб»™t sб»‘ hoбє·c tбєҐt cбєЈ cГЎc tГ­nh nДѓng nГ y cГі thб»ѓ khГґng hoбєЎt Д‘б»™ng nhЖ° mong Д‘б»Јi.","functional_cookies_link_name":"Danh sГЎch cookie theo tГ­nh nДѓng","opt_out_consent":"TГґi hiб»ѓu rбє±ng Xsolla cГі thб»ѓ chia sбє» dб»Ї liб»‡u cГЎ nhГўn cб»§a tГґi trong khuГґn khб»• {xsollaGroupConsentLink}.","opt_out_consent_link_name":"NhГіm Xsolla","opt_out_description":"BбєЎn cГі quyб»Ѓn thay Д‘б»•i hoбє·c thu hб»“i chбєҐp thuбє­n vГ o bбєҐt cб»© lГєc nГ o. Viб»‡c thu hб»“i chбєҐp thuбє­n sбєЅ khГґng бєЈnh hЖ°б»џng tГ­nh hб»Јp phГЎp cб»§a viб»‡c xб»­ lГЅ dб»Ї liб»‡u trong quГЎ khб»© vГ¬ Д‘Ж°б»Јc dб»±a trГЄn sб»± Д‘б»“ng ГЅ trЖ°б»›c Д‘Гі cб»§a bбєЎn.","opt_out_title":"KhГґng tham gia","privacy_policy_link_name":"ChГ­nh sГЎch BбєЈo mбє­t","return_button":"Quay lбєЎi","save_and_close_button":"LЖ°u vГ  Д‘Гіng","saving_button":"Дђang lЖ°u...","settings_button":"Thiбєїt lбє­p","settings_footer_description":"*Nбєїu Гґ nГ y Д‘Ж°б»Јc chб»Ќn, cГі thб»ѓ bбєЎn Д‘ГЈ chб»Ќn trong mб»™t sбєЈn phбє©m Xsolla khГЎc.","settings_title":"Thiбєїt lбє­p bбєЈo mбє­t","targeting_cookies_checkbox":"Cookie Д‘б»‹nh vб»‹","targeting_cookies_description":"CГЎc cookie nГ y ghi nhб»› cГЎc trang bбєЎn Д‘ГЈ truy cбє­p trГЄn trang web nГ y hoбє·c trong cГЎc sбєЈn phбє©m cб»§a Xsolla vГ  cГЎc Д‘Ж°б»ќng dбє«n bбєЎn Д‘ГЈ nhбєҐn. ChГєng tГґi sб»­ dб»Ґng thГґng tin nГ y Д‘б»ѓ trang web cб»§a chГєng tГґi vГ  cГЎc quбєЈng cГЎo hiб»ѓn thб»‹ cГі liГЄn quan hЖЎn vб»›i sб»џ thГ­ch cб»§a bбєЎn. ChГєng tГґi cЕ©ng cГі thб»ѓ chia sбє» thГґng tin nГ y vб»›i cГЎc bГЄn thб»© ba vГ¬ mб»Ґc Д‘Г­ch nГ y. <br/> Nбєїu bбєЎn khГґng chбєҐp nhбє­n cГЎc cookie nГ y, bбєЎn vбє«n sбєЅ thбєҐy quбєЈng cГЎo, nhЖ°ng chГєng sбєЅ khГґng Д‘Ж°б»Јc Д‘iб»Ѓu chб»‰nh theo sб»џ thГ­ch cб»§a bбєЎn.","targeting_cookies_link_name":"Danh sГЎch cookie Д‘б»‹nh vб»‹","welcome_screen_allow_cookies":"TГґi Д‘б»“ng ГЅ sб»­ dб»Ґng cookie","welcome_screen_data_processing":"TГґi Д‘б»“ng ГЅ Д‘б»ѓ Xsolla sб»­ dб»Ґng {myPersonalDataTooltip} Д‘б»ѓ cung cбєҐp cГЎc dб»‹ch vб»Ґ tГ№y chб»‰nh cho tГґi","welcome_screen_description":"BбєЎn cГі thб»ѓ thay Д‘б»•i hoбє·c thu hб»“i chбєҐp thuбє­n vГ o bбєҐt cб»© lГєc nГ o б»џ trang thiбєїt lбє­p BбєЈo mбє­t.","welcome_screen_mobile_description":"Khi nhбєҐn \\"{acceptAllButtonText}\\", bбєЎn Д‘б»“ng ГЅ cho phГ©p chГєng tГґi xб»­ lГЅ dб»Ї liб»‡u cГЎ nhГўn cб»§a bбєЎn vГ  thiбєїt lбє­p tбєҐt cбєЈ cookie. Hoбє·c bбєЎn cГі thб»ѓ tГ№y chб»‰nh lб»±a chб»Ќn cб»§a bбєЎn tбєЎi trang Thiбєїt lбє­p.","welcome_screen_title":"ChГєng tГґi tГґn trб»Ќng quyб»Ѓn riГЄng tЖ° cб»§a bбєЎn"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"жЋҐеЏ—е…ЁйѓЁ","analytical_performance_cookies_checkbox":"е€†жћђе’Њж•€иѓЅжЂ§Cookie","analytical_performance_cookies_description":"иї™дє›Cookieж”¶й›†ж‚ЁеЇ№жњ¬зЅ‘з«™зљ„дЅїз”ЁдїЎжЃЇпјЊд»Ґдѕїж€‘д»¬ж”№иї›е…¶иїђиЎЊж–№ејЏеЏЉжЏђеЌ‡ж‚ЁењЁдЅїз”Ёе…¶д»–и‰ѕе…‹зґўж‹‰дє§е“Ѓж—¶зљ„дЅ“йЄЊпјЊдѕ‹е¦‚и®©ж‚ЁиЅ»жќѕж‰ѕе€°жѓіи¦Ѓзљ„дїЎжЃЇж€–и®°еЅ•ж‚ЁењЁдЅїз”Ёдё­йЃ‡е€°зљ„й—®йўгЂ‚<br/>е¦‚жћњдёЌжЋҐеЏ—иї™дє›CookieпјЊж€‘д»¬е°†ж— жі•зџҐйЃ“ж‚ЁеЇ№ж€‘д»¬зЅ‘з«™зљ„и®їй—®дё”ж— жі•з›‘жЋ§зЅ‘з«™зљ„ж•€иѓЅгЂ‚","analytical_performance_cookies_link_name":"е€†жћђе’Њж•€иѓЅжЂ§Cookieе€—иЎЁ","cookie_policy_link_name":"Cookieж”їз­–","data_processing_consent_checkbox":"ж•°жЌ®е¤„зђ†еђЊж„Џд№¦","data_processing_consent_customer_checkbox_tooltip":"жњ¬зЅ‘з«™еџєдєЋи‰ѕе…‹зґўж‹‰дє§е“ЃиїђиЎЊгЂ‚и‰ѕе…‹зґўж‹‰е°†з®Ўзђ†ж‚Ёзљ„дёЄдєєж•°жЌ®пјЊдѕ‹е¦‚ж‚Ёзљ„е…ЁеђЌж€–жµз§°гЂЃй‚®з®±ењ°еќЂгЂЃIPењ°еќЂгЂЃењ°зђ†дЅЌзЅ®дїЎжЃЇеЏЉе”ЇдёЂз”Ёж€·IDз­‰гЂ‚","data_processing_consent_description":"ж€‘д»¬йњЂи¦Ѓж‚Ёзљ„еђЊж„Џж‰ЌиѓЅдЅїз”Ёж‚Ёзљ„дёЄдєєж•°жЌ®д»ҐеЏЉCookieдё­зљ„дїЎжЃЇдёєж‚ЁжЏђдѕ›дёЄжЂ§еЊ–жњЌеЉЎгЂ‚е¦‚жћњдёЌйЂ‰ж‹©еђЊж„ЏпјЊе€™ж€‘д»¬еЏЄдјљдЅїз”Ёеї…и¦ЃCookieдё­зљ„дїЎжЃЇпјЊж‚Ёе°†ж— жі•е……е€†дє«еЏ—ж€‘д»¬зљ„жњЌеЉЎгЂ‚","data_processing_consent_my_personal_data":"ж€‘зљ„дёЄдєєж•°жЌ®","data_processing_consent_partner_checkbox_tooltip":"жњ¬зЅ‘з«™еџєдєЋи‰ѕе…‹зґўж‹‰дє§е“ЃиїђиЎЊгЂ‚и‰ѕе…‹зґўж‹‰е°†з®Ўзђ†ж‚Ёзљ„дёЄдєєж•°жЌ®пјЊдѕ‹е¦‚ж‚ЁењЁеЏ‘еёѓе•†еёђж€·дё­жЏђдѕ›зљ„иє«д»ЅеЏЉиЃ”зі»дїЎжЃЇж€–дёљеЉЎиЇ¦жѓ…з­‰гЂ‚","essential_cookies_checkbox":"еї…и¦ЃCookie","essential_cookies_description":"иї™дє›жЇи®©ж€‘д»¬зљ„зЅ‘з«™еЏЉи‰ѕе…‹зґўж‹‰дє§е“Ѓж­ЈеёёиїђиЎЊдё”дёЌиў«е…ій—­ж‰Ђеї…йњЂзљ„CookieпјЊеЊ…ж‹¬и®©ж‚Ёз™»еЅ•дёЄдєєеёђж€·зљ„CookieпјЊд»ҐеЏЉжЏђдѕ›ж­ЈзЎ®ж”Їд»е¤„зђ†иї‡зЁ‹е’Ње®ўж€·ж”ЇжЊЃзљ„Cookieз­‰гЂ‚<br/>ж‚ЁеЏЇд»Ґи®ѕзЅ®ж‚Ёзљ„жµЏи§€е™Ёж‹¦ж€Єж€–жЏђй†’ж‚Ёиї™дє›CookieпјЊдЅ†иї™ж ·дјљеЇји‡ґжњ¬зЅ‘з«™зљ„йѓЁе€†е†…е®№ж— жі•е¦‚йў„жњџиїђиЎЊгЂ‚","essential_cookies_list_link_name":"еї…и¦ЃCookieе€—иЎЁ","essential_cookies_tooltip":"ж­¤з±»Cookieж— жі•е…ій—­гЂ‚","functional_cookies_checkbox":"еЉџиѓЅжЂ§Cookie","functional_cookies_description":"иї™дє›Cookieи®©ж€‘д»¬еЏЇд»Ґи®°дЅЏж‚ЁењЁжњ¬зЅ‘з«™ж€–и‰ѕе…‹зґўж‹‰дє§е“Ѓдё­ж‰ЂдЅњзљ„йЂ‰ж‹©гЂ‚иї™еЏЇд»Ґеё®еЉ©ж€‘д»¬жЏђдѕ›ејєеЊ–еЏЉдёЄжЂ§еЊ–еЉџиѓЅпјЊдѕ‹е¦‚дёєж‚Ёе®ље€¶жџђдёЄйЎµйќўж€–ж №жЌ®ж‚Ёзљ„иЇ·ж±‚жЏђдѕ›е…¶д»–жњЌеЉЎз­‰гЂ‚<br/>е¦‚жћњдёЌжЋҐеЏ—иї™дє›CookieпјЊиї™дє›еЉџиѓЅдё­зљ„йѓЁе€†ж€–е…ЁйѓЁе°†ж— жі•ж­ЈеёёиїђиЎЊгЂ‚","functional_cookies_link_name":"еЉџиѓЅжЂ§Cookieе€—иЎЁ","opt_out_consent":"ж€‘дє†и§Ји‰ѕе…‹зґўж‹‰еЏЇиѓЅдјљењЁ{xsollaGroupConsentLink}е†…е€†дє«ж€‘зљ„дёЄдєєж•°жЌ®гЂ‚","opt_out_consent_link_name":"и‰ѕе…‹зґўж‹‰й›†е›ў","opt_out_description":"ж‚Ёжњ‰жќѓйљЏж—¶ж›ґж”№ж€–ж’¤й”Ђж‚Ёзљ„еђЊж„ЏгЂ‚ж’¤й”ЂдёЌеЅ±е“Ќд№‹е‰Ќе¤„зђ†зљ„еђ€жі•жЂ§пјЊе› дёєй‚ЈжЇеџєдєЋж‚Ёд№‹е‰Ќзљ„еђЊж„Џиї›иЎЊзљ„е¤„зђ†гЂ‚","opt_out_title":"йЂ‰ж‹©йЂЂе‡є","privacy_policy_link_name":"йљђз§Ѓж”їз­–","return_button":"иї”е›ћ","save_and_close_button":"дїќе­е№¶е…ій—­","saving_button":"ж­ЈењЁдїќе­...","settings_button":"и®ѕзЅ®","settings_footer_description":"*е¦‚жћње¤ЌйЂ‰жЎ†е·Іе‹ѕйЂ‰пјЊиЇґжЋж‚Ёе·ІењЁе…¶д»–и‰ѕе…‹зґўж‹‰дє§е“Ѓдё­иї›иЎЊиї‡йЂ‰ж‹©гЂ‚","settings_title":"йљђз§Ѓи®ѕзЅ®","targeting_cookies_checkbox":"е®љеђ‘жЂ§Cookie","targeting_cookies_description":"иї™дє›Cookieи®°еЅ•ж‚ЁењЁжњ¬зЅ‘з«™ж€–и‰ѕе…‹зґўж‹‰дє§е“Ѓдё­и®їй—®иї‡зљ„йЎµйќўеЏЉз‚№е‡»иї‡зљ„й“ѕжЋҐгЂ‚ж€‘д»¬дЅїз”Ёиї™дє›дїЎжЃЇи®©зЅ‘з«™е†…е®№д»ҐеЏЉдёЉйќўзљ„е№їе‘Љж›ґз¬¦еђ€ж‚Ёзљ„е…ґи¶ЈгЂ‚ж€‘д»¬д№џеЏЇиѓЅе‡єдєЋж­¤з›®зљ„дёЋз¬¬дё‰ж–№е…±дє«иї™дє›дїЎжЃЇгЂ‚<br/>е¦‚жћњдёЌжЋҐеЏ—иї™дє›CookieпјЊж‚Ёд»Ќе°†дјљзњ‹е€°е№їе‘ЉпјЊдЅ†дёЌдјљй’€еЇ№ж‚Ёзљ„е…ґи¶ЈйЂ‰ж‹©жЂ§жЏђдѕ›гЂ‚","targeting_cookies_link_name":"е®љеђ‘жЂ§Cookieе€—иЎЁ","welcome_screen_allow_cookies":"ж€‘еђЊж„ЏдЅїз”ЁCookie","welcome_screen_data_processing":"ж€‘еђЊж„Џи‰ѕе…‹зґўж‹‰дЅїз”Ё{myPersonalDataTooltip}еђ‘ж€‘жЏђдѕ›е®ље€¶жњЌеЉЎ","welcome_screen_description":"ж‚ЁеЏЇд»ҐйљЏж—¶иї”е›ћйљђз§Ѓи®ѕзЅ®ж›ґж”№ж€–ж’¤й”Ђж‚Ёзљ„еђЊж„ЏгЂ‚","welcome_screen_mobile_description":"з‚№е‡»вЂњ{acceptAllButtonText}вЂќеЌіиЎЁз¤єж‚ЁеђЊж„ЏеЇ№ж‚Ёзљ„дёЄдєєж•°жЌ®зљ„е¤„зђ†е№¶ж‰“ејЂж‰Ђжњ‰CookieгЂ‚еђ¦е€™пјЊж‚Ёд№џеЏЇд»ҐењЁи®ѕзЅ®дё­ж №жЌ®еЃЏеҐЅиї›иЎЊи‡Єе®љд№‰гЂ‚","welcome_screen_title":"ж€‘д»¬е°Љй‡Ќж‚Ёзљ„йљђз§Ѓ"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"е…ЁйѓЁжЋҐеЏ—","analytical_performance_cookies_checkbox":"е€†жћђећ‹ Cookie е’Њзёѕж•€ећ‹ Cookie","analytical_performance_cookies_description":"ж”¶й›†д»ҐдёЉ CookieпјЊеђЊж™‚еј·еЊ–е…¶д»–ж„›зґўж‹‰з”ўе“Ѓй«”й©—гЂ‚жЇ”ж–№иЄЄпјЊж€‘еЂ‘иѓЅзўєдїќж‚ЁиѓЅиј•й¬†ж‰ѕе€°жѓіи¦Ѓзљ„жќ±иҐїпјЊж€–и§Јж±єж‰‹дёЉзљ„й›ЈйЎЊгЂ‚<br/> е¦‚жћњж‚ЁдёЌжЋҐеЏ—д»ҐдёЉ CookieпјЊењЁж‚ЁзЂЏи¦Ѕз¶Із«™ж™‚пјЊж€‘еЂ‘е°±дёЌжњѓзџҐйЃ“пјЊд№џз„Ўжі•з›ЈжЋ§е…¶зёѕж•€гЂ‚","analytical_performance_cookies_link_name":"е€†жћђећ‹ Cookie е’Њзёѕж•€ећ‹ Cookie жё…е–®","cookie_policy_link_name":"Cookie ж”їз­–","data_processing_consent_checkbox":"иі‡ж–™и™•зђ†е…§е®№","data_processing_consent_customer_checkbox_tooltip":"ж­¤з¶Із«™жЇз”±ж„›зґўж‹‰з”ўе“ЃиІ иІ¬жћ¶иЁ­гЂ‚ж„›зґўж‹‰жњѓз‚єж‚Ёз®Ўзђ†еѓЏжЇжљ±зЁ±гЂЃй›»е­ђйѓµд»¶ењ°еќЂгЂЃIP дЅЌеќЂгЂЃењ°зђ†иі‡иЁЉе’Ње”ЇдёЂдЅїз”ЁиЂ…и­е€ҐзўјйЂ™йЎћеЂ‹иі‡гЂ‚","data_processing_consent_description":"ж€‘еЂ‘йњЂи¦ЃеЏ–еѕ—ж‚Ёзљ„еђЊж„ЏпјЊж‰ЌиѓЅе€©з”Ё Cookie дѕ†дЅїз”Ёж‚Ёзљ„еЂ‹иі‡е’Њиі‡иЁЉпјЊдѕїеЏЇз‚єж‚ЁжЏђдѕ›и‡ЄиЁ‚жњЌе‹™гЂ‚е¦‚жћњж‚Ёж±єе®љи¦ЃйЂЂе‡єиі‡ж–™и™•зђ†пјЊж€‘еЂ‘еЏЄжњѓе€©з”Ёеџєжњ¬ Cookie дѕ†ж”¶й›†иі‡ж–™пјЊж‚Ёе°±з„Ўжі•й«”й©—е®Њж•ґзљ„з·љдёЉжњЌе‹™гЂ‚","data_processing_consent_my_personal_data":"ж€‘зљ„еЂ‹иі‡","data_processing_consent_partner_checkbox_tooltip":"ж­¤з¶Із«™жЇз”±ж„›зґўж‹‰з”ўе“ЃиІ иІ¬жћ¶иЁ­гЂ‚ж„›зґўж‹‰жњѓз‚єж‚Ёз®Ўзђ†еѓЏжЇи­е€Ґзўје’ЊйЂЈзµЎдєєпјЊж€–жЇз”±з™јдЅ€е•†еёіж€¶жЏђдѕ›зµ¦ж‚Ёзљ„е•†е®¶и©ізґ°иі‡ж–™йЂ™йЎћеЂ‹иі‡гЂ‚","essential_cookies_checkbox":"еџєжњ¬ Cookie","essential_cookies_description":"е®ж–№з¶Із«™е’Њж„›зґўж‹‰з”ўе“ЃжњѓйњЂи¦ЃдЅїз”Ёе€° CookieпјЊж‰ЌиѓЅйЃ‹дЅњпјЊзі»зµ±з„Ўжі•й—њй–‰гЂ‚жЇ”ж–№иЄЄпјЊе°Ќж–№жњѓе•џз”Ё CookieпјЊи®“ж‚ЁеЏЇд»Ґз™»е…ҐеЂ‹дєєеёіж€¶пјЊCookie жњѓжЏђдѕ›ж­Јзўєд»ж¬ѕи™•зђ†жµЃзЁ‹е’Ње®ўж€¶ж”ЇжЏґгЂ‚ <br/> ж‚ЁеЏЇд»Ґе°‡зЂЏи¦Ѕе™ЁиЁ­е®љж€ђе°ЃйЋ– CookieпјЊж€–жЏђй†’ж‚Ёжњ‰й—њд»ҐдёЉ CookieпјЊдЅ†йЂ™жЁЈеЃље°±жњѓи®“йѓЁе€†з¶Із«™з„Ўжі•е¦‚жњџж­ЈеёёйЃ‹дЅњгЂ‚","essential_cookies_list_link_name":"еџєжњ¬ Cookie жё…е–®","essential_cookies_tooltip":"з„Ўжі•й—њй–‰йЂ™йЎћ CookieгЂ‚","functional_cookies_checkbox":"еЉџиѓЅећ‹ Cookie","functional_cookies_description":"д»ҐдёЉ Cookie и®“ж€‘ж–№еЏЇд»ҐиЁдЅЏж‚ЁењЁз¶Із«™дёЉзљ„йЃёй …пјЊж€–зЂЏи¦ЅйЃЋе“Єдє›ж„›зґўж‹‰з”ўе“ЃгЂ‚йЂ™иѓЅеЌ”еЉ©ж€‘ж–№еўћеј·еЂ‹дєєеЊ–еЉџиѓЅгЂ‚жЇ”ж–№иЄЄпјЊж€‘еЂ‘еЏЇд»Ґз‚єж‚Ёи‡ЄиЁ‚з‰№е®љз¶Ій ЃпјЊж€–и¦–ж‚Ёзљ„и¦Ѓж±‚пјЊжЏђдѕ›е…¶д»–жњЌе‹™гЂ‚<br/>е¦‚жћњж‚ЁдёЌжЋҐеЏ—д»ҐдёЉ CookieпјЊдёЉиї°йѓЁе€†ж€–е…ЁйѓЁеЉџиѓЅе°‡з„Ўжі•ж­ЈеёёйЃ‹дЅњгЂ‚","functional_cookies_link_name":"еЉџиѓЅећ‹ Cookie жё…е–®","opt_out_consent":"ж€‘дє†и§Јж„›зґўж‹‰еЏЇиѓЅжњѓењЁдё‹ж–№ {xsollaGroupConsentLink}и€‡дєєе…±з”Ёж€‘зљ„еЂ‹иі‡гЂ‚","opt_out_consent_link_name":"ж„›зґўж‹‰й›†ењ","opt_out_description":"ж‚Ёжњ‰ж¬ЉйљЁж™‚и®Љж›ґпјЊж€–еЏ–ж¶€еђЊж„ЏгЂ‚з”±ж–јдёЂе€‡еЌ”и­°йѓЅжЇжЇ”з…§дє‹е‰ЌеђЊж„ЏпјЊеЏ–ж¶€еђЊж„Џе°‡дёЌжњѓеЅ±йџїе€°йЃЋеЋ»и™•зђ†иі‡ж–™д№‹еђ€жі•жЂ§гЂ‚","opt_out_title":"йЂЂе‡є","privacy_policy_link_name":"йљ±з§Ѓж¬Љж”їз­–","return_button":"иї”е›ћ","save_and_close_button":"е„Іе­дё¦й—њй–‰","saving_button":"ж­ЈењЁе„Іе­...","settings_button":"иЁ­е®љ","settings_footer_description":"*е¦‚жћње·ІйЃёеЏ–ж­¤ж ёеЏ–ж–№еЎЉпјЊеЌіиЎЁз¤єж‚Ёеїѓдё­е·Іж‹їе®љдё»ж„ЏпјЊи¦ЃйЃёж“‡е…¶д»–ж„›зґўж‹‰з”ўе“ЃгЂ‚","settings_title":"йљ±з§Ѓж¬ЉиЁ­е®љ","targeting_cookies_checkbox":"з›®жЁ™жЂ§ Cookie","targeting_cookies_description":"д»ҐдёЉ Cookie жњѓиЁйЊ„ж‚ЁзЂЏи¦ЅйЃЋзљ„з¶Ій ЃпјЊж€–жЇж„›зґўж‹‰з”ўе“ЃпјЊй‚„жњ‰е·ІиїЅи№¤йЂЈзµђгЂ‚ж€‘еЂ‘жњѓдЅїз”Ёж­¤иі‡иЁЉдѕ†жћ¶иЁ­з¶Із«™пјЊи®“жЉ•ж”ѕе»Је‘Љж›ґз¬¦еђ€ж‚Ёзљ„и€€и¶ЈгЂ‚з‚єйЃ”ж­¤з›®зљ„пјЊж€‘еЂ‘д№џеЏЇиѓЅжњѓи€‡з¬¬дё‰ж–№е…±з”Ёж­¤иі‡иЁЉгЂ‚<br/> е¦‚жћњж‚ЁдёЌжЋҐеЏ—д»ҐдёЉ CookieпјЊе°±з„Ўжі•зњ‹и¦‹е»Је‘ЉпјЊдЅ†зі»зµ±д№џдёЌжњѓдѕќи€€и¶Јз‚єж‚Ёй‡Џиє«иЁ‚еЃље»Је‘ЉгЂ‚","targeting_cookies_link_name":"з›®жЁ™жЂ§ Cookie жё…е–®","welcome_screen_allow_cookies":"жњ¬дєєеђЊж„ЏдЅїз”Ё Cookie","welcome_screen_data_processing":"ж€‘еђЊж„Џи®“ж„›зґўж‹‰дЅїз”Ё{myPersonalDataTooltip}пјЊи—‰ж­¤жЏђдѕ›и‡ЄиЁ‚жњЌе‹™","welcome_screen_description":"ж‚ЁеЏЇд»ҐйљЁж™‚и®Љж›ґпјЊж€–еЏ–ж¶€еђЊж„ЏпјЊеЏЄи¦Ѓиї”е›ћйљ±з§Ѓж¬ЉиЁ­е®љеЌіеЏЇгЂ‚","welcome_screen_mobile_description":"дёЂж—¦жЊ‰дё‹ [{acceptAllButtonText}]пјЊеЌіиЎЁз¤єж‚ЁеђЊж„Џи®“ж€‘ж–№и™•зђ†ж‚Ёзљ„еЂ‹иі‡пјЊдё¦иЁ­е®љ CookieгЂ‚ж€–иЂ…пјЊж‚ЁеЏЇд»Ґе€°иЁ­е®љдё‹ж–№и‡ЄиЁ‚е–њеҐЅиЁ­е®љгЂ‚","welcome_screen_title":"ж€‘еЂ‘е°Љй‡Ќж‚Ёзљ„йљ±з§Ѓ"}'
            );
        },
        ,
        function (e, o, t) {
            e.exports = t(35);
        },
        function (e, o) {},
        function (e, o, t) {
            "use strict";
            function n() {}
            t.r(o),
                t.d(o, "onConsent", function () {
                    return yt.onConsent;
                }),
                t.d(o, "CookieStorageService", function () {
                    return yt.CookieStorageService;
                }),
                t.d(o, "LocalStorageService", function () {
                    return yt.LocalStorageService;
                }),
                t.d(o, "APIService", function () {
                    return yt.APIService;
                }),
                t.d(o, "TranslationService", function () {
                    return yt.TranslationService;
                }),
                t.d(o, "State", function () {
                    return yt.State;
                }),
                t.d(o, "Error", function () {
                    return yt.Error;
                }),
                t.d(o, "Constants", function () {
                    return yt.Constants;
                }),
                t.d(o, "initialize", function () {
                    return vt;
                });
            function i(e, o) {
                for (const t in o) e[t] = o[t];
                return e;
            }
            function s(e) {
                return e();
            }
            function a() {
                return Object.create(null);
            }
            function c(e) {
                e.forEach(s);
            }
            function r(e) {
                return "function" == typeof e;
            }
            function l(e, o) {
                return e != e ? o == o : e !== o || (e && "object" == typeof e) || "function" == typeof e;
            }
            function u(e) {
                return 0 === Object.keys(e).length;
            }
            function p(e, ...o) {
                if (null == e) return n;
                const t = e.subscribe(...o);
                return t.unsubscribe ? () => t.unsubscribe() : t;
            }
            function _(e, o, t) {
                e.$$.on_destroy.push(p(o, t));
            }
            function d(e, o, t, n) {
                if (e) {
                    const i = m(e, o, t, n);
                    return e[0](i);
                }
            }
            function m(e, o, t, n) {
                return e[1] && n ? i(t.ctx.slice(), e[1](n(o))) : t.ctx;
            }
            function k(e, o, t, n) {
                if (e[2] && n) {
                    const i = e[2](n(t));
                    if (void 0 === o.dirty) return i;
                    if ("object" == typeof i) {
                        const e = [],
                            t = Math.max(o.dirty.length, i.length);
                        for (let n = 0; n < t; n += 1) e[n] = o.dirty[n] | i[n];
                        return e;
                    }
                    return o.dirty | i;
                }
                return o.dirty;
            }
            function g(e, o, t, n, i, s, a) {
                const c = k(o, n, i, s);
                if (c) {
                    const i = m(o, t, n, a);
                    e.p(i, c);
                }
            }
            function h(e) {
                const o = {};
                for (const t in e) "$" !== t[0] && (o[t] = e[t]);
                return o;
            }
            function f(e, o) {
                const t = {};
                o = new Set(o);
                for (const n in e) o.has(n) || "$" === n[0] || (t[n] = e[n]);
                return t;
            }
            new Set();
            function b(e, o) {
                e.appendChild(o);
            }
            function y(e, o, t) {
                e.insertBefore(o, t || null);
            }
            function v(e) {
                e.parentNode.removeChild(e);
            }
            function w(e, o) {
                for (let t = 0; t < e.length; t += 1) e[t] && e[t].d(o);
            }
            function z(e) {
                return document.createElement(e);
            }
            function $(e) {
                return document.createElementNS("http://www.w3.org/2000/svg", e);
            }
            function x(e) {
                return document.createTextNode(e);
            }
            function C() {
                return x(" ");
            }
            function P() {
                return x("");
            }
            function S(e, o, t, n) {
                return e.addEventListener(o, t, n), () => e.removeEventListener(o, t, n);
            }
            function j(e, o, t) {
                null == t ? e.removeAttribute(o) : e.getAttribute(o) !== t && e.setAttribute(o, t);
            }
            function T(e, o) {
                const t = Object.getOwnPropertyDescriptors(e.__proto__);
                for (const n in o) null == o[n] ? e.removeAttribute(n) : "style" === n ? (e.style.cssText = o[n]) : "__value" === n ? (e.value = e[n] = o[n]) : t[n] && t[n].set ? (e[n] = o[n]) : j(e, n, o[n]);
            }
            function X(e, o) {
                for (const t in o) j(e, t, o[t]);
            }
            function D(e, o) {
                (o = "" + o), e.wholeText !== o && (e.data = o);
            }
            function A(e, o, t, n) {
                e.style.setProperty(o, t, n ? "important" : "");
            }
            function I(e, o, t) {
                e.classList[t ? "add" : "remove"](o);
            }
            class L {
                constructor(e = null) {
                    (this.a = e), (this.e = this.n = null);
                }
                m(e, o, t = null) {
                    this.e || ((this.e = z(o.nodeName)), (this.t = o), this.h(e)), this.i(t);
                }
                h(e) {
                    (this.e.innerHTML = e), (this.n = Array.from(this.e.childNodes));
                }
                i(e) {
                    for (let o = 0; o < this.n.length; o += 1) y(this.t, this.n[o], e);
                }
                p(e) {
                    this.d(), this.h(e), this.i(this.a);
                }
                d() {
                    this.n.forEach(v);
                }
            }
            new Set();
            let N;
            function q(e) {
                N = e;
            }
            function E() {
                if (!N) throw new Error("Function called outside component initialization");
                return N;
            }
            function O(e, o) {
                E().$$.context.set(e, o);
            }
            function B(e) {
                return E().$$.context.get(e);
            }
            const R = [],
                U = [],
                F = [],
                M = [],
                G = Promise.resolve();
            let W = !1;
            function J() {
                W || ((W = !0), G.then(Y));
            }
            function V(e) {
                F.push(e);
            }
            function H(e) {
                M.push(e);
            }
            let K = !1;
            const Z = new Set();
            function Y() {
                if (!K) {
                    K = !0;
                    do {
                        for (let e = 0; e < R.length; e += 1) {
                            const o = R[e];
                            q(o), Q(o.$$);
                        }
                        for (q(null), R.length = 0; U.length; ) U.pop()();
                        for (let e = 0; e < F.length; e += 1) {
                            const o = F[e];
                            Z.has(o) || (Z.add(o), o());
                        }
                        F.length = 0;
                    } while (R.length);
                    for (; M.length; ) M.pop()();
                    (W = !1), (K = !1), Z.clear();
                }
            }
            function Q(e) {
                if (null !== e.fragment) {
                    e.update(), c(e.before_update);
                    const o = e.dirty;
                    (e.dirty = [-1]), e.fragment && e.fragment.p(e.ctx, o), e.after_update.forEach(V);
                }
            }
            const ee = new Set();
            let oe;
            function te() {
                oe = { r: 0, c: [], p: oe };
            }
            function ne() {
                oe.r || c(oe.c), (oe = oe.p);
            }
            function ie(e, o) {
                e && e.i && (ee.delete(e), e.i(o));
            }
            function se(e, o, t, n) {
                if (e && e.o) {
                    if (ee.has(e)) return;
                    ee.add(e),
                        oe.c.push(() => {
                            ee.delete(e), n && (t && e.d(1), n());
                        }),
                        e.o(o);
                }
            }
            "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : global;
            function ae(e, o) {
                const t = {},
                    n = {},
                    i = { $$scope: 1 };
                let s = e.length;
                for (; s--; ) {
                    const a = e[s],
                        c = o[s];
                    if (c) {
                        for (const e in a) e in c || (n[e] = 1);
                        for (const e in c) i[e] || ((t[e] = c[e]), (i[e] = 1));
                        e[s] = c;
                    } else for (const e in a) i[e] = 1;
                }
                for (const e in n) e in t || (t[e] = void 0);
                return t;
            }
            function ce(e) {
                return "object" == typeof e && null !== e ? e : {};
            }
            new Set([
                "allowfullscreen",
                "allowpaymentrequest",
                "async",
                "autofocus",
                "autoplay",
                "checked",
                "controls",
                "default",
                "defer",
                "disabled",
                "formnovalidate",
                "hidden",
                "ismap",
                "loop",
                "multiple",
                "muted",
                "nomodule",
                "novalidate",
                "open",
                "playsinline",
                "readonly",
                "required",
                "reversed",
                "selected",
            ]);
            let re;
            function le(e, o, t) {
                const n = e.$$.props[o];
                void 0 !== n && ((e.$$.bound[n] = t), t(e.$$.ctx[n]));
            }
            function ue(e) {
                e && e.c();
            }
            function pe(e, o, t) {
                const { fragment: n, on_mount: i, on_destroy: a, after_update: l } = e.$$;
                n && n.m(o, t),
                    V(() => {
                        const o = i.map(s).filter(r);
                        a ? a.push(...o) : c(o), (e.$$.on_mount = []);
                    }),
                    l.forEach(V);
            }
            function _e(e, o) {
                const t = e.$$;
                null !== t.fragment && (c(t.on_destroy), t.fragment && t.fragment.d(o), (t.on_destroy = t.fragment = null), (t.ctx = []));
            }
            function de(e, o, t, i, s, r, l = [-1]) {
                const u = N;
                q(e);
                const p = o.props || {},
                    _ = (e.$$ = {
                        fragment: null,
                        ctx: null,
                        props: r,
                        update: n,
                        not_equal: s,
                        bound: a(),
                        on_mount: [],
                        on_destroy: [],
                        before_update: [],
                        after_update: [],
                        context: new Map(u ? u.$$.context : []),
                        callbacks: a(),
                        dirty: l,
                        skip_bound: !1,
                    });
                let d = !1;
                if (
                    ((_.ctx = t
                        ? t(e, p, (o, t, ...n) => {
                              const i = n.length ? n[0] : t;
                              return (
                                  _.ctx &&
                                      s(_.ctx[o], (_.ctx[o] = i)) &&
                                      (!_.skip_bound && _.bound[o] && _.bound[o](i),
                                      d &&
                                          (function (e, o) {
                                              -1 === e.$$.dirty[0] && (R.push(e), J(), e.$$.dirty.fill(0)), (e.$$.dirty[(o / 31) | 0] |= 1 << o % 31);
                                          })(e, o)),
                                  t
                              );
                          })
                        : []),
                    _.update(),
                    (d = !0),
                    c(_.before_update),
                    (_.fragment = !!i && i(_.ctx)),
                    o.target)
                ) {
                    if (o.hydrate) {
                        const e = ((m = o.target), Array.from(m.childNodes));
                        _.fragment && _.fragment.l(e), e.forEach(v);
                    } else _.fragment && _.fragment.c();
                    o.intro && ie(e.$$.fragment), pe(e, o.target, o.anchor), Y();
                }
                var m;
                q(u);
            }
            "function" == typeof HTMLElement &&
                (re = class extends HTMLElement {
                    constructor() {
                        super(), this.attachShadow({ mode: "open" });
                    }
                    connectedCallback() {
                        for (const e in this.$$.slotted) this.appendChild(this.$$.slotted[e]);
                    }
                    attributeChangedCallback(e, o, t) {
                        this[e] = t;
                    }
                    $destroy() {
                        _e(this, 1), (this.$destroy = n);
                    }
                    $on(e, o) {
                        const t = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
                        return (
                            t.push(o),
                            () => {
                                const e = t.indexOf(o);
                                -1 !== e && t.splice(e, 1);
                            }
                        );
                    }
                    $set(e) {
                        this.$$set && !u(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
                    }
                });
            class me {
                $destroy() {
                    _e(this, 1), (this.$destroy = n);
                }
                $on(e, o) {
                    const t = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
                    return (
                        t.push(o),
                        () => {
                            const e = t.indexOf(o);
                            -1 !== e && t.splice(e, 1);
                        }
                    );
                }
                $set(e) {
                    this.$$set && !u(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
                }
            }
            const ke = [];
            function ge(e, o = n) {
                let t;
                const i = [];
                function s(o) {
                    if (l(e, o) && ((e = o), t)) {
                        const o = !ke.length;
                        for (let o = 0; o < i.length; o += 1) {
                            const t = i[o];
                            t[1](), ke.push(t, e);
                        }
                        if (o) {
                            for (let e = 0; e < ke.length; e += 2) ke[e][0](ke[e + 1]);
                            ke.length = 0;
                        }
                    }
                }
                return {
                    set: s,
                    update: function (o) {
                        s(o(e));
                    },
                    subscribe: function (a, c = n) {
                        const r = [a, c];
                        return (
                            i.push(r),
                            1 === i.length && (t = o(s) || n),
                            a(e),
                            () => {
                                const e = i.indexOf(r);
                                -1 !== e && i.splice(e, 1), 0 === i.length && (t(), (t = null));
                            }
                        );
                    },
                };
            }
            var he;
            t(6);
            !(function (e) {
                (e[(e.messages = 0)] = "messages"),
                    (e[(e.closeBanner = 1)] = "closeBanner"),
                    (e[(e.showWelcomeScreen = 2)] = "showWelcomeScreen"),
                    (e[(e.showSettingsScreen = 3)] = "showSettingsScreen"),
                    (e[(e.useDataProcessing = 4)] = "useDataProcessing"),
                    (e[(e.dataProcessingUserType = 5)] = "dataProcessingUserType"),
                    (e[(e.saveAndClose = 6)] = "saveAndClose"),
                    (e[(e.canDeclineAll = 7)] = "canDeclineAll"),
                    (e[(e.isSending = 8)] = "isSending");
            })(he || (he = {}));
            var fe = t(0);
            class be {}
            (be.CSS_INTEGER = "[-\\+]?\\d+%?"),
                (be.CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?"),
                (be.CSS_UNIT = `(?:${be.CSS_NUMBER})|(?:${be.CSS_INTEGER})`),
                (be.permissiveMatch = (e) => `[\\s|\\(]+(${be.CSS_UNIT})${`[,|\\s]+(${be.CSS_UNIT})`.repeat(e - 1)}\\s*\\)?`),
                (be.rgb = new RegExp(`rgb${be.permissiveMatch(3)}`)),
                (be.rgba = new RegExp(`rgba${be.permissiveMatch(4)}`)),
                (be.hsl = new RegExp(`hsl${be.permissiveMatch(3)}`)),
                (be.hsla = new RegExp(`hsla${be.permissiveMatch(4)}`)),
                (be.hex6 = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/);
            const ye = (e, o, t) => (t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? e + 6 * (o - e) * t : t < 0.5 ? o : t < 2 / 3 ? e + (o - e) * (2 / 3 - t) * 6 : e),
                ve = (e, o, t, n) => {
                    if (0 === o) return [t, t, t, 1];
                    e /= 360;
                    const i = t < 0.5 ? t * (1 + o) : t + o - t * o,
                        s = 2 * t - i;
                    return [Math.round(255 * ye(s, i, e + 1 / 3)), Math.round(255 * ye(s, i, e)), Math.round(255 * ye(s, i, e - 1 / 3)), null != n ? n : 1];
                };
            class we {
                constructor(e, o, t, n) {
                    (this.r = e), (this.g = o), (this.b = t), (this.a = 1), (this.a = n || this.a);
                }
                alpha(e) {
                    return (this.a = e), this;
                }
                static parse(e) {
                    let o;
                    if ((o = be.rgb.exec(e))) return new we(...o.slice(1, 4).map((e) => +e));
                    if ((o = be.rgba.exec(e))) return new we(...o.slice(1, 5).map((e) => +e));
                    if ((o = be.hsl.exec(e))) {
                        const [e, t, n] = o.slice(1, 4);
                        return new we(...ve(parseInt(e, 10), parseFloat(t) / 100, parseFloat(n) / 100));
                    }
                    if ((o = be.hsla.exec(e))) {
                        const [e, t, n, i] = o.slice(1, 5);
                        return new we(...ve(parseInt(e, 10), parseFloat(t) / 100, parseFloat(n) / 100, Number.isNaN(parseFloat(i)) ? 1 : parseFloat(i)));
                    }
                    return (o = be.hex6.exec(e)) ? new we(...o.slice(1, 4).map((e) => parseInt(e, 16))) : null;
                }
                mix(e) {
                    const o = e.a;
                    return new we((e.r - this.r) * o + this.r, (e.g - this.g) * o + this.g, (e.b - this.b) * o + this.b, this.a);
                }
                luminance() {
                    return [this.r, this.g, this.b]
                        .map((e) => e / 255)
                        .map((e) => (e <= 0.03928 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4)))
                        .reduce((e, o, t) => e + o * we.LUMINANCE_COEFFS[t], 0);
                }
                getContrastColor() {
                    return this.luminance() > we.CONTRAST_THRESHOLD ? new we(0, 0, 0) : new we(255, 255, 255);
                }
                toRgba() {
                    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
                }
            }
            (we.CONTRAST_THRESHOLD = 0.179), (we.LUMINANCE_COEFFS = [0.2126, 0.7152, 0.0722]);
            function ze(e) {
                let o,
                    t,
                    s = [{ xmlns: "http://www.w3.org/2000/svg" }, { width: "24" }, { height: "24" }, { fill: "none" }, e[0]],
                    a = {};
                for (let e = 0; e < s.length; e += 1) a = i(a, s[e]);
                return {
                    c() {
                        (o = $("svg")), (t = $("path")), j(t, "d", "M9.947 9.316a.7.7 0 11.99-.99l4 4a.7.7 0 010 .99l-4 4a.7.7 0 01-.99-.99l3.505-3.505-3.505-3.505z"), j(t, "fill", "currentColor"), X(o, a);
                    },
                    m(e, n) {
                        y(e, o, n), b(o, t);
                    },
                    p(e, [t]) {
                        X(o, (a = ae(s, [{ xmlns: "http://www.w3.org/2000/svg" }, { width: "24" }, { height: "24" }, { fill: "none" }, 1 & t && e[0]])));
                    },
                    i: n,
                    o: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function $e(e, o, t) {
                const n = [];
                let s = f(o, n);
                return (
                    (e.$$set = (e) => {
                        (o = i(i({}, o), h(e))), t(0, (s = f(o, n)));
                    }),
                    [s]
                );
            }
            var xe = class extends me {
                constructor(e) {
                    super(), de(this, e, $e, ze, l, {});
                }
            };
            function Ce(e) {
                let o,
                    t,
                    s = [{ width: "16" }, { height: "17" }, { fill: "none" }, { xmlns: "http://www.w3.org/2000/svg" }, e[0]],
                    a = {};
                for (let e = 0; e < s.length; e += 1) a = i(a, s[e]);
                return {
                    c() {
                        (o = $("svg")),
                            (t = $("path")),
                            j(t, "fill-rule", "evenodd"),
                            j(t, "clip-rule", "evenodd"),
                            j(
                                t,
                                "d",
                                "M0 8.521a8 8 0 1 0 16 0 8 8 0 0 0-16 0zm14.6 0a6.6 6.6 0 1 1-13.2 0 6.6 6.6 0 0 1 13.2 0zM8.466 10.06v-.828l.392-.269.425-.28c.1-.066.235-.178.403-.335.179-.157.313-.302.392-.436.179-.28.358-.716.358-1.198a2.11 2.11 0 0 0-.638-1.555c-.425-.425-1.03-.638-1.801-.638-.761 0-1.388.235-1.869.694-.481.459-.727 1.097-.727 1.913h1.175c0-.928.537-1.488 1.42-1.488.795 0 1.209.504 1.209 1.097 0 .347-.045.56-.257.783a1.834 1.834 0 0 1-.336.305 8.83 8.83 0 0 0-.336.243l-1.04.739v1.253h1.23zm.034 1.085v1.377H7.202v-1.377H8.5z"
                            ),
                            j(t, "fill", "currentColor"),
                            X(o, a);
                    },
                    m(e, n) {
                        y(e, o, n), b(o, t);
                    },
                    p(e, [t]) {
                        X(o, (a = ae(s, [{ width: "16" }, { height: "17" }, { fill: "none" }, { xmlns: "http://www.w3.org/2000/svg" }, 1 & t && e[0]])));
                    },
                    i: n,
                    o: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function Pe(e, o, t) {
                const n = [];
                let s = f(o, n);
                return (
                    (e.$$set = (e) => {
                        (o = i(i({}, o), h(e))), t(0, (s = f(o, n)));
                    }),
                    [s]
                );
            }
            var Se = class extends me {
                constructor(e) {
                    super(), de(this, e, Pe, Ce, l, {});
                }
            };
            function je(e) {
                let o,
                    t,
                    s,
                    a = [{ xmlns: "http://www.w3.org/2000/svg" }, { width: "18" }, { height: "18" }, { viewBox: "20 20 60 60" }, { fill: "none" }, e[0]],
                    c = {};
                for (let e = 0; e < a.length; e += 1) c = i(c, a[e]);
                return {
                    c() {
                        (o = $("svg")),
                            (t = $("path")),
                            (s = $("animateTransform")),
                            j(s, "attributeName", "transform"),
                            j(s, "attributeType", "XML"),
                            j(s, "type", "rotate"),
                            j(s, "dur", "0.7s"),
                            j(s, "from", "0 50 50"),
                            j(s, "to", "360 50 50"),
                            j(s, "repeatCount", "indefinite"),
                            j(t, "fill", "currentColor"),
                            j(t, "d", "M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"),
                            X(o, c);
                    },
                    m(e, n) {
                        y(e, o, n), b(o, t), b(t, s);
                    },
                    p(e, [t]) {
                        X(o, (c = ae(a, [{ xmlns: "http://www.w3.org/2000/svg" }, { width: "18" }, { height: "18" }, { viewBox: "20 20 60 60" }, { fill: "none" }, 1 & t && e[0]])));
                    },
                    i: n,
                    o: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function Te(e, o, t) {
                const n = [];
                let s = f(o, n);
                return (
                    (e.$$set = (e) => {
                        (o = i(i({}, o), h(e))), t(0, (s = f(o, n)));
                    }),
                    [s]
                );
            }
            var Xe = class extends me {
                constructor(e) {
                    super(), de(this, e, Te, je, l, {});
                }
            };
            function De(e) {
                let o;
                const t = e[6].default,
                    n = d(t, e, e[5], null);
                return {
                    c() {
                        n && n.c();
                    },
                    m(e, t) {
                        n && n.m(e, t), (o = !0);
                    },
                    p(e, o) {
                        n && n.p && 32 & o && g(n, t, e, e[5], o, null, null);
                    },
                    i(e) {
                        o || (ie(n, e), (o = !0));
                    },
                    o(e) {
                        se(n, e), (o = !1);
                    },
                    d(e) {
                        n && n.d(e);
                    },
                };
            }
            function Ae(e) {
                let o, t, n, s, a, c;
                const r = [{}];
                let l = {};
                for (let e = 0; e < r.length; e += 1) l = i(l, r[e]);
                return (
                    (t = new Xe({ props: l })),
                    {
                        c() {
                            (o = z("span")), ue(t.$$.fragment), (n = C()), (s = z("span")), (a = x(e[3])), j(o, "class", "gdpr-button__loader svelte-1pwgqvh"), j(s, "class", "gdpr-button__loading-text svelte-1pwgqvh");
                        },
                        m(e, i) {
                            y(e, o, i), pe(t, o, null), y(e, n, i), y(e, s, i), b(s, a), (c = !0);
                        },
                        p(e, o) {
                            const n = 0 & o ? ae(r, [ce({})]) : {};
                            t.$set(n), (!c || 8 & o) && D(a, e[3]);
                        },
                        i(e) {
                            c || (ie(t.$$.fragment, e), (c = !0));
                        },
                        o(e) {
                            se(t.$$.fragment, e), (c = !1);
                        },
                        d(e) {
                            e && v(o), _e(t), e && v(n), e && v(s);
                        },
                    }
                );
            }
            function Ie(e) {
                let o, t, n, s, a, c, l;
                const u = [Ae, De],
                    p = [];
                function _(e, o) {
                    return e[2] ? 0 : 1;
                }
                (t = _(e)), (n = p[t] = u[t](e));
                let d = [{ class: (s = "gdpr-button gdpr-button--" + e[0]) }, { disabled: e[2] }, e[4], {}],
                    m = {};
                for (let e = 0; e < d.length; e += 1) m = i(m, d[e]);
                return {
                    c() {
                        (o = z("button")), n.c(), T(o, m), I(o, "svelte-1pwgqvh", !0);
                    },
                    m(n, i) {
                        y(n, o, i),
                            p[t].m(o, null),
                            (a = !0),
                            c ||
                                ((l = S(o, "click", function () {
                                    r(e[1]) && e[1].apply(this, arguments);
                                })),
                                (c = !0));
                    },
                    p(i, [c]) {
                        let r = t;
                        (t = _((e = i))),
                            t === r
                                ? p[t].p(e, c)
                                : (te(),
                                  se(p[r], 1, 1, () => {
                                      p[r] = null;
                                  }),
                                  ne(),
                                  (n = p[t]),
                                  n ? n.p(e, c) : ((n = p[t] = u[t](e)), n.c()),
                                  ie(n, 1),
                                  n.m(o, null)),
                            T(o, (m = ae(d, [(!a || (1 & c && s !== (s = "gdpr-button gdpr-button--" + e[0]))) && { class: s }, (!a || 4 & c) && { disabled: e[2] }, 16 & c && e[4], {}]))),
                            I(o, "svelte-1pwgqvh", !0);
                    },
                    i(e) {
                        a || (ie(n), (a = !0));
                    },
                    o(e) {
                        se(n), (a = !1);
                    },
                    d(e) {
                        e && v(o), p[t].d(), (c = !1), l();
                    },
                };
            }
            function Le(e, o, t) {
                const n = ["appearance", "onClick", "isLoading", "loadingText"];
                let s = f(o, n),
                    { $$slots: a = {}, $$scope: c } = o,
                    { appearance: r = "primary" } = o,
                    { onClick: l = () => {} } = o,
                    { isLoading: u = !1 } = o,
                    { loadingText: p = "" } = o;
                return (
                    (e.$$set = (e) => {
                        (o = i(i({}, o), h(e))),
                            t(4, (s = f(o, n))),
                            "appearance" in e && t(0, (r = e.appearance)),
                            "onClick" in e && t(1, (l = e.onClick)),
                            "isLoading" in e && t(2, (u = e.isLoading)),
                            "loadingText" in e && t(3, (p = e.loadingText)),
                            "$$scope" in e && t(5, (c = e.$$scope));
                    }),
                    [r, l, u, p, s, c, a]
                );
            }
            var Ne = class extends me {
                constructor(e) {
                    super(), de(this, e, Le, Ie, l, { appearance: 0, onClick: 1, isLoading: 2, loadingText: 3 });
                }
            };
            function qe(e) {
                let o,
                    t,
                    n,
                    s,
                    a,
                    l,
                    u,
                    p,
                    _,
                    m,
                    k,
                    h = [{ id: e[1] }, { class: "gdpr-checkbox__input" }, { type: "checkbox" }, e[5]],
                    f = {};
                for (let e = 0; e < h.length; e += 1) f = i(f, h[e]);
                const w = e[7].default,
                    $ = d(w, e, e[6], null);
                let x = [{}, { class: (p = "gdpr-checkbox " + e[3]) }],
                    P = {};
                for (let e = 0; e < x.length; e += 1) P = i(P, x[e]);
                return {
                    c() {
                        (o = z("label")),
                            (t = z("input")),
                            (n = C()),
                            (s = z("div")),
                            (s.innerHTML = '<div class="gdpr-checkbox__checkmark svelte-4k0w1k"></div>'),
                            (a = C()),
                            (l = z("span")),
                            $ && $.c(),
                            T(t, f),
                            I(t, "svelte-4k0w1k", !0),
                            j(s, "class", "gdpr-checkbox__border svelte-4k0w1k"),
                            j(l, "class", (u = "gdpr-checkbox__content " + e[4] + " svelte-4k0w1k")),
                            T(o, P),
                            I(o, "svelte-4k0w1k", !0);
                    },
                    m(i, c) {
                        y(i, o, c),
                            b(o, t),
                            (t.checked = e[0]),
                            b(o, n),
                            b(o, s),
                            b(o, a),
                            b(o, l),
                            $ && $.m(l, null),
                            (_ = !0),
                            m ||
                                ((k = [
                                    S(t, "change", e[8]),
                                    S(t, "change", function () {
                                        r(e[2]) && e[2].apply(this, arguments);
                                    }),
                                ]),
                                (m = !0));
                    },
                    p(n, [i]) {
                        (e = n),
                            T(t, (f = ae(h, [(!_ || 2 & i) && { id: e[1] }, { class: "gdpr-checkbox__input" }, { type: "checkbox" }, 32 & i && e[5]]))),
                            1 & i && (t.checked = e[0]),
                            I(t, "svelte-4k0w1k", !0),
                            $ && $.p && 64 & i && g($, w, e, e[6], i, null, null),
                            (!_ || (16 & i && u !== (u = "gdpr-checkbox__content " + e[4] + " svelte-4k0w1k"))) && j(l, "class", u),
                            T(o, (P = ae(x, [{}, (!_ || (8 & i && p !== (p = "gdpr-checkbox " + e[3]))) && { class: p }]))),
                            I(o, "svelte-4k0w1k", !0);
                    },
                    i(e) {
                        _ || (ie($, e), (_ = !0));
                    },
                    o(e) {
                        se($, e), (_ = !1);
                    },
                    d(e) {
                        e && v(o), $ && $.d(e), (m = !1), c(k);
                    },
                };
            }
            function Ee(e, o, t) {
                const n = ["id", "value", "onChange", "className", "contentClassName"];
                let s = f(o, n),
                    { $$slots: a = {}, $$scope: c } = o,
                    { id: r } = o,
                    { value: l } = o,
                    { onChange: u = () => {} } = o,
                    { className: p = "" } = o,
                    { contentClassName: _ = "" } = o;
                return (
                    (e.$$set = (e) => {
                        (o = i(i({}, o), h(e))),
                            t(5, (s = f(o, n))),
                            "id" in e && t(1, (r = e.id)),
                            "value" in e && t(0, (l = e.value)),
                            "onChange" in e && t(2, (u = e.onChange)),
                            "className" in e && t(3, (p = e.className)),
                            "contentClassName" in e && t(4, (_ = e.contentClassName)),
                            "$$scope" in e && t(6, (c = e.$$scope));
                    }),
                    [
                        l,
                        r,
                        u,
                        p,
                        _,
                        s,
                        c,
                        a,
                        function () {
                            (l = this.checked), t(0, l);
                        },
                    ]
                );
            }
            var Oe = class extends me {
                constructor(e) {
                    super(), de(this, e, Ee, qe, l, { id: 1, value: 0, onChange: 2, className: 3, contentClassName: 4 });
                }
            };
            function Be(e) {
                let o,
                    t,
                    n,
                    s,
                    a = [{ class: "gdpr-close-button" }, e[4]],
                    c = {};
                for (let e = 0; e < a.length; e += 1) c = i(c, a[e]);
                return {
                    c() {
                        (o = z("button")), (t = x("вњ•")), T(o, c), I(o, "svelte-avo2ss", !0);
                    },
                    m(i, a) {
                        y(i, o, a),
                            b(o, t),
                            n ||
                                ((s = S(o, "click", function () {
                                    r(e[3]) && e[3].apply(this, arguments);
                                })),
                                (n = !0));
                    },
                    p(t, n) {
                        (e = t), T(o, (c = ae(a, [{ class: "gdpr-close-button" }, 16 & n && e[4]]))), I(o, "svelte-avo2ss", !0);
                    },
                    d(e) {
                        e && v(o), (n = !1), s();
                    },
                };
            }
            function Re(e) {
                let o,
                    t,
                    n,
                    i = e[1] && Be(e);
                const s = e[7].default,
                    a = d(s, e, e[6], null);
                return {
                    c() {
                        (o = z("div")), i && i.c(), (t = C()), a && a.c(), j(o, "class", "gdpr-container svelte-avo2ss"), I(o, "gdpr-container--fullscreen", e[2]);
                    },
                    m(s, c) {
                        y(s, o, c), i && i.m(o, null), b(o, t), a && a.m(o, null), e[8](o), (n = !0);
                    },
                    p(e, [n]) {
                        e[1] ? (i ? i.p(e, n) : ((i = Be(e)), i.c(), i.m(o, t))) : i && (i.d(1), (i = null)), a && a.p && 64 & n && g(a, s, e, e[6], n, null, null), 4 & n && I(o, "gdpr-container--fullscreen", e[2]);
                    },
                    i(e) {
                        n || (ie(a, e), (n = !0));
                    },
                    o(e) {
                        se(a, e), (n = !1);
                    },
                    d(t) {
                        t && v(o), i && i.d(), a && a.d(t), e[8](null);
                    },
                };
            }
            function Ue(e, o, t) {
                const n = ["showCloseButton", "fullscreen", "dom", "saveAndClose", "onClose"];
                let s = f(o, n),
                    { $$slots: a = {}, $$scope: c } = o;
                const r = fe.a.getInstance(),
                    { cookie: l, gdpr: u } = r.consent;
                let { showCloseButton: p = !0 } = o,
                    { fullscreen: _ = !1 } = o,
                    { dom: d } = o,
                    { saveAndClose: m = B(he.saveAndClose) } = o;
                function k() {
                    Object.keys(l).forEach((e) => (l[e] = !1)), (u.consent_state = !1), m();
                }
                let { onClose: g = k } = o;
                return (
                    (e.$$set = (e) => {
                        (o = i(i({}, o), h(e))),
                            t(4, (s = f(o, n))),
                            "showCloseButton" in e && t(1, (p = e.showCloseButton)),
                            "fullscreen" in e && t(2, (_ = e.fullscreen)),
                            "dom" in e && t(0, (d = e.dom)),
                            "saveAndClose" in e && t(5, (m = e.saveAndClose)),
                            "onClose" in e && t(3, (g = e.onClose)),
                            "$$scope" in e && t(6, (c = e.$$scope));
                    }),
                    [
                        d,
                        p,
                        _,
                        g,
                        s,
                        m,
                        c,
                        a,
                        function (e) {
                            U[e ? "unshift" : "push"](() => {
                                (d = e), t(0, d);
                            });
                        },
                    ]
                );
            }
            var Fe = class extends me {
                constructor(e) {
                    super(), de(this, e, Ue, Re, l, { showCloseButton: 1, fullscreen: 2, dom: 0, saveAndClose: 5, onClose: 3 });
                }
            };
            function Me(e) {
                let o, t;
                return (
                    (o = new Se({})),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, n) {
                            pe(o, e, n), (t = !0);
                        },
                        i(e) {
                            t || (ie(o.$$.fragment, e), (t = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (t = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function Ge(e) {
                let o, t, n;
                function i(o) {
                    e[12].call(null, o);
                }
                let s = { fullscreen: !0, onClose: e[7](!0), $$slots: { default: [Je] }, $$scope: { ctx: e } };
                return (
                    void 0 !== e[3] && (s.dom = e[3]),
                    (o = new Fe({ props: s })),
                    U.push(() => le(o, "dom", i)),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, t) {
                            pe(o, e, t), (n = !0);
                        },
                        p(e, n) {
                            const i = {};
                            16385 & n && (i.$$scope = { dirty: n, ctx: e }), !t && 8 & n && ((t = !0), (i.dom = e[3]), H(() => (t = !1))), o.$set(i);
                        },
                        i(e) {
                            n || (ie(o.$$.fragment, e), (n = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (n = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function We(e) {
                let o, t;
                return {
                    c() {
                        (o = z("span")), (t = x(e[0])), j(o, "class", "gdpr-tooltip__label svelte-1nnch7a");
                    },
                    m(n, i) {
                        y(n, o, i), b(o, t), e[11](o);
                    },
                    p(e, o) {
                        1 & o && D(t, e[0]);
                    },
                    i: n,
                    o: n,
                    d(t) {
                        t && v(o), e[11](null);
                    },
                };
            }
            function Je(e) {
                let o, t;
                return {
                    c() {
                        (o = z("div")), (t = x(e[0])), j(o, "class", "gdpr-tooltip__mobile-label svelte-1nnch7a");
                    },
                    m(e, n) {
                        y(e, o, n), b(o, t);
                    },
                    p(e, o) {
                        1 & o && D(t, e[0]);
                    },
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function Ve(e) {
                let o, t, n, i, s, a, r, l;
                const u = e[10].default,
                    p = d(u, e, e[14], null);
                let _ = e[1] && Me();
                const m = [We, Ge],
                    k = [];
                return (
                    (i = (function (e, o) {
                        return e[5] ? 1 : 0;
                    })(e)),
                    (s = k[i] = m[i](e)),
                    {
                        c() {
                            (o = z("span")), p && p.c(), (t = C()), _ && _.c(), (n = C()), s.c(), j(o, "class", "gdpr-tooltip svelte-1nnch7a"), I(o, "gdpr-tooltip--disabled", e[2]);
                        },
                        m(s, c) {
                            y(s, o, c), p && p.m(o, null), b(o, t), _ && _.m(o, null), b(o, n), k[i].m(o, null), e[13](o), (a = !0), r || ((l = [S(o, "mouseenter", e[6]), S(o, "mouseleave", e[7](!e[5])), S(o, "click", e[8])]), (r = !0));
                        },
                        p(e, [t]) {
                            p && p.p && 16384 & t && g(p, u, e, e[14], t, null, null),
                                e[1]
                                    ? _
                                        ? 2 & t && ie(_, 1)
                                        : ((_ = Me()), _.c(), ie(_, 1), _.m(o, n))
                                    : _ &&
                                      (te(),
                                      se(_, 1, 1, () => {
                                          _ = null;
                                      }),
                                      ne()),
                                s.p(e, t),
                                4 & t && I(o, "gdpr-tooltip--disabled", e[2]);
                        },
                        i(e) {
                            a || (ie(p, e), ie(_), ie(s), (a = !0));
                        },
                        o(e) {
                            se(p, e), se(_), se(s), (a = !1);
                        },
                        d(t) {
                            t && v(o), p && p.d(t), _ && _.d(), k[i].d(), e[13](null), (r = !1), c(l);
                        },
                    }
                );
            }
            function He(e, o, t) {
                let n,
                    i,
                    s,
                    { $$slots: a = {}, $$scope: c } = o,
                    { label: r = "" } = o,
                    { showIcon: l = !1 } = o,
                    { disabled: u = !1 } = o,
                    p = !1,
                    _ = "ontouchstart" in window && window.matchMedia("(max-width: 650px)").matches;
                function d() {
                    const e = window.innerWidth;
                    t(3, (n.style.maxWidth = null), n), t(3, (n.style.right = null), n), t(3, (n.style.left = null), n), t(3, (n.style.top = null), n), t(3, (n.style.maxWidth = `${Math.min(e, 450)}px`), n);
                    const o = i.getBoundingClientRect();
                    let s = n.getBoundingClientRect();
                    const a = n.offsetHeight,
                        c = o.left + o.width / 2 - s.width / 2;
                    t(3, (n.style.left = `${c}px`), n),
                        (s = n.getBoundingClientRect()),
                        s.left < 0 || e <= s.width ? t(3, (n.style.left = 0), n) : e - s.right < 0 && (t(3, (n.style.right = 0), n), t(3, (n.style.left = null), n)),
                        a > o.top ? t(3, (n.style.top = `${o.top + o.height + 5}px`), n) : t(3, (n.style.top = o.top - s.height - 5 + "px"), n);
                }
                function m() {
                    s && Array.from(s.childNodes).some((e) => e === n) && s.removeChild(n);
                }
                var k;
                return (
                    (k = () => {
                        (s = document.querySelector(".gdpr-app")), m(), s.appendChild(n), _ || d();
                    }),
                    E().$$.on_mount.push(k),
                    (function (e) {
                        E().$$.on_destroy.push(e);
                    })(m),
                    (e.$$set = (e) => {
                        "label" in e && t(0, (r = e.label)), "showIcon" in e && t(1, (l = e.showIcon)), "disabled" in e && t(2, (u = e.disabled)), "$$scope" in e && t(14, (c = e.$$scope));
                    }),
                    (e.$$.update = () => {
                        520 & e.$$.dirty && n && t(3, (n.style.visibility = p ? "visible" : "hidden"), n);
                    }),
                    [
                        r,
                        l,
                        u,
                        n,
                        i,
                        _,
                        function () {
                            _ || (t(9, (p = !0)), d());
                        },
                        (e) => () => {
                            e && t(9, (p = !1));
                        },
                        function (e) {
                            _ && (e.preventDefault(), t(9, (p = !0)));
                        },
                        p,
                        a,
                        function (e) {
                            U[e ? "unshift" : "push"](() => {
                                (n = e), t(3, n), t(9, p);
                            });
                        },
                        function (e) {
                            (n = e), t(3, n), t(9, p);
                        },
                        function (e) {
                            U[e ? "unshift" : "push"](() => {
                                (i = e), t(4, i);
                            });
                        },
                        c,
                    ]
                );
            }
            var Ke = class extends me {
                constructor(e) {
                    super(), de(this, e, He, Ve, l, { label: 0, showIcon: 1, disabled: 2 });
                }
            };
            function Ze(e) {
                let o,
                    t,
                    i,
                    s,
                    a = e[0].essentialCookiesCheckbox + "";
                return (
                    (i = new Ke({ props: { showIcon: !0, disabled: !0, label: e[0].essentialCookiesTooltip } })),
                    {
                        c() {
                            (o = x(a)), (t = C()), ue(i.$$.fragment);
                        },
                        m(e, n) {
                            y(e, o, n), y(e, t, n), pe(i, e, n), (s = !0);
                        },
                        p: n,
                        i(e) {
                            s || (ie(i.$$.fragment, e), (s = !0));
                        },
                        o(e) {
                            se(i.$$.fragment, e), (s = !1);
                        },
                        d(e) {
                            e && v(o), e && v(t), _e(i, e);
                        },
                    }
                );
            }
            function Ye(e) {
                let o, t;
                const n = [{ disabled: !0 }, { value: !0 }, { contentClassName: "gdpr-essential-cookie-checkbox" }, e[1]];
                let s = { $$slots: { default: [Ze] }, $$scope: { ctx: e } };
                for (let e = 0; e < n.length; e += 1) s = i(s, n[e]);
                return (
                    (o = new Oe({ props: s })),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, n) {
                            pe(o, e, n), (t = !0);
                        },
                        p(e, [t]) {
                            const i = 2 & t ? ae(n, [n[0], n[1], n[2], ce(e[1])]) : {};
                            4 & t && (i.$$scope = { dirty: t, ctx: e }), o.$set(i);
                        },
                        i(e) {
                            t || (ie(o.$$.fragment, e), (t = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (t = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function Qe(e, o, t) {
                const n = [];
                let s = f(o, n);
                const a = B(he.messages);
                return (
                    (e.$$set = (e) => {
                        (o = i(i({}, o), h(e))), t(1, (s = f(o, n)));
                    }),
                    [a, s]
                );
            }
            var eo = class extends me {
                constructor(e) {
                    super(), de(this, e, Qe, Ye, l, {});
                }
            };
            function oo(e, o, t) {
                const n = e.slice();
                return (n[22] = o[t]), n;
            }
            function to(e, o, t) {
                const n = e.slice();
                return (n[22] = o[t]), n;
            }
            function no(e) {
                let o,
                    t = ("acceptAllButtonText" === e[22] ? e[7].acceptAllButton : e[22]) + "";
                return {
                    c() {
                        o = x(t);
                    },
                    m(e, t) {
                        y(e, o, t);
                    },
                    p: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function io(e) {
                let o,
                    t = e[22] + "";
                return {
                    c() {
                        o = x(t);
                    },
                    m(e, t) {
                        y(e, o, t);
                    },
                    p: n,
                    i: n,
                    o: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function so(e) {
                let o, t;
                return (
                    (o = new Ke({ props: { label: e[0][e[11]], showIcon: !0, $$slots: { default: [ao] }, $$scope: { ctx: e } } })),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, n) {
                            pe(o, e, n), (t = !0);
                        },
                        p(e, t) {
                            const n = {};
                            134217728 & t && (n.$$scope = { dirty: t, ctx: e }), o.$set(n);
                        },
                        i(e) {
                            t || (ie(o.$$.fragment, e), (t = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (t = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function ao(e) {
                let o, t;
                return {
                    c() {
                        (o = z("strong")), (o.textContent = `${e[7].dataProcessingConsentMyPersonalData}`), (t = C());
                    },
                    m(e, n) {
                        y(e, o, n), y(e, t, n);
                    },
                    p: n,
                    d(e) {
                        e && v(o), e && v(t);
                    },
                };
            }
            function co(e) {
                let o, t, n, i;
                const s = [so, io],
                    a = [];
                return (
                    (o = (function (e, o) {
                        return "myPersonalDataTooltip" === e[22] ? 0 : 1;
                    })(e)),
                    (t = a[o] = s[o](e)),
                    {
                        c() {
                            t.c(), (n = P());
                        },
                        m(e, t) {
                            a[o].m(e, t), y(e, n, t), (i = !0);
                        },
                        p(e, o) {
                            t.p(e, o);
                        },
                        i(e) {
                            i || (ie(t), (i = !0));
                        },
                        o(e) {
                            se(t), (i = !1);
                        },
                        d(e) {
                            a[o].d(e), e && v(n);
                        },
                    }
                );
            }
            function ro(e) {
                let o,
                    t,
                    n = e[7].welcomeScreenDataProcessing,
                    i = [];
                for (let o = 0; o < n.length; o += 1) i[o] = co(oo(e, n, o));
                const s = (e) =>
                    se(i[e], 1, 1, () => {
                        i[e] = null;
                    });
                return {
                    c() {
                        for (let e = 0; e < i.length; e += 1) i[e].c();
                        o = P();
                    },
                    m(e, n) {
                        for (let o = 0; o < i.length; o += 1) i[o].m(e, n);
                        y(e, o, n), (t = !0);
                    },
                    p(e, t) {
                        if (2177 & t) {
                            let a;
                            for (n = e[7].welcomeScreenDataProcessing, a = 0; a < n.length; a += 1) {
                                const s = oo(e, n, a);
                                i[a] ? (i[a].p(s, t), ie(i[a], 1)) : ((i[a] = co(s)), i[a].c(), ie(i[a], 1), i[a].m(o.parentNode, o));
                            }
                            for (te(), a = n.length; a < i.length; a += 1) s(a);
                            ne();
                        }
                    },
                    i(e) {
                        if (!t) {
                            for (let e = 0; e < n.length; e += 1) ie(i[e]);
                            t = !0;
                        }
                    },
                    o(e) {
                        i = i.filter(Boolean);
                        for (let e = 0; e < i.length; e += 1) se(i[e]);
                        t = !1;
                    },
                    d(e) {
                        w(i, e), e && v(o);
                    },
                };
            }
            function lo(e) {
                let o,
                    t = e[7].welcomeScreenAllowCookies + "";
                return {
                    c() {
                        o = x(t);
                    },
                    m(e, t) {
                        y(e, o, t);
                    },
                    p: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function uo(e) {
                let o,
                    t = e[7].settingsButton + "";
                return {
                    c() {
                        o = x(t);
                    },
                    m(e, t) {
                        y(e, o, t);
                    },
                    p: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function po(e) {
                let o;
                return {
                    c() {
                        o = x(e[5]);
                    },
                    m(e, t) {
                        y(e, o, t);
                    },
                    p(e, t) {
                        32 & t && D(o, e[5]);
                    },
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function _o(e) {
                let o,
                    t,
                    n,
                    i,
                    s,
                    a,
                    c,
                    r,
                    l,
                    u,
                    p,
                    _,
                    d,
                    m,
                    k,
                    g,
                    h,
                    f = e[7].welcomeScreenMobileDescription,
                    $ = [];
                for (let o = 0; o < f.length; o += 1) $[o] = no(to(e, f, o));
                let x =
                    e[10] &&
                    (function (e) {
                        let o, t, n;
                        function i(o) {
                            e[15].call(null, o);
                        }
                        let s = { id: "data-processing-consent", $$slots: { default: [ro] }, $$scope: { ctx: e } };
                        return (
                            void 0 !== e[1].consent_state && (s.value = e[1].consent_state),
                            (o = new Oe({ props: s })),
                            U.push(() => le(o, "value", i)),
                            {
                                c() {
                                    ue(o.$$.fragment);
                                },
                                m(e, t) {
                                    pe(o, e, t), (n = !0);
                                },
                                p(e, n) {
                                    const i = {};
                                    134217728 & n && (i.$$scope = { dirty: n, ctx: e }), !t && 2 & n && ((t = !0), (i.value = e[1].consent_state), H(() => (t = !1))), o.$set(i);
                                },
                                i(e) {
                                    n || (ie(o.$$.fragment, e), (n = !0));
                                },
                                o(e) {
                                    se(o.$$.fragment, e), (n = !1);
                                },
                                d(e) {
                                    _e(o, e);
                                },
                            }
                        );
                    })(e);
                return (
                    (p = new Oe({ props: { onChange: e[12], id: "all-cookies-consent", value: e[2], disabled: e[3], $$slots: { default: [lo] }, $$scope: { ctx: e } } })),
                    (m = new Ne({ props: { onClick: e[8], id: "settings-button", appearance: "secondary", $$slots: { default: [uo] }, $$scope: { ctx: e } } })),
                    (g = new Ne({ props: { id: "submit-button", isLoading: e[6], loadingText: e[7].savingButton, onClick: e[4], $$slots: { default: [po] }, $$scope: { ctx: e } } })),
                    {
                        c() {
                            (o = z("div")), (t = z("div")), (n = z("h4")), (n.textContent = `${e[7].welcomeScreenTitle}`), (i = C()), (s = z("p")), (s.textContent = `${e[7].welcomeScreenDescription}`), (a = C()), (c = z("p"));
                            for (let e = 0; e < $.length; e += 1) $[e].c();
                            (r = C()),
                                (l = z("div")),
                                x && x.c(),
                                (u = C()),
                                ue(p.$$.fragment),
                                (_ = C()),
                                (d = z("div")),
                                ue(m.$$.fragment),
                                (k = C()),
                                ue(g.$$.fragment),
                                j(n, "class", "gdpr-cookies-form__title svelte-plrbgm"),
                                j(s, "class", "gdpr-cookies-form__description svelte-plrbgm"),
                                j(c, "class", "gdpr-cookies-form__mobile-description svelte-plrbgm"),
                                j(l, "class", "gdpr-cookies-settings svelte-plrbgm"),
                                j(t, "class", "gdpr-cookies-form__fields svelte-plrbgm"),
                                j(d, "class", "gdpr-buttons svelte-plrbgm"),
                                j(o, "class", "gdpr-cookies-form svelte-plrbgm");
                        },
                        m(e, f) {
                            y(e, o, f), b(o, t), b(t, n), b(t, i), b(t, s), b(t, a), b(t, c);
                            for (let e = 0; e < $.length; e += 1) $[e].m(c, null);
                            b(t, r), b(t, l), x && x.m(l, null), b(l, u), pe(p, l, null), b(o, _), b(o, d), pe(m, d, null), b(d, k), pe(g, d, null), (h = !0);
                        },
                        p(e, o) {
                            if (128 & o) {
                                let t;
                                for (f = e[7].welcomeScreenMobileDescription, t = 0; t < f.length; t += 1) {
                                    const n = to(e, f, t);
                                    $[t] ? $[t].p(n, o) : (($[t] = no(n)), $[t].c(), $[t].m(c, null));
                                }
                                for (; t < $.length; t += 1) $[t].d(1);
                                $.length = f.length;
                            }
                            e[10] && x.p(e, o);
                            const t = {};
                            4 & o && (t.value = e[2]), 8 & o && (t.disabled = e[3]), 134217728 & o && (t.$$scope = { dirty: o, ctx: e }), p.$set(t);
                            const n = {};
                            134217728 & o && (n.$$scope = { dirty: o, ctx: e }), m.$set(n);
                            const i = {};
                            64 & o && (i.isLoading = e[6]), 16 & o && (i.onClick = e[4]), 134217760 & o && (i.$$scope = { dirty: o, ctx: e }), g.$set(i);
                        },
                        i(e) {
                            h || (ie(x), ie(p.$$.fragment, e), ie(m.$$.fragment, e), ie(g.$$.fragment, e), (h = !0));
                        },
                        o(e) {
                            se(x), se(p.$$.fragment, e), se(m.$$.fragment, e), se(g.$$.fragment, e), (h = !1);
                        },
                        d(e) {
                            e && v(o), w($, e), x && x.d(), _e(p), _e(m), _e(g);
                        },
                    }
                );
            }
            function mo(e) {
                let o, t;
                return (
                    (o = new Fe({ props: { $$slots: { default: [_o] }, $$scope: { ctx: e } } })),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, n) {
                            pe(o, e, n), (t = !0);
                        },
                        p(e, [t]) {
                            const n = {};
                            134217854 & t && (n.$$scope = { dirty: t, ctx: e }), o.$set(n);
                        },
                        i(e) {
                            t || (ie(o.$$.fragment, e), (t = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (t = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function ko(e, o, t) {
                let n;
                const i = fe.a.getInstance(),
                    { cookie: s, gdpr: a } = i.consent,
                    c = B(he.messages),
                    r = (B(he.closeBanner), B(he.showSettingsScreen)),
                    l = B(he.saveAndClose),
                    u = B(he.isSending);
                _(e, u, (e) => t(6, (n = e)));
                const p = B(he.useDataProcessing),
                    d = B(he.dataProcessingUserType);
                let m, k, g, h, f;
                const b = { customer: c.dataProcessingConsentCustomerCheckboxTooltip, partner: c.dataProcessingConsentPartnerCheckboxTooltip };
                function y(e) {
                    Object.keys(s).forEach((o) => t(13, (s[o] = e), s));
                }
                function v(e) {
                    e.preventDefault(), l();
                }
                function w(e) {
                    y(!0), p && t(1, (a.consent_state = !0), a), v(e);
                }
                return (
                    (e.$$.update = () => {
                        8194 & e.$$.dirty && t(14, (m = Object.keys(s).every((e) => null === s[e]) && (null === a.consent_state || !p))),
                            2 & e.$$.dirty && p && !a.consent_state && y(null),
                            2 & e.$$.dirty && t(3, (g = p && !a.consent_state)),
                            8192 & e.$$.dirty && t(2, (k = Object.keys(s).every((e) => !!s[e]))),
                            16384 & e.$$.dirty && t(4, (h = m ? w : v)),
                            16384 & e.$$.dirty && t(5, (f = m ? c.acceptAllButton : c.saveAndCloseButton));
                    }),
                    [
                        b,
                        a,
                        k,
                        g,
                        h,
                        f,
                        n,
                        c,
                        r,
                        u,
                        p,
                        d,
                        function (e) {
                            y(e.target.checked);
                        },
                        s,
                        m,
                        function (e) {
                            (a.consent_state = e), t(1, a);
                        },
                    ]
                );
            }
            var go = class extends me {
                    constructor(e) {
                        super(), de(this, e, ko, mo, l, { dataProcessingTooltips: 0 });
                    }
                    get dataProcessingTooltips() {
                        return this.$$.ctx[0];
                    }
                },
                ho = (t(34), t(1));
            function fo(e) {
                let o, t;
                return (
                    (o = new Ne({ props: { onClick: e[2], id: "return-button", appearance: "secondary", $$slots: { default: [bo] }, $$scope: { ctx: e } } })),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, n) {
                            pe(o, e, n), (t = !0);
                        },
                        p(e, t) {
                            const n = {};
                            16 & t && (n.$$scope = { dirty: t, ctx: e }), o.$set(n);
                        },
                        i(e) {
                            t || (ie(o.$$.fragment, e), (t = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (t = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function bo(e) {
                let o,
                    t = e[1].returnButton + "";
                return {
                    c() {
                        o = x(t);
                    },
                    m(e, t) {
                        y(e, o, t);
                    },
                    p: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function yo(e) {
                let o,
                    t,
                    n,
                    i,
                    s,
                    a,
                    c = e[0] && fo(e);
                const r = e[3].default,
                    l = d(r, e, e[4], null);
                return {
                    c() {
                        (o = z("section")),
                            (t = z("p")),
                            (t.textContent = `${e[1].settingsFooterDescription}`),
                            (n = C()),
                            (i = z("div")),
                            c && c.c(),
                            (s = C()),
                            l && l.c(),
                            j(t, "class", "gdpr-settings-footer__description svelte-s48r0y"),
                            j(i, "class", "gdpr-settings-footer__buttons svelte-s48r0y"),
                            j(o, "class", "gdpr-settings-footer svelte-s48r0y");
                    },
                    m(e, r) {
                        y(e, o, r), b(o, t), b(o, n), b(o, i), c && c.m(i, null), b(i, s), l && l.m(i, null), (a = !0);
                    },
                    p(e, [o]) {
                        e[0]
                            ? c
                                ? (c.p(e, o), 1 & o && ie(c, 1))
                                : ((c = fo(e)), c.c(), ie(c, 1), c.m(i, s))
                            : c &&
                              (te(),
                              se(c, 1, 1, () => {
                                  c = null;
                              }),
                              ne()),
                            l && l.p && 16 & o && g(l, r, e, e[4], o, null, null);
                    },
                    i(e) {
                        a || (ie(c), ie(l, e), (a = !0));
                    },
                    o(e) {
                        se(c), se(l, e), (a = !1);
                    },
                    d(e) {
                        e && v(o), c && c.d(), l && l.d(e);
                    },
                };
            }
            function vo(e, o, t) {
                let { $$slots: n = {}, $$scope: i } = o;
                const s = B(he.messages),
                    a = B(he.showWelcomeScreen);
                let { showReturnButton: c = !0 } = o;
                return (
                    (e.$$set = (e) => {
                        "showReturnButton" in e && t(0, (c = e.showReturnButton)), "$$scope" in e && t(4, (i = e.$$scope));
                    }),
                    [c, s, a, n, i]
                );
            }
            var wo = class extends me {
                constructor(e) {
                    super(), de(this, e, vo, yo, l, { showReturnButton: 0 });
                }
            };
            function zo(e) {
                let o, t;
                const n = e[1].default,
                    i = d(n, e, e[0], null);
                return {
                    c() {
                        (o = z("section")), i && i.c(), j(o, "class", "gdpr-settings-main svelte-ppfr5y");
                    },
                    m(e, n) {
                        y(e, o, n), i && i.m(o, null), (t = !0);
                    },
                    p(e, [o]) {
                        i && i.p && 1 & o && g(i, n, e, e[0], o, null, null);
                    },
                    i(e) {
                        t || (ie(i, e), (t = !0));
                    },
                    o(e) {
                        se(i, e), (t = !1);
                    },
                    d(e) {
                        e && v(o), i && i.d(e);
                    },
                };
            }
            function $o(e, o, t) {
                let { $$slots: n = {}, $$scope: i } = o;
                return (
                    (e.$$set = (e) => {
                        "$$scope" in e && t(0, (i = e.$$scope));
                    }),
                    [i, n]
                );
            }
            var xo = class extends me {
                constructor(e) {
                    super(), de(this, e, $o, zo, l, {});
                }
            };
            function Co(e) {
                let o,
                    t,
                    n,
                    i,
                    s,
                    a,
                    c,
                    r,
                    l,
                    u,
                    p,
                    _,
                    m,
                    k,
                    h = e[0].cookiePolicyLinkName + "",
                    f = e[0].privacyPolicyLinkName + "";
                const w = e[2].default,
                    $ = d(w, e, e[1], null);
                return {
                    c() {
                        (o = z("section")),
                            (t = z("div")),
                            $ && $.c(),
                            (n = C()),
                            (i = z("div")),
                            (s = z("a")),
                            (a = x(h)),
                            (r = C()),
                            (l = z("span")),
                            (u = C()),
                            (p = z("a")),
                            (_ = x(f)),
                            j(s, "href", (c = ho.a.COOKIE_URL)),
                            j(s, "target", "_blank"),
                            j(s, "class", "gdpr-settings-sidebar__link svelte-177w3o8"),
                            j(l, "class", "gdpr-settings-sidebar__divider svelte-177w3o8"),
                            j(p, "href", (m = ho.a.PRIVACY_URL)),
                            j(p, "target", "_blank"),
                            j(p, "class", "gdpr-settings-sidebar__link svelte-177w3o8"),
                            j(i, "class", "gdpr-settings-sidebar__links-container svelte-177w3o8"),
                            j(o, "class", "gdpr-settings-sidebar svelte-177w3o8");
                    },
                    m(e, c) {
                        y(e, o, c), b(o, t), $ && $.m(t, null), b(o, n), b(o, i), b(i, s), b(s, a), b(i, r), b(i, l), b(i, u), b(i, p), b(p, _), (k = !0);
                    },
                    p(e, [o]) {
                        $ && $.p && 2 & o && g($, w, e, e[1], o, null, null);
                    },
                    i(e) {
                        k || (ie($, e), (k = !0));
                    },
                    o(e) {
                        se($, e), (k = !1);
                    },
                    d(e) {
                        e && v(o), $ && $.d(e);
                    },
                };
            }
            function Po(e, o, t) {
                let { $$slots: n = {}, $$scope: i } = o;
                const s = B(he.messages);
                return (
                    (e.$$set = (e) => {
                        "$$scope" in e && t(1, (i = e.$$scope));
                    }),
                    [s, i, n]
                );
            }
            var So = class extends me {
                constructor(e) {
                    super(), de(this, e, Po, Co, l, {});
                }
            };
            const jo = (e) => ({}),
                To = (e) => ({});
            function Xo(e) {
                let o, t, n, i, s, a, c, l, u;
                const p = e[3].default,
                    _ = d(p, e, e[2], null);
                s = new xe({});
                const m = e[3]["mobile-content"],
                    k = d(m, e, e[2], To);
                return {
                    c() {
                        (o = z("div")),
                            (t = z("button")),
                            _ && _.c(),
                            (n = C()),
                            (i = z("span")),
                            ue(s.$$.fragment),
                            (a = C()),
                            k && k.c(),
                            j(i, "class", "gdpr-settings-tab__arrow svelte-1ot9yo5"),
                            j(t, "class", "gdpr-settings-tab__btn svelte-1ot9yo5"),
                            I(t, "gdpr-settings-tab__btn--active", e[0]),
                            j(o, "class", "gdpr-settings-tab svelte-1ot9yo5");
                    },
                    m(p, d) {
                        y(p, o, d),
                            b(o, t),
                            _ && _.m(t, null),
                            b(t, n),
                            b(t, i),
                            pe(s, i, null),
                            b(o, a),
                            k && k.m(o, null),
                            (c = !0),
                            l ||
                                ((u = S(t, "click", function () {
                                    r(e[1]) && e[1].apply(this, arguments);
                                })),
                                (l = !0));
                    },
                    p(o, [n]) {
                        (e = o), _ && _.p && 4 & n && g(_, p, e, e[2], n, null, null), 1 & n && I(t, "gdpr-settings-tab__btn--active", e[0]), k && k.p && 4 & n && g(k, m, e, e[2], n, jo, To);
                    },
                    i(e) {
                        c || (ie(_, e), ie(s.$$.fragment, e), ie(k, e), (c = !0));
                    },
                    o(e) {
                        se(_, e), se(s.$$.fragment, e), se(k, e), (c = !1);
                    },
                    d(e) {
                        e && v(o), _ && _.d(e), _e(s), k && k.d(e), (l = !1), u();
                    },
                };
            }
            function Do(e, o, t) {
                let { $$slots: n = {}, $$scope: i } = o,
                    { isActive: s = !1 } = o,
                    { onClick: a = () => {} } = o;
                return (
                    (e.$$set = (e) => {
                        "isActive" in e && t(0, (s = e.isActive)), "onClick" in e && t(1, (a = e.onClick)), "$$scope" in e && t(2, (i = e.$$scope));
                    }),
                    [s, a, i, n]
                );
            }
            var Ao = class extends me {
                constructor(e) {
                    super(), de(this, e, Do, Xo, l, { isActive: 0, onClick: 1 });
                }
            };
            function Io(e) {
                let o, t;
                const n = e[1].default,
                    i = d(n, e, e[0], null);
                return {
                    c() {
                        (o = z("div")), i && i.c(), j(o, "class", "gdpr-settings-content svelte-1t6ostr");
                    },
                    m(e, n) {
                        y(e, o, n), i && i.m(o, null), (t = !0);
                    },
                    p(e, [o]) {
                        i && i.p && 1 & o && g(i, n, e, e[0], o, null, null);
                    },
                    i(e) {
                        t || (ie(i, e), (t = !0));
                    },
                    o(e) {
                        se(i, e), (t = !1);
                    },
                    d(e) {
                        e && v(o), i && i.d(e);
                    },
                };
            }
            function Lo(e, o, t) {
                let { $$slots: n = {}, $$scope: i } = o;
                return (
                    (e.$$set = (e) => {
                        "$$scope" in e && t(0, (i = e.$$scope));
                    }),
                    [i, n]
                );
            }
            var No = class extends me {
                constructor(e) {
                    super(), de(this, e, Lo, Io, l, {});
                }
            };
            function qo(e, o, t) {
                const n = e.slice();
                return (n[2] = o[t]), n;
            }
            function Eo(e) {
                let o,
                    t = e[2] + "";
                return {
                    c() {
                        o = x(t);
                    },
                    m(e, t) {
                        y(e, o, t);
                    },
                    p: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function Oo(e) {
                let o, t, i;
                return {
                    c() {
                        (o = z("a")),
                            (t = z("bdi")),
                            (t.textContent = `${e[0].optOutConsentLinkName}`),
                            j(o, "href", (i = ho.a.GROUP_CONSENT_URL)),
                            j(o, "class", "gdpr-privacy-content__opt-out-consent-link svelte-8mftih"),
                            j(o, "target", "_blank");
                    },
                    m(e, n) {
                        y(e, o, n), b(o, t);
                    },
                    p: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function Bo(e) {
                let o;
                let t = (function (e, o) {
                    return "xsollaGroupConsentLink" === e[2] ? Oo : Eo;
                })(e)(e);
                return {
                    c() {
                        t.c(), (o = P());
                    },
                    m(e, n) {
                        t.m(e, n), y(e, o, n);
                    },
                    p(e, o) {
                        t.p(e, o);
                    },
                    d(e) {
                        t.d(e), e && v(o);
                    },
                };
            }
            function Ro(e) {
                let o,
                    t,
                    i,
                    s,
                    a,
                    c,
                    r = e[0].optOutConsent,
                    l = [];
                for (let o = 0; o < r.length; o += 1) l[o] = Bo(qo(e, r, o));
                return {
                    c() {
                        (o = z("div")), (t = z("div")), (t.textContent = `${e[0].optOutTitle}`), (i = C()), (s = z("div")), (s.textContent = `${e[0].optOutDescription}`), (a = C()), (c = z("div"));
                        for (let e = 0; e < l.length; e += 1) l[e].c();
                        j(t, "class", "gdpr-privacy-content__opt-out-title svelte-8mftih"),
                            j(s, "class", "gdpr-privacy-content__opt-out-description svelte-8mftih"),
                            j(c, "class", "gdpr-privacy-content__opt-out-consent svelte-8mftih"),
                            j(o, "class", "gdpr-privacy-content__opt-out svelte-8mftih");
                    },
                    m(e, n) {
                        y(e, o, n), b(o, t), b(o, i), b(o, s), b(o, a), b(o, c);
                        for (let e = 0; e < l.length; e += 1) l[e].m(c, null);
                    },
                    p(e, [o]) {
                        if (1 & o) {
                            let t;
                            for (r = e[0].optOutConsent, t = 0; t < r.length; t += 1) {
                                const n = qo(e, r, t);
                                l[t] ? l[t].p(n, o) : ((l[t] = Bo(n)), l[t].c(), l[t].m(c, null));
                            }
                            for (; t < l.length; t += 1) l[t].d(1);
                            l.length = r.length;
                        }
                    },
                    i: n,
                    o: n,
                    d(e) {
                        e && v(o), w(l, e);
                    },
                };
            }
            function Uo(e) {
                const o = B(he.messages);
                o.dataProcessingConsentCustomerCheckboxTooltip, o.dataProcessingConsentPartnerCheckboxTooltip;
                return [o];
            }
            var Fo = class extends me {
                constructor(e) {
                    super(), de(this, e, Uo, Ro, l, {});
                }
            };
            function Mo(e, o, t) {
                const n = e.slice();
                return (n[24] = o[t].id), (n[25] = o[t].cookieId), (n[26] = o[t].checkboxText), (n[27] = o[t].content), (n[28] = o), (n[29] = t), n;
            }
            function Go(e) {
                let o, t, n;
                function i(o) {
                    e[14].call(null, o, e[25]);
                }
                let s = { id: e[24], disabled: e[7], $$slots: { default: [Vo] }, $$scope: { ctx: e } };
                return (
                    void 0 !== e[2][e[25]] && (s.value = e[2][e[25]]),
                    (o = new Oe({ props: s })),
                    U.push(() => le(o, "value", i)),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, t) {
                            pe(o, e, t), (n = !0);
                        },
                        p(n, i) {
                            e = n;
                            const s = {};
                            128 & i && (s.disabled = e[7]), 1073741824 & i && (s.$$scope = { dirty: i, ctx: e }), !t && 5 & i && ((t = !0), (s.value = e[2][e[25]]), H(() => (t = !1))), o.$set(s);
                        },
                        i(e) {
                            n || (ie(o.$$.fragment, e), (n = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (n = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function Wo(e) {
                let o, t;
                return (
                    (o = new eo({ props: { id: e[24] } })),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, n) {
                            pe(o, e, n), (t = !0);
                        },
                        p: n,
                        i(e) {
                            t || (ie(o.$$.fragment, e), (t = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (t = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function Jo(e) {
                let o, t, n;
                function i(o) {
                    e[13].call(null, o);
                }
                let s = { id: e[24], $$slots: { default: [Ho] }, $$scope: { ctx: e } };
                return (
                    void 0 !== e[3].consent_state && (s.value = e[3].consent_state),
                    (o = new Oe({ props: s })),
                    U.push(() => le(o, "value", i)),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, t) {
                            pe(o, e, t), (n = !0);
                        },
                        p(e, n) {
                            const i = {};
                            1073741824 & n && (i.$$scope = { dirty: n, ctx: e }), !t && 8 & n && ((t = !0), (i.value = e[3].consent_state), H(() => (t = !1))), o.$set(i);
                        },
                        i(e) {
                            n || (ie(o.$$.fragment, e), (n = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (n = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function Vo(e) {
                let o,
                    t = e[26] + "";
                return {
                    c() {
                        o = x(t);
                    },
                    m(e, t) {
                        y(e, o, t);
                    },
                    p: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function Ho(e) {
                let o,
                    t = e[26] + "";
                return {
                    c() {
                        o = x(t);
                    },
                    m(e, t) {
                        y(e, o, t);
                    },
                    p: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function Ko(e) {
                let o, t, n, i;
                const s = [Jo, Wo, Go],
                    a = [];
                return (
                    (o = (function (e, o) {
                        return "data-processing-consent" === e[24] ? 0 : "essential-consent" === e[24] ? 1 : 2;
                    })(e)),
                    (t = a[o] = s[o](e)),
                    {
                        c() {
                            t.c(), (n = P());
                        },
                        m(e, t) {
                            a[o].m(e, t), y(e, n, t), (i = !0);
                        },
                        p(e, o) {
                            t.p(e, o);
                        },
                        i(e) {
                            i || (ie(t), (i = !0));
                        },
                        o(e) {
                            se(t), (i = !1);
                        },
                        d(e) {
                            a[o].d(e), e && v(n);
                        },
                    }
                );
            }
            function Zo(e) {
                let o, t, n, i;
                return (
                    (t = new No({ props: { $$slots: { default: [et] }, $$scope: { ctx: e } } })),
                    {
                        c() {
                            (o = z("div")), ue(t.$$.fragment), (n = C()), j(o, "class", "gdpr-settings-screen__mobile-content svelte-1d3t6w6");
                        },
                        m(e, s) {
                            y(e, o, s), pe(t, o, null), b(o, n), (i = !0);
                        },
                        p(e, o) {
                            const n = {};
                            1073741840 & o && (n.$$scope = { dirty: o, ctx: e }), t.$set(n);
                        },
                        i(e) {
                            i || (ie(t.$$.fragment, e), (i = !0));
                        },
                        o(e) {
                            se(t.$$.fragment, e), (i = !1);
                        },
                        d(e) {
                            e && v(o), _e(t);
                        },
                    }
                );
            }
            function Yo(e) {
                let o,
                    t,
                    i,
                    s = e[27].linkText + "";
                return {
                    c() {
                        (o = z("a")), (t = x(s)), j(o, "href", (i = ho.a.COOKIE_TYPES_URL)), j(o, "target", "_blank"), j(o, "class", "gdpr-settings-screen__cookies-list-link svelte-1d3t6w6");
                    },
                    m(e, n) {
                        y(e, o, n), b(o, t);
                    },
                    p: n,
                    i: n,
                    o: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function Qo(e) {
                let o, t;
                return (
                    (o = new Fo({})),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, n) {
                            pe(o, e, n), (t = !0);
                        },
                        p: n,
                        i(e) {
                            t || (ie(o.$$.fragment, e), (t = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (t = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function et(e) {
                let o,
                    t,
                    n,
                    i,
                    s,
                    a,
                    c = e[27].description + "";
                const r = [Qo, Yo],
                    l = [];
                function u(e, o) {
                    return "data-processing-consent" === e[4] ? 0 : 1;
                }
                return (
                    (n = u(e)),
                    (i = l[n] = r[n](e)),
                    {
                        c() {
                            (t = C()), i.c(), (s = P()), (o = new L(t));
                        },
                        m(e, i) {
                            o.m(c, e, i), y(e, t, i), l[n].m(e, i), y(e, s, i), (a = !0);
                        },
                        p(e, o) {
                            let t = n;
                            (n = u(e)),
                                n === t
                                    ? l[n].p(e, o)
                                    : (te(),
                                      se(l[t], 1, 1, () => {
                                          l[t] = null;
                                      }),
                                      ne(),
                                      (i = l[n]),
                                      i ? i.p(e, o) : ((i = l[n] = r[n](e)), i.c()),
                                      ie(i, 1),
                                      i.m(s.parentNode, s));
                        },
                        i(e) {
                            a || (ie(i), (a = !0));
                        },
                        o(e) {
                            se(i), (a = !1);
                        },
                        d(e) {
                            e && o.d(), e && v(t), l[n].d(e), e && v(s);
                        },
                    }
                );
            }
            function ot(e) {
                let o, t, n, i;
                o = new Ao({
                    props: {
                        onClick: function () {
                            return e[15](e[24]);
                        },
                        isActive: e[4] === e[24],
                        $$slots: { default: [Ko] },
                        $$scope: { ctx: e },
                    },
                });
                let s = e[4] === e[24] && Zo(e);
                return {
                    c() {
                        ue(o.$$.fragment), (t = C()), s && s.c(), (n = P());
                    },
                    m(e, a) {
                        pe(o, e, a), y(e, t, a), s && s.m(e, a), y(e, n, a), (i = !0);
                    },
                    p(t, i) {
                        e = t;
                        const a = {};
                        16 & i && (a.isActive = e[4] === e[24]),
                            1073741964 & i && (a.$$scope = { dirty: i, ctx: e }),
                            o.$set(a),
                            e[4] === e[24]
                                ? s
                                    ? (s.p(e, i), 16 & i && ie(s, 1))
                                    : ((s = Zo(e)), s.c(), ie(s, 1), s.m(n.parentNode, n))
                                : s &&
                                  (te(),
                                  se(s, 1, 1, () => {
                                      s = null;
                                  }),
                                  ne());
                    },
                    i(e) {
                        i || (ie(o.$$.fragment, e), ie(s), (i = !0));
                    },
                    o(e) {
                        se(o.$$.fragment, e), se(s), (i = !1);
                    },
                    d(e) {
                        _e(o, e), e && v(t), s && s.d(e), e && v(n);
                    },
                };
            }
            function tt(e) {
                let o,
                    t,
                    n = e[0],
                    i = [];
                for (let o = 0; o < n.length; o += 1) i[o] = ot(Mo(e, n, o));
                const s = (e) =>
                    se(i[e], 1, 1, () => {
                        i[e] = null;
                    });
                return {
                    c() {
                        for (let e = 0; e < i.length; e += 1) i[e].c();
                        o = P();
                    },
                    m(e, n) {
                        for (let o = 0; o < i.length; o += 1) i[o].m(e, n);
                        y(e, o, n), (t = !0);
                    },
                    p(e, t) {
                        if (159 & t) {
                            let a;
                            for (n = e[0], a = 0; a < n.length; a += 1) {
                                const s = Mo(e, n, a);
                                i[a] ? (i[a].p(s, t), ie(i[a], 1)) : ((i[a] = ot(s)), i[a].c(), ie(i[a], 1), i[a].m(o.parentNode, o));
                            }
                            for (te(), a = n.length; a < i.length; a += 1) s(a);
                            ne();
                        }
                    },
                    i(e) {
                        if (!t) {
                            for (let e = 0; e < n.length; e += 1) ie(i[e]);
                            t = !0;
                        }
                    },
                    o(e) {
                        i = i.filter(Boolean);
                        for (let e = 0; e < i.length; e += 1) se(i[e]);
                        t = !1;
                    },
                    d(e) {
                        w(i, e), e && v(o);
                    },
                };
            }
            function nt(e) {
                let o,
                    t,
                    i,
                    s = e[6].content.linkText + "";
                return {
                    c() {
                        (o = z("a")), (t = x(s)), j(o, "href", (i = ho.a.COOKIE_TYPES_URL)), j(o, "target", "_blank"), j(o, "class", "gdpr-settings-screen__cookies-list-link svelte-1d3t6w6");
                    },
                    m(e, n) {
                        y(e, o, n), b(o, t);
                    },
                    p(e, o) {
                        64 & o && s !== (s = e[6].content.linkText + "") && D(t, s);
                    },
                    i: n,
                    o: n,
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function it(e) {
                let o, t;
                return (
                    (o = new Fo({})),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, n) {
                            pe(o, e, n), (t = !0);
                        },
                        p: n,
                        i(e) {
                            t || (ie(o.$$.fragment, e), (t = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (t = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function st(e) {
                let o,
                    t,
                    n,
                    i,
                    s,
                    a,
                    c = e[6].content.description + "";
                const r = [it, nt],
                    l = [];
                function u(e, o) {
                    return "data-processing-consent" === e[6].id ? 0 : 1;
                }
                return (
                    (n = u(e)),
                    (i = l[n] = r[n](e)),
                    {
                        c() {
                            (t = C()), i.c(), (s = P()), (o = new L(t));
                        },
                        m(e, i) {
                            o.m(c, e, i), y(e, t, i), l[n].m(e, i), y(e, s, i), (a = !0);
                        },
                        p(e, t) {
                            (!a || 64 & t) && c !== (c = e[6].content.description + "") && o.p(c);
                            let p = n;
                            (n = u(e)),
                                n === p
                                    ? l[n].p(e, t)
                                    : (te(),
                                      se(l[p], 1, 1, () => {
                                          l[p] = null;
                                      }),
                                      ne(),
                                      (i = l[n]),
                                      i ? i.p(e, t) : ((i = l[n] = r[n](e)), i.c()),
                                      ie(i, 1),
                                      i.m(s.parentNode, s));
                        },
                        i(e) {
                            a || (ie(i), (a = !0));
                        },
                        o(e) {
                            se(i), (a = !1);
                        },
                        d(e) {
                            e && o.d(), e && v(t), l[n].d(e), e && v(s);
                        },
                    }
                );
            }
            function at(e) {
                let o;
                return {
                    c() {
                        o = x(e[9]);
                    },
                    m(e, t) {
                        y(e, o, t);
                    },
                    p(e, t) {
                        512 & t && D(o, e[9]);
                    },
                    d(e) {
                        e && v(o);
                    },
                };
            }
            function ct(e) {
                let o, t;
                return (
                    (o = new Ne({ props: { id: "submit-button", isLoading: e[10], loadingText: e[11].savingButton, onClick: e[8], $$slots: { default: [at] }, $$scope: { ctx: e } } })),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, n) {
                            pe(o, e, n), (t = !0);
                        },
                        p(e, t) {
                            const n = {};
                            1024 & t && (n.isLoading = e[10]), 256 & t && (n.onClick = e[8]), 1073742336 & t && (n.$$scope = { dirty: t, ctx: e }), o.$set(n);
                        },
                        i(e) {
                            t || (ie(o.$$.fragment, e), (t = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (t = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function rt(e) {
                let o, t, n, i, s;
                return (
                    (t = new No({ props: { $$slots: { default: [st] }, $$scope: { ctx: e } } })),
                    (i = new wo({ props: { showReturnButton: e[5], $$slots: { default: [ct] }, $$scope: { ctx: e } } })),
                    {
                        c() {
                            (o = z("div")), ue(t.$$.fragment), (n = C()), ue(i.$$.fragment), j(o, "class", "gdpr-settings-screen__desktop-content svelte-1d3t6w6");
                        },
                        m(e, a) {
                            y(e, o, a), pe(t, o, null), y(e, n, a), pe(i, e, a), (s = !0);
                        },
                        p(e, o) {
                            const n = {};
                            1073741888 & o && (n.$$scope = { dirty: o, ctx: e }), t.$set(n);
                            const s = {};
                            32 & o && (s.showReturnButton = e[5]), 1073743616 & o && (s.$$scope = { dirty: o, ctx: e }), i.$set(s);
                        },
                        i(e) {
                            s || (ie(t.$$.fragment, e), ie(i.$$.fragment, e), (s = !0));
                        },
                        o(e) {
                            se(t.$$.fragment, e), se(i.$$.fragment, e), (s = !1);
                        },
                        d(e) {
                            e && v(o), _e(t), e && v(n), _e(i, e);
                        },
                    }
                );
            }
            function lt(e) {
                let o, t, n, i, s, a, c;
                return (
                    (i = new So({ props: { $$slots: { default: [tt] }, $$scope: { ctx: e } } })),
                    (a = new xo({ props: { $$slots: { default: [rt] }, $$scope: { ctx: e } } })),
                    {
                        c() {
                            (o = z("div")),
                                (t = z("h4")),
                                (t.textContent = `${e[11].settingsTitle}`),
                                (n = C()),
                                ue(i.$$.fragment),
                                (s = C()),
                                ue(a.$$.fragment),
                                j(t, "class", "gdpr-settings-screen__title svelte-1d3t6w6"),
                                j(o, "class", "gdpr-settings-screen svelte-1d3t6w6");
                        },
                        m(e, r) {
                            y(e, o, r), b(o, t), b(o, n), pe(i, o, null), b(o, s), pe(a, o, null), (c = !0);
                        },
                        p(e, o) {
                            const t = {};
                            1073741980 & o && (t.$$scope = { dirty: o, ctx: e }), i.$set(t);
                            const n = {};
                            1073743712 & o && (n.$$scope = { dirty: o, ctx: e }), a.$set(n);
                        },
                        i(e) {
                            c || (ie(i.$$.fragment, e), ie(a.$$.fragment, e), (c = !0));
                        },
                        o(e) {
                            se(i.$$.fragment, e), se(a.$$.fragment, e), (c = !1);
                        },
                        d(e) {
                            e && v(o), _e(i), _e(a);
                        },
                    }
                );
            }
            function ut(e) {
                let o, t;
                return (
                    (o = new Fe({ props: { showCloseButton: !1, $$slots: { default: [lt] }, $$scope: { ctx: e } } })),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, n) {
                            pe(o, e, n), (t = !0);
                        },
                        p(e, [t]) {
                            const n = {};
                            1073743868 & t && (n.$$scope = { dirty: t, ctx: e }), o.$set(n);
                        },
                        i(e) {
                            t || (ie(o.$$.fragment, e), (t = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (t = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function pt(e, o, t) {
                let n;
                const i = fe.a.getInstance(),
                    { cookie: s, gdpr: a } = i.consent,
                    c = B(he.messages),
                    r = B(he.saveAndClose),
                    l = B(he.useDataProcessing),
                    u = B(he.isSending);
                _(e, u, (e) => t(10, (n = e)));
                let p,
                    d,
                    m,
                    k,
                    g,
                    h = l ? "data-processing-consent" : "essential-consent";
                const f = [],
                    b = { id: "data-processing-consent", checkboxText: c.dataProcessingConsentCheckbox, content: { description: c.dataProcessingConsentDescription } },
                    y = [
                        { id: "essential-consent", cookieId: "", checkboxText: c.essentialCookiesCheckbox, content: { linkText: c.essentialCookiesListLinkName, description: c.essentialCookiesDescription } },
                        {
                            id: "analytical-consent",
                            cookieId: "analytics_consent_state",
                            checkboxText: c.analyticalPerformanceCookiesCheckbox,
                            content: { linkText: c.analyticalPerformanceCookiesLinkName, description: c.analyticalPerformanceCookiesDescription },
                        },
                        { id: "functional-consent", cookieId: "functional_consent_state", checkboxText: c.functionalCookiesCheckbox, content: { linkText: c.functionalCookiesLinkName, description: c.functionalCookiesDescription } },
                        { id: "targeting-consent", cookieId: "targeting_consent_state", checkboxText: c.targetingCookiesCheckbox, content: { linkText: c.targetingCookiesLinkName, description: c.targetingCookiesDescription } },
                    ];
                function v(e) {
                    Object.keys(s).forEach((o) => t(2, (s[o] = e), s));
                }
                function w(e) {
                    e.preventDefault(), r();
                }
                function z(e) {
                    v(!0), l && t(3, (a.consent_state = !0), a), w(e);
                }
                function $(e) {
                    t(4, (h = e));
                }
                l && f.push(b), f.push(...y);
                return (
                    (e.$$.update = () => {
                        16 & e.$$.dirty && t(6, (p = f.find(({ id: e }) => e === h))),
                            12 & e.$$.dirty && t(5, (d = Object.keys(s).every((e) => null === s[e]) && (null === a.consent_state || !l))),
                            8 & e.$$.dirty && l && !a.consent_state && v(null),
                            8 & e.$$.dirty && t(7, (m = l && !a.consent_state)),
                            32 & e.$$.dirty && t(8, (k = d ? z : w)),
                            32 & e.$$.dirty && t(9, (g = d ? c.acceptAllButton : c.saveAndCloseButton));
                    }),
                    [
                        f,
                        $,
                        s,
                        a,
                        h,
                        d,
                        p,
                        m,
                        k,
                        g,
                        n,
                        c,
                        u,
                        function (e) {
                            (a.consent_state = e), t(3, a);
                        },
                        function (e, o) {
                            (s[o] = e), t(2, s);
                        },
                        (e) => $(e),
                    ]
                );
            }
            var _t = class extends me {
                constructor(e) {
                    super(), de(this, e, pt, ut, l, { tabs: 0, onTabCheckout: 1 });
                }
                get tabs() {
                    return this.$$.ctx[0];
                }
                get onTabCheckout() {
                    return this.$$.ctx[1];
                }
            };
            function dt(e) {
                let o,
                    t,
                    n,
                    i = "welcome" === e[5] && mt(e),
                    s = "settings" === e[5] && kt(e);
                return {
                    c() {
                        (o = z("section")),
                            i && i.c(),
                            (t = C()),
                            s && s.c(),
                            j(o, "class", "gdpr-app svelte-1gv6dsv"),
                            A(o, "--background-color", e[3]),
                            A(o, "--background-color-secondary", e[7]),
                            A(o, "--text-color", e[6]),
                            A(o, "--text-color-secondary", e[8]),
                            A(o, "--accent-color", e[0]),
                            A(o, "--contrast-accent-color", e[2]),
                            A(o, "--tooltip-background-color", e[9]),
                            A(o, "--tooltip-text-color", e[10]),
                            A(o, "--rounding", e[1]);
                    },
                    m(e, a) {
                        y(e, o, a), i && i.m(o, null), b(o, t), s && s.m(o, null), (n = !0);
                    },
                    p(e, a) {
                        "welcome" === e[5]
                            ? i
                                ? 32 & a && ie(i, 1)
                                : ((i = mt(e)), i.c(), ie(i, 1), i.m(o, t))
                            : i &&
                              (te(),
                              se(i, 1, 1, () => {
                                  i = null;
                              }),
                              ne()),
                            "settings" === e[5]
                                ? s
                                    ? 32 & a && ie(s, 1)
                                    : ((s = kt(e)), s.c(), ie(s, 1), s.m(o, null))
                                : s &&
                                  (te(),
                                  se(s, 1, 1, () => {
                                      s = null;
                                  }),
                                  ne()),
                            (!n || 8 & a) && A(o, "--background-color", e[3]),
                            (!n || 1 & a) && A(o, "--accent-color", e[0]),
                            (!n || 4 & a) && A(o, "--contrast-accent-color", e[2]),
                            (!n || 2 & a) && A(o, "--rounding", e[1]);
                    },
                    i(e) {
                        n || (ie(i), ie(s), (n = !0));
                    },
                    o(e) {
                        se(i), se(s), (n = !1);
                    },
                    d(e) {
                        e && v(o), i && i.d(), s && s.d();
                    },
                };
            }
            function mt(e) {
                let o, t;
                return (
                    (o = new go({})),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, n) {
                            pe(o, e, n), (t = !0);
                        },
                        i(e) {
                            t || (ie(o.$$.fragment, e), (t = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (t = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function kt(e) {
                let o, t;
                return (
                    (o = new _t({})),
                    {
                        c() {
                            ue(o.$$.fragment);
                        },
                        m(e, n) {
                            pe(o, e, n), (t = !0);
                        },
                        i(e) {
                            t || (ie(o.$$.fragment, e), (t = !0));
                        },
                        o(e) {
                            se(o.$$.fragment, e), (t = !1);
                        },
                        d(e) {
                            _e(o, e);
                        },
                    }
                );
            }
            function gt(e) {
                let o,
                    t,
                    n = e[4] && dt(e);
                return {
                    c() {
                        n && n.c(), (o = P());
                    },
                    m(e, i) {
                        n && n.m(e, i), y(e, o, i), (t = !0);
                    },
                    p(e, [t]) {
                        e[4]
                            ? n
                                ? (n.p(e, t), 16 & t && ie(n, 1))
                                : ((n = dt(e)), n.c(), ie(n, 1), n.m(o.parentNode, o))
                            : n &&
                              (te(),
                              se(n, 1, 1, () => {
                                  n = null;
                              }),
                              ne());
                    },
                    i(e) {
                        t || (ie(n), (t = !0));
                    },
                    o(e) {
                        se(n), (t = !1);
                    },
                    d(e) {
                        n && n.d(e), e && v(o);
                    },
                };
            }
            function ht(e, o, t) {
                let n,
                    { initialTextColor: i = "#FFFFFF" } = o,
                    { accentColor: s = "#EE6C4D" } = o;
                const a = we.parse(s),
                    c = we.parse(i),
                    r = c.toRgba();
                let { rounding: l = "3px" } = o,
                    { messages: u } = o,
                    { dataProcessingUserType: p = "customer" } = o,
                    { contrastAccentColor: d = a.getContrastColor().toRgba() } = o;
                const m = c.getContrastColor().mix(a.alpha(0.25));
                let { backgroundColor: k = m.toRgba() } = o;
                const g = m.getContrastColor();
                let h = m.mix(c.alpha(0.05)).toRgba(),
                    f = c.alpha(0.5).toRgba(),
                    b = m.mix(g.alpha(0.25)).toRgba(),
                    y = we.parse(b).getContrastColor().toRgba(),
                    { useDataProcessing: v = !0 } = o;
                const w = fe.a.getInstance(),
                    { cookie: z, gdpr: $ } = w.consent,
                    x = Object.keys(z).every((e) => null === z[e]) && null === $.consent_state;
                let C = Object.keys(z).some((e) => null === z[e]) || (v && null === $.consent_state),
                    P = x ? "welcome" : "settings",
                    S = ge(!1);
                function j() {
                    t(5, (P = "settings"));
                }
                function T() {
                    t(4, (C = !1)), j();
                }
                return (
                    _(e, S, (e) => t(18, (n = e))),
                    O(he.messages, u),
                    O(he.closeBanner, T),
                    O(he.showWelcomeScreen, function () {
                        t(5, (P = "welcome"));
                    }),
                    O(he.showSettingsScreen, j),
                    O(he.useDataProcessing, v),
                    O(he.dataProcessingUserType, p),
                    O(he.saveAndClose, function () {
                        if (n) return;
                        S.set(!0);
                        const e = fe.a.getInstance(),
                            { cookie: o, gdpr: t } = e.consent;
                        e.initConsent(),
                            e.sync(t.consent_state, o, () => {
                                S.set(!1), T();
                            });
                    }),
                    O(he.canDeclineAll, x),
                    O(he.isSending, S),
                    (e.$$set = (e) => {
                        "initialTextColor" in e && t(12, (i = e.initialTextColor)),
                            "accentColor" in e && t(0, (s = e.accentColor)),
                            "rounding" in e && t(1, (l = e.rounding)),
                            "messages" in e && t(13, (u = e.messages)),
                            "dataProcessingUserType" in e && t(14, (p = e.dataProcessingUserType)),
                            "contrastAccentColor" in e && t(2, (d = e.contrastAccentColor)),
                            "backgroundColor" in e && t(3, (k = e.backgroundColor)),
                            "useDataProcessing" in e && t(15, (v = e.useDataProcessing));
                    }),
                    [
                        s,
                        l,
                        d,
                        k,
                        C,
                        P,
                        r,
                        h,
                        f,
                        b,
                        y,
                        S,
                        i,
                        u,
                        p,
                        v,
                        function () {
                            t(4, (C = !0));
                        },
                        T,
                    ]
                );
            }
            var ft = class extends me {
                    constructor(e) {
                        super(),
                            de(this, e, ht, gt, l, { initialTextColor: 12, accentColor: 0, rounding: 1, messages: 13, dataProcessingUserType: 14, contrastAccentColor: 2, backgroundColor: 3, useDataProcessing: 15, show: 16, close: 17 });
                    }
                    get show() {
                        return this.$$.ctx[16];
                    }
                    get close() {
                        return this.$$.ctx[17];
                    }
                },
                bt = t(7),
                yt = t(8);
            function vt(e, o = () => {}) {
                const t = fe.a.getInstance();
                e.state && Object.assign(t, e.state);
                const n = e.ui || {},
                    i = e.settings || {},
                    s = new bt.a(e.localization),
                    a = {
                        essentialCookiesCheckbox: "essential_cookies_checkbox",
                        essentialCookiesTooltip: "essential_cookies_tooltip",
                        analyticalPerformanceCookiesCheckbox: "analytical_performance_cookies_checkbox",
                        functionalCookiesCheckbox: "functional_cookies_checkbox",
                        targetingCookiesCheckbox: "targeting_cookies_checkbox",
                        settingsButton: "settings_button",
                        settingsTitle: "settings_title",
                        settingsFooterDescription: "settings_footer_description",
                        acceptAllButton: "accept_all_button",
                        returnButton: "return_button",
                        saveAndCloseButton: "save_and_close_button",
                        savingButton: "saving_button",
                        welcomeScreenTitle: "welcome_screen_title",
                        welcomeScreenDescription: "welcome_screen_description",
                        welcomeScreenMobileDescription: "welcome_screen_mobile_description",
                        welcomeScreenDataProcessing: "welcome_screen_data_processing",
                        welcomeScreenAllowCookies: "welcome_screen_allow_cookies",
                        dataProcessingConsentCheckbox: "data_processing_consent_checkbox",
                        essentialCookiesDescription: "essential_cookies_description",
                        essentialCookiesListLinkName: "essential_cookies_list_link_name",
                        analyticalPerformanceCookiesDescription: "analytical_performance_cookies_description",
                        analyticalPerformanceCookiesLinkName: "analytical_performance_cookies_link_name",
                        functionalCookiesDescription: "functional_cookies_description",
                        functionalCookiesLinkName: "functional_cookies_link_name",
                        targetingCookiesDescription: "targeting_cookies_description",
                        targetingCookiesLinkName: "targeting_cookies_link_name",
                        dataProcessingConsentDescription: "data_processing_consent_description",
                        dataProcessingConsentMyPersonalData: "data_processing_consent_my_personal_data",
                        dataProcessingConsentCustomerCheckboxTooltip: "data_processing_consent_customer_checkbox_tooltip",
                        dataProcessingConsentPartnerCheckboxTooltip: "data_processing_consent_partner_checkbox_tooltip",
                        optOutTitle: "opt_out_title",
                        optOutDescription: "opt_out_description",
                        optOutConsent: "opt_out_consent",
                        optOutConsentLinkName: "opt_out_consent_link_name",
                        cookiePolicyLinkName: "cookie_policy_link_name",
                        privacyPolicyLinkName: "privacy_policy_link_name",
                    };
                t.sync(null, null, (e) => {
                    if (e) return void o(e);
                    const t = new ft({
                        target: n.target || document.getElementById("gdpr-consent-form"),
                        props: Object.assign(Object.assign(Object.assign({}, n), i), { messages: Object.keys(a).reduce((e, o) => ((e[o] = s.translate(a[o])), e), {}) }),
                    });
                    o(null, t);
                });
            }
        },
    ]);
});
