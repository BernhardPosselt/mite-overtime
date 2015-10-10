var id = function (selector) {
    return document.getElementById(selector);
};

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

document.addEventListener("DOMContentLoaded", function () {
    var form = id('mite-form');
    var api = id('form-api');
    var org= id('form-org');
    var required = id('required');
    var actual = id('actual');
    var overtime = id('overtime');
    var perday = id('form-perday');
    var baseUrl = document.getElementsByTagName('base')[0].href;

    api.value = localStorage.getItem('apiKey');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // save api key in localstorage
        localStorage.setItem('apiKey', api.value);

        // convert inputs to correct nubmers
        var hoursPerDay = parseFloat(perday.value, 10);

        var url = baseUrl + 'time-entries.json?' + $.param({
            apiKey: api.value,
            org: org.value
        });

        fetch(url).then(function (response) {
            return Promise.all([response, response.json()]);
        }).then(function (result) {
            var response = result[0];
            var json = result[1];

            if (response.status >= 400) {
                throw json.message;
            }

            // get all the weekdays from the first to the current day
            var days = json.map(function (entry) {
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

            // calculate the total amount of worked time
            var minutesTotal = json.map(function (entry) {
                return entry.time_entry_group.minutes;
            }).reduce(function (previous, current) {
                return previous + current;
            });

            var requiredMinutesTotal = hoursPerDay * 60 * workDaysNumber;
            var differenceMinutesTotal = minutesTotal - requiredMinutesTotal;

            var workedHours = Math.floor(minutesTotal/60);
            var workedMinutes = minutesTotal % 60;
            var requiredHours = Math.floor(requiredMinutesTotal/60);
            var requiredMinutes = requiredMinutesTotal % 60;
            var overtimeHours = Math.floor(differenceMinutesTotal/60);
            var overtimeMinutes = differenceMinutesTotal % 60;

            required.innerHTML = requiredHours + ':' + requiredMinutes;
            actual.innerHTML = workedHours + ':' + workedMinutes;
            overtime.innerHTML = overtimeHours + ':' + overtimeMinutes;
        }).catch(function (error) {
            console.log(error);
            alert(error);
        });

        return false;
    });
});