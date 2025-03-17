'use client'

import React, { useState } from 'react';
import Image from 'next/image'
import styles from './PropertyImages.module.css'
import { IPropertyModel } from '@/app/models';

interface IPropertyImages {
    images: string[]
}
export default function PropertyImages({ images }: IPropertyImages) {
    const [imageIndex, setImageIndex] = useState(0)
    const handleOnchange = (index:number) => {
        console.log({index})
        setImageIndex(index)
    }
    return (
        <div className={styles.container}>
            <div className={styles.mainImage}>
                <Image src={images[imageIndex]} priority={true} alt={''} width="350" height="250" />
            </div>
            <div className={styles.smallImageContainer}>
                {images.length &&
                    images.map((image, index) => (<button key={'XXXXX__TTTT__EEEEE'+{index}} onClick={() => {
                        handleOnchange(index)
                    }}><Image  src={image} priority={true} alt={''} width="150" height="100" /></button>))
                }
            </div>
        </div>
    );
}
