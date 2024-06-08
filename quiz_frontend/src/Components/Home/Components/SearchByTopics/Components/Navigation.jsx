import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = (props) => {
    return (
        <div className="search-by-topics-navigation">
            {
                props?.arrayLink?.map((item, key)=> <NavLink key={key} className={({ isActive }) => (isActive ? 'active-link-navigation component-link-navigation' : 'inactive-link-navigation component-link-navigation')} to={"/topic/"+ item.link}><ComponentLink {...item}></ComponentLink></NavLink>)
            }
        </div>
  )
}

const ComponentLink= (props)=> {
    return (
        <div className="sub-component-link-navigation">
            {props.text}         
        </div>
    )
}

export default Navigation