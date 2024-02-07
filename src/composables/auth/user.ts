import { type User } from 'firebase/auth'
import { useStorage } from '../storage'
import { ref } from 'vue'

const authenticated = ref(false);
export const useUser = () => {
    const { saveItem, getItem, removeItem } = useStorage()
    const setUser = async (user: User) => {
        await saveItem({name: "user", item: user})
        isUserAuthenticated();
    }
    const removeUser = () => {
        removeItem("user")
    }
    const isUserAuthenticated = async () => {
        const user = await getItem("user")
        if(user){
            authenticated.value = true
        } else {
            authenticated.value = false
        }
    }
    const getUser = async () => {
        const user = await getItem("user")
        return user
    }
    return { setUser, isUserAuthenticated, removeUser, authenticated, getUser }
}