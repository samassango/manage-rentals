import React from 'react';
import { UserProvider } from '../context/UserContext';
import { TanentProvider } from '../context/TanentContext';
import AdminLayout from '../components/adminLayout/AdminLayout';
import ListUserManagement from '../components/userManagement/ListUserManagement';

export default function UserManagement() {
    return (
        <UserProvider>
            <TanentProvider>
                <AdminLayout>
                    <ListUserManagement />
                </AdminLayout>
            </TanentProvider>
        </UserProvider>
    );
}
