'use server'

import { BASE_URL, getFullUrl } from "../utils/url-base";

export async function getPublicPropertyListing() {
    try {

        const propertiesResponse = await fetch(BASE_URL.getPublicPropertyListing, {
            method: 'GET',
            cache: 'force-cache',
            next: { revalidate: 120 },
            headers: {
                'Content-Type': 'application/json'
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


export async function getPropertiesByUserId(userId: string, tenantId: string, token: string) {
    try {
        let url = getFullUrl(BASE_URL.getPropertyListingByUser, { userId, tenantId })

        const propertiesResponse = await fetch(url, {
            method: 'GET',
            cache: 'force-cache',
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


export async function getPropertiesByTenantId(tenantId: string, token: string) {
    try {
        let url = getFullUrl(BASE_URL.getPropertyListingByTenant, { tenantId })

        const propertiesResponse = await fetch(url, {
            method: 'GET',
            cache: 'force-cache',
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

export async function getPropertyById(propertyId: string, token: string) {
    // try {
    // console.log({propertyId, token})
    let url = getFullUrl(BASE_URL.getPropertyId, { propertyId })
    const propertiesResponse = await fetch(url, {
        method: 'GET',
        cache: 'force-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if (!propertiesResponse.ok) {
        throw new Error('Network response was not ok')
    }
    console.log({ propertiesResponse })
    return await propertiesResponse.json()
    // } catch (error) {
    //     return error;
    // }
}

export async function getPublicPropertyById(propertyId: string) {
    const filter = encodeURIComponent(JSON.stringify({
        where: {
            id: propertyId
        }
    }))

    const requestUrl = `${BASE_URL.getPublicPropertyById}${filter}`;
    const propertiesResponse = await fetch(requestUrl, {
        method: 'GET',
        cache: 'force-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!propertiesResponse.ok) {
        throw new Error('Network response was not ok')
    }
    console.log({ propertiesResponse })
    const property = await propertiesResponse.json()
    return Array.isArray(property) ? property[0] : property
} 