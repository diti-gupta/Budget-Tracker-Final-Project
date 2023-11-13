
  const express = require("express");
  const app = express();
  const pgp = require("pg-promise")();
  const bodyParser = require("body-parser");
  const session = require("express-session");
  const bcrypt = require('bcrypt'); //  To hash passwords
  const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part B.

  // db config
  const dbConfig = {
    host: "db",
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  };
  
  const db = pgp(dbConfig);
  
  // db test
  db.connect()
    .then((obj) => {
      // Can check the server version here (pg-promise v10.1.0+):
      console.log("Database connection successful");
      obj.done(); // success, release the connection;
    })
    .catch((error) => {
      console.log("ERROR:", error.message || error);
    });
  
  // set the view engine to ejs
  app.set("view engine", "ejs");
  app.use(bodyParser.json());
  
  // set session
  app.use(
    session({
      secret: "XASDASDA",
      saveUninitialized: true,
      resave: true,
    })
  );
  
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  
  app.get('/welcome', (req, res) => {
    res.json({status: 'success', message: 'Welcome!'});
  });

  
  app.post('/login', async (req,res)=>{
    try {
      const { username, password } = req.body;
      
      //DG
      console.log("In app.post login");
      console.log(username, password);

      // Find the user from the users table
      const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', username);
      if (!user) {
        // If the user is not found, redirect to the registration page
        console.log("In ! user");
        return res.redirect('/register');
      }
  
      // Use bcrypt.compare to check if the entered password matches the hashed password in the database
      console.log("user.password length:", user.password);
      console.log("actual password length", password);
      const passwordMatch = (password == user.password);

      console.log("DOES password MATCH?", passwordMatch);
      if (!passwordMatch) {
        // If the password is incorrect, throw an error and redirect to login
        console.log("passwords don't match!")
        throw new Error('Incorrect username or password');
      }
  
      // Save the user in the session
      req.session.user = user;
      console.log("username & password validated!!");
      req.session.save(() => {
        // Redirect to the /register for now TBD route after setting the session
        res.redirect('/register');
      });
    } catch (error) {
      // If the database request fails or if there is an incorrect password, handle the error
      res.render('pages/login', { error: error.message }); // Render the login page with an error message
    }
    // Authentication Middleware.
  const auth = (req, res, next) => {
    if (!req.session.user) {
      // Default to login page.
      return res.redirect('/login');
    }
    next();
  };
  
  // Authentication Required
  app.use(auth);
});


module.exports = app.listen(3000);
console.log("Server is listening on port 3000");
