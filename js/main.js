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
            location_link: 'MATİAT FIRIN PASTA Konumu',
            whatsapp_order: 'WhatsApp Sipariş',
            nav_home: 'Ana Sayfa',
            nav_about: 'Hakkımızda',
            nav_products: 'Ürünler',
            nav_gallery: 'Galeri',
            nav_contact: 'İletişim',
            nav_location: 'Konum',
            uni_badge: 'Öğrencilerin Lezzet Noktası',
            uni_title: 'Çukurova Üniversitesi Girişinde',
            uni_subtitle: 'Taptaze simit, poğaça, börek ve kahve keyfi',
            hero_label: 'Sokak Fırını Lezzeti',
            hero_subtitle: 'Çukurova Üniversitesi girişinde, her gün taze çıkan simit, poğaça, börek ve fırın ürünleri.',
            hero_cta_order: 'WhatsApp’tan Sipariş Ver',
            hero_cta_route: 'Yol Tarifi Al',
            gallery_title: 'Galeri',
            contact_title: 'İletişim',
            open_daily: 'Her gün hizmet',
            open_maps: "Google Maps'te Aç",
            footer_desc: 'Çukurova Üniversitesi çevresinde günlük taze fırın ürünleri sunan modern sokak fırını noktası.',
            quick_links: 'Hızlı Linkler',
            contact_visit: 'İletişim & Ziyaret',
            work_hours: 'Çalışma Saatleri: Her gün 06:30 - 18:30',
            copyright_prefix: 'Telif Hakkı',
            software_engineer: 'Yazılım Mühendisi',
            music_start: 'Müziği Başlat',
            music_stop: 'Müziği Durdur'
        },
        en: {
            location_link: 'MATİAT FIRIN PASTA Location',
            whatsapp_order: 'WhatsApp Order',
            nav_home: 'Home',
            nav_about: 'About',
            nav_products: 'Products',
            nav_gallery: 'Gallery',
            nav_contact: 'Contact',
            nav_location: 'Location',
            uni_badge: 'Students’ Favorite Spot',
            uni_title: 'At Çukurova University Entrance',
            uni_subtitle: 'Fresh simit, poğaça, börek and coffee delight',
            hero_label: 'Street Bakery Taste',
            hero_subtitle: 'At the entrance of Çukurova University, fresh simit, poğaça, börek and bakery products every day.',
            hero_cta_order: 'Order on WhatsApp',
            hero_cta_route: 'Get Directions',
            gallery_title: 'Gallery',
            contact_title: 'Contact',
            open_daily: 'Open every day',
            open_maps: 'Open in Google Maps',
            footer_desc: 'A modern street bakery point serving daily fresh bakery products around Çukurova University.',
            quick_links: 'Quick Links',
            contact_visit: 'Contact & Visit',
            work_hours: 'Working Hours: Every day 06:30 - 18:30',
            copyright_prefix: 'Copyright',
            software_engineer: 'Software Engineer',
            music_start: 'Start Music',
            music_stop: 'Stop Music'
        },
        ar: {
            location_link: 'موقع MATİAT FIRIN PASTA',
            whatsapp_order: 'طلب واتساب',
            nav_home: 'الرئيسية',
            nav_about: 'من نحن',
            nav_products: 'المنتجات',
            nav_gallery: 'المعرض',
            nav_contact: 'التواصل',
            nav_location: 'الموقع',
            uni_badge: 'نقطة الطلاب المفضلة',
            uni_title: 'عند مدخل جامعة تشوكوروفا',
            uni_subtitle: 'سميت وبوغاتشا وبوريك وقهوة طازجة يوميًا',
            hero_label: 'نكهة مخبز الشارع',
            hero_subtitle: 'عند مدخل جامعة تشوكوروفا، نقدم يوميًا سميت وبوغاتشا وبوريك ومنتجات مخبوزات طازجة.',
            hero_cta_order: 'اطلب عبر واتساب',
            hero_cta_route: 'احصل على الاتجاهات',
            gallery_title: 'المعرض',
            contact_title: 'التواصل',
            open_daily: 'خدمة يومية',
            open_maps: 'افتح في خرائط Google',
            footer_desc: 'نقطة مخبز حديثة تقدم منتجات مخبوزات طازجة يوميًا بالقرب من جامعة تشوكوروفا.',
            quick_links: 'روابط سريعة',
            contact_visit: 'التواصل والزيارة',
            work_hours: 'ساعات العمل: يوميًا 06:30 - 18:30',
            copyright_prefix: 'حقوق النشر',
            software_engineer: 'مهندس برمجيات',
            music_start: 'تشغيل الموسيقى',
            music_stop: 'إيقاف الموسيقى'
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

        languageButtons.forEach((btn) => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === selected);
        });

        if (musicToggleText) {
            musicToggleText.textContent = musicIsPlaying ? bundle.music_stop : bundle.music_start;
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
        musicToggle.setAttribute('aria-label', enabled ? 'Müziği durdur' : 'Müziği aç');
        if (musicToggleText) {
            const bundle = translations[currentLang] || translations.tr;
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
