//module call
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mecab = require('mecab-ya');
var app = express();
var req = require('sync-request');
var urlencode = require('urlencode');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//data predefine
var cs_intent = '';
var cs_message_log = new Array();
var ori_faq = new Array();
var cs_input_cnt = 0;

//synoym define
var synonym_list = 
[['연락','통화']
,['구매','주문']
,['셀러','판매자']]

function strip_tags (input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

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

    if (cs_query == '1' || cs_query == '2' || cs_query == '3' || cs_query == '4' || cs_query == '0' || cs_query == '5'){
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
		  			"text": "안녕하세요 CS Assistant 입니다.\n궁금한 사항을 입력해주세요."	
				},
				{
							"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
								{"title": "MyG로 이동하기", "buttons": [{"type":"web_url","title": "MyG", "url":"http://member2.gmarket.co.kr//CustomerCenter/FaqSearch?searchText=%25ED%258C%2590%25EB%25A7%25A4%25EC%259E%2590%25EB%259E%2591%2520%25ED%2586%25B5%25ED%2599%2594%25ED%2595%25A0%25EB%259E%2598%25EC%259A%2594"}]}
								]
					    	}
						}
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
			console.log('11211');
			console.log(cs_input_cnt);
			console.log(cs_intent);
			console.log(cs_query);

			//기존 정보 초기화
			cs_intent = 'del_welcome';
			cs_input_cnt = 0;
			cs_message_log = [];
			ori_faq = [];
			
			var cs_encode = urlencode(cs_query);
			console.log(cs_encode);
		        		
			var uri = 'http://member2.gmarket.co.kr//CustomerCenter/JsonGetFaqSearch?pageNo=1&searchText='+cs_encode;
			var res = req('GET', 'http://member2.gmarket.co.kr//CustomerCenter/JsonGetFaqSearch?pageNo=1&searchText='+cs_encode);
			var return_info = JSON.parse(res.getBody('utf8'));

			var return_cnt = return_info.length;
			var max_iter;	

			//ori_faq.push({"text": "FAQ 조회 결과입니다.\n"}); 
			
			if (return_cnt > 0){

				max_iter = return_cnt;
				if(return_cnt > 3){
					max_iter = 3;		
				}

				for(var i = 0 ; i < max_iter ; i++)
				{
					var str = strip_tags(return_info[i].Title, '');
					var encode_str = urlencode(str);
					console.log(str);
					console.log(encode_str);
					
					ori_faq.push({"title": str, "buttons": [{"type":"web_url","title": "MyG", "url":"http://member2.gmarket.co.kr//CustomerCenter/FaqSearch?searchText="+encode_str}]}); 
				}
			}
			
			response.json({
				"data": {
					"facebook": [
						{
							"text": "문의하신 FAQ 조회 결과 입니다."	
						},
						{
									"attachment": {
									"type": "template",
									 "payload": {
										"template_type": "generic",
										"elements": ori_faq
								}
								}
						}
					]
				}
			});

		
			//ori_faq.push({"text": "\nFAQ 바로가기\n"+"http://member2.gmarket.co.kr//CustomerCenter/FaqSearch?searchText="+cs_encode}); 

			mecab.nouns(cs_query, function (err, results) {
    
			    var mecab_length = results.length;
			    var mecab_message = '';
			
			     //faq 조회
				for (var i = 0; i < mecab_length ; i++){
				console.log(results[i]);
					if (i == (mecab_length-1)){
						mecab_message = mecab_message + results[i];
					}
					else {
						mecab_message = mecab_message + results[i]  + ' ';	
					}
				}
				
				console.log(mecab_message);
				var mecab_encode = urlencode(mecab_message);
				
				var uri = 'http://member2.gmarket.co.kr//CustomerCenter/JsonGetFaqSearch?pageNo=1&searchText='+mecab_encode;
				var res = req('GET', 'http://member2.gmarket.co.kr//CustomerCenter/JsonGetFaqSearch?pageNo=1&searchText='+mecab_encode);
				var return_info = JSON.parse(res.getBody('utf8'));
				

				var return_cnt = return_info.length;
				var max_iter;	

				if (return_cnt > 0){

					//ori_faq.push({"text": "자연어 처리 FAQ 검색 결과 입니다.\n"}); 
					max_iter = return_cnt;
					if(return_cnt > 3){
						max_iter = 3;		
					}

					for(var i = 0 ; i < max_iter ; i++)
					{
						var str = strip_tags(return_info[i].Title, '');
						var encode_str = urlencode(str);
						console.log(str);	
						ori_faq.push({"text":str}); 
						ori_faq.push({"title": str, "buttons": [{"type":"web_url","title": "MyG", "url":"http://member2.gmarket.co.kr//CustomerCenter/FaqSearch?searchText="+encode_str}]}); 
					}
					
					//ori_faq.push({"text": "\nFAQ 바로가기\n"+"http://member2.gmarket.co.kr//CustomerCenter/FaqSearch?searchText="+mecab_encode}); 

				}
				else{

					//ori_faq.push({"text": "유의어 처리 FAQ 검색 결과 입니다.\n"}); 
					
					mecab_message = '';
					
					//유의어 조회
					for (var i = 0; i < mecab_length ; i++){
						tmp_message = '';
						for (var j = 0; j < 3 ; j++){
							if (results[i] == synonym_list[j][0]){
								tmp_message = synonym_list[j][1];
							}
							else{
								if(tmp_message == ''){
									tmp_message = results[i];
								}
							}
							if(j == 2)
							{
								if (i == (mecab_length-1)){
									mecab_message = mecab_message + tmp_message;
								}
								else {
									mecab_message = mecab_message + tmp_message + ' ';	
								}
							}
							
							console.log(mecab_message);
						}
					}
					
					var mecab_encode = urlencode(mecab_message);
				
					var uri = 'http://member2.gmarket.co.kr//CustomerCenter/JsonGetFaqSearch?pageNo=1&searchText='+mecab_encode;
					var res = req('GET', 'http://member2.gmarket.co.kr//CustomerCenter/JsonGetFaqSearch?pageNo=1&searchText='+mecab_encode);
					var return_info = JSON.parse(res.getBody('utf8'));


					var return_cnt = return_info.length;
					var max_iter;	

					max_iter = return_cnt;
					if(return_cnt > 3){
						max_iter = 3;		
					}

					for(var i = 0 ; i < max_iter ; i++)
					{
						var str = strip_tags(return_info[i].Title, '');
						var encode_str = urlencode(str);
						console.log(str);	
						ori_faq.push({"title": str, "buttons": [{"type":"web_url","title": "MyG", "url":"http://member2.gmarket.co.kr//CustomerCenter/FaqSearch?searchText="+encode_str}]}); 
					}
							
					//ori_faq.push({"text": "\nFAQ 바로가기\n"+"http://member2.gmarket.co.kr//CustomerCenter/FaqSearch?searchText="+mecab_encode}); 
				}	
					
				consol.log(ori_faq);
				
				response.json({
				"data": {
					"facebook": [
						{
							"text": "문의하신 FAQ 조회 결과 입니다."	
						},
						{
									"attachment": {
									"type": "template",
									 "payload": {
										"template_type": "generic",
										"elements": ori_faq
								}
								}
						}
					]
				}
				});
			});
		}
	}
	else if (cs_intent  == 'del_order_check'){
		    
		//로직 처리
		if (cs_query == '1' || cs_query == '5'){
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
		else if (cs_query == '2' || cs_query == '3'){
			console.log('31');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//intent 정의
			cs_intent  = 'del_order_check';
			response.json({
				"data": {
					"facebook": [
							{
								"text": "요청주신 주문건은 아직 입금 확인 중입니다.\n 무통장 입금의 경우 확인에 약 1~2일 정도 소요될 수 있습니다."
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
							"text": "최근 주문 내역 중 확인하고 싶으신 주문을 선택해주세요."
						},
						{
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{

								  		"title": "2017-05-27, 신라면 번들 (주문번호 2100119)",
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

								  		"title": "2017-05-26, 갤럭시 탭s3 LTE (주문번호 2100117)",
								  		"item_url": "http://gmkt.kr/g4fZ1p",
									  	"image_url": "http://gdimg.gmarket.co.kr/goods_image2/middle_jpgimg3/945/537/945537706.jpg",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "갤럭시 탭S3",
								  		    "payload": "3"
								  		  }
									  ]
									},
									{

								  		"title": "2017-05-22, 약산샘물 (주문번호 2100115)",
								  		"item_url": "http://gmkt.kr/gzt8KB",
									  	"image_url": "http://gdimg.gmarket.co.kr/goods_image2/middle_jpgimg3/867/680/867680897.jpg",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "약산샘물",
								  		    "payload": "4"
								  		  }
									  ]
									},
									{

								  		"title": "2017-05-19, 물먹는 하마 옷장용 (주문번호 2100109)",
								  		"item_url": "http://gmkt.kr/g1aYMh",
									  	"image_url": "http://gdimg.gmarket.co.kr/goods_image2/middle_jpgimg3/954/863/954863253.jpg",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "물먹는 하마 옷장용",
								  		    "payload": "5"
								  		  }
									  ]
									},
								]
					    		}
							}
						},
						{
							"text": "이전 주문의 경우 MyG에서 조회하실 수 있습니다."
						},
						{
							"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "MyG로 이동하기",
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
		if (cs_query == '1' || cs_query == '2'){
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
		else if (cs_query == '3' || cs_query == '4' || cs_query == '5'){
			console.log('31');
			console.log(cs_input_cnt);
			console.log(cs_intent);

			//intent 정의
			cs_intent  = 'del_status_check';
			response.json({
				"data": {
					"facebook": [
							{
								"text": "배송이 완료되었습니다.\n 물건을 받지 못하셨다면 고객센터로 문의 부탁 드립니다."
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
							"text": "최근 주문 내역 중 확인하고 싶으신 주문을 선택해주세요."
						},
						{
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{

								  		"title": "2017-05-27, 신라면 번들 (주문번호 2100119)",
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

								  		"title": "2017-05-26, 갤럭시 탭s3 LTE (주문번호 2100117)",
								  		"item_url": "http://gmkt.kr/g4fZ1p",
									  	"image_url": "http://gdimg.gmarket.co.kr/goods_image2/middle_jpgimg3/945/537/945537706.jpg",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "갤럭시 탭S3",
								  		    "payload": "3"
								  		  }
									  ]
									},
									{

								  		"title": "2017-05-22, 약산샘물 (주문번호 2100115)",
								  		"item_url": "http://gmkt.kr/gzt8KB",
									  	"image_url": "http://gdimg.gmarket.co.kr/goods_image2/middle_jpgimg3/867/680/867680897.jpg",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "약산샘물",
								  		    "payload": "4"
								  		  }
									  ]
									},
									{

								  		"title": "2017-05-19, 물먹는 하마 옷장용 (주문번호 2100109)",
								  		"item_url": "http://gmkt.kr/g1aYMh",
									  	"image_url": "http://gdimg.gmarket.co.kr/goods_image2/middle_jpgimg3/954/863/954863253.jpg",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "물먹는 하마 옷장용",
								  		    "payload": "5"
								  		  }
									  ]
									},
								]
					    		}
							}
						},
						{
							"text": "이전 주문의 경우 MyG에서 조회하실 수 있습니다."
						},
						{
							"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "MyG로 이동하기",
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
							"text": "반품 신청은 MyG 나의 구매내역에서 신청이 가능합니다.\n취소 페이지로 이동하시려면 아래 버튼을 클릭하세요."
						},
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
							"text": "반품 신청은 MyG 나의 구매내역에서 신청이 가능합니다.\n취소 페이지로 이동하시려면 아래 버튼을 클릭하세요."
						},
						{
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "2017-05-27, 신라면 번들 (주문번호 2100119)",
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
		else if (cs_query == '3'){
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
							"text": "반품 신청은 MyG 나의 구매내역에서 신청이 가능합니다.\n취소 페이지로 이동하시려면 아래 버튼을 클릭하세요."
						},
						{
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "2017-05-26, 갤럭시 탭s3 LTE (주문번호 2100117)",
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
		else if (cs_query == '4'){
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
							"text": "반품 신청은 MyG 나의 구매내역에서 신청이 가능합니다.\n취소 페이지로 이동하시려면 아래 버튼을 클릭하세요."
						},
						{
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "2017-05-22, 약산샘물 (주문번호 2100115)",
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
		else if (cs_query == '5'){
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
							"text": "반품 신청은 MyG 나의 구매내역에서 신청이 가능합니다.\n취소 페이지로 이동하시려면 아래 버튼을 클릭하세요."
						},
						{
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "2017-05-19, 물먹는 하마 옷장용 (주문번호 2100109)",
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
							"text": "최근 주문 내역 중 확인하고 싶으신 주문을 선택해주세요."
						},
						{
				  		"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{

								  		"title": "2017-05-27, 신라면 번들 (주문번호 2100119)",
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

								  		"title": "2017-05-26, 갤럭시 탭s3 LTE (주문번호 2100117)",
								  		"item_url": "http://gmkt.kr/g4fZ1p",
									  	"image_url": "http://gdimg.gmarket.co.kr/goods_image2/middle_jpgimg3/945/537/945537706.jpg",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "갤럭시 탭S3",
								  		    "payload": "3"
								  		  }
									  ]
									},
									{

								  		"title": "2017-05-22, 약산샘물 (주문번호 2100115)",
								  		"item_url": "http://gmkt.kr/gzt8KB",
									  	"image_url": "http://gdimg.gmarket.co.kr/goods_image2/middle_jpgimg3/867/680/867680897.jpg",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "약산샘물",
								  		    "payload": "4"
								  		  }
									  ]
									},
									{

								  		"title": "2017-05-19, 물먹는 하마 옷장용 (주문번호 2100109)",
								  		"item_url": "http://gmkt.kr/g1aYMh",
									  	"image_url": "http://gdimg.gmarket.co.kr/goods_image2/middle_jpgimg3/896/107/896107297.jpg",
								  		"buttons": [
								  		  {
								  		    "type": "postback",
								  		    "title": "물먹는 하마 옷장용",
								  		    "payload": "5"
								  		  }
									  ]
									},
								]
					    		}
							}
						},
						{
							"text": "이전 주문의 경우 MyG에서 조회하실 수 있습니다."
						},
						{
							"attachment": {
				    			"type": "template",
				  			 "payload": {
				      				"template_type": "generic",
				      				"elements": [
									{
								  	"title": "MyG로 이동하기",
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
			console.log('11111');
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
			console.log('11111');
			console.log(cs_input_cnt);
			console.log(cs_intent);
			console.log(cs_query);
			

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
