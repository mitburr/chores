CREATE DATABASE chores_db;

-----------------------------
Use o6qfatgzaxdt1tha; 

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

Use o6qfatgzaxdt1tha; 
CREATE TABLE  people (
id INTEGER NOT NULL AUTO_INCREMENT,
person_name VARCHAR(255) NOT NULL, 
person_email VARCHAR (255), 
isParent BOOLEAN DEFAULT false,
userID VARCHAR(255) Unique,
password VARCHAR (255),
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
houseId VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
); 



-----------------------------------
       
USE o6qfatgzaxdt1tha;        
INSERT into people (person_name, person_email, isParent, userID, password, houseId)
VALUES ("Mom Miller", "mom@email.com", 1, "mmiller1", "password1", 1), 
	   ("Dad Miller", "dad@email.com", 1,  'dmiller1', 'password2',1),  
       ("Billy Miller", "son@email.com", 0, 'bmiller1', 'password3',1),
       ("Becky Miller", "daughter@email.com", 0, 'beckmiller1', 'password4', 1),
	   ("Mr Smith", "msmith@email.com", 1, 'mr_smith1', 'password5', 2), 
	   ("Mrs Smith", "mrssmith@email.com", 1, 'momsmith1', 'password6', 2),  
       ("Jonny Smith", "jonnysmith@email.com",0, 'jsmith1', 'password7', 2),
       ("Sis Smith", "sissmith@email.com", 0, 'sissmith1', 'password8', 2); 

USE o6qfatgzaxdt1tha;
INSERT into chores (chore_name, chore_importance, chore_complete, personId)
VALUES ("Dishes", "High", false, 1),
	   ("Laundry", "Medium", true, 2),
	   ("Mow the Lawn", "Low", false, 3),
	   ("Feed the Dog", "Medium", true, 4); 
	   
--------------------------------------

 Use o6qfatgzaxdt1tha; 
select * from people

 Use o6qfatgzaxdt1tha; 
select * from chores