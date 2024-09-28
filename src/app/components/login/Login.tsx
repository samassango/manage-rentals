import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './Login.module.css'
import Loader from '../Loader';

export interface IUser {
    username: string;
    password: string;
    rememberMe: boolean;
}
interface IForm {
    onSubmitHandler: (data: IUser) => void
}

const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

export default function Login({ onSubmitHandler }: IForm) {
    const [form, setForm] = useState({ username: '', password: '', rememberMe: false })
    const [error, setError] = useState({ usernameError: '', passwordError: '' })
    const [isloading, setIsLoading] = useState(false)


    const signInHandler = (evt: any) => {
        evt.preventDefault();
        setIsLoading(true);
        if (validateForm()) {
            onSubmitHandler(form);
            setIsLoading(false);
        }
    }
    const validateForm = () => {
        const { username, password } = form;
        let isValid = false;
        if (username === '') {
            setError({
                ...error,
                usernameError: 'Username cannot be empty!'
            })
            return isValid;
        }
        if (password === '') {
            setError({
                ...error,
                passwordError: 'Password cannot be empty!'
            })
            return isValid;
        }

        if (!validateEmail(username)) {
            setError({
                ...error,
                usernameError: 'Invalid username! please enter your valid username?'
            })
            return isValid
        }
        return !isValid;
    }
    return (
        <div className={styles.login}>
            <div className={styles.loginTitle}>
                <h1>Sign In</h1>
            </div>
            {isloading &&
                <div className={styles.loading}>
                    <Loader />
                </div>
            }
            <div className={styles.inputContainer}>
                <label htmlFor="username">Username:</label>
                <input type="text"
                    name='username'
                    className={error.usernameError ? styles.inputError : ''}
                    value={form.username}
                    onChange={(e: any) => {
                        setForm({
                            ...form,
                            username: e.target.value.trim()
                        })
                        setError({
                            ...error,
                            usernameError: ''
                        })
                    }} />
                {error.usernameError &&
                    <label className={styles.error} htmlFor="usernameError">{error.usernameError}</label>
                }
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="username">Password:</label>
                <input type="password"
                    name='password'
                    className={error.passwordError ? styles.inputError : ''}
                    value={form.password}
                    onChange={(e: any) => {
                        setForm({
                            ...form,
                            password: e.target.value
                        })
                        setError({
                            ...error,
                            passwordError: ''
                        })
                    }} />
                {error.passwordError &&
                    <label className={styles.error} htmlFor="passwordError">{error.passwordError}</label>
                }
            </div>
            <div className={styles.loginFooter}>
                <div className={styles.rememberMe}>
                    <input type="checkbox" name="rememberMe" id="rememberMe"
                        checked={form.rememberMe}
                        onChange={e => {
                            setForm({
                                ...form,
                                rememberMe: e.target.checked
                            })
                        }} />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div className={styles.forgetPassword}>
                    <a href="/forgotPassword">Forgot Password?</a>
                </div>
            </div>
            <div className={styles.submitContainer}>
                <button onClick={signInHandler}>Sign In</button>
            </div>

        </div>
    );
}

Login.propTypes = {
    onSubmitHandler: PropTypes.func
}
