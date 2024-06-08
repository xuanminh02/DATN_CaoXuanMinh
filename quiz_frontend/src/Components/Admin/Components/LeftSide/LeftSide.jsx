import React, { useCallback, useContext, useEffect, useRef } from 'react'
import LogoApp from '../../../Header/Components/ComponentsLeftSide/LogoApp'
import ComponentListMenu from './Components/ComponentListMenu'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import "./style.sass"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import { UserContext } from '../../../../App';
import { Skeleton } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { v4 } from 'uuid';

const LeftSide = (props) => {
  const { user }= useContext(UserContext)
  const [open, setopen]= useState(false)
  const ref= useRef()
  const clickoutside= useCallback((e)=> {
    if(window.innerWidth <=650) {
        if(ref?.current && !ref?.current?.contains(e?.target)) {
            props?.setOpenLeftSideResponsive(()=> true)
        }
    }
    else {
        props?.setOpenLeftSideResponsive(()=> false)
    }
  }, [props])
  useEffect(()=> {
    document?.addEventListener("mousedown", clickoutside)
    return ()=> document?.removeEventListener("mousedown", clickoutside)
  }, [clickoutside])
  return (
    <div ref={ref} className="left-side-admin" style={{transform: props?.openLeftSideResponsive=== false ? "translateX(0)" : "translateX(-100%)"}}>
        <div className="wrapper-left-side">
            <div className="wrapper-logo">
                <LogoApp></LogoApp>
            </div>
            {
                user?.data?.userLogin?.displayName ?
                <div className="wrapper-name">
                    {user?.data?.userLogin?.displayName}
                </div>
                : 
                <div className="wrapper-name">
                    <Skeleton animation={"wave"} variant={"rectangular"} width={200} height={20}></Skeleton>
                </div>
            }
            <div className="wrapper-create-quiz" style={{position: "relative"}}>
                <div style={{width: "100%", height: "100%", textAlign: "center"}} onClick={()=> setopen(prev=> !prev)}>Create term</div>
                <div className={"option-create-quiz"} style={{position: "absolute", transform: open=== true ? "translateY(0%)" : "translateY(calc(100vh - 100px))"}}>
                    <Component></Component>
                </div>
            </div>
            <br />
            <br />
            <div className="list-menu-left-side">
                <ComponentListMenu array_link={props?.array_link}></ComponentListMenu>
            </div>
        </div>
    </div>
  )
}

export default LeftSide

const Component= (props)=> {
    return (
        <div className="vt-120" style={{background: "#fff", padding: "10px", borderRadius: 10, }}>
            <Link to="/create-set" className="navigation">
                <C1 icon={<ContentCopyIcon></ContentCopyIcon>} text={"Create a term"}></C1>
            </Link>
            <Link to="/create-class" className="navigation">
                <C1 icon={<GroupIcon></GroupIcon>} text={"Create a class"}></C1>
            </Link>
            <Link to={"/create-quiz/"+v4()} className="navigation">
                <C1 icon={<QuizIcon></QuizIcon>} text={"Create a quiz"}></C1>
            </Link>
        </div>
    )
}

const C1= (props)=> {
    return (
        <div className="th-431">
            <div className="fl-424">
                {
                    props?.icon
                }
            </div>
            <div className="op-243">{props.text}</div>
        </div>
    )
}