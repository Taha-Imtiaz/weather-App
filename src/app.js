const path = require("path");
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
//load express
const express = require("express");
const hbs = require("hbs");
//express is a function and we can call it
// console.log(__dirname)  //prints directory path where the current script lives
//console.log(__filename) //prints file name
//console.log(path.join(__dirname, "../public"))
//we can generate express app using call to express
const app = express(); //store our express application in variable app
//setup port for heroku
const port = process.env.PORT || 3000 //port value heoku provides. set port value provided by heroku or 3000 

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//setup handlebars engine and views location
app.set("view engine", "hbs");
//setup directory path tell express to look into our customize path
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//first argument is url , second argument is the call back function that tells what we do whensomeone visits route
//app.get('' , (req, res) => /*req = request res = response */{
//we can do anything read data from database or create HTML
//   res.send() allows us to send something to the server
// res.send(`<h1>Weather</h1>`)
// })

//app.com (root route for home page)
//app.com/help
//app.com/about
// app.get('/help', (req, res) => {
// res.send([{
//     name: "Taha"
// },
// {
//     name: "Sarah"
// }
// ])
// })

// app.get('/about', (req, res) => {
//     res.send(`<h1>About Page</h1>`)
//     })

app.get("", (req, res) => {
  //response.render allow us to render our views
  res.render("index", {
    title: "Weather",
    name: "Taha Imtiaz",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Taha Imtiaz",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is some helpful text",
    title: "Help",
    name: "Taha Imtiaz"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
  return  res.send({
      error: "Address must be provided"
    })
  }
  geocode(req.query.address, (error, data) => {
    //if do not find a value send a value to {}
    const {latitude, longitude, location} = data || {}
    
    if (error) {
      return res.send({error : error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({error : error})
      }
      res.send({
        forecast : forecastData,
        location : location,
        address:req.query.address
      })

    })
  })
 
});

app.get("/products", (req,res) => {
if(!req.query.search) {
return res.send({
  error : "You must provide a search term"
})
}

  console.log(req.query)  //prints query string
res.send({
  products : []
})
})
//if we dont setup a route for a specific url we get an error

app.get('/help/*', (req,res) => {
//matching a page that contains /help/(any route that doesn't match)
//match a specific page
res.render('404' , {
    title : '404',
    name : "Taha imtiaz",
    errorMessage: "Help article not found" 
})
})

app.get('*', (req,res) => {
    // * is used for matching everything except the setup urls
    //match every request 
    res.render('404' , {
        title : '404',
        name : "Taha imtiaz",
        errorMessage : "Page not found"
    })
})
//start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
