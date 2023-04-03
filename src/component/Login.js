import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import loginApi from "../api/loginApi";

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
  });
  const [who, setWho] = useState("");

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      who === "id" ? setInfo("id", result) : setInfo("password", result);
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
    console.log(result);
    console.log("userNo :" + localStorage.getItem("userNo"));
    if (result) {
      alert("로그인 완료");
      navigate("/main");
    }
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
    <div>
      <div>
        <input
          name="id"
          placeholder="id"
          defaultValue={userInfo.id}
          onChange={inputUserInfo}
        ></input>
        <button name="id" onMouseDown={onMouse} onMouseUp={stop}>
          🎤
        </button>
      </div>
      <div>
        <input
          name="password"
          placeholder="password"
          defaultValue={userInfo.password}
          onChange={inputUserInfo}
        ></input>
        <button name="pw" onMouseDown={onMouse} onMouseUp={stop}>
          🎤
        </button>
      </div>
      <div>
        <button onMouseUp={login}>로그인</button>
        {listening && <div>음성인식 활성화 중</div>}
      </div>
    </div>
  );
}
