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

router.get('/edit',function(req,res){
  res.sendFile(path.join(__dirname, '/views'+'/edit.html'));
});

app.use('/', router);


require("./app/routes/manifest.routes.js")(app);

// set port, listen for requests
const server = app.listen(80, () => {
  console.log("Server is running on port 80.");
});

//communication with the gpio ports of the pi. not sure this is needed for the project anymore
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

// communication with the printer. 
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/serial0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

// Read the port data
port.on("open", () => {
  console.log('serial port open');
  
  port.write("Hi there welcome to the manifest\n\n\n\n\n");

  console.log('welcome message printed')
});

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message)
})
