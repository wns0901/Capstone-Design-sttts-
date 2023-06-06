import { useEffect } from 'react';
import youtubeDataApi from '../api/youtubeDataApi';
import { useState } from 'react';
import './VideoList.css';

export default function Youtube() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const axiosData = async () => {
      const result = await youtubeDataApi();
      setData(result);
    };

    axiosData();
  }, []);

  const youtube = data.map((data, index) => (
    <li
      id="video-list"
      key={index}
    >
      <a href={`https://www.youtube.com/watch?v=${data.id}`}>
        <img
          className="video-img"
          src={data.snippet.thumbnails.medium.url}
          alt={data.snippet.title}
        />
      </a>
      <span className="video-title">{data.snippet.title}</span>
    </li>
  ));
  return (
    <div className="wrapper">
      {/* <div className="wrapper-header">
        <span className="logo">STTTS</span>
        <button className="logout">Logout</button>
      </div> */}
      <div className="wrapper-body">
        <h1>인기 동영상</h1>
        <ul className="video-box">{youtube}</ul>
      </div>
    </div>
  );
}
