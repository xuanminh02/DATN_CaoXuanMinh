import React from 'react'
import { Link } from 'react-router-dom'

const ComponentInteract = (props) => {
  return (
    <div className="c-interact">
        <Link to="/settings" className="l-thing">
            <div className="t-see-profile">See profile</div>
        </Link>
        <Link to="/activities/running" className="l-thing">
            <div className="t-see-running">Activities</div>
        </Link>
    </div>
  )
}

export default ComponentInteract