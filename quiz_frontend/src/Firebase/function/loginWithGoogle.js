import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import randomInteger from 'random-int';
import "../config/init"

const auth = getAuth();
auth.languageCode = 'it';
const provider= new GoogleAuthProvider()
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

export const loginWithGoogle= async (setuser, setauth, createUser, error)=> {
    try {
        const result= await signInWithPopup(auth, provider)
        // The signed-in user info.
        const user = result.user;
        setuser((prev)=> ({...prev, displayName: user.displayName, email: user.email, uid: user.uid, photoURL: user.photoURL}))
        await createUser({variables: {
            uid: user.uid, photoURL: user.photoURL.replace("s96", "s200"), account_name: user.displayName.toLowerCase().replace(" ", "")+"_"+randomInteger(1000, 9999), displayName: user.displayName, class: -1, languages: 1, soundtrack: true, theme_game: 1
        }})
        if(error) return console.log(error)
        return setauth(()=> true)
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential)
    }
     
}

