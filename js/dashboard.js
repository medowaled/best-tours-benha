/**
 * Best Tours Benha — Admin Dashboard Script
 * Manages Umrah Packages, Prices, Images, Media, and Inquiries
 */

document.addEventListener('DOMContentLoaded', () => {
  // Auth Guard Verification
  const authGuard = document.getElementById('dash-auth-guard');
  const guardForm = document.getElementById('dash-guard-form');
  const guardUser = document.getElementById('guard-user');
  const guardPass = document.getElementById('guard-pass');
  const guardError = document.getElementById('dash-guard-error');
  const btnLogout = document.getElementById('btn-admin-logout');

  function checkAuth() {
    const isAuth = sessionStorage.getItem('btb_admin_auth') === 'true' || localStorage.getItem('btb_admin_auth') === 'true';
    if (isAuth) {
      if (authGuard) authGuard.style.display = 'none';
    } else {
      if (authGuard) authGuard.style.display = 'flex';
    }
  }

  checkAuth();

  if (guardForm) {
    guardForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const u = guardUser.value.trim().toLowerCase();
      const p = guardPass.value.trim();

      const creds = await CloudStore.getAdminCredentials();
      const validUser = (creds.username || 'best').toLowerCase().trim();
      const validPass = (creds.password || '112233').trim();

      if (u === validUser && p === validPass) {
        sessionStorage.setItem('btb_admin_auth', 'true');
        localStorage.setItem('btb_admin_auth', 'true');
        if (guardError) guardError.style.display = 'none';
        if (authGuard) authGuard.style.display = 'none';
        showToast('تم تسجيل الدخول بنجاح! مرحباً بك.');
      } else {
        if (guardError) guardError.style.display = 'flex';
      }
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm('هل تريد تسجيل الخروج من لوحة التحكم؟')) {
        sessionStorage.removeItem('btb_admin_auth');
        localStorage.removeItem('btb_admin_auth');
        window.location.href = 'index.html';
      }
    });
  }

  // Curated High-Resolution Haramain Photo Library
  const HARAMAIN_PHOTOS = [
    {
      title: "الكعبة المشرفة وصحن الطواف",
      url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "المسجد النبوي الشريف والمظلات",
      url: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "أجواء الحرم المكي الشريف",
      url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "أبراج مكة والصفوة",
      url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "المدينة المنورة والقبة الخضراء",
      url: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "جبل النور وغار حراء",
      url: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // DOM Elements
  const tabButtons = document.querySelectorAll('.dash-tab-btn');
  const tabPanels = document.querySelectorAll('.dash-panel');
  const packagesContainer = document.getElementById('dash-packages-container');
  const searchInput = document.getElementById('pkg-search-input');
  const btnAddPkg = document.getElementById('btn-add-pkg');
  const btnResetPkgs = document.getElementById('btn-reset-pkgs');

  // Stats Elements
  const statTotalPkgs = document.getElementById('stat-total-pkgs');
  const statActivePkgs = document.getElementById('stat-active-pkgs');
  const statAvgPrice = document.getElementById('stat-avg-price');
  const statTotalInquiries = document.getElementById('stat-total-inquiries');

  // Modal Elements
  const pkgModal = document.getElementById('pkg-modal');
  const modalHeading = document.getElementById('modal-pkg-heading');
  const btnCloseModal = document.getElementById('btn-close-pkg-modal');
  const btnCancelPkg = document.getElementById('btn-cancel-pkg');
  const pkgForm = document.getElementById('pkg-form');
  const pkgIdInput = document.getElementById('pkg-id-input');
  const pkgTitleInput = document.getElementById('pkg-title-input');
  const pkgTagInput = document.getElementById('pkg-tag-input');
  const pkgPriceInput = document.getElementById('pkg-price-input');
  const pkgOldPriceInput = document.getElementById('pkg-oldprice-input');
  const pkgDurationInput = document.getElementById('pkg-duration-input');
  const pkgHotelsInput = document.getElementById('pkg-hotels-input');
  const pkgImgUrlInput = document.getElementById('pkg-img-url');
  const pkgFileInput = document.getElementById('pkg-file-input');
  const pkgPreviewImg = document.getElementById('pkg-preview-img');
  const pkgQuickPhotos = document.getElementById('pkg-quick-photos');
  const pkgDescInput = document.getElementById('pkg-desc-input');
  const pkgActiveInput = document.getElementById('pkg-active-input');

  // Banner Settings Elements
  const bannerPreviewImg = document.getElementById('banner-preview-img');
  const bannerImgUrlInput = document.getElementById('banner-img-url');
  const bannerFileInput = document.getElementById('banner-file-input');
  const bannerQuickPhotos = document.getElementById('banner-quick-photos');
  const bannerTitleInput = document.getElementById('banner-title-input');
  const bannerSubtitleInput = document.getElementById('banner-subtitle-input');
  const btnSaveBanner = document.getElementById('btn-save-banner');
  const btnResetBanner = document.getElementById('btn-reset-banner');

  // Inquiries Elements
  const inquiriesTableBody = document.getElementById('inquiries-table-body');
  const btnClearInquiries = document.getElementById('btn-clear-inquiries');
  const toastContainer = document.getElementById('toast-container');

  // 1. Tab Switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(tabId);
      if (targetPanel) targetPanel.classList.add('active');

      if (tabId === 'tab-inquiries') {
        renderInquiries();
      }
    });
  });

  // 2. Initialize Quick Photo Pickers
  function initQuickPhotos(container, imgInput, previewImg) {
    if (!container) return;
    container.innerHTML = HARAMAIN_PHOTOS.map((item, idx) => `
      <div class="dash-thumb-option" data-url="${item.url}" title="${item.title}">
        <img src="${item.url}" alt="${item.title}">
      </div>
    `).join('');

    container.querySelectorAll('.dash-thumb-option').forEach(thumb => {
      thumb.addEventListener('click', () => {
        container.querySelectorAll('.dash-thumb-option').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const url = thumb.getAttribute('data-url');
        if (imgInput) imgInput.value = url;
        if (previewImg) previewImg.src = url;
      });
    });
  }

  initQuickPhotos(pkgQuickPhotos, pkgImgUrlInput, pkgPreviewImg);
  initQuickPhotos(bannerQuickPhotos, bannerImgUrlInput, bannerPreviewImg);

  // 3. File Upload Preview Handlers (FileReader -> DataURL)
  function attachFileUploader(fileInput, urlInput, previewImg) {
    if (!fileInput) return;
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 4 * 1024 * 1024) {
        showToast('حجم الصورة كبير نسبياً، يفضل اختيار صورة أقل من 4 ميجابايت لضمان سرعة التحميل');
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        if (previewImg) previewImg.src = dataUrl;
        if (urlInput) urlInput.value = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  }

  attachFileUploader(pkgFileInput, pkgImgUrlInput, pkgPreviewImg);
  attachFileUploader(bannerFileInput, bannerImgUrlInput, bannerPreviewImg);

  // URL Input live preview
  pkgImgUrlInput.addEventListener('input', () => {
    if (pkgImgUrlInput.value.trim()) {
      pkgPreviewImg.src = pkgImgUrlInput.value.trim();
    }
  });

  bannerImgUrlInput.addEventListener('input', () => {
    if (bannerImgUrlInput.value.trim()) {
      bannerPreviewImg.src = bannerImgUrlInput.value.trim();
    }
  });

  // 4. Update Stats
  function updateStats() {
    const packages = Store.getUmrahPackages();
    const inquiries = Store.getInquiries();

    const total = packages.length;
    const active = packages.filter(p => p.active !== false).length;

    // Calculate Average Price
    let priceSum = 0;
    let priceCount = 0;
    packages.forEach(p => {
      const num = parseInt(String(p.price).replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num) && num > 0) {
        priceSum += num;
        priceCount++;
      }
    });
    const avg = priceCount > 0 ? Math.round(priceSum / priceCount).toLocaleString() : '0';

    if (statTotalPkgs) statTotalPkgs.textContent = total;
    if (statActivePkgs) statActivePkgs.textContent = active;
    if (statAvgPrice) statAvgPrice.textContent = `${avg} ج.م`;
    if (statTotalInquiries) statTotalInquiries.textContent = inquiries.length;
  }

  // 5. Render Umrah Packages
  function renderPackages(query = '') {
    if (!packagesContainer) return;
    let packages = Store.getUmrahPackages();

    if (query.trim() !== '') {
      const q = query.toLowerCase().trim();
      packages = packages.filter(p => {
        const t = (p.titleAr || '').toLowerCase();
        const h = (p.hotelsAr || '').toLowerCase();
        const tag = (p.tagAr || '').toLowerCase();
        return t.includes(q) || h.includes(q) || tag.includes(q);
      });
    }

    if (packages.length === 0) {
      packagesContainer.innerHTML = `
        <div class="dash-empty-state" style="grid-column: 1 / -1;">
          <i class="fa-solid fa-kaaba"></i>
          <h3>لا توجد برامج عمرة مطابقة</h3>
          <p>يمكنك إضافة برنامج جديد أو استعادة الباقات الافتراضية.</p>
        </div>
      `;
      return;
    }

    packagesContainer.innerHTML = packages.map(pkg => {
      const isActive = pkg.active !== false;
      const tag = pkg.tagAr || 'برنامج معتمد';
      const img = pkg.image || HARAMAIN_PHOTOS[0].url;

      return `
        <div class="dash-pkg-card" data-id="${pkg.id}">
          <div class="dash-pkg-media">
            <img src="${img}" alt="${pkg.titleAr}" loading="lazy">
            <span class="dash-pkg-badge">${tag}</span>
            ${pkg.durationAr ? `<span class="dash-pkg-duration"><i class="fa-solid fa-clock" style="margin-left: 4px;"></i>${pkg.durationAr}</span>` : ''}
          </div>

          <div class="dash-pkg-body">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem;">
              <h3 class="dash-pkg-title">${pkg.titleAr}</h3>
              <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.8rem; font-weight: 700; color: ${isActive ? 'var(--dash-emerald)' : '#9ca3af'}; background: ${isActive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.08)'}; padding: 3px 8px; border-radius: 6px;">
                ${isActive ? 'معروض بالموقع' : 'مخفي'}
              </span>
            </div>

            ${pkg.hotelsAr ? `<div class="dash-pkg-hotels"><i class="fa-solid fa-hotel"></i> <span>${pkg.hotelsAr}</span></div>` : ''}
            <p class="dash-pkg-desc">${pkg.descAr || 'برنامج عمرة متميز مع بست تورز بنها.'}</p>

            <div class="dash-pkg-pricing">
              <div class="dash-price-current">
                <span>السعر الحالي للمعتمِر:</span>
                <strong>${pkg.price} <small style="font-size: 0.85rem; color: var(--dash-gold);">${pkg.currency || 'ج.م'}</small></strong>
              </div>
              ${pkg.oldPrice ? `
                <div style="text-align: left;">
                  <div style="font-size: 0.75rem; color: var(--dash-muted);">السعر السابق:</div>
                  <div class="dash-price-old">${pkg.oldPrice} ${pkg.currency || 'ج.م'}</div>
                </div>
              ` : ''}
            </div>

            <div class="dash-pkg-actions">
              <button class="dash-btn dash-btn-gold dash-btn-sm btn-edit-pkg" data-id="${pkg.id}">
                <i class="fa-solid fa-pen-to-square"></i>
                <span>تعديل السعر والصورة</span>
              </button>
              <button class="dash-btn dash-btn-outline dash-btn-sm btn-toggle-active" data-id="${pkg.id}" title="${isActive ? 'إخفاء من الموقع' : 'إظهار في الموقع'}">
                <i class="fa-solid ${isActive ? 'fa-eye-slash' : 'fa-eye'}"></i>
              </button>
              <button class="dash-btn dash-btn-danger dash-btn-sm btn-delete-pkg" data-id="${pkg.id}" title="حذف البرنامج">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach card event listeners
    packagesContainer.querySelectorAll('.btn-edit-pkg').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openEditModal(id);
      });
    });

    packagesContainer.querySelectorAll('.btn-toggle-active').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        togglePackageActive(id);
      });
    });

    packagesContainer.querySelectorAll('.btn-delete-pkg').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deletePackage(id);
      });
    });

    updateStats();
  }

  // Search input filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderPackages(e.target.value);
    });
  }

  // 6. Modal Open / Close / Save
  function openAddModal() {
    modalHeading.textContent = 'إضافة باقة عمرة جديدة';
    pkgIdInput.value = '';
    pkgTitleInput.value = '';
    pkgTagInput.value = 'خمس نجوم VIP';
    pkgPriceInput.value = '';
    pkgOldPriceInput.value = '';
    pkgDurationInput.value = '10 أيام / 9 ليالٍ';
    pkgHotelsInput.value = 'أبراج الصفوة (مكة) وموفنبيك (المدينة)';
    pkgImgUrlInput.value = HARAMAIN_PHOTOS[0].url;
    pkgPreviewImg.src = HARAMAIN_PHOTOS[0].url;
    pkgDescInput.value = 'إقامة مميزة مع بوفيه مفتوح، طيران مباشر من القاهرة، وإشراف ديني على مدار الساعة.';
    pkgActiveInput.checked = true;

    pkgModal.classList.add('open');
  }

  function openEditModal(id) {
    const packages = Store.getUmrahPackages();
    const pkg = packages.find(p => p.id === id);
    if (!pkg) return;

    modalHeading.textContent = `تعديل باقة: ${pkg.titleAr}`;
    pkgIdInput.value = pkg.id;
    pkgTitleInput.value = pkg.titleAr || '';
    pkgTagInput.value = pkg.tagAr || '';
    pkgPriceInput.value = pkg.price || '';
    pkgOldPriceInput.value = pkg.oldPrice || '';
    pkgDurationInput.value = pkg.durationAr || '';
    pkgHotelsInput.value = pkg.hotelsAr || '';
    
    const imgUrl = pkg.image || HARAMAIN_PHOTOS[0].url;
    pkgImgUrlInput.value = imgUrl;
    pkgPreviewImg.src = imgUrl;

    pkgDescInput.value = pkg.descAr || '';
    pkgActiveInput.checked = pkg.active !== false;

    pkgModal.classList.add('open');
  }

  function closeModal() {
    pkgModal.classList.remove('open');
  }

  if (btnAddPkg) btnAddPkg.addEventListener('click', openAddModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnCancelPkg) btnCancelPkg.addEventListener('click', closeModal);

  pkgModal.addEventListener('click', (e) => {
    if (e.target === pkgModal) closeModal();
  });

  // Save Package Form Submit
  pkgForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = pkgIdInput.value;
    const pkgData = {
      titleAr: pkgTitleInput.value.trim(),
      tagAr: pkgTagInput.value.trim() || 'برنامج معتمد',
      price: pkgPriceInput.value.trim(),
      oldPrice: pkgOldPriceInput.value.trim(),
      durationAr: pkgDurationInput.value.trim(),
      hotelsAr: pkgHotelsInput.value.trim(),
      image: pkgImgUrlInput.value.trim() || HARAMAIN_PHOTOS[0].url,
      descAr: pkgDescInput.value.trim(),
      active: pkgActiveInput.checked
    };

    if (id) {
      Store.updateUmrahPackage(id, pkgData);
      CloudStore.saveUmrahPackages(Store.getUmrahPackages());
      showToast(`تم تحديث باقة "${pkgData.titleAr}" بنجاح ونشر التعديلات بالموقع!`);
    } else {
      Store.addUmrahPackage(pkgData);
      CloudStore.saveUmrahPackages(Store.getUmrahPackages());
      showToast(`تمت إضافة الباقة الجديدة "${pkgData.titleAr}" بنجاح!`);
    }

    closeModal();
    renderPackages(searchInput ? searchInput.value : '');
  });

  // Toggle Active State
  function togglePackageActive(id) {
    const packages = Store.getUmrahPackages();
    const pkg = packages.find(p => p.id === id);
    if (!pkg) return;

    const nextState = pkg.active === false ? true : false;
    Store.updateUmrahPackage(id, { active: nextState });
    CloudStore.saveUmrahPackages(Store.getUmrahPackages());
    showToast(nextState ? `تم تفعيل عرض "${pkg.titleAr}" بالموقع` : `تم إخفاء "${pkg.titleAr}" من الموقع`);
    renderPackages(searchInput ? searchInput.value : '');
  }

  // Delete Package
  function deletePackage(id) {
    const packages = Store.getUmrahPackages();
    const pkg = packages.find(p => p.id === id);
    if (!pkg) return;

    if (confirm(`هل أنت متأكد من حذف برنامج "${pkg.titleAr}" نهائياً من الموقع؟`)) {
      Store.deleteUmrahPackage(id);
      CloudStore.saveUmrahPackages(Store.getUmrahPackages());
      showToast(`تم حذف برنامج "${pkg.titleAr}" بنجاح`);
      renderPackages(searchInput ? searchInput.value : '');
    }
  }

  // Reset Packages to Defaults
  if (btnResetPkgs) {
    btnResetPkgs.addEventListener('click', () => {
      if (confirm('هل ترغب في استعادة باقات الحج والعمرة والأسعار الافتراضية الأصلية؟')) {
        const defaults = Store.resetUmrahPackages();
        CloudStore.saveUmrahPackages(defaults);
        showToast('تمت استعادة باقات وأسعار العمرة الافتراضية بنجاح!');
        renderPackages();
      }
    });
  }

  // 7. Banner Media Tab Logic
  function loadBannerSettings() {
    const media = Store.getUmrahMedia();
    if (!media) return;

    if (bannerPreviewImg && media.bannerImage) bannerPreviewImg.src = media.bannerImage;
    if (bannerImgUrlInput && media.bannerImage) bannerImgUrlInput.value = media.bannerImage;
    if (bannerTitleInput && media.bannerTitle) bannerTitleInput.value = media.bannerTitle;
    if (bannerSubtitleInput && media.bannerSubtitle) bannerSubtitleInput.value = media.bannerSubtitle;
  }

  if (btnSaveBanner) {
    btnSaveBanner.addEventListener('click', async () => {
      const bannerData = {
        bannerImage: bannerImgUrlInput.value.trim() || HARAMAIN_PHOTOS[0].url,
        bannerTitle: bannerTitleInput.value.trim(),
        bannerSubtitle: bannerSubtitleInput.value.trim()
      };

      Store.saveUmrahMedia(bannerData);
      await CloudStore.saveUmrahMedia(bannerData);
      showToast('تم حفظ ونشر صورة ونصوص بنر الحج والعمرة بالموقع بنجاح!');
    });
  }

  if (btnResetBanner) {
    btnResetBanner.addEventListener('click', async () => {
      if (confirm('هل تود استعادة بنر الحرم ونصوصه الافتراضية؟')) {
        const defaults = Store.resetUmrahMedia();
        await CloudStore.saveUmrahMedia(defaults);
        loadBannerSettings();
        showToast('تمت استعادة إعدادات البنر الافتراضية بنجاح');
      }
    });
  }

  // 8. Inquiries Tab Logic
  function renderInquiries() {
    if (!inquiriesTableBody) return;
    const inquiries = Store.getInquiries();

    if (inquiries.length === 0) {
      inquiriesTableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 3rem; color: var(--dash-muted);">
            <i class="fa-solid fa-inbox" style="font-size: 2.5rem; color: var(--dash-gold); margin-bottom: 0.5rem; display: block;"></i>
            لم يتم تسجيل أي استفسارات أو حجوزات جديدة حتى الآن.
          </td>
        </tr>
      `;
      return;
    }

    inquiriesTableBody.innerHTML = inquiries.map(item => {
      const dateStr = item.timestamp ? new Date(item.timestamp).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';
      const cleanPhone = (item.phone || '').replace(/[^0-9]/g, '');
      const waPhone = cleanPhone.startsWith('20') ? cleanPhone : (cleanPhone.startsWith('0') ? '2' + cleanPhone : '20' + cleanPhone);
      
      const waMessage = `مرحباً أستاذ ${item.fullName || 'العميل العزيز'}، معك شركة بست تورز بنها للسياحة.\nبخصوص طلبكم الكريم المسجل بالموقع لبرنامج (${item.tripTitle || 'الحج والعمرة'})... يسعدنا خدمتكم وتأكيد التفاصيل.`;
      const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;

      return `
        <tr>
          <td><strong style="color: var(--dash-gold-light); font-size: 0.85rem;">${item.id || '-'}</strong></td>
          <td><strong style="color: #fff;">${item.fullName || 'زائر الموقع'}</strong></td>
          <td dir="ltr" style="text-align: right;"><a href="tel:${item.phone}" style="color: var(--dash-gold-light); text-decoration: none;">${item.phone || '-'}</a></td>
          <td><span style="background: rgba(197, 160, 89, 0.15); color: var(--dash-gold-light); padding: 3px 8px; border-radius: 6px; font-size: 0.85rem;">${item.tripTitle || item.serviceType || 'استفسار عام'}</span></td>
          <td>${item.travelers || '1'} فرد</td>
          <td>${item.travelDate || '-'}</td>
          <td style="font-size: 0.85rem; color: var(--dash-muted);">${dateStr}</td>
          <td>
            <div style="display: flex; gap: 0.5rem;">
              <a href="${waLink}" target="_blank" class="dash-btn dash-btn-emerald dash-btn-sm" title="مراسلة العميل واتساب">
                <i class="fa-brands fa-whatsapp"></i>
                <span>واتساب</span>
              </a>
              <button class="dash-btn dash-btn-danger dash-btn-sm btn-delete-inquiry" data-id="${item.id}" title="حذف الطلب">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    inquiriesTableBody.querySelectorAll('.btn-delete-inquiry').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        Store.deleteInquiry(id);
        showToast('تم حذف الطلب من السجل');
        renderInquiries();
        updateStats();
      });
    });
  }

  if (btnClearInquiries) {
    btnClearInquiries.addEventListener('click', () => {
      if (confirm('هل أنت متأكد من مسح جميع استفسارات العملاء المسجلة؟')) {
        Store.clearInquiries();
        showToast('تم مسح سجل الاستفسارات بالكامل');
        renderInquiries();
        updateStats();
      }
    });
  }

  // 9. Admin Account (Username & Password) Settings Form
  const accountForm = document.getElementById('admin-account-form');
  const accNewUser = document.getElementById('acc-new-user');
  const accNewPass = document.getElementById('acc-new-pass');
  const accConfirmPass = document.getElementById('acc-confirm-pass');

  if (accountForm) {
    CloudStore.getAdminCredentials().then(creds => {
      if (accNewUser && creds.username) accNewUser.value = creds.username;
    });

    accountForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const u = accNewUser.value.trim();
      const p = accNewPass.value.trim();
      const cp = accConfirmPass.value.trim();

      if (p !== cp) {
        showToast('خطأ: كلمتا المرور غير متطابقتين!');
        return;
      }
      if (p.length < 4) {
        showToast('خطأ: كلمة المرور يجب ألا تقل عن 4 خانات');
        return;
      }

      const ok = await CloudStore.updateAdminCredentials(u, p);
      if (ok) {
        showToast('تم تحديث بيانات الدخول بنجاح على Firebase!');
        accNewPass.value = '';
        accConfirmPass.value = '';
      } else {
        showToast('حدث خطأ أثناء الحفظ، يرجى المحاولة لاحقاً');
      }
    });
  }

  // 10. Toast Notification Helper
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // Initial Runs & Cloud Hydration
  async function initDashboard() {
    renderPackages();
    loadBannerSettings();
    updateStats();

    // Fetch latest cloud data in background if connected
    if (CloudStore.isActive()) {
      const cloudPkgs = await CloudStore.getUmrahPackages();
      if (cloudPkgs && cloudPkgs.length) {
        renderPackages(searchInput ? searchInput.value : '');
      }
      const cloudMedia = await CloudStore.getUmrahMedia();
      if (cloudMedia) {
        loadBannerSettings();
      }
    }
  }

  initDashboard();
});
