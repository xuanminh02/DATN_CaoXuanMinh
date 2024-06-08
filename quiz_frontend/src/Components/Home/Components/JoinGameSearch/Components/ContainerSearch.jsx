import React, { useState } from 'react'
import BtnJoinGame from './BtnJoinGame'
import SearchBar from './SearchBar'
import "./style.sass"

const ContainerSearch = (props) => {
  const [codeInvite, setCodeInvite]= useState(()=> "")
  return (
    <div className="container-search">
        <SearchBar setCodeInvite={setCodeInvite}></SearchBar>
        <BtnJoinGame codeInvite={codeInvite}></BtnJoinGame>
    </div>
  )
}

export default ContainerSearch