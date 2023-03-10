
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging, getToken  } from "firebase/messaging"
import { getFirestore } from "firebase/firestore";

const vapidKey = "BKoe2ho8jtwopwrLd_yPuIlBcpcse-h5_YP7Uk70c_8tiEjqOlPT1n7ijLBHY1qcsohSo0W10_O3Hy_mhxO7AH4"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhDYK5m0gHKLRW6VFUp4F7lliKlFEY7Oc",
    authDomain: "fir-shopping-6fc46.firebaseapp.com",
    projectId: "fir-shopping-6fc46",
    storageBucket: "fir-shopping-6fc46.appspot.com",
    messagingSenderId: "252711998606",
    appId: "1:252711998606:web:fdc7bfee673555a16b25df"
};

// currentToken = "dzHLgtB6zWC7EXiRwhK5_5:APA91bHT4n3l0iEMye2pUuN4k2Hm0V3zIft-Pq1E9e0aavUNScNZ--Cb9uAGmTr5KS6OgXBv_j2b69AWvuCF93dhwZoEcwomdkVVOAEw1LzDXppm7SENLaCYBNYIChOZPOg5nGvu-O1e";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const messaging = getMessaging();
getToken(messaging, { vapidKey })
  .then(currentToken => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      // console.log('currentToken', currentToken);
      sendTokenToServer(currentToken);
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

const sendTokenToServer = token => {
  if (localStorage.getItem('tokenSentToServer')) return;
  // TO-DO: Implementar la lógica de que en el servidor se almacene el token
  localStorage.setItem('tokenSentToServer', '1');
}
export const db = getFirestore(app);