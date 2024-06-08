import { useLazyQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../../../../App";
import QUERY_TERM from "../../../../../docs/graphql/query/query_term";
import { C3 } from "./DetailClass";

const MyTerm = (props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const [queryTerm, { loading, data, error }] = useLazyQuery(QUERY_TERM);
  return (
    <>
      <div
        onClick={() => queryTerm({ variables: { uid: user?.uid, type: 1 } })}
        className="jffdgkdadfdssd"
        style={{
          fontWeight: 600,
          padding: "12px 4px",
          cursor: "pointer",
        }}
      >
        Your term
      </div>
      <br />
      {loading === true && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress></CircularProgress>
        </div>
      )}
      {loading === false &&
        data?.query_term?.length > 0 &&
        data?.query_term?.map((item, key) => <C3 setOpen={props?.setOpen} key={key} {...item}></C3>)}
    </>
  );
};

export default MyTerm;
