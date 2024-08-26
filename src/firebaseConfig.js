import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB1U4lrxQQmtcx8JSV6O_Piota2WI3nCEY",
    authDomain: "project-vuejs2.firebaseapp.com",
    projectId: "project-vuejs2",
    storageBucket: "",
    messagingSenderId: "443330631543",
    appId: "1:443330631543:web:5cc94b6499d4578af5f372",
    measurementId: "G-T005BQTYQQ"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };

// Agora, monitore o estado de autenticação em um componente Vue, onde `this.$store` está disponível.
export function monitorAuthState(store) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            store.dispatch('autoSignin', user);  // Usar a store passada como argumento
        }
    });
    
    store.dispatch('loadMeetups');  // Carregando meetups
}

// Inicializando o Firebase
