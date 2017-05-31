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
var cs_reply = new Array();
cs_reply[0] = "안녕하세요 ebaykorea 챗봇 입니다.";
cs_reply[1] = "무엇을 도와드릴까요";
cs_reply[2] = "1번 배송확인";
cs_reply[3] = "2번 반품신청";
cs_reply[4] = "0번 상담원 연결";

var cs_del_reply = new Array();
cs_del_reply[0] = "배송확인을 도와드리겠습니다.";
cs_del_reply[1] = "최근 주문하신 상품은 아래와 같습니다.";
cs_del_reply[2] = "1번 2017-05-27 나이키 운동화(주문번호:1101)";
cs_del_reply[3] = "2번 2017-05-23 신라면 번들(주문번호:1008)";
cs_del_reply[4] = "0번 상담원 연결";

var cs_return_reply = new Array();
cs_return_reply[0] = "반품신청을 도와드리겠습니다.";
cs_return_reply[1] = "최근 주문하신 상품은 아래와 같습니다.";
cs_return_reply[2] = "1번 2017-05-27 나이키 운동화(주문번호:1101)";
cs_return_reply[3] = "2번 2017-05-23 신라면 번들(주문번호:1008)";
cs_return_reply[4] = "0번 상담원 연결";

var del_item_reply = new Array();
del_item_reply[0] = "고객님이 주문하신 나이키 운동화(주문번호:1101)는 택배사에서 배송 중에 있습니다.";
del_item_reply[1] = "상품 배송의 경우 상품 발송 후 수령까지 약 1~2일 정도 시간이 소요됩니다.";
del_item_reply[2] = "고객님이 주문하신 신라면 번들(주문번호:1008) 배송이 완료되었습니다.";
del_item_reply[3] = "배송을 받지 못하셨다면 상담원 연결을 통해 문의 부탁 드립니다.";


var del_return_reply = new Array();
del_return_reply[0] = "고객님이 주문하신 나이키 운동화(주문번호:1101)의 취소 신청이 완료되었습니다.";
del_return_reply[1] = "환불까지 약 3~4일 정도가 소요되며 환불을 받지 못하셨다면 상담원 연결을 통해 문의 부탁 드립니다.";
del_return_reply[2] = "고객님이 주문하신 신라면 번들(주문번호:1008)은 반품 가능기간이 아닙니다.";
del_return_reply[3] = "반품과 관련하여 문의 내용이 있으시다면 상담원 연결을 통해 문의 부탁 드립니다.";



//rest_api
app.post('/',function(request,response){
 
    //log checking - print
    //var request_info = JSON.parse(request.body);
    //console.log(request.body.result);
    //console.log(request.body.result.action);
    //console.log(request.body.result.parameters.order_num); 
    //console.log(typeof cs_order); 
    //console.log(request.body.result.resolvedQuery); 
    //console.log(cs_order);

    //intent
    var cs_type = request.body.result.action;
    var cs_message;
    var cs_query = request.body.result.resolvedQuery;

    //log 기록(사용자 정보 저장)
    cs_message_log [cs_input_cnt] = cs_query;
    cs_query = cs_query + 1;
    
    if (cs_type == 'delMenu'){
	console.log('11');
        if (cs_input_cnt > 1){
		//기존 정보 초기화
		cs_intent = 'delMenu';
		cs_input_cnt = 0;
		cs_message_log.splice();
		
		//화면 출력
		for (var i = 1; i < 5; i++){
			cs_message = cs_reply[i];
			response.json({
  			"speech": cs_message ,
 	 		"displayText": cs_message ,
 	 		"source": "delMenu"
			});
		}
	}
	else{
		console.log('12');
		//정보 초기화
		cs_intent = 'delMenu';

		//화면 출력		
		for (var i = 0; i < 5; i++){
			cs_message = cs_del_reply[i];
			response.json({
  			"speech": cs_message ,
 	 		"displayText": cs_message ,
 	 		"source": "delMenu"
			});
		}

	}

    }
    else if (cs_type == 'userInput'){

	//log 기록(사용자 정보 저장)
	cs_message_log [cs_input_cnt] = cs_query;
	cs_query = cs_query + 1;

	//입력 기록 받음
	var cs_order = request.body.result.parameters.order_num[0];
	if (cs_intent == 'delMenu'){

		//로직 처리
		if (cs_order == '1' || cs_order == '1번'){
		
			//intent 정의
			cs_intent = 'delCheck';

			//화면 출력
			for (var i = 0; i < 5; i++){
				cs_message = cs_del_reply[i];
				response.json({
  				"speech": cs_message ,
 		 		"displayText": cs_message ,
 		 		"source": "delCheck"
				});
			}
		}
		else if (cs_order == '2' || cs_order == '2번'){
			//intent 정의
			cs_intent = 'delReturn';
	
			//화면 출력
			for (var i = 0; i < 5; i++){
				cs_message = cs_return_reply[i];
				response.json({
  				"speech": cs_message ,
 		 		"displayText": cs_message ,
 		 		"source": "delReturn"
				});
			}
		
		}
		else if(cs_order == '0' || cs_order == '0번'){


			//기존 로그를 상담원에게 전달과 동시에 챗봇 종료
		
			//상담원에게 정보 전달
			for (var i = 0; i < cs_input_cnt ; i++){
				console.log(cs_message_log[i]);
			}
			//기존 정보 초기화
			cs_intent = '';
			cs_input_cnt = 0;
			cs_message_log.splice();
			cs_message = cs_return_reply[i];
		
			//상담자에게 종료 알림
  			cs_message = "이용해 주셔서 감사합니다.";
			response.json({
  			"speech": cs_message ,
 		 	"displayText": cs_message ,
	 	 	"source": "delReturn"
			});
			cs_message = "문의주신 내용은 상담사를 통해 답변을 드리겠습니다.";
			response.json({
  			"speech": cs_message ,
 	 		"displayText": cs_message ,
 	 		"source": "delReturn"
			});
		}
		else{

			//잘못된 메뉴 선택
			//오류 메시지 출력
			cs_message = "다시 메뉴를 선택해주세요";
			response.json({
  				"speech": cs_message ,
 				"displayText": cs_message ,
 				"source": "delMenu"
			});

		
			//메뉴 화면 출력
			for (var i = 2; i < 5; i++){
				cs_message = cs_reply[i];
				response.json({
  				"speech": cs_message ,
 				"displayText": cs_message ,
 				"source": "delMenu"
				});
			}
		}
	}
	else if (cs_intent == 'delCheck'){
		//로직 처리
		if (cs_order == '1' || cs_order == '1번' || cs_order == '1101'){
		
			//intent 정의
			cs_intent = 'delCheck';

			//화면 출력
			for (var i = 0; i < 2; i++){
				cs_message = del_item_reply[i];
				response.json({
  				"speech": cs_message ,
 		 		"displayText": cs_message ,
 		 		"source": "delCheck"
				});
			}
		}
		else if (cs_order == '2' || cs_order == '2번' || cs_order == '1008'){
			//intent 정의
			cs_intent = 'delCheck';
	
			//화면 출력
			for (var i = 2; i < 4; i++){
				cs_message = del_item_reply[i];
				response.json({
  				"speech": cs_message ,
 		 		"displayText": cs_message ,
 		 		"source": "delReturn"
				});
			}
		
		}
		else if(cs_order == '0' || cs_order == '0번'){


			//기존 로그를 상담원에게 전달과 동시에 챗봇 종료
		
			//상담원에게 정보 전달
			for (var i = 0; i < cs_input_cnt ; i++){
				console.log(cs_message_log[i]);
			}
			//기존 정보 초기화
			cs_intent = '';
			cs_input_cnt = 0;
			cs_message_log.splice();
			cs_message = cs_return_reply[i];
		
			//상담자에게 종료 알림
  			cs_message = "이용해 주셔서 감사합니다.";
			response.json({
  			"speech": cs_message ,
 		 	"displayText": cs_message ,
	 	 	"source": "delReturn"
			});
			cs_message = "문의주신 내용은 상담사를 통해 답변을 드리겠습니다.";
			response.json({
  			"speech": cs_message ,
 	 		"displayText": cs_message ,
 	 		"source": "delReturn"
			});
		}
		else{

			//intent 정의
			cs_intent = 'delCheck';

			//화면 출력
			for (var i = 0; i < 5; i++){
				cs_message = cs_del_reply[i];
				response.json({
  				"speech": cs_message ,
 		 		"displayText": cs_message ,
 		 		"source": "delCheck"
				});
			}
		}
	}
	else if (cs_intent == 'delReturn'){
		//로직 처리
		if (cs_order == '1' || cs_order == '1번' || cs_order == '1101'){
		
			//intent 정의
			cs_intent = 'delReturn';

			//화면 출력
			for (var i = 0; i < 2; i++){
				cs_message = del_return_reply[i];
				response.json({
  				"speech": cs_message ,
 		 		"displayText": cs_message ,
 		 		"source": "delReturn"
				});
			}
		}
		else if (cs_order == '2' || cs_order == '2번' || cs_order == '1008'){
			//intent 정의
			cs_intent = 'delReturn';
	
			//화면 출력
			for (var i = 2; i < 4; i++){
				cs_message = del_return_reply[i];
				response.json({
  				"speech": cs_message ,
 		 		"displayText": cs_message ,
 		 		"source": "delReturn"
				});
			}
		
		}
		else if(cs_order == '0' || cs_order == '0번'){


			//기존 로그를 상담원에게 전달과 동시에 챗봇 종료
		
			//상담원에게 정보 전달
			for (var i = 0; i < cs_input_cnt ; i++){
				console.log(cs_message_log[i]);
			}
			//기존 정보 초기화
			cs_intent = '';
			cs_input_cnt = 0;
			cs_message_log.splice();
			cs_message = cs_return_reply[i];
		
			//상담자에게 종료 알림
  			cs_message = "이용해 주셔서 감사합니다.";
			response.json({
  			"speech": cs_message ,
 		 	"displayText": cs_message ,
	 	 	"source": "delReturn"
			});
			cs_message = "문의주신 내용은 상담사를 통해 답변을 드리겠습니다.";
			response.json({
  			"speech": cs_message ,
 	 		"displayText": cs_message ,
 	 		"source": "delReturn"
			});
		}
		else{

			//intent 정의
			cs_intent = 'delReturn';

			//화면 출력
			for (var i = 0; i < 5; i++){
				cs_message = cs_del_reply[i];
				response.json({
  				"speech": cs_message ,
 		 		"displayText": cs_message ,
 		 		"source": "delCheck"
				});
			}
		}
	}
	else {
		//상담원 이동 등 중간에 비정상 적인 경우
		//다시 메뉴 화면 출력
		//기존 정보 초기화
		cs_intent = '';
		cs_input_cnt = 0;
		cs_message_log.splice();

		//오류 메시지 출력
		cs_message = "다시 메뉴를 선택해주세요";
		response.json({
  			"speech": cs_message ,
 			"displayText": cs_message ,
 			"source": "delMenu"
		});

		
		//메뉴 화면 출력
		for (var i = 2; i < 5; i++){
			cs_message = cs_reply[i];
			response.json({
  			"speech": cs_message ,
 			"displayText": cs_message ,
 			"source": "delMenu"
			});
		}
	}
	
    }
    else if (cs_type == 'delCheck'){
	//log 기록(사용자 정보 저장)
	cs_message_log [cs_input_cnt] = cs_query;
	cs_query = cs_query + 1;

	//intent 정의
	cs_intent = 'delCheck';

	//화면 출력
	for (var i = 0; i < 5; i++){
		cs_message = cs_del_reply[i];
		response.json({
  		"speech": cs_message ,
 		"displayText": cs_message ,
 		"source": "delCheck"
		});
	}

    }
    else if (cs_type == 'delReturn'){
	//log 기록(사용자 정보 저장)
	cs_message_log [cs_input_cnt] = cs_query;
	cs_query = cs_query + 1;

	//intent 정의
	cs_intent = 'delReturn';

	//화면 출력
	for (var i = 0; i < 5; i++){
		cs_message = cs_return_reply[i];
		response.json({
		"speech": cs_message ,
 		"displayText": cs_message ,
 		"source": "delReturn"
		});
	}

    }
    else if (cs_type == 'csETC'){
	//상담원에게 정보 전달
	for (var i = 0; i < cs_input_cnt ; i++){
		console.log(cs_message_log[i]);
	}
	//기존 정보 초기화
	cs_intent = '';
	cs_input_cnt = 0;
	cs_message_log.splice();
	cs_message = cs_return_reply[i];
		
	//상담자에게 종료 알림
  	cs_message = "이용해 주셔서 감사합니다.";
	response.json({
  		"speech": cs_message ,
 		"displayText": cs_message ,
	 	"source": "delReturn"
	});
	cs_message = "문의주신 내용은 상담사를 통해 답변을 드리겠습니다.";
	response.json({
  		"speech": cs_message ,
 		"displayText": cs_message ,
 		"source": "delReturn"
	});

    }
    else {
    	//매칭되지 않는 정보
	//메뉴 리스트 출력

	//기존 정보 초기화
	cs_intent = '';
	cs_input_cnt = 0;
	cs_message_log.splice();

	//오류 메시지 출력
	cs_message = "다시 메뉴를 선택해주세요";
	response.json({
  	"speech": cs_message ,
 	"displayText": cs_message ,
 	"source": "delMenu"
	});

		
	//메뉴 화면 출력
	for (var i = 2; i < 5; i++){
		cs_message = cs_reply[i];
		response.json({
  		"speech": cs_message ,
 		"displayText": cs_message ,
 		"source": "delMenu"
		});
	}

    }

});
var server = http.createServer(app).listen(80, function () {
console.log('server running...')
});
