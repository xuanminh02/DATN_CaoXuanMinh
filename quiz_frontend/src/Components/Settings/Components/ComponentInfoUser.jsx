import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const ComponentInfoUser = (props) => {
  return (
    <div className="c-info-user" onClick={()=> {props.setopenchange(prev=> !prev);props.setChangeSetting();props?.setType()}}>
        <div className="c-info-user-read-only">
            <div className="c-info-user-title">{props.title}</div>
            <div className="c-info-user-content">
              {props?.content=== -1 ? "Unset" : props?.content}
              {props?.language=== 1 && "English"}
              {props?.language=== 2 && "Vietnamese"}
            </div>
        </div>
        <div className="c-info-user-change">
            <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </div>
    </div>  
  )
}

export default ComponentInfoUser