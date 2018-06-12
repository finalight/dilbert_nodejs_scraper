"use strict";

const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment");
const downloader = require("image-downloader");
const start_date = moment("12-02-2017", "DD-MM-YYYY");
const end_date = moment("31-12-2018", "DD-MM-YYYY");
let current_date = start_date;
let dates_array = [];

const downloadImage = date => {
  return new Promise((resolve, reject) => {
    const url = "http://dilbert.com/strip/" + date;
    console.log("url", url);
    request(url, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const options = {
          url: $(".img-comic").attr("src"),
          dest: "./" + date + ".jpg" // Save to /path/to/dest/image.jpg
        };

        return downloader
          .image(options)
          .then(({ filename, image }) => {
            return resolve("File saved to" + filename);
          })
          .catch(err => {
            return reject(err);
          });
      }
    });
  });
};

//generate all dates
while (current_date <= end_date) {
  dates_array.push(moment(current_date).format("YYYY-MM-DD"));
  current_date = moment(current_date).add(1, "days");
}

const donwloadStrips = async () => {
  console.log("size", dates_array.length);
  for (let date of dates_array) {
    try {
      await downloadImage(date);
    } catch (error) {
      console.log(error);
    }
  }
};

donwloadStrips();
