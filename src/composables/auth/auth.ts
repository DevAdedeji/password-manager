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
            chrome.storage.local.remove("user");
            console.log(result)
        } catch(err){
            console.log(err)
        }
    }
    return { signInUser, signOutUser }
}

export const isUserAuthenticated = () => {
    chrome.storage.local.get("user", function (result: any) {
        if ("user" in result){
            return true
        } else{
            return false
        }
    })
}