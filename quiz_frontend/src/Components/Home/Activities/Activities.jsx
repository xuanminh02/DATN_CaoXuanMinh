import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import MenuLevel2 from "./Components/MenuLevel2";
import "./style.sass";
import { Navigate, Route, Routes } from "react-router-dom";
import CommonComponent from "./Components/CommonComponent";
import { UserContext } from "../../../App";
import { useQuery } from "@apollo/client";
import LEARNING_TERM from "../../../docs/graphql/query/learning_term";
import { Skeleton } from "@mui/material";
import { NavigateProfile } from "../Main";
import { Link } from "react-router-dom";

const Activities = (props) => {
  return (
    <div style={{ minHeight: "calc(100vh - 56px)", background: "#f2f0f5" }}>
      <Helmet>
        <title>Activities | Quiz</title>
      </Helmet>
      <div className="a-activities max-height">
        <MenuLevel2></MenuLevel2>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Navigate replace to={"/activities/running"}></Navigate>}
        />
        <Route
          index={true}
          path="/running"
          element={<LearningComponent></LearningComponent>}
        ></Route>
        <Route
          path="/created"
          element={<CommonComponent></CommonComponent>}
        ></Route>
      </Routes>
    </div>
  );
};

export default Activities;

const LearningComponent = (props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, loading, error } = useQuery(LEARNING_TERM, {
    variables: {
      id_user: user?.uid,
    },
  });
  return (
    <div className="gjiofjgfdkfsds" style={{ display: "flex", padding: 24 }}>
      <div className="wrapper-cm-component" style={{ width: "100%" }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 8,
            width: "100%",
          }}
        >
          Running
        </div>

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
                  background: "#fff",
                  width: "calc(25% - 10px)",
                }}
                key={key}
              >
                <Link
                  style={{ color: "#3a3b3c", textDecoration: "none" }}
                  to={`/term/${item?.id_term}/${item?.title?.replaceAll(
                    " ",
                    "-"
                  )}`}
                >
                  <div className="djskldjaklsjksas"
                    style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}
                  >
                    {item?.title}
                  </div>
                  <div className="fkldjskljasassaa" style={{ fontSize: 18, marginBottom: 8 , width: "100%", overflow: 'hidden', textOverflow: "ellipsis", whiteSpace:"nowrap"}}>
                    {item?.description}
                  </div>
                  <div className="fjkaerjskalejaksase"
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="dfkojkalsjaklse">{item?.count_question} questions</div>
                    <div className="fjaioajsialsrw"></div>
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
            <div className="fjkldjsoejwaoijas">
              You don't have any activity running
            </div>
          )}
        </div>
        <br />
      </div>
    </div>
  );
};
