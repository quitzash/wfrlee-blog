export const languages = {
	en: 'English',
	ar: 'العربية',
} as const;

export const defaultLang = 'en';

export type Locale = keyof typeof languages;

export const ui = {
	en: {
		'nav.home': 'Home',
		'nav.guides': 'Guides',
		'nav.destinations': 'Destinations',
		'nav.about': 'About',
		'nav.why': 'Why Wfrlee',
		'nav.book': 'Book a stay',
		'nav.menu': 'Open menu',

		'home.kicker': 'Wfrlee travel guides',
		'home.title': 'The Wfrlee Blog',
		'home.intro':
			'Layover survival tips, transit know-how, and micro-stay advice for travelers across Saudi Arabia.',
		'home.latest': 'Latest guide',
		'home.more': 'More guides',
		'home.empty': 'No published guides yet. Check back soon.',
		'home.ctaTitle': 'Planning a stopover?',
		'home.ctaText':
			'Book a clean, private room by the hour from 70 SAR — save up to 75% over a full day rate.',
		'home.ctaButton': 'Book a micro-stay',

		'card.read': 'Read guide',
		'card.readTime': 'min read',

		'article.by': 'By',
		'article.updated': 'Updated',
		'article.authorBlurb':
			'We write practical layover, transit, and micro-stay guides for travelers across Saudi Arabia.',
		'article.ctaTitle': 'Need a room between flights?',
		'article.ctaText':
			'Book an hourly micro-stay from 70 SAR and turn your layover into real rest.',
		'article.ctaButton': 'Find a room by the hour',
		'article.newer': 'Newer guide',
		'article.older': 'Older guide',
		'article.related': 'Related guides',

		'cities.kicker': 'Where we operate',
		'cities.title': 'Wfrlee destinations',
		'cities.intro':
			'Hourly micro-stays in the cities where Wfrlee.com actually operates across Saudi Arabia. Pick a city to see layover tips and booking advice.',
		'cities.viewCity': 'Explore this city',
		'cities.from': 'From',
		'cities.perStay': 'per stay',
		'cities.region': 'Region',
		'cities.airport': 'Airport',
		'cities.highlightsTitle': 'Around the city',
		'cities.durationsTitle': 'Book by the hour',
		'cities.durationsText':
			'Choose the number of hours that fits your schedule. Rates shown are the lowest advertised from each city.',
		'cities.relatedTitle': 'Guides for this city',
		'cities.otherCities': 'Other destinations',
		'cities.back': 'All destinations',
		'cities.ctaTitle': 'Ready to rest in {city}?',
		'cities.ctaText': 'Book a clean, private room by the hour and pay only for the time you need.',
		'cities.ctaButton': 'Book an hourly stay',

		'about.kicker': 'About Wfrlee',
		'about.title': 'Short stays, done right',
		'about.lead':
			'Wfrlee.com lets travelers book a clean, private hotel room by the hour — for 3, 6, 12 or 24 hours — instead of paying for a full night they will never use.',
		'about.storyTitle': 'Why we exist',
		'about.storyText':
			'Airports, hospitals, business districts and long drives all create the same problem: you need a few hours of rest, not a whole night. Wfrlee was built to fill that gap with flexible, transparent hourly bookings across Saudi Arabia and the Arabian Gulf.',
		'about.howTitle': 'How it works',
		'about.value1Title': 'Book by the hour',
		'about.value1Text': 'Pick 3, 6, 12 or 24 hours and pay only for the time you actually use.',
		'about.value2Title': 'Vetted hotels',
		'about.value2Text': 'Every partner hotel is checked for cleanliness, comfort and a smooth check-in.',
		'about.value3Title': 'Clear pricing',
		'about.value3Text': 'See the rate up front, starting from 70 SAR, with no hidden nightly fees.',
		'about.cityTitle': 'A growing Gulf network',
		'about.cityText':
			'We already serve travelers in Jeddah, Riyadh, Dammam, Al Khobar, Jazan and Al Madinah — with more destinations on the way.',
		'about.ctaTitle': 'Find a room by the hour',
		'about.ctaText': 'Search hourly stays in any Wfrlee destination and book in minutes.',
		'about.ctaButton': 'Explore destinations',

		'why.kicker': 'Why Wfrlee',
		'why.title': 'The smarter way to book a few hours',
		'why.lead':
			'When you only need a few hours, a nightly rate is money wasted. Here is why travelers choose Wfrlee for layovers, work and short breaks.',
		'why.reasonsTitle': 'What sets Wfrlee apart',
		'why.reason1Title': 'Pay only for your hours',
		'why.reason1Text': 'Hourly pricing means you stop subsidising empty hours you will never spend in the room.',
		'why.reason2Title': 'Perfect for layovers',
		'why.reason2Text': 'Shower, sleep and reset between flights close to the airport — no day-room guesswork.',
		'why.reason3Title': 'Work-ready rooms',
		'why.reason3Text': 'Quiet, private spaces with reliable Wi-Fi for calls and meetings between appointments.',
		'why.reason4Title': 'Transparent and flexible',
		'why.reason4Text': 'Book, extend or end your stay by the hour, with clear rates from 70 SAR.',
		'why.reason5Title': 'Trusted across the Gulf',
		'why.reason5Text': 'Thousands of guests have booked short stays across our Saudi and Gulf destinations.',
		'why.reason6Title': 'Book in minutes',
		'why.reason6Text': 'Choose your hours, pick a nearby hotel and check in — online or in the app.',
		'why.ctaTitle': 'Ready when you are',
		'why.ctaText': 'See how little a few hours of real rest can cost across Saudi Arabia.',
		'why.ctaButton': 'Book a micro-stay',

		'footer.newsletterTitle': "Let's explore the world",
		'footer.newsletterText': 'Get special offers in your inbox.',
		'footer.emailPlaceholder': 'Your email address',
		'footer.subscribe': 'Subscribe',
		'footer.newsletterNote': 'By subscribing you agree to receive Wfrlee offers and updates.',
		'footer.btnLabel': 'Footer',
		'footer.talkToUs': 'Talk to us',
		'footer.company': 'Company',
		'footer.destinations': 'Destinations',
		'footer.otherLinks': 'Other links',
		'footer.allGuides': 'All guides',
		'footer.faq': 'FAQ',
		'footer.offers': 'Offers and discounts',
		'footer.careers': 'Careers',
		'footer.aboutUs': 'About us',
		'footer.contactUs': 'Contact us',
		'footer.wfrleeBlog': 'Wfrlee blog',
		'footer.why': 'Why Wfrlee',
		'footer.referral': 'Referral program',
		'footer.privacyPolicy': 'Privacy policy',
		'footer.safety': 'Safety and security',
		'footer.terms': 'Terms & conditions',
		'footer.partner': 'Partner with Wfrlee.com',
		'footer.blog': 'The blog',
		'footer.rss': 'RSS feed',
		'footer.getApp': 'Get the app',
		'footer.appIos': 'App Store',
		'footer.appAndroid': 'Google Play',
		'footer.rights': 'All rights reserved.',
		'footer.book': 'Book a micro-stay',
		'footer.tagline': 'Hourly micro-stays across Saudi Arabia and the Arabian Gulf.',

		'lang.switch': 'العربية',
		'lang.switchLabel': 'Switch to Arabic',
	},
	ar: {
		'nav.home': 'الرئيسية',
		'nav.guides': 'الأدلة',
		'nav.destinations': 'الوجهات',
		'nav.about': 'عن وفرلي.كوم',
		'nav.why': 'لماذا وفرلي.كوم',
		'nav.book': 'احجز إقامتك',
		'nav.menu': 'افتح القائمة',

		'home.kicker': 'أدلة السفر من وفرلي.كوم',
		'home.title': 'مدونة وفرلي.كوم',
		'home.intro':
			'نصائح للبقاء في الترانزيت، وأدلة التنقّل، ونصائح الإقامة القصيرة للمسافرين في السعودية ومنطقة الشرق الأوسط.',
		'home.latest': 'أحدث دليل',
		'home.more': 'المزيد من الأدلة',
		'home.empty': 'لا توجد أدلة منشورة بعد. عُد قريبًا.',
		'home.ctaTitle': 'هل تخطّط لتوقّف في رحلتك؟',
		'home.ctaText':
			'احجز غرفة خاصة نظيفة بالساعة ابتداءً من 70 ريالًا، ووفّر حتى 75% مقارنة بسعر اليوم الكامل.',
		'home.ctaButton': 'احجز إقامة قصيرة',

		'card.read': 'اقرأ الدليل',
		'card.readTime': 'دقائق قراءة',

		'article.by': 'بقلم',
		'article.updated': 'آخر تحديث',
		'article.authorBlurb':
			'نكتب أدلة عملية للترانزيت والتنقّل والإقامة القصيرة للمسافرين في السعودية ومنطقة الشرق الأوسط.',
		'article.ctaTitle': 'تحتاج غرفة بين الرحلات؟',
		'article.ctaText':
			'احجز إقامة قصيرة بالساعة من 70 ريالًا وحوّل توقّفك إلى راحة حقيقية.',
		'article.ctaButton': 'ابحث عن غرفة بالساعة',
		'article.newer': 'دليل أحدث',
		'article.older': 'دليل أقدم',
		'article.related': 'أدلة ذات صلة',

		'cities.kicker': 'أين نعمل',
		'cities.title': 'وجهات وفرلي.كوم',
		'cities.intro':
			'إقامات قصيرة بالساعة في المدن التي تعمل فيها وفرلي.كوم فعليًا في السعودية. اختر مدينة لعرض نصائح الترانزيت والحجز.',
		'cities.viewCity': 'استكشف هذه المدينة',
		'cities.from': 'تبدأ من',
		'cities.perStay': 'للإقامة',
		'cities.region': 'المنطقة',
		'cities.airport': 'المطار',
		'cities.highlightsTitle': 'حول المدينة',
		'cities.durationsTitle': 'احجز بالساعة',
		'cities.durationsText':
			'اختر عدد الساعات التي تناسب جدولك. الأسعار المعروضة هي الأقل المعلنة من كل مدينة.',
		'cities.relatedTitle': 'أدلة خاصة بهذه المدينة',
		'cities.otherCities': 'وجهات أخرى',
		'cities.back': 'كل الوجهات',
		'cities.ctaTitle': 'جاهز للراحة في {city}؟',
		'cities.ctaText': 'احجز غرفة خاصة نظيفة بالساعة وادفع فقط مقابل الوقت الذي تحتاجه.',
		'cities.ctaButton': 'احجز إقامة بالساعة',

		'about.kicker': 'عن وفرلي.كوم',
		'about.title': 'إقامات قصيرة بأصولها الصحيحة',
		'about.lead':
			'تتيح لك وفرلي.كوم حجز غرفة فندقية خاصة ونظيفة بالساعة — لمدة 3 أو 6 أو 12 أو 24 ساعة — بدلًا من دفع سعر ليلة كاملة لن تستخدمها.',
		'about.storyTitle': 'لماذا وُجدنا',
		'about.storyText':
			'المطارات والمستشفيات ومراكز الأعمال والرحلات الطويلة كلها تخلق المشكلة نفسها: تحتاج بضع ساعات من الراحة، لا ليلة كاملة. أُنشئت وفرلي.كوم لسد هذه الفجوة بحجوزات مرنة وواضحة بالساعة في السعودية والخليج العربي.',
		'about.howTitle': 'كيف تعمل',
		'about.value1Title': 'احجز بالساعة',
		'about.value1Text': 'اختر 3 أو 6 أو 12 أو 24 ساعة وادفع فقط مقابل الوقت الذي تستخدمه.',
		'about.value2Title': 'فنادق موثوقة',
		'about.value2Text': 'يتم فحص كل فندق شريك من حيث النظافة والراحة وسهولة تسجيل الدخول.',
		'about.value3Title': 'أسعار واضحة',
		'about.value3Text': 'اطّلع على السعر مسبقًا، ابتداءً من 70 ريالًا، دون رسوم ليلية خفية.',
		'about.cityTitle': 'شبكة خليجية متنامية',
		'about.cityText':
			'نخدم المسافرين في جدة والرياض والدمام والخبر وجازان والمدينة المنورة، ومع وجهات جديدة قادمة.',
		'about.ctaTitle': 'ابحث عن غرفة بالساعة',
		'about.ctaText': 'ابحث عن إقامات بالساعة في أي وجهة من وجهات وفرلي.كوم واحجز خلال دقائق.',
		'about.ctaButton': 'استكشف الوجهات',

		'why.kicker': 'لماذا وفرلي.كوم',
		'why.title': 'الطريقة الأذكى لحجز بضع ساعات',
		'why.lead':
			'عندما تحتاج بضع ساعات فقط، يصبح سعر الليلة مالًا مهدرًا. إليك لماذا يختار المسافرون وفرلي.كوم للترانزيت والعمل والاستراحات القصيرة.',
		'why.reasonsTitle': 'ما الذي يميّز وفرلي.كوم',
		'why.reason1Title': 'ادفع مقابل ساعاتك فقط',
		'why.reason1Text': 'التسعير بالساعة يعني أنك تتوقف عن دفع ثمن ساعات لن تجلس فيها في الغرفة.',
		'why.reason2Title': 'مثالية للترانزيت',
		'why.reason2Text': 'استحم ونم واستعد نشاطك بين الرحلات قرب المطار دون تخمين غرف اليوم.',
		'why.reason3Title': 'غرف مهيّأة للعمل',
		'why.reason3Text': 'مساحات هادئة وخاصة مع واي فاي موثوق للمكالمات والاجتماعات بين المواعيد.',
		'why.reason4Title': 'شفافية ومرونة',
		'why.reason4Text': 'احجز أو مدّد أو أنهِ إقامتك بالساعة، بأسعار واضحة من 70 ريالًا.',
		'why.reason5Title': 'موثوقة في الخليج',
		'why.reason5Text': 'حجز آلاف الضيوف إقامات قصيرة في وجهاتنا السعودية والخليجية.',
		'why.reason6Title': 'احجز خلال دقائق',
		'why.reason6Text': 'اختر ساعاتك، واختر فندقًا قريبًا، وسجّل الدخول — عبر الموقع أو التطبيق.',
		'why.ctaTitle': 'جاهزون عندما تكون جاهزًا',
		'why.ctaText': 'اكتشف كم يمكن أن تكلّف بضع ساعات من الراحة الحقيقية في السعودية.',
		'why.ctaButton': 'احجز إقامة قصيرة',

		'footer.newsletterTitle': 'لنستكشف العالم',
		'footer.newsletterText': 'احصل على العروض الخاصة في بريدك.',
		'footer.emailPlaceholder': 'بريدك الإلكتروني',
		'footer.subscribe': 'اشترك',
		'footer.newsletterNote': 'بالاشتراك فإنك توافق على تلقّي عروض وتحديثات وفرلي.كوم.',
		'footer.btnLabel': 'التذييل',
		'footer.talkToUs': 'تواصل معنا',
		'footer.company': 'الشركة',
		'footer.destinations': 'الوجهات',
		'footer.otherLinks': 'روابط أخرى',
		'footer.allGuides': 'كل الأدلة',
		'footer.faq': 'الأسئلة الشائعة',
		'footer.offers': 'العروض والخصومات',
		'footer.careers': 'الوظائف',
		'footer.aboutUs': 'من نحن',
		'footer.contactUs': 'اتصل بنا',
		'footer.wfrleeBlog': 'مدونة وفرلي.كوم',
		'footer.why': 'لماذا وفرلي.كوم',
		'footer.referral': 'برنامج الإحالة',
		'footer.privacyPolicy': 'سياسة الخصوصية',
		'footer.safety': 'الأمان والحماية',
		'footer.terms': 'الشروط والأحكام',
		'footer.partner': 'كن شريكًا لوفرلي.كوم',
		'footer.blog': 'المدونة',
		'footer.rss': 'خلاصة RSS',
		'footer.getApp': 'حمّل التطبيق',
		'footer.appIos': 'آب ستور',
		'footer.appAndroid': 'جوجل بلاي',
		'footer.rights': 'جميع الحقوق محفوظة.',
		'footer.book': 'احجز إقامة قصيرة',
		'footer.tagline': 'إقامات قصيرة بالساعة في السعودية والخليج العربي.',

		'lang.switch': 'English',
		'lang.switchLabel': 'Switch to English',
	},
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];

/** Returns a translator for the given locale, falling back to the default locale. */
export function useTranslations(lang: Locale) {
	return function t(key: UIKey): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

/** Narrow an arbitrary string to a supported locale. */
export function toLocale(value: string | undefined): Locale {
	return value === 'ar' ? 'ar' : 'en';
}
