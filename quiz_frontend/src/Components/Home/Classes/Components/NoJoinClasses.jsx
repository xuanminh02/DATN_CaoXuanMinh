import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoJoinClasses = (props) => {
  return (
    <div className="no-join-any-classes">
        <Text1 text={"You haven't join any classes yet."}></Text1>                
        <Text2 text={""}></Text2>
        <Btn text={"Join a class"}></Btn>
    </div>
  )
}
const Text1= (props)=> {
    return (
        <div className="no-join-any-classes-text1">
            {props.text}
        </div>
    )
}
const Text2= (props)=> {
    return (
        <div className="no-join-any-classes-text2">
            {props.text}
        </div>
    )
}
const Btn= (props)=> {
    const navigate= useNavigate()
    return (
        <div onClick={()=> navigate("/create-class")} className="no-join-any-classes-btn">
            {props.text}
        </div>
    )
}

export default NoJoinClasses