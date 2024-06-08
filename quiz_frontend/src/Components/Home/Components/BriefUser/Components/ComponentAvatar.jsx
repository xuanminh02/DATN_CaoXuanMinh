import React from 'react'

const ComponentAvatar = (props) => {
  return (
    <div className="c-avatar">
        {
            props.photoURL && <img draggable={false} referrerPolicy="no-referrer" src={props.photoURL} alt="open" className="img-c-avatar" />
        }
    </div>
  ) 
}

export default ComponentAvatar