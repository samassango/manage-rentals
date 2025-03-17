import { getPublicPropertyById } from '@/app/actions/getProperties';
import PublicNavigation from '@/app/components/publicNavigation/PublicNavigation';
import styles from './page.module.css'
import React from 'react';
import { FaBath, FaBed, FaHome } from 'react-icons/fa';
import PropertyImages from '@/app/components/PropertyImages/PropertyImages';
import { FaLocationDot } from 'react-icons/fa6';
import { BiSolidCarGarage } from 'react-icons/bi';

export default async function ViewPublicProperty({ params }: { params: Promise<{ propertyId: string }> }) {
    const propertyId = (await params).propertyId
    const property = await getPublicPropertyById(propertyId)
    console.log({ property })
    return (
        <div className={styles.page}>
            <PublicNavigation />
            <div className={styles.content}>
                <div className={styles.viewProperty}>
                    <div className={styles.title}>
                        <FaHome /><label>{property.propertyName}</label>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.propertyImage}>
                            <span className={styles.sales}>Sale</span>
                            <PropertyImages images={property.propertyImages} />
                        </div>
                        <div className={styles.propertyContent}>
                            <div className={styles.propertyPrice}>
                                R {property.propertyPrice}
                            </div>
                            <div className={styles.features}>
                                <div className={styles.featureItem}>
                                    <label>{property.propertyNoOfBadroom}</label> <FaBed />
                                </div>
                                <div className={styles.featureItem}>
                                    <label>{property.propertyNoOfBathroom}</label> <FaBath />
                                </div>
                                <div className={styles.featureItem}>
                                    <label>{property.propertyNoOfGarage}</label> <BiSolidCarGarage />
                                </div>
                            </div>
                            <div className={styles.propertyLocation}>
                                <FaLocationDot /><label>{property.propertyAddress}</label>
                            </div>
                            <div className={styles.prropertyDescription}>
                                <h3>Property Description</h3>
                                <div className={styles.lines}>
                                    <div className={styles.line1}></div>
                                    <div className={styles.line2}></div>
                                    <div className={styles.line3}></div>
                                </div>
                                <p>
                                    {property.propertyDescription}
                                </p>
                            </div>
                            <div className={styles.createDate}>
                                <h4>Listed on</h4>
                                <label>{new Date(property.createdAt).toDateString()}</label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
