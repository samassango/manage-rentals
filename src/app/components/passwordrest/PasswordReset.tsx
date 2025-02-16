import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../login/Login.module.css'
export interface IResetUser{
    email: string;
}
interface IForm {
    onSubmitHandler: (data: IResetUser) => void
}
export default function PasswordReset({onSubmitHandler}:IForm) {
    const [form, setForm]=useState({
        email:''
    })
    const [error, setError]=useState({
        emailError:''
    })
    const onPasswordChangeHandler = (evt:any) => {
       onSubmitHandler(form)
    }
  return (
    <div className={styles.login}>
    <div className={styles.loginTitle}>
        <h1>Password Reset</h1>
    </div>
    <div className={styles.inputContainer}>
                <label htmlFor="username">Username/Email:</label>
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
            <div className={styles.submitContainer}>
                <button onClick={onPasswordChangeHandler}>Reset</button>
            </div>
    </div>
  );
}

PasswordReset.propTypes = {

}
