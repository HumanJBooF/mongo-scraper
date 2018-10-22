$(function () {

    const newsSection = $('.news');
    const clearBtn = $('.clear');
    const scrapeBtn = $('.scraped');
    const saveBtn = $('.save');


    const scrapeAgain = () => {
        $.get('/api/scrape')
            .done(data => {
                window.location = '/';
            });
    }

    // const clearNews = () => {
    //     newsSection.empty();
    // }

    const saveNews = function () {
        newsId = $(this).attr('data-id');
        console.log(newsId);
        $.post(`/saved/${newsId}`)
    }

    saveBtn.on('click', saveNews);
    scrapeBtn.on('click', scrapeAgain);
    // clearBtn.on('click', clearNews);

    $('.sidenav').sidenav();
    $('.parallax').parallax();
});