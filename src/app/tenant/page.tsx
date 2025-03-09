

import React from 'react';
import styles from './page.module.css'
import { UserProvider } from '../context/UserContext';
import Greeting from '../components/greeting/Greeting';
import { TanentProvider } from '../context/TanentContext';
import TenantManager from '../components/tenantManager/TenantManager';
export default function Tenant() {
    return (
        <UserProvider>
            <div className={styles.container}>
                <Greeting />
                <TanentProvider>
                    <TenantManager />
                </TanentProvider>
            </div>
        </UserProvider>

    );
}
