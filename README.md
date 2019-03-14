# chores
it's chores

##NPM's needed
* Step 1: run 'npm init' to ceate package.json file

* Step 2: install the following packages:    

    - npm i express
    - npm i mysql
    - npm i sequelize
    - npm i mysql2
    - npm i sequelize-cli
    - npm i method-override
    - npm i express-jwt
    - npm i cookie-parser


* Step 3: run 'npm install' 

* Step 4: run 'sequelize init:models & sequelize init:config' 

* Step 5: go to your config/config.json file and update:    
    - development = your local settings
    - test = no changes, not used
    - production  = your heroku settings 
<br/>
<br/>


CONNECTIONS: The table relationship that we created and how they interact with each other!<br/>

![models](https://user-images.githubusercontent.com/46298501/54382730-8ee8c380-465e-11e9-91ba-16b689e3504d.jpg)


<br/>
<br/>
<br/>


MAIN APPLICATION:<br/>
Once the page is loaded up, it'll take you to the home page where you will be able to login (if you already have an account) or register (if you don't)!<br/>
INSERT PICTURE OF HOME HERE!!!!!
<br/>
REGISTER PAGE:<br/>
If you click the Register button, it'll take you to the register page. Here, you will be able to select if you are a parent (you can then create your household and credentials to login in the future) or a child (you can type in your unique household name that the parent created and then you will create your login credentials for the future).<br/>
INSERT PICTURE OF REGISTER PAGE HERE!!!!!!<br/>
<br/>
PARENT PAGE:<br/>
If you logged in or just completed registration--and you are a parent--you will be redirected to the parent page! On this page, you will be able to create a chore and assign it to your children by using the drop-down menu. You will also be able to reassign a chore just in case a child can't complete it or if they lost the privilege to do the chore. The chores that have been created and assigned in the left hand column are color coded for visual ease.<br/>
        - Green: These chores are ready to be assigned!
        - Red: These chores have been assigned are in progress!
        - Line through the chore: These chores have been completed! Start handing out those points...or take some away!
 Once chores are completed and crossed out, you will be able to assign your child points based on your own scale that you created at home. The better the job, the more points they get! Treat them to something nice once they pass as certain amount of points! If they do not do a great job on the chore that they were assigned, you can take away points too!
 <br/>
 INSERT PARENT PICTURE HERE!!!!!
 <br/>
 CHILDREN PAGE:<br/>
 If you logged in or just completed registration--and you are a child--you will be redirected to the children page! On this page, you will be able to see what chores you have been assigned. If you complete a chore, you can select the specific chore from the drop-down menu and click submit to tell Mom & Dad that you are done! Once Mom & Dad checks it, they will give you points or take points away! Make sure you do the best job you can!<br/>
 INSERT CHILDREN PICTURE HERE!!!!!
