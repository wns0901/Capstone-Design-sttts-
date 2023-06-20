import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerApi from '../api/registerApi';
import './Login.css';

export default function Register() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
    passwordCheck: '',
  });

  const finishRegister = async () => {
    console.log('확인');
    if (await registerApi(userInfo)) {
      alert('회원가입 성공');
      navigate('/');
    }
  };
  const inputUserInfo = (text) => {
    setUserInfo((user) => {
      return { ...user, [text.target.name]: text.target.value };
    });
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
        <button
          className="signin"
          onClick={finishRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}
