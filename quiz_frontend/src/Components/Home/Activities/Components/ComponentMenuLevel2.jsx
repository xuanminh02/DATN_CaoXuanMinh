import React from 'react'

const ComponentMenuLevel2 = (props) => {
  return (
    <div className="c-menu-lv-2">
        <div className="c-menu-lv-2-text">
            {props.text}
        </div>
        <div className="c-menu-lv-2-icon">
            {props.icon}
        </div>
    </div>
  )
}

export default ComponentMenuLevel2