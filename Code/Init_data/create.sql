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

