import { useEffect } from 'react';
import youtubeDataApi from '../api/youtubeDataApi';
import { useState } from 'react';

export default function Youtube() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const axiosData = async () => {
      const result = await youtubeDataApi();
      setData(result);
    };

    axiosData();
  }, []);

  const youtube = data.map((data, index) => (
    <div key={index}>
      {index + 1 + '위'}
      <img
        href={'https://www.youtube.com/watch?v=' + data.id}
        src={data.snippet.thumbnails.medium.url}
      />
      <a href={'https://www.youtube.com/watch?v=' + data.id}>
        {data.snippet.title}
      </a>
    </div>
  ));
  return <div>{youtube}</div>;
}
