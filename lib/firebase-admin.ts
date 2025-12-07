import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let app: App;
let adminDb: Firestore;

function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    // For Vercel deployment, use environment variable with the service account JSON
    // Set FIREBASE_SERVICE_ACCOUNT_KEY in Vercel with the entire JSON string
    
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountKey) {
      try {
        const serviceAccount = JSON.parse(serviceAccountKey);
        app = initializeApp({
          credential: cert(serviceAccount),
          projectId: serviceAccount.project_id,
        });
      } catch (error) {
        console.error('Error parsing service account key:', error);
        // Fallback to project ID only (limited functionality)
        app = initializeApp({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
      }
    } else {
      // Development fallback - uses default credentials or project ID
      console.warn('FIREBASE_SERVICE_ACCOUNT_KEY not found, using project ID only');
      app = initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    }
  } else {
    app = getApps()[0];
  }
  
  adminDb = getFirestore(app);
  return { app, adminDb };
}

// Initialize on first import
const { adminDb: db } = initializeFirebaseAdmin();

export { db as adminDb };
