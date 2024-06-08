import React, { useContext, useMemo } from 'react'
import ComponentInfoUser from './ComponentInfoUser'
import MainTitle from './MainTitle'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./style.sass"
import { UserContext } from '../../../App';

const InfoUser = (props) => {
  const { user }= useContext(UserContext)
  const arraySelectClass= useMemo(()=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [])
  const arraySelectLanguage= useMemo(()=> ["Vietnamese", "English"], [])
  return (
    <div className="com info-user-setting">
      <MainTitle icon={<AccountCircleIcon></AccountCircleIcon>} text="Profile"></MainTitle>
      <ComponentInfoUser InfoUser={InfoUser} setType={()=> props?.setType(()=> 1)} setChangeSetting={()=> props.setChangeSetting(()=> ({title: "Change your avatar", isText: true}))} setopenchange={props.setopenchange} title={"Avatar"} content={<img alt={"open"} src={user?.data?.userLogin?.photoURL} className="img-info-user-setting"></img>}></ComponentInfoUser>
      <ComponentInfoUser InfoUser={InfoUser} setType={()=> props?.setType(()=> 2)} setChangeSetting={()=> props.setChangeSetting(()=> ({title: "Change your account name", isText: true, placeholder: user?.data?.userLogin?.account_name}))} setopenchange={props.setopenchange} title={"account name"} content={user?.data?.userLogin?.account_name}></ComponentInfoUser>
      <ComponentInfoUser InfoUser={InfoUser} setType={()=> props?.setType(()=> 3)} setChangeSetting={()=> props.setChangeSetting(()=> ({title: "Change your name", isText: true, placeholder: user?.data?.userLogin?.displayName}))} setopenchange={props.setopenchange} title={"Name"} content={user?.data?.userLogin?.displayName}></ComponentInfoUser>
      <ComponentInfoUser InfoUser={InfoUser} setType={()=> props?.setType(()=> 4)} setChangeSetting={()=> props.setChangeSetting(()=> ({title: "Change your class", isSelect: true, placeholder: user?.data?.userLogin?.class, arraySelect: arraySelectClass, select: user?.data?.userLogin?.class}))} setopenchange={props.setopenchange} title={"class"} content={user?.data?.userLogin?.class} ></ComponentInfoUser>
      <ComponentInfoUser InfoUser={InfoUser} setType={()=> props?.setType(()=> 5)} setChangeSetting={()=> props.setChangeSetting(()=> ({title: "Change your language", isSelect: true, placeholder: user?.data?.userLogin?.languages, arraySelect: arraySelectLanguage, select: user?.data?.userLogin?.languages}))} setopenchange={props.setopenchange} title={"language"} language={user?.data?.userLogin?.languages}></ComponentInfoUser>
    </div>
  )
}

export default InfoUser