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
		cs_message = '고객님이 최근 주문하신 물건 중 배송 조회가 가능한 주문은 아래와 같습니다. \n\n 2017-05-31 주문번호 1101번 나이키 운동화, \n\n 2017-05-29 1008번 신라면 \n\n 어떤 주문을 조회하고 싶으신가요?'
  		cs_intent = cs_type; 
 		 response.json({
  		 "speech": cs_message,
 		 "displayText": cs_message,
 		 "source": "delCheck"
		  });
         }
    	 else if (cs_type == 'delReturn'){
   		 console.log('12');
		 cs_message = '고객님이 최근 주문하신 물건 중 반품 신청이 가능한 주문은 다음과 같습니다. \n\n 2017-05-31 주문번호 1101번 나이키 운동화, \n\n 2017-05-29 1008번 신라면 \n\n 반품 신청할 주문을 입력해주세요'
 		 cs_intent = cs_type;
		 response.json({
		 "speech": cs_message,
 		 "displayText": cs_message,
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
		if(cs_order == 1101 || cs_order == 1008){
			cs_intent = '';
			cs_message = '고객님이 주문하신 '+ cs_order + '번 주문은 담당기사님께서 배송 중에 있습니다. \n\n 배송의 경우 상품 발송 후 수령까지 약 1~2일 정도 시간이 소요됩니다.'
		}
		elseif (cs_order == 1){
			cs_intent = 'delCheck'; 
			cs_message = '고객님이 최근 주문하신 물건 중 배송 조회가 가능한 주문은 아래와 같습니다. \n\n 2017-05-31 주문번호 1101번 나이키 운동화, \n\n 2017-05-29 1008번 신라면 \n\n 어떤 주문을 조회하고 싶으신가요?'
		}
		elseif (cs_order == 2){
			cs_intent = 'delReturn'; 
			cs_message = '고객님이 최근 주문하신 물건 중 배송 조회가 가능한 주문은 아래와 같습니다. \n\n 2017-05-31 주문번호 1101번 나이키 운동화, \n\n 2017-05-29 1008번 신라면 \n\n 어떤 주문을 조회하고 싶으신가요?'
		}
		elseif (cs_order < 10){
			cs_intent = ''; 
			cs_message = '지원되지 않는 메뉴입니다. \n\n 정확한 메뉴를 선택해주세요 \n\n (1번 배송, 2번 반품)';
		}
		else{
			cs_intent = cs_type;
			cs_message = '입력하신 '+ cs_order + '번 주문은 조회가 가능하지 않습니다. \n\n  주문번호를 다시 확인해주세요' 
		}
 		 response.json({
  		"speech": cs_message ,
  		"displayText": cs_message ,
  		"source": "delCheck"
  		});
         }
	  else if (cs_intent == 'delReturn'){
  		console.log('22');
 		var cs_order = request.body.result.parameters.order_num;
 		if (cs_order == 1101{
			cs_intent = '';
			cs_message = '고객님이 주문하신 '+ cs_order + '번 반품신청이 완료되었습니다.'
		}
		elseif (cs_order == 1008){
			cs_intent = '';
			cs_message = '주문의 경우 이미 배송이 시작되어 취소 신청이 되지 않습니다. \n\n 요청주신 취소 건은 상담원에게 전달 후 처리를 지원해드리겠습니다.'
		}
		elseif (cs_order == 1){
			cs_intent = 'delCheck'; 
			cs_message = '고객님이 최근 주문하신 물건 중 배송 조회가 가능한 주문은 아래와 같습니다. \n\n 2017-05-31 주문번호 1101번 나이키 운동화, \n\n 2017-05-29 1008번 신라면 \n\n 어떤 주문을 조회하고 싶으신가요?'
		}
		elseif (cs_order == 2){
			cs_intent = 'delReturn'; 
			cs_message = '고객님이 최근 주문하신 물건 중 배송 조회가 가능한 주문은 아래와 같습니다. \n\n 2017-05-31 주문번호 1101번 나이키 운동화, \n\n 2017-05-29 1008번 신라면 \n\n 어떤 주문을 조회하고 싶으신가요?'
		}
		else{
			cs_intent = cs_type;
			cs_message = '입력하신 '+ cs_order + '번 주문은 조회가 가능하지 않습니다. \n\n  주문번호를 다시 확인해주세요.' 
		}  	
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
