import axios from 'axios';

const jusicDataApi = async () => {
  const URL = 'http://sttts.kro.kr:3001/api/jusic';
  const res = await axios.post(URL);

  return res.data;
};

export default jusicDataApi;
