import { useEffect, useState } from "react";
import googleTrendsDataApi from "../api/googleTrendsApi";

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
    <tbody key={data.id}>
      <tr>
        <td>{data.id}</td>
        <td>{data.title}</td>
        <td>{data.traffic}</td>
      </tr>
      <tr>
        <td />
        <td>
          <a
            href={data.discription.url}
            style={{
              overflow: "hidden",
              "text-overflow": "ellipsis",
              "white-space": "normal",
              "line-height": "1.5",
              "word-wrap": "break-word",
              "text-align": "left",
              display: "-webkit-box",
              "-webkit-line-clamp": "1",
              "-webkit-box-orient": "vertical",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.discription.title}
          </a>
        </td>
        <td>검색 횟수</td>
      </tr>
      <tr height={8} />
    </tbody>
  ));

  return (
    <div
      style={{
        marginTop: "10px",
      }}
    >
      <table>{googleTrands}</table>
    </div>
  );
}
