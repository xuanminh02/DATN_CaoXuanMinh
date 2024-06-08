import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { useQuery } from "@apollo/client"
import GET_LIBRARY from '../../../../../docs/graphql/query/admin/get_library';
import { useContext } from 'react';
import { UserContext } from '../../../../../App';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Skeleton } from '@mui/material';

const MyLibrary = () => {
  return (
    <>
      <Helmet>
        <title>My library | Quiz</title>
      </Helmet>
      <div className="fdksddsgsrte" style={{width: "100%", padding: 24}}>
        <Header></Header>
        <div className="jsdfdksfdesfdsd" style={{width: "100%", display: "flex", justifyContent: "center  "}}>
          <Navigation></Navigation>
          <LoadLibrary></LoadLibrary>
          <Routes>
            <Route path="/" element={<Navigate replace={true} to={"/admin/private/self"} state={{query_type: 1}}></Navigate>}></Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

const Header= (props)=> {
  return (
    <div className="dkdaskfgsfdss" style={{fontSize: 24, fontWeight: 600}}>
      My library
    </div>
  )
}

//

const Navigation= (props)=> {
  return (
    <div className="navigation" style={{width: 200, display: "flex", flexDirection: "column"}}>
      <NavLink state={{query_type: 1}} to="/admin/private/self" style={{textDecoration: "none", padding: 16, display: 'flex', flexDirection: "row", gap: 10, alignItems: "center", fontSize: 18, fontWeight: 600,color: "#3a3b3c" }} className={({isActive})=> (isActive ? "active-class kfklkfrpkewa" : "inactive pfjgkretrkepts")}>
        <div className="wrap-icon"><PersonIcon></PersonIcon></div><div>Created by me</div>
      </NavLink>
      <NavLink state={{query_type: 2}} to={"/admin/private/learn"} style={{textDecoration: "none", padding: 16, display: 'flex', flexDirection: "row", gap: 10, alignItems: "center", fontSize: 18, fontWeight: 600,color: "#3a3b3c" }} className={({isActive})=> (isActive ? "active-class kfklkfrpkewa" : "inactive pfjgkretrkepts")}>
        <div className="wrap-icon"><LocalLibraryIcon></LocalLibraryIcon></div><div>Learned</div>
      </NavLink>
      <Link to={"/create-set"} style={{textDecoration: "none", padding: 16, display: 'flex', flexDirection: "row", gap: 10, alignItems: "center", fontSize: 18, fontWeight: 600,color: "#3a3b3c" }}>
        <div className="wrap-icon"><AddIcon></AddIcon></div><div>Create new term</div>
      </Link>
    </div>
  )
}

//

const LoadLibrary= (props)=> {
  const state = useLocation().state 
  const { user }= useContext(UserContext)
  // eslint-disable-next-line
  const { data, loading, error }= useQuery(GET_LIBRARY, {
    variables: {
      id_user: user?.uid,
      query_type: state?.query_type || 1
    }
  })
  return (
    <div className="load-library" style={{flex: "1 1 0"}}>
      {data?.get_library?.length > 0 && data?.get_library?.map((item, key)=> <ComponentLoadLibrary key={key} {...item}></ComponentLoadLibrary>)}
      {loading && Array.from(Array(5).keys()).map((item, key)=> <div key={key} style={{width: "100%", height: "80px", marginBottom: 8}}><Skeleton variant={"rectangular"} key={key} animation={"wave"} style={{width: "100%", height: "100%", backgroundColor: "#fff", borderRadius: 10}}></Skeleton></div>)}
      {!user?.uid && Array.from(Array(5).keys()).map((item, key)=> <div key={key} style={{width: "100%", height: "80px", marginBottom: 8}}><Skeleton variant={"rectangular"} key={key} animation={"wave"} style={{width: "100%", height: "100%", backgroundColor: "#fff", borderRadius: 10}}></Skeleton></div>)}
    </div>
  )
}
//

const ComponentLoadLibrary= (props)=> {
  return (
    <Link to={"/term/"+props?.id_term+"/"+ props?.title?.replaceAll(" ", "-")} style={{color: "#3a3b3c", textDecoration: "none"}}>
      <div className="fdjksfjdkejklfgar" style={{padding: 12, borderRadius: 10, background: "#fff", display: "flex", flexDirection: "column"}}>
        <div style={{fontSize: 18, fontWeight: 600}}>{props?.title}</div>
        <div style={{}}>{props?.description}</div>
      </div>
    </Link>
  )
}

//

export default MyLibrary