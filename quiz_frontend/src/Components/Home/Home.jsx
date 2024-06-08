import React, { Fragment, lazy, useContext, Suspense} from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { UserContext } from '../../App'
import CreateClass from '../Admin/Components/CreateClass/CreateClass'
import CreateSet from '../Admin/Components/CreateSet/CreateSet'
import Term from '../Admin/Components/Term/Term'
import Header from '../Header/Header'
import JoinClass from '../JoinClass/JoinClass'
import NavigationResponsive from '../NavigationResponsive/NavigationResponsive'
import { NeedAuthenticate } from '../NeedAuthenticate/NeedAuthenticate'
import NotFound404 from '../NotFound/NotFound404'
import MainProfile from '../Profile/MainProfile'
import Search from '../NavigationResponsive/Search/Search'
import Settings from '../Settings/Settings'
import SkeletonAuth from '../SkeletonApp/SkeletonAuth'
import Classes from './Classes/Classes'
import DetailClass from './Classes/Components/DetailClass/DetailClass'
import Main from './Main'
import { isMobile } from "react-device-detect"
import EditTerm from '../EditTerm/EditTerm'
import CreateQuiz from '../Admin/Components/CreateQuiz/CreateQuiz'
import CreateQuizMain from '../Admin/Components/CreateQuiz/CreateQuizMain/CreateQuizMain'
const Activities= lazy(()=> import('./Activities/Activities'))

const Home = (props) => {
  const location= useLocation()
  const {auth, error, loading, preLoading}= useContext(UserContext)
  return (
    <Fragment>
      {
        error && <div>{error}</div>
      }
      {
        (preLoading=== true || loading=== true  ) ? <SkeletonAuth></SkeletonAuth> :
        <>
          {
            !location?.pathname?.includes("/admin") && !location?.pathname?.split("/")[location?.pathname?.split("/")?.length -1 ]?.includes("test") &&
            <Header></Header>
          }
          {
            isMobile=== true &&
            <Fragment>
              {
                !location?.pathname?.split("/")[location?.pathname?.split("/")?.length -1 ]?.includes("test") &&
                <NavigationResponsive></NavigationResponsive>
              }
            </Fragment>
          }
          <Fragment>
            {
              !location?.pathname?.split("/")[location?.pathname?.split("/")?.length -1 ]?.includes("test") &&
              <NavigationResponsive></NavigationResponsive>
            }
          </Fragment>
          <Fragment>
            {
              !location?.pathname?.split("/")[location?.pathname?.split("/")?.length -1 ]?.includes("test") &&
              <NavigationResponsive></NavigationResponsive>
            }
          </Fragment>
          <Routes>  
            {
              !location?.pathname?.includes("/admin") &&
              <Route path="/" index element={<Main></Main>}></Route>
            }
            {
              auth=== true &&
              <>
                <Route path="/activities/*" element={<Suspense fallback={<div>Loading...</div>}><Activities /></Suspense>} ></Route>
                <Route path="/classes/*" element={<Classes></Classes>}></Route>
                <Route path="/create-set" element={<CreateSet></CreateSet>}></Route>
                <Route path="/create-quiz" element={<></>}></Route>
                <Route path="/create-class" element={<CreateClass></CreateClass>}></Route>
                <Route path="/term/:id_term/:title_term/*" element={<Term></Term>}></Route>
                <Route path="/join/class/:code_invite" element={<JoinClass></JoinClass>}></Route>
                <Route path="/new-question/:id_quiz" element={<CreateQuizMain />} />
                <Route path="/create-quiz/:id_quiz/*" element={<CreateQuiz />} />
                <Route path="/edit-term/:id_term" element={<EditTerm />} />
                <Route path="/*" element={<NotFound404></NotFound404>}></Route>
              </>
            }
            {
              auth=== false && 
              <>
                <Route path="/activities/*" element={<NeedAuthenticate></NeedAuthenticate>}></Route>
                <Route path="/classes/*" element={<NeedAuthenticate></NeedAuthenticate>}></Route>
                <Route path="/term/:id_term/:title_term/*" element={<Term></Term>}></Route>
                <Route path="/*" element={<NotFound404></NotFound404>}></Route>
              </>
            }
            <Route path="/class/:id_class/*" element={<DetailClass></DetailClass>}></Route>
            <Route path="/settings" element={<Settings></Settings>}></Route>
            <Route path="/search" element={<Search></Search>}></Route>
            <Route path="/profile/:id_user/*" element={<MainProfile></MainProfile>}></Route>
            <Route path="/*" element={<NotFound404></NotFound404>}></Route>

          </Routes>
        
        </>
      }
    </Fragment>
  )
}

export default Home