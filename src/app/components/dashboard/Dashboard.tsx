import React from 'react';
import styles from './Dashboard.module.css'
import { IoGrid } from 'react-icons/io5';
import { IoMdMenu } from 'react-icons/io';
import { LuHouse } from 'react-icons/lu';
import { RiPlayListAddFill } from 'react-icons/ri';
import Image from 'next/image'
import { FaCartPlus, FaLocationDot } from 'react-icons/fa6';
import { GrCurrency } from 'react-icons/gr';

export default function Dashboard() {
    return (
        <div className={styles.container}>
            <div className={styles.adminSettings}>
                <div className={styles.cardHeader}>
                    <div className={styles.icon}>
                        <LuHouse />
                    </div>
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.createListingBtn}>
                        <RiPlayListAddFill /><span>Add Listing</span>
                    </button>
                </div>
            </div>
            <div className={styles.property}>
                <div className={styles.propertyHeading}>
                    <label htmlFor='propertyListing'>Property listing</label>
                    <div className={styles.filter}>
                        <button className={styles.filterButton}><IoGrid /></button>
                        <button className={styles.filterButton}><IoMdMenu /></button>
                    </div>
                </div>
                <div className={styles.propertylisting}>
                    {[1,2,3,4].map(_=>(<div className={styles.propertyCard}>
                        <div className={styles.propertyImage}>
                            <span className={styles.sales}>Sale</span>
                            <Image src={"/houses/house-placeholder.png"} alt={''} width="200" height="200" />
                        </div>
                        <div className={styles.propertyInfo}>
                            <div className={styles.propertyInfoContainer}>
                                <div className={styles.propertyLocation}>
                                    <FaLocationDot /><label>Lorem ipsum dolor sit amet consectetur</label>
                                </div>
                                <div className={styles.propertyPrice}>
                                    <GrCurrency /><label>R 1 200 000.00</label>
                                </div>
                            </div>
                            <div className={styles.propertyInfoIcon}>
                                <FaCartPlus />
                            </div>
                        </div>

                    </div>))}
                </div>
            </div>

        </div>
    );
}
