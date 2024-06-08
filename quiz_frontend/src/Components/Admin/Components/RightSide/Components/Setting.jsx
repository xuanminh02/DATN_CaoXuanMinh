import { useMutation } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { UserContext } from "../../../../../App";
import UPDATEUSER from "../../../../../docs/graphql/mutation/update_user";
import "./style.sass";

const Setting = () => {
  const { user } = useContext(UserContext);
  const [infoUser, setInfoUser] = useState(() => ({}));
  useEffect(() => {
    setInfoUser((prev) => ({ ...prev, ...user?.data?.userLogin }));
  }, [user]);
  return (
    <>
      <Helmet>
        <title>Settings | Quiz </title>
      </Helmet>
      <div className="setting-admin">
        <div
          className="wrapper-setting-admin"
          style={{ background: "#fff", margin: 12 }}
        >
          <Title title={"Settings"}></Title>
          <Component
            infoUser={infoUser}
            readOnly={true}
            type={"text"}
            placeholder={""}
            value={user?.email}
            label={"Email"}
          ></Component>
          <Component1
            infoUser={infoUser}
            setInfoUser={setInfoUser}
            readOnly={false}
            type={"text"}
            placeholder={""}
            value={user?.data?.userLogin?.account_name}
            label={"Account name"}
          ></Component1>
          <Component2
            infoUser={infoUser}
            setInfoUser={setInfoUser}
            readOnly={false}
            type={"text"}
            placeholder={""}
            value={user?.data?.userLogin?.displayName}
            label={"Name"}
          ></Component2>
          <ButtonSave></ButtonSave>
          <DeleteAccount></DeleteAccount>
        </div>
      </div>
    </>
  );
};

export default Setting;

const Title = (props) => {
  return <div className="setting-admin-title">{props.title}</div>;
};

const Component = (props) => {
  return (
    <div className="setting-admin-inp">
      <div className="setting-admin-label">{props.label}</div>
      <div className="wrapper-setting-inp">
        <input
          style={{ backgroundColor: "#fff", color: "#3a3b3c" }}
          readOnly={props?.readOnly}
          onChange={(e) =>
            props?.setInfoUser((prev) => ({
              ...prev,
              account_name: e.target.value,
            }))
          }
          type={props.type}
          placeholder={props.placeholder}
          value={props?.value}
          className="setting-admin-inp-content"
        />
      </div>
    </div>
  );
};

const Component1 = (props) => {
  return (
    <div className="setting-admin-inp">
      <div className="setting-admin-label">{props.label}</div>
      <div className="wrapper-setting-inp">
        <input
          style={{ backgroundColor: "#fff", color: "#3a3b3c" }}
          readOnly={props?.readOnly}
          onChange={(e) =>
            props?.setInfoUser((prev) => ({
              ...prev,
              account_name: e.target.value,
            }))
          }
          type={props.type}
          placeholder={props.placeholder}
          value={props?.infoUser?.account_name}
          className="setting-admin-inp-content"
        />
      </div>
    </div>
  );
};

const Component2 = (props) => {
  return (
    <div className="setting-admin-inp">
      <div className="setting-admin-label">{props.label}</div>
      <div className="wrapper-setting-inp">
        <input
          style={{ backgroundColor: "#fff", color: "#3a3b3c" }}
          readOnly={props?.readOnly}
          onChange={(e) =>
            props?.setInfoUser((prev) => ({
              ...prev,
              displayName: e.target.value,
            }))
          }
          type={props.type}
          placeholder={props.placeholder}
          value={props?.infoUser?.displayName}
          className="setting-admin-inp-content"
        />
      </div>
    </div>
  );
};

const ButtonSave = (props) => {
  const [updateUser, { loading, error, data }] = useMutation(UPDATEUSER);
  return (
    <div className="button-save-setting">
      <div
        className="trigger-confirm-change confirm-change-component"
        onClick={async () => {
          await updateUser({
            variables: {
              ...props?.infoUser,
            },
          });
          props.setopenchange(() => false);
          window.location.reload();
        }}
      >
        {loading === true && (
          <CircularProgress
            style={{ width: 15, height: 15, color: "#fff" }}
          ></CircularProgress>
        )}
        {loading === false && "Save changes"}
      </div>
    </div>
  );
};

const DeleteAccount = (props) => {
  return (
    <div className="delete-account-setting-admin">Delete account permanent</div>
  );
};
