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

 const getSpeech = (text) => {
  let voices = [];

  //디바이스에 내장된 voice를 가져온다.
  const setVoiceList = () => {
    voices = window.speechSynthesis.getVoices();
  };

  setVoiceList();

  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    //voice list에 변경됐을때, voice를 다시 가져온다.
    window.speechSynthesis.onvoiceschanged = setVoiceList;
  }

  const speech = (txt) => {
    const lang = "ko-KR";
    const utterThis = new SpeechSynthesisUtterance(txt);

    utterThis.lang = lang;

    /* 한국어 vocie 찾기
       디바이스 별로 한국어는 ko-KR 또는 ko_KR로 voice가 정의되어 있다.
    */
    const kor_voice = voices.find(
      (elem) => elem.lang === lang || elem.lang === lang.replace("-", "_")
    );

    //힌국어 voice가 있다면 ? utterance에 목소리를 설정한다 : 리턴하여 목소리가 나오지 않도록 한다.
    if (kor_voice) {
      utterThis.voice = kor_voice;
    } else {
      return;
    }

    //utterance를 재생(speak)한다.
    window.speechSynthesis.speak(utterThis);
  };

  speech(text);
};


const ChatbotPage = () =>{
  const [command, setCommand] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setCommand(result);
    },
  });
  const doCommand = () => {
    console.log(command);
  };

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
    if(message == command){
      setCommand('');
    }
    await processMesaageToChatGPT(newMessages);
    
    // console.log(test.choices[0].text);
    // var msg = test.choices[0].text;
    
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
      getSpeech(data.choices[0].text);
      setTyping(false);
    });
  }
  return (
    <div>
      <div style={{position: "relative", height: "885px", width: "28vw"}}>
        <MainContainer>
          <ChatContainer>
          {listening && <div style={{
            zIndex : 9998,
          }}>음성인식 활성화 중</div>}
            <MessageList 
              typingIndicator ={typing ? <TypingIndicator content="ChatGPT is typing" />: null} 
              style={{
                fontSize : "20px",
              }}
              >
                
              {messages.map((message, i)=> {
                return (
                    <Message key = {i} model= {message}  />
                )
              })} 
            </MessageList>
            <MessageInput  placeholder="type message here" onSend={handleSend}
             value={command}
             onChange={setCommand}
           />
          </ChatContainer>
          
          {
           <button
              style={{
                position: "absolute",
                zIndex: 9999,
                top: "840px",
                left: "2px"
              }}
              className="search__box__btn"
              onMouseDown={listen}
              onMouseUp={() => {
                stop();
                doCommand();
              }}
            >
            🎤
            </button> }
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

