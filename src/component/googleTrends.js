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
    <tbody id="trend__tbody" key={data.id}>
      <tr className="trend__keyword__box">
        <td id="trend__rank">{data.id}위</td>
        <td /> <td /> <td /> <td /> <td /> <td />
        <td id="trend__title">
          <a
            id="trend_title"
            href={data.discription.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        </td>
        <td /> <td /> <td /> <td /> <td />
        <td id="trend__count__title">검색수 </td>
        <td /> <td /> <td />
        <td id="trend__count">{data.traffic}</td>
      </tr>
      <tr height={20} />
    </tbody>
  ));

  return (
    <div className="trend__wrapper">
      <table className="trend__box__wrapper">{googleTrands}</table>
    </div>
  );
}
