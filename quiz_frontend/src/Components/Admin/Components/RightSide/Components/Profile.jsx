import { useQuery } from "@apollo/client";
import { CircularProgress, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { UserContext } from "../../../../../App";
import ALL_CLASS_USER from "../../../../../docs/graphql/query/admin/all_class_user";
import TERM_JOIN_ALL from "../../../../../docs/graphql/query/admin/term_join_all";
import Calendar from "react-calendar";
import moment from "moment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import streak_learn from "../../../../../docs/graphql/query/admin/streak_learn";
import { memo } from "react";

const Profile = (props) => {
  return (
    <>
      <Helmet>
        <title>Profile | Quiz</title>
      </Helmet>
      <div
        className="fjskldfjskedjf"
        style={{
          width: "100%",
          padding: 24,
          minHeight: "100vh",
          backgroundColor: "#f2f0f5",
          borderRadius: 5,
          height: "auto",
        }}
      >
        <Header></Header>
        <Navigation></Navigation>
        <br />
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={"/admin/profile/archieve"}
                replace={true}
              ></Navigate>
            }
          ></Route>
          <Route path="/archieve" element={<Archieve></Archieve>}></Route>
          <Route path="/term" element={<TermAdmin></TermAdmin>}></Route>
          <Route path="/class" element={<ClassAdmin></ClassAdmin>}></Route>
        </Routes>
      </div>
    </>
  );
};

//

const Header = (props) => {
  const { user } = useContext(UserContext);
  return (
    <div
      className="fjfgfdggf"
      style={{ width: "100%", display: "flex", alignItems: "center", gap: 20 }}
    >
      <Avatar {...user?.data?.userLogin}></Avatar>
      <Name {...user?.data?.userLogin}></Name>
    </div>
  );
};

//

export const Avatar = (props) => {
  if (props.photoURL)
    return (
      <>
        {props?.photoURL && (
          <img
            referrerPolicy="no-referrer"
            alt="open"
            src={props?.photoURL}
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          ></img>
        )}
      </>
    );
  else
    return (
      <Skeleton
        animation={"wave"}
        variant={"circular"}
        width={64}
        height={64}
      ></Skeleton>
    );
};

export const Name = (props) => {
  if (props?.displayName)
    return (
      <>
        <div
          className="dfjfksefsd"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 600 }}>
            {props.account_name}
          </div>
          <div style={{ fontSize: 18 }}>{props?.displayName}</div>
        </div>
      </>
    );
  else
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <Skeleton
          animation={"wave"}
          variant={"rectangular"}
          width={200}
          height={20}
        ></Skeleton>
        <Skeleton
          animation={"wave"}
          variant={"rectangular"}
          width={100}
          height={20}
        ></Skeleton>
      </div>
    );
};

//

export const Navigation = (props) => {
  return (
    <div
      className="fbjklfdf"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginTop: 16,
        paddingTop: 12,
      }}
    >
      <NavLink
        to="/admin/profile/archieve"
        className={({ isActive }) =>
          isActive
            ? "active-class fgklfgfkfegf njskgnjnaerar"
            : "inactive-class njskgnjnaerar"
        }
        style={{ textDecoration: "none", color: "#3a3b3c" }}
      >
        Archieve
      </NavLink>
      <NavLink
        to="/admin/profile/term"
        className={({ isActive }) =>
          isActive
            ? "active-class fgklfgfkfegf njskgnjnaerar"
            : "inactive-class njskgnjnaerar"
        }
        style={{ textDecoration: "none", color: "#3a3b3c" }}
      >
        Term
      </NavLink>
      <NavLink
        to="/admin/profile/class"
        className={({ isActive }) =>
          isActive
            ? "active-class fgklfgfkfegf njskgnjnaerar"
            : "inactive-class njskgnjnaerar"
        }
        style={{ textDecoration: "none", color: "#3a3b3c" }}
      >
        Class
      </NavLink>
    </div>
  );
};

//

export const TermAdmin = (props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(TERM_JOIN_ALL, {
    variables: {
      id_user: user?.uid,
    },
  });
  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        Your term
      </div>
      {data?.term_join_all?.data_own?.length > 0 &&
        data?.term_join_all?.data_own?.map((item, key) => (
          <ComponentTerm key={key} {...item}></ComponentTerm>
        ))}
      <br />

      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        You learnt
      </div>
      {data?.term_join_all?.data_join?.length > 0 &&
        data?.term_join_all?.data_join?.map((item, key) => (
          <ComponentTerm key={key} {...item}></ComponentTerm>
        ))}
    </div>
  );
};

//

export const ComponentTerm = (props) => {
  return (
    <div className={`fkjsedjkaskals ${props.className}`} style={{width: "calc(100%)"}}>
      <Link
        className="gjdirkfdgdsfdgf"
        to={"/term/" + props?.id_term + "/" + props?.title.replaceAll(" ", "-")}
        style={{ textDecoration: "none", color: "#3a3b3c" }}
      >
        <div
          className="djgkdffsdsfsda"
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="fdsjkldjaklsaasas" style={{width: "100%"}}>
            <div className="fjkaklssasd" style={{ fontSize: 20, fontWeight: 600 }}>
              {props?.title}{" "}
              {props.count_question && " | " + props.count_question + " question"}
            </div>
            <div className="fjikjdasksasasrfe" style={{ fontSize: 18 , width: "100%", overflow: 'hidden', textOverflow: "ellipsis", whiteSpace:"nowrap"}}>{props?.description}</div>
          </div>  
          {props?.time_created && (
            <div style={{ fontWeight: 600 }}>
              Created: {moment(props?.time_created).format("DD/MM/YYYY")}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

//

export const ClassAdmin = (props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(ALL_CLASS_USER, {
    variables: {
      id_user: user?.uid || "",
    },
  });
  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        You created
      </div>
      {data?.all_class_user?.class_own?.length > 0 &&
        data?.all_class_user?.class_own?.map((item, key) => (
          <ComponentClass key={key} {...item}></ComponentClass>
        ))}
      {loading &&
        Array.from(Array(5).keys()).map((item, key) => (
          <div
            key={key}
            style={{ width: "100%", height: "80px", marginBottom: 8 }}
          >
            <Skeleton
              variant={"rectangular"}
              key={key}
              animation={"wave"}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            ></Skeleton>
          </div>
        ))}
      {!user?.uid &&
        Array.from(Array(5).keys()).map((item, key) => (
          <div
            key={key}
            style={{ width: "100%", height: "80px", marginBottom: 8 }}
          >
            <Skeleton
              variant={"rectangular"}
              key={key}
              animation={"wave"}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            ></Skeleton>
          </div>
        ))}
      <br />

      <div className="fjKLsdjaksrfaed" style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        You joined
      </div>
      {data?.all_class_user?.class_join?.length > 0 &&
        data?.all_class_user?.class_join?.map((item, key) => (
          <ComponentClass key={key} {...item}></ComponentClass>
        ))}
    </div>
  );
};

//

export const ComponentClass = (props) => {
  return (
    <Link
      className="dmklasjkasaAD"
      to={"/class/" + props?.id_class + "/"}
      style={{ textDecoration: "none", color: "#3a3b3c" }}
    >
      <div
        className="dfskjpdajdioksda"
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          background: "#fff",
          marginTop: 10
        }}
      >
        <div className='ddjhskodjasjifed' style={{ fontSize: 20, fontWeight: 600 }}>
          {props?.class_name} | {props?.count_member} members
        </div>
        <div className="fsjklsdjkdlsdas" style={{ fontSize: 24 }}>{props?.description}</div>
      </div>
    </Link>
  );
};

//

export const Archieve = memo((props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(streak_learn, {
    variables: {
      id_user: user?.uid || "",
    },
  });
  useEffect(() => {
    document?.querySelector(".highlight")?.setAttribute("title", "Item Added");
  }, []);
  if (user?.uid && data?.streak_learn?.streak && loading !== true) {
    return (
      <>
        <div style={{ width: "100%" }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Recent activities</div>
          <br />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
            className="gjkefjdgdwfgf"
          >
            {/* {
              console.log(moment(user?.data?.userLogin?.time_created.toString()).format("D"),(moment(user?.data?.userLogin?.time_created.toString()).format("M") -1), moment(user?.data?.userLogin?.time_created.toString()).format("YYYY"))
            } */}
            <Calendar
              defaultValue={[
                new Date(
                  parseInt(
                    moment(
                      user?.data?.userLogin?.time_created.toString()
                    ).format("YYYY")
                  ),
                  parseInt(
                    moment(
                      user?.data?.userLogin?.time_created.toString()
                    ).format("M") - 1
                  ),
                  parseInt(1)
                ),
                new Date(),
              ]}
              tileClassName={({ date, view }) => {
                if (
                  data?.streak_learn?.streak
                    ?.map((item) => item?.day)
                    .toString()
                    .split(",")
                    .find((x) => x === moment(date).format("DD/MM/YYYY"))
                ) {
                  return "highlight";
                }
              }}
              showDoubleView={true}
              showFixedNumberOfWeeks={true}
              onClickDay={() => false}
              nextLabel={<ArrowForwardIosIcon></ArrowForwardIosIcon>}
              prevLabel={<ArrowBackIosNewIcon></ArrowBackIosNewIcon>}
              next2Label={
                <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
              }
              prev2Label={
                <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
              }
              showNeighboringMonth={false}
            />
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              <div style={{ fontSize: 18, marginBottom: 8 }}>Note</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <img
                  alt="open"
                  src={
                    "https://assets.quizlet.com/a/j/dist/app/i/achievements/streak-flame.90821ad6fa84e8e.svg"
                  }
                ></img>
                <span>: You leanrt these days</span>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <StreakDay {...data?.streak_learn}></StreakDay>
        <br />
        <StreakWeek {...data?.streak_learn}></StreakWeek>
      </>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600 }}>Loading</span>
        <CircularProgress></CircularProgress>
      </div>
    );
  }
});
//

export const StreakDay = (props) => {
  const array_streak = [3, 5, 7, 10, 20, 30, 45, 60, 70, 80];
  return (
    <div
      className="gisjsljsrtsets"
      style={{ width: "100%", background: "#f2f0f5" }}
    >
      <div style={{ fontSize: 20, fontWeight: 600 }}>Streak day</div>
      <br />
      <div
        style={{
          maxWidth: 700,
          width: "100%",
          padding: 12,
          borderRadius: 10,
          background: "#fff",
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          transition: "all .25s linear",
        }}
      >
        {array_streak?.map((item, key) => (
          <ComponentStreakDay
            {...props}
            className={"dksjfaireiojwsiejiorwe"}
            key={key}
            item={item}
          ></ComponentStreakDay>
        ))}
      </div>
    </div>
  );
};

//

export const StreakWeek = (props) => {
  const array_streak = [
    3, 5, 10, 20, 30, 40, 52, 60, 70, 80, 90, 104, 125, 156, 175, 204,
  ];
  return (
    <div
      className="gisjsljsrtsets"
      style={{ width: "100%", background: "#f2f0f5" }}
    >
      <div style={{ fontSize: 20, fontWeight: 600 }}>Streak week</div>
      <br />
      <div
        style={{
          maxWidth: 700,
          width: "100%",
          padding: 12,
          borderRadius: 10,
          background: "#fff",
          display: "flex",
          flexWrap: "wrap",
          gap: 28,
          transition: "all .25s linear",
        }}
      >
        {array_streak?.map((item, key) => (
          <ComponentStreakWeek
            className="fgjksdfdsdasfd"
            key={key}
            item={item}
          ></ComponentStreakWeek>
        ))}
      </div>
    </div>
  );
};

//

export const ComponentStreakWeek = (props) => {
  return (
    <div
    className="fdgjsfdgfjksfdgdd"
    style={{
      width: 148,
      height: 208,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    <div
      className={props.className}
      style={{ width: 148, height: 148, position: "relative", backgroundSize: "contain", backgroundImage: Math.floor(parseInt(props?.streak?.length) / 7) >= parseInt(props?.item) ? "url(https://res.cloudinary.com/cockbook/image/upload/v1657958630/single/week-streak-badge.fd8c50f24ce2a57_pce8vw.jpg)" : "url(https://res.cloudinary.com/cockbook/image/upload/v1657907449/single/day-streak-badge-disabled.5e452b0f2ef9813_ffvdjd.jpg)"}}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 13,
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        {props?.item}
      </div>
    </div>
    <div style={{height: 50}}>
      <div
        style={{
          marginTop: 16,
          fontWeight: 600,
          fontSize: 18,
          position: "relative",
        }}
      >
        <div>Streak {props?.item} weeks</div>
      </div>
      {Math.floor(parseInt(props?.streak?.length) / 7) >= parseInt(props?.item) && (
        <div>{props?.streak[parseInt(props?.item) - 1]?.day}</div>
      )}
    </div>
  </div>
  );
};

export const ComponentStreakDay = (props) => {
  return (
    <div
      className="fdgjsfdgfjksfdgdd"
      style={{
        width: 148,
        height: 208,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        className={props.className}
        style={{ width: 148, height: 148, position: "relative", backgroundImage: parseInt(props?.streak?.length) >= parseInt(props?.item) ? "url(https://res.cloudinary.com/cockbook/image/upload/v1657958630/single/week-streak-badge.fd8c50f24ce2a57_pce8vw.jpg)" : "url(https://res.cloudinary.com/cockbook/image/upload/v1657958622/single/week-streak-badge-disabled.7dc29ddfd962190_hjbbrb.jpg)"}}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 13,
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {props?.item}
        </div>
      </div>
      <div style={{height: 50}}>
        <div
          style={{
            marginTop: 16,
            fontWeight: 600,
            fontSize: 18,
            position: "relative",
          }}
        >
          <div>Streak {props?.item} days</div>
        </div>
        {parseInt(props?.streak?.length) >= parseInt(props?.item) && (
          <div>{props?.streak[parseInt(props?.item) - 1]?.day}</div>
        )}
      </div>
    </div>
  );
};

//

export default Profile;
