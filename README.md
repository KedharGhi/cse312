
#  Ecommerce-Web

This is an e-commerce website.

## Key features

`User Accounts` 

 1.  User can see a history of all the orders they've placed as well as their points earned
 2.  The menu can be hard-coded and purchases can be simulated in app

`User Interaction` 

 1.  Add the review idea from your proposal where users can rate and comment each item and see review/ratings in real time
 2. Implement an admin page where you can see orders and points in real time

##  Built with

* HTML

* CSS

* Javascript

* Node.js

* MongoDB

## Structures of this web application:

`public` contains all client static files (css, client javascript (ex. jQuery), images, fonts...)

`routes`  contains the main back-end code (server side), which compute data before calling a template engine (see below) or respond to the client (via json of xml).

`views`  contains each page template(jade/ejs). These files are used by scripts in "route"

`app.js`  contains the express core, such as url parser, modules, database...

`package.json`  is the project descriptor file (used by npm for dependencies and sharing)

  

##  Getting Started

Following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. install mongodb on your computer
2. start mongodb local server (mongodb://127.0.0.1:27017)
3. npm install
2. nodemon app.js