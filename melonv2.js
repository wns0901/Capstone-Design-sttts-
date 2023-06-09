const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const getMelonChart = async () => {
  try {
    const response = await axios.get("https://www.melon.com/chart/index.htm");
    const html = response.data;
    const $ = cheerio.load(html);
    const chartList = [];

    $('tr.lst50, tr.lst100').each(function (i, element) {
      const title = $(element).find('.ellipsis.rank01 > span > a').text();
      const artist = $(element).find('.ellipsis.rank02 > span').text();
      const imgSrc = $(element).find('.image_typeAll > img').attr('src');
      chartList.push({
        rank: i + 1,
        title,
        artist,
        imgSrc,
      });
    });

    return chartList;
  } catch (error) {
    console.error(error);
  }
};

getMelonChart().then((chartList) => {
  chartList.forEach((song) => {
    console.log(`[${song.rank}] ${song.title} - ${song.artist}`);
    console.log(`  ${song.imgSrc}`);
  });
});
