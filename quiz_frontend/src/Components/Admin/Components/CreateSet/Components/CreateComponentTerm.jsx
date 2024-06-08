import React, { useRef, useState, useTransition } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

const CreateComponentTerm = (props) => {

  const [listQuestion, setListQuestion]= useState(()=> Array.from(Array(2).keys()))
  return (
    <div className="we-524">
      <TransitionGroup className="todo-list">
        {
          // eslint-disable-next-line
          listQuestion?.map((item ,key)=> 
          <CSSTransition
            key={key}
            timeout={500}
            classNames="item-term"
            >
              <Component q={props?.q} setQ={props?.setQ} listQuestion={listQuestion} setListQuestion={setListQuestion} key={key} index={parseInt(key) + 1} icon={<DeleteIcon></DeleteIcon>}></Component>
          </CSSTransition>
          )
        }
      </TransitionGroup>
      <AddTerm listQuestion={listQuestion} setListQuestion={setListQuestion} lastIndex={parseInt(listQuestion?.length) + 1} icon={<AddIcon></AddIcon>} text={"Create"} ></AddTerm>
      <CreateBtn2 {...props} createTerm={props?.createTerm}></CreateBtn2>
    </div>
  )
}

export default CreateComponentTerm

const AddTerm= (props)=> {
  const myRef= useRef()
  return (
    <div ref={myRef} className="la-453 ods-404">
      <div className="ow-415">{props.lastIndex}</div>
      <div className="la-451" onClick={()=> {props?.setListQuestion(prev=> ([...prev, parseInt(props?.lastIndex) - 1]));myRef.current.scrollIntoView({block: 'start', behavior: 'smooth'})}}>{props.icon}&nbsp;{props.text}</div>
      <div className="ew-532"></div>
    </div>
  )
}

const CreateBtn2= (props)=> {
  const [isPending, startTransition]= useTransition()
  const [disable, setDisable]= useState(()=> false)
  return (
    <div className="pa-302">
      <button disabled={(props?.q?.length > 0) || !isPending ? false : true} className="th-182" onClick={()=> {props?.createTerm();startTransition(()=> {setDisable(()=> true)})}} style={{border: "none", cursor: (props?.q?.length > 0) ? "pointer" : "not-allowed", opacity: (props?.q?.length > 0) ? 1 : 0.5}}>
        Create
      </button>
    </div>
  )
}

const Component= (props)=> {
    return (
      <div className={"la-453"}>
        <Component1 q={props?.q} setQ={props?.setQ} listQuestion={props?.listQuestion} setListQuestion={props?.setListQuestion} index={props?.index} icon={props?.icon}></Component1>
        <Component2 index={props?.index} q={props?.q} setQ={props?.setQ}></Component2>
      </div>
    )
}

const Component1= (props)=> {
  return (
    <div className="or-495">
      <div className="tl-329">
        <div className="pe-425">
          {props.index}
        </div>
        <div className="qw-104" onClick={()=> props.setListQuestion(props?.listQuestion?.filter(item=> parseInt(item) !== parseInt(props?.index -1)))}>
          {props.icon}
        </div>
      </div>
    </div>
  )
}

const Component2= (props)=> {
  const [eachQuestion, setEachQuestion]= useState(()=> ({index: props?.index, question: "", answer: ""}))
  return (
    <div className="jf-583">
      <div className="wr-231">
        <div onInput={(e)=> setEachQuestion(prev=> ({...prev, question: e.target.innerText}))} contentEditable={true} id="ft-304" className="df-429 tr-432"></div>
        <p className="id-495">Terms</p>
      </div>
      <div className="ke-392">
        <div onBlur={(e)=> props?.setQ(prev=> ([...prev, {index: eachQuestion?.index, question: eachQuestion.question, answer: e.target.innerText}]))} onInput={(e)=> setEachQuestion(prev=> ({...prev, anser: e.target.innerHTML}))} contentEditable={true} id="ri-349" className="aw-183 tr-432"></div>
        <p className="id-495">Answer</p>
      </div>
    </div>
  )
}