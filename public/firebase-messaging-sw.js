importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBaC6GqisqfcDYv8U9q6ff34ApOMUhu9y8",
  authDomain: "tribeeco-4087c.firebaseapp.com",
  databaseURL: "https://tribeeco-4087c.firebaseio.com",
  projectId: "tribeeco-4087c",
  storageBucket: "",
  messagingSenderId: "296918819712"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  const title = payload.notification.title;
  console.log("payload", payload.notification);
  const options = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };
  return self.registration.showNotification(title, options);
});
