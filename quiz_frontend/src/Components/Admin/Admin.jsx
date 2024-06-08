import React, { useMemo, useState } from 'react'
import LeftSide from './Components/LeftSide/LeftSide'
import Navigation from './Components/Navigation'
import RightSide from './Components/RightSide/RightSide'
import ClassIcon from '@mui/icons-material/Class';
import ExploreIcon from '@mui/icons-material/Explore';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Helmet } from "react-helmet-async"
import "./style.sass"
import Explore from './Components/RightSide/Components/Explore';
import MyLibrary from './Components/RightSide/Components/MyLibrary';
import Report from './Components/RightSide/Components/Report';
import Setting from './Components/RightSide/Components/Setting';
import Profile from './Components/RightSide/Components/Profile';
import Logout from './Components/RightSide/Components/Logout';

const Admin = (props) => {
  const array_link= useMemo(()=> [{link: "", text: "Explore", icon: <ExploreIcon></ExploreIcon>, component: <Explore></Explore>},{link: "private", text: "My library", icon: <ClassIcon></ClassIcon>, component: <MyLibrary></MyLibrary>}, {link: "report", text: "Report", icon: <EqualizerIcon></EqualizerIcon>, component: <Report></Report>}, {link: "setting", text: "Setting", icon: <SettingsIcon></SettingsIcon>, component: <Setting></Setting>}, {link: "profile", text: "Profile", icon: <AccountCircleIcon></AccountCircleIcon>, component: <Profile></Profile>}, {link: "logout", text: "Log out", icon: <LogoutIcon></LogoutIcon>, component: <Logout></Logout>}], [])
  const [openLeftSideResponsive, setOpenLeftSideResponsive]= useState(()=> false)
  return (
    <>
    <Helmet>
      <title>Admin | Quiz</title>
    </Helmet>
      <div className="admin-page">
        <Navigation setOpenLeftSideResponsive={setOpenLeftSideResponsive}></Navigation>
        <div className="wrapper-admin">
          <LeftSide setOpenLeftSideResponsive={setOpenLeftSideResponsive} openLeftSideResponsive={openLeftSideResponsive} array_link={array_link}></LeftSide>
          <RightSide array_link={array_link}></RightSide>
        </div>
      </div>
    </>
  )
}

export default Admin