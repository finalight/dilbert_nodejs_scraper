"use strict"

const request = require('request')
const cheerio = require('cheerio')
const moment = require('moment')
const downloader = require('image-downloader')
const start_date = moment("01-01-2014", "DD-MM-YYYY")
const end_date = moment("09-04-2017", "DD-MM-YYYY")
let current_date = start_date
let dates_array = []

const downloadImage = (date) => {
    request('http://dilbert.com/strip/' + current_date.format('YYYY-MM-DD'), (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            // Download to a directory and save with the original filename
            const options = {
                url: $('.img-comic').attr('src'),
                dest: './' + date + ".jpg", // Save to /path/to/dest/image.jpg
                done: function(err, filename) {
                    if (err) {
                    	console.log(err)
                    }
                    console.log('File saved to', filename)
                }
            }
            downloader(options)
        }
    })
}

//generate all dates
while (current_date <= end_date) {
    dates_array.push(moment(current_date).format('YYYY-MM-DD'))
    current_date = moment(current_date).add(1, 'days');
}

dates_array.map((date) => {

    downloadImage(date)
})
