$(function () {

    const $scrapeBtn = $('.scraped');
    const $saveBtn = $('.save');
    const $noteSave = $('.noteSave');
    const $modalBtn = $('.notes');
    const $noteSection = $('.row.noteSection');
    const $news = $('.news');
    const $noteTitle = $('#title');
    const $note = $('.noteBody');
    const $deleteSave = $('.deleteSaved');

    const scrapeAgain = () => {
        $news.empty();
        $.get('/api/scrape')
            .done(data => {
                window.location = '/';
            });
    }

    const saveNews = function () {
        const newsId = $(this).attr('data-id');
        $(this).parents('.newsCard').remove();
        M.toast({ html: 'News saved!' });
        console.log(newsId);
        $.post(`/saved/${newsId}`);
    }

    const unSaveNews = function () {
        const newsId = $(this).attr('data-id');
        $(this).parents('.savedNews').remove();
        $.post(`/unsave/${newsId}`);
    }

    const sendIdToModal = function () {
        const id = $(this).attr('data-id');
        getNotes(id);
        console.log(id);
        $noteSave.attr('data-id', id);
        $('.modal').modal({
            inDuration: 300,
            outDuration: 300,
            opacity: 0.8
        });
    }

    const saveNote = function () {
        const id = $(this).attr('data-id');
        const noteObj = {};
        const noteTitleVal = $noteTitle.val().trim();
        const noteVal = $note.val().trim();
        if (noteTitleVal && noteVal) {
            noteObj.title = noteTitleVal;
            noteObj.note = noteVal;
            $.post(`/note/${id}`, noteObj);
        }
    };

    const getNotes = (id) => {
        $noteSection.empty();
        $noteTitle.val('');
        $note.val('');
        $.get(`/note/${id}`).then(data => {
            const notes = data.note;
            console.log(data, 'WHAWRHIKWTHWAK:THKTWHK:')
            notes.forEach((note) => {
                console.log(note)
                const $col = $(`<div class='col s12 l4 noteCard'>`);
                const $card = $(`<div class='card small hoverable'>`);
                const $cContent = $(`<div class='card-content'>`)
                const $h3 = $(`<div class='row'><h3>${note.title}</h3></div>`);
                const $p = $(`<div class='row'><p class='noteNote'>${note.note}</p></div>`);
                const $btn = $(`<a class="waves-effect waves-red btn deleteNote" data-id='${note._id}'>Delete note</a>`)
                const $cAction = $(`<div class='card-action'>`);
                $cAction.append($btn);
                $cContent.append($h3, $p, $cAction);
                $card.append($cContent);
                $col.append($card);
                $noteSection.append($col);
            });
        });
    }

    const deleteNote = function () {
        const id = $(this).attr('data-id');
        $(this).parents('.noteCard').remove();
        console.log(id)
        $.ajax(`note/delete/${id}`, {
            type: 'DELETE'
        }).then(function () {
            window.location.reload();
        });
    }

    $deleteSave.on('click', unSaveNews);
    $saveBtn.on('click', saveNews);
    $scrapeBtn.on('click', scrapeAgain);
    $modalBtn.on('click', sendIdToModal);
    $noteSave.on('click', saveNote);
    $(document).on('click', '.btn.deleteNote', deleteNote);

    $('.sidenav').sidenav();
    $('.parallax').parallax();
});