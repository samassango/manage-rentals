import React from 'react';
import styles from './AdminLayout.module.css'
import { IAdminLayout } from '@/app/models';
import Header from '../header/Header';
import SideBar from '../sideBar/SiderBar';

export default function AdminLayout({ children }: IAdminLayout) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header/>
            </div>
            <div className={styles.content}>
                <div className={styles.sideBarContainer}><SideBar/></div>
                <div className={styles.mainContainer}>
                    {children}
                </div>
            </div>
        </div>
    );
}

