import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default function App(){
  const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
  const [progress,setProgress] = useState(0);

  return (
    <Router>
      <LoadingBar
      color='#f11946'
      progress={progress}
      />
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<News setProgress = {setProgress} apiKey = {apiKey} key="general" pagesize={6} country={"in"} category={"general"}/>} />
        <Route exact path="/business" element={<News setProgress = {setProgress} apiKey = {apiKey} key="business" pagesize={6} country={"in"} category={"business"}/>} />
        <Route exact path="/entertainment" element={<News setProgress = {setProgress} apiKey = {apiKey} key="entertainment" pagesize={6} country={"in"} category={"entertainment"}/>} />
        <Route exact path="/health" element={<News setProgress = {setProgress} apiKey = {apiKey} key="health" pagesize={6} country={"in"} category={"health"}/>} />
        <Route exact path="/science" element={<News setProgress = {setProgress} apiKey = {apiKey} key="science" pagesize={6} country={"in"} category={"science"}/>} />
        <Route exact path="/sports" element={<News setProgress = {setProgress} apiKey = {apiKey} key="sports" pagesize={6} country={"in"} category={"sports"}/>} />
        <Route exact path="/technology" element={<News setProgress = {setProgress} apiKey = {apiKey} key="technology" pagesize={6} country={"in"} category={"technology"}/>} />
      </Routes>
    </Router>
  )
}
