import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerApi from "../api/registerApi";

export default function Register() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
    passwordCheck: "",
  });

  const finishRegister = async () => {
    console.log("확인");
    if (await registerApi(userInfo)) {
      alert("회원가입 성공");
      navigate("/login");
    }
  };
  const inputUserInfo = (text) => {
    setUserInfo((user) => {
      return { ...user, [text.target.name]: text.target.value };
    });
  };

  const checkPw = (text) => {
    if (userInfo.password === userInfo.passwordCheck) {
      alert("동일합니다.");
    } else {
      alert("비밀번호를 다시 확인하세요!!");
    }
  };

  return (
    <div>
      <div>
        <input name="id" placeholder="아이디" onChange={inputUserInfo}></input>
      </div>
      <div>
        <input
          name="password"
          placeholder="비밀번호"
          onChange={inputUserInfo}
        ></input>
      </div>
      <div>
        <input
          name="passwordCheck"
          placeholder="비밀번호 확인"
          onChange={inputUserInfo}
        ></input>
        <button onClick={checkPw}>확인</button>
      </div>

      <button onClick={finishRegister}>회원가입</button>
    </div>
  );
}
