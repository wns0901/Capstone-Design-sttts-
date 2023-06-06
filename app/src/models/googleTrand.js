const axios = require('axios');
const cheerio = require('cheerio');

class GoogleTrand {
  getHtml = async (keyword) => {
    try {
      return await axios.get(
        'https://trends.google.co.kr/trends/trendingsearches/daily/rss?geo=KR'
      );
    } catch (err) {}
  };

  parsing = async (keyword) => {
    const html = await this.getHtml(keyword);
    const $ = cheerio.load(html.data);
    const $trand = $('item');
    const trand = [];

    $trand.each((i, node) => {
      const discription = $(node).children('ht\\:news_item');
      trand.push({
        id: i + 1,
        title: $(node).children('title').text(),
        traffic: $(node).children('ht\\:approx_traffic').text(),
        pubData: $(node).children('pubDate').text(),
        pubData: $(node).children('pubDate').text(),
        discription: {
          title: $(discription['0']).children('ht\\:news_item_title').text(),
          url: $(discription['0']).children('ht\\:news_item_url').text(),
        },
      });
    });
    console.log(trand);
    return trand;
  };
}

module.exports = GoogleTrand;
