import React, { useEffect, useState } from 'react';
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
  isLoading: boolean;
  isSuccess: boolean;
  onAddNewListing: (form: any) => void
  handleIconCloseCreateListing: () => void
}
export default function ListingForm({ isLoading, isSuccess, onAddNewListing, handleIconCloseCreateListing }: IListingForm) {
  const [form, setForm] = useState<IFormProps>({
    propertyName: '',
    propertyAddress: '',
    propertyOwnerId: '',
    propertyDescription: '',
    propertyPrice: '',
    propertyNoOfBadroom: '1',
    propertyNoOfBathroom: '1',
    propertyNoOfGarage: '0',
    propertyImages: null
  })

  useEffect(() => {
    if (isSuccess) {
      setForm({
        propertyName: '',
        propertyAddress: '',
        propertyOwnerId: '',
        propertyDescription: '',
        propertyPrice: '',
        propertyNoOfBadroom: '1',
        propertyNoOfBathroom: '1',
        propertyNoOfGarage: '0',
        propertyImages: null
      })
      handleIconCloseCreateListing()
    }
  }, [isSuccess])
  const onChangeHandler = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setForm({
      ...form,
      [name]: value
    })
  }

  const onFileChange = (e: any) => {
    let name = e.target.name;
    setForm({
      ...form,
      [name]: e.target.files
    })
  }

  const onSubmitNewListing = (e: any) => {
    e.preventDefault()
    onAddNewListing(form)
  }
  return (
    <div className={styles.listingFormContainer}>
      {isLoading && <div className={styles.row}>Loading...</div>}
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
          <label htmlFor='propertyNoOfBadroom'>No of Bedroom ({form.propertyNoOfBadroom})</label>
          <input type='range' name='propertyNoOfBadroom' min={1} max={20} value={Number(form.propertyNoOfBadroom)} onChange={onChangeHandler} placeholder='No of Badroom' />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='propertyNoOfBathroom'>No of Bathroom ({form.propertyNoOfBathroom})</label>
          <input type='range' name='propertyNoOfBathroom' min={1} max={20} value={Number(form.propertyNoOfBathroom)} onChange={onChangeHandler} placeholder='No of Bathroom' />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <label htmlFor='propertyNoOfGarage'>No of Garage ({form.propertyNoOfGarage})</label>
          <input type='range' name='propertyNoOfGarage' min={0} max={20} value={Number(form.propertyNoOfGarage)} onChange={onChangeHandler} placeholder='No of Badroom' />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='propertyImages'>Property Images</label>
          <input type='file' name='propertyImages' onChange={onFileChange} multiple />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <label htmlFor='propertyDescription'>Property Description</label>
          <textarea rows={4} name='propertyDescription' value={form.propertyDescription} onChange={onChangeHandler} placeholder='Property Description' />
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
