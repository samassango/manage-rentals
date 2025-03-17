import { getTanentById } from '@/app/actions/getTanent';
import AdminLayout from '@/app/components/adminLayout/AdminLayout';
import { TanentProvider } from '@/app/context/TanentContext';
import { UserProvider } from '@/app/context/UserContext';
import styles from './page.module.css'
import { cookies } from 'next/headers';
import React from 'react';
import { styleText } from 'util';

export default async function TenantDetail({ params }: { params: Promise<{ tenantId: string }> }) {
    const tenantId = (await params).tenantId;
    let tokenData = (cookies().get('session')?.value)
    const tenant = await getTanentById(tenantId)
    console.log({ tokenData, tenantId, tenant })

    return (
        <UserProvider>
            <TanentProvider>
                <AdminLayout>

                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1>Tenent Information</h1>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.contentContainer}>
                                <div className={styles.row}>
                                    <label>Tenant name:</label>
                                    <span>{tenant.tenantName}</span>
                                </div>
                                <div className={styles.description}>
                                    <label>Tenant Description:</label>
                                    <span>{tenant.tenantDescription}</span>
                                </div>
                                <div className={styles.row}>
                                    <label>Created date:</label>
                                    <span>{tenant.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminLayout>
            </TanentProvider>
        </UserProvider>
    );
}
