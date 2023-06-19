import { useState } from "react";
import searchApi from "../api/searchApi";
import { useEffect } from "react";

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #D2d2d2",
        boxShadow: "1px 1px 5px #888F92",
        borderRadius: "15px",
        margin: "0px 10px 15px 10px",
      }}
      key={data.id}
    >
      <div
        style={{
          marginTop: "10px",
        }}
      >
        <img src={data.img} alt="" />
      </div>
      <div
        style={{
          margin: "0 10px 0 10px",
        }}
      >
        {" "}
      </div>
      <div>
        <a
          style={{
            textAlign: "center",
            fontSize: "1.3em",
            textDecoration: "none",
            color: "#313a3d",
          }}
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.title}
        </a>
      </div>
      <div
        style={{
          margin: "0 10px 0 10px",
        }}
      ></div>
    </div>
  ));

  return <div>{news}</div>;
}
