import React from 'react'

const ComponentSettingGame = (props) => {
  return (
    <div className="c-setting-game">
      <div className="c-setting-game-left-side">
        {props.title}
      </div>
      <div className="c-setting-game-right-side">
        {props.content}
      </div>
    </div>
  )
}

export default ComponentSettingGame