import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom';
import React, { Component } from 'react'

import B from './B.jsx';
import C from './C.jsx';
import D from './D.jsx';
import E from './E.jsx';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';



import './App.css'


function EventPractice() {
  const [message, setMessage] = useState('Hello World!');

  return (
    <div>
      <h1>Event Practice</h1>
      <input
        type='text'
        name='message'
        placeholder='Enter a message...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => {
        alert(message);
        setMessage('');
      }}>Click Me</button>
    </div>
  );
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
    <BrowserRouter>
      <Routes>

        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<B />} />
        <Route path="/services" element={<C />} />
        <Route path="/graph" element={<D />} />
        <Route path="/youtube" element={<E />} />
      
        <Route path="/login" element = {<LoginPage />}  />
        <Route path="/register" element = {<RegisterPage />}  />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;