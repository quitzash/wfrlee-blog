import type { ImageMetadata } from 'astro';
import { defaultLang, type Locale } from '@/i18n/ui';

import jeddahImage from '@/assets/city-jeddah.jpg';
import riyadhImage from '@/assets/city-riyadh.jpg';
import dammamImage from '@/assets/city-dammam.jpg';
import alKhobarImage from '@/assets/city-al-khobar.jpg';
import jazanImage from '@/assets/city-jazan.jpg';
import alMadinahImage from '@/assets/city-al-madinah.jpg';

/**
 * Destination photos are sourced from Wikimedia Commons (freely licensed):
 * - Jeddah: "Jeddah Waterfront, Western Saudi Arabia (2026)" — CC BY-SA 4.0 (Unknown author)
 * - Riyadh: "Riyadh Skyline" — CC BY-SA 4.0 (B.alotaby)
 * - Dammam: "وسط الدمام" — CC BY-SA 4.0 (Wikimedia Commons contributor)
 * - Al Khobar: "Al Khobar Corniche (12482233074)" — CC BY 2.0 (Francisco Anzola)
 * - Jazan: "Ottoman fort on Farasan Islands" — CC BY 2.0 (Richard Mortel)
 * - Al Madinah: "Al-Masjid An-Nabawi (Bird's Eye View)" — CC0 (Konevi)
 */

export interface CityHighlight {
	title: Record<Locale, string>;
	text: Record<Locale, string>;
}

export interface City {
	/** URL slug used by the dynamic `/cities/[city]/` routes. */
	slug: string;
	name: Record<Locale, string>;
	region: Record<Locale, string>;
	airport: {
		code: string;
		name: Record<Locale, string>;
	};
	/** Lowest advertised hourly rate, in SAR. */
	startingPrice: number;
	tagline: Record<Locale, string>;
	intro: Record<Locale, string>;
	/** Destination photo shown on the city index card and the city page hero. */
	image: ImageMetadata;
	imageAlt: Record<Locale, string>;
	highlights: CityHighlight[];
	/** Blog tags used to surface related guides for this city. */
	tags: string[];
}

/**
 * The cities where Wfrlee.com actually operates hourly stays.
 * Keep this list in sync with the destinations shown on wfrlee.com.
 */
export const cities: City[] = [
	{
		slug: 'jeddah',
		name: { en: 'Jeddah', ar: 'جدة' },
		region: { en: 'Makkah Province', ar: 'منطقة مكة المكرمة' },
		airport: { code: 'JED', name: { en: 'King Abdulaziz International Airport', ar: 'مطار الملك عبدالعزيز الدولي' } },
		startingPrice: 70,
		tagline: {
			en: 'Red Sea stopovers and Corniche layovers, by the hour.',
			ar: 'توقفات البحر الأحمر والكورنيش، بالساعة.',
		},
		intro: {
			en: "Jeddah is the Kingdom's gateway to the Red Sea and one of its busiest transit points. Whether you're stuck between flights at King Abdulaziz International or arriving late off a cruise, a Wfrlee hourly room near the Corniche lets you shower, rest and reset without paying for a full night.",
			ar: 'جدة هي بوابة المملكة إلى البحر الأحمر وأحد أكثر نقاط الترانزيت ازدحامًا. سواء كنت عالقًا بين الرحلات في مطار الملك عبدالعزيز أو وصلت متأخرًا من رحلة بحرية، تتيح لك غرفة وفرلي.كوم بالساعة قرب الكورنيش الاستحمام والراحة واستعادة نشاطك دون دفع سعر ليلة كاملة.',
		},
		highlights: [
			{
				title: { en: 'King Abdulaziz International (JED)', ar: 'مطار الملك عبدالعزيز الدولي (JED)' },
				text: {
					en: 'The terminals are spread far apart — a private room nearby beats a hard airport floor between connections.',
					ar: 'صالات المطار متباعدة، وغرفة خاصة قريبة أفضل من الانتظار على أرض المطار بين الرحلات.',
				},
			},
			{
				title: { en: 'Jeddah Corniche', ar: 'كورنيش جدة' },
				text: {
					en: 'Book a few hours to enjoy the waterfront, then nap before your next leg of the journey.',
					ar: 'احجز بضع ساعات للاستمتاع بالواجهة البحرية ثم خذ قسطًا من الراحة قبل رحلتك التالية.',
				},
			},
			{
				title: { en: 'Historic Al-Balad', ar: 'البلد التاريخي' },
				text: {
					en: 'Explore the UNESCO-listed old town, then recharge in a nearby micro-stay.',
					ar: 'استكشف البلدة القديمة المدرجة في قائمة اليونسكو ثم استعد طاقتك في إقامة قصيرة قريبة.',
				},
			},
		],
		image: jeddahImage,
		imageAlt: {
			en: 'Jeddah waterfront and Red Sea corniche',
			ar: 'واجهة جدة البحرية وكورنيش البحر الأحمر',
		},
		tags: ['jeddah', 'layover', 'airport'],
	},
	{
		slug: 'riyadh',
		name: { en: 'Riyadh', ar: 'الرياض' },
		region: { en: 'Riyadh Province', ar: 'منطقة الرياض' },
		airport: { code: 'RUH', name: { en: 'King Khalid International Airport', ar: 'مطار الملك خالد الدولي' } },
		startingPrice: 100,
		tagline: {
			en: 'Business trips, meetings and long layovers in the capital.',
			ar: 'رحلات العمل والاجتماعات والتوقفات الطويلة في العاصمة.',
		},
		intro: {
			en: 'As the capital and business hub of Saudi Arabia, Riyadh runs on tight schedules. Between a morning meeting at KAFD and an evening flight out of King Khalid International, a Wfrlee hourly room gives you a quiet place to work, freshen up or sleep — no wasted day rate.',
			ar: 'بصفتها العاصمة ومركز الأعمال في السعودية، تعمل الرياض وفق جداول ضيقة. بين اجتماع صباحي في مركز الملك عبدالله المالي ورحلة مسائية من مطار الملك خالد الدولي، تمنحك غرفة وفرلي.كوم بالساعة مكانًا هادئًا للعمل أو الاستحمام أو النوم دون إهدار سعر يوم كامل.',
		},
		highlights: [
			{
				title: { en: 'King Khalid International (RUH)', ar: 'مطار الملك خالد الدولي (RUH)' },
				text: {
					en: 'Long layovers become productive when you have a private room to work or rest near the airport.',
					ar: 'تتحول التوقفات الطويلة إلى وقت مفيد عندما تتوفر غرفة خاصة للعمل أو الراحة قرب المطار.',
				},
			},
			{
				title: { en: 'KAFD & Olaya business districts', ar: 'مركز الملك عبدالله المالي والعليا' },
				text: {
					en: 'Book a micro-stay between meetings instead of commuting across the city.',
					ar: 'احجز إقامة قصيرة بين الاجتماعات بدلًا من التنقل عبر المدينة.',
				},
			},
			{
				title: { en: 'Boulevard & city events', ar: 'البوليفارد وفعاليات المدينة' },
				text: {
					en: 'Stay close to the action and rest by the hour after a long night out.',
					ar: 'ابقَ قريبًا من الفعاليات وارتَح بالساعة بعد ليلة طويلة.',
				},
			},
		],
		image: riyadhImage,
		imageAlt: {
			en: 'Riyadh skyline at night',
			ar: 'أفق مدينة الرياض ليلًا',
		},
		tags: ['riyadh', 'layover', 'airport'],
	},
	{
		slug: 'dammam',
		name: { en: 'Dammam', ar: 'الدمام' },
		region: { en: 'Eastern Province', ar: 'المنطقة الشرقية' },
		airport: { code: 'DMM', name: { en: 'King Fahd International Airport', ar: 'مطار الملك فهد الدولي' } },
		startingPrice: 90,
		tagline: {
			en: 'Eastern Province gateways and Gulf-coast stopovers.',
			ar: 'بوابات المنطقة الشرقية وتوقفات ساحل الخليج.',
		},
		intro: {
			en: "Dammam anchors Saudi Arabia's Eastern Province and its vast King Fahd International Airport. Travellers connecting onward to Al Khobar, Dhahran or Bahrain can use a Wfrlee hourly room to rest, shower and reset close to the airport.",
			ar: 'تُعد الدمام محور المنطقة الشرقية في السعودية ومطار الملك فهد الدولي الشاسع. يمكن للمسافرين المتجهين إلى الخبر أو الظهران أو البحرين استخدام غرفة وفرلي.كوم بالساعة للراحة والاستحمام واستعادة النشاط قرب المطار.',
		},
		highlights: [
			{
				title: { en: 'King Fahd International (DMM)', ar: 'مطار الملك فهد الدولي (DMM)' },
				text: {
					en: 'One of the largest airports in the world — a nearby room saves you a long transit.',
					ar: 'من أكبر مطارات العالم، وغرفة قريبة توفّر عليك عناء الترانزيت الطويل.',
				},
			},
			{
				title: { en: 'Corniche & Half Moon Bay', ar: 'الكورنيش وخليج نصف القمر' },
				text: {
					en: 'Book a few daylight hours to unwind by the Gulf before heading back.',
					ar: 'احجز بضع ساعات نهارية للاسترخاء قرب الخليج قبل العودة.',
				},
			},
			{
				title: { en: 'Eastern Province business', ar: 'أعمال المنطقة الشرقية' },
				text: {
					en: 'Perfect for short work trips where you only need a room for a few hours.',
					ar: 'مثالية لرحلات العمل القصيرة التي تحتاج فيها غرفة لبضع ساعات فقط.',
				},
			},
		],
		image: dammamImage,
		imageAlt: {
			en: 'Downtown Dammam city centre',
			ar: 'وسط مدينة الدمام',
		},
		tags: ['dammam', 'khobar', 'layover'],
	},
	{
		slug: 'al-khobar',
		name: { en: 'Al Khobar', ar: 'الخبر' },
		region: { en: 'Eastern Province', ar: 'المنطقة الشرقية' },
		airport: { code: 'DMM', name: { en: 'King Fahd International Airport (nearby)', ar: 'مطار الملك فهد الدولي (بالقرب)' } },
		startingPrice: 100,
		tagline: {
			en: 'Waterfront cafés and Gulf views, one micro-stay away.',
			ar: 'مقاهي الواجهة البحرية وإطلالات الخليج على بعد إقامة قصيرة.',
		},
		intro: {
			en: "Al Khobar's Corniche looks across the Gulf toward Bahrain, and its cafés and restaurants make it a favourite weekend stop. When your schedule is short, a Wfrlee hourly room lets you enjoy the city and still have somewhere private to rest.",
			ar: 'يطل كورنيش الخبر على الخليج باتجاه البحرين، وتجعل مقاهيها ومطاعمها منها وجهة نهاية أسبوع مفضلة. عندما يكون وقتك ضيقًا، تتيح لك غرفة وفرلي.كوم بالساعة الاستمتاع بالمدينة مع وجود مكان خاص للراحة.',
		},
		highlights: [
			{
				title: { en: 'Khobar Corniche', ar: 'كورنيش الخبر' },
				text: {
					en: 'Take in the sea views, then rest in a nearby hourly room.',
					ar: 'استمتع بإطلالات البحر ثم ارتَح في غرفة بالساعة قريبة.',
				},
			},
			{
				title: { en: 'King Fahd Causeway to Bahrain', ar: 'جسر الملك فهد إلى البحرين' },
				text: {
					en: 'Break up a cross-border drive with a few hours of rest and a shower.',
					ar: 'قسّم رحلة عبور الحدود ببضع ساعات من الراحة والاستحمام.',
				},
			},
			{
				title: { en: 'Cafés & dining scene', ar: 'المقاهي والمطاعم' },
				text: {
					en: 'Stay in the heart of the city and sleep by the hour instead of by the night.',
					ar: 'ابقَ في قلب المدينة ونم بالساعة بدلًا من الليلة الكاملة.',
				},
			},
		],
		image: alKhobarImage,
		imageAlt: {
			en: 'Al Khobar corniche along the Gulf coast',
			ar: 'كورنيش الخبر على ساحل الخليج',
		},
		tags: ['khobar', 'dammam', 'short-stay'],
	},
	{
		slug: 'jazan',
		name: { en: 'Jazan', ar: 'جازان' },
		region: { en: 'Jazan Province', ar: 'منطقة جازان' },
		airport: { code: 'GIZ', name: { en: 'King Abdullah bin Abdulaziz Airport', ar: 'مطار الملك عبدالله بن عبدالعزيز' } },
		startingPrice: 90,
		tagline: {
			en: 'Gateway to the Farasan Islands and the Tihama coast.',
			ar: 'بوابة جزر فرسان وساحل تهامة.',
		},
		intro: {
			en: 'Jazan sits on the Red Sea in the south-west, the launch point for the Farasan Islands and the green Tihama mountains. A Wfrlee hourly stay is ideal when you are passing through GIZ airport or breaking up a long coastal drive.',
			ar: 'تقع جازان على البحر الأحمر في الجنوب الغربي، وهي نقطة الانطلاق إلى جزر فرسان وجبال تهامة الخضراء. تُعد إقامة وفرلي.كوم بالساعة مثالية عند المرور عبر مطار جازان أو تقسيم رحلة برية ساحلية طويلة.',
		},
		highlights: [
			{
				title: { en: 'Ferries to the Farasan Islands', ar: 'عبارات جزر فرسان' },
				text: {
					en: 'Rest before an early ferry with a room booked by the hour.',
					ar: 'ارتَح قبل العبارة الصباحية بغرفة تُحجز بالساعة.',
				},
			},
			{
				title: { en: 'Tihama beaches & mountains', ar: 'شواطئ وجبال تهامة' },
				text: {
					en: 'Fresh up between day trips without committing to a full night.',
					ar: 'استعد نشاطك بين الرحلات دون الالتزام بليلة كاملة.',
				},
			},
			{
				title: { en: 'Jazan city & port', ar: 'مدينة جازان والميناء' },
				text: {
					en: 'A practical pit-stop for business and transit travellers alike.',
					ar: 'محطة عملية لمسافري العمل والترانزيت على حد سواء.',
				},
			},
		],
		image: jazanImage,
		imageAlt: {
			en: 'Ottoman fort on the Farasan Islands, Jazan',
			ar: 'قلعة عثمانية في جزر فرسان بجازان',
		},
		tags: ['jazan', 'short-stay', 'layover'],
	},
	{
		slug: 'al-madinah',
		name: { en: 'Al Madinah', ar: 'المدينة المنورة' },
		region: { en: 'Madinah Province', ar: 'منطقة المدينة المنورة' },
		airport: { code: 'MED', name: { en: 'Prince Mohammad bin Abdulaziz International Airport', ar: 'مطار الأمير محمد بن عبدالعزيز الدولي' } },
		startingPrice: 90,
		tagline: {
			en: 'Quick stopovers near the Prophet’s Mosque and MED airport.',
			ar: 'توقفات سريعة قرب المسجد النبوي ومطار المدينة.',
		},
		intro: {
			en: 'Al Madinah welcomes millions of visitors each year, and Prince Mohammad bin Abdulaziz International is a common transit stop. For a short visit, prayer or onward connection, a Wfrlee hourly room offers a clean, private space to rest close to the city.',
			ar: 'ترحّب المدينة المنورة بملايين الزوار سنويًا، ويُعد مطار الأمير محمد بن عبدالعزيز الدولي محطة ترانزيت شائعة. لزيارة قصيرة أو صلاة أو رحلة متابعة، توفر غرفة وفرلي.كوم بالساعة مساحة نظيفة وخاصة للراحة قريبة من المدينة.',
		},
		highlights: [
			{
				title: { en: 'Prince Mohammad bin Abdulaziz (MED)', ar: 'مطار الأمير محمد بن عبدالعزيز (MED)' },
				text: {
					en: 'Rest and pray between flights without leaving the connection to chance.',
					ar: 'ارتَح وصلِّ بين الرحلات دون ترك موعد رحلتك للصدفة.',
				},
			},
			{
				title: { en: 'Near the Prophet’s Mosque', ar: 'قرب المسجد النبوي' },
				text: {
					en: 'Book a few hours to freshen up before or after your visit.',
					ar: 'احجز بضع ساعات للاستحمام قبل زيارتك أو بعدها.',
				},
			},
			{
				title: { en: 'Umrah & Ziyarah stopovers', ar: 'توقفات العمرة والزيارة' },
				text: {
					en: 'A practical place to sleep between rituals and travel days.',
					ar: 'مكان عملي للنوم بين المناسك وأيام السفر.',
				},
			},
		],
		image: alMadinahImage,
		imageAlt: {
			en: 'Aerial view of Al-Masjid An-Nabawi in Al Madinah',
			ar: 'منظر جوي للمسجد النبوي في المدينة المنورة',
		},
		tags: ['madinah', 'layover', 'short-stay'],
	},
];

/** Look up a city by its slug. */
export function getCity(slug: string): City | undefined {
	return cities.find((city) => city.slug === slug);
}

/** Localized URL for the city index page. */
export function citiesHref(lang: Locale): string {
	return lang === defaultLang ? '/cities/' : `/${lang}/cities/`;
}

/** Localized URL for a single city page. */
export function cityHref(city: City, lang: Locale): string {
	return `${citiesHref(lang)}${city.slug}/`;
}

/** The same city page in the other language, for hreflang and the language switcher. */
export function cityAlternateHref(city: City, lang: Locale): string {
	return cityHref(city, lang === 'en' ? 'ar' : 'en');
}
