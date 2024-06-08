import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Helmet } from "react-helmet-async";
import "./style.sass";

const SkeletonAuth = (props) => {
  return (
    <>
      <Helmet>
        <title>Loading...</title>
      </Helmet>
      <div className="skeleton-auth">
        <div className="skeleton-auth-header">
          <Skeleton
            className="skeleton-main"
            animation="wave"
            variant="rectangular"
            duration={0.05}
          />
        </div>
        <div className="skeleton-auth-main">
          <div className="vl-324">
            <div className="or-952">
              <div className="re-495">
                <Skeleton
                  className="skeleton-main"
                  animation="wave"
                  variant="rectangular"
                  duration={0.05}
                />
              </div>
              <div className="tp-204">
                <Skeleton
                  className="skeleton-main"
                  animation="wave"
                  variant="rectangular"
                  duration={0.05}
                />
              </div>
            </div>
            <div className="it-951">
              <div className="ew-459">
                <Skeleton
                  className="skeleton-main"
                  animation="wave"
                  variant="rectangular"
                  duration={0.05}
                />
              </div>
            </div>
            <div className="kc-715">
              <div className="fe-493">
                <Skeleton
                  className="skeleton-main"
                  animation="wave"
                  variant="rectangular"
                  duration={0.05}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{width: "100%", display: "flex", justifyContent: 'center',alignItems: "center"}}>
          <div
            style={{
              maxWidth: 1244,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 10,
              justifyContent: "center",
            }}
          >
            {Array.from(Array(8).keys()).map((item, key) => (
              <Skeleton
                key={key}
                style={{ width: "calc(25% - 10px)", height: 200 }}
                animation={"wave"}
                variant={"rectangular"}
              ></Skeleton>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonAuth;
