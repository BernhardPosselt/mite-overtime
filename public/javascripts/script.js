document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById('mite-form');
    var api = document.getElementById('form-api');
    var org= document.getElementById('form-org');
    var result = document.getElementById('result');
    var since = document.getElementById('form-since');
    var perWeek = document.getElementById('form-perweek');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var url = '/time-entries.json?' + $.param({
                apiKey: api.value,
                org: org.value
            });

        fetch(url).then(function (response) {
            return response.json();
        }).then((result) => {
           console.log(result);
        });

        return false;
    });
});