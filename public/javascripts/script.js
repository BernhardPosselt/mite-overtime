document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById('mite-form');
    var api = document.getElementById('form-api');
    var org= document.getElementById('form-org');
    var out = document.getElementById('out');
    var hoursPerDay = document.getElementById('form-perweek');

    api.value = localStorage.getItem('apiKey');

    var generateDayRange = function (from, to) {
        result = [from];

        while (result[result.length-1] <= to) {
            var nextDay = new Date();
            var currentDay = result[result.length-1];
            nextDay.setTime(currentDay.getTime() + (24 * 60 * 60 * 1000));
            result.push(nextDay);
        }

        return result;
    };

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


            var dayRange = generateDayRange(days[0], days[days.length-1]);
            var workDays = dayRange.filter(function (date) {
                var day = date.getDay();
                return !(day === 6 || day === 0);
            });
            var workDaysNumber = workDays.length;

            var minutesTotal = result.map(function (entry) {
                return entry.time_entry_group.minutes;
            }).reduce(function (previous, current) {
                return previous + current;
            });

            var workedHours = Math.floor(minutesTotal/60);
            var workedMintues = minutesTotal % 60;
            hoursPerDay = parseFloat(hoursPerDay.value, 10);
            var requiredHours = Math.floor(workDaysNumber * hoursPerDay);
            var requiredMinutes = Math.floor((workDaysNumber * hoursPerDay * 60) % 60);

            info = "Required " + requiredHours + " hours and " + requiredMinutes + " minutes";
            info += "Worked " + workedHours + " hours and " + workedMintues + " minutes";

            out.innerHTML = info;
        }).catch(function (error) {
            console.log(error);
        });

        return false;
    });
});