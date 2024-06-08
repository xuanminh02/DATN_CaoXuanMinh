import React, { Fragment } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.sass";
import { Helmet } from "react-helmet-async";
import { useQueryString } from "../../../docs/f/get_query";
import { useQuery } from "@apollo/client";
import SEARCH_BOT from "../../../docs/graphql/query/search_bot";
import { useContext } from "react";
import { UserContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import NotFoundSearch from "../../NotFound/NotFoundSearch";

const Search = (props) => {
  const queryString = useQueryString();
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(SEARCH_BOT, {
    variables: {
      id_user: user?.uid || "",
      query_search: queryString?.get("query_search") || "",
    },
  });
  return (
    <Fragment>
      <Helmet>
        <title>
          {queryString?.get("query_search")
            ? queryString?.get("query_search") + " | Quiz"
            : "Search"}
        </title>
      </Helmet>
      <div
        className="search-quiz"
        style={{ minHeight: "calc(100vh - 56px)", background: "#f2f0f5" }}
      >
        <div className={"title-search-quiz"}>Search</div>
        <div className={"main-search-quiz"}>
          <input
            type="text"
            className={"inp-main-search-quiz"}
            placeholder={"Search quiz"}
          />
        </div>
        {!queryString.get("query_search") && (
          <div className={"decorate-search-quiz"}>
            <Fragment>
              <SearchIcon className={"decorate-search-quiz-icon"}></SearchIcon>
              <div className={"decorate-search-quiz-text"}>
                Search for quiz on all fields such as: math, science, ...
              </div>
            </Fragment>
          </div>
        )}
        {loading === true && (
          <Fragment>
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress></CircularProgress>
            </div>
          </Fragment>
        )}
        {loading === false &&
          (data?.SEARCH_BOT?.term?.length > 0 ||
            data?.SEARCH_BOT?.class?.length > 0) && (
            <Fragment>
              <div
                className="jeairjwierasa"
                style={{
                  fontSize: 20,
                  color: "#3a3b3c",
                  fontWeight: 550,
                  marginBottom: 16,
                  fontFamily: "Segoe UI",
                }}
              >
                Top search
              </div>
              <div className="sjidjislkadasds" style={{ width: "100%" }}>
                <div
                  className="dfjkjsaksjakrfe"
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 10
                  }}
                >
                  {data?.SEARCH_BOT?.term?.map((item, key) => (
                    <ComponentSearchTerm
                      key={key}
                      {...item}
                      is_term={true}
                    ></ComponentSearchTerm>
                  ))}
                </div>
                <div
                  className="fsjklejslksarw"
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {data?.SEARCH_BOT?.class?.map((item, key) => (
                    <ComponentSearchClasses
                      key={key}
                      {...item}
                      is_class={true}
                    ></ComponentSearchClasses>
                  ))}
                </div>
              </div>
            </Fragment>
          )}
        {loading === false &&
          queryString?.get("query_search") &&
          data?.SEARCH_BOT?.term?.length <= 0 &&
          data?.SEARCH_BOT?.class?.length <= 0 && (
            <NotFoundSearch></NotFoundSearch>
          )}
      </div>
    </Fragment>
  );
};

export default Search;

const ComponentSearchTerm = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="djiorjaeiortjewas"
      onClick={() => navigate(`/term/${props?.id_term}/${props?.title}`)}
      style={{
        padding: 10,
        borderRadius: 6,
        background: "#fff",
        width: "calc(25% - 10px)",
        cursor: "pointer",
      }}
    >
      <div className="fskedjskalasas" style={{display: "flex", justifyContent: 'space-between', alignItems: "center",}}>
        <div className="sjdhjshasjjdksaswer" style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          {props?.title}
        </div>
        <div className="fdkldjiotrfjeaiordssa" style={{fontSize: 14, fontWeight: 600}}>
          Term
        </div>
      </div>
      <div className="fjsiodjoihjaossa" style={{width: "100%", overflow: 'hidden', textOverflow: "ellipsis", whiteSpace:"nowrap"}}>{props?.description}</div>
      <br />
      <br />
      <div
        className="fjsioedjiorjeioras"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/profile/${props?.author_id}`);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
        }}
      >
        <img
          className="fjlsdjaklskasas"
          src={props?.author_photoURL}
          alt="open"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        ></img>
        <div className="fjiodfjiotjgeiorfs" style={{ fontSize: 15, fontWeight: 600 }}>
          {props?.author_displayName}
        </div>
      </div>
    </div>
  );
};

const ComponentSearchClasses = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="djiorjaeiortjewas"
      onClick={() => navigate(`/class/${props?.id_class}/`)}
      style={{
        padding: 10,
        borderRadius: 6,
        background: "#fff",
        minWidth: "25%",
        cursor: "pointer",
      }}
    >
      <div className="sdfijdlaskjdlkfsas" style={{display: "flex", justifyContent: 'space-between', alignItems: "center",}}>
        <div className="fjkldssjdklasass" style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          {props?.class_name}
        </div>
        <div className="fjkldjskdlsasas" style={{fontSize: 14, fontWeight: 600}}>
          Class
        </div>
      </div>
      <div className="fhodjehjoehjasas" style={{}}>{props?.description}</div>
      <br />
      <br />
      <div
        className="vjdiodjskodjasas"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/profile/${props?.author_id}`);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
        }}
      >
        <img
          className="fjkldjalkskjalsasewq"
          src={props?.author_photoURL}
          alt="open"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        ></img>
        <div className="fjdoikfjsioedjasas" style={{ fontSize: 15, fontWeight: 600 }}>
          {props?.author_displayName}
        </div>
      </div>
    </div>
  );
};
