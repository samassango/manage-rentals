import React, { useEffect, useState } from 'react';
import styles from './Header.module.css'
import { SiConstruct3 } from 'react-icons/si';
import { FaSearch, FaUser } from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import useUserStore from '@/app/store/store';
import { redirect } from 'next/navigation';
import { useCurrentUser } from '@/app/context/UserContext';
interface IHeader {
    openUserProfile: () => void;
    openNotification: () => void;
    onMenuHandler: (isOpen: boolean) => void;
    onMenuOpen: boolean;
}
export default function Header({ openUserProfile, openNotification, onMenuHandler, onMenuOpen }: IHeader) {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const reset = useUserStore(state => state.reset)
    const { currentUser, user } = useCurrentUser()

    useEffect(()=>{
        setMenuIsOpen(onMenuOpen)
    },[onMenuOpen])

    const onMenuChange = (evt:any) => {
        evt.preventDefault();
        onMenuHandler(menuIsOpen);
    }
    const OnViewUserProfile =(evt:any)=>{
        evt.preventDefault();
        openUserProfile()
    }
    const onViewNotification =(evt: any)=>{
        evt.preventDefault();
        openNotification()
    }
    const handleLogout =()=>{
        reset()
        localStorage.removeItem('currentUser')
        redirect('/login')
    }

    return (
        <div className={styles.header}>
            <div className={styles.headerItem}>
                <SiConstruct3 width={100} height={100} />
                <h1>ConstruTech</h1>
            </div>
            <div className={styles.headerItem}>
                <button className={styles.menuButton} onClick={onMenuChange}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </button>
                <div className={styles.searchContainer}>
                    <input type="text" className={styles.searchInput} name="search" id="search-input" placeholder='Search listing...' />
                    <button className={styles.searchButton}><FaSearch /></button>
                </div>
            </div>
            <div className={styles.headerItem}>
                <div className={styles.profile}>
                    <div className={styles.profileImg}>
                        <button className={styles.iconButtons} onClick={OnViewUserProfile}><FaUser /></button>
                    </div>
                    <label htmlFor='profileName' className={styles.profileName}>{currentUser?.realm || 'User'}</label>
                </div>
                <div className={styles.notification}><button className={styles.iconButtons} onClick={onViewNotification}><IoNotifications /></button></div>
                <button onClick={handleLogout} className={styles.logoutButton}><LuLogOut /><span>Logout</span></button>
            </div>
        </div>
    );
}
