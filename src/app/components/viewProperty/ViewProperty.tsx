'use client'

import { getPropertyById } from '@/app/actions/getProperties';
import { useCurrentUser } from '@/app/context/UserContext';
import { IPropertyModel } from '@/app/models';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './ViewProperty.module.css'
import { FaBath, FaBed } from 'react-icons/fa';
import { BiSolidCarGarage } from 'react-icons/bi';
import { FaLocationDot } from 'react-icons/fa6';
import Loader from '../Loader';
import { getUserById } from '@/app/actions/currentUser';
import PropertyImages from '../PropertyImages/PropertyImages';

interface IUser {
    realm: string;
    email: string;
}

const propertyImages =[
    'http://127.0.0.1:3001/upload/property_listing/house-6.jpeg',
    'http://127.0.0.1:3001/upload/property_listing/house-3.jpeg',
    "http://127.0.0.1:3001/upload/property_listing/house-1.jpeg",
    'http://127.0.0.1:3001/upload/property_listing/house-2.jpeg'
]
export default function ViewProperty({ propertyId }: { propertyId: string }) {

    const [property, setProperty] = useState<IPropertyModel | null>(null)
    const [author, setAuthor] = useState<IUser | null>(null)
    const { user } = useCurrentUser()
    const params = useParams()
    useEffect(() => {
        const token = user?.token || ''
        // const propertyId = params.propertyId.toString();

        console.log({ user, propertyId })
        if (propertyId && token) {
            onLoadProperty(propertyId.toString(), token.toString());
        }

    }, [user, params.propertyId])

    useEffect(() => {
        const token = user?.token || ''
        const userId = property?.propertyOwnerId || ''
        onLoadUserById(userId.toString(), token.toString())
    }, [property])


    const onLoadProperty = async (propertyId: string, token: string) => {
        console.log({ propertyId, token })
        const property = await getPropertyById(propertyId, token);
        console.log({ property })
        if (property && property.id) {
            setProperty(property);
        } else {
            console.log(property)
        }

    }
    const onLoadUserById = async (userId: string, token: string) => {
        const author = await getUserById(token, userId)
        if (author && author.id) {
            setAuthor(author)
        } else {
            console.log({ author })
        }
    }


    console.log({ property, params, propertyId, author })
    return (
        <div className={styles.container}>
            {
                property ? (
                    <div className={styles.propertyCard}>
                        <div className={styles.propertyImage}>
                            <span className={styles.sales}>Sale</span>
                            <PropertyImages images={property.propertyImages}/>
                        </div>
                        <div className={styles.propertyDetails}>
                            <div className={styles.propertyPrice}>R {property.propertyPrice}</div>
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
                            {
                                author && (
                                    <div className={styles.publisherDetails}>
                                        <h4>Listed by</h4>
                                        <div className={styles.publisher}>
                                            <div className={styles.publisherItem}>
                                                <label>Name:</label>
                                                <span>{author.realm}</span>
                                            </div>
                                            <div className={styles.publisherItem}>
                                                <label>Email Address:</label>
                                                <span>{author.email}</span>
                                            </div>

                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ) :
                    <div className={styles.loadingScreen}>
                        <Loader />
                    </div>

            }
        </div>
    );
}
