const express = require('express');
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

router.post('/note/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const note = req.body.note;
    const noteObj = {
        title: title,
        note: note
    };
    db.Note.create(noteObj).then(newNote => {
        db.News.findOneAndUpdate({ _id: id }, { $push: { note: newNote._id } }, { new: true })
            .then(() => console.log(newNote))
            .catch(err => console.log(err))
    }).catch(err => console.log(err))

})

router.get('/saved', (req, res) => {
    db.News.find({ saved: true })
        .then(savedNews => {
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

router.get('/note/:id', (req, res) => {
    const id = req.params.id;
    db.News.findOne({ _id: id })
        .populate('note').then(notes => {
            res.json(notes)
        }).catch(err => console.log(err));
})

module.exports = router;