import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MenuOption from './MenuOption';

const BtnMenu = (props) => {
  const [openmenu, setopenmenu]= useState(()=> false)
  return (
    <div className="btn-menu">
        {
          openmenu=== true ? <CloseIcon onClick={()=> setopenmenu(prev=> !prev)} ></CloseIcon> : <MenuIcon onClick={()=> setopenmenu(prev=> !prev)} ></MenuIcon>
        }
        {
          openmenu=== true && <MenuOption setopenmenu={setopenmenu} {...props} ></MenuOption>
        }
    </div>
  )
}

export default BtnMenu