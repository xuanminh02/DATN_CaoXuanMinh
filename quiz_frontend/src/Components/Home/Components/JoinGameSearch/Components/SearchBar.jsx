import React from 'react'

const SearchBar = (props) => {
  return (
    <div className="search-bar-join">
      <input onChange={(e)=> props?.setCodeInvite(()=> e?.target?.value)} type="text" className="text-container-search" placeholder="Enter code invite here" />
    </div>
  )
}

export default SearchBar