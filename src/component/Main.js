import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeechRecognition } from 'react-speech-kit';
import './Main.css';
import Search from './search';
import { test } from './netflix';
import Youtube from './Youtube';
import ScrollBox from './box';
import GoogleTrands from './googleTrends';

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
        <div className="wrapper__chat__box"></div>
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
