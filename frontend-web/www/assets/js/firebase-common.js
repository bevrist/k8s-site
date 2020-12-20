// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC5WGP0R1sel4nZFlDBzUdOM-Zu4OGMvAs",
  authDomain: "workout-app-296422.firebaseapp.com",
  projectId: "workout-app-296422",
  storageBucket: "workout-app-296422.appspot.com",
  messagingSenderId: "382315129211",
  appId: "1:382315129211:web:d68a587173b35ad51a35de",
  measurementId: "G-H4GCFPEFYV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//check if user is logged in when user object updates, redirect to signed out if necessary
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    document.cookie = "Session-Token=" + user._lat + "; SameSite=Strict; path=/";
  } else {
    // No user is signed in.
    // check for cookie "Session-Token" and invalidate if exists
    if (getCookie("Session-Token") != null) {
      document.cookie = "Session-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict; path=/";
      console.log("Cookie Invalidated, redirecting to homepage...")
      //TODO: create & redirect to "signed out" page to explain user signed out
      // window.location.replace('http://localhost:5500/');
    }
  }
});

// if #SignOutBtn present, check that user is signed in and redirect to auth if not
if (document.getElementById("SignOutBtn") != null) {
  if (getCookie("Session-Token") == null || getCookie("Session-Token") == "") {
    console.log("Not Signed In, redirecting to auth...");
    // window.location.replace('http://localhost:5500/auth');
  }
}

// enable signOut button
if (document.getElementById("SignOutBtn")) {
  document.getElementById("SignOutBtn").setAttribute("onclick", "signOut()");
}
function signOut() {
  console.log("Signing out...")
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    // Invalidate "Session-Token" cookie
    document.cookie = "Session-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict; path=/";
    console.log("Signed out button, redirecting to homepage...");
    // window.location.replace('http://localhost:5500/');
  }).catch(function (error) {
    console.log("Sign out error occurred:" + error);
  });
}

//==================================================
// Helper Functions

// helper function to get value of named cookie
function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");
  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    /* Removing whitespace at the beginning of the cookie name
    and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;  // Return null if not found
}
