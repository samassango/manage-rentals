import React, { useEffect, useState } from 'react';
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
import { useCurrentUser } from '@/app/context/UserContext';
import { IPropertyForm } from '@/app/models';
import { usePropertyContext } from '@/app/context/PropertyContext';
import { useTanentContext } from '@/app/context/TanentContext';


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

interface IDashboard {
    onCreateNewListing: (form: IPropertyForm, token: string) => Promise<any>
    onLoadListing: (userId:string, token: string) => Promise<any>
}

export default function Dashboard({onCreateNewListing, onLoadListing}:IDashboard) {
    const [activeTab, setActiveTab] = useState('TabBuy')
    const [settingBudget, setSettingBudget] = useState(0)
    const [noOfBedroom, setNoOfBedroom] = useState(0)
    const [noOfBathroom, setNoOfBathrooms] = useState(0)
    const [openCreateListingModal, setOpenCreateListingModal] = useState(false)
    const [createNewListingLoading, setCreateNewListingLoading] = useState(false)
    const [isCreationSuccess, setIsCreationSuccess] = useState(false)
    const [createdProperty, setCreatedProperty] = useState(null)
 
    const { currentUser, user } = useCurrentUser()
    const {currentTanent} = useTanentContext()

    const {properties, onGetPropertiesSuccessHandler} = usePropertyContext()

    useEffect(()=>{
        if(currentTanent && currentTanent.id){
            onLoadListing(currentTanent.id, user?.token||'').then(res=>{
                onGetPropertiesSuccessHandler(res)
            })
        }
    },[])
    useEffect(()=>{
        if(currentTanent && currentTanent.id){
            onLoadListing(currentTanent.id, user?.token||'').then(res=>{
                console.log('res', res)
                onGetPropertiesSuccessHandler(res)
            })
        }
    },[currentTanent])

    useEffect(()=>{
        if(createdProperty){
            //change to tanent Id currentTanent
            const currentTanentId = currentTanent?.id ||''
            onLoadListing(currentTanentId, user?.token||'').then(res=>{
                onGetPropertiesSuccessHandler(res)
            })
        }
    },[createdProperty])

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
        setIsCreationSuccess(false)
    }
    const onAddNewListing =async (form:any) =>{
        setCreateNewListingLoading(true)
        //change this to tanent id using currentTanent
        form.propertyTenantId = currentTanent && currentTanent.id
        form.propertyOwnerId = currentUser.id;
        let token = user && user.token || ''
        console.log({form})
       const properties = await onCreateNewListing(form, token)
       if(properties){
        setCreateNewListingLoading(false)
        handleIconCloseCreateListing();
        setIsCreationSuccess(true)
        setCreatedProperty(properties)
       }
    }
    console.log({currentUser, properties, currentTanent})
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
                <ModalDialog
                    title='Add property listing'
                    titleBarDialogIcon={() => <RiPlayListAddFill />}
                    isModalOpen={openCreateListingModal}
                    enableCloseIcon={true}
                    onIconClose={handleIconCloseCreateListing} >
                    <ListingForm isSuccess={isCreationSuccess} isLoading={createNewListingLoading} onAddNewListing={onAddNewListing} handleIconCloseCreateListing={handleIconCloseCreateListing}/>
                </ModalDialog>
            </div>

        </div>
    );
}
