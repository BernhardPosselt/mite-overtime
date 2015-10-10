'use strict';

let locals = require('../local');

module.exports = (app) => {

    app.get('/', (request, response) => {
        response.render('index', {
            base: locals.baseUrl
        });
    });

};