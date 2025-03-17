
import React from 'react';
import Image from 'next/image'

import styles from './PropertyCard.module.css'
import { IPropertyModel } from '@/app/models';
import { FaBath, FaBed, FaCartPlus, FaLocationDot } from 'react-icons/fa6';
import { GrCurrency } from 'react-icons/gr';
import { BiSolidCarGarage } from 'react-icons/bi';

interface IPropertyCard {
    property: IPropertyModel
}

export default function PropertyCard({ property }: IPropertyCard) {
    const url = `/properties/${property.id}`
    return (
        <div className={styles.propertyCard} key={property.propertyAddress + '__id'}>
            <a href={url}>
            <div className={styles.propertyImage}>
                <span className={styles.sales}>Sale</span>
                <Image src={property.propertyImages[0]} priority={true} alt={''} width="300" height="200" />
            </div>
            <div className={styles.propertyInfo}>
                <div className={styles.propertyInfoContainer}>
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
                    <div className={styles.propertyPrice}>
                        <GrCurrency /><label>R {property.propertyPrice}</label>
                    </div>
                </div>
                <div className={styles.propertyInfoIcon}>
                    <FaCartPlus />
                </div>
            </div>
            </a>
        </div>
    );
}
