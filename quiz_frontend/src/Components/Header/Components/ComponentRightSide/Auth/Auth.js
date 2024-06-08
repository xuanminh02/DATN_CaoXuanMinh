import React from 'react'
import BtnMenu from '../NotAuth/Component/BtnMenu'

const Auth = (props) => {
  return (
    <div className="right-side-auth">
      <BtnMenu {...props} />
    </div>
  )
}

export default Auth