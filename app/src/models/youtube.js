const axios = require("axios");

class Youtube {
  async getyoutube() {
    const key = process.env.REACT_APP_GOOGLE_KEY;
    // const key = "AIzaSyAtV43B28nSVuUlC5kbbGXHleyVKTPRMVU";
    const result = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=15&regionCode=kr&key=" +
        key
    );
    // console.log(123123,key);
    return result.data.items;
  }
}

module.exports = Youtube;
