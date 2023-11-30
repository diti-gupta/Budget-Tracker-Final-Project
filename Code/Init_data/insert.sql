INSERT INTO users (password, username) VALUES
    ('$2b$10$AOC7paRUgmHE.lZe1yTlmeVNRA5bTFbMNI35CtTg767QzA1ngVVEW', 'user8');

INSERT INTO User_Budget (Budget_id, Current_month)
VALUES (1, 12); -- Budget Id is 1, Month is December


INSERT INTO Users_to_Budget (Username, Budget_id)
VALUES ('user8', 1); -- Assuming 'user8' is an existing username and 1 is an existing Budget_id

INSERT INTO Income_Expense (Index_ID, Category, Amount, Total, Label)
VALUES (1, 'Salary', 5000.00, 5000.00, 'Monthly Salary');

INSERT INTO Budget_to_Income (Budget_ID, Index_ID)
VALUES (1, 1); -- Assuming 1 is an existing Budget_ID and 1 is an existing Index_ID
