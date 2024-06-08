import { getAuth, signOut } from "firebase/auth";

export const logout= (setuser, setauth)=> {
    const auth= getAuth()
    signOut(auth).then(() => {
        // Sign-out successful.
        setuser(()=> ({
            name: "",
            phonenumber: "",
            email: "",
            photo: ""
        }))
        setauth(()=> false)
        return window.location.reload()
      }).catch((error) => {
        // An error happened.
      });
}