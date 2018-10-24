const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');



const scrapePcNews = (_cb) => {
    axios.get('https://www.pcgamer.com/news/')
        .then(response => {
            const $ = cheerio.load(response.data);
            $('.listingResult.small').each((i, element) => {
                const results = {};

                results.link = $(element)
                    .children('a')
                    .attr('href');
                results.image = $(element)
                    .find('figure')
                    .data('original');
                results.title = $(element)
                    .find('h3.article-name')
                    .text();
                results.author = $(element)
                    .find('span.by-author')
                    .text();
                results.time = $(element)
                    .find('time')
                    .attr('datetime')
                results.body = $(element)
                    .find('.synopsis') // the synopsis had a span class in it and I did not want the text from that So this is how I removed that part
                    .find('span.free-text-label')
                    .remove()
                    .end()
                    .text();

                // moment(results.time).format('YYYY-MM-DD h:mm A');
                console.log(results);

                db.News.findOne({ title: results.title }, (err, doc) => {
                    if (!doc) {
                        const newNews = new db.News(results);
                        newNews.save((err, doc) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(`added ${doc}`)
                            }
                        });
                    } else {
                        console.log(`already in your database!`)
                    }
                })
            });
            _cb();
        });
}

module.exports = scrapePcNews;