import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { AppBar, Toolbar, Typography, Button as MUIButton, Tabs, Tab, Box } from '@mui/material';
import { BrowserRouter, Route, NavLink, Routes, Link } from 'react-router-dom';
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

const MainPage = () => (
  <div>
    {/* Place your main page content here */}
    <img src={BannerImage} alt="Banner" style={{ width: '100%' }} /> {/* Replace banner.jpg with your banner image */}
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/">
            <img src={LogoImage} alt="Logo" style={{ height: '50px' }} />
          </Link>
          <div>
            <Link to="/login"><Button type="primary">Login</Button></Link>
            <Link to="/register"><Button type="primary">Register</Button></Link>
          </div>
        </Header>
        <Content style={{ padding: '50px' }}>
          <Menu mode="horizontal">
            <Menu.Item key="mypage"><Link to="/mypage">마이페이지</Link></Menu.Item>
            <Menu.Item key="analysis"><Link to="/analysis">소비 분석</Link></Menu.Item>
            <Menu.Item key="education"><Link to="/education">교육 및 강연</Link></Menu.Item>
          </Menu>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<B />} />
            <Route path="/education" element={<VideoListPage />} />
            <Route path="/graph" element={<D />} />
            <Route path="/youtube" element={<E />} />
            {/* Add other routes here */}
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};



export default App;