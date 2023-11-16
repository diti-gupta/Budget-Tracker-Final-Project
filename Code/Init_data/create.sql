DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE Users (
    password CHAR(60) NOT NULL,
    username VARCHAR(50) PRIMARY KEY
);
CREATE TABLE Users_to_Budget (
    Usernme VARCHAR(60) FOREIGN KEY,
    Budget_ID int FOREIGN KEY
);
CREATE TABLE User_Budget(
    Budget_ID int PRIMARY KEY,
    Month int
);
CREATE TABLE Budget_to_Income(
    Budget_ID int FOREIGN KEY,
    Income_Expense_ID int FOREIGN KEY
);
CREATE TABLE Income Expense(
    Income_Expense_ID int PRIMARY KEY,
    Category VARCHAR(60) [],
    Amount float,
    Total float,
    Display_Label VARCHAR(60)
);

