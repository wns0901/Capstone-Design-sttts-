import { useState } from "react";
import searchApi from "../api/searchApi";
import { useEffect } from "react";
import "./search.css";

export default function Search() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await searchApi();
      setData(result);
    };

    fetchData();
  }, []);

  const news = data.map((data) => (
    <div id="news__box__wrapper" key={data.id}>
      <div id="news__image">
        <img src={data.img} alt="" />
      </div>
      <div id="news__title">{data.title}</div>
      <div id="news__link">
        <a href={data.link} target="_blank" rel="noopener noreferrer">
          뉴스보기
        </a>
      </div>
    </div>
  ));

  return <div>{news}</div>;
}
