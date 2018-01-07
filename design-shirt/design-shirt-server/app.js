
const express = require('express')
const designService  = require('./DesignService')
const app = express()
const bodyParser = require('body-parser')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended : false})) 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var cors = require('cors')
 

//app.user(bodyParser.json());
// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
  'http://localhost:4200'//this is my front-end url for development
  
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
//here is the magic
app.use(cors(corsOptions));







app.post('/api/addDesign', function (req, res) {
  console.log("Here COll");	
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

  let designServiceObj = new designService(req, res)
  designServiceObj.addDesign()
})

app.get('/api/getDesign', function (req, res) {
  console.log("Hey");	
  let designServiceObj = new designService(req, res)
  designServiceObj.getDesign()
})

app.listen(3000, function () {
  console.log('Grocery Web app service listening on port 3000!')
})