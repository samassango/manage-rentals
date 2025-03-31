import React from 'react';
import styles from './SignUp.module.css'

import { Formik, FormikHelpers } from 'formik';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import * as Yup from 'yup'
import { MdAlternateEmail } from 'react-icons/md';

export default function SignUp({ onScreenChange }: { onScreenChange: ({ headerTitle, headerNotes, screen }: { headerTitle: string; headerNotes:string; screen: string }) => any }) {

    const validationSchema = Yup.object({
        firstname: Yup.string()
            .min(3, 'Name must be at least 3 characters'),
        lastname: Yup.string()
            .min(3, 'Name must be at least 3 characters'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    })

    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const onSubmitHandler = (
        values: { firstname: string; lastname: string; email: string; password: string; confirmPassword: string },
        actions: FormikHelpers<{ firstname: string; lastname: string; email: string; password: string; confirmPassword: string }>
    ) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 1000);
    }

    const moveToLoginHandler = (evt: any) => {
        evt.preventDefault()
        onScreenChange({
            headerTitle: 'Sign In',
            headerNotes:'Communicate with Property Agent',
            screen: 'SignIn'
        })
    }

    return (
        <div className={styles.signUpContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Sign Up</h1>
                <span className={styles.titleNotes}>Create your new Account</span>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <div className={styles.inputContainer}>
                            <label htmlFor='firstname'>Firstname:</label>
                            <div className={styles.inputIconItem}>
                                <FaUser />
                                <input
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.firstname}
                                    name="firstname"
                                />
                            </div>
                            {props.errors.firstname && <div id="feedback">{props.errors.firstname}</div>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor='lastname'>Lastname:</label>
                            <div className={styles.inputIconItem}>
                                <FaUser />
                                <input
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.lastname}
                                    name="lastname"
                                />
                            </div>
                            {props.errors.lastname && <div id="feedback">{props.errors.lastname}</div>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor='email'>Email:</label>
                            <div className={styles.inputIconItem}>
                                <MdAlternateEmail />
                                <input
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.email}
                                    name="email"
                                />
                            </div>
                            {props.errors.email && <div id="feedback">{props.errors.email}</div>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor='password'>Password:</label>
                            <div className={styles.inputIconItem}>
                                <RiLockPasswordFill />
                                <input
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.password}
                                    name="password"
                                />
                            </div>
                            {props.errors.password && <div id="feedback">{props.errors.password}</div>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor='confirmPassword'>Confirm Password:</label>
                            <div className={styles.inputIconItem}>
                                <RiLockPasswordFill />
                                <input
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.confirmPassword}
                                    name="confirmPassword"
                                />
                            </div>
                            {props.errors.password && <div id="feedback">{props.errors.password}</div>}
                        </div>
                        <div className={styles.termsAndCondition}>
                            By creating an account you accept the term of use of this service.
                        </div>
                        <div className={styles.actionContainer}>
                            <button type="submit" className={styles.submitButton} disabled={props.isSubmitting}>Sign Up</button>
                            <button type='button' className={styles.loginButton} onClick={moveToLoginHandler}>Go to Login? </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}
