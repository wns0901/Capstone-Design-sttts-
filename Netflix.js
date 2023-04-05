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
    let movieList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $(".nm-content-horizontal-row-item-container").children("li"); // 크롤링할 전체 박스 html 위치 입력
    $bodyList.each(function(i,element) { // each = for문
        const title = $(element).find('.nm-collections-title-name').text();
        movieList.push({
          title
        });
    });
   

    return movieList;
  })
  .then(res => {
	console.log(res)
  });




// let movieList = [];
// async function getHtml() {
//   try {
//     const response = await axios.get("https://www.netflix.com/kr/browse/genre/34399"); 
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const $rankList = $(".nm-collections-row");

//     $rankList.each(function (i, element) {
//       const title = $(element).find('span.nm-collections-title-name').text();
//       const image = $(element).find('img.nm-collections-title-img').attr('src');
//       movieList.push({
//         rank: i + 1,
//         title,
//         image,
//       });
//     });
//     return movieList;
//   } catch (error) {
//     console.error(error);
//   }
// };

// getHtml();


