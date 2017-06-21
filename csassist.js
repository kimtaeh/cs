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


//rest_api
app.post('/',function(request,response){
 
    console.log(request.body.result);
    console.log(request.body.result.resolvedQuery); 

    //intent
    var cs_message;
    var cs_query = request.body.result.resolvedQuery;

    //log 기록(사용자 정보 저장)
    cs_message_log [cs_input_cnt] = cs_query;
    cs_input_cnt = cs_input_cnt+ 1;
    
    if (cs_intent == ''){
	console.log('11');
	console.log(cs_input_cnt);
	console.log(cs_intent);
	//기존 정보 초기화
	cs_intent = 'delMenu';
	cs_input_cnt = 0;
	cs_message_log.splice();
	
	response.json({
		"data": {
			"facebook": {
		  		"attachment": {
		    			"type": "template",
		  			 "payload": {
		      				"template_type": "generic",
		      				"elements": [
							{
						  	"title": "무엇을 도와드릴까요",
							  "buttons": [
							    {
							      "type": "postback",
							      "title": "1번 주문/배송 확인",
							      "payload": "1"
							    },
							    {
						  		    "type": "postback",
						  		    "title": "2번 반품/교환 신청",
						  		    "payload": "2"
						  	    },
							    {
						  		    "type":"web_url",
                						    "url":"http://member2.gmarket.co.kr/CustomerCenter/Main",
						  		    "title": "0번 FAQ 연결"
						  	    }

							  ]
							}
							
						]
			    		}
		  		}
			}
		}
	});

    }
    else{

	//log 기록(사용자 정보 저장)
	cs_message_log [cs_input_cnt] = cs_query;
	cs_input_cnt = cs_input_cnt+ 1;
	    
	if (cs_intent == 'delMenu'){

		//로직 처리
		if (cs_query == 1 || cs_query == '1번'){
			console.log('21');
			console.log(cs_input_cnt);
			console.log(cs_intent);
			
			//intent 정의
			cs_intent = 'delCheck';

			response.json({
				"data": {
					"facebook": {
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "나이키 운동화",
									  "subtitle": "2017-05-27 (주문번호:1101)",
									  "item_url": "http://gmkt.kr/gUJQJh",
									  "image_url": "http://gdimg.gmarket.co.kr/goods_image2/shop_img/337/969/337969761.jpg",
									  "buttons": [
									    {
									      "type": "postback",
									      "title": "나이키 운동화",
									      "payload": "1"
									    }
									  ]
									}
									,
									{

								  		"title": "신라면 번들",
										 "subtitle": "2017-05-23 (주문번호:1008)",
								  		"item_url": "http://gmkt.kr/g1aYMh",
									  	"image_url": "http://gdimg.gmarket.co.kr/goods_image2/middle_jpgimg3/896/107/896107297.jpg",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "신라면 번들",
								  		    "payload": "2"
								  		  }
									  ]
									},
									{

								  		"title": "첫메뉴로",
										 "subtitle": "처음으로 돌아가기",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "처음으로",
								  		    "payload": "3"
								  		  }
									  ]
									}
								]
					    		}
				  		}
					}
				}
			});

		}
		else if (cs_query == 2 || cs_query == '2번'){
			console.log('22');
			console.log(cs_input_cnt);
			console.log(cs_intent);
			//intent 정의
			cs_intent = 'delReturn';

			response.json({
				"data": {
					"facebook": {
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "나이키 운동화",
									  "subtitle": "2017-05-27 (주문번호:1101)",
									  "item_url": "http://gmkt.kr/gUJQJh",
									  "image_url": "http://gdimg.gmarket.co.kr/goods_image2/shop_img/337/969/337969761.jpg",
									  "buttons": [
									    {
									      "type": "postback",
									      "title": "나이키 운동화",
									      "payload": "1"
									    }
									  ]
									}
									,
									{

								  		"title": "신라면 번들",
										 "subtitle": "2017-05-23 (주문번호:1008)",
								  		"item_url": "http://gmkt.kr/g1aYMh",
									  	"image_url": "http://gdimg.gmarket.co.kr/goods_image2/middle_jpgimg3/896/107/896107297.jpg",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "신라면 번들",
								  		    "payload": "2"
								  		  }
									  ]
									},
									{

								  		"title": "첫메뉴로",
										 "subtitle": "처음으로 돌아가기",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "처음으로",
								  		    "payload": "3"
								  		  }
									  ]
									}
								]
					    		}
				  		}
					}
				}
			});
		
		}
		else if(cs_query == 0 || cs_query == '0번'){

			console.log('23');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//기존 정보 초기화
			cs_intent = 'delMenu';
			cs_input_cnt = 0;
			cs_message_log.splice();
		
			response.json({
				"data": {
					"facebook": {
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "무엇을 도와드릴까요",
									  "buttons": [
									    {
									      "type": "postback",
									      "title": "1번 주문/배송 확인",
									      "payload": "1"
									    },
									    {
								  		    "type": "postback",
						  				    "title": "2번 반품/교환 신청",
						  				    "payload": "2"
						  	    		},
							   		 {
						  		    		"type":"web_url",
                								    "url":"http://member2.gmarket.co.kr/CustomerCenter/Main",
								  		    "title": "0번 FAQ 연결"
								  	    }

									  ]
									}
							
								]
			    				}
		  				}
					}
				}
			});
		}
		else{

			console.log('24');
			//잘못된 메뉴 선택
			//오류 메시지 출력
			cs_message = "다시 메뉴를 선택해주세요";
			response.json({
  				"speech": cs_message ,
 				"displayText": cs_message ,
 				"source": "delMenu"
			});
		}
	}
	else if (cs_intent == 'delCheck'){
		//로직 처리
		if (cs_query == '1' || cs_query == '1번' || cs_query == '1101'){
			console.log('31');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//intent 정의
			cs_intent = 'delCheck';

			cs_message = "고객님이 주문하신 나이키 운동화(주문번호:1101)는 택배사에서 배송 중에 있습니다";
			response.json({
				"data": {
					"facebook": {
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": cs_message,
									  "buttons": [
									    {
									      "type": "postback",
									      "title": "처음으로",
									      "payload": "3"
									    },
									    {
								  		    "type": "postback",
						  				    "title": "상담원 전달",
						  				    "payload": "0"
						  	    		    }
									  ]
									}
							
								]
			    				}
		  				}
					}
				}
			});


		}
		else if (cs_query == '2' || cs_query == '2번' || cs_query == '1008'){
			console.log('32');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//intent 정의
			cs_intent = 'delCheck';
	
			cs_message = "고객님이 주문하신 신라면 번들(주문번호:1008) 배송이 완료되었습니다";
			response.json({
				"data": {
					"facebook": {
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": cs_message,
									  "buttons": [
									    {
									      "type": "postback",
									      "title": "처음으로",
									      "payload": "3"
									    },
									    {
								  		    "type": "postback",
						  				    "title": "상담원 전달",
						  				    "payload": "0"
						  	    		    }
									  ]
									}
							
								]
			    				}
		  				}
					}
				}
			});
		
		}
		else if(cs_query == '0' || cs_query == '0번'){
			console.log('33');
			console.log(cs_input_cnt);
			console.log(cs_intent);


			//기존 로그를 상담원에게 전달과 동시에 챗봇 종료
		
			//상담원에게 정보 전달
			for (var i = 0; i < cs_input_cnt ; i++){
				console.log(cs_message_log[i]);
			}
			//기존 정보 초기화
			cs_intent = '';
			cs_input_cnt = 0;
			cs_message_log.splice();
		
			//상담자에게 종료 알림
  			cs_message = "이용해 주셔서 감사합니다\n문의주신 내용은 상담사를 통해 답변을 드리겠습니다.";
			response.json({
  			"speech": cs_message ,
 		 	"displayText": cs_message ,
	 	 	"source": "delReturn"
			});

		}
		else{
			console.log('34');
			console.log(cs_input_cnt);
			console.log(cs_intent);


			//기존 정보 초기화
			cs_intent = 'delMenu';
			cs_input_cnt = 0;
			cs_message_log.splice();
		
			response.json({
				"data": {
					"facebook": {
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "무엇을 도와드릴까요",
									  "buttons": [
									    {
									      "type": "postback",
									      "title": "1번 주문/배송 확인",
									      "payload": "1"
									    },
									    {
								  		    "type": "postback",
						  				    "title": "2번 반품/교환 신청",
						  				    "payload": "2"
						  	    		},
							   		 {
						  		    		"type":"web_url",
                								    "url":"http://member2.gmarket.co.kr/CustomerCenter/Main",
								  		    "title": "0번 FAQ 연결"
								  	    }

									  ]
									}
							
								]
			    				}
		  				}
					}
				}
			});

		}
	}
	else if (cs_intent == 'delReturn'){
		//로직 처리
		if (cs_query == '1' || cs_query == '1번' || cs_query == '1101'){

			console.log('41');
			console.log(cs_input_cnt);
			console.log(cs_intent);
		
			//intent 정의
			cs_intent = 'delReturn';

			cs_message = "고객님이 주문하신 나이키 운동화(주문번호:1101)의 취소 신청이 완료되었습니다";
			response.json({
				"data": {
					"facebook": {
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": cs_message,
									  "buttons": [
									    {
									      "type": "postback",
									      "title": "처음으로",
									      "payload": "3"
									    },
									    {
								  		    "type": "postback",
						  				    "title": "상담원 전달",
						  				    "payload": "0"
						  	    		    }
									  ]
									}
							
								]
			    				}
		  				}
					}
				}
			});

		}
		else if (cs_query == '2' || cs_query == '2번' || cs_query == '1008'){

			console.log('42');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//intent 정의
			cs_intent = 'delReturn';
	
			//화면 출력
			cs_message = "고객님이 주문하신 신라면 번들(주문번호:1008)은 반품 가능기간이 아닙니다";
			response.json({
				"data": {
					"facebook": {
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": cs_message,
									  "buttons": [
									    {
									      "type": "postback",
									      "title": "처음으로",
									      "payload": "3"
									    },
									    {
								  		    "type": "postback",
						  				    "title": "상담원 전달",
						  				    "payload": "0"
						  	    		    }
									  ]
									}
							
								]
			    				}
		  				}
					}
				}
			});
		
		}
		else if(cs_query == '0' || cs_query == '0번'){


			console.log('43');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//기존 로그를 상담원에게 전달과 동시에 챗봇 종료
		
			//상담원에게 정보 전달
			for (var i = 0; i < cs_input_cnt ; i++){
				console.log(cs_message_log[i]);
			}
			//기존 정보 초기화
			cs_intent = '';
			cs_input_cnt = 0;
			cs_message_log.splice();
		
			//상담자에게 종료 알림
  			cs_message = "이용해 주셔서 감사합니다\n문의주신 내용은 상담사를 통해 답변을 드리겠습니다.";
			response.json({
  			"speech": cs_message ,
 		 	"displayText": cs_message ,
	 	 	"source": "delReturn"
			});
		}
		else{

			console.log('44');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//기존 정보 초기화
			cs_intent = 'delMenu';
			cs_input_cnt = 0;
			cs_message_log.splice();
		
			response.json({
				"data": {
					"facebook": {
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "무엇을 도와드릴까요",
									  "buttons": [
									    {
									      "type": "postback",
									      "title": "1번 주문/배송 확인",
									      "payload": "1"
									    },
									    {
								  		    "type": "postback",
						  				    "title": "2번 반품/교환 신청",
						  				    "payload": "2"
						  	    		},
							   		 {
						  		    		"type":"web_url",
                								    "url":"http://member2.gmarket.co.kr/CustomerCenter/Main",
								  		    "title": "0번 FAQ 연결"
								  	    }

									  ]
									}
							
								]
			    				}
		  				}
					}
				}
			});
		}
	}
	else {
		//상담원 이동 등 중간에 비정상 적인 경우
		//다시 메뉴 화면 출력
		//기존 정보 초기화

		//기존 정보 초기화
		cs_intent = 'delMenu';
		cs_input_cnt = 0;
		cs_message_log.splice();
		
		response.json({
			"data": {
				"facebook": {
			  		"attachment": {
			    			"type": "template",
			  			 "payload": {
			      				"template_type": "generic",
			      				"elements": [
								{
							  	"title": "무엇을 도와드릴까요",
								  "buttons": [
								    {
								      "type": "postback",
								      "title": "1번 주문/배송 확인",
								      "payload": "1"
								    },
								    {
							  		    "type": "postback",
					  				    "title": "2번 반품/교환 신청",
					  				    "payload": "2"
					  	    		},
						   		 {
					  		    		"type":"web_url",
               								    "url":"http://member2.gmarket.co.kr/CustomerCenter/Main",
							  		    "title": "0번 FAQ 연결"
							  	    }
								  ]
								}
						
							]
		    				}
	  				}
				}
			}
		});
	}
	
    }

});
var server = http.createServer(app).listen(80, function () {
console.log('server running...')
});
