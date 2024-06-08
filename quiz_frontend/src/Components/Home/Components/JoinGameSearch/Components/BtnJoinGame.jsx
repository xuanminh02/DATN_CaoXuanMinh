import React from 'react'
import { useNavigate } from 'react-router-dom'

const BtnJoinGame = (props) => {
  const navigate= useNavigate()
  return (
    <div className="btn-join-game">
        <button style={{opacity: props?.codeInvite?.length > 0 ? 1 : 0.5, cursor: props?.codeInvite?.length > 0 ? "pointer" : "not-allowed"}} disabled={props?.codeInvite?.length > 0 ? false : true} onClick={()=> navigate(`/join/class/${props?.codeInvite}`)} className="btn-search-bar-join">
          Join
        </button>
    </div>
  )
}

export default BtnJoinGame