'use client'

import React, { useState } from 'react';
import styles from './PublicUser.module.css'
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

export default function PublicUser() {
    const [activeScreen, setActiveScreen] = useState('SignUp')
    const [pageContent, setPageContent] = useState({
        headerTitle: 'Sign Up',
        headerNotes: 'Communicate with Property Agent'
    })
    const onScreenChangeHandler = (value: { headerTitle: string; headerNotes: string; screen: string }) => {
        const { headerTitle, headerNotes } = value
        setPageContent({
            headerTitle,
            headerNotes
        })
        setActiveScreen(
            value.screen
        )
    }
    return (
        <div className={styles.container}>

            <div className={styles.containerItem}>
                <div className={styles.pageInfo}>
                    <h1 className={styles.headerTitle}>{pageContent.headerTitle}</h1>
                    <span className={styles.headerNote}>{pageContent.headerNotes}</span>
                </div>
                <div className={styles.pageIcon}>
                    <IoCheckmarkCircleSharp />
                </div>
            </div>
            <div className={styles.containerItem}>
                {activeScreen === 'SignUp' ?
                    <SignUp onScreenChange={onScreenChangeHandler} />
                    : <SignIn onScreenChange={onScreenChangeHandler} />
                }

            </div>
        </div>
    );
}
