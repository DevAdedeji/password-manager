import { ref } from "vue"
import { $api } from "@/services"
import { type UserAuthModel } from "@/services/auth/types"
import { useNotification } from "../notification"
import { useRouter } from "vue-router"
import { useStorage } from "../storage"

export const useAuth = () => {
    const { handleNotification } = useNotification()
    const { saveItem, removeItem } = useStorage()
    const router = useRouter()
    const form = ref<UserAuthModel>({
        email: "",
        password: "",
    })
    const submit = ref(false);

    const registerUser = async () => {
        submit.value = true
        try {
            const response = await $api.auth.register(form.value)
            if(response.status === 201 && response.data.success === true){
                handleNotification({msg: response.data.message, type: 'success'})
                router.push('/login')
            }
        } catch (err: any){
            const errorMsg = err.response.data.email || err.response.data.error
            handleNotification({msg: errorMsg, type: 'error' })
        } finally {
            submit.value = false
        }
    }

    const loginUser = async () => {
        submit.value = true
        try{
            const response = await $api.auth.login(form.value)
            if(response.status === 200){
                saveItem({name:"auth.token", item: response.data.token})
                saveItem({name:"auth.user_id", item: response.data.user._id})
                router.push('/')
            }
        } catch (err: any){
            const errorMsg = err.response.data.email || err.response.data.error || 'Something went wrong, pls try again'
            handleNotification({msg: errorMsg, type: 'error' })
        } finally {
            submit.value = false
        }
    }

    const signOutUser = async () => {
        try{
            removeItem("auth.token")
            removeItem("auth.user_id")
            router.push('/login')
        } catch(err){
            console.log(err)
        }
    }
    return { registerUser, signOutUser, form, submit, loginUser }
}
