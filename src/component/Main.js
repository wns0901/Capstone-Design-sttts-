import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeechRecognition } from 'react-speech-kit';
import './Main.css';
import Search from './search';
import { test } from './netflix';
import Youtube from './Youtube';
import ScrollBox from './box';
import GoogleTrands from './googleTrends';
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const ChatbotPage = () =>{

const [typing, setTyping] = useState(false)
  const [messages , setMessages] = useState([
    {
      message: "안녕하세요 무엇을 도와드릴까요? ",
      sender: "ChatGPT"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setTyping(true);
    await processMesaageToChatGPT(newMessages);
  }

  async function processMesaageToChatGPT(chatMessages){
    let apiMessages = chatMessages.map((value)=> {
      let role ="";
      if(value.sender == "ChatGPT"){
        role = "assistant"
      } else{
        role ="user"
      } return {role: role, content: value.message}
    });
    const systemMessage = {
      role : "system",
      content: "test"
    }
    const apiRequestBody = {
      prompt: chatMessages.map((message) => message.message).join("\n") + "\n",
      max_tokens: 1024,
      temperature:0.7,
      n:1,
      stop:".",

    }
    await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      method : "POST",
      headers: {
        "Authorization" : "Bearer " + API_KEY,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(apiRequestBody),
    }).then((data)=>{
      return data.json();
    }).then((data)=>{
      console.log(data);
      setMessages(
        [...chatMessages, {
          message: data.choices[0].text,
          sender:"ChatGPT"
        }]
      );
      setTyping(false);
    });
  }
  return (
    <div>
      <div style={{position: "relative", height: "885px", width: "28vw"}}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator ={typing ? <TypingIndicator content="ChatGPT is typing"/>: null}>
              {messages.map((message, i)=> {
                return <Message key = {i} model= {message}/>
              })}
            </MessageList>
            <MessageInput placeholder="type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}



export default function Main() {
  const [command, setCommand] = useState('');
  const [target, setTarget] = useState('');
  const axios = require('axios');
  const cheerio = require('cheerio');
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
    setTarget('뉴스');
  };

  const changeToYoutube = () => {
    setTarget('유튜브');
  };

  const moveToNetflix = () => {
    console.log('### start');
    navigator('/netflix');
  };

  const changeToJusic = () => {
    setTarget('증권');
  };
  const changeToMusic = () => {
    setTarget('뮤직');
  };

  return (
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
        <ChatbotPage/>
        </div>
        <div className="wrapper__action__box">
          <div className="action__search__box">
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
          </div>
          <div className="action__message__txt">
            <span id="title">STTTS</span>
            <span id="message">원하는 정보를 찾아보세요 !</span>
          </div>
          <div className="action__btn__wrapper">
            <button
              className="mainBtn"
              onClick={changeToNews}
            >
              뉴스
            </button>
            <button
              className="mainBtn"
              onClick={changeToJusic}
            >
              증권
            </button>
            <button
              className="mainBtn"
              onClick={changeToMusic}
            >
              음악
            </button>
            <button
              className="mainBtn"
              onClick={changeToYoutube}
            >
              유튜브
            </button>
          </div>
          {listening && <div>음성인식 활성화 중</div>}
          <div className="action__history__box">
            <div className="history__title">
              {target ? target : '선택해주세요'}
            </div>
            <div className="history__keyword">
              <ScrollBox target={target} />
            </div>
          </div>
        </div>
        <div className="wrapper__trend__box">
          {/* <ScrollBox target={'트렌드'} /> */}
          <GoogleTrands />
        </div>
      </div>
      <div className="main__wrapper__footer"></div>
    </div>
  );
}
