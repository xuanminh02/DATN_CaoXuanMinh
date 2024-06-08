import React, { useContext } from "react";
import Navigation from "./Navigation";
import { ListNoLogin, TermContext } from "../Term";
import { UserContext } from "../../../../../App";
import Summary from "./Summary";
import Side1 from "./Side1";

const Video = (props) => {
  const { data } = useContext(TermContext);
  const { auth } = useContext(UserContext);
  return (
    <div>
      <div style={{ display: "flex", padding: 20 }}>
        <div className="w1-201" style={{width: "auto"}}>
          <Navigation></Navigation>
        </div>
        <iframe
          style={{ width: 1200, height: 500, outline: 0, border: "1px solid #000" }}
          title={props?.get_term?.title}
          src={props?.get_term?.video}
        />
      </div>
      <Side1 {...data?.get_term?.author}></Side1>
      {auth === true && <Summary {...data?.get_term}></Summary>}
      {auth === false && <ListNoLogin {...data?.get_term}></ListNoLogin>}
    </div>
  );
};

export default Video;
