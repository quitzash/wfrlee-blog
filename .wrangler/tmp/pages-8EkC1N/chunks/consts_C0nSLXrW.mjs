globalThis.process ??= {}; globalThis.process.env ??= {};
const SITE_URL = "https://wfrlee.com";
const SITE_TITLE = "Wfrlee Blog";
const SITE_TITLE_AR = "مدونة وفرلي.كوم";
const SITE_BRAND = "Wfrlee.com";
const SITE_BRAND_AR = "وفرلي.كوم";
const SITE_DESCRIPTION = "Micro-stay guides, airport layover survival tips, and hourly hotel booking advice for travelers across Saudi Arabia.";
const SITE_DESCRIPTION_AR = "أدلة الإقامات القصيرة ونصائح التوقف في المطارات والتنقّل للمسافرين في السعودية ومنطقة الشرق الأوسط.";
const SITE_KEYWORDS = [
  "short stays",
  "booking",
  "hourly hotels",
  "micro-stay hotels",
  "day-use rooms",
  "airport layover hotels",
  "Saudi Arabia",
  "KSA",
  "budget travel",
  "transit hotels"
];
const SITE_KEYWORDS_AR = [
  "إقامة قصيرة",
  "حجز فنادق",
  "فنادق بالساعة",
  "إقامة بالساعة",
  "غرف استخدام يومي",
  "حجز فندق بالمطار",
  "السعودية",
  "سفر اقتصادي",
  "فنادق الترانزيت"
];
function siteKeywords(lang) {
  return lang === "ar" ? SITE_KEYWORDS_AR : SITE_KEYWORDS;
}
const SITE_AUTHOR = "Wfrlee Travel Team";
const TWITTER_HANDLE = "@wfrlee";
const DEFAULT_OG_IMAGE = "/images/og-default.jpg";
const BOOKING_URL = "https://wfrlee.com";
const CONTACT_EMAIL = "info@wfrlee.com";
const SITE_LOCALES = {
  en: "en_US",
  ar: "ar_AR"
};
const APP_LINKS = {
  ios: "https://apps.apple.com/app/id1672569695",
  android: "https://play.google.com/store/apps/details?id=com.wfrlee"
};
const SOCIAL_LINKS = [
  { label: "X", href: "https://twitter.com/wfrlee" },
  { label: "Instagram", href: "https://www.instagram.com/wfrlee.co" },
  { label: "Facebook", href: "https://www.facebook.com/wfrlee.co" },
  { label: "TikTok", href: "https://www.tiktok.com/@wfrlee.com" }
];
const MAIN_SITE_LINKS = {
  faq: "https://wfrlee.com/faq",
  offers: "https://wfrlee.com/offers",
  careers: "https://wfrlee.com/careers",
  contact: "https://wfrlee.com/contactus",
  referral: "https://wfrlee.com/referral",
  privacy: "https://wfrlee.com/privacy-policy",
  safety: "https://wfrlee.com/safety",
  terms: "https://wfrlee.com/terms",
  partner: "https://wfrlee.com/partner"
};

export { APP_LINKS as A, BOOKING_URL as B, CONTACT_EMAIL as C, DEFAULT_OG_IMAGE as D, MAIN_SITE_LINKS as M, SITE_URL as S, TWITTER_HANDLE as T, SITE_BRAND_AR as a, SITE_DESCRIPTION_AR as b, SITE_DESCRIPTION as c, SITE_TITLE_AR as d, SITE_TITLE as e, SOCIAL_LINKS as f, SITE_AUTHOR as g, SITE_LOCALES as h, SITE_BRAND as i, siteKeywords as s };
