'use client'

import { ISignUp } from "../models";
import { BASE_URL } from "../utils/url-base";

export async function userSignUp(user: ISignUp) {
    try {
        const userResponse = await fetch(BASE_URL.signUp, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!userResponse.ok) {
            throw new Error('Network response was not ok')
        }

        return await userResponse.json()
    } catch (error) {
        return error;
    }
}