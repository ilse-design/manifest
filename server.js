const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const router = express.Router();


// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname/views+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/stream',function(req,res){
  res.sendFile(path.join(__dirname, '/views'+'/stream.html'));
});

app.use('/', router);


require("./app/routes/manifest.routes.js")(app);

// set port, listen for requests
const server = app.listen(80, () => {
  console.log("Server is running on port 80.");
});

var Gpio = require('onoff').Gpio; //require onoff to control GPIO
var LEDPin = new Gpio(4, 'out'); //declare GPIO4 an output
var fs = require('fs'); //require filesystem to read html files

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:80",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

io.sockets.on('connection', function (socket) {// WebSocket Connection

console.log("socket turned on");

    socket.on('stream',function(data){
        socket.broadcast.emit('stream',data);
    });

  var buttonState = 0; //variable to store button state

  socket.on('state', function (data) { //get button state from client
    buttonState = data;
console.log("incomming data saved");
console.log(data);

    if (buttonState != LEDPin.readSync()) { //Change LED state if button state is changed
      LEDPin.writeSync(buttonState); //turn LED on or off
      console.log("button has pressed server recievd")
    }
  });
});
