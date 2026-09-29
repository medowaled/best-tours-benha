/**
 * Best Tours Benha — Main Application Logic
 * Pure Vanilla JavaScript ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize State (Arabic Only)
  let currentLang = 'ar';
  let currentCategory = 'all';

  // DOM Elements
  const navbar = document.getElementById('navbar');
  const searchForm = document.getElementById('hero-search-form');
  const destinationGrid = document.getElementById('destinations-container');
  const offersGrid = document.getElementById('offers-container');
  const visasGrid = document.getElementById('visas-container');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const inquiryModal = document.getElementById('inquiry-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalForm = document.getElementById('modal-inquiry-form');
  const toastContainer = document.getElementById('toast-container');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Hero Video Background Controller
  const heroVideo = document.getElementById('hero-video');
  const videoToggleBtn = document.getElementById('video-toggle-btn');
  const videoToggleLabel = document.getElementById('video-toggle-label');
  const videoToggleIcon = document.getElementById('video-toggle-icon');

  if (heroVideo && videoToggleBtn) {
    // Autoplay attempt
    heroVideo.play().catch(() => {
      if (videoToggleIcon) videoToggleIcon.className = 'fa-solid fa-play';
    });

    videoToggleBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        if (videoToggleIcon) videoToggleIcon.className = 'fa-solid fa-pause';
        if (videoToggleLabel) {
          videoToggleLabel.textContent = 'أجواء الحرم المكي الشريف';
        }
      } else {
        heroVideo.pause();
        if (videoToggleIcon) videoToggleIcon.className = 'fa-solid fa-play';
        if (videoToggleLabel) {
          videoToggleLabel.textContent = 'تشغيل فيديو الحرم';
        }
      }
    });
  }

  // 2. Sticky Navbar on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle with Smooth Drawer
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('is-active');
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        icon.className = isActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-active');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-active') && !navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('is-active');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // 3. Render Destinations
  function renderDestinations(category = 'all', searchQuery = '') {
    if (!destinationGrid) return;

    let items = travelData.destinations;

    // Filter by Category
    if (category !== 'all') {
      items = items.filter(dest => dest.category === category);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(dest => {
        const titleAr = dest.titleAr.toLowerCase();
        const titleEn = dest.titleEn.toLowerCase();
        const locAr = dest.locationAr.toLowerCase();
        const locEn = dest.locationEn.toLowerCase();
        return titleAr.includes(q) || titleEn.includes(q) || locAr.includes(q) || locEn.includes(q);
      });
    }

    if (items.length === 0) {
      destinationGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
          <i class="fa-regular fa-compass" style="font-size: 3rem; color: var(--gold-primary); margin-bottom: 1rem;"></i>
          <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--navy-deep); margin-bottom: 0.5rem;">
            ${currentLang === 'ar' ? 'لا توجد رحلات تطابق هذا البحث حالياً' : 'No trips match your search currently'}
          </h4>
          <p>${currentLang === 'ar' ? 'يمكنك تجربة تصنيف آخر أو التواصل المباشر مع فريق بنها لتخصيص رحلتك.' : 'Try another category or contact our Benha desk directly for custom requests.'}</p>
        </div>
      `;
      return;
    }

    destinationGrid.innerHTML = items.map(dest => {
      const isFav = Store.isFavorite(dest.id);
      let title = currentLang === 'ar' ? dest.titleAr : dest.titleEn;
      let location = currentLang === 'ar' ? dest.locationAr : dest.locationEn;
      let duration = currentLang === 'ar' ? dest.durationAr : dest.durationEn;
      let badge = currentLang === 'ar' ? dest.badgeAr : dest.badgeEn;
      let highlights = currentLang === 'ar' ? dest.highlightsAr : dest.highlightsEn;
      let currentPrice = dest.price;
      let currentImage = dest.image;

      // Sync with Store Umrah packages if category is umrah
      if (dest.category === 'umrah') {
        const umrahPkgs = Store.getUmrahPackages();
        const matched = dest.id === 'dest-1' ? umrahPkgs[0] : (dest.id === 'dest-2' ? umrahPkgs[1] : null);
        if (matched) {
          if (matched.price) currentPrice = matched.price;
          if (matched.image) currentImage = matched.image;
          if (matched.titleAr && currentLang === 'ar') title = matched.titleAr;
        }
      }

      return `
        <article class="dest-card" data-id="${dest.id}">
          <div class="dest-image-wrap">
            <img src="${currentImage}" alt="${title}" loading="lazy">
            <span class="dest-badge">${badge}</span>
            <button class="dest-fav-btn ${isFav ? 'active' : ''}" data-id="${dest.id}" aria-label="Favorite" title="Save Favorite">
              <i class="fa-heart ${isFav ? 'fa-solid' : 'fa-regular'}"></i>
            </button>
          </div>
          <div class="dest-content">
            <div class="dest-location">
              <span>${location}</span>
              <span style="margin: 0 0.4rem; color: rgba(0,0,0,0.2);">•</span>
              <span>${duration}</span>
            </div>
            <h3 class="dest-title">${title}</h3>
            <div class="dest-highlights">
              ${highlights.map(h => `
                <div class="dest-highlight-item">
                  <span>${h}</span>
                </div>
              `).join('')}
            </div>
            <div class="dest-footer">
              <div class="dest-price-box">
                <span class="price-label">${currentLang === 'ar' ? 'يبدأ من' : 'Starting from'}</span>
                <div class="price-value">${currentPrice} <span>${dest.currency}</span></div>
              </div>
              <button class="btn btn-gold btn-sm open-inquiry-trigger" data-trip="${title}" data-category="${dest.category}">
                ${currentLang === 'ar' ? 'حجز واستفسار' : 'Book / Inquire'}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach favorites event listeners
    destinationGrid.querySelectorAll('.dest-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const active = Store.toggleFavorite(id);
        btn.classList.toggle('active', active);
        const icon = btn.querySelector('i');
        if (active) {
          icon.classList.remove('fa-regular');
          icon.classList.add('fa-solid');
          showToast(currentLang === 'ar' ? 'تمت إضافة الرحلة للمفضلة' : 'Added to favorites');
        } else {
          icon.classList.remove('fa-solid');
          icon.classList.add('fa-regular');
          showToast(currentLang === 'ar' ? 'تم الحذف من المفضلة' : 'Removed from favorites');
        }
      });
    });

    // Attach inquiry triggers
    destinationGrid.querySelectorAll('.open-inquiry-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const trip = btn.getAttribute('data-trip');
        const cat = btn.getAttribute('data-category');
        openModalWithTrip(trip, cat);
      });
    });
  }

  // 4. Render Featured Offers
  function renderOffers() {
    if (!offersGrid) return;
    offersGrid.innerHTML = travelData.featuredOffers.map(offer => {
      const tag = currentLang === 'ar' ? offer.tagAr : offer.tagEn;
      const title = currentLang === 'ar' ? offer.titleAr : offer.titleEn;
      const desc = currentLang === 'ar' ? offer.descAr : offer.descEn;

      return `
        <div class="offer-card">
          <span class="offer-tag ${offer.badgeColor}">${tag}</span>
          <h3 class="offer-title">${title}</h3>
          <p class="offer-desc">${desc}</p>
          <div class="offer-pricing">
            <span class="offer-price-old">${offer.originalPrice} ${offer.currency}</span>
            <span class="offer-price-new">${offer.offerPrice} <span style="font-size: 1rem; color: var(--gold-primary);">${offer.currency}</span></span>
          </div>
          <button class="btn btn-outline-gold open-inquiry-trigger" data-trip="${title}" data-category="offer">
            ${currentLang === 'ar' ? 'اغتنم العرض الآن' : 'Claim Offer Now'}
          </button>
        </div>
      `;
    }).join('');

    offersGrid.querySelectorAll('.open-inquiry-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const trip = btn.getAttribute('data-trip');
        openModalWithTrip(trip, 'special_offer');
      });
    });
  }

  // 5. Render Visas Section
  function renderVisas() {
    if (!visasGrid) return;
    visasGrid.innerHTML = travelData.visas.map(visa => {
      const country = currentLang === 'ar' ? visa.countryAr : visa.countryEn;
      const time = currentLang === 'ar' ? visa.processingTimeAr : visa.processingTimeEn;
      const scope = currentLang === 'ar' ? visa.scopeAr : visa.scopeEn;
      const rate = currentLang === 'ar' ? visa.rateAr : visa.rateEn;

      return `
        <div class="visa-card">
          <div class="visa-header">
            <span class="visa-flag">${visa.flag}</span>
            <div class="visa-country-info">
              <h3>${country}</h3>
              <span>${scope}</span>
            </div>
          </div>
          <div class="visa-meta">
            <div class="visa-meta-row">
              <span>${currentLang === 'ar' ? 'مدة المعالجة المتوقعة' : 'Processing Time'}</span>
              <span>${time}</span>
            </div>
            <div class="visa-meta-row">
              <span>${currentLang === 'ar' ? 'المستندات المطلوبة' : 'Requirements'}</span>
              <span>${visa.reqsCount} ${currentLang === 'ar' ? 'مستندات رئيسية' : 'Key Documents'}</span>
            </div>
            <div class="visa-meta-row">
              <span>${currentLang === 'ar' ? 'مستوى الخدمة' : 'Service Level'}</span>
              <span style="color: var(--emerald-primary);">${rate}</span>
            </div>
          </div>
          <button class="btn btn-gold btn-sm open-inquiry-trigger" data-trip="${country}" data-category="visa">
            ${currentLang === 'ar' ? 'استخراج التأشيرة وتجهيز الملف' : 'Process Visa'}
          </button>
        </div>
      `;
    }).join('');

    visasGrid.querySelectorAll('.open-inquiry-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const trip = btn.getAttribute('data-trip');
        openModalWithTrip(trip, 'visas');
      });
    });
  }

  // 5b. Render Umrah Packages & Banner Media
  const umrahPackagesGrid = document.getElementById('umrah-packages-container');
  const umrahBannerImg = document.getElementById('umrah-banner-img');
  const umrahBannerTitle = document.getElementById('umrah-banner-title');
  const umrahBannerSubtitle = document.getElementById('umrah-banner-subtitle');
  const umrahHomeBannerImg = document.getElementById('umrah-home-banner-img');

  function renderUmrah() {
    // 1. Update Media (Page banner & Home banner)
    const media = Store.getUmrahMedia();
    if (media) {
      if (umrahBannerImg && media.bannerImage) {
        umrahBannerImg.src = media.bannerImage;
      }
      if (umrahHomeBannerImg && media.bannerImage) {
        umrahHomeBannerImg.src = media.bannerImage;
      }
      if (umrahBannerTitle && media.bannerTitle) {
        umrahBannerTitle.textContent = media.bannerTitle;
      }
      if (umrahBannerSubtitle && media.bannerSubtitle) {
        umrahBannerSubtitle.textContent = media.bannerSubtitle;
      }
    }

    // 2. Render Packages Grid on umrah.html
    if (umrahPackagesGrid) {
      const packages = Store.getUmrahPackages().filter(p => p.active !== false);

      umrahPackagesGrid.innerHTML = packages.map(pkg => {
        const tagColor = pkg.tagColor || 'gold';
        return `
          <div class="offer-card umrah-card-box" data-id="${pkg.id}" style="display: flex; flex-direction: column;">
            <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; aspect-ratio: 16/10;">
              <img src="${pkg.image || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80'}" alt="${pkg.titleAr}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" loading="lazy">
              <span class="offer-tag ${tagColor}" style="position: absolute; top: 12px; right: 12px;">${pkg.tagAr || 'برنامج مميز'}</span>
              ${pkg.durationAr ? `<span style="position: absolute; bottom: 12px; right: 12px; background: rgba(3, 27, 56, 0.85); color: #fff; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; backdrop-filter: blur(4px); font-weight: 600;"><i class="fa-solid fa-clock" style="margin-left: 4px; color: var(--gold-light);"></i>${pkg.durationAr}</span>` : ''}
            </div>
            <h3 class="offer-title" style="font-size: 1.3rem; margin-bottom: 0.5rem;">${pkg.titleAr}</h3>
            ${pkg.hotelsAr ? `<p style="font-size: 0.9rem; color: var(--gold-light); margin-bottom: 0.75rem;"><i class="fa-solid fa-hotel" style="margin-left: 5px;"></i>${pkg.hotelsAr}</p>` : ''}
            <p class="offer-desc" style="flex: 1; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">${pkg.descAr || ''}</p>
            
            <div class="offer-pricing" style="margin-top: auto;">
              ${pkg.oldPrice ? `<span class="offer-price-old">${pkg.oldPrice} ${pkg.currency || 'ج.م'}</span>` : ''}
              <span class="offer-price-new">${pkg.price} <span style="font-size: 1rem; color: var(--gold-primary);">${pkg.currency || 'ج.م'}</span></span>
            </div>

            <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
              <button class="btn btn-outline-gold open-inquiry-trigger" data-trip="${pkg.titleAr}" data-category="umrah" style="flex: 1;">
                حجز مقعد الآن
              </button>
              <a href="${Store.buildWhatsAppUrl({ tripTitle: pkg.titleAr, serviceType: 'عمرة وحج', notes: 'الاستفسار عن سعر: ' + pkg.price })}" target="_blank" class="btn btn-emerald" style="padding: 0 1rem; display: inline-flex; align-items: center; justify-content: center;" title="تحدث عبر واتساب">
                <i class="fa-brands fa-whatsapp" style="font-size: 1.2rem;"></i>
              </a>
            </div>
          </div>
        `;
      }).join('');

      umrahPackagesGrid.querySelectorAll('.open-inquiry-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
          const trip = btn.getAttribute('data-trip');
          openModalWithTrip(trip, 'umrah');
        });
      });
    }
  }

  // Reactive listeners for live updates from dashboard
  window.addEventListener('btb:umrah-packages-updated', () => {
    renderUmrah();
    renderDestinations(currentCategory);
  });
  window.addEventListener('btb:umrah-media-updated', () => {
    renderUmrah();
  });
  window.addEventListener('storage', (e) => {
    if (e.key === Store.KEYS.UMRAH_PACKAGES || e.key === Store.KEYS.UMRAH_MEDIA) {
      renderUmrah();
      renderDestinations(currentCategory);
    }
  });

  // 6. Interactive Tab Bar Filter
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderDestinations(currentCategory);
    });
  });

  // 7. Hero Search Form Handler -> Direct WhatsApp Inquiry with Form Data
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const destInput = document.getElementById('search-dest');
      const serviceSelect = document.getElementById('search-service');
      const dateInput = document.getElementById('search-date');
      const travelersSelect = document.getElementById('search-travelers');

      const destination = destInput?.value?.trim() || (currentLang === 'ar' ? 'عام / غير محدد' : 'General / Flexible');
      const serviceText = serviceSelect?.options[serviceSelect.selectedIndex]?.text || (currentLang === 'ar' ? 'جميع البرامج' : 'All Programs');
      const serviceValue = serviceSelect?.value || 'all';
      const travelDate = dateInput?.value || (currentLang === 'ar' ? 'مرن / أقرب موعد متاح' : 'Flexible / Earliest Date');
      const travelersText = travelersSelect?.options[travelersSelect.selectedIndex]?.text || (currentLang === 'ar' ? 'مسافر واحد' : '1 Traveler');
      const travelersValue = travelersSelect?.value || '1';

      // 1. Save to recent searches & local store
      Store.saveSearch({ destination, serviceType: serviceValue, travelDate, travelers: travelersValue });

      // 2. Sync category tab on page
      if (serviceValue && serviceValue !== 'all') {
        currentCategory = serviceValue;
        tabButtons.forEach(btn => {
          if (btn.getAttribute('data-category') === serviceValue) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
      renderDestinations(currentCategory, destInput?.value?.trim() || '');

      // 3. Compile Pre-filled WhatsApp message
      const phone = window.travelData?.companyInfo?.whatsapp || '201050079811';
      let waMessage = '';

      if (currentLang === 'ar') {
        waMessage = `السلام عليكم شركة بست تورز بنها 🌟\n` +
                    `أود الاستفسار والحجز للبيانات التالية:\n\n` +
                    `📍 الوجهة أو الرحلة: ${destination}\n` +
                    `🏷️ نوع الخدمة: ${serviceText}\n` +
                    `📅 موعد السفر المفضل: ${travelDate}\n` +
                    `👥 عدد المسافرين: ${travelersText}\n\n` +
                    `برجاء تزويدي بأفضل البرامج والأسعار المتاحة لديكم وطريقة تأكيد الحجز.`;
      } else {
        waMessage = `Hello Best Tours Benha 🌟\n` +
                    `I would like to inquire and book with the following details:\n\n` +
                    `📍 Destination / Trip: ${destination}\n` +
                    `🏷️ Service Type: ${serviceText}\n` +
                    `📅 Preferred Travel Date: ${travelDate}\n` +
                    `👥 Number of Travelers: ${travelersText}\n\n` +
                    `Please provide the best available packages, rates, and confirmation details.`;
      }

      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waMessage)}`;

      // 4. Feedback toast & open WhatsApp
      showToast(currentLang === 'ar' ? 'جاري تحويلك إلى واتساب بست تورز بنها...' : 'Redirecting to WhatsApp...');

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 300);
    });
  }

  // Quick tag chips
  document.querySelectorAll('.quick-tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      const input = document.getElementById('search-dest');
      if (input) input.value = q;
      searchForm.dispatchEvent(new Event('submit'));
    });
  });

  // 8. Inquiry Modal Handlers
  function openModalWithTrip(tripTitle = '', serviceCategory = 'general') {
    if (!inquiryModal) return;
    const tripInput = document.getElementById('modal-trip-title');
    const serviceSelect = document.getElementById('modal-service-type');
    
    if (tripInput) tripInput.value = tripTitle || (currentLang === 'ar' ? 'استفسار عام' : 'General Inquiry');
    if (serviceSelect && serviceCategory) {
      serviceSelect.value = serviceCategory;
    }

    inquiryModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!inquiryModal) return;
    inquiryModal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  inquiryModal?.addEventListener('click', (e) => {
    if (e.target === inquiryModal) closeModal();
  });

  // Attach all general inquiry buttons
  document.querySelectorAll('.open-general-inquiry').forEach(btn => {
    btn.addEventListener('click', () => {
      openModalWithTrip(currentLang === 'ar' ? 'حجز رحلة خاصة' : 'Custom Trip Inquiry', 'general');
    });
  });

  // Modal Form Submission
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const leadData = {
        fullName: document.getElementById('modal-fullname')?.value || '',
        phone: document.getElementById('modal-phone')?.value || '',
        tripTitle: document.getElementById('modal-trip-title')?.value || '',
        serviceType: document.getElementById('modal-service-type')?.value || '',
        travelers: document.getElementById('modal-travelers')?.value || '1',
        travelDate: document.getElementById('modal-date')?.value || '',
        notes: document.getElementById('modal-notes')?.value || '',
        preferredMethod: document.getElementById('modal-method')?.value || 'whatsapp'
      };

      // 1. Save to LocalStorage
      const savedLead = Store.saveInquiry(leadData);

      // 2. Feedback to User
      closeModal();
      showToast(currentLang === 'ar' ? `شكراً لك! تم تسجيل طلبك برقم ${savedLead.id}` : `Thank you! Inquiry registered (${savedLead.id})`);

      // 3. If WhatsApp chosen, open direct link
      if (leadData.preferredMethod === 'whatsapp') {
        setTimeout(() => {
          const waUrl = Store.buildWhatsAppUrl(leadData);
          window.open(waUrl, '_blank');
        }, 600);
      }

      modalForm.reset();
    });
  }

  // 9. Toast Notification Utility
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
  window.showToast = showToast;

  // 10. Secret Admin Login via Logo Click
  function initAdminSecretEntrance() {
    let adminModal = document.getElementById('admin-secret-modal');
    if (!adminModal) {
      adminModal = document.createElement('div');
      adminModal.id = 'admin-secret-modal';
      adminModal.className = 'modal-backdrop';
      adminModal.setAttribute('role', 'dialog');
      adminModal.setAttribute('aria-modal', 'true');
      adminModal.innerHTML = `
        <div class="modal-dialog admin-login-dialog">
          <div class="modal-header" style="justify-content: flex-end; border: none; padding-bottom: 0;">
            <button id="admin-modal-close" class="modal-close-btn" aria-label="Close dialog">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="modal-body" style="padding-top: 0.5rem; text-align: center;">
            <div class="admin-login-icon">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
            <h3 style="font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: 0.35rem;">
              تسجيل دخول لوحة التحكم
            </h3>
            <p style="color: var(--gold-light); font-size: 0.85rem; margin-bottom: 1.5rem;">
              بست تورز بنها • إدارة الأسعار والصور
            </p>

            <div id="admin-login-error-msg" class="admin-login-error">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <span>اسم المستخدم أو كلمة المرور غير صحيحة!</span>
            </div>

            <form id="admin-secret-form" style="display: flex; flex-direction: column; gap: 1rem; text-align: right;">
              <div class="form-group">
                <label for="admin-user-input" style="font-size: 0.85rem; color: var(--gold-light); font-weight: 700;">اسم المستخدم (Username)</label>
                <div class="admin-input-wrap">
                  <input type="text" id="admin-user-input" placeholder="اسم المستخدم" required autocomplete="username">
                  <span class="admin-input-icon"><i class="fa-solid fa-user"></i></span>
                </div>
              </div>

              <div class="form-group">
                <label for="admin-pass-input" style="font-size: 0.85rem; color: var(--gold-light); font-weight: 700;">كلمة المرور (Password)</label>
                <div class="admin-input-wrap">
                  <input type="password" id="admin-pass-input" placeholder="••••••••" required autocomplete="current-password">
                  <button type="button" id="admin-toggle-pass" class="admin-input-icon" title="إظهار / إخفاء">
                    <i class="fa-regular fa-eye" id="admin-eye-icon"></i>
                  </button>
                </div>
              </div>

              <button type="submit" class="btn btn-gold" style="width: 100%; margin-top: 0.5rem; justify-content: center; font-size: 1rem; font-weight: 800;">
                <i class="fa-solid fa-right-to-bracket" style="margin-left: 6px;"></i>
                <span>دخول لوحة التحكم</span>
              </button>
            </form>
          </div>
        </div>
      `;
      document.body.appendChild(adminModal);
    }

    const adminCloseBtn = document.getElementById('admin-modal-close');
    const adminForm = document.getElementById('admin-secret-form');
    const adminUserInput = document.getElementById('admin-user-input');
    const adminPassInput = document.getElementById('admin-pass-input');
    const adminErrorMsg = document.getElementById('admin-login-error-msg');
    const adminTogglePass = document.getElementById('admin-toggle-pass');
    const adminEyeIcon = document.getElementById('admin-eye-icon');

    function openAdminModal() {
      if (adminErrorMsg) adminErrorMsg.style.display = 'none';
      if (adminUserInput) adminUserInput.value = '';
      if (adminPassInput) adminPassInput.value = '';
      adminModal.classList.add('open');
      setTimeout(() => adminUserInput?.focus(), 150);
    }

    function closeAdminModal() {
      adminModal.classList.remove('open');
    }

    if (adminCloseBtn) adminCloseBtn.addEventListener('click', closeAdminModal);
    adminModal.addEventListener('click', (e) => {
      if (e.target === adminModal) closeAdminModal();
    });

    if (adminTogglePass && adminPassInput && adminEyeIcon) {
      adminTogglePass.addEventListener('click', (e) => {
        e.preventDefault();
        const isPass = adminPassInput.type === 'password';
        adminPassInput.type = isPass ? 'text' : 'password';
        adminEyeIcon.className = isPass ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
      });
    }

    // Attach to all brand logo images and brand logos to open dashboard.html
    document.querySelectorAll('.brand-logo-img, .brand-logo').forEach(logoEl => {
      logoEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = 'dashboard.html';
      });
    });

    // Form Submit verification
    if (adminForm) {
      adminForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = adminUserInput.value.trim().toLowerCase();
        const pass = adminPassInput.value.trim();

        const creds = await CloudStore.getAdminCredentials();
        const validUser = (creds.username || 'best').toLowerCase().trim();
        const validPass = (creds.password || '112233').trim();

        if (user === validUser && pass === validPass) {
          sessionStorage.setItem('btb_admin_auth', 'true');
          localStorage.setItem('btb_admin_auth', 'true');
          if (adminErrorMsg) adminErrorMsg.style.display = 'none';
          showToast('تم تسجيل الدخول بنجاح! جاري تحويلك للوحة التحكم...');
          closeAdminModal();
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 500);
        } else {
          if (adminErrorMsg) {
            adminErrorMsg.style.display = 'flex';
          }
        }
      });
    }
  }

  // Initial renders
  renderDestinations(currentCategory);
  renderOffers();
  renderVisas();
  renderUmrah();
  initAdminSecretEntrance();

  // Cloud Hydration for Visitors
  if (typeof CloudStore !== 'undefined' && CloudStore.isActive()) {
    CloudStore.getUmrahPackages().then(pkgs => {
      if (pkgs && pkgs.length) {
        renderUmrah();
        renderDestinations(currentCategory);
      }
    });
    CloudStore.getUmrahMedia().then(media => {
      if (media) {
        renderUmrah();
      }
    });
  }
});

