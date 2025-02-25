"use client"

import React from 'react';
import AdminLayout from '../../components/adminLayout/AdminLayout';
import { UserProvider } from '@/app/context/UserContext';
import { TanentProvider } from '@/app/context/TanentContext';
import Dashboard from '@/app/components/dashboard/Dashboard';
import { PropertyProvider } from '@/app/context/PropertyContext';
import { IPropertyForm } from '@/app/models';
import { createProperty } from '@/app/actions/createProperty';
import { getPropertiesByUserId } from '@/app/actions/getProperties';

export default function TenantAdmin() {
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
            <Dashboard onCreateNewListing={onCreateNewListing} onLoadListing={onLoadPropertyListingByUserId}/>
          </PropertyProvider>
        </AdminLayout>
      </TanentProvider>
    </UserProvider>

  );
}
