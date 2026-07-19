export const environment = {
  production: true,
  apiBaseUrl: 'https://api.ankorbook.com/v1',

  // Firebase Authentication & Services Config
  firebase: {
    apiKey: 'AIzaSyA_ANKORBOOK_LIVE_FIREBASE_KEY_PROD_948201',
    authDomain: 'ankorbook-resort.firebaseapp.com',
    projectId: 'ankorbook-resort',
    storageBucket: 'ankorbook-resort.appspot.com',
    messagingSenderId: '839201948201',
    appId: '1:839201948201:web:a93821039841029381',
    measurementId: 'G-ANKORBOOK2026'
  },

  // Payment Gateways Keys
  bakong: {
    merchantId: 'ANKORBOOK_BAKONG_MERCHANT',
    merchantName: 'Ankor Book Resort',
    city: 'Siem Reap',
    currency: 'USD',
    apiKey: 'bk_live_ankorbook_secret_key_99381'
  },

  abaPay: {
    merchantId: 'ANKORBOOK_ABA_00192',
    apiKey: 'aba_live_secret_key_9938'
  },

  stripe: {
    publishableKey: 'pk_live_51ANKORBOOK_STRIPE_LIVE_KEY_99381'
  },

  // OAuth Client Keys
  auth: {
    googleClientId: '839201948201-livegoogleclientid.apps.googleusercontent.com',
    appleClientId: 'com.ankorbook.web.auth',
    tiktokAppId: 'aw93821039841029381'
  }
};
