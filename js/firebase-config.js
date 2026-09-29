/**
 * Best Tours Benha — Firebase Configuration & Cloud Sync Layer
 * Powered by Google Firebase Firestore (Free Tier)
 */

// 1. Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMma3ZWHx7MN9NmzCxeGjEPyIW_KlZMQo",
  authDomain: "best-tours-benha.firebaseapp.com",
  projectId: "best-tours-benha",
  storageBucket: "best-tours-benha.firebasestorage.app",
  messagingSenderId: "494329579497",
  appId: "1:494329579497:web:7b5698273ddadc02ef6d78",
  measurementId: "G-JRG4EWY4S5"
};

// 2. Initialize Firebase (with graceful fallback if keys not configured yet)
let db = null;
let isFirebaseActive = false;

try {
  if (typeof firebase !== 'undefined' && firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('PASTE_YOUR')) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    isFirebaseActive = true;
    console.log('✅ Best Tours Benha: Firebase Firestore Connected Successfully.');
  } else {
    console.warn('⚠️ Best Tours Benha: Running in local/offline fallback mode until Firebase config is filled.');
  }
} catch (error) {
  console.error('Firebase Initialization Error:', error);
  isFirebaseActive = false;
}

// 3. Cloud Database API Helper
const CloudStore = {
  isActive() {
    return isFirebaseActive && db !== null;
  },

  // ------------------- Admin Credentials (Auth) -------------------
  async getAdminCredentials() {
    if (!this.isActive()) {
      return {
        username: localStorage.getItem('btb_admin_custom_user') || 'best',
        password: localStorage.getItem('btb_admin_custom_pass') || '112233'
      };
    }
    try {
      const doc = await db.collection('settings').doc('adminAuth').get();
      if (doc.exists) {
        return doc.data();
      } else {
        // Initialize default in Firestore
        const defaultAuth = { username: 'best', password: '112233' };
        await db.collection('settings').doc('adminAuth').set(defaultAuth);
        return defaultAuth;
      }
    } catch (e) {
      console.error('Error fetching admin credentials from Cloud:', e);
      return {
        username: localStorage.getItem('btb_admin_custom_user') || 'best',
        password: localStorage.getItem('btb_admin_custom_pass') || '112233'
      };
    }
  },

  async updateAdminCredentials(newUsername, newPassword) {
    // Save to Local/Session Storage as fallback
    localStorage.setItem('btb_admin_custom_user', newUsername);
    localStorage.setItem('btb_admin_custom_pass', newPassword);

    if (!this.isActive()) return true;

    try {
      await db.collection('settings').doc('adminAuth').set({
        username: newUsername,
        password: newPassword,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      return true;
    } catch (e) {
      console.error('Error saving admin credentials to Cloud:', e);
      return false;
    }
  },

  // ------------------- Umrah Packages -------------------
  async getUmrahPackages() {
    if (!this.isActive()) {
      return Store.getUmrahPackages();
    }
    try {
      const doc = await db.collection('content').doc('umrahPackages').get();
      if (doc.exists && doc.data()?.packages) {
        const cloudPkgs = doc.data().packages;
        // Sync with local store for offline cache
        localStorage.setItem(Store.KEYS.UMRAH_PACKAGES, JSON.stringify(cloudPkgs));
        return cloudPkgs;
      } else {
        // Initialize with default packages from data.js
        const defaults = window.travelData?.umrahPackages || [];
        if (defaults.length > 0) {
          await db.collection('content').doc('umrahPackages').set({ packages: defaults, updatedAt: new Date().toISOString() });
        }
        return defaults;
      }
    } catch (e) {
      console.error('Error getting packages from Cloud:', e);
      return Store.getUmrahPackages();
    }
  },

  async saveUmrahPackages(packages) {
    // Always save locally first
    Store.saveUmrahPackages(packages);

    if (!this.isActive()) return true;

    try {
      await db.collection('content').doc('umrahPackages').set({
        packages: packages,
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (e) {
      console.error('Error saving packages to Cloud:', e);
      return false;
    }
  },

  // ------------------- Umrah Banner Media -------------------
  async getUmrahMedia() {
    if (!this.isActive()) {
      return Store.getUmrahMedia();
    }
    try {
      const doc = await db.collection('content').doc('umrahMedia').get();
      if (doc.exists && doc.data()) {
        const media = doc.data();
        localStorage.setItem(Store.KEYS.UMRAH_MEDIA, JSON.stringify(media));
        return media;
      } else {
        const defaults = window.travelData?.umrahMedia || {};
        await db.collection('content').doc('umrahMedia').set(defaults);
        return defaults;
      }
    } catch (e) {
      return Store.getUmrahMedia();
    }
  },

  async saveUmrahMedia(mediaObj) {
    Store.saveUmrahMedia(mediaObj);

    if (!this.isActive()) return true;

    try {
      await db.collection('content').doc('umrahMedia').set({
        ...mediaObj,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      return true;
    } catch (e) {
      console.error('Error saving media to Cloud:', e);
      return false;
    }
  },

  // ------------------- Customer Inquiries (Leads) -------------------
  async saveInquiry(lead) {
    Store.saveInquiry(lead);

    if (!this.isActive()) return true;

    try {
      await db.collection('inquiries').add({
        ...lead,
        timestamp: new Date().toISOString()
      });
      return true;
    } catch (e) {
      console.error('Error saving inquiry to Cloud:', e);
      return false;
    }
  }
};

window.CloudStore = CloudStore;
