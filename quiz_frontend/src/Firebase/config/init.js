import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBsImGL6fuQb715w69ZlSVEkZag07sLu8Y",
  authDomain: "quiz-20730.firebaseapp.com",
  projectId: "quiz-20730",
  storageBucket: "quiz-20730.appspot.com",
  messagingSenderId: "402820908137",
  appId: "1:402820908137:web:890833413103e61f6c0ef8",
  measurementId: "G-D4K2ZRYZ0K"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);