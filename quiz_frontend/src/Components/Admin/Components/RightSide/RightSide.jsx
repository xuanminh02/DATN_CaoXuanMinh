import React from 'react'
import { Route, Routes } from 'react-router-dom'

const RightSide = (props) => {
  return (
    <div className="right-side-admin" style={{height: "calc(100% - 56px)", overflow: "auto", background: "#f2f0f5"}}>
      <Routes>
        {
          props?.array_link?.map((item, key)=> <Route key={key} path={"/"+ item?.link+ "/*"} element={item?.component } ></Route>)
        }
      </Routes>
    </div>
  )
}

export default RightSide