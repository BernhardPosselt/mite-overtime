'use strict';

let request = require('request');

let client = function (org, apiKey) {
    this.baseUrl = 'https://' + org + '.mite.yo.lk';
    this.apiKey = apiKey;
};

client.prototype = {
    getEntries: function () {
        let path = '/time_entries.json?user_id=current&group_by=day';

        let options = {
            url: this.baseUrl + path,
            headers: {
                'X-MiteApiKey': this.apiKey,
                accept: '*/*'
            }
        };

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }
};



module.exports = client;