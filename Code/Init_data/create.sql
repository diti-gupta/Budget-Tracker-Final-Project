CREATE TYPE CategoryEnum AS ENUM ('Salary', 'Investments', 'Transportation', 'Food', 'Entertainment', 'Other');

DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE Users (
    Username VARCHAR(60) PRIMARY KEY,
    --Budget_ID SERIAL NOT NULL, -- Assuming this is a foreign key in the Users_to_Income table
    Password VARCHAR(60) NOT NULL
    --UNIQUE (Budget_ID)
);

/*Income Expense Table*/
CREATE TABLE Income_Expense (
    Index_ID SERIAL PRIMARY KEY,
    Category CategoryEnum,
    Amount FLOAT NOT NULL,
    Total FLOAT NOT NULL,
    Monthh INT,
    Label VARCHAR(50),
    UNIQUE (Monthh)
);

/*Budget TO Income Table*/
CREATE TABLE Users_to_Income (
    Username VARCHAR(60),
   -- Budget_ID INT,
    Index_ID INT,
    Monthh INT,
    --PRIMARY KEY (Username, Index_ID), -- Composite primary key 
    FOREIGN KEY (Username) REFERENCES Users(Username),
    FOREIGN KEY (Index_ID) REFERENCES Income_Expense(Index_ID),
    FOREIGN KEY (Monthh) REFERENCES Income_Expense(Monthh)
);