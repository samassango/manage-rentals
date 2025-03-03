import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { persist } from 'zustand/middleware'

const initialState ={
    user: null,
    currentUser: null,
    tanents: [],
    currentTanent: null,
    properties: [],
    property: null,
    publicProperties: [],
    publicProperty: null
}
const useUserStore = create(
    persist(combine(
       initialState,
        (set, get) => {
            return {
                setUser: (nextUser: any) => {
                    set((state) => ({
                        user:
                            typeof nextUser === 'function'
                                ? nextUser(state.user)
                                : nextUser,
                    }))
                },
                setCurrentUser: (nextCurrentUser: any) => {
                    set((state) => ({
                        currentUser:
                            typeof nextCurrentUser === 'function'
                                ? nextCurrentUser(state.currentUser)
                                : nextCurrentUser,
                    }))
                },
                setTanents: (nextTanents: any) => {
                    set((state) => ({
                        tanents: typeof nextTanents === 'function'
                            ? nextTanents(state.tanents)
                            : nextTanents
                    }))
                },
                setCurrentTanent: (nextCurrentTanent: any) => {
                    set((state) => ({
                        currentTanent: typeof nextCurrentTanent === 'function'
                            ? nextCurrentTanent(state.currentTanent)
                            : nextCurrentTanent
                    }))
                },
                setProperties: (nextProperties: any) => {
                    set((state) => ({
                        properties: typeof nextProperties === "function"
                            ? nextProperties(state.properties)
                            : nextProperties
                    }))
                },
                setProperty: (nextProperty: any) => {
                    set((state) => ({
                        property: typeof nextProperty === "function"
                            ? nextProperty(state.properties)
                            : nextProperty
                    }))
                },
                setPublicProperties: (nextPublicProperties: any) => {
                    set((state) => ({
                        properties: typeof nextPublicProperties === "function"
                            ? nextPublicProperties(state.properties)
                            : nextPublicProperties
                    }))
                },
                setPublicProperty: (nextPublicProperty: any) => {
                    set((state) => ({
                        property: typeof nextPublicProperty === "function"
                            ? nextPublicProperty(state.properties)
                            : nextPublicProperty
                    }))
                },
                reset: () => {
                    set({})
                },
            }
        },
    ), {
        name: 'currentUser'
    })
)
export default useUserStore;