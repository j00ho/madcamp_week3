import React, { useState } from "react";
import Axios from "axios";
import AuthTemplate from "../components/auth/AuthTemplate";
import AuthForm from "../components/auth/AuthForm";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "http://localhost:3000/user/login",
        formData,
        { withCredentials: true } // CORS 이슈를 해결하기 위해 credentials 옵션을 설정
      );

      // 서버로부터 받은 사용자 정보를 sessionStorage에 저장
      sessionStorage.setItem("authToken", response.data.authToken);
      sessionStorage.setItem("userId", response.data.userId);
      console.log(response.data.message);

      // 확인: sessionStorage에 토큰이 제대로 저장되었는지 로그로 확인
      console.log("저장된 토큰:", sessionStorage.getItem("authToken"));
      console.log("저장된 사용자 ID:", sessionStorage.getItem("userId"));
      
      // 로그인 성공 후 메인페이지로 이동 (*로그인된 후의 페이지!!)
      navigate('/');

    } catch (error) {
      // 로그인 실패 시 처리
      console.error("로그인 실패:", error);
      // 예를 들어, 에러 메시지를 화면에 표시할 수 있습니다.
    }
  };

  return (
    <AuthTemplate>
      <AuthForm
        type="login"
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AuthTemplate>
  );
};

export default LoginPage;
