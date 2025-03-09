

import React from 'react';
import AdminLayout from '../components/adminLayout/AdminLayout';
import { UserProvider } from '@/app/context/UserContext';
import { TanentProvider } from '@/app/context/TanentContext';
import { PropertyProvider } from '@/app/context/PropertyContext';
import MyPropertyListing from '@/app/components/myPropertyListing/MyPropertyListing';

export default function CurrentUserListing() {
  return (
    <UserProvider>
      <TanentProvider>
        <AdminLayout>
          <PropertyProvider>
            <MyPropertyListing  />
          </PropertyProvider>
        </AdminLayout>
      </TanentProvider>
    </UserProvider>

  );
}
