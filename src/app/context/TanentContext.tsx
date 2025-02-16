import { createContext, useContext, useEffect } from "react";
import { ITenantDetails } from "../models";
import useUserStore from "../store/store";
import { redirectPage } from "../actions/login";
import { getTanentByOwnerId, getTanentByUserId } from "../actions/getTanent";
import { useCurrentUser } from "./UserContext";
import { redirect } from "next/navigation";

interface ITanentContext {
    tanents: ITenantDetails[] | [];
    currentTanent: ITenantDetails | null;
    onSuccessHandler: (tanents: ITenantDetails[]) => void;
    changeTanent: (tenantId: string) => void
}

export const TanentContext = createContext<ITanentContext | null>(null)

export const TanentProvider = ({ children }: any) => {

    const tanents: ITenantDetails[] = useUserStore(state => state.tanents);
    const currentTanent = useUserStore(state => state.currentTanent);

    const setTanents = useUserStore(state => state.setTanents)
    const setCurrentTanent = useUserStore(state => state.setCurrentTanent)

    const { currentUser, user } = useCurrentUser()

    const onSuccessHandler = (tanents: ITenantDetails[]) => {
        setTanents(tanents)
    }

    useEffect(() => {
        if(!currentTanent){
            const token = user?.token || '';
            if (currentUser && currentUser.id) {
                getTanentByOwnerId(currentUser.id, token).then(tanent => {
                    console.log({ tanent })
                    if (tanent.length) {
                        setCurrentTanent(tanent[0])
                        setTanents(tanent)
                    } else {
                        getTanentByUserId(currentUser.id, token).then((userTanent => {
                            if (userTanent.length) {
                                setCurrentTanent(userTanent[0])
                                setTanents(userTanent)
                            }
                        }))
                    }
                })
            }
        }
    }, [])

    // useEffect(() => {
    //     console.log('effect', currentTanent)
    //     if (currentTanent) {
    //          redirectPage('/tenant/tenant-admin')
    //     }
    // }, [currentTanent])

    const changeTanent = (ownerId: string) => {
        if (tanents.length) {
            const tanent = tanents.find(tanentObject => tanentObject.tenantOwnerId === ownerId)
            setCurrentTanent(tanent)
        }
    }
    console.log("context", { tanents, currentTanent })
    return (<TanentContext.Provider value={{ tanents, currentTanent, onSuccessHandler, changeTanent }}>
        {children}
    </TanentContext.Provider>)
}

export const useTanentContext = () => {
    const context = useContext(TanentContext)
    if (!context) throw new Error('useCurrentUser must be used within a UserProvider')
    return context
}