
CREATE TABLE Income_Expense (
    Index_ID SERIAL PRIMARY KEY,
    Category VARCHAR(50),
    Amount FLOAT NOT NULL,
    Total FLOAT NOT NULL,
    Label VARCHAR(50)
);
