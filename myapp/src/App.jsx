import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, NavLink, BrowserRouter, Routes } from 'react-router-dom';
import React, { Component } from 'react'

import B from './B';
import C from './C';
import CalendarPage from './CalendarPage';
import E from './E';


import './App.css'


class EventPractice extends Component {
  state = {
    message: 'Hell World!'
  }
  render() {
    return(
      <div>
        <h1>Event Prac</h1>
        <input
          type='text'
          name='message'
          placeholder='dsfdsfs'
          value={this.state.message}
          onChange={
            (e) => {
              this.setState({
                message: e.target.value
              })
            }
          }
        />
        <button onClick={
          () => {
            alert(this.state.message);
            this.setState({message: ''});
          }
        }>버튼</button>
      </div>
    );
  }
}


const Home = () => <div>홈 페이지</div>;
const About = () => <div>소개 페이지</div>;
const Services = () => <div>서비스 페이지</div>;
const Portfolio = () => <div>포트폴리오 페이지</div>;
const Contact = () => <div>연락처 페이지</div>;

function App() {
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: '48px',
    fontWeight: 'bold',
    padding: 16
  }
  return (
    <Router>
      <nav>
	        <NavLink style={style} to="/" exact>홈</NavLink>
          <NavLink style={style} to="/about">소개</NavLink>
          <NavLink style={style} to="/services">서비스</NavLink>
          <NavLink style={style} to="/portfolio">마이페이지</NavLink>
          <NavLink style={style} to = "/contact">연락처</NavLink>
      </nav>
      <Routes>

        <Route path="/" exact element={Home} />
        <Route path="/about" element={<B />} />
        <Route path="/services" element={<C />} />
        <Route path="/portfolio" element={<CalendarPage />} />
        <Route path="/contact" element={<E />} />
      </Routes>
    </Router>
  );
}

export default App;