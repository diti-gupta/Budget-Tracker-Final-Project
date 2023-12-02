INSERT INTO users (password, username) VALUES
    ('$2b$10$AOC7paRUgmHE.lZe1yTlmeVNRA5bTFbMNI35CtTg767QzA1ngVVEW', 'user8');

-- INSERT INTO Income_Expense (Index_ID, Category, Amount, Monthh, Label)
-- VALUES (1, 'Salary', 4000.00, 2, 'Monthly Salary');

-- INSERT INTO Users_to_Income (Username, Index_ID, Monthh)
-- SELECT Username FROM Users

INSERT INTO Users_to_Income (Username, Index_ID, Monthh)
SELECT
    U.Username,
    IE.Index_ID,
    IE.Monthh
FROM
    Users U
JOIN
    Income_Expense IE ON 1 = 1
WHERE
    IE.Monthh IN (SELECT DISTINCT Monthh FROM Income_Expense);