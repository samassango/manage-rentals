import { useTanentContext } from '@/app/context/TanentContext';
import React, { useState } from 'react';
import styles from './TenantManager.module.css'
import { redirectPage } from '@/app/actions/login';
import CreateTenant, { ITenant } from '../createTenant/CreateTenant';

export default function TenantManager({ onCreateTenant, isLoadingFn }: ITenant) {
    const [isCreateNewTenant, setIsCreateNewTenant] = useState(false)
    
    const { currentTanent } = useTanentContext()

    if (!isCreateNewTenant && currentTanent && currentTanent.id) {
        const handleContinueLogin = () => {
            isLoadingFn(true)
            redirectPage('/tenant-admin')
        }
        const handleCreateTent = () => setIsCreateNewTenant(true)

        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.cardInfo}>
                        <label>Logging in to :</label>
                        <span>{currentTanent.tenantName}</span>
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
            <CreateTenant isLoadingFn={isLoadingFn} onCreateTenant={onCreateTenant} />
        </div>
    )
}
