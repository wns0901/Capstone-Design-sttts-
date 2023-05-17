import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import "./Main.css";

export default function Main() {
  const [command, setCommand] = useState("");

  const navigator = useNavigate();

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setCommand(result);
    },
  });

  const doCommand = () => {
    console.log(command);
  };

  const moveToNews = () => {
    navigator("/search");
  };
  const moveToNetflix = () => {
    console.log("### start");
    navigator("/netflix");
  };

  return (
    <div className="main__wrapper">
      <div className="wrapper__chat"></div>
      <div className="wrapper__action">
        <div className="wrapper__action__box">
          <div className="action__search__box">
            <div className="search_title">
              <span className="mainTitle">당신이 원하는 정보를</span>
              <span className="mainTitle">찾아보세요</span>
            </div>
            <div className="search_box">
              <input
                className="searchBox"
                placeholder="명령어를 입력해주세요"
                defaultValue={command}
              />
              <button
                className="searchBtn"
                onMouseDown={listen}
                onMouseUp={() => {
                  stop();
                  doCommand();
                }}
              >
                🎤
              </button>
            </div>
            <div className="btn_box">
              <button className="mainBtn" onClick={moveToNews}>
                뉴스
              </button>
              <button className="mainBtn">구글트렌드</button>
            </div>
            <div className="btn_box">
              <button className="mainBtn">멜론차트</button>
              <button className="mainBtn" onClick={moveToNetflix}>
                인급동
              </button>
            </div>
            {listening && <div>음성인식 활성화 중</div>}
          </div>
          <div className="action__trend__box"></div>
        </div>
        <div className="wrapper__action__history"></div>
      </div>
    </div>
  );
}
