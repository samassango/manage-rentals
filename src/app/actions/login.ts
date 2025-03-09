'use server'

import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { ILogin } from "../models";
import { BASE_URL } from "../utils/url-base";
// import { decrypt, encrypt } from "../lib/session";


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

        let resData = await userResponse.json();
        console.log({resData})
        await createSession(resData)
        return resData
    } catch (error) {
        return error;
    }
}

export async function createSession(sessionData: any) {
    // const encryptedSessionData =await encrypt(sessionData) // Encrypt your session data
    // console.log({encryptedSessionData})
    cookies().set('session', JSON.stringify(sessionData), {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
    })
    // Redirect or handle the response after setting the cookie
}

export async function getSessionData() {
    const encryptedSessionData = cookies().get('session')?.value ||''
    // console.log({encryptedSessionData})
    // const payload = await decrypt(encryptedSessionData)
    // console.log({payload})
    // return payload;
    
    return JSON.parse(encryptedSessionData)
}

export async function updateSession(){
      const encryptedSessionData =await cookies().get('session')?.value ||''
      
      const cookieStore = await cookies()
      cookieStore.set('session', JSON.stringify(encryptedSessionData), {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
    })
}

export async function redirectPage(slug: string) {
    if (!slug) throw new Error('Slug can not be empty');
    revalidatePath(slug)
    redirect(slug)
}

