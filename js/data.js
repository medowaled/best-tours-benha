/**
 * Best Tours Benha - Data Layer
 * Structured data for services, destinations, offers, visas, testimonials, and gallery.
 */

const travelData = {
  services: [
    {
      id: "hajj-umrah",
      category: "umrah",
      icon: "fa-kaaba",
      titleAr: "رحلات الحج والعمرة",
      titleEn: "Hajj & Umrah Pilgrimages",
      descAr: "برامج متكاملة 5 نجوم واقتصادية مع فنادق مطلة على الحرمين الشريفين وإشراف ديني معتمد.",
      descEn: "Comprehensive 5-star & economic programs with hotels overlooking the Holy Harams and religious guidance.",
      badgeAr: "الأكثر طلباً",
      badgeEn: "Most Popular",
      link: "#umrah-section"
    },
    {
      id: "visas",
      category: "visas",
      icon: "fa-passport",
      titleAr: "خدمات التأشيرات السريعة",
      titleEn: "Expedited Visa Services",
      descAr: "استخراج تأشيرات شنغن، السعودية، دبي، بريطانيا، وأمريكا بحرفية عالية وحجز أسرع المواعيد.",
      descEn: "Hassle-free visa issuance for Schengen, Saudi, Dubai, UK & USA with priority appointments.",
      badgeAr: "معدل قبول 99%",
      badgeEn: "99% Approval",
      link: "#visas-section"
    },
    {
      id: "flights",
      category: "flights",
      icon: "fa-plane-departure",
      titleAr: "حجوزات طيران مخفضة",
      titleEn: "Flight Bookings",
      descAr: "حجز تذاكر على كافة خطوط الطيران العالمية بأسعار تفضيلية ومرونة عالية في التعديل والإلغاء.",
      descEn: "Best corporate & leisure airfares across world airlines with full date-change flexibility.",
      badgeAr: "أسعار حصرية",
      badgeEn: "Exclusive Rates",
      link: "#search-bar"
    },
    {
      id: "international-travel",
      category: "international",
      icon: "fa-globe-americas",
      titleAr: "السياحة الدولية والخارجية",
      titleEn: "International Packages",
      descAr: "بكجات سياحية ساحرة إلى تركيا، جورجيا، لبنان، ماليزيا وأوروبا مع جولات وإقامة راقية.",
      descEn: "Bespoke holiday packages to Turkey, Georgia, Lebanon, Malaysia, and Europe with guided tours.",
      badgeAr: "رحلات مميزة",
      badgeEn: "Featured",
      link: "#choose-trip"
    },
    {
      id: "domestic-travel",
      category: "domestic",
      icon: "fa-umbrella-beach",
      titleAr: "السياحة الداخلية بمصر",
      titleEn: "Domestic Egyptian Tours",
      descAr: "عطلات استثنائية في شرم الشيخ، الغردقة، دهب، مرسى علم، نايل كروز الأقصر وأسوان.",
      descEn: "Luxury getaways in Sharm El Sheikh, Hurghada, Dahab, Marsa Alam, and Nile Cruises.",
      badgeAr: "عطلات عائلية",
      badgeEn: "Family Favorite",
      link: "#choose-trip"
    }
  ],

  destinations: [
    {
      id: "dest-1",
      category: "umrah",
      titleAr: "عمرة رجب وشعبان الفاخرة",
      titleEn: "Luxury Rajab & Shaban Umrah",
      locationAr: "مكة المكرمة & المدينة المنورة",
      locationEn: "Makkah & Madinah",
      durationAr: "14 يوم / 13 ليلة",
      durationEn: "14 Days / 13 Nights",
      price: "36,500",
      currency: "EGP",
      rating: 4.9,
      reviewsCount: 380,
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
      badgeAr: "فندق مباشر على الحرم",
      badgeEn: "Direct Haram View",
      highlightsAr: ["طيران مباشر من القاهرة", "فنادق 5 نجوم (أبراج الصفوة / أنوار المدينة)", "إشراف ديني وإداري على مدار الساعة"],
      highlightsEn: ["Direct flights from Cairo", "5-Star hotels (Al Safwah / Anwar Al Madinah)", "24/7 dedicated religious guide"]
    },
    {
      id: "dest-2",
      category: "umrah",
      titleAr: "عمرة المولد النبوي الاقتصادية المميزة",
      titleEn: "Premium Economic Umrah Program",
      locationAr: "مكة المكرمة & المدينة المنورة",
      locationEn: "Makkah & Madinah",
      durationAr: "10 أيام / 9 ليالٍ",
      durationEn: "10 Days / 9 Nights",
      price: "28,900",
      currency: "EGP",
      rating: 4.8,
      reviewsCount: 290,
      image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80",
      badgeAr: "أفضل قيمة",
      badgeEn: "Best Value",
      highlightsAr: ["باصات حديثة مكيفة VIP", "فنادق راقية قريبة مع نقل مجاني", "هدية خاصة لكل معتمر (حقيبة وسجادة)"],
      highlightsEn: ["Modern air-conditioned VIP coaches", "Nearby premium hotels with free shuttle", "Exclusive gift bag for every pilgrim"]
    },
    {
      id: "dest-3",
      category: "international",
      titleAr: "سحر إسطنبول وطرابزون",
      titleEn: "Magical Istanbul & Trabzon",
      locationAr: "تركيا",
      locationEn: "Turkey",
      durationAr: "8 أيام / 7 ليالٍ",
      durationEn: "8 Days / 7 Nights",
      price: "32,800",
      currency: "EGP",
      rating: 4.9,
      reviewsCount: 215,
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
      badgeAr: "شامل تذاكر الطيران",
      badgeEn: "Flights Included",
      highlightsAr: ["جولة البوسفور الخاصة", "إقامة 4 نجوم سوبريور", "رحلة بحيرة أوزنجول الساحرة"],
      highlightsEn: ["Private Bosphorus cruise", "4-star superior accommodation", "Scenic Uzungol lake tour"]
    },
    {
      id: "dest-4",
      category: "international",
      titleAr: "أجواء دبي الفاخرة وسفاري الصحراء",
      titleEn: "Luxury Dubai Escape & Safari",
      locationAr: "الإمارات العربية المتحدة",
      locationEn: "United Arab Emirates",
      durationAr: "6 أيام / 5 ليالٍ",
      durationEn: "6 Days / 5 Nights",
      price: "24,500",
      currency: "EGP",
      rating: 4.9,
      reviewsCount: 340,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      badgeAr: "تأشيرة فورية",
      badgeEn: "Instant Visa",
      highlightsAr: ["شامل التأشيرة السياحية السريعة", "سفاري صحراوي مع عشاء باربكيو", "دخول برج خليفة وبرواز دبي"],
      highlightsEn: ["Express tourist visa included", "Desert safari with BBQ dinner", "Burj Khalifa & Dubai Frame access"]
    },
    {
      id: "dest-5",
      category: "domestic",
      titleAr: "شرم الشيخ - ريزورت 5 نجوم ألترا أول إنكلوسيف",
      titleEn: "Sharm El Sheikh 5-Star Ultra All-Inclusive",
      locationAr: "جنوب سيناء - مصر",
      locationEn: "South Sinai, Egypt",
      durationAr: "4 أيام / 3 ليالٍ",
      durationEn: "4 Days / 3 Nights",
      price: "7,800",
      currency: "EGP",
      rating: 4.8,
      reviewsCount: 410,
      image: "https://images.unsplash.com/photo-1544885935-98dd03b09034?auto=format&fit=crop&w=800&q=80",
      badgeAr: "شامل الوجبات والمشروبات",
      badgeEn: "All-Inclusive",
      highlightsAr: ["ريزورت على البحر مباشرة مع شاطئ رملي", "أكوا بارك عملاقة للعائلات", "انتقالات ذهاب وعودة من بنها والقاهرة"],
      highlightsEn: ["Beachfront resort with sandy beach", "Huge family aqua park", "Round-trip transfers from Benha/Cairo"]
    },
    {
      id: "dest-6",
      category: "domestic",
      titleAr: "نايل كروز الأقصر وأسوان الملكية",
      titleEn: "Royal Luxor & Aswan Nile Cruise",
      locationAr: "صعيد مصر",
      locationEn: "Upper Egypt",
      durationAr: "5 أيام / 4 ليالٍ",
      durationEn: "5 Days / 4 Nights",
      price: "11,500",
      currency: "EGP",
      rating: 4.9,
      reviewsCount: 185,
      image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80",
      badgeAr: "فخامة ملكية 5★ دي لوكس",
      badgeEn: "5★ Deluxe Luxury",
      highlightsAr: ["إقامة كاملة (فطار - غداء - عشاء)", "زيارات معابد الكرنك ووادي الملوك وفيلة", "مرشد سياحي معتمد طوال الرحلة"],
      highlightsEn: ["Full board meals", "Karnak, Valley of the Kings & Philae tours", "Licensed Egyptologist guide throughout"]
    },
    {
      id: "dest-7",
      category: "visas",
      titleAr: "خدمة ملف تأشيرة الشنغن الأوروبية",
      titleEn: "European Schengen Visa Processing",
      locationAr: "أوروبا (فرنسا، إيطاليا، إسبانيا، ألمانيا)",
      locationEn: "Europe (France, Italy, Spain, Germany)",
      durationAr: "15 - 20 يوم عمل",
      durationEn: "15 - 20 Business Days",
      price: "1,450",
      currency: "EGP",
      rating: 4.9,
      reviewsCount: 520,
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
      badgeAr: "تجهيز كامل للملف",
      badgeEn: "Complete Dossier",
      highlightsAr: ["حجز الموعد الرسمي الأسرع", "تأمين سفر طبي معتمد ومترجم", "مراجعة كشف الحساب والوثائق بدقة عالية"],
      highlightsEn: ["Fastest official appointment booking", "Certified travel insurance", "Meticulous bank statement review"]
    },
    {
      id: "dest-8",
      category: "flights",
      titleAr: "حجوزات طيران بنها - الخليج وأوروبا",
      titleEn: "Benha Flight Booking Concierge",
      locationAr: "عالمي / جميع الوجهات",
      locationEn: "Global Destinations",
      durationAr: "إصدار فوري 24/7",
      durationEn: "Instant 24/7 Issuance",
      price: "أفضل سعر",
      currency: "",
      rating: 5.0,
      reviewsCount: 640,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
      badgeAr: "معتمد من IATA",
      badgeEn: "IATA Certified",
      highlightsAr: ["مقارنة بين 450+ شركة طيران", "خصومات خاصة للجروبات والعائلات", "دعم فوري لتعديل التذاكر والوزن الإضافي"],
      highlightsEn: ["Compare 450+ international airlines", "Special group & family discounts", "Instant support for baggage & rebooking"]
    }
  ],

  featuredOffers: [
    {
      id: "offer-1",
      tagAr: "عرض حصري محدود",
      tagEn: "Limited Flash Deal",
      titleAr: "باقة العمرة المزدوجة - احجز لشخصين واحصل على خصم 4,000 ج.م",
      titleEn: "Couple Umrah Special - Book for two and save EGP 4,000",
      descAr: "شامل تذاكر الطيران، الإقامة في أبراج مكة، وخدمات VIP للنقل بين المدينتين.",
      descEn: "Includes return airfare, Makkah clock towers hotel, and VIP intercity transfers.",
      originalPrice: "78,000",
      offerPrice: "74,000",
      currency: "EGP",
      expireDate: "2026-10-15",
      badgeColor: "emerald"
    },
    {
      id: "offer-2",
      tagAr: "عرض عطلة الخريف",
      tagEn: "Autumn Holiday Deal",
      titleAr: "رحلة الأحلام: جورجيا الساحرة (تبليسي وباتومي) 7 أيام",
      titleEn: "Dream Georgia Getaway (Tbilisi & Batumi) 7 Days",
      descAr: "بدون تأشيرة مسبقة للمصريين المقيمين بالخليج وأسهل الإجراءات للمسافرين من مصر.",
      descEn: "No prior visa for GCC residents and seamless procedures for Egyptian travelers.",
      originalPrice: "29,500",
      offerPrice: "25,900",
      currency: "EGP",
      expireDate: "2026-10-30",
      badgeColor: "gold"
    },
    {
      id: "offer-3",
      tagAr: "ويك إند الرفاهية",
      tagEn: "Weekend Luxury",
      titleAr: "الغردقة - سهل حشيش ريزورت 5 نجوم ديلوكس (شامل كلياً)",
      titleEn: "Hurghada Sahl Hasheesh 5-Star Deluxe (Ultra All-Inc)",
      descAr: "استمتع بعطلة ساحرة مع الانتقالات VIP من مدينة بنها مباشرة إلى الفندق.",
      descEn: "Experience pure tranquility with door-to-door VIP private transfer from Benha.",
      originalPrice: "9,900",
      offerPrice: "8,200",
      currency: "EGP",
      expireDate: "2026-10-20",
      badgeColor: "navy"
    }
  ],

  visas: [
    {
      id: "v-schengen",
      countryAr: "تأشيرة شنغن الأوروبية",
      countryEn: "Schengen Visa (Europe)",
      flag: "🇪🇺",
      processingTimeAr: "15 - 20 يوم عمل",
      processingTimeEn: "15 - 20 Business Days",
      reqsCount: 6,
      scopeAr: "تتيح لك دخول 29 دولة أوروبية",
      scopeEn: "Access to 29 European countries",
      rateAr: "99% نسبة القبول مع خبرائنا",
      rateEn: "99% approval rating with our experts"
    },
    {
      id: "v-saudi",
      countryAr: "تأشيرة السعودية (سياحة / عمرة)",
      countryEn: "Saudi Visa (Tourism / Umrah)",
      flag: "🇸🇦",
      processingTimeAr: "خلال 24 - 48 ساعة",
      processingTimeEn: "Within 24 - 48 Hours",
      reqsCount: 3,
      scopeAr: "دخول متعدد سارية لمدة عام كامل",
      scopeEn: "Multiple-entry valid for 1 full year",
      rateAr: "إصدار إلكتروني فوري",
      rateEn: "Instant electronic issuance"
    },
    {
      id: "v-uae",
      countryAr: "تأشيرة الإمارات (دبي / أبوظبي)",
      countryEn: "UAE Tourist Visa (Dubai / Abu Dhabi)",
      flag: "🇦🇪",
      processingTimeAr: "خلال 24 - 72 ساعة",
      processingTimeEn: "Within 24 - 72 Hours",
      reqsCount: 2,
      scopeAr: "خيارات 30 يوماً أو 60 يوماً",
      scopeEn: "30 or 60 days duration options",
      rateAr: "موافقة رسمية سريعة ومضمونة",
      rateEn: "Guaranteed quick official approval"
    },
    {
      id: "v-uk",
      countryAr: "تأشيرة بريطانيا السياحية",
      countryEn: "UK Standard Visitor Visa",
      flag: "🇬🇧",
      processingTimeAr: "3 - 4 أسابيع عمل",
      processingTimeEn: "3 - 4 Working Weeks",
      reqsCount: 7,
      scopeAr: "صلاحية 6 أشهر أو سنتين أو 5 سنوات",
      scopeEn: "6 months, 2 years, or 5 years validity",
      rateAr: "تجهيز وتدقيق ومقابلة VFS",
      rateEn: "VFS appointment & dossier prep"
    },
    {
      id: "v-usa",
      countryAr: "تأشيرة الولايات المتحدة (B1/B2)",
      countryEn: "USA B1/B2 Visitor Visa",
      flag: "🇺🇸",
      processingTimeAr: "تحديد أقرب موعد مقابلة بالسفارة",
      processingTimeEn: "Fastest embassy interview slot",
      reqsCount: 5,
      scopeAr: "صلاحية تصل إلى 5 سنوات متعددة",
      scopeEn: "Up to 5 years multiple entries",
      rateAr: "تعبئة نموذج DS-160 وتدريب المقابلة",
      rateEn: "DS-160 filing & interview coaching"
    },
    {
      id: "v-turkey",
      countryAr: "تأشيرة تركيا الإلكترونية والملصقة",
      countryEn: "Turkey Sticker & E-Visa",
      flag: "🇹🇷",
      processingTimeAr: "3 - 7 أيام عمل",
      processingTimeEn: "3 - 7 Working Days",
      reqsCount: 4,
      scopeAr: "سياحة وزيارات تجارية",
      scopeEn: "Tourism and business visits",
      rateAr: "حجز مواعيد جيت واي وتقديم الملف",
      rateEn: "Gateway appointment & submission"
    }
  ],

  testimonials: [
    {
      id: "t-1",
      nameAr: "الحاج عصام الشرقاوي",
      nameEn: "El Haj Essam El-Sharkawy",
      roleAr: "معتمر - برنامج عمرة رجب",
      roleEn: "Pilgrim - Rajab Program",
      cityAr: "بنها، القليوبية",
      cityEn: "Benha, Qalyubia",
      rating: 5,
      quoteAr: "تجربتي مع شركة بست تورز بنها كانت قمة في الالتزام والذوق. الفندق في مكة كان على بعد خطوات من ساحة الحرم، والباصات مريحة جداً. شكراً لكل فريق العمل على الرعاية الفائقة لكبار السن.",
      quoteEn: "My experience with Best Tours Benha was exceptional. The hotel in Makkah was steps away from the Haram piazza, and the buses were spotless and comfortable. Thank you for taking such good care of elderly pilgrims.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "t-2",
      nameAr: "د. إيمان النجار",
      nameEn: "Dr. Iman El-Naggar",
      roleAr: "تأشيرة شنغن ورحلة فرنسا",
      roleEn: "Schengen Visa & France Tour",
      cityAr: "كفر الجزار، بنها",
      cityEn: "Kafr El-Gazzar, Benha",
      rating: 5,
      quoteAr: "كنت قلقة جداً من استخراج تأشيرة الشنغن، لكن شباب بست تورز نظموا الملف وكشف الحساب وحجز الموعد بطريقة احترافية تماماً وحصلت على التأشيرة خلال 14 يوماً فقط بدون أي مجهود.",
      quoteEn: "I was worried about my Schengen application, but Best Tours organized my paperwork, appointment, and flight reservations with utmost professionalism. I got my visa in just 14 days without hassle!",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "t-3",
      nameAr: "م. محمد فتحي وعائلته",
      nameEn: "Eng. Mohamed Fathy & Family",
      roleAr: "رحلة عائلية إلى شرم الشيخ",
      roleEn: "Family Holiday in Sharm",
      cityAr: "الفلل، بنها",
      cityEn: "Al-Vellal, Benha",
      rating: 5,
      quoteAr: "السفر من بنها لشرم الشيخ مع بست تورز كان في غاية الراحة. حجزوا لنا فندق 5 نجوم بسعر أقل من بوكينج وبوفيه ممتاز وأكوا بارك أمتعت أولادي. أعتبرهم دائماً وجهتي الأولى للسياحة.",
      quoteEn: "Traveling from Benha to Sharm with Best Tours was completely stress-free. We got a 5-star resort at a cheaper rate than Booking.com with incredible amenities. They are always our #1 travel partner.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
  ],

  gallery: [
    {
      id: "g-1",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80",
      captionAr: "لحظات إيمانية أمام الكعبة المشرفة مع فوج بست تورز",
      captionEn: "Spiritual moments before the Holy Kaaba with Best Tours group",
      tag: "#عمرة_مباركة"
    },
    {
      id: "g-2",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80",
      captionAr: "جولة البوسفور الممتعة في إسطنبول لعملاء بنها",
      captionEn: "Scenic Bosphorus private cruise in Istanbul for our clients",
      tag: "#سياحة_تركيا"
    },
    {
      id: "g-3",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
      captionAr: "سفاري دبي وروح المغامرة في الكثبان الرملية",
      captionEn: "Thrilling Dubai Desert Safari adventure",
      tag: "#دبي_2026"
    },
    {
      id: "g-4",
      image: "https://images.unsplash.com/photo-1544885935-98dd03b09034?auto=format&fit=crop&w=600&q=80",
      captionAr: "مياه البحر الأحمر الفيروزية وشواطئ شرم الساحرة",
      captionEn: "Turquoise Red Sea shores and coral reefs in Sharm",
      tag: "#شرم_الشيخ"
    },
    {
      id: "g-5",
      image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80",
      captionAr: "شروق الشمس الأسطوري على نيل الأقصر من سطح الكروز",
      captionEn: "Legendary Nile sunrise in Luxor from cruise deck",
      tag: "#نايل_كروز"
    },
    {
      id: "g-6",
      image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=600&q=80",
      captionAr: "المسجد النبوي الشريف بروحانية وطمأنينة لا توصف",
      captionEn: "Serenity at the Prophet's Mosque in Madinah",
      tag: "#زيارة_طيبة"
    }
  ],

  umrahPackages: [
    {
      id: "umrah-pkg-1",
      titleAr: "عمرة رجب وشعبان الفاخرة",
      tagAr: "خمس نجوم VIP",
      tagColor: "gold",
      durationAr: "10 أيام / 9 ليالٍ",
      hotelsAr: "أبراج الصفوة (مكة) وموفنبيك (المدينة)",
      descAr: "إقامة 10 أيام في أبراج الصفوة (مكة) وموفنبيك (المدينة) المطلة مباشرة على الحرمين مع بوفيه مفتوح وطيران مباشر من القاهرة.",
      oldPrice: "58,000",
      price: "49,500",
      currency: "ج.م",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
      features: [
        "طيران مباشر من القاهرة إلى جدة/المدينة",
        "فنادق 5 نجوم مطلة على الحرمين مباشرة",
        "بوفيه مفتوح إفطار وعشاء فاخر",
        "إشراف ديني ومزارات دينية كاملة"
      ],
      active: true
    },
    {
      id: "umrah-pkg-2",
      titleAr: "عمرة البرنامج الاقتصادي المميز",
      tagAr: "الأكثر طلباً",
      tagColor: "emerald",
      durationAr: "14 يوماً / 13 ليلة",
      hotelsAr: "فنادق راقية (محبس الجن) مع باصات ترددية مجانية 24 ساعة",
      descAr: "إقامة 14 يوماً بفنادق راقية (محبس الجن) مع باصات ترددية مجانية تعمل 24 ساعة للحرم المكي وطيران مباشر شامل التأشيرة والباركود.",
      oldPrice: "36,000",
      price: "29,900",
      currency: "ج.م",
      image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80",
      features: [
        "باصات حديثة مكيفة VIP على مدار الساعة",
        "فنادق مميزة وقريبة مع انتقالات ميسرة",
        "شامل باركود بوابة العمرة والتأشيرة",
        "هدية معتمر خاصة من بست تورز"
      ],
      active: true
    },
    {
      id: "umrah-pkg-3",
      titleAr: "عمرة شهر رمضان المبارك (العشر الأواخر)",
      tagAr: "العشر الأواخر",
      tagColor: "navy",
      durationAr: "15 يوماً / 14 ليلة",
      hotelsAr: "فنادق الصفوة ودار التوحيد المجاورة للحرم",
      descAr: "معايشة روحانية لا تُنسى طوال العشر الأواخر من رمضان وختام القرآن الكريم مع ليلة القدر بالحرم المكي الشريف وتأمين شامل.",
      oldPrice: "72,000",
      price: "64,000",
      currency: "ج.م",
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
      features: [
        "شهود ختم القرآن الكريم وليلة القدر بالحرم",
        "سحور وإفطار رمضاني فاخر",
        "قرب استثنائي من ساحات الحرم المكي",
        "إرشاد ديني ومرافقة طوال مدة الرحلة"
      ],
      active: true
    },
    {
      id: "umrah-pkg-4",
      titleAr: "عمرة المولد النبوي الشريف",
      tagAr: "موسم المولد",
      tagColor: "gold",
      durationAr: "12 يوماً / 11 ليلة",
      hotelsAr: "فنادق 4 نجوم شارع أجياد وإبراهيم الخليل",
      descAr: "برنامج متميز في ذكرى المولد النبوي الشريف وزيارة الروضة الشريفة بالمدينة المنورة ومزارات بدر وأحد.",
      oldPrice: "39,000",
      price: "34,500",
      currency: "ج.م",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      features: [
        "زيارة الروضة الشريفة وتصاريح نسك الرسمية",
        "مزارات مكة والمدينة بحافلات مكيفة",
        "مشرف إداري ذو خبرة لمتابعة الفوج",
        "تأمين صحي شامل طوال فترة السفر"
      ],
      active: true
    }
  ],

  umrahMedia: {
    bannerImage: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80",
    bannerTitle: "برامج العمرة VIP والبرامج الاقتصادية",
    bannerSubtitle: "نولي معتمرينا أقصى درجات الاهتمام من خلال فنادق ساحة الحرم المكي مباشرة، طيران مباشر من مطار القاهرة إلى جدة أو المدينة، ومرشدين دينيين لمرافقة الأفواج والإجابة عن كافة المناسك."
  },

  companyInfo: {
    nameAr: "بست تورز بنها للسياحة والرحلات",
    nameEn: "Best Tours Benha Travel & Tourism",
    license: "ترخيص وزارة السياحة المصرية رقم 147 - فئة (أ)",
    iataCode: "IATA Accredited Agency 12-4589",
    addressAr: "بنها - كورنيش النيل، بجوار بنك CIB",
    addressEn: "Corniche El Nile St., Next to CIB Bank, Benha, Egypt",
    phonePrimary: "01028589888",
    phoneSecondary: "01026663733",
    whatsapp: "201050079811",
    whatsappDisplay: "01050079811",
    email: "info@besttours-benha.com",
    workingHoursAr: "يومياً من 9:00 صباحاً حتى 10:00 مساءً (الجمعة من 1:00 ظهراً)",
    workingHoursEn: "Daily 9:00 AM - 10:00 PM (Friday from 1:00 PM)"
  }
};

window.travelData = travelData;
