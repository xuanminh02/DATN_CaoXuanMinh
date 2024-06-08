import React from 'react'

const SelectComponentChange = (props) => {
  return (
    <div className="select-component-change">
      <select onChange={(e)=> props.setChangeSetting(prev=> ({...prev, value: e.target.value, select: e.target.value}))} value={props.select} className={"select-sub-component-change"} id="">
        {
          props.arraySelect?.map((item, key)=> <option key={key} value={parseInt(key) + 1}>{item}</option>)
        }
      </select>
    </div>
  )
}

export default SelectComponentChange