import React, { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import ComponentTopics from './Components/ComponentTopics'
import Navigation from './Components/Navigation'
import "./style.sass"

const SearchByTopics = (props) => {
  const arrayLink= useMemo(()=> [{link: "mathematiscs", text: "Mathematiscs"}, {link: "physics", text: "Physics"}, {link: "english-and-languages-arts", text: "English and Language Arts"}, {link: "social-studies", text: "Social studies"}, {link: "science", text: "Science"}, {link: "create-arts", text: "Create arts"}], [])
  return (
    <div className={"search-by-topic"}>
        <Navigation arrayLink={arrayLink} ></Navigation>
        <Routes>
            <Route path="/topic/mathematics" index element={<ComponentTopics></ComponentTopics>}></Route>
            {
              arrayLink?.map((item ,key)=> <Route key={key} path={"/topic/"+ item} element={<ComponentTopics></ComponentTopics>}></Route>)
            }
        </Routes>
    </div>
  )
}

export default SearchByTopics