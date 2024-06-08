import React, { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { ChangePermission } from "../../CreateSet/Components/Permission";
import { Tooltip } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../../../../App";
import { useMutation } from "@apollo/client";
import CHANGE_ROLE_TERM from "../../../../../docs/graphql/mutation/admin/change_role_term";
import DeleteIcon from '@mui/icons-material/Delete';
import DELETE_TERM from "../../../../../docs/graphql/mutation/admin/delete_term";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

const TitleTerm = (props) => {
  const { user } = useContext(UserContext);
  const navigate= useNavigate()
  const { id_term }= useParams()
  const [openPermission, setOpenPermission] = useState(() => false);
  // eslint-disable-next-line
  const [i, setI] = useState(() => ({}));
  const [editable, setEditable] = useState(() => 0);
  const [visible, setVisible] = useState(() => 0);
  const [changeRoleTerm]= useMutation(CHANGE_ROLE_TERM)
  const [deleteTerm]= useMutation(DELETE_TERM, {
    variables: {
      id_term
    }
  })
  useEffect(()=> {
    setEditable(()=> props?.editable)
    setVisible(()=> props?.visible)
  }, [props?.editable, props?.visible])
  return (
    <div
      className="title-term"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: 24 }}>{props.title_term}</div>
      {props?.author?.uid === user?.uid && (
        <div style={{display: "flex", alignItems: "center", gap: 16}}>
          <Tooltip
            placement="top"
            title={<div style={{ fontSize: 18 }}>Settings term</div>}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              className="wrap-icon"
              onClick={() => setOpenPermission(() => true)}
            >
              <SettingsIcon style={{color: "#2e89ff"}}></SettingsIcon>
            </div>
          </Tooltip>
          {/* 
           */}
          <Tooltip
            placement="top"
            title={<div style={{ fontSize: 18 }}>Delete term</div>}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              className="wrap-icon"
              onClick={() => {
                deleteTerm()
                .then((res)=> {
                  window.location.reload()
                })
                .catch((err)=> {
                  console.log(err)
                })
              }}
            >
              <DeleteIcon style={{color: "#2e89ff"}}></DeleteIcon>
            </div>
          </Tooltip>
          {/*  */}
          {/*  */}
          <Tooltip
            placement="top"
            title={<div style={{ fontSize: 18 }}>Edit term</div>}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              className="wrap-icon"
              onClick={() => navigate(`/edit-term/${id_term}`, {state: {is_edit: true}})}
            >
              <EditIcon style={{color: "#2e89ff"}}></EditIcon>
            </div>
          </Tooltip>
        </div>
      )}
      {openPermission === true && (
        <ChangePermission
          id_term={props?.id_term}
          changeRoleTerm={changeRoleTerm}
          editable={editable}
          visible={visible}
          setOpenChangePermission={setOpenPermission}
          setI={setI}
          dontSave={true}
        ></ChangePermission>
      )}
    </div>
  );
};

export default TitleTerm;
