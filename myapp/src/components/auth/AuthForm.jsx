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

const AuthForm = ({ type }) => {
    const text = textMap[type];
    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form>
                <StyledInput autoComplete="username" name="username" placeholder="아이디" />
                <StyledInput 
                    autoComplete="new-password"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                />
                {type == 'register' && (
                    <StyledInput 
                        autoComplete="new-password" 
                        name="passwordConfirm" 
                        placeholder="비밀번호 확인" 
                        type="password"
                    />
                )}
                <Button block={true} style={{ marginTop: '20px', backgroundColor: '#add8e6' }}>{text}</Button>
            </form>
            <Footer>
                {type == 'login' ? (
                    <Link to = "/register">회원가입</Link>
                ) : (
                    <Link to = "/login">로그인</Link>
                )}
            </Footer>
        </AuthFormBlock>
    );
};

export default AuthForm;