const axios = require("axios");

class Youtube {
  async getyoutube() {
    const result = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyAtV43B28nSVuUlC5kbbGXHleyVKTPRMVU"
    );
    console.log(result.data.items[0].snippet);
  }
}

module.exports = Youtube;
