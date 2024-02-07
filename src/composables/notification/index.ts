import {ref} from 'vue'
import { type Notification } from './types'
const notType = ref('')
const notMsg = ref('')
const showNotification = ref(false)
export const useNotification = () => {
    const handleNotification = (data: Notification) => {
        notType.value = data.type
        notMsg.value = data.msg
        showNotification.value = true
        setTimeout(()=>{
            showNotification.value = false
        }, 3000)
    }
    return { handleNotification, notType, notMsg, showNotification }
}