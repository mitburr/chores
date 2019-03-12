CREATE DATABASE chores_db;

-----------------------------
Use chores_db; 
CREATE TABLE chores (
id INTEGER NOT NULL AUTO_INCREMENT,
chore_name VARCHAR(255) NOT NULL, 
chore_importance VARCHAR(255),
chore_complete BOOLEAN DEFAULT false,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
personId VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
); 

Use chores_db; 
CREATE TABLE  people (
id INTEGER NOT NULL AUTO_INCREMENT,
person_name VARCHAR(255) NOT NULL, 
person_email VARCHAR (255), 
isParent BOOLEAN DEFAULT false,
userID VARCHAR(255),
password VARCHAR (255),
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
houseId VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
); 

Use chores_db; 
CREATE TABLE houses (
id INTEGER NOT NULL AUTO_INCREMENT,
house_name VARCHAR(255) NOT NULL, 
isActive BOOLEAN DEFAULT false,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
); 


-----------------------------------
USE chores_db;
INSERT into houses (house_name, isActive)
VALUES ("The Millers", 1),
	   ("The Smiths", 0 );
       
USE chores_db;        
INSERT into people (person_name, person_email, isParent, houseId)

VALUES ("Mom Miller", "mom@email.com", 1, 1), 
	   ("Dad Miller", "dad@email.com", 1, 1),  
       ("Billy Miller", "son@email.com", 0,1),
       ("Becky Miller", "daughter@email.com", 0, 1),
	   ("Mr Smith", "msmith@email.com", 1, 2), 
	   ("Mrs Smith", "mrssmith@email.com", 1, 2),  
       ("Jonny Smith", "jonnysmith@email.com", 0,2),
       ("Sis Smith", "sissmith@email.com", 0, 2); 

USE chores_db; 
INSERT into chores (chore_name, chore_importance, chore_complete, personId)
VALUES ("Dishes", "High", false, 1),
	   ("Laundry", "Medium", true, 2),
	   ("Mow the Lawn", "Low", false, 3),
	   ("Feed the Dog", "Medium", true, 4); 


--------------------------------------
 Use chores_db; 
select * from houses

 Use chores_db; 
select * from people

 Use chores_db; 
select * from chores
