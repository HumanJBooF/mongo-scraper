$(function () {

    const $scrapeBtn = $('.scraped');
    const $saveBtn = $('.save');
    const $noteSave = $('.noteSave');
    const $modalBtn = $('.notes');
    const $noteSection = $('.row.noteSection');

    const scrapeAgain = () => {
        $.get('/api/scrape')
            .done(data => {
                window.location = '/';
            });
    }

    const saveNews = function () {
        const newsId = $(this).attr('data-id');
        console.log(newsId);
        $.post(`/saved/${newsId}`)
    }

    const sendIdToModal = function () {
        const id = $(this).attr('data-id');
        getNotes(id);
        console.log(id);
        $noteSave.attr('data-id', id);
        $('.modal').modal({
            inDuration: 300,
            outDuration: 300
        });
    }

    const saveNote = function () {
        const id = $(this).attr('data-id');
        const noteObj = {};
        const $noteTitle = $('#title').val().trim();
        const $note = $('.noteBody').val().trim();
        noteObj.title = $noteTitle;
        noteObj.note = $note;
        $.post(`/note/${id}`, noteObj);
    }

    const getNotes = (id) => {
        $noteSection.empty();
        $.get(`/note/${id}`).then(data => {
            const notes = data.note;
            console.log(notes)
            notes.forEach(note => {
                // console.log(note, 'FOR EACHHHH')
                // console.log(note.title)
                // console.log(note.note)
                $noteSection.append(`<div class='col s12 l6'><div class='card small'><div class='card-content'><h3>${note.title}</h3><p>${note.note}</p></div</div</div>`)
            });

        })
    }

    $saveBtn.on('click', saveNews);
    $scrapeBtn.on('click', scrapeAgain);
    $modalBtn.on('click', sendIdToModal);
    $noteSave.on('click', saveNote);

    $('.sidenav').sidenav();
    $('.parallax').parallax();

});