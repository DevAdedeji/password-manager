export const useAuth = () => {
    const signInUser = async () => {
        try{
            console.log("Sign in")
        } catch(err){
            console.log(err)
        }
    }
    const signOutUser = async () => {
        try{
            console.log("Sign out")
        } catch(err){
            console.log(err)
        }
    }
    return { signInUser, signOutUser }
}
