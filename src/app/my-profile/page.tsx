import React from 'react';
import { UserProvider } from '../context/UserContext';
import { TanentProvider } from '../context/TanentContext';
import AdminLayout from '../components/adminLayout/AdminLayout';

export default function MyProfile() {
    return (
        <UserProvider>
            <TanentProvider>
                <AdminLayout>
                My Profile
                </AdminLayout>
            </TanentProvider>
        </UserProvider>
    );
}
