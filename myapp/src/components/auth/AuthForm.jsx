import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: #fff123;
        margin-bottom: lrem;
    }
`;

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #14fd3d;
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus{
        color: $oc-teal-7;
        border-bottom: 1px solid #678321;
    }
    & + & {
        margin-top: 1rem;
    }
`;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: #534222;
        text-decoration: underline;
        &:hover{
            color: #534221;
        }
    }
`;

const textMap = {
    login: '로그인',
    register: '회원가입',
};

const AuthForm = ({ type, formData, onChange, onSubmit }) => {
    const text = textMap[type];
    const isRegister = type === 'register';

    // 추가: 버튼 활성화 여부 상태값
    const isButtonDisabled =
        isRegister &&
        (formData.password !== formData.passwordConfirm ||
            !formData.email ||
            !formData.password ||
            !formData.passwordConfirm ||
            !formData.username || // 추가 필드: 이름
            !formData.gender || // 추가 필드: 성별
            !formData.campus_info || // 추가 필드: 대학 정보
            !formData.yes_income || // 추가 필드: 소득 여부
            !formData.age); // 추가 필드: 나이

    return (
        <AuthFormBlock>
          <h3>{text}</h3>
          <form onSubmit={onSubmit}>
            <StyledInput
              autoComplete="useremail"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={onChange}
            />
            <StyledInput
              autoComplete="new-password"
              name="password"
              placeholder="비밀번호"
              type="password"
              value={formData.password}
              onChange={onChange}
            />
                {isRegister && (
                <>
                    {/* 비밀번호 확인란 입력 시 다르다는 것 알려주는 기능 추가해야 함 */}
                    <StyledInput 
                        autoComplete="new-password" 
                        name="passwordConfirm" 
                        placeholder="비밀번호 확인" 
                        type="password"
                        value={formData.passwordConfirm}
                        onChange={onChange}
                    />
                    {formData.password !== formData.passwordConfirm && (
                            <div style={{ color: 'red', marginTop: '0.5rem' }}>비밀번호가 일치하지 않습니다.</div>
                        )}
                    {/* 추가 필드: 이름 */}
                    <StyledInput
                        name="username"
                        placeholder="이름"
                        value={formData.username}
                        onChange={onChange}
                    />

                    {/* 추가 필드: 성별 */}
                    <StyledInput
                        name="gender"
                        placeholder="성별(남자:0, 여자:1)"
                        type="number"
                        value={formData.gender}
                        onChange={onChange}
                    />

                    {/* 추가 필드: 대학 정보 */}
                    <StyledInput
                        name="campus_info"
                        placeholder="대학 정보"
                        value={formData.campus_info}
                        onChange={onChange}
                    />

                    {/* 추가 필드: 소득 여부 */}
                    <StyledInput
                        name="yes_income"
                        placeholder="소득 여부(없음:0, 있음:1)"
                        type="number"
                        value={formData.yes_income}
                        onChange={onChange}
                    />

                    {/* 추가 필드: 나이 */}
                    <StyledInput
                        name="age"
                        placeholder="나이"
                        type="number"
                        value={formData.age}
                        onChange={onChange}
                    />
                    </>
                )}
                <Button block={true} style={{ marginTop: '20px', backgroundColor: '#add8e6' }} onClick = {onSubmit} disabled = {isButtonDisabled}>{text}</Button>
            </form>
            <Footer>{isRegister ? <Link to="/login">로그인</Link> : <Link to="/register">회원가입</Link>}</Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;