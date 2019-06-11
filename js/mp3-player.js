window.Mp3Player = {

    apiUrl: "http://localhost:8086/mp3files",

    addMp3File: function () {
        var name = $("input[title='Name']").val();
        var data = {
            'name': name,
        };

        $.ajax(
            {
                url: Mp3Player.apiUrl,
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).done(function (response) {
            console.log(response);
            Mp3Player.getMp3Files(response);
        });
    },

    getMp3FileDiv: function (mp3file) {
        return `<tr>
 <td class="name">${mp3file.name}</td>
   <td><a href="#" class="fa fa-trash delete" data-id="${mp3file.id}"></a></td>
   <td><a href="#" class="fa fa-edit put" data-id="${mp3file.id}"></a></td>
</tr>`
    },

    displayMp3Files: function(mp3Files){
        console.log('Displaying mp3-player.');
        var rows = '';

        Array.prototype.forEach.call(mp3Files, mp3File => rows += Mp3Player.getMp3FileDiv(mp3File));

        console.log(rows);

        $('#mp3file tbody').html(rows);
    },

    getMp3Files: function () {
        $.ajax(
            {
                url: Mp3Player.apiUrl,
                method: "GET"
            }).done(function (response) {
            console.log(response);
            Mp3Player.displayMp3Files(response)
        });
    },

    deleteMp3File: function(id){
        $.ajax(
            {
                url: Mp3Player.apiUrl + '?id=' + id,
                method: "DELETE"
            }).done(function (response) {
            console.log(response);
            Mp3Player.getMp3Files(response);
        });
    },

    updateMp3File: function(id){

        var name = $("input[title='Name']").val();
        var data = {
            'name': name,
        };
        $.ajax(
            {
                url: Mp3Player.apiUrl + '?id=' + id,
                method: "PUT",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).done(function (response) {
            console.log(response);
            Mp3Player.getMp3Files(response);
        });
    },

    bindEvents: function () {

        $("#create-mp3-player-form").submit(function (event) {
            event.preventDefault();

            console.log('Submitting mp3-player form');

            Mp3Player.addMp3File();

            return false;
        });

        $('#mp3file tbody').delegate('.delete', 'click', function () {
            var id = $(this).data('id');

            Mp3Player.deleteMp3File(id);
        });

        $('#mp3file tbody').delegate('.put', 'click', function () {
            var id = $(this).data('id');

            Mp3Player.updateMp3File(id);
        });
    }

};
Mp3Player.getMp3Files();
Mp3Player.bindEvents();