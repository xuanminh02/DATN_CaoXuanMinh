import React, { useCallback, useContext, useEffect, useRef } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import "./style.sass"
import { loginWithGoogle } from '../../../../Firebase/function/loginWithGoogle';
import { loginWithFacebook } from '../../../../Firebase/function/loginWithFacebook';
import { useMutation } from '@apollo/client';
import CREATEUSER from '../../../../docs/graphql/mutation/create_user';
import { UserContext } from '../../../../App';

const PopupLS = (props) => {
  const [createUser, { error }]= useMutation(CREATEUSER)
  const { setuser, setauth }= useContext(UserContext)
  const myRef= useRef()
  const clickOutSide= useCallback((e)=> {
    if(myRef.current && e.target.getAttribute("class").toString() === "popup") {
      props.setopepopupsignup(()=> false)
      props.setopepopuplogin(()=> false)
    }
  }, [props])
  useEffect(()=> {
    document.addEventListener("mousedown", clickOutSide)
    return ()=> document.removeEventListener("mousedown", clickOutSide)
  }, [clickOutSide])
  
  return (
    <div className="popup">
        <div className="popup-login" ref={myRef}>
          <div className='popup-title'>
            {props.type}
          </div>
          <LoginWithGoogle {...props} setuser={setuser} setauth={setauth} createUser={createUser} error={error}></LoginWithGoogle>
          <LoginWithFaceBook {...props} setuser={setuser} setauth={setauth}></LoginWithFaceBook>
          <div>
            
          </div>
        </div>
    </div>
  )
}

export const LoginWithGoogle= (props)=> {
  return (
    <div className={`login-with-google login-with ${props?.className}`} onClick={()=> {loginWithGoogle(props?.setuser, props?.setauth, props?.createUser, props?.error);props?.setopepopupsignup(()=> false);props?.setopepopuplogin(()=> false)}}>
      <div className='login-with-icon'>
        <GoogleIcon className="icon-w icon-google" />
      </div>
      <div className="login-text-google login-text">Continue with Google</div>
    </div>
  )
}

export const LoginWithFaceBook= (props)=> {
  return (
    <div className={`login-with-facebook login-with ${props?.className}`} onClick={()=> {loginWithFacebook(props?.setuser, props?.setauth);props?.setopepopupsignup(()=> false);props?.setopepopuplogin(()=> false)}}>
        <div className='login-with-icon'>
          <FacebookIcon className="icon-w" />
        </div>
        <div className="login-text-facebook login-text">Continue with Facebook</div>
    </div>
  )
}

export default PopupLS