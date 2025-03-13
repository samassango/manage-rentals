import React from 'react';
import styles from './page.module.css'
import { redirectPage } from '../actions/login';
import { cookies } from 'next/headers';

export default async function Logout() {
    await redirectPage('/login')
    return (
        <div className={styles.container}>
            <p>User logging out...</p>
        </div>
    );
}
