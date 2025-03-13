import styles from './Signup.module.css'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Loader from '../Loader';
import { validateEmail } from '@/app/utils/validateInputs';
import { FaLock, FaUser } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
export interface ISignUpUser {
    email: string;
    password: string;
    displayName: string;
}
interface IForm {
    onSubmitHandler: (data: ISignUpUser) => Promise<any>
}
export default function Signup({ onSubmitHandler }: IForm) {
    const [form, setForm] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState({
        displayNameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
    })
    const [userResults, setUserResults] = useState(null)
    const [isloading, setIsLoading] = useState(false)
    const signUpHandler = (evt: any) => {
        evt.preventDefault();
        setIsLoading(true);
        if (validateForm()) {
            onSubmitHandler(form).then(res => {
                console.log("SignUp", res)
                setUserResults(res)
                setIsLoading(false);
            });

        }
    }

    const validateForm = () => {
        const { displayName, password, confirmPassword, email } = form;
        let isValid = false;
        if (displayName === '') {
            setError({
                ...error,
                displayNameError: 'Display name cannot be empty!'
            })
            return isValid;
        }
        if (email === '') {
            setError({
                ...error,
                emailError: 'Email cannot be empty!'
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
        if (confirmPassword === '') {
            setError({
                ...error,
                confirmPasswordError: 'Confirm password cannot be empty!'
            })
            return isValid;
        }

        if (!validateEmail(email)) {
            setError({
                ...error,
                emailError: 'Invalid email! please enter your valid email?'
            })
            return isValid
        }
        return !isValid;
    }
    console.log({ userResults })
    return (
        <div className={styles.login}>
            <div className={styles.loginTitle}>
                <h1>Sign Up</h1>
            </div>
            {/* {isloading &&
                <div className={styles.loading}>
                    <Loader />
                </div>
            } */}
            <div className={styles.inputContainer}>
                <label htmlFor="name">Display name:</label>
                <div className={styles.input}>
                    <FaUser />
                    <input type="text"
                        name='displayName'
                        value={form.displayName}
                        onChange={(e: any) => {
                            setForm({
                                ...form,
                                displayName: e.target.value
                            })
                            setError({
                                ...error,
                                displayNameError: ''
                            })
                        }} />
                </div>
                {error.displayNameError &&
                    <label className={styles.error} htmlFor="displayNameError">{error.displayNameError}</label>
                }
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="username">Username:</label>
                <div className={styles.input}>
                    <MdAlternateEmail />
                    <input type="text"
                        className={error.emailError ? styles.inputError : ''}
                        name='username'
                        value={form.email}
                        onChange={(e: any) => {
                            setForm({
                                ...form,
                                email: e.target.value
                            })
                            setError({
                                ...error,
                                emailError: ''
                            })
                        }} />
                </div>
                {error.emailError &&
                    <label className={styles.error} htmlFor="emailError">{error.emailError}</label>
                }
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password">Password:</label>
                <div className={styles.input}>
                    <FaLock />
                    <input type="password"
                        className={error.passwordError ? styles.inputError : ''}
                        name='password'
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
            <div className={styles.inputContainer}>
                <label htmlFor="passowrd">Confirm Password:</label>
                <div className={styles.input}>
                    <FaLock />
                    <input type="password"
                        name='confirmPassword'
                        value={form.confirmPassword}
                        onChange={(e: any) => {
                            setForm({
                                ...form,
                                confirmPassword: e.target.value
                            })
                            setError({
                                ...error,
                                confirmPasswordError: ''
                            })
                        }} />
                </div>
                {error.confirmPasswordError &&
                    <label className={styles.error} htmlFor="confirmPasswordError">{error.confirmPasswordError}</label>
                }
            </div>
            <div className={styles.submitContainer}>
                <a href='/login'>Back to Login</a> <button onClick={signUpHandler}>Sign Up</button>
            </div>

        </div>
    );
}

Signup.propTypes = {
    onSubmitHandler: PropTypes.func
}
