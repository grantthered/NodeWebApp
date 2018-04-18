//Load in modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Get port from environment variable if possible. Necessary to work with Heroku.
const port = process.env.PORT || 3000;

//Express is a web framework for node
var app = express();

//Tell Handlebars where to find partial views.
hbs.registerPartials(__dirname + '/views/partials');

//Let Express know that we're using Handlebars.
app.set('view engine', 'hbs');

//app.use(middleware_layer_here)
//in this case, log every request
app.use((req, res, next) => {
  var now = new Date().toString();
  
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

//registers things in the public folder for viewing
app.use(express.static(__dirname + '/public'));

//registers helper function that handlebars can use
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//app.get is used to add GET method routes
//app.post for POST method routes
app.get('/', (req, res) => {
  res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Velcome to my lair'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling request'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

//listens at given port
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});