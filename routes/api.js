const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
const db = require('../models');
const scraper = require('../scraper/scrape');
const router = express.Router();

router.get('/api/scrape', (req, res) => {
    scraper(() => {
        res.redirect('/');
    });
});

router.get('/', (req, res) => {
    db.News.find({}).then(dbNews => {
        // console.log(dbNews, 'DBNEWS');
        const hbsObj = {
            news: dbNews
        };
        // console.log(hbsObj);
        res.render('index', hbsObj);
    }).catch(err => {
        res.json(err);
        console.log(`Error: ${err}`);
    });
});

router.post('/saved/:id', (req, res) => {
    const id = req.params.id;
    const update = { _id: id };
    db.News.findOneAndUpdate(update, { saved: true })
        .then(saved => {
            console.log(`You have saved: ${saved}`);
        }).catch(err => {
            res.json(`ERROR: ${err}`);
            console.log(`Error: ${err}`);
        });
});

router.get('/saved', (req, res) => {
    db.News.find({ saved: true }).then(savedNews => {
        const saved = {
            news: savedNews
        };
        console.log(`SAVED: ${saved.news}`)
        res.render('saved', saved);
    }).catch(err => {
        res.json(`ERROR: ${err}`);
        console.log(`ERROR ${err}`);
    })
});

module.exports = router;