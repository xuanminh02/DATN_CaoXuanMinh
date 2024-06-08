import React from 'react'
import { NavLink } from 'react-router-dom'

const ComponentListMenu = (props) => {
  
  return (
    <div className="component-list-menu-left-side">
        {
            props.array_link?.map((item, key)=> <NavLink className={({isActive})=> (isActive ? "c-navigation active-class-2" : `c-navigation inactive-class-2`)} key={key} to={"/admin/"+item?.link}><C {...item}></C></NavLink>)
        }
    </div>
  )
}

const C= (props)=> {
    return (
        <div className="c-component-list-menu-left-side">
            <div className="wrapper-icon">
                {props.icon}
            </div>
            <div className="wrapper-text">
                {props.text}
            </div>
        </div>
    )
}

export default ComponentListMenu