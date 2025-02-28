import React from 'react';
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <div className={styles.FooterContainer}>
        <div className={styles.contactInfo}>
            contact
        </div>
        <div className={styles.developerInfo}>
           developer Info
        </div>
    </div>
  );
}
