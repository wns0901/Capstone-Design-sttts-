import { useEffect, useState } from "react";
import googleTrendsDataApi from "../api/googleTrendsApi";
import { COLLECTION_FORMATS } from "openai/dist/base";
import "./googleTrend.css";

export default function GoogleTrands() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const axiosData = async () => {
      const result = await googleTrendsDataApi();
      setData(result);
    };

    axiosData();
  }, []);

  const googleTrands = data.map((data) => (
    <div className="trend__keyword__box" key={data.id}>
      <a
        id="trend_title"
        href={data.discription.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div id="trend__rank">{data.id}위</div>
        <div id="trend__title">{data.title}</div>
        <div id="trend__count">{data.traffic}</div>
      </a>
    </div>
  ));

  return <div className="trend__wrapper">{googleTrands}</div>;
}
