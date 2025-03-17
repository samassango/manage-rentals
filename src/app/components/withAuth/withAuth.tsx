import { redirectPage } from '@/app/actions/login';
import { useCurrentUser } from '@/app/context/UserContext';
import React, { useEffect } from 'react';
import styles from './withAuth.module.css'
import Loader from '../Loader';
export default function withAuth(Component: any) {

    return (props: any) => {
        const { user, currentUser } = useCurrentUser()
        // useEffect(()=>{

        // },[])
        // useEffect(() => {
        //     if (user == null) {
        //         redirectToLogin();
        //     }
        // },[user])

        const redirectToLogin = async () => {
            await redirectPage('/logout')
        }
        // console.log({withAuth: user, currentUser})
        // if (user == null) return <div className={styles.container}>
        //     <Loader />
        //     <p>Signing out...</p>
        // </div>;
        return <Component {...props} />
    }
}
