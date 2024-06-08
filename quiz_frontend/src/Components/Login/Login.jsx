import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { UserContext } from "../../App";
import CREATEUSER from "../../docs/graphql/mutation/create_user";
import { LoginWithFaceBook, LoginWithGoogle } from "../Header/Components/Popup/PopupLS";
import "./style.sass"

const Login = (props) => {
  const [createUser, { error }] = useMutation(CREATEUSER);
  const { setuser, setauth } = useContext(UserContext);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "calc(100vh - 56px)"
      }}
    >
      <Helmet>
        <title>Login | Quiz</title>
      </Helmet>
      <div style={{ fontSize: 18, fontWeight: 600 }}>
        You need to login to continue
      </div>
      <br />
      <LoginWithGoogle className="jdsfjvnadklsfmsad" setuser={setuser} setauth={setauth} createUser={createUser} error={error}></LoginWithGoogle>
      <br />
      <LoginWithFaceBook className="jdsfjvnadklsfmsad"setuser={setuser} setauth={setauth} createUser={createUser} error={error}></LoginWithFaceBook>
      <br />
      <div>or</div>
      <div style={{fontSize: 18, fontWeight: 600}}>Sign up</div>
      <br />
      <LoginWithGoogle className="jdsfjvnadklsfmsad" setuser={setuser} setauth={setauth} createUser={createUser} error={error}></LoginWithGoogle>
      <br />
      <LoginWithFaceBook className="jdsfjvnadklsfmsad"setuser={setuser} setauth={setauth} createUser={createUser} error={error}></LoginWithFaceBook>
    </div>
  );
};

export default Login;
