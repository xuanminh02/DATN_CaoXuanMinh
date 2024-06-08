import React, { useState } from 'react'
import Navigation from '../Header/Components/ComponentsLeftSide/Navigation/Navigation'
import NavigationComponent from '../Header/Components/ComponentsLeftSide/Navigation/NavigationComponent'
import SearchIcon from '@mui/icons-material/Search'
import "./style.sass"
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

const NavigationResponsive = (props) => {
  const [toggle, setToggle]= useState(()=> true)
  return (
    <>
      {
        toggle=== false && <div onClick={()=> setToggle(prev=> !prev)} style={{position: "fixed", bottom: 0, left: 0, height: 56, width: 56, margin: "12px 12px 20px 12px", display: "flex", justifyContent: 'center',alignItems: "center", background: "#f2f0f5", borderRadius: "50% ", cursor: "pointer"}}><MenuIcon style={{color: "#3a3b3c"}}></MenuIcon></div>
      }
      {
        toggle=== true &&
        <div className="navigation-responsive">
            <div className="wrapper-navigation-responsive">
                <Navigation></Navigation>
                <div className="extend-navigation-component">
                  <NavigationComponent icon={<SearchIcon></SearchIcon>} text={"Search"} link="search" ></NavigationComponent>
                </div>
                <div className="extend-navigation-component">
                  <div onClick={()=> setToggle(prev=> !prev)} style={{width: 56, display: "flex", justifyContent: 'center', alignItems: "center", cursor: "pointer"}}><CloseIcon></CloseIcon></div>
                </div>
            </div>
        </div>
      }
    </>
  )
}

export default NavigationResponsive