
const axios = require("axios");
const cheerio = require("cheerio");

class MovieData {

    getHTML = async () =>{
        try {
          console.log('####');
          return await axios.get(
            "https://www.netflix.com/kr/browse/genre/34399"
          );
        } catch (err) {
          console.log(err);
        }
      };
      parsing = async () => {
        const html = await this.getHTML();
        const $ = cheerio.load(html.data);
        const $rankList = $(".nm-content-horizontal-row-item-container").children("li");
        const movie = [];
    
        $rankList.each((i, node) => {
          const title = $(node).find(".nm-collections-title-name").text();
          const image = $(node).find(".nm-collections-title-img").attr('src');
          if(title){
            movie.push({
              id: i + 1,
              title: title,
              image: image
            });
          }
        });
        console.log(movie);
        return movie;
      };
    }
  module.exports = MovieData;