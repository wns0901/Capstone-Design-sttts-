const axios = require('axios');

class Youtube {
  async getyoutube() {
    const result = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=15&regionCode=kr&key=AIzaSyAtV43B28nSVuUlC5kbbGXHleyVKTPRMVU'
    );
    return result.data.items;
  }
}

module.exports = Youtube;
