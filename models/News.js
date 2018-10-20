const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    link: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
        unique: false
    },
    time: {
        type: String,
        required: true,
        unique: false
    },
    body: {
        type: String,
        required: true,
        unique: true,
    },
    saved: {
        type: Boolean,
        default: false,
        required: false,
        unique: false
    }
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;