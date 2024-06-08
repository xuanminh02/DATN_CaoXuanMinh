import React from 'react'

const ComponentDangerousSetting = (props) => {
  return (
    <div className="c-dangerous-setting-wrap" onClick={()=> {props.setopenchange(prev=> !prev);props.setChangeSetting()}}>
      <div className="c-dangerous-setting-left-side">
        {props.text}
      </div>
      <div className="c-dangerous-setting-right-side">
        {props.icon}
      </div>
    </div>
  )
}

export default ComponentDangerousSetting