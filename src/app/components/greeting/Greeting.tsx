'use client'

import React, { useEffect, useState } from 'react';
import styles from './Greeting.module.css'
import { useCurrentUser } from '@/app/context/UserContext';

export default function Greeting() {
    const [name, setName] = useState('client')
    const {currentUser, user} = useCurrentUser()
  
    useEffect(()=>{
        if(currentUser ){
          const {realm} = currentUser
            setName(realm)
        }

    }, [currentUser])
  return (
    <div className={styles.header}>Hi.<span>{name}</span></div>
  );
}
