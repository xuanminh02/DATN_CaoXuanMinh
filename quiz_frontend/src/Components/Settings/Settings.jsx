import React, { useContext, useEffect, useState } from "react";
import Title from "./Components/Title";
import { Helmet } from "react-helmet-async";
import "./style.sass";
import InfoUser from "./Components/InfoUser";
import DangerousSetting from "./Components/DangerousSetting";
import ChangeSetting from "./Components/ChangeSetting";
import { UserContext } from "../../App";
import Login from "../Login/Login";

const Settings = (props) => {
  const { auth, user } = useContext(UserContext);
  const [openchange, setopenchange] = useState(() => false);
  const [changeSetting, setChangeSetting] = useState(() => ({}));
  const [type, setType]= useState(()=> 0)
  const [infoUser, setInfoUser] = useState(() => ({}));
  useEffect(() => {
    setInfoUser((prev) => ({ ...prev, ...user?.data?.userLogin }));
  }, [user]);
  return (
    <>
      <Helmet>
        <title>Settings | Quiz</title>
      </Helmet>
      <div className="settings max-height">
        <Title></Title>
        {auth === true && (
          <InfoUser
            infoUser={infoUser}
            setType={setType}
            setInfoUser={setInfoUser}
            setChangeSetting={setChangeSetting}
            setopenchange={setopenchange}
          ></InfoUser>
        )}

        <br />

        {auth === true && (
          <DangerousSetting
            setType={setType}
            setChangeSetting={setChangeSetting}
            setopenchange={setopenchange}
          ></DangerousSetting>
        )}
      </div>
        {
          auth=== false && (
            <Login></Login>
          )
        }
      {openchange === true && (
        <ChangeSetting
          type={type}
          infoUser={infoUser}
          setInfoUser={setInfoUser}
          {...changeSetting}
          openchange={openchange}
          setopenchange={setopenchange}
          setChangeSetting={setChangeSetting}
        ></ChangeSetting>
      )}
    </>
  );
};

export default Settings;
