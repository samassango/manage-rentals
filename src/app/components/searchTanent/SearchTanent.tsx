import React from 'react';
import styles from './SearchTanent.module.css'
import { FaSearch } from 'react-icons/fa';
export default function SearchTanent() {
  return (
    <div className={styles.container}>
        <input type="text" name="search" id="search-tenant" placeholder='Search Tanent...' className={styles.searchInput}/>
        <button className={styles.searchBtn}><FaSearch /></button>
    </div>
  );
}
