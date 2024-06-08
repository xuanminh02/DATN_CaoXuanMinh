import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import CHECK_USER_JOIN_ALL_CLASS from "../../../docs/graphql/query/check_user_join_all_class";
import NoJoinClasses from "./Components/NoJoinClasses";
import "./style.sass";

const Classes = (props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(CHECK_USER_JOIN_ALL_CLASS, {
    variables: {
      id_user: user?.uid,
    },
  });
  return (
    <>
      <Helmet>
        <title>Classes | Quiz</title>
      </Helmet>
      <div className="classes max-height" style={{ background: "#f2f0f5" }}>
        {data && data?.check_user_join_all_class?.length <= 0 && (
          <NoJoinClasses></NoJoinClasses>
        )}
        {data && data?.check_user_join_all_class?.length > 0 && (
          <div style={{ width: "100%" }}>
            <div
              style={{
                margin: "16px 0",
                fontSize: 18,
                fontWeight: 600,
                width: "100%",
              }}
            >
              Your class:{" "}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {data?.check_user_join_all_class?.map((item, key) => (
                <div
                  key={key}
                  className="dvkadvads3233fvdds"
                  style={{ width: "calc(25% - 10px)", background: "#f2f0f5" }}
                >
                  <ClassJoin key={key} {...item}></ClassJoin>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const ClassJoin = (props) => {
  const navigate= useNavigate()
  return (
    <div
      onClick={()=> navigate(`/class/${props?.id_class}/`)}
      className="dvkadvadsfvdds"
      style={{
        padding: 16,
        borderRadius: 10,
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <div className="fjklsjklwasqwreawer" style={{ fontSize: 20 }}>
        {props?.class_name}
      </div>
      <br />
      <div
        className="sljfhjdjlskdjlkejalesw"
        style={{
          width: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Description: <strong>{props?.description}</strong>
      </div>
      <br />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        Created by:{" "}
        <img
          className="sjkfdhjslkdjrfioaewsa"
          src={props?.photoURL}
          alt=""
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <strong className="dfihjsiodjiodfwjeas">{props?.displayName}</strong>
      </div>
    </div>
  );
};

export default Classes;
