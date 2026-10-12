import { d as createAstro, c as createComponent, b as addAttribute, a as renderTemplate, r as renderComponent, m as maybeRenderHead, f as renderHead, e as renderSlot } from './astro/server_BYpsH1Ip.mjs';
import 'piccolore';
/* empty css                         */
import { a as $$Font, $ as $$Image } from './_astro_assets_QcFncbZ7.mjs';
import { b as SITE_DESCRIPTION, D as DEFAULT_OG_IMAGE, c as SITE_TITLE_AR, d as SITE_TITLE, g as SITE_LOCALES, T as TWITTER_HANDLE, a as SITE_DESCRIPTION_AR, S as SITE_BRAND_AR, B as BOOKING_URL, M as MAIN_SITE_LINKS, C as CONTACT_EMAIL, h as SITE_BRAND, A as APP_LINKS, i as SOCIAL_LINKS } from './consts_BqY5v2Pi.mjs';
import { k as defaultLang, l as languages, h as homeHref, u as useTranslations } from './blog_BWAOoHv7.mjs';

const $$Astro$3 = createAstro("https://wfrlee.com");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const {
    title,
    lang,
    description = SITE_DESCRIPTION,
    image = DEFAULT_OG_IMAGE,
    type = "website",
    canonicalURL,
    alternateUrl,
    publishedTime,
    modifiedTime,
    author,
    noindex = false
  } = Astro2.props;
  const siteName = lang === "ar" ? SITE_TITLE_AR : SITE_TITLE;
  const pageTitle = title === siteName ? title : `${title} | ${siteName}`;
  const canonical = canonicalURL ? new URL(canonicalURL, Astro2.site) : new URL(Astro2.url.pathname, Astro2.site);
  const alternate = alternateUrl ? new URL(alternateUrl, Astro2.site) : void 0;
  const xDefault = lang === defaultLang ? canonical : alternate;
  const ogImage = new URL(image, Astro2.site);
  const ogUrl = new URL(Astro2.url.pathname, Astro2.site);
  const otherLang = lang === "en" ? "ar" : "en";
  const rssUrl = new URL(lang === defaultLang ? "rss.xml" : `${lang}/rss.xml`, Astro2.site);
  return renderTemplate`<!-- Global metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico" sizes="any"><!-- Feeds & sitemap discovery --><link rel="sitemap" type="application/xml" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml"${addAttribute(`${siteName} (${languages[lang]})`, "title")}${addAttribute(rssUrl, "href")}><!-- Language alternates --><link rel="alternate"${addAttribute(lang, "hreflang")}${addAttribute(canonical, "href")}>${alternate && renderTemplate`<link rel="alternate"${addAttribute(otherLang, "hreflang")}${addAttribute(alternate, "href")}>`}${alternate && xDefault && renderTemplate`<link rel="alternate" hreflang="x-default"${addAttribute(xDefault, "href")}>`}<!-- Performance: preload the webfont that paints first to protect LCP -->${renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-sans", "preload": true })}<!-- Primary meta tags --><title>${pageTitle}</title><meta name="description"${addAttribute(description, "content")}><meta name="author"${addAttribute(author ?? siteName, "content")}>${noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}<!-- Canonical URL --><link rel="canonical"${addAttribute(canonical, "href")}><!-- Open Graph --><meta property="og:type"${addAttribute(type, "content")}><meta property="og:site_name"${addAttribute(siteName, "content")}><meta property="og:locale"${addAttribute(SITE_LOCALES[lang], "content")}><meta property="og:locale:alternate"${addAttribute(SITE_LOCALES[otherLang], "content")}><meta property="og:url"${addAttribute(ogUrl, "content")}><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:image:alt"${addAttribute(title, "content")}>${publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime.toISOString(), "content")}>`}${modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime.toISOString(), "content")}>`}${author && renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`}<!-- Twitter / X --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site"${addAttribute(TWITTER_HANDLE, "content")}><meta name="twitter:title"${addAttribute(pageTitle, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImage, "content")}>`;
}, "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/components/seo/BaseHead.astro", void 0);

const logo = new Proxy({"src":"/_astro/wfrlee-logo.96DRj3XK.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/assets/wfrlee-logo.png";
							}
							
							return target[name];
						}
					});

const jeddahImage = new Proxy({"src":"/_astro/city-jeddah.CGbdH32d.jpg","width":1920,"height":1284,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/assets/city-jeddah.jpg";
							}
							
							return target[name];
						}
					});

const riyadhImage = new Proxy({"src":"/_astro/city-riyadh.BQVcQxia.jpg","width":1920,"height":1080,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/assets/city-riyadh.jpg";
							}
							
							return target[name];
						}
					});

const dammamImage = new Proxy({"src":"/_astro/city-dammam.1Owy4Xkx.jpg","width":1920,"height":1440,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/assets/city-dammam.jpg";
							}
							
							return target[name];
						}
					});

const alKhobarImage = new Proxy({"src":"/_astro/city-al-khobar.BeAp1XxQ.jpg","width":1920,"height":1389,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/assets/city-al-khobar.jpg";
							}
							
							return target[name];
						}
					});

const jazanImage = new Proxy({"src":"/_astro/city-jazan.DoCbGYMW.jpg","width":1920,"height":1280,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/assets/city-jazan.jpg";
							}
							
							return target[name];
						}
					});

const alMadinahImage = new Proxy({"src":"/_astro/city-al-madinah.fcVZaCne.jpg","width":1920,"height":1280,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/assets/city-al-madinah.jpg";
							}
							
							return target[name];
						}
					});

const cities = [
  {
    slug: "jeddah",
    name: { en: "Jeddah", ar: "جدة" },
    region: { en: "Makkah Province", ar: "منطقة مكة المكرمة" },
    airport: { code: "JED", name: { en: "King Abdulaziz International Airport", ar: "مطار الملك عبدالعزيز الدولي" } },
    startingPrice: 70,
    tagline: {
      en: "Red Sea stopovers and Corniche layovers, by the hour.",
      ar: "توقفات البحر الأحمر والكورنيش، بالساعة."
    },
    intro: {
      en: "Jeddah is the Kingdom's gateway to the Red Sea and one of its busiest transit points. Whether you're stuck between flights at King Abdulaziz International or arriving late off a cruise, a Wfrlee hourly room near the Corniche lets you shower, rest and reset without paying for a full night.",
      ar: "جدة هي بوابة المملكة إلى البحر الأحمر وأحد أكثر نقاط الترانزيت ازدحامًا. سواء كنت عالقًا بين الرحلات في مطار الملك عبدالعزيز أو وصلت متأخرًا من رحلة بحرية، تتيح لك غرفة وفرلي.كوم بالساعة قرب الكورنيش الاستحمام والراحة واستعادة نشاطك دون دفع سعر ليلة كاملة."
    },
    highlights: [
      {
        title: { en: "King Abdulaziz International (JED)", ar: "مطار الملك عبدالعزيز الدولي (JED)" },
        text: {
          en: "The terminals are spread far apart — a private room nearby beats a hard airport floor between connections.",
          ar: "صالات المطار متباعدة، وغرفة خاصة قريبة أفضل من الانتظار على أرض المطار بين الرحلات."
        }
      },
      {
        title: { en: "Jeddah Corniche", ar: "كورنيش جدة" },
        text: {
          en: "Book a few hours to enjoy the waterfront, then nap before your next leg of the journey.",
          ar: "احجز بضع ساعات للاستمتاع بالواجهة البحرية ثم خذ قسطًا من الراحة قبل رحلتك التالية."
        }
      },
      {
        title: { en: "Historic Al-Balad", ar: "البلد التاريخي" },
        text: {
          en: "Explore the UNESCO-listed old town, then recharge in a nearby micro-stay.",
          ar: "استكشف البلدة القديمة المدرجة في قائمة اليونسكو ثم استعد طاقتك في إقامة قصيرة قريبة."
        }
      }
    ],
    image: jeddahImage,
    imageAlt: {
      en: "Jeddah waterfront and Red Sea corniche",
      ar: "واجهة جدة البحرية وكورنيش البحر الأحمر"
    },
    tags: ["jeddah", "layover", "airport"]
  },
  {
    slug: "riyadh",
    name: { en: "Riyadh", ar: "الرياض" },
    region: { en: "Riyadh Province", ar: "منطقة الرياض" },
    airport: { code: "RUH", name: { en: "King Khalid International Airport", ar: "مطار الملك خالد الدولي" } },
    startingPrice: 100,
    tagline: {
      en: "Business trips, meetings and long layovers in the capital.",
      ar: "رحلات العمل والاجتماعات والتوقفات الطويلة في العاصمة."
    },
    intro: {
      en: "As the capital and business hub of Saudi Arabia, Riyadh runs on tight schedules. Between a morning meeting at KAFD and an evening flight out of King Khalid International, a Wfrlee hourly room gives you a quiet place to work, freshen up or sleep — no wasted day rate.",
      ar: "بصفتها العاصمة ومركز الأعمال في السعودية، تعمل الرياض وفق جداول ضيقة. بين اجتماع صباحي في مركز الملك عبدالله المالي ورحلة مسائية من مطار الملك خالد الدولي، تمنحك غرفة وفرلي.كوم بالساعة مكانًا هادئًا للعمل أو الاستحمام أو النوم دون إهدار سعر يوم كامل."
    },
    highlights: [
      {
        title: { en: "King Khalid International (RUH)", ar: "مطار الملك خالد الدولي (RUH)" },
        text: {
          en: "Long layovers become productive when you have a private room to work or rest near the airport.",
          ar: "تتحول التوقفات الطويلة إلى وقت مفيد عندما تتوفر غرفة خاصة للعمل أو الراحة قرب المطار."
        }
      },
      {
        title: { en: "KAFD & Olaya business districts", ar: "مركز الملك عبدالله المالي والعليا" },
        text: {
          en: "Book a micro-stay between meetings instead of commuting across the city.",
          ar: "احجز إقامة قصيرة بين الاجتماعات بدلًا من التنقل عبر المدينة."
        }
      },
      {
        title: { en: "Boulevard & city events", ar: "البوليفارد وفعاليات المدينة" },
        text: {
          en: "Stay close to the action and rest by the hour after a long night out.",
          ar: "ابقَ قريبًا من الفعاليات وارتَح بالساعة بعد ليلة طويلة."
        }
      }
    ],
    image: riyadhImage,
    imageAlt: {
      en: "Riyadh skyline at night",
      ar: "أفق مدينة الرياض ليلًا"
    },
    tags: ["riyadh", "layover", "airport"]
  },
  {
    slug: "dammam",
    name: { en: "Dammam", ar: "الدمام" },
    region: { en: "Eastern Province", ar: "المنطقة الشرقية" },
    airport: { code: "DMM", name: { en: "King Fahd International Airport", ar: "مطار الملك فهد الدولي" } },
    startingPrice: 90,
    tagline: {
      en: "Eastern Province gateways and Gulf-coast stopovers.",
      ar: "بوابات المنطقة الشرقية وتوقفات ساحل الخليج."
    },
    intro: {
      en: "Dammam anchors Saudi Arabia's Eastern Province and its vast King Fahd International Airport. Travellers connecting onward to Al Khobar, Dhahran or Bahrain can use a Wfrlee hourly room to rest, shower and reset close to the airport.",
      ar: "تُعد الدمام محور المنطقة الشرقية في السعودية ومطار الملك فهد الدولي الشاسع. يمكن للمسافرين المتجهين إلى الخبر أو الظهران أو البحرين استخدام غرفة وفرلي.كوم بالساعة للراحة والاستحمام واستعادة النشاط قرب المطار."
    },
    highlights: [
      {
        title: { en: "King Fahd International (DMM)", ar: "مطار الملك فهد الدولي (DMM)" },
        text: {
          en: "One of the largest airports in the world — a nearby room saves you a long transit.",
          ar: "من أكبر مطارات العالم، وغرفة قريبة توفّر عليك عناء الترانزيت الطويل."
        }
      },
      {
        title: { en: "Corniche & Half Moon Bay", ar: "الكورنيش وخليج نصف القمر" },
        text: {
          en: "Book a few daylight hours to unwind by the Gulf before heading back.",
          ar: "احجز بضع ساعات نهارية للاسترخاء قرب الخليج قبل العودة."
        }
      },
      {
        title: { en: "Eastern Province business", ar: "أعمال المنطقة الشرقية" },
        text: {
          en: "Perfect for short work trips where you only need a room for a few hours.",
          ar: "مثالية لرحلات العمل القصيرة التي تحتاج فيها غرفة لبضع ساعات فقط."
        }
      }
    ],
    image: dammamImage,
    imageAlt: {
      en: "Downtown Dammam city centre",
      ar: "وسط مدينة الدمام"
    },
    tags: ["dammam", "khobar", "layover"]
  },
  {
    slug: "al-khobar",
    name: { en: "Al Khobar", ar: "الخبر" },
    region: { en: "Eastern Province", ar: "المنطقة الشرقية" },
    airport: { code: "DMM", name: { en: "King Fahd International Airport (nearby)", ar: "مطار الملك فهد الدولي (بالقرب)" } },
    startingPrice: 100,
    tagline: {
      en: "Waterfront cafés and Gulf views, one micro-stay away.",
      ar: "مقاهي الواجهة البحرية وإطلالات الخليج على بعد إقامة قصيرة."
    },
    intro: {
      en: "Al Khobar's Corniche looks across the Gulf toward Bahrain, and its cafés and restaurants make it a favourite weekend stop. When your schedule is short, a Wfrlee hourly room lets you enjoy the city and still have somewhere private to rest.",
      ar: "يطل كورنيش الخبر على الخليج باتجاه البحرين، وتجعل مقاهيها ومطاعمها منها وجهة نهاية أسبوع مفضلة. عندما يكون وقتك ضيقًا، تتيح لك غرفة وفرلي.كوم بالساعة الاستمتاع بالمدينة مع وجود مكان خاص للراحة."
    },
    highlights: [
      {
        title: { en: "Khobar Corniche", ar: "كورنيش الخبر" },
        text: {
          en: "Take in the sea views, then rest in a nearby hourly room.",
          ar: "استمتع بإطلالات البحر ثم ارتَح في غرفة بالساعة قريبة."
        }
      },
      {
        title: { en: "King Fahd Causeway to Bahrain", ar: "جسر الملك فهد إلى البحرين" },
        text: {
          en: "Break up a cross-border drive with a few hours of rest and a shower.",
          ar: "قسّم رحلة عبور الحدود ببضع ساعات من الراحة والاستحمام."
        }
      },
      {
        title: { en: "Cafés & dining scene", ar: "المقاهي والمطاعم" },
        text: {
          en: "Stay in the heart of the city and sleep by the hour instead of by the night.",
          ar: "ابقَ في قلب المدينة ونم بالساعة بدلًا من الليلة الكاملة."
        }
      }
    ],
    image: alKhobarImage,
    imageAlt: {
      en: "Al Khobar corniche along the Gulf coast",
      ar: "كورنيش الخبر على ساحل الخليج"
    },
    tags: ["khobar", "dammam", "short-stay"]
  },
  {
    slug: "jazan",
    name: { en: "Jazan", ar: "جازان" },
    region: { en: "Jazan Province", ar: "منطقة جازان" },
    airport: { code: "GIZ", name: { en: "King Abdullah bin Abdulaziz Airport", ar: "مطار الملك عبدالله بن عبدالعزيز" } },
    startingPrice: 90,
    tagline: {
      en: "Gateway to the Farasan Islands and the Tihama coast.",
      ar: "بوابة جزر فرسان وساحل تهامة."
    },
    intro: {
      en: "Jazan sits on the Red Sea in the south-west, the launch point for the Farasan Islands and the green Tihama mountains. A Wfrlee hourly stay is ideal when you are passing through GIZ airport or breaking up a long coastal drive.",
      ar: "تقع جازان على البحر الأحمر في الجنوب الغربي، وهي نقطة الانطلاق إلى جزر فرسان وجبال تهامة الخضراء. تُعد إقامة وفرلي.كوم بالساعة مثالية عند المرور عبر مطار جازان أو تقسيم رحلة برية ساحلية طويلة."
    },
    highlights: [
      {
        title: { en: "Ferries to the Farasan Islands", ar: "عبارات جزر فرسان" },
        text: {
          en: "Rest before an early ferry with a room booked by the hour.",
          ar: "ارتَح قبل العبارة الصباحية بغرفة تُحجز بالساعة."
        }
      },
      {
        title: { en: "Tihama beaches & mountains", ar: "شواطئ وجبال تهامة" },
        text: {
          en: "Fresh up between day trips without committing to a full night.",
          ar: "استعد نشاطك بين الرحلات دون الالتزام بليلة كاملة."
        }
      },
      {
        title: { en: "Jazan city & port", ar: "مدينة جازان والميناء" },
        text: {
          en: "A practical pit-stop for business and transit travellers alike.",
          ar: "محطة عملية لمسافري العمل والترانزيت على حد سواء."
        }
      }
    ],
    image: jazanImage,
    imageAlt: {
      en: "Ottoman fort on the Farasan Islands, Jazan",
      ar: "قلعة عثمانية في جزر فرسان بجازان"
    },
    tags: ["jazan", "short-stay", "layover"]
  },
  {
    slug: "al-madinah",
    name: { en: "Al Madinah", ar: "المدينة المنورة" },
    region: { en: "Madinah Province", ar: "منطقة المدينة المنورة" },
    airport: { code: "MED", name: { en: "Prince Mohammad bin Abdulaziz International Airport", ar: "مطار الأمير محمد بن عبدالعزيز الدولي" } },
    startingPrice: 90,
    tagline: {
      en: "Quick stopovers near the Prophet’s Mosque and MED airport.",
      ar: "توقفات سريعة قرب المسجد النبوي ومطار المدينة."
    },
    intro: {
      en: "Al Madinah welcomes millions of visitors each year, and Prince Mohammad bin Abdulaziz International is a common transit stop. For a short visit, prayer or onward connection, a Wfrlee hourly room offers a clean, private space to rest close to the city.",
      ar: "ترحّب المدينة المنورة بملايين الزوار سنويًا، ويُعد مطار الأمير محمد بن عبدالعزيز الدولي محطة ترانزيت شائعة. لزيارة قصيرة أو صلاة أو رحلة متابعة، توفر غرفة وفرلي.كوم بالساعة مساحة نظيفة وخاصة للراحة قريبة من المدينة."
    },
    highlights: [
      {
        title: { en: "Prince Mohammad bin Abdulaziz (MED)", ar: "مطار الأمير محمد بن عبدالعزيز (MED)" },
        text: {
          en: "Rest and pray between flights without leaving the connection to chance.",
          ar: "ارتَح وصلِّ بين الرحلات دون ترك موعد رحلتك للصدفة."
        }
      },
      {
        title: { en: "Near the Prophet’s Mosque", ar: "قرب المسجد النبوي" },
        text: {
          en: "Book a few hours to freshen up before or after your visit.",
          ar: "احجز بضع ساعات للاستحمام قبل زيارتك أو بعدها."
        }
      },
      {
        title: { en: "Umrah & Ziyarah stopovers", ar: "توقفات العمرة والزيارة" },
        text: {
          en: "A practical place to sleep between rituals and travel days.",
          ar: "مكان عملي للنوم بين المناسك وأيام السفر."
        }
      }
    ],
    image: alMadinahImage,
    imageAlt: {
      en: "Aerial view of Al-Masjid An-Nabawi in Al Madinah",
      ar: "منظر جوي للمسجد النبوي في المدينة المنورة"
    },
    tags: ["madinah", "layover", "short-stay"]
  }
];
function citiesHref(lang) {
  return lang === defaultLang ? "/cities/" : `/${lang}/cities/`;
}
function cityHref(city, lang) {
  return `${citiesHref(lang)}${city.slug}/`;
}
function cityAlternateHref(city, lang) {
  return cityHref(city, lang === "en" ? "ar" : "en");
}

function pageHref(page, lang) {
  const prefix = lang === defaultLang ? "/" : `/${lang}/`;
  return `${prefix}${page}/`;
}
function pageAlternateHref(page, lang) {
  return pageHref(page, lang === "en" ? "ar" : "en");
}

const $$Astro$2 = createAstro("https://wfrlee.com");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const { lang, alternateUrl } = Astro2.props;
  const t = useTranslations(lang);
  const navLinks = [
    { href: homeHref(lang), label: t("nav.home") },
    { href: citiesHref(lang), label: t("nav.destinations") },
    { href: `${homeHref(lang)}#guides`, label: t("nav.guides") },
    { href: pageHref("about", lang), label: t("nav.about") },
    { href: pageHref("why-wfrlee", lang), label: t("nav.why") }
  ];
  const path = Astro2.url.pathname;
  const isActive = (href) => {
    if (href.includes("#")) return false;
    if (href === homeHref(lang)) return path === homeHref(lang);
    return path.startsWith(href);
  };
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur"> <div class="container-page flex h-16 items-center justify-between gap-4"> <a${addAttribute(homeHref(lang), "href")} class="flex items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"> ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "Wfrlee logo", "width": 36, "height": 36, "loading": "eager", "class": "h-9 w-9 flex-none rounded-lg object-contain" })} <span class="flex flex-col leading-tight"> ${lang === "ar" ? renderTemplate`<span lang="ar" dir="rtl" class="text-lg font-bold tracking-tight text-slate-900"> ${SITE_BRAND_AR} </span>` : renderTemplate`<span class="text-lg font-bold tracking-tight text-slate-900">
Wfrlee<span class="text-brand-600">.com</span> </span>`} </span> <span class="sr-only">${lang === "ar" ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION}</span> </a> <nav aria-label="Primary" class="hidden lg:block"> <ul class="flex items-center gap-6"> ${navLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")}${addAttribute(isActive(link.href) ? "page" : void 0, "aria-current")}${addAttribute([
    "text-sm font-medium transition-colors hover:text-brand-700",
    isActive(link.href) ? "text-brand-700" : "text-slate-600"
  ], "class:list")}> ${link.label} </a> </li>`)} </ul> </nav> <div class="flex items-center gap-2"> ${alternateUrl && renderTemplate`<a${addAttribute(alternateUrl, "href")}${addAttribute(lang === "en" ? "ar" : "en", "lang")} class="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 sm:inline-flex"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"> <circle cx="12" cy="12" r="10"></circle> <path d="M2 12h20"></path> <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path> </svg> ${t("lang.switch")} </a>`} <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:inline-flex"> ${t("nav.book")} </a> <details class="group relative lg:hidden"> <summary class="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 text-slate-600 [&::-webkit-details-marker]:hidden"${addAttribute(t("nav.menu"), "aria-label")}> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"> <line x1="4" y1="7" x2="20" y2="7"></line> <line x1="4" y1="12" x2="20" y2="12"></line> <line x1="4" y1="17" x2="20" y2="17"></line> </svg> </summary> <div class="absolute end-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"> <ul class="flex flex-col"> ${navLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-700"> ${link.label} </a> </li>`)} <li class="mt-1 border-t border-slate-100 pt-1"> <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"> ${t("nav.book")} </a> </li> ${alternateUrl && renderTemplate`<li> <a${addAttribute(alternateUrl, "href")}${addAttribute(lang === "en" ? "ar" : "en", "lang")} class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-700"> ${t("lang.switch")} </a> </li>`} </ul> </div> </details> </div> </div> </header>`;
}, "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro("https://wfrlee.com");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const { lang } = Astro2.props;
  const t = useTranslations(lang);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const destinations = cities.map((city) => ({
    href: cityHref(city, lang),
    label: city.name[lang]
  }));
  const company = [
    { href: MAIN_SITE_LINKS.faq, label: t("footer.faq") },
    { href: MAIN_SITE_LINKS.offers, label: t("footer.offers") },
    { href: MAIN_SITE_LINKS.careers, label: t("footer.careers") },
    { href: pageHref("about", lang), label: t("footer.aboutUs") },
    { href: MAIN_SITE_LINKS.contact, label: t("footer.contactUs") },
    { href: pageHref("why-wfrlee", lang), label: t("footer.why") },
    { href: homeHref(lang), label: t("footer.wfrleeBlog") }
  ];
  const otherLinks = [
    { href: MAIN_SITE_LINKS.referral, label: t("footer.referral") },
    { href: MAIN_SITE_LINKS.privacy, label: t("footer.privacyPolicy") },
    { href: MAIN_SITE_LINKS.safety, label: t("footer.safety") },
    { href: MAIN_SITE_LINKS.terms, label: t("footer.terms") },
    { href: MAIN_SITE_LINKS.partner, label: t("footer.partner") }
  ];
  const linkClass = "text-sm text-brand-200 transition-colors hover:text-white";
  const headingClass = "text-sm font-semibold text-white";
  const isExternal = (href) => /^https?:\/\//.test(href);
  return renderTemplate`${maybeRenderHead()}<footer class="mt-16 bg-brand-800 text-brand-100"> <div class="border-b border-white/10"> <div class="container-page flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center"> <div> <p class="text-lg font-bold text-white">${t("footer.newsletterTitle")}</p> <p class="mt-1 text-sm text-brand-200">${t("footer.newsletterText")}</p> </div> <form class="w-full sm:w-auto" method="post"${addAttribute(t("footer.newsletterTitle"), "aria-label")}> <div class="flex flex-col gap-2 sm:flex-row"> <label class="sr-only" for="footer-email">${t("footer.emailPlaceholder")}</label> <input id="footer-email" type="email" name="email" required autocomplete="email"${addAttribute(t("footer.emailPlaceholder"), "placeholder")} class="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-brand-200 focus:border-white focus:outline-none sm:w-64"> <button type="submit" class="flex-none rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50"> ${t("footer.subscribe")} </button> </div> <p class="mt-2 text-xs text-brand-300">${t("footer.newsletterNote")}</p> </form> </div> </div> <div class="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12"> <div class="lg:col-span-4"> <a${addAttribute(homeHref(lang), "href")} class="flex items-center gap-2.5"> <span class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white p-1"> ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "Wfrlee logo", "width": 32, "height": 32, "class": "h-full w-full object-contain" })} </span> <span class="flex flex-col leading-tight"> ${lang === "ar" ? renderTemplate`<span lang="ar" dir="rtl" class="text-lg font-bold tracking-tight text-white"> ${SITE_BRAND_AR} </span>` : renderTemplate`<span class="text-lg font-bold tracking-tight text-white">
Wfrlee<span class="text-brand-200">.com</span> </span>`} </span> </a> <p class="mt-4 max-w-sm text-sm leading-relaxed text-brand-200">${t("footer.tagline")}</p> <div class="mt-6"> <h2${addAttribute(headingClass, "class")}>${t("footer.talkToUs")}</h2> <ul class="mt-3 space-y-2"> <li> <a${addAttribute(`mailto:${CONTACT_EMAIL}`, "href")}${addAttribute(linkClass, "class")}>${CONTACT_EMAIL}</a> </li> <li> <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-white hover:text-brand-100"> ${t("footer.book")} </a> </li> </ul> </div> <div class="mt-6"> <h2${addAttribute(headingClass, "class")}>${t("footer.getApp")}</h2> <div class="mt-3 flex flex-wrap gap-2"> <a${addAttribute(APP_LINKS.ios, "href")} target="_blank" rel="noopener noreferrer" class="rounded-lg border border-white/20 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"> ${t("footer.appIos")} </a> <a${addAttribute(APP_LINKS.android, "href")} target="_blank" rel="noopener noreferrer" class="rounded-lg border border-white/20 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"> ${t("footer.appAndroid")} </a> </div> </div> <div class="mt-6 flex flex-wrap gap-3"> ${SOCIAL_LINKS.map((social) => renderTemplate`<a${addAttribute(social.href, "href")} target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-brand-200 hover:text-white"> ${social.label} </a>`)} </div> </div> <nav${addAttribute(t("footer.destinations"), "aria-label")} class="lg:col-span-2"> <h2${addAttribute(headingClass, "class")}>${t("footer.destinations")}</h2> <ul class="mt-4 space-y-2"> ${destinations.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")}${addAttribute(linkClass, "class")}>${item.label}</a> </li>`)} <li> <a${addAttribute(citiesHref(lang), "href")}${addAttribute(linkClass, "class")}>${t("cities.back")}</a> </li> </ul> </nav> <nav${addAttribute(t("footer.company"), "aria-label")} class="lg:col-span-3"> <h2${addAttribute(headingClass, "class")}>${t("footer.company")}</h2> <ul class="mt-4 space-y-2"> ${company.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")}${addAttribute(isExternal(item.href) ? "_blank" : void 0, "target")}${addAttribute(isExternal(item.href) ? "noopener noreferrer" : void 0, "rel")}${addAttribute(linkClass, "class")}> ${item.label} </a> </li>`)} </ul> </nav> <nav${addAttribute(t("footer.otherLinks"), "aria-label")} class="lg:col-span-3"> <h2${addAttribute(headingClass, "class")}>${t("footer.otherLinks")}</h2> <ul class="mt-4 space-y-2"> ${otherLinks.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")}${addAttribute(isExternal(item.href) ? "_blank" : void 0, "target")}${addAttribute(isExternal(item.href) ? "noopener noreferrer" : void 0, "rel")}${addAttribute(linkClass, "class")}> ${item.label} </a> </li>`)} </ul> </nav> </div> <div class="border-t border-white/10"> <div class="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-brand-300 sm:flex-row"> <p>
© ${year} ${lang === "ar" ? `${SITE_BRAND_AR} \u2014 ${SITE_TITLE_AR}` : `${SITE_BRAND} \u2014 ${SITE_TITLE}`}. ${t("footer.rights")} </p> <p>${t("footer.tagline")}</p> </div> </div> </footer>`;
}, "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/components/Footer.astro", void 0);

const $$Astro = createAstro("https://wfrlee.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    lang,
    title,
    description,
    image,
    type,
    canonicalURL,
    alternateUrl,
    publishedTime,
    modifiedTime,
    author,
    noindex
  } = Astro2.props;
  const dir = lang === "ar" ? "rtl" : "ltr";
  return renderTemplate`<html${addAttribute(lang, "lang")}${addAttribute(dir, "dir")}> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "lang": lang, "description": description, "image": image, "type": type, "canonicalURL": canonicalURL, "alternateUrl": alternateUrl, "publishedTime": publishedTime, "modifiedTime": modifiedTime, "author": author, "noindex": noindex })}${renderHead()}</head> <body class="flex min-h-screen flex-col bg-white"> <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"> ${lang === "ar" ? "\u062A\u062E\u0637\u064E\u0651 \u0625\u0644\u0649 \u0627\u0644\u0645\u062D\u062A\u0648\u0649" : "Skip to content"} </a> ${renderComponent($$result, "Header", $$Header, { "lang": lang, "alternateUrl": alternateUrl })} <main id="main" class="flex-1"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "lang": lang })} </body></html>`;
}, "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, citiesHref as a, pageAlternateHref as b, cities as c, cityAlternateHref as d, cityHref as e, pageHref as p };
