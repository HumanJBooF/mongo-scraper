$(function () {

    const newsSection = $('.news');
    const scrapeBtn = $('.scraped');
    const clearBtn = $('.clear');

    const scrapeAgain = () => {
        $.get('/api/scrape')
            .done(data => {
                window.location = '/';
            });
    }

    const clearNews = () => {
        newsSection.empty();
    }



    scrapeBtn.on('click', scrapeAgain);
    clearBtn.on('click', clearNews);

    $('.sidenav').sidenav();
    $('.parallax').parallax();
});