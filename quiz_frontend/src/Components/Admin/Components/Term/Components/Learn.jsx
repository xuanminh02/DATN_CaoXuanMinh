import React, { Fragment, useEffect, useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { ComponentSummary } from "./Test";
import { useMutation } from "@apollo/client";
import mark_user_learn from "../../../../../docs/graphql/mutation/mark_user_learn";
import { useContext } from "react";
import { UserContext } from "../../../../../App";
import USER_LEARN_DETAIL_TERM from "../../../../../docs/graphql/mutation/user_learn_detail_term";
import { NeedLoginToContinue } from "../Term";
import INSERT_TEST from "../../../../../docs/graphql/mutation/insert_test";
import { useQueryString } from "../../../../../docs/f/get_query";
import { useParams } from "react-router-dom";

const Learn = (props) => {
  const navigate = useNavigate();
  const { user, auth } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(() => 0);
  const [countCorrectAnswer, setCountCorrectAnswer] = useState(() => 0);
  const [arrayIdWrongAnswer, setArrayIdWrongAnswer] = useState(() => []);
  const [retakeWrongAnswer, setRetakeWrongAnswer] = useState(() => false);
  // eslint-disable-next-line
  const [mark_user, { data, error, loading }] = useMutation(mark_user_learn, {
    variables: { id_user: user.uid, user_learn: true },
  });
  const sleep = (ms) => new Promise((rel) => setTimeout(rel, ms));
  useEffect(() => {
    (async () => {
      await sleep(30000);
      mark_user();
    })();
  }, [mark_user]);

  return (
    <>
      <Helmet>
        <title>{`Learn: ${props?.get_term?.title} | Quiz`}</title>
      </Helmet>
      <div className="learn">
        <div className="header-learn" style={{ position: "relative" }}>
          <div className="back">
            <div className="rwkowiear" onClick={() => navigate(-1)}>
              <div className="wrap-icon">
                <ArrowBackIosIcon className="icon-main"></ArrowBackIosIcon>
              </div>
              <div className="text-main">Back</div>
            </div>
            <div className="fperdiefdews">
              <div className="wrap-icon">
                <SchoolIcon className="icon-main"></SchoolIcon>
              </div>
              <div className="text-main">Learn</div>
            </div>
          </div>
          <div className="main-title">{props?.get_term?.title}</div>
          <div className="exit-learn">
            <div className="btn-exit" onClick={() => navigate(-1)}>
              <CloseIcon></CloseIcon>
            </div>
          </div>
          {
            <div
              style={{
                width:
                  `calc(${parseInt(countCorrectAnswer)} / ${
                    props?.get_term?.count_question
                  } * 100%)` || 0,
                height: 2.5,
                background: "#7b89c9",
                position: "absolute",
                bottom: 0,
                zIndex: 11,
                left: 0,
              }}
            ></div>
          }
        </div>
        {retakeWrongAnswer === false &&
          auth === true &&
          parseInt(currentPage) < parseInt(props?.get_term?.count_question) && (
            <ComponentLearn1
              arrayIdWrongAnswer={arrayIdWrongAnswer}
              setArrayIdWrongAnswer={setArrayIdWrongAnswer}
              countCorrectAnswer={countCorrectAnswer}
              setCountCorrectAnswer={setCountCorrectAnswer}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              {...props}
            ></ComponentLearn1>
          )}
        {retakeWrongAnswer === false &&
          auth === true &&
          parseInt(currentPage) ===
            parseInt(props?.get_term?.count_question) && (
            <ComponentSummary
              retakeWrongAnswer={retakeWrongAnswer}
              setRetakeWrongAnswer={setRetakeWrongAnswer}
              countCorrectAnswer={countCorrectAnswer}
              setCurrentPage={setCurrentPage}
              arrayIdWrongAnswer={arrayIdWrongAnswer}
              currentPage={currentPage}
              {...props}
            ></ComponentSummary>
          )}
        {auth === false && retakeWrongAnswer === false && (
          <ComponentLearnNotLogin
            countCorrectAnswer={countCorrectAnswer}
            setCountCorrectAnswer={setCountCorrectAnswer}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            {...props}
          ></ComponentLearnNotLogin>
        )}
        {auth === true && retakeWrongAnswer === true && (
          <ComponentWrongAnswer
            retakeWrongAnswer={retakeWrongAnswer}
            setRetakeWrongAnswer={setRetakeWrongAnswer}
            arrayIdWrongAnswer={arrayIdWrongAnswer}
            setArrayIdWrongAnswer={setArrayIdWrongAnswer}
            countCorrectAnswer={countCorrectAnswer}
            setCountCorrectAnswer={setCountCorrectAnswer}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            {...props}
          ></ComponentWrongAnswer>
        )}
      </div>
    </>
  );
};

//

const ComponentWrongAnswer = (props) => {
  // eslint-disable-next-line
  const [select, setSelect] = useState(() => undefined);
  // eslint-disable-next-line
  const [answer, setAnswer] = useState(() => undefined);
  const [countAnswerAgain, setCountAnswerAgain] = useState(() => 0);
  const [correctAnswer, setCorrectAnswer] = useState(() => undefined);
  const [listQuestionWrong, setListQuestionWrong] = useState(() => []);
  const wait = (ms) => new Promise((rel) => setTimeout(rel, ms));
  const ref = useRef();
  useEffect(() => {
    (async () => {
      document.body.style.overflow = "hidden";
      ref.current.classList.add("saadfsdfsdsfsdf");
      await wait(250);
      ref.current?.classList?.remove("saadfsdfsdsfsdf");
      document.body.style.overflow = "auto";
    })();
  }, [props?.currentPage]);
  useEffect(() => {
    setListQuestionWrong(() =>
      props?.get_term?.list_question?.filter(
        (item) => props?.arrayIdWrongAnswer?.includes(item.id_question) === true
      )
    );
  }, [props?.get_term?.list_question, props?.arrayIdWrongAnswer]);
  return (
    <>
      {parseInt(props?.get_term?.count_question) !==
        parseInt(countAnswerAgain) + parseInt(props?.countCorrectAnswer) && (
        <div
          className="w-learn"
          data-index={props?.index}
          data-id-question={props?.id_question}
          data-answer={answer}
        >
          <div
            ref={ref}
            className="m-learn"
            style={{ height: "468px", transition: "all .25s linear" }}
          >
            <div className="d-learn">
              <div className="tm-learn">Definition</div>
              <div className="q-learn">
                {
                  listQuestionWrong[props?.currentPage]?.question?.split(
                    "\n"
                  )[0]
                }
              </div>
            </div>
            <div className="a-learn">
              <div className="taoijsddada">Choose correct answer</div>
              <div className="w-answer">
                {listQuestionWrong[props?.currentPage]?.question
                  ?.split("\n")
                  ?.slice(1, 5)
                  ?.map((item, key) => (
                    <Component1
                      setCountAnswerAgain={setCountAnswerAgain}
                      arrayIdWrongAnswer={props.arrayIdWrongAnswer}
                      setArrayIdWrongAnswer={props.setArrayIdWrongAnswer}
                      {...props}
                      setCountCorrectAnswer={props?.setCountCorrectAnswer}
                      currentPage={props?.currentPage}
                      setCurrentPage={props?.setCurrentPage}
                      setCorrectAnswer={setCorrectAnswer}
                      answer={listQuestionWrong[props?.currentPage]?.answer}
                      id_question={
                        listQuestionWrong[props?.currentPage]?.id_question
                      }
                      key={key}
                      item={item}
                    ></Component1>
                  ))}
              </div>
            </div>
          </div>
          {correctAnswer === false && (
            <div
              className="fksadsfasd"
              style={{
                width: "100%",
                position: "fixed",
                bottom: 0,
                left: 0,
                height: 80,
                background: "#fff",
                padding: "0 24px",
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: 48,
                  borderRadius: 10,
                  background: "#4255ff",
                  padding: "12px 24px",
                  color: "#fff",
                  fontSize: 19,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCorrectAnswer(() => undefined);
                  props?.setCurrentPage((prev) => parseInt(prev) + 1);
                }}
              >
                Continue
              </div>
            </div>
          )}
        </div>
      )}
      {parseInt(props?.get_term?.count_question) ===
        parseInt(countAnswerAgain) + parseInt(props?.countCorrectAnswer) && (
        <ComponentSummary
          isCompleteAgain={true}
          retakeWrongAnswer={props.retakeWrongAnswer}
          setRetakeWrongAnswer={props.setRetakeWrongAnswer}
          countCorrectAnswer={props.countCorrectAnswer}
          setCurrentPage={props.setCurrentPage}
          arrayIdWrongAnswer={props.arrayIdWrongAnswer}
          currentPage={props.currentPage}
          {...props}
        ></ComponentSummary>
      )}
    </>
  );
};

//

// belongs to test

//
export const ComponentLearn = (props) => {
  const [select, setSelect] = useState(() => undefined);
  const [answer, setAnswer] = useState(() => undefined);
  const ref = useRef();
  const [insertTest] = useMutation(INSERT_TEST);

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
                  insertTest={insertTest}
                  isDiabled={props?.isDiabled}
                  setCorrectAnswer={props?.setCorrectAnswer}
                  answer={props.answer}
                  chose={answer}
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
};

//

//

export const Component = (props) => {
  // const [answer, setAnswer]= useState(()=> ({}))
  const queryString = useQueryString();
  const { user } = useContext(UserContext);
  const { id_term } = useParams();
  const f1 = () => {
    props?.insertTest({
      variables: {
        id_test: queryString.get("id_test"),
        id_term,
        id_user: user?.uid,
        id_question: props.id_question,
        correct_answer: props.answer,
        chose_answer: "",
      },
    });
    checkResult();
    props?.setSelect(() => undefined);
    props?.setNumberAnswer((prev) => prev - 1);
    props?.setAnswer(() => undefined);
    // props?.setListChooseAnswer(prev=> ({}))
    props?.setCorrectAnswer((prev) => parseInt(prev) - 1);
  };
  const f2 = (e) => {
    props?.insertTest({
      variables: {
        id_test: queryString.get("id_test"),
        id_term,
        id_user: user?.uid,
        id_question: props.id_question,
        correct_answer: props.answer,
        chose_answer: props?.item?.split(".")[1].trim().toString(),
      },
    });
    if (
      props?.item?.split(".")[1].trim().toString() === props?.answer?.toString()
    ) {
      props?.setCorrectAnswer((prev) => parseInt(prev) + 1);
    }
    checkResult();
    props?.setSelect(() => parseInt(props?.index));
    props?.setAnswer(() => props?.item?.split(".")[1].trim());
    if (props?.select === undefined) {
      props?.setNumberAnswer((prev) => parseInt(prev) + 1);
    }
  };
  const checkResult = (args) => {
    if (
      props?.item?.split(".")[0].trim().toString() === props?.answer.toString()
    ) {
      props?.setListAnswer((prev) => parseInt(prev) + args);
    }
  };
  return (
    <>
      {props.isSummary === true && (
        <>
          <>
            <div
              className="a-answer"
              data-key={props?.index}
              style={{
                borderColor:
                  props.compare.toString() === props.chose_answer.toString() &&
                  props.chose_answer.toString() ===
                    props.correct_answer.toString()
                    ? "#23b26d"
                    : props.compare.toString() ===
                        props.chose_answer.toString() &&
                      props.chose_answer.toString() !==
                        props.correct_answer.toString()
                    ? "#ff9c8c"
                    : "none",
                background:
                  props.compare.toString() === props.chose_answer.toString() &&
                  props.chose_answer.toString() ===
                    props.correct_answer.toString()
                    ? "#f2fbf6"
                    : "#fff",
                pointerEvents: props?.isDiabled === true ? "none" : "all",
              }}
            >
              {!props.chose_answer || props.chose_answer?.length <= 0 ? (
                <>
                  <div style={{ color: "#555" }}>Ommited</div>
                </>
              ) : (
                <>
                  <div className="index-answer">
                    {props.compare.toString() ===
                      props.chose_answer.toString() &&
                    props.chose_answer.toString() ===
                      props.correct_answer.toString() ? (
                      <CheckIcon style={{ color: "#23b26d" }}></CheckIcon>
                    ) : props.compare.toString() ===
                        props.chose_answer.toString() &&
                      props.chose_answer.toString() !==
                        props.correct_answer.toString() ? (
                      <CloseIcon
                        style={{ color: "#ff9c8c", marginTop: 2 }}
                      ></CloseIcon>
                    ) : (
                      props?.item?.split(".")[0].trim()
                    )}
                  </div>
                  <div className="main-answer-1">
                    {props?.item?.split(".")[1].trim()}
                  </div>
                </>
              )}
            </div>
          </>
        </>
      )}
      {props.isSummary !== true && (
        <>
          <div
            className="a-answer"
            onClick={() =>
              parseInt(props?.select) === parseInt(props?.index) ? f1() : f2()
            }
            data-key={props?.index}
            style={{
              borderColor:
                parseInt(props?.select) === parseInt(props?.index)
                  ? "#4257b2"
                  : "#e7e7e7",
              background:
                parseInt(props?.select) === parseInt(props?.index)
                  ? "#eff3fb"
                  : "#fff",
              pointerEvents: props?.isDiabled === true ? "none" : "all",
            }}
          >
            <div className="index-answer">
              {props?.item?.split(".")[0].trim()}
            </div>
            <div className="main-answer-1">
              {props?.item?.split(".")[1].trim()}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Learn;

// belongs to learn

export const ComponentLearn1 = (props) => {
  // eslint-disable-next-line
  const [select, setSelect] = useState(() => undefined);
  // eslint-disable-next-line
  const [answer, setAnswer] = useState(() => undefined);
  const [correctAnswer, setCorrectAnswer] = useState(() => undefined);
  const wait = (ms) => new Promise((rel) => setTimeout(rel, ms));
  const ref = useRef();
  useEffect(() => {
    (async () => {
      document.body.style.overflow = "hidden";
      ref.current.classList.add("saadfsdfsdsfsdf");
      await wait(250);
      ref.current?.classList?.remove("saadfsdfsdsfsdf");
      document.body.style.overflow = "auto";
    })();
  }, [props?.currentPage]);
  return (
    <div
      className="w-learn"
      data-index={props?.index}
      data-id-question={props?.id_question}
      data-answer={answer}
    >
      <div
        ref={ref}
        className="m-learn"
        style={{ height: "468px", transition: "all .25s linear" }}
      >
        <div className="d-learn">
          <div className="tm-learn">Definition</div>
          <div className="q-learn">
            {
              props?.get_term?.list_question[
                props?.currentPage
              ]?.question?.split("\n")[0]
            }
          </div>
        </div>
        <div className="a-learn">
          <div className="taoijsddada">Choose correct answer</div>
          <div className="w-answer">
            {props?.get_term?.list_question[props?.currentPage]?.question
              ?.split("\n")
              ?.slice(1, 5)
              ?.map((item, key) => (
                <Component1
                  arrayIdWrongAnswer={props.arrayIdWrongAnswer}
                  setArrayIdWrongAnswer={props.setArrayIdWrongAnswer}
                  {...props}
                  setCountCorrectAnswer={props?.setCountCorrectAnswer}
                  currentPage={props?.currentPage}
                  setCurrentPage={props?.setCurrentPage}
                  setCorrectAnswer={setCorrectAnswer}
                  answer={
                    props?.get_term?.list_question[props?.currentPage]?.answer
                  }
                  id_question={
                    props?.get_term?.list_question[props?.currentPage]
                      ?.id_question
                  }
                  key={key}
                  item={item}
                ></Component1>
              ))}
          </div>
        </div>
      </div>
      {correctAnswer === false && (
        <div
          className="fksadsfasd"
          style={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            left: 0,
            height: 80,
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: 48,
              borderRadius: 10,
              background: "#4255ff",
              padding: "12px 24px",
              color: "#fff",
              fontSize: 19,
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => {
              setCorrectAnswer(() => undefined);
              props?.setCurrentPage((prev) => parseInt(prev) + 1);
            }}
          >
            Continue
          </div>
        </div>
      )}
    </div>
  );
};
//

const ComponentLearnNotLogin = (props) => {
  // eslint-disable-next-line
  const [select, setSelect] = useState(() => undefined);
  // eslint-disable-next-line
  const [answer, setAnswer] = useState(() => undefined);
  const [correctAnswer, setCorrectAnswer] = useState(() => undefined);
  const wait = (ms) => new Promise((rel) => setTimeout(rel, ms));
  const ref = useRef();
  useEffect(() => {
    (async () => {
      document.body.style.overflow = "hidden";
      ref.current.classList.add("saadfsdfsdsfsdf");
      await wait(250);
      ref.current?.classList?.remove("saadfsdfsdsfsdf");
      document.body.style.overflow = "auto";
    })();
  }, [props?.currentPage]);
  return (
    <Fragment>
      {parseInt(props?.currentPage) >=
      Math.ceil(parseInt(props?.get_term?.count_question) / 3) ? (
        <div className="w-learn">
          <div
            ref={ref}
            className="m-learn"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <NeedLoginToContinue className="fjkjkasssasasa"></NeedLoginToContinue>
          </div>
        </div>
      ) : (
        <div
          className="w-learn"
          data-index={props?.index}
          data-id-question={props?.id_question}
          data-answer={answer}
        >
          <div
            ref={ref}
            className="m-learn"
            style={{ height: "468px", transition: "all .25s linear" }}
          >
            <div className="d-learn">
              <div className="tm-learn">Definition</div>
              <div className="q-learn">
                {
                  props?.get_term?.list_question[
                    props?.currentPage
                  ]?.question?.split("\n")[0]
                }
              </div>
            </div>
            <div className="a-learn">
              <div className="taoijsddada">Choose correct answer</div>
              <div className="w-answer">
                {props?.get_term?.list_question[props?.currentPage]?.question
                  ?.split("\n")
                  ?.slice(1, 5)
                  ?.map((item, key) => (
                    <Component1
                      {...props}
                      setCountCorrectAnswer={props?.setCountCorrectAnswer}
                      currentPage={props?.currentPage}
                      setCurrentPage={props?.setCurrentPage}
                      setCorrectAnswer={setCorrectAnswer}
                      answer={
                        props?.get_term?.list_question[props?.currentPage]
                          ?.answer
                      }
                      id_question={
                        props?.get_term?.list_question[props?.currentPage]
                          ?.id_question
                      }
                      key={key}
                      item={item}
                    ></Component1>
                  ))}
              </div>
            </div>
          </div>
          {correctAnswer === false && (
            <div
              className="fksadsfasd"
              style={{
                width: "100%",
                position: "fixed",
                bottom: 0,
                left: 0,
                height: 80,
                background: "#fff",
                padding: "0 24px",
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: 48,
                  borderRadius: 10,
                  background: "#4255ff",
                  padding: "12px 24px",
                  color: "#fff",
                  fontSize: 19,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCorrectAnswer(() => undefined);
                  props?.setCurrentPage((prev) => parseInt(prev) + 1);
                }}
              >
                Continue
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

//

const Component1 = (props) => {
  // const [answer, setAnswer]= useState(()=> ({}))
  const wait = (ms) => new Promise((rel) => setTimeout(rel, ms));
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const [user_learn_detail_term, { loading, error, data }] = useMutation(
    USER_LEARN_DETAIL_TERM,
    {
      variables: {
        id_user: user?.uid,
        id_term: props?.get_term?.id_term,
        id_question: props?.id_question,
      },
    }
  );
  const [correctAnswer, setCorrectAnswer] = useState(() => undefined);
  const submit = async () => {
    if (props?.setCountAnswerAgain) {
      props?.setCountAnswerAgain((prev) => parseInt(prev) + 1);
    }
    if (props?.item?.split(".")[1].trim().toString() === props.answer) {
      setCorrectAnswer(() => true);
      props?.setCorrectAnswer(() => true);
      await wait(2000);
      props?.setCountCorrectAnswer((prev) => parseInt(prev) + 1);
      props?.setCurrentPage((prev) => parseInt(prev) + 1);
      user_learn_detail_term();
      return;
    }
    props.setArrayIdWrongAnswer((prev) => [...prev, props.id_question]);
    setCorrectAnswer(() => false);
    return props?.setCorrectAnswer(() => false);
  };
  useEffect(() => {
    setCorrectAnswer(() => undefined);
  }, [props?.currentPage]);
  return (
    <div
      className="a-answer"
      onClick={() => submit()}
      style={{
        borderColor:
          correctAnswer === true
            ? "#23b26d"
            : correctAnswer === false
            ? "#ff9c8c"
            : "#e7e7e7",
        backgroundColor: correctAnswer === true ? "#f2fbf6" : "#fff",
        pointerEvents:
          correctAnswer === true
            ? "none"
            : correctAnswer === false
            ? "none"
            : "all",
      }}
    >
      {correctAnswer === undefined && (
        <div className="index-answer">{props?.item?.split(".")[0].trim()}</div>
      )}
      {correctAnswer === true && (
        <CheckIcon style={{ color: "#23b26d", marginRight: 8 }}></CheckIcon>
      )}
      {correctAnswer === false && (
        <CloseIcon
          style={{ color: "#ff9c8c", marginRight: 8, marginTop: 2 }}
        ></CloseIcon>
      )}
      <div className="fdksdasfadsf"></div>
      <div
        className="main-answer-1"
        style={{
          color:
            correctAnswer === true
              ? "#23b26d"
              : correctAnswer === false
              ? "#ff9c8c"
              : "#3a3b3c",
        }}
      >
        {props?.item?.split(".")[1].trim()}
      </div>
    </div>
  );
};
