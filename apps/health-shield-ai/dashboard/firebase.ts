import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with official HealthShield AI Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "health-shield-ai.firebaseapp.com",
  projectId: "health-shield-ai",
  storageBucket: "health-shield-ai.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
