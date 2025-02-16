"use client"

import React, { useEffect } from 'react';
import styles from './page.module.css'
import { useCurrentUser, UserProvider } from '../context/UserContext';
import CreateTenant from '../components/createTenant/CreateTenant';
import { ITenantDetails } from '../models';
import SearchTanent from '../components/searchTanent/SearchTanent';
import Greeting from '../components/greeting/Greeting';
import { createTanent } from '../actions/createTanent';
import { TanentProvider } from '../context/TanentContext';
export default function Tenant() {
    const onCreateTenant = (data: ITenantDetails, token: string) => {
        return createTanent(data, token)
    }
    return (
        <UserProvider>
            <div className={styles.container}>
                <Greeting />
                <TanentProvider>
                    <h1>Search Tanent</h1>
                    <SearchTanent />
                    <h1>Create Tanent</h1>
                    <CreateTenant onCreateTenant={onCreateTenant} />
                </TanentProvider>
            </div>
        </UserProvider>

    );
}
