import React from 'react'
import AttachFile from './AttachFile'
import TypeQuestion from './TypeQuestion'

const CreateQuestion = (props) => {
  return (
    <div className="fdjlikjsdkljasas" style={{width: "100%", display: "flex", justifyContent: 'center', height: "260px"}}>
        <AttachFile />
        <TypeQuestion />
    </div>
  )
}

export default CreateQuestion