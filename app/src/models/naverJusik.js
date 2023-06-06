const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

class Jusick {
  async getJusick() {
    const url = 'https://finance.naver.com/sise/sise_market_sum.nhn?&page=1';

    const result = await axios.get(url, { responseType: 'arraybuffer' });

    const decodedResponse = iconv.decode(Buffer.from(result.data), 'EUC-KR');
    const $ = cheerio.load(decodedResponse);
    const dataList = [];
    $('table.type_2 tr').each(function (i, element) {
      const name = $(element).find('a.tltle').text().trim();
      const price = $(element).find('td:nth-child(3)').text().trim();
      const upDown = $(element).find('td:nth-child(4) > img').attr('src');
      const diff = $(element).find('td:nth-child(4)').text().trim();
      const volume = $(element).find('td:nth-child(10)').text().trim();
      if (name) {
        dataList.push({
          name,
          price,
          upDown,
          diff,
          volume,
        });
      }
    });

    return dataList;
  }
}

module.exports = Jusick;
