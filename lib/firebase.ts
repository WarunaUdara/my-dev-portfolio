// Firebase Configuration
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:
    (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_FIREBASE_API_KEY) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_API_KEY) ||
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    'YOUR_API_KEY',
  authDomain:
    (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN) ||
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'YOUR_AUTH_DOMAIN',
  projectId:
    (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_FIREBASE_PROJECT_ID) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_PROJECT_ID) ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    'YOUR_PROJECT_ID',
  storageBucket:
    (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET) ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'YOUR_STORAGE_BUCKET',
  messagingSenderId:
    (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID) ||
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    'YOUR_SENDER_ID',
  appId:
    (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_FIREBASE_APP_ID) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_APP_ID) ||
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    'YOUR_APP_ID',
  measurementId:
    (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID) ||
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    'YOUR_MEASUREMENT_ID',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Auth providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { app, auth, db, googleProvider, githubProvider };
