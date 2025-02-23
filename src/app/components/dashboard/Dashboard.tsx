import React, { useState } from 'react';
import styles from './Dashboard.module.css'
import { IoGrid } from 'react-icons/io5';
import { IoMdMenu } from 'react-icons/io';
import { LuHouse } from 'react-icons/lu';
import { RiPlayListAddFill } from 'react-icons/ri';
import Image from 'next/image'
import { FaCartPlus, FaLocationDot } from 'react-icons/fa6';
import { GrCurrency } from 'react-icons/gr';
import TabsSettings from '../tabs/Tabs';
import ModalDialog from '../modal/ModalDialog';
import ListingForm from '../listingForm/ListingForm';

const propertyList = [
    {
        address: 'Johannesburg, Guateng, South Africa',
        image: 'http://127.0.0.1:3001/files/house-1.jpeg',
        price: 2800000
    },
    {
        address: 'Pretoria, Guateng, South Africa',
        image: 'http://127.0.0.1:3001/files/house-2.jpeg',
        price: 5800000
    },
    {
        address: 'Sandton, Guateng, South Africa',
        image: 'http://127.0.0.1:3001/files/house-3.jpeg',
        price: 10200000
    },
    {
        address: 'Midrand, Guateng, South Africa',
        image: 'http://127.0.0.1:3001/files/house-4.jpeg',
        price: 7400000
    },
    {
        address: 'Midstream, Guateng, South Africa',
        image: 'http://127.0.0.1:3001/files/house-5.jpg',
        price: 2900000
    },
    {
        address: 'Centurion, Guateng, South Africa',
        image: 'http://127.0.0.1:3001/files/house-6.jpeg',
        price: 3800000
    }
]

interface ISetting {
    onChangeBudget: (evt: any) => void
    onChangeBedroom: (evt: any) => void
    onChangeBathroom: (evt: any) => void
    settingBudget: number
    noOfBedroom: number
    noOfBathroom: number
    maxAmount: number
    minAmount: number
    maxNoOfBedrooms: number
    minNoOfBedrooms: number
    maxNoOfBathrooms: number
    minNoOfBathrooms: number
    activeTab: string
}
const Settings = ({ onChangeBudget, onChangeBedroom, onChangeBathroom, settingBudget, noOfBedroom, noOfBathroom, minAmount, minNoOfBedrooms, maxAmount, maxNoOfBedrooms, maxNoOfBathrooms, minNoOfBathrooms, activeTab }: ISetting) => {
    return (
        <div className={styles.tab}>
            <div className={styles.settingContainer}>
                <label>{activeTab == 'TabBuy' ? "Purchase " : "Rental "} Budget</label>
                <input type='range' min={minAmount} max={maxAmount} value={settingBudget} onChange={onChangeBudget} />
                <div className={styles.output}>
                    <span>Selected Amount: R {settingBudget}</span>
                </div>
            </div>
            <div className={styles.settingContainer}>
                <label>Number of Bedroom</label>
                <input type='range' min={minNoOfBedrooms} max={maxNoOfBedrooms} value={noOfBedroom} onChange={onChangeBedroom} />
                <div className={styles.output}>
                    <span>{noOfBedroom} Bedroom</span>
                </div>

            </div>
            <div className={styles.settingContainer}>
                <label>Number of Bathroom</label>
                <input type='range' min={minNoOfBathrooms} max={maxNoOfBathrooms} value={noOfBathroom} onChange={onChangeBathroom} />
                <div className={styles.output}>
                    <span>{noOfBedroom} Bathroom</span>
                </div>

            </div>
        </div>
    )
}

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('TabBuy')
    const [settingBudget, setSettingBudget] = useState(0)
    const [noOfBedroom, setNoOfBedroom] = useState(0)
    const [noOfBathroom, setNoOfBathrooms] = useState(0)
    const [openCreateListingModal, setOpenCreateListingModal] = useState(false)
    const onTabChange = (tab: string) => {
        setActiveTab(tab)
    }
    const onChangeBudget = (e: any) => {
        e.preventDefault();
        let amount: number = e.target.value;
        setSettingBudget(amount);
    }
    const onChangeBedroom = (e: any) => {
        e.preventDefault();
        let noOfBedroom: number = e.target.value;
        setNoOfBedroom(noOfBedroom);
    }
    const onChangeBathroom = (e: any) => {
        e.preventDefault();
        let noOfBathroom: number = e.target.value;
        setNoOfBathrooms(noOfBathroom);
    }
    const handleIconCloseCreateListing = () => setOpenCreateListingModal(false)
    const handleAddListing = (e:any) =>{
        e.preventDefault();
        setOpenCreateListingModal(true)
    }
    const onAddNewListing = (form:any) =>{
        console.log({form})
    }
    return (
        <div className={styles.container}>
            <div className={styles.adminSettings}>
                <div className={styles.cardHeader}>
                    <div className={styles.icon}>
                        <LuHouse />
                    </div>
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.createListingBtn} onClick={handleAddListing}>
                        <RiPlayListAddFill /><span>Add Listing</span>
                    </button>
                </div>
                <TabsSettings onTabChange={onTabChange}>
                    {
                        activeTab == 'TabBuy' ?
                            <Settings
                                onChangeBedroom={onChangeBedroom}
                                onChangeBudget={onChangeBudget}
                                onChangeBathroom={onChangeBathroom}
                                noOfBedroom={noOfBedroom}
                                settingBudget={settingBudget}
                                noOfBathroom={noOfBathroom}
                                maxAmount={50000000}
                                minAmount={0}
                                minNoOfBedrooms={0}
                                maxNoOfBedrooms={10}
                                minNoOfBathrooms={0}
                                maxNoOfBathrooms={10}
                                activeTab={activeTab}
                            />
                            : <Settings
                                onChangeBedroom={onChangeBedroom}
                                onChangeBudget={onChangeBudget}
                                onChangeBathroom={onChangeBathroom}
                                noOfBedroom={noOfBedroom}
                                settingBudget={settingBudget}
                                noOfBathroom={noOfBathroom}
                                minAmount={0}
                                maxAmount={100000}
                                minNoOfBedrooms={0}
                                maxNoOfBedrooms={10}
                                minNoOfBathrooms={0}
                                maxNoOfBathrooms={10}
                                activeTab={activeTab} />
                    }
                </TabsSettings>

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
                    {propertyList.map(property => (<div className={styles.propertyCard}>
                        <div className={styles.propertyImage}>
                            <span className={styles.sales}>Sale</span>
                            <Image src={property.image} alt={''} width="300" height="200" />
                        </div>
                        <div className={styles.propertyInfo}>
                            <div className={styles.propertyInfoContainer}>
                                <div className={styles.propertyLocation}>
                                    <FaLocationDot /><label>{property.address}</label>
                                </div>
                                <div className={styles.propertyPrice}>
                                    <GrCurrency /><label>R {property.price}</label>
                                </div>
                            </div>
                            <div className={styles.propertyInfoIcon}>
                                <FaCartPlus />
                            </div>
                        </div>

                    </div>))}
                </div>
                <ModalDialog
                    title='Add property listing'
                    titleBarDialogIcon={() => <RiPlayListAddFill />}
                    isModalOpen={openCreateListingModal}
                    enableCloseIcon={true}
                    onIconClose={handleIconCloseCreateListing} >
                    <ListingForm onAddNewListing={onAddNewListing}/>
                </ModalDialog>
            </div>

        </div>
    );
}
