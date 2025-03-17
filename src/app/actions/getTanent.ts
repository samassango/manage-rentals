'use server'

import { cookies } from "next/headers";
import { BASE_URL, getFullUrl } from "../utils/url-base";

export async function getTanents(token: string) {

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

export async function getTanentByOwnerId(userId: string, token: string) {
    console.log({ userId, token })
    try {
        let url = getFullUrl(BASE_URL.tanentByOwnerId, { tenantOwnerId: userId })

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

export async function getTanentByUserId(userId: string, token: string) {
    try {
        let url = getFullUrl(BASE_URL.tanentByUserId, { userId })

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


export async function getTanentById(tenantId: string) {
    // try {
        let url = getFullUrl(BASE_URL.getTenantById, { tenantId })
        let tokenData = (cookies().get('session')?.value)
        let token = ''
        if (tokenData)
            token = JSON.parse(tokenData).token

        const tanentResponse = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(tanentResponse)
        if (!tanentResponse.ok) {
            throw new Error('Network response was not ok')
        }
        const tenant = await tanentResponse.json()
        console.log({tenant})
        return tenant;
    // } catch (error) {
       
    //     return error;
    // }
}
