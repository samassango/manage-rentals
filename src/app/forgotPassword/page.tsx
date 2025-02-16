"use client"
import styles from './page.module.css'
import PasswordResetForm, { IResetUser } from '../components/passwordrest/PasswordReset'
import React from 'react';

export default function Signup() {
    const loginFormHandler =(form: IResetUser)=>{
        console.log({form})
    }
    return (
        <div className={styles.container}>
            <div className={styles.flexItem}>
                <h1>Rental management portal</h1>
                <h4>where property management made easily</h4>
                <p>By creating an account here you accept the terms and Conditions of this portal.</p>
            </div>
            <div className={styles.flexItem}>
                <PasswordResetForm onSubmitHandler={loginFormHandler}/>
            </div>
        </div>
    );
}
