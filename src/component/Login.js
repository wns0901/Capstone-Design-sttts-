import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginApi from '../api/loginApi';
import './Login.css';

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
  });

  const navigate = useNavigate();

  const login = async () => {
    const result = await loginApi(userInfo);
    console.log(result);
    if (result) {
      localStorage.setItem('user', userInfo.id);
      navigate('/main');
    }
  };

  const register = () => {
    navigate('/register');
  };

  const inputUserInfo = (text) => {
    setUserInfo((user) => {
      return { ...user, [text.target.name]: text.target.value };
    });
  };

  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="login__wrapper">
      <div className="login__title__wrapper">
        <div className="loginTitle">STTTS</div>
      </div>
      <div className="login__action__wrapper">
        <div className="login__text__title">* ID</div>
        <input
          className="login__text__box"
          name="id"
          defaultValue={userInfo.id}
          onChange={inputUserInfo}
        ></input>
        <div className="login__text__title">* PASSWORD</div>
        <input
          className="login__text__box"
          name="password"
          type="password"
          defaultValue={userInfo.password}
          onChange={inputUserInfo}
          onKeyDown={activeEnter}
        ></input>
        <a
          className="signUp"
          onClick={register}
        >
          회원이 아니신가요?
        </a>
        <button
          className="signin"
          onMouseUp={login}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}
