import { useEffect, useState } from 'react';
import melonDataApi from '../api/melonApi';

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
    <tbody key={index}>
      <tr>
        <td
          rowSpan={2}
          align="center"
        >
          {data.rank}
        </td>
        <td
          rowSpan={2}
          align="center"
        >
          <img
            src={data.imgSrc}
            style={{
              width: '60px',
              height: '60px',
              border: 0,
              borderRadius: '0%',
            }}
          />
        </td>
        <td align="left">{data.artist}</td>
      </tr>
      <tr>
        <td align="left">{data.title}</td>
      </tr>
    </tbody>
  ));

  return (
    <div>
      <table>{melon}</table>
    </div>
  );
}