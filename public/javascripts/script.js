document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById('mite-form');
    var api = document.getElementById('form-api');
    var org= document.getElementById('form-org');
    var out = document.getElementById('out');
    var perWeek = document.getElementById('form-perweek');

    api.value = localStorage.getItem('apiKey');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // save api key in localstorage
        localStorage.setItem('apiKey', api.value);

        var url = '/time-entries.json?' + $.param({
                apiKey: api.value,
                org: org.value
            });

        fetch(url).then(function (response) {
            return response.json();
        }).then(function (result) {
            var days = result.map(function (entry) {
               return new Date(entry.time_entry_group.day);
            }).sort(function (a, b) {
                return a - b;
            });

            var minutesTotal = result.map(function (entry) {
                return entry.time_entry_group.minutes;
            }).reduce(function (previous, current) {
                return previous + current;
            });

            var workedHours = Math.floor(minutesTotal/60);
            var workedMintues = minutesTotal % 60;

            out.innerHTML = "Worked " + workedHours + " hours and " + workedMintues + " minutes";
        }).catch(function (error) {
            console.log(error);
        });

        return false;
    });
});