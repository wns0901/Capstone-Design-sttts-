import axios from "axios";

const youtubeDataApi = async () => {
  const URL = "http://localhost:3001/api/youtube";
  const res = await axios.post(URL);

  return res.data;
};

export default youtubeDataApi;
