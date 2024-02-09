import { $api } from "@/services"
import { useNotification } from "../notification"
import { useEncryption } from "../encryption"
import { type PasswordModel, type PasswordEntity } from "@/services/password/types"
import { ref } from "vue"

const fetching = ref(false)
const passwords = ref<PasswordEntity[]>([])
export const usePassword = () => {
    const { handleNotification } = useNotification()
    const { encrypt } = useEncryption()
    
    const fetchPasswords = async () => {
        try {
            fetching.value = true
            const response = await $api.password.fetchPasswords()
            if(response.status === 200){
                const reversedPasswords = response.data.passwords.reverse()
                passwords.value = reversedPasswords
                fetching.value = false
            } else {
                handleNotification({msg: response.data.message, type: 'error' })
            }
        } catch (err: any) {
            const errorMsg = err.response.data.error || 'Something went wrong'
            handleNotification({msg: errorMsg, type: 'error' })
        }
    }

    const form = ref<PasswordModel>({
        site: '',
        password: ''
    })
    const submit = ref(false)
    const addedSuccessfully = ref(false)
    const addPassword = async () => {
        try {
            submit.value = true
            const data = {
                site: form.value.site,
                password: encrypt(form.value.password)
            }
            const response = await $api.password.addPassword(data)
            if(response.status === 200){
                handleNotification({msg: response.data.message, type: 'success'})
                addedSuccessfully.value = true
                fetchPasswords()
            } else {
                handleNotification({msg: response.data.message, type: 'error'})
            }
        } catch(err: any){
            const errorMsg = err.response.data.site || err.response.data.password || err.response.data.error || 'Something went wrong'
            handleNotification({msg: errorMsg, type: 'error' })
        } finally {
            submit.value = false
            form.value.site = ''
            form.value.password = ''
        }
    }

    const editedSuccessfully = ref(false)
    const editPassword = async (id: string) => {
        try {
            submit.value = true
            const data = {
                site: form.value.site,
                password: encrypt(form.value.password)
            }
            const response = await $api.password.editPassword(id, data)
            if(response.status === 200){
                handleNotification({msg: response.data.message, type: 'success'})
                editedSuccessfully.value = true
                fetchPasswords()
            } else {
                handleNotification({msg: response.data.message, type: 'error'})
            }
        } catch(err: any){
            const errorMsg = err.response.data.site || err.response.data.password || err.response.data.error || 'Something went wrong'
            handleNotification({msg: errorMsg, type: 'error' })
        } finally {
            submit.value = false
            form.value.site = ''
            form.value.password = ''
        }
    }


    const deletePassword = async (id: string) => {
        try {
            const response = await $api.password.deletePassword(id)
            if(response.status === 200){
                handleNotification({msg: response.data.message, type: 'success'})
                fetchPasswords()
            } else {
                handleNotification({msg: response.data.message, type: 'error'})
            }
        } catch(err: any){
            const errorMsg = err.response.data.error || 'Something went wrong'
            handleNotification({msg: errorMsg, type: 'error' })
        }
    }
    return { fetchPasswords, addPassword, form, submit, addedSuccessfully, fetching, passwords, deletePassword, editPassword, editedSuccessfully }
}