"use client"

import { createContext, useContext, useEffect } from "react";
import { IPropertyModel } from "../models";
import useUserStore from "../store/store";

interface IPropertyContext {
    publicProperties: IPropertyModel[]
    publicProperty: IPropertyModel | null
    onGetPublicPropertiesSuccessHandler: (properties: IPropertyModel[]) => void
    onGetPublicPropertySuccessHandler:  (property: IPropertyModel) => void
}

export const PublicListingPropertyContext = createContext<IPropertyContext | null>(null)

export const PublicListingPropertyProvider = ({ children }: any) => {
    const publicProperties: IPropertyModel[] = useUserStore(state => state.publicProperties);
    const publicProperty: IPropertyModel | null = useUserStore(state => state.publicProperty);

    const setProperties = useUserStore(state => state.setPublicProperties)
    const setProperty = useUserStore(state => state.setPublicProperty)

    const onGetPublicPropertiesSuccessHandler = (properties: IPropertyModel[]) => {
        setProperties(properties)
    }
    const onGetPublicPropertySuccessHandler = (property: IPropertyModel) =>{
        setProperty(property)
    }

    return (<PublicListingPropertyContext.Provider value={{ publicProperties, publicProperty, onGetPublicPropertiesSuccessHandler, onGetPublicPropertySuccessHandler }}>
        {children}
    </PublicListingPropertyContext.Provider>)
}

export const usePublicListingPropertyContext = () => {
    const context = useContext(PublicListingPropertyContext)
    if (!context) throw new Error('usePublicListingPropertyContext must be used within a PublicListingPropertyProvider')
    return context
}