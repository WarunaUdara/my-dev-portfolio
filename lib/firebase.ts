// Firebase Configuration
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const getEnvVar = (nextKey: string, viteKey: string, fallback: string) => {
  if (typeof process !== 'undefined' && process.env && process.env[nextKey]) {
    return process.env[nextKey];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[viteKey]) {
    return import.meta.env[viteKey];
  }
  return fallback;
};

const firebaseConfig = {
  apiKey: getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY', 'VITE_FIREBASE_API_KEY', 'YOUR_API_KEY'),
  authDomain: getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_AUTH_DOMAIN', 'YOUR_AUTH_DOMAIN'),
  projectId: getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_PROJECT_ID', 'YOUR_PROJECT_ID'),
  storageBucket: getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'VITE_FIREBASE_STORAGE_BUCKET', 'YOUR_STORAGE_BUCKET'),
  messagingSenderId: getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', 'VITE_FIREBASE_MESSAGING_SENDER_ID', 'YOUR_SENDER_ID'),
  appId: getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID', 'VITE_FIREBASE_APP_ID', 'YOUR_APP_ID'),
  measurementId: getEnvVar('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID', 'VITE_FIREBASE_MEASUREMENT_ID', 'YOUR_MEASUREMENT_ID')
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Auth providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { app, auth, db, googleProvider, githubProvider };
