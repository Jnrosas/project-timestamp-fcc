// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html - Allows to pick up the style.css file
app.use('/public', express.static(__dirname + '/public'));

// http://expressjs.com/en/starter/basic-routing.html - Allows to pick up the html file
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... Routing
app.get('/api/2015-12-25', function (req, res) {
  res.json({"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"})
});

app.get('/api/1451001600000', (req, res) => {
  res.json({"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"})
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
