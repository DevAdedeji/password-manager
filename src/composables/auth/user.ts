import { type User } from 'firebase/auth'


export const useUser = () => {
    const setUser = (user: User) => {
        chrome.storage.local.set({ user: user }, function () {
            console.log("User data has been stored in storage");
        });
    }
    return { setUser }
}