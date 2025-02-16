import React from 'react';
import styles from './Header.module.css'
import { SiConstruct3 } from 'react-icons/si';
import { FaSearch, FaUser } from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.headerItem}>
                <SiConstruct3 width={100} height={100} />
                <h1>ConstruTech</h1>
            </div>
            <div className={styles.headerItem}>
                <button className={styles.menuButton}>
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
                        <a href='#'><FaUser /></a>
                    </div>
                    <label htmlFor='profileName' className={styles.profileName}>Sibusiso Massango</label>
                </div>
                <div className={styles.notification}><a href='#'><IoNotifications /></a></div>
                <button className={styles.logoutButton}><LuLogOut /><span>Logout</span></button>
            </div>
        </div>
    );
}
