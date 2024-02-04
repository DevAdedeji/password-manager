import {
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	signOut,
    type User,
} from 'firebase/auth'
import { auth } from '@/firebase'
import { useUser } from '.'

const provider = new GoogleAuthProvider()

export const useGoogleAuth = () => {
    const signInUser = async () => {
        try{
            const result = await signInWithPopup(auth, provider)
            useUser().setUser(result.user)
        } catch(err){
            console.log(err)
        }
    }
    const signOutUser = async () => {
        try{
            const result = await signOut(auth)
            console.log(result)
        } catch(err){
            console.log(err)
        }
    }
    return { signInUser, signOutUser }
}
