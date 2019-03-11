
CREATE DATABASE chores_db;


CREATE DATABASE chores_db;

USE chores_db; 

INSERT into houses (house_name, isActive)
VALUES ("The Millers", "True"),
	   ("The Smiths", "False")
       
INSERT into people (person_name, person_house, isParent)
VALUES ("Mom Miller", "The Millers", true), 
	   ("Dad Miller", "The Millers", true),  
       ("Billy", "The Millers", false), 
       ("Jane", "The Millers", false), 


INSERT into chores (chore_name, chore_person, chore_importance, chore_complete)
VALUES ("Dishes", "Billy", "high", false),
	   ("Laundry", "Jane", "low", false) 