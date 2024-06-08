import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../config/init"
import { fakesleep } from "./fakesleep";

const auth = getAuth();
export const persistanceLogin= async (setuser, setauth, setPreLoading)=> {
    setPreLoading(()=> true)
    await fakesleep(1000)
    onAuthStateChanged(auth, user=> {
        if(user) {
            setauth(()=> true)
            setuser(()=> ({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL.replace("s96", "s200"),
            }))
            setPreLoading(()=> false)
            return
        }
        else {
            setPreLoading(()=> false)
            return 
        }
    })    
}