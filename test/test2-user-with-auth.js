// Run higher order test first
require('./test1-connection');

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;
const UserModel = require('../models/user');

let token = '';

const { userTester } = require('./test-input');

chai.use(chaiHttp);
let should = chai.should();
var searchUsername = userTester.validUser.username;

mocha.describe('Test User routes', function () {
  mocha.describe('************* AUTH REGISTRATION *************', () => {
    mocha.it(
      'it should not REGISTER a user without firstName field',
      function (done) {
        chai
          .request(server)
          .post('/register')
          .send(userTester.missingFirstName)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
          });
      }
    );

    mocha.it('it should REGISTER a correct user ', function (done) {
      chai
        .request(server)
        .post('/register')
        .send(userTester.validUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          //token = res.body.token;
          done();
        });
    });

    mocha.it(
      'it should not REGISTER a user with existed username',
      function (done) {
        chai
          .request(server)
          .post('/register')
          .send(userTester.preSavedUsername)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
          });
      }
    );

    mocha.it(
      'it should not REGISTER a user with existed email',
      function (done) {
        chai
          .request(server)
          .post('/register')
          .send(userTester.preSavedEmail)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
          });
      }
    );
  });

  mocha.describe('************* AUTH LOGIN *************', () => {
    mocha.it(
      'it should not LOGIN with incorrect username or password ',
      function (done) {
        chai
          .request(server)
          .post('/login')
          .send(userTester.inValidUserLogin)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
          });
      }
    );

    mocha.it(
      'it should LOGIN with correct username and password ',
      function (done) {
        chai
          .request(server)
          .post('/login')
          .send(userTester.validUserLogin)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            token = res.body.token;
            done();
          });
      }
    );

    mocha.it(
      'it should not show PROFILE of a user without verified token ',
      function (done) {
        //console.log(token);
        chai
          .request(server)
          .get('/profile')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
          });
      }
    );
  });

  mocha.describe(
    '************* CHECK ROUTES WITHOUT AUTH *************',
    () => {
      mocha.it(
        'it should not give access to GET without a verified token ',
        function (done) {
          chai
            .request(server)
            .get('/user')
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              done();
            });
        }
      );
      mocha.it(
        'it should not give access to PUT without a verified token ',
        function (done) {
          chai
            .request(server)
            .put('/user')
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              done();
            });
        }
      );
      mocha.it(
        'it should not give access to DELETE without a verified token ',
        function (done) {
          chai
            .request(server)
            .delete('/user')
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              done();
            });
        }
      );
    }
  );

  mocha.describe('************* AUTH AFTER LOGIN *************', () => {
    mocha.it(
      'it should show PROFILE of the correct user with verified token',
      function (done) {
        chai
          .request(server)
          .get('/profile')
          .auth(token, { type: 'bearer' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('username');
            res.body.should.have.property('password');
            res.body.should.have.property('email');
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('dateOfBirth');
            done();
          });
      }
    );

    mocha.describe('/GET route', function () {
      mocha.it('it should GET all the users (1)', function (done) {
        chai
          .request(server)
          .get('/user')
          .auth(token, { type: 'bearer' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });
    });

    mocha.describe('/PUT user', () => {
      mocha.it('it should UPDATE general info of the user ', (done) => {
        chai
          .request(server)
          .put('/user')
          .auth(token, { type: 'bearer' })
          .send(userTester.updateUser)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('firstName').eql('Mar');
            res.body.should.have.property('lastName').eql('Rio');
            done();
          });
      });
    });

    mocha.describe('/GET/:id route', () => {
      mocha.it('it should GET a user by the given id', (done) => {
        let user = new UserModel(userTester.newUser);
        user.save((err, user) => {
          chai
            .request(server)
            .get('/user/' + user.id)
            .auth(token, { type: 'bearer' })
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('username');
              res.body.should.have.property('email');
              res.body.should.have.property('firstName');
              res.body.should.have.property('lastName');
              res.body.should.have.property('dateOfBirth');
              res.body.should.have.property('_id').eql(user.id);
              done();
            });
        });
      });
    });


    // Will re-write this later
    mocha.describe('/GET/SEARCH route', () => {
      mocha.it('it should perform SEARCH query successfully ', (done) => {
        let query = {
          query: searchUsername
        };
        chai
          .request(server)
          .post('/user/search')
          .auth(token, { type: 'bearer' })
          .send(query)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('username').eql(searchUsername);
            done();
          });
      });
    });

    mocha.describe('/DELETE user', () => {
      mocha.it('it should DELETE the current user', (done) => {
        chai
          .request(server)
          .delete('/user')
          .auth(token, { type: 'bearer' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have
              .property('message')
              .eql('User is deleted successfully!');
            done();
          });
      });
    });
  });
});
