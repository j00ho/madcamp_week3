import React, { useState } from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import AuthForm from "../components/auth/AuthForm";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    gender: "",
    campus: "",
    income: "",
    age: "",
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

    try {
      // 서버로 POST 요청 보내기
      // 여기에 필요한 API 호출 코드를 작성하세요
    } catch (error) {
      // 오류 처리
      console.error("회원가입 실패:", error.response.data.error);
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
