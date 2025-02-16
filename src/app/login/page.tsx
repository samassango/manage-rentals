"use client"

import styles from "./page.module.css";
import LoginForm, { IUser } from '../components/login/Login'
import React, { useEffect } from 'react';
import { redirect } from 'next/navigation'
import { userLogin } from "../actions/login";
import { ILogin } from "../models";
import { UserProvider } from "../context/UserContext";

export default function Login() {
  
    const loginFormHandler = async (user: IUser): Promise<any> => {
        const { username, password } = user;
        return userLogin({ email: username, password } as ILogin);
    }
 
    return (
        <UserProvider>
            <div className={styles.container}>
                <div className={styles.flexItem}>
                    <h1>Rental management portal</h1>
                    <h4>where property management made easily</h4>
                    <div>
                        <a href="/signup">Get Started</a>
                    </div>
                </div>
                <div className={styles.flexItem}>
                    <LoginForm onSubmitHandler={loginFormHandler} />
                </div>
            </div>
        </UserProvider>
    );
}
