'use client'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Login.module.css'
import Loader from '../Loader';
import { validateEmail } from '@/app/utils/validateInputs';
import { useCurrentUser } from '@/app/context/UserContext';
import { redirectPage, userLogin } from '@/app/actions/login';
import { ILogin } from '@/app/models';
import { MdAlternateEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

export interface IUser {
    username: string;
    password: string;
    rememberMe: boolean;
}

interface IForm {
    onSubmitHandler: (data: IUser) => Promise<any>
}


export default function Login() {
    const [form, setForm] = useState({ username: '', password: '', rememberMe: false })
    const [error, setError] = useState({ usernameError: '', passwordError: '' })
    const [isloading, setIsLoading] = useState(false)
    const [loginResult, setLoginResult] = useState(null)

    const { onSuccessHandler, user, currentUser } = useCurrentUser();

    useEffect(() => {
        if (loginResult) {
            onSuccessHandler(loginResult)
        }
        if (currentUser && Object.keys(currentUser).length > 0) {
            redirectPage('/tenant')
        }
    }, [loginResult, currentUser])

    const onSubmitHandler = async (user: IUser): Promise<any> => {
        const { username, password } = user;
        return userLogin({ email: username.toString(), password: password.toString() } as ILogin);
    }


    const signInHandler = (evt: any) => {
        evt.preventDefault();
        setIsLoading(true);
        if (validateForm()) {
            onSubmitHandler(form).then(response => {
                console.log({ response })
                setLoginResult(response)
            })
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
                <label htmlFor="username">Username / Email</label>
                <div className={styles.input}>
                    <MdAlternateEmail />
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
                </div>

                {error.usernameError &&
                    <label className={styles.error} htmlFor="usernameError">{error.usernameError}</label>
                }
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="username">Password</label>
                <div className={styles.input}>
                    <FaLock />
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
                </div>
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
