"use strict"

const request = require('request')
const cheerio = require('cheerio')
const moment = require('moment')
const downloader = require('image-downloader')
const start_date = moment("01-12-2017", "DD-MM-YYYY")
const end_date = moment("15-12-2017", "DD-MM-YYYY")
let current_date = start_date
let dates_array = []

const downloadImage = (date) => {
    return new Promise((resolve, reject) => {
        request('http://dilbert.com/strip/' + current_date.format('YYYY-MM-DD'), (error, response, html) => {
            if (!error && response.statusCode === 200) {
                const $ = cheerio.load(html);

                const options = {
                    url: $('.img-comic').attr('src'),
                    dest: './' + date + ".jpg", // Save to /path/to/dest/image.jpg
                }

                return downloader
                    .image(options)
                    .then(({filename, image}) => {
                        return resolve('File saved to' + filename)
                    })
                    .catch((err) => {
                        return reject(err)
                    })
            }
        })
    })
}

//generate all dates
while (current_date <= end_date) {
    dates_array.push(moment(current_date).format('YYYY-MM-DD'))
    current_date = moment(current_date).add(1, 'days');
}

const donwloadStrips = async() => {
    console.log("size", dates_array.length)
    for (let date of dates_array) {
        console.log("downloading", date)
        try {
            const result = await downloadImage(date)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
}

donwloadStrips()