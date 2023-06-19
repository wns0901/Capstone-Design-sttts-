import axios from 'axios';

const googleTrendsDataApi = async () => {
  const URL = 'http://localhost:3001/api/google-trend';
  const res = await axios.post(URL);

  return res.data;
};

export default googleTrendsDataApi;
