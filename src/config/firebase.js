import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbGJgTTMxFEFUqb7w_w4_74TQu1A70Wvk",
  authDomain: "note-fa573.firebaseapp.com",
  projectId: "note-fa573",
  storageBucket: "note-fa573.appspot.com",
  messagingSenderId: "795728068863",
  appId: "1:795728068863:web:21fd0117794ca7bd940cca"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app)

export { db }; 