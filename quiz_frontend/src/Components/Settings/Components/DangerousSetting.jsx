import React from 'react'
import ComponentDangerousSetting from './ComponentDangerousSetting'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import DangerousIcon from '@mui/icons-material/Dangerous';
import MainTitle from './MainTitle'

const DangerousSetting = (props) => {
  
  return (
    <div className="c-dangerous-setting">
      <MainTitle icon={<DangerousIcon></DangerousIcon>} text={"Fatal setting"}></MainTitle>
      <ComponentDangerousSetting setopenchange={props.setopenchange} setChangeSetting={()=> props.setChangeSetting({isFatal: true, fatalMessage: "Are you sure want to delete your account ?" })} text={"Delete account"} icon={<ArrowForwardIosIcon></ArrowForwardIosIcon>}></ComponentDangerousSetting>
      <ComponentDangerousSetting setopenchange={props.setopenchange} setChangeSetting={()=> props.setChangeSetting({isFatal: true, fatalMessage: "Are you sure want to log out ?" })} text={"Log out"} icon={<ArrowForwardIosIcon></ArrowForwardIosIcon>}></ComponentDangerousSetting>
    </div>
  )
}

export default DangerousSetting