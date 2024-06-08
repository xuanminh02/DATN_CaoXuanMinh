import React, { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { Component, ComponentLearn } from "./Learn";
import { useNavigate } from "react-router-dom";
import { round } from "lodash";
import * as Scroll from "react-scroll";
import { useQuery } from "@apollo/client";
import GET_RESULT_TEST from "../../../../../docs/graphql/query/get_result_test";
import { useQueryString } from "../../../../../docs/f/get_query";
import { UserContext } from "../../../../../App";

const Test = (props) => {
  const scroll = Scroll.animateScroll;
  const navigate = useNavigate();
  const [open, setOpen] = useState(() => false);
  const [complete, setComplete] = useState(() => false);
  const [numberAnswer, setNumberAnswer] = useState(() => 0);
  // eslint-disable-next-line
  const [listAnswer, setListAnswer] = useState(() => 0);
  const [countQuestion, setCountQuestion] = useState(() => 0);
  const [correctAnswer, setCorrectAnswer] = useState(() => 0);
  const [limitQuestion, setLimitQuestion] = useState(() => 0);

  useEffect(() => {
    setCountQuestion(() => props?.get_term?.count_question);
    setLimitQuestion(() => props?.get_term?.count_question);
  }, [props?.get_term?.count_question]);
  return (
    <>
      <Helmet>
        <title>{`Test: ${props?.get_term?.title} | Quiz`}</title>
      </Helmet>
      <div className="test">
        <div className="header-test-fake"></div>
        <div className="header-test">
          <div className="header-test-1">
            <div className="gjfkdsdfdgadfsd">
              <div className="wrap-icon dghuehrdgd">
                <LoginIcon></LoginIcon>
              </div>
              <div className="fgjrkgdefds">
                <div className="djfgorjgdioa">Test</div>
                <div className="wrap-icon">
                  <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                </div>
              </div>
            </div>
          </div>
          <div className="header-test-2">
            <section className="c-question">
              {numberAnswer} / {limitQuestion}
            </section>
            <section className="t-question">{props?.get_term?.title}</section>
          </div>
          <div className="header-test-3">
            <div className="djfjgirfdds">
              <div
                className="fkosekfdfefdse"
                onClick={() => setOpen((prev) => !prev)}
              >
                Options
              </div>
              {open === true && (
                <>
                  <div className="fjfdesesereq">
                    <div>Limit question:</div>&nbsp;&nbsp;
                    <input
                      onChange={(e) => (parseInt(e.target.value) > 0) &&
                        setLimitQuestion(parseInt(e.target.value))
                      }
                      type="number"
                      className="gjdsfdsdfa"
                      max={countQuestion}
                    />
                    /{countQuestion}
                  </div>
                </>
              )}
            </div>
            <div className="fgkdopefdefd" onClick={() => navigate(-1)}>
              <div className="wrap-icon">
                <CloseIcon className="close-icon"></CloseIcon>
              </div>
            </div>
          </div>
          {
            <div
              style={{
                width:
                  `calc(${parseInt(numberAnswer)} / ${countQuestion} * 100%)` ||
                  0,
                height: 2,
                background: "#7b89c9",
                position: "absolute",
                bottom: 0,
                zIndex: 11,
                left: 0,
              }}
            ></div>
          }
        </div>
        {complete === false && (
          <div className="main-test">
            {props?.get_term?.list_question
              ?.slice(0, limitQuestion)
              ?.map((item, key) => (
                <ComponentLearn
                  setCorrectAnswer={setCorrectAnswer}
                  setListAnswer={setListAnswer}
                  setNumberAnswer={setNumberAnswer}
                  key={key}
                  {...item}
                  index={parseInt(key) + 1}
                >

                </ComponentLearn>
              ))}
            <br />
            <div className="rkghfordg">
              <div
                className="btn-show-answer"
                onClick={() => {
                  setComplete(() => true);
                  scroll.scrollToTop({ smooth: true });
                }}
              >
                {parseInt(numberAnswer) === parseInt(countQuestion)
                  ? "Submit test"
                  : "Show the answers"}
              </div>
            </div>
          </div>
        )}
        {complete === true && (
          <Summary
            correctAnswer={correctAnswer}
            countQuestion={countQuestion}
            {...props}
            setNumberAnswer={setNumberAnswer}
            limitQuestion={limitQuestion}
          ></Summary>
        )}
      </div>
    </>
  );
};

const Summary = (props) => {
  const navigate= useNavigate()
  const queryString= useQueryString()
  const { user }= useContext(UserContext)
  // eslint-disable-next-line
  const { data, loading, error }= useQuery(GET_RESULT_TEST, {
    variables: {
      id_user: user?.uid,
      id_test: queryString.get("id_test")
    },
    pollInterval: 7000
  })
  return (
    <div className="summary-result">
      <div className="gfkefdgedfaa">
        <section className="wjewirfjsdas">
          <h3 className="gfgjifdefs">You have completed the test!</h3>
          <div className="staticstic">
            <div className="correct-ratio">
              <div className="fidjsfisasf">Result</div>
              <div className="percent">
                {props?.correctAnswer}/{props?.limitQuestion} (
                {Math.round(
                  (props?.correctAnswer / props?.limitQuestion) * 100
                )}
                %)
              </div>
            </div>
            <div className="average-time">
              <div className="djskfjddsas">Time</div>
              <div className="time">1 minute</div>
            </div>
          </div>
          <div className="op12">
            <div className="dsfgdsfddga" onClick={()=> navigate(-1)}>Back to term</div>
            <div className="dsfgdsfddga" onClick={()=> window.location.reload()}>New test</div>
          </div>
        </section>
      </div>
      <div className="list-staticstic main-test" style={{ marginTop: 80 }}>
        <div
          className="greet"
          style={{ fontSize: 24, fontWeight: 600, padding: "24px 32px" }}
        >
          {props?.limitQuestion} question multiple answers
        </div>
        {/*  */}
        {data?.GET_RESULT_TEST && data?.GET_RESULT_TEST?.map((item, key) => (
          <ComponentTestSummary
            isDiabled={true}
            setNumberAnswer={props?.setNumberAnswer}
            key={key}
            {...item}
            index={parseInt(key) + 1}
          ></ComponentTestSummary>
        ))}
      </div>
    </div>
  );
};

// belongs to learn

export const ComponentSummary = (props) => {
  const scroll = Scroll.animateScroll;
  useEffect(() => {
    scroll.scrollToTop();
  }, [scroll]);
  const navigate = useNavigate();
  return (
    <>
      <div className="gfkefdgedfaa" style={{ marginTop: 8 }}>
        <section className="wjewirfjsdas">
          <h3 className="gfgjifdefs">You have completed the lesson!</h3>
          <div className="staticstic">
            <div className="correct-ratio">
              <div className="fidjsfisasf">Result</div>
              <div className="percent">
                {props?.countCorrectAnswer}/{props?.get_term?.count_question} (
                {round(
                  (props?.countCorrectAnswer /
                    props?.get_term?.count_question) *
                    100,
                  0
                )}
                %)
              </div>
            </div>
            <div className="average-time">
              <div className="djskfjddsas">Time</div>
              <div className="time">1 minute</div>
            </div>
          </div>
          <div className="op12">
            {
              props?.isCompleteAgain !== true && <div
              className="dsfgdsfddga"
              onClick={()=> {props.setRetakeWrongAnswer(()=> true);props.setCurrentPage(0)}}
            >
              Retake wrong answers
            </div>
            }
            {
              props?.isCompleteAgain === true && <div
              className="dsfgdsfddga"
              onClick={()=> window.location.reload()}
            >
              Retake term
            </div>
            }
            <div
              className="dsfgdsfddga"
              onClick={() =>
                navigate(
                  `/term/${props?.get_term?.id_term}/${props?.get_term?.title}`
                )
              }
            >
              Back to term
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Test;

const ComponentTestSummary= (props)=> {
  const [select, setSelect] = useState(() => undefined);
  const [answer, setAnswer] = useState(() => undefined);
  const ref = useRef();

  return (
    <div
      role={"button"}
      disabled={true}
      ref={ref}
      className="w-learn"
      data-index={props?.index}
      data-id-question={props?.id_question}
      data-answer={answer}
    >
      <div className="m-learn" style={{ height: "auto" }}>
        <div className="d-learn">
          <div className="tm-learn">Definition</div>
          <div className="q-learn">{props?.question?.split("\n")[0]}</div>
        </div>
        <div className="a-learn">
          <div className="taoijsddada">Choose correct answer</div>
          <div className="w-answer">
            {props?.question
              ?.split("\n")
              ?.slice(1, 5)
              ?.map((item, key) => (
                <Component
                  isSummary={true}
                  compare={item.split(".")[1].trim()}
                  {...props}
                  isDiabled={props?.isDiabled}
                  setCorrectAnswer={props?.setCorrectAnswer}
                  answer={props.answer}
                  setAnswer={setAnswer}
                  id_question={props.id_question}
                  setListAnswer={props?.setListAnswer}
                  setNumberAnswer={props?.setNumberAnswer}
                  setSelect={setSelect}
                  select={select}
                  key={key}
                  index={parseInt(key) + 1}
                  item={item}
                ></Component>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}