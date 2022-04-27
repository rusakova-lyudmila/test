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
                    return { gdpr: { consent_state: null }, cookie: { analytics_consent_state: true, functional_consent_state: true, targeting_consent_state: null } };
                }
                initConsent() {
                    (this.consent.gdpr.consent_state = this.consent.gdpr.consent_state || !1),
                        Object.keys(this.consent.cookie).forEach((e) => {
                            console.log(e);
                            console.log(this.consent.cookie[e]);
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
                '[{"name":"corpsite_visit","type":"analytical"},{"name":"ajs_anonymous_id","type":"analytical"},{"name":"pa_visit","type":"analytical"},{"name":"first_visit","type":"analytical"},{"name":"intercom-session-mdu5r5f6","type":"analytical"},{"name":"_gid","type":"analytical"},{"name":"_gcl_au","type":"analytical"},{"name":"_ga","type":"analytical"},{"reg":"_gat_.*","type":"analytical"},{"name":"__insp_wid","type":"analytical"},{"name":"__insp_targlpu","type":"analytical"},{"name":"__insp_targlpt","type":"analytical"},{"name":"__insp_slim","type":"analytical"},{"name":"__insp_nv","type":"analytical"},{"name":"__insp_norec_sess","type":"analytical"},{"name":"__insp_identity","type":"analytical"},{"reg":"_dc_gtm_.*","type":"analytical"},{"name":"wcs_bt","type":"analytical"},{"name":"_ym_uid","type":"analytical"},{"name":"yandexuid","type":"analytical"},{"name":"_ym_d","type":"analytical"},{"name":"i","type":"analytical"},{"name":"yabs-sid","type":"analytical"},{"name":"_gat","type":"analytical"},{"name":"utm_medium","type":"analytical"},{"name":"utm_source","type":"analytical"},{"name":"utm_term","type":"analytical"},{"name":"utm_content","type":"analytical"},{"name":"HSID","type":"analytical"},{"name":"SAPISID","type":"analytical"},{"name":"BizoID","type":"analytical"},{"name":"UserMatchHistory","type":"analytical"},{"name":"__cfduid","type":"analytical"},{"name":"__insp_norec_howoften","type":"analytical"},{"name":"APISID","type":"analytical"},{"name":"SIDCC","type":"analytical"},{"name":"_ym_isad","type":"analytical"},{"name":"NID","type":"functional"},{"name":"ATN","type":"functional"},{"name":"AA003","type":"functional"},{"name":"GPS","type":"functional"},{"name":"LOGIN_INFO","type":"functional"},{"reg":"_ym_visorc_*","type":"functional"},{"name":"JSESSIONID","type":"functional"},{"name":"SSID","type":"functional"},{"name":"VISITOR_INFO1_LIVE","type":"functional"},{"name":"YSC","type":"functional"},{"name":"PREF","type":"functional"},{"name":"lang","type":"functional"},{"name":"locale","type":"functional"},{"name":"hideCookieNotify","type":"functional"},{"name":"hideSupportMessage","type":"functional"},{"name":"userType","type":"functional"},{"name":"hideUserTypeOption","type":"functional"},{"name":"hideUserTypeNotify","type":"functional"},{"name":"hideGamerSupportMessage","type":"functional"},{"name":"fontsPrimaryLoaded","type":"functional"},{"name":"fontsSecondaryLoaded","type":"functional"},{"name":"fontsCyrillicLoaded","type":"functional"},{"name":"fontsKoreanLoaded","type":"functional"},{"name":"ajs_group_id","type":"targeting"},{"name":"_derived_epik","type":"targeting"},{"name":"__hssc","type":"targeting"},{"name":"__hssrc","type":"targeting"},{"name":"__hstc","type":"targeting"}]'
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
                '{"accept_all_button":"قبول الكل","analytical_performance_cookies_checkbox":"ملفات تعريف الارتباط الخاصة بالتحليل والأداء","analytical_performance_cookies_description":"تجمع ملفات تعريف الارتباط هذه معلومات حول استخدامك لهذا الموقع وتمكننا من تحسين طريقة عمله، بالإضافة إلى تعزيز تجربتك مع منتجات إيكسولا الأخرى. على سبيل المثال، يمكننا ضمان العثور بسهولة على ما تبحث عنه أو تسجيل أي صعوبات قد تواجهها. <br/>إذا كنت لا تقبل ملفات تعريف الارتباط هذه، فلن نعرف متى قمت بزيارة موقعنا ولن نتمكن من مراقبة أدائه.","analytical_performance_cookies_link_name":"قائمة ملفات تعريف الارتباط الخاصة بالتحليل والأداء","cookie_policy_link_name":"سياسة ملفات تعريف الارتباط","data_processing_consent_checkbox":"الموافقة على معالجة البيانات","data_processing_consent_customer_checkbox_tooltip":"هذا الموقع يعمل على منتجات إيكسولا. يدير إيكسولا بياناتك الشخصية، مثل الاسم الكامل أو الاسم المستعار وعنوان البريد الإلكتروني وعنوان IP ومعلومات الموقع الجغرافي ومعرف المستخدم الفريد.","data_processing_consent_description":"نحتاج إلى موافقتك على استخدام بياناتك الشخصية ومعلومات من ملفات تعريف الارتباط لتقديم خدمات مخصصة لك. إذا قررت إلغاء الاشتراك في معالجة البيانات، فسنستخدم فقط البيانات من ملفات تعريف الارتباط الأساسية ولن تتمكن من الاستمتاع بخدماتنا بالكامل.","data_processing_consent_my_personal_data":"البيانات الشخصية","data_processing_consent_partner_checkbox_tooltip":"هذا الموقع يعمل على منتجات إيكسولا. تدير إيكسولا بياناتك الشخصية، مثل الهوية أو تفاصيل الاتصال أو العمل التي تقدمها في حساب الناشر.","essential_cookies_checkbox":"ملفات تعريف الارتباط الأساسية","essential_cookies_description":"تعد ملفات تعريف الارتباط هذه ضرورية لموقعنا الإلكتروني ومنتجات إيكسولا حتى تعمل ولا يمكن إيقاف تشغيلها. على سبيل المثال، تتضمن ملفات تعريف الارتباط التي تمكّنك من تسجيل الدخول إلى حسابك الشخصي وملفات تعريف الارتباط التي توفر تدفق معالجة الدفع الصحيح ودعم العملاء. <br/>يمكنك ضبط المستعرض الخاص بك على حظر ملفات تعريف الارتباط هذه أو تنبيهك بشأنها، ولكن بعد ذلك قد لا تعمل بعض أجزاء هذا الموقع كما هو متوقع.","essential_cookies_list_link_name":"قائمة ملفات تعريف الارتباط الأساسية","essential_cookies_tooltip":"لا يمكن إيقاف تشغيل هذا النوع من ملفات تعريف الارتباط","functional_cookies_checkbox":"ملفات تعريف الارتباط الوظيفية","functional_cookies_description":"تسمح لنا ملفات تعريف الارتباط هذه بتذكر الاختيارات التي تقوم بها على موقعنا الإلكتروني أو في منتجات إيكسولا. يساعدنا هذا في توفير ميزات محسنة وشخصية. على سبيل المثال، يمكننا تخصيص صفحة معينة لك، أو تقديم خدمات أخرى بناءً على طلبك.<br/>إذا كنت لا تقبل ملفات تعريف الارتباط هذه، فقد لا تعمل بعض هذه الميزات أو كلها بشكل صحيح.","functional_cookies_link_name":"قائمة ملفات تعريف الارتباط الوظيفية","opt_out_consent":"أفهم أن إيكسولا قد تشارك بياناتي الشخصية ضمن نطاق{xsollaGroupConsentLink}.","opt_out_consent_link_name":"مجموعة إيكسولا","opt_out_description":"لديك الحق في تغيير الموافقة أو سحبها في أي وقت. لا يؤثر سحب الموافقة على قانونية المعالجة السابقة، لأنها تستند إلى موافقة مسبقة.","opt_out_title":"الانسحاب","privacy_policy_link_name":"سياسة الخصوصية","return_button":"عودة","save_and_close_button":"حفظ وإغلاق","saving_button":"جاري الحفظ...","settings_button":"الإعدادات","settings_footer_description":"* إذا تم تحديد خانة الاختيار، فقد قمت بالفعل بالاختيار في منتج إيكسولا آخر.","settings_title":"إعدادات الخصوصية","targeting_cookies_checkbox":"ملفات تعريف الارتباط الخاصة بالاستهداف","targeting_cookies_description":"تسجل ملفات تعريف الارتباط هذه الصفحات التي قمت بزيارتها على هذا الموقع أو في منتجات إيكسولا والروابط التي اتبعتها. نستخدم هذه المعلومات لجعل موقعنا الإلكتروني والإعلانات المعروضة عليه أكثر صلة باهتماماتك. يجوز لنا أيضًا مشاركة هذه المعلومات مع جهات خارجية لهذا الغرض. <br/>إذا كنت لا تقبل ملفات تعريف الارتباط هذه، فستظل ترى إعلانات، لكنها لن تكون مخصصة حسب اهتماماتك.","targeting_cookies_link_name":"قائمة ملفات تعريف الارتباط الخاصة بالاستهداف","welcome_screen_allow_cookies":"أوافق على استخدام ملفات تعريف الارتباط","welcome_screen_data_processing":"أمنح موافقتي على استخدام إيكسولا{myPersonalDataTooltip} لتقديم خدمات مخصصة لي","welcome_screen_description":"يمكنك تغيير موافقتك أو سحبها في أي وقت بالرجوع إلى إعدادات الخصوصية.","welcome_screen_mobile_description":"بالنقر على \\"{acceptAllButtonText}\\"، فإنك تمنحنا موافقتك على معالجة بياناتك الشخصية وتعيين جميع ملفات تعريف الارتباط، أو بدلاً من ذلك، يمكنك تخصيص تفضيلاتك في الإعدادات.","welcome_screen_title":"نحترم خصوصيتك"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Приеми всички","analytical_performance_cookies_checkbox":"Бисквитки за аналитика и производителност","analytical_performance_cookies_description":"Тези бисквитки събират информация относно използването на сайта от вас, и ни позволяват да подобрим работата му и потребителския ви опит с другите продукти на Ексола. Например, правим така, че да намирате лесно това, което търсите, и записваме всички проблеми, с които се сблъсквате.<br/> Ако не приемете тези бисквитки, няма да знаем, кога сте посещавали сайта ни и няма да можем да следим работата му.","analytical_performance_cookies_link_name":"Списък на бисквитки за аналитика и производителност","cookie_policy_link_name":"Политика за бисквитки","data_processing_consent_checkbox":"Съгласие за обработка на данни","data_processing_consent_customer_checkbox_tooltip":"Този сайт е на базата на продуктите на Ексола. Ексола обработва личните ви данни (пълно име или псевдоним, имейл адрес, IP адрес, геолокационни данни и уникален идентификатор на потребителя).","data_processing_consent_description":"Имаме нужда от съгласието ви да използваме личните ви данни и информация от бисквитките, за да ви предлагаме персонализирани услуги. Ако не искате да давате съгласието си за обработка на данни, ще използваме само данните от Основни бисквитки, и няма да можете да се насладите на услугите ни по най-добрия начин.","data_processing_consent_my_personal_data":"моите лични данни","data_processing_consent_partner_checkbox_tooltip":"Този сайт е на базата на продуктите на Ексола. Ексола обработва личните ви данни (данни за самоличност, данни за връзка, бизнес данни), които предоставяте в Издателския си профил.","essential_cookies_checkbox":"Основни бисквитки","essential_cookies_description":"Тези бисквитки са необходими, за да могат сайта ни и продуктите на Ексола да функционират, и не могат да бъдат изключени. Например, те включват бисквитки, които ви позволяват да влизате в личния си профил, както и бисквитки, с помощта на които се обработват плащания и се осигурява клиентска поддръжка. <br/> Можете да настроите браузъра си да блокира тези бисквитки или да ви предупреждава за тях, но в този случай някои части на сайта могат да не работят правилно.","essential_cookies_list_link_name":"Списък на Основни бисквитки","essential_cookies_tooltip":"Този тип бисквитки не могат да бъдат изключени.","functional_cookies_checkbox":"Функционални бисквитки","functional_cookies_description":"Тези бисквитки ни позволяват да запомним изборите, които правите на сайта ни или в продуктите на Ексола. Това ни помага да ви предоставяме подобрено и персонализирано съдържание. Например, можем да променим определена страница само за вас, или да ви предоставим други услуги по поискване. <br/> Ако не приемате тези бисквитки, някои или всички функции могат да не работят правилно.","functional_cookies_link_name":"Списък на Функционални бисквитки","opt_out_consent":"Разбирам, че Ексола може да споделя личните ми данни в {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Група Ексола","opt_out_description":"Имате правото да промените или да оттеглите съгласието си по всяко време. Оттеглянето на съгласие не влияе на законноста на обработката, извършена на базата на предишното ви съгласие.","opt_out_title":"Откажете се","privacy_policy_link_name":"Политика за поверителност","return_button":"Връщане","save_and_close_button":"Запази и затвори","saving_button":"Запазване...","settings_button":"Настройки","settings_footer_description":"*Ако тази отметка е избрана, вече сте направили избор в друг продукт на Ексола.","settings_title":"Настройки за поверителност","targeting_cookies_checkbox":"Бисквитки за таргетиране","targeting_cookies_description":"Тези бисквитки записват страниците, които посещавате на този сайт или в продуктите на Ексола, и връзките, които следвате. Използваме тази информация за да направим сайта ни и рекламата, която се показва на него, по-подходящи за вас. Също така можем да споделяме тази информация с трети лица за същата цел. <br/> Ако не приемате тези бисквитки, ще продължавате да виждате реклама, но тя няма да е персонализирана съгласно интересите ви.","targeting_cookies_link_name":"Списък на Бисквитки за таргетиране","welcome_screen_allow_cookies":"Съгласен съм да използвам бисквитки","welcome_screen_data_processing":"Давам съгласието си на Ексола за използване на {myPersonalDataTooltip} с цел предлагане на персонализирани услуги на мен.","welcome_screen_description":"Можете да промените или да оттеглите съгласието си по всяко време, като се върнете в меню Настройки за поверителност.","welcome_screen_mobile_description":"Като натискате \\"{acceptAllButtonText}\\", ни давате съгласието си да обработваме личните ви данни и бисквитките. Също така можете да промените предпочитанията си в Настройки.","welcome_screen_title":"Уважаваме поверителността ви."}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Přijmout vše","analytical_performance_cookies_checkbox":"Analytické a výkonnostní cookies","analytical_performance_cookies_description":"Tyto cookies shromažďují informace o vašem používání tohoto webu a umožňují nám vylepšit způsob jeho fungování a vylepšit vaše zkušenosti s jinými produkty Xsolla. Můžeme například zajistit, abyste snadno našli, co hledáte, nebo zaznamenat jakékoli potíže, které byste mohli mít.<br/> Pokud tyto cookies nepřijmete, nebudeme vědět, kdy jste navštívili náš web a nebudeme moci sledovat jeho výkon.","analytical_performance_cookies_link_name":"Seznam analytických a výkonnostních cookies","cookie_policy_link_name":"Zásady používání cookies","data_processing_consent_checkbox":"Souhlas se zpracováním dat","data_processing_consent_customer_checkbox_tooltip":"Tento web je provozován na produktech Xsolla. Xsolla spravuje vaše osobní údaje, jako je celé jméno nebo přezdívka, e-mailová adresa, IP adresa, informace o zeměpisné poloze a jedinečné ID uživatele.","data_processing_consent_description":"Potřebujeme váš souhlas s používáním vašich osobních údajů a informací z cookies, abychom vám mohli nabídnout přizpůsobené služby. Pokud se rozhodnete odhlásit ze zpracování údajů, použijeme pouze data ze základních cookies a nebudete moci plně užívat našich služeb.","data_processing_consent_my_personal_data":"moje osobní data","data_processing_consent_partner_checkbox_tooltip":"Tento web je provozován na produktech Xsolla. Xsolla spravuje vaše osobní údaje, například identitu a kontaktní nebo obchodní údaje, které jste uvedli v Účtu vydavatele.","essential_cookies_checkbox":"Základní cookies","essential_cookies_description":"Tyto cookies jsou nezbytné pro fungování našich webových stránek a produktů Xsolla a nelze je vypnout. Zahrnují například cookies, které vám umožňují přihlásit se ke svému osobnímu účtu, a cookies, které zajišťují správný tok zpracování plateb a zákaznickou podporu.<br/> Svůj prohlížeč můžete nastavit tak, aby tyto cookies zablokoval nebo vás na ně upozornil, ale pak některé části tohoto webu nemusí fungovat podle očekávání.","essential_cookies_list_link_name":"Seznam základních cookies","essential_cookies_tooltip":"Tento typ cookies nelze vypnout.","functional_cookies_checkbox":"Funkční cookies","functional_cookies_description":"Tyto cookies nám umožňují zapamatovat si volby, které provedete na našich webových stránkách nebo v produktech Xsolla. To nám pomáhá poskytovat vylepšené a přizpůsobené funkce. Můžeme vám například přizpůsobit určitou stránku nebo na požádání poskytnout další služby.<br/> Pokud tyto cookies nepřijmete, některé nebo všechny tyto funkce nemusí fungovat správně.","functional_cookies_link_name":"Seznam funkčních cookies","opt_out_consent":"Beru na vědomí, že společnost Xsolla může sdílet moje osobní údaje, a tyto údaje může obdržet i {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Skupina Xsolla","opt_out_description":"Máte právo kdykoli změnit nebo odvolat souhlas. Odvolání souhlasu nemá vliv na zákonnost minulého zpracování, protože je založeno na předchozím souhlasu.","opt_out_title":"Odvolat souhlas","privacy_policy_link_name":"Zásady ochrany osobních údajů","return_button":"Zpět","save_and_close_button":"Uložit a zavřít","saving_button":"Ukládání...","settings_button":"Nastavení","settings_footer_description":"*Pokud je políčko již zaškrtnuto, takovou změnu jste již provedli v jiném produktu Xsolla.","settings_title":"Nastavení ochrany osobních údajů","targeting_cookies_checkbox":"Cookies cílení","targeting_cookies_description":"Tyto cookies zaznamenávají stránky, které jste navštívili na tomto webu nebo v produktech Xsolla, a odkazy, na které jste kliknuli. Tyto informace používáme k tomu, aby naše webové stránky a reklamy na nich zobrazené byly relevantnější pro vaše zájmy. Za tímto účelem můžeme tyto informace sdílet také s třetími stranami.<br/> Pokud tyto cookies nepřijmete, budou se vám i nadále zobrazovat reklamy, ale nebudou přizpůsobeny vašim zájmům.","targeting_cookies_link_name":"Seznam cookies cílení","welcome_screen_allow_cookies":"Souhlasím s používáním cookies","welcome_screen_data_processing":"Dávám souhlas s tím, že Xsolla může použít {myPersonalDataTooltip} k tomu, aby mi nabídla přizpůsobené služby.","welcome_screen_description":"Svůj souhlas můžete kdykoli změnit nebo odvolat v Nastavení ochrany osobních údajů.","welcome_screen_mobile_description":"Kliknutím na tlačítko „{acceptAllButtonText}“ nám dáváte souhlas se zpracováním vašich osobních údajů a nastavením všech cookies. Jakékoli změny můžete provést v nastavení.","welcome_screen_title":"Respektujeme vaše soukromí"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Alle akzeptieren","analytical_performance_cookies_checkbox":"Analyse- und Leistungs-Cookies","analytical_performance_cookies_description":"Diese Cookies sammeln Daten über deine Nutzung dieser Website und ermöglichen es uns, die Website und dein Erlebnis mit anderen Xsolla-Produkten zu verbessern. So können wir beispielsweise sicherstellen, dass du problemlos das findest, wonach du sucht, oder etwaige Schwierigkeiten feststellen. <br/> Wenn du diese Cookies nicht akzeptierst, sind wir im Unklaren darüber, wann du unsere Website besucht hast und können deren Leistung nicht überwachen.","analytical_performance_cookies_link_name":"Liste der Analyse- und Leistungs-Cookies","cookie_policy_link_name":"Cookie-Richtlinie","data_processing_consent_checkbox":"Zustimmung zur Datenverarbeitung","data_processing_consent_customer_checkbox_tooltip":"Diese Seite nutzt Xsolla-Produkte. Xsolla verwaltet deine personenbezogenen Daten wie vollständiger Name, Nickname, E-Mail-Adresse, IP-Adresse, Standortdaten und individuelle Benutzer-ID.","data_processing_consent_description":"Wir benötigen deine Zustimmung zur Verarbeitung deiner personenbezogenen Daten und der Cookie-Daten, um dir maßgeschneiderte Dienste anbieten zu können. Wenn du der Datenverarbeitung widersprichst, verwenden wir nur die Daten aus essenziellen Cookies, woraufhin du unsere Dienste nicht in vollem Umfang genießen kannst.","data_processing_consent_my_personal_data":"meine personenbezogenen Daten","data_processing_consent_partner_checkbox_tooltip":"Diese Seite nutzt Xsolla-Produkte. Xsolla verwaltet deinen personenbezogenen Daten, darunter von die von dir im Kundenportal angegebenen Identitäts-, Kontakt- und Firmenangaben.","essential_cookies_checkbox":"Essenzielle Cookies","essential_cookies_description":"Diese Cookies sind für das Funktionieren unserer Website sowie der Xsolla-Produkte notwendig und können nicht deaktiviert werden. Dazu gehören z. B. Cookies für das Anmelden bei deinem persönlichen Konto, den Kundensupport und den korrekten Ablauf der Zahlungsabwicklung. <br/> Du kannst deinen Browser so einstellen, dass er diese Cookies blockiert oder dich davor warnt, allerdings funktionieren dann einige Teile dieser Website möglicherweise nicht wie erwartet.","essential_cookies_list_link_name":"Liste der essenziellen Cookies","essential_cookies_tooltip":"Dieser Cookie-Typ lässt sich nicht deaktivieren.","functional_cookies_checkbox":"Funktionale Cookies","functional_cookies_description":"Mithilfe dieser Cookies können wir deine Entscheidungen speichern, die du auf dieser Website oder in den Xsolla-Produkten getroffen hast. Das hilft uns dabei, bessere und personalisierte Funktionen bereitzustellen. Beispielsweise können wir eine bestimmte Seite für dich anpassen oder, auf deinen Wunsch hin, andere Dienste anbieten. <br/> Wenn du diese Cookies nicht akzeptierst, funktionieren einige oder alle dieser Funktionen möglicherweise nicht ordnungsgemäß.","functional_cookies_link_name":"Liste der funktionalen Cookies","opt_out_consent":"Ich habe verstanden, dass Xsolla meine personenbezogenen Daten innerhalb der {xsollaGroupConsentLink} weitergeben darf.","opt_out_consent_link_name":"Xsolla Group","opt_out_description":"Du hast das Recht, deine Einwilligung jederzeit zu ändern oder zu widerrufen. Der Widerruf der Einwilligung hat keinen Einfluss auf die Rechtmäßigkeit der bisherigen Verarbeitung, da diese auf einer vorherigen Einwilligung beruht.","opt_out_title":"Widersprechen","privacy_policy_link_name":"Datenschutzrichtlinie","return_button":"Zurück","save_and_close_button":"Speichern und schließen","saving_button":"Wird gespeichert...","settings_button":"Einstellungen","settings_footer_description":"*Wenn das Kontrollkästchen aktiviert ist, hast du die Auswahl bereits in einem anderen Xsolla-Produkt getroffen.","settings_title":"Datenschutzeinstellungen","targeting_cookies_checkbox":"Targeting-Cookies","targeting_cookies_description":"Diese Cookies erfassen die Seiten, die du auf dieser Website oder in den Xsolla- Produkten besucht hast, und die Links, auf die du geklickt hast. Wir verwenden diese Daten, um unsere Website und die darauf angezeigte Werbung entsprechend deiner Interessen relevanter zu gestalten. Zu diesem Zweck können wir diese Daten auch an Dritte weitergeben. <br/> Wenn du diese Cookies nicht akzeptierst, wird dir zwar weiterhin Werbung angezeigt, jedoch ist diese nicht auf deine Interessen zugeschnitten.","targeting_cookies_link_name":"Liste der Targeting-Cookies","welcome_screen_allow_cookies":"Ich stimme der Nutzung von Cookies zu","welcome_screen_data_processing":"Ich willige ein, dass Xsolla {myPersonalDataTooltip} verwenden darf, um mir maßgeschneiderte Dienstleistungen anzubieten","welcome_screen_description":"Du kannst deine Einwilligung jederzeit ändern oder widerrufen, wechsle dazu einfach in die Datenschutzeinstellungen.","welcome_screen_mobile_description":"Durch Klick auf \\"{acceptAllButtonText}\\" stimmst du zu, dass wir deine personenbezogenen Daten verarbeiten und Cookies setzen dürfen. Deine Vorgaben lassen sich unter \\"Einstellungen\\" ändern.","welcome_screen_title":"Wir respektieren den Datenschutz"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"essential_cookies_checkbox":"Essential cookies","essential_cookies_tooltip":"This type of cookies cannot be switched off.","analytical_performance_cookies_checkbox":"Analytical and performance cookies","functional_cookies_checkbox":"Functional cookies","targeting_cookies_checkbox":"Targeting cookies","settings_button":"Settings","settings_title":"Privacy settings","settings_footer_description":"*If the checkbox is selected, you have already made your choice in another Xsolla Product.","accept_all_button":"Accept all","return_button":"Return","save_and_close_button":"Save and close","saving_button":"Saving...","welcome_screen_title":"We respect your privacy","welcome_screen_description":"You can change or withdraw your consent at any time by going back to Privacy settings.","welcome_screen_mobile_description":"By clicking \\"{acceptAllButtonText}\\", you give us consent to process your personal data and set all cookies. Alternatively, you can customize your preferences in Settings.","welcome_screen_data_processing":"I give my consent to Xsolla to use {myPersonalDataTooltip} to offer customized services to me","welcome_screen_allow_cookies":"I agree to use cookies","data_processing_consent_checkbox":"Data processing consent","essential_cookies_description":"These cookies are necessary for our website and Xsolla Products to function and cannot be switched off. For example, they include cookies that enable you to log in to your personal account and cookies that provide correct payment processing flow and customer support. <br/> You can set your browser to block or alert you about these cookies, but then some parts of this website might not work as expected.","essential_cookies_list_link_name":"Essential cookies list","analytical_performance_cookies_description":"These cookies collect information about your use of this website and enable us to improve the way it works, as well as enhance your experience with other Xsolla Products. For example, we can ensure you easily find what you\'re looking for or record any difficulties you may have. <br/> If you don\'t accept these cookies, we won\'t know when you have visited our website and won\'t be able to monitor its performance.","analytical_performance_cookies_link_name":"Analytical and performance cookies list","functional_cookies_description":"These cookies allow us to remember the choices you make on our website or in Xsolla Products. This helps us provide enhanced and personalized features. For example, we can customize a certain page for you, or provide other services at your request. <br/> If you don\'t accept these cookies, some or all of these features might not function properly.","functional_cookies_link_name":"Functional cookies list","targeting_cookies_description":"These cookies record the pages you have visited on this website or in Xsolla Products and the links you have followed. We use this information to make our website and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose. <br/> If you do not accept these cookies, you will still see advertisements, but they won’t be tailored to your interests.","targeting_cookies_link_name":"Targeting cookies list","data_processing_consent_description":"We need your consent to use your personal data and info from cookies to offer customized services to you. If you decide to opt out of data processing, we will only use the data from essential cookies and you won\'t be able to enjoy our services in full.","data_processing_consent_my_personal_data":"my personal data","data_processing_consent_customer_checkbox_tooltip":"This site is run on Xsolla Products. Xsolla manages your personal data, such as full name or nickname, email address, IP address, geolocation info, and unique user ID.","data_processing_consent_partner_checkbox_tooltip":"This site is run on Xsolla Products. Xsolla manages your personal data, such as identity and contact or business details provided by you in Publisher Account.","opt_out_title":"Opt out","opt_out_description":"You have the right to change or withdraw consent at any time. The withdrawal of consent doesn\'t affect the lawfulness of past processing, because it\'s based on prior consent.","opt_out_consent":"I understand that Xsolla may share my personal data within the {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Xsolla group","cookie_policy_link_name":"Cookie Policy","privacy_policy_link_name":"Privacy Policy"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Aceptar todas","analytical_performance_cookies_checkbox":"Cookies de análisis y de rendimiento","analytical_performance_cookies_description":"Estas cookies recopilan información sobre el uso que haces de este sitio web y nos permiten mejorar su funcionamiento, así como mejorar tu experiencia con otros Productos Xsolla. Por ejemplo, podemos cerciorarnos de que encuentras fácilmente lo que buscas o registrar cualquier dificultad que puedas encontrar. <br/> Si no aceptas estas cookies, no sabremos cuándo has visitado nuestro sitio web y no podremos monitorizar el rendimiento de este.","analytical_performance_cookies_link_name":"Lista de cookies de análisis y de rendimiento","cookie_policy_link_name":"Política de cookies","data_processing_consent_checkbox":"Consentimiento de tratamiento de datos","data_processing_consent_customer_checkbox_tooltip":"Este sitio web se ejecuta en Productos Xsolla. Xsolla gestiona tus datos personales, como el nombre completo o el apodo, la dirección de correo electrónico, la dirección IP, la información de geolocalización y el identificador de usuario único.","data_processing_consent_description":"Necesitamos tu consentimiento para usar tus datos personales e información derivada de las cookies para ofrecerte servicios personalizados. Si decides ser excluido del procesamiento de datos, solo usaremos los datos de las cookies esenciales y no podrás disfrutar de todos nuestros servicios.","data_processing_consent_my_personal_data":"mis datos personales","data_processing_consent_partner_checkbox_tooltip":"Este sitio web se ejecuta en Productos Xsolla. Xsolla gestiona tus datos personales, como la identidad y los datos de contacto o de negocio que proporcionaste en la Cuenta del editor.","essential_cookies_checkbox":"Cookies esenciales","essential_cookies_description":"Estas cookies son necesarias para que nuestro sitio web y los Productos Xsolla funcionen y no pueden desactivarse. Por ejemplo, incorporan cookies que te permiten acceder a su cuenta personal y cookies que facilitan un flujo de procesamiento de pagos adecuado y asistencia al cliente. <br/> Puedes configurar tu navegador para que bloquee estas cookies o te avise de ellas, pero entonces algunas zonas de este sitio web podrían no funcionar como cabría esperar.","essential_cookies_list_link_name":"Lista de cookies esenciales","essential_cookies_tooltip":"Este tipo de cookies no puede desactivarse","functional_cookies_checkbox":"Cookies funcionales","functional_cookies_description":"Estas cookies nos permiten recordar las opciones que elegiste en nuestro sitio web o en Productos Xsolla. Esto nos ayuda a brindar funciones mejoradas y personalizadas. Por ejemplo, podemos personalizar determinada página para ti o proporcionar otros servicios que solicites. <br/> Si no aceptas estas cookies, algunas de estas funciones o todas ellas podrían no funcionar correctamente.","functional_cookies_link_name":"Lista de cookies funcionales","opt_out_consent":"Acepto que Xsolla podría compartir mis datos personales dentro del {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Grupo Xsolla","opt_out_description":"Tienes derecho a cambiar o revocar el consentimiento en cualquier momento. La revocación del consentimiento no afecta a la legalidad de los tratamientos anteriores, porque se basan en un consentimiento previo.","opt_out_title":"Excluirse","privacy_policy_link_name":"Política de privacidad","return_button":"Volver","save_and_close_button":"Guardar y cerrar","saving_button":"Guardando...","settings_button":"Ajustes","settings_footer_description":"*Si la casilla está seleccionada, ya has tomado la decisión en otro Producto Xsolla.","settings_title":"Ajustes de privacidad","targeting_cookies_checkbox":"Cookies de preferencias","targeting_cookies_description":"Estas cookies registran las páginas que has visitado en este sitio web o en Productos Xsolla, y los enlaces que has pulsado. Usamos esta información para que nuestro sitio web y la publicidad que aparece en este sea más relevante para tus intereses. También podemos compartir esta información con terceros para este fin. <br/> Si no aceptas estas cookies, seguirás viendo anuncios, pero no estarán adaptados a tus intereses.","targeting_cookies_link_name":"Lista de cookies de preferencias","welcome_screen_allow_cookies":"Acepto el uso de cookies","welcome_screen_data_processing":"Doy mi consentimiento para que Xsolla use {myPersonalDataTooltip} para ofrecerme servicios personalizados.","welcome_screen_description":"Puede cambiar o revocar tu consentimiento en cualquier momento volviendo a los ajustes de Privacidad.","welcome_screen_mobile_description":"Al pulsar \\"{acceptAllButtonText}\\", nos das el consentimiento para procesar tus datos personales y colocar todas las cookies. De lo contrario, puedes personalizar tus preferencias en Ajustes.","welcome_screen_title":"Respetamos tu privacidad"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Accepter tous","analytical_performance_cookies_checkbox":"Cookies d\'analyse et de performance","analytical_performance_cookies_description":"Ces cookies collectent des informations sur votre utilisation de ce site web et nous permettent d\'améliorer son fonctionnement, ainsi que d\'améliorer votre expérience avec les autres produits Xsolla. Par exemple, nous pouvons faire en sorte que vous trouviez facilement ce que vous cherchez ou enregistrer les difficultés que vous pourriez rencontrer. <br/> Si vous n\'acceptez pas ces cookies, nous ne saurons pas quand vous avez visité notre site web et nous ne pourrons pas en contrôler les performances.","analytical_performance_cookies_link_name":"Liste des cookies d\'analyse et de performance","cookie_policy_link_name":"Politique relative aux cookies","data_processing_consent_checkbox":"Consentement au traitement des données","data_processing_consent_customer_checkbox_tooltip":"Ce site est géré par les produits Xsolla. Xsolla gère vos données personnelles, telles que votre nom complet ou votre surnom, votre adresse électronique, votre adresse IP, vos informations de géolocalisation et votre identifiant unique.","data_processing_consent_description":"Nous avons besoin de votre consentement pour utiliser vos données personnelles et les informations provenant des cookies afin de vous offrir des services personnalisés. Si vous décidez de ne pas participer au traitement des données, nous n\'utiliserons que les données provenant des cookies essentiels et vous ne pourrez pas profiter pleinement de nos services.","data_processing_consent_my_personal_data":"mes données personnelles","data_processing_consent_partner_checkbox_tooltip":"Ce site est géré par les produits Xsolla. Xsolla gère vos données personnelles, telles que l\'identité et les coordonnées ou les coordonnées professionnelles que vous avez fournies dans le Compte éditeur.","essential_cookies_checkbox":"Les cookies essentiels","essential_cookies_description":"Ces cookies sont nécessaires au fonctionnement de notre site web et des produits Xsolla et ne peuvent pas être désactivés. Par exemple, ils comprennent des cookies qui vous permettent de vous connecter à votre compte personnel et des cookies qui assurent le bon déroulement du traitement des paiements et l\'assistance à la clientèle. <br/> Vous pouvez configurer votre navigateur pour qu\'il bloque ou vous avertisse de l\'existence de ces cookies, mais certaines parties de ce site web pourraient alors ne pas fonctionner comme prévu.","essential_cookies_list_link_name":"Liste des cookies essentiels","essential_cookies_tooltip":"Ce type de cookies ne peut pas être désactivé.","functional_cookies_checkbox":"Cookies fonctionnels","functional_cookies_description":"Ces cookies nous permettent de nous souvenir des choix que vous faites sur notre site web ou dans Xsolla Products. Cela nous aide à fournir des fonctionnalités améliorées et personnalisées. Par exemple, nous pouvons personnaliser une certaine page pour vous, ou fournir d\'autres services à votre demande. <br/> Si vous n\'acceptez pas ces cookies, certaines ou toutes ces fonctionnalités pourraient ne pas fonctionner correctement.","functional_cookies_link_name":"Liste des cookies fonctionnels","opt_out_consent":"Je comprends que Xsolla puisse partager mes données personnelles au sein du {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Groupe Xsolla","opt_out_description":"Vous avez le droit de modifier ou de retirer votre consentement à tout moment. Le retrait du consentement n\'affecte pas la légalité du traitement passé, car il est basé sur un consentement préalable.","opt_out_title":"Se retirer","privacy_policy_link_name":"Politique de confidentialité","return_button":"Retour","save_and_close_button":"Enregistrer et fermer","saving_button":"Enregistrement...","settings_button":"Paramètres","settings_footer_description":"*Si la case est cochée, c\'est que vous avez déjà fait votre choix dans un autre produit Xsolla.","settings_title":"Paramètres de confidentialité","targeting_cookies_checkbox":"Cookies de ciblage","targeting_cookies_description":"Ces cookies enregistrent les pages que vous avez visitées sur ce site ou dans les produits Xsolla et les liens que vous avez suivis. Nous utilisons ces informations pour rendre notre site web et la publicité qui y est affichée plus pertinents par rapport à vos intérêts. Nous pouvons également partager ces informations avec des tiers à cette fin. <br/> Si vous n\'acceptez pas ces cookies, vous verrez toujours des publicités, mais elles ne seront pas adaptées à vos intérêts.","targeting_cookies_link_name":"Liste des cookies de ciblage","welcome_screen_allow_cookies":"J\'accepte d\'utiliser des cookies","welcome_screen_data_processing":"Je consens à ce que Xsolla utilise {myPersonalDataTooltip} pour m\'offrir des services personnalisés","welcome_screen_description":"Vous pouvez modifier ou retirer votre consentement à tout moment en retournant à la page Paramètres de confidentialité.","welcome_screen_mobile_description":"En cliquant sur «{acceptAllButtonText}», vous nous autorisez à traiter vos données personnelles et à installer tous les cookies. Vous pouvez également personnaliser vos préférences dans les paramètres.","welcome_screen_title":"Nous respectons votre vie privée"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"הסכמה לכל הקבצים","analytical_performance_cookies_checkbox":"קובצי Cookie לניתוחים ולביצועים","analytical_performance_cookies_description":"קובצי cookie אלה אוספים מידע ביחס לשימוש שלך באתר זה, ומאפשרים לנו לשפר את פעולתו וכן לשפר את חוויית השימוש שלך במוצרים אחרים של Xsolla. לדוגמה, נוכל לאפשר לך למצוא מידע בקלות או לתעד בעיות אפשריות. <br/> אם לא מאשרים את קובצי ה-cookie האלה, לא נוכל לדעת מתי בחרת להיכנס לאתר שלנו ולא נוכל לעקוב אחר ביצועי האתר.","analytical_performance_cookies_link_name":"רשימה של קובצי Cookie לניתוחים ולביצועים","cookie_policy_link_name":"מדיניות לשימוש בקובצי Cookie","data_processing_consent_checkbox":"הסכמה לעיבוד נתונים","data_processing_consent_customer_checkbox_tooltip":"אתר זה מופעל במוצרי Xsolla. חברת Xsolla מנהלת את הנתונים האישיים שלך – כמו שמך המלא או הכינוי שלך, כתובת האימייל וכתובת ה-IP שלך, מידע לגבי המיקום הגיאוגרפי שלך ומזהה המשתמש הייחודי לך.","data_processing_consent_description":"על מנת שנוכל להתאים את השירותים שלנו לך באופן אישי, דרושה לנו הסכמתך להשתמש בנתונים האישיים שלך ובמידע שנגזר מקובצי cookie. אם לא נקבל את אישורך לעיבוד הנתונים, נוכל להשתמש רק בנתונים שנגזרים מקובצי cookie נחוצים ולא תהיה לך אפשרות ליהנות ממלוא חוויית השימוש בשירותים שלנו.","data_processing_consent_my_personal_data":"נתונים האישיים שלי","data_processing_consent_partner_checkbox_tooltip":"אתר זה פועל במוצרי Xsolla. חברת Xsolla מנהלת את הנתונים האישיים שלך, דוגמת זהותך ופרטי הקשר שלך או פרטים עסקיים שלך, כפי שסיפקת בחשבון בעל האתר שלך.","essential_cookies_checkbox":"קובצי Cookie נחוצים","essential_cookies_description":"אלו קובצי cookie הנחוצים לתפעול התקין של האתר ושל מוצרי Xsolla, ולא ניתן להשביתם. לדוגמה, הם כוללים קובצי cookie שמאפשרים לך להתחבר לחשבונך האישי, וכן קובצי cookie שמספקים תהליך הולם לעיבוד תשלומים ולתמיכה בלקוחות. <br/> באפשרותך להגדיר את הדפדפן לחסימת קובצי cookie אלה או לקבלת התראה לגביהם, אך במקרה כזה, ייתכן שחלקים מסוימים באתר הזה לא יעבדו כהלכה וכפי המצופה.","essential_cookies_list_link_name":"רשימה של קובצי Cookie נחוצים","essential_cookies_tooltip":"לא ניתן להשבית קובצי Cookie מסוג זה.","functional_cookies_checkbox":"קובצי Cookie פונקציונליים","functional_cookies_description":"קובצי cookie אלה מאפשרים לנו לזכור את הבחירות שלך באתר שלנו או במוצרי Xsolla. כך אנחנו יכולים להציע לך פיצ\'רים משופרים ומותאמים אישית. לדוגמה, אנחנו יכולים להתאים דף מסוים אישית לך, או לספק לך שירותים אחרים לבקשתך. <br/> אם לא נקבל את הסכמתך לקובצי cookie אלה, ייתכן שחלק מהתכונות האלו, או כולן, לא יפעלו כהלכה.","functional_cookies_link_name":"רשימה של קובצי Cookie פונקציונליים","opt_out_consent":"מובן לי כי Xsolla עשויה לשתף את הנתונים האישיים שלי עם גורמים מתוך {xsollaGroupConsentLink}.","opt_out_consent_link_name":"קבוצת Xsolla","opt_out_description":"עומדת לך הזכות לשנות או לבטל את הסכמתך בכל עת. ביטול ההסכמה אינו משפיע על החוקיות של פעולות עיבוד שבוצעו בעבר, שכן הן מבוססות על הסכמה קודמת שניתנה על-ידך.","opt_out_title":"ביטול הסכמה","privacy_policy_link_name":"מדיניות הפרטיות","return_button":"חזרה","save_and_close_button":"שמירה וסגירה","saving_button":"מתבצעת שמירה...","settings_button":"הגדרות","settings_footer_description":"*אם התיבה הזו מסומנת, פירוש הדבר שכבר בחרת בה וסימנת אותה במוצר אחר של Xsolla.","settings_title":"הגדרות פרטיוּת","targeting_cookies_checkbox":"קובצי Cookie למיקוד","targeting_cookies_description":"קובצי cookie אלו מתעדים את הדפים שבהם ביקרת באתר זה או במוצרי Xsolla וקישורים שעליהם לחצת. אנחנו משתמשים במידע הזה כדי להפוך את האתר ואת המודעות שמוצגות בו לרלוונטיים יותר לתחומי העניין שלך. אנחנו גם עשויים לשתף מידע זה עם גורמי צד שלישי לצורך מטרה זו. <br/> אם לא תינתן הסכמתך לקובצי cookie אלה, עדיין יוצגו לך פרסומות אך הן לא יותאמו לתחומי העניין שלך.","targeting_cookies_link_name":"רשימה של קובצי Cookie למיקוד","welcome_screen_allow_cookies":"אני מרשה להשתמש בקובצי Cookie","welcome_screen_data_processing":"אני מרשה ל-Xsolla להשתמש ב{myPersonalDataTooltip} כדי להתאים אישית את השירותים שלה אליי","welcome_screen_description":"באפשרותך לשנות את לבטל את הסכמתך בכל עת, דרך הגדרות הפרטיוּת.","welcome_screen_mobile_description":"לחיצה על \\"{acceptAllButtonText}\\" מבטאת את הסכמתך לאפשר לנו לעבד את הנתונים האישיים שלך ולהגדיר את כל קובצי ה-Cookie. לחלופין, באפשרותך להתאים את ההעדפות שלך, דרך הקטע \'הגדרות\'.","welcome_screen_title":"אנחנו מכבדים את הפרטיות שלך"}'
            );
        },
        function (e) {
            e.exports = JSON.parse('{"agree":"Egyetértek","disagree":"Nem értek egyet","message":"Beleegyezem <a href=\\"%1$s\\">a személyes adataim</a> feldolgozásába és elfogadom az <a href=\\"%2$s\\">Adatvédelmi irányelveket</a>"}');
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Accetta tutto","analytical_performance_cookies_checkbox":"Cookie analitici e di prestazione","analytical_performance_cookies_description":"Questi cookie raccolgono informazioni sull\'utilizzo di questo sito web e ci permettono di migliorare il suo funzionamento, oltre a migliorare la tua esperienza con altri Prodotti Xsolla. Ad esempio, possiamo assicurare che trovi facilmente ciò che stai cercando o registrare eventuali difficoltà incontrate. <br/> Se non si accettano questi cookie, non sapremo quando è stato visitato il nostro sito web e non saremo in grado di monitorarne le prestazioni.","analytical_performance_cookies_link_name":"Lista dei cookie analitici e di prestazione","cookie_policy_link_name":"Cookie Policy","data_processing_consent_checkbox":"Consenso all\'elaborazione dei dati","data_processing_consent_customer_checkbox_tooltip":"Questo sito viene eseguito sui Prodotti Xsolla. Xsolla gestisce i tuoi dati personali quali nome e cognome o nickname, indirizzo e-mail, indirizzo IP, info di georilevazione e ID utente univoco.","data_processing_consent_description":"Abbiamo bisogno del tuo consenso per utilizzare i tuoi dati personali e le informazioni dei cookie per offrirti servizi personalizzati. Se decidi di rinunciare al trattamento dei dati, utilizzeremo solo i dati dei cookie essenziali e non potrai godere appieno dei nostri servizi.","data_processing_consent_my_personal_data":"i miei dati personali","data_processing_consent_partner_checkbox_tooltip":"Questo sito viene eseguito sui Prodotti Xsolla. Xsolla gestisce i tuoi dati personali, quali identità e contatto o dettagli aziendali forniti dal tuo Account Editore.","essential_cookies_checkbox":"Cookie essenziali","essential_cookies_description":"Questi cookie sono necessari per il funzionamento del nostro sito web e dei Prodotti Xsolla e non possono essere disattivati. Ad esempio, includono cookie che ti consentono di accedere al tuo account personale e cookie che forniscono il corretto flusso di elaborazione dei pagamenti e l\'assistenza clienti. <br/> È possibile impostare il browser in modo da bloccare o avvertire l\'utente di questi cookie, ma alcune parti di questo sito web potrebbero non funzionare come previsto.","essential_cookies_list_link_name":"Lista cookie essenziali","essential_cookies_tooltip":"Questo tipo di cookie non possono essere disattivati.","functional_cookies_checkbox":"Cookie funzionali","functional_cookies_description":"Questi cookie ci permettono di ricordare le scelte che fai sul nostro sito web o nei Prodotti Xsolla. Questo ci aiuta a fornire funzionalità avanzate e personalizzate. Ad esempio, possiamo personalizzare una determinata pagina per te o fornire altri servizi su tua richiesta. <br/> Se non accetti questi cookie, alcune o tutte queste funzioni potrebbero non funzionare correttamente.","functional_cookies_link_name":"Lista cookie funzionali","opt_out_consent":"Sono consapevole che Xsolla può condividere i miei dati personali all\'interno di {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Gruppo Xsolla","opt_out_description":"Hai il diritto di modificare o revocare il consenso in qualunque momento. La revoca del consenso non pregiudica la liceità del trattamento precedente in quanto è basato sul consenso prima della revoca.","opt_out_title":"Rifiuta","privacy_policy_link_name":"Informativa sulla Privacy","return_button":"Indietro","save_and_close_button":"Chiudi e salva","saving_button":"Salvataggio in corso...","settings_button":"Impostazioni","settings_footer_description":"*Se questa casella di controllo è selezionata, hai già effettuato la tua scelta in un altro Prodotto Xsolla.","settings_title":"Impostazioni sulla Privacy","targeting_cookies_checkbox":"Cookie di targeting","targeting_cookies_description":"Questi cookie registrano le pagine che hai visitato su questo sito web o sui Prodotti Xsolla e i link che hai seguito. Utilizziamo queste informazioni per rendere il nostro sito web e la pubblicità visualizzata su questo, più pertinente ai tuoi interessi. A tale scopo, potremmo anche condividere queste informazioni con terzi. <br/> Se non accetti questi cookie, vedrai comunque delle pubblicità, ma non saranno personalizzate in base ai tuoi interessi.","targeting_cookies_link_name":"Lista cookie di targeting","welcome_screen_allow_cookies":"Acconsento all\'uso dei cookie","welcome_screen_data_processing":"Acconsento affinché Xsolla usi {myPersonalDataTooltip} per offrirmi servizi personalizzati","welcome_screen_description":"Puoi modificare o revocare il tuo consenso in qualunque momento tornando alle impostazioni sulla Privacy.","welcome_screen_mobile_description":"Cliccando \\"{acceptAllButtonText}\\", ci dai il tuo consenso all\'elaborazione dei tuoi dati personali e impostare tutti i cookie. In alternativa puoi personalizzare le tue preferenze sulle Impostazioni.","welcome_screen_title":"Rispettiamo la tua privacy"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"全てを受け入れる","analytical_performance_cookies_checkbox":"分析クッキーとパフォーマンスクッキー","analytical_performance_cookies_description":"これらのクッキーは、お客様の本ウェブサイトのご利用に関する情報を収集し、本ウェブサイトの動作方法を改善したり、他のエクソラ製品での体験を向上させたりすることができます。例えば、お客様が探しているものを簡単に見つけたり、困難な点を記録したりすることができます。<br/>これらのクッキーを受け入れない場合は、お客様がいつ当社のウェブサイトを訪問したかを知ることができず、そのパフォーマンスを監視することができません。","analytical_performance_cookies_link_name":"分析クッキーとパフォーマンスクッキーリスト","cookie_policy_link_name":"クッキーポリシー","data_processing_consent_checkbox":"データ処理の同意","data_processing_consent_customer_checkbox_tooltip":"このサイトはエクソラ製品上で運営されています。エクソラは、フルネームやニックネーム、メールアドレス、IPアドレス、ジオロケーション情報、ユニークユーザーIDなどの個人データを管理しています。","data_processing_consent_description":"お客様にカスタマイズされたサービスを提供するために、お客様の個人データとクッキーからの情報を使用するには、お客様の同意が必要です。お客様がデータ処理をオプトアウトすることを決定した場合、当社は必要不可欠なクッキーからのデータのみを使用し、お客様は当社のサービスを完全に享受することができなくなります。","data_processing_consent_my_personal_data":"私の個人データ","data_processing_consent_partner_checkbox_tooltip":"このサイトは、エクソラ製品上で運営されています。エクソラは、パブリッシャーアカウントで提供されたID、連絡先、または事業内容などの個人データを管理します。","essential_cookies_checkbox":"必須クッキー","essential_cookies_description":"これらのクッキーは、当社のウェブサイトやエクソラ製品が機能するために必要なものであり、オフにすることはできません。例えば、お客様の個人アカウントへのログインを可能にするクッキーや、正しい決済処理の流れやカスタマーサポートを提供するためのクッキーなどがあります。<br/>ブラウザの設定により、これらのクッキーをブロックしたり、警告したりすることができますが、このウェブサイトの一部が期待通りに動作しない場合があります。","essential_cookies_list_link_name":"必須クッキーリスト","essential_cookies_tooltip":"このタイプのクッキーはオフにできません。","functional_cookies_checkbox":"機能的なクッキー","functional_cookies_description":"これらのクッキーにより、お客様が当社のウェブサイトやエクソラ製品で行った選択を記憶することができます。これにより、強化されたパーソナライズされた機能を提供することができます。例えば、お客様のご要望に応じて、特定のページをカスタマイズしたり、その他のサービスを提供したりすることができます。<br/>これらのクッキーを受け入れない場合、これらの機能の一部またはすべてが正しく機能しない場合があります。","functional_cookies_link_name":"機能的なクッキーリスト","opt_out_consent":"私は、エクソラが{xsollaGroupConsentLink}内で私の個人データを共有することがあることを理解しています。","opt_out_consent_link_name":"エクソラグループ","opt_out_description":"お客様はいつでも同意の変更や撤回をする権利を持っています。同意の撤回は事前の同意に基づくものなので、過去の処理の適法性には影響しません。","opt_out_title":"オプトアウト","privacy_policy_link_name":"個人情報保護方針","return_button":"戻る","save_and_close_button":"保存して閉じる","saving_button":"保存...","settings_button":"設定","settings_footer_description":"*チェックボックスが選択されている場合は、すでに他のエクソラ製品を選択していることになります。","settings_title":"プライバシー設定","targeting_cookies_checkbox":"ターゲティングクッキー","targeting_cookies_description":"これらのクッキーは、このウェブサイトまたはエクソラ製品でアクセスしたページと、アクセスしたリンクを記録します。当社は、この情報を利用して、当社のウェブサイトとそこに表示される広告を、お客様の関心により関連性の高いものにするために使用します。また、この情報を第三者と共有することがあります。<br/>これらのクッキーを受け入れない場合でも、広告は表示されますが、お客様の興味に合わせて調整されることはありません。","targeting_cookies_link_name":"ターゲティングクッキーリスト","welcome_screen_allow_cookies":"私はクッキーの使用に同意します","welcome_screen_data_processing":"私は、エクソラが{myPersonalDataTooltip}を使用して私にカスタマイズされたサービスを提供することに同意します","welcome_screen_description":"プライバシー設定に戻ることで、いつでも同意を変更または撤回することができます。","welcome_screen_mobile_description":"\\"{acceptAllButtonText}\\"をクリックすることで、お客様は当社がお客様の個人情報を処理し、すべてのクッキーを設定することに同意したことになります。または、設定で設定をカスタマイズすることもできます。","welcome_screen_title":"当社はお客様のプライバシーを尊重します"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"모두 수락","analytical_performance_cookies_checkbox":"분석 및 성능 쿠키","analytical_performance_cookies_description":"이 쿠키는 귀하가 이 웹사이트를 어떻게 사용하는지에 대한 정보를 수집하여 이 웹사이트의 작동 방식을 개선할 수 있도록 하며 또한, 엑솔라 상품 이용에서의 귀하의 경험을 저희가 더 향상할 수 있도록 합니다. 예를 들어, 귀하가 찾고 있는 대상을 쉽게 찾을 수 있는지 확인하거나 귀하가 겪는 어려움을 기록할 수 있습니다. <br/>이 쿠키를 수락하지 않는 경우 당사는 귀하가 언제 저희 웹사이트를 방문했는지 알 수 없으며 웹사이트의 성능도 모니터링할 수 없습니다.","analytical_performance_cookies_link_name":"분석 및 성능 쿠키 목록","cookie_policy_link_name":"쿠키 정책","data_processing_consent_checkbox":"데이터 처리 동의","data_processing_consent_customer_checkbox_tooltip":"이 사이트는 엑솔라 상품에서 실행됩니다. 엑솔라는 성명 또는 별명, 이메일 주소, IP 주소, 지리적 위치, 고유 사용자 ID 같은 귀하의 개인 데이터를 관리합니다.","data_processing_consent_description":"당사가 맞춤 서비스를 귀하에게 제공하려면 쿠키로부터의 귀하의 개인 데이터 및 정보를 사용하는 것에 대한 귀하의 동의가 필요합니다. 데이터 처리 옵트아웃을 결정하는 경우 당사는 필수 쿠키에서 얻은 데이터만 사용할 것이며 귀하는 당사의 서비스를 전체가 아닌 일부만 즐길 수 있을 수도 있습니다.","data_processing_consent_my_personal_data":"내 개인 데이터","data_processing_consent_partner_checkbox_tooltip":"이 사이트는 엑솔라 상품에서 실행됩니다. 엑솔라는 게시자 계정에 귀하가 제공한 신원, 연락처, 비즈니스 세부 정보 같은 귀하의 개인 데이터를 관리합니다.","essential_cookies_checkbox":"필수 쿠키","essential_cookies_description":"이 쿠키는 당사의 웹사이트 및 엑솔라 상품이 기능하는 데에 필수이며 끌 수 없습니다. 예를 들어, 이 쿠키에는 귀하의 개인 계정에 로그인할 수 있게 하는 쿠키와 올바른 결제 처리 흐름 및 고객 지원을 제공하는 쿠키가 포함되어 있습니다. <br/>이 쿠키에 대해 경고를 하거나 이 쿠키를 차단하도록 브라우저를 설정할 수 있으나, 그렇게 하면 이 웹사이트의 일부가 예상대로 작동하지 않을 수 있습니다.","essential_cookies_list_link_name":"필수 쿠키 목록","essential_cookies_tooltip":"이 유형의 쿠키는 끌 수 없습니다.","functional_cookies_checkbox":"기능 쿠키","functional_cookies_description":"이 쿠키는 당사의 웹사이트 또는 엑솔라 상품에 관하여 귀하가 어떤 결정을 했는지 저희가 기억할 수 있게 해 줍니다. 이는 저희가 개선 및 맞춤화된 기능을 제공할 수 있도록 해 줍니다. 예를 들어, 특정 페이지를 귀하를 위해 맞춤 설정하거나 귀하의 요청으로 다른 서비스를 제공할 수 있습니다. <br/>이 쿠키를 수락하지 않는 경우 이 기능의 일부 또는 전체가 적절하게 기능하지 않을 수 있습니다.","functional_cookies_link_name":"기능 쿠키 목록","opt_out_consent":"엑솔라가 내 개인 데이터를 {xsollaGroupConsentLink} 내에서 공유할 수 있음을 이해합니다.","opt_out_consent_link_name":"엑솔라 그룹","opt_out_description":"귀하는 언제든지 동의를 변경 및 철회할 수 있는 권리가 있습니다. 동의 철회는 과거에 있었던 처리의 적법성에 영향을 주지 않습니다. 과거의 처리는 그 전의 동의에 기반한 것이기 때문입니다.","opt_out_title":"옵트아웃","privacy_policy_link_name":"개인정보 보호정책","return_button":"반환","save_and_close_button":"저장 및 닫기","saving_button":"저장 중...","settings_button":"설정","settings_footer_description":"*확인란이 선택된 경우 다른 엑솔라 상품에서 이미 선택을 한 것입니다.","settings_title":"개인 정보 설정","targeting_cookies_checkbox":"대상 쿠키","targeting_cookies_description":"이 쿠키는 귀하가 방문한 이 웹사이트 또는 엑솔라 상품의 페이지와 귀하가 들어간 링크를 기록합니다. 저희는 이 정보를 당사의 웹사이트 및 웹사이트에 표시되는 광고를 귀하의 관심사에 좀 더 맞게 설정하는 데에 이 정보를 사용합니다. 저희는 언급한 목적을 위해 제삼자와 이 정보를 공유할 수도 있습니다. <br/>이 쿠키를 수락하지 않는 경우 광고는 계속 볼 수 있지만, 광고가 귀하의 관심사에 맞게 설정되어 있지는 않습니다.","targeting_cookies_link_name":"대상 쿠키 목록","welcome_screen_allow_cookies":"쿠키 사용에 동의합니다","welcome_screen_data_processing":"맞춤화된 서비스를 나에게 제공할 수 있도록 엑솔라가 {myPersonalDataTooltip}를 이용하는 데에 동의합니다.","welcome_screen_description":"개인 정보 설정으로 돌아가 언제든지 동의를 변경 또는 철회할 수 있습니다.","welcome_screen_mobile_description":"\'{acceptAllButtonText}\'를 클릭하면 귀하의 개인 데이터 처리 및 모든 쿠키 설정에 동의하게 됩니다. 또는, 기본 설정을 설정에서 사용자 지정할 수 있습니다.","welcome_screen_title":"저희는 귀하의 개인 정보를 소중히 여깁니다"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Akceptuj wszystkie","analytical_performance_cookies_checkbox":"Pliki cookie związane z wydajnością i danymi analitycznymi","analytical_performance_cookies_description":"Te pliki cookie gromadzą informacje na temat twojego korzystania z tego serwisu i umożliwiają nam udoskonalanie jego działania, a także zapewnienie ci wygodniejszego korzystania z Produktów Xsolla. Na przykład, możemy sprawić, że będziesz mógł z łatwością znaleźć to, czego szukasz lub zarejestrować wszelkie problemy, jakich możesz doświadczyć. <br/>Jeśli nie wyrazisz zgody na te pliki cookie, nie będziemy wiedzieć, kiedy korzystałeś z naszego serwisu i nie będziemy mogli monitorować jego działania.","analytical_performance_cookies_link_name":"Lista plików cookie związanych z wydajnością i danymi analitycznymi","cookie_policy_link_name":"Polityka plików cookie","data_processing_consent_checkbox":"Zgoda na przetwarzanie danych","data_processing_consent_customer_checkbox_tooltip":"Ta strona działa na Produktach Xsolla. Xsolla zarządza twoimi danymi osobowymi, takimi jak imię i nazwisko lub nazwa użytkownika, adres e-mail, adres IP, dane lokalizacyjne oraz unikalny identyfikator użytkownika.","data_processing_consent_description":"Potrzebujemy twojej zgody na wykorzystanie twoich danych osobowych i informacji z plików cookie, aby mieć możliwość zaoferowania ci usług dostosowanych do twoich potrzeb. Jeśli nie zgodzisz się na przetwarzanie danych, wykorzystamy jedynie dane z niezbędnych plików cookie i nie będziesz mógł w pełni korzystać z naszych usług.","data_processing_consent_my_personal_data":"moje dane osobowe","data_processing_consent_partner_checkbox_tooltip":"Ta strona działa na Produktach Xsolla. Xsolla zarządza twoimi danymi osobowymi, takimi jak dane umożliwiające identyfikację oraz dane kontaktowe lub biznesowe podane przez ciebie w danych Konta Wydawcy.","essential_cookies_checkbox":"Niezbędne pliki cookie","essential_cookies_description":"Te pliki cookie są konieczne, aby nasz serwis i Produkty Xsolla mogły funkcjonować, i nie można ich wyłączyć. Na przykład, są to pliki cookie, które umożliwiają ci logowanie się do swojego konta, oraz pliki cookie, które zapewniają prawidłowe przetwarzanie płatności i wsparcie klienta. <br/>Możesz zmienić ustawienia swojej przeglądarki i zablokować te pliki cookie lub otrzymywać o nich ostrzeżenia, ale wówczas niektóre części tego serwisu mogą nie działać zgodnie z oczekiwaniami.","essential_cookies_list_link_name":"Lista niezbędnych plików cookie","essential_cookies_tooltip":"Tego rodzaju plików cookie nie można wyłączyć.","functional_cookies_checkbox":"Funkcjonalne pliki cookie","functional_cookies_description":"Te pliki cookies pozwalają nam zapamiętać twoje wybory dokonywane w naszym serwisie lub w Produktach Xsolla. Pomaga nam to w zapewnieniu ulepszonych i spersonalizowanych funkcjonalności. Na przykład, możemy dopasować określoną stronę do twoich potrzeb lub zapewnić inne usługi na twoją prośbę. <br/>Jeśli nie wyrazisz zgody na te pliki cookie, niektóre lub wszystkie te funkcjonalności mogą nie funkcjonować poprawnie.","functional_cookies_link_name":"Lista funkcjonalnych plików cookie","opt_out_consent":"Przyjmuję do wiadomości, że Xsolla może udostępniać moje dane osobowe w ramach {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Grupa Xsolla","opt_out_description":"Masz prawo do zmiany lub wycofania zgody w dowolnym momencie. Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania w przeszłości z uwagi na fakt, że było ono oparte na poprzedniej zgodzie.","opt_out_title":"Rezygnacja","privacy_policy_link_name":"Polityka prywatności","return_button":"Powrót","save_and_close_button":"Zapisz i zamknij","saving_button":"Zapisywanie...","settings_button":"Ustawienia","settings_footer_description":"*Jeśli pole wyboru jest zaznaczone, już dokonałeś wyboru w innym Produkcie Xsolla.","settings_title":"Ustawienia prywatności","targeting_cookies_checkbox":"Reklamowe pliki cookie","targeting_cookies_description":"Te pliki cookies zapisują strony, które odwiedziłeś w naszym serwisie lub w Produktach Xsolla, oraz linki, na które wszedłeś. Wykorzystujemy te informacje, aby nasz serwis i wyświetlane w nim reklamy odpowiadały twoim zainteresowaniom. Możemy także udostępnić te informacje stronom trzecim w tym celu. <br/>Jeśli nie wyrazisz zgody na te pliki cookies, nadal będziesz widzieć reklamy, ale nie będą one odpowiadały twoim zainteresowaniom.","targeting_cookies_link_name":"Lista reklamowych plików cookie","welcome_screen_allow_cookies":"Zgadzam się na korzystanie z plików cookie","welcome_screen_data_processing":"Wyrażam zgodę na wykorzystywanie {myPersonalDataTooltip} Xsolla, aby otrzymywać spersonalizowane usługi","welcome_screen_description":"Możesz zmienić lub wycofać swoją zgodę w dowolnym momencie wracając do Ustawień prywatności.","welcome_screen_mobile_description":"Klikając \\"{acceptAllButtonText}\\", zgadzasz się na przetwarzanie swoich danych osobowych i akceptujesz wszystkie pliki cookies. Ewentualnie możesz ustawić swoje preferencje w Ustawieniach.","welcome_screen_title":"Szanujemy twoją prywatność"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Aceitar tudo","analytical_performance_cookies_checkbox":"Cookies analíticos e de desempenho","analytical_performance_cookies_description":"Esses cookies coletam informações sobre seu uso desse site e nos permitem melhorar o funcionamento dele, bem como melhorar sua experiência com outros Produtos Xsolla. Por exemplo, podemos garantir que você encontre facilmente o que está procurando ou registrarmos quaisquer dificuldades que você enfrente. <br/> Se você não aceitar esses cookies, não poderemos saber quando você visita nosso site e não poderemos monitorar o desempenho dele.","analytical_performance_cookies_link_name":"Lista de cookies analíticos e de desempenho","cookie_policy_link_name":"Política de Cookies","data_processing_consent_checkbox":"Consentimento ao processamento de dados","data_processing_consent_customer_checkbox_tooltip":"Esse site opera em Produtos Xsolla. Xsolla gerencia seus dados pessoais, tais como nome ou apelido, endereço de e-mail, endereço de IP, informações de geolocalização e identificadores únicos.","data_processing_consent_description":"Precisamos do seu consentimento para usar seus dados e informações pessoais a partir dos cookies para oferecer serviços personalizados a você. Se você decidir não compartilhar seus dados, usaremos apenas os dados advindos de cookies essenciais e você não poderá desfrutar dos nossos serviços por completo.","data_processing_consent_my_personal_data":"meus dados pessoais","data_processing_consent_partner_checkbox_tooltip":"Esse site opera em Produtos Xsolla. Xsolla gerencia seus dados pessoais, tais como identidade e detalhes de contato ou comerciais fornecidos por você na Conta de Distribuidor.","essential_cookies_checkbox":"Cookies essenciais","essential_cookies_description":"Esses cookies são necessários para que o nosso site e os Produtos Xsolla funcionem e não podem ser desativados. Por exemplo, eles incluem cookies que permitem que você faça login na sua conta pessoal e cookies que fornecem um fluxo correto de processamento de pagamentos e apoio ao consumidor. <br/> Você pode configurar seu navegador para bloquear ou alertar você sobre esses cookies, mas, nesse caso, algumas partes do site podem não funcionar como esperado.","essential_cookies_list_link_name":"Lista de cookies essenciais","essential_cookies_tooltip":"Esse tipo de cookie não pode ser desativado.","functional_cookies_checkbox":"Cookies funcionais","functional_cookies_description":"Esses cookies nos permitem lembrar suas escolhas no nosso site ou nos Produtos Xsolla. Isso nos ajuda a fornecer recursos personalizados e melhorados. Por exemplo, podemos customizar uma página específica para você, ou fornecer outros serviços quando solicitados. <br/> Se você não aceitar esses cookies, alguns desses ou todos recursos podem não funcionar corretamente.","functional_cookies_link_name":"Lista de cookies funcionais","opt_out_consent":"Entendo que a Xsolla poderá compartilhar meus dados pessoais dentro da {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Grupo Xsolla","opt_out_description":"Você tem o direito de alterar ou remover o consentimento a qualquer momento. A remoção do consentimento não afeta a legalidade de processamentos anteriores, porque eles se baseiam em consentimento prévio.","opt_out_title":"Recusar","privacy_policy_link_name":"Política de Privacidade","return_button":"Retornar","save_and_close_button":"Salvar e fechar","saving_button":"Salvando...","settings_button":"Configurações","settings_footer_description":"*Se a caixa de seleção estiver marcada, você já fez sua escolha em outro Produto Xsolla.","settings_title":"Configurações de privacidade","targeting_cookies_checkbox":"Cookies de personalização","targeting_cookies_description":"Esses cookies registram as páginas que você já visitou nesse site ou em Produtos Xsolla e os links que você acessou. Usamos essa informação para tornar nosso site e os anúncios exibidos nele mais relevantes para os seus interesses. Também podemos compartilhar essa informação com terceiros para esse propósito. <br/> Se você não aceitar esses cookies, você ainda verá anúncios, mas eles não serão personalizados aos seus interesses.","targeting_cookies_link_name":"Lista de cookies de personalização","welcome_screen_allow_cookies":"Eu aceito usar cookies","welcome_screen_data_processing":"Dou meu consentimento à Xsolla para usar {myPersonalDataTooltip} para oferecer serviços personalizados a mim","welcome_screen_description":"Você pode alterar ou remover seu consentimento a qualquer momento nas configurações de privacidade.","welcome_screen_mobile_description":"Ao clicar em \\"{acceptAllButtonText}\\", você nos dá consentimento para processarmos seus dados pessoais e usar todos os cookies. Alternativamente, você pode customizar suas preferências nas Configurações.","welcome_screen_title":"Nós respeitamos sua privacidade"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Acceptați toate","analytical_performance_cookies_checkbox":"Fișiere cookie analitice și de performanță","analytical_performance_cookies_description":"Aceste fișiere cookie colectează informații despre utilizarea dvs. a acestui site web și ne permit să îmbunătățim modul în care funcționează, precum și să îmbunătățim experiența dvs. cu alte produse Xsolla. De exemplu, vă putem asigura că găsiți cu ușurință ceea ce căutați sau înregistrăm orice dificultăți pe care le-ați putea avea. <br/> Dacă nu acceptați aceste fișiere cookie, nu vom ști când ați vizitat site-ul nostru și nu vom putea monitoriza performanța acestuia.","analytical_performance_cookies_link_name":"Lista fișierelor cookie analitice și de performanță","cookie_policy_link_name":"Politica privind fișierele cookie","data_processing_consent_checkbox":"Consimțământ de procesare a datelor","data_processing_consent_customer_checkbox_tooltip":"Acest site este rulat pe Produsele Xsolla. Xsolla gestionează datele dvs. cu caracter personal, cum ar fi numele complet sau porecla, adresa de e-mail, adresa IP, informațiile despre localizarea geografică și ID-ul de utilizator unic.","data_processing_consent_description":"Avem nevoie de consimțământul dvs. pentru a utiliza datele dvs. cu caracter personal și informațiile din fișierele cookie pentru a vă oferi servicii personalizate. Dacă decideți să renunțați la prelucrarea datelor, vom folosi doar datele din fișierele cookie de bază și nu veți putea să vă bucurați integral de serviciile noastre.","data_processing_consent_my_personal_data":"datele mele cu caracter personal","data_processing_consent_partner_checkbox_tooltip":"Acest site este rulat pe Produsele Xsolla. Xsolla gestionează datele cu caracter dvs. personal, cum ar fi identitatea și datele de contact sau de afaceri, furnizate de dvs. în Contul de editor.","essential_cookies_checkbox":"Fișiere cookie esențiale","essential_cookies_description":"Aceste fișiere cookie sunt necesare pentru ca site-ul nostru web și Produsele Xsolla să funcționeze și nu pot fi dezactivate. De exemplu, acestea includ fișiere cookie, care vă permit să vă conectați la contul dvs. personal, și fișiere cookie, care oferă un flux corect de procesare a plăților și asistență pentru clienți. <br/> Puteți seta browserul să vă blocheze sau să vă alerteze în legătură cu aceste modele cookie, însă este posibil ca anumite părți ale acestui site să nu funcționeze conform așteptărilor.","essential_cookies_list_link_name":"Lista fișierelor cookie esențiale","essential_cookies_tooltip":"Acest tip de fișiere cookie nu poate fi dezactivat.","functional_cookies_checkbox":"Fișiere cookie funcționale","functional_cookies_description":"Aceste fișiere cookie ne permit să memorizăm alegerile pe care le faceți pe site-ul nostru web sau în Produsele Xsolla. Acest lucru ne ajută să oferim funcții îmbunătățite și personalizate. <br/> De exemplu, putem personaliza o anumită pagină pentru dvs. sau vă putem oferi alte servicii la cererea dvs. Dacă nu acceptați aceste fișiere cookie, este posibil ca unele sau toate aceste funcții să nu funcționeze corect.","functional_cookies_link_name":"Lista fișierelor cookie funcționale","opt_out_consent":"Înțeleg că Xsolla poate partaja datele mele cu caracter personal în cadrul {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Grupul Xsolla","opt_out_description":"Aveți dreptul de a schimba sau retrage consimțământul în orice moment. Retragerea consimțământului nu afectează legalitatea procesării anterioare, deoarece se bazează pe consimțământul prealabil.","opt_out_title":"Anularea permisiunii de utilizare a informaţiilor cu caracter personal","privacy_policy_link_name":"Politica de confidenţialitate","return_button":"Revenire","save_and_close_button":"Salvați și închideți","saving_button":"Se salvează...","settings_button":"Setări","settings_footer_description":"*Dacă este bifată caseta de selectare, deja ați făcut alegerea dvs. într-un alt produs Xsolla.","settings_title":"Setări de confidențialitate","targeting_cookies_checkbox":"Fișiere cookie de analiză a vizitatorilor","targeting_cookies_description":"Aceste fișiere cookie înregistrează paginile pe care le-ați vizitat pe acest site web sau în Produsele Xsolla și linkurile pe care le-ați urmat. Folosim aceste informații pentru a face site-ul nostru și publicitatea afișată pe acesta mai relevante pentru interesele dvs. De asemenea, putem să împărtășim aceste informații cu terți în acest scop. <br/> Dacă nu acceptați aceste fișiere cookie, veți vedea în continuare reclame, însă acestea nu vor fi adaptate intereselor dvs.","targeting_cookies_link_name":"Lista fișierelor cookie de analiză a vizitatorilor","welcome_screen_allow_cookies":"Sunt de acord să utilizez fișiere cookie","welcome_screen_data_processing":"Îmi dau consimțământul pentru ca Xsolla să se folosească {myPersonalDataTooltip} pentru a-mi oferi servicii personalizate","welcome_screen_description":"Puteți modifica sau retrage consimțământul în orice moment revenind la setările de confidențialitate.","welcome_screen_mobile_description":"Făcând clic pe „{acceptAllButtonText}”, ne oferiți consimțământul pentru a procesa datele dvs. cu caracter personal și pentru a seta toate fișierele cookie. Alternativ, vă puteți personaliza preferințele în Setări.","welcome_screen_title":"Vă respectăm confidențialitatea"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Принять всё","analytical_performance_cookies_checkbox":"Аналитические файлы Cookie","analytical_performance_cookies_description":"Этот тип файлов позволяет нам анализировать ваше поведение на сайте и улучшать его работу, а также совершенствовать продукты Иксолла. Например, с помощью этих файлов мы можем понять, как быстро вы находите интересующую вас информацию и сталкиваетесь ли при этом с ошибками.<br/>Без этих файлов Cookie мы не будем знать, когда вы посещали сайт, и не сможем анализировать качество его работы.","analytical_performance_cookies_link_name":"Список аналитических файлов Cookie","cookie_policy_link_name":"Политика использования файлов Cookie","data_processing_consent_checkbox":"Согласие на обработку данных","data_processing_consent_customer_checkbox_tooltip":"Сайт работает на базе продуктов Иксолла. Иксолла может обрабатывать ваши персональные данные, такие как: полное имя или никнейм, email-адрес, IP-адрес, данные о местоположении, уникальный ID пользователя.","data_processing_consent_description":"Нам необходимо ваше согласие на обработку персональных данных и файлов Cookie в целях подбора наиболее подходящих вам предложений. Без вашего согласия мы будем использовать только технические файлы Cookie, без которых невозможна работа сервисов. Некоторые возможности сайта при этом могут быть ограничены.","data_processing_consent_my_personal_data":"моих персональных данных","data_processing_consent_partner_checkbox_tooltip":"Сайт работает на базе продуктов Иксолла. Иксолла обрабатывает персональные данные, которые вы предоставили в Личном кабинете: идентификационные и контактные данные (личные или рабочие).","essential_cookies_checkbox":"Технические файлы Cookie","essential_cookies_description":"Этот тип файлов необходим для корректной работы сайта и продуктов Иксолла. От этих файлов Cookie нельзя отказаться. Например, они позволяют вам выполнять вход в аккаунт, отслеживать статус платежа и получать помощь от службы поддержки.<br/>Вы можете настроить браузер так, чтобы он блокировал эти файлы или предупреждал об их использовании, но тогда некоторые разделы сайта могут работать с ошибками.","essential_cookies_list_link_name":"Список технических файлов Cookie","essential_cookies_tooltip":"От этих файлов Cookie нельзя отказаться.","functional_cookies_checkbox":"Функциональные файлы Cookie","functional_cookies_description":"Этот тип файлов позволяет запоминать ваши настройки и предпочтения. Это помогает нам предоставлять улучшенные и персонализированные возможности. Например, вам не придется повторно вводить данные или заново выполнять настройку.<br/>Без этих файлов Cookie некоторые функциональные возможности не будут работать надлежащим образом.","functional_cookies_link_name":"Список функциональных файлов Cookie","opt_out_consent":"Я понимаю, что Иксолла может делиться моими персональными данными с {xsollaGroupConsentLink}.","opt_out_consent_link_name":"аффилированными лицами Иксолла","opt_out_description":"Вы имеете право в любой момент отозвать свое согласие или изменить свой выбор. Ваш отказ не повлияет на законность предшествующей обработки данных, т. к. она основана на согласии, которое вы давали ранее.","opt_out_title":"Отказ от обработки персональных данных","privacy_policy_link_name":"Политика конфиденциальности","return_button":"Назад","save_and_close_button":"Сохранить и закрыть","saving_button":"Сохранение...","settings_button":"Настройки","settings_footer_description":"*Если флажок установлен, значит вы уже сделали свой выбор в другом продукте Иксолла.","settings_title":"Настройки конфиденциальности","targeting_cookies_checkbox":"Рекламные файлы Cookie","targeting_cookies_description":"Этот тип файлов позволяет отслеживать страницы, которые вы посещаете на сайте или в продуктах Иксолла, и ссылки, по которым вы переходите. Мы используем эту информацию, чтобы подбирать для вас наиболее интересные материалы. Мы также оставляем за собой право делиться данной информацией с третьими лицами.<br/>Без этих файлов Cookie вы по-прежнему будете видеть рекламные объявления, но они не будут соответствовать вашим интересам.","targeting_cookies_link_name":"Список рекламных файлов Cookie","welcome_screen_allow_cookies":"Я даю свое согласие на использование файлов Cookie","welcome_screen_data_processing":"Я даю свое согласие Иксолле на использование {myPersonalDataTooltip} в целях подбора наиболее интересных для меня материалов.","welcome_screen_description":"Вы можете в любой момент изменить свой выбор в Настройках конфиденциальности.","welcome_screen_mobile_description":"Нажимая \\"{acceptAllButtonText}\\", вы даете согласие на обработку персональных данных и файлов Cookie. Вы также можете задать индивидуальные параметры в Настройках.","welcome_screen_title":"Мы уважаем ваше право на конфиденциальность"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"ยอมรับทั้งหมด","analytical_performance_cookies_checkbox":"คุกกี้เพื่อการวิเคราะห์และวัดประสิทธิภาพ","analytical_performance_cookies_description":"คุกกี้เหล่านี้จะรวบรวมข้อมูลเกี่ยวกับการใช้เว็บไซต์นี้ของคุณและช่วยให้เราสามารถปรับปรุงวิธีการทำงานของคุกกี้ รวมถึงช่วยให้ประสบการณ์การใช้งานของคุณกับผลิตภัณฑ์อื่น ๆ ของเอ็กซ์โซลล่าดียิ่งขึ้น ตัวอย่างเช่น เราสามารถให้ความมั่นใจแก่คุณได้ว่าจะสามารถค้นหาสิ่งที่คุณกำลังมองหาอยู่ได้อย่างง่ายดาย หรือบันทึกความยากที่คุณอาจมีอยู่ใด ๆ <br/> หากคุณไม่ยอมรับคุกกี้เหล่านี้ เราจะไม่ทราบว่าคุณได้เข้าชมเว็บไซต์ของเราเมื่อใด และจะไม่สามารถติดตามประสิทธิภาพการทำงานของเว็บไซต์ได้","analytical_performance_cookies_link_name":"รายการคุกกี้เพื่อการวิเคราะห์และวัดประสิทธิภาพ","cookie_policy_link_name":"นโยบายคุกกี้","data_processing_consent_checkbox":"ความยินยอมในการประมวลผลข้อมูล","data_processing_consent_customer_checkbox_tooltip":"เว็บไซต์นี้ทำงานบนผลิตภัณฑ์ของเอ็กซ์โซลล่า ซึ่งจะจัดการข้อมูลส่วนตัวของคุณ เช่น ชื่อ-นามสกุล หรือชื่อเล่น ที่อยู่อีเมล ที่อยู่ไอพี ข้อมูลภูมิศาสตร์ และรหัสผู้ใช้ที่ไม่ซ้ำกัน","data_processing_consent_description":"เราต้องได้รับการยินยอมจากคุณเพื่อใช้ข้อมูลส่วนบุคคลของคุณและข้อมูลจากคุกกี้เพื่อนำเสนอการบริการที่ปรับแต่งให้เหมาะสมกับคุณ หากคุณตัดสินใจที่จะไม่อนุญาตให้ประมวลผลข้อมูล เราจะใช้เพียงข้อมูลจากคุกกี้ที่จำเป็นเท่านั้นและคุณจะไม่สามารถเพลิดเพลินไปกับการบริการแบบครบครันของเราได้","data_processing_consent_my_personal_data":"ข้อมูลส่วนตัวของฉัน","data_processing_consent_partner_checkbox_tooltip":"เว็บไซต์นี้ทำงานบนผลิตภัณฑ์ของเอ็กซ์โซลล่า ซึ่งจะจัดการข้อมูลส่วนตัวของคุณ เช่น อัตลักษณ์บุคคลและรายชื่อติดต่อ หรือรายละเอียดทางธุรกิจที่คุณได้ให้ไว้ในบัญชีผู้เผยแพร่โฆษณา","essential_cookies_checkbox":"คุกกี้ที่จำเป็น","essential_cookies_description":"คุกกี้เหล่านี้จำเป็นสำหรับการทำงานบนเว็บไซต์และผลิตภัณฑ์ของเอ็กซ์โซลล่าของเรา และไม่สามารถปิดการทำงานได้ ตัวอย่างเช่น เว็บไซต์และผลิตภัณฑ์จะมีคุกกี้ซึ่งช่วยให้คุณสามารถเข้าสู่ระบบไปยังบัญชีส่วนตัวและคุกกี้ของคุณซึ่งมอบกระบวนการประมวลผลการชำระเงินอย่างถูกต้อง รวมถึงการสนับสนุนลูกค้า <br/> คุณสามารถตั้งค่าเบราว์เซอร์เพื่อปิดกั้นหรือแจ้งเตือนคุณเกี่ยวกับคุกกี้เหล่านี้ แต่บางส่่วนของเว็บไซต์นี้อาจทำงานไม่ได้ตามที่คาดหวังไว้","essential_cookies_list_link_name":"รายการของคุกกี้ที่จำเป็น","essential_cookies_tooltip":"ไม่สามารถสลับคุกกี้ประเภทนี้ได้","functional_cookies_checkbox":"คุกกี้ที่เกี่ยวกับการทำงาน","functional_cookies_description":"คุกกี้เหล่านี้ช่วยให้เราจดจำตัวเลือกที่คุณเลือกบนเว็บไซต์หรือผลิตภัณฑ์ของเอ็กซ์โซลล่า ซึ่งช่วยให้เราสามารถมอบฟีเจอร์ที่ดียิ่งขึ้นและเป็นส่วนตัวมากขึ้น ตัวอย่างเช่น เราสามารถปรับแต่งบางหน้าให้แก่คุณ หรือมอบการบริการอื่น ๆ ตามที่คุณร้องขอ <br/> หากคุณไม่ยอมรับคุกกี้เหล่านี้ คุณสมบัติบางอย่างหรือบางทั้งหมดอาจทำงานไม่สมบูรณ์","functional_cookies_link_name":"รายชื่อของคุกกี้ที่เกี่ยวกับการทำงาน","opt_out_consent":"ฉันเข้าใจว่าเอ็กซ์โซลล่าอาจแบ่งปันข้อมูลส่วนบุคคลของฉันใน {xsollaGroupConsentLink}.","opt_out_consent_link_name":"กลุ่มเอ็กซ์โซลล่า","opt_out_description":"คุณมีสิทธิ์ที่จะเปลี่ยนหรือเพิกถอนความยินยอมได้ทุกเมื่อ การเพิกถอนความยินยอมไม่ส่งผลต่อการปฏิบัติตามกฎหมายของการดำเนินการที่ผ่านมา เนื่องจากการดำเนินการดังกล่าวอ้างอิงจากการยินยอมก่อนหน้า","opt_out_title":"เลือกเพื่อยกเลิก","privacy_policy_link_name":"นโยบายความเป็นส่วนตัว","return_button":"กลับคืน","save_and_close_button":"บันทึกและปิด","saving_button":"กำลังบันทึก...","settings_button":"การตั้งค่า","settings_footer_description":"*หากมีการทำเครื่องหมายที่กล่องกาเครื่องหมายนี้ หมายความว่าคุณได้เลือกตัวเลือกในผลิตภัณฑ์อื่นของเอ็กซ์โซลล่า","settings_title":"การตั้งค่าความเป็นส่วนตัว","targeting_cookies_checkbox":"การกำหนดเป้าหมายของคุกกี้","targeting_cookies_description":"คุกกี้เหล่านี้บันทึกหน้าที่คุณได้เข้าชมบนเว็บไซต์นี้หรือในผลิตภัณฑ์ของเอ็กซ์โซลล่าและลิงก์ที่คุณติดตาม เราใช้ข้อมูลนี้เพื่อสร้างเว็บไซต์และการโฆษณาของเราที่ปรากฏให้มีความสอดคล้องกับสิ่งที่คุณสนใจมากยิ่งขึ้น เราอาจแบ่งปันข้อมูลนี้กับบุคคลที่สามเพื่อวัตถุประสงค์ดังกล่าว<br/> หากคุณไม่ยอมรับคุกกี้เหล่านี้ คุณจะยังคงเห็นโฆษณาอยู่ แต่จะไม่มีการปรับแต่งเพื่อให้สอดคล้องกับความสนใจของคุณ","targeting_cookies_link_name":"รายชื่อของการกำหนดเป้าหมายของคุกกี้","welcome_screen_allow_cookies":"ฉันยินยอมที่จะใช้คุกกี้","welcome_screen_data_processing":"ฉันยินยอมให้เอ็กซ์โซลล่าใช้ {myPersonalDataTooltip}เพื่อเสนอบริการที่ปรับแต่งให้เหมาะสมกับตัวฉัน","welcome_screen_description":"คุณสามารถเปลี่ยนหรือเพิกถอนความยินยอมของคุณได้ทุกเมื่อโดยการกลับไปที่การตั้งค่าความเป็นส่วนตัว","welcome_screen_mobile_description":"การคลิก \\"{acceptAllButtonText}\\" ถือว่าคุณได้ให้ความยินยอมแก่เราในการประมวลผลข้อมูลส่วนตัวของคุณและตั้งค่าคุกกี้ทั้งหมด หรือคุณอาจปรับเปลี่ยนการกำหนดค่าของคุณได้ในการตั้งค่า","welcome_screen_title":"เราเคารพความเป็นส่วนตัวของคุณ"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Tümünü kabul et","analytical_performance_cookies_checkbox":"Analitik çerezler ile performans çerezleri","analytical_performance_cookies_description":"Bu çerezler, bu web sitesini kullanımınız hakkında bilgi toplar ve web sitesinin çalışma şeklini iyileştirmemize ve diğer Xsolla Ürünleriyle ilgili deneyiminizi geliştirmemize olanak tanır. Örneğin, aradığınızı kolayca bulmanızı sağlayabilir veya karşılaşabileceğiniz güçlükleri kaydedebiliriz. <br/> Bu çerezleri kabul etmezseniz web sitemizi ne zaman ziyaret ettiğinizi bilemeyiz ve performansını izleyemeyiz.","analytical_performance_cookies_link_name":"Analitik çerezler ile performans çerezleri listesi","cookie_policy_link_name":"Çerez Politikası","data_processing_consent_checkbox":"Veri işleme izni","data_processing_consent_customer_checkbox_tooltip":"Bu site Xsolla Ürünleri üzerinde çalıştırılmaktadır. Xsolla, ad, soyad veya takma ad, e-posta adresi, IP adresi, coğrafi konum bilgisi ve benzersiz kullanıcı kimliği gibi kişisel verilerinizi yönetir.","data_processing_consent_description":"Size özelleştirilmiş hizmetler sunmak üzere kişisel verilerinizi ve çerezlerden elde edilen bilgileri kullanabilmemiz için izninize ihtiyacımız var. Veri işlemeyi devre dışı bırakmaya karar verirseniz yalnızca zorunlu çerezlerden elde edilen verileri kullanacağız ve hizmetlerimizden tam olarak yararlanamayacaksınız.","data_processing_consent_my_personal_data":"kişisel verilerimi","data_processing_consent_partner_checkbox_tooltip":"Bu site Xsolla Ürünleri üzerinde çalıştırılmaktadır. Xsolla, Yayıncı Hesabında ilettiğiniz kimlik ve iletişim veya iş bilgileri gibi kişisel verilerinizi yönetir.","essential_cookies_checkbox":"Zorunlu çerezler","essential_cookies_description":"Bu çerezler, web sitemizin ve Xsolla Ürünlerinin çalışması için gereklidir ve kapatılamaz. Örneğin, kişisel hesabınıza giriş yapmanızı sağlayan çerezler ile doğru ödeme işleme akışı ve müşteri desteği sağlayan çerezleri içerirler. <br/> Tarayıcınızı, bu çerezleri engelleyecek veya bunlarla ilgili olarak sizi uyaracak şekilde ayarlayabilirsiniz, ancak bu durumda bu web sitesinin bazı bölümleri beklendiği gibi çalışmayabilir.","essential_cookies_list_link_name":"Zorunlu çerezler listesi","essential_cookies_tooltip":"Bu tür çerezler kapatılamaz.","functional_cookies_checkbox":"Fonksiyonel çerezler","functional_cookies_description":"Bu çerezler, web sitemizde veya Xsolla Ürünlerinde yaptığınız seçimleri hatırlamamızı sağlar. Bu sayede, gelişmiş ve kişiselleştirilmiş özellikler sağlarız. Örneğin, belirli bir sayfayı sizin için özelleştirebilir veya talebiniz üzerine başka hizmetler sağlayabiliriz. <br/> Bu çerezleri kabul etmezseniz, bu özelliklerin bazıları veya tamamı düzgün çalışmayabilir.","functional_cookies_link_name":"Fonksiyonel çerezler listesi","opt_out_consent":"Xsolla\'nın kişisel bilgilerimi {xsollaGroupConsentLink} dahilinde paylaşabileceğini anlıyorum.","opt_out_consent_link_name":"Xsolla grubu","opt_out_description":"İzninizi dilediğiniz zaman değiştirme veya geri çekme hakkına sahipsiniz. İznin geri çekilmesi, geçmiş işlemlerin yasallığını etkilemez, çünkü bunlar, önceden verilmiş olan izne dayanmaktadır.","opt_out_title":"Vazgeç","privacy_policy_link_name":"Gizlilik Politikası","return_button":"Geri Git","save_and_close_button":"Kaydet ve kapat","saving_button":"Kaydediyor...","settings_button":"Ayarlar","settings_footer_description":"*Onay kutusu işaretliyse, seçiminizi başka bir Xsolla Ürünü için yapmışsınız demektir.","settings_title":"Gizlilik ayarları","targeting_cookies_checkbox":"Hedefleme çerezleri","targeting_cookies_description":"Bu çerezler, bu web sitesinde veya Xsolla Ürünlerinde ziyaret ettiğiniz sayfaları ve tıkladığınız bağlantıları kaydeder. Bu bilgileri, web sitemizi ve web sitemizde görüntülenen reklamları ilgi alanlarınıza daha uygun hale getirmek için kullanırız. Bu bilgileri, bu amaçla üçüncü taraflarla da paylaşabiliriz. <br/> Bu çerezleri kabul etmezseniz reklamları yine de görmeye devam edersiniz, ancak bunlar ilgi alanlarınıza göre özelleştirilmiş olmayacaktır.","targeting_cookies_link_name":"Hedefleme çerezleri listesi","welcome_screen_allow_cookies":"Çerez kullanmayı kabul ediyorum","welcome_screen_data_processing":"Xsolla\'nın bana özelleştirilmiş hizmetler sunmak için {myPersonalDataTooltip} kullanmasına izin veriyorum","welcome_screen_description":"İzninizi, gizlilik ayarlarına geri dönerek dilediğiniz zaman değiştirebilir veya geri çekebilirsiniz.","welcome_screen_mobile_description":"\\"{acceptAllButtonText}\\" butonunu tıklayarak bize kişisel verilerinizi işleme ve tüm çerezleri ayarlama konusunda izin vermiş olursunuz. Alternatif olarak, tercihlerinizi Ayarlar\'da özelleştirebilirsiniz.","welcome_screen_title":"Gizliliğinize saygı duyuyoruz"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"Chấp nhận tất cả","analytical_performance_cookies_checkbox":"Cookie hiệu năng và phân tích","analytical_performance_cookies_description":"Các cookie này thu thập thông tin về quá trình bạn sử dụng trang web này và cho phép chúng tôi cải thiện vận hành trang web, cũng như nâng cao trải nghiệm của bạn với các sản phẩm của Xsolla. Ví dụ, chúng tôi có thể đảm bảo bạn sẽ dễ dàng tìm được thông tin mình cần hoặc ghi nhận các khó khăn bạn có thể gặp phải. <br/> Nếu bạn không chấp nhận các cookie này, chúng tôi sẽ không biết thời điểm bạn truy cập trang web của chúng tôi và sẽ không thể theo dõi hiệu năng của nó.","analytical_performance_cookies_link_name":"Danh sách cookie hiệu năng và phân tích","cookie_policy_link_name":"Chính sách Cookie","data_processing_consent_checkbox":"Chấp thuận cho phép xử lý dữ liệu","data_processing_consent_customer_checkbox_tooltip":"Trang này vận hành trên các sản phẩm của Xsolla. Xsolla quản lý dữ liệu cá nhân của bạn, chẳng hạn như họ tên hoặc biệt danh, địa chỉ email, địa chỉ IP, thông tin vị trí địa lý, và mã người dùng duy nhất.","data_processing_consent_description":"Chúng tôi cần sự chấp thuận của bạn để sử dụng dữ liệu và thông tin cá nhân của bạn thu được từ cookie để cung cấp các dịch vụ tùy biến cho bạn. Nếu bạn quyết định ngừng cho phép xử lý dữ liệu, chúng tôi sẽ chỉ sử dụng dữ liệu thu được từ các cookie thiết yếu và bạn sẽ không thể trải nghiệm tốt nhất các dịch vụ của chúng tôi.","data_processing_consent_my_personal_data":"dữ liệu cá nhân của tôi","data_processing_consent_partner_checkbox_tooltip":"Trang này vận hành trên các sản phẩm của Xsolla. Xsolla quản lý dữ liệu cá nhân của bạn, chẳng hạn như danh tính và thông tin liên lạc hoặc dữ liệu kinh doanh do bạn cung cấp trong Tài khoản Nhà phát hành.","essential_cookies_checkbox":"Cookie thiết yếu","essential_cookies_description":"Các cookie này là thiết yếu cho trang web của chúng tôi và các sản phẩm của Xsolla để vận hành và không thể bị tắt. Ví dụ, chúng bao gồm cookie cho phép bạn đăng nhập tài khoản cá nhân của bạn và cookie cung cấp luồng xử lý giao dịch thanh toán chính xác và hỗ trợ khách hàng. <br/> Bạn có thể thiết lập trình duyệt chặn hoặc thông báo cho bạn về các cookie này, nhưng khi đó, một số thành phần trang web này có thể không hoạt động như mong đợi.","essential_cookies_list_link_name":"Danh sách cookie thiết yếu","essential_cookies_tooltip":"Loại cookie này không thể bị tắt.","functional_cookies_checkbox":"Cookie theo chức năng","functional_cookies_description":"Các cookie này cho phép chúng tôi ghi nhớ các lựa chọn của bạn trên trang web của chúng tôi hoặc các sản phẩm của Xsolla. Điều này giúp chúng tôi cung cấp các tính năng nâng cao và cá nhân hóa. <br/> Nếu bạn không chấp nhận các cookie này, một số hoặc tất cả các tính năng này có thể không hoạt động như mong đợi.","functional_cookies_link_name":"Danh sách cookie theo tính năng","opt_out_consent":"Tôi hiểu rằng Xsolla có thể chia sẻ dữ liệu cá nhân của tôi trong khuôn khổ {xsollaGroupConsentLink}.","opt_out_consent_link_name":"Nhóm Xsolla","opt_out_description":"Bạn có quyền thay đổi hoặc thu hồi chấp thuận vào bất cứ lúc nào. Việc thu hồi chấp thuận sẽ không ảnh hưởng tính hợp pháp của việc xử lý dữ liệu trong quá khứ vì được dựa trên sự đồng ý trước đó của bạn.","opt_out_title":"Không tham gia","privacy_policy_link_name":"Chính sách Bảo mật","return_button":"Quay lại","save_and_close_button":"Lưu và đóng","saving_button":"Đang lưu...","settings_button":"Thiết lập","settings_footer_description":"*Nếu ô này được chọn, có thể bạn đã chọn trong một sản phẩm Xsolla khác.","settings_title":"Thiết lập bảo mật","targeting_cookies_checkbox":"Cookie định vị","targeting_cookies_description":"Các cookie này ghi nhớ các trang bạn đã truy cập trên trang web này hoặc trong các sản phẩm của Xsolla và các đường dẫn bạn đã nhấn. Chúng tôi sử dụng thông tin này để trang web của chúng tôi và các quảng cáo hiển thị có liên quan hơn với sở thích của bạn. Chúng tôi cũng có thể chia sẻ thông tin này với các bên thứ ba vì mục đích này. <br/> Nếu bạn không chấp nhận các cookie này, bạn vẫn sẽ thấy quảng cáo, nhưng chúng sẽ không được điều chỉnh theo sở thích của bạn.","targeting_cookies_link_name":"Danh sách cookie định vị","welcome_screen_allow_cookies":"Tôi đồng ý sử dụng cookie","welcome_screen_data_processing":"Tôi đồng ý để Xsolla sử dụng {myPersonalDataTooltip} để cung cấp các dịch vụ tùy chỉnh cho tôi","welcome_screen_description":"Bạn có thể thay đổi hoặc thu hồi chấp thuận vào bất cứ lúc nào ở trang thiết lập Bảo mật.","welcome_screen_mobile_description":"Khi nhấn \\"{acceptAllButtonText}\\", bạn đồng ý cho phép chúng tôi xử lý dữ liệu cá nhân của bạn và thiết lập tất cả cookie. Hoặc bạn có thể tùy chỉnh lựa chọn của bạn tại trang Thiết lập.","welcome_screen_title":"Chúng tôi tôn trọng quyền riêng tư của bạn"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"接受全部","analytical_performance_cookies_checkbox":"分析和效能性Cookie","analytical_performance_cookies_description":"这些Cookie收集您对本网站的使用信息，以便我们改进其运行方式及提升您在使用其他艾克索拉产品时的体验，例如让您轻松找到想要的信息或记录您在使用中遇到的问题。<br/>如果不接受这些Cookie，我们将无法知道您对我们网站的访问且无法监控网站的效能。","analytical_performance_cookies_link_name":"分析和效能性Cookie列表","cookie_policy_link_name":"Cookie政策","data_processing_consent_checkbox":"数据处理同意书","data_processing_consent_customer_checkbox_tooltip":"本网站基于艾克索拉产品运行。艾克索拉将管理您的个人数据，例如您的全名或昵称、邮箱地址、IP地址、地理位置信息及唯一用户ID等。","data_processing_consent_description":"我们需要您的同意才能使用您的个人数据以及Cookie中的信息为您提供个性化服务。如果不选择同意，则我们只会使用必要Cookie中的信息，您将无法充分享受我们的服务。","data_processing_consent_my_personal_data":"我的个人数据","data_processing_consent_partner_checkbox_tooltip":"本网站基于艾克索拉产品运行。艾克索拉将管理您的个人数据，例如您在发布商帐户中提供的身份及联系信息或业务详情等。","essential_cookies_checkbox":"必要Cookie","essential_cookies_description":"这些是让我们的网站及艾克索拉产品正常运行且不被关闭所必需的Cookie，包括让您登录个人帐户的Cookie，以及提供正确支付处理过程和客户支持的Cookie等。<br/>您可以设置您的浏览器拦截或提醒您这些Cookie，但这样会导致本网站的部分内容无法如预期运行。","essential_cookies_list_link_name":"必要Cookie列表","essential_cookies_tooltip":"此类Cookie无法关闭。","functional_cookies_checkbox":"功能性Cookie","functional_cookies_description":"这些Cookie让我们可以记住您在本网站或艾克索拉产品中所作的选择。这可以帮助我们提供强化及个性化功能，例如为您定制某个页面或根据您的请求提供其他服务等。<br/>如果不接受这些Cookie，这些功能中的部分或全部将无法正常运行。","functional_cookies_link_name":"功能性Cookie列表","opt_out_consent":"我了解艾克索拉可能会在{xsollaGroupConsentLink}内分享我的个人数据。","opt_out_consent_link_name":"艾克索拉集团","opt_out_description":"您有权随时更改或撤销您的同意。撤销不影响之前处理的合法性，因为那是基于您之前的同意进行的处理。","opt_out_title":"选择退出","privacy_policy_link_name":"隐私政策","return_button":"返回","save_and_close_button":"保存并关闭","saving_button":"正在保存...","settings_button":"设置","settings_footer_description":"*如果复选框已勾选，说明您已在其他艾克索拉产品中进行过选择。","settings_title":"隐私设置","targeting_cookies_checkbox":"定向性Cookie","targeting_cookies_description":"这些Cookie记录您在本网站或艾克索拉产品中访问过的页面及点击过的链接。我们使用这些信息让网站内容以及上面的广告更符合您的兴趣。我们也可能出于此目的与第三方共享这些信息。<br/>如果不接受这些Cookie，您仍将会看到广告，但不会针对您的兴趣选择性提供。","targeting_cookies_link_name":"定向性Cookie列表","welcome_screen_allow_cookies":"我同意使用Cookie","welcome_screen_data_processing":"我同意艾克索拉使用{myPersonalDataTooltip}向我提供定制服务","welcome_screen_description":"您可以随时返回隐私设置更改或撤销您的同意。","welcome_screen_mobile_description":"点击“{acceptAllButtonText}”即表示您同意对您的个人数据的处理并打开所有Cookie。否则，您也可以在设置中根据偏好进行自定义。","welcome_screen_title":"我们尊重您的隐私"}'
            );
        },
        function (e) {
            e.exports = JSON.parse(
                '{"accept_all_button":"全部接受","analytical_performance_cookies_checkbox":"分析型 Cookie 和績效型 Cookie","analytical_performance_cookies_description":"收集以上 Cookie，同時強化其他愛索拉產品體驗。比方說，我們能確保您能輕鬆找到想要的東西，或解決手上的難題。<br/> 如果您不接受以上 Cookie，在您瀏覽網站時，我們就不會知道，也無法監控其績效。","analytical_performance_cookies_link_name":"分析型 Cookie 和績效型 Cookie 清單","cookie_policy_link_name":"Cookie 政策","data_processing_consent_checkbox":"資料處理內容","data_processing_consent_customer_checkbox_tooltip":"此網站是由愛索拉產品負責架設。愛索拉會為您管理像是暱稱、電子郵件地址、IP 位址、地理資訊和唯一使用者識別碼這類個資。","data_processing_consent_description":"我們需要取得您的同意，才能利用 Cookie 來使用您的個資和資訊，便可為您提供自訂服務。如果您決定要退出資料處理，我們只會利用基本 Cookie 來收集資料，您就無法體驗完整的線上服務。","data_processing_consent_my_personal_data":"我的個資","data_processing_consent_partner_checkbox_tooltip":"此網站是由愛索拉產品負責架設。愛索拉會為您管理像是識別碼和連絡人，或是由發佈商帳戶提供給您的商家詳細資料這類個資。","essential_cookies_checkbox":"基本 Cookie","essential_cookies_description":"官方網站和愛索拉產品會需要使用到 Cookie，才能運作，系統無法關閉。比方說，對方會啟用 Cookie，讓您可以登入個人帳戶，Cookie 會提供正確付款處理流程和客戶支援。 <br/> 您可以將瀏覽器設定成封鎖 Cookie，或提醒您有關以上 Cookie，但這樣做就會讓部分網站無法如期正常運作。","essential_cookies_list_link_name":"基本 Cookie 清單","essential_cookies_tooltip":"無法關閉這類 Cookie。","functional_cookies_checkbox":"功能型 Cookie","functional_cookies_description":"以上 Cookie 讓我方可以記住您在網站上的選項，或瀏覽過哪些愛索拉產品。這能協助我方增強個人化功能。比方說，我們可以為您自訂特定網頁，或視您的要求，提供其他服務。<br/>如果您不接受以上 Cookie，上述部分或全部功能將無法正常運作。","functional_cookies_link_name":"功能型 Cookie 清單","opt_out_consent":"我了解愛索拉可能會在下方 {xsollaGroupConsentLink}與人共用我的個資。","opt_out_consent_link_name":"愛索拉集團","opt_out_description":"您有權隨時變更，或取消同意。由於一切協議都是比照事前同意，取消同意將不會影響到過去處理資料之合法性。","opt_out_title":"退出","privacy_policy_link_name":"隱私權政策","return_button":"返回","save_and_close_button":"儲存並關閉","saving_button":"正在儲存...","settings_button":"設定","settings_footer_description":"*如果已選取此核取方塊，即表示您心中已拿定主意，要選擇其他愛索拉產品。","settings_title":"隱私權設定","targeting_cookies_checkbox":"目標性 Cookie","targeting_cookies_description":"以上 Cookie 會記錄您瀏覽過的網頁，或是愛索拉產品，還有已追蹤連結。我們會使用此資訊來架設網站，讓投放廣告更符合您的興趣。為達此目的，我們也可能會與第三方共用此資訊。<br/> 如果您不接受以上 Cookie，就無法看見廣告，但系統也不會依興趣為您量身訂做廣告。","targeting_cookies_link_name":"目標性 Cookie 清單","welcome_screen_allow_cookies":"本人同意使用 Cookie","welcome_screen_data_processing":"我同意讓愛索拉使用{myPersonalDataTooltip}，藉此提供自訂服務","welcome_screen_description":"您可以隨時變更，或取消同意，只要返回隱私權設定即可。","welcome_screen_mobile_description":"一旦按下 [{acceptAllButtonText}]，即表示您同意讓我方處理您的個資，並設定 Cookie。或者，您可以到設定下方自訂喜好設定。","welcome_screen_title":"我們尊重您的隱私"}'
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
                        (o = z("button")), (t = x("✕")), T(o, c), I(o, "svelte-avo2ss", !0);
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
                        8194 & e.$$.dirty && t(14, (m = Object.keys(s).every((e) => true === s[e]) && (null === a.consent_state || !p))),
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
                    x = Object.keys(z).every((e) => true === z[e]) && null === $.consent_state;
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
				console.log('initial');
                console.log(t);
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
					console.log('second');
                    console.log(t);
                    o(null, t);
                });
            }
        },
    ]);
});
