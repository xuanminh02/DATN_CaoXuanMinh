import React, { useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useMutation, useQuery } from "@apollo/client";
import USER_LEARNING_TERM from "../../../../../docs/graphql/query/user_learing_term";
import { useContext } from "react";
import { UserContext } from "../../../../../App";
import MARK_STAR from "../../../../../docs/graphql/mutation/mark_star";
import { useState } from "react";
import { CircularProgress, Tooltip } from "@mui/material";
import _ from "lodash"

const Summary = (props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, loading, error } = useQuery(USER_LEARNING_TERM, {
    variables: {
      id_user: user?.uid,
      id_term: props?.id_term,
    },
  });
  //   const
  return (
    <div className="summary">
      <br />
      <br />
      <div className="st-291">
        Terminology to learn in this course ({props?.count_question})
      </div>
      <br />
      <Learning {...data} {...props}></Learning>
      <NotLearn {...data} {...props}></NotLearn>
    </div>
  );
};

const Learning = (props) => {
  return (
    <div className="learning">
      <div className="w1-learning">
        <div className="t-learning">
          Learning ({props?.USER_LEARNING_TERM?.length})
        </div>
        <div className="m-learning">
          You have already started learning these terms. Continue to promote
          offline!
        </div>
      </div>
      <br />
      {props?.USER_LEARNING_TERM?.length > 0 &&
        props?.USER_LEARNING_TERM?.map((item, key) => (
          <ComponentLearn key={key} {...item} {...props}></ComponentLearn>
        ))}
    </div>
  );
};

const NotLearn = (props) => {
  // const { user }= useContext(UserContext)
  // eslint-disable-next-line
  if (props?.USER_LEARNING_TERM && props?.list_question) {
    return (
      <div className="not-learn">
        <div className="oe-293">
          <div className="kawoepksda">
            Not learn (
            {props?.count_question - props?.USER_LEARNING_TERM?.length})
          </div>
          <div className="dkjweiewaw">You've not learnt terminologies yet</div>
        </div>
        <br />
        {props?.list_question?.length > 0 &&
            _.differenceWith(props?.list_question?.map(item=> item?.id_question)?.toString()?.split(","), props?.USER_LEARNING_TERM?.map((item)=> item?.id_question).toString()?.split(","), _.isEqual)
            ?.map((item, key) => (
              <ComponentNotLearn list_question={props?.list_question} key={key} id_question={item}></ComponentNotLearn>
            ))}
      </div>
    );
  } else {
    return <CircularProgress></CircularProgress>;
  }
};

export const ComponentLearn = (props) => {
  const { user } = useContext(UserContext);
  const [isStar, setIsStar] = useState();
  // eslint-disable-next-line
  const [markStar, { data, loading, error }] = useMutation(MARK_STAR, {
    variables: {
      id_user: user?.uid,
      id_term: props?.id_term,
      id_question: props?.id_question,
      is_star: !isStar,
    },
  });
  useEffect(() => {
    setIsStar(() => props.is_star);
  }, [props.is_star]);
  return (
    <div className="cp-learn" style={{backgroundColor: "#dddddd"}}>
      <div className="q-learn">{props?.answer}</div>
      <strong>|</strong>
      <div className="a-learn">{props?.question?.split("\n")[0]?.trim()}</div>
      {
        props?.notLogin !== true &&
        <Tooltip
          title={<div>{isStar === true ? "remove star" : "mark star"}</div>}
        >
          <div
            className="f-learn"
            style={{ cursor: "pointer" }}
            onClick={() => {
              markStar();
              setIsStar((prev) => !prev);
            }}
          >
            <StarIcon
              style={{ color: isStar === true ? "#ffb000" : "#3a3b3c" }}
            ></StarIcon>
          </div>
        </Tooltip>
      }
    </div>
  );
};

const ComponentNotLearn= (props)=> {
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  return (
    <>
      {
        props?.list_question?.filter((item ,key)=> item?.id_question?.toString() === props?.id_question.toString())?.map((item, key)=> <div key={key} className="cp-learn" style={{backgroundColor: "#dddddd"}}>
        <div className="q-learn">{item?.answer}</div>
        <strong>|</strong>
        <div className="a-learn">{item?.question?.split("\n")[0]?.trim()}</div>
      </div>)
      }
    </>
  );
}

export default Summary;
