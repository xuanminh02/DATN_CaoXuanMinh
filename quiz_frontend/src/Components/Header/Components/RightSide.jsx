import React, { useContext } from 'react'
import { UserContext } from '../../../App'
import Auth from './ComponentRightSide/Auth/Auth'
import { NoAuth } from './ComponentRightSide/NotAuth/NoAuth'

const RightSide = (props) => {
  const { auth }= useContext(UserContext)
  return (
    <div className="header-right-side"> 
      {
        auth=== true ? <Auth auth={auth} /> : <NoAuth {...props} auth={auth} {...props} />
      }
    </div>
  )
}

export default RightSide