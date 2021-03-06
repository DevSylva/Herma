var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
var fortune = require("./lib/fortune.js");

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  res.locals.showTests =
    app.get("env") !== "production" && req.query.test === "1";
  next();
});

app.get('/', function (req, res) {
    res.render('home');
    // res.type('text/plain');
    // res.send("Home page");
});

app.get('/about', function (req, res) {
    res.render("about", {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get("/tours/hood-river", function (req, res) {
  res.render("tours/hood-river");
});

app.get("/tours/request-group-rate", function (req, res) {
  res.render("tours/request-group-rate");
});

// custom 404 page
app.use(function (req, res) {
    // res.type('text/plain');
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function (err, req, res, nenxt) {
    console.error(err.stack);
    // res.type('text/plain');
    res.status(500);
    res.render('500');
})



app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
})