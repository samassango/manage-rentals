import React from 'react';
import styles from './SignIn.module.css'
import { Formik, FormikHelpers } from 'formik';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import * as Yup from 'yup'

export default function SignIn({ onScreenChange }: { onScreenChange: ({ headerTitle, headerNotes, screen }: { headerTitle: string; headerNotes:string; screen: string }) => any }) {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
    })
    const initialValues = {
        email: '',
        password: ''
    }
    const onSubmitHandler = (
        values: { email: string; password: string; },
        actions: FormikHelpers<{ email: string; password: string; }>
    ) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 1000);
    }

    const moveToLoginHandler = (evt: any) => {
        evt.preventDefault()
        onScreenChange({
            headerTitle: 'Sign Up',
            headerNotes:'Communicate with Property Agent',
            screen: 'SignUp'
        })
    }

    return (
        <div className={styles.signInContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Sign In</h1>
                <span className={styles.titleNotes}>Login with your credentials</span>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <div className={styles.inputContainer}>
                        <label htmlFor='email'>Username/Email:</label>
                            <div className={styles.inputIconItem}>
                                <FaUser />
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
                        <div className={styles.actionContainer}>
                            <button type="submit" className={styles.submitButton} disabled={props.isSubmitting}>Login</button>
                            <button type='button' className={styles.loginButton} onClick={moveToLoginHandler}>Create Account? </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}
