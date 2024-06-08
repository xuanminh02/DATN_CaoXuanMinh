import React, { Fragment, useContext } from "react";
import { Helmet } from "react-helmet-async";
import SearchIcon from "@mui/icons-material/Search";
import SUGGEST_TERM from "../../../../../docs/graphql/query/suggest_term";
import { UserContext } from "../../../../../App";
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { NavigateProfile } from "../../../../Home/Main";
import { CircularProgress, Skeleton, Tooltip } from "@mui/material";
import GET_CATEGORIES from "../../../../../docs/graphql/query/get_categories";
import { useId } from "react";
import { CgMathDivide as MathIcon } from "react-icons/cg";
import { RiEnglishInput as EnglishIcon } from "react-icons/ri";
import {
  IoShareSocialSharp as SocialIcon,
  IoLanguageSharp as LanguageIcon,
} from "react-icons/io5";
import { GiMaterialsScience as ScienceIcon } from "react-icons/gi";
import { MdComputer as ComputerIcon } from "react-icons/md";
import { FaStarOfLife as CareerIcon } from "react-icons/fa";
import { DiCreativecommons as CreativeIcon } from "react-icons/di";
import { GiHealthNormal as HealthIcon } from "react-icons/gi";
import { useState } from "react";
import FIND_BY_CATEGORY from "../../../../../docs/graphql/query/find_by_category";
import { useQueryString } from "../../../../../docs/f/get_query";

const Explore = () => {
  const queryString= useQueryString()
  return (
    <>
      <Helmet>
        <title>Explore | Quiz</title>
      </Helmet>
      <div
        className="explore-admin"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 12,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
          Which will you teach today ?{" "}
        </div>
        <SearchComponent></SearchComponent>
        <br />
        {
          queryString.get("topic") &&
          <ClassifyTopic></ClassifyTopic>
        }
        <br />
        <FindByTopic></FindByTopic>
        <br />
        <div style={{ fontSize: 20, fontWeight: 600, width: "100%" }}>
          Suggest for you
        </div>
        <br />
        <Suggest></Suggest>
      </div>
    </>
  );
};

const SearchComponent = (props) => {
  const [valueSearch, setValueSearch] = useState(() => "");
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%", maxWidth: 1240, position: "relative" }}>
      <input
        value={valueSearch}
        onChange={(e) => setValueSearch(e.target.value)}
        type="text"
        style={{
          height: 64,
          width: "100%",
          borderRadius: 80,
          border: "none",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          fontSize: 18,
          fontWeight: 600,
          padding: 12,
          outlineColor: "#2e89ff",
        }}
        placeholder={"Search any term you want to learn..."}
      />
      <Tooltip
        placement={"top"}
        title={<div style={{ fontSize: 18 }}>Search</div>}
      >
        <div
          onClick={() => navigate(`/search?query_search=${valueSearch}`)}
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
          className="wrap-icon"
        >
          <SearchIcon style={{ width: 40, height: 40 }}></SearchIcon>
        </div>
      </Tooltip>
    </div>
  );
};

const Suggest = (props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, loading, error } = useQuery(SUGGEST_TERM);
  if (user?.uid) {
    return (
      <div
        className="ghjdhjiorhoiweesa"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {data?.SUGGEST_TERM?.length > 0 &&
          data?.SUGGEST_TERM?.map((item, key) => (
            <ComponentTerm key={key} {...item}></ComponentTerm>
          ))}
        {loading === true && (
          <>
            {Array.from(Array(8).keys()).map((item, key) => (
              <Skeleton
                key={key}
                style={{ width: "calc(25% - 10px)", height: 200 }}
                animation={"wave"}
                variant={"rectangular"}
              ></Skeleton>
            ))}
          </>
        )}
        {loading === false && data?.SUGGEST_TERM?.length <= 0 && (
          <div style={{ fontSize: 20 }}>You're not learn any term</div>
        )}
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div style={{ fontSize: 18 }}>
          You need login to see recent activities
        </div>
      </div>
    );
  }
};

export default Explore;

const FindByTopic = (props) => {
  // eslint-disable-next-line
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const array_icon = [
    <MathIcon></MathIcon>,
    <EnglishIcon></EnglishIcon>,
    <SocialIcon />,
    <LanguageIcon />,
    <ScienceIcon />,
    <ComputerIcon />,
    <CareerIcon />,
    <CreativeIcon />,
    <HealthIcon />,
  ];
  return (
    <div
      className="sdjkosjariajriaodasa"
      style={{
        width: "100%",
        maxWidth: 1240,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data?.GET_CATEGORIES &&
        data.GET_CATEGORIES?.slice(0, 9)?.map((item, key) => (
          <DetailTopic key={key} icon={array_icon[parseInt(key)]} {...item} />
        ))}
    </div>
  );
};

const DetailTopic = (props) => {
  const navigate = useNavigate();
  const id = useId();
  return (
    <div
      onClick={() =>
        navigate(`/admin?topic=${props.category.replaceAll(" ", "-")}`)
      }
      className="fkosdksodasfaerferdw"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
        flex: "1 1 0",
        margin: 8,
      }}
    >
      <div
        className="fdajkfjskldjkarwewq"
        style={{
          width: 40,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          borderRadius: "50%",
        }}
      >
        <div id={id} className="wrap-icon">
          {props?.icon}
        </div>
      </div>
      <div
        className="gjiodjsiokdass"
        style={{ fontSize: 18, fontWeight: 600, textAlign: "center" }}
      >
        {props.category}
      </div>
    </div>
  );
};

export const ClassifyTopic = (props) => {
  const queryString = useQueryString();
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(FIND_BY_CATEGORY, {
    variables: {
      category: queryString.get("topic") || "",
    },
  });
  return (
    <Fragment>
      {
        queryString.get("topic") &&
        <div style={{fontSize: 32, fontWeight: 600, textTransform: "capitalize"}}>Topic: {queryString.get("topic").replaceAll("-", " ")}</div>  
      }
      <div className="djlkdsjkdjksajsas" style={{width: "100%", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10}}>
        {
          data?.FIND_BY_CATEGORY && data.FIND_BY_CATEGORY.map((item, key)=> <ComponentTerm key={key} {...item}></ComponentTerm>)
        }
        {
          loading=== false && data?.FIND_BY_CATEGORY.length <=0 && <div style={{fontSize: 24, fontWeight: 600, padding: "24px"}}>Nothing to render</div>
        }
        {
          loading=== true && <div style={{width : "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <CircularProgress></CircularProgress>
          </div>
        }
      </div>
    </Fragment>
  )
};

const ComponentTerm = (props) => {
  return (
    <div
      className="fdjkldsjkdkjasssa"
      style={{
        padding: 24,
        cursor: "pointer",
        borderRadius: 10,
        background: "#fff",
        width: "calc(25% - 10px)",
      }}
    >
      <Link
        className="djkljsklasasaseaw"
        style={{ color: "#3a3b3c", textDecoration: "none" }}
        to={`/term/${props?.id_term}/${props?.title?.replaceAll(" ", "-")}`}
      >
        <div
          className="skldjaklsjaklsa"
          style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}
        >
          {props?.title}
        </div>
        <div
          className="fjdkldjskljasaas"
          style={{
            fontSize: 18,
            marginBottom: 8,
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {props?.description}
        </div>
        <div
          className="sklfsjaklsjkldjaks"
          style={{
            fontSize: 16,
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="jssjaoskjapsassa">
            {props?.count_question} questions
          </div>
          <div></div>
        </div>
        <br />
        <br />
      </Link>
      <NavigateProfile {...props}></NavigateProfile>
    </div>
  );
};
