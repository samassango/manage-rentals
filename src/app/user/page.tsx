import React from 'react';
import styles from './page.module.css'
import PublicUser from '../components/PublicUser/PublicUser';

export default function Page() {
  return (
    <div className={styles.container}>
        <PublicUser />
    </div>
  );
}
