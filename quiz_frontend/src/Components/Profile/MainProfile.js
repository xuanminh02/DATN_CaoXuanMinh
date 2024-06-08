import { useQuery } from '@apollo/client';
import moment from 'moment';
import React, { Fragment, memo, useEffect } from 'react'
import Calendar from 'react-calendar';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import {  Avatar, ComponentClass, ComponentTerm, Name, StreakDay, StreakWeek } from '../Admin/Components/RightSide/Components/Profile';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { CircularProgress, Skeleton } from '@mui/material';
import USERLOGIN from '../../docs/graphql/query/user_login';
import streak_learn from '../../docs/graphql/query/admin/streak_learn';
import TERM_JOIN_ALL from '../../docs/graphql/query/admin/term_join_all';
import ALL_CLASS_USER from '../../docs/graphql/query/admin/all_class_user';
import get_profile_user from '../../docs/graphql/query/get_profile_user';

const MainProfile = (props) => {
  const { id_user }= useParams()
  // eslint-disable-next-line
  const {loading, data, error}= useQuery(USERLOGIN, {
    variables: {
      uid: id_user
    }
  })
  return (
    <div className="djilkejuieorjdsds">
    <>
      <div
        className="fjskldfjskedjf"
        style={{
          width: "100%",
          padding: 24,
          minHeight: "100vh",
          backgroundColor: "#f2f0f5",
          borderRadius: 5,
          height: "auto"
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
                to={`/profile/${id_user}/archieve`}
                replace={true}
              ></Navigate>
            }
          ></Route>
          <Route path="/archieve" element={<ArchieveProfile {...data}></ArchieveProfile>}></Route>
          <Route path="/term" element={<TermAdminProfile {...data}></TermAdminProfile>}></Route>
          <Route path="/class" element={<ClassAdminProfile {...data}></ClassAdminProfile>}></Route>
        </Routes>
      </div>
    </>
    </div>
  )
}

const Header = (props) => {
    const { id_user }= useParams()
    // eslint-disable-next-line
    const { data, loading, error } = useQuery(get_profile_user, {
        variables: {
            id_user
        }
    });
    return (
      <Fragment>
        <Helmet>
          <title>{data?.get_profile_user?.displayName || "Loading..."} | Quiz</title>
        </Helmet>
        <div
          className="fjfgfdggf"
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 20 }}
        >
          <Avatar {...data?.get_profile_user}></Avatar>
          <Name {...data?.get_profile_user}></Name>
        </div>
      </Fragment>
      
    );
  };

export default MainProfile

export const Navigation = (props) => {
    const { id_user }= useParams()
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
          to={`/profile/${id_user}/archieve`}
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
          to={`/profile/${id_user}/term`}
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
          to={`/profile/${id_user}/class`}
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



  export const ArchieveProfile = memo((props) => {
    const { id_user } = useParams()
    // eslint-disable-next-line
    const { data, error, loading } = useQuery(streak_learn, {
      variables: {
        id_user: id_user || "",
      },
    });
    useEffect(() => {
      document?.querySelector(".highlight")?.setAttribute("title", "Item Added");
    }, []);
    if (id_user && data?.streak_learn?.streak && loading !== true) {
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
                        props?.userLogin?.time_created.toString()
                      ).format("YYYY")
                    ),
                    parseInt(
                      moment(
                        props?.userLogin?.time_created.toString()
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
                  <span>: Day of learn</span>
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


  export const TermAdminProfile = (props) => {
    const { id_user }= useParams()
    // eslint-disable-next-line
    const { data, error, loading } = useQuery(TERM_JOIN_ALL, {
      variables: {
        id_user: id_user,
      },
    });
    return (
      <div style={{ width: "100%" }}>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          Created
        </div>
        {data?.term_join_all?.data_own?.length > 0 &&
          data?.term_join_all?.data_own?.map((item, key) => (
            <ComponentTerm key={key} className="dfskajkasasfsfdfsd" {...item}></ComponentTerm>
          ))}
        <br />
  
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          Learning
        </div>
        {data?.term_join_all?.data_join?.length > 0 &&
          data?.term_join_all?.data_join?.map((item, key) => (
            <ComponentTerm key={key} {...item} className="dfskajkasasfsfdfsd"></ComponentTerm>
          ))}
      </div>
    );
  };


  export const ClassAdminProfile = (props) => {
    const { id_user }= useParams()
    // eslint-disable-next-line
    const { data, error, loading } = useQuery(ALL_CLASS_USER, {
      variables: {
        id_user: id_user,
      },
    });
    return (
      <div style={{ width: "100%" }}>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          Created
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
        {!id_user &&
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
  
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          Joining
        </div>
        {data?.all_class_user?.class_join?.length > 0 &&
          data?.all_class_user?.class_join?.map((item, key) => (
            <ComponentClass key={key} {...item}></ComponentClass>
          ))}
      </div>
    );
  };
  