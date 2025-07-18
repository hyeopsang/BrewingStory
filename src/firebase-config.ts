import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCPiqaQ2l4KWkjuxe6U4tA-iip01YoZynU',
  authDomain: 'cafecommunity-8266e.firebaseapp.com',
  projectId: 'cafecommunity-8266e',
  storageBucket: 'cafecommunity-8266e.appspot.com',
  messagingSenderId: '411951184356',
  appId: '1:411951184356:web:87ac059963219f90d92ff1',
  measurementId: 'G-46FJQ6JHF9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { analytics, app, auth, db, storage };
