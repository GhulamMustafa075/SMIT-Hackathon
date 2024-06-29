import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuNbiA3dBTKPGWVnUOFUUnE1gibGCgci8",
  authDomain: "smit-hackathon-b6291.firebaseapp.com",
  projectId: "smit-hackathon-b6291",
  storageBucket: "smit-hackathon-b6291.appspot.com",
  messagingSenderId: "648609588009",
  appId: "1:648609588009:web:71cdb97103f1de49730d38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const imageDB = getStorage(app);
export { fireDB, auth, imageDB };
