CREATE TYPE CategoryEnum AS ENUM ('Salary', 'Investments', 'Transportation', 'Food', 'Entertainment', 'Other');

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE Users (
    Username VARCHAR(60) PRIMARY KEY,
    Password VARCHAR(60) NOT NULL
);

/*User Budget Table*/
CREATE TABLE User_Budget (
    Budget_id INT PRIMARY KEY,
    Current_month INT NOT NULL
);

/*Users TO Budget Table*/
CREATE TABLE Users_to_Budget (
    Username VARCHAR(60),
    Budget_id INT,
    FOREIGN KEY (Username) REFERENCES Users(Username),
    FOREIGN KEY (Budget_id) REFERENCES User_Budget(Budget_id)
);

/*Income Expense Table*/

CREATE TABLE Income_Expense (
    Index_ID SERIAL PRIMARY KEY,
    Category CategoryEnum,
    Amount FLOAT NOT NULL,
    Total FLOAT NOT NULL,
    Label VARCHAR(50)
);

/*Budget TO Income Table*/
CREATE TABLE Budget_to_Income (
    Budget_ID INT,
    Index_ID INT,
    FOREIGN KEY (Budget_id) REFERENCES User_Budget(Budget_id),
    FOREIGN KEY (Index_ID) REFERENCES Income_Expense(Index_ID)
);
