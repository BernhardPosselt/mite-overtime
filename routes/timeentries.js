'use strict';

let MiteClient = require('../mite/client');

module.exports = (app) => {

    app.get('/time-entries.json', (request, response) => {
        let client = new MiteClient(request.query.org, request.query.apiKey);
        client.getEntries().then((entries) => {
            response.json(entries);
        }).catch((error) => {
            response.status(400).send(error.message);
        });
    });

};