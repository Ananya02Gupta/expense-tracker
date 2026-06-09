import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWkQgWd_aJLyS6lnPutfXr66k7HnE9sL8",
  authDomain: "expense-tracker-81a22.firebaseapp.com",
  projectId: "expense-tracker-81a22",
  storageBucket: "expense-tracker-81a22.firebasestorage.app",
  messagingSenderId: "970297894780",
  appId: "1:970297894780:web:447682b3d6f792c543a6f9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);