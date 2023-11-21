import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE0ApOmRk0DFofn02PyFk_yGOUyi1khK4",
  authDomain: "testreactnative-ec97e.firebaseapp.com",
  projectId: "testreactnative-ec97e",
  storageBucket: "testreactnative-ec97e.appspot.com",
  messagingSenderId: "1040302402799",
  appId: "1:1040302402799:web:c2626f1f40cd6343ae3f1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};