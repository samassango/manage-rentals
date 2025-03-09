"use client"

import { createContext, useContext, useEffect } from "react";
import { ITenantDetails } from "../models";
import useUserStore from "../store/store";
import { redirectPage } from "../actions/login";
import { getTanentByOwnerId, getTanentByUserId } from "../actions/getTanent";
import { useCurrentUser } from "./UserContext";
import { redirect } from "next/navigation";

interface ITanentContext {
    selectedTenantId: string | null;
    tanents: ITenantDetails[] | [];
    currentTanent: ITenantDetails | null;
    onSuccessHandler: (tanents: ITenantDetails[]) => void;
    changeTanent: (tenantId: string) => void
    updateSeletedTenant: (tenantId: string) => void
}

export const TanentContext = createContext<ITanentContext | null>(null)

export const TanentProvider = ({ children }: any) => {

    const tanents: ITenantDetails[] = useUserStore(state => state.tanents);
    const currentTanent = useUserStore(state => state.currentTanent);
    const selectedTenantId = useUserStore(state => state.selectedTenantId)

    const setTanents = useUserStore(state => state.setTanents)
    const setCurrentTanent = useUserStore(state => state.setCurrentTanent)
    const setSelectedTanentID = useUserStore(state => state.setSelectedTanentId)
    

    const { currentUser, user } = useCurrentUser()

    const onSuccessHandler = (tanents: ITenantDetails[]) => {
        setTanents(tanents)
    }

    useEffect(() => {
        if(user && user.token && currentUser){
            const token = user?.token || '';
            if (currentUser && currentUser.id) {
                getTanentByOwnerId(currentUser.id, token).then(tanent => {
                    console.log({ tanent })
                    if (tanent.length) {
                        setCurrentTanent(tanent[0])
                        setSelectedTanentID(tanent[0].id)
                        setTanents(tanent)
                    } else {
                        getTanentByUserId(currentUser.id, token).then((userTanent => {
                            if (userTanent.length) {
                                setCurrentTanent(userTanent[0])
                                setSelectedTanentID(userTanent[0].id)
                                setTanents(userTanent)
                            }
                        }))
                    }
                })
            }
        }
    }, [user, currentUser])

    useEffect(()=>{
        const tenant = tanents.find(tenant=> tenant.id===selectedTenantId)
       setCurrentTanent(tenant);
    },[selectedTenantId])

    const changeTanent = (ownerId: string) => {
        if (tanents.length) {
            const tanent = tanents.find(tanentObject => tanentObject.tenantOwnerId === ownerId)
            setCurrentTanent(tanent)
        }
    }
    const updateSeletedTenant =(tenantId: string)=>{
       if(tenantId){
        setSelectedTanentID(tenantId);
       }
    }
    console.log("context", { tanents, currentTanent, selectedTenantId })
    return (<TanentContext.Provider value={{ tanents, currentTanent, selectedTenantId, onSuccessHandler, changeTanent, updateSeletedTenant }}>
        {children}
    </TanentContext.Provider>)
}

export const useTanentContext = () => {
    const context = useContext(TanentContext)
    if (!context) throw new Error('useTanentContext must be used within a TanentProvider')
    return context
}