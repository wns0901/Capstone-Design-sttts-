import axios from 'axios';

const registerApi = async (userInfo) => {
  const URL = 'http://sttts.kro.kr:3001/api/register';
  const res = await axios.post(URL, userInfo);

  if (res.status === 200) {
    return true;
  }

  return false;
};

export default registerApi;
