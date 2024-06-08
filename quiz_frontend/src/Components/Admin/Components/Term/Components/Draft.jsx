import React, { Fragment, useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TermContext } from "../Term";
import { Tooltip } from "@mui/material";
import { useRef } from "react";
import { fakesleep } from "../../../../../Firebase/function/fakesleep";
import { loginWithGoogle } from "../../../../../Firebase/function/loginWithGoogle";
import { loginWithFacebook } from "../../../../../Firebase/function/loginWithFacebook";
import { useMutation } from "@apollo/client";
import CREATEUSER from "../../../../../docs/graphql/mutation/create_user";
import { UserContext } from "../../../../../App";
import { AiFillFacebook, AiOutlineGoogle } from "react-icons/ai";

const Draft = (props) => {
  const [flip, setFlip] = useState(() => true);
  const { data } = useContext(TermContext);
  const [currentPage, setCurrentPage] = useState(
    () => data?.get_term?.current_question || 1
  );

  return (
    <div className="draft-term">
      <div className="main-draft-term">
        <Component
          flip={flip}
          setFlip={setFlip}
          currentPage={currentPage}
        ></Component>
      </div>
      <Control
        setFlip={setFlip}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Control>
    </div>
  );
};

const Component = (props) => {
  const [createUser, { error }] = useMutation(CREATEUSER);
  const { setuser, setauth, auth } = useContext(UserContext);
  const ref = useRef();
  const { data } = useContext(TermContext);
  useEffect(() => {
    (async () => {
      ref.current.style.transform = "translateY(-100%)";
      await fakesleep(300);
      ref.current.style.transform = "translateY(0)";
    })();
    // eslint-disable-next-line
  }, [props.currentPage, ref]);
  if (auth === false) {
    return (
      <Fragment>
        {parseInt(props.currentPage) >
        Math.ceil(parseInt(data?.get_term?.count_question) / 3) ? (
          <section
            ref={ref}
            className="wp-main-draft-term"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: "#fff",
              borderRadius: 10,
            }}
          >
            <section style={{ fontSize: 18, fontWeight: 600 }}>
              You need login to continue
            </section>
            <section style={{ width: "100%" }}>
              <div
                className="fjsjkaljskajfssasasas"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 58,
                  padding: 16,
                  background: "#dddddd",
                  border: 10,
                  marginTop: 10,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() =>
                    loginWithGoogle(setuser, setauth, createUser, error)
                  }
                >
                  <div style={{ marginTop: 4 }}>
                    <AiOutlineGoogle></AiOutlineGoogle>
                  </div>
                  &nbsp;
                  <span style={{ fontSize: 18, fontWeight: 600 }}>
                    Login with Google
                  </span>
                </div>
              </div>
              <div
                className="fjsjkaljskajfssasasas"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 58,
                  padding: 16,
                  background: "#dddddd",
                  border: 10,
                  marginTop: 10,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() =>
                    loginWithFacebook(setuser, setauth, createUser, error)
                  }
                >
                  <div style={{ marginTop: 4 }}>
                    <AiFillFacebook></AiFillFacebook>
                  </div>
                  &nbsp;
                  <span style={{ fontSize: 18, fontWeight: 600 }}>
                    Login with Facebook
                  </span>
                </div>
              </div>
            </section>
          </section>
        ) : (
          <div
            ref={ref}
            className="wp-main-draft-term"
            onClick={() => props?.setFlip((prev) => !prev)}
          >
            <div
              className="q-main-draft-term"
              style={{
                opacity: props?.flip === true ? 1 : 0,
                transform:
                  props?.flip === false ? "rotateX(270deg)" : "rotateX(0)",
                userSelect: "none",
              }}
            >
              {
                data?.get_term?.list_question[
                  props?.currentPage - 1
                ]?.question?.split("\n")[0]
              }
            </div>
            <div
              className="a-main-draft-term"
              style={{
                opacity: props?.flip === true ? 0 : 1,
                transform:
                  props?.flip === false ? "rotateX(0)" : "rotateX(270deg)",
                userSelect: "none",
              }}
            >
              {data?.get_term?.list_question[props?.currentPage - 1]?.answer}
            </div>
          </div>
        )}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {auth === true && (
          <div
            ref={ref}
            className="wp-main-draft-term"
            onClick={() => props?.setFlip((prev) => !prev)}
          >
            <div
              className="q-main-draft-term"
              style={{
                opacity: props?.flip === true ? 1 : 0,
                transform:
                  props?.flip === false ? "rotateX(270deg)" : "rotateX(0)",
                userSelect: "none",
              }}
            >
              {
                data?.get_term?.list_question[
                  props?.currentPage - 1
                ]?.question?.split("\n")[0]
              }
            </div>
            <div
              className="a-main-draft-term"
              style={{
                opacity: props?.flip === true ? 0 : 1,
                transform:
                  props?.flip === false ? "rotateX(0)" : "rotateX(270deg)",
                userSelect: "none",
              }}
            >
              {data?.get_term?.list_question[props?.currentPage - 1]?.answer}
            </div>
          </div>
        )}
      </Fragment>
    );
  }
};

const Control = (props) => {
  const { data } = useContext(TermContext);
  return (
    <div className="control-draft-term">
      <div className="no-m"></div>
      <MainControl {...props} {...data?.get_term}></MainControl>
      <Option {...data?.get_term}></Option>
    </div>
  );
};

const MainControl = (props) => {
  return (
    <div className="main-control-draft-term">
      <button
        disabled={props?.currentPage <= 1 ? true : false}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="vl-492"
        onClick={() => {
          props?.setCurrentPage((prev) => parseInt(prev) - 1);
          props?.setFlip(() => true);
        }}
      >
        <ArrowRightAltIcon></ArrowRightAltIcon>
      </button>
      <CurrentPage {...props}></CurrentPage>
      <button
        disabled={props?.currentPage >= props?.count_question ? true : false}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="js-921"
        onClick={() => {
          props?.setCurrentPage((prev) => parseInt(prev) + 1);
          props?.setFlip(() => true);
        }}
      >
        <ArrowRightAltIcon></ArrowRightAltIcon>
      </button>
    </div>
  );
};

const CurrentPage = (props) => {
  return (
    <div className="cp-draft-term">
      {props?.currentPage || 1}/{props?.count_question}
    </div>
  );
};

const Option = (props) => {
  const navigate = useNavigate();
  const { data } = useContext(TermContext);
  return (
    <Tooltip title={<div>Full screen</div>}>
      <div
        className="op-draft-term"
        style={{ background: "#fff", borderRadius: "50%" }}
        onClick={() =>
          navigate(
            `/term/${data?.get_term?.id_term}/${data?.get_term?.title
              ?.toString()
              .toLowerCase()
              .replaceAll(" ", "-")}/flashcards`
          )
        }
      >
        <FullscreenIcon style={{color: "#2e89ff",}}></FullscreenIcon>
      </div>
    </Tooltip>
  );
};

export default Draft;
