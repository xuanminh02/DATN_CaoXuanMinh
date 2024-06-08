import { useQuery } from "@apollo/client";
import { createContext, Fragment, lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import NotFound404 from "./Components/NotFound/NotFound404";
import USERLOGIN from "./docs/graphql/query/user_login";
import { persistanceLogin } from "./Firebase/function/persistance";
const Bot= lazy(()=> import("./Components/Bot/Bot"))
const Admin= lazy(()=> import("./Components/Admin/Admin"))
const LoginPage= lazy(()=> import("./Components/LoginPage/LoginPage"))

export const UserContext = createContext();
const App = (props) => {
  const [auth, setauth] = useState(() => false);
  const [user, setuser] = useState(() => {});
  const [preLoading, setPreLoading] = useState(() => undefined);
  const [change, setChange] = useState(() => false);
  // eslint-disable-next-line
  const { data, error, loading } = useQuery(USERLOGIN, {
    variables: {
      uid: user?.uid || "",
    },
  });
  useEffect(() => {
    persistanceLogin(setuser, setauth, setPreLoading);
  }, [change]);
  useEffect(() => {
    setuser((prev) => ({ ...prev, data }));
  }, [data]);
  return (
    <UserContext.Provider
      value={{
        auth,
        setuser,
        setauth,
        user,
        error,
        loading,
        preLoading,
        setChange,
      }}
    >
      <Fragment>
        <Router>
          <Routes>
            <Route path="/*" element={<Home></Home>}></Route>
            {auth === true && (
              <Route path="/admin/*" element={<Suspense fallback={<></>}><Admin></Admin></Suspense>}></Route>
            )}
            {auth === false && (
              <Route
                path="/admin/*"
                element={<NotFound404></NotFound404>}
              ></Route>
            )}
            <Route path="/login" element={<Suspense fallback={<></>}><LoginPage></LoginPage></Suspense>}></Route>
          </Routes>
          <Suspense fallback={<></>}><Bot></Bot></Suspense>
        </Router>
      </Fragment>
    </UserContext.Provider>
  );
};

export default App;
