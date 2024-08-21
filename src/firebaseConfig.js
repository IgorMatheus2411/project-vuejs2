import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1U4lrxQQmtcx8JSV6O_Piota2WI3nCEY",
    authDomain: "project-vuejs2.firebaseapp.com",
    projectId: "project-vuejs2",
    storageBucket: "project-vuejs2.appspot.com",
    messagingSenderId: "443330631543",
    appId: "1:443330631543:web:5cc94b6499d4578af5f372",
    measurementId: "G-T005BQTYQQ"
  };

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
