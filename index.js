// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html - Allows to pick up the style.css file. path arg and __dirname when using vscode
app.use('/public', express.static(__dirname + '/public'));

// http://expressjs.com/en/starter/basic-routing.html - Allows to pick up the html file
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... Routing
// route to /api
app.get('/api', (req, res) => {
  let fecha = new Date();
  let utc = fecha.toUTCString();
  let unix = Date.parse(utc);
  res.json({unix, utc});
});

// route clicking the links
app.get('/api/:date', (req, res) => {
  let date = req.params.date;
  let unix, utc;
  if (date instanceof Date){ // if date param has date format
    unix = date.getTime();
    utc = date.toUTCString();
  } else if (!isNaN(date)){ // if dara param is a number
      unix = parseInt(date);
      date = new Date(unix);
      utc = date.toUTCString();
  } else { //else try to convert it to date
      date = new Date(date);
      utc = date.toUTCString();
      unix = date.getTime();
  }
  
  if (utc == 'Invalid date'){ // if date param is invalid -> error
    res.json({'error': 'Invalid date'});
  } else { // otherwise return json
    res.json({unix, utc});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
