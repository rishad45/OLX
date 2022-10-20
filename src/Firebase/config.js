import firebase from "firebase"
import 'firebase/auth' 
import 'firebase/storage' 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDzn1VANe2N8vo8tZer9MwihCAjPZCTRTY",
    authDomain: "olx-demo-72a7f.firebaseapp.com",
    projectId: "olx-demo-72a7f",
    storageBucket: "olx-demo-72a7f.appspot.com",
    messagingSenderId: "1037833962128",
    appId: "1:1037833962128:web:bc5feef48c34d09ca00e15",
    measurementId: "G-Y11G86RBL4"
  };

export default firebase.initializeApp(firebaseConfig) 
// export const db = firebase.firestore() 


