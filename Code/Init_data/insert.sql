INSERT INTO users (password, username) VALUES
    ('$2b$10$AOC7paRUgmHE.lZe1yTlmeVNRA5bTFbMNI35CtTg767QzA1ngVVEW', 'user8');

INSERT INTO Income_Expense (Index_ID, Category, Amount, Total, Monthh, Label)
VALUES (1, 'Salary', 5000.00, 5000.00, 2, 'Monthly Salary');

INSERT INTO Users_to_Income (Budget_ID, Index_ID, Monthh)
VALUES (1, 1, 1);
