
import firebase from "firebase/app";
import "firebase/storage";
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA_v8me0OBHLxOzvvSUpyndVusJjd0NuHg",
    authDomain: "kuai-test.firebaseapp.com",
    databaseURL: "https://kuai-test.firebaseio.com",
    projectId: "kuai-test",
    storageBucket: "kuai-test.appspot.com",
    messagingSenderId: "145844585554",
    appId: "1:145844585554:web:3eecb902c0897c22928b8b",
    measurementId: "G-CSWQCJ0B31"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const db = firebase.firestore();

export { storage, db, firebase as default };