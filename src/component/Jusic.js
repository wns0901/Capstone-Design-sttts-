import { useEffect, useState } from "react";
import jusicDataApi from "../api/jusicApi";
import "./jusic.css";
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
    <tbody id="ju__box__wrapper" key={index}>
      <tr id="ju__box__wrapper">
        <td height={50}>{data.name}</td>
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
    </tbody>
  ));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "1.3em",
      }}
    >
      <table id="ju__table__wrapper">
        <thead>
          <tr id="ju__header">
            <th width={200} height={50}>
              종목명
            </th>
            <th width={200}>현재가</th>
            <th width={200}>전일비</th>
            <th width={200}>거래량</th>
          </tr>
        </thead>
        {jusic}
      </table>
    </div>
  );
}
