// Imports the index.js file to be tested.
const server = require('../index'); //TO-DO Make sure the path to your index.js is correctly added
// Importing libraries

// Chai HTTP provides an interface for live integration testing of the API's.
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(server)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });

//   ===========================================================================
//   TO-DO: Part A Login unit test case
//   We are checking POST /add_user API by passing the user info in the correct order. This test case should pass and return a status 200 along with a "Success" message.
// Positive cases
it('positive : /login', done => {
    chai
      .request(server)
      .post('/login')
      .send({username: 'user8', password: 'abcd'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Success');
        done();
      });
  });
});

//We are checking POST /add_user API by passing the user info in in incorrect manner (name cannot be an integer). This test case should pass and return a status 200 along with a "Invalid input" message.
it('Negative : /login. Checking invalid name', done => {
    chai
      .request(server)
      .post('/login')
      .send({username: 10, password: 'abcdef'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Invalid input');
        done();
      });
});

// Part B Register unit test case
// We are checking POST /register API by registering a user with valid data. 


/* ----------------------------------------------------- NOTE ---------------------------------------------------------------------:
The positive test case will need to be updated with a new user EVERY TIME one reruns the test cases in order for the test case to pass. 
In other words: If one were to have run the test cases once already with username: newuser, and the positive test case passed, 
then the next time one runs the test case with the same username: newuser, the positive test case will fail, because 
in the previous test case run, the newuser gets added to the database because they did NOT exist at that moment in time. 
In the rerun, the newuser exists in the database, thus the username has to be a different username for EACH rerun of the test cases.*/

// Positive test case for user registration
it('Positive: /register', (done) => {
  chai
    .request(server)
    .post('/register')
    .send({ username: 'new_user12345', password: 'passwordabc' })
    .end((err, res) => {
      expect(res).to.have.status(200); // Expect a redirect status for successful registration
      expect(res.body.message).to.equals('Successful Registration');
      
      done();
    });
});

// Negative test case for user registration with an existing username
it('Negative: /register. Checking existing username', (done) => {
  chai
    .request(server)
    .post('/register')
    .send({ username: 'user8'}) // Use an existing username to simulate a negative case
    .end((err, res) => {
      expect(res).to.have.status(200); // Expect a redirect status for registration failure
      expect(res.body.message).to.equals('Account already exists');
      
      done();
    });
});

