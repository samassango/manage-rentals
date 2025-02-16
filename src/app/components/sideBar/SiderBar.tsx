import React from 'react';
import styles from './SideBar.module.css'
import { MdHome } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { IoMdGitCompare } from "react-icons/io";
import { LuTableProperties } from "react-icons/lu";
import { FaHouseChimneyUser, FaUsers } from 'react-icons/fa6';
export default function SideBar() {
  return (
    <div className={styles.sideBar}>
        <div className={styles.logo}>
            <FaHouseChimneyUser />
            <div className={styles.loginTanent}>Real Estate App</div>
        </div>
       <ul className={styles.menu}>
        <li className={styles.navLink} ><a href='#'><MdHome/><span>Dashboard</span></a></li>
        <li className={styles.navLink}><a href='#'><IoIosList/><span>Property Listing</span></a></li>
        <li className={styles.navLink}><a href='#'><IoMdGitCompare /><span>Property Compare</span></a></li>
        <li className={styles.navLink}><a href='#'><LuTableProperties /><span>Rentals properties</span></a></li>
        <li className={styles.navLink}><a href='#'><FaUsers  /><span>User Management</span></a></li>
       </ul>
    </div>
  );
}
