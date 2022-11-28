import { initializeFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCbwhghtVmeMQjFSE_BYGDvvw7XeFtrE-g",
  authDomain: "todo-list-34bb9.firebaseapp.com",
  projectId: "todo-list-34bb9",
  storageBucket: "todo-list-34bb9.appspot.com",
  messagingSenderId: "531267051358",
  appId: "1:531267051358:web:aea3ef4e8042cc6e3239cf",
  measurementId: "G-3C40EL8SMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { db }
