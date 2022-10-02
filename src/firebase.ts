import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA22RfKdYEXMvGIVYsmZv1waDxS750lpKc",
  authDomain: "react-chat-59c76.firebaseapp.com",
  databaseURL: "https://react-chat-59c76-default-rtdb.firebaseio.com",
  projectId: "react-chat-59c76",
  storageBucket: "react-chat-59c76.appspot.com",
  messagingSenderId: "361496559948",
  appId: "1:361496559948:web:583bf7455d1baee1254fe9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
