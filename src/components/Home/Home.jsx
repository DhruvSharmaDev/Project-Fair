import React from 'react'
import  styles from "./Home.module.css"
import designIcon from "../../assets/designer.svg"
import { ArrowRight } from "react-feather";
import { useNavigate } from 'react-router-dom';
import InputControl from '../InputControl/InputControl';
const Home = ({auth}) => {
  const navigate=useNavigate();
  const handleOnClick=()=>{
    navigate("login")
  }
  return (
    <div className={styles.container}>
      {/* <InputControl label="dhrub" isPassword/> */}
      <div className={styles.header}>
        <div className={styles.left}>
            <div className={styles.top}>Project Fair</div>
            <div className={styles.middle}>One Stop destination for all software development projects</div>
            <button onClick={handleOnClick} 
            className={styles.button}> {auth? "Manage Your Projects":"Get Started"}  <ArrowRight/> {""}</button>
        </div>
        <div className={styles.right}>
             <img src={designIcon}/>
        </div>
        </div>
    </div>
  )
}

export default Home