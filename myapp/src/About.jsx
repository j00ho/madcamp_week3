// About.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h2>소개 페이지</h2>
      <p>소개 페이지의 내용 추가</p>
      <Link to="/">홈 페이지로 이동</Link>
    </div>
  );
};

export default About;
