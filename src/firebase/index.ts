import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBtKVY_STgiEP63gWuJD61shooORCIoV0",
  authDomain: "gym-training-c2c08.firebaseapp.com",
  projectId: "gym-training-c2c08",
  storageBucket: "gym-training-c2c08.appspot.com",
  messagingSenderId: "247738991474",
  appId: "1:247738991474:web:e22b0fffcaefba098213eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
