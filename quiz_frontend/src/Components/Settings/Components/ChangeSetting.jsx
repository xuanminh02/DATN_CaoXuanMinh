import { useMutation } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { UserContext } from "../../../App";
import UPDATEUSER from "../../../docs/graphql/mutation/update_user";
import FatalComponentChange from "./ComponentChange/FatalComponentChange";
import SelectComponentChange from "./ComponentChange/SelectComponentChange";
import TextComponentChange from "./ComponentChange/TextComponentChange";
import Title from "./ComponentChange/Title";
import { logout } from "../../../Firebase/function/logout"  

const ChangeSetting = (props) => {
  const refChange = useRef();
  const clickoutside = useCallback(
    (e) => {
      if (refChange?.current && !refChange?.current?.contains(e.target)) {
        props.setopenchange(() => false);
      }
    },
    [props]
  );
  useEffect(() => {
    document.addEventListener("mousedown", clickoutside);
    return () => {
      document.removeEventListener("mousedown", clickoutside);
    };
  }, [clickoutside]);

  return (
    <div className="wrapper-settings">
      <div
        ref={refChange}
        data-check-outside={true}
        className={
          props.openchange === true
            ? "change-settings slide-change-settings"
            : "change-settings vanilla-change-settings"
        }
      >
        <Title title={props.title}></Title>
        {props.isText === true && (
          <TextComponentChange
            infoUser={props?.infoUser}
            type={props?.type}
            setInfoUser={props?.setInfoUser}
            setChangeSetting={props.setChangeSetting}
            text={props.text}
            placeholder={props.placeholder}
          ></TextComponentChange>
        )}

        {props.isSelect === true && (
          <SelectComponentChange
            infoUser={props?.infoUser}
            setChangeSetting={props.setChangeSetting}
            arraySelect={props.arraySelect}
            select={props.select}
            placeholder={props.placeholder}
          />
        )}
        {props.isFatal === true && (
          <FatalComponentChange
            infoUser={props?.infoUser}
            setChangeSetting={props.setChangeSetting}
            fatalMessage={props.fatalMessage}
          ></FatalComponentChange>
        )}
        <ConfirmChange
          {...props}
          infoUser={props?.infoUser}
          setopenchange={props.setopenchange}
        ></ConfirmChange>
      </div>
    </div>
  );
};
const ConfirmChange = (props) => {
  const { setChange } = useContext(UserContext);
  // eslint-disable-next-line
  const [updateUser, { loading, error, data }] = useMutation(UPDATEUSER);

  return (
    <div className="confirm-change">
      {props?.isFatal === true && (
        <div
          className="trigger-confirm-change confirm-change-component"
          onClick={() => {
            logout()
            props.setopenchange(() => false);
            setChange((prev) => !prev);
            window.location.reload();
          }}
        >
          {loading === true && (
            <CircularProgress
              style={{ width: 15, height: 15, color: "#fff" }}
            ></CircularProgress>
          )}
          {loading === false && "Confirm"}
        </div>
      )}
      {props?.isText === true && (
        <div
          className="trigger-confirm-change confirm-change-component"
          onClick={async () => {
            await updateUser({
              variables: {
                ...props?.infoUser,
              },
            });
            props.setopenchange(() => false);
            setChange((prev) => !prev);
            window.location.reload();
          }}
        >
          {loading === true && (
            <CircularProgress
              style={{ width: 15, height: 15, color: "#fff" }}
            ></CircularProgress>
          )}
          {loading === false && "Confirm"}
        </div>
      )}
      {props?.isSelect === true && (
        <div
          className="trigger-confirm-change confirm-change-component"
          onClick={async () => {
            await updateUser({
              variables: {
                ...props?.infoUser, class: parseInt(props?.select)
              },
            });
            props.setopenchange(() => false);
            setChange((prev) => !prev);
            window.location.reload();
          }}
        >
          {loading === true && (
            <CircularProgress
              style={{ width: 15, height: 15, color: "#fff" }}
            ></CircularProgress>
          )}
          {loading === false && "Confirm"}
        </div>
      )}
      <div
        className="cancel-confirm-change confirm-change-component"
        onClick={() => props.setopenchange(() => false)}
      >
        Cancel
      </div>
    </div>
  );
};

export default ChangeSetting;
