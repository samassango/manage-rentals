import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './MyPropertyListing.module.css'
import { IPropertyForm } from '@/app/models';
import { useCurrentUser } from '@/app/context/UserContext';
import { useTanentContext } from '@/app/context/TanentContext';
import { usePropertyContext } from '@/app/context/PropertyContext';
import { FaCartPlus, FaLocationDot } from 'react-icons/fa6';
import { GrCurrency } from 'react-icons/gr';
import CountUp from 'react-countup';
import { RiPlayListAddFill } from 'react-icons/ri';

interface IMyPropertyListing {
    onCreateNewListing: (form: IPropertyForm, token: string) => Promise<any>
    onLoadListing: (userId: string, token: string) => Promise<any>
}

export default function MyPropertyListing({ onCreateNewListing, onLoadListing }: IMyPropertyListing) {
    const [isCreationSuccess, setIsCreationSuccess] = useState(false)
    const [createdProperty, setCreatedProperty] = useState(null)

    const { currentUser, user } = useCurrentUser()
    const { currentTanent } = useTanentContext()

    const { properties, onGetPropertiesSuccessHandler } = usePropertyContext()

    useEffect(() => {
        if (currentUser && currentUser.id) {
            onLoadListing(currentUser.id, user?.token || '').then(res => {
                console.log({myProperty:res})
                onGetPropertiesSuccessHandler(res)
            })
        }
    }, [])
    useEffect(() => {
        if (currentUser && currentUser.id) {
            onLoadListing(currentUser.id, user?.token || '').then(res => {
                console.log({myProperty:res})
                onGetPropertiesSuccessHandler(res)
            })
        }
    }, [currentUser])

    useEffect(() => {
        if (createdProperty) {
            //change to tanent Id currentTanent
            onLoadListing(currentUser.id, user?.token || '').then(res => {
                onGetPropertiesSuccessHandler(res)
            })
        }
    }, [createdProperty])

    const handleAddListing =()=>{}
console.log({properties, currentUser})
    return (
        <div className={styles.container}>
            <div className={styles.propertylisting}>
                    {properties.length ? properties.map((property, index) => (<div className={styles.propertyCard} key={index+'_'+property.propertyAddress.replaceAll(',','').replaceAll(' ','_')+'__id'}>
                        <div className={styles.propertyImage}>
                            <span className={styles.sales}>Rental</span>
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
                    </div>)): 'Please add your new listing'}
            </div>
            <div className={styles.propertyInfo}>
                <div className={styles.propertyStats}>
                    <span>Properties you listed</span>
                    <div className={styles.propertyNumber}>
                         <CountUp start={0} end={properties.length}  duration={5}/>
                    </div>
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.createListingBtn} onClick={handleAddListing}>
                        <RiPlayListAddFill /><span>Add Listing</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
