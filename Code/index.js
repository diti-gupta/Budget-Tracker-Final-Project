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


  const user = {
    username: undefined,
    password: undefined,
  };




 
  app.get("/",(req,res)=>{
    res.render("pages/register");
 
  });


  app.get("/logout", (req, res) => {
    res.render("pages/logout");
  });


  app.get("/home", (req, res) => {
    res.render("pages/home");
  });




  app.get('/welcome', (req, res) => {
    res.json({status: 'success', message: 'Welcome!'});
  });


  //LOGIN GET API
  app.get('/login', (req,res)=>
  {
    res.render('pages/login'); //render the login.ejs page
  });


  // REGISTER GET API
  app.get('/register', (req, res) => {
    res.render('pages/register'); // Render the register.ejs page
  });
 
  //POST REGISTER API
  app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
 
      // Check if the username already exists in the database
      const existingUser = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
      if (existingUser) {
        console.log("in existeing user", existingUser);
        // If the username exists, redirect to login with a message
        throw new Error("Account already exists");
      }
 
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
 
      // Insert the username and hashed password into the users table
      const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
      console.log("inserting", query);
      const values = [username, hashedPassword];
      console.log("values", values);
      await db.none(query, values);
 
      // Redirect to the login page after successful registration
      // res.redirect('/login');
      res.status(200).json({message:'Successful Registration'});
    }
    catch (error)
    {
      console.log("in catch error: account exists");
      // Log the error for debugging purposes
        res.status(200).json({message: 'Account already exists' });
 
      // Redirect to the registration page with an error message
      // res.redirect('/register');
    }
  });


  //LOGIN POST API
  app.post('/login', async (req,res)=>{
    try {
      const { username, password } = req.body;


      // console.log("In app.post login");
      // console.log(username, password);


      // Find the user from the users table
      const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', username);
      // console.log(user);
      if (!user) {
        // If the user is not found, redirect to the registration page
        // console.log("In ! user");
        return res.redirect('/register');
      }
 
      // Use bcrypt.compare to check if the entered password matches the hashed password in the database
      // console.log("user.password length:", user.password);
      // console.log("actual password length", password);
      const hashedPassword = await bcrypt.hash(password, 10);
      // console.log("hashedPassword: ", hashedPassword);
      const passwordMatch = await bcrypt.compare(password, user.password);


      // console.log("DOES password MATCH?", passwordMatch);
      if (!passwordMatch) {
        // If the password is incorrect, throw an error and redirect to login
        // console.log("passwords don't match!")
        throw new Error('Invalid input');
      }
 
      // Save the user in the session
      req.session.user = user;
      console.log("in login saving user  :", req.session.user);
      // console.log("username & password validated!!");
      req.session.save(() => {
        // Redirect to the /register for now TBD route after setting the session
        res.status(200).json({message:'Success'});
      });
    } catch (error) {
      // If the database request fails or if there is an incorrect password, handle the error
      res.status(200).json({message:'Invalid input'}); // Render the login page with an error message
    }
   
});


// Authentication Middleware.
//console.log("session saved outside of login? :", req.session.user);
const auth = (req, res, next) => {
  if (!req.session.user) {
    // Default to login page.
    return res.redirect('/login');
  }
  next();
};


// Authentication Required
app.use(auth);


app.get("/budget",  async (req, res) => {
  try {
    // Assuming you have logic to fetch the months based on your application's requirements
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // Assuming you have logic to fetch user-specific budget data
    // Replace the sample logic with your actual logic
    const userSpecificExpenses = await db.any('SELECT * FROM Users_to_Budget WHERE Username = $1', [req.session.user.username]);
     
    // Fetch existing budget data for each month
    // const budgetData = await db.any('SELECT * FROM User_Budget WHERE Username = $1', [req.session.user.username]);


    res.render("pages/budget", {
      showExpenseModal: true,
      expenses: userSpecificExpenses,
      action: req.query.taken ? 'delete' : 'add',
      months: months, // Pass the months variable to the template
      // budgetData: budgetData,
    });
  } catch (error) {
    console.error('Error fetching user-specific expenses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// POST API to add an expense
app.post('/addExpense',  (req, res) =>
 {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const userSpecificExpenses =  db.any('SELECT * FROM Users_to_Budget WHERE Username = $1', [req.session.user.username]);
  res.render("pages/budget", {
    showExpenseModal: true,
    expenses: userSpecificExpenses,
    action: req.query.taken ? 'delete' : 'add',
    months: months, // Pass the months variable to the template
    // budgetData: budgetData,
  });
  //res.render("pages/budget");// {showExpensePopup: true});
  
});

// POST API to remove an expense
app.post('/removeExpense', async (req, res) => {
  try {
    const { indexId } = req.body;


    // Delete the expense from the Budget_to_Income table
    await db.none('DELETE FROM Budget_to_Income WHERE Index_ID = $1', [indexId]);


    // Delete the expense from the Income_Expense table
    await db.none('DELETE FROM Income_Expense WHERE Index_ID = $1', [indexId]);


    // Send a success response
    res.status(200).json({ message: 'Expense removed successfully', indexId });
  } catch (error) {
    console.error('Error removing expense:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = app.listen(3000);
console.log("Server is listening on port 3000");