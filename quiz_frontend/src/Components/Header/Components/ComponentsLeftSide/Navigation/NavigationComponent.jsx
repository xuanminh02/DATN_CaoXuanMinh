import React from 'react'
import { NavLink } from 'react-router-dom'

const NavigationComponent = (props) => {
  return (
    <div className="navigation-component">
        <NavLink style={{color: "#000", textDecoration: "none"}} to={"/"+ props.link} className={({ isActive }) => (isActive ? 'navigation-link-active navigation-link' : 'navigation-link-inactive navigation-link')} >
            <div className="navigation-component-icon">
                {props.icon}
            </div>
            <div className="navigation-component-link">
                {props.text}
            </div>
        </NavLink>
    </div>
  )
}

export default NavigationComponent