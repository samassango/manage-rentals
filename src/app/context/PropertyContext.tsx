import { createContext, useContext, useEffect } from "react";
import { IPropertyModel } from "../models";
import useUserStore from "../store/store";

interface IPropertyContext {
    properties: IPropertyModel[]
    property: IPropertyModel | null
    onGetPropertiesSuccessHandler: (properties: IPropertyModel[]) => void
    onGetPropertySuccessHandler:  (property: IPropertyModel) => void
}

export const PropertyContext = createContext<IPropertyContext | null>(null)

export const PropertyProvider = ({ children }: any) => {
    const properties: IPropertyModel[] = useUserStore(state => state.properties);
    const property: IPropertyModel | null = useUserStore(state => state.property);

    const setProperties = useUserStore(state => state.setProperties)
    const setProperty = useUserStore(state => state.setProperty)

    const onGetPropertiesSuccessHandler = (properties: IPropertyModel[]) => {
        setProperties(properties)
    }
    const onGetPropertySuccessHandler = (property: IPropertyModel) =>{
        setProperty(property)
    }

    return (<PropertyContext.Provider value={{ properties, property, onGetPropertiesSuccessHandler, onGetPropertySuccessHandler }}>
        {children}
    </PropertyContext.Provider>)
}

export const usePropertyContext = () => {
    const context = useContext(PropertyContext)
    if (!context) throw new Error('usePropertyContext must be used within a PropertyProvider')
    return context
}