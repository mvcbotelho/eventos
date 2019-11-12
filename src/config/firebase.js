import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBnU7ibcxOtI1MKEITso-w1oOWEFvAGqzE",
  authDomain: "eventos-ed2b0.firebaseapp.com",
  databaseURL: "https://eventos-ed2b0.firebaseio.com",
  projectId: "eventos-ed2b0",
  storageBucket: "eventos-ed2b0.appspot.com",
  messagingSenderId: "592947900255",
  appId: "1:592947900255:web:709fe07b4fea5ab80d90ea"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
