import React from 'react'
import { Helmet } from 'react-helmet-async'
import Checkbox from '@mui/material/Checkbox'
import "./style.sass"
import { useMutation } from '@apollo/client'
import CREATECLASS from '../../../../docs/graphql/mutation/create_class'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../../../App'
import { v4 as uuidv4 } from "uuid"

const CreateClass = (props) => {
  return (
    <>
        <Helmet>
            <title>Join class | Quiz</title>
        </Helmet>
        <div className="create-class">
            <CreateClassMain></CreateClassMain>
            <JoinClass></JoinClass>
        </div>
    </>
  )
}

const CreateClassMain= (props)=> {
    
    // eslint-disable-next-line
    const [createClass, {data, loading, error}]= useMutation(CREATECLASS, {
        
    })
    const { user }= useContext(UserContext)
    const [classData, setClassData]= useState(()=> ({ perform: true, invite: true}))
    const makeClass= async ()=> {
        const { data }= await createClass({variables: {...classData, own_id: user?.data?.userLogin?.uid, id_class: uuidv4()}})
        window.location.href= `${window.location.origin}/class/${data.createClass.id_class}/`
    }
    return (
        <div className="fsjdiawsisfjraw">
            <Title title={"Create new class"}></Title>
            <Inp setClassData={setClassData} placeholder={"Your class name (course, teacher's name, term,...)"} mean="Class name"></Inp>
            <Inp2 setClassData={setClassData} placeholder={"Description the class"} mean={"Description"}></Inp2>
            <div className="wrapper-permission-of-class">
                <Rule classData={classData} setClassData={setClassData} t={"Allow member in class can add/remove term"}></Rule>
                <Rule2 classData={classData} setClassData={setClassData} t={"Allow member in class can invite stranger"}></Rule2>
            </div>
            <div className="create-class" onClick={()=> makeClass()}>
                Create class
            </div>
        </div>
    )
}

const Rule= (props)=> {
    return (
        <div className="rule" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Checkbox defaultChecked onChange={e=> props?.setClassData(prev=> ({...prev, perform: !props?.classData?.perform}))}></Checkbox>
            <div className="kfjaoawdada">{props?.t}</div>
        </div>
    )
}

const Rule2= (props)=> {
    return (
        <div className="rule" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Checkbox defaultChecked onChange={e=> props?.setClassData(prev=> ({...prev, invite: !props?.classData?.invite}))}></Checkbox>
            <div className="kfjaoawdada">{props?.t}</div>
        </div>
    )
}


const Inp= (props)=> {
    return (
        <div className="inp-12">
            <input type="text" value={props?.value} onChange={e=> props?.setClassData(prev=> ({...prev, class_name: e.target.value}))} className="kprjekpore erigihdkjsnd" placeholder={props?.placeholder} />
            <div className="fdefdkgsefda">{props?.mean}</div>
        </div>
    )
}
const Inp2= (props)=> {
    return (
        <div className="inp-12">
            <input type="text" value={props?.value} onChange={e=> props?.setClassData(prev=> ({...prev, description: e.target.value}))} className="kprjekpore erigihdkjsnd" placeholder={props?.placeholder} />
            <div className="fdefdkgsefda">{props?.mean}</div>
        </div>
    )
}

const JoinClass= (props)=> {
    return (
        <div className="join-class">
            <Title title={"Join a class or create your class"}></Title>
            <SearchClass></SearchClass>
            <CreateClassBtn></CreateClassBtn>
        </div>
    )
}

const Title= (props)=> {
    return (
        <div className="title-join-class">
            {props?.title}
        </div>
    )
}

const SearchClass= (props)=> {
    return (
        <div className="search-class">
            <input type="text" className="search-class" placeholder='Type any class you want' />
            <div className="gjgfsdgfdgddsfd">Search class</div>
        </div>
    )
}

const CreateClassBtn= (props)=> {
    return (
        <div className="add-class">
            <div className="fbsfdkesofwsa">Create new class</div>
        </div>
    )
}

export default CreateClass