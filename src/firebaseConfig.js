import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // Adicione esta linha se for necessário usar `storage`


const firebaseConfig = {
    apiKey: "AIzaSyB1U4lrxQQmtcx8JSV6O_Piota2WI3nCEY",
    authDomain: "project-vuejs2.firebaseapp.com",
    projectId: "project-vuejs2",
    storageBucket: "project-vuejs2.appspot.com",  
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, database, storage };

// Agora, monitore o estado de autenticação em um componente Vue, onde `this.$store` está disponível.
export function monitorAuthState(store) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            store.dispatch('autoSignin', user)  // Usar a store passada como argumento
            store.dispatch('fetchUserData')  // Usar a store passada como argumento
        }
    });
    
    store.dispatch('loadMeetups');  // Carregando meetups
}

// Inicializando o Firebase
