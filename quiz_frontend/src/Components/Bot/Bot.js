import React, { useState } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import "./style.sass";
import { CSSTransition } from "react-transition-group";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import { useEffect } from "react";
import { Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import { Link, useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import SEARCH_BOT from "../../docs/graphql/query/search_bot";
import { useContext } from "react";
import { UserContext } from "../../App";

const Bot = (props) => {
  const [extend, setExtend] = useState(() => false);
  const [message, setMessage] = useState(() => [
    { content: "Hello, How can I help you? ", is_user: false },
  ]);
  // eslint-disable-next-line

  return (
    <div
      className="bfkflgdkfgfdf"
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        padding: 24,
        zIndex: 999,
      }}
    >
      {
        <CSSTransition
          in={extend}
          timeout={200}
          classNames="open-bot"
          unmountOnExit
        >
          <div
            style={{
              width: 350,
              height: 400,
              borderRadius: 10,
              background: "#fff",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              padding: 10,
              transformOrigin: "10px calc(100% - 10px)",
            }}
          >
            <Title setExtend={setExtend}></Title>
            <FrameChat
              loading={false}
              setExtend={setExtend}
              message={message}
              setMessage={setMessage}
            ></FrameChat>
            <ChatToBot message={message} setMessage={setMessage}></ChatToBot>
          </div>
        </CSSTransition>
      }
      {extend === false && (
        <div onClick={() => setExtend((prev) => !prev)}>
          <div className="wrap-icon">
            <SmartToyIcon
              className="fjwfgdkfgfddsfg"
              style={{
                width: 60,
                height: 60,
                color: "#2e89ff",
                opacity: 0.5,
                cursor: "pointer",
                position: "absolute",
                left: 0,
                bottom: 0,
                padding: 24,
                boxSizing: "content-box",
              }}
            ></SmartToyIcon>
          </div>
        </div>
      )}
    </div>
  );
};

const Title = (props) => {
  return (
    <div
      className="gjrgrpadmsgksf"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 600 }}>Bot</div>
      <div
        onClick={() => props?.setExtend(() => false)}
        style={{
          cursor: "pointer",
          borderRadius: "50%",
          padding: 8,
          background: "#f2f0f5",
        }}
      >
        <div className="wrap-icon">
          <CloseIcon></CloseIcon>
        </div>
      </div>
    </div>
  );
};

const FrameChat = (props) => {
  const myRef = useRef();
  useEffect(() => {
    myRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [myRef]);
  return (
    <div
      className="gjrgjerjedfl"
      style={{ width: "100%", height: "calc(100% - 90px)", overflow: "auto" }}
    >
      {
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="wrap-icon">
            <SmartToyIcon style={{ width: 24, height: 24, color: "#2e89ff", }}></SmartToyIcon>
          </div>
          <div style={{ fontWeight: 600 }}>Chatbot automatic system</div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              marginTop: 6,
            }}
          >
            <ComponentOption></ComponentOption>
            <ComponentOption1 setExtend={props?.setExtend}></ComponentOption1>
            <ComponentOption2 setExtend={props?.setExtend}></ComponentOption2>
          </div>
        </div>
      }
      {props?.message?.map((item, key) => (
        <DetailMessage key={key} {...item}></DetailMessage>
      ))}
      {/* {props?.loading === true && (
        <DetailMessage
          is_user={false}
          content={
            <div class="balls">
              <div></div>
              <div></div>
              <div></div>
            </div>
          }
        ></DetailMessage>
      )} */}
      <div ref={myRef} className="dklrjkerfggfg" style={{ height: 1 }}></div>
    </div>
  );
};

const ComponentOption = (props) => {
  return (
    <div
      className="dfkfgeorkdwkwaow"
      style={{
        flex: "1 1 0",
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #e7e7e7",
        borderRadius: 80,
        overflow: "hidden",
        gap: 10,
        padding: 8,
        cursor: "pointer",
      }}
    >
      <div className="wrap-icon">
        <SearchIcon></SearchIcon>
      </div>
      <input
        type="text"
        placeholder="Search term or class what you looking for"
        style={{
          flex: "1 1 0",
          border: "none",
          outline: "none",
          height: "100%",
          fontWeight: 600,
          overflow: "hidden",
        }}
      />
    </div>
  );
};
const ComponentOption1 = (props) => {
  return (
    <div
      className="dfkfgeorkdwkwaow"
      style={{
        flex: "1 1 0",
        height: 40,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "1px solid #e7e7e7",
        borderRadius: 80,
        overflow: "hidden",
        gap: 10,
        padding: 8,
        cursor: "pointer",
      }}
    >
      <Link
        onClick={() => props?.setExtend(() => false)}
        to="/activities/created"
        style={{
          display: "flex",
          color: "#3a3b3c",
          textDecoration: "none",
          justifyContent: "flex-start",
        }}
      >
        <div
          onClick={() => props?.setExtend(() => false)}
          className="wrap-icon"
        >
          <SchoolIcon></SchoolIcon>
        </div>
        <div
          style={{ overflow: "hidden", whiteSpace: "nowrap", fontWeight: 600 }}
        >
          Your term
        </div>
      </Link>
    </div>
  );
};
const ComponentOption2 = (props) => {
  return (
    <div
      className="dfkfgeorkdwkwaow"
      style={{
        flex: "1 1 0",
        height: 40,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        border: "1px solid #e7e7e7",
        borderRadius: 80,
        overflow: "hidden",
        gap: 10,
        padding: 8,
        cursor: "pointer",
      }}
    >
      <Link
        onClick={() => props?.setExtend(() => false)}
        to="/classes"
        style={{
          display: "flex",
          color: "#3a3b3c",
          textDecoration: "none",
          justifyContent: "flex-start",
        }}
      >
        <div className="wrap-icon">
          <ClassIcon></ClassIcon>
        </div>
        <div
          style={{ overflow: "hidden", whiteSpace: "nowrap", fontWeight: 600 }}
        >
          Your classes
        </div>
      </Link>
    </div>
  );
};

const DetailMessage = (props) => {
  const myRef = useRef();
  return (
    <div
      ref={myRef}
      className="gkrgkrgfdfds"
      style={{
        fontSize: 18,
        fontWeight: 600,
        padding: "8px",
        width: "100%",
        display: "flex",
        flexDirection: props?.is_user === true ? "row-reverse" : "row",
      }}
    >
      <div
        style={{
          width: "max-content",
          background: props?.is_user === true ? "#2e89ff" : "#f2f0f5",
          fontSize: 18,
          fontWeight: 600,
          color: props?.is_user === true ? "#fff" : "#3a3b3c",
          borderRadius: 10,
          padding: "8px 12px",
          maxWidth: "50%",
          height: "auto",
        }}
      >
        {props.content}
      </div>
    </div>
  );
};

const ChatToBot = (props) => {
  const navigate= useNavigate()
  // eslint-disable-next-line
  const [searchBot, { data, loading, error }] = useLazyQuery(SEARCH_BOT);
  const { user } = useContext(UserContext);
  const [content, setContent] = useState(() => "");
  //eslint-disable-next-line
  const sendMessage = async (e) => {
    searchBot({
      variables: { id_user: user?.uid, query_search: content },
    });
    props?.setMessage((prev) => [...prev, { content: content, is_user: true }]);
    props?.setMessage((prev) => [
      ...prev,
      {
        content: "These are what i found out, hope it can help you",
        is_user: false,
      },
    ]);
    setContent(() => "");
  };
  useEffect(() => {
    if (data?.SEARCH_BOT?.term?.length > 0) {
      props?.setMessage((prev) => [
        ...prev,
        {
          content: data?.SEARCH_BOT?.term?.map((item, key) => (
            <TemplateTerm key={key} {...item}></TemplateTerm>
          )),
          is_user: false,
        },
      ]);
    }
    if (data?.SEARCH_BOT?.class?.length > 0) {
      props?.setMessage((prev) => [
        ...prev,
        {
          content: data?.SEARCH_BOT?.class?.map((item, key) => (
            <TemplateClass key={key} {...item}></TemplateClass>
          )),
          is_user: false,
        },
      ]);
    }
    // eslint-disable-next-line
  }, [data]);
  return (
    <div
      className="fkwerrjdeiorowaj"
      style={{
        height: 50,
        width: "100%",
        padding: "5px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
    >
      <input
        onKeyUp={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type anything what ever you want"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="jdrijsiotjsiersd"
        style={{
          height: "100%",
          borderRadius: 80,
          border: "1px solid #e7e7e7",
          flex: "1 1 0",
          padding: 8,
          fontSize: 16,
          fontWeight: 600,
          outlineColor: "#2e89ff",
        }}
      />
      <span>
        <Tooltip
          style={{ pointerEvents: "auto" }}
          placement="top"
          dir="top"
          title={<span>Send</span>}
        >
          <button
            disabled={content?.trim()?.length <= 0 ? true : false}
            onClick={() => sendMessage()}
            className="wrap-icon"
            style={{
              cursor: content?.trim()?.length <= 0 ? "not-allowed" : "pointer",
              border: "none",
              outline: "none",
              padding: 8,
              background: "#f2f0f5",
              borderRadius: "50%",
            }}
          >
            <SendIcon style={{ color: "#3a3b3c" }}></SendIcon>
          </button>
        </Tooltip>
      </span>
    </div>
  );
};

export default Bot;

const TemplateTerm = (props) => {
  const navigate = useNavigate();
  return (
    <Link
      className="sjkldhalkjsdjklasas"
      style={{ textDecoration: "none", color: "#3a3b3c", borderTop: "1px solid #000"}}
      to={`/term/${props?.id_term}/${props?.title}`}
    >
      <div className="sjkhdajksdhjnsjlasda" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <div
          className="sjkdjalksjaklsasas"
          style={{
            fontSize: 18,
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="kjsfhjkasdjklasas" style={{ fontSize: 18, fontWeight: 600 }}>{props?.title}</div>
          <div className="ksufjsildjialsjals" style={{ fontSize: 14 }}>Term</div>
        </div>
        <br />
        <div className="jlkdsjkljdsaasdssads" style={{ fontSize: 18 }}>{props?.description}</div>
        <br />
        <div
          className="sfjkdajskljkldssasa"
          onClick={() => navigate(`/profile/${props?.author_id}`)}
          style={{ display: "flex", alignItems: "center", gap: 5 }}
        >
          <img
            className="kjhsfjsdlkjkldasas"
            alt={"open"}
            src={props?.author_photoURL}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          ></img>
          <div className="hskdjsdkljdklajsakls" style={{ fontSize: 14 }}>{props?.author_displayName}</div>
        </div>
      </div>
    </Link>
  );
};

const TemplateClass = (props) => {
  const navigate = useNavigate();
  return (
    <Link
      className="jslkdjakldjasklaas"
      style={{ textDecoration: "none", color: "#3a3b3c" }}
      to={`/class/${props?.id_class}`}
    >
      <div className="fjkldjasdkljaklsas" style={{ width: "100%", display: "flex", flexDirection: "column", marginTop: 8}}>
        <div
          className="kldjaklsjaklsas"
          style={{
            fontSize: 18,
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="fkldjksdjiokteds" style={{ fontSize: 18, fontWeight: 600 }}>
            {props?.class_name}
          </div>
          <div className="jkljasiodsjdsda" style={{ fontSize: 14 }}>Class</div>
        </div>
        <br />
        <div className="dsjiodjaisoas" style={{ fontSize: 18 }}>{props?.description}</div>
        <br />
        <div
          className="sjkldjkalskjasas"
          onClick={() => navigate(`/profile/${props?.author_id}`)}
          style={{ display: "flex", alignItems: "center", gap: 5 }}
        >
          <img
            className="skofdjskdljasas"
            alt={"open"}
            src={props?.author_photoURL}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          ></img>
          <div className="dklsdjakdjkosa" style={{ fontSize: 14 }}>{props?.author_displayName}</div>
        </div>
      </div>
    </Link>
  );
};
