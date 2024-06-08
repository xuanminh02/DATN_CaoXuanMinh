import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import AlertDialogSlide from "./Component/Option";
import "./style.sass";

const CreateQuiz = (props) => {
  const [titleQuiz, setTitleQuiz] = useState(() => "");
  const [categoryQuiz, setCategoryQuiz] = useState(() => []);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Helmet>
        <title>Create quiz - Quiz</title>
      </Helmet>
      <div
        className="dsjkldjkejaias"
        style={{
          width: "100%",
          maxWidth: 1340,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AlertDialogSlide
          titleQuiz={titleQuiz}
          setTitleQuiz={setTitleQuiz}
          categoryQuiz={categoryQuiz}
          setCategoryQuiz={setCategoryQuiz}
        />
      </div>
    </div>
  );
};

export default CreateQuiz;
