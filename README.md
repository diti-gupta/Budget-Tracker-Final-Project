# Software-Dev-Final-Project
Team number: 4 <br>
Team Name: The Budget Brigadiers <br>
Team Members: Will Davidson, Logan Brown, Diti Gupta, Jillian Bartz, Adam Fox, Rishi Hancock <br>
Application Name: Budget Tracker <br>'

# Team 4  

## Application Description  
EZBudget is an application that allows users to track their monthly income and allocate spending to the overall budget, with an easy, user friendly interface. The application allows users to create an account that will store their personal budget information which can be accessed through the login page. EZBudget will then ask users for monthly or bi-weekly incomes, as well as any spending that the user wants to include. There will also be individual categories for spending, including food, rent, car payments, or other monthly expenses. The application provides the total sums of their personal spending for each category on their budget tab, as well as their net profit for each month.

The EZBudget application is extremely useful for all individuals looking to become more aware of their spending habits. Our application can be a quick resource for individuals to see their budget without having to independently compute their profits. EZBudget will also provide simple information regarding the user’s categorical spending habits, providing the opportunity for more productive budgeting in the future months. The application includes monthly tabs that can show the user’s overall progress and helps

 
## Contributors:   
Will Davidson, Logan Brown, Diti Gupta, Jillian Bartz, Adam Fox, Rishi Hancock

## Tech Stack:  

|     Program/Tools       |       Reason for Use             |        
|-------------------------|----------------------------------|
| Github Project Board    | Project Tracker                  | 
| Github                  | VCS Repository                   | 
| SQL                     | Database                         | 
| Visual Studio Code      | IDE                              | 
| HTML, EJS, CSS          | UI Tools                         | 
| Agile                   | Deployment Environment           | 
| Mocha, Chai             | Testing                          | 
| Bootstrap               |  CSS Framework                   |
| Lucid Chart, Designs.Ai | Additonal Tools                  | 



## Prerequisites to Run: 
Have Docker installed and running in the background

## Running the Application Locally:  
After cloning the repositry, navigate to the "Code" folder using command: "cd Code" 

Start application by running **"docker compose up"**

Navigate to "http://localhost:3000/"

## Running Tests: 
In the **docker-compose.yaml**, go to the command section. Change the command from: **"npm run testandrun"** to **"npm start"**. 

Run **"docker compose down --volumes"** and recompose docker again with **"docker compose up"**. 

This sequence will run the tests correctly

## Link to Deployed Application:  
http://recitation-12-team-04.eastus.cloudapp.azure.com:3000/
