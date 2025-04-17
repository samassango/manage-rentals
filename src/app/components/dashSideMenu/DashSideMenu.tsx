import React from 'react';
import Image from 'next/image'
import styles from './DashSideMenu.module.css'
import { FaHouseUser } from 'react-icons/fa';
import { MdMonitor, MdSettingsApplications } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';

export default function DashSideMenu() {
    return (
        <div className={styles.container}>
            <div className={styles.inconProfile}>
                <Image src={"/avatars/avatar-placeholder.png"} alt={''} width="100" height="100" />
            </div>
            <div className={styles.profileDetails}>
                <label>Devon</label>
                <label>Van Zily</label>
            </div>
            <div className={styles.role}>
                <label>Role:</label><label>Guest</label>
            </div>

            <div className={styles.sideNavMenu}>
                <ul>
                  <li><a href='/dashboard'><FaHouseUser /><span>Home</span></a></li>
                  <li><a href='/applications'><MdSettingsApplications /><span>Applications</span></a></li>
                  <li><a href='/rental-tracker'><MdMonitor /><span>Rental Tracker</span></a></li>
                  <li><a href='/logout'><IoLogOut /><span>Logout</span></a></li>
                </ul>
            </div>
        </div>
    );
}
