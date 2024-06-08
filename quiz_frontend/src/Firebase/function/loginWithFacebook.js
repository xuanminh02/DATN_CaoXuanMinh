import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import "../config/init"

const auth = getAuth();
auth.languageCode = 'it';
const provider = new FacebookAuthProvider();
provider.addScope('user_birthday');

export const loginWithFacebook= async (setuser, setauth)=> {
    try {
        const result= await signInWithPopup(auth, provider)
        // The signed-in user info.
        const user = result.user;
        setuser((prev)=> ({...prev, displayName: user.displayName, email: user.email, uid: user.uid, photoURL: user.photoURL}))
        return setauth(()=> true)
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential)
    }
     
}