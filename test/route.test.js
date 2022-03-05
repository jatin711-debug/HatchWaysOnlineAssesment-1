const expect  = require('chai').expect;
const request = require('request');

describe('Back-End Challenge', function() {
    describe('Step - 1', function() {
        it('Should return the correct body for step 1', function(done) {
            request('http://localhost:3000/api/ping', function(error, response, body) {
                expect(body).to.equal('{"Success":true}');
                done();
            });
        });
        it('Should return the correct status code for step 1 where route is incorrect', function(done) {
        request('http://localhost:3000/api/pings', function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
        });
        });
    });
    describe('Step 2', function() {
        it('Should return the proper status code for step 2 for the correct route', function(done) {
        request('http://localhost:3000/api/posts?tags=home', function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
        });
    });
});