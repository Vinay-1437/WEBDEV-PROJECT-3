import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUkKlPPxaaRpKFkoNUYlToBk0zNyFZ2KQ",
  authDomain: "end-term-project-19844.firebaseapp.com",
  projectId: "end-term-project-19844",
  storageBucket: "end-term-project-19844.firebasestorage.app",
  messagingSenderId: "816062153402",
  appId: "1:816062153402:web:b6078634abdd126791b883",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
