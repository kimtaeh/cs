//module call
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//data predefine
var cs_intent = '';
var cs_message_log = new Array();
var cs_input_cnt = 0;

//reply define


//rest_api : keyboard 
app.post('/keyboard',function(request,response){
 
    console.log(request.body);

    cs_message = "무엇을 도와드릴까요";
    response.json({
    "message" : cs_message 
    });

});

//rest_api : message
app.post('/message',function(request,response){
 
    console.log(request.body);

    cs_message = "할룽";
    response.json({
    "message" : cs_message 
    });

});

var server = http.createServer(app).listen(80, function () {
console.log('server running...')
});
