import React, { useContext } from "react";
import BriefUser from "./Components/BriefUser/BriefUser";
import JoinGameSearch from "./Components/JoinGameSearch/JoinGameSearch";
import { Helmet } from "react-helmet-async";
import "./style.sass";
import { UserContext } from "../../App";
import { useQuery } from "@apollo/client";
import LEARNING_TERM from "../../docs/graphql/query/learning_term";
import { Link } from "react-router-dom";
import { memo } from "react";
import {  Skeleton } from "@mui/material";
// import NavigationResponsive from '../NavigationResponsive/NavigationResponsive'
// import MainTitle from '../Settings/Components/MainTitle'

const Main = (props) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Helmet>
        <title>Home | Quiz</title>
      </Helmet>
      <div className="main-app max-height">
        <div className="container-1">
          <div className="wrapper-1">
            <JoinGameSearch></JoinGameSearch>
            {user?.data?.userLogin && <BriefUser></BriefUser>}
          </div>
          <div className="title-search-by-topics">Recent</div>
          <Latest></Latest>
        </div>
      </div>
    </>
  );
};

const Latest = (props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, loading, error } = useQuery(LEARNING_TERM, {
    variables: {
      id_user: user?.uid || "",
    },
  });
  if(user?.uid) {

    return (
      <div
        className="ghjdhjiorhoiweesa"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {data?.LEARNING_TERM?.length > 0 &&
          data?.LEARNING_TERM?.map((item, key) => (
            <div
              style={{
                padding: 24,
                cursor: "pointer",
                borderRadius: 10,
                background: "#f2f0f5",
                width: "25%",
              }}
              key={key}
            >
              <Link
                style={{ color: "#3a3b3c", textDecoration: "none" }}
                to={`/term/${item?.id_term}/${item?.title?.replaceAll(" ", "-")}`}
              >
                <div className="gdlkjkladsjklasdj" style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>
                  {item?.title}
                </div>
                <div className="djsiledjiaowjasa" style={{ fontSize: 18, marginBottom: 8, width: "100%", overflow: 'hidden', textOverflow: "ellipsis", whiteSpace:"nowrap"}}>
                  {item?.description}
                </div>
                <div className="fjilkedjaskjkssa"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="fjskldjklsjaklsf">{item?.count_question} questions</div>
                  <div className="fjkldjsakldjkslasd"></div>
                </div>
                <br />
                <br />
              </Link>
              <NavigateProfile {...item}></NavigateProfile>
            </div>
          ))}
        {loading === true && (
          <>
            {Array.from(Array(8).keys()).map((item, key) => (
              <Skeleton
                key={key}
                style={{ width: "calc(25% - 10px)", height: 200 }}
                animation={"wave"}
                variant={"rectangular"}
              ></Skeleton>
            ))}
          </>
        )}
        {loading === false && data?.LEARNING_TERM?.length <= 0 && (
          <div style={{fontSize: 20}}>
            You're not learn any term
          </div> 
        )}
      </div>
    );
  } 
  else {
    return (
      <div style={{width: "100%", display: "flex", alignItems: 'center', flexWrap: "wrap", gap: 10}}>
        <div style={{fontSize: 18}}>You need login to see recent activities</div>
      </div>
    )
  }
};

export const NavigateProfile = memo((props) => {
  return (
    <Link to={`/profile/${props?.own_id}`} style={{textDecoration: "none", color: "#3a3b3c"}}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            alt={"open"}
            src={props?.photoURL}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              objectFit: "cover",
            }}
            referrerPolicy={"no-referrer"}
          ></img>
        </div>
        <div className="dkosdkasafddfsdds" style={{ fontSize: 16, fontWeight: 600, whiteSpace: "nowrap",  }}>{props?.displayName}</div>
      </div>
    </Link>
  );
});

export default Main;

