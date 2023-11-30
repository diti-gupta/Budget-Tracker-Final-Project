CREATE TABLE Users_to_Budget (
    Username VARCHAR(60),
    Budget_id INT,
    FOREIGN KEY (Username) REFERENCES Users(Username),
    FOREIGN KEY (Budget_id) REFERENCES User_Budget(Budget_id)
);
