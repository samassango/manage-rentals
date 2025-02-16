import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { persist } from 'zustand/middleware'
const useUserStore = create(
    persist(combine(
        {
            user: null,
            currentUser: null,
            tanents: [],
            currentTanent: null
        },
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
                }
            }
        },
    ), {
        name: 'currentUser'
    })
)
export default useUserStore;