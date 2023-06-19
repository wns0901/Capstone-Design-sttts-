import { useEffect, useState } from "react";
import jusicDataApi from "../api/jusicApi";

export default function Jusic() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const axiosData = async () => {
      const result = await jusicDataApi();
      setData(result);
    };

    axiosData();
  }, []);

  const jusic = data.map((data, index) => (
    <tr
      key={index}
      style={{
        boxShadow: "1px 0px 3px 1px #aaaaaa",
        borderRadius: "10px",
      }}
    >
      <td>{data.name}</td>
      <td>{data.price}</td>
      <td>
        {data.upDown ? (
          <img
            src={data.upDown}
            style={{
              width: "7px",
              height: "6px",
              border: 0,
              borderRadius: "0%",
            }}
          />
        ) : null}
        {data.diff}
      </td>
      <td>{data.volume}</td>
    </tr>
  ));

  return (
    <li
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "1.3em",
      }}
    >
      <table>
        <thead>
          <tr
            style={{
              fontSize: "1.2em",
            }}
          >
            <th width={200}>종목명</th>
            <th width={200}>현재가</th>
            <th width={200}>전일비</th>
            <th width={200}>거래량</th>
          </tr>
          <tr /> <tr /> <tr />
        </thead>
        <tbody>{jusic}</tbody>
      </table>
    </li>
  );
}
