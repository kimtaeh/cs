var mecab = require('mecab-ya');

var faq_list = 
[
['판매자 통화', '판매자의 주소와 연락처는 상품 상세정보 페이지에서 확인하실 수 있습니다.', 'http://member2.gmarket.co.kr/CustomerCenter/Main']
['주문 번호 확인','구매한 상품의 주문번호는 나의 쇼핑정보 > 전체주문내역에서 확인 가능합니다','http://member2.gmarket.co.kr//CustomerCenter/FaqList?SearchClass_0=01&SearchClass_1=102&SearchClass_2=10201&SearchClass_3=1020101']
]

var text = '주문번호는 어디서 확인 하나요';


mecab.nouns(text, function (err, result) {
    
    var message = '';
    var ret_message = ''
    var ret_url = ''
    var t1 = result.length;
    
    //faq 조회
	for (var i = 0; i < t1 ; i++){
		console.log(result[i]));
		message = message + result[i]  + ' ';
	}
    
    console.log(t1);
    console.log(result);
    console.log(message);
    
    
});
