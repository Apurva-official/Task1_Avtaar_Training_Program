//jshint vscode es6

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const port = 3000

const app = express();


app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}))

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req, res){

  const name = req.body.fullName
  const today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long" 
  }

  var day = today.toLocaleDateString("en-US", options)

  let min = today.getMinutes()
  let hr = today.getHours()
  let sec = today.getSeconds()

  var result = '';
  var characterRef = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charLength = characterRef.length;


  for(var i=0; i<10;i++){
    result += characterRef.charAt(Math.floor(Math.random() * charLength));
  }
 
  var uniqueID = result
  var time =  hr + ":" + min + ":" + sec
  // 
  res.render("result", {userName: name, userUniqueId: uniqueID, DayNDate: day,inputTime: time})


  // console.log(name)
  // console.log("Unique Id:" + uniqueID)
  // console.log("Input Date - " + day)
  // console.log(" Input Time - " + hr + ":" + min + ":" + sec)

})

// app.get("/result", function(req,res){
//   res.render("result", {userName: name, userUniqueId: uniqueID, DayNDate: day,inputTime: time})
// })


app.listen(port, function(req, res){

  console.log("Server is ready and running on localhost:" + port)

})

