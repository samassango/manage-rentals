import { createContext, useContext, useEffect } from "react";
import { redirectPage } from "../actions/login";
import { ICurrentUser } from "../models";
import useUserStore from "../store/store";
import { getCurrentUser } from "../actions/currentUser";

export interface ISuccess {
    token: string;
}
export interface IUserContext {
    user: ISuccess | null;
    currentUser: ICurrentUser | any;
    onSuccessHandler: ({ token }: ISuccess) => void
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: any) => {
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)
    const currentUser = useUserStore((state) => state.currentUser)
    const setCurrentUser = useUserStore((state) => state.setCurrentUser)

    const onSuccessHandler = (data: ISuccess) => {
        setUser(data)
    }

    useEffect(() => {
        if (currentUser==null){
            if (user) {
                const { token } = user;
                if (token) {
                    getCurrentUser(token).then((userData) => {
                        console.log({ userData })
                        if (userData.id) {
                            setCurrentUser(userData)
                            redirectPage('/tenant')
                        } else {
                            redirectPage('/login')
                        }

                    })
                }
            } else {
                redirectPage('/login')
            }
        }
            
    }, [user])
    // console.log({ user, currentUser })
    return (
        <UserContext.Provider value={{ user, onSuccessHandler, currentUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useCurrentUser = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error('useCurrentUser must be used within a UserProvider')
    return context
}