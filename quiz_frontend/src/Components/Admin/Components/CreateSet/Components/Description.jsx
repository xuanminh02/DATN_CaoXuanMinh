import React from 'react'

const Description = (props) => {
  return (
    <div className={"description-create-set"}>
        <TitleTerm setI={props?.setI}></TitleTerm>
        <DescriptionTerm setI={props?.setI}></DescriptionTerm>
        <VideoTerm setI={props?.setI} />
    </div>
  )
}

const TitleTerm= (props)=> {
    return (
        <div className={"title-term-create-set"}>
            <input onChange={(e)=> props?.setI(prev=> ({...prev, title: e.target.value}))} type="text" className="inp-title-term-create-set" placeholder='Enter title, ex: "Biology - 22 Chapter: Evolution"' />    
            <div className="mean-above">
                Title
            </div>
        </div>
    )
}

const DescriptionTerm= (props)=> {
    return (
        <div className={"description-term-create-set"}>
            <input onChange={(e)=> props?.setI(prev=> ({...prev, description: e.target.value}))} type="text" className="inp-description-term-create-set" placeholder="Enter description..." />
            <div className="mean-above">
                Description
            </div>
        </div>
    )
}

const VideoTerm= (props)=> {
    return (
        <div className={"description-term-create-set"}>
            <input onChange={(e)=> props?.setI(prev=> ({...prev, video: e.target.value}))} type="text" className="inp-description-term-create-set" placeholder="Enter video..." />
            <div className="mean-above">
                Video 
            </div>
        </div>
    )
}

export default Description