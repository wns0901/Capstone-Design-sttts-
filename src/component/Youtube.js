import { useEffect } from "react";
import youtubeDataApi from "../api/youtubeDataApi";
import { useState } from "react";
import "./VideoList.css";

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
    <li id="video-list" key={index}>
      <a
        href={`https://www.youtube.com/watch?v=${data.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="video-img"
          src={data.snippet.thumbnails.medium.url}
          alt={data.snippet.title}
        />
        <span className="video-title">{data.snippet.title}</span>
      </a>
    </li>
  ));
  return (
    <div className="wrapper">
      <div className="wrapper-body">
        <ul className="video-box">{youtube}</ul>
      </div>
    </div>
  );
}
