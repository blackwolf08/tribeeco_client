import * as firebase from "firebase/app";

import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBaC6GqisqfcDYv8U9q6ff34ApOMUhu9y8",
  authDomain: "tribeeco-4087c.firebaseapp.com",
  databaseURL: "https://tribeeco-4087c.firebaseio.com",
  projectId: "tribeeco-4087c",
  storageBucket: "",
  messagingSenderId: "296918819712"
};
export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
};

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("token do usuário:", token);

    return token;
  } catch (error) {
    console.error(error);
  }
};

function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log("Sending token to server...");
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log(
      "Token already sent to server so won't send it again " +
        "unless it changes"
    );
  }
}
messaging
  .getToken()
  .then(function(currentToken) {
    if (currentToken) {
      sendTokenToServer(currentToken);
      updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log(
        "No Instance ID token available. Request permission to generate one."
      );
      // Show permission UI.
      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  })
  .catch(function(err) {
    console.log("An error occurred while retrieving token. ", err);
    showToken("Error retrieving Instance ID token. ", err);
    setTokenSentToServer(false);
  });

messaging.onTokenRefresh(function() {
  messaging
    .getToken()
    .then(function(refreshedToken) {
      console.log("Token refreshed.");
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // [START_EXCLUDE]
      // Display new Instance ID token and clear UI of all previous messages.
      resetUI();
      // [END_EXCLUDE]
    })
    .catch(function(err) {
      console.log("Unable to retrieve refreshed token ", err);
      showToken("Unable to retrieve refreshed token ", err);
    });
});

function onMessage(cb) {
  messaging.onMessage(cb);
  // [
}
