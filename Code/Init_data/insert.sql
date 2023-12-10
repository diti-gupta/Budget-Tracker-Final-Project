INSERT INTO users (password, username) VALUES
    ('$2b$10$AOC7paRUgmHE.lZe1yTlmeVNRA5bTFbMNI35CtTg767QzA1ngVVEW', 'user8');

-- -- Please note that the index_id will automatically be updated because the Income_Expense Index_ID is of type SERIAL 
-- INSERT INTO Income_Expense (Username, Category, Amount, Monthh, Label)
-- VALUES ('user8','Salary', 4000.00, 2, 'January Salary'); 


-- INSERT INTO Income_Expense (Username, Category, Amount, Monthh, Label)
-- VALUES ('user8','Investments', 1000.00, 1, 'January Investment');

-- INSERT INTO Income_Expense (Username, Category, Amount, Monthh, Label)
-- VALUES ('user8','Salary', 5000.00, 2, 'February Salary - Increased');

-- INSERT INTO Income_Expense (Username, Category, Amount, Monthh, Label)
-- VALUES ('user8','Investments', 1000.00, 2, 'February Investment');


-- INSERT INTO Users_to_Income (Username, Index_ID, Monthh)
-- SELECT Username FROM Users


-- INSERT INTO Users_to_Income (Username, Index_ID, Monthh)
-- SELECT
--     U.Username,
--     IE.Index_ID,
--     IE.Monthh
-- FROM
--     Users U
-- JOIN
--     Income_Expense IE ON 1 = 1
-- WHERE
--     IE.Monthh IN (SELECT DISTINCT Monthh FROM Income_Expense);

