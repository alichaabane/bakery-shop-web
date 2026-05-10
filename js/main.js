(() => {
    const backToTop = document.querySelector('.back-to-top');
    const currentYear = document.getElementById('currentYear');
    const heroCarousel = document.getElementById('heroCarousel');
    const languageButtons = document.querySelectorAll('.lang-btn');
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicToggleText = document.getElementById('musicToggleText');
    const musicStateKey = 'matiat_music_enabled';
    const languageKey = 'matiat_lang';
    const musicIntroPlayedKey = 'matiat_music_intro_played';
    const musicIntroDurationMs = 30000;
    let introStopTimer = null;
    let pendingFirstInteractionStart = false;
    let currentLang = localStorage.getItem(languageKey) || 'tr';
    let musicIsPlaying = false;

    const translations = {
        tr: {
            page_title: 'MATİAT FIRIN PASTA | Çukurova Üniversitesi Önü Fırın Kiosk',
            meta_description:
                'MATİAT FIRIN PASTA, Çukurova Üniversitesi Ana Giriş Kapısı önünde taze simit, poğaça, börek ve günlük fırın ürünleri sunan yerel fırın kioskudur.',
            og_title: 'MATİAT FIRIN PASTA | Çukurova Üniversitesi Önü Fırın Kiosk',
            og_description: "Adana Sarıçam'da, Çukurova Üniversitesi Ana Giriş Kapısı önünde taze fırın ürünleri.",
            meta_keywords: 'Matiat Fırın Pasta, Adana fırın, Çukurova Üniversitesi fırın, Sarıçam simit, poğaça, börek',
            logo_alt: 'MATİAT FIRIN PASTA Logo',
            location_link: 'MATİAT FIRIN PASTA Konumu',
            whatsapp_order: 'WhatsApp Sipariş',
            nav_home: 'Ana Sayfa',
            nav_about: 'Hakkımızda',
            nav_products: 'Ürünler',
            nav_gallery: 'Galeri',
            nav_testimonials: 'Müşteri Yorumları',
            nav_contact: 'İletişim',
            nav_location: 'Konum',
            uni_badge: 'Öğrencilerin Lezzet Noktası',
            uni_title: 'Çukurova Üniversitesi Girişinde',
            uni_subtitle: 'Taptaze simit, poğaça, börek ve kahve keyfi',
            hero_label: 'Sokak Fırını Lezzeti',
            hero_subtitle: 'Çukurova Üniversitesi girişinde, her gün taze çıkan simit, poğaça, börek ve fırın ürünleri.',
            hero_cta_order: 'WhatsApp’tan Sipariş Ver',
            hero_cta_route: 'Yol Tarifi Al',
            hero_img_cover_alt: 'MATİAT FIRIN PASTA kapak fotoğrafı',
            hero_img_place_alt: 'MATİAT FIRIN PASTA konum fotoğrafı',
            hero_img_uni_alt: 'Çukurova Üniversitesi giriş kapısı',
            about_title: 'Hakkımızda',
            about_p1: 'MATİAT FIRIN PASTA, öğrencilere ve bölge sakinlerine gün boyu sıcak ve taze ürün sunan yerel bir fırın kioskudur.',
            about_p2: 'Hızlı servis, günlük üretim ve ulaşılabilir konum ile Çukurova Üniversitesi çevresinde pratik bir lezzet noktasıyız.',
            about_image_alt: 'MATİAT FIRIN PASTA noktası',
            products_title: 'Ürünler',
            products_intro: 'Tezgahımızda her gün bulabileceğiniz ürünler',
            product_simit_title: 'Taze Simit',
            product_simit_desc: 'Dışı çıtır, içi yumuşak günlük simit.',
            product_simit_alt: 'Taze Simit',
            product_pogaca_title: 'Poğaça',
            product_pogaca_desc: 'Günlük taze poğaça seçenekleri.',
            product_pogaca_alt: 'Poğaça',
            product_borek_title: 'Peynirli Börek',
            product_borek_desc: 'Gün içinde sıcak servis edilen peynirli börek.',
            product_borek_alt: 'Peynirli Börek',
            product_ekler_title: 'Ekler',
            product_ekler_desc: 'Taze tatlı ürünler arasında günlük ekler.',
            product_ekler_alt: 'Ekler',
            product_coffee_title: 'Kahve',
            product_coffee_desc: 'Fırın ürünlerinin yanında kahve seçenekleri.',
            product_coffee_alt: 'Kahve',
            product_drinks_title: 'Çay & İçecekler',
            product_drinks_desc: 'Çay ve soğuk içecek alternatifleri.',
            product_drinks_alt: 'Çay ve İçecekler',
            gallery_title: 'Galeri',
            gallery_alt_1: 'MATİAT FIRIN PASTA konum fotoğrafı',
            gallery_alt_2: 'MATİAT FIRIN PASTA konum fotoğrafı 2',
            gallery_alt_3: 'MATİAT FIRIN PASTA konum fotoğrafı 3',
            gallery_alt_4: 'MATİAT FIRIN PASTA konum fotoğrafı 4',
            testimonials_title: 'Müşteri Yorumları',
            testimonials_intro: 'Misafirlerimizin deneyimleri',
            testimonial_1_quote: 'Ürünler her zaman taze ve sıcak. Üniversite girişinde olması büyük avantaj.',
            testimonial_2_quote: 'Simit ve poğaçaları gerçekten çok lezzetli. Sabah kahvesi için sık sık uğruyorum.',
            testimonial_3_quote: 'Çalışanlar çok güler yüzlü. Hızlı servis ve kaliteli ürünler.',
            contact_title: 'İletişim',
            open_daily: 'Her gün hizmet',
            open_maps: "Google Maps'te Aç",
            map_iframe_title: 'MATİAT FIRIN PASTA Harita',
            footer_desc: 'Çukurova Üniversitesi çevresinde günlük taze fırın ürünleri sunan modern sokak fırını noktası.',
            quick_links: 'Hızlı Linkler',
            contact_visit: 'İletişim & Ziyaret',
            work_hours: 'Çalışma Saatleri: Her gün 06:30 - 18:30',
            copyright_prefix: 'Telif Hakkı',
            credit_byline: ' : Ali Chaabane - ',
            software_engineer: 'Yazılım Mühendisi',
            footer_whatsapp: 'WhatsApp',
            address_street: 'Çukurova Üniversitesi Ana Giriş Kapısı Önü, Sarıçam / Adana',
            music_start: 'Müziği Başlat',
            music_stop: 'Müziği Durdur',
            aria_lang_switcher: 'Dil seçimi',
            aria_menu_open: 'Menüyü aç',
            carousel_slide_1: 'Slayt 1',
            carousel_slide_2: 'Slayt 2',
            carousel_slide_3: 'Slayt 3',
            carousel_prev: 'Önceki slayt',
            carousel_next: 'Sonraki slayt',
            aria_footer_nav: 'Alt menü',
            aria_instagram: 'Instagram',
            aria_google_maps_icon: 'Google Haritalar',
            aria_linkedin_credit: 'Ali Chaabane LinkedIn',
            aria_whatsapp_float: 'WhatsApp ile iletişime geç',
            aria_music_stop: 'Müziği durdur',
            aria_music_start: 'Müziği başlat',
            aria_back_top: 'Yukarı çık',
            lang_aria_tr: 'Türkçe',
            lang_aria_en: 'English',
            lang_aria_ar: 'العربية',
            lang_flag_alt_tr: 'Türkçe',
            lang_flag_alt_en: 'English',
            lang_flag_alt_ar: 'العربية'
        },
        en: {
            page_title: 'MATİAT FIRIN PASTA | Bakery Kiosk at Çukurova University',
            meta_description:
                'MATİAT FIRIN PASTA is a local bakery kiosk at the main entrance of Çukurova University, serving fresh simit, poğaça, börek and daily baked goods.',
            og_title: 'MATİAT FIRIN PASTA | Bakery Kiosk at Çukurova University',
            og_description: 'Fresh bakery products in Sarıçam, Adana, at the Çukurova University main entrance.',
            meta_keywords:
                'MATİAT FIRIN PASTA, Adana bakery, Çukurova University, Sarıçam, simit, poğaça, börek, Turkish bakery',
            logo_alt: 'MATİAT FIRIN PASTA logo',
            location_link: 'MATİAT FIRIN PASTA location',
            whatsapp_order: 'WhatsApp order',
            nav_home: 'Home',
            nav_about: 'About',
            nav_products: 'Products',
            nav_gallery: 'Gallery',
            nav_testimonials: 'Customer reviews',
            nav_contact: 'Contact',
            nav_location: 'Location',
            uni_badge: 'Students’ favorite spot',
            uni_title: 'At Çukurova University entrance',
            uni_subtitle: 'Fresh simit, poğaça, börek and coffee',
            hero_label: 'Street bakery taste',
            hero_subtitle:
                'At the entrance of Çukurova University — fresh simit, poğaça, börek and bakery products baked every day.',
            hero_cta_order: 'Order on WhatsApp',
            hero_cta_route: 'Get directions',
            hero_img_cover_alt: 'MATİAT FIRIN PASTA cover photo',
            hero_img_place_alt: 'MATİAT FIRIN PASTA location photo',
            hero_img_uni_alt: 'Çukurova University entrance gate',
            about_title: 'About us',
            about_p1:
                'MATİAT FIRIN PASTA is a local bakery kiosk serving students and residents hot, fresh products all day long.',
            about_p2:
                'With quick service, daily baking and an easy-to-reach location, we are a convenient taste spot around Çukurova University.',
            about_image_alt: 'MATİAT FIRIN PASTA storefront',
            products_title: 'Products',
            products_intro: 'What you can find at our counter every day',
            product_simit_title: 'Fresh simit',
            product_simit_desc: 'Crispy outside, soft inside — baked fresh daily.',
            product_simit_alt: 'Fresh Turkish simit',
            product_pogaca_title: 'Poğaça',
            product_pogaca_desc: 'Fresh savory pastry options baked daily.',
            product_pogaca_alt: 'Turkish poğaça pastry',
            product_borek_title: 'Cheese börek',
            product_borek_desc: 'Cheese börek served warm throughout the day.',
            product_borek_alt: 'Cheese börek pastry',
            product_ekler_title: 'Éclairs',
            product_ekler_desc: 'Daily éclairs among our fresh desserts.',
            product_ekler_alt: 'Éclair pastries',
            product_coffee_title: 'Coffee',
            product_coffee_desc: 'Coffee options alongside bakery favorites.',
            product_coffee_alt: 'Coffee',
            product_drinks_title: 'Tea & drinks',
            product_drinks_desc: 'Tea and cold drink choices.',
            product_drinks_alt: 'Tea and beverages',
            gallery_title: 'Gallery',
            gallery_alt_1: 'MATİAT FIRIN PASTA location photo',
            gallery_alt_2: 'MATİAT FIRIN PASTA location photo 2',
            gallery_alt_3: 'MATİAT FIRIN PASTA location photo 3',
            gallery_alt_4: 'MATİAT FIRIN PASTA location photo 4',
            testimonials_title: 'Customer reviews',
            testimonials_intro: 'What our guests say',
            testimonial_1_quote:
                'The products are always fresh and warm. Being right by the university entrance is a big plus.',
            testimonial_2_quote:
                'The simit and poğaça are really delicious. I stop by often for morning coffee.',
            testimonial_3_quote: 'The staff are very welcoming. Fast service and quality products.',
            contact_title: 'Contact',
            open_daily: 'Open every day',
            open_maps: 'Open in Google Maps',
            map_iframe_title: 'MATİAT FIRIN PASTA map',
            footer_desc: 'A modern street bakery serving fresh baked goods daily near Çukurova University.',
            quick_links: 'Quick links',
            contact_visit: 'Contact & visit',
            work_hours: 'Hours: every day 06:30 – 18:30',
            copyright_prefix: 'Copyright',
            credit_byline: ' · Ali Chaabane · ',
            software_engineer: 'Software engineer',
            footer_whatsapp: 'WhatsApp',
            address_street: 'In front of Çukurova University Main Entrance, Sarıçam / Adana',
            music_start: 'Play music',
            music_stop: 'Stop music',
            aria_lang_switcher: 'Language selection',
            aria_menu_open: 'Open menu',
            carousel_slide_1: 'Slide 1',
            carousel_slide_2: 'Slide 2',
            carousel_slide_3: 'Slide 3',
            carousel_prev: 'Previous slide',
            carousel_next: 'Next slide',
            aria_footer_nav: 'Footer menu',
            aria_instagram: 'Instagram',
            aria_google_maps_icon: 'Google Maps',
            aria_linkedin_credit: 'Ali Chaabane on LinkedIn',
            aria_whatsapp_float: 'Contact via WhatsApp',
            aria_music_stop: 'Stop music',
            aria_music_start: 'Play music',
            aria_back_top: 'Back to top',
            lang_aria_tr: 'Turkish',
            lang_aria_en: 'English',
            lang_aria_ar: 'Arabic',
            lang_flag_alt_tr: 'Turkish',
            lang_flag_alt_en: 'English',
            lang_flag_alt_ar: 'Arabic'
        },
        ar: {
            page_title: 'MATİAT FIRIN PASTA | كشك مخبز أمام جامعة تشوكوروفا',
            meta_description:
                'MATİAT FIRIN PASTA هو كشك مخبز محلي عند المدخل الرئيسي لجامعة تشوكوروفا، يقدم سميت وبوغاتشا وبوريك ومنتجات مخبوزات يومية طازجة.',
            og_title: 'MATİAT FIRIN PASTA | كشك مخبز أمام جامعة تشوكوروفا',
            og_description: 'منتجات مخبوزات طازجة في أضنة (صاريجام) عند المدخل الرئيسي لجامعة تشوكوروفا.',
            meta_keywords: 'مخبز أضنة، جامعة تشوكوروفا، صاريجام، سميت، بوغاتشا، بوريك، MATİAT FIRIN PASTA',
            logo_alt: 'شعار MATİAT FIRIN PASTA',
            location_link: 'موقع MATİAT FIRIN PASTA',
            whatsapp_order: 'طلب واتساب',
            nav_home: 'الرئيسية',
            nav_about: 'من نحن',
            nav_products: 'المنتجات',
            nav_gallery: 'المعرض',
            nav_testimonials: 'آراء العملاء',
            nav_contact: 'التواصل',
            nav_location: 'الموقع',
            uni_badge: 'نقطة الطلاب المفضلة',
            uni_title: 'عند مدخل جامعة تشوكوروفا',
            uni_subtitle: 'سميت وبوغاتشا وبوريك وقهوة طازجة',
            hero_label: 'نكهة مخبز الشارع',
            hero_subtitle:
                'عند مدخل جامعة تشوكوروفا — سميت وبوغاتشا وبوريك ومنتجات مخبوزات طازجة يوميًا.',
            hero_cta_order: 'اطلب عبر واتساب',
            hero_cta_route: 'احصل على الاتجاهات',
            hero_img_cover_alt: 'صورة غلاف MATİAT FIRIN PASTA',
            hero_img_place_alt: 'صورة موقع MATİAT FIRIN PASTA',
            hero_img_uni_alt: 'بوابة مدخل جامعة تشوكوروفا',
            about_title: 'من نحن',
            about_p1:
                'MATİAT FIRIN PASTA هو كشك مخبز محلي يقدم للطلاب وسكان المنطقة منتجات ساخنة وطازجة طوال اليوم.',
            about_p2:
                'بخدمة سريعة وإنتاج يومي وموقع سهل الوصول، نحن نقطة طعام عملية بالقرب من جامعة تشوكوروفا.',
            about_image_alt: 'واجهة MATİAT FIRIN PASTA',
            products_title: 'المنتجات',
            products_intro: 'ما يمكنكم إيجاده على منضدتنا كل يوم',
            product_simit_title: 'سميت طازج',
            product_simit_desc: 'مقرمش من الخارج وطرّي من الداخل — يوميًا.',
            product_simit_alt: 'سميت تركي طازج',
            product_pogaca_title: 'بوغاتشا',
            product_pogaca_desc: 'خيارات بوغاتشا مالحة طازجة يوميًا.',
            product_pogaca_alt: 'معجنات بوغاتشا تركية',
            product_borek_title: 'بوريك بالجبن',
            product_borek_desc: 'بوريك بالجبن يُقدَّم ساخنًا طوال اليوم.',
            product_borek_alt: 'بوريك بالجبن',
            product_ekler_title: 'إكلير',
            product_ekler_desc: 'إكلير يومي ضمن حلوياتنا الطازجة.',
            product_ekler_alt: 'حلوى إكلير',
            product_coffee_title: 'قهوة',
            product_coffee_desc: 'خيارات قهوة بجانب المخبوزات.',
            product_coffee_alt: 'قهوة',
            product_drinks_title: 'شاي ومشروبات',
            product_drinks_desc: 'شاي ومشروبات باردة.',
            product_drinks_alt: 'شاي ومشروبات',
            gallery_title: 'المعرض',
            gallery_alt_1: 'صورة موقع MATİAT FIRIN PASTA',
            gallery_alt_2: 'صورة موقع MATİAT FIRIN PASTA 2',
            gallery_alt_3: 'صورة موقع MATİAT FIRIN PASTA 3',
            gallery_alt_4: 'صورة موقع MATİAT FIRIN PASTA 4',
            testimonials_title: 'آراء العملاء',
            testimonials_intro: 'تجارب ضيوفنا',
            testimonial_1_quote:
                'المنتجات دائمًا طازجة وساخنة. موقعه عند مدخل الجامعة ميزة كبيرة.',
            testimonial_2_quote: 'السميت والبوغاتشا لذيذان جدًا. أزوره كثيرًا لقهوة الصباح.',
            testimonial_3_quote: 'الموظفون ودودون للغاية. خدمة سريعة ومنتجات عالية الجودة.',
            contact_title: 'التواصل',
            open_daily: 'مفتوح يوميًا',
            open_maps: 'افتح في خرائط Google',
            map_iframe_title: 'خريطة MATİAT FIRIN PASTA',
            footer_desc: 'مخبز شارع حديث يقدم مخبوزات طازجة يوميًا بالقرب من جامعة تشوكوروفا.',
            quick_links: 'روابط سريعة',
            contact_visit: 'التواصل والزيارة',
            work_hours: 'ساعات العمل: يوميًا 06:30 – 18:30',
            copyright_prefix: 'حقوق النشر',
            credit_byline: ' : علي شعبان - ',
            software_engineer: 'مهندس برمجيات',
            footer_whatsapp: 'واتساب',
            address_street: 'أمام المدخل الرئيسي لجامعة تشوكوروفا، صاريجام / أضنة',
            music_start: 'تشغيل الموسيقى',
            music_stop: 'إيقاف الموسيقى',
            aria_lang_switcher: 'اختيار اللغة',
            aria_menu_open: 'فتح القائمة',
            carousel_slide_1: 'الشريحة 1',
            carousel_slide_2: 'الشريحة 2',
            carousel_slide_3: 'الشريحة 3',
            carousel_prev: 'الشريحة السابقة',
            carousel_next: 'الشريحة التالية',
            aria_footer_nav: 'قائمة التذييل',
            aria_instagram: 'إنستغرام',
            aria_google_maps_icon: 'خرائط Google',
            aria_linkedin_credit: 'علي شعبان على لينكدإن',
            aria_whatsapp_float: 'تواصل عبر واتساب',
            aria_music_stop: 'إيقاف الموسيقى',
            aria_music_start: 'تشغيل الموسيقى',
            aria_back_top: 'العودة للأعلى',
            lang_aria_tr: 'التركية',
            lang_aria_en: 'الإنجليزية',
            lang_aria_ar: 'العربية',
            lang_flag_alt_tr: 'التركية',
            lang_flag_alt_en: 'الإنجليزية',
            lang_flag_alt_ar: 'العربية'
        }
    };

    const applyLanguage = (lang) => {
        const selected = translations[lang] ? lang : 'tr';
        currentLang = selected;
        const bundle = translations[selected];
        document.documentElement.lang = selected;
        document.documentElement.dir = selected === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem(languageKey, selected);

        document.querySelectorAll('[data-i18n]').forEach((node) => {
            const key = node.getAttribute('data-i18n');
            if (key && bundle[key]) {
                node.textContent = bundle[key];
            }
        });

        document.querySelectorAll('[data-i18n-content]').forEach((node) => {
            const key = node.getAttribute('data-i18n-content');
            if (key && bundle[key]) {
                node.setAttribute('content', bundle[key]);
            }
        });

        document.querySelectorAll('[data-i18n-alt]').forEach((node) => {
            const key = node.getAttribute('data-i18n-alt');
            if (key && bundle[key]) {
                node.setAttribute('alt', bundle[key]);
            }
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach((node) => {
            const key = node.getAttribute('data-i18n-aria-label');
            if (key && bundle[key]) {
                node.setAttribute('aria-label', bundle[key]);
            }
        });

        document.querySelectorAll('[data-i18n-title]').forEach((node) => {
            const key = node.getAttribute('data-i18n-title');
            if (key && bundle[key]) {
                node.setAttribute('title', bundle[key]);
            }
        });

        languageButtons.forEach((btn) => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === selected);
        });

        if (musicToggleText) {
            musicToggleText.textContent = musicIsPlaying ? bundle.music_stop : bundle.music_start;
        }

        if (musicToggle) {
            musicToggle.setAttribute(
                'aria-label',
                musicIsPlaying ? bundle.aria_music_stop : bundle.aria_music_start
            );
        }
    };

    languageButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang') || 'tr';
            applyLanguage(lang);
        });
    });

    applyLanguage(currentLang);

    const setMusicUi = (enabled) => {
        if (!musicToggle) {
            return;
        }
        musicIsPlaying = enabled;
        musicToggle.classList.toggle('is-playing', enabled);
        const bundle = translations[currentLang] || translations.tr;
        musicToggle.setAttribute('aria-label', enabled ? bundle.aria_music_stop : bundle.aria_music_start);
        if (musicToggleText) {
            musicToggleText.textContent = enabled ? bundle.music_stop : bundle.music_start;
        }
    };

    if (music && musicToggle) {
        const savedState = localStorage.getItem(musicStateKey);
        const introPlayed = localStorage.getItem(musicIntroPlayedKey) === 'true';
        const startIntroAndStop = () => {
            localStorage.setItem(musicIntroPlayedKey, 'true');
            localStorage.setItem(musicStateKey, 'false');
            setMusicUi(true);

            if (introStopTimer) {
                window.clearTimeout(introStopTimer);
            }
            introStopTimer = window.setTimeout(() => {
                music.pause();
                setMusicUi(false);
                localStorage.setItem(musicStateKey, 'false');
            }, musicIntroDurationMs);
        };

        if (!introPlayed) {
            setMusicUi(true);
            music.play().then(() => {
                startIntroAndStop();
            }).catch(() => {
                pendingFirstInteractionStart = true;
                setMusicUi(false);
            });

            const tryStartFromInteraction = async () => {
                if (!pendingFirstInteractionStart) {
                    return;
                }
                try {
                    await music.play();
                    pendingFirstInteractionStart = false;
                    startIntroAndStop();
                    window.removeEventListener('pointerdown', tryStartFromInteraction);
                    window.removeEventListener('keydown', tryStartFromInteraction);
                } catch (_) {
                    setMusicUi(false);
                }
            };

            window.addEventListener('pointerdown', tryStartFromInteraction);
            window.addEventListener('keydown', tryStartFromInteraction);
        } else {
            const enabledByDefault = savedState === 'true';
            setMusicUi(enabledByDefault);

            if (enabledByDefault) {
                music.play().then(() => {
                    setMusicUi(true);
                }).catch(() => {
                    localStorage.setItem(musicStateKey, 'false');
                    setMusicUi(false);
                });
            }
        }

        musicToggle.addEventListener('click', async () => {
            localStorage.setItem(musicIntroPlayedKey, 'true');
            if (introStopTimer) {
                window.clearTimeout(introStopTimer);
                introStopTimer = null;
            }

            const isPlaying = !music.paused;

            if (isPlaying) {
                music.pause();
                localStorage.setItem(musicStateKey, 'false');
                setMusicUi(false);
                return;
            }

            try {
                await music.play();
                localStorage.setItem(musicStateKey, 'true');
                setMusicUi(true);
            } catch (_) {
                localStorage.setItem(musicStateKey, 'false');
                setMusicUi(false);
            }
        });
    }

    if (heroCarousel && window.bootstrap?.Carousel) {
        const carouselInstance = window.bootstrap.Carousel.getOrCreateInstance(heroCarousel);
        heroCarousel.addEventListener('click', (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }

            if (target.closest('a, button, .carousel-indicators')) {
                return;
            }

            const rect = heroCarousel.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const middleX = rect.width / 2;

            if (clickX < middleX) {
                carouselInstance.prev();
            } else {
                carouselInstance.next();
            }
        });
    }

    if (!backToTop) {
        return;
    }

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear().toString();
    }

    const toggleBackToTop = () => {
        if (window.scrollY > 260) {
            backToTop.style.display = 'inline-flex';
        } else {
            backToTop.style.display = 'none';
        }
    };

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();

    backToTop.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
