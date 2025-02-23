import React, { useState } from 'react';
import styles from './ListingForm.module.css'
import { MdOutlineAddHome } from 'react-icons/md';
export interface IFormProps {
  propertyName: string;
  propertyAddress: string;
  propertyOwnerId: string;
  propertyDescription: string;
  propertyPrice: string;
  propertyNoOfBadroom: string;
  propertyNoOfBathroom: string;
  propertyNoOfGarage: string;
  propertyImages: any
}
export interface IListingForm {
  onAddNewListing: (form: any) => void
}
export default function ListingForm({onAddNewListing}:IListingForm) {
  const [form, setForm] = useState<IFormProps>({
    propertyName: '',
    propertyAddress: '',
    propertyOwnerId: '',
    propertyDescription: '',
    propertyPrice: '',
    propertyNoOfBadroom: '',
    propertyNoOfBathroom: '',
    propertyNoOfGarage: '',
    propertyImages: null
  })
  const onChangeHandler = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setForm({
      ...form,
      [name]: value
    })
  }
  console.log({form})
  const onSubmitNewListing = (e: any) => {
    e.preventDefault()
    onAddNewListing(form)
  }
  return (
    <div className={styles.listingFormContainer}>
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <label htmlFor='propertyName'>Property Name</label>
          <input type='text' name='propertyName' value={form.propertyName} onChange={onChangeHandler} placeholder='Property Name' />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='propertyAddress'>Property Address</label>
          <input type='text' name='propertyAddress' value={form.propertyAddress} onChange={onChangeHandler} placeholder='Property Address' />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <label htmlFor='propertyNoOfBadroom'>No of Bedroom</label>
          <input type='number' name='propertyNoOfBadroom' value={form.propertyNoOfBadroom} onChange={onChangeHandler} placeholder='No of Badroom' />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='propertyNoOfBathroom'>No of Bathroom</label>
          <input type='number' name='propertyNoOfBathroom' value={form.propertyNoOfBathroom} onChange={onChangeHandler} placeholder='No of Bathroom' />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <label htmlFor='propertyNoOfGarage'>No of Garage</label>
          <input type='number' name='propertyNoOfGarage' value={form.propertyNoOfGarage} onChange={onChangeHandler} placeholder='No of Badroom' />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='propertyImages'>Property Images</label>
          <input type='file' name='propertyImages' value={form.propertyImages} onChange={onChangeHandler} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <label htmlFor='propertyPrice'>Property price</label>
          <input type='number' name='propertyPrice' value={form.propertyPrice} onChange={onChangeHandler} placeholder='Property price' />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.btnContainer}>
          <button className={styles.createBtn} onClick={onSubmitNewListing}><MdOutlineAddHome /><span>Create</span></button>
        </div>
      </div>
    </div>
  );
}
