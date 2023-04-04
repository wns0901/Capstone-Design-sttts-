const axios = require("axios");
const cheerio = require("cheerio");


let movieList = [];
async function getHtml() {
  try {
    const response = await axios.get("https://www.netflix.com/kr/browse/genre/34399"); 
    const html = response.data;
    const $ = cheerio.load(html);
    const $rankList = $(".nm-collections-row");

    $rankList.each(function (i, element) {
      const title = $(element).find('span.nm-collections-title-name').text();
      const image = $(element).find('img.nm-collections-title-img').attr('src');
      movieList.push({
        rank: i + 1,
        title,
        image,
      });
    });
    return movieList;
  } catch (error) {
    console.error(error);
  }
};

getHtml();
