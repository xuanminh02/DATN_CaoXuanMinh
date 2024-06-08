import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { UserContext } from "../../../../App";
import TERM_JOIN_ALL from "../../../../docs/graphql/query/admin/term_join_all";
import { ComponentTerm } from "../../../Admin/Components/RightSide/Components/Profile";

const CommonComponent = (props) => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(TERM_JOIN_ALL, {
    variables: {
      id_user: user?.uid,
    },
  });
  return (
    <div className="gjiofjgfdkfsds" style={{display: "flex", padding: 24}}>
      <div className="wrapper-cm-component" style={{width: "100%",}}> 
        <div className="dskdajksjakfas" style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, width: "100%" }}>
          Your term
        </div>
        <div className="jfkldjslkjdaksaas" style={{width: "100%", display: "flex", alignItems: "center", gap :10, flexWrap: "wrap"}}> 
          {data?.term_join_all?.data_own?.length > 0 &&
            data?.term_join_all?.data_own?.map((item, key) => (
              <ComponentTerm key={key} {...item}></ComponentTerm>
            ))}
        </div>
        <br />
      </div>
    </div>
  );
};

export default CommonComponent;
