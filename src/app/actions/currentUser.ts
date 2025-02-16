'use client'

import { redirect } from "next/navigation";
import { BASE_URL } from "../utils/url-base";

export async function  getCurrentUser(token: string) {
    try {
        const userResponse = await fetch(BASE_URL.currentUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if (!userResponse.ok) {
            throw new Error('Network response was not ok')
        }

        return await userResponse.json()
    } catch (error) {
        return error;
    }
}