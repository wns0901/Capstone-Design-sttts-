import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";

function Test() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      !id ? setId(result) : setPw(result);
    },
  });
  const login = () => {
    const userId = "장준영";
    const userPw = "1 2 3 4";

    if (id === userId && pw === userPw) {
      alert("로그인 완료");
    }
  };
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <span>id : </span>
        <input defaultValue={id}></input>
        <button onMouseUp={listen}>🎤</button>
        <button onMouseUp={stop}>멈춤</button>
      </div>
      <div>
        <span>pw : </span>
        <input defaultValue={pw}></input>
        <button onMouseUp={listen}>🎤</button>
        <button onMouseUp={stop}>멈춤</button>
        {listening && <div>음성인식 활성화 중</div>}
      </div>
      <div>
        <button onMouseUp={login}>로그인</button>
      </div>
      <button
        onClick={async () => {
          const result = await axios.get("http://localhost:3000/app");
          console.log(result);
        }}
      />
    </div>
  );
}

export default Test;
