"use client"
import styles from './page.module.css'
import SignupForm, { ISignUpUser } from '../components/signup/Signup'
import React from 'react';
import { userSignUp } from '../actions/signup';
import { ISignUp } from '../models';
import { UserRole, UserType } from '../permissions/Permissions';

export default function Signup() {
    const loginFormHandler = async (form: ISignUpUser)=>{
        const {email, displayName, password} = form;
       return userSignUp({ 
        realm: displayName,
        userType: UserType.TenantUser,
        role: UserRole.admin,
        username: email,
        email,
        password
       
       } as ISignUp)
    }
    return (
        <div className={styles.container}>
            <div className={styles.flexItem}>
                <h1>Rental management portal</h1>
                <h4>where property management made easily</h4>
                <p>By creating an account here you accept the terms and Conditions of this portal.</p>
            </div>
            <div className={styles.flexItem}>
                <SignupForm onSubmitHandler={loginFormHandler}/>
            </div>
        </div>
    );
}
