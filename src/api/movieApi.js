import axios from 'axios';

const movieApi = async () => {
  const URL = 'http://sttts.kro.kr:3001/api/netflix';
  const res = await axios.post(URL);

  if (res.status === 400) return [];
  console.log(res.data);
  return res.data;
};

export default movieApi;
