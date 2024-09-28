"use client"

import styles from "./page.module.css";
import LoginForm, {IUser} from '../components/login/Login'
import React from 'react';

export default function Login() {
    const loginFormHandler=(user: IUser)=>{
        console.log({user})
    }
  return (
    <div className={styles.container}>
        <div className={styles.flexItem}>
            <div>
                <h1>Rental management portal</h1>
                <h4>where property management made easily</h4>
            </div>
        </div>
        <div className={styles.flexItem}>
            <LoginForm onSubmitHandler={loginFormHandler}/>
        </div>
    </div>
  );
}
