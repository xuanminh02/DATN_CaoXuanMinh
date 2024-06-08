import React from "react";
import RuleIcon from "@mui/icons-material/Rule";
import CreateIcon from "@mui/icons-material/Create";
import ComponentMenuLevel2 from "./ComponentMenuLevel2";
import { NavLink } from "react-router-dom";

const MenuLevel2 = () => {
  const array_link = [
    { link: "running", text: "Running", icon: <RuleIcon></RuleIcon> },
    { link: "created", text: "Created", icon: <CreateIcon></CreateIcon> },
  ];
  return (
    <div className="wrapper-menu-level-2">
      <div className="menu-level-2">
        {array_link?.map((item, key) => (
          <NavLink
            key={key}
            className={({ isActive }) =>
              isActive ? "l-thing active-menu-lv-2" : "l-thing inactive-lv-2"
            }
            to={"/activities/" + item.link}
          >
            <ComponentMenuLevel2 {...item}></ComponentMenuLevel2>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MenuLevel2;
