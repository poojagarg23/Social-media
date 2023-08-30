importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBdNkCMZ1Zld2JGOmaqRre41QPz4D7ivpw",
  authDomain: "firebse-3b55f.firebaseapp.com",
  databaseURL: "https://firebse-3b55f-default-rtdb.firebaseio.com",
  projectId: "firebse-3b55f",
  storageBucket: "firebse-3b55f.appspot.com",
  messagingSenderId: "469352137477",
  appId: "1:469352137477:web:7ba0373bedf882b6f9ad6c",
  measurementId: "G-DEWZVDPKKY"
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});