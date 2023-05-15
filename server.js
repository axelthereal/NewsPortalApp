//Import Libraries
const express = require('express'); //our backend
const axios = require('axios'); //to handle http requests
const bodyparser = require('body-parser'); //parse json bodies 
const app = express()

// Define your ports and variables
const port = 3030;

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Set up static files directory
app.use("assets/", express.static('public'));

// Set Middlewares 
app.use(bodyparser.urlencoded({ extended:false }));
app.use(bodyparser.json()); 

// Define routes
  //link-to-your-routes

// Start the server
app.listen(port, () => {
  console.log(`Default Server started on port ${port}`);
});