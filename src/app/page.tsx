"use client"

import Image from 'next/image'

import styles from "./page.module.css";
import PublicNavigation from "./components/publicNavigation/PublicNavigation";
import PublicFilterSearch from './components/publicFilterSearch/PublicFilterSearch';
import PropertyCard from './components/PropertyCard/PropertyCard';
import { IoGrid } from 'react-icons/io5';
import { IoMdMenu } from 'react-icons/io';
import { PublicListingPropertyProvider } from './context/PublicListingProperty';
import { getPublicPropertyListing } from './actions/getProperties';
import { useEffect, useState } from 'react';
import { IPropertyModel } from './models';

export default function Home() {
  const [properties, setProperties]= useState([])
  const [listingError, setListingError] = useState(null)

  useEffect(()=>{
    loadProperties()
  },[])

  const loadProperties = async()=>{
    const properties = await getPublicPropertyListing()
    if(properties.length){
       setProperties(properties)
    }else{
       setListingError(properties)
    }
  }
  console.log({properties, listingError})
  return (
    <PublicListingPropertyProvider>
    <div className={styles.page}>
      <PublicNavigation />
      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>Experience Timeless <span>Property</span> Market Place</h1>
          <div className={styles.line}>
            <div className={styles.lineOne}></div>
            <div className={styles.lineTwo}></div>
            <div className={styles.lineThree}></div>
          </div>
          <h4>Where property market place made easily</h4>
          <div className={styles.btnContainer}>
            <a href="#" className={styles.exploreBtn}>Explore now</a>
          </div>
          <Image src={"/houses/bg-image.png"} alt={''} width="800" height="500" />
          <PublicFilterSearch />
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
      <footer className={styles.footer}>

      </footer>
    </div>
    </PublicListingPropertyProvider>
  );
}
