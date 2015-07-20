/**
 * A script used to launch the Web application. 
 * 
 * @author Federico Baron
 */
var http = require('http'),
        express = require('express'),
        bodyParser = require('body-parser'),
        api = require('./lib/rockPaperScissor'),
        app = express();

// To support JSON-econded bodies
app.use(bodyParser.json());

// Static resources
app.use(express.static('./app'));

// APIs path
app.use('/api', api);

// Create and start server
http.createServer(app).listen(8080, function() {
    console.log('Express server listening on port 8080');
});