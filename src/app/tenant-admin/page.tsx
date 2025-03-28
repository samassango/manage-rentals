"use client"

import React from 'react';
import AdminLayout from '../components/adminLayout/AdminLayout';
import { UserProvider } from '@/app/context/UserContext';
import { TanentProvider } from '@/app/context/TanentContext';
import Dashboard from '@/app/components/dashboard/Dashboard';
import { PropertyProvider } from '@/app/context/PropertyContext';

export default function TenantAdmin() {

  return (
    <UserProvider>
      <TanentProvider>
        <AdminLayout>
          <PropertyProvider>
            <Dashboard />
          </PropertyProvider>
        </AdminLayout>
      </TanentProvider>
    </UserProvider>

  );
}
