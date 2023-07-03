# Recipe Blog/App

## About
CRUD App using React.js, Express.js, and PostreSQL

Users can create a login, update their profile, create and modify recipes.

The home page will display a list of recipes stored in the database.

## Installation and Set-up
Clone the repo
`git clone https://github.com/mattc-27/recipe-blog-app`

Install dependencies 
`cd ./client`
`npm install`

`cd ./server`
`npm install`

Create PostgreSQL database
[createdb.sql](https://github.com/mattc-27/recipe-blog-app/blob/main/createdb.sql)

Set up local PostreSQL server 
[postgresapp](https://postgresapp.com/)

Generate JWT signature and include in the .env file
`JWT_TOKEN=SIGNATURE`

Start the client
`cd ./client`
`npm run dev`

Start the server
`cd ./server`
`nodemon server.js`
