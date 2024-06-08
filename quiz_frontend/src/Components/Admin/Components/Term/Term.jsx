import { useMutation, useQuery } from "@apollo/client";
import React, { createContext, Fragment } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Routes, Route, useParams } from "react-router-dom";
import { UserContext } from "../../../../App";
import ACCESS_LEARN_TERM from "../../../../docs/graphql/mutation/access_learn_term";
import CREATEUSER from "../../../../docs/graphql/mutation/create_user";
import GET_TERM from "../../../../docs/graphql/query/get_term";
import { loginWithFacebook } from "../../../../Firebase/function/loginWithFacebook";
import { loginWithGoogle } from "../../../../Firebase/function/loginWithGoogle";
// import NotFound404 from "../../../NotFound/NotFound404";
import Draft from "./Components/Draft";
import FlashCards from "./Components/FlashCards";
import Learn from "./Components/Learn";
import Navigation from "./Components/Navigation";
import Side1 from "./Components/Side1";
import Summary, { ComponentLearn } from "./Components/Summary";
import Test from "./Components/Test";
import TitleTerm from "./Components/TitleTerm";
import "./style.sass";
import { AiOutlineGoogle, AiFillFacebook } from "react-icons/ai";
import NotFound404 from "../../../NotFound/NotFound404";

export const TermContext = createContext();
const Term = (props) => {
  const { user, auth } = useContext(UserContext);
  const { id_term } = useParams();
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(GET_TERM, {
    variables: {
      uid: user?.uid || "",
      id_term,
    },
  });
  const [accessLearnTerm] = useMutation(ACCESS_LEARN_TERM, {
    variables: {
      id_user: user?.uid || "",
      id_term: id_term || "",
      time_access: new Date(),
      own_id: data?.get_term?.author?.uid || "",
    },
  });
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
  useEffect(() => {
    (async () => {
      await sleep(30000);
      accessLearnTerm();
    })();
  }, [accessLearnTerm]);
  if (auth === true) {
    return (
      <Fragment>
        {
          error ? <NotFound404></NotFound404>
          :
          <TermContext.Provider value={{ data }}>
            <Helmet>
              <title>Term | Quiz</title>
            </Helmet>
            <div
              className={"wrapper-term"}
              style={{ minWidth: "100vh", width: "auto" }}
            >
              <div className={"term"}>
                <Routes>
                  {parseInt(data?.get_term?.visible) === 1 && (
                    <Fragment>
                      <Route path="/" element={<W1></W1>}></Route>
                      <Route
                        path="/flashcards"
                        element={<FlashCards {...data}></FlashCards>}
                      ></Route>
                      <Route
                        path="/learn"
                        element={<Learn {...data}></Learn>}
                      ></Route>
                      <Route
                        path="/test"
                        element={<Test {...data}></Test>}
                      ></Route>
                    </Fragment>
                  )}

                  {parseInt(data?.get_term?.visible) === 2 && (
                    <Fragment>
                      {/* <Route path="/*" element={<NotFound404></NotFound404>}></Route> */}
                      {user?.uid === data?.get_term?.author?.uid && (
                        <Fragment>
                          <Route path="/" element={<W1></W1>}></Route>
                          <Route
                            path="/flashcards"
                            element={<FlashCards {...data}></FlashCards>}
                          ></Route>
                          <Route
                            path="/learn"
                            element={<Learn {...data}></Learn>}
                          ></Route>
                          <Route
                            path="/test"
                            element={<Test {...data}></Test>}
                          ></Route>
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </Routes>
              </div>
            </div>
          </TermContext.Provider>
        }
      </Fragment>
    );
  } else {
    return (
      <TermContext.Provider value={{ data }}>
        <Helmet>
          <title>Term | Quiz</title>
        </Helmet>
        <div
          className={"wrapper-term"}
          style={{ minHeight: "100vh", height: "auto" }}
        >
          <div className={"term"}>
            <Routes>
              <Fragment>
                <Route path="/" element={<W1></W1>}></Route>
                <Route
                  path="/flashcards"
                  element={<FlashCards {...data}></FlashCards>}
                ></Route>
                <Route
                  path="/learn"
                  element={<Learn {...data}></Learn>}
                ></Route>
                <Route path="/test" element={<Test {...data}></Test>}></Route>
              </Fragment>
            </Routes>
          </div>
        </div>
      </TermContext.Provider>
    );
  }
};

const W1 = (props) => {
  const { data } = useContext(TermContext);
  const { auth } = useContext(UserContext);
  return (
    <Fragment>
      <TitleTerm
        {...data?.get_term}
        title_term={data?.get_term?.title}
      ></TitleTerm>
      <div className="w1-201">
        <Navigation></Navigation>
        <Draft></Draft>
      </div>
      <Side1 {...data?.get_term?.author}></Side1>
      {auth === true && <Summary {...data?.get_term}></Summary>}
      {auth === false && <ListNoLogin {...data?.get_term}></ListNoLogin>}
    </Fragment>
  );
};

export default Term;

const ListNoLogin = (props) => {
  return (
    <div className="jjsakljsaklreaoiraw" style={{ width: "100%" }}>
      {props?.list_question
        ?.slice(0, Math.ceil((parseInt(props?.list_question?.length) - 1) / 3))
        .map((item, key) => (
          <ComponentLearn
            notLogin={true}
            key={key}
            {...item}
            {...props}
          ></ComponentLearn>
        ))}
      <NeedLoginToContinue></NeedLoginToContinue>
    </div>
  );
};

export const NeedLoginToContinue = (props) => {
  // eslint-disable-next-line
  const { setuser, user, auth, setauth } = useContext(UserContext);
  const [createUser, { error }] = useMutation(CREATEUSER);
  return (
    <Fragment>
      <div
        className={props.className}
        style={{ textAlign: "center", marginTop: 16 }}
      >
        You need login to continue
      </div>
      <div
        className="fjsjkaljskajfssasasas"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 58,
          padding: 16,
          background: "#dddddd",
          border: 10,
          marginTop: 10,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => loginWithGoogle(setuser, setauth, createUser, error)}
        >
          <div style={{ marginTop: 4 }}>
            <AiOutlineGoogle></AiOutlineGoogle>
          </div>
          &nbsp;
          <span style={{ fontSize: 18, fontWeight: 600 }}>
            Login with Google
          </span>
        </div>
      </div>
      <div
        className="fjsjkaljskajfssasasas"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 58,
          padding: 16,
          background: "#dddddd",
          border: 10,
          marginTop: 10,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => loginWithFacebook(setuser, setauth, createUser, error)}
        >
          <div style={{ marginTop: 4 }}>
            <AiFillFacebook></AiFillFacebook>
          </div>
          &nbsp;
          <span style={{ fontSize: 18, fontWeight: 600 }}>
            Login with Facebook
          </span>
        </div>
      </div>
    </Fragment>
  );
};
