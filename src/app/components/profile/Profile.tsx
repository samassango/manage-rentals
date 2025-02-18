import React from 'react';
import Image from 'next/image'
import styles from './Profile.module.css'
export default function Profile() {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileImage}>
                <Image src={"/avatars/avatar-placeholder.png"} alt={''} width="140" height="140" />
            </div>
            <div className={styles.content}>
                <div className={styles.displayName}>
                    Sibusiso Massango
                </div>
                <div className={styles.userRole}>
                    Role: Admin
                </div>
            </div>
        </div>
    );
}
