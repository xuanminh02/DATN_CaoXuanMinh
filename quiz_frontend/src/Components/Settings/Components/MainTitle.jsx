import React from 'react'

const MainTitle = (props) => {
  return (
    <div className="main-title">
        <div className="main-title-icon">
          {props.icon}
        </div>
        <div className="main-title-text">
          {props.text}
        </div>
    </div>
  )
}

export default MainTitle