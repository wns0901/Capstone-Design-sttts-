import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";

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
  const moveToNetflix = () =>{
    console.log('### start');
    navigator("/netflix");
  }

  return (
    <div>
      <div>
        <input placeholder="명령어를 입력해주세요" defaultValue={command} />
        <button
          onMouseDown={listen}
          onMouseUp={() => {
            stop();
            doCommand();
          }}
        >
          🎤
        </button>
      </div>
      <div>
        <button onClick={moveToNews}>뉴스</button>
        <button>구글트렌드</button>
        <button>멜론차트</button>
        <button onClick={moveToNetflix}>인급동</button>
      </div>
      {listening && <div>음성인식 활성화 중</div>}
    </div>
  );
}
