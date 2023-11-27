CREATE TABLE Budget_to_Income (
    Budget_ID INT,
    Index_ID INT,
    FOREIGN KEY (Budget_id) REFERENCES User_Budget(Budget_id),
    FOREIGN KEY (Index_ID) REFERENCES Income_Expense(Index_ID)
);
