
import React from 'react';
import Image from 'next/image'

import styles from './PropertyCard.module.css'
import { IPropertyModel } from '@/app/models';
import { FaCartPlus, FaLocationDot } from 'react-icons/fa6';
import { GrCurrency } from 'react-icons/gr';

interface IPropertyCard {
    property: IPropertyModel
}

export default function PropertyCard({ property }: IPropertyCard) {
    return (
        <div className={styles.propertyCard} key={property.propertyAddress + '__id'}>
            <div className={styles.propertyImage}>
                <span className={styles.sales}>Sale</span>
                <Image src={property.propertyImages[0]} alt={''} width="300" height="200" />
            </div>
            <div className={styles.propertyInfo}>
                <div className={styles.propertyInfoContainer}>
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
        </div>
    );
}
