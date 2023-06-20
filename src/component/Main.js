import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import "./Main.css";
import "./chat.css";
import Search from "./search";
import { test } from "./netflix";
import Youtube from "./Youtube";
import ScrollBox from "./box";
import GoogleTrands from "./googleTrends";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = process.env.REACT_APP_API_KEY;
// const API_KEY = "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";
const ChatbotPage = () => {
  const [command, setCommand] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setCommand(result);
    },
  });
  const doCommand = () => {
    console.log(command);
  };

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "안녕하세요 무엇을 도와드릴까요? ",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setTyping(true);
    if (message == command) {
      setCommand("");
    }
    await processMesaageToChatGPT(newMessages);
  };

  async function processMesaageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((value) => {
      let role = "";
      if (value.sender == "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: value.message };
    });
    const systemMessage = {
      role: "system",
      content: "test",
    };
    const apiRequestBody = {
      prompt: chatMessages.map((message) => message.message).join("\n") + "\n",
      max_tokens: 1024,
      temperature: 0.7,
      n: 1,
      stop: ".",
    };
    await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].text,
            sender: "ChatGPT",
          },
        ]);
        setTyping(false);
      });
  }
  return (
    <div>
      <div className="chat__box__body">
        <MainContainer>
          <ChatContainer>
            {listening && <div>음성인식 활성화 중</div>}
            <MessageList
              typingIndicator={
                typing ? <TypingIndicator content="답변을 기다리는 중" /> : null
              }
              style={{
                fontSize: "20px",
              }}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>

            <MessageInput
              placeholder="메세지를 입력해주세요"
              onSend={handleSend}
              value={command}
              onChange={setCommand}
            ></MessageInput>
          </ChatContainer>
          <button
            style={{
              position: "absolute",
              zIndex: 9999,
              height: "25px",
              top: "695px",
              left: "5px",
              fontSize: "1em",
              background: "white",
              border: "none",

              cursor: "pointer",
            }}
            className="search__box__btn"
            onMouseDown={listen}
            onMouseUp={() => {
              stop();
              doCommand();
            }}
          >
            🎤
          </button>
        </MainContainer>
      </div>
    </div>
  );
};

export default function Main() {
  const [command, setCommand] = useState("");
  const [target, setTarget] = useState("");
  const axios = require("axios");
  const cheerio = require("cheerio");
  const navigator = useNavigate();

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setCommand(result);
    },
  });

  const doCommand = () => {
    console.log(command);
  };

  const changeToNews = () => {
    setTarget("뉴스");
  };

  const changeToYoutube = () => {
    setTarget("유튜브");
  };

  const moveToNetflix = () => {
    console.log("### start");
    navigator("/netflix");
  };

  const changeToJusic = () => {
    setTarget("증권");
  };
  const changeToMusic = () => {
    setTarget("뮤직");
  };

  return (
    <div className="mainClass">
      <div className="main__wrapper">
        <div className="main__wrapper__header">
          <div className="header__title">STTTS</div>
          <div className="my__page">
            <div className="name">ooo님</div>
            <button className="logout">로그아웃</button>
          </div>
        </div>
        <div className="main__wrapper__body">
          <div className="wrapper__chat__box">
            <div className="chat__box__header">챗봇 스트트</div>
            <div className="chat__box__body">
              <ChatbotPage />
            </div>
          </div>
          <div className="wrapper__action__box">
            {/* <div className="action__search__box">
              <input
                className="search__box__txt"
                placeholder="명령어를 입력해주세요"
                defaultValue={command}
              />
              <button
                className="search__box__btn"
                onMouseDown={listen}
                onMouseUp={() => {
                  stop();
                  doCommand();
                }}
              >
                🎤
              </button>
            </div> */}
            <div className="action__ad__box">
              <span id="action__ad__title">STTTS</span>
              <span id="action__ad__message">원하는 정보를 찾아보세요 !</span>
            </div>
            <div className="action__btn__wrapper">
              <button className="main__btn__news" onClick={changeToNews}>
                <span class="main__btn__text">NEWS</span>
              </button>
              <button className="main__btn__ju" onClick={changeToJusic}>
                <span class="main__btn__text">STOCKS</span>
              </button>
              <button className="main__btn__music" onClick={changeToMusic}>
                <span class="main__btn__text">MUSIC</span>
              </button>
              <button className="main__btn__yt" onClick={changeToYoutube}>
                <span class="main__btn__text">TV</span>
              </button>
            </div>
            {/* {listening && <div>음성인식 활성화 중</div>} */}
            <div className="action__page__box">
              {/* <div className="page__title">
                {target ? target : "선택해주세요"}
              </div> */}
              <div className="page__area">
                <ScrollBox target={target} />
              </div>
            </div>
          </div>
          <div className="wrapper__trend__box">
            <div className="trend__header">
              <div className="trend__header__left">실시간급상승</div>
              <div className="trend__header__right">▼</div>
            </div>
            {/* <ScrollBox target={'트렌드'} /> */}
            <GoogleTrands />
          </div>
        </div>
      </div>
    </div>
  );
}
