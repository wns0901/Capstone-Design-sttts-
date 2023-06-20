import { useEffect, useState } from "react";
import melonDataApi from "../api/melonApi";

export default function Melon() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const axiosData = async () => {
      const result = await melonDataApi();
      setData(result);
    };

    axiosData();
  }, []);

  const melon = data.map((data, index) => (
    <tbody
      style={{
        boxShadow: "1px 0px 3px 1px #aaaaaa",
        borderRadius: "10px",
      }}
      key={index}
    >
      <tr>
        <td
          rowSpan={2}
          align="center"
          style={{
            fontSize: "1.5em",
          }}
        >
          {data.rank}
        </td>
        <td width={90} rowSpan={2} align="center">
          <img
            src={data.imgSrc}
            style={{
              width: "100px",
              height: "100px",
              border: 0,
              borderRadius: "0%",
            }}
          />
        </td>
        <td
          width={700}
          align="center"
          style={{
            color: "#3d4346",
          }}
        >
          {data.artist}
        </td>
      </tr>
      <tr>
        <td
          align="center"
          style={{
            color: "#26292b",
            fontSize: "1.2em",
          }}
        >
          {data.title}
        </td>
      </tr>
    </tbody>
  ));

  return (
    <div>
      <table>{melon}</table>
    </div>
  );
}
