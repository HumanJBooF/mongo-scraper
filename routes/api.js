const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/scrape', (req, res) => {
    axios.get('https://www.pcgamer.com/news/')
        .then(response => {
            const $ = cheerio.load(response.data);
            // console.log($)
            $('.listingResult.small').each(function (i, elem) {
                let $this = $(this);
                let results = {};

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
                    .find('.synopsis')
                    .text()

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
                // db.News.create(results).then(dbNews => {
                //     console.log(dbNews);
                // }).catch(err => {
                //     return res.json(err);
                // });
            });
            res.redirect('/');
        });
});

router.get('/', (req, res) => {
    db.News.find({}).then(dbNews => {
        console.log(dbNews, 'DBNEWS');
        let hbsObj = {
            news: dbNews
        };
        // console.log(hbsObj);
        res.render('index', hbsObj);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;