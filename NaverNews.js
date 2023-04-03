const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
  try {
    return await axios.get("https://search.naver.com/search.naver?where=news&sm=tab_jum&query=%EA%B5%AC%EA%B8%80"); // 크롤링할 주소 입력
  } catch (error) {
    console.error(error);
  }
};

getHtml()    // 함수 getHtml 생성 > 실행 시, then 수행
  .then(html => {  // html == 함수
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.list_news").children("li") // 크롤링할 전체 박스 html 위치 입력
    $bodyList.each(function(i) { // each = for문
      ulList[i] = {
          title: $(this).find('div.news_area a.news_tit').text()
      };
    });

    return ulList;
  })
  .then(res => {
	console.log(res)
  });