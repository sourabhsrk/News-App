import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWSAPI_KEY;
  
  state = {
    progress: 0 
  }

  setProgress= (progress) =>{
    this.setState({progress: progress})
  }
  
  render() {
    return (
      <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        />
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="general" pagesize={6} country={"in"} category={"general"}/>} />
          <Route exact path="/business" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="business" pagesize={6} country={"in"} category={"business"}/>} />
          <Route exact path="/entertainment" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="entertainment" pagesize={6} country={"in"} category={"entertainment"}/>} />
          <Route exact path="/health" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="health" pagesize={6} country={"in"} category={"health"}/>} />
          <Route exact path="/science" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="science" pagesize={6} country={"in"} category={"science"}/>} />
          <Route exact path="/sports" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="sports" pagesize={6} country={"in"} category={"sports"}/>} />
          <Route exact path="/technology" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="technology" pagesize={6} country={"in"} category={"technology"}/>} />
        </Routes>
      </Router>
    )
  }
}
