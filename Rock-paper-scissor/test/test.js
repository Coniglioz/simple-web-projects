/**
 * Test for APIs.
 * 
 * @author Federico Baron
 */
var request = require('supertest'),
        express = require('express'),
        bodyParser = require('body-parser'),
        api = require('../lib/rockPaperScissor'),
        app = express();

// To support JSON-econded bodies
app.use(bodyParser.json());

// APIs path
app.use('/api', api);

describe('API', function() {

    describe('Validate input', function() {
        it('should return error trying to play with a invalid shape', function(done) {
            request(app)
                    .post('/api/play')
                    .set('Accept', 'application/json')
                    .set('Content-Type', 'application/json')
                    .send('{"value": "PEPPER"}')
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end(done);
        });
        it('should success if playing with SCISSORS', function(done) {
            request(app)
                    .post('/api/play')
                    .set('Accept', 'application/json')
                    .set('Content-Type', 'application/json')
                    .send('{"value": "SCISSORS"}')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function(res) {
                        var gameResult = res.body;
                        switch (gameResult.computerChoice) {
                            case 'ROCK':
                                if (gameResult.result.toLowerCase() !== 'loose') {
                                    throw new Error("wrong result");
                                }
                                break;
                            case 'PAPER':
                                if (gameResult.result.toLowerCase() !== 'win') {
                                    throw new Error("wrong result");
                                }
                                break;
                            case 'SCISSORS':
                                if (gameResult.result.toLowerCase() !== 'tie') {
                                    throw new Error("wrong result");
                                }
                                break;
                        }
                    })
                    .end(done);
        });
        it('should success if playing with ROCK', function(done) {
            request(app)
                    .post('/api/play')
                    .set('Accept', 'application/json')
                    .set('Content-Type', 'application/json')
                    .send('{"value": "ROCK"}')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function(res) {
                        var gameResult = res.body;
                        switch (gameResult.computerChoice) {
                            case 'ROCK':
                                if (gameResult.result.toLowerCase() !== 'tie') {
                                    throw new Error("wrong result");
                                }
                                break;
                            case 'PAPER':
                                if (gameResult.result.toLowerCase() !== 'loose') {
                                    throw new Error("wrong result");
                                }
                                break;
                            case 'SCISSORS':
                                if (gameResult.result.toLowerCase() !== 'win') {
                                    throw new Error("wrong result");
                                }
                                break;
                        }
                    })
                    .end(done);
        });
        it('should success if playing with PAPER', function(done) {
            request(app)
                    .post('/api/play')
                    .set('Accept', 'application/json')
                    .set('Content-Type', 'application/json')
                    .send('{"value": "PAPER"}')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function(res) {
                        var gameResult = res.body;
                        switch (gameResult.computerChoice) {
                            case 'ROCK':
                                if (gameResult.result.toLowerCase() !== 'win') {
                                    throw new Error("wrong result");
                                }
                                break;
                            case 'PAPER':
                                if (gameResult.result.toLowerCase() !== 'tie') {
                                    throw new Error("wrong result");
                                }
                                break;
                            case 'SCISSORS':
                                if (gameResult.result.toLowerCase() !== 'loose') {
                                    throw new Error("wrong result");
                                }
                                break;
                        }
                    })
                    .end(done);
        });
    });
});
