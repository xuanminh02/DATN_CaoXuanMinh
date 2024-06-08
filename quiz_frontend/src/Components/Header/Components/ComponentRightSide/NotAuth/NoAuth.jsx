import React from 'react'
import Btn from './Component/Btn'
import BtnMenu from './Component/BtnMenu'
import "./style.sass"

export const NoAuth = (props) => {
  return (
    <div className="right-side-no-auth">
        <Btn setopepopup={props.setopepopupsignup} className="btn-signup" text="sign up" />
        <Btn setopepopup={props.setopepopuplogin} className="btn-login" text="log in" />
        <BtnMenu setopepopup1={props.setopepopupsignup} setopepopup2={props.setopepopuplogin} {...props} />
    </div>
  )
}   
