
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore,doc,setDoc, getDoc} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCwezqggABcRYXySz5jWerhcWcqRZigZPE",
  authDomain: "project-flex-a8972.firebaseapp.com",
  projectId: "project-flex-a8972",
  storageBucket: "project-flex-a8972.appspot.com",
  messagingSenderId: "886376889429",
  appId: "1:886376889429:web:ed20b69355f99415a468dc",
  measurementId: "G-J5LDJZ0RG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const updateUserDatabase= async (user,uid)=>{
    if(typeof(user)!=="object"){
        return;
    }
    const docRef= doc(db,"users",uid)
    await setDoc(docRef,{...user})


}
const getUserFromDatabase= async (uid)=>{
 
  const docRef= doc(db,"users",uid)
   const result= await getDoc(docRef)
   if(result.exists()){
    return result.data()
   }
   else{
    return null;
   }


}

const auth=getAuth(app);

export {app as default ,auth,db,updateUserDatabase,getUserFromDatabase}