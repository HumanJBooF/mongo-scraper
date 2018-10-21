const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models')
const router = express.Router();

router.get('/api/scrape', (req, res) => {
    axios.get('https://www.pcgamer.com/news/')
        .then(response => {
            const $ = cheerio.load(response.data);
            $('.listingResult.small').each(function (i, elem) {
                const $this = $(this);
                const results = {};

                results.link = $this
                    .children('a')
                    .attr('href');
                results.image = $this
                    .find('figure')
                    .data('original');
                results.title = $this
                    .find('h3.article-name')
                    .text();
                results.author = $this
                    .find('span.by-author')
                    .text();
                results.time = $this
                    .find('time')
                    .attr('datetime');
                results.body = $this
                    .find('.synopsis') // the synopsis had a span class in it and I did not want the text from that So this is how I removed that part
                    .find('span.free-text-label')
                    .remove()
                    .end()
                    .text();

                console.log(results);

                db.News.findOne({ title: results.title }, (err, doc) => {
                    if (!doc) {
                        const newNews = new db.News(results);
                        newNews.save((err, doc) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(doc, 'DOES THIS WORK???')
                            }
                        });
                    } else {
                        console.log(`already in your database!`)
                    }
                })
            });
            res.redirect('/');
        });
});

router.get('/', (req, res) => {
    db.News.find({}).then(dbNews => {
        console.log(dbNews, 'DBNEWS');
        const hbsObj = {
            news: dbNews
        };
        // console.log(hbsObj);
        res.render('index', hbsObj);
    }).catch(err => {
        res.json(err);
    });
});

router.get('/saved', (req, res) => {
    res.render('saved')
})
module.exports = router;