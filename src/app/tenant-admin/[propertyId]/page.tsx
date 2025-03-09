import React from 'react';
import styles from './page.module.css'
import { UserProvider } from '@/app/context/UserContext';
import { TanentProvider } from '@/app/context/TanentContext';
import AdminLayout from '@/app/components/adminLayout/AdminLayout';
import { PropertyProvider } from '@/app/context/PropertyContext';
import ViewProperty from '@/app/components/viewProperty/ViewProperty';

export default async function PropertyDetails({ params }: { params: Promise<{ propertyId: string }> }) {
  const { propertyId } = await params;
  return (
    <UserProvider>
      <TanentProvider>
        <AdminLayout>
          <PropertyProvider>
          {propertyId && <ViewProperty propertyId={propertyId} />}
          </PropertyProvider>
        </AdminLayout>
      </TanentProvider>
    </UserProvider>

  );
}
