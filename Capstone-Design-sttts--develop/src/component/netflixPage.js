import { useState } from "react";
import { useEffect } from "react";
import movieApi from "../api/movieApi";

export default function Netflix() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await movieApi();
      setData(result);
    };

    fetchData();
  }, []);

  const movies = data.map((data) => (
    <div key={data.id}>
      <a>{data.title}</a>
      <img src={data.image}alt="" />
    </div>
  ));

  return <div>{movies}</div>;
}
