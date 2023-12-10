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
 
  // all need to add into main repo for index.js ->
  app.use(express.static(__dirname + '/views'));


  const user = {
    username: undefined,
    password: undefined,
  };


//DELETE user API Endpoint to delete a user

app.delete('/unregister', async (req, res) => {
  const { username } = req.body;
  // console.log("inside unregister");
  // console.log("username: ", username);

  try {
    const deleteQuery = 'DELETE FROM users WHERE username = $1 RETURNING *';
    // console.log("delete Query", deleteQuery);
    const result = await db.oneOrNone(deleteQuery, [username]);
    // console.log("result", result);

    if (result) {
      res.status(200).send('User unregistered successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});


//GET pages API
app.get("/",(req,res)=>{
  res.render("pages/home");
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

//BUDGET GET API
app.get('/budget',(req,res)=>{
  res.render('pages/budget');
});

//LOGOUT GET API
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("pages/logout");
});

//GET expenses from Income_Expense table API
app.get('/expenses', async (req, res) => {
  try {
      //  get expenses from the table using a query
      const expenses = await db.query('SELECT * FROM Income_Expense');
      res.json(expenses.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //GET chart data for the pie chart  API
  app.get('/getChartData/:month', async (req, res) => {
    try {
      console.log("in get chart Data");
      const username = req.session.user.username;

      const month=req.params.month;
      console.log("month", month);

      const monthToNumber = {
        jan: 1, feb: 2, march: 3, april: 4, may: 5, june: 6,
        july: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
      };
      const monthNumber = monthToNumber[month];
      console.log("month number", monthNumber);

      console.log("username in chart", username);
      // Fetch data from the database
      const result = await db.query('SELECT Category, SUM(Amount) AS Total FROM Income_Expense WHERE Username = $1 AND Monthh = $2 GROUP BY Category',[username,monthNumber]);
      console.log("get chart data RESULT:", result);
     
      // Format the data for the chart
      const dataPoints = result.map(row => ({ y: row.total, label: row.category }));
      console.log("datapoint in get api", dataPoints);
 
      res.json(dataPoints);
    } catch (error) {
      console.error('Error fetching data for chart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/getChartDataYear', async (req, res) => {
    try {
      console.log("in get chart Data");
      const username = req.session.user.username;


      console.log("username in chart", username);
      // Fetch data from the database
      const result = await db.query('SELECT Category, SUM(Amount) AS Total FROM Income_Expense WHERE Username = $1 GROUP BY Category', [username]);
      console.log("get chart data RESULT:", result);
     
      // Format the data for the chart
      const dataPoints = result.map(row => ({ y: row.total, label: row.category }));
      console.log("datapoint in get api", dataPoints);
 
      res.json(dataPoints);
    } catch (error) {
      console.error('Error fetching data for chart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/getChartDataYearbyMonth',async(req,res)=> {
    try {
      console.log("in get chart Data");
      const username=req.session.user.username;

      console.log("username in chart",username);

      const result=await db.query('SELECT Monthh AS Month, Category, SUM(Amount) AS Total FROM Income_Expense WHERE Username = $1 GROUP BY Monthh, Category ORDER BY Monthh, Category', [username]);
      console.log("get chart data RESULT:",result);
    
      const dataPoints=result.map(row=>({month:row.month,y:row.total,label:row.category }));
      console.log("datapoint in get api",dataPoints);
 
      res.json(dataPoints);
    } catch (error){
      console.error('Error fetching data for chart:',error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });

  //GET each Month.ejs:

  // ------------------------------------------------------January (abbreviated jan)-----------------------------------------------------------
  app.get('/jan',async (req,res)=>{
    try {
      const username = req.session.user.username; // Get the logged-in username
      const month = "jan";
      console.log("username logged in RIGHT NOW: ", username);
      const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 1 AND Username = $1', [username]);
      
      console.log("expenses", expenses);

      res.render('pages/months/jan', {expenses,month});
      } 
      catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
   // --------------------------------------------------February (abbreviated feb)-----------------------------------------------------------
    app.get('/feb',async (req,res)=>{
   
      try {
          const username = req.session.user.username; // Get the logged-in username
          console.log("username logged in RIGHT NOW: ", username);
          const month = "feb";
          const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 2 AND Username = $1', [username]);
          console.log("expenses", expenses);
 
          res.render('pages/months/feb', { expenses,month });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
       
      });

      // ------------------------------------------------------March (abbreviated march)-----------------------------------------------------------
    app.get('/march',async (req,res)=>{
   
      try {
          const username = req.session.user.username; // Get the logged-in username
          console.log("username logged in RIGHT NOW: ", username);
          const month = "march";
          const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 3 AND Username = $1', [username]);
          console.log("expenses", expenses);
 
          res.render('pages/months/march', { expenses,month });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
       
      });

      // ------------------------------------------------------April (abbreviated april)-----------------------------------------------------------
    app.get('/april',async (req,res)=>{
   
      try {
          const username = req.session.user.username; // Get the logged-in username
          console.log("username logged in RIGHT NOW: ", username);
          const month = "april";
          const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 4 AND Username = $1', [username]);
          console.log("expenses", expenses);
 
          res.render('pages/months/april', { expenses,month });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
       
      });

     // ------------------------------------------------------May (abbreviated may)-----------------------------------------------------------
    app.get('/may',async (req,res)=>{
   
      try {
          const username = req.session.user.username; // Get the logged-in username
          console.log("username logged in RIGHT NOW: ", username);
          const month = "may";
          const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 5 AND Username = $1', [username]);
          console.log("expenses", expenses);
 
          res.render('pages/months/may', { expenses,month });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
       
      });

// ------------------------------------------------------June (abbreviated june)-----------------------------------------------------------
    app.get('/june',async (req,res)=>{
   
      try {
          const username = req.session.user.username; // Get the logged-in username
          console.log("username logged in RIGHT NOW: ", username);
          const month = "june";
          const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 6 AND Username = $1', [username]);
          console.log("expenses", expenses);
 
          res.render('pages/months/june', { expenses,month });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
       
      });

      // ------------------------------------------------------July (abbreviated july)-----------------------------------------------------------
    app.get('/july',async (req,res)=>{
   
      try {
          const username = req.session.user.username; // Get the logged-in username
          console.log("username logged in RIGHT NOW: ", username);
          const month = "july";
          const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 7 AND Username = $1', [username]);
          console.log("expenses", expenses);
 
          res.render('pages/months/july', { expenses,month });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
       
      });

      // ------------------------------------------------------August (abbreviated aug)-----------------------------------------------------------
    app.get('/aug',async (req,res)=>{
   
      try {
          const username = req.session.user.username; // Get the logged-in username
          console.log("username logged in RIGHT NOW: ", username);
          const month = "aug";
          const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 8 AND Username = $1', [username]);
          console.log("expenses", expenses);
 
          res.render('pages/months/aug', { expenses,month });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
       
      });

      // ------------------------------------------------------September (abbreviated sep)-----------------------------------------------------------
    app.get('/sep',async (req,res)=>{
   
      try {
          const username = req.session.user.username; // Get the logged-in username
          console.log("username logged in RIGHT NOW: ", username);
          const month = "sep";
          const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 9 AND Username = $1', [username]);
          console.log("expenses", expenses);
 
          res.render('pages/months/sep', { expenses,month });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

     // ------------------------------------------------------October (abbreviated oct)-----------------------------------------------------------
    app.get('/oct',async (req,res)=>{
   
      try {
          const username = req.session.user.username; // Get the logged-in username
          console.log("username logged in RIGHT NOW: ", username);
          const month = "oct";
          const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 10 AND Username = $1', [username]);
          console.log("expenses", expenses);
 
          res.render('pages/months/oct', { expenses,month });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

      //------------------------------------------------------November (abbreviated nov)-----------------------------------------------------------
    app.get('/nov',async (req,res)=>{
   
      try {
          const username = req.session.user.username; // Get the logged-in username
          console.log("username logged in RIGHT NOW: ", username);
          const month = "nov";
          const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 11 AND Username = $1', [username]);
          console.log("expenses", expenses);
 
          res.render('pages/months/nov', { expenses,month });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

      // ------------------------------------------------------December (abbreviated dec)-----------------------------------------------------------
    app.get('/dec',async (req,res)=>{
   
      try {
          const username = req.session.user.username; // Get the logged-in username
          console.log("username logged in RIGHT NOW: ", username);
          const month = "dec";
          const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 12 AND Username = $1', [username]);
          console.log("expenses", expenses);
 
          res.render('pages/months/dec', { expenses,month });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
       
      });
//---------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------POST API CALLS BELOW -----------------------------------------------------------


//Login POST API
    app.post('/login', async (req,res)=>{
      let query = `SELECT * FROM users WHERE users.username = '${req.body.username}'`;
      await db.one(query, req.body.username)
      .then((data)=>{
          user.username = data.username;
          user.password = data.password;
      })
 
      .catch((err) => {
        //if user isnt in database
          if(user.password == undefined){
            res.render('pages/register',{
              error:true,
              message: "User not registered"
            });
            return;
          }
          else{
          res.render('pages/login',{
            //if cannot populate db
              error:true,
              message: "Unable to populate database"
          });}
      });
     
      if(user.password != undefined){
          const match = await bcrypt.compare(req.body.password, user.password);
          if(match == true){
            //if match for login
          req.session.user = user;
          req.session.save();
          res.redirect('/budget');
          }
          else{
            //if not match for login
          res.render('pages/login',{
            error:true,
            message: "Incorrect password"
          });
          };
      }
  });


  //AddExpense POST API
  app.post('/addExpense/:month', async (req, res) => {
    try {
      console.log("req.params", req.params);
      const month=req.params.month;
      console.log("month", month);

      const monthToNumber = {
        jan: 1, feb: 2, march: 3, april: 4, may: 5, june: 6,
        july: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
      };
      const monthNumber = monthToNumber[month];
      console.log("month number", monthNumber);
        // Extract expense details from the request body
        const { category, amount,label } = req.body;

        // Perform the database insertion
        const username = req.session.user.username;
        console.log("session saved, usename in add expense", username);
        console.log(monthNumber);
        const result = await db.query(
          'INSERT INTO Income_Expense (Username, Category, Amount, Label, Monthh) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [username,category, amount, label, monthNumber]
      );
          // Redirect back to the month page after adding the expense
          res.redirect(`/${month}`);
      } catch (error) {
          console.error('Error adding expense:', error);
          // Handle the error appropriately (e.g., render an error page)
          res.status(500).send('Internal Server Error');
      }
  });
 
  //DELETE Expense POST API
  app.post('/deleteExpense/:month', async (req, res) => {
    try {
        const month = req.params.month;
        const expenseId = req.body.expenseId;
        console.log("expense Id", expenseId);

        // Perform the deletion operation in the database
        const deleteQuery = 'DELETE FROM Income_Expense WHERE Index_ID = $1';
        await db.query(deleteQuery, [expenseId]);

        // Redirect back to the January page or any other page you prefer
        res.redirect(`/${month}`);
    } catch (error) {
        console.error('Error deleting expense:', error);
        // Handle the error appropriately, e.g., send an error response
        res.status(500).send('Internal Server Error');
    }
});  

  //POST register API
   app.post('/register', async (req, res) => {
    //hash the password using bcrypt library
    const hash = await bcrypt.hash(req.body.password, 10);
    // To-DO: Insert username and hashed password into the 'users' table
    let query = `INSERT INTO users(username, password) VALUES ('${req.body.username}','${hash}')`;
    db.any(query)
    .then(_ => {
      console.log('data added');
      res.redirect('/login');
    })
    .catch(err => {
      console.log('error');
        res.render('pages/register',{
          error:true,
          message:"User already exists"
        });
    });
  });

  //user authorization (if the user's session is not saved, redirect to login page)
const auth = (req, res, next) => {
  if (!req.session.user) {
    // Default to login page.
    return res.redirect('/login');
  }
  next();
};

// Authentication Required
app.use(auth);

module.exports = app.listen(3000);
console.log("Server is listening on port 3000");