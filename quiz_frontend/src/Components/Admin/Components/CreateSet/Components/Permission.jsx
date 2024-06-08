import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const Permission = (props) => {
  const [openChangePermission, setOpenChangePermission]= useState(()=> false)
  return (
    <div className="wrapper-permission-create-set">
        <Component setOpenChangePermission={setOpenChangePermission} t1={props?.x1} t2={props?.y1} t3={props?.z1}></Component>
        <Component setOpenChangePermission={setOpenChangePermission} t1={props?.x2} t2={props?.y2} t3={props?.z2}></Component>
        {
            openChangePermission=== true &&
            <ChangePermission setI={props?.setI} setOpenChangePermission={setOpenChangePermission}></ChangePermission>
        }
    </div>
  )
}

const Component= (props)=> {
    return (
        <div className="permission-create-set">
            <div className="vt-323">{props.t1}</div>
            <div className="oe-234">
                <div className="fw-424">
                   {props.t2} 
                </div>
                <div className="ek-941">
                    {props.t3}
                </div>
            </div>
            <div className="ks-492" onClick={()=> props.setOpenChangePermission((prev)=> !prev)}>
                Change
            </div>
        </div>
    )
}

export const ChangePermission= (props)=> {
    return (
        <div className={"w-change-permission"} style={{userSelect: "none"}}>
            <div className="change-permission">
                <Title1 setOpenChangePermission={props.setOpenChangePermission} text={"Permission"} icon={<CloseIcon></CloseIcon>}></Title1>
                <div className="wc-change-permission">
                    <ComponentChangePermission changeRoleTerm={props?.changeRoleTerm} id_term={props?.id_term} visible={props?.visible} editable={props?.editable} setI={props?.setI} t1={"Who can see"} t2={["Public", "Only me", "Member in class"]} t3={"Everyone can use this term"}></ComponentChangePermission>
                    <ComponentChangePermission2 changeRoleTerm={props?.changeRoleTerm} id_term={props?.id_term} editable={props?.editable} visible={props?.visible} setI={props?.setI} t1={"Who can edit"} t2={["Only me"]} t3={"Only you can edit this term"}></ComponentChangePermission2>
                </div>
                {
                    props?.dontSave !== true &&
                    <div className="ws-permission">
                        <SavePermission setOpenChangePermission={props.setOpenChangePermission}></SavePermission>
                    </div>
                }
            </div>
        </div>
    )
}

const Title1= (props)=> {
    return (
        <div className="change-permission-title">
            <div className="kd-394">
                {props.text}
            </div>
            <div className="do-192" onClick={()=> props.setOpenChangePermission(()=> false)}>
                {props.icon}
            </div>
        </div>
    )
}

const ComponentChangePermission= (props)=> {
    return (
        <div className="c-change-permission">
            <div className="ow-123">{props.t1}</div>
            <div className="wo-425">
                <select onChange={(e)=> {props?.setI(prev=> ({...prev, visible: parseInt(e.target.value)}));props?.changeRoleTerm({variables: {id_term: props?.id_term, editable: props?.editable, visible: parseInt(e.target.value)}})}} className="pl-301">
                    {
                        props?.t2?.map((item, key)=> <option selected={(props?.visible && props?.visible === parseInt(key) + 1) ? true : false} key={key} value={parseInt(key) + 1}>{item}</option>)
                    }
                </select>
            </div>
            <div className="kx-284">{props.t3}</div>
        </div>
    )
}
const ComponentChangePermission2= (props)=> {
    return (
        <div className="c-change-permission">
            <div className="ow-123">{props.t1}</div>
            <div className="wo-425">
                <select onChange={(e)=> {props?.setI(prev=> ({...prev, editable: parseInt(e.target.value)}));props?.changeRoleTerm({variables: {id_term: props?.id_term, visible: props?.visible, editable: parseInt(e.target.value)}})}} className="pl-301">
                    {
                        props?.t2?.map((item, key)=> <option selected={(props?.editable && props?.editable === parseInt(key) + 1) ? true : false} key={key} value={parseInt(key) + 1}>{item}</option>)
                    }
                </select>
            </div>
            <div className="kx-284">{props.t3}</div>
        </div>
    )
}

const SavePermission= (props)=> {
    return (
        <div className="s-permission" onClick={()=> props?.setOpenChangePermission(()=> false)}>
            Save
        </div>
    )
}

export default Permission