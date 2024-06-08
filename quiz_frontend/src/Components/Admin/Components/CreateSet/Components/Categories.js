import { useQuery } from "@apollo/client";
import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import GET_CATEGORIES from "../../../../../docs/graphql/query/get_categories";
import _ from "lodash"

const Categories = (props) => {
//   const array_categories= ["BTS", "Math", "English", "Social Studies", "Languages", "Science", "Computer"]
  // eslint-disable-next-line
  const {data, error, loading}= useQuery(GET_CATEGORIES)
  return (
    <div className="akrkdsmdkeasw">
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        placeholder="Choose category"
        value={props?.i?.category || "math"}
        label="Age"
        onChange={(e)=> props?.setI(prev=> ({...prev, category: e.target.value}))}
      >
        {
          data?.GET_CATEGORIES && data?.GET_CATEGORIES?.map((item, key)=> <MenuItem key={key} value={item.category}>{_.capitalize(item.category)}</MenuItem>)
        }
      </Select>
      <div style={{marginTop: 8}}>Category</div>
    </div>
  );
};

export default Categories;
