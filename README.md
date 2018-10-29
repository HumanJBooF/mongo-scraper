# mongo-pcgamer-scraper

### Check out the live version on heroku
**[Mongo-Pcgamer-Scraper](https://mongo-pcgamer-scraper.herokuapp.com/)**

## Description 

I built this app using axios to scrape the pcgamer news website, it is up to date with all the current news, in order. This app uses mongodb to save the news. For each news article you can save, and you can add a note to each saved article, if there is already a note you will see it. You have the ability to delete notes, and remove news from saved. This was built in a docker container and has been put on heroku.

![scraper](./public/assets/img/Mongo-Scraper.gif)

## Technologies used
- Node.js
- Javascript
- Jquery
- Materialize
- HTML/CSS
- Docker (toolbox for windows)
- Mongo (docker pull mongo)
- Robo3t
- NPM body-parser
- NPM express 
- NPM dotenv
- NPM mongoose
- NPM express-handlebars
- NPM axios
- NPM cheerio

**prerequisites**
- Install node.js, npm/yarn and docker (toolbox for windows)

## Instructions for local use

 - Git-Clone to repo to a spot on your desktop
    - Use docker or (docker toolbox if windows) to do this if you dont have mongodb installed locally
 - cd to the repo
     - (if you do not wish to use docker skip these next steps)
        - commands
            - docker pull mongo
            - npm run up to turn on container
            - npm install
            - npm start for regular / NPM run mon to turn on express server with nodemon
        - go to localhost:3000 on the browser of your choice and enjoy!
- npm install
- npm start for regular / NPM run mon to turn on express server with nodemon
- localhost:3000 on your browser


# Author
## *Joshua LeBoeuf*