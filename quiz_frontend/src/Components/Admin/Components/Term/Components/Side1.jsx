import React, { Fragment, useContext, useState, memo } from 'react'
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from "react-share";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { TermContext } from '../Term';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';


const Side1 = (props) => {
  return (
    <div className="side-1">
        <Author {...props}></Author>
        <Option></Option>
    </div>
  )
}

export const Author= memo((props)=> {
    return (
        <Link to={`/profile/${props?.uid}`} style={{textDecoration: "none", color: "#3a3b3c"}}>
            <div className="author-314">
                <Avatar avatar={props?.photoURL}></Avatar>
                <Name name={props?.displayName}></Name>
            </div>
        </Link>
    )
})

const Avatar= (props)=> {
    return (
        <div className="avatar-author">
            <img src={props?.avatar} alt="open" referrerPolicy="no-referrer" />
        </div>
    )
}

const Name= (props)=> {
    return (
        <div className="name-author">
            <div className="t">Author</div>
            <div className="main-name-author">{props.name}</div>
        </div>
    )
}

const Option= (props)=> {
    const [open, setOpen]= useState(()=> false)
    return (
        <div className="option-2">
            <Tooltip title={<div>Share</div>}>
                <div className="w-option2" style={{background: "#fff", borderRadius: "50%"}} onClick={()=> setOpen(prev=> !prev)}>
                    <ShareIcon></ShareIcon>
                </div>
            </Tooltip>
            {
                open=== true &&
                <Fragment>
                    <Share></Share>
                </Fragment>
            }
            <MainShare setOpen={setOpen} open={open}></MainShare> 
        </div>
    )
}

const Share= (props)=> {
    return (
        <div className="share">
            <div></div>
        </div>
    )
}

export const Share2= (props)=> {
    const [copied, setcopied]= useState(()=> false)
    const exe= ()=> {
        setcopied(()=> true)
        setTimeout(()=> {
            setcopied(()=> false)
        }, 2000)
        clearTimeout()
    }
    return (
        <div className="dk-249" style={{justifyContent: "flex-start"}}>
            <div className="dp-939" style={{whiteSpace: "nowrap", overflow: "hidden", textAlign: "left", justifyContent: "flex-start", textOverflow: "ellipsis", width: "100%"}}>
                {props?.link}
            </div>
            <CopyToClipboard text={props?.link}>
                <div className="fl-302" onClick={()=> setcopied(()=> exe())}>
                    {
                        copied=== true ? "Copied" : "Copy"
                    }
                </div>
            </CopyToClipboard>
        </div>
    )
}

export const MainShare= (props)=> {
    const { data }= useContext(TermContext)
    return (
        <div className="main-share" style={{top: props?.open=== true ? "50%" : "-100%"}}>
            <div className="xl-293">
                <div className="rn-931">
                    Share this term
                </div>
                <div className="mn-291" onClick={()=> props?.setOpen(()=> false)}>
                    <CloseIcon></CloseIcon>
                </div>
            </div>
            <Share2 link={`${window.location.origin}/term/${data?.get_term?.id_term}/${data?.get_term?.title}`}></Share2>
            <div className="gh-329">
                <C1 icon={<FacebookIcon></FacebookIcon>} t={"Share on Facebook"} ></C1>
                <br />
                <C2 icon={<TwitterIcon></TwitterIcon>} t={"Share on Twitter"}></C2>
            </div>
        </div>
    )
}
const C1= (props)=> {
    return (
        <>
            <div className="btn-share">
                <FacebookShareButton
                    url={`${window.location.origin}/term/293203421/k`}
                    quote={"Join this term"}
                    hashtags={"#quiz"}
                    description={"korisakuso"}
                    className={"fb-share"}
                >
                    <div className="w-icon">
                        {props?.icon}
                    </div>
                    <div className="t-share">
                        {props?.t}
                    </div>
                    <div className="n-m">

                    </div>
                </FacebookShareButton>
            </div>
        </>
    )
}

const C2= (props)=> {
    return (
        <div className="btn-share">
            <TwitterShareButton
                title="Join term now!"
                url={`${window.location.origin}/term/293203421/k`}
                hashtags={["#quiz"]}
                className="tw-share">
                <div className="w-icon">
                    {props?.icon}
                </div>
                <div className="t-share">
                    {props?.t}
                </div>
                <div className="n-m">

                </div>
            </TwitterShareButton>
        </div>
    )
}

export default Side1