//module call
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var urlencode = require('urlencode');

//data predefine
var cs_intent = '';
var cs_message_log = new Array();
var cs_input_cnt = 0;

console.log(urlencode("변환")); 
console.log(urlencode.decode('%EB%B3%80%ED%99%98'));

//reply define


//rest_api : keyboard 
app.get('/keyboard',function(request,response){
 
    console.log("11");

    cs_message = "무엇을 도와드릴까요";
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.json({
    "type" : "text"
    });

});

//rest_api : message
app.post('/message',function(request,response){
 
    console.log(request.body);

    cs_message = "할룽";
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.json({
    "message" : {
          "text" : cs_message 
        }
    });

});

var server = http.createServer(app).listen(80, function () {
console.log('server running...')
});
