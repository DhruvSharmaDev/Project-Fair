
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore,doc,setDoc, getDoc} from "firebase/firestore"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
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
// using for user details for authentication 
const db=getFirestore(app)
// using for profile image
const storage=getStorage(app)

const updateUserDatabase= async (user,uid)=>{
    if(typeof(user)!=="object"){
        return;
    }
    const docRef= doc(db,"users",uid)
    await setDoc(docRef,{...user,uid})
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
const uploadImage=(file,progressCallBack,urlCallBack,errorCallback)=>{
  if(!file){
  errorCallback("File not Found")
  return;
}
const fileType=file.type;
const fileSize=file.size/1024/1024;
if(!fileType.includes("image")){
  errorCallback("file must be an image");
  return;
}
if(fileSize>2){
  errorCallback("file must be smaller thena 2MB");
  return;
}

const storageRef=ref(storage,`images/${file.name}`);
const task=uploadBytesResumable(storageRef,file);
task.on('state_changed',
(snapshot)=>{
const progress=snapshot.bytesTransferred/(snapshot.totalBytes)*100;
progressCallBack(progress);
},
(error)=>{
  errorCallback(error.message)
  return;

},
()=>{
  getDownloadURL(storageRef).then((url)=>{urlCallBack(url)}
  );

});
}
const auth=getAuth(app);

export {app as default ,auth,db,updateUserDatabase,getUserFromDatabase,uploadImage}