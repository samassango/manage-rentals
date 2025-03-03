"use client"

import React, { useEffect, useState } from 'react';
import styles from './page.module.css'
import { UserProvider } from '../context/UserContext';
import { ITenantDetails } from '../models';
import Greeting from '../components/greeting/Greeting';
import { createTanent } from '../actions/createTanent';
import { TanentProvider } from '../context/TanentContext';
import TenantManager from '../components/tenantManager/TenantManager';
import Loader from '../components/Loader';
export default function Tenant() {
    const [isLoading, setIsLoading] = useState(false)
    const onCreateTenant = (data: ITenantDetails, token: string) => {
        return createTanent(data, token)
    }
    const onLoading =(val: boolean)=>{
        setIsLoading(val)
    }
    return (
        <UserProvider>
            <div className={styles.container}>
                <Greeting />
                {isLoading && <Loader/>}
                <TanentProvider>
                    <TenantManager  onCreateTenant={onCreateTenant} isLoadingFn={onLoading}/>
                </TanentProvider>
            </div>
        </UserProvider>

    );
}
