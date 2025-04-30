// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBu9lG6SCe5-Z279r7USGuraWv3lWfEbgg",
  authDomain: "mygames-709dc.firebaseapp.com",
  databaseURL: "https://mygames-709dc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mygames-709dc",
  storageBucket: "mygames-709dc.firebasestorage.app",
  messagingSenderId: "954207113122",
  appId: "1:954207113122:web:76ff60d6125d5cd4ceacfb",
  measurementId: "G-ELL72QYHV1"
};
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

