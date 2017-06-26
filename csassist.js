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

//synoym define
var synonym_list = 
[['통화','연락']
,['구매','주문']]

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
											      "type": "web_url",
											      "title": "반품 신청 이동",
											      "url": "https://mobile.gmarket.co.kr/Login/Login?URL=http://mmyg.gmarket.co.kr/home"
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
					console.log('91');
					response.json({
					"data": {
						"facebook": [
								{
									"text": ret_message
								},
								{
									"attachment": {
									"type": "template",
									"payload": {
										"template_type": "generic",
										"elements": [
											{
											  "title" : "문의 내역 확인",
											  "buttons": [
											    {
												"type":"web_url",
												"title": "이동",
												"url": ret_url
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
					console.log('992');
					
					message = '';
					ret_message = '';
					tmp_message = '';
					
					//유의어 조회
					for (var i = 0; i < t1 ; i++){
						for (var j = 0; j < 2 ; j++){
							if (result[i] == synonym_list[j][0]){
								tmp_message = synonym_list[j][1];
								console.log(result[i]);
								console.log(tmp_message);
							}
							else{
								if(tmp_message = ''){
									tmp_message = result[i];
								}
								console.log(result[i]);
								console.log(tmp_message);
							}
							if(j == 1)
							{
								message = message + tmp_message + ' ';
							}
							
						}
					}
					
					console.log(message);
					
					for (var j = 0; j < 2 ; j++){
						if (message == faq_list[j][0]){
							ret_message = faq_list[j][1];
							ret_url = faq_list[j][2];
						    }
					}
					
					if (ret_message != '') {
					console.log('91');
					response.json({
					"data": {
						"facebook": [
								{
									"text": ret_message
								},
								{
									"attachment": {
									"type": "template",
									"payload": {
										"template_type": "generic",
										"elements": [
											{
											  "title" : "문의 내역 확인",
											  "buttons": [
											    {
											      	"type":"web_url",
											    	"title": "이동",
											    	"url": ret_url
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
					else {
						response.json({
						"data": {
							"facebook": [
									{
										"text": "문의 주신 내용은 현재 지원하지 않는 문의 입니다."
									},
									{
										"attachment": {
										"type": "template",
										"payload": {
											"template_type": "generic",
											"elements": [
												{
												  "title": "질문 주신 내용에 대해 상담을 원하신다면 아래 버튼을 클릭해주세요",
												  "buttons": [
												    {
													"type":"web_url",
													"title": "모바일 고객센터 이동",
													"url": "http://mobile.gmarket.co.kr/CustomerCenter"
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
				}
			});

		}
	}
	else if (cs_intent  == 'del_order_check'){
		    
		//로직 처리
		if (cs_query == '1' || cs_query == '2' || cs_query == '3' || cs_query == '4'){
			console.log('31');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//intent 정의
			cs_intent  = 'del_order_check';
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
			cs_intent = 'del_order_check';
	
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
									"attachment": {
									"type": "template",
									"payload": {
										"template_type": "generic",
										"elements": [
											{
											  "title" : "문의 내역 확인",
											  "buttons": [
											    {
											      	"type":"web_url",
											    	"title": "이동",
											    	"url": ret_url
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
				    	response.json({
					"data": {
						"facebook": [
								{
									"text": "문의 주신 내용은 현재 지원하지 않는 문의 입니다."
								},
								{
									"attachment": {
									"type": "template",
									"payload": {
										"template_type": "generic",
										"elements": [
											{
											  "title": "질문 주신 내용에 대해 상담을 원하신다면 아래 버튼을 클릭해주세요",
											  "buttons": [
											    {
											      	"type":"web_url",
											    	"title": "모바일 고객센터 이동",
											    	"url": "http://mobile.gmarket.co.kr/CustomerCenter"
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
			});

		}
	}
	else if (cs_intent == 'del_status_check'){
		//로직 처리
		if (cs_query == '1' || cs_query == '2' || cs_query == '3' || cs_query == '4'){
			console.log('31');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//intent 정의
			cs_intent  = 'del_status_check';
			response.json({
				"data": {
					"facebook": [
							{
								"text": "문의주신 상품은 현재 배송중에 있습니다.\n배송완료의 경우 택배사의 사정에 따라 차이가 있을 수 있습니다."
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
			cs_intent = 'del_status_check';
	
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
									"attachment": {
									"type": "template",
									"payload": {
										"template_type": "generic",
										"elements": [
											{
											  "title" : "문의 내역 확인",
											  "buttons": [
											    {
											      	"type":"web_url",
											    	"title": "이동",
											    	"url": ret_url
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
				    	response.json({
					"data": {
						"facebook": [
								{
									"text": "문의 주신 내용은 현재 지원하지 않는 문의 입니다."
								},
								{
									"attachment": {
									"type": "template",
									"payload": {
										"template_type": "generic",
										"elements": [
											{
											  "title": "질문 주신 내용에 대해 상담을 원하신다면 아래 버튼을 클릭해주세요",
											  "buttons": [
											    {
											      	"type":"web_url",
											    	"title": "모바일 고객센터 이동",
											    	"url": "http://mobile.gmarket.co.kr/CustomerCenter"
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
			});

		}
	}
	else if (cs_intent == 'del_return_require'){
		//로직 처리
		if (cs_query == '1'){
			console.log('32');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//intent 정의
			cs_intent = 'del_return_require';
	
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
								  	"title": "2017-05-26, 나이키 운동화 (주문번호 2100132)",
									 "buttons": [
									    {
									      "type": "web_url",
										"title": "반품 신청 이동",
										"url": "https://mobile.gmarket.co.kr/Login/Login?URL=http://mmyg.gmarket.co.kr/home"
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
		else if (cs_query == '2'){
			console.log('32');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//intent 정의
			cs_intent = 'del_return_require';
	
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
								  	"title": "2017-05-23, 신라면 번들 (주문번호 2100119)",
									 "buttons": [
									    {
									      "type": "web_url",
										"title": "반품 신청 이동",
										"url": "https://mobile.gmarket.co.kr/Login/Login?URL=http://mmyg.gmarket.co.kr/home"
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
		else if (cs_query == '0'){
			console.log('32');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//intent 정의
			cs_intent = 'del_return_require';
	
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
									"attachment": {
									"type": "template",
									"payload": {
										"template_type": "generic",
										"elements": [
											{
											  "title" : "문의 내역 확인",
											  "buttons": [
											    {
											      	"type":"web_url",
											    	"title": "이동",
											    	"url": ret_url
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
				    	response.json({
					"data": {
						"facebook": [
								{
									"text": "문의 주신 내용은 현재 지원하지 않는 문의 입니다."
								},
								{
									"attachment": {
									"type": "template",
									"payload": {
										"template_type": "generic",
										"elements": [
											{
											  "title": "질문 주신 내용에 대해 상담을 원하신다면 아래 버튼을 클릭해주세요",
											  "buttons": [
											    {
											      	"type":"web_url",
											    	"title": "모바일 고객센터 이동",
											    	"url": "http://mobile.gmarket.co.kr/CustomerCenter"
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
			});

		}
	}
	else {
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
									"attachment": {
									"type": "template",
									"payload": {
										"template_type": "generic",
										"elements": [
											{
											  "title" : "문의 내역 확인",
											  "buttons": [
											    {
											      	"type":"web_url",
											    	"title": "이동",
											    	"url": ret_url
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
				    	response.json({
					"data": {
						"facebook": [
								{
									"text": "문의 주신 내용은 현재 지원하지 않는 문의 입니다."
								},
								{
									"attachment": {
									"type": "template",
									"payload": {
										"template_type": "generic",
										"elements": [
											{
											  "title": "질문 주신 내용에 대해 상담을 원하신다면 아래 버튼을 클릭해주세요",
											  "buttons": [
											    {
											      	"type":"web_url",
											    	"title": "모바일 고객센터 이동",
											    	"url": "http://mobile.gmarket.co.kr/CustomerCenter"
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
			});

		}
    }

});
var server = http.createServer(app).listen(80, function () {
console.log('server running...')
});
