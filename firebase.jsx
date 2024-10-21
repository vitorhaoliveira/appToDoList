// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importando o Auth
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiA5ptBgoaqn7Ushmgl74ugXIbjMWfkU4",
  authDomain: "bdcripto-bef34.firebaseapp.com",
  projectId: "bdcripto-bef34",
  storageBucket: "bdcripto-bef34.appspot.com",
  messagingSenderId: "458038949078",
  appId: "1:458038949078:web:38e4b45f363351003b0577"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Exporta o Auth
export const firestore = getFirestore(app);
