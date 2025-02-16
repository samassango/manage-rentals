'use server'

import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache'
import { ILogin } from "../models";
import { BASE_URL } from "../utils/url-base";



export async function userLogin(user: ILogin) {
    try {
        const userResponse = await fetch(BASE_URL.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        
        if (!userResponse.ok) {
            throw new Error('Network response was not ok')
        }

        return await userResponse.json();
    } catch (error) {
        return error;
    }
}



export async function redirectPage(slug: string){
    if(!slug) throw new Error('Slug can not be empty');
    revalidatePath(slug)
    redirect(slug)
}

