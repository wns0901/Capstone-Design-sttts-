import axios from "axios";

const loginApi = async (userInfo) => {
  try {
    const URL = "http://localhost:3001/api/login";

    const res = await axios.post(URL, userInfo);

    return res.status === 200 ? true : false;
  } catch (error) {
    alert("로그인 실패");
  }
};

export default loginApi;
