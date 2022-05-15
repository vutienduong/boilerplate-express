let express = require("express");
let app = express();

console.log("Hello World");
// app.use( express.static("public") )
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

app.get("/now", (req, res) => {
  req.time = new Date().toString();
  next()
}, (req, res) => res.send({time: req.time}));

module.exports = app;

