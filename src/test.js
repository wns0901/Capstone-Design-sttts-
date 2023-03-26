import React, { useState } from "react";
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

  return (
    <div>
      <div>
        <span>{id}</span>
        <button onMouseUp={listen}>🎤</button>
        <button onMouseUp={stop}>멈춤</button>
      </div>
      <div>
        <span>{pw}</span>
        <button onMouseUp={listen}>🎤</button>
        <button onMouseUp={stop}>멈춤</button>
        {listening && <div>음성인식 활성화 중</div>}
      </div>
      <div>
        <button onMouseUp={login}>로그인</button>
      </div>
    </div>
  );
}

export default Test;
