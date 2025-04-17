import React from 'react';
import styles from './page.module.css'
import DashSideMenu from '../components/dashSideMenu/DashSideMenu';
import ChatBox from '../components/chatbox/Chatbox';

export default function Page() {
  return (
    <div className={styles.container}>
        <div className={styles.sideMenu}>
           <DashSideMenu />
        </div>
        <div className={styles.main}>
             <div className={styles.content}>
                list of Property
             </div>
             <div className={styles.chatAgent}>
                Chat Message
                <ChatBox/>
             </div>
        </div>
    </div>
  );
}
