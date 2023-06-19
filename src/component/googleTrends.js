import { useEffect, useState } from "react";
import googleTrendsDataApi from "../api/googleTrendsApi";
import { COLLECTION_FORMATS } from "openai/dist/base";

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
      <tr
        style={{
          boxShadow: "1px 1px 3px 1px #aaaaaa",
          borderRadius: "10px",
        }}
      >
        <td style={{ textAlign: "left", padding: "17px" }}>{data.id}위</td>
        <td /> <td /> <td /> <td /> <td /> <td />
        <td style={{ textAlign: "center" }}>
          <a
            style={{
              textDecoration: "none",
              color: "#313a3d",
            }}
            href={data.discription.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        </td>
        <td /> <td /> <td /> <td /> <td /> <td /> <td /> <td />
        <td style={{ textAlign: "right" }}>검색횟수: </td>
        <td /> <td />
        <td
          style={{
            textAlign: "right",
            color: "#EC3340",
            paddingRight: "10px",
          }}
        >
          {data.traffic}
        </td>
      </tr>
      <tr height={20} />
    </tbody>
  ));

  return (
    <div
      style={{
        marginTop: "23px",
        marginLeft: "10px",
        marginRight: "10px",
        fontSize: "1.2em",
      }}
    >
      <table
        style={{
          display: "inline-block",
          height: "885px",
        }}
      >
        {googleTrands}
      </table>
    </div>
  );
}
