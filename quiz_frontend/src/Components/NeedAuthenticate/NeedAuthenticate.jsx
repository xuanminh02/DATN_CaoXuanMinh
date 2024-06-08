import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import "./style.sass"

export const NeedAuthenticate = (props) => {
  const navigate= useNavigate()
  return (
    <>
      <Helmet>
        <title>Login | Quiz</title>
      </Helmet>
      <div className="need-authenticate">
          <div className="wrapper-need-authenticate">
              <div className="text-need-authenticate">You need login to continue</div>
              <div style={{cursor: "pointer"}} className="btn-need-authenticate" onClick={()=> navigate("/login")}>
                Login
              </div>
          </div>
      </div>
    </>
  )
}
