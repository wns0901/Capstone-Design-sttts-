const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const url = 'https://finance.naver.com/sise/sise_market_sum.nhn?&page=1';

axios.get(url, {responseType: 'arraybuffer'})
  .then(response => {
    const decodedResponse = iconv.decode(Buffer.from(response.data), 'EUC-KR');
    const $ = cheerio.load(decodedResponse);
    $('table.type_2 tr').each(function(i, element) {
      const name = $(element).find('a.tltle').text().trim();
      const price = $(element).find('td:nth-child(2)').text().trim();
      const diff = $(element).find('td:nth-child(3)').text().trim();
      const volume = $(element).find('td:nth-child(9)').text().trim();
      console.log(name, price, diff, volume);
    });
  })
  .catch(error => console.error(error));