//module call
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mecab = require('mecab-ya');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//data predefine
var cs_intent = '';
var cs_message_log = new Array();
var cs_input_cnt = 0;

//faq define
var faq_list = 
[['판매자 통화 ', '판매자의 주소와 연락처는 상품 상세정보 페이지에서 확인하실 수 있습니다.', 'http://member2.gmarket.co.kr/CustomerCenter/Main']
,['주문 번호 확인 ','구매한 상품의 주문번호는 나의 쇼핑정보 > 전체주문내역에서 확인 가능합니다','http://member2.gmarket.co.kr//CustomerCenter/FaqList?SearchClass_0=01&SearchClass_1=102&SearchClass_2=10201&SearchClass_3=1020101']]

//rest_api
app.post('/',function(request,response){
 
    console.log(request.body.result);
    console.log(request.body.result.resolvedQuery); 

    //intent
    var cs_message;
    var cs_query = request.body.result.resolvedQuery;
    var cs_type = request.body.result.action;

    //log 기록(사용자 정보 저장)
    cs_message_log [cs_input_cnt] = cs_query;
    cs_input_cnt = cs_input_cnt+ 1;

    if (cs_query == '1' || cs_query == '2' || cs_query == '3' || cs_query == '4' || cs_query == '0'){
	console.log('00');
	cs_type = cs_intent;
	console.log(cs_type);
    }
    
    if (cs_intent == '' || cs_type == 'del_welcome'){
	console.log('11');
	console.log(cs_input_cnt);
	console.log(cs_intent);
	//기존 정보 초기화
	cs_intent = 'del_welcome';
	cs_input_cnt = 0;
	cs_message_log.splice();
	
	response.json({
		"data": {
			"facebook": [
				{
		  			"text": "안녕하세요 CS TEST 챗봇 입니다.\n궁금한 사항을 입력해주세요"	
				}
			]
		}
	});

    }
    else{

	//log 기록(사용자 정보 저장)
	cs_message_log [cs_input_cnt] = cs_query;
	cs_input_cnt = cs_input_cnt+ 1;
	    
	if (cs_intent  == 'del_welcome'){

		//로직 처리
		if (cs_type == 'del_order_check'){
			console.log('21');
			console.log(cs_input_cnt);
			console.log(cs_intent);
			
			//intent 정의
			cs_intent = 'del_order_check';

			response.json({
				"data": {
					"facebook": [
							{
								"text": "고객님이 최근 주문하신 상품은 아래와 같습니다."
							},
							{
								"attachment": {
				    				"type": "template",
				  			 	"payload": {
				      					"template_type": "generic",
				      					"elements": [
										{
									  	"title": "2017-05-26, 나이키 운동화 (주문번호 2100132)",
										"image_url": "http://gdimg.gmarket.co.kr/goods_image2/shop_img/337/969/337969761.jpg",
										  "buttons": [
										    {
										      "type": "postback",
										      "title": "주문 확인",
										      "payload": "1"
										    },
										    {
									  		    "type": "postback",
						  					    "title": "추가 조회",
						  					    "payload": "0"
						  	  	  		 }
										  ]
									}
							
								]
			    				}
		  				}
							}
						]
					}
				});

		}
		else if (cs_type == 'del_status_check'){
			console.log('22');
			console.log(cs_input_cnt);
			console.log(cs_intent);
			//intent 정의
			cs_intent = 'del_status_check'

			response.json({
				"data": {
					"facebook": [
							{
								"text": "고객님이 최근 주문하신 상품은 아래와 같습니다."
							},
							{
								"attachment": {
				    				"type": "template",
				  			 	"payload": {
				      					"template_type": "generic",
				      					"elements": [
										{
									  	"title": "2017-05-26, 나이키 운동화 (주문번호 2100132)",
										"image_url": "http://gdimg.gmarket.co.kr/goods_image2/shop_img/337/969/337969761.jpg",
										  "buttons": [
										    {
										      "type": "postback",
										      "title": "배송 확인",
										      "payload": "1"
										    },
										    {
									  		    "type": "postback",
						  					    "title": "추가 조회",
						  					    "payload": "0"
						  	  	  		   }
										  ]
									}
							
								]
			    				}
		  				}
							}
						]
					}
				});
		
		}
		else if(cs_type  == 'del_return_require'){

			console.log('23');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//기존 정보 초기화
			cs_intent = 'del_return_require';
			cs_input_cnt = 0;
			cs_message_log.splice();
		
			response.json({
				"data": {
					"facebook": [
							{
								"text": "고객님이 최근 주문하신 상품은 아래와 같습니다."
							},
							{
								"attachment": {
				    				"type": "template",
				  			 	"payload": {
				      					"template_type": "generic",
				      					"elements": [
										{
									  	"title": "2017-05-26, 나이키 운동화 (주문번호 2100132)",
										"image_url": "http://gdimg.gmarket.co.kr/goods_image2/shop_img/337/969/337969761.jpg",
										  "buttons": [
										    {
											      "type": "postback",
											      "title": "반품 신청",
											      "payload": "1"
										    },
										    {
									  		    "type": "postback",
						  					    "title": "추가 조회",
						  					    "payload": "0"
						  	  	  		    }
										  ]
									}
							
								]
			    				}
		  				}
							}
						]
					}
				});
		}
		else{

			//faq 처리
			console.log('24');
			console.log(cs_input_cnt);
			console.log(cs_intent);


			//기존 정보 초기화
			cs_intent = 'del_welcome';
			cs_input_cnt = 0;
			cs_message_log.splice();

			
			mecab.nouns(cs_query, function (err, result) {
    
			    var t1 = result.length;
			    var message = '';
			    var ret_message = '';
			    var ret_url = '';

			    //faq 조회
				for (var i = 0; i < t1 ; i++){
				console.log(result[i]);
				message = message + result[i]  + ' ';
				}

				for (var j = 0; j < 2 ; j++){
					if (message == faq_list[j][0]){
						ret_message = faq_list[j][1];
						ret_url = faq_list[j][2];
					    }
				}
				
				if (ret_message != '') {
					response.json({
					"data": {
						"facebook": [
								{
									"text": ret_message
								},
								{
									"buttons": [
									 {
										    "type":"web_url",
										    "title": "내역 확인",
										    "url": ret_url
										  }
									  ]
								}
							]
						}
					});
				}
				else{
				    	response.json({
					"data": {
						"facebook": [
								{
									"text": "문의 주신 내용은 현재 지원하지 않는 문의 입니다.\n질문 주신 내용에 대해 상담을 원하신다면 아래 버튼을 클릭해주세요"
								},
								{
									"buttons": [
									 {
										    "type":"web_url",
										    "title": "상담원 연결",
										    "url": "https://mobile.gmarket.co.kr/Login/Login?URL=http://mmyg.gmarket.co.kr/Question/CustomerQuestion"
										  }
									  ]
								}
							]
						}
					});
				    
				}
			});

		}
	}
	else if (cs_intent  == 'del_order_check'){
		//로직 처리
		if (cs_query != '0'){
			console.log('31');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//intent 정의
			cs_intent  = 'del_welcome';
			response.json({
				"data": {
					"facebook": [
							{
								"text": "요청주신 주문건은 결제가 완료되었습니다.\n배송의 경우 입금 확인 후 1~2일 이내 배송이 시작됩니다."
							}
						]
					}
				});


		}
		else if (cs_query == '0'){
			console.log('32');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//intent 정의
			cs_intent = 'del_order_checkk';
	
			response.json({
				"data": {
					"facebook": 
						[
						{
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

								  		"title": "MyG",
										 "subtitle": "MyG",
										"image_url": "https://sslimage.gmarket.co.kr/_Net/MyInfo/login/logo.gif",
								  		"buttons": [
								  		  {
								  		    "type":"web_url",
										    "title": "MyG",
                								    "url":"https://mobile.gmarket.co.kr/Login/Login?URL=http://mmyg.gmarket.co.kr/home"
								  		  }
									  ]
									}
								]
					    		}
							}
						},
						{
							"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "이전 주문의 경우 MyG에서 조회하실 수 있습니다.",
									  "buttons": [									
								  		  {
								  		    "type":"web_url",
										    "title": "MyG",
                								    "url":"https://mobile.gmarket.co.kr/Login/Login?URL=http://mmyg.gmarket.co.kr/home"
								  		  }
									  ]
									}
								]
					    		}
							}
						}
						
						
					]
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
			cs_intent = 'require';
			cs_input_cnt = 0;
			cs_message_log.splice();
		
			//상담자에게 종료 알림
  			cs_message = "상담받고 싶으신 내용을 입력해주세요.";
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
			cs_intent = 'del_welcome';
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
	else if (cs_intent == 'del_status_check'){
		//로직 처리
		if (cs_query == '1' || cs_query == '1번' || cs_query == '1101'){

			console.log('41');
			console.log(cs_input_cnt);
			console.log(cs_intent);
		
			//intent 정의
			cs_intent = 'del_status_check';

			cs_message = "선택하신 나이키 운동화를 취소하시겠습니까";
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
									      "title": "예",
									      "payload": "1"
									    },
									    {
								  		"type": "postback",
						  				"title": "아니오",
						  				"payload": "2"
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
			cs_intent = 'del_status_check';
	
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
						  				    "title": "상담원 연결",
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
			cs_intent = 'require';
			cs_input_cnt = 0;
			cs_message_log.splice();
		
			//상담자에게 종료 알림
  			cs_message = "문의 내용을 입력해 주시면 상담원 연결 시 같이 전달 드리겠습니다.";
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
			cs_intent = 'del_welcome';
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
	else if (cs_intent == 'require'){
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
	
		response.json({
				"data": {
					"facebook": {
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "입력해주셔서 감사합니다. \n아래 버튼을 클릭하시면 상담원을 연결해드리겠습니다.",
									  "buttons": [
							    		    {
						  		    		   "type":"web_url",
                								    "url":"http://member2.gmarket.co.kr/CustomerCenter/Main",
								  		    "title": "상담원 연결"
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
	else if (cs_intent == 'del_return_require'){
		//로직 처리
		if (cs_query == '1' || cs_query == '1번' || cs_query == '1101'){

			console.log('41');
			console.log(cs_input_cnt);
			console.log(cs_intent);
		
			//intent 정의
			cs_intent = 'del_return_require';

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
											    "title": "상담원 연결",
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
			cs_intent = 'del_return_require';
	
			//화면 출력
			cs_message = "반품/취소 신청이 중지 되었습니다.";
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
						  				    "title": "상담원 연결",
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
			cs_intent = 'require';
			cs_input_cnt = 0;
			cs_message_log.splice();
		
			//상담자에게 종료 알림
  			cs_message = "문의 내용을 입력해 주시면 상담원 연결 시 같이 전달 드리겠습니다.";
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
			cs_intent = 'del_welcome'
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
		cs_intent = 'del_welcome'
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
