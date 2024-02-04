import { type User } from 'firebase/auth'
import { useStorage } from '@vueuse/core'
import { type userState } from './types'

const userState: userState = {
    userString: useStorage('userString', null, sessionStorage),
    user: useStorage('userString', '', sessionStorage).value ? JSON.parse(useStorage('userString', '', sessionStorage).value) as User : null,
    isLoggedIn: useStorage('isLoggedIn', false, sessionStorage),
}

export const useUser = () => {
    const setUser = (user: User) => {
        userState.userString.value = JSON.stringify(user) as any
        userState.user = user
        userState.isLoggedIn.value = true
    }
    return { setUser }
}