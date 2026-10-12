import { escape } from 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { z } from 'zod';
import { r as removeBase, i as isRemotePath, p as prependForwardSlash } from './path_tbLlI_c1.mjs';
import { V as VALID_INPUT_FORMATS } from './consts_Bd-1c2lz.mjs';
import { A as AstroError, R as RenderUndefinedEntryError, c as createComponent, u as unescapeHTML, a as renderTemplate, U as UnknownContentCollectionError, g as renderUniqueStylesheet, h as renderScriptElement, i as createHeadAndContent, r as renderComponent } from './astro/server_BYpsH1Ip.mjs';
import 'piccolore';
import * as devalue from 'devalue';

const languages = {
  en: "English",
  ar: "العربية"
};
const defaultLang = "en";
const ui = {
  en: {
    "nav.home": "Home",
    "nav.guides": "Guides",
    "nav.destinations": "Destinations",
    "nav.about": "About",
    "nav.why": "Why Wfrlee",
    "nav.book": "Book a stay",
    "nav.menu": "Open menu",
    "home.kicker": "Wfrlee travel guides",
    "home.title": "The Wfrlee Blog",
    "home.intro": "Layover survival tips, transit know-how, and micro-stay advice for travelers across Saudi Arabia and the MENA region.",
    "home.latest": "Latest guide",
    "home.more": "More guides",
    "home.empty": "No published guides yet. Check back soon.",
    "home.ctaTitle": "Planning a stopover?",
    "home.ctaText": "Book a clean, private room by the hour from 70 SAR — save up to 75% over a full day rate.",
    "home.ctaButton": "Book a micro-stay",
    "card.read": "Read guide",
    "card.readTime": "min read",
    "article.by": "By",
    "article.updated": "Updated",
    "article.authorBlurb": "We write practical layover, transit, and micro-stay guides for travelers across Saudi Arabia and the MENA region.",
    "article.ctaTitle": "Need a room between flights?",
    "article.ctaText": "Book an hourly micro-stay from 70 SAR and turn your layover into real rest.",
    "article.ctaButton": "Find a room by the hour",
    "article.newer": "Newer guide",
    "article.older": "Older guide",
    "article.related": "Related guides",
    "cities.kicker": "Where we operate",
    "cities.title": "Wfrlee destinations",
    "cities.intro": "Hourly micro-stays in the cities where Wfrlee.com actually operates across Saudi Arabia. Pick a city to see layover tips and booking advice.",
    "cities.viewCity": "Explore this city",
    "cities.from": "From",
    "cities.perStay": "per stay",
    "cities.region": "Region",
    "cities.airport": "Airport",
    "cities.highlightsTitle": "Around the city",
    "cities.durationsTitle": "Book by the hour",
    "cities.durationsText": "Choose the number of hours that fits your schedule. Rates shown are the lowest advertised from each city.",
    "cities.relatedTitle": "Guides for this city",
    "cities.otherCities": "Other destinations",
    "cities.back": "All destinations",
    "cities.ctaTitle": "Ready to rest in {city}?",
    "cities.ctaText": "Book a clean, private room by the hour and pay only for the time you need.",
    "cities.ctaButton": "Book an hourly stay",
    "about.kicker": "About Wfrlee",
    "about.title": "Short stays, done right",
    "about.lead": "Wfrlee.com lets travelers book a clean, private hotel room by the hour — for 3, 6, 12 or 24 hours — instead of paying for a full night they will never use.",
    "about.storyTitle": "Why we exist",
    "about.storyText": "Airports, hospitals, business districts and long drives all create the same problem: you need a few hours of rest, not a whole night. Wfrlee was built to fill that gap with flexible, transparent hourly bookings across Saudi Arabia and the Arabian Gulf.",
    "about.howTitle": "How it works",
    "about.value1Title": "Book by the hour",
    "about.value1Text": "Pick 3, 6, 12 or 24 hours and pay only for the time you actually use.",
    "about.value2Title": "Vetted hotels",
    "about.value2Text": "Every partner hotel is checked for cleanliness, comfort and a smooth check-in.",
    "about.value3Title": "Clear pricing",
    "about.value3Text": "See the rate up front, starting from 70 SAR, with no hidden nightly fees.",
    "about.cityTitle": "A growing Gulf network",
    "about.cityText": "We already serve travelers in Jeddah, Riyadh, Dammam, Al Khobar, Jazan and Al Madinah — with more destinations on the way.",
    "about.ctaTitle": "Find a room by the hour",
    "about.ctaText": "Search hourly stays in any Wfrlee destination and book in minutes.",
    "about.ctaButton": "Explore destinations",
    "why.kicker": "Why Wfrlee",
    "why.title": "The smarter way to book a few hours",
    "why.lead": "When you only need a few hours, a nightly rate is money wasted. Here is why travelers choose Wfrlee for layovers, work and short breaks.",
    "why.reasonsTitle": "What sets Wfrlee apart",
    "why.reason1Title": "Pay only for your hours",
    "why.reason1Text": "Hourly pricing means you stop subsidising empty hours you will never spend in the room.",
    "why.reason2Title": "Perfect for layovers",
    "why.reason2Text": "Shower, sleep and reset between flights close to the airport — no day-room guesswork.",
    "why.reason3Title": "Work-ready rooms",
    "why.reason3Text": "Quiet, private spaces with reliable Wi-Fi for calls and meetings between appointments.",
    "why.reason4Title": "Transparent and flexible",
    "why.reason4Text": "Book, extend or end your stay by the hour, with clear rates from 70 SAR.",
    "why.reason5Title": "Trusted across the Gulf",
    "why.reason5Text": "Thousands of guests have booked short stays across our Saudi and Gulf destinations.",
    "why.reason6Title": "Book in minutes",
    "why.reason6Text": "Choose your hours, pick a nearby hotel and check in — online or in the app.",
    "why.ctaTitle": "Ready when you are",
    "why.ctaText": "See how little a few hours of real rest can cost across Saudi Arabia.",
    "why.ctaButton": "Book a micro-stay",
    "footer.newsletterTitle": "Let's explore the world",
    "footer.newsletterText": "Get special offers in your inbox.",
    "footer.emailPlaceholder": "Your email address",
    "footer.subscribe": "Subscribe",
    "footer.newsletterNote": "By subscribing you agree to receive Wfrlee offers and updates.",
    "footer.btnLabel": "Footer",
    "footer.talkToUs": "Talk to us",
    "footer.company": "Company",
    "footer.destinations": "Destinations",
    "footer.otherLinks": "Other links",
    "footer.allGuides": "All guides",
    "footer.faq": "FAQ",
    "footer.offers": "Offers and discounts",
    "footer.careers": "Careers",
    "footer.aboutUs": "About us",
    "footer.contactUs": "Contact us",
    "footer.wfrleeBlog": "Wfrlee blog",
    "footer.why": "Why Wfrlee",
    "footer.referral": "Referral program",
    "footer.privacyPolicy": "Privacy policy",
    "footer.safety": "Safety and security",
    "footer.terms": "Terms & conditions",
    "footer.partner": "Partner with Wfrlee.com",
    "footer.blog": "The blog",
    "footer.rss": "RSS feed",
    "footer.getApp": "Get the app",
    "footer.appIos": "App Store",
    "footer.appAndroid": "Google Play",
    "footer.rights": "All rights reserved.",
    "footer.book": "Book a micro-stay",
    "footer.tagline": "Hourly micro-stays across Saudi Arabia and the Arabian Gulf.",
    "lang.switch": "العربية",
    "lang.switchLabel": "Switch to Arabic"
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.guides": "الأدلة",
    "nav.destinations": "الوجهات",
    "nav.about": "عن وفرلي.كوم",
    "nav.why": "لماذا وفرلي.كوم",
    "nav.book": "احجز إقامتك",
    "nav.menu": "افتح القائمة",
    "home.kicker": "أدلة السفر من وفرلي.كوم",
    "home.title": "مدونة وفرلي.كوم",
    "home.intro": "نصائح للبقاء في الترانزيت، وأدلة التنقّل، ونصائح الإقامة القصيرة للمسافرين في السعودية ومنطقة الشرق الأوسط.",
    "home.latest": "أحدث دليل",
    "home.more": "المزيد من الأدلة",
    "home.empty": "لا توجد أدلة منشورة بعد. عُد قريبًا.",
    "home.ctaTitle": "هل تخطّط لتوقّف في رحلتك؟",
    "home.ctaText": "احجز غرفة خاصة نظيفة بالساعة ابتداءً من 70 ريالًا، ووفّر حتى 75% مقارنة بسعر اليوم الكامل.",
    "home.ctaButton": "احجز إقامة قصيرة",
    "card.read": "اقرأ الدليل",
    "card.readTime": "دقائق قراءة",
    "article.by": "بقلم",
    "article.updated": "آخر تحديث",
    "article.authorBlurb": "نكتب أدلة عملية للترانزيت والتنقّل والإقامة القصيرة للمسافرين في السعودية ومنطقة الشرق الأوسط.",
    "article.ctaTitle": "تحتاج غرفة بين الرحلات؟",
    "article.ctaText": "احجز إقامة قصيرة بالساعة من 70 ريالًا وحوّل توقّفك إلى راحة حقيقية.",
    "article.ctaButton": "ابحث عن غرفة بالساعة",
    "article.newer": "دليل أحدث",
    "article.older": "دليل أقدم",
    "article.related": "أدلة ذات صلة",
    "cities.kicker": "أين نعمل",
    "cities.title": "وجهات وفرلي.كوم",
    "cities.intro": "إقامات قصيرة بالساعة في المدن التي تعمل فيها وفرلي.كوم فعليًا في السعودية. اختر مدينة لعرض نصائح الترانزيت والحجز.",
    "cities.viewCity": "استكشف هذه المدينة",
    "cities.from": "تبدأ من",
    "cities.perStay": "للإقامة",
    "cities.region": "المنطقة",
    "cities.airport": "المطار",
    "cities.highlightsTitle": "حول المدينة",
    "cities.durationsTitle": "احجز بالساعة",
    "cities.durationsText": "اختر عدد الساعات التي تناسب جدولك. الأسعار المعروضة هي الأقل المعلنة من كل مدينة.",
    "cities.relatedTitle": "أدلة خاصة بهذه المدينة",
    "cities.otherCities": "وجهات أخرى",
    "cities.back": "كل الوجهات",
    "cities.ctaTitle": "جاهز للراحة في {city}؟",
    "cities.ctaText": "احجز غرفة خاصة نظيفة بالساعة وادفع فقط مقابل الوقت الذي تحتاجه.",
    "cities.ctaButton": "احجز إقامة بالساعة",
    "about.kicker": "عن وفرلي.كوم",
    "about.title": "إقامات قصيرة بأصولها الصحيحة",
    "about.lead": "تتيح لك وفرلي.كوم حجز غرفة فندقية خاصة ونظيفة بالساعة — لمدة 3 أو 6 أو 12 أو 24 ساعة — بدلًا من دفع سعر ليلة كاملة لن تستخدمها.",
    "about.storyTitle": "لماذا وُجدنا",
    "about.storyText": "المطارات والمستشفيات ومراكز الأعمال والرحلات الطويلة كلها تخلق المشكلة نفسها: تحتاج بضع ساعات من الراحة، لا ليلة كاملة. أُنشئت وفرلي.كوم لسد هذه الفجوة بحجوزات مرنة وواضحة بالساعة في السعودية والخليج العربي.",
    "about.howTitle": "كيف تعمل",
    "about.value1Title": "احجز بالساعة",
    "about.value1Text": "اختر 3 أو 6 أو 12 أو 24 ساعة وادفع فقط مقابل الوقت الذي تستخدمه.",
    "about.value2Title": "فنادق موثوقة",
    "about.value2Text": "يتم فحص كل فندق شريك من حيث النظافة والراحة وسهولة تسجيل الدخول.",
    "about.value3Title": "أسعار واضحة",
    "about.value3Text": "اطّلع على السعر مسبقًا، ابتداءً من 70 ريالًا، دون رسوم ليلية خفية.",
    "about.cityTitle": "شبكة خليجية متنامية",
    "about.cityText": "نخدم المسافرين في جدة والرياض والدمام والخبر وجازان والمدينة المنورة، ومع وجهات جديدة قادمة.",
    "about.ctaTitle": "ابحث عن غرفة بالساعة",
    "about.ctaText": "ابحث عن إقامات بالساعة في أي وجهة من وجهات وفرلي.كوم واحجز خلال دقائق.",
    "about.ctaButton": "استكشف الوجهات",
    "why.kicker": "لماذا وفرلي.كوم",
    "why.title": "الطريقة الأذكى لحجز بضع ساعات",
    "why.lead": "عندما تحتاج بضع ساعات فقط، يصبح سعر الليلة مالًا مهدرًا. إليك لماذا يختار المسافرون وفرلي.كوم للترانزيت والعمل والاستراحات القصيرة.",
    "why.reasonsTitle": "ما الذي يميّز وفرلي.كوم",
    "why.reason1Title": "ادفع مقابل ساعاتك فقط",
    "why.reason1Text": "التسعير بالساعة يعني أنك تتوقف عن دفع ثمن ساعات لن تجلس فيها في الغرفة.",
    "why.reason2Title": "مثالية للترانزيت",
    "why.reason2Text": "استحم ونم واستعد نشاطك بين الرحلات قرب المطار دون تخمين غرف اليوم.",
    "why.reason3Title": "غرف مهيّأة للعمل",
    "why.reason3Text": "مساحات هادئة وخاصة مع واي فاي موثوق للمكالمات والاجتماعات بين المواعيد.",
    "why.reason4Title": "شفافية ومرونة",
    "why.reason4Text": "احجز أو مدّد أو أنهِ إقامتك بالساعة، بأسعار واضحة من 70 ريالًا.",
    "why.reason5Title": "موثوقة في الخليج",
    "why.reason5Text": "حجز آلاف الضيوف إقامات قصيرة في وجهاتنا السعودية والخليجية.",
    "why.reason6Title": "احجز خلال دقائق",
    "why.reason6Text": "اختر ساعاتك، واختر فندقًا قريبًا، وسجّل الدخول — عبر الموقع أو التطبيق.",
    "why.ctaTitle": "جاهزون عندما تكون جاهزًا",
    "why.ctaText": "اكتشف كم يمكن أن تكلّف بضع ساعات من الراحة الحقيقية في السعودية.",
    "why.ctaButton": "احجز إقامة قصيرة",
    "footer.newsletterTitle": "لنستكشف العالم",
    "footer.newsletterText": "احصل على العروض الخاصة في بريدك.",
    "footer.emailPlaceholder": "بريدك الإلكتروني",
    "footer.subscribe": "اشترك",
    "footer.newsletterNote": "بالاشتراك فإنك توافق على تلقّي عروض وتحديثات وفرلي.كوم.",
    "footer.btnLabel": "التذييل",
    "footer.talkToUs": "تواصل معنا",
    "footer.company": "الشركة",
    "footer.destinations": "الوجهات",
    "footer.otherLinks": "روابط أخرى",
    "footer.allGuides": "كل الأدلة",
    "footer.faq": "الأسئلة الشائعة",
    "footer.offers": "العروض والخصومات",
    "footer.careers": "الوظائف",
    "footer.aboutUs": "من نحن",
    "footer.contactUs": "اتصل بنا",
    "footer.wfrleeBlog": "مدونة وفرلي.كوم",
    "footer.why": "لماذا وفرلي.كوم",
    "footer.referral": "برنامج الإحالة",
    "footer.privacyPolicy": "سياسة الخصوصية",
    "footer.safety": "الأمان والحماية",
    "footer.terms": "الشروط والأحكام",
    "footer.partner": "كن شريكًا لوفرلي.كوم",
    "footer.blog": "المدونة",
    "footer.rss": "خلاصة RSS",
    "footer.getApp": "حمّل التطبيق",
    "footer.appIos": "آب ستور",
    "footer.appAndroid": "جوجل بلاي",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.book": "احجز إقامة قصيرة",
    "footer.tagline": "إقامات قصيرة بالساعة في السعودية والخليج العربي.",
    "lang.switch": "English",
    "lang.switchLabel": "Switch to English"
  }
};
function useTranslations(lang) {
  return function t(key) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_nrmW6FEo.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://wfrlee.com", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
z.object({
  tags: z.array(z.string()).optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection,
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (entry.legacyId) {
          entry = emulateLegacyEntry(entry);
        }
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function emulateLegacyEntry({ legacyId, ...entry }) {
  const legacyEntry = {
    ...entry,
    id: legacyId,
    slug: entry.id
  };
  return {
    ...legacyEntry,
    // Define separately so the render function isn't included in the object passed to `renderEntry()`
    render: () => renderEntry(legacyEntry)
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('./_astro_assets_QcFncbZ7.mjs').then(n => n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute,
      // This attribute is used by the toolbar audit
      ...Object.assign(__vite_import_meta_env__, { Path: process.env.Path }).DEV ? { "data-image-component": "true" } : {}
    }).map(([key, value]) => value ? `${key}="${escape(value)}"` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if ("render" in entry && !("legacyId" in entry)) {
    return entry.render();
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('./content-modules_Dz-S_Wwv.mjs');
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: isRemotePath(link) ? link : prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const liveCollections = {};

const contentDir = '/src/content/';

const contentEntryGlob = "";
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = "";
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
	liveCollections,
});

function getPostLang(post) {
  const prefix = post.id.split("/")[0];
  return prefix === "ar" ? "ar" : defaultLang;
}
function getPostSlug(post) {
  const parts = post.id.split("/");
  return parts.length > 1 ? parts.slice(1).join("/") : post.id;
}
function homeHref(lang) {
  return lang === defaultLang ? "/" : `/${lang}/`;
}
function postHref(post) {
  const lang = getPostLang(post);
  return `${homeHref(lang)}blog/${getPostSlug(post)}/`;
}
async function getAllPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
async function getPosts(lang) {
  const posts = await getCollection(
    "blog",
    ({ data, id }) => !data.draft && id.startsWith(`${lang}/`)
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
function findTranslation(post, all) {
  const lang = getPostLang(post);
  return all.find(
    (candidate) => candidate.data.translationKey === post.data.translationKey && getPostLang(candidate) !== lang
  );
}
function alternateHref(post, all) {
  const translation = findTranslation(post, all);
  return translation ? postHref(translation) : homeHref(getPostLang(post) === "en" ? "ar" : "en");
}
function formatDate(date, lang) {
  return date.toLocaleDateString(lang === "ar" ? "ar" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function formatDateShort(date, lang) {
  return date.toLocaleDateString(lang === "ar" ? "ar" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function readingMinutes(post) {
  const text = post.body ?? post.data.description;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
function relatedPosts(current, all, limit = 3) {
  const lang = getPostLang(current);
  return all.filter((post) => post.id !== current.id && getPostLang(post) === lang).map((post) => {
    const sharedTags = post.data.tags.filter(
      (tag) => current.data.tags.includes(tag)
    ).length;
    const sameCategory = post.data.category === current.data.category ? 1 : 0;
    return { post, score: sharedTags * 2 + sameCategory };
  }).sort(
    (a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf()
  ).slice(0, limit).map((entry) => entry.post);
}

export { getPostSlug as a, getAllPosts as b, alternateHref as c, relatedPosts as d, readingMinutes as e, formatDate as f, getPosts as g, homeHref as h, formatDateShort as i, getPostLang as j, defaultLang as k, languages as l, postHref as p, renderEntry as r, useTranslations as u };
