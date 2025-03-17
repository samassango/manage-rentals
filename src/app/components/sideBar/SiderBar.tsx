import React, { useEffect, useState } from 'react';
import styles from './SideBar.module.css'
import { MdHome } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { IoMdGitCompare } from "react-icons/io";
import { LuTableProperties } from "react-icons/lu";
import { FaHouseChimneyUser, FaUsers } from 'react-icons/fa6';
import { useTanentContext } from '@/app/context/TanentContext';
export default function SideBar() {
  const [tenantInfoUrl, setTenantInfoUrl] = useState('/')
  const { currentTanent } = useTanentContext()
  useEffect(()=>{
    if(currentTanent) {
       setTenantInfoUrl(`/tenant/${currentTanent.id}`)
    }
  }, [currentTanent])
  return (
    <div className={styles.sideBar}>
      <div className={styles.logo}>
        <FaHouseChimneyUser />
        <div className={styles.loginTanent}>Real Estate App</div>
      </div>
      <ul className={styles.menu}>
        <li className={styles.navLink} ><a href='/tenant-admin'><MdHome /><span>Dashboard</span></a></li>
        <li className={styles.navLink}><a href='/my-listing'><IoIosList /><span>My Property Listing</span></a></li>
        <li className={styles.navLink}><a href='/my-profile'><IoMdGitCompare /><span>My Profile</span></a></li>
        <li className={styles.navLink}><a href={tenantInfoUrl}><LuTableProperties /><span>Current LoggedIn Tenant</span></a></li>
        <li className={styles.navLink}><a href='/user-management'><FaUsers /><span>User Management</span></a></li>
      </ul>
    </div>
  );
}
