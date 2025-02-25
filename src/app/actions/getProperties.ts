'use client'

import { BASE_URL, getFullUrl } from "../utils/url-base";

export async function  getPublicPropertyListing( token: string) {
    try {
        
        const propertiesResponse = await fetch(BASE_URL.getPublicPropertyListing, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if (!propertiesResponse.ok) {
            throw new Error('Network response was not ok')
        }

        return await propertiesResponse.json()
    } catch (error) {
        return error;
    }
}


export async function  getPropertiesByUserId(userId:string, token: string) {
    try {
        let url = getFullUrl(BASE_URL.getPropertyListingByUser,{userId})
        
        const propertiesResponse = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if (!propertiesResponse.ok) {
            throw new Error('Network response was not ok')
        }

        return await propertiesResponse.json()
    } catch (error) {
        return error;
    }
}