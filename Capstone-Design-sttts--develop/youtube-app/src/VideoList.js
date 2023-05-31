import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VideoList.css";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "snippet",
              chart: "mostPopular",
              regionCode: "KR",
              maxResults: 10,
              key: "KEY",
            },
          }
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="wrapper">
      <div className="wrapper-header">
        <span className="logo">STTTS</span>
        <button className="logout">Logout</button>
      </div>
      <div className="wrapper-body">
        <h1>인기 동영상</h1>
        <ul className="video-box">
          {videos.map((video) => (
            <li id="video-list" key={video.id}>
              <a href={`https://www.youtube.com/watch?v=${video.id}`}>
                <img
                  className="video-img"
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                />
              </a>
              <span className="video-title">{video.snippet.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoList;
