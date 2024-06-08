import React, { Fragment, useContext, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PauseIcon from "@mui/icons-material/Pause";
import { useState } from "react";
import { UserContext } from "../../../../../App";
import { Tooltip } from "@mui/material";
import { useMutation } from "@apollo/client";
import MARK_STAR from "../../../../../docs/graphql/mutation/mark_star";
import _ from "lodash";

const FlashCards = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(
    () => props?.get_term?.current_question || 1
  );
  const [isShuffle, setIsShuffle]= useState(()=> false)

  return (
    <>
      <Helmet>
        <title>Flashcards | Quiz</title>
      </Helmet>
      <div className="flashcards">
        <div className="side-left-flashcards">
          <S1
            setIsShuffle={setIsShuffle}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            {...props?.get_term}
            {...props}
          ></S1>
        </div>
        <div className="side-right-flashcards">
          <S2
            isShuffle={isShuffle}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            {...props?.get_term}
          ></S2>
        </div>
      </div>
    </>
  );
};

const S1 = (props) => {
  const navigate = useNavigate();
  return (
    <div className="s1-homie">
      <div className="btn-goback">
        <div className="wkoeweoas">
          <ArrowBackIosIcon className="oekraeorka"></ArrowBackIosIcon>
        </div>
        <div className="dskwewkowq" onClick={() => navigate(-1)}>
          Back
        </div>
      </div>
      <br />
      <div className="fajdsksasas">Flashcards</div>
      <br />
      <br />
      <ProgressBar
        currentQuestion={props?.currentQuestion}
        {...props}
      ></ProgressBar>
      <br />
      <br />
      <br />
      <Function
        setIsShuffle={props.setIsShuffle}
        setCurrentQuestion={props?.setCurrentQuestion}
        {...props}
      ></Function>
    </div>
  );
};
const ProgressBar = (props) => {
  return (
    <Fragment>
      <div className="progress">
        <div className={"progress-bar"}></div>
        <div
          className={"current-progress"}
          style={{
            width: `${(props?.currentQuestion / props?.count_question) * 100}%`,
            transition: "all .2s linear",
          }}
        ></div>
      </div>
      <div className="note">
        <div className="note-1">Progress</div>
        <div className="cp">
          {props?.currentQuestion}/{props?.count_question}
        </div>
      </div>
    </Fragment>
  );
};

const Function = (props) => {
  const [play, setPlay] = useState(() => false);
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));
  useEffect(() => {
    (async () => {
      if (play === true && props?.currentQuestion < props?.count_question) {
        await wait(3000);
        props?.setCurrentQuestion((prev) => parseInt(prev) + 1);
      }
      if (
        play === true &&
        parseInt(props?.currentQuestion) > parseInt(props?.count_question)
      ) {
        setPlay(() => true);
        props?.setCurrentQuestion((prev) => parseInt(1));
      } else if (
        parseInt(props?.currentQuestion) === parseInt(props?.count_question)
      ) {
        setPlay(() => false);
      }
    })();
  }, [
    props?.currentQuestion,
    props?.count_question,
    play,
    props.setCurrentQuestion,
    props,
  ]);
  const [shuffle, setShuffle]= useState(()=> false)
  return (
    <div className="function-a">
      <div className="start hv-eff" onClick={() => setPlay((prev) => !prev)}>
        <div className="wrap-icon">
          {play === false && (
            <>
              <PlayArrowIcon></PlayArrowIcon>
              <div className="text">Play</div>
            </>
          )}
          {play === true && (
            <>
              <PauseIcon></PauseIcon>
              <div className="text">Pause</div>
            </>
          )}
        </div>
      </div>
      <div className="shuffle hv-eff" onClick={()=> {setShuffle(prev=> !prev);props?.setIsShuffle(prev=> !prev)}} >
        <div className="wrap-icon">
          <ShuffleIcon style={{color: shuffle=== true ? "orange" : "aqua"}}></ShuffleIcon>
        </div>
        <div style={{color: shuffle=== true ? "orange" : "aqua"}} className="text">Shuffle</div>
      </div>
    </div>
  );
};

const S2 = (props) => {
  const [flip, setFlip] = useState(() => true);
  return (
    <div className="s2">
      <Container flip={flip} setFlip={setFlip} {...props}></Container>
      <Control setFlip={setFlip} {...props}></Control>
    </div>
  );
};

const Control = (props) => {
  return (
    <div className="control-2">
      <div className="no-mean"></div>
      <div className="control-slide">
        <button
          disabled={props?.currentQuestion <= 1 ? true : false}
          className="previous-control hv-eff"
          onClick={() =>
            props?.setCurrentQuestion((prev) => parseInt(prev) - 1)
          }
        >
          <ArrowBackIosIcon className="ab-control"></ArrowBackIosIcon>
        </button>
        <button
          disabled={
            props?.currentQuestion >= props?.count_question ? true : false
          }
          className="next-control hv-eff"
          onClick={() => props?.setCurrentQuestion((prev) => prev + 1)}
        >
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </button>
      </div>
      <div className="toggle-qa hv-eff">
        <div className="wrap-icon flip-control">
          <CompareArrowsIcon></CompareArrowsIcon>
        </div>
      </div>
    </div>
  );
};

const Container = (props) => {
  const { user } = useContext(UserContext);
  const [isStar, setIsStar] = useState(()=> false);
  const [listQuestion, setListQuestion]= useState(()=> props?.listQuestion)
  const { id_term }= useParams()
  // eslint-disable-next-line
  const [markStar, { data, loading, error }] = useMutation(MARK_STAR, {
    variables: {
      id_user: user?.uid,
      id_term,
      id_question: props?.list_question?.[props?.currentQuestion - 1]?.id_question,
      is_star: !isStar,
    },
  });
  useEffect(() => {
    setIsStar(() => props.is_star);
  }, [props.is_star]);
  useEffect(()=> {
    if(props?.isShuffle === true) {
      setListQuestion(()=> _.shuffle(props?.list_question))
    }
    else {
      setListQuestion(()=> props?.list_question)

    }
  }, [props?.list_question, props?.isShuffle])
  return (
    <div
      className="container"
      onClick={() => props?.setFlip((prev) => !prev)}
      style={{
        position: "relative",
        transition: "all 0.35s linear",
        transformStyle: "preserve-3d",
        background: "transparent",
      }}
    >
      <div
        className="q-content edsdqsaeweqewr"
        style={{
          opacity: props?.flip === true ? 1 : 0,
          transform: props?.flip === false ? "rotateX(270deg)" : "rotateX(0)",
          userSelect: "none",
        }}
      >
        <div style={{ fontSize: 18 }} className="djkljaSJASdsdsd">
          {listQuestion &&
            listQuestion[props?.currentQuestion - 1]?.question
              ?.split("\n")[0]
              .trim()}
          <br />
          <div className="djasklsdjaksajskas">
            {listQuestion &&
              listQuestion[props?.currentQuestion - 1]?.question
                ?.split("\n")
                ?.filter((item, key) => parseInt(key) !== 0)
                ?.map((item, key) => (
                  <div
                    style={{ fontSize: 18 }}
                    className="sajksjksjaksedawa"
                    key={key}
                  >
                    {item}
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div
        className="a-content edsdqsaeweqewr"
        style={{
          opacity: props?.flip === true ? 0 : 1,
          transform: props?.flip === false ? "rotateX(0)" : "rotateX(270deg)",
          userSelect: "none",
        }}
      >
        {listQuestion &&
          listQuestion?.[props?.currentQuestion - 1]?.answer}
      </div>
      <div className="f-content">
      <Tooltip
          title={<div>{isStar === true ? "remove star" : "mark star"}</div>}
        >
            <div className="wrap-icon" style={{ cursor: "pointer" }}
            onClick={() => {
              markStar();
              setIsStar((prev) => !prev);
            }}>
            <StarIcon style={{ color: isStar === true ? "#ffb000" : "#3a3b3c" }}></StarIcon>
            </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default FlashCards;
