'use strict';
let express = require('express');
let routes = require('./routes');

let app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('./public'));

routes(app);

var server = app.listen(8000);
