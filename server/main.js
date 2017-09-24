const express = require('express');
// const http = require('http');
const reload = require('reload');
const watch = require('watch');
// const path = require('path')
// const bodyParser = require('body-parser');
// const logger = require('morgan');

const app = express();

app.set('port', process.env.PORT || 3000);
// app.use(logger('dev'));
// app.use(bodyParser.json()); // Parses json, multi-part (file), url-encoded

app.use('/', express.static('web/'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist/'));
app.use('/popper', express.static('node_modules/popper.js/dist/'));
app.use('/reload', express.static('node_modules/reload/'));

// const server = http.createServer(app);
// server.listen(app.get('port'), function () {
//     console.log('Web server listening on port ' + app.get('port'))
// });

app.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'))
});

// Reload code here
const reloadServer = reload(app);

watch.watchTree(__dirname + "/../web", function (f, curr, prev) {
    // Fire server-side reload event
    if (typeof f === 'string') {
        console.log(`Reloading due to ${f}`);

        reloadServer.reload();
    }
});