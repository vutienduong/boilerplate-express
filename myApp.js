let express = require("express");
let bodyParser = require("body-parser");
let app = express();

console.log("Hello World");
// app.use( express.static("public") )
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

app.use('/public', express.static(__dirname + '/public'))
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/json", (req, res) => {
  const mySecret = process.env['MESSAGE_STYLE']
  const message = mySecret == 'uppercase' ? 'HELLO JSON' : 'Hello json'
  res.json({message: message})
})

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => res.send({time: req.time}));

app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word})
})
app.get('/name', (req, res) => {
  res.json({name: `${req.query.first} ${req.query.last}`})
})

app.post('/name', (req, res) => {
  res.json({name: `${req.body.first} ${req.body.last}`})
})

module.exports = app;