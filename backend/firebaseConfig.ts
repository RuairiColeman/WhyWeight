import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQbomBfzWhAWl0PfZeUGJj1ME_JmvmQyI",
  authDomain: "whyweight-81b4a.firebaseapp.com",
  projectId: "whyweight-81b4a",
  storageBucket: "whyweight-81b4a.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);