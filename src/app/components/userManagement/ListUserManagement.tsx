"use client"

import React from 'react';
import styles from './ListUserManagement.module.css'
import UserTable from '../userTable/UserTable';

export default function ListUserManagement() {
    const userData: any[] = [
        {
            id:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            name:'Testing User',
            email: 'testing-user@test.com'
        },
        {
            id:'00000000000000000000000000000000000',
            name:'God User',
            email: 'god-user@test.com'
        },
        {
            id:'iwwwwwwwwwwwwwwwwwwwwwwwwwww',
            name:'Dev User',
            email: 'dev-user@test.com'
        }
    ]
    return (
        <div className={styles.container}>
            <h1>User Management</h1>
            <UserTable users={userData} />
        </div>
    );
}
