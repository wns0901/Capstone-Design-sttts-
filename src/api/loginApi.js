import axios from "axios";

const loginApi = async (userInfo) => {
  const URL = "http://localhost:3001/api/login";

  const res = await axios.post(URL, userInfo);
  window.localStorage.setItem("userNo", res.data);

  return res.status === 200 ? true : false;
};

export default loginApi;
