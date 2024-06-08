import React, { Fragment, useContext, useEffect, useRef } from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../../../../App'
import { logout } from '../../../../../../Firebase/function/logout'

const MenuOption = (props) => {
  const myref= useRef()
  const { user, auth, setuser, setauth }= useContext(UserContext)
  const outside_f= useCallback((e)=> {
    if(myref.current && !myref.current.contains(e.target)) {
        props.setopenmenu(prev=> false)
    }
  }, [props])
  useEffect(()=> {
    document.addEventListener("mousedown", outside_f)
    return ()=> document.removeEventListener("mousedown", outside_f)
  }, [outside_f])

  return (
    <div ref={myref} className='menu-option'>
        {   
            <Fragment>
                {
                  auth=== false && 
                  <>
                    <Link onClick={()=> props.setopenmenu(prev=> false)} className="common-link" to={"/settings"}>
                      <div className="menu-option-component">
                        Settings    
                      </div>
                    </Link>
                    <div onClick={()=> props.setopepopup1(()=> true)} className="menu-option-component">
                      Login
                    </div>
                    <div onClick={()=> props.setopepopup2(()=> true)} className="menu-option-component">
                      Sign up
                    </div>
                  </>
                }
                {
                  auth=== true && 
                  <>
                  <div className="menu-option-component extension">
                    <div>{user.displayName}</div>
                    <div>{user.email}</div>
                  </div>
                    <Link onClick={()=> props.setopenmenu(prev=> false)} className="common-link" to={"/settings"}>
                      <div className="menu-option-component">
                        Settings    
                      </div>
                    </Link>
                    <Link onClick={()=> props.setopenmenu(prev=> false)} className="common-link" to={"/admin"}>
                      <div className="menu-option-component">
                        Admin page    
                      </div>
                    </Link>
                    <div className="menu-option-component" onClick={()=> logout(setuser, setauth)}>
                      Log out
                    </div>
                  </>
                }
            </Fragment>
        }
    </div>
  )
}

export default MenuOption