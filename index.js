'use strict';
let express = require('express');
let routes = require('./routes');

let app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

routes(app);

var server = app.listen(8000);
