import React, {
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { Helmet } from "react-helmet-async";
import CreateComponentTerm from "./Components/CreateComponentTerm";
import Description from "./Components/Description";
import Permission from "./Components/Permission";
import Title from "./Components/Title";
import PublicIcon from "@mui/icons-material/Public";
import { v4 as uuidv4 } from "uuid";
import "./style.sass";
import createTerm from "../../../../api/create_term";
import { UserContext } from "../../../../App";
import Categories from "./Components/Categories";
// import Categories from './Components/Categories'

const CreateSet = (props) => {
  const [i, setI] = useState(() => ({ visible: 1, editable: 1 }));
  const [q, setQ] = useState(() => []);
  const id_term = useMemo(() => uuidv4(), []);
  const { user } = useContext(UserContext);
  // const state= useSyncExternalStore
  // eslint-disable-next-line

  return (
    <>
      <Helmet async={true} prioritizeSeoTags={true}>
        <title>
          {i?.title?.length > 0 ? i?.title : `Create new term | Quiz`}
        </title>
      </Helmet>
      <div className="wrapper-create-set">
        <div className="create-set">
          <Title
            createTerm={() => createTerm({ ...i }, q, id_term, user?.uid)}
            i={i}
            q={q}
          ></Title>
          <Description i={i} setI={setI}></Description>
          <Categories i={i} setI={setI}></Categories>
          {/* <Categories i={i} setI={setI}></Categories> */}
          <Permission
            i={i}
            setI={setI}
            x1={"Who can see this term"}
            x2={"Who can edit this term"}
            y1={<PublicIcon className="ri-647"></PublicIcon>}
            y2={<PublicIcon className="ri-647"></PublicIcon>}
            z1={"Everyone"}
            z2={"Everyone"}
          ></Permission>
          <CreateComponentTerm
            createTerm={() => createTerm({ ...i }, q, id_term, user?.uid)}
            q={q}
            i={i}
            setQ={setQ}
          ></CreateComponentTerm>
        </div>
      </div>
    </>
  );
};

export default CreateSet;
