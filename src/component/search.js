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
    <div key={data.id}>
      <a href={data.link}>{data.title}</a>
      <img src={data.img} />
    </div>
  ));

  return <div>{news}</div>;
}
