import React from 'react'
import styles from "./Auth.module.css"
import InputControl from '../InputControl/InputControl';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, updateUserDatabase } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
const Auth = (props) => {
  const navigate=useNavigate();

    const isSignUp=props.signup?true:false;
    const[submitButtonDisable,setSubmitButtonDisable]=useState(false)
    const[values,setvalues]=useState({
      name:"",
      email:"",
      password:"",
    })
    const [error,setError]=useState("");
    const handleLogin=()=>{
      if( !values.email || !values.password){
        setError('All Fields Are required')
        return
    }
      setSubmitButtonDisable(true)
      signInWithEmailAndPassword(auth, values.email,values.password)
      .then(()=>{
          setSubmitButtonDisable(false);
          navigate("/")
      })
      .catch((err)=>{
        setSubmitButtonDisable(false)
        setError(err.message)
      })
    }
    const handleSignUp=()=>{
        if(!values.name || !values.email || !values.password){
            setError('All Fields Are required')
            return
        }
          setSubmitButtonDisable(true)
          createUserWithEmailAndPassword(auth, values.email,values.password)
          .then((res)=>{
               const user_id=res.user.uid;
              updateUserDatabase({ name:values.name, email :values.email, password:values.password},user_id)
              setSubmitButtonDisable(false);
              navigate("/")
          })
          .catch((err)=>{
            setSubmitButtonDisable(false)
            console.log(err.message);
            setError(err.message)

          })   
    }
  return (
    <div className={styles.container}>
         
        <form className={styles.form}  onSubmit={(event)=>
          {event.preventDefault()
          if(isSignUp)
            handleSignUp()
          
          else handleLogin()
          }
        }>
        <div className={styles.smalllink}> 
         
         <Link to="/"> {"< back to Home"} </Link> </div>
   
      <p className={styles.heading}>{isSignUp?<h2>Signup</h2>:<h2>Login</h2>}</p>
      { isSignUp && (<InputControl label="Name" placeholder="Enter your Name"
        onChange={(event)=>setvalues((prev)=>({...prev,name: event.target.value}))}
      />)}
     
      <InputControl label="Email" placeholder="Enter your Mail"
       onChange={(event)=>setvalues((prev)=>({...prev,email: event.target.value}))} />
      <InputControl 
       onChange={(event)=>setvalues((prev)=>({...prev,password: event.target.value}))}
      label="Password" placeholder="Enter your Password" isPassword/>
      <p className={styles.error}> {error} </p>
      <button type='submit' disabled={submitButtonDisable}>{isSignUp? "Signup" :"Login"}</button>
      <div className={styles.bottom}>
        {
            isSignUp?(
                <p>
                    Already have an account ? <Link to="/login">Login here</Link>
                </p>
            ):
            (
                <p>
                    New here ? <Link to="/signup">Create an account </Link>
                </p>
            )
        }

      </div>
      </form>
      

    </div>
  )
}
export default Auth