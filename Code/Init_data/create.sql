CREATE TYPE CategoryEnum AS ENUM ('Salary', 'Investments', 'Transportation', 'Food', 'Entertainment', 'Other');


DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE Users (
    Username VARCHAR(60) PRIMARY KEY,
    Password VARCHAR(60) NOT NULL  
);


/*Income Expense Table*/
CREATE TABLE Income_Expense (
    Index_ID SERIAL PRIMARY KEY,
    Username VARCHAR(60),
    Category CategoryEnum,
    Amount FLOAT NOT NULL,
    Monthh INT,
    Label VARCHAR(50),
    FOREIGN KEY (Username) REFERENCES Users(Username)
   -- UNIQUE (Monthh)
);


/*Budget TO Income Table - I believe this is not needed since I am referencing the username (as a Foriegn key) in the income expense table*/
-- CREATE TABLE Users_to_Income (
--     Username VARCHAR(255),
--     Index_ID SERIAL,
--     income_expense_month INT,
--     PRIMARY KEY (Username, Index_ID),
--     FOREIGN KEY (Username) REFERENCES Users(Username),
--     FOREIGN KEY (Index_ID) REFERENCES Income_Expense(Index_ID)
-- );
-- CREATE TABLE Users_to_Income (
--     Username VARCHAR(60),
--     Index_ID INT,
--     Monthh INT,
--     FOREIGN KEY (Username) REFERENCES Users(Username),
--     FOREIGN KEY (Index_ID) REFERENCES Income_Expense(Index_ID),
--     FOREIGN KEY (Monthh) REFERENCES Income_Expense(Monthh)
--     --FOREIGN KEY (Index_ID, Monthh) REFERENCES Income_Expense(Index_ID, Monthh)
-- );
