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
app.use("/assets", express.static('public'));

// Set Middlewares 
app.use(bodyparser.urlencoded({ extended:false }));
app.use(bodyparser.json()); 



// Make the GET request to the GNews API
function getArticles(req, res, page, term = "example", link = "search?q="){
const apikey = '6301ef732d56d2d3d5276146d70f3a75';  
const url = 'https://gnews.io/api/v4/'+link+term+'&lang=en&country=us&max=11&apikey=' + apikey; 
 
axios.get(url)
.then(response => {
  let articles = response.data.articles;
  // Process the articles as needed
  res.locals.articles = articles;
  res.render(page);
})
.catch(error => { 
  res.locals.error = "Error fetching articles";
  res.render(page);
});
}

// Define your routes 
   app.get("/", (req, res)=>{
       res.locals.pageTitle = "Home";
       getArticles(req, res, "pages/home");
   });
   app.get("/home", (req, res)=>{
       res.locals.pageTitle = "Home";
       getArticles(req, res, "pages/home");
   });
   app.get("/category", (req, res)=>{
       res.locals.pageTitle = "Category";
       getArticles(req, res, "pages/category");
   });

   

//Handle http requests
   app.get("/search", (req, res)=>{ 
       res.locals.pageTitle = "Search Results";
       res.locals.q = req.query.q ? req.query.q.toString() : "";  
       getArticles(req, res, "pages/search", '"'+res.locals.q+'"');
   });
   app.get("/category/:title/", (req, res)=>{
      res.locals.pageTitle = req.params.title ? req.params.title.charAt(0).toUpperCase()+req.params.title.slice(1, req.params.title.length) : "Category";
      getArticles(req, res, "pages/category", '"'+res.locals.q+'"', "top-headlines?category=");
   });
    
    
   
// Start the server
app.listen(port, () => {
      console.log(`Default Server started on port ${port}`);
});