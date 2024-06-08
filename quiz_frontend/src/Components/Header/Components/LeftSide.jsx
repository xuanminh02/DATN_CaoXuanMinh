import React from 'react'
import LogoApp from './ComponentsLeftSide/LogoApp'
import Navigation from './ComponentsLeftSide/Navigation/Navigation'
import SearchBar from './ComponentsLeftSide/SearchBar'
import "./style.sass"

const LeftSide = (props) => {
  return (
    <div className="header-left-side">
      <LogoApp></LogoApp>
      <SearchBar></SearchBar>
      <Navigation></Navigation>
    </div>
  )
}

export default LeftSide