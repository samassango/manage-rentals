import React from 'react';
import { UserProvider } from '../context/UserContext';
import { TanentProvider } from '../context/TanentContext';
import AdminLayout from '../components/adminLayout/AdminLayout';
import ViewProfile from '../components/viewProfile/ViewProfile';

export default function MyProfile() {
    return (
        <UserProvider>
            <TanentProvider>
                <AdminLayout>
                    <ViewProfile />
                </AdminLayout>
            </TanentProvider>
        </UserProvider>
    );
}
