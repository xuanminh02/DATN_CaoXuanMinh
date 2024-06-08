import React from 'react'

const FatalComponentChange = (props) => {
  return (
    <div className={"fatal-component-change"}>
        {props.fatalMessage}
    </div>
  )
}

export default FatalComponentChange