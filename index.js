// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// respuesta al desafío
app.get("/api/:date?", (req, res) => {
  // Evaluamos si el string viene en la URL o no.
  let date_string = req.params.date || null;
  // EN caso que nos toque numérico, lo pasamos a número dado que en la url viene en formato texto.
  if(date_string != null && date_string.match(/\d{5,}/)){
    date_string = parseInt(date_string);
  }
  //En caso de que no vanga, a new Date le asignamos hoy, de lo contrario generamos un new Date con el string
  let newDate = (date_string === null) ? new Date : new Date(date_string);
  // Evaluamos si newDate es una fecha válida
  if (newDate.toString() === "Invalid Date") {
    res.json({error : "Invalid Date"}); // Devolvemos invalid date
  }
  // Devolvemos el objeto requerido por el ejercicio
  res.json({ unix: newDate.valueOf(), utc: newDate.toUTCString() });
 
});

/* app.get("api/", (req, res) => {
  let date = new Date();
  res.json({ unix: date.valueOf(), utc: date.toUTCString() });
})

*/



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
