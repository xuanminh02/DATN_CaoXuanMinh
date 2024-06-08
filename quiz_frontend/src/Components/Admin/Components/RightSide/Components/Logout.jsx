import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { logout } from "../../../../../Firebase/function/logout";

const Logout = (props) => {
  useEffect(() => {
    setTimeout(() => {
      logout();
      window.location.href = window.location.origin;
    }, 2000);
  }, []);
  return (
    <div
      className="jkpsjkfjaersa"
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0,0,0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 56px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 600 }}>
          Logging out&nbsp;&nbsp;
        </div>
        <CircularProgress></CircularProgress>
      </div>
    </div>
  );
};

export default Logout;
