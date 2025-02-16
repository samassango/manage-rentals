"use client"

import React from 'react';
import AdminLayout from '../../components/adminLayout/AdminLayout';
import { UserProvider } from '@/app/context/UserContext';
import { TanentProvider } from '@/app/context/TanentContext';

export default function TenantAdmin() {
  return (
    <UserProvider>
      <TanentProvider>
        <AdminLayout>
          <div>Content</div>
        </AdminLayout>
      </TanentProvider>
    </UserProvider>

  );
}
