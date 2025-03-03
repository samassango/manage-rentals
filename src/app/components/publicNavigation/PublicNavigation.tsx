import React from 'react';
import { SiConstruct3 } from 'react-icons/si';

import styles from './PublicNavigation.module.css'
import { RiAdminFill } from 'react-icons/ri';

export default function PublicNavigation() {
  return (
    <nav className={styles.navigation}>
      <div className={styles.headerItem}>
        <SiConstruct3 width={100} height={100} />
        <div>
          <h1>ConstruTech</h1>
          <label>Real Estate</label>
        </div>
      </div>
      <ul className={styles.headerItem}>
        <li><a href="/"><span>Home</span></a></li>
        <li><a href="/properties"><span>Properties</span></a></li>
        <li><a href="/about"><span>About</span></a></li>
        <li><a href="/testimonials"><span>Testimonials</span></a></li>
      </ul>
      <div className={styles.headerItem}>
        <a href="/contact-us" className={styles.contactUs}><label>Contact us</label></a>
        <a href="/login" className={styles.loginAdmin}><RiAdminFill /></a>
      </div>
    </nav>
  );
}
