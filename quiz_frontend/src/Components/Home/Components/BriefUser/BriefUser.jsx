import React, { useContext } from 'react'
import { UserContext } from '../../../../App'
import ComponentAvatar from './Components/ComponentAvatar'
import ComponentInteract from './Components/ComponentInteract'
import ComponentName from './Components/ComponentName'
import "./style.sass"

const BriefUser = (props) => {
  const { user, auth }= useContext(UserContext)
  
  return (
    <div className={auth=== false ? "brief-user collapse-brief-user close-brief-user" : "brief-user"}>
        <div className="c-container1">
          <ComponentAvatar {...user?.data?.userLogin}></ComponentAvatar>
          <ComponentName {...user?.data?.userLogin}></ComponentName>
        </div>
        <div className="c-container2">
          <ComponentInteract {...user?.data?.userLogin}></ComponentInteract>
        </div>
    </div>
  )
}

export default BriefUser