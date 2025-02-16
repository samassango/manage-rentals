'use client'

import { ITenantDetails } from "../models";
import { BASE_URL } from "../utils/url-base";

export async function createTanent(tanent: ITenantDetails, token: string) {
    try {
        const tanentResponse = await fetch(BASE_URL.createTanent, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(tanent)
        });
        
        if (!tanentResponse.ok) {
            throw new Error('Network response was not ok')
        }

        return await tanentResponse.json();
    } catch (error) {
        return error;
    }
}
