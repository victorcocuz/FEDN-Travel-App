const request = require('supertest');
const app = require('../server/server');

describe('Test Server', () => {
    it('It should respond 200 to GET method', (done) => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
});