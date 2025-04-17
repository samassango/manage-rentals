import React, { useState } from 'react';
import styles from './SignIn.module.css'
import { Formik, FormikHelpers } from 'formik';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import * as Yup from 'yup'
import MessageModel, { IMessageDialog, MessageType } from '../../messageModel/MessageModel';
import { redirectPage, userLogin } from '@/app/actions/login';
import { ILogin } from '@/app/models';

export default function SignIn({ onScreenChange }: { onScreenChange: ({ headerTitle, headerNotes, screen }: { headerTitle: string; headerNotes: string; screen: string }) => any }) {
    const [isOpenModelDialog, setIsOpenModelDialog] = useState(false)
    const [isClosableDialog, setIsClosableDialog] = useState(false)
    const [isDialogContinueActive, setIsDialogContinueActive] = useState(false)
    const [dialogMessageType, setDialogMessageType] = useState(MessageType.INFO)
    const [dialogMessage, setDialogMessage] = useState('')

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
    const onSubmitFormHandler = (
        values: { email: string; password: string; },
        actions: FormikHelpers<{ email: string; password: string; }>
    ) => {
        const { email, password } = values;
        userLogin({ email: email.toString(), password: password.toString() } as ILogin).then(res => {
            if (res.token) {
                redirectPage('/dashboard')
            } else {
                if (res.error) {
                    const { message } = res.error
                    showMessageDialog({
                        message,
                        isModalOpen: true,
                        isContainueActive: true,
                        isClosable: true,
                        messageType: MessageType.ERROR
                    })
                }
            }
            actions.setSubmitting(false);
        });
    }

    const moveToLoginHandler = (evt: any) => {
        evt.preventDefault()
        onScreenChange({
            headerTitle: 'Sign Up',
            headerNotes: 'Communicate with Property Agent',
            screen: 'SignUp'
        })
    }

    const showMessageDialog = (messageDialog: IMessageDialog) => {
        if (messageDialog.isModalOpen) setIsOpenModelDialog(messageDialog.isModalOpen)
        if (messageDialog.isClosable) setIsClosableDialog(messageDialog.isClosable)
        if (messageDialog.isContainueActive) setIsDialogContinueActive(messageDialog.isContainueActive)
        if (messageDialog.messageType) setDialogMessageType(messageDialog.messageType)
        if (messageDialog.message) setDialogMessage(messageDialog.message)
    }

    const onSuccessContinue = (evt: any) => {
        evt.preventDefault()
        moveToLoginHandler(evt)
    }

    const onCloseDialog = (evt: any) => {
        evt.preventDefault()
        setIsOpenModelDialog(false)
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
                onSubmit={onSubmitFormHandler}
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
                            {props.errors.email && props.touched.email && <div id="feedback">{props.errors.email}</div>}
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
                            {props.errors.password && props.touched.password && <div id="feedback">{props.errors.password}</div>}
                        </div>
                        <div className={styles.actionContainer}>
                            <button type="submit" className={styles.submitButton} disabled={props.isSubmitting}>Login</button>
                            <button type='button' className={styles.loginButton} onClick={moveToLoginHandler}>Create Account? </button>
                        </div>
                    </form>
                )}
            </Formik>
            <MessageModel
                isModalOpen={isOpenModelDialog}
                isClosable={isClosableDialog}
                isContainueActive={isDialogContinueActive}
                messageType={dialogMessageType}
                message={dialogMessage}
                onContinueHandler={onSuccessContinue}
                onIconClose={onCloseDialog}
            />
        </div>
    );
}
