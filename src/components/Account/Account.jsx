import React from 'react'
import styles from "./Account.module.css"
import InputControl from '../InputControl/InputControl'
import { Camera ,LogOut } from 'react-feather'
import { Navigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../Firebase'
// import { useNavigate } from 'react-router-dom'

const Account = ({userDetails,isAuthenticated}) => {
// const NavigateTo=useNavigate();
    const handleLogOut=()=>{
      
        signOut(auth)
       
    }
  return isAuthenticated? (


    <div className={styles.container}>
        <div className={styles.header}>
           <p className={styles.heading}>Welcome <span>{ userDetails.name}</span>
            </p> 
            <div className={styles.logout} onClick={handleLogOut}>
             <LogOut/> Logout
            </div>
        </div>
        <div className={styles.section}>
            <div className={styles.title}> Your Profile</div>
            <div className={styles.profile}>
              <div className={styles.left}>
                <div className={styles.image}>
                    <img src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Profile Image" />
                    <div className={styles.camera}>
                    <Camera/>
                    </div>
                   
                </div>
                </div> 
                <div className={styles.right} >
                    <div className={styles.row}>
                        <InputControl
                        label="Name"
                        placeholder="Enter Your Name"
                        />
                        <InputControl
                        label="Title"
                        placeholder="eg. Full Stack Developer"
                        />
                    </div>
                    <div className={styles.row}>
                        <InputControl
                        label="Github"
                        placeholder="Enter your Github link"
                        />
                        <InputControl
                        label="LinkedIn"
                        placeholder="Enter Your Linkedin link"
                        />
                    </div>
                </div>
                
            </div>
            <div className={styles.saveButton}>Save Details</div>
        </div>

    </div>
  )
  :(<Navigate to="/"/>)
}

export default Account