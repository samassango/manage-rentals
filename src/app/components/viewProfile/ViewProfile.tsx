'use client'

import React from 'react';
import Image from 'next/image'
import styles from './ViewProfile.module.css'
import { useCurrentUser } from '@/app/context/UserContext';
import { FaUser } from 'react-icons/fa';
import { RiUserSettingsFill } from 'react-icons/ri';
export default function ViewProfile() {
    const { currentUser } = useCurrentUser();
    console.log({ currentUser })
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Image src={"/avatars/avatar-placeholder.png"} alt={''} width="140" height="140" />
                <div className={styles.headerInfo}>
                    <div className={styles.rowItem}>
                        <label>Email :</label>
                        <span>{currentUser.email}</span>
                    </div>
                    <div className={styles.rowItem}>
                        <label>Display name :</label>
                        <span>{currentUser.realm}</span>
                    </div>
                    <div className={styles.sections}>
                        <div className={styles.rowItem}>
                            <FaUser />
                            <label>User type :</label>
                            <span>{currentUser.userType}</span>
                        </div>
                        <div className={styles.rowItem}>
                            <RiUserSettingsFill />
                            <label>User role :</label>
                            <span>{currentUser.role}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                {/* View Profile */}
            </div>
        </div>
    );
}
