import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { AppBar, Toolbar, Typography, Button as MUIButton, Tabs, Tab, Box, Container } from '@mui/material';
import { BrowserRouter, Route, NavLink, Routes, Link} from 'react-router-dom';
import React, { Component } from 'react'

import { Button, Layout, Menu } from 'antd';
const { Header, Content } = Layout;

import B from './B.jsx';
import D from './D.jsx';
import E from './E.jsx';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VideoListPage from './C.jsx';

import LogoImage from './images/logo.png';
import BannerImage from './images/banner_long.png';



import './App.css';
import MyCalendarPage from './MyCalendarPage';

const MainPage = () => (
  <div>
    {/* Place your main page content here */}
    <img src={BannerImage} alt="Banner" style={{ width: '100%' }} /> {/* Replace banner.jpg with your banner image */}
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg" style={{ width: '1560px' }}>
        <AppBar position="static" style={{ width: '100%' }}>
          <Toolbar style={{ width: '100%' }}>
            <Link to="/">
              <img src={LogoImage} alt="로고" style={{ height: 50 }} />
            </Link>
            <Typography variant="h6" style={{ flexGrow: 1 }} />
            <Link to="/login"><Button type="primary">Login</Button></Link>
            <Link to="/register"><Button type="primary">Register</Button></Link>
          </Toolbar>
        </AppBar>

        <Tabs centered style={{ width: '100%' }}>
          <Tab label="마이페이지" component={Link} to="/mypage" />
          <Tab label="소비분석" component={Link} to="/analysis" />
          <Tab label="교육 및 강연" component={Link} to="/education" />
        </Tabs>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<B />} />
          <Route path="/education" element={<VideoListPage />} />
          <Route path="/graph" element={<D />} />
          <Route path="/youtube" element={<E />} />
          <Route path="/testCal" element={<MyCalendarPage />} />
          {/* 로그인 및 회원가입 경로 추가 필요 */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
};



export default App;