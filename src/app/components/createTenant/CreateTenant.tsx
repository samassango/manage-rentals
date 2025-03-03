import ITenantDetails from '@/app/models/TenantModel';
import React, { useEffect, useState } from 'react';
import styles from './CreateTenant.module.css'
import { useCurrentUser } from '@/app/context/UserContext';
import { useTanentContext } from '@/app/context/TanentContext';
import { redirectPage } from '@/app/actions/login';
import { permanentRedirect, useRouter } from 'next/navigation';


export interface ITenant {
  isLoadingFn: (val:boolean)=>void;
  onCreateTenant: (data: ITenantDetails, token: string) => Promise<any>
}

export default function CreateTenant({ onCreateTenant, isLoadingFn }: ITenant) {
  const { currentUser, user } = useCurrentUser()
  const { tanents, currentTanent, onSuccessHandler, changeTanent } = useTanentContext()
  // useRouter is used for client component
  const router = useRouter()
  const [form, setForm] = useState({
    tenantName: '',
    tenantDescription: '',
    tenantOwnerId: currentUser.id,
    createdAt: new Date()
  })
  useEffect(() => {
    if (!currentTanent && tanents.length > 0) {
      changeTanent(currentUser.id)
    }
  }, [])
  useEffect(() => {
    changeTanent(currentUser.id)
  }, [currentUser])

  useEffect(() => {
    if (tanents) {
      onSuccessHandler(tanents)
    }
    if(currentTanent && currentTanent.id){
      redirectPage('/tenant-admin')
    }
  }, [tanents, currentTanent])



  const onFormSubmit = (e: any) => {
    isLoadingFn(true)
    e.preventDefault()
    let token = user?.token || ''
    onCreateTenant(form as ITenantDetails, token).then(tanent => {
      onSuccessHandler([tanent])
      changeTanent(tanent.id)
    })
  }

  console.log({ tanents, currentTanent })
  return (
    <div className={styles.container}>
      <form >
        <div className={styles.inputContainer}>
          <label htmlFor="tenantName">Tenant Name</label>
          <input type="text" name="tenantName" id="tenantName"
            onChange={e => {
              setForm({
                ...form,
                tenantName: e.target.value
              })
            }} />
          {/* {error && <span className={styles.inputError}>{error}</span>} */}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="tanentDescription">Tenant Description</label>
          <input type="text" name="tanentDescription" id="tanentDescription"
            onChange={e => setForm({
              ...form,
              tenantDescription: e.target.value
            })} />
          {/* {errorTanentDescription && <span className={styles.inputError}>{errorTanentDescription}</span>} */}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={onFormSubmit}>Create</button>
        </div>
      </form>
    </div>
  );
}
