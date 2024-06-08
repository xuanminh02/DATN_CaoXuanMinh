import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import GET_CATEGORIES from '../../../../../docs/graphql/query/get_categories';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { UserContext } from '../../../../../App';
import CREATEQUIZIZ from '../../../../../docs/graphql/mutation/quiziz/create_quiziz';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const { user }= React.useContext(UserContext)
  const [createQuiziz]= useMutation(CREATEQUIZIZ)
  const { data }= useQuery(GET_CATEGORIES)
  const { id_quiz }= useParams()
  const navigate= useNavigate()
  const [open, setOpen] = React.useState(true);
  const handleClose = () => { 
    setOpen(false);
    navigate(-1)
  };
  const goToCreateQuestion= ()=> {
    setOpen(false)
    createQuiziz({variables: {
      id_quiziz: id_quiz,
      owner_id: user?.uid,
      titleQuiz: props.titleQuiz,
      categoryQuiz: props.categoryQuiz
    }})
    navigate(`/new-question/${id_quiz}?question=${v4()}`)
  }
  const selectCategoryFunction= (args)=> {
    if(props?.categoryQuiz?.includes(args) === true) {
      return props?.setCategoryQuiz(props?.categoryQuiz?.filter(item=> item !== args))
    }
    return props?.setCategoryQuiz(prev=> ([...prev, args]))
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{fontWeight: 600}}>{"Create your quiz"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div style={{fontSize: 20}}>Name this quiz: </div>
            <input onChange={(e)=> props?.setTitleQuiz(e.target.value)} type="text" style={{width: "100%", height: 50, border: "1px solid #e7e7e7", borderRadius: 5, padding: 10, fontWeight: 600, fontSize: 18, outlineColor: "#2e89ff"}} />
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            <div style={{fontSize: 20}}>Choose category of quiz: </div>
            <div style={{width: "100%", display: "flex", flexFlow: "wrap", gap: 10}}>
              {
                data?.GET_CATEGORIES?.map((item, key)=> <Wrapper setCategoryQuiz={props?.setCategoryQuiz} categoryQuiz={props.categoryQuiz} key={key} dataIndex={parseInt(key) + 1} isSelect={props.categoryQuiz?.includes(item.category)=== true ? true : false} selectCategoryFunction={selectCategoryFunction} {...item} />)
              }
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{background: "#f2f0f5", color: "#3a3b3c", fontWeight: 600, textTransform: "capitalize"}}>Cancel</Button>
          <Button disabled={(props?.titleQuiz?.trim()?.length <=0 || props?.categoryQuiz?.length <=0) ? true : false } onClick={goToCreateQuestion} style={{background: "#8854c0", color: "#fff", fontWeight: 600, textTransform: "capitalize"}}>Next</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Wrapper= (props)=> {
  return (
    <div onClick={()=> props.selectCategoryFunction(props.category)} className="dadkajskasjawiqaw" style={{padding: "2px 8px", borderRadius: 80, backgroundColor: props.isSelect=== true ? "#2e89ff" : "#f2f0f5", display: "flex", justifyContent: 'center', alignItems: "center", color: props.isSelect=== true ? "#fff" : "#3a3b3c", cursor: "pointer", textTransform: "capitalize", pointerEvents: props?.categoryQuiz?.length >= 3 && props.isSelect=== false ? "none" : "all"}}>{props.category}</div>
  )
}
