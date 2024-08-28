import { initializeApp } from "firebase/app";
import { getFirestore, getDoc,doc,updateDoc,deleteDoc,setDoc} from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { getDatabase }from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCUI0mhMOrxnNwygyuG-7Uzp_u-FV8KIqk",
  authDomain: "vuefirebase-c1e0d.firebaseapp.com",
  databaseURL: "https://vuefirebase-c1e0d-default-rtdb.firebaseio.com",
  projectId: "vuefirebase-c1e0d",
  storageBucket: "vuefirebase-c1e0d.appspot.com",
  messagingSenderId: "34796627732",
  appId: "1:34796627732:web:4ff5315d55f781932a4401",
  measurementId: "G-7PLD6R4GLP"
  };


  const firebase = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebase);
  const auth = getAuth(firebase);
  const realtime= getDatabase(firebase);
  
  export { auth, firestore ,realtime};
