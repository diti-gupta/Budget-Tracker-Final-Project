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




  app.get('/budget',(req,res)=>{
    res.render('pages/budget');
  });


  app.get('/jan',async (req,res)=>{


    // const clickedMonth = req.query.clickedMonth || 'jan'; // Default to January if not provided
    // console.log("month",clickedMonth);
    try {
      const username = req.session.user.username; // Get the logged-in username
      const month = "jan";
       console.log("username logged in RIGHT NOW: ", username);
      const expenses = await db.query('SELECT * FROM Income_Expense WHERE Monthh = 1 AND Username = $1', [username]);
        //const current_user = req.session.user.username;


        console.log("expenses", expenses);


        res.render('pages/months/jan', {expenses,month});
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
      //res.render('pages/months/jan');
    });
  //   app.get('/:month', (req, res) => {
  //     const currentMonth = req.params.month;
  //     // Rest of your code
  //  });


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


    //now outside of january
    //ADD Expense call for button in each month page
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


  //AddExpense for Jan month
  app.post('/addExpense/:month', async (req, res) => {
    try {
      console.log("req.params", req.params);
      const month=req.params.month;
      console.log("month", month);

      const monthToNumber = {
        jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
        jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
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


   //AddExpense for Jan month
  //  app.post('/addExpense/feb', async (req, res) => {
  //   try {
  //       // Extract expense details from the request body
  //       const { category, amount,label } = req.body;


  //       // Perform the database insertion
  //       const username = req.session.user.username;
  //       console.log("session saved, usename in add expense", username);
  //       const result = await db.query(
  //         'INSERT INTO Income_Expense (Username, Category, Amount, Label, Monthh) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  //         [username,category, amount, label, 2]
  //     );
  //         // Redirect back to the feb page after adding the expense
  //         res.redirect('/feb');
  //     } catch (error) {
  //         console.error('Error adding expense:', error);
  //         // Handle the error appropriately (e.g., render an error page)
  //         res.status(500).send('Internal Server Error');
  //     }
  // });
 
 
  //DELETE Expense
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



// //DELETE Expense
// app.post('/deleteExpense/feb', async (req, res) => {
//   try {
//       const expenseId = req.body.expenseId;
//       console.log("expense Id", expenseId);

//       // Perform the deletion operation in the database
//       const deleteQuery = 'DELETE FROM Income_Expense WHERE Index_ID = $1';
//       await db.query(deleteQuery, [expenseId]);

//       // Redirect back to the January page or any other page you prefer
//       res.redirect('/feb');
//   } catch (error) {
//       console.error('Error deleting expense:', error);
//       // Handle the error appropriately, e.g., send an error response
//       res.status(500).send('Internal Server Error');
//   }
// });


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


  app.get('/getChartData/:month', async (req, res) => {
    try {
      console.log("in get chart Data");
      const username = req.session.user.username;

      const month=req.params.month;
      console.log("month", month);

      const monthToNumber = {
        jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
        jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
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

  // app.get('/getChartData/feb', async (req, res) => {
  //   try {
  //     const username = req.session.user.username;
  //     //const clickedMonth = req.originalUrl.split('/');
  //     // console.log("req origingal ", req.originalUrl);
  //     // console.log("clicked month in data chart", clickedMonth);

  //     console.log("username in chart", username);
  //     // Fetch data from the database
  //     const result = await db.query('SELECT Category, SUM(Amount) AS Total FROM Income_Expense WHERE Username = $1 AND Monthh = 2 GROUP BY Category',[username]);
  //     console.log("get chart data RESULT:", result);
     
  //     // Format the data for the chart
  //     const dataPoints = result.map(row => ({ y: row.total, label: row.category }));
  //     console.log("datapoint in get api", dataPoints);
 
  //     res.json(dataPoints);
  //   } catch (error) {
  //     console.error('Error fetching data for chart:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });


  // app.get('/expensesbycategory', async (req, res) => {
  //   try {
  //     //  get expenses from the table using a query
  //     const expensesbycategory = await db.query('SELECT DISTINCT Category FROM Income_Expense');
  //     res.json(expensesbycategory.rows);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });
 
  app.get("/",(req,res)=>{
    res.render("pages/home");
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
 
   //POST register
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


 


const auth = (req, res, next) => {
  if (!req.session.user) {
    // Default to login page.
    return res.redirect('/login');
  }
  next();
};


// Authentication Required
app.use(auth);


app.get('/logout', (req, res) => {
  req.session.destroy();
 
  res.render('pages/login',{
    error:false,
    message: "Logged out successfully!"
  });
});




module.exports = app.listen(3000);
console.log("Server is listening on port 3000");


//     // Assuming you have logic to fetch the months based on your application's requirements
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     // Assuming you have logic to fetch user-specific budget data
//     // Replace the sample logic with your actual logic
//     const userSpecificExpenses = await db.any('SELECT * FROM Users_to_Budget WHERE Username = $1', [req.session.user.username]);
     
//     // Fetch existing budget data for each month
//     // const budgetData = await db.any('SELECT * FROM User_Budget WHERE Username = $1', [req.session.user.username]);




//     res.render("pages/budget", {
//       showExpenseModal: true,
//       expenses: userSpecificExpenses,
//       action: req.query.taken ? 'delete' : 'add',
//       months: months, // Pass the months variable to the template
//       // budgetData: budgetData,
//     });
//   } catch (error) {
//     console.error('Error fetching user-specific expenses:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });






// // POST API to add an expense
// app.post('/addExpense',  (req, res) =>
//  {
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//   const userSpecificExpenses =  db.any('SELECT * FROM Users_to_Budget WHERE Username = $1', [req.session.user.username]);
//   res.render("pages/budget", {
//     showExpenseModal: true,
//     expenses: userSpecificExpenses,
//     action: req.query.taken ? 'delete' : 'add',
//     months: months, // Pass the months variable to the template
//     // budgetData: budgetData,
//   });
//   //res.render("pages/budget");// {showExpensePopup: true});
 
// });


// POST API to remove an expense
// app.post('/removeExpense', async (req, res) => {
//   try {
//     const { indexId } = req.body;




//     // Delete the expense from the Budget_to_Income table
//     await db.none('DELETE FROM Budget_to_Income WHERE Index_ID = $1', [indexId]);




//     // Delete the expense from the Income_Expense table
//     await db.none('DELETE FROM Income_Expense WHERE Index_ID = $1', [indexId]);




//     // Send a success response
//     res.status(200).json({ message: 'Expense removed successfully', indexId });
//   } catch (error) {
//     console.error('Error removing expense:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
