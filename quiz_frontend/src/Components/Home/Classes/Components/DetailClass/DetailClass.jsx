import React, {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { Helmet } from "react-helmet-async";
import "./style.sass";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Share2 } from "../../../../Admin/Components/Term/Components/Side1";
import {  useMutation, useQuery } from "@apollo/client";
import MEMBER_OF_CLASS from "../../../../../docs/graphql/query/query_member_of_class";
import { Checkbox, CircularProgress } from "@mui/material";
import GET_INFO_CLASS from "../../../../../docs/graphql/query/get_info_class";
import CHECK_USER_JOIN_CLASS from "../../../../../docs/graphql/query/check_user_join_class";
import { UserContext } from "../../../../../App";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import REQUEST_JOIN_CLASS from "../../../../../docs/graphql/query/request_join_class";
import Login from "../../../../Login/Login";
// import QUERY_TERM from "../../../../../docs/graphql/query/query_term";
import ADD_TERM_TO_CLASS from "../../../../../docs/graphql/mutation/add_term_to_class";
import PERFORM_REQUEST_JOIN_CLASS from "../../../../../docs/graphql/mutation/perform_request_join_class";
import GET_TERM_OF_CLASS from "../../../../../docs/graphql/query/get_term_of_class";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRef } from "react";
import REQUEST_JOIN_CLASS_MUTATION from "../../../../../docs/graphql/mutation/request_join_class_mutation";
import DeleteIcon from "@mui/icons-material/Delete";
import DELETE_TERM_FROM_CLASS from "../../../../../docs/graphql/mutation/delete_term_from_class";
import CHANGE_RULE_OF_CLASS from "../../../../../docs/graphql/mutation/change_rule_of_class";
import DELETE_MEMBER_FROM_CLASS from "../../../../../docs/graphql/mutation/admin/delete_member_from_class";
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UpgradeIcon from "@mui/icons-material/Upgrade";
import CHANGE_ROLE_MEMBER_CLASS from "../../../../../docs/graphql/mutation/admin/change_role_member_class";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MyTerm from "./MyTerm";
import ILearnt from "./ILearnt";
import NotFoundSearch from "../../../../NotFound/NotFoundSearch";

const CheckUserJoinClassContext = createContext();
export default function CheckUserJoinClass({ children }) {
  const { user, auth } = useContext(UserContext);
  const { id_class } = useParams();
  // eslint-disable-next-line
  const { data, loading, error } = useQuery(CHECK_USER_JOIN_CLASS, {
    variables: { id_user: user?.uid || "", id_class },
    pollInterval: 3000,
    notifyOnNetworkStatusChange: true,
  });
  return (
    <CheckUserJoinClassContext.Provider
      value={{ role: data?.check_user_join_class }}
    >
      {auth === true && <DetailClass></DetailClass>}
      {auth === false && <Login></Login>}
    </CheckUserJoinClassContext.Provider>
  );
}

export const DetailClassContext = createContext();
const DetailClass = (props) => {
  const { id_class } = useParams();
  const { role } = useContext(CheckUserJoinClassContext);
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, loading, error } = useQuery(GET_INFO_CLASS, {
    variables: { id_class },
    pollInterval: 3000,
  });
  const [request_join_class] = useMutation(REQUEST_JOIN_CLASS_MUTATION, {
    variables: {
      id_class,
      id_user: user?.uid || "",
      own_id: data?.getinfoclass?.own_id || "",
    },
  });
  const { state } = useLocation();
  return (
    <DetailClassContext.Provider
      value={{
        id_class,
        data,
        invite: data?.getinfoclass?.invite,
        perform: data?.getinfoclass?.perform,
      }}
    >
      <Helmet>
        <title>
          {`${data?.getinfoclass?.class_name} | Quiz` || "Loading..."}
        </title>
      </Helmet>
      <div className="wrapper-detail-class" style={{ background: "#f2f0f5" }}>
        <div
          className="detail-class"
          style={{ background: "#f2f0f5" }}
        >
          <Title1></Title1>
          <br />
          {role?.check === 1 && (
            <Fragment>
              <Navigation {...role}></Navigation>
              <br />
              <div className="wrap-main">
                <Routes>
                  <Route path="/">
                    <Route
                      path=""
                      index
                      element={
                        <ListTerm
                          can_edit_term={data?.getinfoclass?.perform}
                        ></ListTerm>
                      }
                    ></Route>
                    <Route
                      path="members"
                      element={<ListMember></ListMember>}
                    ></Route>
                    {role?.isOwner === true && (
                      <Route
                        path="request"
                        element={
                          <RequestJoinClass
                            own_id_class={data?.getinfoclass?.own_id}
                          ></RequestJoinClass>
                        }
                      ></Route>
                    )}
                    <Route path="*" element={<div className="jaeirjaioerwjerwiok"><NotFoundSearch></NotFoundSearch></div>}></Route>
                  </Route>
                </Routes>
                <Side></Side>
              </div>
            </Fragment>
          )}
          {role?.check === 0 && (
            <div
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: 600,
                padding: 24,
              }}
            >
              You're not member of this class
            </div>
          )}
          {state?.is_invite === true && (
            <Accept request_join_class={request_join_class}></Accept>
          )}
        </div>
      </div>
    </DetailClassContext.Provider>
  );
};

//

const Accept= (props)=> {
  const [accept, setAccept]= useState(()=> undefined)
  return (
    <div>
      <div style={{ fontSize: 18, fontWeight: 600 }}>
        You have a invite from someone of this class
      </div>
      <br />
      <button
        disabled={accept=== undefined ? false : true  }
        onClick={() => {props.request_join_class();setAccept(()=> false)}}
        style={{ display: "flex", alignItems: "center", gap: 16, border: "none", outline: "none"}}
      >
        <div
          style={{
            cursor: "pointer",
            padding: "12px 24px",
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
            backgroundColor: "#2e89ff",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          {
            accept=== undefined ? "Accept" : "Submited"
          }
        </div>
      </button>
    </div>
  )
}

//

const Title1 = (props) => {
  const { role } = useContext(CheckUserJoinClassContext);
  const { invite, perform } = useContext(DetailClassContext);
  return (
    <div className="title-1111">
      <CTitle1></CTitle1>
      {role?.check >= 1 && (
        <CTitle2 invite={invite} perform={perform}></CTitle2>
      )}
    </div>
  );
};

const CTitle1 = (props) => {
  const { data } = useContext(DetailClassContext);
  return (
    <div className="jifjdskfsdsassa">
      <div className="dfdijsdfd wrap-icon">
        <GroupIcon
          style={{ width: 40, height: 40 }}
          className="fsawjdfwesfdsa"
        ></GroupIcon>
      </div>
      <div className="gkaskaskasla">
        {data?.getinfoclass?.class_name || "_"}
      </div>
    </div>
  );
};

const CTitle2 = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(() => false);
  const [open1, setOpen1] = useState(() => false);
  const [open2, setOpen2] = useState(() => false);
  const { user } = useContext(UserContext);
  const { role } = useContext(CheckUserJoinClassContext);
  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  // eslint-disable-next-line

  const clickoutside = (e) => {
    if (ref?.current && !ref?.current?.contains(e.target)) {
      setOpen(() => false);
    }
    if (ref1?.current && !ref1?.current?.contains(e.target)) {
      setOpen1(() => false);
    }
    if (ref2?.current && !ref2?.current?.contains(e.target)) {
      setOpen2(() => false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", clickoutside);
    return () => document.removeEventListener("mousedown", clickoutside);
  }, []);
  return (
    <div className="fgjesfdksaeskf" style={{ position: "relative" }}>
      {(props?.perform === true || parseInt(role?.role) === 3) && (
        <Tooltip title={<div style={{ fontSize: 15 }}>Add new term</div>}>
          <div
            className="wrap-icon wedgfewrdgdewr"
            onClick={() => setOpen(() => true)}
            style={{ background: "#fff" }}
          >
            <AddIcon style={{ color: "#3a3b3c" }}></AddIcon>
          </div>
        </Tooltip>
      )}
      {(props?.invite === true || parseInt(role?.role) === 3) && (
        <Tooltip title={<div style={{ fontSize: 15 }}>Add new member</div>}>
          <div
            className="wrap-icon wedgfewrdgdewr"
            style={{ background: "#fff" }}
            onClick={() => setOpen1(() => true)}
          >
            <GroupAddIcon style={{ color: "#3a3b3c" }}></GroupAddIcon>
          </div>
        </Tooltip>
      )}
      {role?.isOwner === true && (
        <Tooltip title={<div style={{ fontSize: 15 }}>Setting class</div>}>
          <div
            className="wrap-icon wedgfewrdgdewr"
            style={{ background: "#fff" }}
            onClick={() => setOpen2(() => true)}
          >
            <SettingsIcon style={{ color: "#3a3b3c" }}></SettingsIcon>
          </div>
        </Tooltip>
      )}
      {open === true && (
        <div
          className="kfadkfslsfsa"
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            top: 0,
            left: 0,
            zIndex: 12,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            ref={ref}
            style={{
              width: "100%",
              maxWidth: 600,
              height: "auto",
              padding: 24,
              background: "#fff",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 600 }}>Add term</div>
              <div
                className="wrap-icon"
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  backgroundColor: "#f2f0f5",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
                onClick={() => setOpen(() => false)}
              >
                <ClearIcon></ClearIcon>
              </div>
            </div>
            <br />
            <div
              className="jffdgkdadfdssd"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                gap: 8,
                cursor: "pointer",
              }}
              onClick={() => navigate("/create-set")}
            >
              <div style={{ cursor: "pointer" }} className="wrap-icon">
                <AddIcon></AddIcon>
              </div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>
                Create new term
              </div>
            </div>
            <MyTerm setOpen={setOpen}></MyTerm>
            {/*  */}
            <br />
            <ILearnt setOpen={setOpen}></ILearnt>
          </div>
        </div>
      )}
      {open1 === true && <Open1 open={open1} myRef={ref1}></Open1>}
      {open2 === true && <Open2 open={open2} myRef={ref2}></Open2>}
    </div>
  );
};

//

export const C3 = (props) => {
  const { id_class } = useParams();
  const [addTerm] = useMutation(ADD_TERM_TO_CLASS);
  const { user } = useContext(UserContext);
  return (
    <div
      className="fksfdkssdjk"
      style={{
        padding: "12px 8px",
        background: "#f2f0f5",
        borderRadius: 10,
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 600 }}>{props.title}</div>
      <Tooltip
        placement="top"
        title={<div style={{ fontSize: 18 }}>Add to your class</div>}
      >
        <div
          onClick={async () => {
            await addTerm({
              variables: {
                id_term: props?.id_term,
                add_by: user?.uid,
                own_id: props?.own_id,
                id_class,
              },
            });
            props?.setOpen(() => false);
          }}
          className="wrap-icon"
        >
          <AddIcon></AddIcon>
        </div>
      </Tooltip>
    </div>
  );
};

//

const Navigation = (props) => {
  const { id_class } = useContext(DetailClassContext);
  return (
    <div className="navigation">
      <div className="wrap-navigation">
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-aaa" : "inactive-aaa"
          }
          to={`/class/${id_class}/`}
        >
          Terms
        </NavLink>
      </div>
      <div className="wrap-navigation">
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-aaa" : "inactive-aaa"
          }
          to={`/class/${id_class}/members`}
        >
          Members
        </NavLink>
      </div>
      {props?.isOwner === true && (
        <div className="wrap-navigation">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-aaa" : "inactive-aaa"
            }
            to={`/class/${id_class}/request`}
          >
            Request
          </NavLink>
        </div>
      )}
    </div>
  );
};

//

const ListTerm = (props) => {
  const { id_class } = useParams();
  // eslint-disable-next-line
  const { data, loading, error } = useQuery(GET_TERM_OF_CLASS, {
    variables: {
      id_class,
    },
    pollInterval: 3000,
    notifyOnNetworkStatusChange: true,
  });
  return (
    <div className="wp">
      <div className="list-item-term">
        <div style={{ fontSize: 18, fontWeight: 600 }}>Terms of class</div>
        {data?.get_term_of_class?.length > 0 &&
          data?.get_term_of_class?.map((item, key) => (
            <ComponentTerm
              can_edit_term={props?.can_edit_term}
              key={key}
              {...item}
            ></ComponentTerm>
          ))}
        {data?.get_term_of_class?.length <= 0 && loading === false && (
          <Fragment>
            <br />
            <div style={{ fontSize: 16, fontWeight: 400 }}>
              Your class don't have any term
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
//

const ComponentTerm = (props) => {
  const navigate = useNavigate();
  const { role } = useContext(CheckUserJoinClassContext);
  const [deleteTermFromClass] = useMutation(DELETE_TERM_FROM_CLASS, {
    variables: {
      id_class: props?.id_class,
      id_term: props?.id_term,
    },
  });
  return (
    <div
      className="fgbjgkaesfdkaes ddsiodjdsfdsf"
      style={{
        width: "100%",
        height: "auto",
        borderRadius: 10,
        margin: "12px 0",
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
        background: "#fff",
        padding: 10,
        flexDirection: "column",
      }}
      onClick={() =>
        navigate(
          `/term/${props?.id_term}/${props?.title?.replaceAll(" ", "-")}`
        )
      }
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>{props.description}</div>
        {(props?.can_edit_term === true || role?.isOwner === true) && (
          <div
            style={{ padding: 10 }}
            onClick={async (e) => {
              e.stopPropagation();
              await deleteTermFromClass();
            }}
          >
            <Tooltip
              placement="top"
              title={<div style={{ fontSize: 18 }}>Delete term</div>}
            >
              <DeleteIcon></DeleteIcon>
            </Tooltip>
          </div>
        )}
      </div>
      <div style={{ fontSize: 18, fontWeight: 600 }}>{props?.title}</div>
      <br />
      <br />
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/profile/${props?.author_id}`);
        }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <img
          src={props?.author_photoURL}
          alt="open"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            objectFit: "cover",
          }}
          referrerPolicy={"no-referrer"}
        ></img>
        <div style={{ fontSize: 15, fontWeight: 600 }}>
          {props?.author_displayName}
        </div>
      </div>
    </div>
  );
};

//

const ListMember = (props) => {
  const { id_class } = useContext(DetailClassContext);
  const { role } = useContext(CheckUserJoinClassContext);
  const { data, loading } = useQuery(MEMBER_OF_CLASS, {
    variables: { id_class },
    pollInterval: 3000,
  });
  if (loading)
    return (
      <div className="wp">
        {" "}
        <CircularProgress></CircularProgress>{" "}
      </div>
    );
  else {
    return (
      <div className="wp">
        <div className="list-item-member">
          <div style={{ fontSize: 18, fontWeight: 600 }}>Members in class</div>
          <br />
          {data?.member_of_class?.length > 0 &&
            data?.member_of_class?.map((item, key) => (
              <DetailMember
                is_admin={role?.isOwner}
                role_user={role?.role}
                key={key}
                {...item}
              ></DetailMember>
            ))}
        </div>
      </div>
    );
  }
};
//

const RequestJoinClass = (props) => {
  const { id_class } = useContext(DetailClassContext);

  // eslint-disable-next-line
  const { data, loading, error } = useQuery(REQUEST_JOIN_CLASS, {
    variables: { id_class },
    pollInterval: 3000,
  });
  return (
    <div className="ffdsfadsfsads wp" style={{ flex: "1 1 0" }}>
      <div style={{ fontSize: 18, fontWeight: 600 }}>Request join class</div>
      <br />
      {data?.request_join_class?.length > 0 &&
        data?.request_join_class?.map((item, key) => (
          <DetailRequest
            own_id_class={props?.own_id_class}
            key={key}
            {...item}
          ></DetailRequest>
        ))}
      {data?.request_join_class?.length <= 0 && (
        <div>No any request join your class</div>
      )}
    </div>
  );
};
//

const DetailRequest = (props) => {
  const { id_class } = useParams();
  // eslint-disable-next-line
  const [requestJoin, { data, loading, error }] = useMutation(
    PERFORM_REQUEST_JOIN_CLASS
  );
  return (
    <div
      className="ddsiodjdsfdsf"
      style={{
        width: "100%",
        height: 60,
        borderRadius: 10,
        margin: "12px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        background: "#fff",
        padding: 10,
      }}
    >
      <div className="gfkgrdgesfdsdaas" style={{ display: "flex", gap: 16 }}>
        <div
          className="fgpsfdfsaesfsadsf"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={props?.photoURL}
            alt="open"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              objectFit: "cover",
            }}
            referrerPolicy={"no-referrer"}
          />
        </div>
        <div
          className="fkaodsfksasfs"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ fontSize: 20 }}>
            <strong>{props?.displayName}</strong>
          </div>
        </div>
      </div>
      <div
        className="fgsofdkdsfokdasa"
        style={{ display: "flex", alignItems: "center", gap: 16 }}
      >
        <div
          style={{ cursor: "pointer", fontWeight: 600, color: "#56ee59eb" }}
          onClick={() =>
            requestJoin({
              variables: {
                id_class,
                id_user: props?.id_user,
                id_request_join: props?.id_request_join,
                own_id: props?.own_id_class,
                type: 1,
              },
            })
          }
        >
          Accept
        </div>
        <div
          style={{ cursor: "pointer", fontWeight: 600, color: "#f51c19" }}
          onClick={() =>
            requestJoin({
              variables: {
                id_class,
                id_user: props?.id_user,
                id_request_join: props?.id_request_join,
                own_id: props?.own_id_class,
                type: 2,
              },
            })
          }
        >
          Deny
        </div>
      </div>
    </div>
  );
};

//
const DetailMember = (props) => {
  const navigate = useNavigate();
  const { id_class } = useParams();
  // eslint-disable-next-line
  const [delete_member, { loading, error, data }] = useMutation(
    DELETE_MEMBER_FROM_CLASS
  );
  const [change_role_member_of_class] = useMutation(CHANGE_ROLE_MEMBER_CLASS);
  return (
    <div
      className="ddsiodjdsfdsf"
      style={{
        width: "100%",
        height: 60,
        borderRadius: 10,
        margin: "12px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        background: "#fff",
        padding: 10,
      }}
      onClick={() => navigate(`/profile/${props?.uid}`)}
    >
      <div className="gfkgrdgesfdsdaas" style={{ display: "flex", gap: 16 }}>
        <div
          className="fgpsfdfsaesfsadsf"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={props?.photoURL}
            alt="open"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          className="fkaodsfksasfs"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {parseInt(props?.role) === 3 && <div>Admin of class</div>}
          {parseInt(props?.role) <= 1 && <div>Member</div>}
          {parseInt(props?.role) === 2 && <div>Manage of class</div>}
          <div style={{ fontSize: 20 }}>
            <strong>{props?.displayName}</strong>
          </div>
        </div>
      </div>
      {props?.role <= 2 && (
        <div
          className="fgsofdkdsfokdasa"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/*  */}
          {props?.is_admin === true && parseInt(props?.role) === 1 && (
            <Tooltip
              placement="top"
              title={<div style={{ fontSize: 18 }}>Upgrade manage class</div>}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  change_role_member_of_class({
                    variables: { id_class, id_user: props?.uid, role: 2 },
                  });
                }}
                className="wrap-icon"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#f2f0f5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <UpgradeIcon></UpgradeIcon>
              </div>
            </Tooltip>
          )}
          {/*  */}
          {props?.is_admin === true && parseInt(props?.role) >= 2 && (
            <Tooltip
              placement="top"
              title={<div style={{ fontSize: 18 }}>Depose position</div>}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  change_role_member_of_class({
                    variables: { id_class, id_user: props?.uid, role: 1 },
                  });
                }}
                className="wrap-icon"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#f2f0f5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ArrowDownwardIcon></ArrowDownwardIcon>
              </div>
            </Tooltip>
          )}
          {/*  */}
          {parseInt(props?.role_user) > parseInt(props?.role) && (
            <Tooltip
              placement="top"
              title={<div style={{ fontSize: 18 }}>Delete from class</div>}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  delete_member({
                    variables: { id_class, id_user: props?.uid },
                  });
                }}
                className="wrap-icon"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#f2f0f5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ClearIcon></ClearIcon>
              </div>
            </Tooltip>
          )}
        </div>
      )}
    </div>
  );
};

//

const Side = (props) => {
  const { data } = useContext(DetailClassContext);
  return (
    <div className="side">
      <div className="fjfsfjsadsfadsda">Description</div>
      <div style={{ fontSize: 18 }}>
        <strong style={{ fontSize: 18 }}>
          {data?.getinfoclass?.description || "_"}
        </strong>
      </div>
      <br />
      <div></div>
      <div
        className="kfdfdaesfadfsadsfd"
        style={{ background: "#fff", borderRadius: 10, overflow: "hidden" }}
      >
        <Share2
          link={`${window.location.origin}/join/class/${data?.getinfoclass?.code_invite}`}
        ></Share2>
      </div>
    </div>
  );
};

//

const Open1 = (props) => {
  const { data } = useContext(DetailClassContext);
  return (
    <div
      className="kfadkfslsfsa"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        top: 0,
        left: 0,
        zIndex: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={props?.myRef}
        style={{
          width: "100%",
          maxWidth: 600,
          height: "auto",
          padding: 24,
          background: "#fff",
          borderRadius: 10,
        }}
      >
        <div
          className="kfdfdaesfadfsadsfd rdftfgrhfdsdsdfdsds"
          style={{ background: "#fff", borderRadius: 10, overflow: "hidden" }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Code invite
          </div>
          <Share2
            link={`${window.location.origin}/join/class/${data?.getinfoclass?.code_invite}`}
          ></Share2>
        </div>
      </div>
    </div>
  );
};

//

const Open2 = (props) => {
  const { invite, perform } = useContext(DetailClassContext);
  const [inviteState, setInviteState] = useState(() => false);
  const [performState, setPerformState] = useState(() => false);
  // eslint-disable-next-line
  const [change_rule_of_class, { loading, error, data }] =
    useMutation(CHANGE_RULE_OF_CLASS);

  useEffect(() => {
    setInviteState(() => invite);
    setPerformState(() => perform);
  }, [invite, perform]);
  return (
    <div
      className="kfadkfslsfsa"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        top: 0,
        left: 0,
        zIndex: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={props?.myRef}
        style={{
          width: "100%",
          maxWidth: 600,
          height: "auto",
          padding: 24,
          background: "#fff",
          borderRadius: 10,
        }}
      >
        <div style={{ textAlign: "center", fontSize: 24, fontWeight: 600 }}>
          Settings
        </div>
        <br />
        <Rule
          inviteState={inviteState}
          performState={performState}
          change_rule_of_class={change_rule_of_class}
        ></Rule>
        <Rule2
          inviteState={inviteState}
          performState={performState}
          change_rule_of_class={change_rule_of_class}
        ></Rule2>
      </div>
    </div>
  );
};

const Rule = (props) => {
  const { id_class } = useParams();
  return (
    <div className="rule" style={{ display: "flex", alignItems: "center" }}>
      <Checkbox
        checked={props?.performState}
        onChange={() =>
          props?.change_rule_of_class({
            variables: {
              perform: !props?.performState,
              invite: props?.inviteState,
              id_class,
            },
          })
        }
      ></Checkbox>
      <div className="kfjaoawdada" style={{ color: "#000", fontWeight: 600 }}>
        Allow member in class can add/remove term
      </div>
    </div>
  );
};

const Rule2 = (props) => {
  const { id_class } = useParams();
  return (
    <div className="rule" style={{ display: "flex", alignItems: "center" }}>
      <Checkbox
        checked={props?.inviteState}
        onChange={() =>
          props?.change_rule_of_class({
            variables: {
              perform: props?.performState,
              invite: !props?.inviteState,
              id_class,
            },
          })
        }
      ></Checkbox>
      <div className="kfjaoawdada" style={{ color: "#000", fontWeight: 600 }}>
        Allow member in class can invite stranger
      </div>
    </div>
  );
};
