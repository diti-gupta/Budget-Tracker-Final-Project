CREATE TYPE CategoryEnum AS ENUM ('Salary', 'Investments', 'Transportation', 'Food', 'Entertainment', 'Other');

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE Users (
    Username VARCHAR(60) PRIMARY KEY,
    Budget_ID INT NOT NULL,
    Password VARCHAR(60) NOT NULL
);

/*Income Expense Table*/

CREATE TABLE Income_Expense (
    Index_ID SERIAL PRIMARY KEY,
    Category CategoryEnum,
    Amount FLOAT NOT NULL,
    Total FLOAT NOT NULL,
    Monthh INT,
    Label VARCHAR(50)
);

/*Budget TO Income Table*/
CREATE TABLE Users_to_Income (
    Budget_ID INT,
    Index_ID INT,
    Monthh INT,
    FOREIGN KEY (Budget_id) REFERENCES Users(Budget_id),
    FOREIGN KEY (Index_ID) REFERENCES Income_Expense(Index_ID),
    FOREIGN KEY (Monthh) REFERENCES Income_Expense(Monthh)
);