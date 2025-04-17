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
        console.log({userResponse})
        if(userResponse.status===403){
            return await userResponse.json()
        }else if(!userResponse.ok){
            return await userResponse.json()
        }

        return await userResponse.json()
    } catch (error) {
        return error;
    }
}