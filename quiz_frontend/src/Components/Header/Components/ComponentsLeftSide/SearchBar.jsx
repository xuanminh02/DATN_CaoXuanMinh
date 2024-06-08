import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useQueryString } from "../../../../docs/f/get_query";

const SearchBar = (props) => {
  const [valueSearch, setValueSearch] = useState(() => "");
  const navigate = useNavigate();
  const query= useQueryString()
  useEffect(()=> {
    setValueSearch(()=> query?.get("query_search"))
  }, [query])
  return (
    <div className="search-bar">
      <div className="text-search-bar">
        <input
          onChange={(e) => setValueSearch(e.target.value)}
          value={valueSearch}
          type="text"
          className="enter-search-bar"
          placeholder="Search quiz"
          style={{ fontWeight: 600 }}
        />
      </div>
      <div
        className="btn-search-bar"
        onClick={() => navigate(`/search?query_search=${valueSearch}`)}
      >
        <SearchIcon className="btn-search-icon"></SearchIcon>
      </div>
    </div>
  );
};

export default SearchBar;
