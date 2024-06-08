import React from 'react'
import ComponentSettingGame from './ComponentSettingGame'
import Switch from '@mui/material/Switch'
import SettingsIcon from '@mui/icons-material/Settings';
import "./style.sass"
import MainTitle from './MainTitle';

const label= { inputProps: { 'aria-label' : 'Switch demo'} }
const SettingGame = (props) => {
  return (
    <div className="com info-user-setting">

      <MainTitle icon={<SettingsIcon></SettingsIcon>} text={"Setting game"}></MainTitle>
      <ComponentSettingGame title={"Soundtrack"} content={<Switch {...label} defaultChecked={true}></Switch>}></ComponentSettingGame>
      <ComponentSettingGame title={"Theme"} content={<Switch {...label} defaultChecked={true}></Switch>}></ComponentSettingGame>
    </div>
  )
}

export default SettingGame