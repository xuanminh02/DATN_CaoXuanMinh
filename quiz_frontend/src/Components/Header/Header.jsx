import React, { useState } from 'react'
import LeftSide from './Components/LeftSide'
import PopupLS from './Components/Popup/PopupLS'
import RightSide from './Components/RightSide'
import "./Header.sass"

const Header = (props) => {
  const [openpopuplogin, setopepopuplogin]= useState(()=> false)
  const [openpopupsignup, setopepopupsignup]= useState(()=> false)
  return (
    <>
      <div className="header">
        <LeftSide></LeftSide>
        <RightSide
          setopepopuplogin={setopepopuplogin}
          setopepopupsignup={setopepopupsignup}
        ></RightSide>
        {
          openpopuplogin=== true && <PopupLS setopepopuplogin={setopepopuplogin} setopepopupsignup={setopepopupsignup} type={"Login"}></PopupLS>
        }
        {
          openpopupsignup=== true && <PopupLS setopepopuplogin={setopepopuplogin} setopepopupsignup={setopepopupsignup} type={"Sign up"}></PopupLS>
        }
      </div>
      <div className="header-fake"></div>
    </>
  )
}

export default Header