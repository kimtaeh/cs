var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cs_intent = '';
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/',function(request,response){
 
    // input message handling
    //var request_info = JSON.parse(request.body);
    console.log(request.body.result);
    console.log(request.body.result.action);
    console.log(request.body.result.parameters.order_num); 
    console.log(typeof cs_order); 
    //console.log(request.body.result.resolvedQuery); 
    //console.log(cs_order);
    var cs_type = request.body.result.action;
 
    var cs_order = request.body.result.parameters.order_num[0];
    var cs_message;
    var cs_query = request.body.result.resolvedQuery;
 
    if (typeof cs_order == 'undefined'){
         if (cs_type == 'delCheck'){
    		console.log('11');
  		cs_intent = cs_type; 
 		 response.json({
  		 "speech": "조회하실 주문 번호를 입력해 주세요. 최근 고객님이 주문하신 번호는 1210031번입니다.",
 		 "displayText": "조회하실 주문 번호를 입력해 주세요. \n 11111",
 		 "source": "delCheck"
		  });
         }
    	 else if (cs_type == 'delReturn'){
   		 console.log('12');
 		 cs_intent = cs_type;
		 response.json({
		 "speech": "조회하실 주문 번호를 입력해 주세요. 최근 고객님이 주문하신 번호는 1210031번입니다.",
 		 "displayText": "조회하실 주문 번호를 입력해 주세요. 최근 고객님이 주문하신 번호는 1210031번입니다.",
 		 "source": "delReturn"
 		 });
         }
   	 else{
  		console.log('13');
  		cs_intent = '';
 		 cs_message = '문의주신 내용은 즉시 답변이 어려운 내용으로 상담원에게 전달하겠습니다.';
 		 response.json({
 		 "speech": cs_message,
		 "displayText": cs_message,
 		 "source": "delSend"
 		 });
         }
    }
    else {
 	 if (cs_intent == 'delCheck'){
  		  console.log('21');
  		  //console.log(cs_order);
		  //console.log(request.body.result.parameters.order_num); 
 		 var cs_order = request.body.result.parameters.order_num;
 		 cs_intent = '';
  		 cs_message = '고객님이 주문하신 '+ cs_order + '번 주문은 아직 배송되지 않았습니다.'
 		 response.json({
  		"speech": cs_message ,
  		"displayText": cs_message ,
  		"source": "delCheck"
  		});
         }
	  else if (cs_intent == 'delReturn'){
  		console.log('22');
 		var cs_order = request.body.result.parameters.order_num;
  		cs_intent = '';
  		cs_message = '고객님이 주문하신 '+ cs_order + '번 취소신청이 완료되었습니다.'
  		response.json({
  		"speech": cs_message ,
  		"displayText": cs_message ,
  		"source": "delReturn"
 		 });
         }
         else{
  		console.log('23');
  		cs_intent = '';
  		cs_message = '문의주신 내용은 즉시 답변이 어려운 내용으로 상담원에게 전달하겠습니다.';
 		 response.json({
  		"speech": cs_message,
  		"displayText": cs_message,
  		"source": "delSend"
  		});
         }
    }
});
var server = http.createServer(app).listen(80, function () {
console.log('server running...')
});
