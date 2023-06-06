import { useEffect, useState } from 'react';
import jusicDataApi from '../api/jusicApi';

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
    <tr key={index}>
      <td>{data.name}</td>
      <td>{data.price}</td>
      <td>
        {data.upDown ? (
          <img
            src={data.upDown}
            style={{
              width: '7px',
              height: '6px',
              border: 0,
              borderRadius: '0%',
            }}
          />
        ) : null}
        {data.diff}
      </td>
      <td>{data.volume}</td>
    </tr>
  ));

  return (
    <li>
      <table>
        <thead>
          <tr>
            <th width={150}>종목명</th>
            <th width={100}>현재가</th>
            <th width={100}>전일비</th>
            <th width={100}>거래량</th>
          </tr>
        </thead>
        <tbody>{jusic}</tbody>
      </table>
    </li>
  );
}
