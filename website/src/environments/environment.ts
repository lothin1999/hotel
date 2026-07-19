export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',

  // Firebase Authentication & Services Config
  firebase: {
    apiKey: 'AIzaSyA_ANKORBOOK_MOCK_FIREBASE_KEY_DEV_839210',
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
    apiKey: 'bk_dev_ankorbook_secret_key_83921'
  },

  abaPay: {
    merchantId: 'ANKORBOOK_ABA_00192',
    apiKey: 'aba_dev_secret_key_9281'
  },

  stripe: {
    publishableKey: 'pk_test_51ANKORBOOK_STRIPE_MOCK_KEY_8392109'
  },

  // OAuth Client Keys
  auth: {
    googleClientId: '839201948201-mockgoogleclientid.apps.googleusercontent.com',
    appleClientId: 'com.ankorbook.web.auth',
    tiktokAppId: 'aw93821039841029381'
  }
};
