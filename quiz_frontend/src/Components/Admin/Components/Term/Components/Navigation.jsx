import React, { useContext, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SchoolIcon from '@mui/icons-material/School';    
import LoginIcon from '@mui/icons-material/Login';
import { TermContext } from '../Term';
import { v4 } from 'uuid';

const Navigation = (props) => {
    const array_list= useMemo(()=> [{link: "flashcards", text: "Flashcards", icon: <ContentCopyIcon style={{color: "#2e89ff",}}></ContentCopyIcon>}, {link: "learn", text: "Learn", icon: <SchoolIcon style={{color: "#2e89ff",}}></SchoolIcon>}, {link: `test?id_test=${v4()}`, text: "Test", icon: <LoginIcon style={{color: "#2e89ff",}}></LoginIcon>}], [])
    return (
        <div className="navigation-term">
            <div className="ol-921">Learn</div>
            {
                array_list?.map((item, key)=> <ComponentNavigation key={key} {...item}></ComponentNavigation>)
            }            
        </div>
  )
}

const ComponentNavigation= (props)=> {
    const { id_term }= useParams()
    const { data }= useContext(TermContext)
    return (
        <Link className="navigation-link-term" to={`/term/${id_term}/${data?.get_term?.title?.toString().toLowerCase().replaceAll(" ", "-")}/`+ props?.link}>
            <div className="component-navigation-term" style={{borderRadius: 4}}>
                <div className="pw-469">
                    {props?.icon}
                </div>
                <div className="md-277">
                    {props?.text}
                </div>
            </div>
        </Link>
    )
}


export default Navigation