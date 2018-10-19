require('dotenv').config()
const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/htmlRoutes');
const MONGODB = process.env.MONGODB_URI || process.env.MONGO_LOCAL
const db = require('./models');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.engine('handlebars', exhbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

app.use(routes);

mongoose.Promise = Promise;
mongoose.connect(MONGODB, { useNewUrlParser: true });

// testing to make sure we are set up right, all working
const test = { title: 'added!?!?' }
db.Test.create(test).then((testy) => {
    console.log(testy, 'ADDED?!')
}).catch((err) => res.json(err));

app.listen(PORT, () => {
    console.log(`THIS APP IS RUNNING ON PORT: ${PORT}`);
})