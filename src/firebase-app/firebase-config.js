import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDsHEOu_StzVekkGrVGitTw6uF9MTpl2x8",
  authDomain: "moneykey-page.firebaseapp.com",
  projectId: "moneykey-page",
  storageBucket: "moneykey-page.appspot.com",
  messagingSenderId: "601872414416",
  appId: "1:601872414416:web:df2128351d2dcf60b6d0d5",
  measurementId: "G-6QTDFM1JPR",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
