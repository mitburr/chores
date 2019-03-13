
CREATE DATABASE chores_db;

In Bash terminal, run 'node server.js' from project folder.
This will create the database table and columns (this gets data from models)

-------------------------------------------------------------
To manually enter data into your MySQL tables, 
change the "updatedAt" and "createdAt" columns default values as follows:

USE chores_db; 
ALTER TABLE chores 
MODIFY updatedAt TIMESTAMP 
DEFAULT CURRENT_TIMESTAMP;

USE chores_db; 
ALTER TABLE chores 
MODIFY createdAt TIMESTAMP 
DEFAULT CURRENT_TIMESTAMP;

USE chores_db; 
ALTER TABLE people
MODIFY updatedAt TIMESTAMP 
DEFAULT CURRENT_TIMESTAMP;

USE chores_db; 
ALTER TABLE people
MODIFY createdAt TIMESTAMP 
DEFAULT CURRENT_TIMESTAMP;

USE chores_db; 
ALTER TABLE houses
MODIFY updatedAt TIMESTAMP 
DEFAULT CURRENT_TIMESTAMP;

USE chores_db; 
ALTER TABLE houses
MODIFY createdAt TIMESTAMP 
DEFAULT CURRENT_TIMESTAMP;


-----------------------------------------------------------
USE chores_db;
INSERT into houses (house_name, isActive)
VALUES ("The Millers", 1),
	   ("The Smiths", 0 );
       
USE chores_db;        
INSERT into people (person_name, person_email, isParent, userID, password, houseId)
VALUES ("Mom Miller", "mom@email.com", 1, "mmiller1", "password1", 1), 
	   ("Dad Miller", "dad@email.com", 1,  'dmiller1', 'password2',1),  
       ("Billy Miller", "son@email.com", 0, 'bmiller1', 'password3',1),
       ("Becky Miller", "daughter@email.com", 0, 'beckmiller1', 'password4', 1),
	   ("Mr Smith", "msmith@email.com", 1, 'mr_smith1', 'password5', 2), 
	   ("Mrs Smith", "mrssmith@email.com", 1, 'momsmith1', 'password6', 2),  
       ("Jonny Smith", "jonnysmith@email.com",0, 'jsmith1', 'password7', 2),
       ("Sis Smith", "sissmith@email.com", 0, 'sissmith1', 'password8', 2); 

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