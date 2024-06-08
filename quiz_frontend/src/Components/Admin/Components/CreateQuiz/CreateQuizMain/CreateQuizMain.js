import React from "react";
import CreateQuestion from "./Component/CreateQuestion";

const CreateQuizMain = (props) => {
  return (
    <div
      className="djaklsjaklsjaksasa"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="dkjsjaksjakawewa"
        style={{ width: "100%", maxWidth: 1160, padding: 10, borderRadius: 10 }}
      >
        <CreateQuestion />
      </div>
    </div>
  );
};

export default CreateQuizMain;
