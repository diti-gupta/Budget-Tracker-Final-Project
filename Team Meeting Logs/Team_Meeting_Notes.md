11/6/2023: Meeting #1 for Lab 10 and Project Setup (In-Person, Attendees: Will, Logan, Adam, Diti, Jillian, Rishi)

Discussions/Decisions:

Discussed Lab 10 deliverables:   

    - Completed all deliverables

    - Created overview of directory(partials,pages)

Decisions made: 

    - Items to include in the EZ Budget application, for example: creating categories for the spending, payments etc. 

    -More details about this are in the Lab-10.md file in the application description section.


Follow Up items:

    - Create meeting plan --> when to meet next (As of now, the plan is to meet Mondays at 12pm in CSEL or through zoom)
    
    - Take a vote about who prefers Front-End vs Back-End work. 


 
11/9/2023: Meeting for Lab #11: Test cases (In-Person, Attendees: Will, Logan, Diti, Jillian,Adam)

Discussions/Decisions:

Overall, discussed issues with test cases, and created a plan to tackle errors in test cases for the week

- Postive test cases were completed, but needed to work on negative test cases and getting the test cases working on everyone's local environments. 

- Diti tackled the test cases for the login endpoint

Follow up Items:

- Follow through with plan of tackling the test cases for the 2nd endpoint(logout endpoint?) (Logan/Diti plan to work on this)

- Jillian/Will/Adam working on UAT testing - finish this up before end of week 

- Will/Adam/Logan/Rishi created a diagram for the database implementation - need to continue working on this



11/13/2023: Lab #11 Deliverables  (In-Person, Attendees: Will, Logan, Diti, Jillian)

Discussions/Decisions:

Discussed issues with test cases and plan to finish it up by Thursday (still failing to pass test cases on everyone's local computers)

Will/Diti/Jillian/ worked on the database implementation and finalized the plan for creating the database in an effecient manner

Follow- Up Items

- Go to Office hours so that the test cases can pass for everyone

- Finish the test cases

11/14/2023: Database implementation and Fall break plan  (In-Person, Attendees: Will, Logan, Diti, Jillian,Adam)

- Discussed finishing database implementation and plan for new test cases 

Follow -Up items:

- Work on creating month and budget pages over break and updating test cases based on the new pages (Diti and Jillian) 

- Finish setting up the database (Logan/Adam/Will/Rishi)

11/29/2023: (Over Discord call/text, Attendees: Will, Logan, Diti, Jillian, Adam, Rishi)

Discussions/Decisions:

- Discussed frontend/backend work and divided work on frontend and backend equally. 

- Discussed lack of communication and how to improve on that, so that everyone is able to contribute in an effecient manner

- Discussed issues with everyone having the same database established. 

- Jillian working on frontend work and styling. Diti/Will/Logan/Adam/Rishi working on backend and getting the pages (budget and addexpense/deleteexpense working) 

Follow- Up Items:

- Work on the AddExpense/DeleteExpense for all month pages. 

- FrontEnd: add logo and change website style according to logo and Wireframe

- No one was sure why database was not being created correctly for everyone, need to go to Office hours to fix this 


11/30/2023: (In-Person, Attendees: Will, Logan, Diti, Jillian, Adam)

Discussions/Decisions:

- Discussed updates with Budget buttons and each month webpage. 

- Discuussed how to fix the database creation and insertion\

- Discussed how to add Expense to each month correctly and display that specific month's expenses ONLY. 

- Rishi working on deployment for the website

Follow - Up items:
- Display the correct expenses based on month when an expense is added or deleted. 

- We need to generalize the addExpense/deleteExpense so that the current month can be passed in as a paramater,and there is only 1 addExpense API and 1 deleteExpense API


12/2/2023: (In-Person, Attendees: Will, Logan, Jillian, Adam)

Discussions/Decisions:

- Discussed styling, and changes to database so that the expenses can be summed up correctly 

- Discussed code issues with addExpense 

- Discussed  issues with addExpense/deleteExpense right now, there is hard-code in the index.js for addExpense for each month--> we have 12 seperate addExpense and deleteExpense API calls for each month.

- Rishi is having issues with docker in terms of website deployment (need to continue checking in on this)

Follow-Up Items:

- get issues with addExpense fixed 

- update code so that it matches with the changes in the database

- Continue working on front end for styling

- work on deployment/go to Office hours to fix issues with docker 



12/4/2023: (In-Person, Attendees: Will, Logan, Diti, Jillian, Adam)

Discussions/Decisions:

- Discussed how addExpense/deleteExpense buttons were fixed and how the addExpense/deleteExpense was generalized (with a month parameter), so that we have only 1 addExpense/deleteExpense API call in index.js. 

- Discussed working on the pie chart that displays the summary of each month's expenses (Diti plans to work on this )

- Rishi is still having issues with docker

Follow-Up Items:

- add a chart to the budget.ejs pages as well as the month pages. 

- continue to work on styling for all pages (front end)

- get website deployed ASAP (Diti has decided to take on this, as there are continuing issues with Rishi's docker.)


12/5/2023: (Discord Text discussion)

Discussions/Decisions:

- Discussed changing the pie chart to find percent each expense based on Salary, NOT total expenses. 

- Discussed issues with using a pie chart for the above point/perhaps using a bar chart 

- Adam working on the bar chart implementation and based on the chart, Jillian will update the styling/positioning in terms of front-end work

- Diti has completed deployment for website, and added files/documentation for lab 13. 

- Discussed adding more test cases for the graphs in budget.ejs  - Rishi plans to work on this


Follow- Up Items:

- Work on presentation/slides for Thursday

- Add test cases for budget.ejs graphs


