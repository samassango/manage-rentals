import React from 'react';
import { UserProvider } from '../context/UserContext';
import { TanentProvider } from '../context/TanentContext';
import AdminLayout from '../components/adminLayout/AdminLayout';

export default function UserManagement() {
    return (
        <UserProvider>
            <TanentProvider>
                <AdminLayout>
                    User Management
                </AdminLayout>
            </TanentProvider>
        </UserProvider>
    );
}
