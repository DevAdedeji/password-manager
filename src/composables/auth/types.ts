import { type User } from 'firebase/auth'
import { type RemovableRef } from '@vueuse/core'
import { type Ref } from 'vue'

export interface userState {
    userString: RemovableRef<string | null>,
    user: User | null,
    isLoggedIn: Ref<boolean>,
}