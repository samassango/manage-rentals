'use client'
import React, { useEffect, useState } from 'react';
import {  FaUser } from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';

import styles from './AdminLayout.module.css'
import { IAdminLayout } from '@/app/models';
import Header from '../header/Header';
import SideBar from '../sideBar/SiderBar';
import ModalDialog from '../modal/ModalDialog';
import Profile from '../profile/Profile';
import Nofications from '../notification/Notification';

export default function AdminLayout({ children }: IAdminLayout) {
    const [openProfileModal, setOpenProfileModal] = useState(false)
    const [openNotificationModal, setOpenNotificationModal] = useState(false)
    const [onMenuOpen, setOnMenuOpen] = useState(false)


    const openUserProfile = () => setOpenProfileModal(true)
    const openNotification = () => setOpenNotificationModal(true)
    const onMenuHandler = () => { }

    const handleIconCloseProfile = () => setOpenProfileModal(false)
    const handleIconCloseNotification = () => setOpenNotificationModal(false)
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header openUserProfile={openUserProfile} openNotification={openNotification} onMenuHandler={onMenuHandler} onMenuOpen={onMenuOpen} />
            </div>
            <div className={styles.content}>
                <div className={styles.sideBarContainer}><SideBar /></div>
                <div className={styles.mainContainer}>
                    <ModalDialog
                        title='User Profile'
                        titleBarDialogIcon={() => <FaUser/>}
                        isModalOpen={openProfileModal}
                        enableCloseIcon={true}
                        onIconClose={handleIconCloseProfile} >
                        <div>
                            <Profile />
                        </div>
                    </ModalDialog>
                    <ModalDialog
                        title='Nofications'
                        titleBarDialogIcon={() => <IoNotifications/>}
                        isModalOpen={openNotificationModal}
                        enableCloseIcon={true}
                        onIconClose={handleIconCloseNotification}>
                        <div>
                            <Nofications/>
                        </div>
                    </ModalDialog>
                    {children}
                </div>
            </div>
        </div>
    );
}

