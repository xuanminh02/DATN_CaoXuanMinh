import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import UPDATE_ANSWER from "../../docs/graphql/mutation/update_answer";
import UPDATE_QUESTION from "../../docs/graphql/mutation/update_question";
import QUERY_EDIT_TERM from "../../docs/graphql/query/query_edit_term";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
import DELETE_QUESTION from "../../docs/graphql/mutation/delete_term";
import ADD_QUESTION from "../../docs/graphql/mutation/add_question";
import { v4 } from "uuid";

const EditTerm = (props) => {
  const { id_term } = useParams();
  const { data } = useQuery(QUERY_EDIT_TERM, {
    variables: {
      id_term,
    },
  });
  return (
    <div style={{ width: "100%", padding: 24 }}>
      <Helmet>
        <title>Edit term</title>
      </Helmet>
      {data?.QUERY_EDIT_TERM?.map((item, key) => (
        <C key={key} {...item}></C>
      ))}
      <AddQuestion />
    </div>
  );
};

const C = (props) => {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const { id_term } = useParams();
  useEffect(() => {
    setQuestion(() => props?.question);
    setAnswer(() => props?.answer);
  }, [props?.question, props?.answer]);
  const [updateQuestion] = useMutation(UPDATE_QUESTION, {
    variables: {
      id_term,
      id_question: props?.id_question,
      question,
    },
  });
  const [updateAnswer] = useMutation(UPDATE_ANSWER, {
    variables: {
      id_term,
      id_question: props?.id_question,
      answer,
    },
  });
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    variables: {
      id_term,
      id_question: props?.id_question,
    },
  });

  return (
    <div
      className="djakawreiujieoa"
      style={{
        width: "100%",
        padding: 24,
        borderRadius: 10,
        border: "1px solid #e7e7e7",
        marginBottom: 16,
        position: "relative",
      }}
    >
      <Tooltip placement={"top"} title={<div>Delete</div>}>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            margin: 10,
            cursor: "pointer",
          }}
          className="wrap-icon"
          onClick={async () => {
            // eslint-disable-next-line
            const { data } = await deleteQuestion();
            return window.location.reload();
          }}
        >
          <DeleteIcon />
        </div>
      </Tooltip>
      <br />
      <div
        onInput={(e) => setQuestion(() => e.target.innerText)}
        style={{ width: "100%", minWidth: 60 }}
        contentEditable={true}
      >
        {props?.question?.split("\n")?.map((item, key) => (
          <div
            style={{ fontSize: 18, fontWeight: 600 }}
            className="saksjkapsjiawqa"
            key={key}
          >
            {item}
          </div>
        ))}
        <br />
      </div>
      <br />
      <div
        onClick={async () => {
          // eslint-disable-next-line
          const { data } = await updateQuestion();
          return window.location.reload();
        }}
        style={{
          padding: "16px 24px",
          background: "#2e89ff",
          width: "max-content",
          color: "#fff",
          fontSize: 18,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Save new question
      </div>
      <br />
      <div
        onInput={(e) => setQuestion(() => e.target.innerText)}
        style={{ width: "100%", minWidth: 40, fontSize: 18, fontWeight: 600 }}
        contentEditable={true}
      >
        {props.answer}
      </div>
      <br />
      <div
        onClick={async () => {
          // eslint-disable-next-line
          const { data } = await updateAnswer();
          return window.location.reload();
        }}
        style={{
          padding: "16px 24px",
          background: "#2e89ff",
          width: "max-content",
          color: "#fff",
          fontSize: 18,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Save new answer
      </div>
      <br />
    </div>
  );
};

const AddQuestion = (props) => {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const { id_term } = useParams();
  const [addQuestion] = useMutation(ADD_QUESTION, {
    variables: {
      id_term,
      question,
      answer,
      id_question: v4(),
    },
  });
  return (
    <>
      <div style={{fontSize: 20, fontWeight: 600}}>Add new question</div>
      <div
        className="sdajklsjalksjkoawqia"
        style={{ marginTop: 16, border: "1px solid #000", borderRadius: 10, padding: 24 }}
      >
        <div>Question</div>
        <div
          onInput={(e) => setQuestion(() => e.target.innerText)}
          style={{
            width: "100%",
            minWidth: 60,
            border: "1px solid #e7e7e7",
            borderRadius: 10,
            fontSize: 18,
            fontWeight: 600
          }}
          contentEditable={true}
        ></div>
        <br />
        <div>Answer</div>
        <div
          onInput={(e) => setAnswer(() => e.target.innerText)}
          style={{
            width: "100%",
            minWidth: 40,
            fontSize: 18,
            fontWeight: 600,
            border: "1px solid #e7e7e7",
            borderRadius: 10,
          }}
          contentEditable={true}
        ></div>
      </div>
      <br />
      <div
        onClick={async () => {
          // eslint-disable-next-line
          const { data } = await addQuestion();
          return window.location.reload();
        }}
        style={{
          padding: "16px 24px",
          background: "#2e89ff",
          width: "max-content",
          color: "#fff",
          fontSize: 18,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Add question
      </div>
    </>
  );
};

export default EditTerm;
