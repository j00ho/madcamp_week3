import React, { useState } from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import AuthForm from "../components/auth/AuthForm";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    gender: '', // 0 또는 1 입력
    campus_info: '',
    yes_income: '', // 0 또는 1 입력
    age: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handleSubmit 함수 실행 중");
    try {
      // 서버로 POST 요청 보내기
      const response = await Axios.post(
        "http://localhost:3000/user/signup",
        formData,
        { withCredentials: true } // CORS 이슈를 해결하기 위해 credentials 옵션을 설정
      );
     
      // 회원가입 성공 시 처리
      console.log(response.data.message);
      // 회원가입 성공 후 로그인 페이지로 이동
      navigate('/login');

    } catch (error) {
      // 회원가입 실패 시 처리
      console.error("회원가입 실패:", error.response.data.error);
      // 예를 들어, 에러 메시지를 화면에 표시할 수 있습니다.
    }
  };

  return (
    <AuthTemplate>
      <AuthForm
        type="register"
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthTemplate>
  );
};

export default RegisterPage;
