import React from 'react'
import "./style.sass"

const Btn = (props) => {
  return (
    <div onClick={()=> props.setopepopup(()=> true)} className={"btn "+props.className}>
      {props.text}
    </div>
  )
}

export default Btn