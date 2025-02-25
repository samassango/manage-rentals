'use client'

import { IPropertyForm, ITenantDetails } from "../models";
import { BASE_URL } from "../utils/url-base";

export async function createProperty(property: IPropertyForm, token: string) {
    try {
        //upload images
        const formData = new FormData();
        for(let x=0; x < property.propertyImages.length; x++){
            formData.append('files[]', property.propertyImages[x])
        }
    //    formData.append('files', property.propertyImages[0] as any)
        const propertyImageResponse = await fetch(BASE_URL.uploadPropertyImages, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })

        if (!propertyImageResponse.ok) {
            throw new Error('Network response was not ok on file upload')
        }

        const propertyFormData: IPropertyForm = {
            ...property,
            propertyImages: (await propertyImageResponse.json()).arrURL
        }
        const propertyResponse = await fetch(BASE_URL.createNewPropertyList, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(propertyFormData)
        });

        if (!propertyResponse.ok) {
            throw new Error('Network response was not ok on property creation')
        }

        return await propertyResponse.json();
    } catch (error) {
        return error;
    }
}
