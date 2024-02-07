import { useStorage } from '../storage'
import { ref } from 'vue'

const authenticated = ref(false);
export const useUser = () => {
    const { getItem } = useStorage()

    const isUserAuthenticated = async () => {
        const token = await getItem("auth.token")
        if(token){
            authenticated.value = true
        } else {
            authenticated.value = false
        }
    }
    const getUserId = async () => {
        const user = await getItem("auth.user_id")
        return user
    }
    return { isUserAuthenticated, authenticated, getUserId }
}