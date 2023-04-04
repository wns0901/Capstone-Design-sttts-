const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
  try {
    return await axios.get("https://www.netflix.com/kr/browse/genre/34399"); // 크롤링할 주소 입력
  } catch (error) {
    console.error(error);
  }
};

getHtml()    // 함수 getHtml 생성 > 실행 시, then 수행
  .then(html => {  // html == 함수
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $(".nm-collections-row");
    $bodyList.each(function(i) { // each = for문
      ulList[i] = {
          title: $(this).find('span.nm-collections-title-name').text(),
          image: $(this).find('img.nm-collections-title-img').attr('src')
      };
    });

    return ulList;
  })
  .then(res => {
	console.log(res)
  });