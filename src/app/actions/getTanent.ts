'use server'

import { BASE_URL, getFullUrl } from "../utils/url-base";

export async function  getTanents(token: string) {
   
    try {
        const tanentsResponse = await fetch(BASE_URL.currentUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if (!tanentsResponse.ok) {
            throw new Error('Network response was not ok')
        }

        return await tanentsResponse.json()
    } catch (error) {
        return error;
    }
}

export async function  getTanentByOwnerId(userId:string, token: string) {
    console.log({userId, token})
    try {
        let url = getFullUrl(BASE_URL.tanentByOwnerId,{tenantOwnerId: userId})
        
        const tanentsResponse = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if (!tanentsResponse.ok) {
            throw new Error('Network response was not ok')
        }

        return await tanentsResponse.json()
    } catch (error) {
        return error;
    }
}

export async function  getTanentByUserId(userId:string, token: string) {
    try {
        let url = getFullUrl(BASE_URL.tanentByUserId,{userId})
        
        const tanentsResponse = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if (!tanentsResponse.ok) {
            throw new Error('Network response was not ok')
        }

        return await tanentsResponse.json()
    } catch (error) {
        return error;
    }
}
