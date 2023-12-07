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


/* So that there is no need for the postive test case to be updated with a new user EVERY TIME one reruens the test cases,
 we have implemented an unregister endpoint that allows for the registed user from the postive register test case to be unregistered 
 after it passes the positive register test case. In other words, we are first registering a new user, and the positive register test 
 case should pass however we are also unregistering the newly registered user right after the postive register test case so that there 
 is no need to register a new user each time, and so that the positive register test case can pass each time as we have registered the 
 new user then deleted/unregistered it from the database. */


// Positive test case for user registration
it('Positive: /register', (done) => {
  chai
    .request(server)
    .post('/register')
    .send({ username: 'newestuser1', password: 'abc' })
    .end((err, res) => {
      expect(res).to.have.status(200); // Expect a redirect status for successful registration
      
     done();
  });
  });

  // Unregistering/deleting newestuser1, so that the postive user registration test case can pass any time one runs it
  it('Register deltion: /unregister', (done) => {
    chai
      .request(server)
      .delete('/unregister') // call the DELETE endpoint for user deletion
      .send({ username: 'newestuser1' })
      .end((err, res) => {
        // expect a successful unregistration
        expect(res).to.have.status(200);

        done();
      });
    });
  


// Negative test case for user registration with an existing username
it('Negative: /register. Checking existing username', (done) => {
  chai
    .request(server)
    .post('/register')
    .send({username: 'user8', password: '123'}) // Use an existing username to simulate a negative case
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
});

