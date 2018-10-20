require('dotenv').config()
const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const MONGODB = process.env.MONGODB_URI || process.env.MONGO_LOCAL
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

app.engine('handlebars', exhbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

app.use('/', routes);

mongoose.Promise = Promise;
mongoose.connect(MONGODB, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

app.listen(PORT, () => {
    console.log(`THIS APP IS RUNNING ON PORT: ${PORT}`);
})