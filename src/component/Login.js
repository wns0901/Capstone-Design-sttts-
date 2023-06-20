import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeechRecognition } from 'react-speech-kit';
import loginApi from '../api/loginApi';
import './Login.css';

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
  });
  const [who, setWho] = useState('');

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      who === 'id' ? setInfo('id', result) : setInfo('password', result);
    },
  });

  const setInfo = (type, value) => {
    setUserInfo((user) => {
      return { ...user, [type]: value };
    });
  };
  const navigate = useNavigate();

  const login = async () => {
    const result = await loginApi(userInfo);
    if (result) {
      localStorage.setItem('user', userInfo.id);
      navigate('/main');
    }
  };

  const register = () => {
    navigate('/register');
  };

  const whoClick = (e) => {
    setWho(e.target.name);
  };

  const inputUserInfo = (text) => {
    setUserInfo((user) => {
      return { ...user, [text.target.name]: text.target.value };
    });
  };

  const onMouse = (e) => {
    whoClick(e);
    listen();
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
