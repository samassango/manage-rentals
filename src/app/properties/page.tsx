"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css'
import { PublicListingPropertyProvider } from '../context/PublicListingPropertyContext';
import PublicNavigation from '../components/publicNavigation/PublicNavigation';
import PublicFilterSearch from '../components/publicFilterSearch/PublicFilterSearch';
import { getPublicPropertyListing } from '../actions/getProperties';
import { IoGrid } from 'react-icons/io5';
import { IoMdMenu } from 'react-icons/io';
import { IPropertyModel } from '../models';
import PropertyCard from '../components/PropertyCard/PropertyCard';

export default function PublicProperties() {
    const [properties, setProperties] = useState([])
    const [listingError, setListingError] = useState(null)

    useEffect(() => {
        loadProperties()
    }, [])

    const loadProperties = async () => {
        const properties = await getPublicPropertyListing()
        if (properties.length) {
            setProperties(properties)
        } else {
            setListingError(properties)
        }
    }
    return (
        <PublicListingPropertyProvider>
            <div className={styles.page}>
                <PublicNavigation />
                <main className={styles.main}>
                    <div className={styles.heading}>
                        {/* <PublicFilterSearch /> */}
                    </div>
                    <div className={styles.listingContainer}>
                        <div className={styles.propertyHeading}>
                            <label htmlFor='propertyListing'>Property listing</label>
                            <div className={styles.filter}>
                                <button className={styles.filterButton}><IoGrid /></button>
                                <button className={styles.filterButton}><IoMdMenu /></button>
                            </div>
                        </div>

                        <div className={styles.propertiesContainer}>
                            {properties.length ?
                                properties.map((property: IPropertyModel) => (<div key={property.id}><PropertyCard property={property} /></div>))
                                : <label>No listing at the moments</label>
                            }
                        </div>

                    </div>
                </main>
            </div>
        </PublicListingPropertyProvider>
    );
}
