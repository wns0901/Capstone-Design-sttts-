import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import loginApi from "../api/loginApi";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [who, setWho] = useState("");

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      who === "id" ? setId(result) : setPw(result);
    },
  });

  const navigate = useNavigate();

  const login = async () => {
    const userInfo = {
      id: id.replaceAll(" ", ""),
      password: pw.replaceAll(" ", ""),
    };

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

  return (
    <div>
      <div>
        <input placeholder="id" defaultValue={id}></input>
        <button name="id" onMouseDown={whoClick} onMouseUp={listen}>
          🎤
        </button>
        <button onMouseUp={stop}>멈춤</button>
      </div>
      <div>
        <input placeholder="password" defaultValue={pw}></input>
        <button name="pw" onMouseDown={whoClick} onMouseUp={listen}>
          🎤
        </button>
        <button onMouseUp={stop}>멈춤</button>
      </div>
      <div>
        <button onMouseUp={login}>로그인</button>
        {listening && <div>음성인식 활성화 중</div>}
      </div>
    </div>
  );
}
