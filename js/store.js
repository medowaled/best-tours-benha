/**
 * Best Tours Benha - Lightweight Store & LocalStorage Persistence Manager
 */

const Store = {
  KEYS: {
    INQUIRIES: 'btb_user_inquiries',
    FAVORITES: 'btb_user_favorites',
    RECENT_SEARCHES: 'btb_recent_searches',
    LANG: 'btb_app_language',
    UMRAH_PACKAGES: 'btb_umrah_packages_v1',
    UMRAH_MEDIA: 'btb_umrah_media_v1'
  },

  // Umrah & Hajj Packages Management (Dashboard CRUD)
  getUmrahPackages() {
    try {
      const stored = localStorage.getItem(this.KEYS.UMRAH_PACKAGES);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with default data from travelData
      const defaults = window.travelData?.umrahPackages || [];
      if (defaults.length > 0) {
        localStorage.setItem(this.KEYS.UMRAH_PACKAGES, JSON.stringify(defaults));
      }
      return defaults;
    } catch (e) {
      console.error('Error fetching Umrah packages:', e);
      return window.travelData?.umrahPackages || [];
    }
  },

  saveUmrahPackages(packages) {
    try {
      localStorage.setItem(this.KEYS.UMRAH_PACKAGES, JSON.stringify(packages));
      window.dispatchEvent(new CustomEvent('btb:umrah-packages-updated', { detail: { packages } }));
      return true;
    } catch (e) {
      console.error('Error saving Umrah packages:', e);
      return false;
    }
  },

  updateUmrahPackage(id, updatedFields) {
    const packages = this.getUmrahPackages();
    const index = packages.findIndex(pkg => pkg.id === id);
    if (index !== -1) {
      packages[index] = { ...packages[index], ...updatedFields };
      this.saveUmrahPackages(packages);
      return packages[index];
    }
    return null;
  },

  addUmrahPackage(newPkg) {
    const packages = this.getUmrahPackages();
    const pkg = {
      id: 'umrah-pkg-' + Date.now().toString(36),
      active: true,
      tagColor: 'gold',
      currency: 'ج.م',
      ...newPkg
    };
    packages.unshift(pkg);
    this.saveUmrahPackages(packages);
    return pkg;
  },

  deleteUmrahPackage(id) {
    let packages = this.getUmrahPackages();
    packages = packages.filter(pkg => pkg.id !== id);
    this.saveUmrahPackages(packages);
    return true;
  },

  resetUmrahPackages() {
    const defaults = window.travelData?.umrahPackages || [];
    this.saveUmrahPackages(defaults);
    return defaults;
  },

  // Umrah Media & Banner Management
  getUmrahMedia() {
    try {
      const stored = localStorage.getItem(this.KEYS.UMRAH_MEDIA);
      if (stored) {
        return JSON.parse(stored);
      }
      const defaults = window.travelData?.umrahMedia || {
        bannerImage: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80",
        bannerTitle: "برامج العمرة VIP والبرامج الاقتصادية",
        bannerSubtitle: "نولي معتمرينا أقصى درجات الاهتمام من خلال فنادق ساحة الحرم المكي مباشرة، طيران مباشر من مطار القاهرة إلى جدة أو المدينة، ومرشدين دينيين لمرافقة الأفواج والإجابة عن كافة المناسك."
      };
      localStorage.setItem(this.KEYS.UMRAH_MEDIA, JSON.stringify(defaults));
      return defaults;
    } catch (e) {
      return window.travelData?.umrahMedia || {};
    }
  },

  saveUmrahMedia(mediaObj) {
    try {
      const current = this.getUmrahMedia();
      const updated = { ...current, ...mediaObj };
      localStorage.setItem(this.KEYS.UMRAH_MEDIA, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('btb:umrah-media-updated', { detail: { media: updated } }));
      return updated;
    } catch (e) {
      console.error('Error saving Umrah media:', e);
      return null;
    }
  },

  resetUmrahMedia() {
    const defaults = window.travelData?.umrahMedia || {};
    localStorage.setItem(this.KEYS.UMRAH_MEDIA, JSON.stringify(defaults));
    window.dispatchEvent(new CustomEvent('btb:umrah-media-updated', { detail: { media: defaults } }));
    return defaults;
  },

  deleteInquiry(id) {
    try {
      let list = this.getInquiries();
      list = list.filter(item => item.id !== id);
      localStorage.setItem(this.KEYS.INQUIRIES, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('btb:inquiries-updated'));
      return true;
    } catch (e) {
      return false;
    }
  },

  // Language State
  getLanguage() {
    return localStorage.getItem(this.KEYS.LANG) || 'ar';
  },

  setLanguage(lang) {
    localStorage.setItem(this.KEYS.LANG, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    window.dispatchEvent(new CustomEvent('btb:language-changed', { detail: { lang } }));
  },

  // Inquiries / Leads (CRUD in LocalStorage)
  getInquiries() {
    try {
      const data = localStorage.getItem(this.KEYS.INQUIRIES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading inquiries from localStorage', e);
      return [];
    }
  },

  saveInquiry(lead) {
    try {
      const list = this.getInquiries();
      const newLead = {
        id: 'BTB-' + Date.now().toString(36).toUpperCase(),
        timestamp: new Date().toISOString(),
        status: 'received',
        ...lead
      };
      list.unshift(newLead);
      localStorage.setItem(this.KEYS.INQUIRIES, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('btb:inquiry-saved', { detail: { lead: newLead } }));
      return newLead;
    } catch (e) {
      console.error('Error saving inquiry to localStorage', e);
      return null;
    }
  },

  clearInquiries() {
    localStorage.removeItem(this.KEYS.INQUIRIES);
    window.dispatchEvent(new CustomEvent('btb:inquiries-cleared'));
  },

  // Favorites (Bookmarks)
  getFavorites() {
    try {
      const data = localStorage.getItem(this.KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  isFavorite(id) {
    const list = this.getFavorites();
    return list.includes(id);
  },

  toggleFavorite(id) {
    let list = this.getFavorites();
    if (list.includes(id)) {
      list = list.filter(item => item !== id);
    } else {
      list.push(id);
    }
    localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('btb:favorite-toggled', { detail: { id, favorites: list } }));
    return list.includes(id);
  },

  // Recent Searches
  saveSearch(searchParams) {
    try {
      let list = this.getRecentSearches();
      list.unshift({
        id: Date.now(),
        ...searchParams,
        date: new Date().toLocaleDateString()
      });
      // Keep only last 5 searches
      list = list.slice(0, 5);
      localStorage.setItem(this.KEYS.RECENT_SEARCHES, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  },

  getRecentSearches() {
    try {
      const data = localStorage.getItem(this.KEYS.RECENT_SEARCHES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  // WhatsApp Message Compiler
  buildWhatsAppUrl(leadData) {
    const phone = window.travelData?.companyInfo?.whatsapp || '201050079811';
    const isAr = this.getLanguage() === 'ar';
    
    let text = isAr 
      ? `السلام عليكم، شركة بست تورز بنها 🌟\nأود الاستفسار والحجز للبيانات التالية:\n`
      : `Hello Best Tours Benha 🌟\nI would like to inquire/book the following trip:\n`;

    if (leadData.tripTitle) {
      text += isAr ? `📌 البرنامج: ${leadData.tripTitle}\n` : `📌 Program: ${leadData.tripTitle}\n`;
    }
    if (leadData.serviceType) {
      text += isAr ? `🏷️ نوع الخدمة: ${leadData.serviceType}\n` : `🏷️ Service Type: ${leadData.serviceType}\n`;
    }
    if (leadData.destination) {
      text += isAr ? `📍 الوجهة المطلوبة: ${leadData.destination}\n` : `📍 Destination: ${leadData.destination}\n`;
    }
    if (leadData.travelDate) {
      text += isAr ? `📅 موعد السفر المفضل: ${leadData.travelDate}\n` : `📅 Preferred Travel Date: ${leadData.travelDate}\n`;
    }
    if (leadData.travelers) {
      text += isAr ? `👥 عدد المسافرين: ${leadData.travelers}\n` : `👥 Number of Travelers: ${leadData.travelers}\n`;
    }
    if (leadData.fullName) {
      text += isAr ? `👤 الاسم: ${leadData.fullName}\n` : `👤 Full Name: ${leadData.fullName}\n`;
    }
    if (leadData.phone) {
      text += isAr ? `📞 هاتف التواصل: ${leadData.phone}\n` : `📞 Phone: ${leadData.phone}\n`;
    }
    if (leadData.notes) {
      text += isAr ? `💬 ملاحظات إضافية: ${leadData.notes}\n` : `💬 Additional Notes: ${leadData.notes}\n`;
    }

    text += isAr ? `\nبانتظار ردكم الكريم وتأكيد التفاصيل والأسعار.` : `\nAwaiting your kind reply and confirmation.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }
};

window.Store = Store;
