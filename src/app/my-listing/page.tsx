"use client"

import React from 'react';
import AdminLayout from '../components/adminLayout/AdminLayout';
import { UserProvider } from '@/app/context/UserContext';
import { TanentProvider } from '@/app/context/TanentContext';
import { PropertyProvider } from '@/app/context/PropertyContext';
import { IPropertyForm } from '@/app/models';
import { createProperty } from '@/app/actions/createProperty';
import { getPropertiesByUserId } from '@/app/actions/getProperties';
import MyPropertyListing from '@/app/components/myPropertyListing/MyPropertyListing';

export default function CurrentUserListing() {
  const onCreateNewListing = (form: IPropertyForm, token: string) => {
    return createProperty(form, token)
  }
  const onLoadPropertyListingByUserId =(userId: string, token: string)=>{
    return getPropertiesByUserId(userId, token)
  }
  return (
    <UserProvider>
      <TanentProvider>
        <AdminLayout>
          <PropertyProvider>
            <MyPropertyListing onCreateNewListing={onCreateNewListing} onLoadListing={onLoadPropertyListingByUserId}/>
          </PropertyProvider>
        </AdminLayout>
      </TanentProvider>
    </UserProvider>

  );
}
