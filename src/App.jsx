import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from "react-router-dom";

import "./App.css";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Spiner from "./components/Spinner/Spiner";
import { useEffect, useState } from "react";
import {auth, getUserFromDatabase} from "./Firebase"

function App() {
  const [isAuthenticated ,setIsAuthenticated]=useState(false);
  const[userDetails,setUserDetails]=useState({});
  const[isDataLoaded,setIsDataLoaded]=useState(false);
  const getUserDetails= async(uid)=>{
      const  userDetails= await getUserFromDatabase(uid);
      setIsAuthenticated(true);
      setIsDataLoaded(true);
       setUserDetails(userDetails);
       
       console.log(userDetails);
  }
  useEffect(()=>{
   const listener=auth.onAuthStateChanged((user)=>{
    if(!user){
    setIsDataLoaded(true)
    return ;}
       setIsAuthenticated(true);
       setIsDataLoaded(true)
    
       getUserDetails(user.uid)
    
   });
   return ()=>listener();  
  },[])








  return (
    <>
      <div>
        <Router>
          {isDataLoaded ?
          (
          <Routes>
         
            
            { !isAuthenticated &&(
            <>
            <Route path="/login" element={<Auth/>}></Route>
            <Route path="/signup" element={<Auth signup/> }></Route>
            </>
            )}
            :
            <>
            <Route path="/account" element={<h1>Account </h1>}></Route>
            <Route path="/contact" element={<h1>Contact </h1>}></Route>
            <Route path="/" element={<Home auth={isAuthenticated}/>}></Route>
            <Route path="/*" element={<Navigate to="/account"/>}/>
            </>
          </Routes>
):(<Spiner/>)}
        </Router>
      </div>
    </>
  );
}

export default App;
