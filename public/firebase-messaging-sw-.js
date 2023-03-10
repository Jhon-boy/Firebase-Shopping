importScripts('/__/firebase/9.2.0/firebase-app-compat.js');
importScripts('/__/firebase/9.2.0/firebase-messaging-compat.js');
importScripts('/__/firebase/init.js');

firebase.initializeApp({
    apiKey: "AIzaSyBhDYK5m0gHKLRW6VFUp4F7lliKlFEY7Oc",
    authDomain: "fir-shopping-6fc46.firebaseapp.com",
    projectId: "fir-shopping-6fc46",
    storageBucket: "fir-shopping-6fc46.appspot.com",
    messagingSenderId: "252711998606",
    appId: "1:252711998606:web:fdc7bfee673555a16b25df"
  
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Titulo de la aplicacion';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/https://firebase.google.com/static/downloads/brand-guidelines/PNG/logo-logomark.png?hl=es-419firebase-logo.png'
    };
    
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});