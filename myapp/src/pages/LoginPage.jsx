import React, { useState } from "react";
import Axios from "axios";
import AuthTemplate from "../components/auth/AuthTemplate";
import AuthForm from "../components/auth/AuthForm";

const LoginPage = () => {
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

      // 로그인 성공 시 처리
      console.log(response.data.message);
      // 예를 들어, 로그인 성공 후 리다이렉트 등을 수행할 수 있습니다.
    } catch (error) {
      // 로그인 실패 시 처리
      console.error("로그인 실패:", error.response.data.error);
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
