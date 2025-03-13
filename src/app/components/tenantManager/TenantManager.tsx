'use client'

import { useTanentContext } from '@/app/context/TanentContext';
import React, { useEffect, useState } from 'react';
import styles from './TenantManager.module.css'
import { redirectPage } from '@/app/actions/login';
import CreateTenant, { ITenant } from '../createTenant/CreateTenant';
import Loader from '../Loader';
import { createTanent } from '@/app/actions/createTanent';
import { ITenantDetails } from '@/app/models';
import withAuth from '../withAuth/withAuth';

function TenantManager() {
    const [isCreateNewTenant, setIsCreateNewTenant] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { currentTanent, tanents,  updateSeletedTenant} = useTanentContext()
    
    const isLoadingFn = () => {
        setIsLoading(true)
    }

    const onCreateTenant = (data: ITenantDetails, token: string) => {
        return createTanent(data, token)
    }
   
    if (!isCreateNewTenant && currentTanent && currentTanent.id) {
        const handleContinueLogin = () => {
            setIsLoading(true)
            redirectPage('/tenant-admin')
        }
        const handleCreateTent = () => setIsCreateNewTenant(true)
        const handleOnChange = (e:any)=>{
            console.log({selectedId: e.target.value})
            updateSeletedTenant(e.target.value)
        }

        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    {isLoading && <Loader />}
                </div>
                <div className={styles.card}>
                    <div className={styles.cardInfo}>
                        <label>Logging in to :</label>
                        <select onChange={handleOnChange}>
                            <option value={currentTanent.id}>{currentTanent.tenantName}</option>
                            {
                                tanents && tanents.map(data=>( 
                                <option key={data.id} value={data.id}>{data.tenantName}</option>))
                            }
                        </select>
                    </div>
                    <div className={styles.actionsContainer}>
                        <button className={styles.newTenant} onClick={handleCreateTent}>Create New Tenant</button>
                        <button className={styles.continueLoggingIn} onClick={handleContinueLogin}>Continue Logging In</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <h1>Create Tanent</h1>
            <div className={styles.loading}>
                {isLoading && <Loader />}
            </div>
            <CreateTenant isLoadingFn={isLoadingFn} onCreateTenant={onCreateTenant} />
        </div>
    )
}
export default withAuth(TenantManager)