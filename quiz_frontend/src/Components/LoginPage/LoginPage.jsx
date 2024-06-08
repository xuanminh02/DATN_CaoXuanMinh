import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../App'
import Login from '../Login/Login'

const LoginPage = (props) => {
  const { auth }= useContext(UserContext)
  return (
    <>
        {
            auth=== false &&
            <Login></Login>
        }
        {
            auth=== true &&
            <Navigate to={-1} replace></Navigate>
        }
    </>
  )
}

export default LoginPage