import axios from 'axios';

const melonDataApi = async () => {
  const URL = 'http://localhost:3001/api/melon';
  const res = await axios.post(URL);

  return res.data;
};

export default melonDataApi;
