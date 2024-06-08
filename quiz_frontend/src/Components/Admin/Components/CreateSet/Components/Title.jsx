import React from 'react'

const Title = (props) => {
  return (
    <div className="title-create-set">
        <NameTitle nametitle={"Create new term"}></NameTitle>
        <BtnCreate {...props} createTerm={props?.createTerm}></BtnCreate>
    </div>
  )
}

const NameTitle= (props)=> {
    return (
        <div className="name-title-create-set">
            {props.nametitle}
        </div>
    )
}

const BtnCreate= (props)=> {
    return (
        <button disabled={(props?.q?.length > 0 ) ? false : true} className="btn-create-set" onClick={()=> props?.createTerm()}style={{border: "none", cursor: (props?.q?.length > 0 ) ? "pointer" : "not-allowed", opacity: (props?.q?.length > 0  ) ? 1 : 0.5}}>
            Create
        </button>
    )
}

export default Title