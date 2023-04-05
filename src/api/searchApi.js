import axios from "axios";

const searchApi = async () => {
  const URL = "http://localhost:3001/api/search";
  const res = await axios.post(URL, { search: "인덕대" });

  if (res.status === 400) return [];
  return res.data;
};

export default searchApi;
