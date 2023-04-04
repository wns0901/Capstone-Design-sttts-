const axios = require("axios");
const cheerio = require("cheerio");

class GetData {
  getHtml = async (keyword) => {
    try {
      return await axios.get(
        "https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=" +
          encodeURI(keyword)
      );
    } catch (err) {}
  };

  parsing = async (keyword) => {
    const html = await this.getHtml(keyword);
    const $ = cheerio.load(html.data);
    const $news = $(".bx");
    const news = [];

    $news.each((i, node) => {
      const title = $(node).find(".news_tit").text();
      if (title) {
        news.push({
          id: i + 1,
          title: title,
          link: $(node).find(".news_tit").attr("href"),
          img: $(node).find(".dsc_thumb > img").attr("data-lazysrc"),
        });
      }
    });

    return news;
  };
}

module.exports = GetData;
