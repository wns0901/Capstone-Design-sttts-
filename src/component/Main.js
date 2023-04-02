import { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

export default function Main() {
  const [command, setCommand] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setCommand(result);
    },
  });

  const doCommand = () => {
    console.log(command);
  };
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
        <button>뉴스</button>
        <button>구글트렌드</button>
        <button>멜론차트</button>
        <button>인급동</button>
      </div>
      {listening && <div>음성인식 활성화 중</div>}
    </div>
  );
}
