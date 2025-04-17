import React, { useState } from 'react';
import styles from './SignUp.module.css'

import { Form, Formik, FormikHelpers } from 'formik';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import * as Yup from 'yup'
import { MdAlternateEmail } from 'react-icons/md';
import { UserType, UserRole } from '@/app/permissions/Permissions';
import Roles from '@/app/permissions/roles';
import { userSignUp } from '@/app/actions/signup';
import { ISignUp } from '@/app/models';
import MessageModel, { IMessageDialog, MessageType } from '../../messageModel/MessageModel';

export default function SignUp({ onScreenChange }: { onScreenChange: ({ headerTitle, headerNotes, screen }: { headerTitle: string; headerNotes: string; screen: string }) => any }) {

    const [isOpenModelDialog, setIsOpenModelDialog] = useState(false)
    const [isClosableDialog, setIsClosableDialog] = useState(false)
    const [isDialogContinueActive, setIsDialogContinueActive] = useState(false)
    const [dialogMessageType, setDialogMessageType] = useState(MessageType.INFO)
    const [dialogMessage, setDialogMessage] = useState('')



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
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required')
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
            actions.setSubmitting(false);
        }, 1000);
        const { confirmPassword, ...restValue } = values

        const inputValues = { ...restValue, role: UserRole.editor, userType: UserType.Guest };
        userSignUp(inputValues as any).then(res => {
            // console.log({ guest: res })
            if(res.id){
                showMessageDialog({
                    message:'Congratulations, your account has been successfully created.',
                    isModalOpen: true,
                    isContainueActive: true,
                    messageType: MessageType.SUCCESS
                })
            }else{
                if(res.error && res.error.statusCode===403){
                    const {message} = res.error
                    showMessageDialog({
                        message,
                        isModalOpen: true,
                        isContainueActive: true,
                        isClosable: true,
                        messageType: MessageType.ERROR
                    })
                }
            }
        }).catch(err=>{
            console.log({error: err})
            showMessageDialog({
                message:'Error occured, your account was not created successfully.',
                isModalOpen: true,
                isClosable: true,
                messageType: MessageType.ERROR
            })
        })
        
    }

    const goToLoginPage =(evt: any)=>{
        evt.preventDefault()
        showMessageDialog({
            message:'Are you sure you want to go to Login page',
            isModalOpen: true,
            isClosable: true,
            isContainueActive: true,
            messageType: MessageType.INFO
        })
    }

    const moveToLoginHandler = (evt: any) => {
        evt.preventDefault()
        onScreenChange({
            headerTitle: 'Sign In',
            headerNotes: 'Communicate with Property Agent',
            screen: 'SignIn'
        })
    }

    const onSuccessContinue = (evt: any) => {
        evt.preventDefault()
        moveToLoginHandler(evt)
    }

    const onCloseDialog = (evt:any) => {
        evt.preventDefault()
        setIsOpenModelDialog(false)
    }

    const showMessageDialog = (messageDialog: IMessageDialog) => {
        if (messageDialog.isModalOpen) setIsOpenModelDialog(messageDialog.isModalOpen)
        if (messageDialog.isClosable) setIsClosableDialog(messageDialog.isClosable)
        if(messageDialog.isContainueActive) setIsDialogContinueActive(messageDialog.isContainueActive)
        if (messageDialog.messageType) setDialogMessageType(messageDialog.messageType)
        if (messageDialog.message) setDialogMessage(messageDialog.message)
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
                    <Form className="form-container">
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
                            {props.errors.firstname && props.touched.firstname && <div id={styles.feedback}>{props.errors.firstname}</div>}
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
                            {props.errors.lastname && props.touched.lastname && <div id={styles.feedback}>{props.errors.lastname}</div>}
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
                            {props.errors.email && props.touched.email && <div id={styles.feedback} >{props.errors.email}</div>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor='password'>Password:</label>
                            <div className={styles.inputIconItem}>
                                <RiLockPasswordFill />
                                <input
                                    type="password"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.password}
                                    name="password"
                                />
                            </div>
                            {props.errors.password && props.touched.password && <div id={styles.feedback}>{props.errors.password}</div>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor='confirmPassword'>Confirm Password:</label>
                            <div className={styles.inputIconItem}>
                                <RiLockPasswordFill />
                                <input
                                    type="password"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.confirmPassword}
                                    name="confirmPassword"
                                />
                            </div>
                            {props.errors.password && props.touched.confirmPassword && <div id={styles.feedback}>{props.errors.password}</div>}
                        </div>
                        <div className={styles.termsAndCondition}>
                            By creating an account you accept the term of use of this service.
                        </div>
                        <div className={styles.actionContainer}>
                            {/* disabled={props.isSubmitting} */}
                            <button type="submit" className={styles.submitButton} >Sign Up</button>
                            <button type='button' className={styles.loginButton} onClick={goToLoginPage}>Go to Login? </button>
                        </div>
                    </Form>
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
